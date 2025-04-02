// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { IAspect } from 'aws-cdk-lib';
import { MethodLoggingLevel } from 'aws-cdk-lib/aws-apigateway';
import { IConstruct } from 'constructs';
import * as v from './visitors';
import { VisitorRegistry } from './visitors/registry';

export interface SecurityComplianceProps {
    /**
     * Settings for the aspect
     */
    readonly settings?: SecurityCompliance.Settings;
    /**
     * Suppressions to add for CDK Nag. You must add your own reasoning to each
     * suppression. These helpers have been created for common nag suppression
     * use-cases. It is recommended to review the suppressions that are added
     * and ensure that they adhere to your organizational level of acceptance.
     * Each suppression must be supplied with a reason for the suppression as
     * a string to each suppression property.
     *
     * If you are not using CDK Nag or do not want to use any suppressions, you
     * can ignore this property.
     */
    readonly suppressions?: SecurityCompliance.Suppressions;
}

/**
 * Applies best practice security settings to be in compliance with security
 * tools such as CDK Nag.
 *
 * This aspect automatically implements AWS security best practices and compliance
 * requirements for various AWS services used in your CDK applications.
 * It can be configured with custom settings and supports suppressing specific
 * CDK Nag warnings with proper justification.
 *
 * @example
 * import { App, Stack, Aspects } from 'aws-cdk-lib';
 * import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
 * import { Bucket } from 'aws-cdk-lib/aws-s3';
 * import { SecurityCompliance } from '../../../src/aspects/security-compliance';
 *
 * const app = new App();
 * const stack = new Stack(app, 'MySecureStack');
 *
 * // Create resources
 * const myBucket = new Bucket(stack, 'MyBucket');
 * const myFunction = new Function(stack, 'MyFunction', {
 *     runtime: Runtime.NODEJS_18_X,
 *     handler: 'index.handler',
 *     code: Code.fromInline(
 *         'exports.handler = async () => { return { statusCode: 200 }; }'
 *     )
 * });
 *
 * // Apply the SecurityCompliance aspect with custom settings
 * const securityAspect = new SecurityCompliance({
 *     settings: {
 *         s3: {
 *             serverAccessLogs: {
 *                 destinationBucketName: 'my-access-logs-bucket'
 *             },
 *             versioning: {
 *                 disabled: false
 *             }
 *         },
 *         lambda: {
 *             reservedConcurrentExecutions: {
 *                 concurrentExecutionCount: 5
 *             }
 *         }
 *     },
 *     suppressions: {
 *         lambdaNotInVpc:
 *             'This is a development environment where VPC is not required',
 *         iamNoInlinePolicies: 'Inline policies are acceptable for this use case'
 *     }
 * });
 *
 * // Apply the aspect to the stack
 * Aspects.of(app).add(securityAspect);
 */
export class SecurityCompliance implements IAspect {
    /**
     * Settings for the aspect
     */
    private readonly settings: SecurityCompliance.Settings;
    /**
     * Suppressions for the aspect
     */
    private readonly suppressions?: SecurityCompliance.Suppressions;

    /**
     * Visitor Registry stores all of the Visitor classes that will be used
     * by the Aspect to visit each node. The registry is organized by AWS
     * service.
     */
    private readonly vr = new VisitorRegistry();

