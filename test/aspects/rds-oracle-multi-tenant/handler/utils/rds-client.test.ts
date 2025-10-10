// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { RDS, RDSServiceException } from '@aws-sdk/client-rds';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import {
    createRdsClient,
    getDatabaseInstance,
    validateOracleDatabase,
    enableOracleMultiTenant,
    waitForDatabaseReady
} from '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client';
import { mockDbInstanceId, mockOracleInstanceAvailable } from '../../fixtures';

describe('RDS Client Utilities', () => {
    let mockRdsClient: RDS;
    let consoleLogSpy: ReturnType<typeof vi.spyOn>;
    let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    describe('createRdsClient', () => {
        it('should create RDS client', () => {
            const client = createRdsClient();
            expect(client).toBeInstanceOf(RDS);
        });
    });

    describe('getDatabaseInstance', () => {
        it('should get database instance successfully', async () => {
            mockRdsClient = {
                describeDBInstances: vi.fn().mockResolvedValue({
                    DBInstances: [mockOracleInstanceAvailable]
                })
            } as any;

            const result = await getDatabaseInstance(
                mockRdsClient,
                mockDbInstanceId
            );
            expect(result).toEqual(mockOracleInstanceAvailable);
            expect(mockRdsClient.describeDBInstances).toHaveBeenCalledWith({
                DBInstanceIdentifier: mockDbInstanceId
            });
        });

        it('should throw error when database instance not found', async () => {
            const dbInstanceId = 'non-existent-instance';

            mockRdsClient = {
                describeDBInstances: vi.fn().mockResolvedValue({
                    DBInstances: []
                })
            } as any;

            await expect(
                getDatabaseInstance(mockRdsClient, dbInstanceId)
            ).rejects.toThrow(`Database instance '${dbInstanceId}' not found`);
        });

        it('should throw error when DBInstances is undefined', async () => {
            const dbInstanceId = 'test-instance';

            mockRdsClient = {
                describeDBInstances: vi.fn().mockResolvedValue({})
            } as any;

            await expect(
                getDatabaseInstance(mockRdsClient, dbInstanceId)
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

            mockRdsClient = {
                describeDBInstances: vi.fn().mockRejectedValue(rdsError)
            } as any;

            await expect(
                getDatabaseInstance(mockRdsClient, dbInstanceId)
            ).rejects.toThrow(
                'RDS API error: DBInstanceNotFoundFault - DB instance not found'
            );
        });

        it('should handle generic Error', async () => {
            const dbInstanceId = 'test-instance';
            const genericError = new Error('Network timeout');

            mockRdsClient = {
                describeDBInstances: vi.fn().mockRejectedValue(genericError)
            } as any;

            await expect(
                getDatabaseInstance(mockRdsClient, dbInstanceId)
            ).rejects.toThrow(
                'Failed to get database instance: Network timeout'
            );
        });

        it('should re-throw non-Error exceptions', async () => {
            const dbInstanceId = 'test-instance';
            const stringError = 'string error';

            mockRdsClient = {
                describeDBInstances: vi.fn().mockRejectedValue(stringError)
            } as any;

            await expect(
                getDatabaseInstance(mockRdsClient, dbInstanceId)
            ).rejects.toBe(stringError);
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

            mockRdsClient = {
                describeDBInstances: vi.fn().mockResolvedValue({
                    DBInstances: [mockInstance]
                })
            } as any;

            const result = await validateOracleDatabase(
                mockRdsClient,
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

            mockRdsClient = {
                describeDBInstances: vi.fn().mockResolvedValue({
                    DBInstances: [mockInstance]
                })
            } as any;

            await expect(
                validateOracleDatabase(mockRdsClient, dbInstanceId)
            ).rejects.toThrow('Database validation failed:');
        });

        it('should re-throw non-Error exceptions', async () => {
            const dbInstanceId = 'test-instance';
            const stringError = 'string error';

            mockRdsClient = {
                describeDBInstances: vi.fn().mockRejectedValue(stringError)
            } as any;

            await expect(
                validateOracleDatabase(mockRdsClient, dbInstanceId)
            ).rejects.toBe(stringError);
        });
    });

    describe('enableOracleMultiTenant', () => {
        it('should enable Oracle MultiTenant successfully', async () => {
            const dbInstanceId = 'test-oracle-instance';

            mockRdsClient = {
                modifyDBInstance: vi.fn().mockResolvedValue({
                    DBInstance: {
                        DBInstanceIdentifier: dbInstanceId,
                        DBInstanceStatus: 'modifying'
                    }
                })
            } as any;

            await enableOracleMultiTenant(mockRdsClient, dbInstanceId);

            expect(mockRdsClient.modifyDBInstance).toHaveBeenCalledWith({
                DBInstanceIdentifier: dbInstanceId,
                MultiTenant: true,
                ApplyImmediately: true
            });
        });

        it('should throw error when ModifyDBInstance response has no DBInstance', async () => {
            const dbInstanceId = 'test-oracle-instance';

            mockRdsClient = {
                modifyDBInstance: vi.fn().mockResolvedValue({})
            } as any;

            await expect(
                enableOracleMultiTenant(mockRdsClient, dbInstanceId)
            ).rejects.toThrow(
                'ModifyDBInstance response did not include DBInstance details'
            );
        });

        it('should handle RDSServiceException', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const rdsError = new RDSServiceException({
                name: 'InvalidDBInstanceStateFault',
                message: 'DB instance is not in a valid state',
                $fault: 'client',
                $metadata: {}
            });

            mockRdsClient = {
                modifyDBInstance: vi.fn().mockRejectedValue(rdsError)
            } as any;

            await expect(
                enableOracleMultiTenant(mockRdsClient, dbInstanceId)
            ).rejects.toThrow(
                'RDS API error: InvalidDBInstanceStateFault - DB instance is not in a valid state'
            );
        });

        it('should handle generic Error', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const genericError = new Error('Network timeout');

            mockRdsClient = {
                modifyDBInstance: vi.fn().mockRejectedValue(genericError)
            } as any;

            await expect(
                enableOracleMultiTenant(mockRdsClient, dbInstanceId)
            ).rejects.toThrow(
                'Failed to enable Oracle MultiTenant: Network timeout'
            );
        });

        it('should re-throw non-Error exceptions', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const stringError = 'string error';

            mockRdsClient = {
                modifyDBInstance: vi.fn().mockRejectedValue(stringError)
            } as any;

            await expect(
                enableOracleMultiTenant(mockRdsClient, dbInstanceId)
            ).rejects.toBe(stringError);
        });
    });

    describe('waitForDatabaseReady', () => {
        it('should return immediately if database is already available', async () => {
            const dbInstanceId = 'test-available-instance';

            mockRdsClient = {
                describeDBInstances: vi.fn().mockResolvedValue({
                    DBInstances: [
                        {
                            DBInstanceIdentifier: dbInstanceId,
                            DBInstanceStatus: 'available',
                            Engine: 'oracle-se2'
                        }
                    ]
                })
            } as any;

            const startTime = Date.now();
            await waitForDatabaseReady(mockRdsClient, dbInstanceId);
            const endTime = Date.now();

            expect(endTime - startTime).toBeLessThan(1000);
            expect(mockRdsClient.describeDBInstances).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith(
                `Database ${dbInstanceId} is ready for modification`
            );
        });

        it('should wait and poll until database becomes available', async () => {
            const dbInstanceId = 'test-modifying-instance';
            let callCount = 0;

            mockRdsClient = {
                describeDBInstances: vi.fn().mockImplementation(() => {
                    callCount++;
                    if (callCount <= 2) {
                        return Promise.resolve({
                            DBInstances: [
                                {
                                    DBInstanceIdentifier: dbInstanceId,
                                    DBInstanceStatus: 'modifying',
                                    Engine: 'oracle-se2'
                                }
                            ]
                        });
                    }
                    return Promise.resolve({
                        DBInstances: [
                            {
                                DBInstanceIdentifier: dbInstanceId,
                                DBInstanceStatus: 'available',
                                Engine: 'oracle-se2'
                            }
                        ]
                    });
                })
            } as any;

            await waitForDatabaseReady(mockRdsClient, dbInstanceId, 5000, 100);

            expect(mockRdsClient.describeDBInstances).toHaveBeenCalledTimes(3);
        });

        it('should throw error if database is in failed state', async () => {
            const dbInstanceId = 'test-failed-instance';

            mockRdsClient = {
                describeDBInstances: vi.fn().mockResolvedValue({
                    DBInstances: [
                        {
                            DBInstanceIdentifier: dbInstanceId,
                            DBInstanceStatus: 'failed',
                            Engine: 'oracle-se2'
                        }
                    ]
                })
            } as any;

            await expect(
                waitForDatabaseReady(mockRdsClient, dbInstanceId)
            ).rejects.toThrow(
                `Database ${dbInstanceId} is in a failed state: failed`
            );
        });

        it('should throw error if database is in incompatible-parameters state', async () => {
            const dbInstanceId = 'test-incompatible-instance';

            mockRdsClient = {
                describeDBInstances: vi.fn().mockResolvedValue({
                    DBInstances: [
                        {
                            DBInstanceIdentifier: dbInstanceId,
                            DBInstanceStatus: 'incompatible-parameters',
                            Engine: 'oracle-se2'
                        }
                    ]
                })
            } as any;

            await expect(
                waitForDatabaseReady(mockRdsClient, dbInstanceId)
            ).rejects.toThrow(
                `Database ${dbInstanceId} is in a failed state: incompatible-parameters`
            );
        });

        it('should throw error if database is in stopped state', async () => {
            const dbInstanceId = 'test-stopped-instance';

            mockRdsClient = {
                describeDBInstances: vi.fn().mockResolvedValue({
                    DBInstances: [
                        {
                            DBInstanceIdentifier: dbInstanceId,
                            DBInstanceStatus: 'stopped',
                            Engine: 'oracle-se2'
                        }
                    ]
                })
            } as any;

            await expect(
                waitForDatabaseReady(mockRdsClient, dbInstanceId)
            ).rejects.toThrow(
                `Database ${dbInstanceId} is in a failed state: stopped`
            );
        });

        it('should timeout if database does not become ready within time limit', async () => {
            const dbInstanceId = 'test-timeout-instance';

            mockRdsClient = {
                describeDBInstances: vi.fn().mockResolvedValue({
                    DBInstances: [
                        {
                            DBInstanceIdentifier: dbInstanceId,
                            DBInstanceStatus: 'modifying',
                            Engine: 'oracle-se2'
                        }
                    ]
                })
            } as any;

            await expect(
                waitForDatabaseReady(mockRdsClient, dbInstanceId, 200, 50)
            ).rejects.toThrow(
                `Timeout waiting for database ${dbInstanceId} to be ready`
            );
        });

        it('should handle network errors gracefully and continue polling', async () => {
            const dbInstanceId = 'test-network-error-instance';
            let callCount = 0;

            mockRdsClient = {
                describeDBInstances: vi.fn().mockImplementation(() => {
                    callCount++;
                    if (callCount === 1) {
                        return Promise.reject(new Error('Network timeout'));
                    }
                    if (callCount === 2) {
                        return Promise.reject(new Error('Connection refused'));
                    }
                    return Promise.resolve({
                        DBInstances: [
                            {
                                DBInstanceIdentifier: dbInstanceId,
                                DBInstanceStatus: 'available',
                                Engine: 'oracle-se2'
                            }
                        ]
                    });
                })
            } as any;

            await waitForDatabaseReady(mockRdsClient, dbInstanceId, 5000, 100);

            expect(mockRdsClient.describeDBInstances).toHaveBeenCalledTimes(3);
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining('Error checking database status')
            );
        });

        it('should re-throw failed state errors even during network error handling', async () => {
            const dbInstanceId = 'test-failed-during-error-handling';

            const failedStateError = new Error(
                `Database ${dbInstanceId} is in a failed state: failed`
            );

            mockRdsClient = {
                describeDBInstances: vi.fn().mockRejectedValue(failedStateError)
            } as any;

            await expect(
                waitForDatabaseReady(mockRdsClient, dbInstanceId, 1000, 100)
            ).rejects.toThrow(
                `Database ${dbInstanceId} is in a failed state: failed`
            );
        });

        it('should use default timeout and poll interval when not specified', async () => {
            const dbInstanceId = 'test-default-params';

            mockRdsClient = {
                describeDBInstances: vi.fn().mockResolvedValue({
                    DBInstances: [
                        {
                            DBInstanceIdentifier: dbInstanceId,
                            DBInstanceStatus: 'available',
                            Engine: 'oracle-se2'
                        }
                    ]
                })
            } as any;

            await waitForDatabaseReady(mockRdsClient, dbInstanceId);

            expect(mockRdsClient.describeDBInstances).toHaveBeenCalledTimes(1);
        });

        it('should log status updates during polling', async () => {
            const dbInstanceId = 'test-logging-instance';
            let callCount = 0;

            mockRdsClient = {
                describeDBInstances: vi.fn().mockImplementation(() => {
                    callCount++;
                    if (callCount === 1) {
                        return Promise.resolve({
                            DBInstances: [
                                {
                                    DBInstanceIdentifier: dbInstanceId,
                                    DBInstanceStatus: 'backing-up',
                                    Engine: 'oracle-se2'
                                }
                            ]
                        });
                    }
                    return Promise.resolve({
                        DBInstances: [
                            {
                                DBInstanceIdentifier: dbInstanceId,
                                DBInstanceStatus: 'available',
                                Engine: 'oracle-se2'
                            }
                        ]
                    });
                })
            } as any;

            await waitForDatabaseReady(mockRdsClient, dbInstanceId, 5000, 100);

            expect(mockRdsClient.describeDBInstances).toHaveBeenCalledTimes(2);
            expect(consoleLogSpy).toHaveBeenCalledWith(
                expect.stringContaining('current status: backing-up')
            );
        });
    });
});
