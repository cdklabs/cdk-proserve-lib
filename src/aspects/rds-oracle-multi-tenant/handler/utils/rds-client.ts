// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    RDSClient,
    DescribeDBInstancesCommand,
    ModifyDBInstanceCommand,
    DBInstance,
    RDSServiceException
} from '@aws-sdk/client-rds';
import { validateOracleMultiTenantCompatibility } from './validation';

/**
 * Gets the current status of a database instance
 * @param rdsClient - The RDS client instance
 * @param dbInstanceId - The database instance identifier
 * @returns The database instance details
 * @throws Error if the database instance is not found or RDS API call fails
 */
export async function getDatabaseInstance(
    rdsClient: RDSClient,
    dbInstanceId: string
): Promise<DBInstance> {
    try {
        const command = new DescribeDBInstancesCommand({
            DBInstanceIdentifier: dbInstanceId
        });

        const response = await rdsClient.send(command);

        if (!response.DBInstances || response.DBInstances.length === 0) {
            throw new Error(`Database instance '${dbInstanceId}' not found`);
        }

        return response.DBInstances[0];
    } catch (error) {
        if (error instanceof RDSServiceException) {
            throw new Error(`RDS API error: ${error.name} - ${error.message}`);
        }
        if (error instanceof Error) {
            throw new Error(
                `Failed to get database instance: ${error.message}`
            );
        }
        throw error;
    }
}

/**
 * Validates Oracle database compatibility for MultiTenant conversion
 * @param rdsClient - The RDS client instance
 * @param dbInstanceId - The database instance identifier
 * @returns The validated database instance
 * @throws Error if validation fails or database is not found
 */
export async function validateOracleDatabase(
    rdsClient: RDSClient,
    dbInstanceId: string
): Promise<DBInstance> {
    try {
        const dbInstance = await getDatabaseInstance(rdsClient, dbInstanceId);

        // Run all validation checks
        validateOracleMultiTenantCompatibility(dbInstance);

        return dbInstance;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Database validation failed: ${error.message}`);
        }
        throw error;
    }
}

/**
 * Enables Oracle MultiTenant on the specified RDS instance
 * @param rdsClient - The RDS client instance
 * @param dbInstanceId - The database instance identifier
 * @throws Error if the ModifyDBInstance operation fails
 */
export async function enableOracleMultiTenant(
    rdsClient: RDSClient,
    dbInstanceId: string
): Promise<void> {
    try {
        console.log(
            `Enabling Oracle MultiTenant on database instance: ${dbInstanceId}`
        );

        const command = new ModifyDBInstanceCommand({
            DBInstanceIdentifier: dbInstanceId,
            MultiTenant: true,
            ApplyImmediately: true
        });

        const response = await rdsClient.send(command);
        console.log(
            `ModifyDBInstance response:`,
            JSON.stringify(response, null, 2)
        );

        if (!response.DBInstance) {
            throw new Error(
                'ModifyDBInstance response did not include DBInstance details'
            );
        }

        console.log(
            `Successfully initiated MultiTenant conversion for ${dbInstanceId}`
        );
    } catch (error) {
        if (error instanceof RDSServiceException) {
            throw new Error(`RDS API error: ${error.name} - ${error.message}`);
        }
        if (error instanceof Error) {
            throw new Error(
                `Failed to enable Oracle MultiTenant: ${error.message}`
            );
        }
        throw error;
    }
}

/**
 * Checks if the MultiTenant conversion is complete
 * @param dbInstance - The database instance to check
 * @returns True if conversion is complete, false if still in progress
 * @throws Error if conversion has failed
 */
export function isMultiTenantConversionComplete(
    dbInstance: DBInstance
): boolean {
    const status = dbInstance.DBInstanceStatus;
    const pendingModifications = dbInstance.PendingModifiedValues;

    // Check for failed status
    if (status === 'failed' || status === 'incompatible-parameters') {
        throw new Error(`MultiTenant conversion failed with status: ${status}`);
    }

    // Check if conversion is complete
    if (
        status === 'available' &&
        (!pendingModifications ||
            Object.keys(pendingModifications).length === 0)
    ) {
        return true;
    }

    return false;
}

/**
 * Creates a configured RDS client instance
 * @returns A new RDS client instance
 */
export function createRdsClient(): RDSClient {
    return new RDSClient({});
}
