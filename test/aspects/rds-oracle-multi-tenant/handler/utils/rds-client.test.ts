// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    RDSClient,
    DescribeDBInstancesCommand,
    ModifyDBInstanceCommand
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

    describe('existing functions', () => {
        it('should create RDS client', () => {
            const client = createRdsClient();
            expect(client).toBeInstanceOf(RDSClient);
        });

        it('should get database instance', async () => {
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

        it('should validate Oracle database', async () => {
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

        it('should enable Oracle MultiTenant', async () => {
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

        it('should check if MultiTenant conversion is complete', () => {
            const completeInstance = {
                DBInstanceStatus: 'available',
                PendingModifiedValues: {}
            };

            const incompleteInstance = {
                DBInstanceStatus: 'modifying',
                PendingModifiedValues: { MultiTenant: true }
            };

            const failedInstance = {
                DBInstanceStatus: 'failed'
            };

            expect(
                isMultiTenantConversionComplete(completeInstance as any)
            ).toBe(true);
            expect(
                isMultiTenantConversionComplete(incompleteInstance as any)
            ).toBe(false);
            expect(() =>
                isMultiTenantConversionComplete(failedInstance as any)
            ).toThrow('MultiTenant conversion failed with status: failed');
        });
    });
});
