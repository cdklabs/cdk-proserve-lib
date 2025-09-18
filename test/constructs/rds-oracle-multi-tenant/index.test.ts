// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack, App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import {
    DatabaseInstance,
    DatabaseInstanceEngine,
    OracleEngineVersion
} from 'aws-cdk-lib/aws-rds';
import { NagSuppressions } from 'cdk-nag';
import { beforeEach, describe, expect, it } from 'vitest';
import { RdsOracleMultiTenant } from '../../../src/constructs/rds-oracle-multi-tenant';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

// Test fixtures for RDS database instances
const createMockOracleInstance = (
    stack: Stack,
    id: string = 'TestOracleDB'
) => {
    const vpc = new Vpc(stack, `${id}Vpc`);
    return new DatabaseInstance(stack, id, {
        engine: DatabaseInstanceEngine.oracleEe({
            version: OracleEngineVersion.VER_19
        }),
        instanceIdentifier: 'test-oracle-instance',
        vpc: vpc
    });
};

describeCdkTest(RdsOracleMultiTenant, (id, getStack, getTemplate, getApp) => {
    let stack: Stack;
    let app: App;
    let oracleInstance: DatabaseInstance;

    beforeEach(() => {
        app = getApp();
        stack = getStack();
        oracleInstance = createMockOracleInstance(stack);

        // Add CDK Nag suppressions only for VPC-related wildcard permissions from SecureFunction
        NagSuppressions.addStackSuppressions(stack, [
            {
                id: 'AwsSolutions-IAM5',
                reason: 'VPC-related permissions (ec2:CreateNetworkInterface, ec2:DescribeNetworkInterfaces, etc.) require wildcard permissions as they operate on ENIs that are created dynamically. This is a standard requirement for Lambda functions in VPC.',
                appliesTo: ['Resource::*']
            }
        ]);
    });

    describe('Property Validation', () => {
        it('should create construct with valid properties', () => {
            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance
            });

            // Assert
            const template = getTemplate();

            // Verify Custom Resource is created
            template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                ServiceToken: {
                    'Fn::GetAtt': [
                        Match.stringLikeRegexp(
                            'CrRdsOracleMultiTenantProvider'
                        ),
                        'Arn'
                    ]
                },
                DBInstanceIdentifier: {
                    Ref: Match.stringLikeRegexp('TestOracleDB')
                }
            });
        });

        it('should throw error when database is not provided', () => {
            // Act & Assert
            expect(() => {
                new RdsOracleMultiTenant(stack, id, {
                    database: undefined as any
                });
            }).toThrow('database property is required');
        });

        it('should throw error when database instanceIdentifier is missing', () => {
            // Arrange
            const invalidInstance = {
                instanceIdentifier: undefined
            } as any;

            // Act & Assert
            expect(() => {
                new RdsOracleMultiTenant(stack, id, {
                    database: invalidInstance
                });
            }).toThrow(
                'database.instanceIdentifier is required for Oracle MultiTenant configuration'
            );
        });

        it('should accept optional encryption key', () => {
            // Arrange
            const key = new Key(stack, 'TestKey');

            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance,
                encryption: key
            });

            // Assert - should not throw
            const template = getTemplate();
            template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                DBInstanceIdentifier: {
                    Ref: Match.stringLikeRegexp('TestOracleDB')
                }
            });
        });

        it('should accept optional lambda configuration', () => {
            // Arrange
            const vpc = new Vpc(stack, 'TestVpc');

            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance,
                lambdaConfiguration: {
                    vpc: vpc,
                    subnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
                    logGroupRetention: RetentionDays.ONE_WEEK
                }
            });

            // Assert - should not throw
            const template = getTemplate();
            template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                DBInstanceIdentifier: {
                    Ref: Match.stringLikeRegexp('TestOracleDB')
                }
            });
        });
    });

    describe('CloudFormation Template Generation', () => {
        it('should create correct Custom Resource', () => {
            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance
            });

            // Assert
            const template = getTemplate();

            template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                ServiceToken: {
                    'Fn::GetAtt': [
                        Match.stringLikeRegexp(
                            'CrRdsOracleMultiTenantProvider'
                        ),
                        'Arn'
                    ]
                },
                DBInstanceIdentifier: {
                    Ref: Match.stringLikeRegexp('TestOracleDB')
                }
            });

            template.hasResource('Custom::RdsOracleMultiTenant', {
                Type: 'Custom::RdsOracleMultiTenant',
                Properties: {
                    ServiceToken: Match.anyValue(),
                    DBInstanceIdentifier: {
                        Ref: Match.stringLikeRegexp('TestOracleDB')
                    }
                }
            });
        });

        it('should create Lambda function with correct configuration', () => {
            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance
            });

            // Assert
            const template = getTemplate();

            template.hasResourceProperties('AWS::Lambda::Function', {
                Handler: 'index.handler',
                Runtime: 'nodejs22.x',
                MemorySize: 512,
                Timeout: 900, // 15 minutes
                ReservedConcurrentExecutions: 5
            });
        });

        it('should create proper IAM role and policy', () => {
            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance
            });

            // Assert
            const template = getTemplate();

            // Verify IAM role
            template.hasResourceProperties('AWS::IAM::Role', {
                AssumeRolePolicyDocument: {
                    Statement: [
                        {
                            Action: 'sts:AssumeRole',
                            Effect: 'Allow',
                            Principal: {
                                Service: 'lambda.amazonaws.com'
                            }
                        }
                    ]
                }
            });

            // Verify the policy document structure matches the actual template
            template.hasResourceProperties('AWS::IAM::Policy', {
                PolicyDocument: {
                    Statement: [
                        {
                            Action: [
                                'logs:CreateLogStream',
                                'logs:PutLogEvents'
                            ],
                            Effect: 'Allow',
                            Resource: {
                                'Fn::GetAtt': [
                                    Match.stringLikeRegexp(
                                        'CrRdsOracleMultiTenantOnEventLogGroup'
                                    ),
                                    'Arn'
                                ]
                            }
                        },
                        {
                            Action: [
                                'rds:ModifyDBInstance',
                                'rds:DescribeDBInstances',
                                'rds:CreateTenantDatabase'
                            ],
                            Effect: 'Allow',
                            Resource: {
                                'Fn::Join': [
                                    '',
                                    [
                                        'arn:',
                                        { Ref: 'AWS::Partition' },
                                        ':rds:us-east-1:123456789012:db:',
                                        {
                                            Ref: Match.stringLikeRegexp(
                                                'TestOracleDB'
                                            )
                                        }
                                    ]
                                ]
                            }
                        }
                    ],
                    Version: '2012-10-17'
                }
            });
        });

        it('should create CloudWatch Log Group with default retention', () => {
            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance
            });

            // Assert
            const template = getTemplate();

            template.hasResourceProperties('AWS::Logs::LogGroup', {
                RetentionInDays: 30 // Default retention from SecureFunction
            });
        });

        it('should configure KMS permissions when encryption is provided', () => {
            // Arrange
            const key = new Key(stack, 'TestKey');

            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance,
                encryption: key
            });

            // Assert
            const template = getTemplate();

            // Verify Lambda function encryption
            template.hasResourceProperties('AWS::Lambda::Function', {
                KmsKeyArn: {
                    'Fn::GetAtt': [Match.stringLikeRegexp('TestKey'), 'Arn']
                }
            });

            // Verify Log Group encryption
            template.hasResourceProperties('AWS::Logs::LogGroup', {
                KmsKeyId: {
                    'Fn::GetAtt': [Match.stringLikeRegexp('TestKey'), 'Arn']
                }
            });

            // Verify KMS permissions for Lambda
            template.hasResourceProperties('AWS::IAM::Policy', {
                PolicyDocument: {
                    Statement: Match.arrayWith([
                        Match.objectLike({
                            Action: [
                                'kms:Decrypt',
                                'kms:Encrypt',
                                'kms:ReEncrypt*',
                                'kms:GenerateDataKey*'
                            ],
                            Effect: 'Allow',
                            Resource: {
                                'Fn::GetAtt': [
                                    Match.stringLikeRegexp('TestKey'),
                                    'Arn'
                                ]
                            }
                        })
                    ])
                }
            });
        });

        it('should apply custom Lambda configuration when provided', () => {
            // Arrange
            const vpc = new Vpc(stack, 'TestVpc');

            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance,
                lambdaConfiguration: {
                    vpc: vpc,
                    subnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
                    logGroupRetention: RetentionDays.ONE_WEEK
                }
            });

            // Assert
            const template = getTemplate();

            // Verify VPC configuration
            template.hasResourceProperties('AWS::Lambda::Function', {
                VpcConfig: {
                    SubnetIds: Match.anyValue(),
                    SecurityGroupIds: Match.anyValue()
                }
            });

            // Verify custom log retention
            template.hasResourceProperties('AWS::Logs::LogGroup', {
                RetentionInDays: 7 // One week
            });
        });
    });

    describe('Provider Reuse', () => {
        it('should reuse provider when multiple constructs in same stack', () => {
            // Arrange
            const oracleInstance2 = createMockOracleInstance(
                stack,
                'TestOracleDB2'
            );

            // Act
            new RdsOracleMultiTenant(stack, `${id}1`, {
                database: oracleInstance
            });

            new RdsOracleMultiTenant(stack, `${id}2`, {
                database: oracleInstance2
            });

            // Assert
            const template = getTemplate();

            // Should only have one Provider
            const providers = template.findResources(
                'Custom::RdsOracleMultiTenant'
            );

            // Both custom resources should use the same service token
            const resources = Object.values(providers);
            expect(resources).toHaveLength(2);

            const serviceToken1 = resources[0].Properties.ServiceToken;
            const serviceToken2 = resources[1].Properties.ServiceToken;
            expect(serviceToken1).toEqual(serviceToken2);
        });

        it('should create separate providers for different stacks', () => {
            // Arrange
            const stack2 = new Stack(app, 'TestStack2', {
                env: {
                    account: '123456789012',
                    region: 'us-east-1'
                }
            });
            const oracleInstance2 = createMockOracleInstance(
                stack2,
                'TestOracleDB2'
            );

            // Act
            new RdsOracleMultiTenant(stack, `${id}1`, {
                database: oracleInstance
            });

            new RdsOracleMultiTenant(stack2, `${id}2`, {
                database: oracleInstance2
            });

            // Assert
            const template1 = Template.fromStack(stack);
            const template2 = Template.fromStack(stack2);

            // Both stacks should have their own providers
            template1.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                ServiceToken: Match.anyValue()
            });

            template2.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                ServiceToken: Match.anyValue()
            });

            // Each stack should have its own Lambda functions
            const providers1 = template1.findResources('AWS::Lambda::Function');
            const providers2 = template2.findResources('AWS::Lambda::Function');

            expect(Object.keys(providers1)).toHaveLength(2);
            expect(Object.keys(providers2)).toHaveLength(2);

            // The key point is that each stack has its own resources
            // Even if logical IDs are the same, they are physically separate resources
            // This is the expected CDK behavior for deterministic resource naming
        });

        it('should create only one Lambda function per stack', () => {
            // Arrange
            const oracleInstance2 = createMockOracleInstance(
                stack,
                'TestOracleDB2'
            );
            const oracleInstance3 = createMockOracleInstance(
                stack,
                'TestOracleDB3'
            );

            // Act
            new RdsOracleMultiTenant(stack, `${id}1`, {
                database: oracleInstance
            });

            new RdsOracleMultiTenant(stack, `${id}2`, {
                database: oracleInstance2
            });

            new RdsOracleMultiTenant(stack, `${id}3`, {
                database: oracleInstance3
            });

            // Assert
            const template = getTemplate();

            // Should have two Lambda functions (OnEvent + Provider framework)
            const lambdaFunctions = template.findResources(
                'AWS::Lambda::Function'
            );
            expect(Object.keys(lambdaFunctions)).toHaveLength(2);

            // Should have three Custom Resources
            const customResources = template.findResources(
                'Custom::RdsOracleMultiTenant'
            );
            expect(Object.keys(customResources)).toHaveLength(3);
        });
    });

    describe('Resource Dependencies', () => {
        it('should add dependency on RDS database instance', () => {
            // Act
            const construct = new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance
            });

            // Assert
            const dependencies = construct.node.dependencies;
            expect(dependencies).toContain(oracleInstance);
        });

        it('should create Custom Resource with proper resource type', () => {
            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance
            });

            // Assert
            const template = getTemplate();

            template.hasResource('Custom::RdsOracleMultiTenant', {
                Type: 'Custom::RdsOracleMultiTenant',
                Properties: {
                    ServiceToken: Match.anyValue(),
                    DBInstanceIdentifier: {
                        Ref: Match.stringLikeRegexp('TestOracleDB')
                    }
                }
            });
        });
    });
});
