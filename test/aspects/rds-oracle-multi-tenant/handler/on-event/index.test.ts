// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { RDS } from '@aws-sdk/client-rds';
import { mockClient } from 'aws-sdk-client-mock';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import { mockContext } from '../../../../fixtures';
import {
    buildRdsMultiTenantCreateEvent,
    buildRdsMultiTenantUpdateEvent,
    buildRdsMultiTenantDeleteEvent,
    mockDbInstanceId,
    mockPhysicalResourceId
} from '../../fixtures';

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
            DBInstanceIdentifier: mockDbInstanceId,
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
            const event = buildRdsMultiTenantCreateEvent();

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

            expect(result.PhysicalResourceId).toBe(mockPhysicalResourceId);
            expect(waitForDatabaseReady).toHaveBeenCalledWith(
                expect.any(RDS),
                mockDbInstanceId
            );
            expect(validateOracleDatabase).toHaveBeenCalledWith(
                expect.any(RDS),
                mockDbInstanceId
            );
            expect(enableOracleMultiTenant).toHaveBeenCalledWith(
                expect.any(RDS),
                mockDbInstanceId
            );
        });

        it('should handle database that is already available', async () => {
            const dbInstanceId = 'test-oracle-instance-ready';
            const event = buildRdsMultiTenantCreateEvent(dbInstanceId);

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
            const event = buildRdsMultiTenantCreateEvent(dbInstanceId);

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
            const event = buildRdsMultiTenantCreateEvent(dbInstanceId);

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
            const event = buildRdsMultiTenantCreateEvent(dbInstanceId);

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
            const event = buildRdsMultiTenantCreateEvent();
            // Remove the DBInstanceIdentifier to test validation
            delete (event.ResourceProperties as any).DBInstanceIdentifier;

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
            const event = buildRdsMultiTenantUpdateEvent(dbInstanceId);

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
            expect(waitForDatabaseReady).not.toHaveBeenCalled();
            expect(validateOracleDatabase).not.toHaveBeenCalled();
            expect(enableOracleMultiTenant).not.toHaveBeenCalled();
        });
    });

    describe('DELETE operations', () => {
        it('should return existing PhysicalResourceId for DELETE', async () => {
            const dbInstanceId = 'test-oracle-instance-delete';
            const event = buildRdsMultiTenantDeleteEvent(dbInstanceId);

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
            expect(waitForDatabaseReady).not.toHaveBeenCalled();
            expect(validateOracleDatabase).not.toHaveBeenCalled();
            expect(enableOracleMultiTenant).not.toHaveBeenCalled();
        });
    });

    describe('Error handling', () => {
        it('should throw error for unsupported request type', async () => {
            const event = buildRdsMultiTenantCreateEvent();
            // Change request type to invalid
            (event as any).RequestType = 'InvalidType';

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/on-event'
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'Unsupported request type: InvalidType'
            );
        });
    });
});
