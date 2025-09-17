// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { Construct } from 'constructs';
import { NetworkFirewall } from '@cdklabs/cdk-proserve-lib/constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

/**
 * CDK Stack that creates an egress network firewall with VPC routing configuration.
 * Demonstrates how to use the NetworkFirewall construct to filter outbound traffic.
 */
export class EgressNetworkFirewallStack extends Stack {
    /**
     * Creates a new EgressNetworkFirewallStack.
     * @param scope - The scope in which to define this construct
     * @param id - The scoped construct ID
     * @param props - Stack properties
     */
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const vpc = this.buildVpc();

        new NetworkFirewall(this, 'Firewall', {
            vpc,
            firewallSubnets: vpc.selectSubnets({ subnetGroupName: 'firewall' })
                .subnets,
            suricataRulesFilePath: join(
                __dirname,
                '..',
                'data',
                'egress-rules.txt'
            ),
            configureVpcRoutes: {
                protectedSubnets: vpc.selectSubnets({
                    subnetGroupName: 'protected'
                }).subnets,
                returnSubnets: vpc.selectSubnets({
                    subnetGroupName: 'public'
                }).subnets
            },
            suricataRulesCapacity: 1000
        });
    }

    /**
     * Builds a VPC with multiple subnet tiers for network firewall architecture.
     * @returns The configured VPC with public, firewall, protected, and isolated subnets
     */
    private buildVpc(): ec2.Vpc {
        const availableAzs = 2;

        const vpc = new ec2.Vpc(this, 'Network', {
            enableDnsHostnames: true,
            enableDnsSupport: true,
            ipAddresses: ec2.IpAddresses.cidr('10.10.0.0/24'),
            maxAzs: availableAzs,
            natGateways: availableAzs,
            subnetConfiguration: [
                {
                    cidrMask: 27,
                    mapPublicIpOnLaunch: false,
                    name: 'public',
                    subnetType: ec2.SubnetType.PUBLIC
                },
                {
                    cidrMask: 28,
                    name: 'firewall',
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
                },
                {
                    cidrMask: 27,
                    name: 'protected',
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED // egress route will be added to firewall
                },
                {
                    cidrMask: 27,
                    name: 'isolated',
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED
                }
            ]
        });

        // Add SSM VPC endpoints for EC2 access
        vpc.addInterfaceEndpoint('SSMEndpoint', {
            service: ec2.InterfaceVpcEndpointAwsService.SSM
        });
        vpc.addInterfaceEndpoint('SSMMessagesEndpoint', {
            service: ec2.InterfaceVpcEndpointAwsService.SSM_MESSAGES
        });
        vpc.addInterfaceEndpoint('EC2MessagesEndpoint', {
            service: ec2.InterfaceVpcEndpointAwsService.EC2_MESSAGES
        });

        return vpc;
    }
}
