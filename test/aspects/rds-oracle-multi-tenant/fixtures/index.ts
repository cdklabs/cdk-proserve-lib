// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceUpdateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CdkCustomResourceIsCompleteEvent
} from 'aws-lambda';
import { DBInstance } from '@aws-sdk/client-rds';
import {
    buildMockCreateEvent,
    buildMockUpdateEvent,
    buildMockDeleteEvent
} from '../../../fixtures/custom-resource';
import { IResourceProperties } from '../../../../src/aspects/rds-oracle-multi-tenant/handler/types/resource-properties';

/**
 * Mock RDS Oracle database instance identifier
 */
export const mockDbInstanceId = 'test-oracle-instance';

/**
 * Mock physical resource ID for the custom resource
 */
export const mockPhysicalResourceId = `rds-oracle-multi-tenant-${mockDbInstanceId}`;

/**
 * Resource type for RDS Oracle MultiTenant custom resource
 */
export const resourceType = 'Custom::RdsOracleMultiTenant';

/**
 * Mock resource properties for RDS Oracle MultiTenant
 */
export const mockResourceProperties: IResourceProperties = {
    DBInstanceIdentifier: mockDbInstanceId
};

/**
 * Mock RDS Oracle database instance in available state
 */
export const mockOracleInstanceAvailable: DBInstance = {
    DBInstanceIdentifier: mockDbInstanceId,
    DBInstanceStatus: 'available',
    Engine: 'oracle-se2',
    EngineVersion: '19.0.0.0.ru-2020-04.rur-2020-04.r1',
    PendingModifiedValues: {}
};

/**
 * Mock RDS Oracle database instance in modifying state
 */
export const mockOracleInstanceModifying: DBInstance = {
    DBInstanceIdentifier: mockDbInstanceId,
    DBInstanceStatus: 'modifying',
    Engine: 'oracle-se2',
    EngineVersion: '19.0.0.0.ru-2020-04.rur-2020-04.r1',
    PendingModifiedValues: {
        MultiTenant: true
    }
};

/**
 * Mock RDS Oracle database instance in failed state
 */
export const mockOracleInstanceFailed: DBInstance = {
    DBInstanceIdentifier: mockDbInstanceId,
    DBInstanceStatus: 'failed',
    Engine: 'oracle-se2',
    EngineVersion: '19.0.0.0.ru-2020-04.rur-2020-04.r1',
    PendingModifiedValues: {}
};

/**
 * Builds a mock CloudFormation Custom Resource CREATE event for RDS Oracle MultiTenant
 * @param dbInstanceId Database instance identifier (defaults to mockDbInstanceId)
 * @returns Mock CREATE event
 */
export function buildRdsMultiTenantCreateEvent(
    dbInstanceId: string = mockDbInstanceId
): CloudFormationCustomResourceCreateEvent<IResourceProperties> {
    return buildMockCreateEvent<IResourceProperties>(resourceType, {
        DBInstanceIdentifier: dbInstanceId
    });
}

/**
 * Builds a mock CloudFormation Custom Resource UPDATE event for RDS Oracle MultiTenant
 * @param dbInstanceId Database instance identifier (defaults to mockDbInstanceId)
 * @returns Mock UPDATE event
 */
export function buildRdsMultiTenantUpdateEvent(
    dbInstanceId: string = mockDbInstanceId
): CloudFormationCustomResourceUpdateEvent<IResourceProperties> {
    return buildMockUpdateEvent<IResourceProperties>(
        `rds-oracle-multi-tenant-${dbInstanceId}`,
        resourceType,
        {
            DBInstanceIdentifier: dbInstanceId
        },
        {
            DBInstanceIdentifier: dbInstanceId
        }
    );
}

/**
 * Builds a mock CloudFormation Custom Resource DELETE event for RDS Oracle MultiTenant
 * @param dbInstanceId Database instance identifier (defaults to mockDbInstanceId)
 * @returns Mock DELETE event
 */
export function buildRdsMultiTenantDeleteEvent(
    dbInstanceId: string = mockDbInstanceId
): CloudFormationCustomResourceDeleteEvent<IResourceProperties> {
    return buildMockDeleteEvent<IResourceProperties>(
        `rds-oracle-multi-tenant-${dbInstanceId}`,
        resourceType,
        {
            DBInstanceIdentifier: dbInstanceId
        }
    );
}

/**
 * Builds a mock IsComplete event for RDS Oracle MultiTenant
 * @param requestType Request type (Create, Update, or Delete)
 * @param dbInstanceId Database instance identifier (defaults to mockDbInstanceId)
 * @returns Mock IsComplete event
 */
export function buildRdsMultiTenantIsCompleteEvent(
    requestType: 'Create' | 'Update' | 'Delete',
    dbInstanceId: string = mockDbInstanceId
): CdkCustomResourceIsCompleteEvent<IResourceProperties> {
    const baseEvent = {
        ResponseURL: 'https://example.com',
        StackId: 'test-stack',
        RequestId: 'test-request',
        LogicalResourceId: 'test-resource',
        ResourceType: resourceType,
        ResourceProperties: {
            DBInstanceIdentifier: dbInstanceId
        }
    };

    switch (requestType) {
        case 'Create':
            return {
                ...baseEvent,
                RequestType: 'Create'
            } as CdkCustomResourceIsCompleteEvent<IResourceProperties>;
        case 'Update':
            return {
                ...baseEvent,
                RequestType: 'Update',
                PhysicalResourceId: `rds-oracle-multi-tenant-${dbInstanceId}`,
                OldResourceProperties: {
                    DBInstanceIdentifier: dbInstanceId
                }
            } as CdkCustomResourceIsCompleteEvent<IResourceProperties>;
        case 'Delete':
            return {
                ...baseEvent,
                RequestType: 'Delete',
                PhysicalResourceId: `rds-oracle-multi-tenant-${dbInstanceId}`
            } as CdkCustomResourceIsCompleteEvent<IResourceProperties>;
        default:
            throw new Error(`Unsupported request type: ${requestType}`);
    }
}

/**
 * Builds a mock RDS Oracle database instance with custom properties
 * @param overrides Properties to override in the mock instance
 * @returns Mock DBInstance
 */
export function buildMockOracleInstance(
    overrides: Partial<DBInstance> = {}
): DBInstance {
    return {
        ...mockOracleInstanceAvailable,
        ...overrides
    };
}
