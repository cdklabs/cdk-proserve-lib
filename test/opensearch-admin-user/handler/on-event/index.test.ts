import {
    OpenSearch,
    UpdateDomainConfigCommand
} from '@aws-sdk/client-opensearch';
import { GetParameterCommand, SSM } from '@aws-sdk/client-ssm';
import { CdkCustomResourceEvent } from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import { IResourceProperties } from '../../../../src/opensearch-admin-user/handler/models/resource-properties';
import { handler } from '../../../../src/opensearch-admin-user/handler/on-event';

describe('Lambda function handler', () => {
    const aosMock = mockClient(OpenSearch);
    const ssmMock = mockClient(SSM);

    beforeEach(() => {
        aosMock.reset();
        ssmMock.reset();
    });

    const baseEvent: Partial<CdkCustomResourceEvent<IResourceProperties>> = {
        ResourceProperties: {
            ServiceToken:
                'arn:aws:lambda:us-east-1:123456789012:function:my-function',
            DomainName: 'test-domain',
            UsernameParameterName: '/test/username',
            PasswordParameterName: '/test/password'
        }
    };

    it('should handle CREATE event successfully', async () => {
        const mockEvent: CdkCustomResourceEvent<IResourceProperties> = {
            ...baseEvent,
            RequestType: 'Create'
        } as CdkCustomResourceEvent<IResourceProperties>;

        const mockContext = {} as any;

        ssmMock.on(GetParameterCommand).callsFake((input) => {
            if (input.Name === '/test/username') {
                return Promise.resolve({
                    Parameter: { Value: 'testuser' }
                });
            } else if (input.Name === '/test/password') {
                return Promise.resolve({
                    Parameter: { Value: 'testpassword' }
                });
            } else {
                return Promise.reject(new Error('Invalid parameter name'));
            }
        });

        aosMock.on(UpdateDomainConfigCommand).resolves({});

        const result = await handler(mockEvent, mockContext);

        expect(result).toEqual({ PhysicalResourceId: 'test-domain' });
        expect(ssmMock.calls()).toHaveLength(2);
        expect(aosMock.calls()).toHaveLength(1);
    });

    it('should handle UPDATE event successfully', async () => {
        const mockEvent: CdkCustomResourceEvent<IResourceProperties> = {
            ...baseEvent,
            RequestType: 'Update',
            PhysicalResourceId: 'existing-domain'
        } as CdkCustomResourceEvent<IResourceProperties>;

        const mockContext = {} as any;

        const result = await handler(mockEvent, mockContext);

        expect(result).toEqual({ PhysicalResourceId: 'existing-domain' });
    });

    it('should handle DELETE event successfully', async () => {
        const mockEvent: CdkCustomResourceEvent<IResourceProperties> = {
            ...baseEvent,
            RequestType: 'Delete',
            PhysicalResourceId: 'existing-domain'
        } as CdkCustomResourceEvent<IResourceProperties>;

        const mockContext = {} as any;

        const result = await handler(mockEvent, mockContext);

        expect(result).toEqual({ PhysicalResourceId: 'existing-domain' });
    });

    it('onCreate should return an error message when updateDomainConfig fails', async () => {
        aosMock
            .on(UpdateDomainConfigCommand)
            .rejects(new Error('Update domain config failed'));

        ssmMock.on(GetParameterCommand).resolves({
            Parameter: { Value: 'test-value' }
        });

        const event = {
            RequestType: 'Create',
            ResourceProperties: {
                DomainName: 'test-domain',
                UsernameParameterName: '/test/username',
                PasswordParameterName: '/test/password'
            }
        } as any;

        await expect(handler(event, {} as any)).rejects.toThrow(
            'Update domain config failed'
        );
    });
});
