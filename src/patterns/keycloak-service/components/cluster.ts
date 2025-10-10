// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Annotations, Duration, RemovalPolicy } from 'aws-cdk-lib';
import { ISubnet, IVpc, Peer, Port, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import {
    AwsLogDriver,
    Cluster,
    ContainerImage,
    ContainerInsights,
    FargateService,
    FargateTaskDefinition,
    Protocol,
    ScalableTaskCount
} from 'aws-cdk-lib/aws-ecs';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { CfnDBProxyTargetGroup } from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';
import { KeycloakService } from '..';
import { PortConfiguration } from '../types/configuration';
import { KeycloakConfigurationBuilder } from './configuration/builder';
import { KeycloakDatabase } from './database';

/**
 * Properties for configuring the cluster for Keycloak
 */
export interface KeycloakClusterProps {
    /**
     * Optional overrides to the default prescribed configuration
     */
    readonly configuration?: KeycloakService.ClusterConfiguration;

    /**
     * Infrastructure resources for the database
     */
    readonly database: KeycloakDatabase.Infrastructure;

    /**
     * Utility to build the Keycloak environment configuration variables
     */
    readonly dynamicConfigurationBuilder: KeycloakConfigurationBuilder;

    /**
     * Key for encrypting resource data
     */
    readonly encryption: IKey;

    /**
     * Keycloak container image to use
     */
    readonly image: ContainerImage;

    /**
     * How long to retain logs for the cluster and supporting infrastructure
     */
    readonly logRetentionDuration?: RetentionDays;

    /**
     * Ports to use for serving container
     */
    readonly ports: PortConfiguration;

    /**
     * Policy for lifecycling resources on stack actions
     */
    readonly removalPolicy?: RemovalPolicy;

    /**
     * Network where the Keycloak resources are deployed
     */
    readonly vpc: IVpc;

    /**
     * Subnets where the resources should be deployed
     */
    readonly workloadSubnets: ISubnet[];
}

/**
 * Cluster for the Keycloak service
 */
export class KeycloakCluster extends Construct {
    /**
     * Properties for configuring the cluster for Keycloak
     */
    private readonly props: KeycloakClusterProps;

    /**
     * Infrastructure resources for the cluster
     */
    readonly resources: KeycloakCluster.Infrastructure;

    /**
     * Create the cluster for the Keycloak service
     * @param scope Parent to which this construct belongs
     * @param id Unique identifier for the component
     * @param props Properties for configuring the component
     */
    constructor(scope: Construct, id: string, props: KeycloakClusterProps) {
        super(scope, id);

        this.props = props;

        this.resources = this.buildContainerService();
    }

    /**
     * Builds the security group for restricting access to the containers
     * @returns Security group to use for the containers
     */
    private buildAccess(): SecurityGroup {
        const access = new SecurityGroup(this, 'ContainerAccess', {
            vpc: this.props.vpc,
            allowAllOutbound: true
        });

        access.addIngressRule(
            Peer.ipv4(this.props.vpc.vpcCidrBlock),
            Port.tcp(KeycloakCluster.Defaults.containerTrafficPort),
            'Inbound traffic from load balancer'
        );

        access.addIngressRule(
            Peer.ipv4(this.props.vpc.vpcCidrBlock),
            Port.tcp(KeycloakCluster.Defaults.containerManagementPort),
            'Inbound management from load balancer'
        );

        return access;
    }

    /**
     * Builds the security group for restricting access within the cluster
     * @returns Security group to use for the cluster
     */
    private buildClusterAccess(): SecurityGroup {
        const intraClusterAccess = new SecurityGroup(
            this,
            'IntraClusterAccess',
            {
                vpc: this.props.vpc,
                allowAllOutbound: true
            }
        );

        intraClusterAccess.addIngressRule(intraClusterAccess, Port.tcp(7800));
        intraClusterAccess.addIngressRule(intraClusterAccess, Port.tcp(57800));

        this.props.database.access.addIngressRule(
            intraClusterAccess,
            Port.tcp(this.props.database.port),
            'Inbound access from Keycloak'
        );

        return intraClusterAccess;
    }

    /**
     * Builds the Fargate service for managing the Keycloak container workload
     * @returns Cluster infrastructure
     */
    private buildContainerService(): KeycloakCluster.Infrastructure {
        const externalAccess = this.buildAccess();
        const intraClusterAccess = this.buildClusterAccess();

        const serviceDefinition = new FargateTaskDefinition(
            this,
            'ServiceDefinition',
            {
                cpu:
                    this.props.configuration?.sizing?.cpu ??
                    KeycloakCluster.Defaults.cpuAllocation,
                memoryLimitMiB:
                    this.props.configuration?.sizing?.memoryMb ??
                    KeycloakCluster.Defaults.memoryAllocation
            }
        );

        serviceDefinition.addContainer('Application', {
            image: this.props.image,
            environment: {
                ...this.props.dynamicConfigurationBuilder.generateStandardDynamicConfiguration(),
                ...this.props.configuration?.environment
            },
            logging: new AwsLogDriver({
                logGroup: new LogGroup(this, 'LogDestination', {
                    encryptionKey: this.props.encryption,
                    removalPolicy: this.props.removalPolicy,
                    retention:
                        this.props.logRetentionDuration ??
                        KeycloakCluster.Defaults.logRetentionDuration
                }),
                streamPrefix: 'keycloak'
            }),
            portMappings: [
                {
                    containerPort:
                        KeycloakCluster.Defaults.containerTrafficPort,
                    hostPort: KeycloakCluster.Defaults.containerTrafficPort,
                    protocol: Protocol.TCP
                },
                {
                    containerPort:
                        KeycloakCluster.Defaults.containerManagementPort,
                    hostPort: KeycloakCluster.Defaults.containerManagementPort,
                    protocol: Protocol.TCP
                }
            ],
            secrets: {
                ...this.props.dynamicConfigurationBuilder.generateSecureDynamicConfiguration(),
                ...this.props.configuration?.secrets
            }
        });

        const service = new FargateService(this, 'Service', {
            cluster: new Cluster(this, 'ContainerCluster', {
                containerInsightsV2: ContainerInsights.ENABLED,
                vpc: this.props.vpc
            }),
            taskDefinition: serviceDefinition,
            assignPublicIp: false,
            circuitBreaker: {
                enable: true,
                rollback: false
            },
            desiredCount: 1, // Force 1 on first start to prevent competition in initiailizing the DB
            healthCheckGracePeriod: Duration.minutes(2),
            securityGroups: [intraClusterAccess, externalAccess]
        });

        const scaling = (() => {
            if (this.props.configuration?.scaling) {
                if (
                    this.props.configuration.scaling.maximum ===
                    this.props.configuration.scaling.minimum
                ) {
                    Annotations.of(this).addError(
                        'Scaling configuration must specify different minimum and maximum bounds'
                    );
                }

                const control = service.autoScaleTaskCount({
                    maxCapacity: this.props.configuration.scaling.maximum,
                    minCapacity: this.props.configuration.scaling.minimum
                });

                control.scaleOnCpuUtilization('CpuScaling', {
                    targetUtilizationPercent: 70
                });

                return control;
            } else {
                return undefined;
            }
        })();

        // Wait for the DB to be ready
        service.node.addDependency(this.props.database.cluster);
        service.node.addDependency(this.props.database.proxy);

        const targetGroup = this.props.database.proxy.node.children.find(
            (c) => c instanceof CfnDBProxyTargetGroup
        );

        if (targetGroup) {
            service.node.addDependency(targetGroup);
        }

        this.props.database.proxy.grantConnect(serviceDefinition.taskRole);

        return {
            access: externalAccess,
            service: service,
            scaling: scaling
        };
    }
}

export namespace KeycloakCluster {
    /**
     * Default configuration options
     */
    export namespace Defaults {
        /**
         * Container port to serve default HTTPS web traffic
         */
        export const containerTrafficPort = 8000;

        /**
         * Container port to serve management HTTPS web traffic
         */
        export const containerManagementPort = 8001;

        /**
         * vCPU allocation for each task
         */
        export const cpuAllocation = 1024;

        /**
         * Memory allocation in MiB for each task
         */
        export const memoryAllocation = 2048;

        /**
         * How long to retain logs for the cluster and supporting infrastructure
         */
        export const logRetentionDuration = RetentionDays.ONE_WEEK;
    }

    /**
     * Infrastructure related to the cluster
     */
    export interface Infrastructure {
        /**
         * Security group for providing access to the workload
         */
        readonly access: SecurityGroup;

        /**
         * Fargate service for managing the workloads
         */
        readonly service: FargateService;

        /**
         * Scaling control for the Fargate service
         */
        readonly scaling: ScalableTaskCount | undefined;
    }
}
