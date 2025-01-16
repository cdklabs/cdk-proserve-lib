// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Mock AWS Account ID
 */
export const mockAccount = '123456789012';

/**
 * Mock AWS Region
 */
export const mockRegion = 'us-east-1';

/**
 * Builds a mock Amazon Resource Name (ARN)
 * @param partition AWS partition
 * @param service AWS service namespace
 * @param resource Resouce (including the type and ID)
 * @param region AWS region
 * @param accountId AWS account ID
 * @returns Mock ARN
 */
export function buildMockArn(
    partition: string,
    service: string,
    resource: string,
    region?: string,
    accountId?: string
): string {
    return `arn:${partition}:${service}:${region}:${accountId}:${resource}`;
}
