import { Aspects, Stack, Duration } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import {
    Instance,
    InstanceType,
    InstanceClass,
    InstanceSize,
    AmazonLinuxImage,
    Vpc,
    SubnetType,
    SecurityGroup,
    FlowLogDestination,
    FlowLogTrafficType,
    BlockDeviceVolume
} from 'aws-cdk-lib/aws-ec2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { NagSuppressions } from 'cdk-nag';
import { Ec2AutomatedShutdown } from '../../../src/aspects/ec2-automated-shutdown';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';
import { mockVpcId, mockCidrBlock } from '../../fixtures/network';

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
            }
        ]);
    });

    it('should create alarm with direct lambda integration when visiting an EC2 instance', () => {
        // Arrange
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
            })
        });

        // Act
        Aspects.of(stack).add(
            new Ec2AutomatedShutdown({
                metricConfig: {
                    metricName: 'CPUUtilization',
                    period: Duration.minutes(1),
                    statistic: 'Average',
                    threshold: 10
                }
            })
        );

        template = getTemplate();

        // Assert
        template.hasResource('AWS::Lambda::Function', {
            Properties: Match.objectLike({
                Handler: 'index.handler',
                Runtime: 'nodejs20.x'
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
        const vpc = new Vpc(stack, 'TestVPC', {
            maxAzs: 2,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'Isolated',
                    subnetType: SubnetType.PRIVATE_ISOLATED
                }
            ]
        });

        const securityGroup = new SecurityGroup(stack, 'CustomSG', {
            vpc,
            allowAllOutbound: false,
            description: 'Security group for test instances'
        });

        const instance1 = new Instance(stack, 'TestInstance1', {
            vpc,
            vpcSubnets: {
                subnetType: SubnetType.PRIVATE_ISOLATED
            },
            instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
            machineImage: new AmazonLinuxImage(),
            securityGroup,
            requireImdsv2: true
        });

        const instance2 = new Instance(stack, 'TestInstance2', {
            vpc,
            vpcSubnets: {
                subnetType: SubnetType.PRIVATE_ISOLATED
            },
            instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
            machineImage: new AmazonLinuxImage(),
            securityGroup,
            requireImdsv2: true
        });

        // Act
        Aspects.of(stack).add(
            new Ec2AutomatedShutdown({
                metricConfig: {
                    metricName: 'CPUUtilization',
                    period: Duration.minutes(1),
                    statistic: 'Average',
                    threshold: 10
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
        const vpc = new Vpc(stack, 'TestVPC', {
            maxAzs: 2,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'Isolated',
                    subnetType: SubnetType.PRIVATE_ISOLATED
                }
            ],
            flowLogs: {
                s3: {
                    destination: FlowLogDestination.toS3(),
                    trafficType: FlowLogTrafficType.ALL
                }
            }
        });

        const encryptionKey = new Key(stack, 'EncryptionKey', {
            enableKeyRotation: true,
            description: 'Key for encrypting resources'
        });

        const testInstance = new Instance(stack, 'TestInstance', {
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
                metricConfig: {
                    metricName: 'CPUUtilization',
                    period: Duration.minutes(1),
                    statistic: 'Average',
                    threshold: 10
                }
            })
        );

        template = getTemplate();

        // Assert
        template.resourceCountIs('AWS::Lambda::Function', 0);
        template.resourceCountIs('AWS::CloudWatch::Alarm', 0);
    });
});
