// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { EC2 } from '@aws-sdk/client-ec2';
import { handler } from '../../../../src/aspects/ec2-automated-shutdown/handler';
import {
    mockCloudWatchEvent,
    mockEC2Response,
    mockContext,
    mockEC2Client,
    mockInstanceId,
    buildCloudWatchEventWithState
} from '../fixtures';

jest.mock('@aws-sdk/client-ec2');

type Mutable<T> = {
    -readonly [P in keyof T]: T[P] extends Record<string, unknown>
        ? Mutable<T[P]>
        : T[P];
};

describe('Lambda Handler', () => {
    let event: Mutable<typeof mockCloudWatchEvent>;

    beforeEach(() => {
        event = JSON.parse(JSON.stringify(mockCloudWatchEvent));
        (EC2 as jest.Mock).mockImplementation(() => mockEC2Client);
        mockEC2Client.stopInstances.mockReset();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should stop EC2 instance when alarm is in ALARM state', async () => {
        // Arrange
        mockEC2Client.stopInstances.mockResolvedValue(mockEC2Response);

        // Act
        await handler(event, mockContext);

        // Assert
        expect(EC2).toHaveBeenCalledTimes(1);
        expect(mockEC2Client.stopInstances).toHaveBeenCalledWith({
            InstanceIds: [mockInstanceId]
        });
    });

    it('should not stop EC2 instance when alarm is not in ALARM state', async () => {
        // Arrange
        event = buildCloudWatchEventWithState('OK');

        // Act
        await handler(event, mockContext);

        // Assert
        expect(mockEC2Client.stopInstances).not.toHaveBeenCalled();
    });

    it('should throw error when instance ID is not found in metrics', async () => {
        // Arrange
        (
            event.alarmData.configuration as any
        ).metrics[0].metricStat.metric.dimensions = [];

        // Act & Assert
        await expect(handler(event, mockContext)).rejects.toThrow(
            'Instance ID not found in alarm metrics'
        );
    });

    it('should handle EC2 client errors', async () => {
        // Arrange
        const error = new Error('EC2 API Error');
        mockEC2Client.stopInstances.mockRejectedValueOnce(error);

        // Act & Assert
        await expect(handler(event, mockContext)).rejects.toThrow(
            `Failed to stop EC2 instance ${mockInstanceId}: EC2 API Error`
        );
    });

    it('should handle missing or invalid response from EC2', async () => {
        // Arrange
        mockEC2Client.stopInstances.mockResolvedValue({});

        // Act & Assert
        await expect(handler(event, mockContext)).rejects.toThrow(
            `Failed to stop instance ${mockInstanceId}: No stopping instances in response`
        );
    });

    it('should log event details and success message', async () => {
        // Arrange
        const consoleSpy = jest.spyOn(console, 'info');
        mockEC2Client.stopInstances.mockResolvedValue({
            StoppingInstances: [
                {
                    InstanceId: 'i-1234567890abcdef0',
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

    it('should throw error with generic message for unknown error types', async () => {
        // Arrange
        const nonErrorObject = { someProperty: 'not an error' };
        mockEC2Client.stopInstances.mockRejectedValueOnce(nonErrorObject);

        // Act & Assert
        await expect(handler(event, mockContext)).rejects.toThrow(
            `Failed to stop EC2 instance ${mockInstanceId}: Unknown error`
        );
    });

    it('should handle missing CurrentState in EC2 response', async () => {
        // Arrange
        const consoleSpy = jest.spyOn(console, 'info');
        mockEC2Client.stopInstances.mockResolvedValue({
            StoppingInstances: [
                {
                    InstanceId: mockInstanceId,
                    PreviousState: { Name: 'running' }
                    // CurrentState is intentionally missing
                }
            ]
        });

        // Act
        await handler(event, mockContext);

        // Assert
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining(
                `Successfully initiated shutdown for instance: ${mockInstanceId}. Current state: undefined`
            )
        );
    });
});
