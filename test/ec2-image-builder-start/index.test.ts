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

import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Ec2ImageBuilderStart } from '../../src/ec2-image-builder-start';

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
            'Fn::GetAtt': ['TestConstruct45D4903A', 'imageBuildVersionArn']
        });
    });
});
