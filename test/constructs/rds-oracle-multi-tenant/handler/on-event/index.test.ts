// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    RDSClient,
    DBInstance,
    RDSServiceException
} from '@aws-sdk/client-rds';
import { mockClient } from 'aws-sdk-client-mock';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from '../../../../../src/constructs/rds-oracle-multi-tenant/handler/on-event';
import { IResourceProperties } from '../../../../../src/constructs/rds-oracle-multi-tenant/handler/types/resource-properties';
import {
    buildMockCreateEvent,
    buildMockUpdateEvent,
    buildMockDeleteEvent,
    mockContext
} from '../../../../fixtures';

// Mock the RDS client utilities
vi.mock(
    '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client',
    () => ({
        createRdsClient: vi.fn(() => new RDSClient({})),
        validateOracleDatabase: vi.fn(),
        enableOracleMultiTenant: vi.fn()
    })
);

const rdsClientMock = mockClient(RDSClient);

describe('OnEvent Handler', () => {
    const mockDBInstanceId = 'test-db-instance';
    const mockResourceProperties: IResourceProperties = {
        DBInstanceIdentifier: mockDBInstanceId
    };

    const mockValidOracleInstance: DBInstance = {
        DBInstanceIdentifier: mockDBInstanceId,
        Engine: 'oracle-ee',
        EngineVersion: '19.0.0.0.ru-2023-01.rur-2023-01.r1',
        LicenseModel: 'bring-your-own-license',
        DBInstanceStatus: 'available'
    };

    beforeEach(() => {
        rdsClientMock.reset();
        vi.clearAllMocks();
    });

    describe('Input Validation', () => {
        it('should throw error when DBInstanceIdentifier is missing', async () => {
            const event = buildMockCreateEvent(
                'Custom::RdsOracleMultiTenant',
                {}
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'DBInstanceIdentifier is required in ResourceProperties'
            );
        });

        it('should throw error when DBInstanceIdentifier is empty string', async () => {
            const event = buildMockCreateEvent('Custom::RdsOracleMultiTenant', {
                DBInstanceIdentifier: ''
            });

            await expect(handler(event, mockContext)).rejects.toThrow(
                'DBInstanceIdentifier is required in ResourceProperties'
            );
        });

        it('should throw error for unsupported request type', async () => {
            const event = buildMockCreateEvent(
                'Custom::RdsOracleMultiTenant',
                mockResourceProperties
            );
            // Modify the event to have an invalid request type
            (event as any).RequestType = 'InvalidType';

            await expect(handler(event, mockContext)).rejects.toThrow(
                'Unsupported request type: InvalidType'
            );
        });
    });

    describe('CREATE Operation', () => {
        it('should successfully handle CREATE request with valid Oracle database', async () => {
            const { validateOracleDatabase, enableOracleMultiTenant } =
                await import(
                    '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
                );

            (validateOracleDatabase as any).mockResolvedValue(
                mockValidOracleInstance
            );
            (enableOracleMultiTenant as any).mockResolvedValue(undefined);

            const event = buildMockCreateEvent(
                'Custom::RdsOracleMultiTenant',
                mockResourceProperties
            );

            const result = await handler(event, mockContext);

            expect(result).toEqual({
                PhysicalResourceId: `rds-oracle-multi-tenant-${mockDBInstanceId}`
            });

            expect(validateOracleDatabase).toHaveBeenCalledWith(
                expect.any(RDSClient),
                mockDBInstanceId
            );
            expect(enableOracleMultiTenant).toHaveBeenCalledWith(
                expect.any(RDSClient),
                mockDBInstanceId
            );
        });

        it('should throw error when Oracle database validation fails', async () => {
            const { validateOracleDatabase } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const validationError = new Error(
                "Database engine 'mysql' is not Oracle"
            );
            (validateOracleDatabase as any).mockRejectedValue(validationError);

            const event = buildMockCreateEvent(
                'Custom::RdsOracleMultiTenant',
                mockResourceProperties
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                "Database engine 'mysql' is not Oracle"
            );

            expect(validateOracleDatabase).toHaveBeenCalledWith(
                expect.any(RDSClient),
                mockDBInstanceId
            );
        });

        it('should throw error when enableOracleMultiTenant fails', async () => {
            const { validateOracleDatabase, enableOracleMultiTenant } =
                await import(
                    '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
                );

            (validateOracleDatabase as any).mockResolvedValue(
                mockValidOracleInstance
            );

            const enableError = new Error(
                'Failed to enable Oracle MultiTenant: Network error'
            );
            (enableOracleMultiTenant as any).mockRejectedValue(enableError);

            const event = buildMockCreateEvent(
                'Custom::RdsOracleMultiTenant',
                mockResourceProperties
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'Failed to enable Oracle MultiTenant: Network error'
            );

            expect(validateOracleDatabase).toHaveBeenCalledWith(
                expect.any(RDSClient),
                mockDBInstanceId
            );
            expect(enableOracleMultiTenant).toHaveBeenCalledWith(
                expect.any(RDSClient),
                mockDBInstanceId
            );
        });

        it('should handle RDS service exceptions during CREATE', async () => {
            const { validateOracleDatabase } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const rdsError = new RDSServiceException({
                name: 'DBInstanceNotFoundFault',
                message: 'DB instance not found',
                $fault: 'client',
                $metadata: {}
            });
            (validateOracleDatabase as any).mockRejectedValue(rdsError);

            const event = buildMockCreateEvent(
                'Custom::RdsOracleMultiTenant',
                mockResourceProperties
            );

            await expect(handler(event, mockContext)).rejects.toThrow(rdsError);

            expect(validateOracleDatabase).toHaveBeenCalledWith(
                expect.any(RDSClient),
                mockDBInstanceId
            );
        });
    });

    describe('UPDATE Operation', () => {
        const mockPhysicalResourceId = `rds-oracle-multi-tenant-${mockDBInstanceId}`;

        it('should handle UPDATE request as no-op and return existing PhysicalResourceId', async () => {
            const event = buildMockUpdateEvent(
                mockPhysicalResourceId,
                'Custom::RdsOracleMultiTenant',
                mockResourceProperties,
                mockResourceProperties
            );

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const result = await handler(event, mockContext);

            expect(result).toEqual({
                PhysicalResourceId: mockPhysicalResourceId
            });

            expect(consoleSpy).toHaveBeenCalledWith(
                `UPDATE operation called for database instance: ${mockDBInstanceId}`
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                'Multi-tenant conversion is a one-time operation and cannot be modified'
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                `Returning existing PhysicalResourceId: ${mockPhysicalResourceId}`
            );

            consoleSpy.mockRestore();
        });

        it('should handle UPDATE request with different DB instance identifier', async () => {
            const newDBInstanceId = 'new-db-instance';
            const newResourceProperties: IResourceProperties = {
                DBInstanceIdentifier: newDBInstanceId
            };

            const event = buildMockUpdateEvent(
                mockPhysicalResourceId,
                'Custom::RdsOracleMultiTenant',
                newResourceProperties,
                mockResourceProperties
            );

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const result = await handler(event, mockContext);

            expect(result).toEqual({
                PhysicalResourceId: mockPhysicalResourceId
            });

            expect(consoleSpy).toHaveBeenCalledWith(
                `UPDATE operation called for database instance: ${newDBInstanceId}`
            );

            consoleSpy.mockRestore();
        });

        it('should not call validation or enablement functions during UPDATE', async () => {
            const { validateOracleDatabase, enableOracleMultiTenant } =
                await import(
                    '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
                );

            const event = buildMockUpdateEvent(
                mockPhysicalResourceId,
                'Custom::RdsOracleMultiTenant',
                mockResourceProperties,
                mockResourceProperties
            );

            await handler(event, mockContext);

            expect(validateOracleDatabase).not.toHaveBeenCalled();
            expect(enableOracleMultiTenant).not.toHaveBeenCalled();
        });
    });

    describe('DELETE Operation', () => {
        const mockPhysicalResourceId = `rds-oracle-multi-tenant-${mockDBInstanceId}`;

        it('should handle DELETE request as no-op and return existing PhysicalResourceId', async () => {
            const event = buildMockDeleteEvent(
                mockPhysicalResourceId,
                'Custom::RdsOracleMultiTenant',
                mockResourceProperties
            );

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const result = await handler(event, mockContext);

            expect(result).toEqual({
                PhysicalResourceId: mockPhysicalResourceId
            });

            expect(consoleSpy).toHaveBeenCalledWith(
                `DELETE operation called for database instance: ${mockDBInstanceId}`
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                'Multi-tenant conversion cannot be reversed through RDS API'
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                'Database instance will retain multi-tenant configuration'
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                `Returning PhysicalResourceId for cleanup: ${mockPhysicalResourceId}`
            );

            consoleSpy.mockRestore();
        });

        it('should not call validation or enablement functions during DELETE', async () => {
            const { validateOracleDatabase, enableOracleMultiTenant } =
                await import(
                    '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
                );

            const event = buildMockDeleteEvent(
                mockPhysicalResourceId,
                'Custom::RdsOracleMultiTenant',
                mockResourceProperties
            );

            await handler(event, mockContext);

            expect(validateOracleDatabase).not.toHaveBeenCalled();
            expect(enableOracleMultiTenant).not.toHaveBeenCalled();
        });
    });

    describe('PhysicalResourceId Generation', () => {
        it('should generate consistent PhysicalResourceId format', async () => {
            const { validateOracleDatabase, enableOracleMultiTenant } =
                await import(
                    '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
                );

            (validateOracleDatabase as any).mockResolvedValue(
                mockValidOracleInstance
            );
            (enableOracleMultiTenant as any).mockResolvedValue(undefined);

            const event = buildMockCreateEvent(
                'Custom::RdsOracleMultiTenant',
                mockResourceProperties
            );

            const result = await handler(event, mockContext);

            expect(result.PhysicalResourceId).toBe(
                `rds-oracle-multi-tenant-${mockDBInstanceId}`
            );
            expect(result.PhysicalResourceId).toMatch(
                /^rds-oracle-multi-tenant-.+$/
            );
        });

        it('should generate PhysicalResourceId with special characters in DB instance ID', async () => {
            const specialDBInstanceId = 'test-db-instance_with.special-chars';
            const specialResourceProperties: IResourceProperties = {
                DBInstanceIdentifier: specialDBInstanceId
            };

            const { validateOracleDatabase, enableOracleMultiTenant } =
                await import(
                    '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
                );

            (validateOracleDatabase as any).mockResolvedValue({
                ...mockValidOracleInstance,
                DBInstanceIdentifier: specialDBInstanceId
            });
            (enableOracleMultiTenant as any).mockResolvedValue(undefined);

            const event = buildMockCreateEvent(
                'Custom::RdsOracleMultiTenant',
                specialResourceProperties
            );

            const result = await handler(event, mockContext);

            expect(result.PhysicalResourceId).toBe(
                `rds-oracle-multi-tenant-${specialDBInstanceId}`
            );
        });
    });

    describe('Logging', () => {
        it('should log event details at the start of handler execution', async () => {
            const { validateOracleDatabase, enableOracleMultiTenant } =
                await import(
                    '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
                );

            (validateOracleDatabase as any).mockResolvedValue(
                mockValidOracleInstance
            );
            (enableOracleMultiTenant as any).mockResolvedValue(undefined);

            const event = buildMockCreateEvent(
                'Custom::RdsOracleMultiTenant',
                mockResourceProperties
            );

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            await handler(event, mockContext);

            expect(consoleSpy).toHaveBeenCalledWith(
                'OnEvent handler called with event:',
                JSON.stringify(event, null, 2)
            );

            consoleSpy.mockRestore();
        });

        it('should log operation type and database instance ID', async () => {
            const { validateOracleDatabase, enableOracleMultiTenant } =
                await import(
                    '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
                );

            (validateOracleDatabase as any).mockResolvedValue(
                mockValidOracleInstance
            );
            (enableOracleMultiTenant as any).mockResolvedValue(undefined);

            const event = buildMockCreateEvent(
                'Custom::RdsOracleMultiTenant',
                mockResourceProperties
            );

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            await handler(event, mockContext);

            expect(consoleSpy).toHaveBeenCalledWith(
                `Processing CREATE request for database: ${mockDBInstanceId}`
            );

            consoleSpy.mockRestore();
        });
    });
});
