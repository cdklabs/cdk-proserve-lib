// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    CdkCustomResourceEvent,
    CdkCustomResourceIsCompleteEvent,
    Context
} from 'aws-lambda';
import { HttpClientResponse } from '../../../../src/common/lambda/http-client/types';
import { IResourceProperties } from '../../../../src/constructs/opensearch-workflow/handler/types/resource-properties';
import { DestructiveOperation } from '../../../../src/types/destructive-operation';
import {
    buildMockCreateEvent,
    buildMockUpdateEvent,
    buildMockDeleteEvent
} from '../../../fixtures/custom-resource';

export const mockWorkflowId = 'test-workflow-id';
export const mockTemplateCreationVariables = { var1: 'value1' };
export const mockTemplateProvisionVariables = { var2: 'value2' };
export const resourceType = 'Custom::OpenSearchWorkflow';

const resourceProps: IResourceProperties = {
    RoleArn: 'arn:aws:iam::123456789012:role/TestRole',
    DomainEndpoint: 'test-domain.us-west-2.es.amazonaws.com',
    AssetS3ObjectUrl: 's3://my-bucket/template.json',
    TemplateCreationVariables: mockTemplateCreationVariables,
    TemplateProvisionVariables: mockTemplateProvisionVariables,
    TemplateS3ObjectUrlVariables: {
        bucketUrl: 's3://asset-bucket/file.txt'
    }
};

export const mockCreateEvent: CdkCustomResourceEvent<IResourceProperties> =
    buildMockCreateEvent(resourceType, {
        ...resourceProps,
        AllowDestructiveOperations: DestructiveOperation.ALL
    });

export const mockUpdateEvent: CdkCustomResourceEvent<IResourceProperties> =
    buildMockUpdateEvent(
        mockWorkflowId,
        resourceType,
        {
            ...resourceProps,
            AllowDestructiveOperations: DestructiveOperation.ALL
        },
        {
            ...resourceProps,
            AllowDestructiveOperations: DestructiveOperation.ALL
        }
    );

export const mockDeleteEvent: CdkCustomResourceEvent<IResourceProperties> =
    buildMockDeleteEvent(mockWorkflowId, resourceType, {
        ...resourceProps,
        AllowDestructiveOperations: DestructiveOperation.ALL
    });

export const mockUpdateNoDestructiveEvent: CdkCustomResourceEvent<IResourceProperties> =
    buildMockUpdateEvent(
        mockWorkflowId,
        resourceType,
        resourceProps,
        resourceProps
    );

export const mockDeleteNoDestructiveEvent: CdkCustomResourceEvent<IResourceProperties> =
    buildMockDeleteEvent(mockWorkflowId, resourceType, resourceProps);

export const mockCreateCompleteEvent: CdkCustomResourceIsCompleteEvent<IResourceProperties> =
    {
        ...mockCreateEvent,
        PhysicalResourceId: mockWorkflowId
    };

export const mockContext = {} as Context;

export function createMockResponse<T>(data: T): HttpClientResponse<T> {
    return {
        data,
        headers: {},
        rawBody: JSON.stringify(data)
    };
}
