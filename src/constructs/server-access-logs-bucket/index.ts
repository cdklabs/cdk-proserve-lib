// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Arn, CfnResource, RemovalPolicy, Stack } from 'aws-cdk-lib';
import {
    Effect,
    PolicyStatement,
    ServicePrincipal,
    IRole
} from 'aws-cdk-lib/aws-iam';
import {
    BlockPublicAccess,
    Bucket,
    BucketEncryption,
    IBucket,
    LifecycleRule,
    ObjectOwnership,
    ReplicationRule
} from 'aws-cdk-lib/aws-s3';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';

/**
 * Properties for ServerAccessLogsBucket construct.
 *
 * Creates a secure S3 bucket configured to receive server access logs from other S3 buckets.
 * The bucket is configured with encryption, versioning, and appropriate bucket policies.
 */
export interface ServerAccessLogsBucketProps {
    /**
     * Optional bucket name. If not provided, CloudFormation will generate a unique name.
     *
     * Must follow S3 bucket naming rules (lowercase, no underscores, globally unique).
     *
     * @default - CloudFormation generated name
     */
    readonly bucketName?: string;

    /**
     * Source buckets that will deliver logs to this bucket.
     *
     * Can be specified as bucket ARNs (strings) or IBucket references.
     * Used to configure aws:SourceArn condition in the bucket policy.
     *
     * @default - Allows any bucket in the same account to deliver logs
     */
    readonly sourceBuckets?: (string | IBucket)[];

    /**
     * Source AWS account IDs that are allowed to deliver logs.
     *
     * Used to configure aws:SourceAccount condition in the bucket policy.
     *
     * @default - Current account only
     */
    readonly sourceAccountIds?: string[];

    /**
     * Optional prefix path for log objects.
     *
     * Recommended to end with a forward slash (/) for proper organization.
     * Applied to the bucket policy resource ARN to restrict where logs can be written.
     *
     * @default - No prefix (logs can be written to bucket root)
     */
    readonly logPrefix?: string;

    /**
     * Enable versioning on the bucket.
     *
     * Versioning helps maintain an audit trail and recover from accidental deletions.
     *
     * @default true
     */
    readonly versioned?: boolean;

    /**
     * Removal policy for the bucket.
     *
     * Controls what happens to the bucket when the CloudFormation stack is deleted.
     * - RETAIN: Bucket is retained (recommended for log data)
     * - DESTROY: Bucket is deleted (requires autoDeleteObjects=true if bucket contains objects)
     * - SNAPSHOT: Not applicable for S3 buckets
     *
     * @default RemovalPolicy.RETAIN
     */
    readonly removalPolicy?: RemovalPolicy;

    /**
     * Automatically delete objects when the bucket is removed.
     *
     * Only applies when removalPolicy is DESTROY.
     * When enabled, all objects in the bucket will be deleted before the bucket is destroyed.
     *
     * @default false
     */
    readonly autoDeleteObjects?: boolean;

    /**
     * Optional lifecycle rules for log retention management.
     *
     * Use lifecycle rules to automatically transition or expire old log files.
     * Common patterns include transitioning to cheaper storage classes or deleting logs after a retention period.
     *
     * @default - No lifecycle rules
     */
    readonly lifecycleRules?: LifecycleRule[];

    /**
     * Optional replication rules for cross-region or cross-account replication.
     *
     * Replication requires versioning to be enabled on both source and destination buckets.
     * When replication rules are specified, versioning will be automatically enabled.
     *
     * @default - No replication rules
     */
    readonly replicationRules?: ReplicationRule[];

    /**
     * Optional IAM role for replication.
     *
     * If not specified and replication rules are provided, a new role will be created automatically.
     * The role must have permissions to read from the source bucket and write to destination buckets.
     *
     * @default - Auto-generated role when replication rules are specified
     */
    readonly replicationRole?: IRole;

    /**
     * Optional KMS key for bucket encryption.
     *
     * When provided, the bucket will use SSE-KMS encryption with the specified key.
     * If not provided, the bucket will use SSE-S3 encryption (AES-256).
     *
     * @default - SSE-S3 encryption (AES-256)
     */
    readonly encryptionKey?: IKey;
}

