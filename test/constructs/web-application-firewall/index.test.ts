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

import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Key } from 'aws-cdk-lib/aws-kms';
import * as logs from 'aws-cdk-lib/aws-logs';
import { WebApplicationFirewall } from '../../../src/constructs/web-application-firewall';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';

describeCdkTest(WebApplicationFirewall, (id, getStack, getTemplate) => {
    let stack: Stack;
    let vpc: Vpc;
    let key: Key;
    let loggingConfig: WebApplicationFirewall.WebApplicationFirewallLoggingConfig;

    beforeEach(() => {
        // Arrange
        stack = getStack();
        vpc = new Vpc(stack, 'TestVpc');
        key = new Key(stack, 'TestKey');
        loggingConfig = {
            logGroupNameAffix: 'test-logs',
            retention: logs.RetentionDays.ONE_MONTH,
            removalPolicy: RemovalPolicy.DESTROY,
            encryptionKey: key
        };
    });

    test('creates WAF with CloudWatch metrics and sampled requests enabled', () => {
        // Act
        new WebApplicationFirewall(stack, id, {
            cloudWatchMetricsEnabled: true,
            sampledRequestsEnabled: true,
            logging: loggingConfig
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::WAFv2::WebACL', {
            VisibilityConfig: {
                CloudWatchMetricsEnabled: true,
                SampledRequestsEnabled: true
            }
        });
    });

    test('creates WAF with no rules', () => {
        // Act
        new WebApplicationFirewall(stack, id, {
            logging: loggingConfig
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::WAFv2::WebACL', {
            Rules: []
        });
    });

    test('creates WAF with visibility config', () => {
        // Act
        new WebApplicationFirewall(stack, id, {
            cloudWatchMetricsEnabled: true,
            sampledRequestsEnabled: true,
            logging: loggingConfig
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::WAFv2::WebACL', {
            VisibilityConfig: {
                CloudWatchMetricsEnabled: true,
                SampledRequestsEnabled: true
            }
        });
    });

    test('creates basic WAF with default configuration', () => {
        // Act
        new WebApplicationFirewall(stack, id, {
            logging: loggingConfig
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::WAFv2::WebACL', {
            DefaultAction: {
                Allow: {}
            },
            Scope: 'REGIONAL',
            VisibilityConfig: {
                CloudWatchMetricsEnabled: false,
                SampledRequestsEnabled: false
            }
        });
    });

    test('creates WAF with AWS managed rules', () => {
        // Act
        new WebApplicationFirewall(stack, id, {
            awsManagedRuleGroups: [
                WebApplicationFirewall.AwsManagedRuleGroup.COMMON_RULE_SET,
                WebApplicationFirewall.AwsManagedRuleGroup.SQL_DATABASE_RULE_SET
            ],
            logging: loggingConfig
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::WAFv2::WebACL', {
            Rules: [
                {
                    Name: 'AWSManagedRulesCommonRuleSet',
                    Priority: 10,
                    OverrideAction: { None: {} },
                    Statement: {
                        ManagedRuleGroupStatement: {
                            Name: 'AWSManagedRulesCommonRuleSet',
                            VendorName: 'AWS'
                        }
                    }
                },
                {
                    Name: 'AWSManagedRulesSQLiRuleSet',
                    Priority: 20,
                    OverrideAction: { None: {} },
                    Statement: {
                        ManagedRuleGroupStatement: {
                            Name: 'AWSManagedRulesSQLiRuleSet',
                            VendorName: 'AWS'
                        }
                    }
                }
            ]
        });
    });

    test('creates WAF with logging configuration', () => {
        // Act
        new WebApplicationFirewall(stack, id, {
            logging: loggingConfig
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::Logs::LogGroup', {
            LogGroupName: 'aws-waf-logs-test-logs',
            RetentionInDays: 30
        });
        template.hasResourceProperties('AWS::WAFv2::LoggingConfiguration', {
            LogDestinationConfigs: [
                { 'Fn::GetAtt': [Match.stringLikeRegexp(id), 'Arn'] }
            ]
        });
    });

    test('associates WAF with ALB', () => {
        // Arrange
        const waf = new WebApplicationFirewall(stack, id, {
            logging: loggingConfig
        });
        const alb = new elbv2.ApplicationLoadBalancer(stack, 'TestALB', {
            vpc: vpc
        });

        // Act
        waf.associate(alb);

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::WAFv2::WebACLAssociation', {
            ResourceArn: { Ref: Match.stringLikeRegexp('TestALB') },
            WebACLArn: {
                'Fn::GetAtt': [Match.stringLikeRegexp(id), 'Arn']
            }
        });
    });

    test('creates WAF with rule overrides', () => {
        // Act
        new WebApplicationFirewall(stack, id, {
            awsManagedRuleGroups: [
                {
                    ruleGroup:
                        WebApplicationFirewall.AwsManagedRuleGroup
                            .COMMON_RULE_SET,
                    ruleGroupActionOverrides: [
                        {
                            name: 'SizeRestrictions_BODY',
                            action: WebApplicationFirewall.OverrideAction.COUNT
                        }
                    ]
                }
            ],
            logging: loggingConfig
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::WAFv2::WebACL', {
            Rules: [
                {
                    Name: 'AWSManagedRulesCommonRuleSet',
                    Statement: {
                        ManagedRuleGroupStatement: {
                            RuleActionOverrides: [
                                {
                                    ActionToUse: { Count: {} },
                                    Name: 'SizeRestrictions_BODY'
                                }
                            ]
                        }
                    }
                }
            ]
        });
    });

    test('does not allow incompatible resource association', () => {
        // Arrange
        const waf = new WebApplicationFirewall(stack, id, {
            logging: loggingConfig
        });
        const nlb = new elbv2.NetworkLoadBalancer(stack, 'TestNLB', {
            vpc: vpc
        });

        // Act & Assert
        expect(() => {
            waf.associate(nlb as unknown as elbv2.ApplicationLoadBalancer);
        }).toThrow();
    });
});
