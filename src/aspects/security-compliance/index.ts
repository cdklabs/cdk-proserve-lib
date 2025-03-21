// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { IAspect, Stack } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';
import { CfnFunction } from 'aws-cdk-lib/aws-lambda';
import { CfnCluster, ContainerInsights } from 'aws-cdk-lib/aws-ecs';
import { Bucket, CfnBucket, IBucket } from 'aws-cdk-lib/aws-s3';
import { CfnTable } from 'aws-cdk-lib/aws-dynamodb';
import { CfnStateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { CfnPolicy } from 'aws-cdk-lib/aws-iam';
import { CfnStage, MethodLoggingLevel } from 'aws-cdk-lib/aws-apigateway';

interface CdkNagRulesToSuppress {
    rules_to_suppress: {
        id: string;
        reason: string;
    }[];
}

interface CdkNagMetadata {
    cdk_nag?: CdkNagRulesToSuppress;
}

export interface DisableableSetting {
    /**
     * Sets the setting to disabled. This does not actually make an impact on
     * the setting itself, it just stops this aspect from making changes to
     * the specific setting.
     */
    readonly disabled?: boolean;
}

export interface ReservedConcurrentSettings extends DisableableSetting {
    /**
     * The number of reserved concurrency executions.
     *
     * Defaults to 1 if not specified.
     */
    readonly concurrentExecutionCount?: number;
}

export interface LambdaSettings {
    /**
     * Enables reserved concurrent executions for Lambda Functions.
     *
     * Resolves:
     *   - NIST.800.53.R5-LambdaConcurrency
     *
     * Defaults to 1 if not disabled or set.
     */
    readonly reservedConcurrentExecutions?: ReservedConcurrentSettings;
}

export interface EcsSettings {
    /**
     * Enables container insights for ECS clusters.
     *
     * Resolves:
     *   - AwsSolutions-ECS4
     *
     * Defaults to ContainerInsights.ENABLED if not disabled.
     */
    readonly clusterContainerInsights?: DisableableSetting;
}

export interface DynamoDbSettings {
    /**
     * Enables Point-in-Time Recovery for DynamoDB tables
     *
     * Resolves:
     *   - AwsSolutions-DDB3
     *
     * Defaults to true if not disabled.
     */
    readonly pointInTimeRecovery?: DisableableSetting;
}

export interface ServerAccessLogsProps {
    /**
     * The bucket where server access logs will be sent. This must be configured
     * with the correct permissions to allow the target bucket to receive logs.
     *
     * If not specified, server access logs will not be enabled.
     *
     * @see https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-server-access-logging.html
     */
    readonly destinationBucketName: string;
}

export interface S3Settings {
    /**
     * Enable server access logs to a destination S3 bucket. Since this requires
     * a destination S3 bucket, it is not set by default. You must set a target
     * S3 bucket to enable access logs.
     *
     * Resolves:
     *   - AwsSolutions-S1
     *   - NIST.800.53.R5-S3BucketLoggingEnabled
     */
    readonly serverAccessLogs?: ServerAccessLogsProps;

    /**
     * Enables versioning for S3 buckets.
     *
     * Resolves:
     *   - NIST.800.53.R5-S3BucketVersioningEnabled
     *
     * Defaults to true if not disabled.
     */
    readonly versioning?: DisableableSetting;
}

export interface StepFunctionsSettings {
    /**
     * Enable or disable X-Ray tracing
     *
     * Resolves:
     *   - AwsSolutions-SF2
     *
     * Defaults to true if not specified.
     */
    readonly xRayTracing?: DisableableSetting;
}

export interface StageMethodLogging extends DisableableSetting {
    /**
     * The logging level to use for the stage method logging. This applies to
     * all resources and methods in all stages.
     *
     * Defaults to MethodLoggingLevel.ERROR if not specified.
     */
    readonly loggingLevel?: MethodLoggingLevel;
}

export interface ApiGatewaySettings {
    /**
     * Enable or disable CloudWatch logging for API Gateway stages.
     *
     * Resolves:
     *   - AwsSolutions-APIG6
     *
     * Defaults to log all errors if not specified or disabled.
     */
    readonly stageMethodLogging?: StageMethodLogging;
}

export interface Settings {
    readonly apigateway?: ApiGatewaySettings;
    readonly dynamodb?: DynamoDbSettings;
    readonly lambda?: LambdaSettings;
    readonly ecs?: EcsSettings;
    readonly s3?: S3Settings;
    readonly stepFunctions?: StepFunctionsSettings;
}

export interface Suppressions {
    /**
     * Suppressions to add for CDK Nag on CDK generated policies. If set to true,
     * this will add a stack suppression for `AwsSolutions-IAM5` on the actions
     * that CDK commonly generates when using `.grant(...)` methods.
     */
    readonly iamCommonCdkGrants?: string;

    /**
     * Adds a stack suppression for `NIST.800.53.R5-IAMNoInlinePolicy`. CDK
     * commonly uses inline policies when adding permissions.
     */
    readonly iamNoInlinePolicies?: string;

    /**
     * Suppressions to add for CDK Nag on CDK generated Lambdas. If set to true,
     * this will suppress `AwsSolutions-IAM5` on the policies that are auto
     * created by CDK Generated Lambda functions.
     */
    readonly cdkGeneratedLambdas?: string;

    /**
     * Adds a stack suppression for `NIST.800.53.R5-LambdaDLQ`.
     */
    readonly lambdaNoDlq?: string;

    /**
     * Adds a stack suppression for `NIST.800.53.R5-LambdaInsideVPC`.
     */
    readonly lambdaNotInVpc?: string;

    // readonly s3ServerAccessLogs?: string;

    /**
     * Adds a stack suppression for `NIST.800.53.R5-S3BucketReplicationEnabled`.
     */
    readonly s3BucketReplication?: string;
}

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

    /**
     * Mapping of log bucket imports for each CDK stack
     */
    private readonly accessLogBucket = new Map<string, IBucket>();

    constructor(props?: SecurityComplianceProps) {
        // set defaults
        this.settings = {
            ...props?.settings,
            apigateway: {
                stageMethodLogging: {
                    loggingLevel:
                        props?.settings?.apigateway?.stageMethodLogging
                            ?.loggingLevel ?? MethodLoggingLevel.ERROR
                }
            },
            lambda: {
                reservedConcurrentExecutions: {
                    concurrentExecutionCount:
                        props?.settings?.lambda?.reservedConcurrentExecutions
                            ?.concurrentExecutionCount ?? 1
                }
            }
        };
        this.suppressions = props?.suppressions;
    }

    /**
     * Apply the aspect to the node
     */
    public visit(node: IConstruct): void {
        if (node instanceof CfnFunction) {
            this.applyLambdaSettings(node);
        }

        if (node instanceof CfnCluster) {
            this.applyEcsClusterSettings(node);
        }

        if (node instanceof CfnBucket) {
            this.applyS3Settings(node);
        }

        if (node instanceof CfnTable) {
            this.applyDynamoDBSettings(node);
        }

        if (node instanceof CfnStateMachine) {
            this.applyStepFunctionsSettings(node);
        }

        if (node instanceof CfnStage) {
            this.applyApiGatewayStageSettings(node);
        }

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
        const suppressions = [];

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

    private applyApiGatewayStageSettings(r: CfnStage): void {
        if (
            !this.settings.apigateway?.stageMethodLogging?.disabled &&
            !r.methodSettings
        ) {
            r.methodSettings = [
                {
                    loggingLevel:
                        this.settings.apigateway?.stageMethodLogging
                            ?.loggingLevel,
                    httpMethod: '*',
                    resourcePath: '/*',
                    dataTraceEnabled: false
                }
            ];
        }
    }

    private applyStepFunctionsSettings(r: CfnStateMachine): void {
        if (
            !this.settings.stepFunctions?.xRayTracing?.disabled &&
            !r.tracingConfiguration
        ) {
            r.tracingConfiguration = {
                enabled: true
            };
        }
    }

    /**
     * Apply DynamoDB table settings
     * @param r the DynamoDB table to apply settings to
     */
    private applyDynamoDBSettings(r: CfnTable): void {
        // Enable Point-in-Time Recovery
        if (
            !this.settings.dynamodb?.pointInTimeRecovery?.disabled &&
            !r.pointInTimeRecoverySpecification
        ) {
            r.pointInTimeRecoverySpecification = {
                pointInTimeRecoveryEnabled: true
            };
        }
    }

    /**
     * Apply settings to Lambda Functions
     * @param r the resource to apply settings to
     */
    private applyLambdaSettings(r: CfnFunction): void {
        if (
            !this.settings.lambda?.reservedConcurrentExecutions?.disabled &&
            r.reservedConcurrentExecutions === undefined
        ) {
            r.reservedConcurrentExecutions =
                this.settings.lambda?.reservedConcurrentExecutions?.concurrentExecutionCount;
        }
    }

    /**
     * Apply settings to ECS Clusters
     * @param r the resource to apply settings to
     */
    private applyEcsClusterSettings(r: CfnCluster): void {
        if (!this.settings.ecs?.clusterContainerInsights?.disabled) {
            if (!r.clusterSettings) {
                // If clusterSettings is undefined, initialize it as an array
                r.clusterSettings = [];
            } else if (!Array.isArray(r.clusterSettings)) {
                // If it's an IResolvable (non-array), set the clusterSettings
                // to an array with the IResolvable included
                r.clusterSettings = [r.clusterSettings];
            }

            // Check if containerInsights setting already exists
            const containerInsightsIndex = r.clusterSettings.findIndex(
                (setting) => {
                    if (typeof setting === 'object' && 'name' in setting) {
                        return setting.name === 'containerInsights';
                    }
                    return false;
                }
            );

            if (containerInsightsIndex < 0) {
                // Add new setting
                r.clusterSettings.push({
                    name: 'containerInsights',
                    value: ContainerInsights.ENABLED
                });
            }
        }
    }

    /**
     * Apply S3 bucket settings
     * @param r the S3 bucket to apply settings to
     */
    private applyS3Settings(r: CfnBucket): void {
        // Apply server access logging
        if (
            this.settings.s3?.serverAccessLogs?.destinationBucketName &&
            !r.loggingConfiguration
        ) {
            const stackId = Stack.of(r).stackId;
            let bucket: IBucket;
            if (!this.accessLogBucket.has(stackId)) {
                bucket = Bucket.fromBucketName(
                    r.stack,
                    'ImportedAccessLogBucket',
                    this.settings.s3.serverAccessLogs.destinationBucketName
                );
                this.accessLogBucket.set(stackId, bucket);
            } else {
                bucket = this.accessLogBucket.get(stackId)!;
            }

            r.loggingConfiguration = {
                destinationBucketName: bucket.bucketName,
                logFilePrefix: r.logicalId
            };
        }

        // Apply versioning
        if (
            !this.settings.s3?.versioning?.disabled &&
            !r.versioningConfiguration
        ) {
            r.versioningConfiguration = {
                status: 'Enabled'
            };
        }
    }
}
