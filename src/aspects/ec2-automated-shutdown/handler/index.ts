// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { EC2, StopInstancesCommandOutput } from '@aws-sdk/client-ec2';
import type { Context, CloudWatchAlarmEvent } from 'aws-lambda';

/**
 * Interface representing the metric stat structure in CloudWatch alarm configuration
 */
interface MetricStat {
    readonly metric: {
        readonly dimensions?: {
            readonly InstanceId?: string;
            readonly [key: string]: string | undefined;
        };
    };
}

/**
 * Interface representing the CloudWatch alarm configuration structure
 */
interface AlarmConfiguration {
    readonly metrics?: Array<{
        readonly metricStat?: MetricStat;
    }>;
}

/**
 * Extracts the EC2 instance ID from a CloudWatch alarm event
 *
 * @param event - The CloudWatch alarm event containing instance information
 * @returns The EC2 instance ID
 * @throws Error if instance ID cannot be found in the alarm metrics
 */
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

/**
 * Lambda handler for the EC2 automated shutdown functionality
 *
 * Receives CloudWatch alarm events and automatically shuts down EC2 instances
 * when the associated alarm transitions to ALARM state. This helps control costs
 * by stopping instances that are detected as idle or underutilized.
 *
 * @param event - The CloudWatch alarm event that triggered the Lambda
 * @param _context - Lambda execution context
 * @returns Promise that resolves when the function completes
 * @throws Error if there's a problem shutting down the instance
 */
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
