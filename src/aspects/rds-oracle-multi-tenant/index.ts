// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { Aws, CustomResource, Duration, IAspect, Stack } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { DatabaseInstance } from 'aws-cdk-lib/aws-rds';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { IConstruct, Construct } from 'constructs';
import { SecureFunction } from '../../constructs/secure-function';
import { LambdaConfiguration } from '../../types';

/**
 * Properties passed to the Lambda handler from the Custom Resource
 */
interface IResourceProperties {
    /**
     * The RDS database instance identifier
     */
    readonly DBInstanceIdentifier: string;
}

/**
 * Validation result interface for database instance validation
 */
interface ValidationResult {
    isValid: boolean;
    reason?: string;
    details?: string;
}

/**
 * Processing statistics for the RDS Oracle MultiTenant Aspect
 */
export interface ProcessingStatistics {
    /**
     * Number of Oracle database instances that have been processed
     */
    readonly processedInstancesCount: number;

    /**
     * Array of instance identifiers that have been processed
     */
    readonly processedInstanceIds: string[];
}

/**
 * Properties for configuring the RDS Oracle MultiTenant Aspect
 *
 * @see {@link https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/oracle-multitenant.html | Oracle MultiTenant on Amazon RDS}
 */
export interface RdsOracleMultiTenantProps {
    /**
     * Optional KMS key for encrypting Lambda environment variables and CloudWatch log group.
     *
     * If not provided, AWS managed keys will be used for encryption.
     * The Lambda function will be granted encrypt/decrypt permissions on this key.
     *
     * @default - AWS managed keys are used
     */
    readonly encryption?: IKey;

    /**
     * Optional Lambda configuration settings for the custom resource handler.
     *
     * Allows customization of VPC settings, security groups, log retention, and other
     * Lambda function properties. Useful when the RDS instance is in a private VPC
     * or when specific networking requirements exist.
     *
     * @default - Lambda function uses default settings with no VPC configuration
     * @see {@link LambdaConfiguration} for available options
     */
    readonly lambdaConfiguration?: LambdaConfiguration;
}

/**
 * An Aspect that automatically enables Oracle MultiTenant configuration on RDS Oracle database instances.
 *
 * This Aspect implements the cross-cutting concern pattern to apply Oracle MultiTenant configuration
 * to multiple RDS Oracle instances across a CDK application automatically. When applied to a construct
 * tree, it identifies all RDS Oracle database instances and enables MultiTenant architecture on each one.
 *
 * The Aspect follows the established pattern of Lambda-backed custom resources used throughout the
 * CDK ProServe Library, providing a secure and reliable way to configure Oracle MultiTenant settings
 * on RDS Oracle instances through AWS SDK calls.
 *
 * ## Oracle MultiTenant Architecture
 *
 * Oracle MultiTenant architecture allows a single Oracle database instance to function as a Container Database (CDB)
 * that can host multiple Pluggable Databases (PDBs). This provides:
 * - Resource consolidation and cost optimization
 * - Simplified database administration
 * - Enhanced security through database isolation
 * - Improved backup and recovery operations
 *
 * ## Prerequisites
 *
 * Before using this Aspect, ensure your RDS Oracle instances meet these requirements:
 * - **Engine**: Oracle Database
 * - **Version**: 19c or higher (Oracle 12c Release 2 and later support MultiTenant)
 * - **Edition**: Enterprise Edition (recommended) or Standard Edition 2 (limited support)
 * - **Status**: Database must be in 'available' state
 * - **Configuration**: Oracle Data Guard must not be enabled (incompatible with MultiTenant conversion)
 *
 * ## Important Considerations
 *
 * - **Irreversible Operation**: Oracle MultiTenant conversion cannot be undone once applied
 * - **Downtime Required**: Conversion requires a database restart, causing temporary unavailability
 * - **Connection Impact**: All existing database connections will be terminated during the restart
 * - **Backup Recommendation**: Ensure you have a recent backup before performing the conversion
 *
 * ## Security and Permissions
 *
 * The Aspect creates Lambda functions with minimal required permissions:
 * - `rds:ModifyDBInstance` - To enable MultiTenant configuration
 * - `rds:DescribeDBInstances` - To monitor conversion status and validate prerequisites
 * - KMS permissions (if encryption key provided) - For encrypting Lambda environment variables
 *
 * ## Monitoring and Troubleshooting
 *
 * The Lambda functions provide comprehensive logging for:
 * - Database validation steps and results
 * - MultiTenant conversion progress
 * - Error conditions with detailed messages
 * - Status monitoring during the conversion process
 *
 * Monitor the conversion through:
 * - CloudWatch Logs for the Lambda functions
 * - RDS Events for database-level notifications
 * - CloudFormation stack events for resource status
 *
 * @example
 * Basic usage applied to an entire CDK application:
 *
 * import { App, Aspects } from 'aws-cdk-lib';
 * import { RdsOracleMultiTenant } from '@cdklabs/cdk-proserve-lib/aspects';
 *
 * const app = new App();
 *
 * // Apply to all Oracle instances in the application
 * Aspects.of(app).add(new RdsOracleMultiTenant());
 *
 * @example
 * Advanced usage with encryption and custom Lambda configuration:
 *
 * import { Aspects } from 'aws-cdk-lib';
 * import { RdsOracleMultiTenant } from '@cdklabs/cdk-proserve-lib/aspects';
 * import { Key } from 'aws-cdk-lib/aws-kms';
 * import { Vpc, SubnetType, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
 * import { RetentionDays } from 'aws-cdk-lib/aws-logs';
 *
 * declare const stack: Stack;
 * declare const kmsKey: Key;
 * declare const vpc: Vpc;
 * declare const securityGroup: SecurityGroup;
 *
 * Aspects.of(stack).add(new RdsOracleMultiTenant({
 *   encryption: kmsKey,
 *   lambdaConfiguration: {
 *     vpc: vpc,
 *     subnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
 *     securityGroups: [securityGroup],
 *     logGroupRetention: RetentionDays.THREE_MONTHS,
 *   },
 * }));
 *
 * @example
 * Applying to a specific construct scope:
 *
 * import { Aspects } from 'aws-cdk-lib';
 * import { RdsOracleMultiTenant } from '@cdklabs/cdk-proserve-lib/aspects';
 *
 * declare const databaseConstruct: Construct;
 *
 * // Apply only to Oracle instances within this specific construct
 * Aspects.of(databaseConstruct).add(new RdsOracleMultiTenant());
 *
 * @see {@link https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/oracle-multitenant.html | Oracle MultiTenant on Amazon RDS}
 */
