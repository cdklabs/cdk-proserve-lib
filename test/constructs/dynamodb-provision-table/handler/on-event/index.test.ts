// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/// <reference types="../../../../vitest.d.ts" />

import {
    DynamoDBServiceException,
    ResourceNotFoundException
} from '@aws-sdk/client-dynamodb';
import { BatchWriteCommand, DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import {
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceUpdateEvent
} from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import { expect } from 'vitest';
import { handler } from '../../../../../src/constructs/dynamodb-provision-table/handler/on-event';
import { ResourceProperties } from '../../../../../src/constructs/dynamodb-provision-table/handler/types/resource-properties';
import {
    buildMockCreateEvent,
    buildMockDeleteEvent,
    buildMockUpdateEvent,
    mockContext
} from '../../../../fixtures';
import {
    mockTableNameOne,
    mockItemOne,
    mockItemPrimaryKey,
    mockItemTwo,
    mockPhysicalResourceId,
    MockTableSchema,
    resourceType,
    mockTableNameTwo,
    mockItemOneWithSort,
    mockItemSortKey,
    mockItemTwoWithSort
} from '../../fixtures';

describe('DynamoDBProvisionTable Custom Resource On Event Handler', () => {
    const ddbMock = mockClient(DynamoDBDocument);

    beforeEach(() => {
        ddbMock.reset();
    });

    it('should add entries to a table', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                Items: [mockItemOne],
                PartitionKeyName: mockItemPrimaryKey,
                TableName: mockTableNameOne
            });

        ddbMock
            .on(BatchWriteCommand)
            .rejects()
            .on(BatchWriteCommand, {
                RequestItems: {
                    [mockTableNameOne]: [
                        {
                            PutRequest: {
                                Item: mockItemOne
                            }
                        }
                    ]
                }
            })
            .resolves({});

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(ddbMock).toHaveReceivedCommandTimes(BatchWriteCommand, 1);
    });

    it('should add entries to a table (sort key)', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                Items: [mockItemOneWithSort],
                PartitionKeyName: mockItemPrimaryKey,
                SortKeyName: mockItemSortKey,
                TableName: mockTableNameOne
            });

        ddbMock
            .on(BatchWriteCommand)
            .rejects()
            .on(BatchWriteCommand, {
                RequestItems: {
                    [mockTableNameOne]: [
                        {
                            PutRequest: {
                                Item: mockItemOneWithSort
                            }
                        }
                    ]
                }
            })
            .resolves({});

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(ddbMock).toHaveReceivedCommandTimes(BatchWriteCommand, 1);
    });

    it('should use a sliding window to add multiple entries to a table', async () => {
        // Arrange
        const items: MockTableSchema[] = Array.from(
            {
                length: 26
            },
            (_v, i) => {
                return {
                    data: `Item ${i}`,
                    uid: i
                };
            }
        );
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                Items: items,
                PartitionKeyName: mockItemPrimaryKey,
                TableName: mockTableNameOne
            });

        ddbMock
            .on(BatchWriteCommand)
            .rejects()
            .on(BatchWriteCommand, {
                RequestItems: {
                    [mockTableNameOne]: items.slice(0, 25).map((v) => {
                        return {
                            PutRequest: {
                                Item: v
                            }
                        };
                    })
                }
            })
            .resolves({})
            .on(BatchWriteCommand, {
                RequestItems: {
                    [mockTableNameOne]: items.slice(25).map((v) => {
                        return {
                            PutRequest: {
                                Item: v
                            }
                        };
                    })
                }
            })
            .resolves({});

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(ddbMock).toHaveReceivedCommandTimes(BatchWriteCommand, 2);
    });

    it('should rethrow the error when adding entries and encountering any exception', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                Items: [mockItemOne],
                PartitionKeyName: mockItemPrimaryKey,
                TableName: mockTableNameOne
            });

        ddbMock.on(BatchWriteCommand).rejects(
            new DynamoDBServiceException({
                $fault: 'client',
                $metadata: {
                    httpStatusCode: 400
                },
                name: 'AccessDeniedException'
            })
        );

        // Act
        const actual = handler(mockEvent, mockContext);

        // Assert
        await expect(actual).rejects.toThrow(DynamoDBServiceException);
        expect(ddbMock).toHaveReceivedCommandTimes(BatchWriteCommand, 1);
    });

    it('should update entries for a table when the target table does not change', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
            buildMockUpdateEvent(
                mockPhysicalResourceId,
                resourceType,
                {
                    Items: [mockItemTwo],
                    PartitionKeyName: mockItemPrimaryKey,
                    TableName: mockTableNameOne
                },
                {
                    Items: [mockItemOne],
                    PartitionKeyName: mockItemPrimaryKey,
                    TableName: mockTableNameOne
                }
            );

        const validRequests = [
            // Delete old item
            {
                RequestItems: {
                    [mockTableNameOne]: [
                        {
                            DeleteRequest: {
                                Key: {
                                    [mockItemPrimaryKey]: mockItemOne.uid
                                }
                            }
                        }
                    ]
                }
            },
            // Insert new item
            {
                RequestItems: {
                    [mockTableNameOne]: [
                        {
                            PutRequest: {
                                Item: mockItemTwo
                            }
                        }
                    ]
                }
            }
        ];

        ddbMock.on(BatchWriteCommand).callsFake((input) => {
            const processedInput = JSON.stringify(input);

            if (
                validRequests
                    .map((r) => JSON.stringify(r))
                    .includes(processedInput)
            ) {
                return {};
            } else {
                throw new Error();
            }
        });

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(ddbMock).toHaveReceivedCommandTimes(BatchWriteCommand, 2);
    });

    it('should update entries for both tables when the target table does change', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
            buildMockUpdateEvent(
                mockPhysicalResourceId,
                resourceType,
                {
                    Items: [mockItemTwo],
                    PartitionKeyName: mockItemPrimaryKey,
                    TableName: mockTableNameTwo
                },
                {
                    Items: [mockItemOne],
                    PartitionKeyName: mockItemPrimaryKey,
                    TableName: mockTableNameOne
                }
            );

        const validRequests = [
            // Delete old item
            {
                RequestItems: {
                    [mockTableNameOne]: [
                        {
                            DeleteRequest: {
                                Key: {
                                    [mockItemPrimaryKey]: mockItemOne.uid
                                }
                            }
                        }
                    ]
                }
            },
            // Insert new item
            {
                RequestItems: {
                    [mockTableNameTwo]: [
                        {
                            PutRequest: {
                                Item: mockItemTwo
                            }
                        }
                    ]
                }
            }
        ];

        ddbMock.on(BatchWriteCommand).callsFake((input) => {
            const processedInput = JSON.stringify(input);

            if (
                validRequests
                    .map((r) => JSON.stringify(r))
                    .includes(processedInput)
            ) {
                return {};
            } else {
                throw new Error();
            }
        });

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(ddbMock).toHaveReceivedCommandTimes(BatchWriteCommand, 2);
    });

    it('should update entries for a table when the target table does not change (sort key)', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
            buildMockUpdateEvent(
                mockPhysicalResourceId,
                resourceType,
                {
                    Items: [mockItemTwoWithSort],
                    PartitionKeyName: mockItemPrimaryKey,
                    SortKeyName: mockItemSortKey,
                    TableName: mockTableNameOne
                },
                {
                    Items: [mockItemOneWithSort],
                    PartitionKeyName: mockItemPrimaryKey,
                    SortKeyName: mockItemSortKey,
                    TableName: mockTableNameOne
                }
            );

        const validRequests = [
            // Delete old item
            {
                RequestItems: {
                    [mockTableNameOne]: [
                        {
                            DeleteRequest: {
                                Key: {
                                    [mockItemPrimaryKey]:
                                        mockItemOneWithSort.uid,
                                    [mockItemSortKey]: mockItemOneWithSort.sort
                                }
                            }
                        }
                    ]
                }
            },
            // Insert new item
            {
                RequestItems: {
                    [mockTableNameOne]: [
                        {
                            PutRequest: {
                                Item: mockItemTwoWithSort
                            }
                        }
                    ]
                }
            }
        ];

        ddbMock.on(BatchWriteCommand).callsFake((input) => {
            const processedInput = JSON.stringify(input);

            if (
                validRequests
                    .map((r) => JSON.stringify(r))
                    .includes(processedInput)
            ) {
                return {};
            } else {
                throw new Error();
            }
        });

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(ddbMock).toHaveReceivedCommandTimes(BatchWriteCommand, 2);
    });

    it('should update entries for both tables when the target table does change (sort key)', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
            buildMockUpdateEvent(
                mockPhysicalResourceId,
                resourceType,
                {
                    Items: [mockItemTwoWithSort],
                    PartitionKeyName: mockItemPrimaryKey,
                    SortKeyName: mockItemSortKey,
                    TableName: mockTableNameTwo
                },
                {
                    Items: [mockItemOneWithSort],
                    PartitionKeyName: mockItemPrimaryKey,
                    SortKeyName: mockItemSortKey,
                    TableName: mockTableNameOne
                }
            );

        const validRequests = [
            // Delete old item
            {
                RequestItems: {
                    [mockTableNameOne]: [
                        {
                            DeleteRequest: {
                                Key: {
                                    [mockItemPrimaryKey]:
                                        mockItemOneWithSort.uid,
                                    [mockItemSortKey]: mockItemOneWithSort.sort
                                }
                            }
                        }
                    ]
                }
            },
            // Insert new item
            {
                RequestItems: {
                    [mockTableNameTwo]: [
                        {
                            PutRequest: {
                                Item: mockItemTwoWithSort
                            }
                        }
                    ]
                }
            }
        ];

        ddbMock.on(BatchWriteCommand).callsFake((input) => {
            const processedInput = JSON.stringify(input);

            if (
                validRequests
                    .map((r) => JSON.stringify(r))
                    .includes(processedInput)
            ) {
                return {};
            } else {
                throw new Error();
            }
        });

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(ddbMock).toHaveReceivedCommandTimes(BatchWriteCommand, 2);
    });

    it('should rethrow the error when updating entries and encountering any exception', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
            buildMockUpdateEvent(
                mockPhysicalResourceId,
                resourceType,
                {
                    Items: [],
                    PartitionKeyName: mockItemPrimaryKey,
                    TableName: mockTableNameOne
                },
                {
                    Items: [mockItemOne],
                    PartitionKeyName: mockItemPrimaryKey,
                    TableName: mockTableNameOne
                }
            );

        ddbMock.on(BatchWriteCommand).rejects(
            new DynamoDBServiceException({
                $fault: 'client',
                $metadata: {
                    httpStatusCode: 400
                },
                name: 'AccessDeniedException'
            })
        );

        // Act
        const actual = handler(mockEvent, mockContext);

        // Assert
        await expect(actual).rejects.toThrow(DynamoDBServiceException);
        expect(ddbMock).toHaveReceivedCommandTimes(BatchWriteCommand, 1);
    });

    it('should only remove entries from a table that it created when being deleted', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
            buildMockDeleteEvent(mockPhysicalResourceId, resourceType, {
                Items: [mockItemOne],
                PartitionKeyName: mockItemPrimaryKey,
                TableName: mockTableNameOne
            });

        const validRequests = [
            // Delete old item
            {
                RequestItems: {
                    [mockTableNameOne]: [
                        {
                            DeleteRequest: {
                                Key: {
                                    [mockItemPrimaryKey]: mockItemOne.uid
                                }
                            }
                        }
                    ]
                }
            }
        ];

        ddbMock.on(BatchWriteCommand).callsFake((input) => {
            const processedInput = JSON.stringify(input);

            if (
                validRequests
                    .map((r) => JSON.stringify(r))
                    .includes(processedInput)
            ) {
                return {};
            } else {
                throw new Error();
            }
        });

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(ddbMock).toHaveReceivedCommandTimes(BatchWriteCommand, 1);
    });

    it('should only remove entries from a table that it created when being deleted (sort key)', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
            buildMockDeleteEvent(mockPhysicalResourceId, resourceType, {
                Items: [mockItemOneWithSort],
                PartitionKeyName: mockItemPrimaryKey,
                SortKeyName: mockItemSortKey,
                TableName: mockTableNameOne
            });

        const validRequests = [
            // Delete old item
            {
                RequestItems: {
                    [mockTableNameOne]: [
                        {
                            DeleteRequest: {
                                Key: {
                                    [mockItemPrimaryKey]:
                                        mockItemOneWithSort.uid,
                                    [mockItemSortKey]: mockItemOneWithSort.sort
                                }
                            }
                        }
                    ]
                }
            }
        ];

        ddbMock.on(BatchWriteCommand).callsFake((input) => {
            const processedInput = JSON.stringify(input);

            if (
                validRequests
                    .map((r) => JSON.stringify(r))
                    .includes(processedInput)
            ) {
                return {};
            } else {
                throw new Error();
            }
        });

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(ddbMock).toHaveReceivedCommandTimes(BatchWriteCommand, 1);
    });

    it('should ignore a missing table error on delete', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
            buildMockDeleteEvent(mockPhysicalResourceId, resourceType, {
                Items: [mockItemOne],
                PartitionKeyName: mockItemPrimaryKey,
                TableName: mockTableNameOne
            });

        ddbMock.on(BatchWriteCommand).rejects(
            new ResourceNotFoundException({
                message: '',
                $metadata: {
                    httpStatusCode: 400
                }
            })
        );

        // Act
        const actual = handler(mockEvent, mockContext);

        // Assert
        await expect(actual).resolves.not.toThrow();
        expect(ddbMock).toHaveReceivedCommandTimes(BatchWriteCommand, 1);
    });

    it('should rethrow the error on a delete when encountering any other exception', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
            buildMockDeleteEvent(mockPhysicalResourceId, resourceType, {
                Items: [mockItemOne],
                PartitionKeyName: mockItemPrimaryKey,
                TableName: mockTableNameOne
            });

        ddbMock.on(BatchWriteCommand).rejects(
            new DynamoDBServiceException({
                $fault: 'client',
                $metadata: {
                    httpStatusCode: 400
                },
                name: 'AccessDeniedException'
            })
        );

        // Act
        const actual = handler(mockEvent, mockContext);

        // Assert
        await expect(actual).rejects.toThrow(DynamoDBServiceException);
        expect(ddbMock).toHaveReceivedCommandTimes(BatchWriteCommand, 1);
    });
});
