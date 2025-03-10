// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { EC2, StopInstancesCommandOutput } from '@aws-sdk/client-ec2';
import type {
    Context,
    CloudWatchAlarmEvent,
    CloudWatchAlarmConfiguration,
    CloudWatchAlarmMetric
} from 'aws-lambda';

/**
 * Interface representing a CloudWatch metric dimension containing an EC2 instance ID
 */
interface InstanceCloudWatchMetricDimension {
    readonly InstanceId: string;
}

/**
 * Type representing a CloudWatch metric dimension that includes EC2 instance information
 * Extends a generic string record with the required InstanceId property
 */
type CloudWatchMetricDimensionForInstance = Record<string, string> &
    InstanceCloudWatchMetricDimension;

/**
 * Type guard function that checks if an object is a CloudWatch metric dimension containing an EC2 instance ID
 *
 * @param o - The object to check
 * @returns True if the object is a valid CloudWatch metric dimension for an EC2 instance
 */
function isCloudWatchMetricDimensionForInstance(
    o?: Record<string, string>
): o is CloudWatchMetricDimensionForInstance {
    const key: keyof InstanceCloudWatchMetricDimension = 'InstanceId';
    return o !== undefined && key in o;
}

/**
 * Extracts the EC2 instance ID from a CloudWatch alarm event
 *
 * @param event - The CloudWatch alarm event containing instance information
 * @returns The EC2 instance ID
 * @throws Error if instance ID cannot be found in the alarm metrics
 */
function getInstanceId(event: CloudWatchAlarmEvent): string {
    const metricsKey: keyof CloudWatchAlarmConfiguration = 'metrics';
    const metricStatKey: keyof CloudWatchAlarmMetric = 'metricStat';

    if (
        metricsKey in event.alarmData.configuration &&
        event.alarmData.configuration.metrics.length &&
        metricStatKey in event.alarmData.configuration.metrics[0] &&
        event.alarmData.configuration.metrics[0].metricStat.metric.dimensions &&
        isCloudWatchMetricDimensionForInstance(
            event.alarmData.configuration.metrics[0].metricStat.metric
                .dimensions
        )
    ) {
        return event.alarmData.configuration.metrics[0].metricStat.metric
            .dimensions.InstanceId;
    } else {
        throw new Error('Instance ID not found in alarm metrics');
    }
}

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
        } catch (error) {
            throw new Error(
                `Failed to stop EC2 instance ${instanceId}: ${(error as Error).message}`
            );
        }
    } catch (error) {
        console.error('Error in lambda handler:', error);
        throw error;
    }
};
