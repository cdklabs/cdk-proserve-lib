import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as logs from 'aws-cdk-lib/aws-logs';
import { WebApplicationFirewall } from '../../../src/constructs/web-application-firewall';
import {
    getTemplateWithCdkNag,
    validateNoCdkNagFindings
} from '../../../utilities/cdk-nag-jest';
import { Key } from 'aws-cdk-lib/aws-kms';

const constructName = 'WebApplicationFirewall';

describe(constructName, () => {
    let stack: Stack;
    let vpc: Vpc;
    let key: Key;
    let loggingConfig: WebApplicationFirewall.WebApplicationFirewallLoggingConfig;

    beforeEach(() => {
        // Arrange
        stack = new Stack();
        vpc = new Vpc(stack, 'TestVpc');
        key = new Key(stack, 'TestKey');
        loggingConfig = {
            logGroupNameAffix: 'test-logs',
            retention: logs.RetentionDays.ONE_MONTH,
            removalPolicy: RemovalPolicy.DESTROY,
            encryptionKey: key
        };
    });

    afterEach(() => {
        validateNoCdkNagFindings(stack, constructName);
    });

    test('creates basic WAF with default configuration', () => {
        // Act
        new WebApplicationFirewall(stack, constructName, {
            logging: loggingConfig
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);
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
        new WebApplicationFirewall(stack, constructName, {
            awsManagedRuleGroups: [
                WebApplicationFirewall.AwsManagedRuleGroup.COMMON_RULE_SET,
                WebApplicationFirewall.AwsManagedRuleGroup.SQL_DATABASE_RULE_SET
            ],
            logging: loggingConfig
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);
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
        new WebApplicationFirewall(stack, constructName, {
            logging: loggingConfig
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);
        template.hasResourceProperties('AWS::Logs::LogGroup', {
            LogGroupName: 'aws-waf-logs-test-logs',
            RetentionInDays: 30
        });
        template.hasResourceProperties('AWS::WAFv2::LoggingConfiguration', {
            LogDestinationConfigs: [
                { 'Fn::GetAtt': [Match.stringLikeRegexp(constructName), 'Arn'] }
            ]
        });
    });

    test('associates WAF with ALB', () => {
        // Arrange
        const waf = new WebApplicationFirewall(stack, constructName, {
            logging: loggingConfig
        });
        const alb = new elbv2.ApplicationLoadBalancer(stack, 'TestALB', {
            vpc: vpc
        });

        // Act
        waf.associate(alb);

        // Assert
        const template = getTemplateWithCdkNag(stack);
        template.hasResourceProperties('AWS::WAFv2::WebACLAssociation', {
            ResourceArn: { Ref: Match.stringLikeRegexp('TestALB') },
            WebACLArn: {
                'Fn::GetAtt': [Match.stringLikeRegexp(constructName), 'Arn']
            }
        });
    });

    test('creates WAF with rule overrides', () => {
        // Act
        new WebApplicationFirewall(stack, constructName, {
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
        const template = getTemplateWithCdkNag(stack);
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
        const waf = new WebApplicationFirewall(stack, constructName, {
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
