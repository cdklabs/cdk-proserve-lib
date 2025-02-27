// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DynamoDB, ResourceNotFoundException } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import {
    CdkCustomResourceEvent,
    CdkCustomResourceResponse,
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceUpdateEvent,
    Context
} from 'aws-lambda';
import { ResourceProperties } from '../types/resource-properties';
import { TableItem } from '../types/table-item';
import { TableKey, TableKeyCollection } from '../types/table-key';

// Constants
const DDB_BATCH_WINDOW = 25;

// AWS Clients
const ddb = DynamoDBDocument.from(new DynamoDB());

/**
 * Adds entries to a DynamoDB table
 * @param tableName Table to provision
 * @param items Entries to add to the table
 */
async function addToTable(
    tableName: string,
    items: TableItem[]
): Promise<void> {
    console.log(`Adding ${items.length} items to ${tableName}...`);

    for (let i = 0; i < items.length; i += DDB_BATCH_WINDOW) {
        await ddb.batchWrite({
            RequestItems: {
                [tableName]: items.slice(i, i + DDB_BATCH_WINDOW).map((v) => {
                    return {
                        PutRequest: {
                            Item: v
                        }
                    };
                })
            }
        });
    }
}

/**
 * Removes entries from a DynamoDB table
 * @param tableName Table to update
 * @param keys Composite keys of the entries to remove
 */
async function removeFromTable(
    tableName: string,
    keys: TableKeyCollection
): Promise<void> {
    console.log(`Removing ${keys.length} items from ${tableName}...`);

    for (let i = 0; i < keys.length; i += DDB_BATCH_WINDOW) {
        await ddb.batchWrite({
            RequestItems: {
                [tableName]: keys.slice(i, i + DDB_BATCH_WINDOW).map((v) => {
                    return {
                        DeleteRequest: {
                            Key: v.export()
                        }
                    };
                })
            }
        });
    }
}

/**
 * Compares table key collection entries between the properties of an old
 * invocation and the properties of the latest invocation to determine which
 * keys were removed during the update
 * @param oldMetadata Old entries used to provision the table
 * @param newMetadata New entries used to provision the table
 * @returns Entry keys which were removed as part of the update
 */
function getRemovedKeys(
    oldMetadata: ResourceProperties,
    newMetadata: ResourceProperties
): TableKeyCollection {
    console.log('Evaluating how many entries were removed...');

    const changedKeys: TableKeyCollection = new TableKeyCollection();

    const oldKeys = extractKeys(oldMetadata);
    const newKeys = extractKeys(newMetadata);

    oldKeys.forEach((key) => {
        if (!newKeys.has(key)) {
            changedKeys.push(key);
        }
    });

    console.log(`${oldKeys.length} entries were removed`);

    return changedKeys;
}

/**
 * Extracts key entries for each item being provisioned
 * @param metadata Details about the provisioning request
 * @returns Key values for each entry requested as part of the provisioning
 */
function extractKeys(metadata: ResourceProperties): TableKeyCollection {
    console.log('Extracting keys from entries...');

    const collection = new TableKeyCollection();

    metadata.Items.forEach((item) => {
        collection.add(
            TableKey.import(
                item,
                metadata.PartitionKeyName,
                metadata.SortKeyName
            )
        );
    });

    console.log(
        `Found ${collection.length} keys for ${metadata.Items.length} entries`
    );

    return collection;
}

/**
 * Handles AWS CloudFormation CREATE calls
 * @param event Input metadata for the custom resource
 * @returns A promise that resolves to a CloudFormation custom resource response
 */
async function onCreate(
    event: CloudFormationCustomResourceCreateEvent<ResourceProperties>
): Promise<CdkCustomResourceResponse<never>> {
    const props = event.ResourceProperties;

    await addToTable(props.TableName, props.Items);

    return {
        PhysicalResourceId: event.RequestId
    };
}

/**
 * Handles AWS CloudFormation UPDATE calls
 * @param event Input metadata for the custom resource
 * @returns A promise that resolves to a CloudFormation custom resource response
 */
async function onUpdate(
    event: CloudFormationCustomResourceUpdateEvent<ResourceProperties>
): Promise<CdkCustomResourceResponse<never>> {
    const props = event.ResourceProperties;
    const oldProps = event.OldResourceProperties;

    const removedKeys = getRemovedKeys(oldProps, props);

    if (props.TableName !== oldProps.TableName) {
        console.log(
            `Table names changed during update from ${oldProps.TableName} to ${props.TableName}`
        );
        await removeFromTable(oldProps.TableName, extractKeys(oldProps));
    } else {
        console.log('Table names unchanged');
        await removeFromTable(props.TableName, removedKeys);
    }

    await addToTable(props.TableName, props.Items);

    return {
        PhysicalResourceId: event.PhysicalResourceId
    };
}

/**
 * Handles AWS CloudFormation DELETE calls
 * @param event Input metadata for the custom resource
 * @returns A promise that resolves to a CloudFormation custom resource response
 */
async function onDelete(
    event: CloudFormationCustomResourceDeleteEvent<ResourceProperties>
): Promise<CdkCustomResourceResponse<never>> {
    try {
        const props = event.ResourceProperties;

        await removeFromTable(props.TableName, extractKeys(props));

        return {
            PhysicalResourceId: event.PhysicalResourceId
        };
    } catch (e) {
        if (e instanceof ResourceNotFoundException) {
            return {
                PhysicalResourceId: event.PhysicalResourceId
            };
        } else {
            throw e;
        }
    }
}

/**
 * Entry point
 * @param event Input provided to the custom resource
 * @param context AWS Lambda context
 * @returns A promise that resolves to a CloudFormation custom resource response
 */
export async function handler(
    event: CdkCustomResourceEvent<ResourceProperties>,
    _context: Context
): Promise<CdkCustomResourceResponse<never>> {
    switch (event.RequestType) {
        case 'Create':
            console.info('Running CREATE...');
            return onCreate(event);
        case 'Delete':
            console.info('Running DELETE...');
            return onDelete(event);
        case 'Update':
            console.info('Running UPDATE...');
            return onUpdate(event);
    }
}
