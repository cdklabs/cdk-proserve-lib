// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { SNSEvent, Context } from 'aws-lambda';
import {
    vi,
    describe,
    beforeEach,
    afterEach,
    it,
    expect,
    Mocked,
    MockedClass
} from 'vitest';
import { HttpClient } from '../../../../src/common/lambda/http-client';
import {
    HttpClientOptions,
    HttpClientResponse
} from '../../../../src/common/lambda/http-client/types';
import { handler } from '../../../../src/constructs/ec2-image-builder-start/handler';

// Mock the dependencies
vi.mock('../../../../src/common/lambda/http-client');

describe('Lambda Handler', () => {
    let mockContext: Context;
    let mockEvent: SNSEvent;
    let mockHttpClient: Mocked<HttpClient<HttpClientOptions>>;

    beforeEach(() => {
        mockContext = {
            awsRequestId: 'test-request-id'
        } as Context;
        mockEvent = {
            Records: [
                {
                    Sns: {
                        Message: JSON.stringify({
                            state: { status: 'AVAILABLE' },
                            arn: 'test-arn'
                        })
                    }
                }
            ]
        } as SNSEvent;
        process.env.WAIT_HANDLE_URL = 'https://test-url.com';
        process.env.IMAGE_BUILD_ARN = 'test-arn';

        // Mock HTTP client
        mockHttpClient = {
            put: vi.fn()
        } as unknown as Mocked<HttpClient<HttpClientOptions>>;
        (HttpClient as MockedClass<typeof HttpClient>).mockImplementation(
            () => mockHttpClient
        );

        // Default PUT response
        mockHttpClient.put.mockImplementation(() => {
            return Promise.resolve<HttpClientResponse<unknown>>({
                data: {},
                headers: {},
                body: ''
            });
        });
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should signal SUCCESS when status is AVAILABLE', async () => {
        await handler(mockEvent, mockContext);
        expect(mockHttpClient.put).toHaveBeenCalledWith(
            'https://test-url.com',
            expect.objectContaining({
                Status: 'SUCCESS',
                Reason: 'Complete.',
                UniqueId: 'test-request-id',
                Data: 'Pipeline has given a SUCCESS signal from SNS.'
            })
        );
    });

    it('should signal FAILURE when status is not AVAILABLE', async () => {
        mockEvent.Records[0].Sns.Message = JSON.stringify({
            state: { status: 'FAILED', reason: 'Test failure reason.' },
            arn: 'test-arn'
        });
        await handler(mockEvent, mockContext);
        expect(mockHttpClient.put).toHaveBeenCalledWith(
            'https://test-url.com',
            expect.objectContaining({
                Status: 'FAILURE',
                Reason: 'Pipeline has given a FAILURE signal. Test failure reason.',
                UniqueId: 'test-request-id',
                Data: 'Pipeline has given a FAILURE signal from SNS.'
            })
        );
    });

    it('should throw error when WAIT_HANDLE_URL is not set', async () => {
        delete process.env.WAIT_HANDLE_URL;
        await expect(handler(mockEvent, mockContext)).rejects.toThrow(
            'WAIT_HANDLE_URL environment variable is not set'
        );
    });

    it('should not signal when ARN does not match', async () => {
        mockEvent.Records[0].Sns.Message = JSON.stringify({
            state: { status: 'AVAILABLE' },
            arn: 'different-arn'
        });
        await handler(mockEvent, mockContext);
        expect(mockHttpClient.put).not.toHaveBeenCalled();
    });
});
