// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Annotations, Duration, RemovalPolicy } from 'aws-cdk-lib';
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { ISubnet, IVpc } from 'aws-cdk-lib/aws-ec2';
import {
    ContainerImage,
    Secret as ContainerSecret,
    FargateService
} from 'aws-cdk-lib/aws-ecs';
import {
    ApplicationLoadBalancer,
    IApplicationLoadBalancer,
    INetworkLoadBalancer,
    NetworkLoadBalancer
} from 'aws-cdk-lib/aws-elasticloadbalancingv2';
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
    ParsedHostnameConfiguration,
    PortConfiguration
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
 * The database will auto-scale based on CDK defaults or a consumer-specified scaling policy. The containers will not
 * automatically scale unless a consumer-specified policy is applied.
 *
 * It is recommended to set the CDK feature flag `@aws-cdk/aws-rds:databaseProxyUniqueResourceName` in
 * `cdk.json` to true. If not done, the database proxy name may conflict with other proxies in your account and
 * will prevent you from being able to deploy more than one KeycloakService.
 *
 * At a minimum this pattern requires the consumer to build and provide their own Keycloak container image for
 * deployment as well provide hostname configuration details. The Keycloak container image version MUST match the
 * version specified for use here and must include the Amazon Aurora JDBC driver pre-installed. A minimum viable
 * Dockerfile for that container image looks like:
 *
 * ```Dockerfile
 * ARG VERSION=26.3.2
 *
 * FROM quay.io/keycloak/keycloak:${VERSION} AS builder
 *
 * # Optimizations (not necessary but speed up the container startup)
 * ENV KC_DB=postgres
 * ENV KC_DB_DRIVER=software.amazon.jdbc.Driver
 *
 * WORKDIR /opt/keycloak
 *
 * # TLS Configuration
 * COPY --chmod=0666 certs/server.keystore conf/
 *
 * # Database Provider
 * ADD --chmod=0666 https://github.com/aws/aws-advanced-jdbc-wrapper/releases/download/2.6.2/aws-advanced-jdbc-wrapper-2.6.2.jar providers/aws-advanced-jdbc-wrapper.jar
 *
 * RUN /opt/keycloak/bin/kc.sh build
 *
 * FROM quay.io/keycloak/keycloak:${VERSION}
 * COPY --from=builder /opt/keycloak /opt/keycloak
 *
 * ENTRYPOINT [ "/opt/keycloak/bin/kc.sh" ]
 * CMD [ "start" ]
 * ```
 * ---
 * By default, the Keycloak service is deployed internally in isolated and/or private subnets but can be exposed by
 * providing the fabric configuration option to expose the service with an internet-facing load balancer.
 *
 * @example
 *
 * import { join } from 'node:path';
 * import { KeycloakService } from '@cdklabs/cdk-proserve-lib/patterns';
 * import { App, Environment, RemovalPolicy, Stack } from 'aws-cdk-lib';
 * import { IpAddresses, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
 * import { AssetImage } from 'aws-cdk-lib/aws-ecs';
 * import { Platform } from 'aws-cdk-lib/aws-ecr-assets';
 *
 * const dnsZoneName = 'example.com';
 * const network = Vpc.fromLookup(this, 'Network', {
 *     vpcId: 'vpc-xxxx'
 * });
 *
 * new KeycloakService(this, 'Keycloak', {
 *     keycloak: {
 *         image: AssetImage.fromAsset(join(__dirname, '..', 'src', 'keycloak'), {
 *             platform: Platform.LINUX_AMD64
 *         }),
 *         configuration: {
 *             hostnames: {
 *                 default: `auth.${dnsZoneName}`,
 *                 admin: `admin.auth.${dnsZoneName}`
 *             },
 *             loggingLevel: 'info'
 *         },
 *         version: KeycloakService.EngineVersion.V26_3_2
 *     },
 *     overrides: {
 *         cluster: {
 *             scaling: {
 *                 minimum: 1,
 *                 maximum: 2
 *             }
 *         }
 *         fabric: {
 *             dnsZoneName: dnsZoneName,
 *             internetFacing: true
 *         }
 *     },
 *     vpc: network
 * });
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
     * Ports to expose for Keycloak traffic
     */
    private readonly ports: PortConfiguration;

    /**
     * Credentials for bootstrapping a local admin user in Keycloak
     */
    readonly adminUser: ISecret;

    /**
     * Endpoint for the Keycloak service
     */
    readonly endpoint?: IApplicationLoadBalancer | INetworkLoadBalancer;

    /**
     * Container service for the Keycloak cluster
     */
    readonly service?: FargateService;

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

        this.ports = {
            management: this.props.keycloak.configuration.management
                ? this.props.keycloak.configuration.management.port
                : undefined,
            traffic:
                this.props.keycloak.configuration.port ??
                KeycloakFabric.Defaults.trafficPort
        };

        const workloadSubnets = this.selectWorkloadSubnets(this.props.vpc);
        const ingressSubnets = this.selectIngressSubnets(
            this.props.vpc,
            workloadSubnets,
            this.props.overrides?.fabric?.internetFacing
        );

        this.overallRemovalPolicy = this.findMostRestrictiveRemovalPolicy([
            this.props.removalPolicies?.data ??
                KeycloakService.defaultRemovalPolicy,
            this.props.removalPolicies?.logs ??
                KeycloakService.defaultRemovalPolicy
        ]);

        this.encryption = this.buildEncryption();
        this.adminUser = this.buildOrImportAdminUser();

        const database = this.buildDatabase(workloadSubnets);
        const cluster = this.buildCluster(database.resources, workloadSubnets);

        if (cluster) {
            const fabric = this.buildFabric(cluster.resources, ingressSubnets);

            this.endpoint = fabric.resources.loadBalancer;

            this.configureClusterRequestCountScaling(cluster, fabric);

            this.service = cluster.resources.service;
        }
    }

    /**
     * Configures autoscaling for the cluster tasks based on the number of active requests
     * @param cluster Infrastructure for the cluster
     * @param fabric Infrastructure for the networking fabric
     */
    private configureClusterRequestCountScaling(
        cluster: KeycloakCluster,
        fabric: KeycloakFabric
    ): void {
        if (
            cluster.resources.scaling &&
            this.props.overrides?.cluster?.scaling?.requestCountScaling?.enabled
        ) {
            cluster.resources.scaling.scaleToTrackCustomMetric(
                'RequestScaling',
                {
                    metric: this.props.overrides.fabric
                        ?.applicationLoadBalancing
                        ? (
                              fabric.resources
                                  .loadBalancer as ApplicationLoadBalancer
                          ).metrics.activeConnectionCount()
                        : (
                              fabric.resources
                                  .loadBalancer as NetworkLoadBalancer
                          ).metrics.activeFlowCount(),
                    targetValue:
                        this.props.overrides.cluster.scaling.requestCountScaling
                            .threshold ?? 80,
                    scaleInCooldown: Duration.minutes(5),
                    scaleOutCooldown: Duration.minutes(5)
                }
            );
        }
    }

    /**
     * Uses the supplied admin credentials, or substitutes defaults when not provided, to bootstrap the Keycloak
     * instance
     * @returns Credentials for bootstrapping a local admin user in Keycloak
     */
    private buildOrImportAdminUser(): ISecret {
        if (this.props.keycloak.configuration.adminUser) {
            return this.props.keycloak.configuration.adminUser;
        } else {
            return new Secret(this, 'AdminUserCredentials', {
                encryptionKey: this.encryption,
                generateSecretString: {
                    generateStringKey: 'password',
                    excludeCharacters: '"$&\'()*,-./:;<=>?[\\]^_`{|}~', // Permits: !#%+@
                    includeSpace: false,
                    passwordLength: 20,
                    requireEachIncludedType: true,
                    secretStringTemplate: JSON.stringify({
                        username: 'kcadmin'
                    })
                },
                removalPolicy:
                    this.props.removalPolicies?.data ??
                    KeycloakService.defaultRemovalPolicy
            });
        }
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
     * Validates the hostname
     * @param hostname Hostname to validate
     * @returns Validated hostname
     */
    private parseHostname(hostname: string): string {
        let parsedHostname = hostname;

        const headerMatch = parsedHostname.match(/^https?:\/\/(.*?)$/i);

        if (headerMatch) {
            Annotations.of(this).addError(
                `The hostname [${hostname}] has a protocol specified when it should not as HTTPS is always used.`
            );

            parsedHostname = headerMatch[1];
        }

        const portMatch = parsedHostname.match(/^(.*?):\d+(.*?)$/i);

        if (portMatch) {
            Annotations.of(this).addError(
                `The hostname [${hostname}] has a port specified when it should be specified through the application ports configuration`
            );

            parsedHostname = `${portMatch[1]}${portMatch[2]}`;
        }

        const pathMatch = parsedHostname.match(/^(.*?)\/.*?$/i);

        if (pathMatch) {
            Annotations.of(this).addError(
                `The hostname [${hostname}] has a path specified when it should be specified through the application path configuration`
            );

            parsedHostname = pathMatch[1];
        }

        return parsedHostname;
    }

    /**
     * Performs validation of the Keycloak application configuration
     * @param configuration Keycloak application configuration
     */
    private validateConfiguration(
        configuration: KeycloakService.ApplicationConfiguration
    ): void {
        /**
         * Logging
         */
        if (!configuration.loggingLevel) {
            Annotations.of(this).addWarningV2(
                '@cdklabs/cdk-proserve-lib:KeycloakService.logging',
                'The Keycloak logging level is not specified and will use defaults'
            );
        }

        /**
         * Hostname validation
         */
        const defaultHostname = this.parseHostname(
            configuration.hostnames.default
        );
        const adminHostname = configuration.hostnames.admin
            ? this.parseHostname(configuration.hostnames.admin)
            : undefined;

        const hosts: ParsedHostnameConfiguration = {
            default: new URL(`https://${defaultHostname}`),
            admin: adminHostname
                ? new URL(`https://${adminHostname}`)
                : undefined
        };

        if (!hosts.admin) {
            Annotations.of(this).addWarningV2(
                '@cdklabs/cdk-proserve-lib:KeycloakService.adminInterface',
                'The Keycloak administration console hostname is not specified which means the administration console will be exposed on the same host as the public endpoints'
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
            configuration.path &&
            (!configuration.path.startsWith('/') ||
                configuration.path.endsWith('/'))
        ) {
            Annotations.of(this).addError(
                'Keycloak default relative path must start with "/" and not end with "/"'
            );
        }

        if (
            configuration.management?.path &&
            (!configuration.management.path.startsWith('/') ||
                configuration.management.path.endsWith('/'))
        ) {
            Annotations.of(this).addError(
                'Keycloak management relative path must start with "/" and not end with "/"'
            );
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
                enableKeyRotation: true,
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
            port: database.port
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
                    loggingLevel:
                        this.props.keycloak.configuration.loggingLevel,
                    management: this.props.keycloak.configuration.management,
                    path: this.props.keycloak.configuration.path,
                    port: this.ports.traffic,
                    useProxy:
                        this.props.overrides?.fabric
                            ?.applicationLoadBalancing !== undefined
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
                ports: this.ports,
                removalPolicy: this.props.removalPolicies?.logs,
                vpc: this.props.vpc,
                workloadSubnets: workloadSubnets
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
    ): KeycloakFabric {
        return new KeycloakFabric(this, 'Fabric', {
            cluster: cluster,
            configuration: this.props.overrides?.fabric,
            ingressSubnets: ingressSubnets,
            ports: this.ports,
            appConfiguration: this.props.keycloak.configuration,
            removalPolicy: this.overallRemovalPolicy,
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
     * Details for the Keycloak hostname configuration
     *
     * [Guide: Configuring the hostname](https://www.keycloak.org/server/hostname)
     */
    export interface HostnameConfiguration {
        /**
         * Hostname for all endpoints
         * @example auth.example.com
         */
        readonly default: string;

        /**
         * Optional hostname for the administration endpoint
         *
         * This allows for the separation of the user and administration endpoints for increased security
         *
         * By default, the administrative endpoints will use the default hostname unless this is specified
         *
         * @example admin.auth.example.com
         */
        readonly admin?: string;
    }

    export interface ManagementConfiguration {
        /**
         * Whether the health management API is enabled
         * @default false
         */
        readonly health?: boolean;

        /**
         * Whether the metrics management API is enabled
         * @default false
         */
        readonly metrics?: boolean;

        /**
         * Optional alternative relative path for serving content specifically for management
         * @default /
         */
        readonly path?: string;

        /**
         * Port to serve the management web traffic on
         * @example 9006
         */
        readonly port: number;
    }

    /**
     * Configuration for the Keycloak application
     */
    export interface ApplicationConfiguration {
        /**
         * Credentials for bootstrapping a local admin user within Keycloak
         *
         * Must be a key-value secret with `username` and `password` fields
         *
         * [Guide: Bootstrapping an Admin Account](https://www.keycloak.org/server/hostname)
         *
         * By default, a new secret will be created with a username and randomly generated password
         */
        readonly adminUser?: ISecret;

        /**
         * Hostname configuration for Keycloak
         */
        readonly hostnames: HostnameConfiguration;

        /**
         * Level of information for Keycloak to log
         * @default warn
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
         * Configuration options for the management interface
         *
         * If not specified, the management interface is disabled
         */
        readonly management?: ManagementConfiguration;

        /**
         * Optional alternative relative path for serving content
         * @default /
         */
        readonly path?: string;

        /**
         * Port to serve the standard HTTPS web traffic on
         * @default 443
         */
        readonly port?: number;
    }

    /**
     * Policies to lifecycle various components of the pattern during stack actions
     */
    export interface RemovalPolicies {
        /**
         * How to deal with data-related elements
         * @default RemovalPolicy.RETAIN
         */
        readonly data?: RemovalPolicy;

        /**
         * How to deal with log-related elements
         * @default RemovalPolicy.RETAIN
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
     * Configuration for using application load balancing (layer 7) for the fabric endpoint
     */
    export interface FabricApplicationLoadBalancingConfiguration {
        /**
         * TLS certificate to support SSL termination at the load balancer level for the default Keycloak endpoint
         */
        readonly certificate: ICertificate;

        /**
         * TLS certificate to support SSL termination at the load balancer level for the management Keycloak endpoint
         */
        readonly managementCertificate?: ICertificate;
    }

    /**
     * Configuration options for the fabric
     */
    export interface FabricConfiguration {
        /**
         * Whether or not the load balancer should be exposed to the external network
         * @default false
         */
        readonly internetFacing?: boolean;

        /**
         * Name of the Route53 DNS Zone where the Keycloak hostnames should be automatically configured if provided
         *
         * By default, no Route53 records will be created
         *
         * @example example.com
         */
        readonly dnsZoneName?: string;

        /**
         * If specified, an Application Load Balancer will be used for the Keycloak service endpoint instead of a
         * Network Load Balancer. This is useful if you want to have fine grain control over the routes exposed as well
         * as implement application-based firewall rules.
         *
         * The default is to use a Network Load Balancer (Layer 4) with TCP passthrough for performance.
         *
         * NOTE: If you switch to application (layer 7) load balancing, you will not be able to perform mutual TLS
         * authentication and authorization flows at the Keycloak service itself as SSL will be terminated at the load
         * balancer and re-encrypted to the backend which will drop the client certificate.
         */
        readonly applicationLoadBalancing?: FabricApplicationLoadBalancingConfiguration;
    }

    /**
     * Configuration options for scaling the cluster based on number of active requests
     */
    export interface ClusterRequestCountScalingConfiguration {
        /**
         * Whether to enable scaling based on the number of active requests.
         *
         * Scaling is always enabled based on CPU utilization if the scaling bounds have been provided
         */
        readonly enabled: boolean;

        /**
         * The pivotal number of active requests through the load balancer before a scaling action is triggered. Used
         * to fine-tune scaling to your specific capacity needs.
         *
         * If not specified but auto scaling is enabled, then by default scaling out will occur when the number of
         * active requests exceeds 80 and scaling in will occur when this number drops below 80. All scaling activities
         * incur a 5 minute cooldown period.
         */
        readonly threshold?: number;
    }

    /**
     * Configuration options for scaling the cluster
     */
    export interface ClusterScalingConfiguration {
        /**
         * The minimum amount of Keycloak tasks that should be active at any given time
         */
        readonly maximum: number;

        /**
         * The maximum amount of Keycloak tasks that should be active at any given time
         */
        readonly minimum: number;

        /**
         * Configuration options for scaling the cluster based on number of active requests
         *
         * Scaling is always enabled based on CPU utilization if the scaling bounds have been provided
         */
        readonly requestCountScaling?: ClusterRequestCountScalingConfiguration;
    }

    /**
     * Configuration options for scaling the tasks
     */
    export interface TaskSizingConfiguration {
        /**
         * vCPU allocation for each task
         *
         * Values match the permitted values for `FargateTaskDefinitionProps.cpu`
         *
         * By default 1 vCPU (1024) is allocated
         *
         * @default 1024
         * @see https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ecs.FargateTaskDefinition.html#cpu
         */
        readonly cpu?: number;

        /**
         * Memory allocation in MiB for each task
         *
         * Values match the permitted values for `FargateTaskDefinitionProps.memoryLimitMiB`
         *
         * By default 2048 MiB (2GB) is allocated
         *
         * @default 2048
         * @see https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ecs.FargateTaskDefinition.html#memorylimitmib
         */
        readonly memoryMb?: number;
    }

    /**
     * Configuration options for the cluster
     */
    export interface ClusterConfiguration {
        /**
         * Boundaries for cluster scaling
         *
         * If not specified, auto scaling is disabled
         */
        readonly scaling?: ClusterScalingConfiguration;

        /**
         * Resource allocation options for each Keycloak task
         *
         * If not specified, each task gets 1 vCPU and 2GB memory
         *
         * Guidance on sizing can be found [here](https://www.keycloak.org/high-availability/concepts-memory-and-cpu-sizing)
         */
        readonly sizing?: TaskSizingConfiguration;

        /**
         * Environment variables to make accessible to the service containers
         */
        readonly environment?: Record<string, string>;

        /**
         * Environment variables to make accessible to the service containers via secrets
         */
        readonly secrets?: Record<string, ContainerSecret>;
    }

    /**
     * Configuration options common to all database models
     */
    interface CommonDatabaseConfiguration {
        /**
         * Whether a ServerlessV2 Aurora database should be deployed or not
         * @default true
         */
        readonly serverless?: boolean;

        /**
         * Backup lifecycle plan for the database
         *
         * If not specified, CDK defaults are used
         *
         * @see https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_rds.DatabaseCluster.html#backup
         */
        readonly backup?: BackupProps;

        /**
         * How long to retain logs for the database and supporting infrastructure
         * @default RetentionDays.ONE_WEEK
         */
        readonly logRetentionDuration?: RetentionDays;

        /**
         * Alternate database engine version to use
         * @default AuroraPostgresEngineVersion.VER_17_5
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
         *
         * If not specified, CDK defaults are used
         *
         * @see https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_rds.DatabaseClusterProps.html#serverlessv2autopauseduration
         * @see https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_rds.DatabaseClusterProps.html#serverlessv2maxcapacity
         * @see https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_rds.DatabaseClusterProps.html#serverlessv2mincapacity
         */
        readonly scaling?: CfnDBCluster.ServerlessV2ScalingConfigurationProperty;
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
