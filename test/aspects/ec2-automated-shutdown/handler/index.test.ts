import { EC2 } from '@aws-sdk/client-ec2';
import { Context } from 'aws-lambda';
import { handler } from '../../../../src/aspects/ec2-automated-shutdown/handler';

jest.mock('@aws-sdk/client-ec2');

describe('Lambda Handler', () => {
    let mockContext: Context;
    let mockEvent: any;
    const mockEC2Client = {
        stopInstances: jest.fn()
    };

    beforeEach(() => {
        mockContext = {
            awsRequestId: 'test-request-id'
        } as Context;

        // Direct CloudWatch Alarm event structure
        mockEvent = {
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
                state: {
                    value: 'ALARM'
                },
                configuration: {
                    metrics: [
                        {
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
        };

        // Mock the EC2 constructor
        (EC2 as jest.Mock).mockImplementation(() => mockEC2Client);
        mockEC2Client.stopInstances.mockReset();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should stop EC2 instance when alarm is in ALARM state', async () => {
        // Arrange
        const instanceId = 'i-1234567890abcdef0';
        mockEC2Client.stopInstances.mockResolvedValue({
            StoppingInstances: [{ InstanceId: instanceId }]
        });

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(EC2).toHaveBeenCalledTimes(1);
        expect(mockEC2Client.stopInstances).toHaveBeenCalledWith({
            InstanceIds: [instanceId]
        });
    });

    it('should not stop EC2 instance when alarm is not in ALARM state', async () => {
        // Arrange
        mockEvent.detail.state.value = 'OK';

        // Act
        await handler(mockEvent, mockContext);

        // Assert
        expect(mockEC2Client.stopInstances).not.toHaveBeenCalled();
    });

    it('should throw error when instance ID is not found in metrics', async () => {
        // Arrange
        mockEvent.detail.configuration.metrics[0].metricStat.metric.dimensions =
            [];

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow(
            'Instance ID not found in alarm metrics'
        );
    });

    it('should handle EC2 client errors', async () => {
        // Arrange
        const error = new Error('EC2 API Error');
        mockEC2Client.stopInstances.mockRejectedValueOnce(error);

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow(
            'EC2 API Error'
        );
    });

    it('should log event details and success message', async () => {
        // Arrange
        const consoleSpy = jest.spyOn(console, 'info');
        mockEC2Client.stopInstances.mockResolvedValue({
            StoppingInstances: [{ InstanceId: 'i-1234567890abcdef0' }]
        });

        // Act
        await handler(mockEvent, mockContext);

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
    });

    it('should handle missing metric dimensions', async () => {
        // Arrange
        delete mockEvent.detail.configuration.metrics[0].metricStat.metric
            .dimensions;

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow(
            'Instance ID not found in alarm metrics'
        );
    });

    it('should handle missing metrics configuration', async () => {
        // Arrange
        delete mockEvent.detail.configuration.metrics;

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow(
            'Instance ID not found in alarm metrics'
        );
    });

    it('should handle invalid CloudWatch event structure', async () => {
        // Arrange
        delete mockEvent.detail;

        // Act & Assert
        await expect(handler(mockEvent, mockContext)).rejects.toThrow();
    });
});
