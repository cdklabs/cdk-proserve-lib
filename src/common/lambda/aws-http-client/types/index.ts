// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { HttpClientOptions } from '../../http-client/types';

export interface AwsHttpClientOptions extends HttpClientOptions {
    /**
     * The AWS service that the request will be signed for using SigV4.
     */
    service: string;
    /**
     * The AWS region that the request will be signed for using SigV4.
     */
    region?: string;
    /**
     * The ARN of the role that the request will be signed with using SigV4.
     * If not provided, the default AWS credentials will be used if they are
     * available.
     */
    roleArn?: string;
}
