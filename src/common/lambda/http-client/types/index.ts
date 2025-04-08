// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';

export interface RequestResponse {
    statusCode?: number;
    headers: Record<string, string | string[] | undefined>;
    body?: string;
}

export interface HttpClientRequest {
    hostname: string;
    protocol: string;
    port?: number;
    path: string;
    method: string;
    headers: Record<string, string>;
    body?: string;
}

export interface HttpClientOptions {
    baseUrl?: string;
    timeout?: number;
    defaultHeaders?: Record<string, string>;
}

export interface HttpClientResponse<T> extends RequestResponse {
    data: T;
}
