// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import { CfnComponent } from 'aws-cdk-lib/aws-imagebuilder';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Ec2ImagePipeline } from '../../../src/constructs/ec2-image-pipeline';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';

describeCdkTest(Ec2ImagePipeline, (id, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();
    });

    it('creates image pipeline with default properties', () => {
        // Act
        new Ec2ImagePipeline(stack, id, {
            version: '0.1.0'
        });

        // Assert
        const template = getTemplate();
        template.resourceCountIs('AWS::ImageBuilder::ImagePipeline', 1);
        template.resourceCountIs(
            'AWS::ImageBuilder::InfrastructureConfiguration',
            1
        );
        template.resourceCountIs('AWS::ImageBuilder::ImageRecipe', 1);
        template.resourceCountIs('AWS::SNS::Topic', 1);
        template.resourceCountIs('AWS::IAM::Role', 1);
        template.resourceCountIs('AWS::IAM::InstanceProfile', 1);
    });

    it('creates image pipeline with custom properties', () => {
        // Arrange
        const vpc = new Vpc(stack, 'TestVpc');
        const securityGroup = new SecurityGroup(stack, 'TestSG', { vpc });
        const kmsKey = new Key(stack, 'TestKey');

        // Act
        new Ec2ImagePipeline(stack, id, {
            version: '1.0.0',
            description: 'Test pipeline',
            encryption: kmsKey,
            vpcConfiguration: {
                vpc,
                securityGroup
            },
            components: [Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_LINUX],
            buildConfiguration: {
                start: true,
                waitForCompletion: true
            }
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::ImageBuilder::ImagePipeline', {
            Name: Match.stringLikeRegexp(id),
            Description: 'Test pipeline'
        });

        template.hasResourceProperties(
            'AWS::ImageBuilder::InfrastructureConfiguration',
            {
                SecurityGroupIds: [
                    {
                        'Fn::GetAtt': [
                            Match.stringLikeRegexp('TestSG'),
                            'GroupId'
                        ]
                    }
                ]
            }
        );

        template.hasResourceProperties('AWS::SNS::Topic', {
            KmsMasterKeyId: {
                'Fn::GetAtt': [Match.stringLikeRegexp('TestKey'), 'Arn']
            }
        });

        template.hasResourceProperties('AWS::ImageBuilder::ImageRecipe', {
            Version: '1.0.0',
            Components: [
                {
                    ComponentArn: {
                        'Fn::Join': [
                            '',
                            [
                                'arn:',
                                { Ref: 'AWS::Partition' },
                                ':imagebuilder:',
                                { Ref: 'AWS::Region' },
                                ':aws:component/aws-cli-version-2-linux/x.x.x'
                            ]
                        ]
                    }
                }
            ]
        });

        template.resourceCountIs('Custom::Ec2ImageBuilderStart', 1);
        template.resourceCountIs('Custom::Ec2ImageBuilderGetImage', 1);
    });

    it('exposes image pipeline ARN and SNS topic', () => {
        // Act
        const imagePipeline = new Ec2ImagePipeline(stack, id, {
            version: '0.1.0'
        });

        // Assert
        expect(imagePipeline.imagePipelineArn).toBeDefined();
        expect(imagePipeline.imagePipelineTopic).toBeDefined();
    });

    it('sets latestAmi when waitForCompletion is true', () => {
        // Act
        const imagePipeline = new Ec2ImagePipeline(stack, id, {
            version: '0.1.0',
            buildConfiguration: {
                start: true,
                waitForCompletion: true
            }
        });

        // Assert
        expect(imagePipeline.latestAmi).toBeDefined();
    });

    it('does not set latestAmi when waitForCompletion is false', () => {
        // Act
        const imagePipeline = new Ec2ImagePipeline(stack, id, {
            version: '0.1.0',
            buildConfiguration: {
                start: true,
                waitForCompletion: false
            }
        });

        // Assert
        expect(() => imagePipeline.latestAmi).toThrow(
            'Cannot access the `latestAmi` property of the Image Pipeline without configuring buildConfiguration.start and buildConfiguration.waitForCompletion as true.'
        );
    });

    it('creates image pipeline with custom CfnComponent', () => {
        // Arrange
        const customComponent = new CfnComponent(stack, 'CustomComponent', {
            name: 'MyCustomComponent',
            platform: 'Linux',
            version: '1.0.0',
            data: 'name: MyCustomComponent\nschemaVersion: 1.0\n\nphases:\n  - name: build\n    steps:\n      - name: Example\n        action: ExecuteBash\n        inputs:\n          commands:\n            - echo "Hello, World!"'
        });

        // Act
        new Ec2ImagePipeline(stack, id, {
            version: '0.1.0',
            components: [
                Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_LINUX,
                customComponent
            ]
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties('AWS::ImageBuilder::Component', {
            Name: 'MyCustomComponent',
            Platform: 'Linux',
            Version: '1.0.0'
        });

        template.hasResourceProperties('AWS::ImageBuilder::ImageRecipe', {
            Components: [
                {
                    ComponentArn: {
                        'Fn::Join': [
                            '',
                            [
                                'arn:',
                                { Ref: 'AWS::Partition' },
                                ':imagebuilder:',
                                { Ref: 'AWS::Region' },
                                ':aws:component/aws-cli-version-2-linux/x.x.x'
                            ]
                        ]
                    }
                },
                {
                    ComponentArn: {
                        'Fn::GetAtt': ['CustomComponent', 'Arn']
                    }
                }
            ]
        });
    });

    it('creates image pipeline with provided security group', () => {
        // Arrange
        const vpc = new Vpc(stack, 'TestVpc');
        const securityGroup = new SecurityGroup(stack, 'TestSecurityGroup', {
            vpc,
            description: 'Test security group for Image Builder',
            allowAllOutbound: true
        });

        // Act
        new Ec2ImagePipeline(stack, id, {
            version: '0.1.0',
            vpcConfiguration: {
                vpc,
                securityGroup
            }
        });

        // Assert
        const template = getTemplate();

        // Verify that the security group is created
        template.hasResourceProperties('AWS::EC2::SecurityGroup', {
            GroupDescription: 'Test security group for Image Builder',
            VpcId: {
                Ref: Match.stringLikeRegexp('TestVpc')
            }
        });

        // Verify that the InfrastructureConfiguration uses the provided security group
        template.hasResourceProperties(
            'AWS::ImageBuilder::InfrastructureConfiguration',
            {
                SecurityGroupIds: [
                    {
                        'Fn::GetAtt': [
                            Match.stringLikeRegexp('TestSecurityGroup'),
                            'GroupId'
                        ]
                    }
                ]
            }
        );

        // Verify that no additional security group is created by the construct
        template.resourceCountIs('AWS::EC2::SecurityGroup', 1);
    });

    it('creates image pipeline with no security group', () => {
        // Arrange
        const vpc = new Vpc(stack, 'TestVpc');

        // Act
        new Ec2ImagePipeline(stack, id, {
            version: '0.1.0',
            vpcConfiguration: {
                vpc
            }
        });

        // Assert
        const template = getTemplate();

        // Verify that the security group is created
        template.hasResourceProperties('AWS::EC2::SecurityGroup', {
            GroupDescription: 'Security group for Image Builder pipeline',
            VpcId: {
                Ref: Match.stringLikeRegexp('TestVpc')
            }
        });

        // Verify that the InfrastructureConfiguration uses the provided security group
        template.hasResourceProperties(
            'AWS::ImageBuilder::InfrastructureConfiguration',
            {
                SecurityGroupIds: [
                    {
                        'Fn::GetAtt': [Match.stringLikeRegexp(id), 'GroupId']
                    }
                ]
            }
        );

        // Verify that no additional security group is created by the construct
        template.resourceCountIs('AWS::EC2::SecurityGroup', 1);
    });

    it('throws error for invalid SEMVER format', () => {
        expect(() => {
            new Ec2ImagePipeline(stack, id, {
                version: 'asdf'
            });
        }).toThrow(/Expected type: SEMVER/);
    });

    it('grants encryption permissions to ImageBuilder service role when KMS key is provided', () => {
        // Arrange
        const kmsKey = new Key(stack, 'TestKey');

        // Act
        new Ec2ImagePipeline(stack, id, {
            version: '0.1.0',
            encryption: kmsKey
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::KMS::Key', {
            KeyPolicy: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: [
                            'kms:Decrypt',
                            'kms:Encrypt',
                            'kms:ReEncrypt*',
                            'kms:GenerateDataKey*'
                        ],
                        Effect: 'Allow',
                        Principal: {
                            AWS: {
                                'Fn::Join': [
                                    '',
                                    [
                                        'arn:',
                                        { Ref: 'AWS::Partition' },
                                        ':iam::',
                                        { Ref: 'AWS::AccountId' },
                                        ':role/aws-service-role/imagebuilder.amazonaws.com/AWSServiceRoleForImageBuilder'
                                    ]
                                ]
                            }
                        }
                    })
                ])
            }
        });
    });
});
