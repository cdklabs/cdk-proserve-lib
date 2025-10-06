// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    CdkCustomResourceIsCompleteEvent,
    CdkCustomResourceIsCompleteResponse,
    Context
} from 'aws-lambda';
import { ConversionStatus, IConversionState } from '../types/conversion-status';
import { IResourceProperties } from '../types/resource-properties';
import { IResponseData } from '../types/resource-response';
import { createRdsClient, getDatabaseInstance } from '../utils/rds-client';

/**
 * Determines the current conversion state of the database instance
 *
 * @param dbInstanceId - The database instance identifier
 * @returns The current conversion state
 */
async function getConversionState(
    dbInstanceId: string
): Promise<IConversionState> {
    const rdsClient = createRdsClient();
    const dbInstance = await getDatabaseInstance(rdsClient, dbInstanceId);

    const status = dbInstance.DBInstanceStatus;
    const pendingModifications = dbInstance.PendingModifiedValues;
    const hasPendingModifications =
        pendingModifications && Object.keys(pendingModifications).length > 0;

    console.log(
        `Database ${dbInstanceId} status: ${status}, pending modifications: ${JSON.stringify(pendingModifications)}`
    );

    // Check for failed states
    if (status === 'failed' || status === 'incompatible-parameters') {
        return {
            status: ConversionStatus.FAILED,
            dbInstanceStatus: status,
            hasPendingModifications: hasPendingModifications || false,
            pendingModifications,
            errorMessage: `MultiTenant conversion failed with database status: ${status}`
        };
    }

    // Check if conversion is complete
    if (
        status === 'available' &&
        (!pendingModifications ||
            Object.keys(pendingModifications).length === 0)
    ) {
        return {
            status: ConversionStatus.COMPLETED,
            dbInstanceStatus: status,
            hasPendingModifications: false,
            pendingModifications
        };
    }

    // Conversion is still in progress
    return {
        status: ConversionStatus.IN_PROGRESS,
        dbInstanceStatus: status || 'unknown',
        hasPendingModifications: hasPendingModifications || false,
        pendingModifications
    };
}

/**
 * Formats the response data when conversion is complete
 *
 * @param dbInstanceId - The database instance identifier
 * @param conversionState - The current conversion state
 * @returns Formatted response data
 */
function formatResponseData(
    dbInstanceId: string,
    conversionState: IConversionState
): IResponseData {
    return {
        DBInstanceIdentifier: dbInstanceId,
        MultiTenantStatus: conversionState.status,
        ModificationStatus: conversionState.dbInstanceStatus,
        PendingModifications: conversionState.pendingModifications
            ? JSON.stringify(conversionState.pendingModifications)
            : undefined
    };
}

/**
 * Checks if CREATE operation is complete
 *
 * @param dbInstanceId - The database instance identifier
 * @returns IsComplete response indicating completion status
 */
async function isCreateComplete(
    dbInstanceId: string
): Promise<CdkCustomResourceIsCompleteResponse<IResponseData>> {
    try {
        const conversionState = await getConversionState(dbInstanceId);

        switch (conversionState.status) {
            case ConversionStatus.COMPLETED:
                console.log(
                    `MultiTenant conversion completed for database: ${dbInstanceId}`
                );
                return {
                    IsComplete: true,
                    Data: formatResponseData(dbInstanceId, conversionState)
                };

            case ConversionStatus.IN_PROGRESS:
                console.log(
                    `MultiTenant conversion still in progress for database: ${dbInstanceId}`
                );
                return {
                    IsComplete: false
                };

            case ConversionStatus.FAILED:
                console.error(
                    `MultiTenant conversion failed for database: ${dbInstanceId}`
                );
                throw new Error(
                    conversionState.errorMessage ||
                        'MultiTenant conversion failed'
                );

            default:
                throw new Error(
                    `Unexpected conversion status: ${conversionState.status}`
                );
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(
                `Error checking CREATE completion for ${dbInstanceId}: ${error.message}`
            );
            throw error;
        } else {
            throw new Error(
                `Unknown error checking CREATE completion for ${dbInstanceId}`
            );
        }
    }
}

/**
 * Checks if UPDATE operation is complete
 *
 * UPDATE operations are no-op for this construct, so they complete immediately
 *
 * @param dbInstanceId - The database instance identifier
 * @returns IsComplete response indicating immediate completion
 */
async function isUpdateComplete(
    dbInstanceId: string
): Promise<CdkCustomResourceIsCompleteResponse<IResponseData>> {
    console.log(
        `UPDATE operation is no-op for database: ${dbInstanceId}, completing immediately`
    );

    return {
        IsComplete: true
    };
}

/**
 * Checks if DELETE operation is complete
 *
 * DELETE operations are no-op for this construct, so they complete immediately
 *
 * @param dbInstanceId - The database instance identifier
 * @returns IsComplete response indicating immediate completion
 */
async function isDeleteComplete(
    dbInstanceId: string
): Promise<CdkCustomResourceIsCompleteResponse<IResponseData>> {
    console.log(
        `DELETE operation is no-op for database: ${dbInstanceId}, completing immediately`
    );
    console.log(
        `MultiTenant conversion cannot be reversed, database retains configuration`
    );

    return {
        IsComplete: true
    };
}

/**
 * Main Lambda handler for IsComplete operations
 *
 * Checks the completion status of CREATE, UPDATE, and DELETE operations
 * for RDS Oracle Multi-Tenant conversion
 *
 * @param event - CloudFormation IsComplete event
 * @param _context - Lambda context (unused)
 * @returns IsComplete response with completion status and optional data
 */
export async function handler(
    event: CdkCustomResourceIsCompleteEvent<IResourceProperties>,
    _context: Context
): Promise<CdkCustomResourceIsCompleteResponse<IResponseData>> {
    console.log(
        'IsComplete handler called with event:',
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
                `Checking CREATE completion for database: ${dbInstanceId}`
            );
            return isCreateComplete(dbInstanceId);

        case 'Update':
            console.log(
                `Checking UPDATE completion for database: ${dbInstanceId}`
            );
            return isUpdateComplete(dbInstanceId);

        case 'Delete':
            console.log(
                `Checking DELETE completion for database: ${dbInstanceId}`
            );
            return isDeleteComplete(dbInstanceId);

        default:
            throw new Error(
                `Unsupported request type: ${(event as any).RequestType}`
            );
    }
}