/**
 * A secure S3 bucket configured to receive server access logs from other S3
 * buckets.
 *
 * The bucket policy includes conditions to restrict log delivery to specified
 * source buckets and accounts, following AWS security best practices.
 *
 * @example
 * const logsBucket = new ServerAccessLogsBucket(this, 'LogsBucket', {
 *   bucketName: 'my-access-logs',
 *   sourceBuckets: [sourceBucket1, sourceBucket2],
 *   logPrefix: 'logs/',
 *   versioned: true,
 * });
 */
export class ServerAccessLogsBucket extends Construct {
    /**
     * The S3 bucket configured for receiving server access logs.
     */
    public readonly bucket: Bucket;

    constructor(
        scope: Construct,
        id: string,
        props?: ServerAccessLogsBucketProps
    ) {
        super(scope, id);

        // Validate configuration
        this.validateProps(props);

        // Determine versioning setting - force enable if replication rules are provided
        const versioningEnabled =
            props?.replicationRules && props.replicationRules.length > 0
                ? true
                : (props?.versioned ?? true);

        // Determine encryption settings
        const encryptionConfig = props?.encryptionKey
            ? {
                  encryption: BucketEncryption.KMS,
                  encryptionKey: props.encryptionKey
              }
            : {
                  encryption: BucketEncryption.S3_MANAGED
              };

        // Create the S3 bucket with security defaults
        this.bucket = new Bucket(this, 'Bucket', {
            // Optional bucket name
            bucketName: props?.bucketName,

            // Encryption configuration (SSE-S3 by default, SSE-KMS if key provided)
            ...encryptionConfig,

            // Enable versioning by default (configurable, but required for replication)
            versioned: versioningEnabled,

            // Block all public access
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,

            // Enforce bucket owner ownership (disables ACLs)
            objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,

            // Default to RETAIN to prevent accidental data loss
            removalPolicy: props?.removalPolicy ?? RemovalPolicy.RETAIN,

            // Auto-delete objects configuration
            autoDeleteObjects: props?.autoDeleteObjects ?? false,

            // Apply lifecycle rules if provided
            lifecycleRules: props?.lifecycleRules,

            // Apply replication rules if provided
            replicationRules: props?.replicationRules,

            // Apply replication role if provided
            replicationRole: props?.replicationRole,

            // Enforce SSL/TLS for all connections
            enforceSSL: true
        });

        // Add bucket policy for logging service principal
        this.addLoggingServicePolicy(props);

        // Add CDK Nag suppressions for expected violations in server access logs buckets
        this.addCdkNagSuppressions(props);
    }

    /**
     * Validates the construct properties.
     */
    private validateProps(props?: ServerAccessLogsBucketProps): void {
        // Validate bucket name format if provided (including empty strings)
        if (props?.bucketName !== undefined) {
            this.validateBucketName(props.bucketName);
        }

        // Validate source bucket ARNs if provided
        if (props?.sourceBuckets) {
            for (const source of props.sourceBuckets) {
                if (typeof source === 'string') {
                    this.validateBucketArn(source);
                }
            }
        }
    }

    /**
     * Validates S3 bucket name format.
     */
    private validateBucketName(bucketName: string): void {
        // Check length
        if (bucketName.length < 3 || bucketName.length > 63) {
            throw new Error(
                `Bucket name must be between 3 and 63 characters long. Got: ${bucketName}`
            );
        }

        // Check for uppercase letters
        if (bucketName !== bucketName.toLowerCase()) {
            throw new Error(
                `Bucket name must not contain uppercase letters. Got: ${bucketName}`
            );
        }

        // Check for underscores
        if (bucketName.includes('_')) {
            throw new Error(
                `Bucket name must not contain underscores. Got: ${bucketName}`
            );
        }

        // Check valid characters (lowercase letters, numbers, dots, hyphens)
        const validCharPattern = /^[a-z0-9.-]+$/;
        if (!validCharPattern.test(bucketName)) {
            throw new Error(
                `Bucket name can only contain lowercase letters, numbers, dots (.), and hyphens (-). Got: ${bucketName}`
            );
        }

        // Check that it starts and ends with a letter or number
        const startsEndsWithAlphanumeric = /^[a-z0-9].*[a-z0-9]$/;
        if (!startsEndsWithAlphanumeric.test(bucketName)) {
            throw new Error(
                `Bucket name must begin and end with a letter or number. Got: ${bucketName}`
            );
        }

        // Check for consecutive dots
        if (bucketName.includes('..')) {
            throw new Error(
                `Bucket name must not contain consecutive dots. Got: ${bucketName}`
            );
        }

        // Check for dot-dash or dash-dot patterns (not allowed adjacent to dots)
        if (bucketName.includes('.-') || bucketName.includes('-.')) {
            throw new Error(
                `Bucket name must not contain dot-dash (.-) or dash-dot (-.) patterns. Got: ${bucketName}`
            );
        }
    }

