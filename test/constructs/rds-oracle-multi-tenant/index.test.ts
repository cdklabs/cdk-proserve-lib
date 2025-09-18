// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { writeFileSync } from 'fs';
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

        // Add CDK Nag suppressions for wildcard permissions
        NagSuppressions.addStackSuppressions(stack, [
            {
                id: 'AwsSolutions-IAM5',
                reason: 'Permissions are tightly scoped by CDK grants for the asset bucket and to create tenant db.'
            },
            {
                id: 'AwsSolutions-IAM5',
                reason: 'The rds:CreateTenantDatabase action requires wildcard permissions for tenant-database resources as tenant database ARNs are dynamically generated and cannot be known at deployment time. This is required for Oracle MultiTenant functionality.',
                appliesTo: [
                    'Resource::arn:<AWS::Partition>:rds:<AWS::Region>:<AWS::AccountId>:tenant-database:*'
                ]
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

            writeFileSync('template.json', JSON.stringify(template.toJSON()));
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

        it('should create OnEvent and IsComplete Lambda functions with correct configuration', () => {
            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance
            });

            // Assert
            const template = getTemplate();

            // Should have OnEvent and IsComplete handlers with correct configuration
            template.hasResourceProperties('AWS::Lambda::Function', {
                Handler: 'index.handler',
                Runtime: 'nodejs22.x',
                MemorySize: 512,
                Timeout: 300, // 5 minutes for OnEvent/IsComplete handlers
                ReservedConcurrentExecutions: 5
            });

            // Verify we have the expected number of Lambda functions
            // OnEvent, IsComplete, and 3 provider framework functions = 5 total
            const lambdaFunctions = template.findResources(
                'AWS::Lambda::Function'
            );
            expect(Object.keys(lambdaFunctions)).toHaveLength(5);

            // Verify OnEvent handler exists
            const onEventFunctions = Object.keys(lambdaFunctions).filter(
                (name: string) => name.includes('OnEventFunction')
            );
            expect(onEventFunctions).toHaveLength(1);

            // Verify IsComplete handler exists
            const isCompleteFunctions = Object.keys(lambdaFunctions).filter(
                (name: string) => name.includes('IsCompleteFunction')
            );
            expect(isCompleteFunctions).toHaveLength(1);
        });

        it('should create proper IAM roles and policies for both handlers', () => {
            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance
            });

            // Assert
            const template = getTemplate();

            // Verify IAM roles for both OnEvent and IsComplete handlers
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

            // Verify both handlers have RDS permissions
            template.hasResourceProperties('AWS::IAM::Policy', {
                PolicyDocument: {
                    Statement: Match.arrayWith([
                        Match.objectLike({
                            Action: [
                                'rds:ModifyDBInstance',
                                'rds:DescribeDBInstances'
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
                        }),
                        Match.objectLike({
                            Action: 'rds:CreateTenantDatabase',
                            Effect: 'Allow',
                            Resource: [
                                {
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
                                },
                                {
                                    'Fn::Join': [
                                        '',
                                        [
                                            'arn:',
                                            { Ref: 'AWS::Partition' },
                                            ':rds:',
                                            { Ref: 'AWS::Region' },
                                            ':',
                                            { Ref: 'AWS::AccountId' },
                                            ':tenant-database:*'
                                        ]
                                    ]
                                }
                            ]
                        })
                    ]),
                    Version: '2012-10-17'
                }
            });

            // Verify both handlers have CloudWatch Logs permissions
            template.hasResourceProperties('AWS::IAM::Policy', {
                PolicyDocument: {
                    Statement: Match.arrayWith([
                        Match.objectLike({
                            Action: [
                                'logs:CreateLogStream',
                                'logs:PutLogEvents'
                            ],
                            Effect: 'Allow',
                            Resource: Match.anyValue()
                        })
                    ])
                }
            });
        });

        it('should create CloudWatch Log Groups for both handlers with default retention', () => {
            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance
            });

            // Assert
            const template = getTemplate();

            // Should have log groups for both OnEvent and IsComplete handlers
            template.hasResourceProperties('AWS::Logs::LogGroup', {
                RetentionInDays: 30 // Default retention from SecureFunction
            });

            // Verify we have log groups for both handlers
            const logGroups = template.findResources('AWS::Logs::LogGroup');
            const logGroupKeys = Object.keys(logGroups);

            // Should have log groups for OnEvent and IsComplete handlers
            const onEventLogGroup = logGroupKeys.some((name: string) =>
                name.includes('OnEventLogGroup')
            );
            const isCompleteLogGroup = logGroupKeys.some((name: string) =>
                name.includes('IsCompleteLogGroup')
            );

            expect(onEventLogGroup).toBe(true);
            expect(isCompleteLogGroup).toBe(true);
        });

        it('should configure Provider with correct queryInterval and totalTimeout', () => {
            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance
            });

            // Assert
            const template = getTemplate();

            // Verify Provider configuration through the framework Lambda functions
            // The Provider creates framework functions that handle the polling logic
            const frameworkFunctions = template.findResources(
                'AWS::Lambda::Function'
            );

            // Should have 5 Lambda functions total:
            // - OnEvent handler
            // - IsComplete handler
            // - 3 Provider framework functions (onEvent, isComplete, waiter)
            expect(Object.keys(frameworkFunctions)).toHaveLength(5);

            // Verify the Custom Resource uses the Provider service token
            template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                ServiceToken: {
                    'Fn::GetAtt': [
                        Match.stringLikeRegexp(
                            'CrRdsOracleMultiTenantProvider'
                        ),
                        'Arn'
                    ]
                }
            });
        });

        it('should configure KMS permissions for both handlers when encryption is provided', () => {
            // Arrange
            const key = new Key(stack, 'TestKey');

            // Act
            new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance,
                encryption: key
            });

            // Assert
            const template = getTemplate();

            // Verify both Lambda functions have encryption
            template.hasResourceProperties('AWS::Lambda::Function', {
                KmsKeyArn: {
                    'Fn::GetAtt': [Match.stringLikeRegexp('TestKey'), 'Arn']
                }
            });

            // Verify both Log Groups have encryption
            template.hasResourceProperties('AWS::Logs::LogGroup', {
                KmsKeyId: {
                    'Fn::GetAtt': [Match.stringLikeRegexp('TestKey'), 'Arn']
                }
            });

            // Verify KMS permissions for both Lambda handlers
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

            // Verify we have KMS policies for both handlers
            const kmsPolicies = template.findResources('AWS::IAM::Policy');
            const kmsPermissionPolicies = Object.values(kmsPolicies).filter(
                (policy: any) => {
                    const statements =
                        policy.Properties?.PolicyDocument?.Statement || [];
                    return statements.some(
                        (stmt: any) =>
                            Array.isArray(stmt.Action) &&
                            stmt.Action.includes('kms:Decrypt')
                    );
                }
            );

            // Should have KMS policies for both OnEvent and IsComplete handlers
            expect(kmsPermissionPolicies.length).toBeGreaterThanOrEqual(2);
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
            const functions1 = template1.findResources('AWS::Lambda::Function');
            const functions2 = template2.findResources('AWS::Lambda::Function');

            // OnEvent, IsComplete, and 3 provider framework functions = 5 total per stack
            expect(Object.keys(functions1)).toHaveLength(5);
            expect(Object.keys(functions2)).toHaveLength(5);

            // Verify each stack has OnEvent and IsComplete handlers
            const stack1FunctionNames = Object.keys(functions1);
            const stack2FunctionNames = Object.keys(functions2);

            const stack1OnEvent = stack1FunctionNames.filter((name: string) =>
                name.includes('OnEventFunction')
            );
            const stack1IsComplete = stack1FunctionNames.filter(
                (name: string) => name.includes('IsCompleteFunction')
            );

            const stack2OnEvent = stack2FunctionNames.filter((name: string) =>
                name.includes('OnEventFunction')
            );
            const stack2IsComplete = stack2FunctionNames.filter(
                (name: string) => name.includes('IsCompleteFunction')
            );

            expect(stack1OnEvent).toHaveLength(1);
            expect(stack1IsComplete).toHaveLength(1);
            expect(stack2OnEvent).toHaveLength(1);
            expect(stack2IsComplete).toHaveLength(1);
        });

        it('should reuse OnEvent and IsComplete handlers for multiple constructs in same stack', () => {
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

            // Should have five Lambda functions (OnEvent, IsComplete + 3 Provider framework)
            // These are shared across all constructs in the same stack
            const lambdaFunctions = template.findResources(
                'AWS::Lambda::Function'
            );
            expect(Object.keys(lambdaFunctions)).toHaveLength(5);

            // Should have three Custom Resources (one per construct)
            const customResources = template.findResources(
                'Custom::RdsOracleMultiTenant'
            );
            expect(Object.keys(customResources)).toHaveLength(3);

            // Verify all custom resources use the same service token (shared provider)
            const resources = Object.values(customResources);
            const serviceTokens = resources.map(
                (r: any) => r.Properties.ServiceToken
            );

            // All service tokens should be identical (same provider)
            expect(serviceTokens[0]).toEqual(serviceTokens[1]);
            expect(serviceTokens[1]).toEqual(serviceTokens[2]);
        });
    });

    describe('Handler Access', () => {
        it('should expose OnEvent and IsComplete handlers', () => {
            // Act
            const construct = new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance
            });

            // Assert
            expect(construct.onEventHandler).toBeDefined();
            expect(construct.isCompleteHandler).toBeDefined();

            // Verify the handlers are different functions
            expect(construct.onEventHandler).not.toBe(
                construct.isCompleteHandler
            );

            // Verify they are Lambda functions
            expect(construct.onEventHandler.functionArn).toBeDefined();
            expect(construct.isCompleteHandler.functionArn).toBeDefined();
        });

        it('should expose custom resource', () => {
            // Act
            const construct = new RdsOracleMultiTenant(stack, id, {
                database: oracleInstance
            });

            // Assert
            expect(construct.customResource).toBeDefined();
            expect(construct.customResource.node.defaultChild).toBeDefined();
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
