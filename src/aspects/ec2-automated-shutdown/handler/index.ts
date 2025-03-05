// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Context, CloudWatchAlarmEvent } from 'aws-lambda';
import { EC2, StopInstancesCommandOutput } from '@aws-sdk/client-ec2';

interface MetricStat {
    readonly metric: {
        readonly dimensions?: {
            readonly InstanceId?: string;
            readonly [key: string]: string | undefined;
        };
    };
}

interface AlarmConfiguration {
    metrics?: Array<{
        metricStat?: MetricStat;
    }>;
}

const getInstanceId = (event: CloudWatchAlarmEvent): string => {
    const configuration = event.alarmData.configuration as AlarmConfiguration;
    if (!configuration.metrics?.[0]?.metricStat?.metric?.dimensions) {
        throw new Error('Instance ID not found in alarm metrics');
    }

    const dimensions = configuration.metrics[0].metricStat.metric.dimensions;
    const instanceId = dimensions.InstanceId;

    if (!instanceId) {
        throw new Error('Instance ID not found in alarm metrics');
    }

    return instanceId;
};

export const handler = async (
    event: CloudWatchAlarmEvent,
    _context: Context
): Promise<void> => {
    try {
        console.info(
            'Received CloudWatch event:',
            JSON.stringify(event, null, 2)
        );

        // Check if the alarm is in ALARM state
        if (event.alarmData.state.value !== 'ALARM') {
            console.info('Not in ALARM state, skipping');
            return;
        }

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
                    `Failed to stop EC2 instance ${instanceId}: ${stopError.message}`
                );
            }
            throw new Error(
                `Failed to stop EC2 instance ${instanceId}: Unknown error`
            );
        }
    } catch (error) {
        console.error('Error in lambda handler:', error);
        throw error;
    }
};
