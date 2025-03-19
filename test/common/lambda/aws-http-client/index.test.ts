// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as http from 'http';
import * as https from 'https';
import { Sha256 } from '@aws-crypto/sha256-js';
import { STS } from '@aws-sdk/client-sts';
import { SignatureV4 } from '@smithy/signature-v4';
import { AwsHttpClient } from '../../../../src/common/lambda/aws-http-client';
import { AwsHttpClientResponseError } from '../../../../src/common/lambda/aws-http-client/types/exception';

// Mock the AWS SDK modules
jest.mock('@aws-sdk/client-sts');
jest.mock('@smithy/signature-v4');
jest.mock('http');
jest.mock('https');

describe('AwsHttpClient', () => {
    // Store original environment variables
    const originalEnv = process.env;

    // Create reusable mocks and client instance
    let mockSignFunction: jest.Mock;
    let mockStsAssumeRole: jest.Mock;
    let client: AwsHttpClient;

    // Mock response setup
    let mockResponse: any;
    let mockRequest: any;

    beforeEach(() => {
        // Reset environment for each test
        process.env = { ...originalEnv, AWS_REGION: 'us-east-1' };

        // Set up SignatureV4 mock
        mockSignFunction = jest.fn().mockResolvedValue({
            hostname: 'api.example.com',
            protocol: 'https:',
            port: 443,
            path: '/test',
            method: 'GET',
            headers: {
                host: 'api.example.com',
                'x-amz-date': '20220101T000000Z'
            },
            body: undefined
        });

        (
            SignatureV4 as jest.MockedClass<typeof SignatureV4>
        ).mockImplementation(
            () =>
                ({
                    sign: mockSignFunction
                }) as any
        );

        // Set up STS mock
        mockStsAssumeRole = jest.fn().mockResolvedValue({
            Credentials: {
                AccessKeyId: 'mock-access-key',
                SecretAccessKey: 'mock-secret-key',
                SessionToken: 'mock-session-token',
                Expiration: new Date(Date.now() + 3600 * 1000)
            }
        });

        (STS as jest.MockedClass<typeof STS>).mockImplementation(
            () =>
                ({
                    assumeRole: mockStsAssumeRole
                }) as any
        );

        // Set up HTTP/HTTPS response mocks
        mockResponse = {
            statusCode: 200,
            headers: { 'content-type': 'application/json' },
            on: jest.fn().mockImplementation((event, callback) => {
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
            on: jest.fn(),
            write: jest.fn(),
            end: jest.fn()
        };

        // Mock http.request and https.request properly
        (http.request as jest.Mock).mockImplementation((_, callback: any) => {
            if (callback) {
                callback(mockResponse);
            }
            return mockRequest;
        });

        (https.request as jest.Mock).mockImplementation((_, callback: any) => {
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
        jest.clearAllMocks();
    });

    describe('Constructor', () => {
        it('should set default options correctly', () => {
            const newClient = new AwsHttpClient({
                service: 'es'
            });

            // @ts-ignore - Accessing private properties for testing
            expect(newClient.options).toEqual({
                service: 'es',
                timeout: 30000,
                defaultHeaders: {}
            });
        });

        it('should merge provided options with defaults', () => {
            const newClient = new AwsHttpClient({
                service: 'es',
                region: 'us-east-1',
                timeout: 5000,
                defaultHeaders: { 'x-custom-header': 'test' }
            });

            // @ts-ignore - Accessing private properties for testing
            expect(newClient.options).toEqual({
                service: 'es',
                region: 'us-east-1',
                timeout: 5000,
                defaultHeaders: { 'x-custom-header': 'test' }
            });
        });
    });

    describe('HTTP methods', () => {
        it('should make GET requests correctly', async () => {
            const response = await client.get('/test', {
                'x-custom-header': 'value'
            });

            expect(mockSignFunction).toHaveBeenCalled();
            expect(https.request).toHaveBeenCalled();
            expect(response).toEqual({
                data: { success: true },
                statusCode: 200,
                headers: { 'content-type': 'application/json' },
                rawBody: JSON.stringify({ success: true })
            });
        });

        it('should make POST requests correctly with data', async () => {
            const data = { name: 'test' };
            await client.post('/test', data);

            const requestArg = mockSignFunction.mock.calls[0][0];
            expect(requestArg.method).toBe('POST');
            expect(requestArg.body).toBe(JSON.stringify(data));
            expect(requestArg.headers['content-type']).toBe('application/json');
        });

        it('should make PUT requests correctly', async () => {
            const data = { name: 'test' };
            await client.put('/test', data);

            const requestArg = mockSignFunction.mock.calls[0][0];
            expect(requestArg.method).toBe('PUT');
            expect(requestArg.body).toBe(JSON.stringify(data));
        });

        it('should make DELETE requests correctly', async () => {
            await client.delete('/test');

            const requestArg = mockSignFunction.mock.calls[0][0];
            expect(requestArg.method).toBe('DELETE');
            expect(requestArg.body).toBeUndefined();
        });

        it('should make PATCH requests correctly', async () => {
            const data = { name: 'test' };
            await client.patch('/test', data);

            const requestArg = mockSignFunction.mock.calls[0][0];
            expect(requestArg.method).toBe('PATCH');
            expect(requestArg.body).toBe(JSON.stringify(data));
        });

        it('should make HEAD requests correctly', async () => {
            await client.head('/test');

            const requestArg = mockSignFunction.mock.calls[0][0];
            expect(requestArg.method).toBe('HEAD');
            expect(requestArg.body).toBeUndefined();
        });
    });

    describe('URL building', () => {
        it('should use the provided URL when no baseUrl exists', async () => {
            // Create a new client without baseUrl for this test
            const clientWithoutBaseUrl = new AwsHttpClient({
                service: 'test-service',
                region: 'us-east-1'
            });

            await clientWithoutBaseUrl.get('https://api.example.com/test');

            const requestArg = mockSignFunction.mock.calls[0][0];
            expect(requestArg.hostname).toBe('api.example.com');
            expect(requestArg.path).toBe('/test');
        });

        it('should combine baseUrl with path', async () => {
            const clientWithBaseUrl = new AwsHttpClient({
                service: 'test-service',
                baseUrl: 'https://api.example.com'
            });

            await clientWithBaseUrl.get('/test');

            const requestArg = mockSignFunction.mock.calls[0][0];
            expect(requestArg.hostname).toBe('api.example.com');
            expect(requestArg.path).toBe('/test');
        });

        it('should handle trailing slashes in baseUrl', async () => {
            const clientWithBaseUrl = new AwsHttpClient({
                service: 'test-service',
                baseUrl: 'https://api.example.com/'
            });

            await clientWithBaseUrl.get('test');

            const requestArg = mockSignFunction.mock.calls[0][0];
            expect(requestArg.hostname).toBe('api.example.com');
            expect(requestArg.path).toBe('/test');
        });

        it('should handle leading slashes in path', async () => {
            const clientWithBaseUrl = new AwsHttpClient({
                service: 'test-service',
                baseUrl: 'https://api.example.com'
            });

            await clientWithBaseUrl.get('/test');

            const requestArg = mockSignFunction.mock.calls[0][0];
            expect(requestArg.hostname).toBe('api.example.com');
            expect(requestArg.path).toBe('/test');
        });
    });

    describe('Authentication and signing', () => {
        it('should use default credentials when no roleArn is provided', async () => {
            await client.get('/test');

            expect(mockStsAssumeRole).not.toHaveBeenCalled();
            expect(SignatureV4).toHaveBeenCalledWith({
                credentials: expect.any(Function),
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
        it('should throw AwsHttpClientResponseError for non-2xx responses', async () => {
            // Mock an error response
            const errorResponse = {
                statusCode: 400,
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ error: 'Bad request' }),
                on: jest.fn().mockImplementation((event, callback) => {
                    if (event === 'data') {
                        callback(JSON.stringify({ error: 'Bad request' }));
                    } else if (event === 'end') {
                        callback();
                    }
                    return errorResponse;
                })
            };

            // Mock https.request to return error response for just this test
            (https.request as jest.Mock).mockImplementationOnce(
                (_: any, callback: any) => {
                    if (callback) {
                        callback(errorResponse);
                    }
                    return mockRequest;
                }
            );

            let error: any;
            try {
                await client.get('/test');
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(AwsHttpClientResponseError);
            expect(error.message).toContain('400');
        });

        it('should handle network errors', async () => {
            const networkError = new Error('Network error');

            // Override the mock for just this test
            (https.request as jest.Mock).mockImplementationOnce(() => {
                const req = {
                    on: jest.fn().mockImplementation((event, callback) => {
                        if (event === 'error' && callback) {
                            // Store the error callback to trigger later
                            setTimeout(() => callback(networkError), 0);
                        }
                        return req;
                    }),
                    write: jest.fn(),
                    end: jest.fn()
                };
                return req;
            });

            await expect(client.get('/test')).rejects.toThrow('Network error');
        });

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

    describe('Response parsing', () => {
        it('should handle non-JSON responses correctly', async () => {
            // Mock a non-JSON response
            const nonJsonResponse = {
                statusCode: 200,
                headers: { 'content-type': 'text/plain' },
                on: jest.fn().mockImplementation((event, callback) => {
                    if (event === 'data') {
                        callback('This is plain text, not JSON');
                    } else if (event === 'end') {
                        callback();
                    }
                    return nonJsonResponse;
                })
            };

            // Mock https.request to return non-JSON response for just this test
            (https.request as jest.Mock).mockImplementationOnce(
                (_: any, callback: any) => {
                    if (callback) {
                        callback(nonJsonResponse);
                    }
                    return mockRequest;
                }
            );

            const response = await client.get('/test');

            // Expect the raw string to be passed as data since JSON parsing failed
            expect(response.data).toBe('This is plain text, not JSON');
            expect(response.rawBody).toBe('This is plain text, not JSON');
        });
    });

    describe('URL validation', () => {
        it('should throw error for an invalid URL', async () => {
            // Create a client without baseUrl
            const clientWithoutBaseUrl = new AwsHttpClient({
                service: 'test-service',
                region: 'us-east-1'
            });

            // Try with a relative path which is invalid without baseUrl
            await expect(
                clientWithoutBaseUrl.get('/relative-path')
            ).rejects.toThrow('Invalid URL: /relative-path');
        });

        it('should throw error for an empty URL', async () => {
            // Create a client without baseUrl
            const clientWithoutBaseUrl = new AwsHttpClient({
                service: 'test-service',
                region: 'us-east-1'
            });

            // Try with empty string
            await expect(clientWithoutBaseUrl.get('')).rejects.toThrow(
                'Invalid URL:'
            );
        });
    });
});
