// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as http from 'node:http';
import * as https from 'node:https';
import { URL } from 'node:url';
import { vi, describe, beforeEach, expect, it, afterEach, Mock } from 'vitest';
import { HttpClient } from '../../../../src/common/lambda/http-client';
import { HttpClientOptions } from '../../../../src/common/lambda/http-client/types';
import { HttpClientResponseError } from '../../../../src/common/lambda/http-client/types/exception';

type RequestOptions = https.RequestOptions & URL;

vi.mock('http');
vi.mock('https');

describe('HttpClient', () => {
    // Create reusable mocks and client instance
    let client: HttpClient<HttpClientOptions>;
    let mockResponse: any;
    let mockRequest: any;

    beforeEach(() => {
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
        client = new HttpClient({
            baseUrl: 'https://api.example.com'
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('Constructor', () => {
        it('should set default options correctly', () => {
            const newClient = new HttpClient();
            // @ts-ignore - Accessing protected properties for testing
            expect(newClient.options).toEqual({
                timeout: 30000,
                defaultHeaders: {}
            });
        });

        it('should merge provided options with defaults', () => {
            const newClient = new HttpClient({
                timeout: 5000,
                defaultHeaders: { 'X-Custom-Header': 'test' }
            });
            // @ts-ignore - Accessing protected properties for testing
            expect(newClient.options).toEqual({
                timeout: 5000,
                defaultHeaders: { 'x-custom-header': 'test' } // Note: header normalized to lowercase
            });
        });
    });

    describe('Header normalization', () => {
        it('should normalize header keys to lowercase', async () => {
            await client.get('/test', {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': 'abc123'
                }
            });

            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.headers['content-type']).toBe(
                'application/json'
            );
            expect(requestOptions.headers['x-api-key']).toBe('abc123');
            // Original capitalized keys should not exist
            expect(requestOptions.headers['Content-Type']).toBeUndefined();
            expect(requestOptions.headers['X-API-Key']).toBeUndefined();
        });
    });

    describe('HTTP methods', () => {
        it('should make GET requests correctly', async () => {
            const response = await client.get('/test', {
                headers: {
                    'X-Custom-Header': 'value'
                }
            });

            expect(https.request).toHaveBeenCalled();
            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.method).toBe('GET');
            expect(requestOptions.headers['x-custom-header']).toBe('value'); // lowercase key
            expect(response).toEqual({
                data: { success: true },
                statusCode: 200,
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ success: true })
            });
        });

        it('should make POST requests correctly with data', async () => {
            const data = { name: 'test' };
            await client.post('/test', data);

            expect(mockRequest.write).toHaveBeenCalledWith(
                JSON.stringify(data)
            );
            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.method).toBe('POST');
            expect(requestOptions.headers['content-type']).toBe(
                'application/json'
            );
        });

        it('should make PUT requests correctly', async () => {
            const data = { name: 'test' };
            await client.put('/test', data);

            expect(mockRequest.write).toHaveBeenCalledWith(
                JSON.stringify(data)
            );
            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.method).toBe('PUT');
        });

        it('should make DELETE requests correctly', async () => {
            await client.delete('/test');

            expect(mockRequest.write).not.toHaveBeenCalled();
            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.method).toBe('DELETE');
        });

        it('should make PATCH requests correctly', async () => {
            const data = { name: 'test' };
            await client.patch('/test', data);

            expect(mockRequest.write).toHaveBeenCalledWith(
                JSON.stringify(data)
            );
            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.method).toBe('PATCH');
        });

        it('should make HEAD requests correctly', async () => {
            await client.head('/test');

            expect(mockRequest.write).not.toHaveBeenCalled();
            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.method).toBe('HEAD');
        });
    });

    describe('URL building', () => {
        it('should use the provided URL when no baseUrl exists', async () => {
            // Create a new client without baseUrl for this test
            const clientWithoutBaseUrl = new HttpClient();
            await clientWithoutBaseUrl.get('https://api.example.com/test');

            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.hostname).toBe('api.example.com');
            expect(requestOptions.path).toBe('/test');
        });

        it('should combine baseUrl with path', async () => {
            const clientWithBaseUrl = new HttpClient({
                baseUrl: 'https://api.example.com'
            });

            await clientWithBaseUrl.get('/test');

            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.hostname).toBe('api.example.com');
            expect(requestOptions.path).toBe('/test');
        });

        it('should handle trailing slashes in baseUrl', async () => {
            const clientWithBaseUrl = new HttpClient({
                baseUrl: 'https://api.example.com/'
            });

            await clientWithBaseUrl.get('test');

            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.hostname).toBe('api.example.com');
            expect(requestOptions.path).toBe('/test');
        });

        it('should handle leading slashes in path', async () => {
            const clientWithBaseUrl = new HttpClient({
                baseUrl: 'https://api.example.com'
            });

            await clientWithBaseUrl.get('/test');

            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.hostname).toBe('api.example.com');
            expect(requestOptions.path).toBe('/test');
        });
    });

    describe('Error handling', () => {
        it('should throw HttpClientResponseError for non-2xx responses', async () => {
            // Mock an error response
            const errorResponse = {
                statusCode: 400,
                headers: { 'content-type': 'application/json' },
                on: vi.fn().mockImplementation((event, callback) => {
                    if (event === 'data') {
                        callback(JSON.stringify({ error: 'Bad request' }));
                    } else if (event === 'end') {
                        callback();
                    }
                    return errorResponse;
                })
            };

            // Mock https.request to return error response for just this test
            (https.request as Mock).mockImplementationOnce(
                (_, callback: any) => {
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

            expect(error).toBeInstanceOf(HttpClientResponseError);
            expect(error.message).toContain('400');
        });

        it('should handle network errors', async () => {
            const networkError = new Error('Network error');

            // Override the mock for just this test
            (https.request as Mock).mockImplementationOnce(() => {
                const req = {
                    on: vi.fn().mockImplementation((event, callback) => {
                        if (event === 'error' && callback) {
                            // Store the error callback to trigger later
                            setTimeout(() => callback(networkError), 0);
                        }
                        return req;
                    }),
                    write: vi.fn(),
                    end: vi.fn()
                };
                return req;
            });

            await expect(client.get('/test')).rejects.toThrow('Network error');
        });
    });

    describe('Response parsing', () => {
        it('should handle non-JSON responses correctly', async () => {
            // Mock a non-JSON response
            const nonJsonResponse = {
                statusCode: 200,
                headers: { 'content-type': 'text/plain' },
                on: vi.fn().mockImplementation((event, callback) => {
                    if (event === 'data') {
                        callback('This is plain text, not JSON');
                    } else if (event === 'end') {
                        callback();
                    }
                    return nonJsonResponse;
                })
            };

            // Mock https.request to return non-JSON response for just this test
            (https.request as Mock).mockImplementationOnce(
                (_, callback: any) => {
                    if (callback) {
                        callback(nonJsonResponse);
                    }
                    return mockRequest;
                }
            );

            const response = await client.get('/test');

            // Expect the raw string to be passed as data since JSON parsing failed
            expect(response.data).toBe('This is plain text, not JSON');
            expect(response.body).toBe('This is plain text, not JSON');
        });
    });

    describe('URL validation', () => {
        it('should throw error for an invalid URL', async () => {
            // Create a client without baseUrl
            const clientWithoutBaseUrl = new HttpClient();

            // Try with a relative path which is invalid without baseUrl
            await expect(
                clientWithoutBaseUrl.get('/relative-path')
            ).rejects.toThrow('Invalid URL: /relative-path');
        });

        it('should throw error for an empty URL', async () => {
            // Create a client without baseUrl
            const clientWithoutBaseUrl = new HttpClient();

            // Try with empty string
            await expect(clientWithoutBaseUrl.get('')).rejects.toThrow(
                'Invalid URL:'
            );
        });
    });

    describe('Request headers', () => {
        it('should include default headers in all requests', async () => {
            const clientWithDefaultHeaders = new HttpClient({
                baseUrl: 'https://api.example.com',
                defaultHeaders: {
                    'X-Header-Info': '12345',
                    'User-Agent': 'test-client'
                }
            });

            await clientWithDefaultHeaders.get('/test');

            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.headers['x-header-info']).toBe('12345');
            expect(requestOptions.headers['user-agent']).toBe('test-client');
            // Original case should not exist
            expect(requestOptions.headers['X-Header-Info']).toBeUndefined();
            expect(requestOptions.headers['User-Agent']).toBeUndefined();
        });

        it('should override default headers with request-specific headers', async () => {
            const clientWithDefaultHeaders = new HttpClient({
                baseUrl: 'https://api.example.com',
                defaultHeaders: {
                    'X-Header-Info': '12345',
                    'Content-Type': 'application/json'
                }
            });
            await clientWithDefaultHeaders.get('/test', {
                headers: {
                    'X-Header-Info': '67890',
                    Accept: 'application/xml'
                }
            });
            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.headers['x-header-info']).toBe('67890'); // Overridden
            expect(requestOptions.headers['content-type']).toBe(
                'application/json'
            ); // From defaults
            expect(requestOptions.headers.accept).toBe('application/xml'); // New header - normalized
            // Original cases should not exist
            expect(requestOptions.headers['X-Header-Info']).toBeUndefined();
            expect(requestOptions.headers.Accept).toBeUndefined();
        });

        it('should handle case insensitive header matching', async () => {
            const clientWithDefaultHeaders = new HttpClient({
                baseUrl: 'https://api.example.com',
                defaultHeaders: {
                    'content-type': 'application/json'
                }
            });

            // Use different casing for the same header
            await clientWithDefaultHeaders.get('/test', {
                headers: {
                    'Content-Type': 'application/xml'
                }
            });

            const requestOptions = (https.request as Mock).mock.calls[0][0];

            expect(requestOptions.headers['content-type']).toBe(
                'application/xml'
            );
            expect(requestOptions.headers['Content-Type']).toBeUndefined();
        });
    });

    describe('Timeout', () => {
        it('should set the default timeout on requests', async () => {
            await client.get('/test');

            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.timeout).toBe(30000);
        });

        it('should use custom timeout when provided', async () => {
            const customTimeoutClient = new HttpClient({
                baseUrl: 'https://api.example.com',
                timeout: 5000
            });

            await customTimeoutClient.get('/test');

            const requestOptions = (https.request as Mock).mock.calls[0][0];
            expect(requestOptions.timeout).toBe(5000);
        });
    });

    describe('URL parameters', () => {
        it('should handle query parameters correctly', async () => {
            await client.get('/test', {
                params: {
                    page: '1',
                    limit: '10',
                    filter: 'active'
                }
            });

            const requestOptions = (https.request as Mock).mock
                .calls[0][0] as RequestOptions;
            expect(requestOptions.searchParams.toString()).toBe(
                'page=1&limit=10&filter=active'
            );
        });

        it('should encode query parameter values', async () => {
            await client.get('/test', {
                params: {
                    search: 'hello world',
                    tag: 'special&char'
                }
            });

            const requestOptions = (https.request as Mock).mock
                .calls[0][0] as RequestOptions;
            expect(requestOptions.searchParams.toString()).toBe(
                'search=hello+world&tag=special%26char'
            );
        });

        it('should handle array values in query parameters', async () => {
            await client.get('/test', {
                params: {
                    ids: ['1', '2', '3'],
                    tags: ['tag1', 'tag2']
                }
            });

            const requestOptions = (https.request as Mock).mock
                .calls[0][0] as RequestOptions;
            expect(requestOptions.searchParams.toString()).toBe(
                'ids=1%2C2%2C3&tags=tag1%2Ctag2'
            );
        });
    });
});
