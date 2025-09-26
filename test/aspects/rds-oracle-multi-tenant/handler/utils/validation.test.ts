// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DBInstance } from '@aws-sdk/client-rds';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import {
    validateOracleEngine,
    validateOracleVersion,
    validateOracleEdition,
    validateDatabaseStatus,
    validateOracleMultiTenantCompatibility
} from '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/validation';

describe('Validation Utilities', () => {
    let mockDbInstance: DBInstance;
    const consoleSpy = vi.spyOn(console, 'warn');

    beforeEach(() => {
        consoleSpy.mockClear();
        mockDbInstance = {
            DBInstanceIdentifier: 'test-instance',
            Engine: 'oracle-se2',
            EngineVersion: '19.0.0.0.ru-2023-01.rur-2023-01.r1',
            LicenseModel: 'bring-your-own-license',
            DBInstanceStatus: 'available'
        };
    });

    describe('validateOracleEngine', () => {
        it('should pass validation for oracle-se2 engine', () => {
            mockDbInstance.Engine = 'oracle-se2';
            expect(() => validateOracleEngine(mockDbInstance)).not.toThrow();
        });

        it('should pass validation for oracle-ee engine', () => {
            mockDbInstance.Engine = 'oracle-ee';
            expect(() => validateOracleEngine(mockDbInstance)).not.toThrow();
        });

        it('should pass validation for uppercase Oracle engine', () => {
            mockDbInstance.Engine = 'ORACLE-SE2';
            expect(() => validateOracleEngine(mockDbInstance)).not.toThrow();
        });

        it('should pass validation for mixed case Oracle engine', () => {
            mockDbInstance.Engine = 'Oracle-EE';
            expect(() => validateOracleEngine(mockDbInstance)).not.toThrow();
        });

        it('should throw error for non-Oracle engine', () => {
            mockDbInstance.Engine = 'mysql';
            expect(() => validateOracleEngine(mockDbInstance)).toThrow(
                "Database engine 'mysql' is not Oracle. Oracle MultiTenant is only supported on Oracle databases."
            );
        });

        it('should throw error for postgres engine', () => {
            mockDbInstance.Engine = 'postgres';
            expect(() => validateOracleEngine(mockDbInstance)).toThrow(
                "Database engine 'postgres' is not Oracle. Oracle MultiTenant is only supported on Oracle databases."
            );
        });

        it('should throw error when engine is undefined', () => {
            mockDbInstance.Engine = undefined;
            expect(() => validateOracleEngine(mockDbInstance)).toThrow(
                "Database engine 'undefined' is not Oracle. Oracle MultiTenant is only supported on Oracle databases."
            );
        });

        it('should throw error when engine is null', () => {
            mockDbInstance.Engine = null as any;
            expect(() => validateOracleEngine(mockDbInstance)).toThrow(
                "Database engine 'null' is not Oracle. Oracle MultiTenant is only supported on Oracle databases."
            );
        });

        it('should throw error when engine is empty string', () => {
            mockDbInstance.Engine = '';
            expect(() => validateOracleEngine(mockDbInstance)).toThrow(
                "Database engine '' is not Oracle. Oracle MultiTenant is only supported on Oracle databases."
            );
        });

        it('should throw error for engine that contains oracle but is not oracle', () => {
            mockDbInstance.Engine = 'not-oracle-engine';
            expect(() => validateOracleEngine(mockDbInstance)).not.toThrow();
        });

        it('should pass validation for engine that partially contains oracle', () => {
            mockDbInstance.Engine = 'oracle-custom';
            expect(() => validateOracleEngine(mockDbInstance)).not.toThrow();
        });
    });

    describe('validateOracleVersion', () => {
        it('should pass validation for Oracle 19c', () => {
            mockDbInstance.EngineVersion = '19.0.0.0.ru-2023-01.rur-2023-01.r1';
            expect(() => validateOracleVersion(mockDbInstance)).not.toThrow();
        });

        it('should pass validation for Oracle 21c', () => {
            mockDbInstance.EngineVersion = '21.0.0.0.ru-2023-01.rur-2023-01.r1';
            expect(() => validateOracleVersion(mockDbInstance)).not.toThrow();
        });

        it('should pass validation for Oracle 23c', () => {
            mockDbInstance.EngineVersion = '23.0.0.0.ru-2023-01.rur-2023-01.r1';
            expect(() => validateOracleVersion(mockDbInstance)).not.toThrow();
        });

        it('should pass validation for simple version format', () => {
            mockDbInstance.EngineVersion = '19.0.0.0';
            expect(() => validateOracleVersion(mockDbInstance)).not.toThrow();
        });

        it('should pass validation for minimal version format', () => {
            mockDbInstance.EngineVersion = '19.1';
            expect(() => validateOracleVersion(mockDbInstance)).not.toThrow();
        });

        it('should throw error for Oracle 18c', () => {
            mockDbInstance.EngineVersion = '18.0.0.0.ru-2023-01.rur-2023-01.r1';
            expect(() => validateOracleVersion(mockDbInstance)).toThrow(
                'Oracle version 18 does not support MultiTenant. Oracle 19c or higher is required.'
            );
        });

        it('should throw error for Oracle 12c', () => {
            mockDbInstance.EngineVersion = '12.2.0.1.ru-2023-01.rur-2023-01.r1';
            expect(() => validateOracleVersion(mockDbInstance)).toThrow(
                'Oracle version 12 does not support MultiTenant. Oracle 19c or higher is required.'
            );
        });

        it('should throw error for Oracle 11g', () => {
            mockDbInstance.EngineVersion = '11.2.0.4.v1';
            expect(() => validateOracleVersion(mockDbInstance)).toThrow(
                'Oracle version 11 does not support MultiTenant. Oracle 19c or higher is required.'
            );
        });

        it('should throw error when engine version is undefined', () => {
            mockDbInstance.EngineVersion = undefined;
            expect(() => validateOracleVersion(mockDbInstance)).toThrow(
                'Database engine version is not available'
            );
        });

        it('should throw error when engine version is null', () => {
            mockDbInstance.EngineVersion = null as any;
            expect(() => validateOracleVersion(mockDbInstance)).toThrow(
                'Database engine version is not available'
            );
        });

        it('should throw error when engine version is empty string', () => {
            mockDbInstance.EngineVersion = '';
            expect(() => validateOracleVersion(mockDbInstance)).toThrow(
                'Database engine version is not available'
            );
        });

        it('should throw error for unparseable version format', () => {
            mockDbInstance.EngineVersion = 'invalid-version-format';
            expect(() => validateOracleVersion(mockDbInstance)).toThrow(
                "Unable to parse Oracle version from 'invalid-version-format'"
            );
        });

        it('should throw error for version without major number', () => {
            mockDbInstance.EngineVersion = 'version.1.2.3';
            expect(() => validateOracleVersion(mockDbInstance)).toThrow(
                "Unable to parse Oracle version from 'version.1.2.3'"
            );
        });

        it('should throw error for version starting with non-numeric', () => {
            mockDbInstance.EngineVersion = 'v19.0.0.0';
            expect(() => validateOracleVersion(mockDbInstance)).toThrow(
                "Unable to parse Oracle version from 'v19.0.0.0'"
            );
        });

        it('should handle edge case version numbers correctly', () => {
            mockDbInstance.EngineVersion = '19';
            expect(() => validateOracleVersion(mockDbInstance)).toThrow(
                "Unable to parse Oracle version from '19'"
            );
        });

        it('should handle version with leading zeros', () => {
            mockDbInstance.EngineVersion = '019.0.0.0';
            expect(() => validateOracleVersion(mockDbInstance)).not.toThrow();
        });
    });

    describe('validateOracleEdition', () => {
        it('should pass validation for Enterprise Edition (BYOL)', () => {
            mockDbInstance.LicenseModel = 'bring-your-own-license';
            expect(() => validateOracleEdition(mockDbInstance)).not.toThrow();
            expect(consoleSpy).not.toHaveBeenCalled();
        });

        it('should warn for Standard Edition (license-included)', () => {
            mockDbInstance.LicenseModel = 'license-included';
            expect(() => validateOracleEdition(mockDbInstance)).not.toThrow();
            expect(consoleSpy).toHaveBeenCalledWith(
                'Warning: Oracle Standard Edition has limited MultiTenant support. ' +
                    'Enterprise Edition is recommended for full MultiTenant capabilities.'
            );
        });

        it('should warn for license-included with mixed case', () => {
            mockDbInstance.LicenseModel = 'LICENSE-INCLUDED';
            expect(() => validateOracleEdition(mockDbInstance)).not.toThrow();
            expect(consoleSpy).toHaveBeenCalledWith(
                'Warning: Oracle Standard Edition has limited MultiTenant support. ' +
                    'Enterprise Edition is recommended for full MultiTenant capabilities.'
            );
        });

        it('should warn for partial license-included match', () => {
            mockDbInstance.LicenseModel = 'some-license-included-model';
            expect(() => validateOracleEdition(mockDbInstance)).not.toThrow();
            expect(consoleSpy).toHaveBeenCalledWith(
                'Warning: Oracle Standard Edition has limited MultiTenant support. ' +
                    'Enterprise Edition is recommended for full MultiTenant capabilities.'
            );
        });

        it('should pass validation when license model is undefined', () => {
            mockDbInstance.LicenseModel = undefined;
            expect(() => validateOracleEdition(mockDbInstance)).not.toThrow();
            expect(consoleSpy).not.toHaveBeenCalled();
        });

        it('should pass validation when license model is null', () => {
            mockDbInstance.LicenseModel = null as any;
            expect(() => validateOracleEdition(mockDbInstance)).not.toThrow();
            expect(consoleSpy).not.toHaveBeenCalled();
        });

        it('should pass validation when license model is empty string', () => {
            mockDbInstance.LicenseModel = '';
            expect(() => validateOracleEdition(mockDbInstance)).not.toThrow();
            expect(consoleSpy).not.toHaveBeenCalled();
        });

        it('should pass validation for custom license model', () => {
            mockDbInstance.LicenseModel = 'custom-license-model';
            expect(() => validateOracleEdition(mockDbInstance)).not.toThrow();
            expect(consoleSpy).not.toHaveBeenCalled();
        });
    });

    describe('validateDatabaseStatus', () => {
        it('should pass validation for available status', () => {
            mockDbInstance.DBInstanceStatus = 'available';
            expect(() => validateDatabaseStatus(mockDbInstance)).not.toThrow();
        });

        it('should throw error for modifying status', () => {
            mockDbInstance.DBInstanceStatus = 'modifying';
            expect(() => validateDatabaseStatus(mockDbInstance)).toThrow(
                "Database instance is in 'modifying' state. MultiTenant conversion requires the database to be in 'available' state."
            );
        });

        it('should throw error for creating status', () => {
            mockDbInstance.DBInstanceStatus = 'creating';
            expect(() => validateDatabaseStatus(mockDbInstance)).toThrow(
                "Database instance is in 'creating' state. MultiTenant conversion requires the database to be in 'available' state."
            );
        });

        it('should throw error for deleting status', () => {
            mockDbInstance.DBInstanceStatus = 'deleting';
            expect(() => validateDatabaseStatus(mockDbInstance)).toThrow(
                "Database instance is in 'deleting' state. MultiTenant conversion requires the database to be in 'available' state."
            );
        });

        it('should throw error for failed status', () => {
            mockDbInstance.DBInstanceStatus = 'failed';
            expect(() => validateDatabaseStatus(mockDbInstance)).toThrow(
                "Database instance is in 'failed' state. MultiTenant conversion requires the database to be in 'available' state."
            );
        });

        it('should throw error for stopped status', () => {
            mockDbInstance.DBInstanceStatus = 'stopped';
            expect(() => validateDatabaseStatus(mockDbInstance)).toThrow(
                "Database instance is in 'stopped' state. MultiTenant conversion requires the database to be in 'available' state."
            );
        });

        it('should throw error for stopping status', () => {
            mockDbInstance.DBInstanceStatus = 'stopping';
            expect(() => validateDatabaseStatus(mockDbInstance)).toThrow(
                "Database instance is in 'stopping' state. MultiTenant conversion requires the database to be in 'available' state."
            );
        });

        it('should throw error for starting status', () => {
            mockDbInstance.DBInstanceStatus = 'starting';
            expect(() => validateDatabaseStatus(mockDbInstance)).toThrow(
                "Database instance is in 'starting' state. MultiTenant conversion requires the database to be in 'available' state."
            );
        });

        it('should throw error for rebooting status', () => {
            mockDbInstance.DBInstanceStatus = 'rebooting';
            expect(() => validateDatabaseStatus(mockDbInstance)).toThrow(
                "Database instance is in 'rebooting' state. MultiTenant conversion requires the database to be in 'available' state."
            );
        });

        it('should throw error when status is undefined', () => {
            mockDbInstance.DBInstanceStatus = undefined;
            expect(() => validateDatabaseStatus(mockDbInstance)).toThrow(
                "Database instance is in 'undefined' state. MultiTenant conversion requires the database to be in 'available' state."
            );
        });

        it('should throw error when status is null', () => {
            mockDbInstance.DBInstanceStatus = null as any;
            expect(() => validateDatabaseStatus(mockDbInstance)).toThrow(
                "Database instance is in 'null' state. MultiTenant conversion requires the database to be in 'available' state."
            );
        });

        it('should throw error when status is empty string', () => {
            mockDbInstance.DBInstanceStatus = '';
            expect(() => validateDatabaseStatus(mockDbInstance)).toThrow(
                "Database instance is in '' state. MultiTenant conversion requires the database to be in 'available' state."
            );
        });
    });

    describe('validateOracleMultiTenantCompatibility', () => {
        it('should pass all validations for compatible Oracle database', () => {
            mockDbInstance = {
                DBInstanceIdentifier: 'test-instance',
                Engine: 'oracle-ee',
                EngineVersion: '19.0.0.0.ru-2023-01.rur-2023-01.r1',
                LicenseModel: 'bring-your-own-license',
                DBInstanceStatus: 'available'
            };

            expect(() =>
                validateOracleMultiTenantCompatibility(mockDbInstance)
            ).not.toThrow();
            expect(consoleSpy).not.toHaveBeenCalled();
        });

        it('should pass all validations and warn for Standard Edition', () => {
            mockDbInstance = {
                DBInstanceIdentifier: 'test-instance',
                Engine: 'oracle-se2',
                EngineVersion: '21.0.0.0.ru-2023-01.rur-2023-01.r1',
                LicenseModel: 'license-included',
                DBInstanceStatus: 'available'
            };

            expect(() =>
                validateOracleMultiTenantCompatibility(mockDbInstance)
            ).not.toThrow();
            expect(consoleSpy).toHaveBeenCalledWith(
                'Warning: Oracle Standard Edition has limited MultiTenant support. ' +
                    'Enterprise Edition is recommended for full MultiTenant capabilities.'
            );
        });

        it('should fail validation for non-Oracle engine', () => {
            mockDbInstance.Engine = 'mysql';
            expect(() =>
                validateOracleMultiTenantCompatibility(mockDbInstance)
            ).toThrow(
                "Database engine 'mysql' is not Oracle. Oracle MultiTenant is only supported on Oracle databases."
            );
        });

        it('should fail validation for unsupported Oracle version', () => {
            mockDbInstance.EngineVersion = '18.0.0.0.ru-2023-01.rur-2023-01.r1';
            expect(() =>
                validateOracleMultiTenantCompatibility(mockDbInstance)
            ).toThrow(
                'Oracle version 18 does not support MultiTenant. Oracle 19c or higher is required.'
            );
        });

        it('should fail validation for non-available database status', () => {
            mockDbInstance.DBInstanceStatus = 'modifying';
            expect(() =>
                validateOracleMultiTenantCompatibility(mockDbInstance)
            ).toThrow(
                "Database instance is in 'modifying' state. MultiTenant conversion requires the database to be in 'available' state."
            );
        });

        it('should fail on first validation error and not proceed to subsequent validations', () => {
            mockDbInstance = {
                DBInstanceIdentifier: 'test-instance',
                Engine: 'mysql', // This will fail first
                EngineVersion: '18.0.0.0', // This would also fail but won't be reached
                LicenseModel: 'license-included',
                DBInstanceStatus: 'modifying' // This would also fail but won't be reached
            };

            expect(() =>
                validateOracleMultiTenantCompatibility(mockDbInstance)
            ).toThrow(
                "Database engine 'mysql' is not Oracle. Oracle MultiTenant is only supported on Oracle databases."
            );
            // Console should not be called since we fail before reaching edition validation
            expect(consoleSpy).not.toHaveBeenCalled();
        });

        it('should fail on version validation after passing engine validation', () => {
            mockDbInstance = {
                DBInstanceIdentifier: 'test-instance',
                Engine: 'oracle-ee', // This will pass
                EngineVersion: '12.2.0.1', // This will fail
                LicenseModel: 'license-included',
                DBInstanceStatus: 'modifying' // This would also fail but won't be reached
            };

            expect(() =>
                validateOracleMultiTenantCompatibility(mockDbInstance)
            ).toThrow(
                'Oracle version 12 does not support MultiTenant. Oracle 19c or higher is required.'
            );
        });

        it('should fail on status validation after passing engine and version validations', () => {
            mockDbInstance = {
                DBInstanceIdentifier: 'test-instance',
                Engine: 'oracle-ee', // This will pass
                EngineVersion: '19.0.0.0', // This will pass
                LicenseModel: 'license-included', // This will warn but pass
                DBInstanceStatus: 'creating' // This will fail
            };

            expect(() =>
                validateOracleMultiTenantCompatibility(mockDbInstance)
            ).toThrow(
                "Database instance is in 'creating' state. MultiTenant conversion requires the database to be in 'available' state."
            );
            // Console should be called for edition warning before status validation fails
            expect(consoleSpy).toHaveBeenCalledWith(
                'Warning: Oracle Standard Edition has limited MultiTenant support. ' +
                    'Enterprise Edition is recommended for full MultiTenant capabilities.'
            );
        });

        it('should handle complex validation scenario with all checks', () => {
            mockDbInstance = {
                DBInstanceIdentifier: 'complex-test-instance',
                Engine: 'oracle-se2',
                EngineVersion: '23.0.0.0.ru-2024-01.rur-2024-01.r1',
                LicenseModel: 'license-included',
                DBInstanceStatus: 'available'
            };

            expect(() =>
                validateOracleMultiTenantCompatibility(mockDbInstance)
            ).not.toThrow();
            expect(consoleSpy).toHaveBeenCalledWith(
                'Warning: Oracle Standard Edition has limited MultiTenant support. ' +
                    'Enterprise Edition is recommended for full MultiTenant capabilities.'
            );
        });
    });
});
