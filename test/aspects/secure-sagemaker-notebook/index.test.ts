// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Vpc, SubnetType, FlowLogDestination } from 'aws-cdk-lib/aws-ec2';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Key } from 'aws-cdk-lib/aws-kms';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { CfnNotebookInstance } from 'aws-cdk-lib/aws-sagemaker';
import { SecureSageMakerNotebook } from '../../../src/aspects/secure-sagemaker-notebook';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';

describeCdkTest(SecureSageMakerNotebook, (_, getStack, getTemplate) => {
    let stack: Stack;
    let vpc: Vpc;
    let role: Role;

    beforeEach(() => {
        stack = getStack();
        const key = new Key(stack, 'TestKey', {
            enableKeyRotation: true
        });

        vpc = new Vpc(stack, 'TestVpc', {
            maxAzs: 2,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'Private',
                    subnetType: SubnetType.PRIVATE_WITH_EGRESS
                }
            ],
            natGateways: 0,
            flowLogs: {
                foo: {
                    destination: FlowLogDestination.toCloudWatchLogs(
                        new LogGroup(stack, 'TestLogGroup', {
                            encryptionKey: key
                        })
                    )
                }
            },
            restrictDefaultSecurityGroup: true
        });

        role = new Role(stack, 'NotebookRole', {
            assumedBy: new ServicePrincipal('sagemaker.amazonaws.com')
        });

        new CfnNotebookInstance(stack, 'TestNotebook', {
            instanceType: 'ml.t3.medium',
            roleArn: role.roleArn,
            kmsKeyId: key.keyId
        });
    });

    it('should configure notebook instance with secure settings', () => {
        // Arrange
        const privateSubnet = vpc.privateSubnets[0];

        // Act
        Aspects.of(stack).add(
            new SecureSageMakerNotebook({
                notebookSubnet: privateSubnet,
                allowedLaunchSubnets: vpc.privateSubnets,
                directInternetAccess: false,
                rootAccess: false
            })
        );

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::SageMaker::NotebookInstance', {
            SubnetId: Match.objectLike({
                Ref: Match.stringLikeRegexp(privateSubnet.node.id)
            }),
            DirectInternetAccess: 'Disabled',
            RootAccess: 'Disabled'
        });
    });

    it('should create & attach managed policy for subnet restrictions', () => {
        // Arrange

        const privateSubnet = vpc.privateSubnets[0];

        // Act
        Aspects.of(stack).add(
            new SecureSageMakerNotebook({
                notebookSubnet: privateSubnet,
                allowedLaunchSubnets: vpc.privateSubnets
            })
        );

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::IAM::ManagedPolicy', {
            PolicyDocument: {
                Statement: [
                    {
                        Effect: 'Deny',
                        Action: [
                            'sagemaker:CreateTrainingJob',
                            'sagemaker:CreateHyperParameterTuningJob',
                            'sagemaker:CreateModel',
                            'sagemaker:CreateProcessingJob'
                        ],
                        Resource: '*',
                        Condition: {
                            Bool: {
                                'sagemaker:NetworkIsolation': false
                            }
                        }
                    },
                    {
                        Effect: 'Deny',
                        Action: [
                            'sagemaker:CreateTrainingJob',
                            'sagemaker:CreateHyperParameterTuningJob',
                            'sagemaker:CreateModel',
                            'sagemaker:CreateProcessingJob'
                        ],
                        Resource: '*',
                        Condition: {
                            'ForAnyValue:StringNotEquals': {
                                'sagemaker:VpcSubnets': Match.arrayWith([
                                    Match.objectLike({
                                        Ref: Match.stringLikeRegexp(
                                            'PrivateSubnet1'
                                        )
                                    }),
                                    Match.objectLike({
                                        Ref: Match.stringLikeRegexp(
                                            'PrivateSubnet2'
                                        )
                                    })
                                ])
                            }
                        }
                    },
                    {
                        Effect: 'Deny',
                        Action: [
                            'sagemaker:CreateTrainingJob',
                            'sagemaker:CreateHyperParameterTuningJob',
                            'sagemaker:CreateModel',
                            'sagemaker:CreateProcessingJob'
                        ],
                        Resource: '*',
                        Condition: {
                            Null: {
                                'sagemaker:VpcSubnets': 'true'
                            }
                        }
                    }
                ]
            }
        });
    });
});
