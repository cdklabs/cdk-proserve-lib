// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CORSRule as SdkCORSRule } from '@aws-sdk/client-s3';
import { CORSRule } from '../../../../src/constructs/s3-bucket-cors/handler/types/resource-properties';

/**
 * Mock existing Amazon S3 bucket name
 */
export const mockExistingS3BucketName = 'ExistingBucket';

/**
 * Mock non-existant Amazon S3 bucket name
 */
export const mockNonexistantS3BucketName = 'NonexistantBucket';

/**
 * Mock CORS rule
 */
export const mockCORSRule: CORSRule = {
    AllowedMethods: ['PUT'],
    AllowedOrigins: ['https://example.com'],
    AllowedHeaders: ['*'],
    ExposeHeaders: ['etag'],
    ID: 'TestRule'
};

/**
 * Mock existing CORS rules
 */
export const mockExistingCORSRules: SdkCORSRule[] = [
    {
        AllowedMethods: ['GET'],
        AllowedOrigins: ['*']
    },
    {
        AllowedMethods: ['POST'],
        AllowedOrigins: ['https://example.net'],
        ID: 'ExistingNamedRule'
    }
];

/**
 * Custom resource type used in AWS CloudFormation
 */
export const resourceType = 'Custom::S3BucketCors';

/**
 * Mock Physical Resource ID
 */
export const mockPhysicalResourceId = 'MockPhysicalResourceId';

/**
 * Mock alternate AWS region
 */
export const mockAlternateAwsRegion = 'some-other-region';
