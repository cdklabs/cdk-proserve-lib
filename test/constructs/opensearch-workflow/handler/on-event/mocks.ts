// __mocks__/opensearch-workflow.mocks.ts
export const setupMocks = () => {
    jest.mock('fs', () => ({
        readFileSync: jest.fn().mockReturnValue('{"template": "content"}')
    }));

    jest.mock('../../../../../src/common/lambda/aws-http-client', () => ({
        AwsHttpClient: jest.fn().mockImplementation(() => ({
            post: jest.fn().mockResolvedValue({
                statusCode: 200,
                data: {
                    workflow_id: 'test-workflow-id'
                }
            })
        }))
    }));

    jest.mock('../../../../../src/common/lambda/download-s3-asset', () => ({
        downloadS3Asset: jest
            .fn()
            .mockResolvedValue('s3://bucket/template.json')
    }));

    jest.mock('@aws-sdk/s3-request-presigner', () => ({
        getSignedUrl: jest
            .fn()
            .mockResolvedValue('https://presigned-url.example.com')
    }));

    jest.mock('@aws-sdk/client-s3', () => ({
        GetObjectCommand: jest.fn(),
        S3Client: jest.fn().mockImplementation(() => ({
            send: jest.fn()
        }))
    }));
};

export const resetMocks = () => {
    jest.clearAllMocks();
};
