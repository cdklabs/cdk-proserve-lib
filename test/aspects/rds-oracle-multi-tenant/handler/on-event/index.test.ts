// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { RDS } from '@aws-sdk/client-rds';
import { mockClient } from 'aws-sdk-client-mock';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import { mockContext } from '../../../../fixtures';

// Mock the RDS client utilities
vi.mock(
    '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client',
    async () => {
        const actual = await vi.importActual(
            '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
        );
        return {
            ...actual,
            waitForDatabaseReady: vi.fn(),
            validateOracleDatabase: vi.fn(),
            enableOracleMultiTenant: vi.fn(),
            createRdsClient: vi.fn(() => new RDS({}))
        };
    }
);

describe('OnEvent Handler', () => {
    const rdsMock = mockClient(RDS);
    const consoleSpy = vi.spyOn(console, 'log');

    beforeEach(async () => {
        rdsMock.reset();
        consoleSpy.mockClear();
        vi.clearAllMocks();

        // Reset mocks to default behavior
        const {
            waitForDatabaseReady,
            validateOracleDatabase,
            enableOracleMultiTenant
        } = await import(
            '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
        );
        vi.mocked(waitForDatabaseReady).mockResolvedValue();
        vi.mocked(validateOracleDatabase).mockResolvedValue({
            DBInstanceIdentifier: 'test-instance',
            DBInstanceStatus: 'available',
            Engine: 'oracle-se2'
        } as any);
        vi.mocked(enableOracleMultiTenant).mockResolvedValue();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('CREATE operations', () => {
        it('should wait for database to be ready before enabling MultiTenant', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const event = {
                RequestType: 'Create' as const,
                ResourceProperties: {
                    DBInstanceIdentifier: dbInstanceId,
                    ServiceToken:
                        'arn:aws:lambda:us-east-1:123456789012:function:test'
                },
                ResponseURL: 'https://example.com',
                StackId: 'test-stack',
                RequestId: 'test-request',
                LogicalResourceId: 'test-resource',
                ServiceToken:
                    'arn:aws:lambda:us-east-1:123456789012:function:test',
                ResourceType: 'Custom::RdsOracleMultiTenant'
            };

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/on-event'
            );
            const {
                waitForDatabaseReady,
                validateOracleDatabase,
                enableOracleMultiTenant
            } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const result = await handler(event, mockContext);

            expect(result.PhysicalResourceId).toBe(
                `rds-oracle-multi-tenant-${dbInstanceId}`
            );
            expect(waitForDatabaseReady).toHaveBeenCalledWith(
                expect.any(RDS),
                dbInstanceId
            );
            expect(validateOracleDatabase).toHaveBeenCalledWith(
                expect.any(RDS),
                dbInstanceId
            );
            expect(enableOracleMultiTenant).toHaveBeenCalledWith(
                expect.any(RDS),
                dbInstanceId
            );
        });

        it('should handle database that is already available', async () => {
            const dbInstanceId = 'test-oracle-instance-ready';
            const event = {
                RequestType: 'Create' as const,
                ResourceProperties: {
                    DBInstanceIdentifier: dbInstanceId,
                    ServiceToken:
                        'arn:aws:lambda:us-east-1:123456789012:function:test'
                },
                ResponseURL: 'https://example.com',
                StackId: 'test-stack',
                RequestId: 'test-request',
                LogicalResourceId: 'test-resource',
                ServiceToken:
                    'arn:aws:lambda:us-east-1:123456789012:function:test',
                ResourceType: 'Custom::RdsOracleMultiTenant'
            };

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/on-event'
            );
            const {
                waitForDatabaseReady,
                validateOracleDatabase,
                enableOracleMultiTenant
            } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const result = await handler(event, mockContext);

            expect(result.PhysicalResourceId).toBe(
                `rds-oracle-multi-tenant-${dbInstanceId}`
            );
            expect(waitForDatabaseReady).toHaveBeenCalledWith(
                expect.any(RDS),
                dbInstanceId
            );
            expect(validateOracleDatabase).toHaveBeenCalledWith(
                expect.any(RDS),
                dbInstanceId
            );
            expect(enableOracleMultiTenant).toHaveBeenCalledWith(
                expect.any(RDS),
                dbInstanceId
            );
        });

        it('should timeout if database does not become ready within time limit', async () => {
            const dbInstanceId = 'test-oracle-instance-timeout';
            const event = {
                RequestType: 'Create' as const,
                ResourceProperties: {
                    DBInstanceIdentifier: dbInstanceId,
                    ServiceToken:
                        'arn:aws:lambda:us-east-1:123456789012:function:test'
                },
                ResponseURL: 'https://example.com',
                StackId: 'test-stack',
                RequestId: 'test-request',
                LogicalResourceId: 'test-resource',
                ServiceToken:
                    'arn:aws:lambda:us-east-1:123456789012:function:test',
                ResourceType: 'Custom::RdsOracleMultiTenant'
            };

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/on-event'
            );
            const { waitForDatabaseReady } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            // Mock waitForDatabaseReady to throw timeout error
            vi.mocked(waitForDatabaseReady).mockRejectedValue(
                new Error(
                    `Timeout waiting for database ${dbInstanceId} to be ready`
                )
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                `Timeout waiting for database ${dbInstanceId} to be ready`
            );
        });

        it('should throw error if database is in failed state', async () => {
            const dbInstanceId = 'test-oracle-instance-failed';
            const event = {
                RequestType: 'Create' as const,
                ResourceProperties: {
                    DBInstanceIdentifier: dbInstanceId,
                    ServiceToken:
                        'arn:aws:lambda:us-east-1:123456789012:function:test'
                },
                ResponseURL: 'https://example.com',
                StackId: 'test-stack',
                RequestId: 'test-request',
                LogicalResourceId: 'test-resource',
                ServiceToken:
                    'arn:aws:lambda:us-east-1:123456789012:function:test',
                ResourceType: 'Custom::RdsOracleMultiTenant'
            };

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/on-event'
            );
            const { waitForDatabaseReady } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            // Mock waitForDatabaseReady to throw failed state error
            vi.mocked(waitForDatabaseReady).mockRejectedValue(
                new Error(
                    `Database ${dbInstanceId} is in a failed state: failed`
                )
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                `Database ${dbInstanceId} is in a failed state: failed`
            );
        });

        it('should propagate wait errors from waitForDatabaseReady', async () => {
            const dbInstanceId = 'test-oracle-instance-wait-error';
            const event = {
                RequestType: 'Create' as const,
                ResourceProperties: {
                    DBInstanceIdentifier: dbInstanceId,
                    ServiceToken:
                        'arn:aws:lambda:us-east-1:123456789012:function:test'
                },
                ResponseURL: 'https://example.com',
                StackId: 'test-stack',
                RequestId: 'test-request',
                LogicalResourceId: 'test-resource',
                ServiceToken:
                    'arn:aws:lambda:us-east-1:123456789012:function:test',
                ResourceType: 'Custom::RdsOracleMultiTenant'
            };

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/on-event'
            );
            const { waitForDatabaseReady } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            // Mock waitForDatabaseReady to throw an error
            vi.mocked(waitForDatabaseReady).mockRejectedValue(
                new Error(
                    `Database ${dbInstanceId} is in a failed state: failed`
                )
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                `Database ${dbInstanceId} is in a failed state: failed`
            );
        });

        it('should throw error for missing DBInstanceIdentifier', async () => {
            const event = {
                RequestType: 'Create' as const,
                ResourceProperties: {
                    ServiceToken:
                        'arn:aws:lambda:us-east-1:123456789012:function:test'
                },
                ResponseURL: 'https://example.com',
                StackId: 'test-stack',
                RequestId: 'test-request',
                LogicalResourceId: 'test-resource',
                ServiceToken:
                    'arn:aws:lambda:us-east-1:123456789012:function:test',
                ResourceType: 'Custom::RdsOracleMultiTenant'
            } as any;

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/on-event'
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'DBInstanceIdentifier is required in ResourceProperties'
            );
        });
    });

    describe('UPDATE operations', () => {
        it('should return existing PhysicalResourceId for UPDATE', async () => {
            const dbInstanceId = 'test-oracle-instance-update';
            const physicalResourceId = `rds-oracle-multi-tenant-${dbInstanceId}`;
            const event = {
                RequestType: 'Update' as const,
                ResourceProperties: {
                    DBInstanceIdentifier: dbInstanceId,
                    ServiceToken:
                        'arn:aws:lambda:us-east-1:123456789012:function:test'
                },
                OldResourceProperties: {
                    DBInstanceIdentifier: dbInstanceId,
                    ServiceToken:
                        'arn:aws:lambda:us-east-1:123456789012:function:test'
                },
                PhysicalResourceId: physicalResourceId,
                ResponseURL: 'https://example.com',
                StackId: 'test-stack',
                RequestId: 'test-request',
                LogicalResourceId: 'test-resource',
                ServiceToken:
                    'arn:aws:lambda:us-east-1:123456789012:function:test',
                ResourceType: 'Custom::RdsOracleMultiTenant'
            };

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/on-event'
            );
            const {
                waitForDatabaseReady,
                validateOracleDatabase,
                enableOracleMultiTenant
            } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const result = await handler(event, mockContext);

            expect(result.PhysicalResourceId).toBe(physicalResourceId);
            expect(waitForDatabaseReady).not.toHaveBeenCalled();
            expect(validateOracleDatabase).not.toHaveBeenCalled();
            expect(enableOracleMultiTenant).not.toHaveBeenCalled();
        });
    });

    describe('DELETE operations', () => {
        it('should return existing PhysicalResourceId for DELETE', async () => {
            const dbInstanceId = 'test-oracle-instance-delete';
            const physicalResourceId = `rds-oracle-multi-tenant-${dbInstanceId}`;
            const event = {
                RequestType: 'Delete' as const,
                ResourceProperties: {
                    DBInstanceIdentifier: dbInstanceId,
                    ServiceToken:
                        'arn:aws:lambda:us-east-1:123456789012:function:test'
                },
                PhysicalResourceId: physicalResourceId,
                ResponseURL: 'https://example.com',
                StackId: 'test-stack',
                RequestId: 'test-request',
                LogicalResourceId: 'test-resource',
                ServiceToken:
                    'arn:aws:lambda:us-east-1:123456789012:function:test',
                ResourceType: 'Custom::RdsOracleMultiTenant'
            };

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/on-event'
            );
            const {
                waitForDatabaseReady,
                validateOracleDatabase,
                enableOracleMultiTenant
            } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const result = await handler(event, mockContext);

            expect(result.PhysicalResourceId).toBe(physicalResourceId);
            expect(waitForDatabaseReady).not.toHaveBeenCalled();
            expect(validateOracleDatabase).not.toHaveBeenCalled();
            expect(enableOracleMultiTenant).not.toHaveBeenCalled();
        });
    });

    describe('Error handling', () => {
        it('should throw error for unsupported request type', async () => {
            const event = {
                RequestType: 'InvalidType' as any,
                ResourceProperties: {
                    DBInstanceIdentifier: 'test-instance',
                    ServiceToken:
                        'arn:aws:lambda:us-east-1:123456789012:function:test'
                },
                ResponseURL: 'https://example.com',
                StackId: 'test-stack',
                RequestId: 'test-request',
                LogicalResourceId: 'test-resource',
                ServiceToken:
                    'arn:aws:lambda:us-east-1:123456789012:function:test',
                ResourceType: 'Custom::RdsOracleMultiTenant'
            };

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/on-event'
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'Unsupported request type: InvalidType'
            );
        });
    });
});
