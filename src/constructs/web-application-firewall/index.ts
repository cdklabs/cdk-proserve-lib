// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { RemovalPolicy } from 'aws-cdk-lib';
import { ApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import {
    CfnLoggingConfiguration,
    CfnWebACL,
    CfnWebACLAssociation
} from 'aws-cdk-lib/aws-wafv2';
import { Construct } from 'constructs';
import { DefaultConfig } from '../../common/default-config';

export interface WebApplicationFirewallProps {
    /**
     * List of AWS Managed Rule Groups to use for the firewall
     * @default []
     */
    readonly awsManagedRuleGroups?: (
        | WebApplicationFirewall.AwsManagedRuleGroupConfig
        | WebApplicationFirewall.AwsManagedRuleGroup
    )[];

    /**
     * Whether to enable CloudWatch metrics
     * @default false
     */
    readonly cloudWatchMetricsEnabled?: boolean;

    /**
     * Whether to enable sampled requests
     * @default false
     */
    readonly sampledRequestsEnabled?: boolean;

    /**
     * Logging configuration for the firewall
     */
    readonly logging?: WebApplicationFirewall.WebApplicationFirewallLoggingConfig;
}

/**
 * WebApplicationFirewall construct represents a WAF (Web Application Firewall)
 * that can be associated with AWS resources like Application Load Balancers.
 * It allows configuring AWS managed rule groups, logging, and visibility settings.
 */
export class WebApplicationFirewall extends Construct {
    /**
     * The WAF Web ACL (Access Control List) resource
     */
    public readonly webAcl: CfnWebACL;

    /**
     * Optional CloudWatch log group for WAF logging. This is available if you
     * have configured `logging` on the construct.
     */
    public readonly logGroup?: LogGroup;

    /**
     * Configuration properties for WAF visibility settings including
     * CloudWatch metrics and sampled requests
     */
    private readonly visibilityConfigProps: {
        cloudWatchMetricsEnabled: boolean;
        sampledRequestsEnabled: boolean;
    };

    constructor(
        scope: Construct,
        id: string,
        props: WebApplicationFirewallProps = {}
    ) {
        super(scope, id);

        this.visibilityConfigProps = {
            cloudWatchMetricsEnabled: props.cloudWatchMetricsEnabled ?? false,
            sampledRequestsEnabled: props.sampledRequestsEnabled ?? false
        };

        const rules = this.buildRules(props.awsManagedRuleGroups ?? []);

        // Create WAF
        this.webAcl = new CfnWebACL(this, 'WebACL', {
            defaultAction: {
                allow: {}
            },
            scope: 'REGIONAL',
            visibilityConfig: {
                metricName: 'Allowed',
                ...this.visibilityConfigProps
            },
            rules
        });

        // Configure Logging
        if (props.logging) {
            this.logGroup = new LogGroup(this, 'LogGroup', {
                retention:
                    props.logging.retention ?? DefaultConfig.logRetention,
                removalPolicy:
                    props.logging.removalPolicy ?? DefaultConfig.removalPolicy,
                encryptionKey: props.logging.encryptionKey,
                logGroupName: `aws-waf-logs-${props.logging.logGroupNameAffix}`
                // NOTE: log group name must be prefixed with aws-waf-logs-
            });

            new CfnLoggingConfiguration(this, 'LoggingConfiguration', {
                resourceArn: this.webAcl.attrArn,
                logDestinationConfigs: [this.logGroup.logGroupArn]
            });
        }
    }

    /**
     * Associates the Web Application Firewall to an applicable resource.
     */
    public associate(resource: ApplicationLoadBalancer): void {
        if (resource instanceof ApplicationLoadBalancer) {
            new CfnWebACLAssociation(this, 'WebAclAssociation', {
                resourceArn: resource.loadBalancerArn,
                webAclArn: this.webAcl.attrArn
            });
        } else {
            throw new Error('Resource type not supported for WAF attachment.');
        }
    }

    /**
     * Gets the corresponding RuleActionProperty for a given override action
     * @param action - The override action to convert
     * @returns The corresponding CfnWebACL.RuleActionProperty
     */
    private getOverrideActionProperty(
        action: WebApplicationFirewall.OverrideAction
    ): CfnWebACL.RuleActionProperty {
        const actionProperties: Record<
            WebApplicationFirewall.OverrideAction,
            CfnWebACL.RuleActionProperty
        > = {
            [WebApplicationFirewall.OverrideAction.ALLOW]: { allow: {} },
            [WebApplicationFirewall.OverrideAction.BLOCK]: { block: {} },
            [WebApplicationFirewall.OverrideAction.COUNT]: { count: {} }
        };
        return actionProperties[action];
    }

    /**
     * Builds WAF rules from the provided AWS managed rule groups
     * @param awsManagedRuleGroups - Array of rule group configurations or predefined rule groups
     * @returns Array of WAF rule properties
     */
    private buildRules(
        awsManagedRuleGroups: (
            | WebApplicationFirewall.AwsManagedRuleGroupConfig
            | WebApplicationFirewall.AwsManagedRuleGroup
        )[]
    ): CfnWebACL.RuleProperty[] {
        const rules: CfnWebACL.RuleProperty[] = [];
        let priority = 10;

        for (const managedRuleGroup of awsManagedRuleGroups) {
            let name: string;
            let overrides: CfnWebACL.RuleActionOverrideProperty[] | undefined;

            if (this.isAwsManagedRuleGroupConfig(managedRuleGroup)) {
                name = managedRuleGroup.ruleGroup;
                overrides = managedRuleGroup.ruleGroupActionOverrides?.map(
                    (override) => ({
                        name: override.name,
                        actionToUse: this.getOverrideActionProperty(
                            override.action
                        )
                    })
                );
            } else {
                name = managedRuleGroup;
            }

            rules.push({
                name,
                priority,
                overrideAction: { none: {} },
                statement: {
                    managedRuleGroupStatement: {
                        name,
                        vendorName: 'AWS',
                        ruleActionOverrides: overrides
                    }
                },
                visibilityConfig: {
                    metricName: name,
                    ...this.visibilityConfigProps
                }
            });

            priority += 10;
        }

        return rules;
    }

    /**
     * Type guard to determine if a rule is an AwsManagedRuleGroupConfig
     * @param rule - The rule to check, can be either AwsManagedRuleGroupConfig or AwsManagedRuleGroup
     * @returns True if the rule is an AwsManagedRuleGroupConfig, false otherwise
     */
    private isAwsManagedRuleGroupConfig(
        rule:
            | WebApplicationFirewall.AwsManagedRuleGroupConfig
            | WebApplicationFirewall.AwsManagedRuleGroup
    ): rule is WebApplicationFirewall.AwsManagedRuleGroupConfig {
        return (
            (rule as WebApplicationFirewall.AwsManagedRuleGroupConfig)
                .ruleGroup !== undefined
        );
    }
}

export namespace WebApplicationFirewall {
    export interface WebApplicationFirewallLoggingConfig {
        /**
         * Log Group name affix to be appended to aws-waf-logs-<affix>
         */
        readonly logGroupNameAffix: string;

        /**
         * Retention period for the log group
         * @default ONE_MONTH
         */
        readonly retention?: RetentionDays;

        /**
         * Removal policy for the log group
         * @default DESTROY
         */
        readonly removalPolicy?: RemovalPolicy;

        /**
         * KMS key to use for encryption of the log group
         */
        readonly encryptionKey?: Key;
    }

    /** WAF Managed Rule Groups */
    export enum AwsManagedRuleGroup {
        /** Contains rules that are generally applicable to web applications. This provides protection against exploitation of a wide range of vulnerabilities, including those described in OWASP publications. */
        COMMON_RULE_SET = 'AWSManagedRulesCommonRuleSet',

        /** Contains rules that allow you to block external access to exposed admin pages. This may be useful if you are running third-party software or would like to reduce the risk of a malicious actor gaining administrative access to your application. */
        ADMIN_PROTECTION_RULE_SET = 'AWSManagedRulesAdminProtectionRuleSet',

        /** Contains rules that allow you to block request patterns that are known to be invalid and are associated with exploitation or discovery of vulnerabilities. This can help reduce the risk of a malicious actor discovering a vulnerable application. */
        KNOWN_BAD_INPUTS_RULE_SET = 'AWSManagedRulesKnownBadInputsRuleSet',

        /** Contains rules that allow you to block request patterns associated with exploitation of SQL databases, like SQL injection attacks. This can help prevent remote injection of unauthorized queries. */
        SQL_DATABASE_RULE_SET = 'AWSManagedRulesSQLiRuleSet',

        /** Contains rules that block request patterns associated with exploitation of vulnerabilities specific to Linux, including LFI attacks. This can help prevent attacks that expose file contents or execute code for which the attacker should not have had access. */
        LINUX_RULE_SET = 'AWSManagedRulesLinuxRuleSet',

        /** Contains rules that block request patterns associated with exploiting vulnerabilities specific to POSIX/POSIX-like OS, including LFI attacks. This can help prevent attacks that expose file contents or execute code for which access should not been allowed. */
        UNIX_RULE_SET = 'AWSManagedRulesUnixRuleSet',

        /** Contains rules that block request patterns associated with exploiting vulnerabilities specific to Windows, (e.g., PowerShell commands). This can help prevent exploits that allow attacker to run unauthorized commands or execute malicious code. */
        WINDOWS_RULE_SET = 'AWSManagedRulesWindowsRuleSet',

        /** Contains rules that block request patterns associated with exploiting vulnerabilities specific to the use of the PHP, including injection of unsafe PHP functions. This can help prevent exploits that allow an attacker to remotely execute code or commands. */
        PHP_RULE_SET = 'AWSManagedRulesPHPRuleSet',

        /** The WordPress Applications group contains rules that block request patterns associated with the exploitation of vulnerabilities specific to WordPress sites. */
        WORD_PRESS_RULE_SET = 'AWSManagedRulesWordPressRuleSet',

        /** This group contains rules that are based on Amazon threat intelligence. This is useful if you would like to block sources associated with bots or other threats. */
        AMAZON_IP_REPUTATION_LIST = 'AWSManagedRulesAmazonIpReputationList',

        /** This group contains rules that allow you to block requests from services that allow obfuscation of viewer identity. This can include request originating from VPN, proxies, Tor nodes, and hosting providers. This is useful if you want to filter out viewers that may be trying to hide their identity from your application. */
        ANONYMOUS_IP_LIST = 'AWSManagedRulesAnonymousIpList',

        /** Provides protection against automated bots that can consume excess resources, skew business metrics, cause downtime, or perform malicious activities. Bot Control provides additional visibility through Amazon CloudWatch and generates labels that you can use to control bot traffic to your applications. */
        BOT_CONTROL_RULE_SET = 'AWSManagedRulesBotControlRuleSet',

        /** Provides protection for your login page against stolen credentials, credential stuffing attacks, brute force login attempts, and other anomalous login activities. With account takeover prevention, you can prevent unauthorized access that may lead to fraudulent activities, or inform legitimate users to take a preventive action. */
        ATP_RULE_SET = 'AWSManagedRulesATPRuleSet',

        /** Provides protection against the creation of fraudulent accounts on your site. Fraudulent accounts can be used for activities such as obtaining sign-up bonuses and impersonating legitimate users. */
        ACFP_RULE_SET = 'AWSManagedRulesACFPRuleSet'
    }
    /** End WAF Managed Rule Groups */

    /**
     * Enum representing possible override actions for WAF rules
     */
    export enum OverrideAction {
        ALLOW = 'ALLOW',
        BLOCK = 'BLOCK',
        COUNT = 'COUNT'
    }

    /**
     * Configuration for rule overrides
     */
    export interface OverrideConfig {
        /**
         * The name of the specific rule to override
         */
        readonly name: string;

        /**
         * The action to take for the specific rule
         */
        readonly action: OverrideAction;
    }

    /**
     * Configuration interface for AWS Managed Rule Groups
     *
     * This interface allows you to specify a managed rule group and optionally
     * override the default actions for specific rules within that group.
     */
    export interface AwsManagedRuleGroupConfig {
        /**
         * The AWS Managed Rule Group to apply
         */
        readonly ruleGroup: AwsManagedRuleGroup;

        /**
         * Optional list of rule action overrides
         */
        readonly ruleGroupActionOverrides?: OverrideConfig[];
    }
}
