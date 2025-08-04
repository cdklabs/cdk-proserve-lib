// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { EntityType } from '../../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/provision/base';
import { ResourceProperties } from '../../../../../../src/constructs/opensearch-provision-domain/handler/types/resource-properties';
import {
    buildMockArn,
    buildMockCreateEvent as buildBaseMockCreateEvent,
    buildMockDeleteEvent as buildBaseMockDeleteEvent,
    buildMockUpdateEvent as buildBaseMockUpdateEvent,
    mockAccount,
    mockRegion
} from '../../../../../fixtures';

export const props: ResourceProperties = {
    AdminRoleArn: buildMockArn(
        'aws',
        'iam',
        'role/test-role',
        mockRegion,
        mockAccount
    ),
    AssetS3Uri: 's3://test-bucket/test-key.zip',
    DomainEndpoint: 'test-domain.us-east-1.es.amazonaws.com',
    DomainType: 'OpenSearch'
};

export function buildMockCreateEvent(
    additionalProps?: Partial<ResourceProperties>
) {
    return buildBaseMockCreateEvent('Custom::OpenSearchProvisionDomain', {
        ...props,
        ...additionalProps
    });
}

export function buildMockUpdateEvent(
    id: string,
    additionalProps?: Partial<ResourceProperties>,
    additionalOldProps?: Partial<ResourceProperties>
) {
    return buildBaseMockUpdateEvent(
        id,
        'Custom::OpenSearchProvisionDomain',
        {
            ...props,
            ...additionalProps
        },
        {
            ...props,
            ...additionalOldProps
        }
    );
}

export function buildMockDeleteEvent(
    id: string,
    additionalProps?: Partial<ResourceProperties>
) {
    return buildBaseMockDeleteEvent(id, 'Custom::OpenSearchProvisionDomain', {
        ...props,
        ...additionalProps
    });
}

export const existingResourceId = 'existing-physical-id';

export const expectedEntities: EntityType[] = [
    'cluster-settings',
    'ism-policies',
    'templates/component',
    'templates/index',
    'indices',
    'roles',
    'role-mappings',
    'saved-objects'
];
