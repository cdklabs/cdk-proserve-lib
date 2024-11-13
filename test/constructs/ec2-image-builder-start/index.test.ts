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

import { writeFileSync } from 'fs';
import { Duration, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Ec2ImageBuilderStart } from '../../../src/constructs/ec2-image-builder-start';

describe('Ec2ImageBuilderStart', () => {
    let stack: Stack;
    const pipelineArn =
        'arn:aws:imagebuilder:us-west-2:123456789012:image-pipeline/example-pipeline';

    beforeEach(() => {
        stack = new Stack();
    });

    it('creates custom resource', () => {
        // Act
        new Ec2ImageBuilderStart(stack, 'TestConstruct', {
            pipelineArn
        });

        // Assert
        const template = Template.fromStack(stack);
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
        new Ec2ImageBuilderStart(stack, 'TestConstruct', {
            pipelineArn
        });

        // Assert
        const template = Template.fromStack(stack);
        template.findResources('AWS::IAM::Policy', {
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
            PolicyName: Match.stringLikeRegexp(
                'TestConstructCustomResourcePolicy'
            ),
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
        const construct = new Ec2ImageBuilderStart(stack, 'TestConstruct', {
            pipelineArn
        });

        // Assert
        expect(construct.imageBuildVersionArn).toBeDefined();
        expect(stack.resolve(construct.imageBuildVersionArn)).toEqual({
            'Fn::GetAtt': [
                'TestConstructEc2ImageBuilderStartCr0700698E',
                'imageBuildVersionArn'
            ]
        });
    });

    it('should not create any resources when waitForCompletion is unset', () => {
        new Ec2ImageBuilderStart(stack, 'TestConstruct', {
            pipelineArn
        });

        const template = Template.fromStack(stack);
        template.resourceCountIs('AWS::CloudFormation::WaitConditionHandle', 0);
        template.resourceCountIs('AWS::CloudFormation::WaitCondition', 0);
    });

    it('should create necessary resources when waitForCompletion is true', () => {
        const topic = new Topic(stack, 'TestTopic');

        new Ec2ImageBuilderStart(stack, 'TestConstruct', {
            pipelineArn,
            waitForCompletion: {
                topic: topic,
                timeout: Duration.hours(2)
            }
        });

        const template = Template.fromStack(stack);
        template.resourceCountIs('AWS::CloudFormation::WaitConditionHandle', 1);
        template.hasResourceProperties('AWS::CloudFormation::WaitCondition', {
            Timeout: '7200' // 2 hours in seconds
        });
    });

    it('should use default timeout when not specified', () => {
        const topic = new Topic(stack, 'TestTopic');

        new Ec2ImageBuilderStart(stack, 'TestConstruct', {
            pipelineArn,
            waitForCompletion: {
                topic: topic
            }
        });

        const template = Template.fromStack(stack);
        template.hasResourceProperties('AWS::CloudFormation::WaitCondition', {
            Timeout: '43200' // 12 hours in seconds
        });
    });

    it('should subscribe Lambda function to the provided SNS topic', () => {
        const topic = new Topic(stack, 'TestTopic');

        new Ec2ImageBuilderStart(stack, 'TestConstruct', {
            pipelineArn,
            waitForCompletion: {
                topic: topic
            }
        });

        const template = Template.fromStack(stack);

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
        new Ec2ImageBuilderStart(stack, 'TestConstruct', {
            pipelineArn,
            hash: 'testHash'
        });

        const template = Template.fromStack(stack);

        template.hasResourceProperties('Custom::Ec2ImageBuilderStart', {
            Create: Match.stringLikeRegexp('testHash'),
            Update: Match.stringLikeRegexp('testHash')
        });
    });

    it('creates resources in vpc when specified', () => {
        new Ec2ImageBuilderStart(stack, 'TestConstruct', {
            pipelineArn,
            lambdaConfiguration: {
                vpc: new Vpc(stack, 'TestVpc')
            }
        });

        const template = Template.fromStack(stack);
        writeFileSync('test.json', JSON.stringify(template.toJSON()));
        template.hasResourceProperties('AWS::Lambda::Function', {
            VpcConfig: Match.anyValue()
        });
    });
});
