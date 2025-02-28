// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { TableItem } from './table-item';

/**
 * Metadata about a DynamoDB key element (partition or sort)
 */
interface KeyElementMetadata {
    /**
     * Actual value of the key element for an item in the table
     */
    readonly value: unknown;

    /**
     * Name of the key element for indexing items in the table
     */
    readonly name: string;
}

/**
 * Represents a DynamoDB table composite key portion of an entry within the
 * table
 */
export class TableKey {
    /**
     * Create a TableKey entity from a raw DynamoDB table entry
     * @param item Raw DynamoDB table entry
     * @param partitionName Name of the partition key for indexing
     * @param sortName Name of the sort key for indexing if applicable
     * @returns Composite key representation for a DynamoDB table entry
     */
    static import(
        item: TableItem,
        partitionName: string,
        sortName?: string
    ): TableKey {
        const partition: KeyElementMetadata = {
            name: partitionName,
            value: item[partitionName]
        };

        const sort: KeyElementMetadata | undefined = (() => {
            if (sortName) {
                return {
                    name: sortName,
                    value: item[sortName]
                };
            } else {
                return undefined;
            }
        })();

        return new TableKey(partition, sort);
    }

    /**
     * Details about the partition key portion of the entry
     */
    private readonly partition: KeyElementMetadata;

    /**
     * Details about the sort key portion of the entry if applicable
     */
    private readonly sort?: KeyElementMetadata;

    /**
     * Constructor
     * @param partition Details about the partition key portion of the entry
     * @param sort Details about the sort key portion of the entry if applicable
     */
    private constructor(
        partition: KeyElementMetadata,
        sort?: KeyElementMetadata
    ) {
        this.partition = partition;
        this.sort = sort;
    }

    /**
     * Determines if one entry is equivalent to another by their key values
     * @param other Other entry's key values
     * @returns True if equal, false otherwise
     */
    equals(other: TableKey): boolean {
        if (this.sort && other.sort) {
            return (
                this.partition.name === other.partition.name &&
                this.partition.value === other.partition.value &&
                this.sort.name === other.sort.name &&
                this.sort.value === other.sort.value
            );
        } else if (!this.sort && !other.sort) {
            return (
                this.partition.name === other.partition.name &&
                this.partition.value === other.partition.value
            );
        } else {
            return false;
        }
    }

    /**
     * Exports the key representation back to a DynamoDB raw reprsentation
     * @returns Raw DynamoDB representation of the key
     */
    export(): TableItem {
        const key: TableItem = {
            [this.partition.name]: this.partition.value
        };

        if (this.sort) {
            key[this.sort.name] = this.sort.value;
        }

        return key;
    }
}

/**
 * Collection of DynamoDB key entry representations
 * Enforces uniqueness
 */
export class TableKeyCollection extends Array<TableKey> {
    /**
     * Determine if the collection contains the key
     * @param key The key to check
     * @returns True if contained in the collection, false otherwise
     */
    has(key: TableKey): boolean {
        const match = this.filter((v) => v.equals(key));
        return match.length > 0;
    }

    /**
     * Add a key to the collection if it is not already present
     * @param key Key to add
     */
    add(key: TableKey): void {
        if (!this.has(key)) {
            this.push(key);
        }
    }

    /**
     * Safely removes a key from the collection
     * @param key The key to remove
     */
    delete(key: TableKey): void {
        const index = this.findIndex((v) => v.equals(key));

        if (index !== -1) {
            this.splice(index, 1);
        }
    }
}
