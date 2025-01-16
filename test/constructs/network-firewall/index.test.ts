// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import fs from 'fs';
import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Subnet, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { mockSuricataRulesCapacity, mockSuricataRulesPath } from './fixtures';
import { NetworkFirewall } from '../../../src/constructs/network-firewall/index';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';

const originalReadFileSync = fs.readFileSync;

describeCdkTest(NetworkFirewall, (id, getStack, getTemplate) => {
    let stack: Stack;
    let vpc: Vpc;
    let publicSubnets: Subnet[];
    let firewallSubnets: Subnet[];
    let protectedSubnets: Subnet[];

    beforeEach(() => {
        stack = getStack();
        vpc = new Vpc(stack, 'TestVpc');
        firewallSubnets = [
            new Subnet(stack, 'FirewallSubnet1', {
                vpcId: vpc.vpcId,
                availabilityZone: 'us-east-1a',
                cidrBlock: '10.0.1.0/24'
            })
        ];
        protectedSubnets = [
            new Subnet(stack, 'ProtectedSubnet1', {
                vpcId: vpc.vpcId,
                availabilityZone: 'us-east-1b',
                cidrBlock: '10.0.2.0/24'
            })
        ];
        publicSubnets = [
            new Subnet(stack, 'ReturnSubnet1', {
                vpcId: vpc.vpcId,
                availabilityZone: 'us-east-1c',
                cidrBlock: '10.0.3.0/24'
            })
        ];

        jest.spyOn(fs, 'readFileSync').mockImplementation((path, options) => {
            if (path === mockSuricataRulesPath) {
                return 'mock suricata rules';
            }
            // Call the original implementation for all other paths
            return originalReadFileSync(path, options);
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('creates a Network Firewall with basic configuration', () => {
        new NetworkFirewall(stack, id, {
            suricataRulesFilePath: mockSuricataRulesPath,
            suricataRulesCapacity: mockSuricataRulesCapacity,
            vpc,
            firewallSubnets
        });

        const template = getTemplate();

        template.hasResourceProperties('AWS::NetworkFirewall::RuleGroup', {
            Type: 'STATEFUL',
            RuleGroup: {
                RulesSource: {
                    RulesString: 'mock suricata rules'
                }
            }
        });

        template.hasResourceProperties('AWS::NetworkFirewall::FirewallPolicy', {
            FirewallPolicy: {
                StatelessDefaultActions: ['aws:forward_to_sfe'],
                StatelessFragmentDefaultActions: ['aws:forward_to_sfe'],
                StatefulDefaultActions: [
                    'aws:drop_established',
                    'aws:alert_established'
                ]
            }
        });

        template.hasResourceProperties('AWS::NetworkFirewall::Firewall', {
            VpcId: {
                Ref: Match.stringLikeRegexp('TestVpc')
            },
            SubnetMappings: [
                {
                    SubnetId: {
                        Ref: Match.stringLikeRegexp('FirewallSubnet1')
                    }
                }
            ]
        });
    });

    it('creates a Network Firewall with logging', () => {
        const kmsKey = new Key(stack, 'TestKey');

        new NetworkFirewall(stack, id, {
            suricataRulesFilePath: mockSuricataRulesPath,
            suricataRulesCapacity: mockSuricataRulesCapacity,
            vpc,
            firewallSubnets,
            logging: {
                encryption: kmsKey,
                logTypes: [
                    NetworkFirewall.LogType.ALERT,
                    NetworkFirewall.LogType.FLOW,
                    NetworkFirewall.LogType.TLS
                ]
            }
        });

        const template = getTemplate();

        template.hasResourceProperties('AWS::Logs::LogGroup', {
            RetentionInDays: 30
        });

        template.hasResourceProperties(
            'AWS::NetworkFirewall::LoggingConfiguration',
            {
                FirewallArn: {
                    'Fn::GetAtt': [Match.stringLikeRegexp(id), 'FirewallArn']
                },
                LoggingConfiguration: {
                    LogDestinationConfigs: [
                        { LogType: 'ALERT' },
                        { LogType: 'FLOW' },
                        { LogType: 'TLS' }
                    ]
                }
            }
        );
    });

    it('configures VPC routes when specified', () => {
        new NetworkFirewall(stack, id, {
            suricataRulesFilePath: mockSuricataRulesPath,
            suricataRulesCapacity: mockSuricataRulesCapacity,
            vpc,
            firewallSubnets,
            configureVpcRoutes: {
                protectedSubnets,
                returnSubnets: publicSubnets
            }
        });

        const template = getTemplate();

        template.hasResourceProperties('Custom::AWS', {
            ServiceToken: {
                'Fn::GetAtt': [Match.stringLikeRegexp('AWS'), 'Arn']
            },
            Create: Match.stringLikeRegexp(id),
            Update: Match.stringLikeRegexp(id)
        });

        template.hasResourceProperties('AWS::EC2::Route', {
            RouteTableId: {
                Ref: Match.stringLikeRegexp('ProtectedSubnet1RouteTable')
            },
            DestinationCidrBlock: '0.0.0.0/0',
            VpcEndpointId: {
                'Fn::GetAtt': [
                    Match.stringLikeRegexp('Endpoints'),
                    'FirewallStatus.SyncStates.us-east-1b.Attachment.EndpointId'
                ]
            }
        });

        template.hasResourceProperties('AWS::EC2::Route', {
            RouteTableId: {
                Ref: Match.stringLikeRegexp('ReturnSubnet1RouteTable')
            },
            DestinationCidrBlock: '10.0.2.0/24',
            VpcEndpointId: {
                'Fn::GetAtt': [
                    Match.stringLikeRegexp('Endpoints'),
                    'FirewallStatus.SyncStates.us-east-1c.Attachment.EndpointId'
                ]
            }
        });
    });

    it('uses KMS key for log encryption when provided', () => {
        const kmsKey = new Key(stack, 'TestKey');

        new NetworkFirewall(stack, id, {
            suricataRulesFilePath: mockSuricataRulesPath,
            suricataRulesCapacity: mockSuricataRulesCapacity,
            vpc,
            firewallSubnets,
            logging: {
                encryption: kmsKey,
                logTypes: [
                    NetworkFirewall.LogType.ALERT,
                    NetworkFirewall.LogType.FLOW,
                    NetworkFirewall.LogType.TLS
                ]
            }
        });

        const template = getTemplate();

        template.hasResourceProperties('AWS::Logs::LogGroup', {
            KmsKeyId: {
                'Fn::GetAtt': [Match.stringLikeRegexp('TestKey'), 'Arn']
            }
        });

        template.hasResourceProperties('AWS::KMS::Key', {
            KeyPolicy: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: [
                            'kms:Encrypt*',
                            'kms:Decrypt*',
                            'kms:ReEncrypt*',
                            'kms:GenerateDataKey*',
                            'kms:Describe*'
                        ],
                        Condition: {
                            ArnEquals: {
                                'kms:EncryptionContext:aws:logs:arn': {
                                    'Fn::Join': Match.anyValue()
                                }
                            }
                        },
                        Effect: 'Allow',
                        Principal: {
                            Service: {
                                'Fn::Join': Match.anyValue()
                            }
                        }
                    })
                ])
            }
        });
    });
});
