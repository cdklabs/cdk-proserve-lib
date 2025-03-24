// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { IAspect, Stack } from 'aws-cdk-lib';
import { MethodLoggingLevel } from 'aws-cdk-lib/aws-apigateway';
import { CfnPolicy } from 'aws-cdk-lib/aws-iam';
import { IConstruct } from 'constructs';
import { Settings, Suppressions } from './types';
import {
    CdkNagMetadata,
    CdkNagRulesToSuppress,
    CdkNagSuppression
} from './types/cdk-nag';
import * as v from './visitors';
import { VisitorRegistry } from './visitors/registry';

export interface SecurityComplianceProps {
    /**
     * Settings for the aspect
     */
    readonly settings?: Settings;
    /**
     * Suppressions to add for CDK Nag. You must add your own reasoning to each
     * suppression. These helpers have been created for common nag suppression
     * use-cases. It is recommended to review the suppressions that are added
     * and ensure that they adhere to your organizational level of acceptance.
     *
     * If you are not using CDK Nag or do not want to use any suppressions, you
     * can ignore this property.
     */
    readonly suppressions?: Suppressions;
}

/**
 * Applies best practice security settings to be in compliance with security
 * tools such as CDK Nag.
 */
export class SecurityCompliance implements IAspect {
    /**
     * Settings for the aspect
     */
    private readonly settings: Settings;
    /**
     * Suppressions for the aspect
     */
    private readonly suppressions?: Suppressions;

    private readonly vr = new VisitorRegistry();

    constructor(props?: SecurityComplianceProps) {
        // set defaults
        this.settings = {
            ...props?.settings,
            apigateway: {
                stageMethodLogging: {
                    loggingLevel:
                        props?.settings?.apigateway?.stageMethodLogging
                            ?.loggingLevel ?? MethodLoggingLevel.ERROR,
                    disabled:
                        props?.settings?.apigateway?.stageMethodLogging
                            ?.disabled ?? false
                }
            },
            lambda: {
                reservedConcurrentExecutions: {
                    concurrentExecutionCount:
                        props?.settings?.lambda?.reservedConcurrentExecutions
                            ?.concurrentExecutionCount ?? 1,
                    disabled:
                        props?.settings?.lambda?.reservedConcurrentExecutions
                            ?.disabled ?? false
                }
            }
        };
        this.suppressions = props?.suppressions;

        this.registerVisitors();
    }

    private registerVisitors(): void {
        this.vr.register(new v.ApiGatewayVisitor(this.settings.apigateway));
        this.vr.register(new v.DynamoDbVisitor(this.settings.dynamodb));
        this.vr.register(new v.EcsClusterVisitor(this.settings.ecs));
        this.vr.register(new v.LambdaVisitor(this.settings.lambda));
        this.vr.register(new v.S3Visitor(this.settings.s3));
        this.vr.register(
            new v.StepFunctionsVisitor(this.settings.stepFunctions)
        );
    }

    /**
     * Apply the aspect to the node
     */
    public visit(node: IConstruct): void {
        this.vr.visitNode(node);

        if (this.suppressions) {
            if (Stack.isStack(node)) {
                this.applyStackSuppressions(node);
            }

            if (this.suppressions.cdkGeneratedLambdas) {
                if (node instanceof CfnPolicy) {
                    this.applyCdkGeneratedSuppressions(node);
                }
            }
        }
    }

    private applyCdkGeneratedSuppressions(resource: CfnPolicy) {
        if (
            resource.node.path.includes('/framework-') ||
            resource.node.path.includes('/waiter-state-machine/') ||
            resource.node.path.includes(
                '/LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8a'
            )
        ) {
            if (this.suppressions?.cdkGeneratedLambdas) {
                const existingMetadata = resource.getMetadata('cdk_nag') as
                    | CdkNagRulesToSuppress
                    | undefined;

                const suppressions = [
                    ...(existingMetadata?.rules_to_suppress ?? [])
                ];

                if (resource instanceof CfnPolicy) {
                    suppressions.push({
                        id: 'AwsSolutions-IAM5',
                        reason: this.suppressions.cdkGeneratedLambdas
                    });
                }

                resource.addMetadata('cdk_nag', {
                    rules_to_suppress: suppressions
                });
            }
        }
    }

    /**
     * Apply suppressions to a stack
     */
    private applyStackSuppressions(stack: Stack): void {
        const suppressions: CdkNagSuppression[] = [];

        const existingMetadata = stack.templateOptions.metadata as
            | CdkNagMetadata
            | undefined;
        const existingRules = existingMetadata?.cdk_nag?.rules_to_suppress;

        if (this.suppressions?.iamCommonCdkGrants) {
            suppressions.push({
                id: 'AwsSolutions-IAM5',
                reason: this.suppressions.iamCommonCdkGrants,
                appliesTo: [
                    'Action::kms:ReEncrypt*',
                    'Action::kms:GenerateDataKey*',
                    'Action::s3:GetBucket*',
                    'Action::s3:GetObject*',
                    'Action::s3:List*',
                    'Action::s3:DeleteObject*',
                    'Action::s3:Abort*'
                ]
            });
        }
        if (this.suppressions?.iamNoInlinePolicies) {
            suppressions.push({
                id: 'NIST.800.53.R5-IAMNoInlinePolicy',
                reason: this.suppressions.iamNoInlinePolicies
            });
        }

        if (this.suppressions?.lambdaNoDlq) {
            suppressions.push({
                id: 'NIST.800.53.R5-LambdaDLQ',
                reason: this.suppressions.lambdaNoDlq
            });
        }

        if (this.suppressions?.lambdaNotInVpc) {
            suppressions.push({
                id: 'NIST.800.53.R5-LambdaInsideVPC',
                reason: this.suppressions.lambdaNotInVpc
            });
        }

        if (this.suppressions?.s3BucketReplication) {
            suppressions.push({
                id: 'NIST.800.53.R5-S3BucketReplicationEnabled',
                reason: this.suppressions.s3BucketReplication
            });
        }

        stack.addMetadata('cdk_nag', {
            rules_to_suppress: [...(existingRules ?? []), ...suppressions]
        });
    }
}
