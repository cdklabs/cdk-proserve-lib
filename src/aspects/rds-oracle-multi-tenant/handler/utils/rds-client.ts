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
            `Successfully initiated multi-tenant conversion for: ${dbInstanceId}`
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
 * Waits for the database instance to be in a ready state (not modifying)
 * @param rdsClient - The RDS client instance
 * @param dbInstanceId - The database instance identifier
 * @param maxWaitTimeMs - Maximum time to wait in milliseconds (default: 14 minutes)
 * @param pollIntervalMs - Polling interval in milliseconds (default: 30 seconds)
 * @throws Error if the database doesn't become ready within the timeout period
 */
export async function waitForDatabaseReady(
    rdsClient: RDSClient,
    dbInstanceId: string,
    maxWaitTimeMs: number = 14 * 60 * 1000, // 14 minutes (leave 1 minute buffer for Lambda timeout)
    pollIntervalMs: number = 30 * 1000 // 30 seconds
): Promise<void> {
    const startTime = Date.now();

    console.log(
        `Waiting for database ${dbInstanceId} to be ready for modification...`
    );

    while (Date.now() - startTime < maxWaitTimeMs) {
        try {
            const dbInstance = await getDatabaseInstance(
                rdsClient,
                dbInstanceId
            );
            const status = dbInstance.DBInstanceStatus;

            console.log(`Database ${dbInstanceId} current status: ${status}`);

            // Check if database is in a ready state
            if (status === 'available') {
                console.log(
                    `Database ${dbInstanceId} is ready for modification`
                );
                return;
            }

            // Check for failed states
            if (
                status === 'failed' ||
                status === 'incompatible-parameters' ||
                status === 'stopped'
            ) {
                throw new Error(
                    `Database ${dbInstanceId} is in a failed state: ${status}`
                );
            }

            // Wait before next poll
            console.log(
                `Database ${dbInstanceId} is not ready (status: ${status}), waiting ${pollIntervalMs / 1000} seconds...`
            );
            await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
        } catch (error) {
            if (
                error instanceof Error &&
                error.message.includes('is in a failed state')
            ) {
                throw error; // Re-throw failed state errors
            }

            // For other errors (like network issues), log and continue polling
            console.warn(
                `Error checking database status, will retry: ${error instanceof Error ? error.message : String(error)}`
            );
            await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
        }
    }

    throw new Error(
        `Timeout waiting for database ${dbInstanceId} to be ready. Database must be in 'available' state before MultiTenant conversion can begin.`
    );
}

/**
 * Creates a configured RDS client instance
 * @returns A new RDS client instance
 */
export function createRdsClient(): RDSClient {
    return new RDSClient({});
}
