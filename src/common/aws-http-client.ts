// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Sha256 } from '@aws-crypto/sha256-js';
import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@smithy/signature-v4';
import type {
    AwsCredentialIdentity,
    HttpRequest,
    Provider
} from '@smithy/types';
import { request as httpRequest } from 'http';
import { request as httpsRequest } from 'https';
import { parse } from 'url';

export interface AwsHttpClientOptions {
    readonly service: string;
    readonly region?: string;
    readonly roleArn?: string;
    readonly baseUrl?: string;
    readonly defaultHeaders?: Record<string, string>;
    readonly timeout?: number;
}

export interface AwsHttpResponse<T = any> {
    readonly data: T;
    readonly statusCode?: number;
    readonly headers: Record<string, string | string[] | undefined>;
    readonly rawBody: string;
}

interface RequestResponse {
    readonly statusCode?: number;
    readonly headers: Record<string, string | string[] | undefined>;
    readonly body: string;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'POST' | 'PATCH' | 'HEAD';

export class AwsHttpClientResponseError extends Error {
    constructor(public readonly response: RequestResponse) {
        super(`${response.statusCode} | ${JSON.stringify(response.body)}`);
    }
}

export class AwsHttpClient {
    private readonly options: AwsHttpClientOptions;
    private cachedCredentials?: AwsCredentialIdentity;
    private credentialsExpiration?: Date;

    /**
     * Creates a new AWS HTTP client with SigV4 authentication.
     *
     * @param options - Configuration options for the client
     */
    constructor(options: AwsHttpClientOptions) {
        this.options = {
            timeout: 30000,
            defaultHeaders: {},
            ...options
        };
    }

    /**
     * Makes a GET request
     *
     * @param url - URL path (appended to baseUrl if provided in options)
     * @param headers - Optional additional headers
     * @returns Promise resolving to the typed response
     */
    async get<T = any>(
        url: string,
        headers?: Record<string, string>
    ): Promise<AwsHttpResponse<T>> {
        return this.request<T>('GET', url, undefined, headers);
    }

    /**
     * Makes a POST request
     *
     * @param url - URL path (appended to baseUrl if provided in options)
     * @param data - Request body
     * @param headers - Optional additional headers
     * @returns Promise resolving to the typed response
     */
    async post<T = any>(
        url: string,
        data?: unknown,
        headers?: Record<string, string>
    ): Promise<AwsHttpResponse<T>> {
        return this.request<T>('POST', url, data, headers);
    }

    /**
     * Makes a PUT request
     *
     * @param url - URL path (appended to baseUrl if provided in options)
     * @param data - Request body
     * @param headers - Optional additional headers
     * @returns Promise resolving to the typed response
     */
    async put<T = any>(
        url: string,
        data?: unknown,
        headers?: Record<string, string>
    ): Promise<AwsHttpResponse<T>> {
        return this.request<T>('PUT', url, data, headers);
    }

    /**
     * Makes a DELETE request
     *
     * @param url - URL path (appended to baseUrl if provided in options)
     * @param headers - Optional additional headers
     * @returns Promise resolving to the typed response
     */
    async delete<T = any>(
        url: string,
        headers?: Record<string, string>
    ): Promise<AwsHttpResponse<T>> {
        return this.request<T>('DELETE', url, undefined, headers);
    }

    /**
     * Makes a PATCH request
     *
     * @param url - URL path (appended to baseUrl if provided in options)
     * @param data - Request body
     * @param headers - Optional additional headers
     * @returns Promise resolving to the typed response
     */
    async patch<T = any>(
        url: string,
        data?: unknown,
        headers?: Record<string, string>
    ): Promise<AwsHttpResponse<T>> {
        return this.request<T>('PATCH', url, data, headers);
    }

    /**
     * Makes a HEAD request
     *
     * @param url - URL path (appended to baseUrl if provided in options)
     * @param headers - Optional additional headers
     * @returns Promise resolving to the typed response
     */
    async head<T = any>(
        url: string,
        headers?: Record<string, string>
    ): Promise<AwsHttpResponse<T>> {
        return this.request<T>('HEAD', url, undefined, headers);
    }

    /**
     * Makes a request with the specified method
     *
     * @param method - HTTP method
     * @param url - URL path (appended to baseUrl if provided in options)
     * @param data - Optional request body
     * @param headers - Optional additional headers
     * @returns Promise resolving to the typed response
     */
    async request<T = any>(
        method: HttpMethod,
        url: string,
        data?: unknown,
        headers?: Record<string, string>
    ): Promise<AwsHttpResponse<T>> {
        // Build the full URL
        const fullUrl = this.buildUrl(url);

        // Merge default headers with request-specific headers
        const mergedHeaders = {
            ...this.options.defaultHeaders,
            ...headers
        };

        // Make the AWS signed request
        const response = await this.awsRequest(
            fullUrl,
            method,
            mergedHeaders,
            data
        );

        // Check if status code is not in the 2xx range
        if (
            response.statusCode &&
            (response.statusCode < 200 || response.statusCode >= 300)
        ) {
            throw new AwsHttpClientResponseError(response);
        }

        // Parse the response body if it's JSON
        let parsedData: T;
        try {
            parsedData = response.body ? JSON.parse(response.body) : null;
        } catch (error) {
            // If parsing fails, use the raw body as data
            parsedData = response.body as unknown as T;
        }

        return {
            data: parsedData,
            statusCode: response.statusCode,
            headers: response.headers,
            rawBody: response.body
        };
    }

