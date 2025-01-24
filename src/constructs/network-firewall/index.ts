// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as fs from 'fs';
import { Aws } from 'aws-cdk-lib';
import { CfnRoute, ISubnet, IVpc } from 'aws-cdk-lib/aws-ec2';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { ILogGroup, LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import {
    CfnFirewall,
    CfnFirewallPolicy,
    CfnLoggingConfiguration,
    CfnRuleGroup
} from 'aws-cdk-lib/aws-networkfirewall';
import { Construct } from 'constructs';
import { AwsCustomResourceLambdaConfiguration } from '../../interfaces';
import { NetworkFirewallEndpoints } from '../network-firewall-endpoints';
import { LogDestinationType } from './types/cfn-network-firewall';
import { DefaultConfig } from '../../common/default-config';

/**
 * Properties for configuring a NetworkFirewall
 */
export interface NetworkFirewallProps {
    /**
     * Path to the Suricata rules file on the local file system
     */
    readonly suricataRulesFilePath: string;

    /**
     * The capacity to set for the Suricata rule group. This cannot be modified
     * after creation. You should set this to the upper bound of what you expect
     * your firewall rule group to consume.
     */
    readonly suricataRulesCapacity: number;

    /**
     * VPC where the Network Firewall will be deployed
     */
    readonly vpc: IVpc;

    /**
     * List of subnets where the Network Firewall will be placed
     * These should typically be dedicated firewall subnets
     */
    readonly firewallSubnets: ISubnet[];

    /**
     * Network Firewall routing configuration. By configuring these settings,
     * the Construct will automatically setup basic routing statements for you
     * for the provided subnets. This should be used with caution and you should
     * double check the routing is correct prior to deployment.
     */
    readonly configureVpcRoutes?: NetworkFirewall.NetworkFirewallVpcRouteProps;

    /**
     * Optional logging configuration for the Network Firewall. If not provided,
     * logs will not be written.
     */
    readonly logging?: NetworkFirewall.LoggingConfiguration;
}

/**
 * Creates an AWS Network Firewall using a user-supplied Suricata rules file in
 * a VPC.
 *
 * Follows guidelines that can be found at:
 * @see https://aws.github.io/aws-security-services-best-practices/guides/network-firewall/
 *
 * @example
 * new NetworkFirewall(this, 'Firewall', {
 *   vpc,
 *   firewallSubnets: vpc.selectSubnets({subnetGroupName: 'firewall'}).subnets,
 *   suricataRulesFilePath: './firewall-rules-suricata.txt',
 *   suricataRulesCapacity: 1000  // perform your own calculation based on the rules
 * });
 */
export class NetworkFirewall extends Construct {
    /**
     * The underlying CloudFormation Network Firewall resource
     */
    public readonly firewall: CfnFirewall;

    /**
     * Creates an AWS Network Firewall using a user-supplied Suricata rules file
     * in a VPC.
     *
     * @param scope - Parent construct scope
     * @param id - Construct ID used to generate unique resource names
     * @param props - Network Firewall configuration properties
     */
    constructor(scope: Construct, id: string, props: NetworkFirewallProps) {
        super(scope, id);

        // Read Suricata rules
        const suricataRules = fs.readFileSync(
            props.suricataRulesFilePath,
            'utf8'
        );

        // Create Suricata rule group
        const suricataRuleGroup = new CfnRuleGroup(this, 'SuricataRuleGroup', {
            capacity: props.suricataRulesCapacity,
            ruleGroupName: `${id}SuricataRuleGroup`,
            type: 'STATEFUL',
            ruleGroup: {
                rulesSource: { rulesString: suricataRules },
                statefulRuleOptions: { ruleOrder: 'STRICT_ORDER' }
            }
        });

        // Create firewall policy
        const firewallPolicy = new CfnFirewallPolicy(
            this,
            'NetworkFirewallPolicy',
            {
                firewallPolicyName: `${id}Policy`,
                firewallPolicy: {
                    statelessDefaultActions: ['aws:forward_to_sfe'],
                    statelessFragmentDefaultActions: ['aws:forward_to_sfe'],
                    statefulRuleGroupReferences: [
                        {
                            resourceArn: suricataRuleGroup.attrRuleGroupArn,
                            priority: 100
                        }
                    ],
                    statefulDefaultActions: [
                        'aws:drop_established',
                        'aws:alert_established'
                    ],
                    statefulEngineOptions: {
                        ruleOrder: 'STRICT_ORDER'
                    }
                }
            }
        );

        // Create firewall
        this.firewall = new CfnFirewall(this, 'NetworkFirewall', {
            firewallName: id,
            firewallPolicyArn: firewallPolicy.attrFirewallPolicyArn,
            vpcId: props.vpc.vpcId,
            subnetMappings: props.vpc
                .selectSubnets({ subnets: props.firewallSubnets })
                .subnets.map((subnet) => ({
                    subnetId: subnet.subnetId
                }))
        });

        if (props.logging) {
            // Create log group
            const nfwLogGroup = props.logging?.logGroup
                ? props.logging.logGroup
                : new LogGroup(this, 'LogGroup', {
                      retention: props.logging?.logRetention
                          ? props.logging.logRetention
                          : DefaultConfig.logRetention,
                      encryptionKey: props.logging.encryption
                  });

            // Configure encryption for the provided key if one was provided
            if (props.logging.encryption) {
                props.logging.encryption.addToResourcePolicy(
                    new PolicyStatement({
                        actions: [
                            'kms:Encrypt*',
                            'kms:Decrypt*',
                            'kms:ReEncrypt*',
                            'kms:GenerateDataKey*',
                            'kms:Describe*'
                        ],
                        conditions: {
                            ArnEquals: {
                                // Wildcard at the end to avoid cyclical dependency
                                'kms:EncryptionContext:aws:logs:arn': `arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:*`
                            }
                        },
                        resources: ['*'],
                        effect: Effect.ALLOW,
                        principals: [
                            new ServicePrincipal(
                                `logs.${Aws.REGION}.amazonaws.com`
                            )
                        ]
                    })
                );
            }

            // Configure logging
            const logDestinationConfigs =
                [] as CfnLoggingConfiguration.LogDestinationConfigProperty[];
            const logTypes = props.logging.logTypes;
            const logDestinationType: LogDestinationType = 'CloudWatchLogs';

            if (logTypes.includes(NetworkFirewall.LogType.ALERT)) {
                logDestinationConfigs.push({
                    logDestination: {
                        logGroup: nfwLogGroup.logGroupName
                    },
                    logDestinationType: logDestinationType,
                    logType: NetworkFirewall.LogType.ALERT
                });
            }
            if (logTypes.includes(NetworkFirewall.LogType.FLOW)) {
                logDestinationConfigs.push({
                    logDestination: {
                        logGroup: nfwLogGroup.logGroupName
                    },
                    logDestinationType: logDestinationType,
                    logType: NetworkFirewall.LogType.FLOW
                });
            }
            if (logTypes.includes(NetworkFirewall.LogType.TLS)) {
                logDestinationConfigs.push({
                    logDestination: {
                        logGroup: nfwLogGroup.logGroupName
                    },
                    logDestinationType: logDestinationType,
                    logType: NetworkFirewall.LogType.TLS
                });
            }
            new CfnLoggingConfiguration(this, 'LoggingConfiguration', {
                firewallArn: this.firewall.attrFirewallArn,
                loggingConfiguration: {
                    logDestinationConfigs: logDestinationConfigs
                }
            });
        }

        if (props.configureVpcRoutes) {
            this.configureVpcRoutes(props.configureVpcRoutes);
        }
    }

    /**
     * Configures VPC routes for the Network Firewall
     *
     * Creates routes from protected subnets to the Network Firewall endpoint for all outbound traffic (0.0.0.0/0).
     * If return subnets are specified, also creates routes from those subnets back to the protected subnets via
     * the Network Firewall endpoint.
     *
     * @param props - Configuration for VPC routing including protected subnets and optional return subnets
     */
    private configureVpcRoutes(
        props: NetworkFirewall.NetworkFirewallVpcRouteProps
    ) {
        const endpoints = new NetworkFirewallEndpoints(this, 'Endpoints', {
            firewall: this.firewall,
            lambdaConfiguration: props.lambdaConfiguration
        });

        for (let i = 0; i < props.protectedSubnets.length; i++) {
            const protectedSubnet = props.protectedSubnets[i];
            new CfnRoute(this, `FirewallRoute${i + 1}`, {
                routeTableId: protectedSubnet.routeTable.routeTableId,
                destinationCidrBlock: props.destinationCidr ?? '0.0.0.0/0',
                vpcEndpointId: endpoints.getEndpointId(
                    protectedSubnet.availabilityZone
                )
            });

            if (props.returnSubnets) {
                for (let j = 0; j < props.returnSubnets.length; j++) {
                    const returnSubnet = props.returnSubnets[j];
                    new CfnRoute(this, `FirewallReturn${i + 1}Route${j + 1}`, {
                        routeTableId: returnSubnet.routeTable.routeTableId,
                        destinationCidrBlock: protectedSubnet.ipv4CidrBlock,
                        vpcEndpointId: endpoints.getEndpointId(
                            returnSubnet.availabilityZone
                        )
                    });
                }
            }
        }
    }
}

export namespace NetworkFirewall {
    export interface LoggingConfiguration {
        /** Log group to use for Network Firewall Logging. If not specified, a log group is created for you. The encryption key provided will be used to encrypt it if one was provided to the construct. */
        readonly logGroup?: ILogGroup;

        /** If you do not specify a log group, the amount of time to keep logs in the automatically created Log Group. Default: one week */
        readonly logRetention?: RetentionDays;

        /** The type of logs to write for the Network Firewall. This can be `TLS`, `FLOW`, or `ALERT`. */
        readonly logTypes: NetworkFirewall.LogType[];

        /**
         * Optional KMS key for encrypting Network Firewall logs
         */
        readonly encryption?: IKey;
    }

    export enum LogType {
        /** Logs for events that are related to TLS inspection. For more information, see Inspecting SSL/TLS traffic with TLS inspection configurations in the Network Firewall Developer Guide . */
        TLS = 'TLS',

        /** Standard network traffic flow logs. The stateful rules engine records flow logs for all network traffic that it receives. Each flow log record captures the network flow for a specific standard stateless rule group. */
        FLOW = 'FLOW',

        /** Logs for traffic that matches your stateful rules and that have an action that sends an alert. A stateful rule sends alerts for the rule actions DROP, ALERT, and REJECT. For more information, see the StatefulRule property. */
        ALERT = 'ALERT'
    }

    export interface NetworkFirewallVpcRouteProps {
        /**
         * Subnets that will sit behind the network firewall and should have routes
         * to the Network Firewall. By supplying this parameter, routes will
         * be created for these subnets to the Network Firewall. Specify the
         * optional `destinationCidr` parameter if you want to restrict the
         * routes to a specific CIDR block. By default, routes will be created
         * for all outbound traffic (0.0.0.0/0) to the firewall.
         */
        readonly protectedSubnets: ISubnet[];

        /**
         * The destination CIDR block for the firewall (protectedSubnets) route.
         * If not specified, defaults to '0.0.0.0/0' (all IPv4 traffic).
         */
        readonly destinationCidr?: string;

        /**
         * Subnets that should have routes back to the protected subnets. Since
         * traffic is flowing through the firewall, routes should be put into the
         * subnets where traffic is returning to. This is most likely your public
         * subnets in the VPC. By supplying this parameter, routes will be created
         * that send all traffic destined for the `protectedSubnets` back to the
         * firewall for proper routing.
         */
        readonly returnSubnets?: ISubnet[];

        /**
         * Configuration for the Lambda function that will be used to retrieve info
         * about the AWS Network Firewall in order to setup the routing.
         */
        readonly lambdaConfiguration?: AwsCustomResourceLambdaConfiguration;
    }
}
