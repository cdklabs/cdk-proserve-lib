// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Bucket, StorageClass } from 'aws-cdk-lib/aws-s3';
import { expect, it, beforeEach } from 'vitest';
import { ServerAccessLogsBucket } from '../../../src/constructs/server-access-logs-bucket';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';
import { NagSuppressions } from 'cdk-nag';

describeCdkTest(ServerAccessLogsBucket, (id, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        // Arrange
        stack = getStack();

        NagSuppressions.addStackSuppressions(getStack(), [
            {
                id: 'NIST.800.53.R5-S3BucketVersioningEnabled',
                reason: 'Versioning can optionally be enabled by the user on the construct.'
            }
        ]);
        NagSuppressions.addStackSuppressions(getStack(), [
            {
                id: 'NIST.800.53.R5-S3BucketReplicationEnabled',
                reason: 'The user has the ability to enable bucket replication.'
            }
        ]);
    });

    it('should create bucket with SSE-S3 encryption', () => {
        // Act
        new ServerAccessLogsBucket(stack, id);

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::Bucket', {
            BucketEncryption: {
                ServerSideEncryptionConfiguration: [
                    {
                        ServerSideEncryptionByDefault: {
                            SSEAlgorithm: 'AES256'
                        }
                    }
                ]
            }
        });
    });

    it('should create bucket policy with logging service principal', () => {
        // Act
        new ServerAccessLogsBucket(stack, id);

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::BucketPolicy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Effect: 'Allow',
                        Principal: {
                            Service: 'logging.s3.amazonaws.com'
                        },
                        Action: 's3:PutObject'
                    })
                ])
            }
        });
    });

    it('should enable versioning by default', () => {
        // Act
        new ServerAccessLogsBucket(stack, id);

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::Bucket', {
            VersioningConfiguration: {
                Status: 'Enabled'
            }
        });
    });

    it('should allow disabling versioning via props', () => {
        // Act
        new ServerAccessLogsBucket(stack, id, {
            versioned: false
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::Bucket', {
            VersioningConfiguration: Match.absent()
        });
    });

    it('should enable all Block Public Access settings', () => {
        // Act
        new ServerAccessLogsBucket(stack, id);

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::Bucket', {
            PublicAccessBlockConfiguration: {
                BlockPublicAcls: true,
                BlockPublicPolicy: true,
                IgnorePublicAcls: true,
                RestrictPublicBuckets: true
            }
        });
    });

    it('should set Object Ownership to BucketOwnerEnforced', () => {
        // Act
        new ServerAccessLogsBucket(stack, id);

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::Bucket', {
            OwnershipControls: {
                Rules: [
                    {
                        ObjectOwnership: 'BucketOwnerEnforced'
                    }
                ]
            }
        });
    });

    it('should default to RETAIN removal policy', () => {
        // Act
        new ServerAccessLogsBucket(stack, id);

        // Assert
        const template = getTemplate();
        template.hasResource('AWS::S3::Bucket', {
            DeletionPolicy: 'Retain',
            UpdateReplacePolicy: 'Retain'
        });
    });

    it('should apply custom removal policy when specified', () => {
        // Act
        new ServerAccessLogsBucket(stack, id, {
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true
        });

        // Assert
        const template = getTemplate();
        template.hasResource('AWS::S3::Bucket', {
            DeletionPolicy: 'Delete',
            UpdateReplacePolicy: 'Delete'
        });
    });

    it('should apply custom bucket name when provided', () => {
        // Act
        new ServerAccessLogsBucket(stack, id, {
            bucketName: 'my-custom-logs-bucket'
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::Bucket', {
            BucketName: 'my-custom-logs-bucket'
        });
    });

    it('should not set bucket name when not provided', () => {
        // Act
        new ServerAccessLogsBucket(stack, id);

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::Bucket', {
            BucketName: Match.absent()
        });
    });

    it('should apply lifecycle rules when provided', () => {
        // Act
        new ServerAccessLogsBucket(stack, id, {
            lifecycleRules: [
                {
                    id: 'DeleteOldLogs',
                    enabled: true,
                    expiration: Duration.days(90)
                },
                {
                    id: 'TransitionToIA',
                    enabled: true,
                    transitions: [
                        {
                            storageClass: StorageClass.INFREQUENT_ACCESS,
                            transitionAfter: Duration.days(30)
                        }
                    ]
                }
            ]
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::Bucket', {
            LifecycleConfiguration: {
                Rules: [
                    {
                        Id: 'DeleteOldLogs',
                        Status: 'Enabled',
                        ExpirationInDays: 90
                    },
                    {
                        Id: 'TransitionToIA',
                        Status: 'Enabled',
                        Transitions: [
                            {
                                StorageClass: 'STANDARD_IA',
                                TransitionInDays: 30
                            }
                        ]
                    }
                ]
            }
        });
    });

    it('should not set lifecycle rules when not provided', () => {
        // Act
        new ServerAccessLogsBucket(stack, id);

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::Bucket', {
            LifecycleConfiguration: Match.absent()
        });
    });

    it('should create bucket policy with logging service principal having s3:PutObject permission', () => {
        // Act
        new ServerAccessLogsBucket(stack, id);

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::BucketPolicy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Effect: 'Allow',
                        Principal: {
                            Service: 'logging.s3.amazonaws.com'
                        },
                        Action: 's3:PutObject'
                    })
                ])
            }
        });
    });

    it('should include aws:SourceArn condition with correct ARNs when no source buckets specified', () => {
        // Act
        new ServerAccessLogsBucket(stack, id);

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::BucketPolicy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 's3:PutObject',
                        Condition: Match.objectLike({
                            ArnLike: {
                                'aws:SourceArn': [
                                    Match.objectLike({
                                        'Fn::Join': [
                                            '',
                                            [
                                                'arn:',
                                                Match.objectLike({
                                                    Ref: 'AWS::Partition'
                                                }),
                                                ':s3:::*'
                                            ]
                                        ]
                                    })
                                ]
                            }
                        })
                    })
                ])
            }
        });
    });

    it('should include aws:SourceArn condition with specific ARNs for single source bucket', () => {
        // Act
        new ServerAccessLogsBucket(stack, id, {
            sourceBuckets: ['arn:aws:s3:::source-bucket']
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::BucketPolicy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Condition: Match.objectLike({
                            ArnLike: {
                                'aws:SourceArn': ['arn:aws:s3:::source-bucket']
                            }
                        })
                    })
                ])
            }
        });
    });

    it('should include aws:SourceArn condition with multiple ARNs for multiple source buckets', () => {
        // Act
        new ServerAccessLogsBucket(stack, id, {
            sourceBuckets: [
                'arn:aws:s3:::source-bucket-1',
                'arn:aws:s3:::source-bucket-2'
            ]
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::BucketPolicy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Condition: Match.objectLike({
                            ArnLike: {
                                'aws:SourceArn': [
                                    'arn:aws:s3:::source-bucket-1',
                                    'arn:aws:s3:::source-bucket-2'
                                ]
                            }
                        })
                    })
                ])
            }
        });
    });

    it('should include aws:SourceAccount condition with current account by default', () => {
        // Act
        new ServerAccessLogsBucket(stack, id);

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::BucketPolicy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Condition: Match.objectLike({
                            StringEquals: {
                                'aws:SourceAccount': ['123456789012']
                            }
                        })
                    })
                ])
            }
        });
    });

    it('should include aws:SourceAccount condition with correct account IDs when specified', () => {
        // Act
        new ServerAccessLogsBucket(stack, id, {
            sourceAccountIds: ['111111111111', '222222222222']
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::BucketPolicy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Condition: Match.objectLike({
                            StringEquals: {
                                'aws:SourceAccount': [
                                    '111111111111',
                                    '222222222222'
                                ]
                            }
                        })
                    })
                ])
            }
        });
    });

    it('should include log prefix in policy resource ARN when specified', () => {
        // Act
        new ServerAccessLogsBucket(stack, id, {
            logPrefix: 'logs/'
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::BucketPolicy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 's3:PutObject',
                        Resource: Match.objectLike({
                            'Fn::Join': [
                                '',
                                [
                                    Match.objectLike({
                                        'Fn::GetAtt': Match.anyValue()
                                    }),
                                    '/logs/*'
                                ]
                            ]
                        })
                    })
                ])
            }
        });
    });

    it('should include SSL enforcement policy statement', () => {
        // Act
        new ServerAccessLogsBucket(stack, id);

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::BucketPolicy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Effect: 'Deny',
                        Principal: {
                            AWS: '*'
                        },
                        Action: 's3:*',
                        Condition: {
                            Bool: {
                                'aws:SecureTransport': 'false'
                            }
                        }
                    })
                ])
            }
        });
    });

    it('should create policy with both logging and SSL enforcement statements', () => {
        // Act
        new ServerAccessLogsBucket(stack, id);

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::BucketPolicy', {
            PolicyDocument: {
                Statement: [
                    // SSL enforcement statement (comes first)
                    Match.objectLike({
                        Effect: 'Deny',
                        Principal: {
                            AWS: '*'
                        },
                        Action: 's3:*',
                        Condition: {
                            Bool: {
                                'aws:SecureTransport': 'false'
                            }
                        }
                    }),
                    // Logging service principal statement
                    Match.objectLike({
                        Effect: 'Allow',
                        Principal: {
                            Service: 'logging.s3.amazonaws.com'
                        },
                        Action: 's3:PutObject'
                    })
                ]
            }
        });
    });

    it('should accept valid bucket names', () => {
        // Act & Assert - These should not throw errors
        new ServerAccessLogsBucket(stack, `${id}1`, {
            bucketName: 'valid-bucket-name'
        });

        new ServerAccessLogsBucket(stack, `${id}2`, {
            bucketName: 'bucket123'
        });

        new ServerAccessLogsBucket(stack, `${id}3`, {
            bucketName: 'my.bucket.name'
        });

        new ServerAccessLogsBucket(stack, `${id}4`, {
            bucketName: 'a23'
        });
    });

    it('should reject bucket names that are too short', () => {
        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                bucketName: 'ab'
            });
        }).toThrow(
            'Bucket name must be between 3 and 63 characters long. Got: ab'
        );
    });

    it('should reject bucket names that are too long', () => {
        // Arrange
        const longName = 'a'.repeat(64);

        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                bucketName: longName
            });
        }).toThrow(
            `Bucket name must be between 3 and 63 characters long. Got: ${longName}`
        );
    });

    it('should reject bucket names with uppercase letters', () => {
        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                bucketName: 'MyBucket'
            });
        }).toThrow(
            'Bucket name must not contain uppercase letters. Got: MyBucket'
        );
    });

    it('should reject bucket names with underscores', () => {
        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                bucketName: 'my_bucket'
            });
        }).toThrow('Bucket name must not contain underscores. Got: my_bucket');
    });

    it('should reject bucket names with invalid characters', () => {
        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                bucketName: 'my@bucket'
            });
        }).toThrow(
            'Bucket name can only contain lowercase letters, numbers, dots (.), and hyphens (-). Got: my@bucket'
        );

        expect(() => {
            new ServerAccessLogsBucket(stack, `${id}2`, {
                bucketName: 'my bucket'
            });
        }).toThrow(
            'Bucket name can only contain lowercase letters, numbers, dots (.), and hyphens (-). Got: my bucket'
        );
    });

    it('should reject bucket names that do not start with alphanumeric character', () => {
        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                bucketName: '-mybucket'
            });
        }).toThrow(
            'Bucket name must begin and end with a letter or number. Got: -mybucket'
        );

        expect(() => {
            new ServerAccessLogsBucket(stack, `${id}2`, {
                bucketName: '.mybucket'
            });
        }).toThrow(
            'Bucket name must begin and end with a letter or number. Got: .mybucket'
        );
    });

    it('should reject bucket names that do not end with alphanumeric character', () => {
        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                bucketName: 'mybucket-'
            });
        }).toThrow(
            'Bucket name must begin and end with a letter or number. Got: mybucket-'
        );

        expect(() => {
            new ServerAccessLogsBucket(stack, `${id}2`, {
                bucketName: 'mybucket.'
            });
        }).toThrow(
            'Bucket name must begin and end with a letter or number. Got: mybucket.'
        );
    });

    it('should reject bucket names with consecutive dots', () => {
        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                bucketName: 'my..bucket'
            });
        }).toThrow(
            'Bucket name must not contain consecutive dots. Got: my..bucket'
        );
    });

    it('should reject bucket names with dot-dash patterns', () => {
        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                bucketName: 'my.-bucket'
            });
        }).toThrow(
            'Bucket name must not contain dot-dash (.-) or dash-dot (-.) patterns. Got: my.-bucket'
        );
    });

    it('should reject bucket names with dash-dot patterns', () => {
        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                bucketName: 'my-.bucket'
            });
        }).toThrow(
            'Bucket name must not contain dot-dash (.-) or dash-dot (-.) patterns. Got: my-.bucket'
        );
    });

    it('should accept valid S3 bucket ARNs', () => {
        // Act & Assert - These should not throw errors
        new ServerAccessLogsBucket(stack, `${id}1`, {
            sourceBuckets: ['arn:aws:s3:::valid-bucket-name']
        });

        new ServerAccessLogsBucket(stack, `${id}2`, {
            sourceBuckets: ['arn:aws:s3:::bucket123']
        });

        new ServerAccessLogsBucket(stack, `${id}3`, {
            sourceBuckets: ['arn:aws:s3:::my.bucket.name']
        });

        new ServerAccessLogsBucket(stack, `${id}4`, {
            sourceBuckets: ['arn:aws:s3:::bucket-name/*']
        });
    });

    it('should accept multiple valid S3 bucket ARNs', () => {
        // Act & Assert - This should not throw an error
        new ServerAccessLogsBucket(stack, id, {
            sourceBuckets: [
                'arn:aws:s3:::bucket-one',
                'arn:aws:s3:::bucket-two',
                'arn:aws:s3:::bucket.three'
            ]
        });
    });

    it('should reject invalid ARN format', () => {
        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                sourceBuckets: ['invalid-arn']
            });
        }).toThrow(
            'Invalid S3 bucket ARN format. Expected format: arn:aws:s3:::bucket-name. Got: invalid-arn'
        );

        expect(() => {
            new ServerAccessLogsBucket(stack, `${id}2`, {
                sourceBuckets: ['arn:aws:ec2:::instance-id']
            });
        }).toThrow(
            'Invalid S3 bucket ARN format. Expected format: arn:aws:s3:::bucket-name. Got: arn:aws:ec2:::instance-id'
        );
    });

    it('should reject ARNs with invalid bucket names', () => {
        // Act & Assert
        // ARN regex fails first for uppercase letters and underscores
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                sourceBuckets: ['arn:aws:s3:::My_Invalid_Bucket']
            });
        }).toThrow(
            'Invalid S3 bucket ARN format. Expected format: arn:aws:s3:::bucket-name. Got: arn:aws:s3:::My_Invalid_Bucket'
        );

        // Short bucket name passes ARN regex but fails bucket name validation
        expect(() => {
            new ServerAccessLogsBucket(stack, `${id}2`, {
                sourceBuckets: ['arn:aws:s3:::ab']
            });
        }).toThrow(
            'Bucket name must be between 3 and 63 characters long. Got: ab'
        );
    });

    it('should validate all source bucket ARNs in array', () => {
        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                sourceBuckets: [
                    'arn:aws:s3:::valid-bucket',
                    'arn:aws:s3:::Invalid_Bucket',
                    'arn:aws:s3:::another-valid-bucket'
                ]
            });
        }).toThrow(
            'Invalid S3 bucket ARN format. Expected format: arn:aws:s3:::bucket-name. Got: arn:aws:s3:::Invalid_Bucket'
        );
    });

    it('should not validate IBucket references', () => {
        // Arrange
        const sourceBucket = new Bucket(stack, 'SourceBucket', {
            bucketName: 'source-bucket'
        });

        // Act & Assert - This should not throw an error - IBucket references are not validated
        new ServerAccessLogsBucket(stack, id, {
            sourceBuckets: [sourceBucket]
        });
    });

    it('should validate mixed source buckets (only string ARNs)', () => {
        // Arrange
        const sourceBucket = new Bucket(stack, 'SourceBucket');

        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                sourceBuckets: [
                    'arn:aws:s3:::valid-bucket',
                    sourceBucket, // IBucket reference - not validated
                    'arn:aws:s3:::Invalid_Bucket' // String ARN - will be validated
                ]
            });
        }).toThrow(
            'Invalid S3 bucket ARN format. Expected format: arn:aws:s3:::bucket-name. Got: arn:aws:s3:::Invalid_Bucket'
        );
    });

    it('should handle empty bucket name gracefully', () => {
        // Act & Assert
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                bucketName: ''
            });
        }).toThrow(
            'Bucket name must be between 3 and 63 characters long. Got: '
        );
    });

    it('should handle empty source buckets array', () => {
        // Act & Assert - Empty array should not cause validation errors
        new ServerAccessLogsBucket(stack, id, {
            sourceBuckets: []
        });
    });

    it('should handle undefined props gracefully', () => {
        // Act & Assert - Should not throw validation errors
        new ServerAccessLogsBucket(stack, id);
        new ServerAccessLogsBucket(stack, `${id}2`, {});
    });

    it('should provide clear error messages for validation failures', () => {
        // Act & Assert - Test that error messages are descriptive and include the invalid value
        expect(() => {
            new ServerAccessLogsBucket(stack, id, {
                bucketName: 'INVALID'
            });
        }).toThrow(
            /Bucket name must not contain uppercase letters\. Got: INVALID/
        );

        expect(() => {
            new ServerAccessLogsBucket(stack, `${id}2`, {
                sourceBuckets: ['not-an-arn']
            });
        }).toThrow(
            /Invalid S3 bucket ARN format\. Expected format: arn:aws:s3:::bucket-name\. Got: not-an-arn/
        );
    });

    it('should support custom replication role', () => {
        // Arrange
        const destinationBucket = new Bucket(stack, 'DestinationBucket');
        const customRole = new (require('aws-cdk-lib/aws-iam').Role)(
            stack,
            'CustomReplicationRole',
            {
                assumedBy:
                    new (require('aws-cdk-lib/aws-iam').ServicePrincipal)(
                        's3.amazonaws.com'
                    )
            }
        );

        // Act
        new ServerAccessLogsBucket(stack, id, {
            replicationRules: [
                {
                    destination: destinationBucket,
                    priority: 1
                }
            ],
            replicationRole: customRole
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::Bucket', {
            ReplicationConfiguration: {
                Role: {
                    'Fn::GetAtt': [Match.anyValue(), 'Arn']
                }
            }
        });
    });

    it('should support multiple replication rules', () => {
        // Arrange
        const destinationBucket1 = new Bucket(stack, 'DestinationBucket1');
        const destinationBucket2 = new Bucket(stack, 'DestinationBucket2');

        // Add CDK Nag suppressions for replication role wildcard permissions
        NagSuppressions.addStackSuppressions(stack, [
            {
                id: 'AwsSolutions-IAM5',
                reason: 'Replication role requires wildcard permissions to replicate objects to destination buckets',
                appliesTo: [
                    'Resource::<ServerAccessLogsBucket2EA93BF7.Arn>/*',
                    'Resource::<DestinationBucket1590C2E3A.Arn>/*',
                    'Resource::<DestinationBucket217C2CCD2.Arn>/*'
                ]
            }
        ]);

        // Act
        new ServerAccessLogsBucket(stack, id, {
            replicationRules: [
                {
                    destination: destinationBucket1,
                    priority: 1
                },
                {
                    destination: destinationBucket2,
                    priority: 2
                }
            ]
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::S3::Bucket', {
            ReplicationConfiguration: {
                Rules: [
                    {
                        Status: 'Enabled',
                        Priority: 1
                    },
                    {
                        Status: 'Enabled',
                        Priority: 2
                    }
                ]
            }
        });
    });
});