    /**
     * Validates S3 bucket ARN format.
     */
    private validateBucketArn(arn: string): void {
        // Basic ARN format check - supports any AWS partition
        const arnPattern = /^arn:[a-z0-9-]+:s3:::([a-z0-9.-]+)(\/.*)?$/;
        const match = arnPattern.exec(arn);

        if (!match) {
            throw new Error(
                `Invalid S3 bucket ARN format. Expected format: arn:partition:s3:::bucket-name. Got: ${arn}`
            );
        }

        // Extract bucket name from ARN and validate it
        const bucketName = match[1];
        this.validateBucketName(bucketName);
    }

    /**
     * Adds bucket policy statement to allow the S3 logging service principal to write logs.
     */
    private addLoggingServicePolicy(props?: ServerAccessLogsBucketProps): void {
        const stack = Stack.of(this);

        // Build resource ARN with optional log prefix
        const resourceArn = props?.logPrefix
            ? this.bucket.arnForObjects(`${props.logPrefix}*`)
            : this.bucket.arnForObjects('*');

        // Prepare source bucket ARNs for aws:SourceArn condition
        const sourceBucketArns: string[] = [];
        if (props?.sourceBuckets && props.sourceBuckets.length > 0) {
            for (const source of props.sourceBuckets) {
                if (typeof source === 'string') {
                    // String ARN provided directly
                    sourceBucketArns.push(source);
                } else {
                    // IBucket reference - get its ARN
                    sourceBucketArns.push(source.bucketArn);
                }
            }
        } else {
            // No source buckets specified - allow any bucket in current account
            sourceBucketArns.push(
                Arn.format(
                    {
                        service: 's3',
                        resource: '*',
                        region: '',
                        account: ''
                    },
                    stack
                )
            );
        }

        // Prepare source account IDs for aws:SourceAccount condition
        const sourceAccountIds =
            props?.sourceAccountIds && props.sourceAccountIds.length > 0
                ? props.sourceAccountIds
                : [stack.account];

        // Create policy statement for logging service principal
        const loggingStatement = new PolicyStatement({
            effect: Effect.ALLOW,
            principals: [new ServicePrincipal('logging.s3.amazonaws.com')],
            actions: ['s3:PutObject'],
            resources: [resourceArn],
            conditions: {
                ArnLike: {
                    'aws:SourceArn': sourceBucketArns
                },
                StringEquals: {
                    'aws:SourceAccount': sourceAccountIds
                }
            }
        });

        // Add the policy statement to the bucket
        this.bucket.addToResourcePolicy(loggingStatement);
    }

    /**
     * Adds CDK Nag suppressions for expected violations in server access logs
     * buckets.
     *
     * These suppressions are necessary because server access logs destination
     * buckets have specific AWS restrictions that conflict with some security
     * rules.
     */
    private addCdkNagSuppressions(props?: ServerAccessLogsBucketProps): void {
        this.bucket.node.children.forEach((c) => {
            if (c instanceof CfnResource) {
                const suppressions = [];
                suppressions.push({
                    id: 'NIST.800.53.R5-S3BucketLoggingEnabled',
                    reason: 'This is a server access logs destination bucket - enabling server access logging would create an infinite loop'
                });
                suppressions.push({
                    id: 'AwsSolutions-S1',
                    reason: 'This is a server access logs destination bucket - enabling server access logging would create an infinite loop'
                });

                c.addMetadata('cdk_nag', {
                    rules_to_suppress: suppressions
                });
            }
        });
    }
}
