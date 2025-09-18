// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    RDSClient,
    DBInstance,
    RDSServiceException
} from '@aws-sdk/client-rds';
import { CdkCustomResourceIsCompleteEvent } from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from '../../../../../src/constructs/rds-oracle-multi-tenant/handler/is-complete';
import { ConversionStatus } from '../../../../../src/constructs/rds-oracle-multi-tenant/handler/types/conversion-status';
import { IResourceProperties } from '../../../../../src/constructs/rds-oracle-multi-tenant/handler/types/resource-properties';
import { mockContext } from '../../../../fixtures';

// Mock the RDS client utilities
vi.mock(
    '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client',
    () => ({
        createRdsClient: vi.fn(() => new RDSClient({})),
        getDatabaseInstance: vi.fn()
    })
);

const rdsClientMock = mockClient(RDSClient);

describe('IsComplete Handler', () => {
    const mockDBInstanceId = 'test-db-instance';
    const mockPhysicalResourceId = `rds-oracle-multi-tenant-${mockDBInstanceId}`;
    const mockResourceProperties: IResourceProperties = {
        DBInstanceIdentifier: mockDBInstanceId
    };

    const mockValidOracleInstance: DBInstance = {
        DBInstanceIdentifier: mockDBInstanceId,
        Engine: 'oracle-ee',
        EngineVersion: '19.0.0.0.ru-2023-01.rur-2023-01.r1',
        LicenseModel: 'bring-your-own-license',
        DBInstanceStatus: 'available',
        DBInstanceClass: 'db.t3.medium',
        AllocatedStorage: 20,
        MasterUsername: 'admin',
        DBName: 'ORCL',
        VpcSecurityGroups: [],
        DBSubnetGroup: {
            DBSubnetGroupName: 'default',
            DBSubnetGroupDescription: 'default',
            VpcId: 'vpc-12345',
            SubnetGroupStatus: 'Complete',
            Subnets: []
        },
        PendingModifiedValues: {}
    };

    // Helper function to create IsComplete events
    function createIsCompleteEvent(
        requestType: 'Create' | 'Update' | 'Delete',
        physicalResourceId: string = mockPhysicalResourceId,
        resourceProperties: IResourceProperties = mockResourceProperties
    ): CdkCustomResourceIsCompleteEvent<IResourceProperties> {
        return {
            RequestType: requestType,
            ResponseURL: 'test-response-url',
            StackId: 'test-stack-id',
            RequestId: 'test-request-id',
            ResourceType: 'Custom::RdsOracleMultiTenant',
            LogicalResourceId: 'test-logical-resource-id',
            ResourceProperties: resourceProperties,
            PhysicalResourceId: physicalResourceId
        };
    }

    beforeEach(() => {
        rdsClientMock.reset();
        vi.clearAllMocks();
    });

    describe('Input Validation', () => {
        it('should throw error when DBInstanceIdentifier is missing', async () => {
            const event = createIsCompleteEvent(
                'Create',
                mockPhysicalResourceId,
                {} as IResourceProperties
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'DBInstanceIdentifier is required in ResourceProperties'
            );
        });

        it('should throw error when DBInstanceIdentifier is empty string', async () => {
            const event = createIsCompleteEvent(
                'Create',
                mockPhysicalResourceId,
                {
                    DBInstanceIdentifier: ''
                }
            );

            await expect(handler(event, mockContext)).rejects.toThrow(
                'DBInstanceIdentifier is required in ResourceProperties'
            );
        });

        it('should throw error for unsupported request type', async () => {
            const event = createIsCompleteEvent('Create');
            // Modify the event to have an invalid request type
            (event as any).RequestType = 'InvalidType';

            await expect(handler(event, mockContext)).rejects.toThrow(
                'Unsupported request type: InvalidType'
            );
        });
    });

    describe('CREATE Operation Status Checking', () => {
        it('should return IsComplete: true when database conversion is completed', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const completedInstance: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'available',
                PendingModifiedValues: {}
            };

            (getDatabaseInstance as any).mockResolvedValue(completedInstance);

            const event = createIsCompleteEvent('Create');

            const result = await handler(event, mockContext);

            expect(result).toEqual({
                IsComplete: true,
                Data: {
                    DBInstanceIdentifier: mockDBInstanceId,
                    MultiTenantStatus: ConversionStatus.COMPLETED,
                    ModificationStatus: 'available',
                    PendingModifications: '{}'
                }
            });

            expect(getDatabaseInstance).toHaveBeenCalledWith(
                expect.any(RDSClient),
                mockDBInstanceId
            );
        });

        it('should return IsComplete: false when database conversion is in progress', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const inProgressInstance: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'modifying',
                PendingModifiedValues: {
                    MultiTenant: true
                }
            };

            (getDatabaseInstance as any).mockResolvedValue(inProgressInstance);

            const event = createIsCompleteEvent('Create');

            const result = await handler(event, mockContext);

            expect(result).toEqual({
                IsComplete: false
            });

            expect(getDatabaseInstance).toHaveBeenCalledWith(
                expect.any(RDSClient),
                mockDBInstanceId
            );
        });

        it('should return IsComplete: false when database has pending modifications', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const pendingInstance: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'available',
                PendingModifiedValues: {
                    MultiTenant: true,
                    DBInstanceClass: 'db.t3.large'
                }
            };

            (getDatabaseInstance as any).mockResolvedValue(pendingInstance);

            const event = createIsCompleteEvent('Create');

            const result = await handler(event, mockContext);

            expect(result).toEqual({
                IsComplete: false
            });
        });

        it('should throw error when database conversion failed', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const failedInstance: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'failed'
            };

            (getDatabaseInstance as any).mockResolvedValue(failedInstance);

            const event = createIsCompleteEvent('Create');

            await expect(handler(event, mockContext)).rejects.toThrow(
                'MultiTenant conversion failed with database status: failed'
            );

            expect(getDatabaseInstance).toHaveBeenCalledWith(
                expect.any(RDSClient),
                mockDBInstanceId
            );
        });

        it('should throw error when database has incompatible-parameters status', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const incompatibleInstance: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'incompatible-parameters'
            };

            (getDatabaseInstance as any).mockResolvedValue(
                incompatibleInstance
            );

            const event = createIsCompleteEvent('Create');

            await expect(handler(event, mockContext)).rejects.toThrow(
                'MultiTenant conversion failed with database status: incompatible-parameters'
            );
        });

        it('should handle database with unknown status as in-progress', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const unknownStatusInstance: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'unknown-status' as any
            };

            (getDatabaseInstance as any).mockResolvedValue(
                unknownStatusInstance
            );

            const event = createIsCompleteEvent('Create');

            const result = await handler(event, mockContext);

            expect(result).toEqual({
                IsComplete: false
            });
        });

        it('should handle RDS service exceptions during CREATE status check', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const rdsError = new RDSServiceException({
                name: 'DBInstanceNotFoundFault',
                message: 'DB instance not found',
                $fault: 'client',
                $metadata: {}
            });
            (getDatabaseInstance as any).mockRejectedValue(rdsError);

            const event = createIsCompleteEvent('Create');

            await expect(handler(event, mockContext)).rejects.toThrow(rdsError);

            expect(getDatabaseInstance).toHaveBeenCalledWith(
                expect.any(RDSClient),
                mockDBInstanceId
            );
        });

        it('should handle generic errors during CREATE status check', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const genericError = new Error('Network timeout');
            (getDatabaseInstance as any).mockRejectedValue(genericError);

            const event = createIsCompleteEvent('Create');

            await expect(handler(event, mockContext)).rejects.toThrow(
                'Network timeout'
            );
        });

        it('should handle unknown error types during CREATE status check', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            // Simulate throwing a non-Error object
            (getDatabaseInstance as any).mockRejectedValue('string error');

            const event = createIsCompleteEvent('Create');

            await expect(handler(event, mockContext)).rejects.toThrow(
                `Unknown error checking CREATE completion for ${mockDBInstanceId}`
            );
        });
    });

    describe('UPDATE Operation Status Checking', () => {
        it('should return IsComplete: true immediately for UPDATE operations', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const currentInstance: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'available',
                PendingModifiedValues: {}
            };

            (getDatabaseInstance as any).mockResolvedValue(currentInstance);

            const event = createIsCompleteEvent('Update');

            const result = await handler(event, mockContext);

            expect(result).toEqual({
                IsComplete: true,
                Data: {
                    DBInstanceIdentifier: mockDBInstanceId,
                    MultiTenantStatus: ConversionStatus.COMPLETED,
                    ModificationStatus: 'available',
                    PendingModifications: '{}'
                }
            });

            expect(getDatabaseInstance).toHaveBeenCalledWith(
                expect.any(RDSClient),
                mockDBInstanceId
            );
        });

        it('should return IsComplete: true even when cannot get current state for UPDATE', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const rdsError = new RDSServiceException({
                name: 'DBInstanceNotFoundFault',
                message: 'DB instance not found',
                $fault: 'client',
                $metadata: {}
            });
            (getDatabaseInstance as any).mockRejectedValue(rdsError);

            const consoleSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});

            const event = createIsCompleteEvent('Update');

            const result = await handler(event, mockContext);

            expect(result).toEqual({
                IsComplete: true
            });

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    `Could not get current state for UPDATE no-op on ${mockDBInstanceId}`
                )
            );

            consoleSpy.mockRestore();
        });

        it('should handle UPDATE with database in modifying state', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const modifyingInstance: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'modifying',
                PendingModifiedValues: {
                    DBInstanceClass: 'db.t3.large'
                }
            };

            (getDatabaseInstance as any).mockResolvedValue(modifyingInstance);

            const event = createIsCompleteEvent('Update');

            const result = await handler(event, mockContext);

            expect(result).toEqual({
                IsComplete: true,
                Data: {
                    DBInstanceIdentifier: mockDBInstanceId,
                    MultiTenantStatus: ConversionStatus.IN_PROGRESS,
                    ModificationStatus: 'modifying',
                    PendingModifications: JSON.stringify({
                        DBInstanceClass: 'db.t3.large'
                    })
                }
            });
        });
    });

    describe('DELETE Operation Status Checking', () => {
        it('should return IsComplete: true immediately for DELETE operations', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const event = createIsCompleteEvent('Delete');

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const result = await handler(event, mockContext);

            expect(result).toEqual({
                IsComplete: true
            });

            expect(consoleSpy).toHaveBeenCalledWith(
                `DELETE operation is no-op for database: ${mockDBInstanceId}, completing immediately`
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                'MultiTenant conversion cannot be reversed, database retains configuration'
            );

            // Should not call getDatabaseInstance for DELETE operations
            expect(getDatabaseInstance).not.toHaveBeenCalled();

            consoleSpy.mockRestore();
        });

        it('should not call RDS API for DELETE operations', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const event = createIsCompleteEvent('Delete');

            await handler(event, mockContext);

            expect(getDatabaseInstance).not.toHaveBeenCalled();
        });
    });

    describe('Response Data Formatting', () => {
        it('should format response data correctly when conversion is completed', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const completedInstance: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'available',
                PendingModifiedValues: {}
            };

            (getDatabaseInstance as any).mockResolvedValue(completedInstance);

            const event = createIsCompleteEvent('Create');

            const result = await handler(event, mockContext);

            expect(result.Data).toEqual({
                DBInstanceIdentifier: mockDBInstanceId,
                MultiTenantStatus: ConversionStatus.COMPLETED,
                ModificationStatus: 'available',
                PendingModifications: '{}'
            });
        });

        it('should format response data with pending modifications as JSON string', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const instanceWithPending: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'available',
                PendingModifiedValues: {
                    MultiTenant: true,
                    DBInstanceClass: 'db.t3.large'
                }
            };

            (getDatabaseInstance as any).mockResolvedValue(instanceWithPending);

            const event = createIsCompleteEvent('Update');

            const result = await handler(event, mockContext);

            expect(result.Data?.PendingModifications).toBe(
                JSON.stringify({
                    MultiTenant: true,
                    DBInstanceClass: 'db.t3.large'
                })
            );
        });

        it('should handle null pending modifications', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const instanceWithNullPending: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'available',
                PendingModifiedValues: null as any
            };

            (getDatabaseInstance as any).mockResolvedValue(
                instanceWithNullPending
            );

            const event = createIsCompleteEvent('Create');

            const result = await handler(event, mockContext);

            expect(result.Data?.PendingModifications).toBeUndefined();
        });

        it('should handle undefined database status', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const instanceWithUndefinedStatus: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: undefined as any
            };

            (getDatabaseInstance as any).mockResolvedValue(
                instanceWithUndefinedStatus
            );

            const event = createIsCompleteEvent('Create');

            const result = await handler(event, mockContext);

            expect(result).toEqual({
                IsComplete: false
            });
        });
    });

    describe('Logging', () => {
        it('should log event details at the start of handler execution', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            (getDatabaseInstance as any).mockResolvedValue(
                mockValidOracleInstance
            );

            const event = createIsCompleteEvent('Create');

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            await handler(event, mockContext);

            expect(consoleSpy).toHaveBeenCalledWith(
                'IsComplete handler called with event:',
                JSON.stringify(event, null, 2)
            );

            consoleSpy.mockRestore();
        });

        it('should log operation type and database instance ID for CREATE', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            (getDatabaseInstance as any).mockResolvedValue(
                mockValidOracleInstance
            );

            const event = createIsCompleteEvent('Create');

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            await handler(event, mockContext);

            expect(consoleSpy).toHaveBeenCalledWith(
                `Checking CREATE completion for database: ${mockDBInstanceId}`
            );

            consoleSpy.mockRestore();
        });

        it('should log operation type and database instance ID for UPDATE', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            (getDatabaseInstance as any).mockResolvedValue(
                mockValidOracleInstance
            );

            const event = createIsCompleteEvent('Update');

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            await handler(event, mockContext);

            expect(consoleSpy).toHaveBeenCalledWith(
                `Checking UPDATE completion for database: ${mockDBInstanceId}`
            );

            consoleSpy.mockRestore();
        });

        it('should log operation type and database instance ID for DELETE', async () => {
            const event = createIsCompleteEvent('Delete');

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            await handler(event, mockContext);

            expect(consoleSpy).toHaveBeenCalledWith(
                `Checking DELETE completion for database: ${mockDBInstanceId}`
            );

            consoleSpy.mockRestore();
        });

        it('should log conversion status during CREATE operations', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const inProgressInstance: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'modifying',
                PendingModifiedValues: {
                    MultiTenant: true
                }
            };

            (getDatabaseInstance as any).mockResolvedValue(inProgressInstance);

            const event = createIsCompleteEvent('Create');

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            await handler(event, mockContext);

            expect(consoleSpy).toHaveBeenCalledWith(
                `MultiTenant conversion still in progress for database: ${mockDBInstanceId}`
            );

            consoleSpy.mockRestore();
        });

        it('should log completion when CREATE operation finishes', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const completedInstance: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'available',
                PendingModifiedValues: {}
            };

            (getDatabaseInstance as any).mockResolvedValue(completedInstance);

            const event = createIsCompleteEvent('Create');

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            await handler(event, mockContext);

            expect(consoleSpy).toHaveBeenCalledWith(
                `MultiTenant conversion completed for database: ${mockDBInstanceId}`
            );

            consoleSpy.mockRestore();
        });

        it('should log error when CREATE operation fails', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const failedInstance: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'failed'
            };

            (getDatabaseInstance as any).mockResolvedValue(failedInstance);

            const event = createIsCompleteEvent('Create');

            const consoleSpy = vi
                .spyOn(console, 'error')
                .mockImplementation(() => {});

            await expect(handler(event, mockContext)).rejects.toThrow();

            expect(consoleSpy).toHaveBeenCalledWith(
                `MultiTenant conversion failed for database: ${mockDBInstanceId}`
            );

            consoleSpy.mockRestore();
        });

        it('should log database status and pending modifications during status checks', async () => {
            const { getDatabaseInstance } = await import(
                '../../../../../src/constructs/rds-oracle-multi-tenant/handler/utils/rds-client'
            );

            const instanceWithPending: DBInstance = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'modifying',
                PendingModifiedValues: {
                    MultiTenant: true,
                    DBInstanceClass: 'db.t3.large'
                }
            };

            (getDatabaseInstance as any).mockResolvedValue(instanceWithPending);

            const event = createIsCompleteEvent('Create');

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            await handler(event, mockContext);

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    `Database ${mockDBInstanceId} status: modifying, pending modifications:`
                )
            );

            consoleSpy.mockRestore();
        });
    });
});
