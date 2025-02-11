// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Context } from 'aws-lambda';
import { EC2Client, StopInstancesCommand } from '@aws-sdk/client-ec2';

interface SNSEvent {
    Records: Array<{
        EventSource: string;
        Sns: {
            Message: string;
        };
    }>;
}

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
 * Extracts the EC2 instance ID from CloudWatch alarm metrics
 * @param event The CloudWatch event containing alarm metrics
 * @returns The EC2 instance ID
 * @throws Error if instance ID cannot be found
 */
const getInstanceId = (event: CloudWatchEvent): string => {
    const dimensions =
        event.detail.configuration.metrics?.[0]?.metricStat?.metric?.dimensions;

    if (!dimensions?.length) {
        throw new Error('Instance ID not found in alarm metrics');
    }

    const instanceId = dimensions.find(
        (dim) => dim.name === 'InstanceId'
    )?.value;

    if (!instanceId) {
        throw new Error('Instance ID not found in alarm metrics');
    }

    return instanceId;
};

/**
 * Processes CloudWatch Alarm events to shut down EC2 instances
 * when CPU utilization falls below the specified threshold
 */
export const handler = async (
    event: SNSEvent,
    _context: Context
): Promise<void> => {
    try {
        console.info('Received SNS event:', JSON.stringify(event, null, 2));

        const cloudWatchEvent: CloudWatchEvent = JSON.parse(
            event.Records[0].Sns.Message
        );
        console.info(
            'Parsed CloudWatch event:',
            JSON.stringify(cloudWatchEvent, null, 2)
        );

        // Check if the alarm is in ALARM state
        if (cloudWatchEvent.detail.state.value !== 'ALARM') {
            console.info('Not in ALARM state, skipping');
            return;
        }

        const instanceId = getInstanceId(cloudWatchEvent);
        console.info(`Attempting to stop EC2 instance: ${instanceId}`);

        const ec2Client = new EC2Client({});

        // Stop the EC2 instance
        const response = await ec2Client.send(
            new StopInstancesCommand({
                InstanceIds: [instanceId]
            })
        );

        console.info(
            'Stop instance response:',
            JSON.stringify(response, null, 2)
        );
        console.info(
            `Successfully initiated shutdown for instance: ${instanceId}`
        );
    } catch (error) {
        console.error('Error in lambda handler:', error);
        throw error;
    }
};
