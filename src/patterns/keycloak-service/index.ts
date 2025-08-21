// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Annotations, RemovalPolicy } from 'aws-cdk-lib';
import { ISubnet, IVpc } from 'aws-cdk-lib/aws-ec2';
import { ContainerImage } from 'aws-cdk-lib/aws-ecs';
import { IKey, Key } from 'aws-cdk-lib/aws-kms';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { KeycloakCluster } from './components/cluster';
import { Keycloak_26_3_2_ConfigurationBuilder } from './components/configuration/26-3-2';
import { KeycloakDatabase } from './components/database';
import { KeycloakFabric } from './components/fabric';
import {
    DatabaseConfiguration,
    KeycloakConfiguration
} from './keycloak-configuration';
import { KeycloakVersion } from './version';

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

        const database = this.buildDatabase(workloadSubnets);
        const cluster = this.buildCluster(database.resources, workloadSubnets);

        if (cluster) {
            this.buildFabric(cluster.resources, ingressSubnets);
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
     * Performs validation of the Keycloak application configuration
     * @param configuration Keycloak application configuration
     */
    private validateConfiguration(configuration: KeycloakConfiguration): void {
        if (!configuration.hostnames.admin) {
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
            return new Key(this, 'Encryption', {
                removalPolicy: this.overallRemovalPolicy
            });
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
        const databaseConfiguration: DatabaseConfiguration = {
            credentials: database.credentials,
            endpoint: database.proxy.endpoint,
            name: database.databaseName,
            port: database.port,
            username: database.username
        };

        const configBuilder = (() => {
            if (this.props.keycloak.version.is(KeycloakVersion.V26_3_2)) {
                return new Keycloak_26_3_2_ConfigurationBuilder({
                    adminUser: this.props.keycloak.configuration.adminUser,
                    database: databaseConfiguration,
                    hostnames: this.props.keycloak.configuration.hostnames,
                    ports: this.props.keycloak.configuration.ports,
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
        readonly configuration: KeycloakConfiguration;

        /**
         * Keycloak container image to use
         */
        readonly image: ContainerImage;

        /**
         * Keycloak version
         */
        readonly version: KeycloakVersion;
    }

    /**
     * Overrides for prescribed defaults for the infrastructure
     */
    export interface InfrastructureConfiguration {
        /**
         * Overrides related to the application hosting infrastructure
         */
        readonly cluster?: KeycloakCluster.Configuration;

        /**
         * Overrides related to the database infrastructure
         */
        readonly database?: KeycloakDatabase.Configuration;

        /**
         * Overrides related to the networking infrastructure
         */
        readonly fabric?: KeycloakFabric.Configuration;
    }
}
