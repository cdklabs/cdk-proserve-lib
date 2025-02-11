// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Context } from 'aws-lambda';
import { EC2Client, StopInstancesCommand } from '@aws-sdk/client-ec2';
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
            version: '0',
            id: 'test-id',
            'detail-type': 'CloudWatch Alarm State Change',
            source: 'aws.cloudwatch',
            account: '123456789012',
            time: '2024-02-11T00:00:00Z',
            region: 'us-east-1',
            resources: ['arn:aws:cloudwatch:us-east-1:123456789012:alarm:LowCPUUtilizationAlarm-i-1234567890abcdef0'],
            detail: {
                alarmName: 'LowCPUUtilizationAlarm-i-1234567890abcdef0',
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
                    description: 'CPU utilization below threshold',
                    metrics: [{
                        id: 'metric1',
                        metricStat: {
                            metric: {
                                dimensions: [{
                                    name: 'InstanceId',
                                    value: 'i-1234567890abcdef0'
                                }]
                            }
                        }
                    }]
                }
            }
        };

        // Mock the EC2 client constructor
        (EC2Client as jest.Mock).mockImplementation(() => mockEC2Client);
        
        // Reset the mock implementation for each test
        mockEC2Client.send.mockReset();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should stop EC2 instance when alarm is in ALARM state', async () => {
        // Arrange
        const instanceId = 'i-1234567890abcdef0';
        mockEC2Client.send.mockResolvedValueOnce({ 
            StoppingInstances: [{ InstanceId: instanceId }] 
        });

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(EC2Client).toHaveBeenCalledTimes(1);
        expect(mockEC2Client.send).toHaveBeenCalledWith(
            expect.any(StopInstancesCommand)
        );
        const command = mockEC2Client.send.mock.calls[0][0];
        expect(command.input).toEqual({
            InstanceIds: [instanceId]
        });
    });

    it('should not stop EC2 instance when alarm is not in ALARM state', async () => {
        // Arrange
        mockEvent.detail.state.value = 'OK';

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(mockEC2Client.send).not.toHaveBeenCalled();
    });

    it('should throw error when instance ID cannot be extracted from alarm name', async () => {
        // Arrange
        mockEvent.detail.alarmName = 'InvalidAlarmName';

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow(
            'Instance ID not found in alarm name'
        );
    });

    it('should handle EC2 client errors', async () => {
        // Arrange
        const error = new Error('EC2 API Error');
        mockEC2Client.send.mockRejectedValueOnce(error);

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow('EC2 API Error');
    });

    it('should log event details', async () => {
        // Arrange
        const consoleSpy = jest.spyOn(console, 'info');
        mockEC2Client.send.mockResolvedValueOnce({ 
            StoppingInstances: [{ InstanceId: 'i-1234567890abcdef0' }] 
        });

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(consoleSpy).toHaveBeenCalledWith(
            'Received event:',
            expect.any(String)
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Successfully initiated shutdown for instance')
        );
    });
});