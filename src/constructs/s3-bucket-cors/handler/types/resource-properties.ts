// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Specifies a cross-origin access rule for an Amazon S3 bucket
 */
export interface CORSRule {
    /**
     * Unique identifier for the rule. The value cannot be longer than 255 characters
     */
    readonly ID: string;

    /**
     * Headers that are specified in the Access-Control-Request-Headers header. These headers are allowed in a
     * preflight OPTIONS request. In response to any preflight OPTIONS request, Amazon S3 returns any requested headers
     * that are allowed
     */
    readonly AllowedHeaders?: string[];

    /**
     * An HTTP method that you allow the origin to execute. Valid values are GET, PUT, HEAD, POST, and DELETE
     */
    readonly AllowedMethods: string[] | undefined;

    /**
     * One or more origins you want customers to be able to access the bucket from
     */
    readonly AllowedOrigins: string[] | undefined;

    /**
     * One or more headers in the response that you want customers to be able to access from their applications
     */
    readonly ExposedHeaders?: string[];

    /**
     * The time in seconds that your browser is to cache the preflight response for the specified resource
     */
    readonly MaxAgeSeconds?: number;
}

/**
 * Invocation properties for the Custom Resource
 */
export interface ResourceProperties {
    /**
     * Name of the Amazon S3 bucket on which to modify CORS rules
     */
    readonly BucketName: string;

    /**
     * Cross-origin access rules to apply to the Amazon S3 bucket
     */
    readonly Rules: CORSRule[];

    /**
     * Optional AWS region to which the bucket is deployed
     * If not specified, it is assumed the bucket exists in the same region
     */
    readonly Region?: string;
}
