// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { beforeEach, describe, it } from 'vitest';
import { SecurityCompliance } from '../../../../../src/aspects/security-compliance';
import { describeCdkTest } from '../../../../../utilities/cdk-nag-test';

describeCdkTest(SecurityCompliance, (_, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();
    });

    describe('S3', () => {
        it('does not apply versioning config if disabled', () => {
            // Arrange
            new Bucket(stack, 'TestBucket');
            Aspects.of(stack).add(
                new SecurityCompliance({
                    settings: {
                        s3: {
                            versioning: {
                                disabled: true
                            }
                        }
                    }
                })
            );

            // Act
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::S3::Bucket', {
                VersioningConfiguration: Match.absent()
            });
        });

        it('configures server access logging when destination bucket is specified', () => {
            // Arrange
            const bucket = new Bucket(stack, 'TestBucket');

            // Act
            Aspects.of(stack).add(
                new SecurityCompliance({
                    settings: {
                        s3: {
                            serverAccessLogs: {
                                destinationBucketName: 'access-logs-bucket'
                            }
                        }
                    }
                })
            );
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::S3::Bucket', {
                LoggingConfiguration: {
                    DestinationBucketName: 'access-logs-bucket',
                    LogFilePrefix: Match.stringLikeRegexp('TestBucket')
                }
            });
        });

        it('does not configure logging when destination bucket is not specified', () => {
            // Arrange
            new Bucket(stack, 'TestBucket');

            // Act
            Aspects.of(stack).add(new SecurityCompliance());
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::S3::Bucket', {
                LoggingConfiguration: Match.absent()
            });
        });

        it('does not override existing logging configuration', () => {
            // Arrange
            const bucket = new Bucket(stack, 'TestBucket');
            const cfnBucket = bucket.node.defaultChild as CfnBucket;
            cfnBucket.loggingConfiguration = {
                destinationBucketName: 'existing-logs-bucket',
                logFilePrefix: 'custom-prefix'
            };

            // Act
            Aspects.of(stack).add(
                new SecurityCompliance({
                    settings: {
                        s3: {
                            serverAccessLogs: {
                                destinationBucketName: 'new-logs-bucket'
                            }
                        }
                    }
                })
            );
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::S3::Bucket', {
                LoggingConfiguration: {
                    DestinationBucketName: 'existing-logs-bucket',
                    LogFilePrefix: 'custom-prefix'
                }
            });
        });

        it('reuses access log bucket for multiple buckets in same stack', () => {
            // Arrange
            new Bucket(stack, 'TestBucket1');
            new Bucket(stack, 'TestBucket2');

            // Act
            Aspects.of(stack).add(
                new SecurityCompliance({
                    settings: {
                        s3: {
                            serverAccessLogs: {
                                destinationBucketName: 'access-logs-bucket'
                            }
                        }
                    }
                })
            );
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::S3::Bucket', {
                LoggingConfiguration: {
                    DestinationBucketName: 'access-logs-bucket',
                    LogFilePrefix: Match.stringLikeRegexp('TestBucket1')
                }
            });
            template.hasResourceProperties('AWS::S3::Bucket', {
                LoggingConfiguration: {
                    DestinationBucketName: 'access-logs-bucket',
                    LogFilePrefix: Match.stringLikeRegexp('TestBucket2')
                }
            });
        });

        it('handles multiple stacks with same destination bucket', () => {
            // Arrange
            const stack1 = new Stack(undefined, 'Stack1');
            const stack2 = new Stack(undefined, 'Stack2');

            new Bucket(stack1, 'TestBucket1');
            new Bucket(stack2, 'TestBucket2');

            const aspect = new SecurityCompliance({
                settings: {
                    s3: {
                        serverAccessLogs: {
                            destinationBucketName: 'access-logs-bucket'
                        }
                    }
                }
            });

            // Act
            Aspects.of(stack1).add(aspect);
            Aspects.of(stack2).add(aspect);

            const template1 = Template.fromStack(stack1);
            const template2 = Template.fromStack(stack2);

            // Assert
            template1.hasResourceProperties('AWS::S3::Bucket', {
                LoggingConfiguration: {
                    DestinationBucketName: 'access-logs-bucket',
                    LogFilePrefix: Match.stringLikeRegexp('TestBucket1')
                }
            });

            template2.hasResourceProperties('AWS::S3::Bucket', {
                LoggingConfiguration: {
                    DestinationBucketName: 'access-logs-bucket',
                    LogFilePrefix: Match.stringLikeRegexp('TestBucket2')
                }
            });
        });
    });
});
