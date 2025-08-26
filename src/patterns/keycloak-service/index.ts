// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Annotations, RemovalPolicy } from 'aws-cdk-lib';
import { ISubnet, IVpc } from 'aws-cdk-lib/aws-ec2';
import { ContainerImage } from 'aws-cdk-lib/aws-ecs';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { IKey, Key } from 'aws-cdk-lib/aws-kms';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import {
    AuroraPostgresEngineVersion,
    BackupProps,
    CfnDBCluster
} from 'aws-cdk-lib/aws-rds';
import { ISecret, Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { KeycloakCluster } from './components/cluster';
import { Keycloak_26_3_2_ConfigurationBuilder } from './components/configuration/26-3-2';
import { KeycloakDatabase } from './components/database';
import { KeycloakFabric } from './components/fabric';
import {
    DatabaseConnectionConfiguration,
    ParsedHostnameConfiguration
} from './types/configuration';

/**
 * Properties for the KeycloakService construct
 */
export interface KeycloakServiceProps {
    /**
     * Options related to Keycloak
     */
    readonly keycloak: KeycloakService.KeycloakProps;

    /**
     * Overrides for prescribed defaults for the infrastructure
     */
    readonly overrides?: KeycloakService.InfrastructureConfiguration;

    /**
     * Network where Keycloak should be deployed
     */
    readonly vpc: IVpc;

    /**
     * Key for encrypting resource data
     *
     * If not specified, a new key will be created
     */
    readonly encryption?: IKey;

    /**
     * Policies to lifecycle various components of the pattern during stack actions
     *
     * If not specified, resources will be retained
     */
    readonly removalPolicies?: KeycloakService.RemovalPolicies;

    /**
     * How long to retain logs for all components
     *
     * If not specified, logs will be retained for one week
     */
    readonly logRetentionDuration?: RetentionDays;
}

/**
 * Deploys a production-grade Keycloak service.
 *
 * This service deploys a containerized version of Keycloak using AWS Fargate to host and scale the application. The
 * backend database is supported via Amazon Relational Database Service (RDS) and the application is fronted by a
 * Network Load Balancer.
 *
 */
export class KeycloakService extends Construct {
    /**
     * Default lifecycle policy for resources during stack actions
     */
    private static readonly defaultRemovalPolicy = RemovalPolicy.RETAIN;

    /**
     * Properties for the KeycloakService construct
     */
    private readonly props: KeycloakServiceProps;

    /**
     * Key for encrypting resource data
     */
    private readonly encryption: IKey;

    /**
     * Lifecycle policy for common resources based on all other resources which may use the common resource but have
     * differing lifecycle policies
     */
    private readonly overallRemovalPolicy: RemovalPolicy;

    /**
     * Bootstrapped admin user for Keycloak
     */
    readonly adminUser: KeycloakService.AdminUserConfiguration;

    /**
     * Create a new Keycloak service
     * @param scope Parent to which this construct belongs
     * @param id Unique identifier for the component
     * @param props Properties for configuring the cluster for Keycloak
     */
    constructor(scope: Construct, id: string, props: KeycloakServiceProps) {
        super(scope, id);

        this.props = props;

        this.validateConfiguration(this.props.keycloak.configuration);

        const workloadSubnets = this.selectWorkloadSubnets(this.props.vpc);
        const ingressSubnets = this.selectIngressSubnets(
            this.props.vpc,
            workloadSubnets,
            this.props.overrides?.fabric?.internetFacing
        );

        this.encryption = this.buildEncryption();
        this.overallRemovalPolicy = this.findMostRestrictiveRemovalPolicy([
            this.props.removalPolicies?.data ??
                KeycloakService.defaultRemovalPolicy,
            this.props.removalPolicies?.logs ??
                KeycloakService.defaultRemovalPolicy
        ]);

        this.adminUser = this.buildOrImportAdminUser();

        const database = this.buildDatabase(workloadSubnets);
        const cluster = this.buildCluster(database.resources, workloadSubnets);

        if (cluster) {
            this.buildFabric(cluster.resources, ingressSubnets);
        }
    }

    /**
     * Uses the supplied admin credentials, or substitutes defaults when not provided, to bootstrap the Keycloak
     * instance
     * @returns Bootstrapped admin user
     */
    private buildOrImportAdminUser(): KeycloakService.AdminUserConfiguration {
        const credentials =
            this.props.keycloak.configuration.adminUser?.credentials ??
            new Secret(this, 'AdminUserCredentials', {
                encryptionKey: this.encryption,
                generateSecretString: {
                    includeSpace: false,
                    passwordLength: 20,
                    requireEachIncludedType: true
                },
                removalPolicy:
                    this.props.removalPolicies?.data ??
                    KeycloakService.defaultRemovalPolicy
            });

        return {
            credentials: credentials,
            username:
                this.props.keycloak.configuration.adminUser?.username ??
                'kcadmin'
        };
    }

    /**
     * Determines which subnets to use for the workload resources
     * @param vpc Network where the resources will be deployed
     * @returns List of subnets to deploy private resources
     */
    private selectWorkloadSubnets(vpc: IVpc): ISubnet[] {
        const uniqueIsolatedSubnets = new Set(
            vpc.isolatedSubnets.map((s) => s.availabilityZone)
        );
        const uniquePrivateSubnets = new Set(
            vpc.privateSubnets.map((s) => s.availabilityZone)
        );

        if (uniqueIsolatedSubnets.size > 1) {
            return vpc.isolatedSubnets;
        } else if (uniquePrivateSubnets.size > 1) {
            return vpc.privateSubnets;
        } else {
            Annotations.of(this).addError(
                'Keycloak requires at least two private or isolated subnets in the VPC in different availability zones for the workload resources'
            );

            return [];
        }
    }

    /**
     * Determines which subnets to use for the ingress resources
     * @param vpc Network where the resources will be deployed
     * @returns List of subnets to deploy ingress resources
     */
    private selectIngressSubnets(
        vpc: IVpc,
        workloadSubnets: ISubnet[],
        internetFacing?: boolean
    ): ISubnet[] {
        if (internetFacing) {
            const uniquePublicSubnets = new Set(
                vpc.publicSubnets.map((s) => s.availabilityZone)
            );

            if (uniquePublicSubnets.size > 1) {
                return vpc.publicSubnets;
            } else {
                Annotations.of(this).addError(
                    'Keycloak requires at least two public subnets in the VPC in different availability zones for an internet facing load balancer'
                );

                return [];
            }
        } else {
            if (workloadSubnets.length > 1) {
                return workloadSubnets;
            } else {
                Annotations.of(this).addError(
                    'Keycloak requires at least two private or isolated subnets in the VPC in different availability zones for an internal load balancer'
                );

                return [];
            }
        }
    }

    /**
     * Performs validation of the Keycloak application configuration
     * @param configuration Keycloak application configuration
     */
    private validateConfiguration(
        configuration: KeycloakService.ApplicationConfiguration
    ): void {
        const hosts: ParsedHostnameConfiguration = {
            default: new URL(configuration.hostnames.default),
            admin: configuration.hostnames.admin
                ? new URL(configuration.hostnames.admin)
                : undefined
        };

        if (!hosts.admin) {
            Annotations.of(this).addWarningV2(
                'cdk-proserve-lib:KeycloakService.adminInterface',
                'The Keycloak administration console hostname is not specified which means the administration console will be exposed on the same host as the public endpoints'
            );
        }

        if (!configuration.loggingLevel) {
            Annotations.of(this).addWarningV2(
                'cdk-proserve-lib:KeycloakService.logging',
                'The Keycloak logging level is not specified and will use defaults'
            );
        }

        if (this.props.overrides?.fabric?.dnsZoneName) {
            if (
                !hosts.default.hostname.endsWith(
                    this.props.overrides.fabric.dnsZoneName
                )
            ) {
                Annotations.of(this).addError(
                    `Automatic Route53 configuration of a DNS zone for the default host requires the hostname end with the zone names`
                );
            }

            if (
                hosts.admin &&
                !hosts.admin.hostname.endsWith(
                    this.props.overrides.fabric.dnsZoneName
                )
            ) {
                Annotations.of(this).addError(
                    `Automatic Route53 configuration of a DNS zone for the admin host requires the hostname end with the zone names`
                );
            }
        }

        /**
         * Path validation
         */
        if (
            !configuration.paths?.default?.startsWith('/') ||
            configuration.paths.default.endsWith('/')
        ) {
            Annotations.of(this).addError(
                'Keycloak default relative path must start with "/" and not end with "/"'
            );
        }

        if (
            !configuration.paths?.management?.startsWith('/') ||
            configuration.paths.management.endsWith('/')
        ) {
            Annotations.of(this).addError(
                'Keycloak management relative path must start with "/" and not end with "/"'
            );
        }

        if (
            configuration.paths?.default &&
            hosts.default.pathname !== '/' &&
            hosts.default.pathname !== configuration.paths.default
        ) {
            Annotations.of(this).addError(
                'An alternative relative path was specified for the default route in both the hostname configuration and the paths configuration and they were not consistent'
            );
        }

        if (
            configuration.paths?.management &&
            hosts.admin &&
            hosts.admin.pathname !== '/' &&
            hosts.admin.pathname !== configuration.paths.management
        ) {
            Annotations.of(this).addError(
                'An alternative relative path was specified for the management route in both the hostname configuration and the paths configuration and they were not consistent'
            );
        }

        /**
         * Port validation
         */
        const defaultTrafficPorts = ['', KeycloakFabric.Defaults.trafficPort];

        if (
            !defaultTrafficPorts.includes(hosts.default.port) &&
            !configuration.ports?.traffic
        ) {
            Annotations.of(this).addError(
                'A non-default port was specified in the hostname but not in the port configuration for the default endpoints'
            );
        }

        if (
            configuration.ports?.traffic &&
            configuration.ports.traffic !==
                KeycloakFabric.Defaults.trafficPort &&
            hosts.default.port !== configuration.ports.traffic.toString()
        ) {
            Annotations.of(this).addError(
                'A non-default traffic port was specified and is not included in the hostname for the default endpoints'
            );
        }

        if (hosts.admin) {
            const defaultManagementPorts = [
                '',
                KeycloakFabric.Defaults.managementPort
            ];

            if (
                !defaultManagementPorts.includes(hosts.admin.port) &&
                !configuration.ports?.management
            ) {
                Annotations.of(this).addError(
                    'A non-default port was specified in the hostname but not in the port configuration for the management endpoints'
                );
            }

            if (
                configuration.ports?.management &&
                configuration.ports.management !==
                    KeycloakFabric.Defaults.managementPort &&
                hosts.admin.port !== configuration.ports.management.toString()
            ) {
                Annotations.of(this).addError(
                    'A non-default management port was specified and is not included in the hostname for the management endpoints'
                );
            }
        }
    }

    /**
     * Merges two removal policies by selecting the one which has the strictest data retention setting
     *
     * Data retention settings from most strict to least strict:
     *  - RETAIN
     *  - RETAIN_ON_UPDATE_OR_DELETE
     *  - DESTROY
     *
     * @param policyA First policy to merge
     * @param policyB Second policy to merge
     * @returns Policy with the stricter data retention setting
     */
    private mergeRemovalPolicies(
        policyA?: RemovalPolicy,
        policyB?: RemovalPolicy
    ): RemovalPolicy {
        if (!policyA && !policyB) {
            return RemovalPolicy.DESTROY;
        } else if (!policyA && policyB) {
            return policyB;
        } else if (policyA && !policyB) {
            return policyA;
        } else {
            if (
                policyA === RemovalPolicy.RETAIN ||
                policyB === RemovalPolicy.RETAIN
            ) {
                return RemovalPolicy.RETAIN;
            } else if (
                policyA === RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE ||
                policyB === RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE
            ) {
                return RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE;
            } else {
                return RemovalPolicy.DESTROY;
            }
        }
    }

    /**
     * Finds the most restrictive lifecycle policy
     * @param policies Policies to compare
     * @returns Policy with the strictest data retention setting
     */
    private findMostRestrictiveRemovalPolicy(
        policies: RemovalPolicy[]
    ): RemovalPolicy {
        let current = RemovalPolicy.DESTROY;

        for (const policy of policies) {
            current = this.mergeRemovalPolicies(current, policy);
        }

        return current;
    }

    /**
     * Imports or builds the encryption key for resources
     * @returns Encryption key for resources
     */
    private buildEncryption(): IKey {
        if (this.props.encryption) {
            return this.props.encryption;
        } else {
            const encryption = new Key(this, 'Encryption', {
                removalPolicy: this.overallRemovalPolicy
            });

            encryption.grantEncryptDecrypt(
                new ServicePrincipal('logs.amazonaws.com')
            );

            return encryption;
        }
    }

    /**
     * Builds the database component
     * @param workloadSubnets Subnets where the database resources should reside
     * @returns Database component
     */
    private buildDatabase(workloadSubnets: ISubnet[]): KeycloakDatabase {
        return new KeycloakDatabase(this, 'Database', {
            confugration: this.props.overrides?.database,
            encryption: this.encryption,
            vpc: this.props.vpc,
            workloadSubnets: workloadSubnets,
            removalPolicy: this.props.removalPolicies?.data
        });
    }

    /**
     * Builds the application hosting component
     * @param database Database infrastructure
     * @param workloadSubnets Subnets where the cluster resources should reside
     * @returns Application hosting component
     */
    private buildCluster(
        database: KeycloakDatabase.Infrastructure,
        workloadSubnets: ISubnet[]
    ): KeycloakCluster | undefined {
        const databaseConfiguration: DatabaseConnectionConfiguration = {
            credentials: database.credentials,
            endpoint: database.proxy.endpoint,
            name: database.databaseName,
            port: database.port,
            username: database.username
        };

        const configBuilder = (() => {
            if (
                this.props.keycloak.version.is(
                    KeycloakService.EngineVersion.V26_3_2
                )
            ) {
                return new Keycloak_26_3_2_ConfigurationBuilder({
                    adminUser: this.adminUser,
                    database: databaseConfiguration,
                    hostnames: this.props.keycloak.configuration.hostnames,
                    ports: {
                        management:
                            this.props.keycloak.configuration.ports
                                ?.management ??
                            KeycloakFabric.Defaults.managementPort,
                        traffic:
                            this.props.keycloak.configuration.ports?.traffic ??
                            KeycloakFabric.Defaults.trafficPort
                    },
                    loggingLevel:
                        this.props.keycloak.configuration.loggingLevel,
                    paths: this.props.keycloak.configuration.paths
                });
            } else {
                Annotations.of(this).addError(
                    `Keycloak version ${this.props.keycloak.version.value} not supported`
                );

                return undefined;
            }
        })();

        if (configBuilder) {
            return new KeycloakCluster(this, 'Cluster', {
                configuration: this.props.overrides?.cluster,
                database: database,
                dynamicConfigurationBuilder: configBuilder,
                encryption: this.encryption,
                image: this.props.keycloak.image,
                logRetentionDuration: this.props.logRetentionDuration,
                vpc: this.props.vpc,
                workloadSubnets: workloadSubnets,
                removalPolicy: this.props.removalPolicies?.logs
            });
        } else {
            return undefined;
        }
    }

    /**
     * Builds the networking component
     * @param cluster Application hosting infrastructure
     * @param ingressSubnets Subnets where the networking resources should reside
     */
    private buildFabric(
        cluster: KeycloakCluster.Infrastructure,
        ingressSubnets: ISubnet[]
    ): void {
        new KeycloakFabric(this, 'Fabric', {
            cluster: cluster,
            configuration: this.props.overrides?.fabric,
            ingressSubnets: ingressSubnets,
            appConfiguration: this.props.keycloak.configuration,
            vpc: this.props.vpc
        });
    }
}

export namespace KeycloakService {
    /**
     * Versions of the Keycloak application
     */
    export class EngineVersion {
        /**
         * Version 26.3.2
         */
        public static readonly V26_3_2 = EngineVersion.of('26.3.2');

        /**
         * Create a new KeycloakVersion with an arbitrary version
         * @param version Version of Keycloak
         * @returns KeycloakVersion
         */
        public static of(version: string): EngineVersion {
            return new EngineVersion(version);
        }

        /**
         * The full version string
         */
        readonly value: string;

        /**
         * Create a new KeycloakVersion from a version string
         * @param version Version of Keycloak
         */
        private constructor(version: string) {
            this.value = version;
        }

        /**
         * Determines if the KeycloakVersion matches a specific version
         * @param keycloak Version to match against
         * @returns True if the current version matches the target version, false otherwise
         */
        public is(keycloak: EngineVersion): boolean {
            return this.value === keycloak.value;
        }
    }

    /**
     * Details for the bootstrapped admin user within Keycloak
     *
     * [Guide: Bootstrapping an Admin Account](https://www.keycloak.org/server/hostname)
     */
    export interface AdminUserConfiguration {
        /**
         * Username for the bootstrapped admin user in Keycloak
         */
        readonly username: string;

        /**
         * Credentials for the bootstrapped admin user in Keycloak
         */
        readonly credentials: ISecret;
    }

    /**
     * Details for the Keycloak hostname configuration
     *
     * [Guide: Configuring the hostname](https://www.keycloak.org/server/hostname)
     */
    export interface HostnameConfiguration {
        /**
         * Hostname for all endpoints
         */
        readonly default: string;

        /**
         * Optional hostname for the administration endpoint
         *
         * This allows for the separation of the user and administration endpoints for increased security
         */
        readonly admin?: string;
    }

    /**
     * Details for the Keycloak path configuration to allow for serving Keycloak interfaces from non-root locations
     */
    export interface PathConfiguration {
        /**
         * Optional alternative relative path for serving content
         */
        readonly default?: string;

        /**
         * Optional alternative relative path for serving content specifically for management
         */
        readonly management?: string;
    }

    /**
     * Details for which ports are used to serve the Keycloak content
     */
    export interface OptionalPortConfiguration {
        /**
         * Port to serve the standard HTTPS web traffic on
         */
        readonly traffic?: number;

        /**
         * Port to serve the management web traffic on
         */
        readonly management?: number;
    }

    /**
     * Configuration for the Keycloak application
     */
    export interface ApplicationConfiguration {
        /**
         * Bootstrapped admin user
         */
        readonly adminUser?: AdminUserConfiguration;

        /**
         * Hostname configuration for Keycloak
         */
        readonly hostnames: HostnameConfiguration;

        /**
         * Level of information for Keycloak to log
         */
        readonly loggingLevel?:
            | 'off'
            | 'fatal'
            | 'error'
            | 'warn'
            | 'info'
            | 'debug'
            | 'trace'
            | 'all';

        /**
         * Alternative paths to serve Keycloak content
         */
        readonly paths?: PathConfiguration;

        /**
         * Ports for accessing exposed Keycloak HTTPS endpoints
         */
        readonly ports?: OptionalPortConfiguration;
    }

    /**
     * Policies to lifecycle various components of the pattern during stack actions
     */
    export interface RemovalPolicies {
        /**
         * How to deal with data-related elements
         */
        readonly data?: RemovalPolicy;

        /**
         * How to deal with log-related elements
         */
        readonly logs?: RemovalPolicy;
    }

    /**
     * Options related to Keycloak
     */
    export interface KeycloakProps {
        /**
         * Configuration for Keycloak
         */
        readonly configuration: ApplicationConfiguration;

        /**
         * Keycloak container image to use
         */
        readonly image: ContainerImage;

        /**
         * Keycloak version
         */
        readonly version: EngineVersion;
    }

    /**
     * Configuration options for the fabric
     */
    export interface FabricConfiguration {
        /**
         * Whether or not the load balancer should be exposed to the external network
         */
        readonly internetFacing?: boolean;

        /**
         * Ports to use for serving traffic on the load balancer
         */
        readonly ports?: OptionalPortConfiguration;

        /**
         * Name of the Route53 DNS Zone where the Keycloak hostnames should be automatically configured if provided
         */
        readonly dnsZoneName?: string;
    }

    /**
     * Configuration options for scaling the cluster
     */
    export interface ClusterScalingConfiguration {
        /**
         * The desired amount of Keycloak tasks to run at any given time
         */
        readonly desired?: number;

        /**
         * The minimum amount of Keycloak tasks that should be active at any given time
         */
        readonly maximum?: number;

        /**
         * The maximum amount of Keycloak tasks that should be active at any given time
         */
        readonly minimum?: number;
    }

    /**
     * Configuration options for scaling the tasks
     */
    export interface TaskSizingConfiguration {
        /**
         * vCPU allocation for each task
         */
        readonly cpu?: number;

        /**
         * Memory allocation in MiB for each task
         */
        readonly memoryMb?: number;
    }

    /**
     * Configuration options for the cluster
     */
    export interface ClusterConfiguration {
        /**
         * Container ports to use for workload traffic
         */
        readonly containerPorts?: OptionalPortConfiguration;

        /**
         * Boundaries for cluster scaling
         */
        readonly scaling?: ClusterScalingConfiguration;

        /**
         * Resource allocation options for each Keycloak task
         */
        readonly sizing?: TaskSizingConfiguration;
    }

    /**
     * Configuration options common to all database models
     */
    interface CommonDatabaseConfiguration {
        /**
         * Backup lifecycle plan for the database
         */
        readonly backup?: BackupProps;

        /**
         * How long to retain logs for the database and supporting infrastructure
         */
        readonly logRetentionDuration?: RetentionDays;

        /**
         * Alternate database engine version to use
         */
        readonly versionOverride?: AuroraPostgresEngineVersion;
    }

    /**
     * Configuration options for a non-serverless database model
     */
    export interface TraditionalDatabaseConfiguration
        extends CommonDatabaseConfiguration {}

    /**
     * Configuration options for a serverless database model
     */
    export interface ServerlessDatabaseConfiguration
        extends CommonDatabaseConfiguration {
        /**
         * How to scale the database
         */
        readonly scaling: CfnDBCluster.ServerlessV2ScalingConfigurationProperty;
    }

    /**
     * Configuration options for the database
     */
    export type DatabaseConfiguration =
        | ServerlessDatabaseConfiguration
        | TraditionalDatabaseConfiguration;

    /**
     * Overrides for prescribed defaults for the infrastructure
     */
    export interface InfrastructureConfiguration {
        /**
         * Overrides related to the application hosting infrastructure
         */
        readonly cluster?: ClusterConfiguration;

        /**
         * Overrides related to the database infrastructure
         */
        readonly database?: DatabaseConfiguration;

        /**
         * Overrides related to the networking infrastructure
         */
        readonly fabric?: FabricConfiguration;
    }
}
