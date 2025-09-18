// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DBInstance } from '@aws-sdk/client-rds';

/**
 * Validates that the database engine is Oracle
 * @param dbInstance - The RDS database instance to validate
 * @throws Error if the database engine is not Oracle
 */
export function validateOracleEngine(dbInstance: DBInstance): void {
    if (
        !dbInstance.Engine ||
        !dbInstance.Engine.toLowerCase().includes('oracle')
    ) {
        throw new Error(
            `Database engine '${dbInstance.Engine}' is not Oracle. Oracle MultiTenant is only supported on Oracle databases.`
        );
    }
}

/**
 * Validates Oracle version compatibility for MultiTenant (19c+)
 * @param dbInstance - The RDS database instance to validate
 * @throws Error if the Oracle version doesn't support MultiTenant
 */
export function validateOracleVersion(dbInstance: DBInstance): void {
    const engineVersion = dbInstance.EngineVersion;
    if (!engineVersion) {
        throw new Error('Database engine version is not available');
    }

    // Oracle version format is typically like "19.0.0.0.ru-2023-01.rur-2023-01.r1"
    // We need to extract the major version (19, 21, etc.)
    const versionMatch = engineVersion.match(/^(\d+)\./);
    if (!versionMatch) {
        throw new Error(
            `Unable to parse Oracle version from '${engineVersion}'`
        );
    }

    const majorVersion = parseInt(versionMatch[1], 10);
    if (majorVersion < 19) {
        throw new Error(
            `Oracle version ${majorVersion} does not support MultiTenant. Oracle 19c or higher is required.`
        );
    }
}

/**
 * Validates Oracle edition for MultiTenant support
 * Note: MultiTenant is fully supported in Enterprise Edition, limited in Standard Edition
 * @param dbInstance - The RDS database instance to validate
 */
export function validateOracleEdition(dbInstance: DBInstance): void {
    const licenseModel = dbInstance.LicenseModel;

    // Check if it's Standard Edition (which has limited MultiTenant support)
    if (
        licenseModel &&
        licenseModel.toLowerCase().includes('license-included')
    ) {
        console.warn(
            'Warning: Oracle Standard Edition has limited MultiTenant support. ' +
                'Enterprise Edition is recommended for full MultiTenant capabilities.'
        );
    }
}

/**
 * Validates that the database is in available state
 * @param dbInstance - The RDS database instance to validate
 * @throws Error if the database is not in available state
 */
export function validateDatabaseStatus(dbInstance: DBInstance): void {
    const status = dbInstance.DBInstanceStatus;
    if (status !== 'available') {
        throw new Error(
            `Database instance is in '${status}' state. MultiTenant conversion requires the database to be in 'available' state.`
        );
    }
}

/**
 * Validates Oracle database compatibility for MultiTenant conversion
 * Runs all validation checks in sequence
 * @param dbInstance - The RDS database instance to validate
 * @throws Error if any validation check fails
 */
export function validateOracleMultiTenantCompatibility(
    dbInstance: DBInstance
): void {
    validateOracleEngine(dbInstance);
    validateOracleVersion(dbInstance);
    validateOracleEdition(dbInstance);
    validateDatabaseStatus(dbInstance);
}
