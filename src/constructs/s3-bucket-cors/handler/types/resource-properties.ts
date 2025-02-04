// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CORSRule as SdkCORSRule } from '@aws-sdk/client-s3';

/**
 * Specifies a cross-origin access rule for an Amazon S3 bucket.
 * Wraps the SDK rule model to enforce IDs as required
 */
export interface CORSRule extends SdkCORSRule {
    readonly ID: string;
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
