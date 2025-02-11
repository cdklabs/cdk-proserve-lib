// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { EC2Client } from '@aws-sdk/client-ec2';
import { Context } from 'aws-lambda';
import { handler } from '../../../../src/aspects/ec2-automated-shutdown/handler';

jest.mock('@aws-sdk/client-ec2');

describe('Lambda Handler', () => {
    let mockContext: Context;
    let mockEvent: any;
    const mockEC2Client = {
        send: jest.fn()
    };

    beforeEach(() => {
        mockContext = {
            awsRequestId: 'test-request-id'
        } as Context;

        mockEvent = {
            Records: [
                {
                    Sns: {
                        Message: JSON.stringify({
                            version: '0',
                            id: 'test-id',
                            'detail-type': 'CloudWatch Alarm State Change',
                            source: 'aws.cloudwatch',
                            account: '123456789012',
                            time: '2024-02-11T00:00:00Z',
                            region: 'us-east-1',
                            resources: [
                                'arn:aws:cloudwatch:us-east-1:123456789012:alarm:LowCPUAlarm-1'
                            ],
                            detail: {
                                alarmName: 'LowCPUAlarm-1',
                                state: {
                                    value: 'ALARM',
                                    reason: 'Threshold Crossed',
                                    reasonData: '{}',
                                    timestamp: '2024-02-11T00:00:00Z'
                                },
                                previousState: {
                                    value: 'OK',
                                    reason: 'Threshold Crossed',
                                    reasonData: '{}',
                                    timestamp: '2024-02-11T00:00:00Z'
                                },
                                configuration: {
                                    description:
                                        'CPU utilization below threshold',
                                    metrics: [
                                        {
                                            id: 'metric1',
                                            metricStat: {
                                                metric: {
                                                    dimensions: [
                                                        {
                                                            name: 'InstanceId',
                                                            value: 'i-1234567890abcdef0'
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        })
                    }
                }
            ]
        };

        // Mock the EC2 client constructor
        (EC2Client as jest.Mock).mockImplementation(() => mockEC2Client);
        mockEC2Client.send.mockReset();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should stop EC2 instance when alarm is in ALARM state', async () => {
        // Arrange
        const instanceId = 'i-1234567890abcdef0';
        mockEC2Client.send.mockImplementation(() => {
            return Promise.resolve({
                StoppingInstances: [{ InstanceId: instanceId }]
            });
        });

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(EC2Client).toHaveBeenCalledTimes(1);
        expect(mockEC2Client.send).toHaveBeenCalledWith(
            expect.objectContaining({
                input: {
                    InstanceIds: [instanceId]
                }
            })
        );
    });

    it('should not stop EC2 instance when alarm is not in ALARM state', async () => {
        // Arrange
        const message = JSON.parse(mockEvent.Records[0].Sns.Message);
        message.detail.state.value = 'OK';
        mockEvent.Records[0].Sns.Message = JSON.stringify(message);

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(mockEC2Client.send).not.toHaveBeenCalled();
    });

    it('should throw error when instance ID is not found in metrics', async () => {
        // Arrange
        const message = JSON.parse(mockEvent.Records[0].Sns.Message);
        message.detail.configuration.metrics[0].metricStat.metric.dimensions =
            [];
        mockEvent.Records[0].Sns.Message = JSON.stringify(message);

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow(
            'Instance ID not found in alarm metrics'
        );
    });

    it('should handle EC2 client errors', async () => {
        // Arrange
        const error = new Error('EC2 API Error');
        mockEC2Client.send.mockRejectedValueOnce(error);

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow(
            'EC2 API Error'
        );
    });

    it('should handle malformed SNS message', async () => {
        // Arrange
        mockEvent.Records[0].Sns.Message = 'invalid json';

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow();
    });

    it('should handle missing SNS records', async () => {
        // Arrange
        mockEvent.Records = [];

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow();
    });

    it('should log event details and success message', async () => {
        // Arrange
        const consoleSpy = jest.spyOn(console, 'info');
        mockEC2Client.send.mockImplementation(() => {
            return Promise.resolve({
                StoppingInstances: [{ InstanceId: 'i-1234567890abcdef0' }]
            });
        });

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(consoleSpy).toHaveBeenCalledWith(
            'Received SNS event:',
            expect.any(String)
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'Parsed CloudWatch event:',
            expect.any(String)
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining(
                'Successfully initiated shutdown for instance'
            )
        );
    });

    it('should handle missing metric dimensions', async () => {
        // Arrange
        const message = JSON.parse(mockEvent.Records[0].Sns.Message);
        delete message.detail.configuration.metrics[0].metricStat.metric
            .dimensions;
        mockEvent.Records[0].Sns.Message = JSON.stringify(message);

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow(
            'Instance ID not found in alarm metrics'
        );
    });

    it('should handle missing metrics configuration', async () => {
        // Arrange
        const message = JSON.parse(mockEvent.Records[0].Sns.Message);
        delete message.detail.configuration.metrics;
        mockEvent.Records[0].Sns.Message = JSON.stringify(message);

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow(
            'Instance ID not found in alarm metrics'
        );
    });

    it('should handle invalid SNS event structure', async () => {
        // Arrange
        delete mockEvent.Records[0].Sns;

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow();
    });
});
