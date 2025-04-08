// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { Aspects, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Vpc, SubnetType, FlowLogDestination } from 'aws-cdk-lib/aws-ec2';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Key } from 'aws-cdk-lib/aws-kms';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import {
    CfnNotebookInstance,
    CfnNotebookInstanceLifecycleConfig
} from 'aws-cdk-lib/aws-sagemaker';
import { NagSuppressions } from 'cdk-nag';
import { beforeEach, it, expect } from 'vitest';
import { SageMakerAutomatedShutdown } from '../../../src/aspects/sagemaker-automated-shutdown';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

describeCdkTest(SageMakerAutomatedShutdown, (_, getStack, getTemplate) => {
    let stack: Stack;
    let vpc: Vpc;
    let role: Role;
    let key: Key;

    beforeEach(() => {
        stack = getStack();
        key = new Key(stack, 'TestKey', {
            enableKeyRotation: true
        });

        NagSuppressions.addStackSuppressions(stack, [
            {
                id: 'AwsSolutions-IAM4',
                reason: 'Using best practice AWS Managed Lambda policy'
            },
            {
                id: 'AwsSolutions-IAM5',
                reason: 'Lambda needs to describe any existing lifecycle config that might be attached to the notebook instance. The name is not known at deployment time as it depends on the instance configuration.'
            }
        ]);

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
                idleTimeoutMinutes: 30,
                encryption: key
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
                idleTimeoutMinutes: 45,
                encryption: key
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
        const key2 = new Key(stack, 'TestKey2', {
            enableKeyRotation: true
        });

        new CfnNotebookInstance(stack, 'Notebook2', {
            instanceType: 'ml.t3.medium',
            roleArn: role.roleArn,
            kmsKeyId: key2.keyId,
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

    it('should preserve existing lifecycle config content when present', () => {
        // Arrange
        const existingScript = '#!/bin/bash\necho "existing onStart script"';
        const existingConfig = new CfnNotebookInstanceLifecycleConfig(
            stack,
            'ExistingConfig',
            {
                notebookInstanceLifecycleConfigName: 'existing-config',
                onStart: [
                    {
                        content: Buffer.from(existingScript).toString('base64')
                    }
                ]
            }
        );
        const notebook = new CfnNotebookInstance(
            stack,
            'NotebookWithExistingConfig',
            {
                instanceType: 'ml.t3.medium',
                roleArn: role.roleArn,
                lifecycleConfigName:
                    existingConfig.notebookInstanceLifecycleConfigName
            }
        );

        // Act
        Aspects.of(stack).add(
            new SageMakerAutomatedShutdown({
                idleTimeoutMinutes: 30
            })
        );

        // Assert
        const template = Template.fromStack(stack);

        const lifecycleConfigs = template.findResources(
            'AWS::SageMaker::NotebookInstanceLifecycleConfig'
        );

        const mergedConfig = Object.values(lifecycleConfigs).find((config) =>
            config.Properties.NotebookInstanceLifecycleConfigName.startsWith(
                'merged-auto-shutdown-'
            )
        );

        expect(mergedConfig).toBeDefined();

        const decodedContent = Buffer.from(
            mergedConfig!.Properties.OnStart[0].Content,
            'base64'
        ).toString('utf-8');

        expect(decodedContent).toContain('existing onStart script');
        expect(decodedContent).toContain('auto-stop-script.py');

        template.hasResourceProperties('AWS::SageMaker::NotebookInstance', {
            InstanceType: 'ml.t3.medium',
            LifecycleConfigName: Match.stringLikeRegexp(
                'merged-auto-shutdown-.*'
            )
        });
    });

    // it('should handle multiple notebook instances with different existing configs', () => {
    //     // Arrange
    //     const existingConfig1 = new CfnNotebookInstanceLifecycleConfig(
    //         stack,
    //         'ExistingConfig1',
    //         {
    //             notebookInstanceLifecycleConfigName: 'existing-config-1',
    //             onStart: [
    //                 {
    //                     content: Buffer.from(
    //                         '#!/bin/bash\necho "existing script 1"'
    //                     ).toString('base64')
    //                 }
    //             ]
    //         }
    //     );

    //     const existingConfig2 = new CfnNotebookInstanceLifecycleConfig(
    //         stack,
    //         'ExistingConfig2',
    //         {
    //             notebookInstanceLifecycleConfigName: 'existing-config-2',
    //             onStart: [
    //                 {
    //                     content: Buffer.from(
    //                         '#!/bin/bash\necho "existing script 2"'
    //                     ).toString('base64')
    //                 }
    //             ]
    //         }
    //     );

    //     const notebook1 = new CfnNotebookInstance(stack, 'Notebook1', {
    //         instanceType: 'ml.t3.medium',
    //         roleArn: role.roleArn,
    //         lifecycleConfigName: existingConfig1.ref
    //     });

    //     const notebook2 = new CfnNotebookInstance(stack, 'Notebook2', {
    //         instanceType: 'ml.t3.medium',
    //         roleArn: role.roleArn,
    //         lifecycleConfigName: existingConfig2.ref
    //     });

    //     // Act
    //     Aspects.of(stack).add(new SageMakerAutomatedShutdown());

    //     const template = Template.fromStack(stack);

    //     // Assert
    //     const configs = template.findResources(
    //         'AWS::SageMaker::NotebookInstanceLifecycleConfig'
    //     );
    //     const notebooks = template.findResources(
    //         'AWS::SageMaker::NotebookInstance'
    //     );

    //     Object.values(notebooks).forEach((notebook, index) => {
    //         const configRef = notebook.Properties.LifecycleConfigName.Ref;
    //         const config = configs[configRef];
    //         expect(config).toBeDefined();

    //         // Verify the content includes both the existing script and auto-stop script
    //         const content = config.Properties.OnStart[0].Content;
    //         if (typeof content === 'string') {
    //             const decodedContent = Buffer.from(content, 'base64').toString(
    //                 'utf-8'
    //             );
    //             expect(decodedContent).toContain(
    //                 `existing script ${index + 1}`
    //             );
    //             expect(decodedContent).toContain('auto-stop-script.py');
    //         }
    //     });

    //     // const customResources = {
    //     //     ...template.findResources('Custom::AWS'),
    //     //     ...template.findResources('AWS::CloudFormation::CustomResource')
    //     // };

    //     // expect(Object.keys(customResources).length).toBeGreaterThan(1);

    //     // template.resourceCountIs('AWS::Lambda::Function', 2); // Including VPC function
    // });
});
