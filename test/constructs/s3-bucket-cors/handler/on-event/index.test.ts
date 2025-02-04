// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    DeleteBucketCorsCommand,
    GetBucketCorsCommand,
    NoSuchBucket,
    PutBucketCorsCommand,
    S3,
    S3ServiceException
} from '@aws-sdk/client-s3';
import {
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceUpdateEvent
} from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import 'aws-sdk-client-mock-jest';
import { handler } from '../../../../../src/constructs/s3-bucket-cors/handler/on-event';
import { RuleConflictException } from '../../../../../src/constructs/s3-bucket-cors/handler/types/exceptions';
import {
    CORSRule,
    ResourceProperties
} from '../../../../../src/constructs/s3-bucket-cors/handler/types/resource-properties';
import {
    buildMockCreateEvent,
    buildMockDeleteEvent,
    buildMockUpdateEvent,
    mockContext
} from '../../../../fixtures';
import {
    mockAlternateAwsRegion,
    mockCORSRule,
    mockExistingCORSRules,
    mockExistingS3BucketName,
    mockNonexistantS3BucketName,
    mockPhysicalResourceId,
    resourceType
} from '../../fixtures';

describe('S3BucketCors Custom Resource On Event Handler', () => {
    const s3Mock = mockClient(S3);

    beforeEach(() => {
        s3Mock.reset();
    });

    it('should add CORS rules to an existing bucket with no configuration in the same region', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                BucketName: mockExistingS3BucketName,
                Rules: [mockCORSRule]
            });

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects()
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .rejects(
                new S3ServiceException({
                    $fault: 'client',
                    $metadata: {
                        httpStatusCode: 404
                    },
                    name: 'NoSuchCORSConfiguration'
                })
            );
        s3Mock
            .on(PutBucketCorsCommand)
            .rejects()
            .on(PutBucketCorsCommand, {
                Bucket: mockExistingS3BucketName,
                CORSConfiguration: {
                    CORSRules: [mockCORSRule]
                }
            })
            .resolves({});
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should add CORS rules to an existing bucket with no rules in the same region', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                BucketName: mockExistingS3BucketName,
                Rules: [mockCORSRule]
            });

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects()
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .resolves({});
        s3Mock
            .on(PutBucketCorsCommand)
            .rejects()
            .on(PutBucketCorsCommand, {
                Bucket: mockExistingS3BucketName,
                CORSConfiguration: {
                    CORSRules: [mockCORSRule]
                }
            })
            .resolves({});
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should add CORS rules to an existing bucket with rules in the same region', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                BucketName: mockExistingS3BucketName,
                Rules: [mockCORSRule]
            });

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects()
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .resolves({
                CORSRules: mockExistingCORSRules
            });
        s3Mock
            .on(PutBucketCorsCommand)
            .rejects()
            .on(PutBucketCorsCommand, {
                Bucket: mockExistingS3BucketName,
                CORSConfiguration: {
                    CORSRules: [
                        ...mockExistingCORSRules.filter((r) => r.ID),
                        mockCORSRule,
                        ...mockExistingCORSRules.filter((r) => !r.ID)
                    ]
                }
            })
            .resolves({});
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should add CORS rules to an existing bucket with rules in a different region', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                BucketName: mockExistingS3BucketName,
                Region: mockAlternateAwsRegion,
                Rules: [mockCORSRule]
            });

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects()
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .callsFake(async (_input: GetBucketCorsCommand, getClient) => {
                const client = getClient();
                const region = await client.config.region();

                if (region === mockAlternateAwsRegion) {
                    return {
                        CORSRules: mockExistingCORSRules
                    };
                } else {
                    throw new S3ServiceException({
                        $fault: 'client',
                        $metadata: {
                            httpStatusCode: 400
                        },
                        name: 'IncorrectEndpoint'
                    });
                }
            });
        s3Mock
            .on(PutBucketCorsCommand)
            .rejects()
            .on(PutBucketCorsCommand, {
                Bucket: mockExistingS3BucketName,
                CORSConfiguration: {
                    CORSRules: [
                        ...mockExistingCORSRules.filter((r) => r.ID),
                        mockCORSRule,
                        ...mockExistingCORSRules.filter((r) => !r.ID)
                    ]
                }
            })
            .callsFake(async (_input: GetBucketCorsCommand, getClient) => {
                const client = getClient();
                const region = await client.config.region();

                if (region === mockAlternateAwsRegion) {
                    return {};
                } else {
                    throw new S3ServiceException({
                        $fault: 'client',
                        $metadata: {
                            httpStatusCode: 400
                        },
                        name: 'IncorrectEndpoint'
                    });
                }
            });
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        await handler(mockEvent, mockContext);

        // Assert
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should lowercase origins when creating CORS rules', async () => {
        // Arrange
        const updatedRule: CORSRule = {
            ...mockCORSRule,
            AllowedOrigins: mockCORSRule.AllowedOrigins?.map((o) =>
                o.toUpperCase()
            )
        };

        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                BucketName: mockExistingS3BucketName,
                Rules: [updatedRule]
            });

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects()
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .resolves({});
        s3Mock
            .on(PutBucketCorsCommand)
            .rejects()
            .on(PutBucketCorsCommand, {
                Bucket: mockExistingS3BucketName,
                CORSConfiguration: {
                    CORSRules: [mockCORSRule]
                }
            })
            .resolves({});
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should throw an error when the bucket does not exist', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                BucketName: mockNonexistantS3BucketName,
                Rules: [mockCORSRule]
            });

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects(
                new S3ServiceException({
                    $fault: 'client',
                    $metadata: {
                        httpStatusCode: 404
                    },
                    name: 'NoSuchBucket'
                })
            )
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .resolves({});
        s3Mock.on(PutBucketCorsCommand).rejects();
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        const result = handler(mockEvent, mockContext);

        // Assert
        await expect(result).rejects.toThrow(S3ServiceException);
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 0);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should throw an error when trying to add rules with conflicting IDs', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                BucketName: mockExistingS3BucketName,
                Rules: [
                    mockCORSRule,
                    {
                        ...mockCORSRule,
                        AllowedOrigins: ['https://example.net']
                    }
                ]
            });

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects()
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .resolves({});
        s3Mock.on(PutBucketCorsCommand).rejects();
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        const result = handler(mockEvent, mockContext);

        // Assert
        await expect(result).rejects.toThrow(RuleConflictException);
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 0);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should only remove CORS rules from an existing bucket in the same region that it created', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
            buildMockDeleteEvent(mockPhysicalResourceId, resourceType, {
                BucketName: mockExistingS3BucketName,
                Rules: [mockCORSRule]
            });

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects()
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .resolves({
                CORSRules: [...mockExistingCORSRules, mockCORSRule]
            });
        s3Mock
            .on(PutBucketCorsCommand)
            .rejects()
            .on(PutBucketCorsCommand, {
                Bucket: mockExistingS3BucketName,
                CORSConfiguration: {
                    CORSRules: [
                        ...mockExistingCORSRules.filter((r) => r.ID),
                        ...mockExistingCORSRules.filter((r) => !r.ID)
                    ]
                }
            })
            .resolves({});
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should only remove CORS rules from an existing bucket in a different region that it created', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
            buildMockDeleteEvent(mockPhysicalResourceId, resourceType, {
                BucketName: mockExistingS3BucketName,
                Region: mockAlternateAwsRegion,
                Rules: [mockCORSRule]
            });

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects()
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .callsFake(async (_input: GetBucketCorsCommand, getClient) => {
                const client = getClient();
                const region = await client.config.region();

                if (region === mockAlternateAwsRegion) {
                    return {
                        CORSRules: [...mockExistingCORSRules, mockCORSRule]
                    };
                } else {
                    throw new S3ServiceException({
                        $fault: 'client',
                        $metadata: {
                            httpStatusCode: 400
                        },
                        name: 'IncorrectEndpoint'
                    });
                }
            });
        s3Mock
            .on(PutBucketCorsCommand)
            .rejects()
            .on(PutBucketCorsCommand, {
                Bucket: mockExistingS3BucketName,
                CORSConfiguration: {
                    CORSRules: [
                        ...mockExistingCORSRules.filter((r) => r.ID),
                        ...mockExistingCORSRules.filter((r) => !r.ID)
                    ]
                }
            })
            .callsFake(async (_input: GetBucketCorsCommand, getClient) => {
                const client = getClient();
                const region = await client.config.region();

                if (region === mockAlternateAwsRegion) {
                    return {};
                } else {
                    throw new S3ServiceException({
                        $fault: 'client',
                        $metadata: {
                            httpStatusCode: 400
                        },
                        name: 'IncorrectEndpoint'
                    });
                }
            });
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should delete the CORS configuration from an existing bucket in the same region with no rules', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
            buildMockDeleteEvent(mockPhysicalResourceId, resourceType, {
                BucketName: mockExistingS3BucketName,
                Rules: [mockCORSRule]
            });

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects()
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .resolves({
                CORSRules: [mockCORSRule]
            });
        s3Mock.on(PutBucketCorsCommand).rejects();
        s3Mock
            .on(DeleteBucketCorsCommand)
            .rejects()
            .on(DeleteBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .resolves({});

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 0);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 1);
    });

    it('should ignore a missing bucket error on a delete', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
            buildMockDeleteEvent(mockPhysicalResourceId, resourceType, {
                BucketName: mockNonexistantS3BucketName,
                Rules: [mockCORSRule]
            });

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects(
                new NoSuchBucket({
                    message: '',
                    $metadata: {}
                })
            )
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .resolves({
                CORSRules: [mockCORSRule]
            });
        s3Mock.on(PutBucketCorsCommand).rejects();
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 0);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should throw an error when trying to delete and receiving an unexpected error', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
            buildMockDeleteEvent(mockPhysicalResourceId, resourceType, {
                BucketName: mockExistingS3BucketName,
                Rules: [mockCORSRule]
            });

        s3Mock.on(GetBucketCorsCommand).rejects();
        s3Mock.on(PutBucketCorsCommand).rejects();
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        const result = handler(mockEvent, mockContext);

        // Assert
        await expect(result).rejects.toThrow();
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 0);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should update CORS rules on an existing bucket in the same region when the target bucket does not change', async () => {
        // Arrange
        const modifyRule: CORSRule = {
            ...mockCORSRule,
            ExposeHeaders: undefined
        };
        const addRule: CORSRule = {
            ...mockCORSRule,
            AllowedOrigins: ['https://example.org'],
            ID: 'TestRule-Add'
        };
        const mockEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
            buildMockUpdateEvent(
                mockPhysicalResourceId,
                resourceType,
                {
                    BucketName: mockExistingS3BucketName,
                    Rules: [mockCORSRule, addRule]
                },
                {
                    BucketName: mockExistingS3BucketName,
                    Rules: [
                        ...(mockExistingCORSRules.filter(
                            (r) => r.ID
                        ) as CORSRule[]),
                        modifyRule
                    ]
                }
            );

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects()
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .resolves({
                CORSRules: [...mockExistingCORSRules, modifyRule]
            });
        s3Mock
            .on(PutBucketCorsCommand)
            .rejects()
            .on(PutBucketCorsCommand, {
                Bucket: mockExistingS3BucketName,
                CORSConfiguration: {
                    CORSRules: [
                        mockCORSRule,
                        addRule,
                        ...mockExistingCORSRules.filter((r) => !r.ID)
                    ]
                }
            })
            .resolves({});
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should update CORS rules on an existing bucket in a different region when the target bucket does not change', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
            buildMockUpdateEvent(
                mockPhysicalResourceId,
                resourceType,
                {
                    BucketName: mockExistingS3BucketName,
                    Region: mockAlternateAwsRegion,
                    Rules: [mockCORSRule]
                },
                {
                    BucketName: mockExistingS3BucketName,
                    Rules: mockExistingCORSRules.filter(
                        (r) => r.ID
                    ) as CORSRule[]
                }
            );

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects()
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .callsFake(async (_input: GetBucketCorsCommand, getClient) => {
                const client = getClient();
                const region = await client.config.region();

                if (region === mockAlternateAwsRegion) {
                    return {
                        CORSRules: mockExistingCORSRules
                    };
                } else {
                    throw new S3ServiceException({
                        $fault: 'client',
                        $metadata: {
                            httpStatusCode: 400
                        },
                        name: 'IncorrectEndpoint'
                    });
                }
            });
        s3Mock
            .on(PutBucketCorsCommand)
            .rejects()
            .on(PutBucketCorsCommand, {
                Bucket: mockExistingS3BucketName,
                CORSConfiguration: {
                    CORSRules: [
                        mockCORSRule,
                        ...mockExistingCORSRules.filter((r) => !r.ID)
                    ]
                }
            })
            .callsFake(async (_input: GetBucketCorsCommand, getClient) => {
                const client = getClient();
                const region = await client.config.region();

                if (region === mockAlternateAwsRegion) {
                    return {};
                } else {
                    throw new S3ServiceException({
                        $fault: 'client',
                        $metadata: {
                            httpStatusCode: 400
                        },
                        name: 'IncorrectEndpoint'
                    });
                }
            });
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should update CORS rules on an existing bucket in the same region when the target bucket changes', async () => {
        // Arrange
        const newBucketName = `${mockNonexistantS3BucketName}-2`;

        const mockEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
            buildMockUpdateEvent(
                mockPhysicalResourceId,
                resourceType,
                {
                    BucketName: newBucketName,
                    Rules: [mockCORSRule]
                },
                {
                    BucketName: mockExistingS3BucketName,
                    Rules: mockExistingCORSRules.filter(
                        (r) => r.ID
                    ) as CORSRule[]
                }
            );

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects()
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .resolves({
                CORSRules: mockExistingCORSRules
            })
            .on(GetBucketCorsCommand, {
                Bucket: newBucketName
            })
            .resolves({});
        s3Mock
            .on(PutBucketCorsCommand)
            .rejects()
            .on(PutBucketCorsCommand, {
                Bucket: mockExistingS3BucketName,
                CORSConfiguration: {
                    CORSRules: [...mockExistingCORSRules.filter((r) => !r.ID)]
                }
            })
            .resolves({})
            .on(PutBucketCorsCommand, {
                Bucket: newBucketName,
                CORSConfiguration: {
                    CORSRules: [mockCORSRule]
                }
            })
            .resolves({});
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 2);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 2);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });

    it('should throw an error when trying to update rules with conflicting IDs', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
            buildMockUpdateEvent(
                mockPhysicalResourceId,
                resourceType,
                {
                    BucketName: mockExistingS3BucketName,
                    Rules: [mockCORSRule]
                },
                {
                    BucketName: mockExistingS3BucketName,
                    Rules: []
                }
            );

        s3Mock
            .on(GetBucketCorsCommand)
            .rejects()
            .on(GetBucketCorsCommand, {
                Bucket: mockExistingS3BucketName
            })
            .resolves({
                CORSRules: [mockCORSRule]
            });
        s3Mock.on(PutBucketCorsCommand).rejects();
        s3Mock.on(DeleteBucketCorsCommand).rejects();

        // Act
        const result = handler(mockEvent, mockContext);

        // Assert
        await expect(result).rejects.toThrow(RuleConflictException);
        expect(s3Mock).toHaveReceivedCommandTimes(GetBucketCorsCommand, 1);
        expect(s3Mock).toHaveReceivedCommandTimes(PutBucketCorsCommand, 0);
        expect(s3Mock).toHaveReceivedCommandTimes(DeleteBucketCorsCommand, 0);
    });
});
