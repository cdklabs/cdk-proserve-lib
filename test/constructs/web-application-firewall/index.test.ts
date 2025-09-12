// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Key } from 'aws-cdk-lib/aws-kms';
import * as logs from 'aws-cdk-lib/aws-logs';
import { beforeEach, it, expect } from 'vitest';
import { WebApplicationFirewall } from '../../../src/constructs/web-application-firewall';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

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

    it('creates WAF with CloudWatch metrics and sampled requests enabled', () => {
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

    it('creates WAF with no rules', () => {
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

    it('creates WAF with visibility config', () => {
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

    it('creates basic WAF with default configuration', () => {
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

    it('creates WAF with AWS managed rules', () => {
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

    it('creates WAF with logging configuration', () => {
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

    it('associates WAF with ALB', () => {
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

    it('creates WAF with rule overrides', () => {
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
});
