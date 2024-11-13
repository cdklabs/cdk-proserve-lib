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
import { Ec2ImageBuilderGetImage } from '../../../src/constructs/ec2-image-builder-get-image';

describe('Ec2ImageBuilderGetImage', () => {
    let stack: Stack;
    const imageBuildVersionArn =
        'arn:aws:imagebuilder:us-west-2:123456789012:image/example-image/1.0.0/1';

    beforeEach(() => {
        stack = new Stack();
    });

    it('creates custom resource with correct properties', () => {
        // Act
        new Ec2ImageBuilderGetImage(stack, 'TestConstruct', {
            imageBuildVersionArn
        });

        // Assert
        const template = Template.fromStack(stack);
        template.hasResourceProperties('Custom::Ec2ImageBuilderGetImage', {
            ServiceToken: {
                'Fn::GetAtt': [
                    'AWS679f53fac002430cb0da5b7982bd22872D164C4C',
                    'Arn'
                ]
            },
            Create: Match.stringLikeRegexp(
                `"imageBuildVersionArn":"${imageBuildVersionArn}"`
            ),
            Update: Match.stringLikeRegexp(
                `"imageBuildVersionArn":"${imageBuildVersionArn}"`
            ),
            InstallLatestAwsSdk: true
        });
    });

    it('sets correct IAM policy', () => {
        // Act
        new Ec2ImageBuilderGetImage(stack, 'TestConstruct', {
            imageBuildVersionArn
        });

        // Assert
        const template = Template.fromStack(stack);
        template.hasResourceProperties('AWS::IAM::Policy', {
            PolicyDocument: {
                Statement: [
                    {
                        Action: 'imagebuilder:GetImage',
                        Effect: 'Allow',
                        Resource: imageBuildVersionArn
                    }
                ]
            },
            PolicyName: Match.stringLikeRegexp(
                'TestConstructImagePipelineAmiResourceCustomResourcePolicy'
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

    it('exposes ami', () => {
        // Act
        const construct = new Ec2ImageBuilderGetImage(stack, 'TestConstruct', {
            imageBuildVersionArn
        });

        // Assert
        expect(construct.ami).toBeDefined();
        expect(stack.resolve(construct.ami)).toEqual({
            'Fn::GetAtt': [
                'TestConstructImagePipelineAmiResourceC003FA3E',
                'image.outputResources.amis.0.image'
            ]
        });
    });
});