export class RdsOracleMultiTenant implements IAspect {
    /**
     * Mapping of providers for each CDK stack
     * Used to ensure only one provider is created per stack for efficient resource reuse
     */
    private static serviceTokens = new Map<string, Provider>();

    /**
     * Set to track processed database instances to prevent duplicate processing
     */
    private readonly processedInstances = new Set<string>();

    /**
     * Configuration properties for the Aspect
     */
    public readonly props: RdsOracleMultiTenantProps;

    /**
     * Creates a new RDS Oracle MultiTenant Aspect that automatically enables Oracle MultiTenant
     * configuration on RDS Oracle database instances found in the construct tree.
     *
     * The Aspect will:
     * 1. Traverse the construct tree when applied
     * 2. Identify all RDS Oracle database instances
     * 3. Apply MultiTenant configuration to each Oracle instance
     * 4. Skip non-Oracle databases silently
     * 5. Prevent duplicate processing of the same instance
     *
     * ## Configuration Application
     *
     * All configuration properties provided to the Aspect will be applied consistently
     * to every Oracle database instance found in the construct tree:
     * - Encryption settings will be applied to all Lambda functions
     * - Lambda configuration will be used for all custom resource handlers
     * - Provider reuse will be maintained within each stack
     *
     * ## Error Handling
     *
     * The Aspect handles various scenarios gracefully:
     * - Non-Oracle databases are skipped silently
     * - Invalid Oracle configurations are logged but don't fail the deployment
     * - Duplicate processing is prevented through instance tracking
     * - Runtime errors are handled by the Lambda functions
     *
     * @param props - Optional configuration properties for the Oracle MultiTenant Aspect
     *
     * @example
     * Creating an Aspect with minimal configuration:
     *
     * const aspect = new RdsOracleMultiTenant();
     *
     * @example
     * Creating an Aspect with full configuration:
     *
     * const aspect = new RdsOracleMultiTenant({
     *   encryption: myKmsKey,
     *   lambdaConfiguration: {
     *     vpc: myVpc,
     *     subnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
     *     securityGroups: [mySecurityGroup],
     *     logGroupRetention: RetentionDays.ONE_MONTH,
     *   },
     * });
     */
    constructor(props: RdsOracleMultiTenantProps = {}) {
        this.props = props;
    }

