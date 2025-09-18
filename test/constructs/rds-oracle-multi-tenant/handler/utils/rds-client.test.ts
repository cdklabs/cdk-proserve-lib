// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    RDSClient,
    DescribeDBInstancesCommand,
    ModifyDBInstanceCommand,
    DBInstance,
    RDSServiceException
} from '@aws-sdk/client-rds';
import { mockClient } from 'aws-sdk-client-mock';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    getDatabaseInstance,
    validateOracleDatabase,
    enableOracleMultiTenant,
    isMultiTenantConversionComplete,
    createRdsClient
} from '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client';

const rdsClientMock = mockClient(RDSClient);

describe('RDS Client Utilities', () => {
    beforeEach(() => {
        rdsClientMock.reset();
    });

    describe('getDatabaseInstance', () => {
        it('should return database instance when found', async () => {
            const mockDbInstance: DBInstance = {
                DBInstanceIdentifier: 'test-db',
                Engine: 'oracle-ee',
                DBInstanceStatus: 'available'
            };

            rdsClientMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [mockDbInstance]
            });

            const rdsClient = new RDSClient({});
            const result = await getDatabaseInstance(rdsClient, 'test-db');

            expect(result).toEqual(mockDbInstance);
        });

        it('should throw error when database not found', async () => {
            rdsClientMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: []
            });

            const rdsClient = new RDSClient({});

            await expect(
                getDatabaseInstance(rdsClient, 'non-existent-db')
            ).rejects.toThrow("Database instance 'non-existent-db' not found");
        });

        it('should handle RDS service exceptions', async () => {
            const rdsError = new RDSServiceException({
                name: 'DBInstanceNotFoundFault',
                message: 'DB instance not found',
                $fault: 'client',
                $metadata: {}
            });

            rdsClientMock.on(DescribeDBInstancesCommand).rejects(rdsError);

            const rdsClient = new RDSClient({});

            await expect(
                getDatabaseInstance(rdsClient, 'test-db')
            ).rejects.toThrow(
                'RDS API error: DBInstanceNotFoundFault - DB instance not found'
            );
        });

        it('should handle generic errors', async () => {
            rdsClientMock
                .on(DescribeDBInstancesCommand)
                .rejects(new Error('Network error'));

            const rdsClient = new RDSClient({});

            await expect(
                getDatabaseInstance(rdsClient, 'test-db')
            ).rejects.toThrow('Failed to get database instance: Network error');
        });
    });

    describe('validateOracleDatabase', () => {
        it('should return database instance when validation passes', async () => {
            const mockDbInstance: DBInstance = {
                DBInstanceIdentifier: 'test-db',
                Engine: 'oracle-ee',
                EngineVersion: '19.0.0.0.ru-2023-01.rur-2023-01.r1',
                LicenseModel: 'bring-your-own-license',
                DBInstanceStatus: 'available'
            };

            rdsClientMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [mockDbInstance]
            });

            const rdsClient = new RDSClient({});
            const result = await validateOracleDatabase(rdsClient, 'test-db');

            expect(result).toEqual(mockDbInstance);
        });

        it('should throw validation error for invalid Oracle database', async () => {
            const mockDbInstance: DBInstance = {
                DBInstanceIdentifier: 'test-db',
                Engine: 'mysql', // Invalid engine
                EngineVersion: '8.0.35',
                DBInstanceStatus: 'available'
            };

            rdsClientMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [mockDbInstance]
            });

            const rdsClient = new RDSClient({});

            await expect(
                validateOracleDatabase(rdsClient, 'test-db')
            ).rejects.toThrow(
                "Database validation failed: Database engine 'mysql' is not Oracle"
            );
        });

        it('should throw error when database not found', async () => {
            rdsClientMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: []
            });

            const rdsClient = new RDSClient({});

            await expect(
                validateOracleDatabase(rdsClient, 'non-existent-db')
            ).rejects.toThrow(
                "Database validation failed: Failed to get database instance: Database instance 'non-existent-db' not found"
            );
        });
    });

    describe('enableOracleMultiTenant', () => {
        it('should successfully enable MultiTenant', async () => {
            const mockDbInstance: DBInstance = {
                DBInstanceIdentifier: 'test-db',
                MultiTenant: true
            };

            rdsClientMock.on(ModifyDBInstanceCommand).resolves({
                DBInstance: mockDbInstance
            });

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});
            const rdsClient = new RDSClient({});

            await expect(
                enableOracleMultiTenant(rdsClient, 'test-db')
            ).resolves.toBeUndefined();

            expect(consoleSpy).toHaveBeenCalledWith(
                'Enabling Oracle MultiTenant on database instance: test-db'
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                'Successfully initiated MultiTenant conversion for test-db'
            );

            consoleSpy.mockRestore();
        });

        it('should throw error when ModifyDBInstance response is missing DBInstance', async () => {
            rdsClientMock.on(ModifyDBInstanceCommand).resolves({});

            const rdsClient = new RDSClient({});

            await expect(
                enableOracleMultiTenant(rdsClient, 'test-db')
            ).rejects.toThrow(
                'ModifyDBInstance response did not include DBInstance details'
            );
        });

        it('should handle RDS service exceptions', async () => {
            const rdsError = new RDSServiceException({
                name: 'InvalidDBInstanceStateFault',
                message: 'DB instance is not in available state',
                $fault: 'client',
                $metadata: {}
            });

            rdsClientMock.on(ModifyDBInstanceCommand).rejects(rdsError);

            const rdsClient = new RDSClient({});

            await expect(
                enableOracleMultiTenant(rdsClient, 'test-db')
            ).rejects.toThrow(
                'RDS API error: InvalidDBInstanceStateFault - DB instance is not in available state'
            );
        });

        it('should handle generic errors', async () => {
            rdsClientMock
                .on(ModifyDBInstanceCommand)
                .rejects(new Error('Network error'));

            const rdsClient = new RDSClient({});

            await expect(
                enableOracleMultiTenant(rdsClient, 'test-db')
            ).rejects.toThrow(
                'Failed to enable Oracle MultiTenant: Network error'
            );
        });
    });

    describe('isMultiTenantConversionComplete', () => {
        it('should return true when conversion is complete', () => {
            const dbInstance: DBInstance = {
                DBInstanceStatus: 'available',
                PendingModifiedValues: {}
            };

            const result = isMultiTenantConversionComplete(dbInstance);
            expect(result).toBe(true);
        });

        it('should return true when conversion is complete with no pending modifications', () => {
            const dbInstance: DBInstance = {
                DBInstanceStatus: 'available'
                // PendingModifiedValues is undefined
            };

            const result = isMultiTenantConversionComplete(dbInstance);
            expect(result).toBe(true);
        });

        it('should return false when database is still modifying', () => {
            const dbInstance: DBInstance = {
                DBInstanceStatus: 'modifying',
                PendingModifiedValues: {
                    MultiTenant: true
                }
            };

            const result = isMultiTenantConversionComplete(dbInstance);
            expect(result).toBe(false);
        });

        it('should return false when database is available but has pending modifications', () => {
            const dbInstance: DBInstance = {
                DBInstanceStatus: 'available',
                PendingModifiedValues: {
                    MultiTenant: true
                }
            };

            const result = isMultiTenantConversionComplete(dbInstance);
            expect(result).toBe(false);
        });

        it('should throw error for failed status', () => {
            const dbInstance: DBInstance = {
                DBInstanceStatus: 'failed'
            };

            expect(() => isMultiTenantConversionComplete(dbInstance)).toThrow(
                'MultiTenant conversion failed with status: failed'
            );
        });

        it('should throw error for incompatible-parameters status', () => {
            const dbInstance: DBInstance = {
                DBInstanceStatus: 'incompatible-parameters'
            };

            expect(() => isMultiTenantConversionComplete(dbInstance)).toThrow(
                'MultiTenant conversion failed with status: incompatible-parameters'
            );
        });
    });

    describe('createRdsClient', () => {
        it('should create RDS client instance', () => {
            const client = createRdsClient();
            expect(client).toBeInstanceOf(RDSClient);
        });
    });
});
