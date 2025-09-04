// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as http from 'node:http';
import * as https from 'node:https';
import { Sha256 } from '@aws-crypto/sha256-js';
import { STS } from '@aws-sdk/client-sts';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@smithy/signature-v4';
import {
    describe,
    beforeEach,
    afterEach,
    it,
    vi,
    expect,
    Mock,
    MockedClass
} from 'vitest';
import { AwsHttpClient } from '../../../../src/common/lambda/aws-http-client';

// Mock the AWS SDK modules
vi.mock('@aws-sdk/client-sts');
vi.mock('@aws-sdk/credential-provider-node');
vi.mock('@smithy/signature-v4');
vi.mock('http');
vi.mock('https');

describe('HttpClientAws', () => {
    // Store original environment variables
    const originalEnv = process.env;

    // Create reusable mocks and client instance
    let mockSignFunction: Mock;
    let mockStsAssumeRole: Mock;
    let mockDefaultProvider: Mock;
    let client: AwsHttpClient;

    // Mock response setup
    let mockResponse: any;
    let mockRequest: any;

    beforeEach(() => {
        // Reset environment for each test
        process.env = { ...originalEnv, AWS_REGION: 'us-east-1' };

        // Set up SignatureV4 mock
        mockSignFunction = vi.fn().mockResolvedValue({
            hostname: 'api.example.com',
            protocol: 'https:',
            port: 443,
            path: '/test',
            method: 'GET',
            headers: {
                host: 'api.example.com',
                'x-amz-date': '20220101T000000Z',
                authorization: 'AWS4-HMAC-SHA256 Credential=...'
            },
            body: undefined
        });

        (SignatureV4 as MockedClass<typeof SignatureV4>).mockImplementation(
            () =>
                ({
                    sign: mockSignFunction
                }) as any
        );

        // Set up STS mock
        mockStsAssumeRole = vi.fn().mockResolvedValue({
            Credentials: {
                AccessKeyId: 'mock-access-key',
                SecretAccessKey: 'mock-secret-key',
                SessionToken: 'mock-session-token',
                Expiration: new Date(Date.now() + 3600 * 1000)
            }
        });

        (STS as MockedClass<typeof STS>).mockImplementation(
            () =>
                ({
                    assumeRole: mockStsAssumeRole
                }) as any
        );

        // Set up defaultProvider mock
        mockDefaultProvider = vi.fn().mockReturnValue({
            accessKeyId: 'default-access-key',
            secretAccessKey: 'default-secret-key'
        });

        (defaultProvider as Mock).mockImplementation(mockDefaultProvider);

        // Set up HTTP/HTTPS response mocks
        mockResponse = {
            statusCode: 200,
            headers: { 'content-type': 'application/json' },
            on: vi.fn().mockImplementation((event, callback) => {
                if (event === 'data') {
                    callback(JSON.stringify({ success: true }));
                } else if (event === 'end') {
                    callback();
                }
                return mockResponse;
            })
        };

        // Set up request object mock
        mockRequest = {
            on: vi.fn(),
            write: vi.fn(),
            end: vi.fn()
        };

        // Mock http.request and https.request properly
        (http.request as Mock).mockImplementation((_, callback: any) => {
            if (callback) {
                callback(mockResponse);
            }
            return mockRequest;
        });

        (https.request as Mock).mockImplementation((_, callback: any) => {
            if (callback) {
                callback(mockResponse);
            }
            return mockRequest;
        });

        // Create client instance
        client = new AwsHttpClient({
            service: 'test-service',
            region: 'us-east-1',
            baseUrl: 'https://api.example.com'
        });
    });

    afterEach(() => {
        // Restore environment
        process.env = originalEnv;
        vi.clearAllMocks();
    });

    describe('Constructor', () => {
        it('should throw error when service is not provided', () => {
            expect(() => {
                // @ts-ignore - Testing invalid constructor
                new AwsHttpClient({});
            }).toThrow('Service must be specified for AWS SigV4 signing');
        });
    });

    describe('HTTP methods with AWS signing', () => {
        it('should make GET requests with AWS signature', async () => {
            const response = await client.get('/test', {
                headers: {
                    'x-custom-header': 'value'
                }
            });

            expect(mockSignFunction).toHaveBeenCalled();
            expect(https.request).toHaveBeenCalled();
            expect(response).toEqual({
                data: { success: true },
                statusCode: 200,
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ success: true })
            });

            // Verify SignatureV4 was initialized correctly
            expect(SignatureV4).toHaveBeenCalledWith({
                credentials: expect.any(Object),
                region: 'us-east-1',
                service: 'test-service',
                sha256: Sha256
            });
        });

        it('should make POST requests correctly with AWS signature', async () => {
            const data = { name: 'test' };
            await client.post('/test', data);

            expect(mockSignFunction).toHaveBeenCalledExactlyOnceWith(
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: expect.objectContaining({
                        'content-type': 'application/json'
                    })
                })
            );
        });

        it('should use the signed request for making the actual HTTP request', async () => {
            // Set up a specific signature result
            mockSignFunction.mockResolvedValueOnce({
                hostname: 'api.example.com',
                protocol: 'https:',
                port: 443,
                path: '/test',
                method: 'GET',
                headers: {
                    host: 'api.example.com',
                    'x-amz-date': '20220101T000000Z',
                    authorization: 'AWS4-HMAC-SHA256 Credential=...',
                    'x-amz-security-token': 'mock-session-token'
                },
                body: undefined
            });

            await client.get('/test');

            // Check if https.request was called with proper signed parameters
            expect(https.request).toHaveBeenCalledExactlyOnceWith(
                expect.objectContaining({
                    headers: expect.objectContaining({
                        authorization: 'AWS4-HMAC-SHA256 Credential=...',
                        'x-amz-date': '20220101T000000Z'
                    })
                }),
                expect.anything() // Callback function
            );
        });
    });

    describe('Authentication and signing', () => {
        it('should use default credentials when no roleArn is provided', async () => {
            await client.get('/test');

            expect(mockStsAssumeRole).not.toHaveBeenCalled();
            expect(mockDefaultProvider).toHaveBeenCalled();
            expect(SignatureV4).toHaveBeenCalledWith({
                credentials: expect.any(Object),
                region: 'us-east-1',
                service: 'test-service',
                sha256: Sha256
            });
        });

        it('should assume role when roleArn is provided', async () => {
            const clientWithRole = new AwsHttpClient({
                service: 'test-service',
                roleArn: 'arn:aws:iam::123456789012:role/test-role',
                baseUrl: 'https://api.example.com'
            });

            await clientWithRole.get('/test');

            expect(mockStsAssumeRole).toHaveBeenCalledWith({
                RoleArn: 'arn:aws:iam::123456789012:role/test-role',
                RoleSessionName: 'AwsSigV4Request',
                DurationSeconds: 900
            });

            expect(mockDefaultProvider).not.toHaveBeenCalled();
        });

        it('should cache credentials from assumed role', async () => {
            const clientWithRole = new AwsHttpClient({
                service: 'test-service',
                roleArn: 'arn:aws:iam::123456789012:role/test-role',
                baseUrl: 'https://api.example.com'
            });

            await clientWithRole.get('/test');
            await clientWithRole.get('/test2');

            expect(mockStsAssumeRole).toHaveBeenCalledTimes(1);
        });

        it('should refresh credentials when expiration is near', async () => {
            // Mock expiring credentials
            mockStsAssumeRole.mockResolvedValueOnce({
                Credentials: {
                    AccessKeyId: 'mock-access-key',
                    SecretAccessKey: 'mock-secret-key',
                    SessionToken: 'mock-session-token',
                    Expiration: new Date(Date.now() + 4 * 60 * 1000) // 4 minutes from now (< 5 min threshold)
                }
            });

            const clientWithRole = new AwsHttpClient({
                service: 'test-service',
                roleArn: 'arn:aws:iam::123456789012:role/test-role',
                baseUrl: 'https://api.example.com'
            });

            await clientWithRole.get('/test');
            await clientWithRole.get('/test2');

            expect(mockStsAssumeRole).toHaveBeenCalledTimes(2);
        });

        it('should use region from environment if not specified', async () => {
            const clientWithoutRegion = new AwsHttpClient({
                service: 'test-service',
                baseUrl: 'https://api.example.com'
            });

            await clientWithoutRegion.get('/test');

            expect(SignatureV4).toHaveBeenCalledWith(
                expect.objectContaining({
                    region: 'us-east-1'
                })
            );
        });

        it('should throw error when region is not specified and not in environment', async () => {
            delete process.env.AWS_REGION;

            const clientWithoutRegion = new AwsHttpClient({
                service: 'test-service',
                baseUrl: 'https://api.example.com'
            });

            await expect(clientWithoutRegion.get('/test')).rejects.toThrow(
                'Region is not specified and could not be determined from environment.'
            );
        });
    });

    describe('Error handling', () => {
        it('should throw error when failing to get temporary credentials', async () => {
            mockStsAssumeRole.mockResolvedValueOnce({
                // No Credentials property
            });

            const clientWithRole = new AwsHttpClient({
                service: 'test-service',
                roleArn: 'arn:aws:iam::123456789012:role/test-role',
                baseUrl: 'https://api.example.com'
            });

            await expect(clientWithRole.get('/test')).rejects.toThrow(
                'Failed to get temporary credentials'
            );
        });
    });
});
