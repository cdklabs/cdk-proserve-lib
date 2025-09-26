// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { RDSClient } from '@aws-sdk/client-rds';
import { CdkCustomResourceIsCompleteEvent } from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import { ConversionStatus } from '../../../../../src/aspects/rds-oracle-multi-tenant/handler/types/conversion-status';
import { IResourceProperties } from '../../../../../src/aspects/rds-oracle-multi-tenant/handler/types/resource-properties';
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
            createRdsClient: vi.fn(() => new RDSClient({})),
            getDatabaseInstance: vi.fn()
        };
    }
);

// Helper function to create properly typed events
function createEvent(
    requestType: 'Create' | 'Update' | 'Delete',
    dbInstanceId: string,
    additionalProps: any = {}
): CdkCustomResourceIsCompleteEvent<IResourceProperties> {
    const baseEvent = {
        ResponseURL: 'https://example.com',
        StackId: 'test-stack',
        RequestId: 'test-request',
        LogicalResourceId: 'test-resource',
        ResourceType: 'Custom::RdsOracleMultiTenant',
        ResourceProperties: {
            DBInstanceIdentifier: dbInstanceId,
            ServiceToken: 'arn:aws:lambda:us-east-1:123456789012:function:test'
        }
    };

    switch (requestType) {
        case 'Create':
            return {
                ...baseEvent,
                RequestType: 'Create',
                ...additionalProps
            } as CdkCustomResourceIsCompleteEvent<IResourceProperties>;
        case 'Update':
            return {
                ...baseEvent,
                RequestType: 'Update',
                PhysicalResourceId: `rds-oracle-multi-tenant-${dbInstanceId}`,
                OldResourceProperties: {
                    DBInstanceIdentifier: dbInstanceId,
                    ServiceToken:
                        'arn:aws:lambda:us-east-1:123456789012:function:test'
                },
                ...additionalProps
            } as CdkCustomResourceIsCompleteEvent<IResourceProperties>;
        case 'Delete':
            return {
                ...baseEvent,
                RequestType: 'Delete',
                PhysicalResourceId: `rds-oracle-multi-tenant-${dbInstanceId}`,
                ...additionalProps
            } as CdkCustomResourceIsCompleteEvent<IResourceProperties>;
        default:
            throw new Error(`Unsupported request type: ${requestType}`);
    }
}

