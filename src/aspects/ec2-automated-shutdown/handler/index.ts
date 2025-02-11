<<<<<<< HEAD
import { Context, CloudWatchAlarmData } from 'aws-lambda';
import { EC2, StopInstancesCommandOutput } from '@aws-sdk/client-ec2';
=======
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
>>>>>>> 2ac9be4 (ec2 automated shutdown aspect)

interface CloudWatchEvent {
    version: string;
    id: string;
    'detail-type': string;
    source: string;
    account: string;
    time: string;
    region: string;
    resources: string[];
<<<<<<< HEAD
    detail: CloudWatchAlarmData;
}

interface MetricStat {
    metric: {
        dimensions?: Array<{
            name: string;
            value: string;
        }>;
    };
}

interface AlarmConfiguration {
    metrics?: Array<{
        metricStat?: MetricStat;
    }>;
}

const getInstanceId = (event: CloudWatchEvent): string => {
    const configuration = event.detail.configuration as AlarmConfiguration;
    if (!configuration.metrics?.[0]?.metricStat?.metric?.dimensions) {
        throw new Error('Instance ID not found in alarm metrics');
    }

    const dimensions = configuration.metrics[0].metricStat.metric.dimensions;

    if (!!dimensions.InstanceId) {
        throw new Error('Instance ID not found in alarm metrics');
    }

    return instanceId;
};

=======
    detail: CloudWatchAlarmEventDetail;
}

/**
 * Processes CloudWatch Alarm events to shut down EC2 instances
 * when CPU utilization falls below the specified threshold
 */
>>>>>>> 2ac9be4 (ec2 automated shutdown aspect)
export const handler = async (
    event: CloudWatchEvent,
    _context: Context
): Promise<void> => {
    try {
<<<<<<< HEAD
        console.info(
            'Received CloudWatch event:',
            JSON.stringify(event, null, 2)
        );
=======
        console.info('Received event:', JSON.stringify(event, null, 2));
>>>>>>> 2ac9be4 (ec2 automated shutdown aspect)

        // Check if the alarm is in ALARM state
        if (event.detail.state.value !== 'ALARM') {
            console.info('Not in ALARM state, skipping');
            return;
        }

<<<<<<< HEAD
        const instanceId = getInstanceId(event);
        console.info(`Attempting to stop EC2 instance: ${instanceId}`);

        const client = new EC2({});

        try {
            const response: StopInstancesCommandOutput =
                await client.stopInstances({
                    InstanceIds: [instanceId]
                });

            if (!response.StoppingInstances?.length) {
                throw new Error(
                    `Failed to stop instance ${instanceId}: No stopping instances in response`
                );
            }

            const instanceState =
                response.StoppingInstances[0].CurrentState?.Name;
            console.info(
                'Stop instance response:',
                JSON.stringify(response, null, 2)
            );
            console.info(
                `Successfully initiated shutdown for instance: ${instanceId}. Current state: ${instanceState}`
            );
        } catch (stopError) {
            if (stopError instanceof Error) {
                throw new Error(
                    'Failed to stop EC2 instance ${instanceId}: ${stoperror.message'
                );
            }
            throw new Error(
                `Failed to stop EC2 instance ${instanceId}: Unknown error`
            );
        }
=======
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

>>>>>>> 2ac9be4 (ec2 automated shutdown aspect)
    } catch (error) {
        console.error('Error in lambda handler:', error);
        throw error;
    }
};
