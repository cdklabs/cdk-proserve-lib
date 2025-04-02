// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { MethodLoggingLevel } from 'aws-cdk-lib/aws-apigateway';

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
