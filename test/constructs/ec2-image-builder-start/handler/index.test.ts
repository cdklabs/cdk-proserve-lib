import { SNSEvent, Context } from 'aws-lambda';
import axios from 'axios';
import { handler } from '../../../../src/constructs/ec2-image-builder-start/handler';

jest.mock('axios');

describe('Lambda Handler', () => {
    let mockContext: Context;
    let mockEvent: SNSEvent;

    beforeEach(() => {
        mockContext = {
            awsRequestId: 'test-request-id'
        } as Context;

        mockEvent = {
            Records: [
                {
                    Sns: {
                        Message: JSON.stringify({
                            state: { status: 'AVAILABLE' },
                            arn: 'test-arn'
                        })
                    }
                }
            ]
        } as SNSEvent;

        process.env.WAIT_HANDLE_URL = 'https://test-url.com';
        process.env.IMAGE_BUILD_ARN = 'test-arn';
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should signal SUCCESS when status is AVAILABLE', async () => {
        await handler(mockEvent, mockContext);

        expect(axios.put).toHaveBeenCalledWith('https://test-url.com', {
            Status: 'SUCCESS',
            Reason: 'Complete.',
            UniqueId: 'test-request-id',
            Data: 'Pipeline has given a SUCCESS signal from SNS.'
        });
    });

    it('should signal FAILURE when status is not AVAILABLE', async () => {
        mockEvent.Records[0].Sns.Message = JSON.stringify({
            state: { status: 'FAILED', reason: 'Test failure reason.' },
            arn: 'test-arn'
        });

        await handler(mockEvent, mockContext);

        expect(axios.put).toHaveBeenCalledWith('https://test-url.com', {
            Status: 'FAILURE',
            Reason: 'Pipeline has given a FAILURE signal. Test failure reason.',
            UniqueId: 'test-request-id',
            Data: 'Pipeline has given a FAILURE signal from SNS.'
        });
    });

    it('should throw error when WAIT_HANDLE_URL is not set', async () => {
        delete process.env.WAIT_HANDLE_URL;

        await expect(handler(mockEvent, mockContext)).rejects.toThrow(
            'WAIT_HANDLE_URL environment variable is not set'
        );
    });

    it('should not signal when ARN does not match', async () => {
        mockEvent.Records[0].Sns.Message = JSON.stringify({
            state: { status: 'AVAILABLE' },
            arn: 'different-arn'
        });

        await handler(mockEvent, mockContext);

        expect(axios.put).not.toHaveBeenCalled();
    });
});
