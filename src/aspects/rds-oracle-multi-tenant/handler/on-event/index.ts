// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    CdkCustomResourceEvent,
    CdkCustomResourceResponse,
    Context
} from 'aws-lambda';
import { IResourceProperties } from '../types/resource-properties';
import {
    createRdsClient,
    validateOracleDatabase,
    enableOracleMultiTenant,
    waitForDatabaseReady
} from '../utils/rds-client';

/**
 * Handles AWS CloudFormation CREATE calls
 *
 * Validates the Oracle database and initiates multi-tenant conversion
 *
 * @param dbInstanceId - The database instance identifier
 * @returns PhysicalResourceId for tracking the operation
 */
async function onCreate(
    dbInstanceId: string
): Promise<CdkCustomResourceResponse<never>> {
    console.log(
        `Starting CREATE operation for database instance: ${dbInstanceId}`
    );

    const rdsClient = createRdsClient();

    // Wait for database to be ready for modification
    console.log(
        `Waiting for database to be ready for modification: ${dbInstanceId}`
    );
    await waitForDatabaseReady(rdsClient, dbInstanceId);

    // Validate Oracle database compatibility
    console.log(
        `Validating Oracle database compatibility for: ${dbInstanceId}`
    );
    await validateOracleDatabase(rdsClient, dbInstanceId);

    // Initiate multi-tenant conversion
    console.log(`Initiating multi-tenant conversion for: ${dbInstanceId}`);
    await enableOracleMultiTenant(rdsClient, dbInstanceId);

    return {
        PhysicalResourceId: `rds-oracle-multi-tenant-${dbInstanceId}`
    };
}

/**
 * Handles AWS CloudFormation UPDATE calls
 *
 * UPDATE operations are handled as no-op since multi-tenant conversion
 * is a one-time operation that cannot be reversed or modified
 *
 * @param dbInstanceId - The database instance identifier
 * @param physicalResourceId - The existing physical resource ID
 * @returns The same PhysicalResourceId to maintain continuity
 */
async function onUpdate(
    dbInstanceId: string,
    physicalResourceId: string
): Promise<CdkCustomResourceResponse<never>> {
    console.log(
        `UPDATE operation called for database instance: ${dbInstanceId}`
    );
    console.log(
        `Multi-tenant conversion is a one-time operation and cannot be modified`
    );
    console.log(`Returning existing PhysicalResourceId: ${physicalResourceId}`);

    return {
        PhysicalResourceId: physicalResourceId
    };
}

/**
 * Handles AWS CloudFormation DELETE calls
 *
 * DELETE operations are handled as no-op since multi-tenant conversion
 * cannot be reversed through RDS API
 *
 * @param dbInstanceId - The database instance identifier
 * @param physicalResourceId - The existing physical resource ID
 * @returns The same PhysicalResourceId for proper cleanup
 */
async function onDelete(
    dbInstanceId: string,
    physicalResourceId: string
): Promise<CdkCustomResourceResponse<never>> {
    console.log(
        `DELETE operation called for database instance: ${dbInstanceId}`
    );
    console.log(`Multi-tenant conversion cannot be reversed through RDS API`);
    console.log(`Database instance will retain multi-tenant configuration`);
    console.log(
        `Returning PhysicalResourceId for cleanup: ${physicalResourceId}`
    );

    return {
        PhysicalResourceId: physicalResourceId
    };
}

/**
 * Main Lambda handler for OnEvent operations
 *
 * Handles CREATE, UPDATE, and DELETE operations for RDS Oracle Multi-Tenant conversion
 *
 * @param event - CloudFormation custom resource event
 * @param _context - Lambda context (unused)
 * @returns Custom resource response with PhysicalResourceId
 */
export async function handler(
    event: CdkCustomResourceEvent<IResourceProperties>,
    _context: Context
): Promise<CdkCustomResourceResponse<never>> {
    console.log(
        'OnEvent handler called with event:',
        JSON.stringify(event, null, 2)
    );

    const props = event.ResourceProperties;
    const dbInstanceId = props.DBInstanceIdentifier;

    if (!dbInstanceId) {
        throw new Error(
            'DBInstanceIdentifier is required in ResourceProperties'
        );
    }

    switch (event.RequestType) {
        case 'Create':
            console.log(
                `Processing CREATE request for database: ${dbInstanceId}`
            );
            return onCreate(dbInstanceId);

        case 'Update':
            console.log(
                `Processing UPDATE request for database: ${dbInstanceId}`
            );
            return onUpdate(dbInstanceId, event.PhysicalResourceId);

        case 'Delete':
            console.log(
                `Processing DELETE request for database: ${dbInstanceId}`
            );
            return onDelete(dbInstanceId, event.PhysicalResourceId);

        default:
            throw new Error(
                `Unsupported request type: ${(event as any).RequestType}`
            );
    }
}
