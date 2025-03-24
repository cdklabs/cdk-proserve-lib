// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    CloudFormation,
    CloudFormationServiceException,
    DescribeStacksCommand,
    GetTemplateCommand,
    UpdateStackCommand
} from '@aws-sdk/client-cloudformation';
import { S3 } from '@aws-sdk/client-s3';
import {
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceUpdateEvent,
    Context
} from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import { describe, beforeEach, it, expect } from 'vitest';
import { handler } from '../../../../../src/constructs/friendly-embrace/handler/on-event';
import { ResourceProperties } from '../../../../../src/constructs/friendly-embrace/handler/types/resource-properties';
import {
    mockCreateEvent,
    mockDeleteEvent,
    mockRollbackEvent,
    mockStackName,
    mockUpdateEvent
} from '../../fixtures';

process.env.CFN_TEMPLATE_BUCKET_URL = 'https://example.bucket.url';
process.env.CFN_TEMPLATE_BUCKET_NAME = 'example-bucket';

describe('friendly-embrace on-event handler', () => {
    const context = {} as Context;
    const cfnMock = mockClient(CloudFormation);
    const s3Mock = mockClient(S3);

    beforeEach(() => {
        cfnMock.reset();
        s3Mock.reset();

        cfnMock.on(GetTemplateCommand).resolves({
            TemplateBody: JSON.stringify({
                Resources: {
                    TestResource: {
                        Type: 'AWS::S3::Bucket',
                        Properties: {
                            BucketName: {
                                'Fn::ImportValue': 'TestExport'
                            }
                        }
                    }
                }
            })
        });
    });

    it('should error if stack in progress', async () => {
        cfnMock
            .on(DescribeStacksCommand)
            .rejects()
            .on(DescribeStacksCommand, { StackName: mockStackName })
            .resolves({
                Stacks: [
                    {
                        StackName: mockStackName,
                        StackStatus: undefined,
                        CreationTime: new Date('2024-01-01T00:00:00Z')
                    }
                ]
            });

        await expect(
            handler(mockCreateEvent, context, undefined as any)
        ).rejects.toThrow('Unable to retrieve stack state');
    });

    it('should error if no stacks are retrieved', async () => {
        cfnMock
            .on(DescribeStacksCommand)
            .rejects()
            .on(DescribeStacksCommand, { StackName: mockStackName })
            .resolves({
                Stacks: []
            });

        await expect(
            handler(mockCreateEvent, context, undefined as any)
        ).rejects.toThrow('Unable to retrieve stack state');
    });

    it('should handle case where stack does not exist', async () => {
        cfnMock.on(GetTemplateCommand).rejects(
            new CloudFormationServiceException({
                name: 'ValidationError',
                $fault: 'client',
                $metadata: {},
                message: `Stack with id ${mockStackName} does not exist`
            })
        );

        cfnMock.on(DescribeStacksCommand).rejects(
            new CloudFormationServiceException({
                name: 'ValidationError',
                $fault: 'client',
                $metadata: {},
                message: `Stack with id ${mockStackName} does not exist`
            })
        );

        await expect(
            handler(mockCreateEvent, context, undefined as any)
        ).toMatchObject({});
    });

    it('should handle other errors when getting template', async () => {
        cfnMock.on(GetTemplateCommand).rejects(
            new CloudFormationServiceException({
                name: 'ValidationError',
                $fault: 'client',
                $metadata: {},
                message: 'Some unknown error'
            })
        );

        await expect(
            handler(mockCreateEvent, context, undefined as any)
        ).rejects.toThrow('Some unknown error');
    });

    it('should handle other errors when describing stacks', async () => {
        cfnMock.on(DescribeStacksCommand).rejects(
            new CloudFormationServiceException({
                name: 'ValidationError',
                $fault: 'client',
                $metadata: {},
                message: 'Some unknown error'
            })
        );

        await expect(
            handler(mockCreateEvent, context, undefined as any)
        ).rejects.toThrow('Some unknown error');
    });

    it('should handle unexpected stack states', async () => {
        cfnMock
            .on(DescribeStacksCommand, { StackName: mockStackName })
            .resolves({
                Stacks: [
                    {
                        StackName: mockStackName,
                        StackStatus: 'DELETE_FAILED',
                        CreationTime: new Date('2024-01-01T00:00:00Z')
                    }
                ]
            });

        await expect(
            handler(mockCreateEvent, context, undefined as any)
        ).rejects.toThrow('Stack in unexpected state: DELETE_FAILED');
    });

    it('should handle instances where there are no updates', async () => {
        cfnMock.on(UpdateStackCommand).rejects(
            new CloudFormationServiceException({
                name: 'ValidationError',
                $fault: 'client',
                $metadata: {},
                message: 'No updates are to be performed.'
            })
        );

        await expect(
            handler(mockCreateEvent, context, undefined as any)
        ).toMatchObject({});
    });

    it('should handle case where stack has no outputs', async () => {
        cfnMock
            .on(DescribeStacksCommand, { StackName: mockStackName })
            .resolves({
                Stacks: [
                    {
                        StackName: mockStackName,
                        StackStatus: 'UPDATE_COMPLETE',
                        CreationTime: new Date('2024-01-01T00:00:00Z')
                    }
                ]
            });

        expect(
            await handler(mockCreateEvent, context, undefined as any)
        ).toMatchObject({});
    });

    it('should handle cases where there is no template body', async () => {
        cfnMock
            .on(DescribeStacksCommand)
            .rejects()
            .on(DescribeStacksCommand, { StackName: mockStackName })
            .resolves({
                Stacks: [
                    {
                        StackName: mockStackName,
                        StackStatus: 'UPDATE_COMPLETE',
                        Outputs: [
                            {
                                ExportName: 'TestExport',
                                OutputValue: 'TestValue'
                            }
                        ],
                        CreationTime: new Date('2024-01-01T00:00:00Z')
                    }
                ]
            });

        cfnMock.on(GetTemplateCommand).resolves({});

        await handler(mockCreateEvent, context, undefined as any);

        s3Mock.calls().forEach((call, index) => {
            console.log(`S3 Call ${index + 1}:`, {
                Command: call.args[0].constructor.name,
                Input: call.args[0]
            });
        });

        cfnMock.calls().forEach((call, index) => {
            console.log(`CFN Call ${index + 1}:`, {
                Command: call.args[0].constructor.name,
                Input: call.args[0].input
            });
        });

        // No s3 calls made since template body was empty
        expect(s3Mock.calls()).toHaveLength(0);
        // DescribeStacks and GetTemplate
        expect(cfnMock.calls()).toHaveLength(2);
    });

    it('should handle create event successfully', async () => {
        // Mock setup
        cfnMock
            .on(DescribeStacksCommand)
            .rejects()
            .on(DescribeStacksCommand, { StackName: mockStackName })
            .resolves({
                Stacks: [
                    {
                        StackName: mockStackName,
                        StackStatus: 'UPDATE_COMPLETE',
                        Outputs: [
                            {
                                ExportName: 'TestExport',
                                OutputValue: 'TestValue'
                            }
                        ],
                        CreationTime: new Date('2024-01-01T00:00:00Z')
                    }
                ]
            });

        await handler(mockCreateEvent, context, undefined as any);

        // 1. S3 PutObject to upload template
        // 2. S3 Delete Object to delete it when done
        expect(s3Mock.calls()).toHaveLength(2);

        // 1. Describe Stacks
        // 2. Get Template
        // 3. Update Stack
        // 4. Get Stack Status
        expect(cfnMock.calls()).toHaveLength(4);
    });

    it('should not update if no stacks were given', async () => {
        const mockCreateEventWithNoStacks: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            {
                ...mockCreateEvent,
                ResourceProperties: {
                    ...mockCreateEvent.ResourceProperties,
                    stackNames: []
                }
            };

        await handler(mockCreateEventWithNoStacks, context, undefined as any);

        // Verify no update was attempted
        expect(cfnMock.calls()).toHaveLength(0);
        expect(s3Mock.calls()).toHaveLength(0);
    });

    it('should handle invalid stack state when ignoreInvalidStates is true', async () => {
        cfnMock.on(UpdateStackCommand).rejects(
            new CloudFormationServiceException({
                message:
                    'Stack test-stack is in ROLLBACK_COMPLETE state and can not be updated',
                $metadata: {},
                $fault: 'client',
                name: ''
            })
        );

        cfnMock.on(DescribeStacksCommand).resolves({
            Stacks: [
                {
                    StackName: 'test-stack',
                    StackStatus: 'ROLLBACK_COMPLETE',
                    Outputs: [
                        {
                            ExportName: 'TestExport',
                            OutputValue: 'TestValue'
                        }
                    ],
                    CreationTime: new Date('2024-01-01T00:00:00Z')
                }
            ]
        });

        const mockUpdateEventIgnoreInvalidStates: CloudFormationCustomResourceUpdateEvent<
            ResourceProperties,
            ResourceProperties
        > = {
            ...mockUpdateEvent,
            ResourceProperties: {
                ...mockUpdateEvent.ResourceProperties,
                ignoreInvalidStates: true
            }
        };

        await handler(
            mockUpdateEventIgnoreInvalidStates,
            context,
            undefined as any
        );

        // 1. Create Template, 2. Delete Template
        expect(s3Mock.calls()).toHaveLength(2);

        /**
         * 1. DescribeStacks, 2. GetTemplate, 3. UpdateStack
         * Does not get stack status since it errored out and is ignoring the
         * stack status.
         */
        expect(cfnMock.calls()).toHaveLength(3);
    });

    it('should handle delete event without performing any actions', async () => {
        await handler(mockDeleteEvent, context, undefined as any);

        // Verify no calls were made to CloudFormation or S3
        expect(cfnMock.calls()).toHaveLength(0);
        expect(s3Mock.calls()).toHaveLength(0);
    });

    it('should handle rollback events without performing any actions', async () => {
        await handler(mockRollbackEvent, context, undefined as any);

        // Verify no calls were made to CloudFormation or S3
        expect(cfnMock.calls()).toHaveLength(0);
        expect(s3Mock.calls()).toHaveLength(0);
    });

    it('should handle arrays in template values', async () => {
        // Mock setup
        cfnMock
            .on(DescribeStacksCommand, { StackName: mockStackName })
            .resolves({
                Stacks: [
                    {
                        StackName: mockStackName,
                        StackStatus: 'UPDATE_COMPLETE',
                        Outputs: [
                            {
                                ExportName: 'TestExport1',
                                OutputValue: 'TestValue1'
                            },
                            {
                                ExportName: 'TestExport2',
                                OutputValue: 'TestValue2'
                            }
                        ],
                        CreationTime: new Date('2024-01-01T00:00:00Z')
                    }
                ]
            });

        cfnMock.on(GetTemplateCommand).resolves({
            TemplateBody: JSON.stringify({
                Resources: {
                    TestResource: {
                        Type: 'AWS::IAM::Role',
                        Properties: {
                            ManagedPolicyArns: [
                                { 'Fn::ImportValue': 'TestExport1' },
                                { 'Fn::ImportValue': 'TestExport2' }
                            ]
                        }
                    }
                }
            })
        });

        await handler(mockCreateEvent, context, undefined as any);

        // Verify the template was transformed correctly
        const s3Calls = s3Mock.calls();
        expect(s3Calls).toHaveLength(2); // putObject and deleteObject

        const putObjectCall = s3Calls.find(
            (call) => call.args[0].constructor.name === 'PutObjectCommand'
        );

        // Inspect the actual template that gets sent to CloudFormation from S3
        expect(putObjectCall).toBeDefined();
        const putObjectBody = JSON.parse(putObjectCall!.firstArg.input.Body);
        expect(
            putObjectBody.Resources.TestResource.Properties.ManagedPolicyArns
        ).toEqual(['TestValue1', 'TestValue2']);
    });
});
