// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, Stack } from 'aws-cdk-lib';
import { Instance, InstanceType, InstanceClass, InstanceSize, AmazonLinuxImage, Vpc, SubnetType, SecurityGroup, FlowLogDestination, FlowLogTrafficType, BlockDeviceVolume } from 'aws-cdk-lib/aws-ec2';
import { NagSuppressions } from 'cdk-nag';
import { Template } from 'aws-cdk-lib/assertions';
import { Ec2AutomatedShutdown } from '../../../src/aspects/ec2-automated-shutdown';
import { Key } from 'aws-cdk-lib/aws-kms';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';

describeCdkTest(Ec2AutomatedShutdown, (_, getStack, getTemplate) => {
    let stack: Stack;
    let template: Template;

    beforeEach(() => {
        stack = getStack();

        NagSuppressions.addStackSuppressions(stack, [
            {
                id: 'AwsSolutions-IAM4',
                reason: 'Not testing IAM in this test scenario.'
            },
            {
                id: 'AwsSolutions-IAM5',
                reason: 'Permissions are tightly scoped for EC2 shutdown functionality.'
            },
            {
                id: 'AwsSolutions-S1',
                reason: 'This S3 bucket is just used for flow logs for the VPC testing the Aspect.'
            },
            {
                id: 'AwsSolutions-S10',
                reason: 'This S3 bucket is just used for flow logs for the VPC testing the Aspect.'
            },
            {
                id: 'NIST.800.53.R5-S3BucketLoggingEnabled',
                reason: 'This S3 bucket is just used for flow logs for the VPC testing the Aspect.'
            },
            {
                id: 'NIST.800.53.R5-S3BucketPublicReadProhibited',
                reason: 'This S3 bucket is just used for flow logs for the VPC testing the Aspect.'
            },
            {
                id: 'NIST.800.53.R5-S3BucketPublicWriteProhibited',
                reason: 'This S3 bucket is just used for flow logs for the VPC testing the Aspect.'
            },
            {
                id: 'NIST.800.53.R5-S3BucketReplicationEnabled',
                reason: 'This S3 bucket is just used for flow logs for the VPC testing the Aspect.'
            },
            {
                id: 'NIST.800.53.R5-S3BucketSSLRequestsOnly',
                reason: 'This S3 bucket is just used for flow logs for the VPC testing the Aspect.'
            },
            {
                id: 'NIST.800.53.R5-S3BucketVersioningEnabled',
                reason: 'This S3 bucket is just used for flow logs for the VPC testing the Aspect.'
            },
            {
                id: 'NIST.800.53.R5-S3DefaultEncryptionKMS',
                reason: 'This S3 bucket is just used for flow logs for the VPC testing the Aspect.'
            },
            ]);
    });

    it('should create alarm and lambda when visiting an EC2 instance', () => {
        // Arrange
        const vpc = new Vpc(stack, 'TestVPC', {
            maxAzs: 2,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'Isolated',
                    subnetType: SubnetType.PRIVATE_ISOLATED
                }
            ],
            // Enable flow logs
            flowLogs: {
                's3': {
                    destination: FlowLogDestination.toS3(),
                    trafficType: FlowLogTrafficType.ALL
                }
            }
        });

    
        
        const encryptionKey = new Key(stack, 'EncryptionKey', {
            enableKeyRotation: true,
            description: 'Key for encrypting resources'
        });
        
        new Instance(stack, 'TestInstance', {
            vpc,
            vpcSubnets: {
                subnetType: SubnetType.PRIVATE_ISOLATED
            },
            instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
            machineImage: new AmazonLinuxImage(),
            securityGroup: new SecurityGroup(stack, 'CustomSG', {
                vpc,
                allowAllOutbound: false,
                description: 'Security group for test instance'
            }),
            requireImdsv2: true,
            // Enable EBS encryption
            blockDevices: [{
                deviceName: '/dev/xvda',
                volume: BlockDeviceVolume.ebs(8, {
                    encrypted: true,
                    kmsKey: encryptionKey
                })
            }]
        });

        // Act
        Aspects.of(stack).add(new Ec2AutomatedShutdown({
            cpuThreshold: 10
        }));

        template = getTemplate();

        // Assert
        template.hasResource('AWS::Lambda::Function', {});
        template.hasResource('AWS::CloudWatch::Alarm', {});
    });

    it('should not create resources when no EC2 instances exist', () => {
        // Arrange & Act
        Aspects.of(stack).add(new Ec2AutomatedShutdown({
            cpuThreshold: 10
        }));

        // Get template once
        template = getTemplate();

        // Assert
        template.resourceCountIs('AWS::Lambda::Function', 0);
        template.resourceCountIs('AWS::CloudWatch::Alarm', 0);
    });
});