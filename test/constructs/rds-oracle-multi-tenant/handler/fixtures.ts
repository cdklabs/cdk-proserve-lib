// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DBInstance, RDSServiceException } from '@aws-sdk/client-rds';
import {
    CdkCustomResourceEvent,
    CdkCustomResourceIsCompleteEvent,
    Context
} from 'aws-lambda';
import {
    ConversionStatus,
    IConversionState
} from '../../../../src/constructs/rds-oracle-multi-tenant/handler/types/conversion-status';
import { IResourceProperties } from '../../../../src/constructs/rds-oracle-multi-tenant/handler/types/resource-properties';
import { IResponseData } from '../../../../src/constructs/rds-oracle-multi-tenant/handler/types/resource-response';
import {
    buildMockCreateEvent,
    buildMockUpdateEvent,
    buildMockDeleteEvent,
    mockContext
} from '../../../fixtures';

/**
 * Mock database instance identifier
 */
export const mockDBInstanceId = 'test-db-instance';

/**
 * Mock resource properties for RDS Oracle MultiTenant
 */
export const mockResourceProperties: IResourceProperties = {
    DBInstanceIdentifier: mockDBInstanceId
};

/**
 * Mock physical resource ID for tracking operations
 */
export const mockPhysicalResourceId = `rds-oracle-multi-tenant-${mockDBInstanceId}`;

/**
 * Mock Lambda context for handler testing
 */
export { mockContext };

// =============================================================================
// Legacy Type Compatibility
// =============================================================================

/**
 * Legacy ResourceProperties type for backward compatibility
 * @deprecated Use IResourceProperties instead
 */
export type ResourceProperties = IResourceProperties;

/**
 * Mock valid Oracle database instance (Enterprise Edition, 19c, available)
 */
