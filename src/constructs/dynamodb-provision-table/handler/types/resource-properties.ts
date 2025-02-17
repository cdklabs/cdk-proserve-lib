// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Invocation properties for the Custom Resource
 */
export interface ResourceProperties {
    /**
     * Name of the DynamoDB table to provision
     */
    readonly TableName: string;

    /**
     * Items to provision within the DynamoDB table
     */
    readonly Items: Record<string, unknown>[];

    /**
     * Name of the partition key for the table
     */
    readonly PartitionKeyName: string;

    /**
     * Name of the sort key for the table if applicable
     */
    readonly SortKeyName?: string;
}
