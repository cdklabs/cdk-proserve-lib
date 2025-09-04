// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { RequestResponse } from './index';

export class HttpClientResponseError extends Error {
    readonly statusCode?: number;

    constructor(public readonly response: RequestResponse) {
        super(`${response.statusCode} | ${JSON.stringify(response.body)}`);

        this.statusCode = response.statusCode;
    }
}
