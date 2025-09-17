// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DBInstance, RDSServiceException } from '@aws-sdk/client-rds';
import { ResourceProperties } from '../../../../src/constructs/rds-oracle-multi-tenant/handler';
import {
    buildMockCreateEvent,
    buildMockUpdateEvent,
    buildMockDeleteEvent
} from '../../../fixtures';

/**
 * Mock database instance identifier
 */
export const mockDBInstanceId = 'test-db-instance';

/**
 * Mock resource properties for RDS Oracle MultiTenant
 */
export const mockResourceProperties: ResourceProperties = {
    DBInstanceIdentifier: mockDBInstanceId
};

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
 * Mock CREATE event for RDS Oracle MultiTenant
 */
export const mockCreateEvent = buildMockCreateEvent(
    'Custom::RdsOracleMultiTenant',
    mockResourceProperties
);

/**
 * Mock UPDATE event for RDS Oracle MultiTenant
 */
export const mockUpdateEvent = buildMockUpdateEvent(
    `rds-oracle-multitenant-${mockDBInstanceId}`,
    'Custom::RdsOracleMultiTenant',
    mockResourceProperties,
    mockResourceProperties
);

/**
 * Mock UPDATE event with different DB instance identifier
 */
export const mockUpdateEventWithDifferentId = buildMockUpdateEvent(
    `rds-oracle-multitenant-${mockDBInstanceId}`,
    'Custom::RdsOracleMultiTenant',
    { DBInstanceIdentifier: 'new-db-instance' },
    mockResourceProperties
);

/**
 * Mock DELETE event for RDS Oracle MultiTenant
 */
export const mockDeleteEvent = buildMockDeleteEvent(
    `rds-oracle-multitenant-${mockDBInstanceId}`,
    'Custom::RdsOracleMultiTenant',
    mockResourceProperties
);

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
