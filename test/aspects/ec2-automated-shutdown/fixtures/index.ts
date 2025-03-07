// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CloudWatchAlarmEvent } from 'aws-lambda';
import {
    mockAccount,
    mockRegion,
    buildMockArn
} from '../../../fixtures/account';
import { StopInstancesCommandOutput } from '@aws-sdk/client-ec2';

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
export const mockCloudWatchEvent: CloudWatchAlarmEvent = {
    source: 'aws.cloudwatch',
    accountId: mockAccount,
    time: '2024-02-11T00:00:00Z',
    region: mockRegion,
    alarmArn: mockAlarmArn,
    alarmData: {
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
    }
};

/**
 * Mock EC2 StopInstances response
 */
export const mockEC2Response: StopInstancesCommandOutput = {
    StoppingInstances: [
        {
            InstanceId: mockInstanceId,
            CurrentState: { Name: 'stopping' },
            PreviousState: { Name: 'running' }
        }
    ],
    $metadata: {}
};

/**
 * Builds a CloudWatch event with a specific alarm state
 * @param state The alarm state to set
 * @returns A CloudWatch event with the specified alarm state
 */
export function buildCloudWatchEventWithState(
    state: 'OK' | 'ALARM' | 'INSUFFICIENT_DATA'
): CloudWatchAlarmEvent {
    return {
        source: 'aws.cloudwatch',
        accountId: mockAccount,
        time: '2024-02-11T00:00:00Z',
        region: mockRegion,
        alarmArn: mockAlarmArn,
        alarmData: {
            alarmName: mockAlarmName,
            state: {
                value: state,
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
        }
    };
}
