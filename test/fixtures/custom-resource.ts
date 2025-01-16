// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceUpdateEvent,
    Context
} from 'aws-lambda';
import { buildMockArn, mockAccount, mockRegion } from './account';

/**
 * Mock AWS CloudFormation Stack ARN
 */
export const mockStackArn = buildMockArn(
    'aws',
    'cloudformation',
    'stack/test-stack/test-stack-hash',
    mockRegion,
    mockAccount
);

/**
 * Mock Service Token for a Custom Resource (AWS Lambda function ARN)
 */
export const mockServiceToken = buildMockArn(
    'aws',
    'lambda',
    'function:test-function',
    mockRegion,
    mockAccount
);

/**
 * Mock AWS Lambda Context for a function invocation
 */
export const mockContext: Context = {
    awsRequestId: 'test-request-id',
    callbackWaitsForEmptyEventLoop: true,
    functionName: 'test-function',
    functionVersion: '1',
    getRemainingTimeInMillis: () => {
        return 0;
    },
    invokedFunctionArn: mockServiceToken,
    logGroupName: 'test-log-group',
    logStreamName: 'test-log-stream',
    memoryLimitInMB: '512',
    done: (_error, _result) => {},
    fail: (_error) => {},
    succeed: (_messageOrObject: unknown) => {}
};

/**
 * Mock AWS CloudFormation Custom Resource CREATE event
 * Should not use this directly but rather the builder function
 */
const baseMockCreateEvent: CloudFormationCustomResourceCreateEvent<{}> = {
    LogicalResourceId: 'test-logical-resource-id',
    RequestId: 'test-request-id',
    RequestType: 'Create',
    ResourceProperties: {
        ServiceToken: mockServiceToken
    },
    ResourceType: 'Custom::Unknown',
    ResponseURL: 'test-response-url',
    ServiceToken: mockServiceToken,
    StackId: mockStackArn
};

/**
 * Mock AWS CloudFormation Custom Resource UPDATE event
 * Should not use this directly but rather the builder function
 */
const baseMockUpdateEvent: CloudFormationCustomResourceUpdateEvent<{}> = {
    LogicalResourceId: 'test-logical-resource-id',
    OldResourceProperties: {},
    PhysicalResourceId: 'test-physical-resource-id',
    RequestId: 'test-request-id',
    RequestType: 'Update',
    ResourceProperties: {
        ServiceToken: mockServiceToken
    },
    ResourceType: 'Custom::Unknown',
    ResponseURL: 'test-response-url',
    ServiceToken: mockServiceToken,
    StackId: mockStackArn
};

/**
 * Mock AWS CloudFormation Custom Resource DELETE event
 * Should not use this directly but rather the builder function
 */
const baseMockDeleteEvent: CloudFormationCustomResourceDeleteEvent<{}> = {
    LogicalResourceId: 'test-logical-resource-id',
    PhysicalResourceId: 'test-physical-resource-id',
    RequestId: 'test-request-id',
    RequestType: 'Delete',
    ResourceProperties: {
        ServiceToken: mockServiceToken
    },
    ResourceType: 'Custom::Unknown',
    ResponseURL: 'test-response-url',
    ServiceToken: mockServiceToken,
    StackId: mockStackArn
};

/**
 * Builds a mock AWS CloudFormation Custom Resource CREATE event
 * @param resourceType Identifier for the resource (e.g. Custom::MyResource)
 * @param props Resource properties (not including the ServiceToken unless you want to set it specifically)
 * @returns Mock AWS CloudFormation Custom Resource CREATE event
 *
 * @template TProps Type for the resource properties interface
 */
export function buildMockCreateEvent<TProps>(
    resourceType: string,
    props: TProps
): CloudFormationCustomResourceCreateEvent<TProps> {
    return {
        ...baseMockCreateEvent,
        ResourceType: resourceType,
        ResourceProperties: {
            ServiceToken: baseMockCreateEvent.ServiceToken,
            ...props
        }
    };
}

/**
 * Builds a mock AWS CloudFormation Custom Resource UPDATE event
 * @param physicalResourceId The physical resource ID known to CloudFormation from creation
 * @param resourceType Identifier for the resource (e.g. Custom::MyResource)
 * @param props Resource properties (not including the ServiceToken unless you want to set it specifically)
 * @param oldProps Resource properties (not including the ServiceToken unless you want to set it specifically) from previous invocation
 * @returns Mock AWS CloudFormation Custom Resource UPDATE event
 *
 * @template TProps Type for the resource properties interface
 * @template TOldProps Type for the old resource properties interface
 */
export function buildMockUpdateEvent<TProps, TOldProps = TProps>(
    physicalResourceId: string,
    resourceType: string,
    props: TProps,
    oldProps: TOldProps
): CloudFormationCustomResourceUpdateEvent<TProps, TOldProps> {
    return {
        ...baseMockUpdateEvent,
        OldResourceProperties: {
            ServiceToken: baseMockUpdateEvent.ServiceToken,
            ...oldProps
        },
        PhysicalResourceId: physicalResourceId,
        ResourceType: resourceType,
        ResourceProperties: {
            ServiceToken: baseMockUpdateEvent.ServiceToken,
            ...props
        }
    };
}

/**
 * Builds a mock AWS CloudFormation Custom Resource DELETE event
 * @param physicalResourceId The physical resource ID known to CloudFormation from creation
 * @param resourceType Identifier for the resource (e.g. Custom::MyResource)
 * @param props Resource properties (not including the ServiceToken unless you want to set it specifically)
 * @returns Mock AWS CloudFormation Custom Resource DELETE event
 *
 * @template TProps Type for the resource properties interface
 */
export function buildMockDeleteEvent<TProps>(
    physicalResourceId: string,
    resourceType: string,
    props: TProps
): CloudFormationCustomResourceDeleteEvent<TProps> {
    return {
        ...baseMockDeleteEvent,
        PhysicalResourceId: physicalResourceId,
        ResourceType: resourceType,
        ResourceProperties: {
            ServiceToken: baseMockDeleteEvent.ServiceToken,
            ...props
        }
    };
}
