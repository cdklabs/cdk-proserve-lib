// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Annotations, RemovalPolicy } from 'aws-cdk-lib';
import {
    CfnSecurityGroup,
    ISubnet,
    IVpc,
    SecurityGroup
} from 'aws-cdk-lib/aws-ec2';
import { ListenerConfig, Protocol } from 'aws-cdk-lib/aws-ecs';
import {
    NetworkLoadBalancer,
    Protocol as ElbProtocol,
    ApplicationLoadBalancer,
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
     */
    readonly ingressSubnets: ISubnet[];

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

        const operateAtLayer7 =
            this.props.configuration?.layer7LoadBalancing !== undefined;

        const access = operateAtLayer7
            ? new SecurityGroup(this, 'LoadBalancerAccess', {
                  vpc: this.props.vpc
              })
            : undefined;

        const endpoint = operateAtLayer7
            ? this.buildApplicationEndpoint(
                  this.props.configuration.layer7LoadBalancing,
                  access!
              )
            : this.buildNetworkEndpoint();

        this.configureEndpointDns(endpoint);

        this.resources = {
            endpointSecurityGroup: access,
            loadBalancer: endpoint
        };
    }

    /**
     * Build the layer 4 load balancer for the Keycloak service
     */
    private buildNetworkEndpoint(): NetworkLoadBalancer {
        const lb = new NetworkLoadBalancer(this, 'LoadBalancer', {
            vpc: this.props.vpc,
            crossZoneEnabled: true,
            deletionProtection:
                this.props.removalPolicy !== RemovalPolicy.DESTROY,
            internetFacing: this.props.configuration?.internetFacing,
            vpcSubnets: {
                onePerAz: true,
                subnets: this.props.ingressSubnets
            }
        });

        /**
         * Traffic
         */
        const trafficListener = lb.addListener('TrafficListener', {
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
            const managementListener = lb.addListener('ManagementListener', {
                port: this.props.ports.management,
                protocol: ElbProtocol.TCP
            });

            this.props.cluster.service.registerLoadBalancerTargets({
                containerName:
                    this.props.cluster.service.taskDefinition.defaultContainer!
                        .containerName,
                listener: ListenerConfig.networkListener(managementListener, {
                    port: this.props.ports.management
                }),
                newTargetGroupId: 'ManagementWorkers',
                containerPort: KeycloakCluster.Defaults.containerManagementPort,
                protocol: Protocol.TCP
            });
        }

        return lb;
    }

    /**
     * Build the layer 7 load balancer for the Keycloak service
     */
    private buildApplicationEndpoint(
        configuration: KeycloakService.FabricLayer7EndpointConfiguration,
        access: SecurityGroup
    ): ApplicationLoadBalancer {
        const lb = new ApplicationLoadBalancer(this, 'LoadBalancer', {
            vpc: this.props.vpc,
            crossZoneEnabled: true,
            deletionProtection:
                this.props.removalPolicy !== RemovalPolicy.DESTROY,
            dropInvalidHeaderFields: true,
            internetFacing: this.props.configuration?.internetFacing,
            securityGroup: access,
            vpcSubnets: {
                onePerAz: true,
                subnets: this.props.ingressSubnets
            }
        });

        /**
         * Traffic
         */
        const trafficListener = lb.addListener('TrafficListener', {
            port: this.props.ports.traffic,
            certificates: [configuration.certificate],
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
            if (!configuration.managementCertificate) {
                Annotations.of(this).addError(
                    'Must specify a TLS certificate to use for the management endpoint when it is enabled'
                );
            }

            const managementListener = lb.addListener('ManagementListener', {
                port: this.props.ports.management,
                certificates: [
                    configuration.managementCertificate ??
                        configuration.certificate
                ],
                protocol: ApplicationProtocol.HTTPS
            });

            this.props.cluster.service.registerLoadBalancerTargets({
                containerName:
                    this.props.cluster.service.taskDefinition.defaultContainer!
                        .containerName,
                listener: ListenerConfig.applicationListener(
                    managementListener,
                    {
                        port: this.props.ports.management,
                        protocol: ApplicationProtocol.HTTPS
                    }
                ),
                newTargetGroupId: 'ManagementWorkers',
                containerPort: KeycloakCluster.Defaults.containerManagementPort,
                protocol: Protocol.TCP
            });
        }

        // Removes the permissive inbound rule that gets automatically added
        (access.node.defaultChild as CfnSecurityGroup).securityGroupIngress =
            undefined;

        return lb;
    }

    /**
     * Add a DNS record that points hostnames to the load balancer
     * @param endpoint Load balancer for the Keycloak service
     * @returns Custom DNS name if applicable
     */
    private configureEndpointDns(
        endpoint: ApplicationLoadBalancer | NetworkLoadBalancer
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
     * Infrastructure related to the fabric
     */
    export interface Infrastructure {
        /**
         * Load balancer for managing requests in the networking fabric
         */
        readonly loadBalancer: ApplicationLoadBalancer | NetworkLoadBalancer;

        /**
         * Access control for the Keycloak service endpoint
         */
        readonly endpointSecurityGroup?: SecurityGroup;
    }
}
