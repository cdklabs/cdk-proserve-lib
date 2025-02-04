// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CORSRule as SdkCORSRule } from '@aws-sdk/client-s3';
import { HttpMethods } from 'aws-cdk-lib/aws-s3';
import { S3BucketCors } from '../../../../src/constructs/s3-bucket-cors';
import { CORSRule as HandlerCORSRule } from '../../../../src/constructs/s3-bucket-cors/handler/types/resource-properties';

/**
 * Mock existing Amazon S3 bucket name
 */
export const mockExistingS3BucketName = 'existing-bucket';

/**
 * Mock non-existant Amazon S3 bucket name
 */
export const mockNonexistantS3BucketName = 'nonexistant-bucket';

/**
 * Mock CORS rule (Handler)
 */
export const mockCORSRule: HandlerCORSRule = {
    AllowedMethods: ['PUT'],
    AllowedOrigins: ['https://example.com'],
    AllowedHeaders: ['*'],
    ExposeHeaders: ['etag'],
    ID: 'TestRule'
};

/**
 * Mock CORS rule (Infrastructure)
 */
export const mockInfrastructureCORSRule: S3BucketCors.CorsRule = {
    allowedMethods: [HttpMethods.PUT],
    allowedOrigins: mockCORSRule.AllowedOrigins!,
    allowedHeaders: mockCORSRule.AllowedHeaders,
    exposedHeaders: mockCORSRule.ExposeHeaders,
    id: mockCORSRule.ID
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
