/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

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