    /**
     * Builds a full URL from the path and base URL (if provided)
     *
     * @param url - URL path
     * @returns Full URL
     */
    private buildUrl(url: string): string {
        if (!this.options.baseUrl) {
            return url;
        }

        // Remove trailing slash from baseUrl if present
        const base = this.options.baseUrl.endsWith('/')
            ? this.options.baseUrl.slice(0, -1)
            : this.options.baseUrl;

        // Remove leading slash from url if present
        const path = url.startsWith('/') ? url.slice(1) : url;

        return `${base}/${path}`;
    }

    /**
     * Creates, signs, and sends an HTTP request using AWS SigV4 authentication.
     *
     * @param url - The full URL for the request
     * @param method - HTTP method (GET, POST, etc.)
     * @param headers - Optional additional headers
     * @param body - Optional request body
     * @returns Promise resolving to the response
     */
    private async awsRequest(
        url: string,
        method: HttpMethod,
        headers: Record<string, string> = {},
        body?: unknown
    ): Promise<RequestResponse> {
        const request = this.createSignableRequest(url, method, headers, body);
        const signedRequest = await this.signRequest(request);
        return this.sendRequest(signedRequest);
    }

    /**
     * Signs an HTTP request using AWS SigV4.
     *
     * @param request - HTTP request to sign
     * @returns Promise resolving to the signed request
     */
    private async signRequest(request: HttpRequest): Promise<HttpRequest> {
        let credentials:
            | AwsCredentialIdentity
            | Provider<AwsCredentialIdentity>;

        // Get region from options or use the Lambda environment variable
        const region = this.options.region ?? process.env.AWS_REGION;
        if (!region) {
            throw new Error(
                'Region is not specified and could not be determined from environment.'
            );
        }

        if (this.options.roleArn) {
            // Check if we need new credentials (undefined or expiring within 5 minutes)
            const now = new Date();
            const needNewCredentials =
                this.cachedCredentials === undefined ||
                this.credentialsExpiration === undefined ||
                this.credentialsExpiration.getTime() - now.getTime() <
                    5 * 60 * 1000;

            if (needNewCredentials) {
                const stsClient = new STSClient();
                const response = await stsClient.send(
                    new AssumeRoleCommand({
                        RoleArn: this.options.roleArn,
                        RoleSessionName: 'AwsSigV4Request',
                        DurationSeconds: 900 // 15m (minimum)
                    })
                );

                if (!response.Credentials) {
                    throw new Error('Failed to get temporary credentials');
                }

                this.cachedCredentials = {
                    accessKeyId: response.Credentials.AccessKeyId!,
                    secretAccessKey: response.Credentials.SecretAccessKey!,
                    sessionToken: response.Credentials.SessionToken
                };

                // Set expiration time
                this.credentialsExpiration = response.Credentials.Expiration;
            }
            credentials = this.cachedCredentials!;
        } else {
            credentials = defaultProvider();
        }

        const signer = new SignatureV4({
            credentials: credentials,
            region: region,
            service: this.options.service,
            sha256: Sha256
        });

        return await signer.sign(request);
    }

    /**
     * Creates an HTTP request object suitable for SigV4 signing.
     *
     * @param requestUrl - Full URL for the request
     * @param method - HTTP method (GET, POST, etc.)
     * @param headers - Optional additional headers
     * @param body - Optional request body
     * @returns An HTTP request object ready for signing
     */
    private createSignableRequest(
        requestUrl: string,
        method: HttpMethod,
        headers: Record<string, string> = {},
        body?: unknown
    ): HttpRequest {
        const parsedUrl = parse(requestUrl);
        if (!parsedUrl.hostname) {
            throw new Error(`Invalid URL: ${requestUrl}`);
        }

        // Prepare headers with host
        const requestHeaders: Record<string, string> = {
            ...headers,
            host: parsedUrl.hostname
        };

        // Add content-type for requests with body
        if (body && !requestHeaders['content-type']) {
            requestHeaders['content-type'] = 'application/json';
        }

        const request: HttpRequest = {
            hostname: parsedUrl.hostname,
            protocol: parsedUrl.protocol ?? 'https:',
            port: Number(parsedUrl.port),
            path: parsedUrl.path ?? '/',
            method,
            headers: requestHeaders,
            body: body ? JSON.stringify(body) : undefined
        };

        return request;
    }

    /**
     * Sends an HTTP request with the provided configuration.
     *
     * @param request - The HTTP request to send
     * @returns Promise resolving to the response
     */
    private sendRequest(request: HttpRequest): Promise<RequestResponse> {
        return new Promise((resolve, reject) => {
            const isHttps = request.protocol === 'https:';
            const protocolRequest = isHttps ? httpsRequest : httpRequest;

            const req = protocolRequest(
                {
                    hostname: request.hostname,
                    port: request.port,
                    path: request.path,
                    method: request.method,
                    headers: request.headers,
                    timeout: this.options.timeout
                },
                (res) => {
                    let responseBody = '';
                    res.on('data', (chunk) => {
                        responseBody += chunk;
                    });
                    res.on('end', () => {
                        resolve({
                            statusCode: res.statusCode,
                            headers: res.headers,
                            body: responseBody
                        });
                    });
                }
            );

            req.on('error', (error) => {
                reject(error);
            });

            if (request.body) {
                req.write(request.body);
            }

            req.end();
        });
    }
}
