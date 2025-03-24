// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Duration, Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { beforeEach, it, expect } from 'vitest';
import { Ec2ImageBuilderStart } from '../../../src/constructs/ec2-image-builder-start';
import {
    Ec2ImageBuilderStartHashError,
    Ec2ImageBuilderStartTimeoutError
} from '../../../src/constructs/ec2-image-builder-start/types/exception';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

const pipelineArn =
    'arn:aws:imagebuilder:us-west-2:123456789012:image-pipeline/example-pipeline';

describeCdkTest(Ec2ImageBuilderStart, (id, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();
    });

    it('creates custom resource', () => {
        // Act
        new Ec2ImageBuilderStart(stack, id, {
            pipelineArn
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties('Custom::Ec2ImageBuilderStart', {
            ServiceToken: {
                'Fn::GetAtt': [
                    'AWS679f53fac002430cb0da5b7982bd22872D164C4C',
                    'Arn'
                ]
            },
            Create: Match.stringLikeRegexp(
                `"imagePipelineArn":"${pipelineArn}`
            ),
            Update: Match.stringLikeRegexp(
                `"imagePipelineArn":"${pipelineArn}`
            ),
            InstallLatestAwsSdk: true
        });
    });

    it('sets correct IAM policy', () => {
        // Act
        new Ec2ImageBuilderStart(stack, id, {
            pipelineArn
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::IAM::Policy', {
            PolicyDocument: {
                Statement: [
                    {
                        Action: 'imagebuilder:StartImagePipelineExecution',
                        Effect: 'Allow',
                        Resource: pipelineArn
                    }
                ],
                Version: '2012-10-17'
            },
            PolicyName: Match.stringLikeRegexp(id),
            Roles: Match.arrayWith([
                {
                    Ref: Match.stringLikeRegexp(
                        'AWS679f53fac002430cb0da5b7982bd2287ServiceRole'
                    )
                }
            ])
        });
    });

    it('exposes imageBuildVersionArn', () => {
        // Act
        const construct = new Ec2ImageBuilderStart(stack, id, {
            pipelineArn
        });

        // Assert
        expect(construct.imageBuildVersionArn).toBeDefined();
        expect(stack.resolve(construct.imageBuildVersionArn)).toEqual({
            'Fn::GetAtt': [
                'Ec2ImageBuilderStartEc2ImageBuilderStartCr25FFB31E',
                'imageBuildVersionArn'
            ]
        });
    });

    it('should not create any resources when waitForCompletion is unset', () => {
        new Ec2ImageBuilderStart(stack, id, {
            pipelineArn
        });

        const template = getTemplate();
        template.resourceCountIs('AWS::CloudFormation::WaitConditionHandle', 0);
        template.resourceCountIs('AWS::CloudFormation::WaitCondition', 0);
    });

    it('should create necessary resources when waitForCompletion is true', () => {
        const topic = new Topic(stack, 'TestTopic');
        new Ec2ImageBuilderStart(stack, id, {
            pipelineArn,
            waitForCompletion: {
                topic: topic,
                timeout: Duration.hours(2)
            }
        });

        const template = getTemplate();
        template.resourceCountIs('AWS::CloudFormation::WaitConditionHandle', 1);
        template.hasResourceProperties('AWS::CloudFormation::WaitCondition', {
            Timeout: '7200' // 2 hours in seconds
        });
    });

    it('should use default timeout when not specified', () => {
        const topic = new Topic(stack, 'TestTopic');

        new Ec2ImageBuilderStart(stack, id, {
            pipelineArn,
            waitForCompletion: {
                topic: topic
            }
        });

        const template = getTemplate();
        template.hasResourceProperties('AWS::CloudFormation::WaitCondition', {
            Timeout: '43200' // 12 hours in seconds
        });
    });

    it('should subscribe Lambda function to the provided SNS topic', () => {
        const topic = new Topic(stack, 'TestTopic');

        new Ec2ImageBuilderStart(stack, id, {
            pipelineArn,
            waitForCompletion: {
                topic: topic
            }
        });

        const template = getTemplate();
        template.hasResourceProperties('AWS::SNS::Subscription', {
            Endpoint: {
                'Fn::GetAtt': [Match.stringLikeRegexp('WaiterSignal'), 'Arn']
            },
            Protocol: 'lambda',
            TopicArn: {
                Ref: Match.stringLikeRegexp('TestTopic')
            }
        });
    });

    it('should create resources with hash', () => {
        new Ec2ImageBuilderStart(stack, id, {
            pipelineArn,
            hash: 'hash'
        });

        const template = getTemplate();
        template.hasResourceProperties('Custom::Ec2ImageBuilderStart', {
            Create: Match.stringLikeRegexp('hash'),
            Update: Match.stringLikeRegexp('hash')
        });
    });

    it('creates resources in vpc when specified', () => {
        new Ec2ImageBuilderStart(stack, id, {
            pipelineArn,
            lambdaConfiguration: {
                vpc: new Vpc(stack, 'TestVpc')
            }
        });

        const template = getTemplate();
        template.hasResourceProperties('AWS::Lambda::Function', {
            VpcConfig: Match.anyValue()
        });
    });

    it('throws error for invalid ARN format', () => {
        expect(() => {
            new Ec2ImageBuilderStart(stack, id, {
                pipelineArn: 'invalid-arn'
            });
        }).toThrow(/Expected type: AWS_ARN/);
    });

    it('throws error if timeout is over 12 hours', () => {
        expect(() => {
            new Ec2ImageBuilderStart(stack, id, {
                pipelineArn,
                waitForCompletion: {
                    topic: new Topic(stack, 'TestTopic'),
                    timeout: Duration.hours(13)
                }
            });
        }).toThrow(Ec2ImageBuilderStartTimeoutError);
    });

    it('throws error if hash is more than 7 characters', () => {
        expect(() => {
            new Ec2ImageBuilderStart(stack, id, {
                pipelineArn,
                hash: '12345678'
            });
        }).toThrow(Ec2ImageBuilderStartHashError);
    });

    it('uses user provided log configuration for lambda', () => {
        new Ec2ImageBuilderStart(stack, id, {
            pipelineArn,
            lambdaConfiguration: {
                logGroupRetention: RetentionDays.FIVE_DAYS
            }
        });

        const template = getTemplate();
        template.hasResourceProperties('Custom::LogRetention', {
            RetentionInDays: 5
        });
    });
});
