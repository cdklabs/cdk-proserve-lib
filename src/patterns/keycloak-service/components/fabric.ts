// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ISubnet, IVpc } from 'aws-cdk-lib/aws-ec2';
import { ListenerConfig, Protocol } from 'aws-cdk-lib/aws-ecs';
import {
    NetworkLoadBalancer,
    Protocol as ElbProtocol
} from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { LoadBalancerTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';
import { KeycloakService } from '..';
import { KeycloakCluster } from './cluster';

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
     * Configuration for the Keycloak application
     */
    readonly appConfiguration: KeycloakService.ApplicationConfiguration;

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
     * Port on the load balancer to use for default HTTPS web traffic
     */
    private readonly trafficPort: number;

    /**
     * Port on the load balancer to use for management HTTPS web traffic
     */
    private readonly managementPort: number;

    /**
     * Create the networking fabric for the Keycloak service
     * @param scope Parent to which this construct belongs
     * @param id Unique identifier for the component
     * @param props Properties for configuring the component
     */
    constructor(scope: Construct, id: string, props: KeycloakFabricProps) {
        super(scope, id);

        this.props = props;

        this.trafficPort =
            this.props.configuration?.ports?.traffic ??
            KeycloakFabric.Defaults.trafficPort;
        this.managementPort =
            this.props.configuration?.ports?.management ??
            KeycloakFabric.Defaults.managementPort;

        const endpoint = this.buildEndpoint();
        this.configureEndpointDns(endpoint);
    }

    /**
     * Build the load balancer for the Keycloak service
     */
    private buildEndpoint(): NetworkLoadBalancer {
        const lb = new NetworkLoadBalancer(this, 'LoadBalancer', {
            vpc: this.props.vpc,
            crossZoneEnabled: true,
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
            port: this.trafficPort,
            protocol: ElbProtocol.TCP
        });

        this.props.cluster.service.registerLoadBalancerTargets({
            containerName:
                this.props.cluster.service.taskDefinition.defaultContainer!
                    .containerName,
            listener: ListenerConfig.networkListener(trafficListener, {
                port: this.trafficPort,
                healthCheck: {
                    enabled: true,
                    path: `${this.props.appConfiguration.paths?.management ?? KeycloakFabric.Defaults.managementPath}/health/live`,
                    port: this.managementPort.toString()
                }
            }),
            newTargetGroupId: 'TrafficWorkers',
            containerPort: this.props.cluster.ports.traffic,
            protocol: Protocol.TCP
        });

        /**
         * Management
         */
        const managementListener = lb.addListener('ManagementListener', {
            port: this.managementPort,
            protocol: ElbProtocol.TCP
        });

        this.props.cluster.service.registerLoadBalancerTargets({
            containerName:
                this.props.cluster.service.taskDefinition.defaultContainer!
                    .containerName,
            listener: ListenerConfig.networkListener(managementListener, {
                port: this.managementPort,
                healthCheck: {
                    enabled: true,
                    path: `${this.props.appConfiguration.paths?.management ?? KeycloakFabric.Defaults.managementPath}/health/live`,
                    port: this.managementPort.toString()
                }
            }),
            newTargetGroupId: 'ManagementWorkers',
            containerPort: this.props.cluster.ports.management,
            protocol: Protocol.TCP
        });

        return lb;
    }

    /**
     * Add a DNS record that points hostnames to the load balancer
     * @param endpoint Load balancer for the Keycloak service
     * @returns Custom DNS name if applicable
     */
    private configureEndpointDns(endpoint: NetworkLoadBalancer): void {
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
         * Port to serve management HTTPS web traffic
         */
        export const managementPort = 9006;

        /**
         * Relative path to serve management content
         *
         * Equivalent to /
         */
        export const managementPath = '';
    }
}
