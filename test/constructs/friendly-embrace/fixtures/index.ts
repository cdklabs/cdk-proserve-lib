/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

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
 * Mock CREATE event for the custom resource
 */
export const mockCreateEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
    buildMockCreateEvent(resourceType, mockResourceProperties);

/**
 * Mock UPDATE event for the custom resource
 */
export const mockUpdateEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
    buildMockUpdateEvent(
        'unused',
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
        'unused',
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
    buildMockDeleteEvent('unused', resourceType, mockResourceProperties);
