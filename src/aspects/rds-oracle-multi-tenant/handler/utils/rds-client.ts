// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DBInstance, RDSServiceException, RDS } from '@aws-sdk/client-rds';
import { validateOracleMultiTenantCompatibility } from './validation';

/**
 * Gets the current status of a database instance
 * @param rdsClient - The RDS client instance
 * @param dbInstanceId - The database instance identifier
 * @returns The database instance details
 * @throws Error if the database instance is not found or RDS API call fails
 */
export async function getDatabaseInstance(
    rdsClient: RDS,
    dbInstanceId: string
): Promise<DBInstance> {
    try {
        const response = await rdsClient.describeDBInstances({
            DBInstanceIdentifier: dbInstanceId
        });

        if (!response.DBInstances || response.DBInstances.length === 0) {
            throw new Error(`Database instance '${dbInstanceId}' not found`);
        }

        return response.DBInstances[0];
    } catch (error) {
        if (error instanceof RDSServiceException) {
            throw new Error(`RDS API error: ${error.name} - ${error.message}`);
        } else if (error instanceof Error) {
            throw new Error(
                `Failed to get database instance: ${error.message}`
            );
        } else {
            throw error;
        }
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
    rdsClient: RDS,
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
        } else {
            throw error;
        }
    }
}

/**
 * Enables Oracle MultiTenant on the specified RDS instance
 * @param rdsClient - The RDS client instance
 * @param dbInstanceId - The database instance identifier
 * @throws Error if the ModifyDBInstance operation fails
 */
export async function enableOracleMultiTenant(
    rdsClient: RDS,
    dbInstanceId: string
): Promise<void> {
    try {
        console.log(
            `Enabling Oracle MultiTenant on database instance: ${dbInstanceId}`
        );

        const response = await rdsClient.modifyDBInstance({
            DBInstanceIdentifier: dbInstanceId,
            MultiTenant: true,
            ApplyImmediately: true
        });

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
        } else if (error instanceof Error) {
            throw new Error(
                `Failed to enable Oracle MultiTenant: ${error.message}`
            );
        } else {
            throw error;
        }
    }
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
    rdsClient: RDS,
    dbInstanceId: string,
    maxWaitTimeMs: number = 240000, // 4 minutes (leave 1 minute buffer for Lambda timeout)
    pollIntervalMs: number = 30000 // 30 seconds
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
            } else if (
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
 * Creates a configured RDS instance
 * @returns A new RDS instance
 */
export function createRdsClient(): RDS {
    return new RDS({});
}