    constructor(props?: SecurityComplianceProps) {
        // set defaults
        this.settings = {
            ...props?.settings,
            apiGateway: {
                stageMethodLogging: {
                    loggingLevel:
                        props?.settings?.apiGateway?.stageMethodLogging
                            ?.loggingLevel ?? MethodLoggingLevel.ERROR,
                    disabled:
                        props?.settings?.apiGateway?.stageMethodLogging
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
        this.vr.register(new v.ApiGatewayVisitor(this.settings.apiGateway));
        this.vr.register(new v.DynamoDbVisitor(this.settings.dynamoDb));
        this.vr.register(new v.EcsClusterVisitor(this.settings.ecs));
        this.vr.register(new v.LambdaVisitor(this.settings.lambda));
        this.vr.register(new v.S3Visitor(this.settings.s3));
        this.vr.register(
            new v.StepFunctionsVisitor(this.settings.stepFunctions)
        );
        this.vr.register(new v.StackSuppressionsVisitor(this.suppressions));
        this.vr.register(
            new v.CdkGeneratedSuppressionsVisitor(this.suppressions)
        );
    }

    /**
     * Apply the aspect to the node
     */
    public visit(node: IConstruct): void {
        this.vr.visitNode(node);
    }
}

export namespace SecurityCompliance {
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
         * Resolves:
         *   - NIST.800.53.R5-LambdaConcurrency
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

    export interface ServerAccessLogsSettings {
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
        readonly serverAccessLogs?: ServerAccessLogsSettings;

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
         * Defaults to true if not disabled.
         */
        readonly tracing?: DisableableSetting;
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

    /**
     * Configuration settings for the security-compliance aspect.
     *
     * This interface provides a centralized way to configure security and compliance
     * settings for various AWS resources. Each property corresponds to a specific
     * AWS service and contains settings that help ensure resources comply with
     * security best practices and compliance requirements.
     *
     * By default, most security settings are enabled unless explicitly disabled.
     * Some settings may require additional configuration to be effective.
     *
     * @example
     * const securitySettings: Settings = {
     *   lambda: {
     *     reservedConcurrentExecutions: {
     *       concurrentExecutionCount: 5
     *     }
     *   },
     *   s3: {
     *     serverAccessLogs: {
     *       destinationBucketName: 'access-logs-bucket'
     *     }
     *   }
     * };
     */
    export interface Settings {
        /**
         * Security and compliance settings for API Gateway resources.
         *
         * Controls settings like method logging to ensure proper monitoring
         * and auditability of API usage.
         */
        readonly apiGateway?: ApiGatewaySettings;

        /**
         * Security and compliance settings for DynamoDB tables.
         *
         * Configures features like Point-in-Time Recovery to improve
         * data durability and recoverability.
         */
        readonly dynamoDb?: DynamoDbSettings;

        /**
         * Security and compliance settings for Lambda functions.
         *
         * Controls execution limits and other settings to improve
         * the security posture of Lambda functions.
         */
        readonly lambda?: LambdaSettings;

        /**
         * Security and compliance settings for ECS clusters and services.
         *
         * Enables features like Container Insights for better
         * monitoring and observability.
         */
        readonly ecs?: EcsSettings;

        /**
         * Security and compliance settings for S3 buckets.
         *
         * Configures features like versioning and server access logging
         * to improve data protection and meet compliance requirements.
         */
        readonly s3?: S3Settings;

        /**
         * Security and compliance settings for Step Functions state machines.
         *
         * Controls settings like X-Ray tracing to improve
         * observability and debugging capabilities.
         */
        readonly stepFunctions?: StepFunctionsSettings;
    }

    export interface Suppressions {
        /**
         * Suppressions to add for CDK Nag on CDK generated policies. If enabled
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
         * Suppressions to add for CDK Nag on CDK generated resources. If enabled
         * this will suppress `AwsSolutions-IAM5` on the policies that are
         * created by CDK Generated Lambda functions, as well as other CDK generated
         * resources such as Log Groups and Step Functions that support CDK
         * generated custom resources. This only applies to resources that are
         * created by the underlying CDK.
         *
         * - Policy suppression: AwsSolutions-IAM5
         * - Log Group suppression: NIST.800.53.R5-CloudWatchLogGroupEncrypted
         * - Step Function suppression: AwsSolutions-SF1
         */
        readonly cdkGenerated?: string;

        /**
         * Adds a stack suppression for `NIST.800.53.R5-LambdaDLQ`.
         */
        readonly lambdaNoDlq?: string;

        /**
         * Adds a stack suppression for `NIST.800.53.R5-LambdaInsideVPC`.
         */
        readonly lambdaNotInVpc?: string;

        /**
         * Adds a stack suppression for `NIST.800.53.R5-S3BucketReplicationEnabled`.
         */
        readonly s3BucketReplication?: string;
    }
}
