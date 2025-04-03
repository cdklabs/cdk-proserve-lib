// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Key } from 'aws-cdk-lib/aws-kms';
import { NagSuppressions } from 'cdk-nag';
import { beforeEach, it } from 'vitest';
import { FriendlyEmbrace } from '../../../src/constructs/friendly-embrace';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

describeCdkTest(FriendlyEmbrace, (id, getStack, getTemplate, getApp) => {
    let app: App;
    let stack: Stack;
    let template: Template;

    beforeEach(() => {
        app = getApp();
        stack = getStack();
        new Stack(app, 'AppStack'); // must be at least one other stack

        NagSuppressions.addStackSuppressions(stack, [
            ...['NIST.800.53.R5-S3BucketLoggingEnabled', 'AwsSolutions-S1'].map(
                (nagId) => ({
                    id: nagId,
                    reason: 'Bucket logging is optional and up to the user to set through optional parameters of the construct.'
                })
            ),
            {
                id: 'NIST.800.53.R5-S3BucketReplicationEnabled',
                reason: 'Data is transient and deleted after use. Replication is not necessary.'
            },
            {
                id: 'AwsSolutions-IAM4',
                reason: 'Permissions are tightly scoped by CDK grants and otherwise set to the required permissions for updating CloudFormation stacks.',
                appliesTo: [
                    'Policy::arn:<AWS::Partition>:iam::aws:policy/ReadOnlyAccess'
                ]
            },
            {
                id: 'AwsSolutions-IAM5',
                reason: 'Permissions are tightly scoped by CDK grants and otherwise set to the required permissions for updating CloudFormation stacks.'
            }
        ]);
    });

    it('creates S3 bucket with default encryption', () => {
        new FriendlyEmbrace(stack, id);
        template = getTemplate();
        template.hasResourceProperties('AWS::S3::Bucket', {
            BucketEncryption: {
                ServerSideEncryptionConfiguration: [
                    {
                        ServerSideEncryptionByDefault: {
                            SSEAlgorithm: 'aws:kms'
                        }
                    }
                ]
            }
        });
    });

    it('creates Lambda function with expected configuration', () => {
        new FriendlyEmbrace(stack, id);
        template = getTemplate();
        template.hasResourceProperties('AWS::Lambda::Function', {
            Handler: 'index.handler',
            Runtime: 'nodejs22.x',
            Timeout: 300,
            MemorySize: 512
        });
    });

    it('creates custom resource with expected properties', () => {
        new FriendlyEmbrace(stack, id);
        template = getTemplate();
        template.hasResourceProperties('Custom::FriendlyEmbrace', {
            ServiceToken: {
                'Fn::GetAtt': Match.arrayWith([
                    Match.stringLikeRegexp('CrFriendlyEmbraceProvider.*'),
                    'Arn'
                ])
            }
        });
    });

    it('creates IAM role with required permissions', () => {
        new FriendlyEmbrace(stack, id);
        template = getTemplate();
        template.hasResourceProperties('AWS::IAM::Role', {
            AssumeRolePolicyDocument: {
                Statement: [
                    {
                        Action: 'sts:AssumeRole',
                        Effect: 'Allow',
                        Principal: {
                            Service: 'lambda.amazonaws.com'
                        }
                    }
                ]
            }
        });

        template.hasResourceProperties('AWS::IAM::Policy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: [
                            'cloudformation:DescribeStacks',
                            'cloudformation:GetTemplate',
                            'cloudformation:UpdateStack'
                        ],
                        Effect: 'Allow'
                    })
                ])
            }
        });

        template.hasResourceProperties('AWS::IAM::Role', {
            ManagedPolicyArns: [
                {
                    'Fn::Join': [
                        '',
                        [
                            'arn:',
                            {
                                Ref: 'AWS::Partition'
                            },
                            ':iam::aws:policy/ReadOnlyAccess'
                        ]
                    ]
                }
            ]
        });
    });

    it('allows the caller to reduce the read only permissions for operation', () => {
        new FriendlyEmbrace(stack, id, {
            manualReadPermissions: [
                new PolicyStatement({
                    actions: [
                        'dynamodb:DescribeTable',
                        'ec2:DescribeSecurityGroups',
                        'ec2:DescribeLaunchTemplates',
                        'ecs:DescribeServices',
                        'elasticloadbalancing:DescribeLoadBalancers',
                        'iam:GetRole',
                        'logs:DescribeLogGroups',
                        'sqs:getqueueattributes'
                    ],
                    effect: Effect.ALLOW,
                    resources: ['*']
                })
            ]
        });
        template = getTemplate();

        template.hasResourceProperties('AWS::IAM::Policy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: [
                            'cloudformation:DescribeStacks',
                            'cloudformation:GetTemplate',
                            'cloudformation:UpdateStack'
                        ],
                        Effect: 'Allow'
                    }),
                    Match.objectLike({
                        Action: [
                            'dynamodb:DescribeTable',
                            'ec2:DescribeSecurityGroups',
                            'ec2:DescribeLaunchTemplates',
                            'ecs:DescribeServices',
                            'elasticloadbalancing:DescribeLoadBalancers',
                            'iam:GetRole',
                            'logs:DescribeLogGroups',
                            'sqs:getqueueattributes'
                        ],
                        Effect: 'Allow'
                    })
                ])
            }
        });
    });

    it('creates S3 bucket with custom KMS encryption', () => {
        const key = new Key(stack, 'TestKey');
        new FriendlyEmbrace(stack, id, {
            encryption: key
        });
        template = getTemplate();
        template.hasResourceProperties('AWS::S3::Bucket', {
            BucketEncryption: {
                ServerSideEncryptionConfiguration: [
                    {
                        ServerSideEncryptionByDefault: {
                            SSEAlgorithm: 'aws:kms',
                            KMSMasterKeyID: Match.anyValue()
                        }
                    }
                ]
            }
        });
    });

    it('sets ignoreInvalidStates in custom resource properties', () => {
        new FriendlyEmbrace(stack, 'TestFriendlyEmbrace', {
            ignoreInvalidStates: true
        });
        template = getTemplate();
        template.hasResourceProperties('Custom::FriendlyEmbrace', {
            ignoreInvalidStates: true
        });
    });
});
