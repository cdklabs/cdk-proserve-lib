// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { Aspects, Stack } from 'aws-cdk-lib';
import { Vpc, SubnetType, FlowLogDestination } from 'aws-cdk-lib/aws-ec2';
import { Match } from 'aws-cdk-lib/assertions';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { Key } from 'aws-cdk-lib/aws-kms';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';
import { CfnNotebookInstance } from 'aws-cdk-lib/aws-sagemaker';
import { SageMakerAutomatedShutdown } from '../../../src/aspects/sagemaker-automated-shutdown';

describeCdkTest(SageMakerAutomatedShutdown, (_, getStack, getTemplate) => {
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
            kmsKeyId: key.keyId,
            subnetId: vpc.privateSubnets[0].subnetId,
            directInternetAccess: 'Disabled',
            rootAccess: 'Disabled'
        });
    });

    it('should create lifecycle config when visiting a notebook instance', () => {
        // Act
        Aspects.of(stack).add(
            new SageMakerAutomatedShutdown({
                idleTimeoutMinutes: 30
            })
        );

        const template = getTemplate();

        // Assert
        template.hasResourceProperties(
            'AWS::SageMaker::NotebookInstanceLifecycleConfig',
            {
                NotebookInstanceLifecycleConfigName:
                    Match.stringLikeRegexp('auto-shutdown-.*'),
                OnStart: Match.arrayWith([
                    Match.objectLike({
                        Content: Match.stringLikeRegexp('.*')
                    })
                ])
            }
        );
    });

    it('should use default timeout when not specified', () => {
        // Act
        Aspects.of(stack).add(new SageMakerAutomatedShutdown());

        const template = getTemplate();

        // Assert
        const configs = template.findResources(
            'AWS::SageMaker::NotebookInstanceLifecycleConfig'
        );
        const configContent =
            Object.values(configs)[0].Properties.OnStart[0].Content;
        const decodedContent = Buffer.from(configContent, 'base64').toString(
            'utf-8'
        );
        expect(decodedContent).toContain('--time 60');
    });

    it('should use custom timeout when specified', () => {
        // Act
        Aspects.of(stack).add(
            new SageMakerAutomatedShutdown({
                idleTimeoutMinutes: 45
            })
        );

        const template = getTemplate();

        // Assert
        const configs = template.findResources(
            'AWS::SageMaker::NotebookInstanceLifecycleConfig'
        );
        const configContent =
            Object.values(configs)[0].Properties.OnStart[0].Content;
        const decodedContent = Buffer.from(configContent, 'base64').toString(
            'utf-8'
        );
        expect(decodedContent).toContain('--time 45');
    });

    it('should handle multiple notebook instances', () => {
        // Arrange
        const key = new Key(stack, 'TestKey2', {
            enableKeyRotation: true
        });

        new CfnNotebookInstance(stack, 'Notebook2', {
            instanceType: 'ml.t3.medium',
            roleArn: role.roleArn,
            kmsKeyId: key.keyId,
            subnetId: vpc.privateSubnets[0].subnetId,
            directInternetAccess: 'Disabled',
            rootAccess: 'Disabled'
        });

        // Act
        Aspects.of(stack).add(new SageMakerAutomatedShutdown());

        const template = getTemplate();

        // Assert
        template.resourceCountIs(
            'AWS::SageMaker::NotebookInstanceLifecycleConfig',
            2
        );
    });
});
