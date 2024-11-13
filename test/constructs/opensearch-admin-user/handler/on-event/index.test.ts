/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

import {
    OpenSearch,
    UpdateDomainConfigCommand
} from '@aws-sdk/client-opensearch';
import { GetParameterCommand, SSM } from '@aws-sdk/client-ssm';
import { CdkCustomResourceEvent } from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import { handler } from '../../../../../src/constructs/opensearch-admin-user/handler/on-event';
import { IResourceProperties } from '../../../../../src/constructs/opensearch-admin-user/handler/types/resource-properties';

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
