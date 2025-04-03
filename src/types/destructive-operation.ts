// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Represents types of destructive operations that can be performed on resources.
 *
 * Destructive operations are actions that modify or remove existing resources,
 * potentially resulting in data loss if not handled properly.
 */
export enum DestructiveOperation {
    /**
     * Indicates an operation that modifies existing resources.
     */
    UPDATE = 'UPDATE',
    /**
     * Indicates an operation that removes resources.
     */
    DELETE = 'DELETE',
    /**
     * Represents all types of destructive operations.
     */
    ALL = 'ALL'
}
