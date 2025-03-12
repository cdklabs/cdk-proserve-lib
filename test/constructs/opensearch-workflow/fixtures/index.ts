import { CdkCustomResourceEvent, Context } from 'aws-lambda';
import { DestructiveOperation } from '../../../../src/types';
import { IResourceProperties } from '../../../../src/constructs/opensearch-workflow/handler/types/resource-properties';
import { AwsHttpResponse } from '../../../../src/common/lambda/aws-http-client';

export const mockWorkflowId = 'test-workflow-id';

export const mockCreateEvent: CdkCustomResourceEvent<IResourceProperties> = {
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
        TemplateCreationVariables: { var1: 'value1' },
        TemplateProvisionVariables: { var2: 'value2' },
        TemplateS3ObjectUrlVariables: {
            bucketUrl: 's3://asset-bucket/file.txt'
        },
        AllowDestructiveOperations: DestructiveOperation.ALL
    }
};

export const mockUpdateEvent: CdkCustomResourceEvent<IResourceProperties> = {
    ...mockCreateEvent,
    RequestType: 'Update',
    PhysicalResourceId: mockWorkflowId,
    OldResourceProperties: mockCreateEvent.ResourceProperties
};

export const mockUpdateNoDestructiveEvent: CdkCustomResourceEvent<IResourceProperties> =
    {
        ...mockUpdateEvent,
        ResourceProperties: {
            ...mockUpdateEvent.ResourceProperties
        }
    };

export const mockDeleteEvent: CdkCustomResourceEvent<IResourceProperties> = {
    ...mockCreateEvent,
    RequestType: 'Delete',
    PhysicalResourceId: mockWorkflowId
};

export const mockDeleteNoDestructiveEvent: CdkCustomResourceEvent<IResourceProperties> =
    {
        ...mockDeleteEvent,
        ResourceProperties: {
            ...mockDeleteEvent.ResourceProperties
        }
    };

export const mockContext: Context = {
    callbackWaitsForEmptyEventLoop: true,
    functionName: 'test-function',
    functionVersion: '1',
    invokedFunctionArn:
        'arn:aws:lambda:us-west-2:123456789012:function:test-function',
    memoryLimitInMB: '128',
    awsRequestId: 'request-id',
    logGroupName: 'log-group',
    logStreamName: 'log-stream',
    getRemainingTimeInMillis: () => 1000,
    done: () => {},
    fail: () => {},
    succeed: () => {}
};

export function createMockResponse<T>(data: T): AwsHttpResponse<T> {
    return {
        data,
        headers: {},
        rawBody: JSON.stringify(data)
    };
}
