// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Annotations, RemovalPolicy } from 'aws-cdk-lib';
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { ISubnet, IVpc } from 'aws-cdk-lib/aws-ec2';
import { ListenerConfig, Protocol } from 'aws-cdk-lib/aws-ecs';
import {
    NetworkLoadBalancer,
    Protocol as ElbProtocol,
    INetworkLoadBalancer,
    IApplicationLoadBalancer,
    ApplicationProtocol
} from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { LoadBalancerTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';
import { KeycloakService } from '..';
import { KeycloakCluster } from './cluster';
import { PortConfiguration } from '../types/configuration';

/**
 * Properties for configuring the networking fabric for Keycloak
 */
export interface KeycloakFabricProps {
    /**
     * Optional overrides to the default prescribed configuration
     */
    readonly configuration?: KeycloakService.FabricConfiguration;

    /**
     * Infrastructure resources for the cluster hosting the Keycloak application
     */
    readonly cluster: KeycloakCluster.Infrastructure;

    /**
     * Subnets where the resources should be deployed
     *
     * Optional as subnets are not required when the load balancer endpoint is imported
     */
    readonly ingressSubnets?: ISubnet[];

    /**
     * Ports to use for serving container
     */
    readonly ports: PortConfiguration;

    /**
     * Configuration for the Keycloak application
     */
    readonly appConfiguration: KeycloakService.ApplicationConfiguration;

    /**
     * Policy for lifecycling resources on stack actions
     */
    readonly removalPolicy?: RemovalPolicy;

    /**
     * Network where the Keycloak resources are deployed
     */
    readonly vpc: IVpc;
}

/**
 * Networking fabric for the Keycloak service
 */
export class KeycloakFabric extends Construct {
    /**
     * Determines if the fabric configuration specifies importing existing resources
     * @param configuration Fabric configuration
     * @returns Fabric configuration that specifies importing resources
     */
    static isImportConfiguration(
        configuration?: KeycloakService.FabricConfiguration
    ): configuration is KeycloakService.ImportedFabricConfiguration {
        const importKey: keyof KeycloakService.ImportedFabricConfiguration =
            'loadBalancer';

        return configuration !== undefined && importKey in configuration;
    }

    /**
     * Properties for configuring the networking fabric for Keycloak
     */
    private readonly props: KeycloakFabricProps;

    /**
     * Infrastructure resources for the fabric
     */
    readonly resources: KeycloakFabric.Infrastructure;

    /**
     * Create the networking fabric for the Keycloak service
     * @param scope Parent to which this construct belongs
     * @param id Unique identifier for the component
     * @param props Properties for configuring the component
     */
    constructor(scope: Construct, id: string, props: KeycloakFabricProps) {
        super(scope, id);

        this.props = props;

        const loadBalancerType: KeycloakFabric.LoadBalancerType =
            KeycloakFabric.isImportConfiguration(this.props.configuration) &&
            this.isApplicationEndpoint(this.props.configuration.loadBalancer)
                ? 'app'
                : 'net';

        const loadBalancer = (() => {
            if (
                KeycloakFabric.isImportConfiguration(this.props.configuration)
            ) {
                if (
                    this.isApplicationEndpoint(
                        this.props.configuration.loadBalancer
                    )
                ) {
                    const endpoint = this.importApplicationEndpoint(
                        this.props.configuration.loadBalancer
                    );

                    this.configureApplicationEndpoint(
                        endpoint,
                        this.props.configuration.loadBalancer.certificate,
                        this.props.configuration.loadBalancer
                            .managementCertificate
                    );

                    return endpoint;
                } else {
                    const endpoint = this.importNetworkEndpoint(
                        this.props.configuration.loadBalancer
                    );

                    this.configureNetworkEndpoint(endpoint);

                    return endpoint;
                }
            } else {
                const endpoint = this.buildEndpoint(this.props.configuration);
                this.configureNetworkEndpoint(endpoint);

                return endpoint;
            }
        })();

        this.configureEndpointDns(loadBalancer);

        this.resources = {
            loadBalancer: loadBalancer,
            type: loadBalancerType
        };
    }

    /**
     * Determines if the import fabric configuration specifies importing an existing Application Load Balancer
     * @param configuration Import fabric configuration
     * @returns Fabric configuration that specifies importing an existing Application Load Balancer
     */
    private isApplicationEndpoint(
        configuration: KeycloakService.ImportedLoadBalancerConfiguration
    ): configuration is KeycloakService.ImportApplicationLoadBalancerConfiguration {
        const prop: keyof KeycloakService.ImportApplicationLoadBalancerConfiguration =
            'certificate';

        return prop in configuration;
    }

    /**
     * Build the load balancer for the Keycloak service
     * @param configuration Configuration for constructing the fabric
     * @returns Network Load Balancer for the Keycloak service
     */
    private buildEndpoint(
        configuration?: KeycloakService.ConstructedFabricConfiguration
    ): INetworkLoadBalancer {
        const lb = new NetworkLoadBalancer(this, 'LoadBalancer', {
            vpc: this.props.vpc,
            crossZoneEnabled: true,
            deletionProtection:
                this.props.removalPolicy !== RemovalPolicy.DESTROY,
            internetFacing: configuration?.internetFacing,
            vpcSubnets: {
                onePerAz: true,
                subnets: this.props.ingressSubnets
            }
        });

        return lb;
    }

    /**
     * Import an existing applciation load balancer for the Keycloak service
     * @param configuration Configuration for constructing the fabric using existing resources
     * Imported Application Load Balancer for the Keycloak service
     */
    private importApplicationEndpoint(
        configuration: KeycloakService.ImportApplicationLoadBalancerConfiguration
    ): IApplicationLoadBalancer {
        return configuration.resource;
    }

    /**
     * Import an existing network load balancer for the Keycloak service
     * @param configuration Configuration for constructing the fabric using existing resources
     * Imported Network Load Balancer for the Keycloak service
     */
    private importNetworkEndpoint(
        configuration: KeycloakService.ImportNetworkLoadBalancerConfiguration
    ): INetworkLoadBalancer {
        return configuration.resource;
    }

    /**
     * Configure a Network Load Balancer for the Keycloak service
     * @param endpoint Network Load Balancer for the Keycloak service
     */
    private configureNetworkEndpoint(endpoint: INetworkLoadBalancer): void {
        if (endpoint.vpc !== undefined) {
            /**
             * Traffic
             */
            const trafficListener = endpoint.addListener('TrafficListener', {
                port: this.props.ports.traffic,
                protocol: ElbProtocol.TCP
            });

            this.props.cluster.service.registerLoadBalancerTargets({
                containerName:
                    this.props.cluster.service.taskDefinition.defaultContainer!
                        .containerName,
                listener: ListenerConfig.networkListener(trafficListener, {
                    port: this.props.ports.traffic
                }),
                newTargetGroupId: 'TrafficWorkers',
                containerPort: KeycloakCluster.Defaults.containerTrafficPort,
                protocol: Protocol.TCP
            });

            /**
             * Management
             */
            if (this.props.ports.management) {
                const managementListener = endpoint.addListener(
                    'ManagementListener',
                    {
                        port: this.props.ports.management,
                        protocol: ElbProtocol.TCP
                    }
                );

                this.props.cluster.service.registerLoadBalancerTargets({
                    containerName:
                        this.props.cluster.service.taskDefinition
                            .defaultContainer!.containerName,
                    listener: ListenerConfig.networkListener(
                        managementListener,
                        {
                            port: this.props.ports.management
                        }
                    ),
                    newTargetGroupId: 'ManagementWorkers',
                    containerPort:
                        KeycloakCluster.Defaults.containerManagementPort,
                    protocol: Protocol.TCP
                });
            }
        } else {
            Annotations.of(this).addError(
                'Imported load balancer must have a VPC specified'
            );
        }
    }

    /**
     * Configure an Application Load Balancer for the Keycloak service
     * @param certificate TLS certificate to use for SSL termination on the load balancer for the default Keycloak endpoints
     * @param managementCertificate TLS certificate to use for SSL termination on the load balancer for the management Keycloak endpoint
     * @param endpoint Application Load Balancer for the Keycloak service
     */
    private configureApplicationEndpoint(
        endpoint: IApplicationLoadBalancer,
        certificate: ICertificate,
        managementCertificate?: ICertificate
    ): void {
        if (endpoint.vpc !== undefined) {
            /**
             * Traffic
             */
            const trafficListener = endpoint.addListener('TrafficListener', {
                port: this.props.ports.traffic,
                certificates: [certificate],
                protocol: ApplicationProtocol.HTTPS
            });

            this.props.cluster.service.registerLoadBalancerTargets({
                containerName:
                    this.props.cluster.service.taskDefinition.defaultContainer!
                        .containerName,
                listener: ListenerConfig.applicationListener(trafficListener, {
                    healthCheck: {
                        healthyHttpCodes: '200,302'
                    },
                    port: this.props.ports.traffic,
                    protocol: ApplicationProtocol.HTTPS
                }),
                newTargetGroupId: 'TrafficWorkers',
                containerPort: KeycloakCluster.Defaults.containerTrafficPort,
                protocol: Protocol.TCP
            });

            /**
             * Management
             */
            if (this.props.ports.management) {
                if (!managementCertificate) {
                    Annotations.of(this).addError(
                        'Must specify a TLS certificate to use for the management endpoint when it is enabled'
                    );
                }

                const managementListener = endpoint.addListener(
                    'ManagementListener',
                    {
                        port: this.props.ports.management,
                        certificates: [managementCertificate ?? certificate],
                        protocol: ApplicationProtocol.HTTPS
                    }
                );

                this.props.cluster.service.registerLoadBalancerTargets({
                    containerName:
                        this.props.cluster.service.taskDefinition
                            .defaultContainer!.containerName,
                    listener: ListenerConfig.applicationListener(
                        managementListener,
                        {
                            port: this.props.ports.management,
                            protocol: ApplicationProtocol.HTTPS
                        }
                    ),
                    newTargetGroupId: 'ManagementWorkers',
                    containerPort:
                        KeycloakCluster.Defaults.containerManagementPort,
                    protocol: Protocol.TCP
                });
            }
        } else {
            Annotations.of(this).addError(
                'Imported load balancer must have a VPC specified'
            );
        }
    }

    /**
     * Add a DNS record that points hostnames to the load balancer
     * @param endpoint Load balancer for the Keycloak service
     * @returns Custom DNS name if applicable
     */
    private configureEndpointDns(
        endpoint: INetworkLoadBalancer | IApplicationLoadBalancer
    ): void {
        if (this.props.configuration?.dnsZoneName) {
            const zone = HostedZone.fromLookup(this, 'Zone', {
                domainName: this.props.configuration.dnsZoneName
            });

            new ARecord(this, 'DefaultHostDnsRecord', {
                target: RecordTarget.fromAlias(
                    new LoadBalancerTarget(endpoint)
                ),
                zone: zone,
                recordName: this.props.appConfiguration.hostnames.default
            });

            if (this.props.appConfiguration.hostnames.admin) {
                new ARecord(this, 'AdminHostDnsRecord', {
                    target: RecordTarget.fromAlias(
                        new LoadBalancerTarget(endpoint)
                    ),
                    zone: zone,
                    recordName: this.props.appConfiguration.hostnames.admin
                });
            }
        }
    }
}

export namespace KeycloakFabric {
    /**
     * Default configuration options
     */
    export namespace Defaults {
        /**
         * Port to serve default HTTPS web traffic
         */
        export const trafficPort = 443;

        /**
         * Relative path to serve management content
         *
         * Equivalent to /
         */
        export const managementPath = '';
    }

    /**
     * Type of load balancer used for the fabric
     */
    export type LoadBalancerType = 'app' | 'net';

    /**
     * Infrastructure related to the fabric
     */
    export interface Infrastructure {
        /**
         * Load balancer for managing requests in the networking fabric
         */
        readonly loadBalancer: IApplicationLoadBalancer | INetworkLoadBalancer;

        /**
         * Type of load balancer used for the fabric
         */
        readonly type: LoadBalancerType;
    }
}
