// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { Aws, CustomResource, Duration, Stack } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Code, IFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { IDatabaseInstance } from 'aws-cdk-lib/aws-rds';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { LambdaConfiguration } from '../../types';
import { SecureFunction } from '../secure-function';
import { IResourceProperties } from './handler/types/resource-properties';

/**
 * Properties for the RDS Oracle MultiTenant construct
 *
 * @see {@link https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/oracle-multitenant.html | Oracle MultiTenant on Amazon RDS}
 */
export interface RdsOracleMultiTenantProps {
    /**
     * The RDS Oracle database instance to configure for MultiTenant.
     *
     * The database must meet the following requirements:
     * - Engine type: Oracle
     * - Version: 19c or higher
     * - Status: Available
     * - Edition: Enterprise Edition recommended (Standard Edition has limited support)
     *
     * @see {@link https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/oracle-multitenant.html#oracle-multitenant-limitations | Oracle MultiTenant Limitations}
     */
    readonly database: IDatabaseInstance;

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
 * Enables Oracle MultiTenant configuration on an existing RDS Oracle database.
 *
 * This construct creates a Lambda-backed custom resource that uses the AWS RDS ModifyDBInstance API
 * to enable Oracle MultiTenant architecture, allowing the database to function as a Container Database (CDB)
 * that can host multiple Pluggable Databases (PDBs).
 *
 * The construct follows the established pattern of Lambda-backed custom resources used throughout the
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
 * Before using this construct, ensure your RDS Oracle instance meets these requirements:
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
 * The construct creates a Lambda function with minimal required permissions:
 * - `rds:ModifyDBInstance` - To enable MultiTenant configuration
 * - `rds:DescribeDBInstances` - To monitor conversion status and validate prerequisites
 * - KMS permissions (if encryption key provided) - For encrypting Lambda environment variables
 *
 * ## Monitoring and Troubleshooting
 *
 * The Lambda function provides comprehensive logging for:
 * - Database validation steps and results
 * - MultiTenant conversion progress
 * - Error conditions with detailed messages
 * - Status monitoring during the conversion process
 *
 * Monitor the conversion through:
 * - CloudWatch Logs for the Lambda function
 * - RDS Events for database-level notifications
 * - CloudFormation stack events for resource status
 *
 * @example
 * Basic usage with minimal configuration:
 *
 * import { RdsOracleMultiTenant } from '@cdklabs/cdk-proserve-lib/constructs';
 * import { DatabaseInstance } from 'aws-cdk-lib/aws-rds';
 *
 * declare const oracleInstance: DatabaseInstance;
 *
 * const multiTenant = new RdsOracleMultiTenant(this, 'OracleMultiTenant', {
 *   database: oracleInstance,
 * });
 *
 * @example
 * Advanced usage with encryption and custom Lambda configuration:
 *
 * import { RdsOracleMultiTenant } from '@cdklabs/cdk-proserve-lib/constructs';
 * import { DatabaseInstance } from 'aws-cdk-lib/aws-rds';
 * import { Key } from 'aws-cdk-lib/aws-kms';
 * import { Vpc, SubnetType, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
 * import { RetentionDays } from 'aws-cdk-lib/aws-logs';
 *
 * declare const oracleInstance: DatabaseInstance;
 * declare const kmsKey: Key;
 * declare const vpc: Vpc;
 * declare const securityGroup: SecurityGroup;
 *
 * const multiTenant = new RdsOracleMultiTenant(this, 'OracleMultiTenant', {
 *   database: oracleInstance,
 *   encryption: kmsKey,
 *   lambdaConfiguration: {
 *     vpc: vpc,
 *     subnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
 *     securityGroups: [securityGroup],
 *     logGroupRetention: RetentionDays.THREE_MONTHS,
 *   },
 * });
 *
 * @example
 * Using with imported RDS instance:
 *
 * import { RdsOracleMultiTenant } from '@cdklabs/cdk-proserve-lib/constructs';
 * import { DatabaseInstance } from 'aws-cdk-lib/aws-rds';
 *
 * // Import existing Oracle RDS instance
 * const oracleInstance = DatabaseInstance.fromDatabaseInstanceAttributes(this, 'ImportedOracle', {
 *   instanceIdentifier: 'my-oracle-instance',
 *   instanceEndpointAddress: 'my-oracle-instance.abc123.us-east-1.rds.amazonaws.com',
 *   port: 1521,
 *   securityGroups: [],
 * });
 *
 * const multiTenant = new RdsOracleMultiTenant(this, 'OracleMultiTenant', {
 *   database: oracleInstance,
 * });
 *
 * @see {@link https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/oracle-multitenant.html | Oracle MultiTenant on Amazon RDS}
 */
export class RdsOracleMultiTenant extends Construct {
    /**
     * Mapping of providers for each CDK stack
     * Used to ensure only one provider is created per stack
     */
    private static serviceTokens = new Map<string, Provider>();

    /**
     * Builds the provider to support the Custom Resource
     *
     * @param scope Parent to which the Custom Resource belongs
     * @param props Metadata for configuring the Custom Resource
     *
     * @returns Provider for the worker
     */
    private static getOrBuildProvider(
        scope: Construct,
        props: RdsOracleMultiTenantProps
    ): Provider {
        const stackId = Stack.of(scope).node.id;

        if (!RdsOracleMultiTenant.serviceTokens.has(stackId)) {
            // Create a stack level construct to manage the framework
            const provider = new Construct(
                scope,
                `Cr${RdsOracleMultiTenant.name}`
            );

            const onEventHandler = new SecureFunction(provider, 'OnEvent', {
                code: Code.fromAsset(join(__dirname, 'handler', 'on-event')),
                handler: 'index.handler',
                memorySize: 512,
                timeout: Duration.minutes(5),
                runtime: Runtime.NODEJS_22_X,
                encryption: props.encryption,
                ...props.lambdaConfiguration
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
                    encryption: props.encryption,
                    ...props.lambdaConfiguration
                }
            );

            // Grant minimal required RDS permissions following principle of least privilege
            const rdsPolicy = new PolicyStatement({
                effect: Effect.ALLOW,
                actions: ['rds:ModifyDBInstance', 'rds:DescribeDBInstances'],
                resources: [props.database.instanceArn]
            });

            const tenantPolicy = new PolicyStatement({
                effect: Effect.ALLOW,
                actions: ['rds:CreateTenantDatabase'],
                resources: [
                    props.database.instanceArn,
                    `arn:${Aws.PARTITION}:rds:${Aws.REGION}:${Aws.ACCOUNT_ID}:tenant-database:*`
                ]
            });

            // Apply permissions to both handlers
            [onEventHandler, isCompleteHandler].forEach((handler) => {
                handler.function.addToRolePolicy(rdsPolicy);
                handler.function.addToRolePolicy(tenantPolicy);

                // Grant KMS permissions if encryption key is provided
                if (props.encryption) {
                    props.encryption.grantEncryptDecrypt(handler.function);
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
     * Translates the CDK construct properties to the Custom Resource
     * property format
     * @param props Metadata for configuring the Custom Resource
     * @returns Input for the actual Custom Resource worker
     */
    private static createCustomResourceProperties(
        props: RdsOracleMultiTenantProps
    ): IResourceProperties {
        return {
            DBInstanceIdentifier: props.database.instanceIdentifier
        };
    }

    /**
     * The Lambda function that handles OnEvent requests for the custom resource.
     * This function performs validation and initiates the Oracle MultiTenant conversion.
     */
    public readonly onEventHandler: IFunction;

    /**
     * The Lambda function that handles IsComplete requests for the custom resource.
     * This function monitors the conversion progress and determines when the operation is complete.
     */
    public readonly isCompleteHandler: IFunction;

    /**
     * The Custom Resource that manages the Oracle MultiTenant configuration.
     *
     * This resource handles the lifecycle of the Oracle MultiTenant conversion:
     * - **CREATE**: Validates the Oracle database and enables MultiTenant architecture
     * - **UPDATE**: No-op operation (MultiTenant conversion is irreversible)
     * - **DELETE**: No-op operation (MultiTenant configuration remains on the database)
     *
     * The Custom Resource returns the following data attributes:
     * - `DBInstanceIdentifier`: The RDS instance identifier
     * - `MultiTenantStatus`: Current status of the MultiTenant configuration
     * - `ModificationStatus`: Status of the modification operation
     * - `PendingModifications`: Any pending database modifications (if applicable)
     *
     * @example
     * Accessing Custom Resource attributes:
     *
     * const multiTenant = new RdsOracleMultiTenant(this, 'OracleMultiTenant', {
     *   database: oracleInstance,
     * });
     *
     * // Access the database identifier from the custom resource
     * const dbId = multiTenant.customResource.getAttString('DBInstanceIdentifier');
     * const status = multiTenant.customResource.getAttString('MultiTenantStatus');
     */
    public readonly customResource: CustomResource;

    /**
     * Creates a new RDS Oracle MultiTenant construct that enables Oracle MultiTenant configuration
     * on an existing RDS Oracle database instance.
     *
     * The constructor performs the following operations:
     * 1. Validates the provided properties (database instance is required)
     * 2. Creates or reuses a Lambda-backed Custom Resource provider
     * 3. Sets up IAM permissions for RDS operations
     * 4. Creates the Custom Resource with appropriate properties
     * 5. Establishes dependency on the underlying RDS database instance
     *
     * ## Validation Performed
     *
     * The constructor validates that:
     * - The `database` property is provided and not null
     * - The database has a valid `instanceIdentifier`
     *
     * Additional validation (Oracle engine, version, status) is performed by the Lambda function
     * during the actual MultiTenant conversion process.
     *
     * ## Resource Dependencies
     *
     * The construct automatically adds a dependency on the provided RDS database instance,
     * ensuring that the database is created before attempting MultiTenant configuration.
     *
     * ## Error Handling
     *
     * Constructor-level errors are thrown immediately for invalid properties.
     * Runtime errors during MultiTenant conversion are handled by the Lambda function
     * and reported through CloudFormation Custom Resource responses.
     *
     * @param scope - The parent construct (typically a Stack or another construct)
     * @param id - Unique identifier for this construct instance within the scope
     * @param props - Configuration properties for the Oracle MultiTenant construct
     *
     * @throws {Error} When the `database` property is not provided
     * @throws {Error} When the database instance identifier is not available
     *
     * @example
     * Basic constructor usage:
     *
     * const multiTenant = new RdsOracleMultiTenant(this, 'MyOracleMultiTenant', {
     *   database: myOracleInstance,
     * });
     *
     * @example
     * Constructor with all options:
     *
     * const multiTenant = new RdsOracleMultiTenant(this, 'MyOracleMultiTenant', {
     *   database: myOracleInstance,
     *   encryption: myKmsKey,
     *   lambdaConfiguration: {
     *     vpc: myVpc,
     *     subnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
     *     securityGroups: [mySecurityGroup],
     *     logGroupRetention: RetentionDays.ONE_MONTH,
     *     memorySize: 1024,
     *     timeout: Duration.minutes(45),
     *   },
     * });
     */
    constructor(
        scope: Construct,
        id: string,
        props: RdsOracleMultiTenantProps
    ) {
        super(scope, id);

        // Validate required properties
        if (!props.database) {
            throw new Error('database property is required');
        }

        if (!props.database.instanceIdentifier) {
            throw new Error(
                'database.instanceIdentifier is required for Oracle MultiTenant configuration'
            );
        }

        // Add dependency on the underlying RDS database instance
        this.node.addDependency(props.database);

        const provider = RdsOracleMultiTenant.getOrBuildProvider(scope, props);

        this.onEventHandler = provider.onEventHandler;
        this.isCompleteHandler = provider.isCompleteHandler!;

        this.customResource = new CustomResource(this, 'RdsOracleMultiTenant', {
            serviceToken: provider.serviceToken,
            properties:
                RdsOracleMultiTenant.createCustomResourceProperties(props),
            resourceType: 'Custom::RdsOracleMultiTenant'
        });
    }
}
