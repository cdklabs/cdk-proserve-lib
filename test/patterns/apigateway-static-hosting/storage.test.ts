// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Key } from 'aws-cdk-lib/aws-kms';
import { NagSuppressions } from 'cdk-nag';
import { DeletionPolicy } from 'cloudform-types/types/resource';
import CfnBucketElement from 'cloudform-types/types/s3/bucket';
import { BucketPolicyProperties } from 'cloudform-types/types/s3/bucketPolicy';
import { describe, beforeEach, it, expect } from 'vitest';
import {
    mockBadAssetPath,
    mockFolderAsset,
    mockFolderAssetPath,
    mockMissingAssetPath,
    mockZipAssetPath
} from './fixtures';
import {
    commonStackSuppressions,
    createCommonNagProps,
    createPartialNameMatcher,
    createPatternUnderTest
} from './fixtures/common';
import {
    ApiGatewayStaticHosting,
    ApiGatewayStaticHostingProps
} from '../../../src/patterns/apigateway-static-hosting';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

describeCdkTest(ApiGatewayStaticHosting, (id, getStack, getTemplate) => {
    let stack: Stack;
    let commonNagProps: Partial<ApiGatewayStaticHostingProps>;

    beforeEach(() => {
        stack = getStack();
        commonNagProps = createCommonNagProps(stack);

        NagSuppressions.addStackSuppressions(stack, commonStackSuppressions);
    });

    /**
     * Store
     */
    const storePartialName = createPartialNameMatcher('store', id);
    const storeResources = [
        {
            'Fn::GetAtt': [storePartialName, 'Arn']
        },
        {
            'Fn::Join': [
                '',
                [
                    {
                        'Fn::GetAtt': [storePartialName, 'Arn']
                    },
                    '/*'
                ]
            ]
        }
    ];

    describe('Storage', () => {
        it('Creates an Amazon S3 bucket to store static assets', () => {
            // Arrange
            // No action

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: 'public'
                }
            });

            // Assert
            const template = getTemplate();

            const store: Partial<CfnBucketElement> = {
                Properties: {
                    AccessControl: 'Private',
                    BucketEncryption: {
                        ServerSideEncryptionConfiguration: [
                            {
                                ServerSideEncryptionByDefault: {
                                    SSEAlgorithm: 'AES256'
                                }
                            }
                        ]
                    },
                    PublicAccessBlockConfiguration: {
                        BlockPublicAcls: true,
                        BlockPublicPolicy: true,
                        IgnorePublicAcls: true,
                        RestrictPublicBuckets: true
                    },
                    VersioningConfiguration: {
                        Status: 'Enabled'
                    }
                },
                DeletionPolicy: DeletionPolicy.Delete
            };
            const storePolicy: Partial<
                BucketPolicyProperties | { Bucket: string | object }
            > = {
                Bucket: { Ref: storePartialName },
                PolicyDocument: Match.objectLike({
                    Statement: Match.arrayWith([
                        Match.objectLike({
                            Action: 's3:*',
                            Condition: {
                                Bool: { 'aws:SecureTransport': 'false' }
                            },
                            Effect: 'Deny',
                            Principal: { AWS: '*' },
                            Resource: storeResources
                        })
                    ])
                })
            };

            template.hasResource('AWS::S3::Bucket', Match.objectLike(store));
            template.hasResourceProperties(
                'AWS::S3::BucketPolicy',
                storePolicy
            );
        });

        it('Keeps the Amazon S3 bucket on stack deletion if requested', () => {
            // Arrange
            // No action

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: 'public'
                },
                retainStoreOnDeletion: true
            });

            // Assert
            const template = getTemplate();

            const store: Partial<CfnBucketElement> = {
                DeletionPolicy: DeletionPolicy.Retain
            };
            template.hasResource('AWS::S3::Bucket', Match.objectLike(store));
        });

        it('Loads assets to the Amazon S3 bucket from the local file system', () => {
            // Arrange
            // No action

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: 'public'
                }
            });

            // Assert
            const template = getTemplate();

            template.resourcePropertiesCountIs(
                'Custom::S3AutoDeleteObjects',
                Match.objectLike({
                    BucketName: { Ref: storePartialName }
                }),
                1
            );
            template.resourcePropertiesCountIs(
                'Custom::CDKBucketDeployment',
                Match.objectLike({
                    DestinationBucketName: { Ref: storePartialName },
                    Prune: false
                }),
                1
            );
        });

        it('Handles assets when they are folders', () => {
            // Arrange
            // No action

            // Act
            const construct = createPatternUnderTest(
                stack,
                id,
                commonNagProps,
                {
                    asset: mockFolderAsset,
                    domain: {
                        basePath: 'public'
                    }
                },
                true
            );

            // Assert
            expect(construct).not.toThrow();
        });

        it('Handles assets when they are zips', () => {
            // Arrange
            // No action

            // Act
            const construct = createPatternUnderTest(
                stack,
                id,
                commonNagProps,
                {
                    asset: {
                        id: 'zip',
                        path: mockZipAssetPath
                    },
                    domain: {
                        basePath: 'public'
                    }
                },
                true
            );

            // Assert
            expect(construct).not.toThrow();
        });

        it('Throws an error when assets are missing', () => {
            // Arrange
            // No action

            // Act
            const construct = createPatternUnderTest(
                stack,
                id,
                commonNagProps,
                {
                    asset: {
                        id: 'missing',
                        path: mockMissingAssetPath
                    },
                    domain: {
                        basePath: 'public'
                    }
                },
                true
            );

            // Assert
            expect(construct).toThrow();
        });

        it('Throws an error when assets are not an acceptable format', () => {
            // Arrange
            // No action

            // Act
            const construct = createPatternUnderTest(
                stack,
                id,
                commonNagProps,
                {
                    asset: {
                        id: 'bad',
                        path: mockBadAssetPath
                    },
                    domain: {
                        basePath: 'public'
                    }
                },
                true
            );

            // Assert
            expect(construct).toThrow();
        });

        it('Loads multiple assets to the Amazon S3 bucket from the local file system', () => {
            // Arrange
            // No action

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: {
                    id: 'multi',
                    path: [mockFolderAssetPath, mockZipAssetPath]
                },
                domain: {
                    basePath: 'public'
                }
            });

            // Assert
            const template = getTemplate();

            template.resourcePropertiesCountIs(
                'Custom::S3AutoDeleteObjects',
                Match.objectLike({
                    BucketName: { Ref: storePartialName }
                }),
                1
            );
            template.resourcePropertiesCountIs(
                'Custom::CDKBucketDeployment',
                Match.objectLike({
                    DestinationBucketName: { Ref: storePartialName },
                    Prune: false
                }),
                1
            );
        });

        it('Adds custom version information to the bucket deployment', () => {
            // Arrange
            // No action

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: 'public'
                },
                versionTag: '1.0.0'
            });

            // Assert
            const template = getTemplate();

            template.resourcePropertiesCountIs(
                'Custom::S3AutoDeleteObjects',
                Match.objectLike({
                    BucketName: { Ref: storePartialName }
                }),
                1
            );
            template.resourcePropertiesCountIs(
                'Custom::CDKBucketDeployment',
                Match.objectLike({
                    DestinationBucketName: { Ref: storePartialName },
                    Prune: false
                }),
                1
            );
            template.resourcePropertiesCountIs(
                'Custom::CDKBucketDeployment',
                Match.objectLike({
                    DestinationBucketName: { Ref: storePartialName },
                    Prune: true
                }),
                1
            );
        });

        it('Uses an AWS KMS CMK to encrypt the storage and assets when provided (version tag)', () => {
            // Arrange
            const key = new Key(stack, 'Encryption');

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: 'public'
                },
                encryption: key,
                versionTag: '1.0.0'
            });

            // Assert
            const template = getTemplate();

            const store: Partial<CfnBucketElement> = {
                Properties: {
                    BucketEncryption: {
                        ServerSideEncryptionConfiguration: [
                            {
                                ServerSideEncryptionByDefault: {
                                    SSEAlgorithm: 'aws:kms',
                                    KMSMasterKeyID: {
                                        'Fn::GetAtt': [
                                            Match.stringLikeRegexp(
                                                'Encryption'
                                            ),
                                            'Arn'
                                        ]
                                    } as unknown as string
                                }
                            }
                        ]
                    }
                }
            };

            template.hasResource('AWS::S3::Bucket', Match.objectLike(store));
        });

        it('Uses an AWS KMS CMK to encrypt the storage and assets when provided', () => {
            // Arrange
            const key = new Key(stack, 'Encryption');

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: 'public'
                },
                encryption: key
            });

            // Assert
            const template = getTemplate();

            const store: Partial<CfnBucketElement> = {
                Properties: {
                    BucketEncryption: {
                        ServerSideEncryptionConfiguration: [
                            {
                                ServerSideEncryptionByDefault: {
                                    SSEAlgorithm: 'aws:kms',
                                    KMSMasterKeyID: {
                                        'Fn::GetAtt': [
                                            Match.stringLikeRegexp(
                                                'Encryption'
                                            ),
                                            'Arn'
                                        ]
                                    } as unknown as string
                                }
                            }
                        ]
                    }
                }
            };

            template.hasResource('AWS::S3::Bucket', Match.objectLike(store));
        });
    });
});
