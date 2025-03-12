// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdkCustomResourceEvent } from 'aws-lambda';
import { DestructiveOperation } from '../../../../../src/types/destructive-operation';
import { handler } from '../../../../../src/constructs/opensearch-workflow/handler/on-event';
// import { resetMocks, setupMocks } from './mocks';
// import { downloadS3Asset } from '../../../../../src/common/lambda/download-s3-asset';
import {
    AwsHttpClient,
    AwsHttpResponse
} from '../../../../../src/common/lambda/aws-http-client';

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
function createMockResponse<T>(data: T): AwsHttpResponse<T> {
    return {
        data,
        headers: {},
        rawBody: JSON.stringify(data)
    };
}

describe('OpenSearch Workflow Handler', () => {
    let mockHttpClient: jest.Mocked<AwsHttpClient>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockHttpClient = {
            post: jest.fn(),
            get: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<AwsHttpClient>;

        (
            AwsHttpClient as jest.MockedClass<typeof AwsHttpClient>
        ).mockImplementation(() => mockHttpClient);
        // Mock HTTP client methods
        mockHttpClient.post.mockImplementation((path: string) => {
            if (path.includes('_provision') || path.includes('_deprovision')) {
                return Promise.resolve(createMockResponse({ status: 'OK' }));
            }
            return Promise.resolve(createMockResponse({ workflow_id: 'asdf' }));
        });
    });

    it('should handle Create request successfully', async () => {
        // Arrange
        const event: CdkCustomResourceEvent<any> = {
            RequestType: 'Create',
            ResourceProperties: {
                RoleArn: 'arn:aws:iam::123456789012:role/test-role',
                DomainEndpoint: 'test-domain.amazonaws.com',
                AssetS3ObjectUrl: 's3://bucket/template.json',
                AllowDestructiveOperations: DestructiveOperation.ALL,
                TemplateCreationVariables: {},
                TemplateS3ObjectUrlVariables: {},
                TemplateProvisionVariables: {}
            },
            ServiceToken: 'token',
            ResponseURL: 'response-url',
            StackId: 'stack-id',
            RequestId: 'request-id',
            LogicalResourceId: 'logical-id',
            ResourceType: 'Custom::OpenSearchWorkflow'
        };

        // Act
        const response = await handler(event, {} as any);

        // Assert
        expect(response).toEqual({
            PhysicalResourceId: 'test-workflow-id'
        });
    });
});
