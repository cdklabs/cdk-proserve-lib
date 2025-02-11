// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Context } from 'aws-lambda';
import { EC2Client, StopInstancesCommand } from '@aws-sdk/client-ec2';

interface CloudWatchAlarmEventDetail {
    alarmName: string;
    state: {
        value: string;
        reason: string;
        reasonData: string;
        timestamp: string;
    };
    previousState: {
        value: string;
        reason: string;
        reasonData: string;
        timestamp: string;
    };
    configuration: {
        description: string;
        metrics: Array<{
            id: string;
            metricStat: {
                metric: {
                    dimensions: Array<{
                        name: string;
                        value: string;
                    }>;
                };
            };
        }>;
    };
}

interface CloudWatchEvent {
    version: string;
    id: string;
    'detail-type': string;
    source: string;
    account: string;
    time: string;
    region: string;
    resources: string[];
    detail: CloudWatchAlarmEventDetail;
}

/**
 * Processes CloudWatch Alarm events to shut down EC2 instances
 * when CPU utilization falls below the specified threshold
 */
export const handler = async (
    event: CloudWatchEvent,
    _context: Context
): Promise<void> => {
    try {
        console.info('Received event:', JSON.stringify(event, null, 2));

        // Check if the alarm is in ALARM state
        if (event.detail.state.value !== 'ALARM') {
            console.info('Not in ALARM state, skipping');
            return;
        }

        // Extract instance ID from alarm name
        const alarmName = event.detail.alarmName;
        const match = alarmName.match(/LowCPUUtilizationAlarm-(.*)/);
        
        if (!match || !match[1]) {
            throw new Error('Instance ID not found in alarm name');
        }

        const instanceId = match[1];
        console.info(`Attempting to stop EC2 instance: ${instanceId}`);

        const ec2Client = new EC2Client({});

        // Stop the EC2 instance
        const response = await ec2Client.send(new StopInstancesCommand({
            InstanceIds: [instanceId]
        }));

        console.info('Stop instance response:', JSON.stringify(response, null, 2));
        console.info(`Successfully initiated shutdown for instance: ${instanceId}`);

    } catch (error) {
        console.error('Error in lambda handler:', error);
        throw error;
    }
};
