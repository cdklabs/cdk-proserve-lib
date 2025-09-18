// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DBInstance } from '@aws-sdk/client-rds';
import { describe, it, expect, vi } from 'vitest';
import {
    validateOracleEngine,
    validateOracleVersion,
    validateOracleEdition,
    validateDatabaseStatus,
    validateOracleMultiTenantCompatibility
} from '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/validation';

describe('Oracle Validation Utilities', () => {
    describe('validateOracleEngine', () => {
        it('should pass for Oracle engine', () => {
            const dbInstance: DBInstance = {
                Engine: 'oracle-ee'
            };

            expect(() => validateOracleEngine(dbInstance)).not.toThrow();
        });

        it('should pass for Oracle engine with different casing', () => {
            const dbInstance: DBInstance = {
                Engine: 'Oracle-SE2'
            };

            expect(() => validateOracleEngine(dbInstance)).not.toThrow();
        });

        it('should throw error for non-Oracle engine', () => {
            const dbInstance: DBInstance = {
                Engine: 'mysql'
            };

            expect(() => validateOracleEngine(dbInstance)).toThrow(
                "Database engine 'mysql' is not Oracle"
            );
        });

        it('should throw error for missing engine', () => {
            const dbInstance: DBInstance = {};

            expect(() => validateOracleEngine(dbInstance)).toThrow(
                "Database engine 'undefined' is not Oracle"
            );
        });
    });

    describe('validateOracleVersion', () => {
        it('should pass for Oracle 19c', () => {
            const dbInstance: DBInstance = {
                EngineVersion: '19.0.0.0.ru-2023-01.rur-2023-01.r1'
            };

            expect(() => validateOracleVersion(dbInstance)).not.toThrow();
        });

        it('should pass for Oracle 21c', () => {
            const dbInstance: DBInstance = {
                EngineVersion: '21.0.0.0.ru-2023-04.rur-2023-04.r1'
            };

            expect(() => validateOracleVersion(dbInstance)).not.toThrow();
        });

        it('should throw error for Oracle 12c', () => {
            const dbInstance: DBInstance = {
                EngineVersion: '12.2.0.1.ru-2023-01.rur-2023-01.r1'
            };

            expect(() => validateOracleVersion(dbInstance)).toThrow(
                'Oracle version 12 does not support MultiTenant'
            );
        });

        it('should throw error for Oracle 11g', () => {
            const dbInstance: DBInstance = {
                EngineVersion: '11.2.0.4.v25'
            };

            expect(() => validateOracleVersion(dbInstance)).toThrow(
                'Oracle version 11 does not support MultiTenant'
            );
        });

        it('should throw error for missing version', () => {
            const dbInstance: DBInstance = {};

            expect(() => validateOracleVersion(dbInstance)).toThrow(
                'Database engine version is not available'
            );
        });

        it('should throw error for unparseable version', () => {
            const dbInstance: DBInstance = {
                EngineVersion: 'invalid-version-format'
            };

            expect(() => validateOracleVersion(dbInstance)).toThrow(
                "Unable to parse Oracle version from 'invalid-version-format'"
            );
        });
    });

    describe('validateOracleEdition', () => {
        it('should pass silently for Enterprise Edition', () => {
            const dbInstance: DBInstance = {
                LicenseModel: 'bring-your-own-license'
            };

            const consoleSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});

            expect(() => validateOracleEdition(dbInstance)).not.toThrow();
            expect(consoleSpy).not.toHaveBeenCalled();

            consoleSpy.mockRestore();
        });

        it('should warn for Standard Edition', () => {
            const dbInstance: DBInstance = {
                LicenseModel: 'license-included'
            };

            const consoleSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});

            expect(() => validateOracleEdition(dbInstance)).not.toThrow();
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    'Oracle Standard Edition has limited MultiTenant support'
                )
            );

            consoleSpy.mockRestore();
        });

        it('should pass silently for missing license model', () => {
            const dbInstance: DBInstance = {};

            const consoleSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});

            expect(() => validateOracleEdition(dbInstance)).not.toThrow();
            expect(consoleSpy).not.toHaveBeenCalled();

            consoleSpy.mockRestore();
        });
    });

    describe('validateDatabaseStatus', () => {
        it('should pass for available status', () => {
            const dbInstance: DBInstance = {
                DBInstanceStatus: 'available'
            };

            expect(() => validateDatabaseStatus(dbInstance)).not.toThrow();
        });

        it('should throw error for non-available status', () => {
            const dbInstance: DBInstance = {
                DBInstanceStatus: 'modifying'
            };

            expect(() => validateDatabaseStatus(dbInstance)).toThrow(
                "Database instance is in 'modifying' state"
            );
        });

        it('should throw error for missing status', () => {
            const dbInstance: DBInstance = {};

            expect(() => validateDatabaseStatus(dbInstance)).toThrow(
                "Database instance is in 'undefined' state"
            );
        });
    });

    describe('validateOracleMultiTenantCompatibility', () => {
        it('should pass for valid Oracle database', () => {
            const dbInstance: DBInstance = {
                Engine: 'oracle-ee',
                EngineVersion: '19.0.0.0.ru-2023-01.rur-2023-01.r1',
                LicenseModel: 'bring-your-own-license',
                DBInstanceStatus: 'available'
            };

            expect(() =>
                validateOracleMultiTenantCompatibility(dbInstance)
            ).not.toThrow();
        });

        it('should throw error if any validation fails', () => {
            const dbInstance: DBInstance = {
                Engine: 'mysql', // Invalid engine
                EngineVersion: '19.0.0.0.ru-2023-01.rur-2023-01.r1',
                LicenseModel: 'bring-your-own-license',
                DBInstanceStatus: 'available'
            };

            expect(() =>
                validateOracleMultiTenantCompatibility(dbInstance)
            ).toThrow("Database engine 'mysql' is not Oracle");
        });

        it('should throw error for old Oracle version', () => {
            const dbInstance: DBInstance = {
                Engine: 'oracle-ee',
                EngineVersion: '12.2.0.1.ru-2023-01.rur-2023-01.r1', // Invalid version
                LicenseModel: 'bring-your-own-license',
                DBInstanceStatus: 'available'
            };

            expect(() =>
                validateOracleMultiTenantCompatibility(dbInstance)
            ).toThrow('Oracle version 12 does not support MultiTenant');
        });

        it('should throw error for non-available status', () => {
            const dbInstance: DBInstance = {
                Engine: 'oracle-ee',
                EngineVersion: '19.0.0.0.ru-2023-01.rur-2023-01.r1',
                LicenseModel: 'bring-your-own-license',
                DBInstanceStatus: 'modifying' // Invalid status
            };

            expect(() =>
                validateOracleMultiTenantCompatibility(dbInstance)
            ).toThrow("Database instance is in 'modifying' state");
        });
    });
});