export const mockValidOracleInstance: DBInstance = {
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

/**
 * Mock Oracle database instance with invalid engine (MySQL)
 */
export const mockInvalidEngineInstance: DBInstance = {
    ...mockValidOracleInstance,
    Engine: 'mysql',
    EngineVersion: '8.0.35'
};

/**
 * Mock Oracle database instance with old version (12c)
 */
export const mockOldVersionInstance: DBInstance = {
    ...mockValidOracleInstance,
    EngineVersion: '12.2.0.1.ru-2023-01.rur-2023-01.r1'
};

/**
 * Mock Oracle database instance with Standard Edition
 */
export const mockStandardEditionInstance: DBInstance = {
    ...mockValidOracleInstance,
    Engine: 'oracle-se2',
    LicenseModel: 'license-included'
};

/**
 * Mock Oracle database instance in unavailable state
 */
export const mockUnavailableInstance: DBInstance = {
    ...mockValidOracleInstance,
    DBInstanceStatus: 'modifying'
};

/**
 * Mock Oracle database instance with pending modifications
 */
export const mockInstanceWithPendingModifications: DBInstance = {
    ...mockValidOracleInstance,
    DBInstanceStatus: 'modifying',
    PendingModifiedValues: {
        MultiTenant: true
    }
};

/**
 * Mock Oracle database instance after successful MultiTenant conversion
 */
export const mockConvertedInstance: DBInstance = {
    ...mockValidOracleInstance,
    DBInstanceStatus: 'available',
    PendingModifiedValues: {}
};

/**
 * Mock Oracle database instance in failed state
 */
export const mockFailedInstance: DBInstance = {
    ...mockValidOracleInstance,
    DBInstanceStatus: 'failed'
};

/**
 * Resource type for RDS Oracle MultiTenant custom resource
 */
export const resourceType = 'Custom::RdsOracleMultiTenant';

// =============================================================================
// OnEvent Handler Events
// =============================================================================

/**
 * Mock CREATE event for OnEvent handler
 */
export const mockOnEventCreateEvent: CdkCustomResourceEvent<IResourceProperties> =
    buildMockCreateEvent(resourceType, mockResourceProperties);

/**
 * Mock UPDATE event for OnEvent handler
 */
export const mockOnEventUpdateEvent: CdkCustomResourceEvent<IResourceProperties> =
    buildMockUpdateEvent(
        mockPhysicalResourceId,
        resourceType,
        mockResourceProperties,
        mockResourceProperties
    );

/**
 * Mock UPDATE event with different DB instance identifier for OnEvent handler
 */
export const mockOnEventUpdateEventWithDifferentId: CdkCustomResourceEvent<IResourceProperties> =
    buildMockUpdateEvent(
        mockPhysicalResourceId,
        resourceType,
        { DBInstanceIdentifier: 'new-db-instance' },
        mockResourceProperties
    );

/**
 * Mock DELETE event for OnEvent handler
 */
export const mockOnEventDeleteEvent: CdkCustomResourceEvent<IResourceProperties> =
    buildMockDeleteEvent(
        mockPhysicalResourceId,
        resourceType,
        mockResourceProperties
    );

// =============================================================================
// IsComplete Handler Events
// =============================================================================

/**
 * Mock CREATE IsComplete event
 */
export const mockIsCompleteCreateEvent: CdkCustomResourceIsCompleteEvent<IResourceProperties> =
    {
        ...mockOnEventCreateEvent,
        PhysicalResourceId: mockPhysicalResourceId
    };

/**
 * Mock UPDATE IsComplete event
 */
export const mockIsCompleteUpdateEvent: CdkCustomResourceIsCompleteEvent<IResourceProperties> =
    {
        ...mockOnEventUpdateEvent,
        PhysicalResourceId: mockPhysicalResourceId
    };

/**
 * Mock DELETE IsComplete event
 */
export const mockIsCompleteDeleteEvent: CdkCustomResourceIsCompleteEvent<IResourceProperties> =
    {
        ...mockOnEventDeleteEvent,
        PhysicalResourceId: mockPhysicalResourceId
    };

// =============================================================================
// Legacy Events (for backward compatibility with existing tests)
// =============================================================================

/**
 * Mock CREATE event for RDS Oracle MultiTenant (legacy)
 * @deprecated Use mockOnEventCreateEvent instead
 */
export const mockCreateEvent = mockOnEventCreateEvent;

/**
 * Mock UPDATE event for RDS Oracle MultiTenant (legacy)
 * @deprecated Use mockOnEventUpdateEvent instead
 */
export const mockUpdateEvent = mockOnEventUpdateEvent;

/**
 * Mock UPDATE event with different DB instance identifier (legacy)
 * @deprecated Use mockOnEventUpdateEventWithDifferentId instead
 */
export const mockUpdateEventWithDifferentId =
    mockOnEventUpdateEventWithDifferentId;

/**
 * Mock DELETE event for RDS Oracle MultiTenant (legacy)
 * @deprecated Use mockOnEventDeleteEvent instead
 */
export const mockDeleteEvent = mockOnEventDeleteEvent;

/**
 * Mock RDS Service Exception
 */
export const mockRDSServiceException = new RDSServiceException({
    name: 'ValidationException',
    message: 'RDS Service Exception',
    $fault: 'client',
    $metadata: {}
});

/**
 * Mock timeout scenario - instance that never becomes available
 */
export const mockTimeoutInstance: DBInstance = {
    ...mockValidOracleInstance,
    DBInstanceStatus: 'modifying',
    PendingModifiedValues: {
        MultiTenant: true
    }
};

// =============================================================================
// Conversion State Fixtures
// =============================================================================

/**
 * Mock conversion state for not started conversion
 */
export const mockNotStartedConversionState: IConversionState = {
    status: ConversionStatus.NOT_STARTED,
    dbInstanceStatus: 'available',
    hasPendingModifications: false,
    pendingModifications: {}
};

/**
 * Mock conversion state for in-progress conversion
 */
export const mockInProgressConversionState: IConversionState = {
    status: ConversionStatus.IN_PROGRESS,
    dbInstanceStatus: 'modifying',
    hasPendingModifications: true,
    pendingModifications: {
        MultiTenant: true
    }
};

/**
 * Mock conversion state for completed conversion
 */
export const mockCompletedConversionState: IConversionState = {
    status: ConversionStatus.COMPLETED,
    dbInstanceStatus: 'available',
    hasPendingModifications: false,
    pendingModifications: {}
};

/**
 * Mock conversion state for failed conversion
 */
export const mockFailedConversionState: IConversionState = {
    status: ConversionStatus.FAILED,
    dbInstanceStatus: 'failed',
    hasPendingModifications: false,
    pendingModifications: {},
    errorMessage: 'MultiTenant conversion failed with database status: failed'
};

/**
 * Mock conversion state for incompatible parameters failure
 */
export const mockIncompatibleParametersConversionState: IConversionState = {
    status: ConversionStatus.FAILED,
    dbInstanceStatus: 'incompatible-parameters',
    hasPendingModifications: false,
    pendingModifications: {},
    errorMessage:
        'MultiTenant conversion failed with database status: incompatible-parameters'
};

// =============================================================================
// Response Data Fixtures
// =============================================================================

/**
 * Mock response data for completed conversion
 */
export const mockCompletedResponseData: IResponseData = {
    DBInstanceIdentifier: mockDBInstanceId,
    MultiTenantStatus: ConversionStatus.COMPLETED,
    ModificationStatus: 'available',
    PendingModifications: undefined
};

/**
 * Mock response data for in-progress conversion
 */
export const mockInProgressResponseData: IResponseData = {
    DBInstanceIdentifier: mockDBInstanceId,
    MultiTenantStatus: ConversionStatus.IN_PROGRESS,
    ModificationStatus: 'modifying',
    PendingModifications: JSON.stringify({ MultiTenant: true })
};

/**
 * Mock response data for UPDATE operation (current state)
 */
export const mockUpdateResponseData: IResponseData = {
    DBInstanceIdentifier: mockDBInstanceId,
    MultiTenantStatus: ConversionStatus.COMPLETED,
    ModificationStatus: 'available',
    PendingModifications: undefined
};

// =============================================================================
// Additional Database Instance Scenarios
// =============================================================================

/**
 * Mock Oracle database instance with null pending modifications
 */
export const mockInstanceWithNullPendingModifications: DBInstance = {
    ...mockValidOracleInstance,
    DBInstanceStatus: 'available',
    PendingModifiedValues: null as any
};

/**
 * Mock Oracle database instance with undefined status
 */
export const mockInstanceWithUndefinedStatus: DBInstance = {
    ...mockValidOracleInstance,
    DBInstanceStatus: undefined as any,
    PendingModifiedValues: {}
};

/**
 * Mock Oracle database instance in creating state
 */
export const mockCreatingInstance: DBInstance = {
    ...mockValidOracleInstance,
    DBInstanceStatus: 'creating'
};

/**
 * Mock Oracle database instance in backing-up state
 */
export const mockBackingUpInstance: DBInstance = {
    ...mockValidOracleInstance,
    DBInstanceStatus: 'backing-up'
};

/**
 * Mock Oracle database instance in maintenance state
 */
export const mockMaintenanceInstance: DBInstance = {
    ...mockValidOracleInstance,
    DBInstanceStatus: 'maintenance'
};

/**
 * Mock Oracle database instance with complex pending modifications
 */
export const mockInstanceWithComplexPendingModifications: DBInstance = {
    ...mockValidOracleInstance,
    DBInstanceStatus: 'modifying',
    PendingModifiedValues: {
        MultiTenant: true,
        DBInstanceClass: 'db.t3.large',
        AllocatedStorage: 100,
        BackupRetentionPeriod: 7
    }
};

// =============================================================================
// Event Builder Helpers
// =============================================================================

/**
 * Creates a mock OnEvent CREATE event with custom properties
 */
export function createMockOnEventCreateEvent(
    resourceProperties: IResourceProperties = mockResourceProperties
): CdkCustomResourceEvent<IResourceProperties> {
    return buildMockCreateEvent(resourceType, resourceProperties);
}

/**
 * Creates a mock OnEvent UPDATE event with custom properties
 */
export function createMockOnEventUpdateEvent(
    physicalResourceId: string = mockPhysicalResourceId,
    resourceProperties: IResourceProperties = mockResourceProperties,
    oldResourceProperties: IResourceProperties = mockResourceProperties
): CdkCustomResourceEvent<IResourceProperties> {
    return buildMockUpdateEvent(
        physicalResourceId,
        resourceType,
        resourceProperties,
        oldResourceProperties
    );
}

/**
 * Creates a mock OnEvent DELETE event with custom properties
 */
export function createMockOnEventDeleteEvent(
    physicalResourceId: string = mockPhysicalResourceId,
    resourceProperties: IResourceProperties = mockResourceProperties
): CdkCustomResourceEvent<IResourceProperties> {
    return buildMockDeleteEvent(
        physicalResourceId,
        resourceType,
        resourceProperties
    );
}

/**
 * Creates a mock IsComplete event with custom properties
 */
export function createMockIsCompleteEvent(
    requestType: 'Create' | 'Update' | 'Delete',
    physicalResourceId: string = mockPhysicalResourceId,
    resourceProperties: IResourceProperties = mockResourceProperties
): CdkCustomResourceIsCompleteEvent<IResourceProperties> {
    const baseEvent = (() => {
        switch (requestType) {
            case 'Create':
                return mockOnEventCreateEvent;
            case 'Update':
                return mockOnEventUpdateEvent;
            case 'Delete':
                return mockOnEventDeleteEvent;
            default:
                throw new Error(`Unsupported request type: ${requestType}`);
        }
    })();

    return {
        ...baseEvent,
        PhysicalResourceId: physicalResourceId,
        ResourceProperties: {
            ...baseEvent.ResourceProperties,
            ...resourceProperties
        }
    };
}
