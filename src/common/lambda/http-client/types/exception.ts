// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { RequestResponse } from './index';

export class HttpClientResponseError extends Error {
    constructor(public readonly response: RequestResponse) {
        super(`${response.statusCode} | ${JSON.stringify(response.body)}`);
    }
}
