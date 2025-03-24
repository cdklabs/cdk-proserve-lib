// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { EC2, StopInstancesCommand } from '@aws-sdk/client-ec2';
import { CloudWatchAlarmEvent } from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { handler } from '../../../../src/aspects/ec2-automated-shutdown/handler';
import { mockContext } from '../../../fixtures';
import {
    mockEC2Response,
    mockInstanceId,
    buildCloudWatchEventWithState
} from '../fixtures';

describe('Lambda Handler', () => {
    const ec2Mock = mockClient(EC2);
    const consoleSpy = vi.spyOn(console, 'info');
    let event: CloudWatchAlarmEvent;

    beforeEach(() => {
        ec2Mock.reset();
        consoleSpy.mockClear();

        event = buildCloudWatchEventWithState('ALARM');
    });

    it('should stop EC2 instance when alarm is in ALARM state', async () => {
        ec2Mock
            .on(StopInstancesCommand)
            .rejects()
            .on(StopInstancesCommand, {
                InstanceIds: [mockInstanceId]
            })
            .resolves(mockEC2Response);

        // Act
        await handler(event, mockContext);

        // Assert
        expect(ec2Mock.calls().length).toBe(1);
    });

    it('should not stop EC2 instance when alarm is not in ALARM state', async () => {
        // Arrange
        event = buildCloudWatchEventWithState('OK');

        // Act
        await handler(event, mockContext);

        // Assert
        expect(ec2Mock.calls().length).toBe(0);
    });

    it('should handle missing or invalid response from EC2', async () => {
        // Arrange
        ec2Mock
            .on(StopInstancesCommand)
            .rejects()
            .on(StopInstancesCommand, {
                InstanceIds: [mockInstanceId]
            })
            .resolves({});

        // Act & Assert
        await expect(handler(event, mockContext)).rejects.toThrow(
            `Failed to stop instance ${mockInstanceId}: No stopping instances in response`
        );
    });

    it('should log event details and success message', async () => {
        // Arrange
        ec2Mock
            .on(StopInstancesCommand, {
                InstanceIds: [mockInstanceId]
            })
            .resolves({
                StoppingInstances: [
                    {
                        InstanceId: mockInstanceId,
                        CurrentState: { Name: 'stopping' },
                        PreviousState: { Name: 'running' }
                    }
                ]
            });

        // Act
        await handler(event, mockContext);

        // Assert
        expect(consoleSpy).toHaveBeenCalledWith(
            'Received CloudWatch event:',
            expect.any(String)
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining(
                'Successfully initiated shutdown for instance'
            )
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'Stop instance response:',
            expect.any(String)
        );
    });

    it('should handle missing metric dimensions', async () => {
        // Act & Assert
        await expect(handler(event, mockContext)).rejects.toThrow(
            `Failed to stop EC2 instance ${mockInstanceId}: Cannot read properties of undefined`
        );
    });

    it('should throw error when metrics dimensions are missing', async () => {
        // Arrange
        // Completely remove the dimensions object from the metrics
        (
            event.alarmData.configuration as any
        ).metrics[0].metricStat.metric.dimensions = undefined;

        // Act & Assert
        await expect(handler(event, mockContext)).rejects.toThrow(
            'Instance ID not found in alarm metrics'
        );
    });

    it('should throw error when metrics configuration is deeply missing', async () => {
        // Arrange
        // Set up a case where the metrics array exists but without the expected structure
        (event.alarmData.configuration as any).metrics = [
            {
                // Missing metricStat
                someOtherProperty: 'value'
            }
        ];

        // Act & Assert
        await expect(handler(event, mockContext)).rejects.toThrow(
            'Instance ID not found in alarm metrics'
        );
    });

    it('should throw error when metrics configuration is deeply missing', async () => {
        // Arrange
        // Set up a case where the metrics array exists but without the expected structure
        (event.alarmData.configuration as any).metrics = [
            {
                // Missing metricStat
                someOtherProperty: 'value'
            }
        ];

        // Act & Assert
        await expect(handler(event, mockContext)).rejects.toThrow(
            'Instance ID not found in alarm metrics'
        );
    });

    it('should throw error when dimensions exist but InstanceId is missing', async () => {
        // Arrange
        // Set dimensions to exist, but without an InstanceId property
        (
            event.alarmData.configuration as any
        ).metrics[0].metricStat.metric.dimensions = {
            SomeOtherDimension: 'value'
        };

        // Act & Assert
        await expect(handler(event, mockContext)).rejects.toThrow(
            'Instance ID not found in alarm metrics'
        );
    });

    it('should handle EC2 client errors when stopping instances', async () => {
        // Arrange
        const errorMessage = 'EC2 API Error';
        ec2Mock
            .on(StopInstancesCommand, {
                InstanceIds: [mockInstanceId]
            })
            .rejects(new Error(errorMessage));

        // Act & Assert
        await expect(handler(event, mockContext)).rejects.toThrow(
            `Failed to stop EC2 instance ${mockInstanceId}: ${errorMessage}`
        );
    });
});
