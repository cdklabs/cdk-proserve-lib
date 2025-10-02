// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { RDS } from '@aws-sdk/client-rds';
import { mockClient } from 'aws-sdk-client-mock';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import { ConversionStatus } from '../../../../../src/aspects/rds-oracle-multi-tenant/handler/types/conversion-status';
import { mockContext } from '../../../../fixtures';
import {
    buildRdsMultiTenantIsCompleteEvent,
    mockDbInstanceId,
    mockOracleInstanceAvailable,
    mockOracleInstanceModifying,
    mockOracleInstanceFailed,
    buildMockOracleInstance
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
            createRdsClient: vi.fn(() => new RDS({})),
            getDatabaseInstance: vi.fn()
        };
    }
);

describe('IsComplete Handler', () => {
    const rdsMock = mockClient(RDS);
    let consoleSpy: any;
    let consoleErrorSpy: any;
    let consoleWarnSpy: any;

    beforeEach(async () => {
        rdsMock.reset();
        vi.clearAllMocks();

        // Set up console spies fresh for each test
        consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {});
        consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('CREATE operations', () => {
        it('should return IsComplete: true when conversion is completed', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue(
                mockOracleInstanceAvailable
            );

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(true);
            if ('Data' in result && result.Data) {
                expect(result.Data).toEqual({
                    DBInstanceIdentifier: mockDbInstanceId,
                    MultiTenantStatus: ConversionStatus.COMPLETED,
                    ModificationStatus: 'available',
                    PendingModifications: '{}'
                });
            }
            expect(consoleSpy).toHaveBeenCalledWith(
                `Checking CREATE completion for database: ${mockDbInstanceId}`
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                `MultiTenant conversion completed for database: ${mockDbInstanceId}`
            );
        });

        it('should return IsComplete: false when conversion is in progress', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue(
                mockOracleInstanceModifying
            );

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(false);
            expect('Data' in result).toBe(false);
            expect(consoleSpy).toHaveBeenCalledWith(
                `MultiTenant conversion still in progress for database: ${mockDbInstanceId}`
            );
        });

        it('should throw error when conversion has failed', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue(
                mockOracleInstanceFailed
            );

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'MultiTenant conversion failed with database status: failed'
            );
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                `MultiTenant conversion failed for database: ${mockDbInstanceId}`
            );
        });

        it('should handle incompatible-parameters status as failed', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue(
                buildMockOracleInstance({
                    DBInstanceStatus: 'incompatible-parameters'
                })
            );

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'MultiTenant conversion failed with database status: incompatible-parameters'
            );
        });

        it('should handle database with null pending modifications', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue(
                buildMockOracleInstance({
                    PendingModifiedValues: null as any
                })
            );

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(true);
            if ('Data' in result && result.Data) {
                expect(result.Data.PendingModifications).toBeUndefined();
            }
        });

        it('should handle database with undefined status', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue(
                buildMockOracleInstance({
                    DBInstanceStatus: undefined
                })
            );

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(false);
            expect('Data' in result).toBe(false);
        });

        it('should handle RDS client errors gracefully', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            const testError = new Error('RDS API Error');
            vi.mocked(getDatabaseInstance).mockRejectedValue(testError);

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'RDS API Error'
            );
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                `Error checking CREATE completion for ${mockDbInstanceId}: RDS API Error`
            );
        });

        it('should handle non-Error exceptions', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockRejectedValue('String error');

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                `Unknown error checking CREATE completion for ${mockDbInstanceId}`
            );
        });

        it('should handle database with unknown status as in progress', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue(
                buildMockOracleInstance({
                    DBInstanceStatus: 'unknown-status'
                })
            );

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(false);
            expect('Data' in result).toBe(false);
        });
    });

    describe('UPDATE operations', () => {
        it('should return IsComplete: true immediately for UPDATE operations', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Update');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue(
                mockOracleInstanceAvailable
            );

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(true);
            if ('Data' in result && result.Data) {
                expect(result.Data).toEqual({
                    DBInstanceIdentifier: mockDbInstanceId,
                    MultiTenantStatus: ConversionStatus.COMPLETED,
                    ModificationStatus: 'available',
                    PendingModifications: '{}'
                });
            }
            expect(consoleSpy).toHaveBeenCalledWith(
                `UPDATE operation is no-op for database: ${mockDbInstanceId}, completing immediately`
            );
        });

        it('should handle UPDATE operation when database state cannot be retrieved', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Update');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockRejectedValue(
                new Error('Database not found')
            );

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(true);
            expect('Data' in result).toBe(false);
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                `Could not get current state for UPDATE no-op on ${mockDbInstanceId}: Error: Database not found`
            );
        });
    });

    describe('DELETE operations', () => {
        it('should return IsComplete: true immediately for DELETE operations', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Delete');

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(true);
            expect('Data' in result).toBe(false);
            expect(consoleSpy).toHaveBeenCalledWith(
                `DELETE operation is no-op for database: ${mockDbInstanceId}, completing immediately`
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                'MultiTenant conversion cannot be reversed, database retains configuration'
            );
        });
    });

    describe('Error handling', () => {
        it('should throw error when DBInstanceIdentifier is missing', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');
            // Remove the DBInstanceIdentifier to test validation
            delete (event.ResourceProperties as any).DBInstanceIdentifier;

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'DBInstanceIdentifier is required in ResourceProperties'
            );
        });

        it('should throw error for unsupported request type', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');
            // Change request type to invalid
            (event as any).RequestType = 'InvalidType';

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'Unsupported request type: InvalidType'
            );
        });
    });

    describe('getConversionState function', () => {
        it('should log database status and pending modifications', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue(
                mockOracleInstanceModifying
            );

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            await handler(event, mockContext);

            expect(consoleSpy).toHaveBeenCalledWith(
                `Database ${mockDbInstanceId} status: modifying, pending modifications: ${JSON.stringify(mockOracleInstanceModifying.PendingModifiedValues)}`
            );
        });

        it('should handle empty pending modifications object', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue(
                mockOracleInstanceAvailable
            );

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(true);
            if ('Data' in result && result.Data) {
                expect(result.Data.MultiTenantStatus).toBe(
                    ConversionStatus.COMPLETED
                );
            }
        });
    });

    describe('formatResponseData function', () => {
        it('should format response data correctly with pending modifications', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            const pendingModifications = {
                MultiTenant: true,
                DBInstanceClass: 'db.t3.medium'
            };
            vi.mocked(getDatabaseInstance).mockResolvedValue(
                buildMockOracleInstance({
                    DBInstanceStatus: 'available',
                    PendingModifiedValues: pendingModifications
                })
            );

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            // When there are pending modifications, it should be IN_PROGRESS, not COMPLETED
            expect(result.IsComplete).toBe(false);
            expect('Data' in result).toBe(false);
        });

        it('should handle undefined pending modifications', async () => {
            const event = buildRdsMultiTenantIsCompleteEvent('Create');

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue(
                buildMockOracleInstance({
                    PendingModifiedValues: undefined
                })
            );

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            if ('Data' in result && result.Data) {
                expect(result.Data.PendingModifications).toBeUndefined();
            }
        });
    });
});
