// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { Aspects, Stack, Duration } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import {
    Instance,
    InstanceType,
    InstanceClass,
    InstanceSize,
    AmazonLinuxImage,
    Vpc,
    SubnetType,
    SecurityGroup,
    BlockDeviceVolume
} from 'aws-cdk-lib/aws-ec2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { NagSuppressions } from 'cdk-nag';
import { beforeEach, it, expect } from 'vitest';
import { Ec2AutomatedShutdown } from '../../../src/aspects/ec2-automated-shutdown';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';
import { mockVpcId, mockCidrBlock } from '../../fixtures/network';

describeCdkTest(Ec2AutomatedShutdown, (_, getStack, getTemplate) => {
    let stack: Stack;
    let template: Template;

    beforeEach(() => {
        stack = getStack();
        stack.node.setContext(
            '@aws-cdk/aws-cloudwatch-actions:changeLambdaPermissionLogicalIdForLambdaAction',
            true
        );

        NagSuppressions.addStackSuppressions(stack, [
            {
                id: 'AwsSolutions-IAM4',
                reason: 'Not testing IAM in this test scenario.'
            },
            {
                id: 'NIST.800.53.R5-CloudWatchLogGroupEncrypted',
                reason: 'Mock function for testing'
            },
            {
                id: 'AwsSolutions-EC28',
                reason: 'Mock instance for testing; no autoscaling'
            },
            {
                id: 'AwsSolutions-EC29',
                reason: 'Mock instance for testing; no autoscaling'
            }
        ]);
    });

    it('should create alarm with direct lambda integration when visiting an EC2 instance', () => {
        // Arrange
        const encryptionKey = new Key(stack, 'EncryptionKey', {
            enableKeyRotation: true,
            description: 'Key for encrypting resources'
        });

        const instance = new Instance(stack, 'TestInstance', {
            vpc: Vpc.fromVpcAttributes(stack, 'ImportedVPC', {
                vpcId: mockVpcId,
                availabilityZones: ['us-east-1a'],
                privateSubnetIds: ['subnet-12345'],
                vpcCidrBlock: mockCidrBlock
            }),
            vpcSubnets: {
                subnetType: SubnetType.PRIVATE_WITH_EGRESS
            },
            instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
            machineImage: new AmazonLinuxImage(),
            securityGroup: new SecurityGroup(stack, 'CustomSG', {
                vpc: Vpc.fromVpcAttributes(stack, 'ImportedVPCForSG', {
                    vpcId: mockVpcId,
                    availabilityZones: ['us-east-1a'],
                    privateSubnetIds: ['subnet-12345'],
                    vpcCidrBlock: mockCidrBlock
                }),
                allowAllOutbound: false,
                description: 'Security group for test instance'
            }),
            blockDevices: [
                {
                    deviceName: '/dev/xvda',
                    volume: BlockDeviceVolume.ebs(8, {
                        encrypted: true,
                        kmsKey: encryptionKey
                    })
                }
            ],
            requireImdsv2: true
        });

        // Act
        Aspects.of(stack).add(
            new Ec2AutomatedShutdown({
                alarmConfig: {
                    metricName:
                        Ec2AutomatedShutdown.Ec2MetricName.CPU_UTILIZATION,
                    period: Duration.minutes(1),
                    statistic: 'Average',
                    threshold: 10,
                    evaluationPeriods: 2,
                    datapointsToAlarm: 2,
                    comparisonOperator: ComparisonOperator.LESS_THAN_THRESHOLD
                }
            })
        );

        template = getTemplate();

        // Assert
        template.hasResource('AWS::Lambda::Function', {
            Properties: Match.objectLike({
                Handler: 'index.handler',
                Runtime: 'nodejs22.x'
            })
        });

        const id = `${instance.node.id}.*`;

        template.hasResource('AWS::CloudWatch::Alarm', {
            Properties: Match.objectLike({
                MetricName: 'CPUUtilization',
                Namespace: 'AWS/EC2',
                Statistic: 'Average',
                Threshold: 10,
                Period: 60,
                EvaluationPeriods: 2,
                DatapointsToAlarm: 2,
                Dimensions: [
                    {
                        Name: 'InstanceId',
                        Value: {
                            Ref: Match.stringLikeRegexp(id)
                        }
                    }
                ]
            })
        });

        // Verify direct Lambda action in alarm
        template.hasResourceProperties('AWS::CloudWatch::Alarm', {
            AlarmActions: Match.arrayWith([
                {
                    'Fn::GetAtt': Match.arrayWith([
                        Match.stringLikeRegexp('Ec2ShutdownFunction'),
                        'Arn'
                    ])
                }
            ])
        });
    });

    it('should create alarms for multiple EC2 instances', () => {
        // Arrange
        const encryptionKey = new Key(stack, 'EncryptionKey', {
            enableKeyRotation: true,
            description: 'Key for encrypting resources'
        });

        const instance1 = new Instance(stack, 'TestInstance1', {
            vpc: Vpc.fromVpcAttributes(stack, 'ImportedVPC', {
                vpcId: mockVpcId,
                availabilityZones: ['us-east-1a'],
                privateSubnetIds: ['subnet-12345'],
                vpcCidrBlock: mockCidrBlock
            }),
            vpcSubnets: {
                subnetType: SubnetType.PRIVATE_WITH_EGRESS
            },
            instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
            machineImage: new AmazonLinuxImage(),
            securityGroup: new SecurityGroup(stack, 'CustomSG', {
                vpc: Vpc.fromVpcAttributes(stack, 'ImportedVPCForSG', {
                    vpcId: mockVpcId,
                    availabilityZones: ['us-east-1a'],
                    privateSubnetIds: ['subnet-12345'],
                    vpcCidrBlock: mockCidrBlock
                }),
                allowAllOutbound: false,
                description: 'Security group for test instance'
            }),
            requireImdsv2: true,
            blockDevices: [
                {
                    deviceName: '/dev/xvda',
                    volume: BlockDeviceVolume.ebs(8, {
                        encrypted: true,
                        kmsKey: encryptionKey
                    })
                }
            ]
        });

        const instance2 = new Instance(stack, 'TestInstance2', {
            vpc: Vpc.fromVpcAttributes(stack, 'ImportedVPC2', {
                vpcId: mockVpcId,
                availabilityZones: ['us-east-1a'],
                privateSubnetIds: ['subnet-12345'],
                vpcCidrBlock: mockCidrBlock
            }),
            vpcSubnets: {
                subnetType: SubnetType.PRIVATE_WITH_EGRESS
            },
            instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
            machineImage: new AmazonLinuxImage(),
            securityGroup: new SecurityGroup(stack, 'CustomSG2', {
                vpc: Vpc.fromVpcAttributes(stack, 'ImportedVPCForSG2', {
                    vpcId: mockVpcId,
                    availabilityZones: ['us-east-1a'],
                    privateSubnetIds: ['subnet-12345'],
                    vpcCidrBlock: mockCidrBlock
                }),
                allowAllOutbound: false,
                description: 'Security group for test instance'
            }),
            requireImdsv2: true,
            blockDevices: [
                {
                    deviceName: '/dev/xvda',
                    volume: BlockDeviceVolume.ebs(8, {
                        encrypted: true,
                        kmsKey: encryptionKey
                    })
                }
            ]
        });

        // Act
        Aspects.of(stack).add(
            new Ec2AutomatedShutdown({
                alarmConfig: {
                    metricName:
                        Ec2AutomatedShutdown.Ec2MetricName.CPU_UTILIZATION,
                    period: Duration.minutes(1),
                    statistic: 'Average',
                    threshold: 10,
                    evaluationPeriods: 2,
                    datapointsToAlarm: 2,
                    comparisonOperator: ComparisonOperator.LESS_THAN_THRESHOLD
                }
            })
        );

        template = getTemplate();

        // Assert
        template.resourceCountIs('AWS::Lambda::Function', 1);
        template.resourceCountIs('AWS::CloudWatch::Alarm', 2);

        const id1 = `${instance1.node.id}.*`;
        const id2 = `${instance2.node.id}.*`;

        template.hasResource('AWS::CloudWatch::Alarm', {
            Properties: Match.objectLike({
                MetricName: 'CPUUtilization',
                Namespace: 'AWS/EC2',
                Statistic: 'Average',
                Threshold: 10,
                Period: 60,
                EvaluationPeriods: 2,
                DatapointsToAlarm: 2,
                ComparisonOperator: 'LessThanThreshold',
                Dimensions: [
                    {
                        Name: 'InstanceId',
                        Value: {
                            Ref: Match.stringLikeRegexp(id1)
                        }
                    }
                ],
                AlarmActions: Match.arrayWith([
                    {
                        'Fn::GetAtt': Match.arrayWith([
                            Match.stringLikeRegexp('Ec2ShutdownFunction'),
                            'Arn'
                        ])
                    }
                ])
            })
        });

        // Verify alarm for second instance
        template.hasResource('AWS::CloudWatch::Alarm', {
            Properties: Match.objectLike({
                MetricName: 'CPUUtilization',
                Namespace: 'AWS/EC2',
                Statistic: 'Average',
                Threshold: 10,
                Period: 60,
                EvaluationPeriods: 2,
                DatapointsToAlarm: 2,
                ComparisonOperator: 'LessThanThreshold',
                Dimensions: [
                    {
                        Name: 'InstanceId',
                        Value: {
                            Ref: Match.stringLikeRegexp(id2)
                        }
                    }
                ],
                AlarmActions: Match.arrayWith([
                    {
                        'Fn::GetAtt': Match.arrayWith([
                            Match.stringLikeRegexp('Ec2ShutdownFunction'),
                            'Arn'
                        ])
                    }
                ])
            })
        });

        const alarms = template.findResources('AWS::CloudWatch::Alarm');
        const alarmValues = Object.values(alarms);
        const lambdaArn1 =
            alarmValues[0].Properties.AlarmActions[0]['Fn::GetAtt'][0];
        const lambdaArn2 =
            alarmValues[1].Properties.AlarmActions[0]['Fn::GetAtt'][0];
        expect(lambdaArn1).toBe(lambdaArn2);
    });

    it('should create alarm with default CPU metric when no metric config is provided', () => {
        // Arrange
        const encryptionKey = new Key(stack, 'EncryptionKey', {
            enableKeyRotation: true,
            description: 'Key for encrypting resources'
        });

        const testInstance = new Instance(stack, 'TestInstance', {
            vpc: Vpc.fromVpcAttributes(stack, 'ImportedVPC', {
                vpcId: mockVpcId,
                availabilityZones: ['us-east-1a'],
                privateSubnetIds: ['subnet-12345'],
                vpcCidrBlock: mockCidrBlock
            }),
            vpcSubnets: {
                subnetType: SubnetType.PRIVATE_WITH_EGRESS
            },
            instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
            machineImage: new AmazonLinuxImage(),
            securityGroup: new SecurityGroup(stack, 'CustomSG', {
                vpc: Vpc.fromVpcAttributes(stack, 'ImportedVPCForSG', {
                    vpcId: mockVpcId,
                    availabilityZones: ['us-east-1a'],
                    privateSubnetIds: ['subnet-12345'],
                    vpcCidrBlock: mockCidrBlock
                }),
                allowAllOutbound: false,
                description: 'Security group for test instance'
            }),
            requireImdsv2: true,
            blockDevices: [
                {
                    deviceName: '/dev/xvda',
                    volume: BlockDeviceVolume.ebs(8, {
                        encrypted: true,
                        kmsKey: encryptionKey
                    })
                }
            ]
        });

        // Act
        Aspects.of(stack).add(new Ec2AutomatedShutdown({}));

        template = getTemplate();

        const id = `${testInstance.node.id}.*`;

        // Assert
        template.hasResource('AWS::CloudWatch::Alarm', {
            Properties: Match.objectLike({
                MetricName: 'CPUUtilization',
                Namespace: 'AWS/EC2',
                Statistic: 'Average',
                Threshold: 5,
                Period: 60,
                EvaluationPeriods: 3,
                DatapointsToAlarm: 2,
                Dimensions: [
                    {
                        Name: 'InstanceId',
                        Value: {
                            Ref: Match.stringLikeRegexp(id)
                        }
                    }
                ]
            })
        });

        template.hasResourceProperties('AWS::CloudWatch::Alarm', {
            AlarmActions: Match.arrayWith([
                {
                    'Fn::GetAtt': Match.arrayWith([
                        Match.stringLikeRegexp('Ec2ShutdownFunction'),
                        'Arn'
                    ])
                }
            ])
        });
    });

    it('should not create resources when no EC2 instances exist', () => {
        // Arrange & Act
        Aspects.of(stack).add(
            new Ec2AutomatedShutdown({
                alarmConfig: {
                    metricName:
                        Ec2AutomatedShutdown.Ec2MetricName.CPU_UTILIZATION,
                    period: Duration.minutes(1),
                    statistic: 'Average',
                    threshold: 10,
                    evaluationPeriods: 2,
                    datapointsToAlarm: 2,
                    comparisonOperator: ComparisonOperator.LESS_THAN_THRESHOLD
                }
            })
        );

        template = getTemplate();

        // Assert
        template.resourceCountIs('AWS::Lambda::Function', 0);
        template.resourceCountIs('AWS::CloudWatch::Alarm', 0);
    });
});