    /**
     * Visits a construct node and applies Oracle MultiTenant configuration if applicable.
     *
     * This method is called by the CDK framework for each construct in the tree when the
     * Aspect is applied. It implements the core logic of the Aspect:
     *
     * 1. **Instance Identification**: Checks if the node is a DatabaseInstance construct
     * 2. **Oracle Validation**: Verifies the database uses an Oracle engine
     * 3. **Duplicate Prevention**: Ensures the instance hasn't been processed already
     * 4. **Configuration Application**: Applies MultiTenant configuration to valid Oracle instances
     * 5. **Silent Skipping**: Ignores non-Oracle databases without errors
     *
     * ## Processing Logic
     *
     * The visit method follows this decision tree:
     * - If not a DatabaseInstance → skip silently
     * - If not Oracle engine → skip silently
     * - If already processed → skip silently with warning
     * - If Oracle and not processed → apply MultiTenant configuration
     *
     * ## Error Handling
     *
     * The method handles errors gracefully:
     * - Construction errors are thrown immediately
     * - Runtime validation errors are handled by Lambda functions
     * - Invalid configurations are logged but don't fail the deployment
     * - Edge cases and validation failures are logged with appropriate warnings
     *
     * ## Provider Reuse
     *
     * The method maintains efficient resource usage:
     * - Lambda functions and providers are reused within the same stack
     * - Separate providers are created for different stacks
     * - Custom Resources are created for each Oracle instance
     *
     * @param node - The construct being visited by the Aspect
     *
     * @example
     * The visit method is called automatically by the CDK framework:
     *
     * // This happens automatically when the Aspect is applied
     * Aspects.of(app).add(new RdsOracleMultiTenant());
     * // The visit method will be called for every construct in the app
     */
    visit(node: IConstruct): void {
        // Check if the node is a DatabaseInstance
        if (node instanceof DatabaseInstance) {
            try {
                // Validate the database instance configuration
                const validationResult = this.validateDatabaseInstance(node);

                if (!validationResult.isValid) {
                    // Log validation failure details but continue processing other instances
                    this.logValidationFailure(node, validationResult);
                    return;
                }

                // Check if it's an Oracle database
                if (!this.isOracleDatabase(node)) {
                    // Skip non-Oracle databases silently (this is expected behavior)
                    return;
                }

                // Check if it has already been processed
                if (this.isAlreadyProcessed(node)) {
                    // Skip already processed instances with warning
                    this.logDuplicateProcessingAttempt(node);
                    return;
                }

                // Apply Oracle MultiTenant configuration
                this.applyMultiTenantConfiguration(node);
            } catch (error) {
                // Handle unexpected errors gracefully
                this.handleProcessingError(node, error);
            }
        }
    }

