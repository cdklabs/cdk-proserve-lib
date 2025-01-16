// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceUpdateEvent
} from 'aws-lambda';
import { ResourceProperties } from '../../../../src/constructs/friendly-embrace/handler/types/resource-properties';
import {
    buildMockCreateEvent,
    buildMockDeleteEvent,
    buildMockUpdateEvent
} from '../../../fixtures';

/**
 * Custom resource type used in AWS CloudFormation
 */
export const resourceType = 'Custom::FriendlyEmbrace';

/**
 * Mock stack name used in AWS CloudFormation
 */
export const mockStackName = 'test-stack';

/**
 * Mock resource properties for all custom resource invocation scenarios
 */
export const mockResourceProperties: ResourceProperties = {
    stackNames: [mockStackName],
    timestamp: new Date('2023-01-02T00:00:00.000Z').toISOString()
};

/**
 * Mock response physical ID
 */
const physicalId = 'physical-id-not-used';

/**
 * Mock CREATE event for the custom resource
 */
export const mockCreateEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
    buildMockCreateEvent(resourceType, mockResourceProperties);

/**
 * Mock UPDATE event for the custom resource
 */
export const mockUpdateEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
    buildMockUpdateEvent(
        physicalId,
        resourceType,
        {
            stackNames: [mockStackName],
            timestamp: new Date('2023-01-03T00:00:00.000Z').toISOString()
        },
        mockResourceProperties
    );

/**
 * Mock ROLLBACK event for the custom resource to simulate if the CR were to
 * rollback.
 */
export const mockRollbackEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
    buildMockUpdateEvent(
        physicalId,
        resourceType,
        {
            stackNames: [mockStackName],
            timestamp: new Date('2023-01-01T00:00:00.000Z').toISOString()
        },
        mockResourceProperties
    );

/**
 * Mock DELETE event for the custom resource
 */
export const mockDeleteEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
    buildMockDeleteEvent(physicalId, resourceType, mockResourceProperties);
