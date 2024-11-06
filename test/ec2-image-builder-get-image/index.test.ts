/**
 * (c) 2024 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
 *
 * This AWS Content is provided subject to the terms of the AWS Customer
 * Agreement available at https://aws.amazon.com/agreement or other written
 * agreement between Customer and either Amazon Web Services, Inc. or
 * Amazon Web Services EMEA SARL or both.
 */

import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Ec2ImageBuilderGetImage } from '../../src/ec2-image-builder-get-image';

describe('Ec2ImageBuilderGetImage', () => {
    let stack: Stack;

    beforeEach(() => {
        stack = new Stack(undefined, `TST${new Date().getTime()}`);
    });

    it('creates custom resource with correct properties', () => {
        // Arrange
        const imageBuildVersionArn =
            'arn:aws:imagebuilder:us-west-2:123456789012:image/example-image/1.0.0/1';

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

    it('grants necessary permissions to custom resource', () => {
        // Arrange
        const imageBuildVersionArn =
            'arn:aws:imagebuilder:us-west-2:123456789012:image/example-image/1.0.0/1';

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
            }
        });
    });
});