describe('IsComplete Handler', () => {
    const rdsMock = mockClient(RDSClient);
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
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Create', dbInstanceId);

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue({
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'available',
                PendingModifiedValues: {}
            } as any);

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(true);
            if ('Data' in result && result.Data) {
                expect(result.Data).toEqual({
                    DBInstanceIdentifier: dbInstanceId,
                    MultiTenantStatus: ConversionStatus.COMPLETED,
                    ModificationStatus: 'available',
                    PendingModifications: '{}'
                });
            }
            expect(consoleSpy).toHaveBeenCalledWith(
                'Checking CREATE completion for database: test-oracle-instance'
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                'MultiTenant conversion completed for database: test-oracle-instance'
            );
        });

        it('should return IsComplete: false when conversion is in progress', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Create', dbInstanceId);

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue({
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'modifying',
                PendingModifiedValues: {
                    MultiTenant: true
                }
            } as any);

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(false);
            expect('Data' in result).toBe(false);
            expect(consoleSpy).toHaveBeenCalledWith(
                'MultiTenant conversion still in progress for database: test-oracle-instance'
            );
        });

        it('should throw error when conversion has failed', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Create', dbInstanceId);

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue({
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'failed',
                PendingModifiedValues: {}
            } as any);

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'MultiTenant conversion failed with database status: failed'
            );
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'MultiTenant conversion failed for database: test-oracle-instance'
            );
        });

        it('should handle incompatible-parameters status as failed', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Create', dbInstanceId);

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue({
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'incompatible-parameters',
                PendingModifiedValues: {}
            } as any);

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'MultiTenant conversion failed with database status: incompatible-parameters'
            );
        });

        it('should handle database with null pending modifications', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Create', dbInstanceId);

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue({
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'available',
                PendingModifiedValues: null
            } as any);

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
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Create', dbInstanceId);

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue({
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: undefined,
                PendingModifiedValues: {}
            } as any);

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(false);
            expect('Data' in result).toBe(false);
        });

        it('should handle RDS client errors gracefully', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Create', dbInstanceId);

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
                'Error checking CREATE completion for test-oracle-instance: RDS API Error'
            );
        });

        it('should handle non-Error exceptions', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Create', dbInstanceId);

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockRejectedValue('String error');

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'Unknown error checking CREATE completion for test-oracle-instance'
            );
        });

        it('should handle database with unknown status as in progress', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Create', dbInstanceId);

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            // Mock a database instance with an unknown status that doesn't match failed states
            // and isn't available, so it should be treated as IN_PROGRESS
            vi.mocked(getDatabaseInstance).mockResolvedValue({
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'unknown-status',
                PendingModifiedValues: {}
            } as any);

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            // With 'unknown-status' and empty pending modifications, it should be IN_PROGRESS
            expect(result.IsComplete).toBe(false);
            expect('Data' in result).toBe(false);
        });
    });

    describe('UPDATE operations', () => {
        it('should return IsComplete: true immediately for UPDATE operations', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Update', dbInstanceId);

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue({
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'available',
                PendingModifiedValues: {}
            } as any);

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(true);
            if ('Data' in result && result.Data) {
                expect(result.Data).toEqual({
                    DBInstanceIdentifier: dbInstanceId,
                    MultiTenantStatus: ConversionStatus.COMPLETED,
                    ModificationStatus: 'available',
                    PendingModifications: '{}'
                });
            }
            expect(consoleSpy).toHaveBeenCalledWith(
                'UPDATE operation is no-op for database: test-oracle-instance, completing immediately'
            );
        });

        it('should handle UPDATE operation when database state cannot be retrieved', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Update', dbInstanceId);

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
                'Could not get current state for UPDATE no-op on test-oracle-instance: Error: Database not found'
            );
        });
    });

    describe('DELETE operations', () => {
        it('should return IsComplete: true immediately for DELETE operations', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Delete', dbInstanceId);

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            expect(result.IsComplete).toBe(true);
            expect('Data' in result).toBe(false);
            expect(consoleSpy).toHaveBeenCalledWith(
                'DELETE operation is no-op for database: test-oracle-instance, completing immediately'
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                'MultiTenant conversion cannot be reversed, database retains configuration'
            );
        });
    });

    describe('Error handling', () => {
        it('should throw error when DBInstanceIdentifier is missing', async () => {
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
                ResourceType: 'Custom::RdsOracleMultiTenant'
            } as CdkCustomResourceIsCompleteEvent<IResourceProperties>;

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'DBInstanceIdentifier is required in ResourceProperties'
            );
        });

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
                ResourceType: 'Custom::RdsOracleMultiTenant',
                PhysicalResourceId: 'test-physical-id'
            } as CdkCustomResourceIsCompleteEvent<IResourceProperties>;

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
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Create', dbInstanceId);

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            const pendingModifications = { MultiTenant: true };
            vi.mocked(getDatabaseInstance).mockResolvedValue({
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'modifying',
                PendingModifiedValues: pendingModifications
            } as any);

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            await handler(event, mockContext);

            expect(consoleSpy).toHaveBeenCalledWith(
                `Database ${dbInstanceId} status: modifying, pending modifications: ${JSON.stringify(pendingModifications)}`
            );
        });

        it('should handle empty pending modifications object', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Create', dbInstanceId);

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue({
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'available',
                PendingModifiedValues: {}
            } as any);

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
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Create', dbInstanceId);

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            const pendingModifications = {
                MultiTenant: true,
                DBInstanceClass: 'db.t3.medium'
            };
            vi.mocked(getDatabaseInstance).mockResolvedValue({
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'available',
                PendingModifiedValues: pendingModifications
            } as any);

            const { handler } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/is-complete'
            );

            const result = await handler(event, mockContext);

            // When there are pending modifications, it should be IN_PROGRESS, not COMPLETED
            expect(result.IsComplete).toBe(false);
            expect('Data' in result).toBe(false);
        });

        it('should handle undefined pending modifications', async () => {
            const dbInstanceId = 'test-oracle-instance';
            const event = createEvent('Create', dbInstanceId);

            const { getDatabaseInstance } = await import(
                '../../../../../src/aspects/rds-oracle-multi-tenant/handler/utils/rds-client'
            );
            vi.mocked(getDatabaseInstance).mockResolvedValue({
                DBInstanceIdentifier: dbInstanceId,
                DBInstanceStatus: 'available',
                PendingModifiedValues: undefined
            } as any);

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
