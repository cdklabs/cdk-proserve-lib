// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { handler } from '../../../../../src/constructs/opensearch-workflow/handler/on-event';
import { AwsHttpClient } from '../../../../../src/common/lambda/aws-http-client';
import {
    createMockResponse,
    mockContext,
    mockCreateEvent,
    mockWorkflowId
} from '../../fixtures';

// Mock the dependencies
jest.mock('fs', () => ({
    readFileSync: jest.fn().mockReturnValue('{"template": "content"}')
}));
jest.mock('../../../../../src/common/lambda/aws-http-client');
jest.mock('../../../../../src/common/lambda/download-s3-asset', () => ({
    downloadS3Asset: jest.fn().mockResolvedValue('s3://bucket/template.json')
}));
jest.mock('@aws-sdk/s3-request-presigner', () => ({
    getSignedUrl: jest
        .fn()
        .mockResolvedValue('https://presigned-url.example.com')
}));
jest.mock('@aws-sdk/client-s3', () => ({
    GetObjectCommand: jest.fn(),
    S3Client: jest.fn().mockImplementation(() => ({
        send: jest.fn()
    }))
}));
jest.mock('@aws-sdk/client-sts', () => ({}));
jest.mock('@aws-sdk/credential-provider-node', () => ({}));

describe('OpenSearch Workflow Handler', () => {
    let mockHttpClient: jest.Mocked<AwsHttpClient>;

    beforeEach(() => {
        jest.clearAllMocks();

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
        mockHttpClient.post.mockImplementation((path: string) => {
            if (path.includes('_provision') || path.includes('_deprovision')) {
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

    it('should handle Create request successfully', async () => {
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

    // it('should wait for workflow to reach target status', async () => {
    //     // Arrange
    //     const statusSequence = ['DEPLOYING', 'DEPLOYING', 'NOT_STARTED'];
    //     let callCount = 0;

    //     mockHttpClient.get.mockImplementation(() => {
    //         const state = statusSequence[callCount] || 'NOT_STARTED';
    //         callCount++;
    //         return Promise.resolve(createMockResponse({ state }));
    //     });

    //     // Act
    //     const result = await handler(mockDeleteEvent, mockContext);

    //     // Assert
    //     expect(result).toEqual({ PhysicalResourceId: mockWorkflowId });
    //     expect(mockHttpClient.get).toHaveBeenCalledTimes(3);
    // });
});
