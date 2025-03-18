// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import path from 'node:path';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
import { AwsHttpClient } from '../../../../../src/common/lambda/aws-http-client';
import { handler } from '../../../../../src/constructs/opensearch-workflow/handler/on-event';
import {
    createMockResponse,
    mockContext,
    mockCreateEvent,
    mockDeleteEvent,
    mockDeleteNoDestructiveEvent,
    mockUpdateEvent,
    mockUpdateNoDestructiveEvent,
    mockWorkflowId
} from '../../fixtures';

// Mock the dependencies
jest.mock('@aws-sdk/s3-request-presigner', () => ({
    getSignedUrl: jest
        .fn()
        .mockResolvedValue('https://presigned-url.example.com')
}));
jest.mock('../../../../../src/common/lambda/aws-http-client');
jest.mock('../../../../../src/common/lambda/download-s3-asset');

describe('OpenSearch Workflow Handler', () => {
    let mockHttpClient: jest.Mocked<AwsHttpClient>;
    const s3Mock = mockClient(S3Client);
    const {
        downloadS3Asset
    } = require('../../../../../src/common/lambda/download-s3-asset');

    beforeEach(() => {
        jest.clearAllMocks();
        s3Mock.reset();

        // Mock S3
        s3Mock.on(GetObjectCommand).resolves({});

        // Mock Download S3 Asset
        downloadS3Asset.mockResolvedValue({
            filePath: path.join(__dirname, '../../fixtures/test-template.yaml')
        });

        // Mock HTTP client
        mockHttpClient = {
            post: jest.fn(),
            get: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<AwsHttpClient>;
        (
            AwsHttpClient as jest.MockedClass<typeof AwsHttpClient>
        ).mockImplementation(() => mockHttpClient);

        // GET
        mockHttpClient.get.mockImplementation(() => {
            return Promise.resolve(
                createMockResponse({ state: 'NOT_STARTED' })
            );
        });
        // POST
        mockHttpClient.post.mockImplementation((url: string) => {
            if (url.includes('_provision') || url.includes('_deprovision')) {
                return Promise.resolve(createMockResponse({ status: 'OK' }));
            }
            return Promise.resolve(
                createMockResponse({ workflow_id: mockWorkflowId })
            );
        });
        // PUT
        mockHttpClient.put.mockResolvedValue(
            createMockResponse({ status: 'OK' })
        );
        // DELETE
        mockHttpClient.delete.mockResolvedValue(
            createMockResponse({ status: 'OK' })
        );
    });

    it('should handle CREATE request successfully', async () => {
        // Act
        const response = await handler(mockCreateEvent, mockContext);

        // Assert
        expect(mockHttpClient.post).toHaveBeenCalledTimes(2);
        expect(mockHttpClient.post).toHaveBeenNthCalledWith(
            1,
            '/_plugins/_flow_framework/workflow',
            { template: 'content' }
        );
        expect(mockHttpClient.post).toHaveBeenNthCalledWith(
            2,
            '/_plugins/_flow_framework/workflow/test-workflow-id/_provision',
            {
                var2: 'value2'
            }
        );
        expect(response).toEqual({
            PhysicalResourceId: 'test-workflow-id'
        });
    });

    it('should handle UPDATE request successfully', async () => {
        // Act
        const result = await handler(mockUpdateEvent, mockContext);

        // Assert
        expect(result).toEqual({ PhysicalResourceId: mockWorkflowId });
        expect(mockHttpClient.post).toHaveBeenCalledWith(
            `/_plugins/_flow_framework/workflow/${mockWorkflowId}/_deprovision`
        );
        expect(mockHttpClient.get).toHaveBeenCalled();
        expect(mockHttpClient.put).toHaveBeenCalledWith(
            `/_plugins/_flow_framework/workflow/${mockWorkflowId}`,
            {
                template: 'content'
            }
        );
        expect(mockHttpClient.post).toHaveBeenCalledWith(
            `/_plugins/_flow_framework/workflow/${mockWorkflowId}/_provision`,
            {
                var2: 'value2'
            }
        );
    });

    it('should handle DELETE requests successfully', async () => {
        // Act
        const result = await handler(mockDeleteEvent, mockContext);

        // Assert
        expect(result).toEqual({ PhysicalResourceId: mockWorkflowId });
        expect(mockHttpClient.delete).toHaveBeenCalledWith(
            `/_plugins/_flow_framework/workflow/${mockWorkflowId}`
        );
    });

    it('should skip UPDATE when destructive operations are not allowed', async () => {
        // Act
        const result = await handler(mockUpdateNoDestructiveEvent, mockContext);

        // Assert
        expect(result).toEqual({ PhysicalResourceId: mockWorkflowId });
        expect(mockHttpClient.post).not.toHaveBeenCalledWith(
            `/_plugins/_flow_framework/workflow/${mockWorkflowId}/_deprovision`
        );
    });

    it('should skip DELETE when destructive operations are not allowed', async () => {
        // Act
        const result = await handler(mockDeleteNoDestructiveEvent, mockContext);

        // Assert
        expect(result).toEqual({ PhysicalResourceId: mockWorkflowId });
        expect(mockHttpClient.post).not.toHaveBeenCalled();
        expect(mockHttpClient.delete).not.toHaveBeenCalled();
    });

    it('should wait for workflow to reach target status', async () => {
        // Arrange
        const statusSequence = ['DEPROVISIONING', 'NOT_STARTED'];
        let callCount = 0;

        mockHttpClient.get.mockImplementation(() => {
            const state = statusSequence[callCount] || 'NOT_STARTED';
            callCount++;
            return Promise.resolve(createMockResponse({ state }));
        });

        // Act
        const result = await handler(mockDeleteEvent, mockContext);

        // Assert
        expect(result).toEqual({ PhysicalResourceId: mockWorkflowId });
        expect(mockHttpClient.get).toHaveBeenCalledTimes(2);
    }, 15000);

    it('should handle invalid template format', async () => {
        downloadS3Asset.mockResolvedValueOnce({
            filePath: path.join(__dirname, '../../fixtures/invalid.txt')
        });

        await expect(handler(mockCreateEvent, mockContext)).rejects.toThrow();
    });
});
