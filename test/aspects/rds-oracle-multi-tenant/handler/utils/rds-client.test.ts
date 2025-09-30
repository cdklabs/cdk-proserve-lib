// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    RDSClient,
    DescribeDBInstancesCommand,
    ModifyDBInstanceCommand,
    RDSServiceException
} from '@aws-sdk/client-rds';
import { mockClient } from 'aws-sdk-client-mock';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import {
    createRdsClient,
    getDatabaseInstance,
    validateOracleDatabase,
    enableOracleMultiTenant,
    isMultiTenantConversionComplete,
    waitForDatabaseReady
} from '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client';

describe('RDS Client Utilities', () => {
    const rdsMock = mockClient(RDSClient);
    const consoleLogSpy = vi.spyOn(console, 'log');
    const consoleWarnSpy = vi.spyOn(console, 'warn');

    beforeEach(() => {
        rdsMock.reset();
        consoleLogSpy.mockClear();
        consoleWarnSpy.mockClear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('waitForDatabaseReady', () => {
        it('should return immediately if database is already available', async () => {
            const dbInstanceId = 'test-available-instance';

            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [
                    {
                        DBInstanceIdentifier: dbInstanceId,
                        DBInstanceStatus: 'available',
                        Engine: 'oracle-se2'
                    }
                ]
            });

            const startTime = Date.now();
            await waitForDatabaseReady(rdsMock as any, dbInstanceId);
            const endTime = Date.now();

            expect(endTime - startTime).toBeLessThan(1000); // Should be very fast
            expect(
                rdsMock.commandCalls(DescribeDBInstancesCommand)
            ).toHaveLength(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
                `Database ${dbInstanceId} is ready for modification`
            );
        });

        it('should wait and poll until database becomes available', async () => {
            const dbInstanceId = 'test-modifying-instance';

            // Mock progression: modifying -> modifying -> available
            rdsMock
                .on(DescribeDBInstancesCommand)
                .resolvesOnce({
                    DBInstances: [
                        {
                            DBInstanceIdentifier: dbInstanceId,
                            DBInstanceStatus: 'modifying',
                            Engine: 'oracle-se2'
                        }
                    ]
                })
                .resolvesOnce({
                    DBInstances: [
                        {
                            DBInstanceIdentifier: dbInstanceId,
                            DBInstanceStatus: 'modifying',
                            Engine: 'oracle-se2'
                        }
                    ]
                })
                .resolves({
                    DBInstances: [
                        {
                            DBInstanceIdentifier: dbInstanceId,
                            DBInstanceStatus: 'available',
                            Engine: 'oracle-se2'
                        }
                    ]
                });

            // Use short intervals for testing
            await waitForDatabaseReady(rdsMock as any, dbInstanceId, 5000, 100);

            expect(
                rdsMock.commandCalls(DescribeDBInstancesCommand)
            ).toHaveLength(3);
        });

        it('should throw error if database is in failed state', async () => {
            const dbInstanceId = 'test-failed-instance';

            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [
                    {
                        DBInstanceIdentifier: dbInstanceId,
                        DBInstanceStatus: 'failed',
                        Engine: 'oracle-se2'
                    }
                ]
            });

            await expect(
                waitForDatabaseReady(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(
                `Database ${dbInstanceId} is in a failed state: failed`
            );
        });

        it('should throw error if database is in incompatible-parameters state', async () => {
            const dbInstanceId = 'test-incompatible-instance';

            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [
                    {
                        DBInstanceIdentifier: dbInstanceId,
                        DBInstanceStatus: 'incompatible-parameters',
                        Engine: 'oracle-se2'
                    }
                ]
            });

            await expect(
                waitForDatabaseReady(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(
                `Database ${dbInstanceId} is in a failed state: incompatible-parameters`
            );
        });

        it('should throw error if database is in stopped state', async () => {
            const dbInstanceId = 'test-stopped-instance';

            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [
                    {
                        DBInstanceIdentifier: dbInstanceId,
                        DBInstanceStatus: 'stopped',
                        Engine: 'oracle-se2'
                    }
                ]
            });

            await expect(
                waitForDatabaseReady(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(
                `Database ${dbInstanceId} is in a failed state: stopped`
            );
        });

        it('should timeout if database does not become ready within time limit', async () => {
            const dbInstanceId = 'test-timeout-instance';

            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [
                    {
                        DBInstanceIdentifier: dbInstanceId,
                        DBInstanceStatus: 'modifying',
                        Engine: 'oracle-se2'
                    }
                ]
            });

            // Use very short timeout for testing
            await expect(
                waitForDatabaseReady(rdsMock as any, dbInstanceId, 200, 50)
            ).rejects.toThrow(
                `Timeout waiting for database ${dbInstanceId} to be ready`
            );
        }, 10000);

        it('should handle network errors gracefully and continue polling', async () => {
            const dbInstanceId = 'test-network-error-instance';

            // Mock network error followed by success
            rdsMock
                .on(DescribeDBInstancesCommand)
                .rejectsOnce(new Error('Network timeout'))
                .rejectsOnce(new Error('Connection refused'))
                .resolves({
                    DBInstances: [
                        {
                            DBInstanceIdentifier: dbInstanceId,
                            DBInstanceStatus: 'available',
                            Engine: 'oracle-se2'
                        }
                    ]
                });

            await waitForDatabaseReady(rdsMock as any, dbInstanceId, 5000, 100);

            expect(
                rdsMock.commandCalls(DescribeDBInstancesCommand)
            ).toHaveLength(3);
        });

        it('should re-throw failed state errors even during network error handling', async () => {
            const dbInstanceId = 'test-failed-during-error-handling';

            // Mock a failed state error that should be re-thrown
            const failedStateError = new Error(
                `Database ${dbInstanceId} is in a failed state: failed`
            );
            rdsMock.on(DescribeDBInstancesCommand).rejects(failedStateError);

            await expect(
                waitForDatabaseReady(rdsMock as any, dbInstanceId, 1000, 100)
            ).rejects.toThrow(
                `Database ${dbInstanceId} is in a failed state: failed`
            );
        });

        it('should use default timeout and poll interval when not specified', async () => {
            const dbInstanceId = 'test-default-params';

            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [
                    {
                        DBInstanceIdentifier: dbInstanceId,
                        DBInstanceStatus: 'available',
                        Engine: 'oracle-se2'
                    }
                ]
            });

            // Should not throw with default parameters
            await waitForDatabaseReady(rdsMock as any, dbInstanceId);

            expect(
                rdsMock.commandCalls(DescribeDBInstancesCommand)
            ).toHaveLength(1);
        });

        it('should log status updates during polling', async () => {
            const dbInstanceId = 'test-logging-instance';

            rdsMock
                .on(DescribeDBInstancesCommand)
                .resolvesOnce({
                    DBInstances: [
                        {
                            DBInstanceIdentifier: dbInstanceId,
                            DBInstanceStatus: 'backing-up',
                            Engine: 'oracle-se2'
                        }
                    ]
                })
                .resolves({
                    DBInstances: [
                        {
                            DBInstanceIdentifier: dbInstanceId,
                            DBInstanceStatus: 'available',
                            Engine: 'oracle-se2'
                        }
                    ]
                });

            await waitForDatabaseReady(rdsMock as any, dbInstanceId, 5000, 100);

            expect(
                rdsMock.commandCalls(DescribeDBInstancesCommand)
            ).toHaveLength(2);
        });
    });

    describe('createRdsClient', () => {
        it('should create RDS client', () => {
            const client = createRdsClient();
            expect(client).toBeInstanceOf(RDSClient);
        });
    });

    describe('getDatabaseInstance', () => {
        it('should get database instance successfully', async () => {
            const dbInstanceId = 'test-instance';
            const mockInstance = {
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'available',
                Engine: 'oracle-se2'
            };

            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [mockInstance]
            });

            const result = await getDatabaseInstance(
                rdsMock as any,
                dbInstanceId
            );
            expect(result).toEqual(mockInstance);
        });

        it('should throw error when database instance not found', async () => {
            const dbInstanceId = 'non-existent-instance';

            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: []
            });

            await expect(
                getDatabaseInstance(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(`Database instance '${dbInstanceId}' not found`);
        });

        it('should throw error when DBInstances is undefined', async () => {
            const dbInstanceId = 'test-instance';

            rdsMock.on(DescribeDBInstancesCommand).resolves({});

            await expect(
                getDatabaseInstance(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(`Database instance '${dbInstanceId}' not found`);
        });

        it('should handle RDSServiceException', async () => {
            const dbInstanceId = 'test-instance';
            const rdsError = new RDSServiceException({
                name: 'DBInstanceNotFoundFault',
                message: 'DB instance not found',
                $fault: 'client',
                $metadata: {}
            });

            rdsMock.on(DescribeDBInstancesCommand).rejects(rdsError);

            await expect(
                getDatabaseInstance(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(
                'RDS API error: DBInstanceNotFoundFault - DB instance not found'
            );
        });

        it('should handle generic Error', async () => {
            const dbInstanceId = 'test-instance';
            const genericError = new Error('Network timeout');

            rdsMock.on(DescribeDBInstancesCommand).rejects(genericError);

            await expect(
                getDatabaseInstance(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(
                'Failed to get database instance: Network timeout'
            );
        });

        it('should handle string errors as Error objects', async () => {
            const dbInstanceId = 'test-instance';
            const stringError = 'string error';

            rdsMock.on(DescribeDBInstancesCommand).rejects(stringError);

            await expect(
                getDatabaseInstance(rdsMock as any, dbInstanceId)
            ).rejects.toThrow('Failed to get database instance: string error');
        });

        it('should handle object errors as Error objects', async () => {
            const dbInstanceId = 'test-instance';
            const objectError = {
                code: 'CUSTOM_ERROR',
                details: 'Custom error object'
            } as any;

            rdsMock.on(DescribeDBInstancesCommand).rejects(objectError);

            await expect(
                getDatabaseInstance(rdsMock as any, dbInstanceId)
            ).rejects.toThrow('Failed to get database instance:');
        });

        it('should handle primitive errors as Error objects', async () => {
            const dbInstanceId = 'test-instance';
            const primitiveError = 42 as any; // Number primitive

            rdsMock.on(DescribeDBInstancesCommand).rejects(primitiveError);

            await expect(
                getDatabaseInstance(rdsMock as any, dbInstanceId)
            ).rejects.toThrow('Failed to get database instance:');
        });
    });

    describe('validateOracleDatabase', () => {
        it('should validate Oracle database successfully', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const mockInstance = {
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'available',
                Engine: 'oracle-se2',
                EngineVersion: '19.0.0.0.ru-2020-04.rur-2020-04.r1'
            };

            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [mockInstance]
            });

            const result = await validateOracleDatabase(
                rdsMock as any,
                dbInstanceId
            );
            expect(result).toEqual(mockInstance);
        });

        it('should handle validation errors', async () => {
            const dbInstanceId = 'test-instance';
            const mockInstance = {
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'available',
                Engine: 'mysql' // Non-Oracle engine to trigger validation error
            };

            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [mockInstance]
            });

            await expect(
                validateOracleDatabase(rdsMock as any, dbInstanceId)
            ).rejects.toThrow('Database validation failed:');
        });

        it('should handle string errors in validation', async () => {
            const dbInstanceId = 'test-instance';

            // Mock getDatabaseInstance to throw a string error
            rdsMock.on(DescribeDBInstancesCommand).rejects('string error');

            await expect(
                validateOracleDatabase(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(
                'Database validation failed: Failed to get database instance: string error'
            );
        });

        it('should handle object errors in validation', async () => {
            const dbInstanceId = 'test-instance';
            const objectError = {
                code: 'VALIDATION_ERROR',
                details: 'Custom validation error'
            } as any;

            // Mock getDatabaseInstance to throw an object error
            rdsMock.on(DescribeDBInstancesCommand).rejects(objectError);

            await expect(
                validateOracleDatabase(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(
                'Database validation failed: Failed to get database instance:'
            );
        });

        it('should handle primitive errors in validation', async () => {
            const dbInstanceId = 'test-instance';
            const primitiveError = 123 as any; // Number primitive

            // Mock getDatabaseInstance to throw a primitive error
            rdsMock.on(DescribeDBInstancesCommand).rejects(primitiveError);

            await expect(
                validateOracleDatabase(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(
                'Database validation failed: Failed to get database instance:'
            );
        });
    });

    describe('enableOracleMultiTenant', () => {
        it('should enable Oracle MultiTenant successfully', async () => {
            const dbInstanceId = 'test-oracle-instance';

            rdsMock.on(ModifyDBInstanceCommand).resolves({
                DBInstance: {
                    DBInstanceIdentifier: dbInstanceId,
                    DBInstanceStatus: 'modifying'
                }
            });

            await enableOracleMultiTenant(rdsMock as any, dbInstanceId);

            expect(rdsMock.commandCalls(ModifyDBInstanceCommand)).toHaveLength(
                1
            );
            const modifyCall = rdsMock.commandCalls(ModifyDBInstanceCommand)[0];
            expect(modifyCall.args[0].input).toEqual({
                DBInstanceIdentifier: dbInstanceId,
                MultiTenant: true,
                ApplyImmediately: true
            });
        });

        it('should throw error when ModifyDBInstance response has no DBInstance', async () => {
            const dbInstanceId = 'test-oracle-instance';

            rdsMock.on(ModifyDBInstanceCommand).resolves({});

            await expect(
                enableOracleMultiTenant(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(
                'ModifyDBInstance response did not include DBInstance details'
            );
        });

        it('should handle RDSServiceException in enableOracleMultiTenant', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const rdsError = new RDSServiceException({
                name: 'InvalidDBInstanceStateFault',
                message: 'DB instance is not in a valid state',
                $fault: 'client',
                $metadata: {}
            });

            rdsMock.on(ModifyDBInstanceCommand).rejects(rdsError);

            await expect(
                enableOracleMultiTenant(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(
                'RDS API error: InvalidDBInstanceStateFault - DB instance is not in a valid state'
            );
        });

        it('should handle generic Error in enableOracleMultiTenant', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const genericError = new Error('Network timeout');

            rdsMock.on(ModifyDBInstanceCommand).rejects(genericError);

            await expect(
                enableOracleMultiTenant(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(
                'Failed to enable Oracle MultiTenant: Network timeout'
            );
        });

        it('should handle string errors in enableOracleMultiTenant', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const stringError = 'string error';

            rdsMock.on(ModifyDBInstanceCommand).rejects(stringError);

            await expect(
                enableOracleMultiTenant(rdsMock as any, dbInstanceId)
            ).rejects.toThrow(
                'Failed to enable Oracle MultiTenant: string error'
            );
        });

        it('should handle object errors in enableOracleMultiTenant', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const objectError = {
                code: 'MODIFY_ERROR',
                details: 'Custom modify error'
            } as any;

            rdsMock.on(ModifyDBInstanceCommand).rejects(objectError);

            await expect(
                enableOracleMultiTenant(rdsMock as any, dbInstanceId)
            ).rejects.toThrow('Failed to enable Oracle MultiTenant:');
        });

        it('should handle primitive errors in enableOracleMultiTenant', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const primitiveError = 456 as any; // Number primitive

            rdsMock.on(ModifyDBInstanceCommand).rejects(primitiveError);

            await expect(
                enableOracleMultiTenant(rdsMock as any, dbInstanceId)
            ).rejects.toThrow('Failed to enable Oracle MultiTenant:');
        });
    });

    describe('isMultiTenantConversionComplete', () => {
        it('should return true when conversion is complete', () => {
            const completeInstance = {
                DBInstanceStatus: 'available',
                PendingModifiedValues: {}
            };

            expect(
                isMultiTenantConversionComplete(completeInstance as any)
            ).toBe(true);
        });

        it('should return true when conversion is complete with no PendingModifiedValues', () => {
            const completeInstance = {
                DBInstanceStatus: 'available'
                // No PendingModifiedValues property
            };

            expect(
                isMultiTenantConversionComplete(completeInstance as any)
            ).toBe(true);
        });

        it('should return false when conversion is in progress', () => {
            const incompleteInstance = {
                DBInstanceStatus: 'modifying',
                PendingModifiedValues: { MultiTenant: true }
            };

            expect(
                isMultiTenantConversionComplete(incompleteInstance as any)
            ).toBe(false);
        });

        it('should throw error for failed status', () => {
            const failedInstance = {
                DBInstanceStatus: 'failed'
            };

            expect(() =>
                isMultiTenantConversionComplete(failedInstance as any)
            ).toThrow('MultiTenant conversion failed with status: failed');
        });

        it('should throw error for incompatible-parameters status', () => {
            const incompatibleInstance = {
                DBInstanceStatus: 'incompatible-parameters'
            };

            expect(() =>
                isMultiTenantConversionComplete(incompatibleInstance as any)
            ).toThrow(
                'MultiTenant conversion failed with status: incompatible-parameters'
            );
        });
    });
});
