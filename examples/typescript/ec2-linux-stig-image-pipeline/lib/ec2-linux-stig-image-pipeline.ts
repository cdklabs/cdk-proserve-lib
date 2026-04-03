// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Ec2ImagePipeline } from '@cdklabs/cdk-proserve-lib/constructs';
import { Ec2LinuxImagePipeline } from '@cdklabs/cdk-proserve-lib/patterns';

/**
 * CDK Stack that creates an EC2 Linux STIG Image Pipeline. This stack will
 * build out an AMI automatically that has STIGs applied through AWS Image
 * Builder components. This example also showcases installing other features/
 * components, such as the AWS CLI, AWS SSM Agent, and Python.
 */
export class Ec2LinuxStigImagePipelineStack extends Stack {
    /**
     * Creates a new Ec2LinuxStigImagePipelineStack.
     * @param scope - The scope in which to define this construct
     * @param id - The scoped construct ID
     * @param props - Stack properties
     */
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Create the pipeline to build the STIG Image using EC2 Image Builder
        const stigPipeline = new Ec2LinuxImagePipeline(this, 'StigPipeline', {
            version: '0.1.0',
            operatingSystem:
                Ec2LinuxImagePipeline.OperatingSystem.AMAZON_LINUX_2023,
            rootVolumeSize: 100,
            description: 'Amazon Linux 2023 w/ STIGs',
            features: [
                Ec2LinuxImagePipeline.Feature.RETAIN_SSM_AGENT,
                Ec2LinuxImagePipeline.Feature.AWS_CLI,
                Ec2LinuxImagePipeline.Feature.STIG
            ],
            extraComponents: [Ec2ImagePipeline.Component.PYTHON_3_LINUX],
            buildConfiguration: {
                start: true,
                waitForCompletion: true
            }
        });

        // Since we have `waitForCompletion` set to true, we can output the
        // actual AMI that gets built and/or pass it to other resources in our
        // stack.
        this.exportValue(stigPipeline.latestAmi);
    }
}
