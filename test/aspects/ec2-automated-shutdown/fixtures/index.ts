// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { CloudWatchAlarmData } from 'aws-lambda';
import {
    mockAccount,
    mockRegion,
    buildMockArn
} from '../../../fixtures/account';
import { mockContext } from '../../../fixtures/custom-resource';

/**
 * Mock instance ID for EC2
 */
export const mockInstanceId = 'i-1234567890abcdef0';

/**
 * Mock alarm name
 */
export const mockAlarmName = 'LowCPUAlarm-1';

/**
 * Mock alarm ARN
 */
export const mockAlarmArn = buildMockArn(
    'aws',
    'cloudwatch',
    `alarm:${mockAlarmName}`,
    mockRegion,
    mockAccount
);

/**
 * Mock CloudWatch Alarm event for testing Lambda handler
 */
export const mockCloudWatchEvent = {
    version: '0',
    id: 'test-id',
    'detail-type': 'CloudWatch Alarm State Change',
    source: 'aws.cloudwatch',
    account: mockAccount,
    time: '2024-02-11T00:00:00Z',
    region: mockRegion,
    resources: [mockAlarmArn],
    detail: {
        alarmName: mockAlarmName,
        state: {
            value: 'ALARM',
            reason: 'Threshold Crossed',
            reasonData: '{"triggeringDatapoints":[]}',
            timestamp: '2024-02-11T00:00:00Z'
        },
        previousState: {
            value: 'OK',
            reason: 'Threshold Crossed',
            reasonData: '{"triggeringDatapoints":[]}',
            timestamp: '2024-02-11T00:00:00Z'
        },
        configuration: {
            metrics: [
                {
                    id: 'metric1',
                    metricStat: {
                        metric: {
                            namespace: 'AWS/EC2',
                            name: 'CPUUtilization',
                            dimensions: {
                                InstanceId: mockInstanceId
                            }
                        },
                        period: 300,
                        stat: 'Average'
                    },
                    returnData: true
                }
            ]
        }
    } as CloudWatchAlarmData
};

/**
 * Mock EC2 StopInstances response
 */
export const mockEC2Response = {
    StoppingInstances: [
        {
            InstanceId: mockInstanceId,
            CurrentState: { Name: 'stopping' },
            PreviousState: { Name: 'running' }
        }
    ]
};

/**
 * Mock EC2 client for testing
 */
export const mockEC2Client = {
    stopInstances: jest.fn()
};

/**
 * Builds a CloudWatch event with a specific alarm state
 * @param state The alarm state to set
 * @returns A CloudWatch event with the specified alarm state
 */
export const buildCloudWatchEventWithState = (
    state: 'OK' | 'ALARM' | 'INSUFFICIENT_DATA'
) => ({
    ...mockCloudWatchEvent,
    detail: {
        ...mockCloudWatchEvent.detail,
        state: {
            value: state,
            reason: 'Threshold Crossed',
            reasonData: '{"triggeringDatapoints":[]}',
            timestamp: '2024-02-11T00:00:00Z'
        }
    }
});

export { mockContext };
