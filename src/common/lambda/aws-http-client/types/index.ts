// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

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

export interface RequestResponse {
    readonly statusCode?: number;
    readonly headers: Record<string, string | string[] | undefined>;
    readonly body: string;
}

export type HttpMethod =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'POST'
    | 'PATCH'
    | 'HEAD';