    /**
     * Validates a DatabaseInstance for basic configuration requirements.
     *
     * This method performs comprehensive validation of the database instance
     * to ensure it meets the basic requirements for processing, including
     * having a valid identifier and accessible engine configuration.
     *
     * @param instance - The DatabaseInstance to validate
     * @returns ValidationResult indicating if the instance is valid for processing
     */
    private validateDatabaseInstance(
        instance: DatabaseInstance
    ): ValidationResult {
        try {
            // Check if instance has a valid identifier
            const instanceId = this.extractInstanceIdentifier(instance);
            if (!instanceId) {
                return {
                    isValid: false,
                    reason: 'Missing or invalid instance identifier',
                    details:
                        'Database instance must have a valid identifier for tracking and configuration'
                };
            }

            // Check if engine is accessible
            const engine = instance.engine;
            if (!engine) {
                return {
                    isValid: false,
                    reason: 'Engine configuration not accessible',
                    details: `Instance ${instanceId} does not have accessible engine configuration`
                };
            }

            // Check if engine type is accessible
            const engineType = engine.engineType;
            if (!engineType) {
                return {
                    isValid: false,
                    reason: 'Engine type not accessible',
                    details: `Instance ${instanceId} engine type cannot be determined`
                };
            }

            return { isValid: true };
        } catch (error) {
            return {
                isValid: false,
                reason: 'Validation error',
                details: `Error during validation: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }

    /**
     * Logs validation failure details with appropriate warning level.
     *
     * This method provides detailed logging for database instances that fail
     * basic validation checks, helping developers understand why certain
     * instances are being skipped.
     *
     * @param instance - The DatabaseInstance that failed validation
     * @param validationResult - The validation result containing failure details
     */
    private logValidationFailure(
        instance: DatabaseInstance,
        validationResult: ValidationResult
    ): void {
        const instancePath = instance.node.path;

        console.warn(
            `⚠️  Oracle MultiTenant Aspect: Skipping database instance due to validation failure`
        );
        console.warn(`   Instance Path: ${instancePath}`);
        console.warn(`   Reason: ${validationResult.reason}`);

        if (validationResult.details) {
            console.warn(`   Details: ${validationResult.details}`);
        }

        console.warn(
            `   This instance will be skipped and no Oracle MultiTenant configuration will be applied.`
        );
    }

    /**
     * Logs when a duplicate processing attempt is detected.
     *
     * This method provides visibility into duplicate processing attempts,
     * which can occur when the same Aspect is applied at multiple scopes
     * or when there are overlapping Aspect applications.
     *
     * @param instance - The DatabaseInstance that was already processed
     */
    private logDuplicateProcessingAttempt(instance: DatabaseInstance): void {
        try {
            const instanceId = this.extractInstanceIdentifier(instance);
            const instancePath = instance.node.path;

            console.warn(
                `⚠️  Oracle MultiTenant Aspect: Duplicate processing attempt detected`
            );
            console.warn(`   Instance ID: ${instanceId || 'unknown'}`);
            console.warn(`   Instance Path: ${instancePath}`);
            console.warn(
                `   This Oracle instance has already been processed by this Aspect.`
            );
            console.warn(
                `   Skipping to prevent duplicate Custom Resource creation.`
            );
            console.warn(
                `   Tip: Ensure the Aspect is only applied once per instance scope.`
            );
        } catch (error) {
            console.warn(
                `⚠️  Oracle MultiTenant Aspect: Duplicate processing attempt detected for instance at path: ${instance.node.path}`
            );
            console.warn(
                `   Could not extract instance details for logging: ${error instanceof Error ? error.message : String(error)}`
            );
        }
    }

    /**
     * Handles unexpected errors during instance processing.
     *
     * This method provides comprehensive error handling and logging for
     * unexpected errors that occur during database instance processing,
     * ensuring that errors don't fail the entire deployment.
     *
     * @param instance - The DatabaseInstance being processed when the error occurred
     * @param error - The error that occurred
     */
    private handleProcessingError(
        instance: DatabaseInstance,
        error: unknown
    ): void {
        const instancePath = instance.node.path;
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : undefined;

        console.error(
            `❌ Oracle MultiTenant Aspect: Unexpected error processing database instance`
        );
        console.error(`   Instance Path: ${instancePath}`);
        console.error(`   Error: ${errorMessage}`);

        if (errorStack) {
            console.error(`   Stack Trace: ${errorStack}`);
        }

        // Try to extract instance identifier for better error reporting
        try {
            const instanceId = this.extractInstanceIdentifier(instance);
            if (instanceId) {
                console.error(`   Instance ID: ${instanceId}`);
                console.error(
                    `   Failed to process Oracle instance: ${instanceId}`
                );
            }
        } catch (identifierError) {
            console.error(
                `   Could not extract instance identifier for error reporting: ${identifierError instanceof Error ? identifierError.message : String(identifierError)}`
            );
        }

        console.error(
            `   This instance will be skipped. Other instances will continue to be processed.`
        );
        console.error(
            `   If this is an Oracle instance, manual configuration may be required.`
        );
    }

    /**
     * Determines if a DatabaseInstance is using an Oracle engine.
     *
     * This method validates that the database instance is running Oracle Database,
     * which is a prerequisite for Oracle MultiTenant configuration. It checks the
     * engine type by examining the engine family name and provides detailed logging
     * for edge cases and validation failures.
     *
     * Supported Oracle engines include:
     * - Oracle Standard Edition (SE)
     * - Oracle Standard Edition One (SE1)
     * - Oracle Standard Edition Two (SE2)
     * - Oracle Enterprise Edition (EE)
     *
     * @param instance - The DatabaseInstance to check
     * @returns true if the instance is using an Oracle engine, false otherwise
     *
     * @example
     * ```typescript
     * const isOracle = this.isOracleDatabase(myDatabaseInstance);
     * if (isOracle) {
     *   // Apply Oracle MultiTenant configuration
     * }
     * ```
     */
    private isOracleDatabase(instance: DatabaseInstance): boolean {
        try {
            const instanceId =
                this.extractInstanceIdentifier(instance) || 'unknown';

            // Get the engine from the database instance
            const engine = instance.engine;

            if (!engine) {
                console.debug(
                    `Oracle MultiTenant Aspect: Instance ${instanceId} has no engine configuration - skipping`
                );
                return false;
            }

            // Check if the engine type is Oracle
            // Oracle engine types include: oracle-se2, oracle-se1, oracle-se, oracle-ee
            const engineType = engine.engineType;

            if (!engineType) {
                console.debug(
                    `Oracle MultiTenant Aspect: Instance ${instanceId} has no engine type - skipping`
                );
                return false;
            }

            // Check if the engine type starts with 'oracle'
            const isOracle = engineType.toLowerCase().startsWith('oracle');

            if (isOracle) {
                console.debug(
                    `Oracle MultiTenant Aspect: Instance ${instanceId} is Oracle database (${engineType}) - will process`
                );
            } else {
                console.debug(
                    `Oracle MultiTenant Aspect: Instance ${instanceId} is not Oracle database (${engineType}) - skipping`
                );
            }

            return isOracle;
        } catch (error) {
            // If there's any error accessing the engine properties, assume it's not Oracle
            const instanceId =
                this.extractInstanceIdentifier(instance) || 'unknown';
            const errorMessage =
                error instanceof Error ? error.message : String(error);

            console.warn(
                `⚠️  Oracle MultiTenant Aspect: Error checking database engine for instance ${instanceId}`
            );
            console.warn(`   Error: ${errorMessage}`);
            console.warn(
                `   Assuming instance is not Oracle to avoid processing errors`
            );
            console.warn(
                `   If this is an Oracle instance, manual verification may be required`
            );

            return false;
        }
    }

    /**
     * Checks if a DatabaseInstance has already been processed by this Aspect.
     *
     * This method prevents duplicate processing of the same database instance,
     * which could occur if the Aspect is applied multiple times or at different scopes.
     * It uses the instance identifier as a unique key to track processed instances.
     *
     * The method also validates that the instance has a valid identifier before checking,
     * as instances without identifiers cannot be reliably tracked.
     *
     * @param instance - The DatabaseInstance to check
     * @returns true if the instance has been processed, false otherwise
     *
     * @example
     * ```typescript
     * if (!this.isAlreadyProcessed(instance)) {
     *   // Process the instance
     *   this.applyMultiTenantConfiguration(instance);
     * }
     * ```
     */
    private isAlreadyProcessed(instance: DatabaseInstance): boolean {
        try {
            const instanceId = instance.instanceIdentifier;

            // If the instance doesn't have an identifier, we can't track it reliably
            if (!instanceId) {
                console.warn(
                    `⚠️  Oracle MultiTenant Aspect: Database instance at path ${instance.node.path} does not have an identifier`
                );
                console.warn(
                    `   Cannot track processing status for instances without identifiers`
                );
                console.warn(
                    `   This instance will be treated as not processed, but duplicate prevention may not work correctly`
                );
                return false;
            }

            const isProcessed = this.processedInstances.has(instanceId);

            if (isProcessed) {
                console.debug(
                    `Oracle MultiTenant Aspect: Instance ${instanceId} has already been processed`
                );
            }

            return isProcessed;
        } catch (error) {
            // If there's any error accessing the instance identifier, assume it hasn't been processed
            const errorMessage =
                error instanceof Error ? error.message : String(error);
            console.warn(
                `⚠️  Oracle MultiTenant Aspect: Error checking processing status for database instance at path ${instance.node.path}`
            );
            console.warn(`   Error: ${errorMessage}`);
            console.warn(
                `   Assuming instance has not been processed to avoid skipping valid instances`
            );
            return false;
        }
    }

    /**
     * Extracts and validates the instance identifier from a DatabaseInstance.
     *
     * This method ensures that the database instance has a valid identifier
     * that can be used for tracking and configuration purposes. It provides
     * detailed logging for edge cases and validation failures.
     *
     * @param instance - The DatabaseInstance to extract identifier from
     * @returns The instance identifier if valid, null otherwise
     *
     * @example
     * ```typescript
     * const instanceId = this.extractInstanceIdentifier(instance);
     * if (instanceId) {
     *   // Use the instance identifier
     * }
     * ```
     */
    private extractInstanceIdentifier(
        instance: DatabaseInstance
    ): string | null {
        try {
            const instanceId = instance.instanceIdentifier;

            if (!instanceId) {
                console.warn(
                    `⚠️  Oracle MultiTenant Aspect: Database instance at path ${instance.node.path} has null or undefined identifier`
                );
                console.warn(
                    `   Instance identifiers are required for tracking and Custom Resource creation`
                );
                console.warn(
                    `   Ensure the database instance is properly configured with an identifier`
                );
                return null;
            }

            if (typeof instanceId !== 'string') {
                console.warn(
                    `⚠️  Oracle MultiTenant Aspect: Database instance at path ${instance.node.path} has non-string identifier`
                );
                console.warn(`   Identifier type: ${typeof instanceId}`);
                console.warn(`   Identifier value: ${String(instanceId)}`);
                console.warn(
                    `   Instance identifiers must be strings for proper processing`
                );
                return null;
            }

            if (instanceId.trim() === '') {
                console.warn(
                    `⚠️  Oracle MultiTenant Aspect: Database instance at path ${instance.node.path} has empty identifier`
                );
                console.warn(
                    `   Empty identifiers cannot be used for tracking or Custom Resource creation`
                );
                console.warn(
                    `   Ensure the database instance has a meaningful identifier`
                );
                return null;
            }

            // Validate identifier format (basic AWS RDS identifier rules)
            const trimmedId = instanceId.trim();
            if (trimmedId.length < 1 || trimmedId.length > 63) {
                console.warn(
                    `⚠️  Oracle MultiTenant Aspect: Database instance identifier "${trimmedId}" has invalid length`
                );
                console.warn(
                    `   RDS instance identifiers must be between 1 and 63 characters`
                );
                console.warn(`   Current length: ${trimmedId.length}`);
                return null;
            }

            // Check for valid characters (basic validation)
            // Skip validation for CDK tokens (they contain ${Token[...]} format)
            const isCdkToken =
                trimmedId.includes('${Token[') || trimmedId.includes('Token[');
            if (!isCdkToken) {
                const validIdentifierPattern = /^[a-zA-Z][a-zA-Z0-9-]*$/;
                if (!validIdentifierPattern.test(trimmedId)) {
                    console.warn(
                        `⚠️  Oracle MultiTenant Aspect: Database instance identifier "${trimmedId}" contains invalid characters`
                    );
                    console.warn(
                        `   RDS instance identifiers must start with a letter and contain only letters, numbers, and hyphens`
                    );
                    console.warn(
                        `   This may cause issues with Custom Resource creation`
                    );
                    // Don't return null here as the identifier might still work, just warn
                }
            }

            return trimmedId;
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : String(error);
            console.warn(
                `⚠️  Oracle MultiTenant Aspect: Error extracting instance identifier from database instance at path ${instance.node.path}`
            );
            console.warn(`   Error: ${errorMessage}`);
            console.warn(
                `   This may indicate a problem with the database instance configuration`
            );
            return null;
        }
    }

    /**
     * Builds or retrieves the provider to support the Custom Resource for a given stack.
     *
     * This method implements stack-level provider caching to ensure efficient resource reuse.
     * Multiple Oracle instances within the same stack will share the same Lambda functions
     * and provider, while instances in different stacks will have separate providers.
     *
     * The provider includes:
     * - OnEvent Lambda function for handling CREATE/UPDATE/DELETE operations
     * - IsComplete Lambda function for monitoring asynchronous operations
     * - IAM policies with minimal required permissions
     * - KMS permissions if encryption is configured
     * - Consistent application of all configuration properties
     *
     * @param scope - The construct scope where the provider should be created
     * @returns Provider for the Custom Resource
     *
     * @example
     * ```typescript
     * const provider = this.getOrBuildProvider(instance);
     * // Provider will be reused for other Oracle instances in the same stack
     * ```
     */
    private getOrBuildProvider(scope: IConstruct): Provider {
        const stack = Stack.of(scope);
        const stackId = stack.node.id;

        if (!RdsOracleMultiTenant.serviceTokens.has(stackId)) {
            // Create a stack level construct to manage the framework
            const provider = new Construct(
                stack,
                `Cr${RdsOracleMultiTenant.name}`
            );

            // Create Lambda function configuration that applies all properties consistently
            const lambdaConfig = this.createLambdaConfiguration();

            const onEventHandler = new SecureFunction(provider, 'OnEvent', {
                code: Code.fromAsset(join(__dirname, 'handler', 'on-event')),
                handler: 'index.handler',
                memorySize: 512,
                timeout: Duration.minutes(5),
                runtime: Runtime.NODEJS_22_X,
                ...lambdaConfig
            });

            const isCompleteHandler = new SecureFunction(
                provider,
                'IsComplete',
                {
                    code: Code.fromAsset(
                        join(__dirname, 'handler', 'is-complete')
                    ),
                    handler: 'index.handler',
                    memorySize: 512,
                    timeout: Duration.minutes(5),
                    runtime: Runtime.NODEJS_22_X,
                    ...lambdaConfig
                }
            );

            // Grant minimal required RDS permissions following principle of least privilege
            // Note: For Aspects, we need to grant permissions to all Oracle instances in the stack
            // This is handled by using a wildcard resource pattern for Oracle instances
            const rdsPolicy = new PolicyStatement({
                effect: Effect.ALLOW,
                actions: ['rds:ModifyDBInstance', 'rds:DescribeDBInstances'],
                resources: [
                    // Allow access to all RDS instances in the current account/region
                    // The Lambda function will validate that only Oracle instances are processed
                    `arn:${Aws.PARTITION}:rds:${Aws.REGION}:${Aws.ACCOUNT_ID}:db:*`
                ]
            });

            const tenantPolicy = new PolicyStatement({
                effect: Effect.ALLOW,
                actions: ['rds:CreateTenantDatabase'],
                resources: [
                    // Allow access to all RDS instances and tenant databases
                    `arn:${Aws.PARTITION}:rds:${Aws.REGION}:${Aws.ACCOUNT_ID}:db:*`,
                    `arn:${Aws.PARTITION}:rds:${Aws.REGION}:${Aws.ACCOUNT_ID}:tenant-database:*`
                ]
            });

            // Apply permissions and configuration to both handlers consistently
            [onEventHandler, isCompleteHandler].forEach((handler) => {
                handler.function.addToRolePolicy(rdsPolicy);
                handler.function.addToRolePolicy(tenantPolicy);

                // Grant KMS permissions if encryption key is provided
                // This ensures the Lambda functions can decrypt environment variables
                // and write to encrypted CloudWatch log groups
                if (this.props.encryption) {
                    this.props.encryption.grantEncryptDecrypt(handler.function);
                }
            });

            RdsOracleMultiTenant.serviceTokens.set(
                stackId,
                new Provider(provider, 'Provider', {
                    onEventHandler: onEventHandler.function,
                    isCompleteHandler: isCompleteHandler.function,
                    queryInterval: Duration.seconds(30),
                    totalTimeout: Duration.hours(1)
                })
            );
        }

        return RdsOracleMultiTenant.serviceTokens.get(stackId)!;
    }

    /**
     * Creates a consistent Lambda configuration object that applies all configuration properties.
     *
     * This method ensures that encryption settings and Lambda configuration are applied
     * consistently across all Lambda functions created by the Aspect. It validates that
     * all configuration properties are properly merged and applied.
     *
     * The method handles:
     * - Encryption key application for environment variables and log groups
     * - Lambda configuration properties (VPC, security groups, etc.)
     * - Consistent application across all instances
     * - Validation of configuration properties
     *
     * @returns Configuration object for SecureFunction
     *
     * @example
     * ```typescript
     * const config = this.createLambdaConfiguration();
     * // config includes encryption, vpc, securityGroups, etc.
     * ```
     */
    private createLambdaConfiguration(): any {
        const config: any = {};

        // Apply encryption settings if provided
        if (this.props.encryption) {
            config.encryption = this.props.encryption;

            // Log that encryption is being applied for transparency
            console.log(
                'Applying KMS encryption to Oracle MultiTenant Lambda functions'
            );
        }

        // Apply Lambda configuration settings if provided
        if (this.props.lambdaConfiguration) {
            // Spread all lambda configuration properties
            Object.assign(config, this.props.lambdaConfiguration);

            // Log the configuration properties being applied
            const configKeys = Object.keys(this.props.lambdaConfiguration);
            if (configKeys.length > 0) {
                console.log(
                    `Applying Lambda configuration properties: ${configKeys.join(', ')}`
                );
            }

            // Validate VPC configuration if provided
            if (this.props.lambdaConfiguration.vpc) {
                console.log('Lambda functions will be deployed in VPC');

                // Ensure security groups are provided when VPC is specified
                if (
                    !this.props.lambdaConfiguration.securityGroups ||
                    this.props.lambdaConfiguration.securityGroups.length === 0
                ) {
                    console.warn(
                        'VPC specified but no security groups provided. ' +
                            'Lambda functions may not have network access.'
                    );
                }
            }

            // Validate log retention setting
            if (this.props.lambdaConfiguration.logGroupRetention) {
                console.log(
                    `Setting log retention to: ${this.props.lambdaConfiguration.logGroupRetention}`
                );
            }

            // Validate reserved concurrent executions
            if (
                this.props.lambdaConfiguration.reservedConcurrentExecutions !==
                undefined
            ) {
                console.log(
                    `Setting reserved concurrent executions to: ${this.props.lambdaConfiguration.reservedConcurrentExecutions}`
                );
            }

            // Validate dead letter queue configuration
            if (this.props.lambdaConfiguration.deadLetterQueue) {
                console.log(
                    'Dead letter queue configured for Lambda functions'
                );
            }
        }

        return config;
    }

    /**
     * Creates Custom Resource properties for a specific Oracle database instance.
     *
     * This method translates the database instance information into the format
     * expected by the Lambda handler for the Custom Resource.
     *
     * @param instance - The Oracle DatabaseInstance to create properties for
     * @returns Properties object for the Custom Resource
     *
     * @example
     * ```typescript
     * const properties = this.createCustomResourceProperties(instance);
     * // properties = { DBInstanceIdentifier: "my-oracle-instance" }
     * ```
     */
    private createCustomResourceProperties(
        instance: DatabaseInstance
    ): IResourceProperties {
        return {
            DBInstanceIdentifier: instance.instanceIdentifier
        };
    }

    /**
     * Applies Oracle MultiTenant configuration to a DatabaseInstance.
     *
     * This method creates the necessary Lambda-backed custom resource to enable
     * Oracle MultiTenant architecture on the specified database instance.
     *
     * The method:
     * 1. Validates that the instance has a valid identifier
     * 2. Validates that configuration properties are consistent
     * 3. Marks the instance as processed to prevent duplicates
     * 4. Gets or builds the provider for the stack (with reuse)
     * 5. Creates a Custom Resource for the specific Oracle instance
     *
     * @param instance - The Oracle DatabaseInstance to configure
     *
     * @example
     * ```typescript
     * if (this.isOracleDatabase(instance) && !this.isAlreadyProcessed(instance)) {
     *   this.applyMultiTenantConfiguration(instance);
     * }
     * ```
     */
    private applyMultiTenantConfiguration(instance: DatabaseInstance): void {
        // Extract and validate the instance identifier
        const instanceId = this.extractInstanceIdentifier(instance);

        if (!instanceId) {
            console.warn(
                'Skipping Oracle MultiTenant configuration for instance without valid identifier'
            );
            return;
        }

        // Mark instance as processed to prevent duplicates
        this.processedInstances.add(instanceId);
        console.debug(
            `Oracle MultiTenant Aspect: Marked instance ${instanceId} as processed (total processed: ${this.processedInstances.size})`
        );

        try {
            // Get or build the provider for this stack (with reuse)
            // This ensures consistent configuration application across all instances
            const provider = this.getOrBuildProvider(instance);

            console.log(
                `Oracle MultiTenant configuration will be applied to instance: ${instanceId}`
            );

            // Create Custom Resource properties for this specific Oracle instance
            const customResourceProperties =
                this.createCustomResourceProperties(instance);

            // Create a unique Custom Resource for this Oracle instance
            // Use a static ID since instanceId might be a token that gets resolved later
            // The Custom Resource will be created as a child of the database instance,
            // so it will be unique within that scope
            const customResourceId = `RdsOracleMultiTenant`;

            // Create the Custom Resource that will handle the Oracle MultiTenant configuration
            const customResource = new CustomResource(
                instance,
                customResourceId,
                {
                    serviceToken: provider.serviceToken,
                    properties: customResourceProperties,
                    resourceType: 'Custom::RdsOracleMultiTenant'
                }
            );

            // Add dependency on the database instance to ensure proper ordering
            customResource.node.addDependency(instance);

            console.log(
                `Created Oracle MultiTenant Custom Resource for instance: ${instanceId} with consistent configuration`
            );
        } catch (error) {
            console.error(
                `Error creating Custom Resource for Oracle instance ${instanceId}:`,
                error
            );
            throw error;
        }
    }
}
