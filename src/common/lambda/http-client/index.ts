// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { request as httpRequest } from 'node:http';
import { request as httpsRequest } from 'node:https';
import { parse } from 'node:url';
import {
    HttpClientOptions,
    HttpClientResponse,
    HttpMethod,
    RequestResponse,
    HttpClientRequest
} from './types';
import { HttpClientResponseError } from './types/exception';
import { Json } from '../../../types/json';

export class HttpClient {
    protected readonly options: HttpClientOptions;

    /**
     * Creates a new HTTP client
     *
     * @param options - Configuration options for the client
     */
    constructor(options: HttpClientOptions = {}) {
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
    async get<T>(
        url: string,
        headers?: Record<string, string>
    ): Promise<HttpClientResponse<T>> {
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
    async post<T>(
        url: string,
        data?: Json,
        headers?: Record<string, string>
    ): Promise<HttpClientResponse<T>> {
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
    async put<T>(
        url: string,
        data?: Json,
        headers?: Record<string, string>
    ): Promise<HttpClientResponse<T>> {
        return this.request<T>('PUT', url, data, headers);
    }

    /**
     * Makes a DELETE request
     *
     * @param url - URL path (appended to baseUrl if provided in options)
     * @param headers - Optional additional headers
     * @returns Promise resolving to the typed response
     */
    async delete<T>(
        url: string,
        headers?: Record<string, string>
    ): Promise<HttpClientResponse<T>> {
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
    async patch<T>(
        url: string,
        data?: Json,
        headers?: Record<string, string>
    ): Promise<HttpClientResponse<T>> {
        return this.request<T>('PATCH', url, data, headers);
    }

    /**
     * Makes a HEAD request
     *
     * @param url - URL path (appended to baseUrl if provided in options)
     * @param headers - Optional additional headers
     * @returns Promise resolving to the typed response
     */
    async head<T>(
        url: string,
        headers?: Record<string, string>
    ): Promise<HttpClientResponse<T>> {
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
    async request<T>(
        method: HttpMethod,
        url: string,
        data?: Json,
        headers?: Record<string, string>
    ): Promise<HttpClientResponse<T>> {
        // Build the full URL
        const fullUrl = this.buildUrl(url);

        // Merge default headers with request-specific headers
        const mergedHeaders = {
            ...this.options.defaultHeaders,
            ...headers
        };

        // Make the HTTP request
        const response = await this.sendHttpRequest(
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
            throw new HttpClientResponseError(response);
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
    protected buildUrl(url: string): string {
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
     * Creates and sends an HTTP request.
     *
     * @param url - The full URL for the request
     * @param method - HTTP method (GET, POST, etc.)
     * @param headers - Optional additional headers
     * @param body - Optional request body
     * @returns Promise resolving to the response
     */
    protected async sendHttpRequest(
        url: string,
        method: HttpMethod,
        headers: Record<string, string> = {},
        body?: Json
    ): Promise<RequestResponse> {
        const request = this.createRequest(url, method, headers, body);
        return this.sendRequest(request);
    }

    /**
     * Creates an HTTP request object.
     *
     * @param requestUrl - Full URL for the request
     * @param method - HTTP method (GET, POST, etc.)
     * @param headers - Optional additional headers
     * @param body - Optional request body
     * @returns An HTTP request object
     */
    protected createRequest(
        requestUrl: string,
        method: HttpMethod,
        headers: Record<string, string> = {},
        body?: Json
    ): HttpClientRequest {
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

        const request: HttpClientRequest = {
            hostname: parsedUrl.hostname,
            protocol: parsedUrl.protocol ?? 'https:',
            port: Number(parsedUrl.port ?? 443),
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
    protected sendRequest(
        request: HttpClientRequest
    ): Promise<RequestResponse> {
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
