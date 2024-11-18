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
import { ResourceProperties } from '../../../../src/constructs/opensearch-admin-user/handler/types/resource-properties';
import {
    buildMockArn,
    buildMockCreateEvent,
    buildMockDeleteEvent,
    buildMockUpdateEvent,
    mockAccount,
    mockRegion
} from '../../../fixtures';

/**
 * Mock Amazon OpenSearch domain name
 */
export const mockDomainName = 'test-domain';

/**
 * Mock AWS Systems Manager Parameter Store parameter name for the username parameter
 */
export const mockUserParameterName = '/test/username';

/**
 * Mock value for the username
 */
export const mockUsernameValue = 'test-username-value';

/**
 * Mock AWS Systems Manager Parameter Store parameter name for the password parameter
 */
export const mockPasswordParameterName = '/test/password';

/**
 * Mock AWS Secrets Manager ARN for the password secret
 */
export const mockPasswordSecretArn = buildMockArn(
    'aws',
    'secretsmanager',
    'secret:TestSecret-ABC123',
    mockRegion,
    mockAccount
);

/**
 * Mock value for the password
 */
export const mockPasswordValue = 'test-password-value';

/**
 * Custom resource type used in AWS CloudFormation
 */
export const resourceType = 'Custom::OpenSearchAdminUser';

/**
 * Mock resource properties for all custom resource invocation scenarios
 */
export const mockResourceProperties: ResourceProperties = {
    DomainName: mockDomainName,
    UsernameParameterName: mockUserParameterName
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
    buildMockUpdateEvent(mockDomainName, resourceType, mockResourceProperties, {
        DomainName: `${mockDomainName}-old`,
        UsernameParameterName: `${mockUserParameterName}old`
    });

/**
 * Mock DELETE event for the custom resource
 */
export const mockDeleteEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
    buildMockDeleteEvent(mockDomainName, resourceType, mockResourceProperties);
