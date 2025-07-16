// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Represents the supported HTTP methods for API requests.
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';

/**
 * Represents the raw response from an HTTP request.
 */
export interface RequestResponse {
    /** The HTTP status code of the response. */
    statusCode?: number;
    /** The HTTP headers returned in the response. */
    headers: Record<string, string | string[] | undefined>;
    /** The response body as a string. */
    body?: string;
}

/**
 * Represents the options for making an HTTP request
 */
export interface HttpRequestOptions {
    /**
     * Additional HTTP headers to send
     */
    headers?: Record<string, string>;

    /**
     * Query string parameters to send
     */
    params?: Record<string, string>;
}

/**
 * Represents an outgoing HTTP client request.
 */
export interface HttpClientRequest {
    /** The target host name. */
    hostname: string;
    /** The protocol to use (e.g., 'http:', 'https:'). */
    protocol: string;
    /** The port to connect to. */
    port?: number;
    /** The request path. */
    path: string;
    /** The HTTP method to use. */
    method: string;
    /** The HTTP headers to include in the request. */
    headers: Record<string, string>;
    /** The query string parameters to include in the request. */
    params?: Record<string, string>;
    /** The request body as a string. */
    body?: string;
}

/**
 * Configuration options for the HTTP client.
 */
export interface HttpClientOptions {
    /** The base URL for all requests. */
    baseUrl?: string;
    /** Request timeout in milliseconds. */
    timeout?: number;
    /** Default headers to include in all requests. */
    defaultHeaders?: Record<string, string>;
    /** If specified, errors will NOT be thrown for status codes outside of 200-300 */
    passNonSuccessfulStatusCodes?: boolean;
}

/**
 * Represents a processed HTTP response with parsed data.
 */
export interface HttpClientResponse<T> extends RequestResponse {
    /** The parsed response data. */
    data: T;
}
