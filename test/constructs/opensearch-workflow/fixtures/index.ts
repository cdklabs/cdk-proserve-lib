// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    CdkCustomResourceEvent,
    CdkCustomResourceIsCompleteEvent,
    Context
} from 'aws-lambda';
import { AwsHttpResponse } from '../../../../src/common/lambda/aws-http-client/types';
import { IResourceProperties } from '../../../../src/constructs/opensearch-workflow/handler/types/resource-properties';
import { DestructiveOperation } from '../../../../src/types/destructive-operation';

export const mockWorkflowId = 'test-workflow-id';
export const mockTemplateCreationVariables = { var1: 'value1' };
export const mockTemplateProvisionVariables = { var2: 'value2' };

const mockBaseEvent: CdkCustomResourceEvent<IResourceProperties> = {
    RequestType: 'Create',
    ServiceToken: 'token',
    ResponseURL: 'https://response-url.example.com',
    StackId: 'stack-id',
    RequestId: 'request-id',
    LogicalResourceId: 'logical-id',
    ResourceType: 'Custom::OpenSearchWorkflow',
    ResourceProperties: {
        ServiceToken: 'token',
        RoleArn: 'arn:aws:iam::123456789012:role/TestRole',
        DomainEndpoint: 'test-domain.us-west-2.es.amazonaws.com',
        AssetS3ObjectUrl: 's3://my-bucket/template.json',
        TemplateCreationVariables: mockTemplateCreationVariables,
        TemplateProvisionVariables: mockTemplateProvisionVariables,
        TemplateS3ObjectUrlVariables: {
            bucketUrl: 's3://asset-bucket/file.txt'
        }
    }
};

export const mockCreateEvent: CdkCustomResourceEvent<IResourceProperties> = {
    ...mockBaseEvent,
    RequestType: 'Create',
    ResourceProperties: {
        ...mockBaseEvent.ResourceProperties,
        AllowDestructiveOperations: DestructiveOperation.ALL
    }
};

export const mockUpdateEvent: CdkCustomResourceEvent<IResourceProperties> = {
    ...mockBaseEvent,
    RequestType: 'Update',
    PhysicalResourceId: mockWorkflowId,
    OldResourceProperties: mockCreateEvent.ResourceProperties,
    ResourceProperties: {
        ...mockCreateEvent.ResourceProperties,
        AllowDestructiveOperations: DestructiveOperation.ALL
    }
};

export const mockDeleteEvent: CdkCustomResourceEvent<IResourceProperties> = {
    ...mockBaseEvent,
    RequestType: 'Delete',
    PhysicalResourceId: mockWorkflowId,
    ResourceProperties: {
        ...mockCreateEvent.ResourceProperties,
        AllowDestructiveOperations: DestructiveOperation.ALL
    }
};

export const mockUpdateNoDestructiveEvent: CdkCustomResourceEvent<IResourceProperties> =
    {
        ...mockBaseEvent,
        RequestType: 'Update',
        PhysicalResourceId: mockWorkflowId,
        OldResourceProperties: mockCreateEvent.ResourceProperties
    };

export const mockDeleteNoDestructiveEvent: CdkCustomResourceEvent<IResourceProperties> =
    {
        ...mockBaseEvent,
        RequestType: 'Delete',
        PhysicalResourceId: mockWorkflowId
    };

export const mockCreateCompleteEvent: CdkCustomResourceIsCompleteEvent<IResourceProperties> =
    {
        RequestType: 'Create',
        ServiceToken: 'token',
        ResponseURL: 'https://response-url.example.com',
        StackId: 'stack-id',
        RequestId: 'request-id',
        LogicalResourceId: 'logical-id',
        ResourceType: 'Custom::OpenSearchWorkflow',
        PhysicalResourceId: mockWorkflowId,
        ResourceProperties: {
            ...mockBaseEvent.ResourceProperties,
            AllowDestructiveOperations: DestructiveOperation.ALL
        }
    };

export const mockCreateProvisioningEvent: CdkCustomResourceIsCompleteEvent<IResourceProperties> =
    {
        ...mockCreateCompleteEvent,
        PhysicalResourceId: mockWorkflowId
    };

export const mockContext = {} as Context;

export function createMockResponse<T>(data: T): AwsHttpResponse<T> {
    return {
        data,
        headers: {},
        rawBody: JSON.stringify(data)
    };
}
