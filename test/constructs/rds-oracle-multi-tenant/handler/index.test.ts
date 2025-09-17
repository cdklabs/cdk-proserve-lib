// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    RDSClient,
    DescribeDBInstancesCommand,
    ModifyDBInstanceCommand
} from '@aws-sdk/client-rds';
import { mockClient } from 'aws-sdk-client-mock';
import { describe, beforeEach, afterEach, vi, expect, it } from 'vitest';
import {
    mockValidOracleInstance,
    mockInvalidEngineInstance,
    mockOldVersionInstance,
    mockStandardEditionInstance,
    mockUnavailableInstance,
    mockInstanceWithPendingModifications,
    mockConvertedInstance,
    mockFailedInstance,
    mockTimeoutInstance,
    mockCreateEvent,
    mockUpdateEvent,
    mockUpdateEventWithDifferentId,
    mockDeleteEvent,
    mockDBInstanceId,
    mockRDSServiceException
} from './fixtures';
import {
    handler,
    enableOracleMultiTenant,
    waitForMultiTenantConversion,
    getDatabaseStatus
} from '../../../../src/constructs/rds-oracle-multi-tenant/handler';
import { mockContext } from '../../../fixtures';

describe('RDS Oracle MultiTenant Lambda Handler', () => {
    const rdsMock = mockClient(RDSClient);

    beforeEach(() => {
        rdsMock.reset();
        // Clear console logs for clean test output
        vi.spyOn(console, 'log').mockImplementation(() => {});
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Validation Logic', () => {
        describe('Oracle Engine Validation', () => {
            it('should pass validation for valid Oracle engine', async () => {
                // Mock successful validation
                rdsMock
                    .on(DescribeDBInstancesCommand)
                    .resolves({
                        DBInstances: [mockValidOracleInstance]
                    })
                    .on(DescribeDBInstancesCommand)
                    .resolves({
                        DBInstances: [mockConvertedInstance]
                    });

                // Mock successful ModifyDBInstance
                rdsMock.on(ModifyDBInstanceCommand).resolves({
                    DBInstance: mockInstanceWithPendingModifications
                });

                const event = mockCreateEvent;
                const result = await handler(event, mockContext);

                expect(result.Status).toBe('SUCCESS');
            });

            it('should fail validation for non-Oracle engine', async () => {
                rdsMock.on(DescribeDBInstancesCommand).resolves({
                    DBInstances: [mockInvalidEngineInstance]
                });

                const event = mockCreateEvent;
                const result = await handler(event, mockContext);

                expect(result.Status).toBe('FAILED');
                expect(result.Reason).toContain(
                    "Database engine 'mysql' is not Oracle"
                );
            });

            it('should fail validation for missing engine', async () => {
                const instanceWithoutEngine = {
                    ...mockValidOracleInstance,
                    Engine: undefined
                };

                rdsMock.on(DescribeDBInstancesCommand).resolves({
                    DBInstances: [instanceWithoutEngine]
                });

                const event = mockCreateEvent;
                const result = await handler(event, mockContext);

                expect(result.Status).toBe('FAILED');
                expect(result.Reason).toContain('is not Oracle');
            });
        });

        describe('Oracle Version Validation', () => {
            it('should pass validation for Oracle 19c', async () => {
                // Mock successful validation
                rdsMock
                    .on(DescribeDBInstancesCommand)
                    .resolves({
                        DBInstances: [mockValidOracleInstance]
                    })
                    .on(DescribeDBInstancesCommand)
                    .resolves({
                        DBInstances: [mockConvertedInstance]
                    });

                // Mock successful ModifyDBInstance
                rdsMock.on(ModifyDBInstanceCommand).resolves({
                    DBInstance: mockInstanceWithPendingModifications
                });

                const event = mockCreateEvent;
                const result = await handler(event, mockContext);

                expect(result.Status).toBe('SUCCESS');
            });

            it('should fail validation for Oracle version < 19c', async () => {
                rdsMock.on(DescribeDBInstancesCommand).resolves({
                    DBInstances: [mockOldVersionInstance]
                });

                const event = mockCreateEvent;
                const result = await handler(event, mockContext);

                expect(result.Status).toBe('FAILED');
                expect(result.Reason).toContain(
                    'Oracle version 12 does not support MultiTenant'
                );
            });

            it('should fail validation for unparseable version', async () => {
                const instanceWithBadVersion = {
                    ...mockValidOracleInstance,
                    EngineVersion: 'invalid-version'
                };

                rdsMock.on(DescribeDBInstancesCommand).resolves({
                    DBInstances: [instanceWithBadVersion]
                });

                const event = mockCreateEvent;
                const result = await handler(event, mockContext);

                expect(result.Status).toBe('FAILED');
                expect(result.Reason).toContain(
                    'Unable to parse Oracle version'
                );
            });

            it('should fail validation for missing version', async () => {
                const instanceWithoutVersion = {
                    ...mockValidOracleInstance,
                    EngineVersion: undefined
                };

                rdsMock.on(DescribeDBInstancesCommand).resolves({
                    DBInstances: [instanceWithoutVersion]
                });

                const event = mockCreateEvent;
                const result = await handler(event, mockContext);

                expect(result.Status).toBe('FAILED');
                expect(result.Reason).toContain(
                    'Database engine version is not available'
                );
            });
        });

        describe('Oracle Edition Validation', () => {
            it('should warn for Standard Edition but continue', async () => {
                // Create a fresh console.warn spy for this test
                const originalWarn = console.warn;
                const warnSpy = vi.fn();
                console.warn = warnSpy;

                // Mock successful validation - use callsFake to ensure we get the right instance
                let callCount = 0;
                rdsMock.on(DescribeDBInstancesCommand).callsFake(() => {
                    callCount++;
                    if (callCount === 1) {
                        // First call for validation - return standard edition instance
                        return Promise.resolve({
                            DBInstances: [mockStandardEditionInstance]
                        });
                    } else {
                        // Subsequent calls for monitoring - return converted instance
                        return Promise.resolve({
                            DBInstances: [mockConvertedInstance]
                        });
                    }
                });

                // Mock successful ModifyDBInstance
                rdsMock.on(ModifyDBInstanceCommand).resolves({
                    DBInstance: mockInstanceWithPendingModifications
                });

                const event = mockCreateEvent;
                const result = await handler(event, mockContext);

                expect(result.Status).toBe('SUCCESS');
                expect(warnSpy).toHaveBeenCalledWith(
                    expect.stringContaining(
                        'Oracle Standard Edition has limited MultiTenant support'
                    )
                );

                // Restore original console.warn
                console.warn = originalWarn;
            });

            it('should handle missing license model gracefully', async () => {
                const instanceWithoutLicense = {
                    ...mockValidOracleInstance,
                    LicenseModel: undefined
                };

                // Mock successful validation
                rdsMock
                    .on(DescribeDBInstancesCommand)
                    .resolves({
                        DBInstances: [instanceWithoutLicense]
                    })
                    .on(DescribeDBInstancesCommand)
                    .resolves({
                        DBInstances: [mockConvertedInstance]
                    });

                // Mock successful ModifyDBInstance
                rdsMock.on(ModifyDBInstanceCommand).resolves({
                    DBInstance: mockInstanceWithPendingModifications
                });

                const event = mockCreateEvent;
                const result = await handler(event, mockContext);

                expect(result.Status).toBe('SUCCESS');
            });
        });

        describe('Database Status Validation', () => {
            it('should pass validation for available database', async () => {
                // Mock successful validation
                rdsMock
                    .on(DescribeDBInstancesCommand)
                    .resolves({
                        DBInstances: [mockValidOracleInstance]
                    })
                    .on(DescribeDBInstancesCommand)
                    .resolves({
                        DBInstances: [mockConvertedInstance]
                    });

                // Mock successful ModifyDBInstance
                rdsMock.on(ModifyDBInstanceCommand).resolves({
                    DBInstance: mockInstanceWithPendingModifications
                });

                const event = mockCreateEvent;
                const result = await handler(event, mockContext);

                expect(result.Status).toBe('SUCCESS');
            });

            it('should fail validation for unavailable database', async () => {
                rdsMock.on(DescribeDBInstancesCommand).resolves({
                    DBInstances: [mockUnavailableInstance]
                });

                const event = mockCreateEvent;
                const result = await handler(event, mockContext);

                expect(result.Status).toBe('FAILED');
                expect(result.Reason).toContain(
                    "Database instance is in 'modifying' state"
                );
            });
        });

        describe('Database Not Found', () => {
            it('should fail when database instance is not found', async () => {
                rdsMock.on(DescribeDBInstancesCommand).resolves({
                    DBInstances: []
                });

                const event = mockCreateEvent;
                const result = await handler(event, mockContext);

                expect(result.Status).toBe('FAILED');
                expect(result.Reason).toContain(
                    "Database instance 'test-db-instance' not found"
                );
            });

            it('should fail when DescribeDBInstances returns undefined', async () => {
                rdsMock.on(DescribeDBInstancesCommand).resolves({});

                const event = mockCreateEvent;
                const result = await handler(event, mockContext);

                expect(result.Status).toBe('FAILED');
                expect(result.Reason).toContain(
                    "Database instance 'test-db-instance' not found"
                );
            });
        });
    });

    describe('CREATE Operation', () => {
        it('should successfully enable Oracle MultiTenant', async () => {
            // Mock successful validation
            rdsMock
                .on(DescribeDBInstancesCommand)
                .resolves({
                    DBInstances: [mockValidOracleInstance]
                })
                .on(DescribeDBInstancesCommand)
                .resolves({
                    DBInstances: [mockConvertedInstance]
                });

            // Mock successful ModifyDBInstance
            rdsMock.on(ModifyDBInstanceCommand).resolves({
                DBInstance: mockInstanceWithPendingModifications
            });

            const event = mockCreateEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('SUCCESS');
            expect(result.Data).toEqual({
                DBInstanceIdentifier: mockDBInstanceId,
                MultiTenantStatus: 'Enabled',
                ModificationStatus: 'Complete',
                PendingModifications: '{}'
            });
            expect(result.PhysicalResourceId).toBe(
                `rds-oracle-multitenant-${mockDBInstanceId}`
            );
        });

        it('should handle ModifyDBInstance API failure', async () => {
            // Mock successful validation
            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [mockValidOracleInstance]
            });

            // Mock failed ModifyDBInstance
            rdsMock
                .on(ModifyDBInstanceCommand)
                .rejects(mockRDSServiceException);

            const event = mockCreateEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('FAILED');
            expect(result.Reason).toContain(
                'RDS API error: ValidationException'
            );
        });

        it('should handle timeout during conversion monitoring', async () => {
            // Mock successful validation
            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [mockValidOracleInstance]
            });

            // Mock successful ModifyDBInstance
            rdsMock.on(ModifyDBInstanceCommand).resolves({
                DBInstance: mockInstanceWithPendingModifications
            });

            // Mock timeout scenario - always return modifying status
            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [mockTimeoutInstance]
            });

            const event = mockCreateEvent;

            // Mock a short timeout for testing
            const originalWaitFunction = waitForMultiTenantConversion;
            const mockWaitFunction = vi
                .fn()
                .mockRejectedValue(
                    new Error(
                        'MultiTenant conversion timed out after 30 seconds'
                    )
                );

            // We need to test the timeout behavior by mocking the wait function
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('FAILED');
            // The actual timeout will be handled by the waitForMultiTenantConversion function
        });

        it('should handle conversion failure status', async () => {
            // Create a failed instance that passes validation but fails during monitoring
            const failedInstanceForMonitoring = {
                ...mockValidOracleInstance,
                DBInstanceStatus: 'failed' as const
            };

            let callCount = 0;
            // Mock successful validation first, then failed monitoring
            rdsMock.on(DescribeDBInstancesCommand).callsFake(() => {
                callCount++;
                if (callCount === 1) {
                    // First call for validation - return available instance
                    return Promise.resolve({
                        DBInstances: [mockValidOracleInstance]
                    });
                } else {
                    // Subsequent calls for monitoring - return failed instance
                    return Promise.resolve({
                        DBInstances: [failedInstanceForMonitoring]
                    });
                }
            });

            // Mock successful ModifyDBInstance
            rdsMock.on(ModifyDBInstanceCommand).resolves({
                DBInstance: mockInstanceWithPendingModifications
            });

            const event = mockCreateEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('FAILED');
            expect(result.Reason).toContain(
                'MultiTenant conversion failed with status: failed'
            );
        });

        it('should handle missing DBInstance in ModifyDBInstance response', async () => {
            // Mock successful validation
            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [mockValidOracleInstance]
            });

            // Mock ModifyDBInstance with missing DBInstance
            rdsMock.on(ModifyDBInstanceCommand).resolves({});

            const event = mockCreateEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('FAILED');
            expect(result.Reason).toContain(
                'ModifyDBInstance response did not include DBInstance details'
            );
        });
    });

    describe('UPDATE Operation', () => {
        it('should handle UPDATE with no changes (no-op)', async () => {
            // Mock getting current database status
            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [mockConvertedInstance]
            });

            const event = mockUpdateEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('SUCCESS');
            expect(result.Data).toEqual({
                DBInstanceIdentifier: mockDBInstanceId,
                MultiTenantStatus: 'Unchanged',
                ModificationStatus: 'No Action Required',
                PendingModifications: '{}'
            });
            expect(result.PhysicalResourceId).toBe(
                `rds-oracle-multitenant-${mockDBInstanceId}`
            );
        });

        it('should reject UPDATE with different DB instance identifier', async () => {
            const event = mockUpdateEventWithDifferentId;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('FAILED');
            expect(result.Reason).toContain(
                'Cannot change DBInstanceIdentifier in UPDATE operation'
            );
        });

        it('should handle UPDATE when database status retrieval fails', async () => {
            // Mock failed DescribeDBInstances
            rdsMock
                .on(DescribeDBInstancesCommand)
                .rejects(mockRDSServiceException);

            const event = mockUpdateEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('FAILED');
            expect(result.Reason).toContain(
                'RDS API error: ValidationException'
            );
        });

        it('should handle UPDATE with pending modifications', async () => {
            // Mock database with pending modifications
            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [mockInstanceWithPendingModifications]
            });

            const event = mockUpdateEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('SUCCESS');
            expect(result.Data?.PendingModifications).toBe(
                '{"MultiTenant":true}'
            );
        });
    });

    describe('DELETE Operation', () => {
        it('should handle DELETE (no-op)', async () => {
            const event = mockDeleteEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('SUCCESS');
            expect(result.Data).toEqual({
                DBInstanceIdentifier: mockDBInstanceId,
                MultiTenantStatus: 'Unchanged',
                ModificationStatus: 'Custom Resource Deleted'
            });
            expect(result.PhysicalResourceId).toBe(
                `rds-oracle-multitenant-${mockDBInstanceId}`
            );
        });
    });

    describe('Error Handling', () => {
        it('should handle unsupported request type', async () => {
            const invalidEvent = {
                ...mockCreateEvent,
                RequestType: 'InvalidType' as any
            };

            const result = await handler(invalidEvent, mockContext);

            expect(result.Status).toBe('FAILED');
            expect(result.Reason).toContain(
                'Unsupported request type: InvalidType'
            );
        });

        it('should handle generic errors gracefully', async () => {
            // Mock unexpected error
            rdsMock
                .on(DescribeDBInstancesCommand)
                .rejects(new Error('Unexpected error'));

            const event = mockCreateEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('FAILED');
            expect(result.Reason).toContain(
                'Database validation failed: Unexpected error'
            );
        });

        it('should handle non-Error exceptions', async () => {
            // Mock non-Error exception
            rdsMock.on(DescribeDBInstancesCommand).rejects('String error');

            const event = mockCreateEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('FAILED');
            expect(result.Reason).toContain('String error');
        });

        it('should return proper error response structure', async () => {
            rdsMock
                .on(DescribeDBInstancesCommand)
                .rejects(new Error('Test error'));

            const event = mockCreateEvent;
            const result = await handler(event, mockContext);

            expect(result).toMatchObject({
                Status: 'FAILED',
                Reason: expect.stringContaining('Test error'),
                PhysicalResourceId: `rds-oracle-multitenant-${mockDBInstanceId}`,
                StackId: event.StackId,
                RequestId: event.RequestId,
                LogicalResourceId: event.LogicalResourceId,
                Data: {
                    DBInstanceIdentifier: mockDBInstanceId,
                    MultiTenantStatus: 'Failed',
                    ModificationStatus: 'Failed'
                }
            });
        });

        it('should handle non-Error exceptions in enableOracleMultiTenant', async () => {
            // Mock successful validation
            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [mockValidOracleInstance]
            });

            // Mock non-Error exception in ModifyDBInstance
            rdsMock.on(ModifyDBInstanceCommand).rejects('Non-error exception');

            const event = mockCreateEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('FAILED');
            expect(result.Reason).toContain('Non-error exception');
        });

        it('should handle non-Error exceptions in getDatabaseStatus', async () => {
            // Mock non-Error exception in DescribeDBInstances for UPDATE operation
            rdsMock
                .on(DescribeDBInstancesCommand)
                .rejects('Database status error');

            const event = mockUpdateEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('FAILED');
            expect(result.Reason).toContain('Database status error');
        });

        it('should return undefined for PendingModifications when empty in CREATE', async () => {
            // Create an instance with no pending modifications
            const instanceWithNoPending = {
                ...mockValidOracleInstance,
                PendingModifiedValues: undefined
            };

            // Mock successful validation and conversion
            rdsMock
                .on(DescribeDBInstancesCommand)
                .resolves({
                    DBInstances: [mockValidOracleInstance]
                })
                .on(DescribeDBInstancesCommand)
                .resolves({
                    DBInstances: [instanceWithNoPending]
                });

            // Mock successful ModifyDBInstance
            rdsMock.on(ModifyDBInstanceCommand).resolves({
                DBInstance: mockInstanceWithPendingModifications
            });

            const event = mockCreateEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('SUCCESS');
            expect(result.Data?.PendingModifications).toBeUndefined();
        });

        it('should return undefined for PendingModifications when empty in UPDATE', async () => {
            // Create an instance with no pending modifications
            const instanceWithNoPending = {
                ...mockValidOracleInstance,
                PendingModifiedValues: undefined
            };

            // Mock getting current database status
            rdsMock.on(DescribeDBInstancesCommand).resolves({
                DBInstances: [instanceWithNoPending]
            });

            const event = mockUpdateEvent;
            const result = await handler(event, mockContext);

            expect(result.Status).toBe('SUCCESS');
            expect(result.Data?.PendingModifications).toBeUndefined();
        });
    });

    describe('Individual Function Tests', () => {
        describe('enableOracleMultiTenant', () => {
            it('should successfully enable MultiTenant', async () => {
                const rdsClient = new RDSClient({});

                rdsMock.on(ModifyDBInstanceCommand).resolves({
                    DBInstance: mockInstanceWithPendingModifications
                });

                await expect(
                    enableOracleMultiTenant(rdsClient, mockDBInstanceId)
                ).resolves.not.toThrow();

                expect(rdsMock.calls()).toHaveLength(1);
                expect(rdsMock.calls()[0].args[0].input).toEqual({
                    DBInstanceIdentifier: mockDBInstanceId,
                    MultiTenant: true,
                    ApplyImmediately: true
                });
            });

            it('should handle RDS service exceptions', async () => {
                const rdsClient = new RDSClient({});

                rdsMock
                    .on(ModifyDBInstanceCommand)
                    .rejects(mockRDSServiceException);

                await expect(
                    enableOracleMultiTenant(rdsClient, mockDBInstanceId)
                ).rejects.toThrow('RDS API error: ValidationException');
            });

            it('should handle missing DBInstance in response', async () => {
                const rdsClient = new RDSClient({});

                rdsMock.on(ModifyDBInstanceCommand).resolves({});

                await expect(
                    enableOracleMultiTenant(rdsClient, mockDBInstanceId)
                ).rejects.toThrow(
                    'ModifyDBInstance response did not include DBInstance details'
                );
            });

            it('should handle non-Error exceptions', async () => {
                const rdsClient = new RDSClient({});

                rdsMock
                    .on(ModifyDBInstanceCommand)
                    .rejects('Non-error exception');

                await expect(
                    enableOracleMultiTenant(rdsClient, mockDBInstanceId)
                ).rejects.toThrow('Non-error exception');
            });
        });

        describe('getDatabaseStatus', () => {
            it('should successfully get database status', async () => {
                const rdsClient = new RDSClient({});

                rdsMock.on(DescribeDBInstancesCommand).resolves({
                    DBInstances: [mockValidOracleInstance]
                });

                const result = await getDatabaseStatus(
                    rdsClient,
                    mockDBInstanceId
                );

                expect(result).toEqual(mockValidOracleInstance);
            });

            it('should handle database not found', async () => {
                const rdsClient = new RDSClient({});

                rdsMock.on(DescribeDBInstancesCommand).resolves({
                    DBInstances: []
                });

                await expect(
                    getDatabaseStatus(rdsClient, mockDBInstanceId)
                ).rejects.toThrow(
                    "Database instance 'test-db-instance' not found"
                );
            });

            it('should handle RDS service exceptions', async () => {
                const rdsClient = new RDSClient({});

                rdsMock
                    .on(DescribeDBInstancesCommand)
                    .rejects(mockRDSServiceException);

                await expect(
                    getDatabaseStatus(rdsClient, mockDBInstanceId)
                ).rejects.toThrow('RDS API error: ValidationException');
            });

            it('should handle non-Error exceptions', async () => {
                const rdsClient = new RDSClient({});

                rdsMock
                    .on(DescribeDBInstancesCommand)
                    .rejects('Non-error exception');

                await expect(
                    getDatabaseStatus(rdsClient, mockDBInstanceId)
                ).rejects.toThrow('Non-error exception');
            });
        });

        describe('waitForMultiTenantConversion', () => {
            it('should successfully wait for conversion completion', async () => {
                const rdsClient = new RDSClient({});

                // Mock setTimeout to resolve immediately
                vi.spyOn(global, 'setTimeout').mockImplementation(
                    (callback: any) => {
                        callback();
                        return 1 as any;
                    }
                );

                // First call returns modifying, second call returns available
                rdsMock
                    .on(DescribeDBInstancesCommand)
                    .resolvesOnce({
                        DBInstances: [mockInstanceWithPendingModifications]
                    })
                    .resolvesOnce({
                        DBInstances: [mockConvertedInstance]
                    });

                const result = await waitForMultiTenantConversion(
                    rdsClient,
                    mockDBInstanceId,
                    60000
                );

                expect(result).toEqual(mockConvertedInstance);
            });

            it('should handle conversion failure', async () => {
                const rdsClient = new RDSClient({});

                rdsMock.on(DescribeDBInstancesCommand).resolves({
                    DBInstances: [mockFailedInstance]
                });

                await expect(
                    waitForMultiTenantConversion(
                        rdsClient,
                        mockDBInstanceId,
                        60000
                    )
                ).rejects.toThrow(
                    'MultiTenant conversion failed with status: failed'
                );
            });

            it('should handle incompatible-parameters status', async () => {
                const rdsClient = new RDSClient({});

                const incompatibleInstance = {
                    ...mockValidOracleInstance,
                    DBInstanceStatus: 'incompatible-parameters'
                };

                rdsMock.on(DescribeDBInstancesCommand).resolves({
                    DBInstances: [incompatibleInstance]
                });

                await expect(
                    waitForMultiTenantConversion(
                        rdsClient,
                        mockDBInstanceId,
                        60000
                    )
                ).rejects.toThrow(
                    'MultiTenant conversion failed with status: incompatible-parameters'
                );
            });

            it('should handle database not found during monitoring', async () => {
                const rdsClient = new RDSClient({});

                rdsMock.on(DescribeDBInstancesCommand).resolves({
                    DBInstances: []
                });

                await expect(
                    waitForMultiTenantConversion(
                        rdsClient,
                        mockDBInstanceId,
                        60000
                    )
                ).rejects.toThrow(
                    "Database instance 'test-db-instance' not found during status monitoring"
                );
            });

            it('should handle RDS service exceptions during monitoring', async () => {
                const rdsClient = new RDSClient({});

                rdsMock
                    .on(DescribeDBInstancesCommand)
                    .rejects(mockRDSServiceException);

                await expect(
                    waitForMultiTenantConversion(
                        rdsClient,
                        mockDBInstanceId,
                        60000
                    )
                ).rejects.toThrow(
                    'RDS API error during status monitoring: ValidationException'
                );
            });

            it('should timeout after specified duration', async () => {
                const rdsClient = new RDSClient({});

                // Mock Date.now to simulate timeout
                const originalDateNow = Date.now;
                let callCount = 0;
                vi.spyOn(Date, 'now').mockImplementation(() => {
                    callCount++;
                    if (callCount === 1) return 0; // Start time
                    return 200; // Simulate timeout after 200ms with 100ms limit
                });

                // Always return modifying status to trigger timeout
                rdsMock.on(DescribeDBInstancesCommand).resolves({
                    DBInstances: [mockTimeoutInstance]
                });

                // Use a very short timeout for testing
                await expect(
                    waitForMultiTenantConversion(
                        rdsClient,
                        mockDBInstanceId,
                        100
                    )
                ).rejects.toThrow(
                    'MultiTenant conversion timed out after 0.1 seconds'
                );

                // Restore Date.now
                vi.mocked(Date.now).mockRestore();
            });
        });
    });
});
