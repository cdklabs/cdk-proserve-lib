// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DBInstance } from '@aws-sdk/client-rds';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { validateOracleMultiTenantCompatibility } from '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/validation';

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
