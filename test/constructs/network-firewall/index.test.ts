/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

import fs from 'fs';
import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Subnet, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { NetworkFirewall } from '../../../src/constructs/network-firewall/index';
import {
    getTemplateWithCdkNag,
    validateNoCdkNagFindings
} from '../../../utilities/cdk-nag-jest';
import { mockSuricataRulesCapacity, mockSuricataRulesPath } from './fixtures';

const originalReadFileSync = fs.readFileSync;

const constructName = 'NetworkFirewall';

describe(constructName, () => {
    let stack: Stack;
    let vpc: Vpc;
    let publicSubnets: Subnet[];
    let firewallSubnets: Subnet[];
    let protectedSubnets: Subnet[];

    beforeEach(() => {
        stack = new Stack();
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
        validateNoCdkNagFindings(stack, constructName);
        jest.restoreAllMocks();
    });

    it('creates a Network Firewall with basic configuration', () => {
        new NetworkFirewall(stack, constructName, {
            suricataRulesFilePath: mockSuricataRulesPath,
            suricataRulesCapacity: mockSuricataRulesCapacity,
            vpc,
            firewallSubnets
        });

        const template = getTemplateWithCdkNag(stack);

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

        new NetworkFirewall(stack, constructName, {
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

        const template = getTemplateWithCdkNag(stack);

        template.hasResourceProperties('AWS::Logs::LogGroup', {
            RetentionInDays: 7
        });

        template.hasResourceProperties(
            'AWS::NetworkFirewall::LoggingConfiguration',
            {
                FirewallArn: {
                    'Fn::GetAtt': [
                        Match.stringLikeRegexp(constructName),
                        'FirewallArn'
                    ]
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
        new NetworkFirewall(stack, constructName, {
            suricataRulesFilePath: mockSuricataRulesPath,
            suricataRulesCapacity: mockSuricataRulesCapacity,
            vpc,
            firewallSubnets,
            configureVpcRoutes: {
                protectedSubnets,
                returnSubnets: publicSubnets
            }
        });

        const template = getTemplateWithCdkNag(stack);

        template.hasResourceProperties('Custom::AWS', {
            ServiceToken: {
                'Fn::GetAtt': [Match.stringLikeRegexp('AWS'), 'Arn']
            },
            Create: Match.stringLikeRegexp(constructName),
            Update: Match.stringLikeRegexp(constructName)
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

        new NetworkFirewall(stack, constructName, {
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

        const template = getTemplateWithCdkNag(stack);

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
