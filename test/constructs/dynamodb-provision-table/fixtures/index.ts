// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Mock existing Amazon S3 bucket name
 */
export const mockTableNameOne = 'table-one';

/**
 * Mock non-existant Amazon S3 bucket name
 */
export const mockTableNameTwo = 'table-two';

/**
 * Custom resource type used in AWS CloudFormation
 */
export const resourceType = 'Custom::DynamoDbProvisionTable';

/**
 * Mock Physical Resource ID
 */
export const mockPhysicalResourceId = 'MockPhysicalResourceId';

/**
 * Schema for a mock DynamoDB table
 */
export interface MockTableSchema extends Record<string, unknown> {
    /**
     * Partition
     */
    readonly uid: number;

    /**
     * Sort
     */
    readonly sort?: string;

    /**
     * Arbitrary
     */
    readonly data: string;
}

/**
 * Primary key in mock schema
 */
export const mockItemPrimaryKey = 'uid';

/**
 * Sort key in mock schema
 */
export const mockItemSortKey = 'sort';

/**
 * Mock item (partition only)
 */
export const mockItemOne: MockTableSchema = {
    data: 'hello world',
    uid: 1
};

/**
 * Mock item (partition + sort)
 */
export const mockItemOneWithSort: MockTableSchema = {
    ...mockItemOne,
    sort: 'a'
};

/**
 * Mock different item (partition only)
 */
export const mockItemTwo: MockTableSchema = {
    data: 'hello world again',
    uid: 2
};

/**
 * Mock different item (partition + sort)
 */
export const mockItemTwoWithSort: MockTableSchema = {
    ...mockItemTwo,
    sort: 'b'
};
