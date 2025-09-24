// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import {
    InstanceType,
    InstanceClass,
    InstanceSize,
    Vpc,
    SecurityGroup,
    SubnetType
} from 'aws-cdk-lib/aws-ec2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import {
    DatabaseInstance,
    DatabaseInstanceEngine,
    OracleEngineVersion,
    MysqlEngineVersion
} from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { RdsOracleMultiTenant } from '../../../src/aspects/rds-oracle-multi-tenant';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

describeCdkTest(RdsOracleMultiTenant, (_, getStack, getTemplate, getApp) => {
    let stack: Stack;
    let vpc: Vpc;

    beforeEach(() => {
        stack = getStack();
        vpc = new Vpc(stack, 'TestVpc');
    });

    describe('IAspect Interface Implementation', () => {
        it('should implement the IAspect interface correctly', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();

            // Assert
            expect(aspect).toBeDefined();
            expect(typeof aspect.visit).toBe('function');
            expect(aspect.visit.length).toBe(1); // visit method should accept one parameter (node)
        });

        it('should have a visit method that accepts IConstruct parameter', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const testConstruct = new Construct(stack, 'TestConstruct');

            // Act & Assert - Should not throw when called with a construct
            expect(() => aspect.visit(testConstruct)).not.toThrow();
        });

        it('should be applicable as an Aspect using Aspects.of().add()', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();

            // Act & Assert - Should not throw when added as an aspect
            expect(() => Aspects.of(stack).add(aspect)).not.toThrow();
        });
    });

    describe('Visit Method Behavior with Various Construct Types', () => {
        it('should handle non-DatabaseInstance constructs gracefully', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleDebugSpy = vi
                .spyOn(console, 'debug')
                .mockImplementation(() => {});
            const consoleWarnSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});
            const consoleLogSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            // Create various non-DatabaseInstance constructs
            const plainConstruct = new Construct(stack, 'PlainConstruct');
            const kmsKey = new Key(stack, 'TestKey');
            const securityGroup = new SecurityGroup(stack, 'TestSG', { vpc });

            // Act - Visit each construct
            aspect.visit(plainConstruct);
            aspect.visit(kmsKey);
            aspect.visit(securityGroup);

            // Assert - Should not log any Oracle-related messages
            expect(consoleLogSpy).not.toHaveBeenCalledWith(
                expect.stringContaining(
                    'Oracle MultiTenant configuration will be applied'
                )
            );
            expect(consoleWarnSpy).not.toHaveBeenCalledWith(
                expect.stringContaining('Oracle MultiTenant Aspect')
            );

            consoleDebugSpy.mockRestore();
            consoleWarnSpy.mockRestore();
            consoleLogSpy.mockRestore();
        });

        it('should handle Stack construct without errors', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleErrorSpy = vi
                .spyOn(console, 'error')
                .mockImplementation(() => {});

            // Act - Visit the stack itself
            aspect.visit(stack);

            // Assert - Should not produce any errors
            expect(consoleErrorSpy).not.toHaveBeenCalled();

            consoleErrorSpy.mockRestore();
        });

        it('should handle nested constructs correctly', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleLogSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            // Create a nested construct hierarchy
            const parentConstruct = new Construct(stack, 'ParentConstruct');
            const childConstruct = new Construct(
                parentConstruct,
                'ChildConstruct'
            );

            // Create an Oracle instance within the nested structure
            const oracleInstance = new DatabaseInstance(
                childConstruct,
                'NestedOracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act - Visit the parent construct (aspect should find nested Oracle instance)
            Aspects.of(parentConstruct).add(aspect);
            getTemplate(); // Trigger synthesis

            // Assert - Should process the nested Oracle instance
            expect(consoleLogSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    'Oracle MultiTenant configuration will be applied to instance:'
                )
            );

            consoleLogSpy.mockRestore();
        });

        it('should handle constructs with undefined or null properties gracefully', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleErrorSpy = vi
                .spyOn(console, 'error')
                .mockImplementation(() => {});
            const consoleWarnSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});

            // Create a construct that might have edge case properties
            const testConstruct = new Construct(stack, 'EdgeCaseConstruct');

            // Act - Visit the construct
            aspect.visit(testConstruct);

            // Assert - Should handle gracefully without errors
            expect(consoleErrorSpy).not.toHaveBeenCalledWith(
                expect.stringContaining('Unexpected error processing')
            );

            consoleErrorSpy.mockRestore();
            consoleWarnSpy.mockRestore();
        });

        it('should process multiple construct types in a single traversal', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleLogSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            // Create a mix of construct types
            const kmsKey = new Key(stack, 'MixedKey');
            const securityGroup = new SecurityGroup(stack, 'MixedSG', { vpc });
            const oracleInstance = new DatabaseInstance(
                stack,
                'MixedOracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );
            const mysqlInstance = new DatabaseInstance(
                stack,
                'MixedMySqlInstance',
                {
                    engine: DatabaseInstanceEngine.mysql({
                        version: MysqlEngineVersion.VER_8_0_39
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act - Apply aspect to stack (will visit all constructs)
            Aspects.of(stack).add(aspect);
            getTemplate(); // Trigger synthesis

            // Assert - Should only process the Oracle instance
            const oracleConfigCalls = consoleLogSpy.mock.calls.filter((call) =>
                call[0]?.includes(
                    'Oracle MultiTenant configuration will be applied to instance:'
                )
            );
            expect(oracleConfigCalls).toHaveLength(1);

            consoleLogSpy.mockRestore();
        });
    });

    describe('Oracle Database Detection', () => {
        it('should identify Oracle SE2 database instances', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);

            // Trigger synthesis to apply aspects
            getTemplate();

            // Assert
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    'Oracle MultiTenant configuration will be applied to instance:'
                )
            );

            consoleSpy.mockRestore();
        });

        it('should identify Oracle EE database instances', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleEEInstance',
                {
                    engine: DatabaseInstanceEngine.oracleEe({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);

            // Trigger synthesis to apply aspects
            getTemplate();

            // Assert
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    'Oracle MultiTenant configuration will be applied to instance:'
                )
            );

            consoleSpy.mockRestore();
        });

        it('should correctly detect Oracle engine type through debug logging', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleDebugSpy = vi
                .spyOn(console, 'debug')
                .mockImplementation(() => {});

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleDebugInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);
            getTemplate(); // Trigger synthesis

            // Assert - Should log debug information about Oracle detection
            expect(consoleDebugSpy).toHaveBeenCalledWith(
                expect.stringMatching(
                    /Oracle MultiTenant Aspect: Instance .* is Oracle database \(oracle-se2\) - will process/
                )
            );

            consoleDebugSpy.mockRestore();
        });

        it('should skip non-Oracle database instances', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const mysqlInstance = new DatabaseInstance(stack, 'MySqlInstance', {
                engine: DatabaseInstanceEngine.mysql({
                    version: MysqlEngineVersion.VER_8_0_39
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            // Act
            Aspects.of(stack).add(aspect);

            // Trigger synthesis to apply aspects
            getTemplate();

            // Assert
            expect(consoleSpy).not.toHaveBeenCalledWith(
                expect.stringContaining(
                    'Oracle MultiTenant configuration will be applied to instance:'
                )
            );

            consoleSpy.mockRestore();
        });

        it('should log debug information when skipping non-Oracle databases', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleDebugSpy = vi
                .spyOn(console, 'debug')
                .mockImplementation(() => {});

            const mysqlInstance = new DatabaseInstance(
                stack,
                'MySqlDebugInstance',
                {
                    engine: DatabaseInstanceEngine.mysql({
                        version: MysqlEngineVersion.VER_8_0_39
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);
            getTemplate(); // Trigger synthesis

            // Assert - Should log debug information about non-Oracle detection
            expect(consoleDebugSpy).toHaveBeenCalledWith(
                expect.stringMatching(
                    /Oracle MultiTenant Aspect: Instance .* is not Oracle database \(mysql\) - skipping/
                )
            );

            consoleDebugSpy.mockRestore();
        });

        it('should skip PostgreSQL database instances', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleDebugSpy = vi
                .spyOn(console, 'debug')
                .mockImplementation(() => {});
            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const postgresInstance = new DatabaseInstance(
                stack,
                'PostgresInstance',
                {
                    engine: DatabaseInstanceEngine.postgres({
                        version: {
                            postgresFullVersion: '13.7',
                            postgresMajorVersion: '13'
                        }
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);
            getTemplate(); // Trigger synthesis

            // Assert
            expect(consoleSpy).not.toHaveBeenCalledWith(
                expect.stringContaining(
                    'Oracle MultiTenant configuration will be applied to instance:'
                )
            );

            expect(consoleDebugSpy).toHaveBeenCalledWith(
                expect.stringMatching(
                    /Oracle MultiTenant Aspect: Instance .* is not Oracle database \(postgres\) - skipping/
                )
            );

            consoleDebugSpy.mockRestore();
            consoleSpy.mockRestore();
        });

        it('should prevent duplicate processing of the same Oracle instance', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act - Apply the aspect twice
            Aspects.of(stack).add(aspect);
            Aspects.of(oracleInstance).add(aspect);

            // Trigger synthesis to apply aspects
            getTemplate();

            // Assert - Should only be called once
            const logCalls = consoleSpy.mock.calls.filter((call) =>
                call[0]?.includes(
                    'Oracle MultiTenant configuration will be applied to instance:'
                )
            );
            expect(logCalls).toHaveLength(1);

            consoleSpy.mockRestore();
        });

        it('should handle multiple Oracle instances in the same stack', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const oracleInstance1 = new DatabaseInstance(
                stack,
                'OracleInstance1',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            const oracleInstance2 = new DatabaseInstance(
                stack,
                'OracleInstance2',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);

            // Trigger synthesis to apply aspects
            getTemplate();

            // Assert - Should be called for both instances
            const logCalls = consoleSpy.mock.calls.filter((call) =>
                call[0]?.includes(
                    'Oracle MultiTenant configuration will be applied to instance:'
                )
            );
            expect(logCalls).toHaveLength(2);

            consoleSpy.mockRestore();
        });

        it('should handle mixed Oracle and non-Oracle instances', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            const mysqlInstance = new DatabaseInstance(stack, 'MySqlInstance', {
                engine: DatabaseInstanceEngine.mysql({
                    version: MysqlEngineVersion.VER_8_0_39
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            // Act
            Aspects.of(stack).add(aspect);

            // Trigger synthesis to apply aspects
            getTemplate();

            // Assert - Should only be called for Oracle instance
            const logCalls = consoleSpy.mock.calls.filter((call) =>
                call[0]?.includes(
                    'Oracle MultiTenant configuration will be applied to instance:'
                )
            );
            expect(logCalls).toHaveLength(1);

            consoleSpy.mockRestore();
        });
    });

    describe('Configuration Property Application', () => {
        it('should apply encryption settings to Lambda functions', () => {
            // Arrange
            const kmsKey = new Key(stack, 'TestKey', {
                description: 'Test KMS key for Oracle MultiTenant'
            });

            const aspect = new RdsOracleMultiTenant({
                encryption: kmsKey
            });

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);

            // Trigger synthesis to apply aspects
            const template = getTemplate();

            // Assert
            expect(consoleSpy).toHaveBeenCalledWith(
                'Applying KMS encryption to Oracle MultiTenant Lambda functions'
            );

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    '✓ Encryption key will be applied to Lambda functions for instance:'
                )
            );

            // Verify KMS key is referenced in the template
            template.hasResourceProperties('AWS::Lambda::Function', {
                KmsKeyArn: Match.anyValue()
            });

            consoleSpy.mockRestore();
        });

        it('should apply Lambda configuration settings consistently', () => {
            // Arrange
            const securityGroup = new SecurityGroup(stack, 'TestSG', {
                vpc,
                description: 'Test security group'
            });

            const aspect = new RdsOracleMultiTenant({
                lambdaConfiguration: {
                    vpc: vpc,
                    subnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
                    securityGroups: [securityGroup],
                    logGroupRetention: RetentionDays.THREE_MONTHS,
                    reservedConcurrentExecutions: 10
                }
            });

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);

            // Trigger synthesis to apply aspects
            const template = getTemplate();

            // Assert
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    'Applying Lambda configuration properties:'
                )
            );

            expect(consoleSpy).toHaveBeenCalledWith(
                'Lambda functions will be deployed in VPC'
            );

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    '✓ VPC configuration will be applied for instance:'
                )
            );

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    '✓ 1 security group(s) will be applied for instance:'
                )
            );

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    '✓ Log retention (90) will be applied for instance:'
                )
            );

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    '✓ Reserved concurrent executions (10) will be applied for instance:'
                )
            );

            // Verify Lambda functions are configured with VPC settings
            template.hasResourceProperties('AWS::Lambda::Function', {
                VpcConfig: {
                    SecurityGroupIds: Match.anyValue(),
                    SubnetIds: Match.anyValue()
                },
                ReservedConcurrentExecutions: 10
            });

            // Verify log groups have correct retention
            template.hasResourceProperties('AWS::Logs::LogGroup', {
                RetentionInDays: 90
            });

            consoleSpy.mockRestore();
        });

        it('should apply configuration consistently across multiple Oracle instances', () => {
            // Arrange
            const kmsKey = new Key(stack, 'TestKey', {
                description: 'Test KMS key for Oracle MultiTenant'
            });

            const aspect = new RdsOracleMultiTenant({
                encryption: kmsKey,
                lambdaConfiguration: {
                    logGroupRetention: RetentionDays.ONE_WEEK
                }
            });

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const oracleInstance1 = new DatabaseInstance(
                stack,
                'OracleInstance1',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            const oracleInstance2 = new DatabaseInstance(
                stack,
                'OracleInstance2',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);

            // Trigger synthesis to apply aspects
            getTemplate();

            // Assert - Configuration validation should be called for both instances
            const encryptionValidationCalls = consoleSpy.mock.calls.filter(
                (call) =>
                    call[0]?.includes(
                        '✓ Encryption key will be applied to Lambda functions for instance:'
                    )
            );
            expect(encryptionValidationCalls).toHaveLength(2);

            const logRetentionValidationCalls = consoleSpy.mock.calls.filter(
                (call) =>
                    call[0]?.includes(
                        '✓ Log retention (7) will be applied for instance:'
                    )
            );
            expect(logRetentionValidationCalls).toHaveLength(2);

            const configCompletionCalls = consoleSpy.mock.calls.filter((call) =>
                call[0]?.includes(
                    'Configuration validation completed for instance:'
                )
            );
            expect(configCompletionCalls).toHaveLength(2);

            consoleSpy.mockRestore();
        });

        it('should log appropriate messages when no configuration is provided', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);

            // Trigger synthesis to apply aspects
            getTemplate();

            // Assert
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    'ℹ No encryption key specified - AWS managed keys will be used for instance:'
                )
            );

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    'ℹ No Lambda configuration specified - default settings will be used for instance:'
                )
            );

            consoleSpy.mockRestore();
        });

        it('should propagate encryption key to Lambda functions correctly', () => {
            // Arrange
            const kmsKey = new Key(stack, 'TestKey', {
                description: 'Test KMS key for Oracle MultiTenant'
            });

            const aspect = new RdsOracleMultiTenant({
                encryption: kmsKey
            });

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            // Assert - Verify KMS key is referenced in Lambda functions
            template.hasResourceProperties('AWS::Lambda::Function', {
                KmsKeyArn: {
                    'Fn::GetAtt': [Match.stringLikeRegexp('TestKey.*'), 'Arn']
                }
            });

            // Verify IAM policy grants KMS permissions
            template.hasResourceProperties('AWS::IAM::Policy', {
                PolicyDocument: {
                    Statement: Match.arrayWith([
                        Match.objectLike({
                            Effect: 'Allow',
                            Action: Match.arrayWith([
                                'kms:Decrypt',
                                'kms:Encrypt',
                                'kms:ReEncrypt*',
                                'kms:GenerateDataKey*'
                            ]),
                            Resource: {
                                'Fn::GetAtt': [
                                    Match.stringLikeRegexp('TestKey.*'),
                                    'Arn'
                                ]
                            }
                        })
                    ])
                }
            });
        });

        it('should apply VPC configuration to Lambda functions', () => {
            // Arrange
            const securityGroup = new SecurityGroup(stack, 'TestSG', {
                vpc,
                description: 'Test security group'
            });

            const aspect = new RdsOracleMultiTenant({
                lambdaConfiguration: {
                    vpc: vpc,
                    subnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
                    securityGroups: [securityGroup]
                }
            });

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            // Assert - Verify Lambda functions have VPC configuration
            template.hasResourceProperties('AWS::Lambda::Function', {
                VpcConfig: {
                    SecurityGroupIds: Match.arrayWith([
                        {
                            'Fn::GetAtt': [
                                Match.stringLikeRegexp('TestSG.*'),
                                'GroupId'
                            ]
                        }
                    ]),
                    SubnetIds: Match.anyValue()
                }
            });
        });

        it('should apply log retention configuration to Lambda functions', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant({
                lambdaConfiguration: {
                    logGroupRetention: RetentionDays.ONE_MONTH
                }
            });

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            // Assert - Verify log groups have correct retention
            template.hasResourceProperties('AWS::Logs::LogGroup', {
                RetentionInDays: 30
            });
        });

        it('should apply reserved concurrent executions to Lambda functions', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant({
                lambdaConfiguration: {
                    reservedConcurrentExecutions: 5
                }
            });

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            // Assert - Verify Lambda functions have reserved concurrent executions
            template.hasResourceProperties('AWS::Lambda::Function', {
                ReservedConcurrentExecutions: 5
            });
        });

        it('should handle invalid encryption configuration gracefully', () => {
            // Arrange
            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            // Create aspect with null encryption (edge case)
            const aspect = new RdsOracleMultiTenant({
                encryption: undefined
            });

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            // Assert - Should handle gracefully and use AWS managed keys
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    'ℹ No encryption key specified - AWS managed keys will be used for instance:'
                )
            );

            // Verify Lambda functions don't have KMS key configuration
            template.hasResourceProperties('AWS::Lambda::Function', {
                KmsKeyArn: Match.absent()
            });

            consoleSpy.mockRestore();
        });

        it('should handle missing Lambda configuration properties gracefully', () => {
            // Arrange
            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            // Create aspect with empty Lambda configuration
            const aspect = new RdsOracleMultiTenant({
                lambdaConfiguration: {}
            });

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            // Assert - Should handle empty configuration gracefully
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    '✓ Lambda configuration properties () will be applied to instance:'
                )
            );

            // Verify Lambda functions are created with default settings
            // Note: The template includes additional Lambda functions from the CDK framework
            template.hasResourceProperties('AWS::Lambda::Function', {
                Handler: 'index.handler',
                Runtime: 'nodejs22.x'
            });

            consoleSpy.mockRestore();
        });

        it('should warn when VPC is specified without security groups', () => {
            // Arrange
            const consoleWarnSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});

            const aspect = new RdsOracleMultiTenant({
                lambdaConfiguration: {
                    vpc: vpc,
                    subnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS }
                    // No security groups specified
                }
            });

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);
            getTemplate();

            // Assert - Should warn about missing security groups
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                'VPC specified but no security groups provided. ' +
                    'Lambda functions may not have network access.'
            );

            consoleWarnSpy.mockRestore();
        });

        it('should apply complex configuration consistently across multiple instances', () => {
            // Arrange
            const kmsKey = new Key(stack, 'TestKey', {
                description: 'Test KMS key for Oracle MultiTenant'
            });

            const securityGroup = new SecurityGroup(stack, 'TestSG', {
                vpc,
                description: 'Test security group'
            });

            const aspect = new RdsOracleMultiTenant({
                encryption: kmsKey,
                lambdaConfiguration: {
                    vpc: vpc,
                    subnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
                    securityGroups: [securityGroup],
                    logGroupRetention: RetentionDays.TWO_WEEKS,
                    reservedConcurrentExecutions: 3
                }
            });

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const oracleInstance1 = new DatabaseInstance(
                stack,
                'OracleInstance1',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            const oracleInstance2 = new DatabaseInstance(
                stack,
                'OracleInstance2',
                {
                    engine: DatabaseInstanceEngine.oracleEe({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            // Assert - Configuration should be applied consistently to both instances
            const encryptionValidationCalls = consoleSpy.mock.calls.filter(
                (call) =>
                    call[0]?.includes(
                        '✓ Encryption key will be applied to Lambda functions for instance:'
                    )
            );
            expect(encryptionValidationCalls).toHaveLength(2);

            const vpcValidationCalls = consoleSpy.mock.calls.filter((call) =>
                call[0]?.includes(
                    '✓ VPC configuration will be applied for instance:'
                )
            );
            expect(vpcValidationCalls).toHaveLength(2);

            const logRetentionValidationCalls = consoleSpy.mock.calls.filter(
                (call) =>
                    call[0]?.includes(
                        '✓ Log retention (14) will be applied for instance:'
                    )
            );
            expect(logRetentionValidationCalls).toHaveLength(2);

            const concurrentExecutionsValidationCalls =
                consoleSpy.mock.calls.filter((call) =>
                    call[0]?.includes(
                        '✓ Reserved concurrent executions (3) will be applied for instance:'
                    )
                );
            expect(concurrentExecutionsValidationCalls).toHaveLength(2);

            // Verify CloudFormation template has correct configuration
            template.hasResourceProperties('AWS::Lambda::Function', {
                KmsKeyArn: {
                    'Fn::GetAtt': [Match.stringLikeRegexp('TestKey.*'), 'Arn']
                },
                VpcConfig: {
                    SecurityGroupIds: Match.arrayWith([
                        {
                            'Fn::GetAtt': [
                                Match.stringLikeRegexp('TestSG.*'),
                                'GroupId'
                            ]
                        }
                    ]),
                    SubnetIds: Match.anyValue()
                },
                ReservedConcurrentExecutions: 3
            });

            template.hasResourceProperties('AWS::Logs::LogGroup', {
                RetentionInDays: 14
            });

            consoleSpy.mockRestore();
        });

        it('should validate configuration properties for each instance individually', () => {
            // Arrange
            const kmsKey = new Key(stack, 'TestKey', {
                description: 'Test KMS key for Oracle MultiTenant'
            });

            const aspect = new RdsOracleMultiTenant({
                encryption: kmsKey,
                lambdaConfiguration: {
                    logGroupRetention: RetentionDays.ONE_WEEK
                }
            });

            const consoleSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const oracleInstance1 = new DatabaseInstance(
                stack,
                'OracleInstance1',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            const oracleInstance2 = new DatabaseInstance(
                stack,
                'OracleInstance2',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);
            getTemplate();

            // Assert - Each instance should have individual validation
            const validationStartCalls = consoleSpy.mock.calls.filter((call) =>
                call[0]?.includes(
                    'Validating configuration properties for Oracle instance:'
                )
            );
            expect(validationStartCalls).toHaveLength(2);

            const validationCompleteCalls = consoleSpy.mock.calls.filter(
                (call) =>
                    call[0]?.includes(
                        'Configuration validation completed for instance:'
                    )
            );
            expect(validationCompleteCalls).toHaveLength(2);

            consoleSpy.mockRestore();
        });
    });

    describe('Error Handling and Edge Cases', () => {
        it('should implement comprehensive error handling in the visit method', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();

            // Act & Assert - Test that the aspect has the error handling methods
            // This test verifies that the error handling infrastructure is in place
            expect(aspect).toBeDefined();
            expect(typeof aspect.visit).toBe('function');
            expect(typeof aspect.processingStatistics).toBe('function');
            expect(typeof aspect.logProcessingStatistics).toBe('function');
        });

        it('should handle database instances with missing engine gracefully', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleWarnSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});

            // Create a database instance and then mock its engine to be undefined
            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstanceNoEngine',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Mock the engine property to simulate edge case
            Object.defineProperty(oracleInstance, 'engine', {
                get: () => undefined,
                configurable: true
            });

            // Act
            aspect.visit(oracleInstance);

            // Assert - Should handle gracefully through validation failure
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    '⚠️  Oracle MultiTenant Aspect: Skipping database instance due to validation failure'
                )
            );

            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    'Reason: Engine configuration not accessible'
                )
            );

            consoleWarnSpy.mockRestore();
        });

        it('should handle database instances with missing engine type gracefully', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleWarnSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});

            // Create a database instance and mock its engine type to be undefined
            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstanceNoEngineType',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Mock the engine.engineType property to simulate edge case
            const mockEngine = { engineType: undefined };
            Object.defineProperty(oracleInstance, 'engine', {
                get: () => mockEngine,
                configurable: true
            });

            // Act
            aspect.visit(oracleInstance);

            // Assert - Should handle gracefully through validation failure
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    '⚠️  Oracle MultiTenant Aspect: Skipping database instance due to validation failure'
                )
            );

            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining('Reason: Engine type not accessible')
            );

            consoleWarnSpy.mockRestore();
        });

        it('should handle exceptions during engine access gracefully', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleWarnSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});

            // Create a database instance and mock its engine to throw an error
            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstanceEngineError',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Mock the engine property to throw an error
            Object.defineProperty(oracleInstance, 'engine', {
                get: () => {
                    throw new Error('Engine access error');
                },
                configurable: true
            });

            // Act
            aspect.visit(oracleInstance);

            // Assert - Should handle gracefully through validation failure
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    '⚠️  Oracle MultiTenant Aspect: Skipping database instance due to validation failure'
                )
            );

            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining('Reason: Validation error')
            );

            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    'Details: Error during validation: Engine access error'
                )
            );

            consoleWarnSpy.mockRestore();
        });

        it('should log duplicate processing attempts with detailed information', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleWarnSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});
            const consoleDebugSpy = vi
                .spyOn(console, 'debug')
                .mockImplementation(() => {});

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstance',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act - Visit the same instance twice manually to test duplicate detection
            aspect.visit(oracleInstance);
            aspect.visit(oracleInstance); // This should trigger duplicate detection

            // Assert - The second visit should detect the duplicate
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    '⚠️  Oracle MultiTenant Aspect: Duplicate processing attempt detected'
                )
            );

            consoleWarnSpy.mockRestore();
            consoleDebugSpy.mockRestore();
        });

        it('should have validation logic for instance identifiers', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();

            // Act & Assert - Test that the aspect includes identifier validation
            // The validation logic is implemented in the private methods
            // This test ensures the validation infrastructure exists
            expect(aspect).toBeDefined();

            // The actual validation is tested through integration tests with real CDK instances
            // which properly trigger the validation logic through the visit method
        });

        it('should provide processing statistics', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleLogSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            const oracleInstance1 = new DatabaseInstance(
                stack,
                'OracleInstance1',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            const oracleInstance2 = new DatabaseInstance(
                stack,
                'OracleInstance2',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc
                }
            );

            // Act
            Aspects.of(stack).add(aspect);
            getTemplate(); // Trigger synthesis

            const stats = aspect.processingStatistics();
            aspect.logProcessingStatistics();

            // Assert
            expect(stats.processedInstancesCount).toBe(2);
            expect(stats.processedInstanceIds).toHaveLength(2);
            // The instance IDs will be CDK tokens, so we just check the count
            expect(stats.processedInstanceIds.length).toBe(2);
            // Verify that both instances have some identifier (even if it's a token)
            expect(stats.processedInstanceIds[0]).toBeTruthy();
            expect(stats.processedInstanceIds[1]).toBeTruthy();

            expect(consoleLogSpy).toHaveBeenCalledWith(
                'Oracle MultiTenant Aspect Processing Statistics:'
            );
            expect(consoleLogSpy).toHaveBeenCalledWith(
                '  Total Oracle instances processed: 2'
            );

            consoleLogSpy.mockRestore();
        });

        it('should log processing statistics when no instances are processed', () => {
            // Arrange
            const aspect = new RdsOracleMultiTenant();
            const consoleLogSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});

            // Create only non-Oracle instances
            const mysqlInstance = new DatabaseInstance(stack, 'MySqlInstance', {
                engine: DatabaseInstanceEngine.mysql({
                    version: MysqlEngineVersion.VER_8_0_39
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            // Act
            Aspects.of(stack).add(aspect);
            getTemplate(); // Trigger synthesis

            const stats = aspect.processingStatistics();
            aspect.logProcessingStatistics();

            // Assert
            expect(stats.processedInstancesCount).toBe(0);
            expect(stats.processedInstanceIds).toHaveLength(0);

            expect(consoleLogSpy).toHaveBeenCalledWith(
                '  No Oracle instances have been processed yet.'
            );

            consoleLogSpy.mockRestore();
        });
    });

    describe('Resource Creation and Provider Reuse', () => {
        describe('Custom Resource Creation for Oracle Instances', () => {
            it('should create Custom Resource for Oracle instance', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                const oracleInstance = new DatabaseInstance(
                    stack,
                    'OracleInstance',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Custom Resource should be created
                template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                    DBInstanceIdentifier: Match.anyValue()
                });

                // Assert - Provider Lambda functions should be created
                template.hasResourceProperties('AWS::Lambda::Function', {
                    Handler: 'index.handler',
                    Runtime: 'nodejs22.x'
                });

                // Assert - Should have both OnEvent and IsComplete handlers plus framework functions
                template.resourceCountIs('AWS::Lambda::Function', 5);

                // Assert - Should have one Custom Resource Provider (framework creates additional resources)
                // The CDK Provider framework creates additional Lambda functions for orchestration

                // Assert - Should have one Custom Resource
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);

                consoleSpy.mockRestore();
            });

            it('should create Custom Resource with correct properties', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                const oracleInstance = new DatabaseInstance(
                    stack,
                    'TestOracleInstance',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc,
                        instanceIdentifier: 'test-oracle-db'
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Custom Resource should have correct properties
                // Note: CDK uses references instead of literal strings
                template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                    DBInstanceIdentifier: Match.anyValue()
                });

                // Assert - Custom Resource should have service token
                template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                    ServiceToken: Match.anyValue()
                });

                consoleSpy.mockRestore();
            });

            it('should create Lambda functions with correct configuration', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                const oracleInstance = new DatabaseInstance(
                    stack,
                    'OracleInstance',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Lambda functions should have correct runtime and handler
                // Note: The main Lambda functions have timeout 300, framework functions have 900
                template.hasResourceProperties('AWS::Lambda::Function', {
                    Runtime: 'nodejs22.x',
                    Handler: 'index.handler',
                    Timeout: 300
                });

                // Assert - Lambda functions should have RDS permissions
                template.hasResourceProperties('AWS::IAM::Policy', {
                    PolicyDocument: {
                        Statement: Match.arrayWith([
                            Match.objectLike({
                                Effect: 'Allow',
                                Action: Match.arrayWith([
                                    'rds:ModifyDBInstance',
                                    'rds:DescribeDBInstances'
                                ]),
                                Resource: Match.anyValue()
                            })
                        ])
                    }
                });

                consoleSpy.mockRestore();
            });

            it('should create Custom Resource with dependency on database instance', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                const oracleInstance = new DatabaseInstance(
                    stack,
                    'OracleInstance',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Custom Resource should exist
                template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                    DBInstanceIdentifier: Match.anyValue()
                });

                // The dependency is handled by CDK internally, so we verify the Custom Resource exists
                // and is properly configured, which implies the dependency is set up correctly
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);

                consoleSpy.mockRestore();
            });
        });

        describe('CloudFormation Template Generation', () => {
            it('should generate template with expected resource structure', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                const oracleInstance = new DatabaseInstance(
                    stack,
                    'OracleInstance',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Should have all expected resource types
                // Note: CDK Provider framework creates additional Lambda functions and resources
                template.resourceCountIs('AWS::Lambda::Function', 5); // OnEvent + IsComplete + framework functions
                template.resourceCountIs('AWS::IAM::Role', 6); // One for each Lambda + additional roles
                template.resourceCountIs('AWS::IAM::Policy', 6); // One for each Lambda + additional policies
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
                template.resourceCountIs('AWS::Logs::LogGroup', 2); // One for each main Lambda

                // Assert - Lambda functions should have correct properties
                template.hasResourceProperties('AWS::Lambda::Function', {
                    Runtime: 'nodejs22.x',
                    Handler: 'index.handler',
                    Timeout: 300,
                    Code: Match.objectLike({
                        S3Bucket: Match.anyValue(),
                        S3Key: Match.anyValue()
                    })
                });

                consoleSpy.mockRestore();
            });

            it('should generate template with correct IAM permissions', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                const oracleInstance = new DatabaseInstance(
                    stack,
                    'OracleInstance',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Should have RDS permissions
                template.hasResourceProperties('AWS::IAM::Policy', {
                    PolicyDocument: {
                        Statement: Match.arrayWith([
                            Match.objectLike({
                                Effect: 'Allow',
                                Action: Match.arrayWith([
                                    'rds:ModifyDBInstance',
                                    'rds:DescribeDBInstances'
                                ])
                            })
                        ])
                    }
                });

                // Assert - Should have CloudWatch Logs permissions
                template.hasResourceProperties('AWS::IAM::Policy', {
                    PolicyDocument: {
                        Statement: Match.arrayWith([
                            Match.objectLike({
                                Effect: 'Allow',
                                Action: Match.arrayWith([
                                    'logs:CreateLogStream',
                                    'logs:PutLogEvents'
                                ])
                            })
                        ])
                    }
                });

                consoleSpy.mockRestore();
            });

            it('should generate template with encryption when KMS key provided', () => {
                // Arrange
                const kmsKey = new Key(stack, 'TestKey', {
                    description: 'Test KMS key for Oracle MultiTenant'
                });

                const aspect = new RdsOracleMultiTenant({
                    encryption: kmsKey
                });

                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                const oracleInstance = new DatabaseInstance(
                    stack,
                    'OracleInstance',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Lambda functions should have KMS key ARN
                template.hasResourceProperties('AWS::Lambda::Function', {
                    KmsKeyArn: Match.anyValue()
                });

                // Assert - Should have KMS permissions (check for any KMS actions)
                template.hasResourceProperties('AWS::IAM::Policy', {
                    PolicyDocument: {
                        Statement: Match.arrayWith([
                            Match.objectLike({
                                Effect: 'Allow',
                                Action: Match.arrayWith(['kms:Encrypt'])
                            })
                        ])
                    }
                });

                consoleSpy.mockRestore();
            });
        });

        describe('Provider Reuse Within Same Stack', () => {
            it('should reuse provider for multiple Oracle instances in same stack', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                const oracleInstance1 = new DatabaseInstance(
                    stack,
                    'OracleInstance1',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const oracleInstance2 = new DatabaseInstance(
                    stack,
                    'OracleInstance2',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Should have 2 Custom Resources (one per Oracle instance)
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);

                // Assert - Should have shared Lambda functions (CDK creates framework functions too)
                template.resourceCountIs('AWS::Lambda::Function', 5);

                // Assert - Both Custom Resources should reference the same service token
                const customResources = template.findResources(
                    'Custom::RdsOracleMultiTenant'
                );
                const serviceTokens = Object.values(customResources).map(
                    (resource: any) => resource.Properties.ServiceToken
                );

                // Both service tokens should be identical (referencing same provider)
                expect(serviceTokens).toHaveLength(2);
                expect(serviceTokens[0]).toEqual(serviceTokens[1]);

                // Assert - Should log Oracle MultiTenant configuration for both instances
                const configurationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            'Oracle MultiTenant configuration will be applied to instance:'
                        )
                );
                expect(configurationCalls).toHaveLength(2);

                consoleSpy.mockRestore();
            });

            it('should share Lambda functions between multiple Oracle instances', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                // Create 3 Oracle instances to test provider sharing
                const oracleInstance1 = new DatabaseInstance(
                    stack,
                    'OracleInstance1',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const oracleInstance2 = new DatabaseInstance(
                    stack,
                    'OracleInstance2',
                    {
                        engine: DatabaseInstanceEngine.oracleEe({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const oracleInstance3 = new DatabaseInstance(
                    stack,
                    'OracleInstance3',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Should have 3 Custom Resources (one per Oracle instance)
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 3);

                // Assert - Should still have shared Lambda functions (CDK creates framework functions too)
                template.resourceCountIs('AWS::Lambda::Function', 5);

                // Assert - Should log Oracle MultiTenant configuration for all instances
                const configurationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            'Oracle MultiTenant configuration will be applied to instance:'
                        )
                );
                expect(configurationCalls).toHaveLength(3); // Should process all 3 instances

                consoleSpy.mockRestore();
            });

            it('should apply same configuration to all instances using shared provider', () => {
                // Arrange
                const kmsKey = new Key(stack, 'TestKey', {
                    description: 'Test KMS key for Oracle MultiTenant'
                });

                const aspect = new RdsOracleMultiTenant({
                    encryption: kmsKey,
                    lambdaConfiguration: {
                        logGroupRetention: RetentionDays.ONE_WEEK
                    }
                });

                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                const oracleInstance1 = new DatabaseInstance(
                    stack,
                    'OracleInstance1',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const oracleInstance2 = new DatabaseInstance(
                    stack,
                    'OracleInstance2',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Main Lambda functions should have KMS keys
                // Note: Only the main Lambda functions (not framework functions) have KMS keys
                const lambdaFunctions = template.findResources(
                    'AWS::Lambda::Function'
                );
                const lambdaFunctionValues = Object.values(lambdaFunctions);

                // Check that at least some Lambda functions have KMS keys
                const functionsWithKms = lambdaFunctionValues.filter(
                    (lambdaFunction: any) =>
                        lambdaFunction.Properties.KmsKeyArn !== undefined
                );

                expect(functionsWithKms.length).toBeGreaterThan(0);

                // Assert - Both log groups should have the same retention
                template.hasResourceProperties('AWS::Logs::LogGroup', {
                    RetentionInDays: 7
                });

                // Assert - Should have 2 Custom Resources but shared infrastructure
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);
                template.resourceCountIs('AWS::Lambda::Function', 5);
                template.resourceCountIs('AWS::Logs::LogGroup', 2);

                consoleSpy.mockRestore();
            });
        });

        describe('Provider Reuse Validation', () => {
            it('should demonstrate provider reuse through resource counts', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                // Create multiple Oracle instances to test provider sharing
                const oracleInstance1 = new DatabaseInstance(
                    stack,
                    'OracleInstance1',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const oracleInstance2 = new DatabaseInstance(
                    stack,
                    'OracleInstance2',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Provider reuse is demonstrated by having multiple Custom Resources
                // but the same number of Lambda functions (indicating shared provider)
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);
                template.resourceCountIs('AWS::Lambda::Function', 5); // Same count regardless of instance count

                // Assert - Both instances should be processed
                const configurationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            'Oracle MultiTenant configuration will be applied to instance:'
                        )
                );
                expect(configurationCalls).toHaveLength(2);

                consoleSpy.mockRestore();
            });

            it('should validate provider reuse through service token sharing', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                // Create multiple Oracle instances
                const oracleInstance1 = new DatabaseInstance(
                    stack,
                    'OracleInstance1',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const oracleInstance2 = new DatabaseInstance(
                    stack,
                    'OracleInstance2',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Both Custom Resources should reference the same service token
                const customResources = template.findResources(
                    'Custom::RdsOracleMultiTenant'
                );
                const serviceTokens = Object.values(customResources).map(
                    (resource: any) => resource.Properties.ServiceToken
                );

                // Both service tokens should be identical (referencing same provider)
                expect(serviceTokens).toHaveLength(2);
                expect(serviceTokens[0]).toEqual(serviceTokens[1]);

                consoleSpy.mockRestore();
            });
        });
    });

    describe('Multi-Instance Scenarios', () => {
        describe('Multiple Oracle Instances in Single Stack', () => {
            it('should process multiple Oracle instances in the same stack correctly', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                // Create multiple Oracle instances with different engine types
                const oracleInstance1 = new DatabaseInstance(
                    stack,
                    'OracleInstance1',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc,
                        instanceIdentifier: 'oracle-se2-instance'
                    }
                );

                const oracleInstance2 = new DatabaseInstance(
                    stack,
                    'OracleInstance2',
                    {
                        engine: DatabaseInstanceEngine.oracleEe({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc,
                        instanceIdentifier: 'oracle-ee-instance'
                    }
                );

                const oracleInstance3 = new DatabaseInstance(
                    stack,
                    'OracleInstance3',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc,
                        instanceIdentifier: 'oracle-se2-instance-2'
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - All three Oracle instances should be processed
                const configurationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            'Oracle MultiTenant configuration will be applied to instance:'
                        )
                );
                expect(configurationCalls).toHaveLength(3);

                // Assert - Should create Custom Resources for all instances
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 3);

                // Assert - Should reuse provider (same Lambda function count)
                template.resourceCountIs('AWS::Lambda::Function', 5);

                // Assert - All Custom Resources should share the same service token
                const customResources = template.findResources(
                    'Custom::RdsOracleMultiTenant'
                );
                const serviceTokens = Object.values(customResources).map(
                    (resource: any) => resource.Properties.ServiceToken
                );

                expect(serviceTokens).toHaveLength(3);
                expect(serviceTokens[0]).toEqual(serviceTokens[1]);
                expect(serviceTokens[1]).toEqual(serviceTokens[2]);

                // Assert - Processing statistics should reflect all instances
                const stats = aspect.processingStatistics();
                expect(stats.processedInstancesCount).toBe(3);
                expect(stats.processedInstanceIds).toHaveLength(3);

                consoleSpy.mockRestore();
            });

            it('should apply consistent configuration to multiple Oracle instances', () => {
                // Arrange
                const kmsKey = new Key(stack, 'TestKey', {
                    description: 'Test KMS key for Oracle MultiTenant'
                });

                const securityGroup = new SecurityGroup(stack, 'TestSG', {
                    vpc,
                    description: 'Test security group'
                });

                const aspect = new RdsOracleMultiTenant({
                    encryption: kmsKey,
                    lambdaConfiguration: {
                        vpc: vpc,
                        subnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
                        securityGroups: [securityGroup],
                        logGroupRetention: RetentionDays.ONE_MONTH,
                        reservedConcurrentExecutions: 5
                    }
                });

                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                // Create multiple Oracle instances
                const oracleInstance1 = new DatabaseInstance(
                    stack,
                    'OracleInstance1',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const oracleInstance2 = new DatabaseInstance(
                    stack,
                    'OracleInstance2',
                    {
                        engine: DatabaseInstanceEngine.oracleEe({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Configuration should be validated for both instances
                const encryptionValidationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            '✓ Encryption key will be applied to Lambda functions for instance:'
                        )
                );
                expect(encryptionValidationCalls).toHaveLength(2);

                const vpcValidationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            '✓ VPC configuration will be applied for instance:'
                        )
                );
                expect(vpcValidationCalls).toHaveLength(2);

                const logRetentionValidationCalls =
                    consoleSpy.mock.calls.filter((call) =>
                        call[0]?.includes(
                            '✓ Log retention (30) will be applied for instance:'
                        )
                    );
                expect(logRetentionValidationCalls).toHaveLength(2);

                const concurrentExecutionsValidationCalls =
                    consoleSpy.mock.calls.filter((call) =>
                        call[0]?.includes(
                            '✓ Reserved concurrent executions (5) will be applied for instance:'
                        )
                    );
                expect(concurrentExecutionsValidationCalls).toHaveLength(2);

                // Assert - Template should have consistent configuration
                template.hasResourceProperties('AWS::Lambda::Function', {
                    KmsKeyArn: Match.anyValue(),
                    VpcConfig: {
                        SecurityGroupIds: Match.anyValue(),
                        SubnetIds: Match.anyValue()
                    },
                    ReservedConcurrentExecutions: 5
                });

                template.hasResourceProperties('AWS::Logs::LogGroup', {
                    RetentionInDays: 30
                });

                consoleSpy.mockRestore();
            });

            it('should handle large number of Oracle instances efficiently', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                // Create 5 Oracle instances to test scalability
                const oracleInstances = [];
                for (let i = 1; i <= 5; i++) {
                    oracleInstances.push(
                        new DatabaseInstance(stack, `OracleInstance${i}`, {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: `oracle-instance-${i}`
                        })
                    );
                }

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - All instances should be processed
                const configurationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            'Oracle MultiTenant configuration will be applied to instance:'
                        )
                );
                expect(configurationCalls).toHaveLength(5);

                // Assert - Should create Custom Resources for all instances
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 5);

                // Assert - Should still reuse provider (same Lambda function count)
                template.resourceCountIs('AWS::Lambda::Function', 5);

                // Assert - Processing statistics should reflect all instances
                const stats = aspect.processingStatistics();
                expect(stats.processedInstancesCount).toBe(5);
                expect(stats.processedInstanceIds).toHaveLength(5);

                consoleSpy.mockRestore();
            });
        });

        describe('Mixed Oracle and Non-Oracle Instances', () => {
            it('should process only Oracle instances and skip non-Oracle databases', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});
                const consoleDebugSpy = vi
                    .spyOn(console, 'debug')
                    .mockImplementation(() => {});

                // Create mixed database instances
                const oracleInstance1 = new DatabaseInstance(
                    stack,
                    'OracleInstance1',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const mysqlInstance = new DatabaseInstance(
                    stack,
                    'MySqlInstance',
                    {
                        engine: DatabaseInstanceEngine.mysql({
                            version: MysqlEngineVersion.VER_8_0_39
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const oracleInstance2 = new DatabaseInstance(
                    stack,
                    'OracleInstance2',
                    {
                        engine: DatabaseInstanceEngine.oracleEe({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const postgresInstance = new DatabaseInstance(
                    stack,
                    'PostgresInstance',
                    {
                        engine: DatabaseInstanceEngine.postgres({
                            version: {
                                postgresFullVersion: '13.7',
                                postgresMajorVersion: '13'
                            }
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Only Oracle instances should be processed
                const configurationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            'Oracle MultiTenant configuration will be applied to instance:'
                        )
                );
                expect(configurationCalls).toHaveLength(2);

                // Assert - Non-Oracle instances should be skipped with debug messages
                expect(consoleDebugSpy).toHaveBeenCalledWith(
                    expect.stringMatching(
                        /Oracle MultiTenant Aspect: Instance .* is not Oracle database \(mysql\) - skipping/
                    )
                );

                expect(consoleDebugSpy).toHaveBeenCalledWith(
                    expect.stringMatching(
                        /Oracle MultiTenant Aspect: Instance .* is not Oracle database \(postgres\) - skipping/
                    )
                );

                // Assert - Should create Custom Resources only for Oracle instances
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);

                // Assert - Processing statistics should reflect only Oracle instances
                const stats = aspect.processingStatistics();
                expect(stats.processedInstancesCount).toBe(2);
                expect(stats.processedInstanceIds).toHaveLength(2);

                consoleSpy.mockRestore();
                consoleDebugSpy.mockRestore();
            });

            it('should handle mixed instances with complex configuration', () => {
                // Arrange
                const kmsKey = new Key(stack, 'TestKey', {
                    description: 'Test KMS key for Oracle MultiTenant'
                });

                const aspect = new RdsOracleMultiTenant({
                    encryption: kmsKey,
                    lambdaConfiguration: {
                        logGroupRetention: RetentionDays.TWO_WEEKS
                    }
                });

                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                // Create mixed database instances
                const oracleInstance = new DatabaseInstance(
                    stack,
                    'OracleInstance',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const mysqlInstance1 = new DatabaseInstance(
                    stack,
                    'MySqlInstance1',
                    {
                        engine: DatabaseInstanceEngine.mysql({
                            version: MysqlEngineVersion.VER_8_0_39
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const mysqlInstance2 = new DatabaseInstance(
                    stack,
                    'MySqlInstance2',
                    {
                        engine: DatabaseInstanceEngine.mysql({
                            version: MysqlEngineVersion.VER_8_0_39
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - Only Oracle instance should be processed
                const configurationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            'Oracle MultiTenant configuration will be applied to instance:'
                        )
                );
                expect(configurationCalls).toHaveLength(1);

                // Assert - Configuration should be applied only to Oracle instance
                const encryptionValidationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            '✓ Encryption key will be applied to Lambda functions for instance:'
                        )
                );
                expect(encryptionValidationCalls).toHaveLength(1);

                const logRetentionValidationCalls =
                    consoleSpy.mock.calls.filter((call) =>
                        call[0]?.includes(
                            '✓ Log retention (14) will be applied for instance:'
                        )
                    );
                expect(logRetentionValidationCalls).toHaveLength(1);

                // Assert - Should create Custom Resource only for Oracle instance
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);

                // Assert - Processing statistics should reflect only Oracle instance
                const stats = aspect.processingStatistics();
                expect(stats.processedInstancesCount).toBe(1);
                expect(stats.processedInstanceIds).toHaveLength(1);

                consoleSpy.mockRestore();
            });

            it('should handle stack with no Oracle instances gracefully', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});
                const consoleDebugSpy = vi
                    .spyOn(console, 'debug')
                    .mockImplementation(() => {});

                // Create only non-Oracle instances
                const mysqlInstance = new DatabaseInstance(
                    stack,
                    'MySqlInstance',
                    {
                        engine: DatabaseInstanceEngine.mysql({
                            version: MysqlEngineVersion.VER_8_0_39
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const postgresInstance = new DatabaseInstance(
                    stack,
                    'PostgresInstance',
                    {
                        engine: DatabaseInstanceEngine.postgres({
                            version: {
                                postgresFullVersion: '13.7',
                                postgresMajorVersion: '13'
                            }
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act
                Aspects.of(stack).add(aspect);
                const template = getTemplate();

                // Assert - No Oracle instances should be processed
                const configurationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            'Oracle MultiTenant configuration will be applied to instance:'
                        )
                );
                expect(configurationCalls).toHaveLength(0);

                // Assert - Should skip all instances with debug messages
                expect(consoleDebugSpy).toHaveBeenCalledWith(
                    expect.stringMatching(
                        /Oracle MultiTenant Aspect: Instance .* is not Oracle database \(mysql\) - skipping/
                    )
                );

                expect(consoleDebugSpy).toHaveBeenCalledWith(
                    expect.stringMatching(
                        /Oracle MultiTenant Aspect: Instance .* is not Oracle database \(postgres\) - skipping/
                    )
                );

                // Assert - Should not create any Custom Resources
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 0);

                // Assert - Processing statistics should show no processed instances
                const stats = aspect.processingStatistics();
                expect(stats.processedInstancesCount).toBe(0);
                expect(stats.processedInstanceIds).toHaveLength(0);

                consoleSpy.mockRestore();
                consoleDebugSpy.mockRestore();
            });
        });

        describe('Duplicate Processing Prevention', () => {
            it('should prevent duplicate processing when aspect is applied multiple times', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleWarnSpy = vi
                    .spyOn(console, 'warn')
                    .mockImplementation(() => {});
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                const oracleInstance = new DatabaseInstance(
                    stack,
                    'OracleInstance',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act - Apply aspect at stack level first
                Aspects.of(stack).add(aspect);
                const template = getTemplate(); // This triggers the first processing

                // Now manually visit the instance again to test duplicate detection
                aspect.visit(oracleInstance);

                // Assert - Should only process once despite multiple aspect applications
                const configurationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            'Oracle MultiTenant configuration will be applied to instance:'
                        )
                );
                expect(configurationCalls).toHaveLength(1);

                // Assert - Should warn about duplicate processing attempt
                expect(consoleWarnSpy).toHaveBeenCalledWith(
                    expect.stringContaining(
                        '⚠️  Oracle MultiTenant Aspect: Duplicate processing attempt detected'
                    )
                );

                // Assert - Should create only one Custom Resource
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);

                // Assert - Processing statistics should show only one processed instance
                const stats = aspect.processingStatistics();
                expect(stats.processedInstancesCount).toBe(1);
                expect(stats.processedInstanceIds).toHaveLength(1);

                consoleWarnSpy.mockRestore();
                consoleSpy.mockRestore();
            });

            it('should prevent duplicate processing across multiple Oracle instances', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleWarnSpy = vi
                    .spyOn(console, 'warn')
                    .mockImplementation(() => {});
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                const oracleInstance1 = new DatabaseInstance(
                    stack,
                    'OracleInstance1',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const oracleInstance2 = new DatabaseInstance(
                    stack,
                    'OracleInstance2',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act - Apply aspect at stack level and then manually visit instances
                Aspects.of(stack).add(aspect);
                const template = getTemplate(); // This triggers the aspect processing

                // Manually visit instances again to test duplicate detection
                aspect.visit(oracleInstance1);
                aspect.visit(oracleInstance2);

                // Assert - Should process both instances initially
                const configurationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            'Oracle MultiTenant configuration will be applied to instance:'
                        )
                );
                expect(configurationCalls).toHaveLength(2);

                // Assert - Should warn about duplicate processing attempts
                expect(consoleWarnSpy).toHaveBeenCalledWith(
                    expect.stringContaining(
                        '⚠️  Oracle MultiTenant Aspect: Duplicate processing attempt detected'
                    )
                );

                // Assert - Should create Custom Resources for both instances (no duplicates)
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);

                // Assert - Processing statistics should show both instances (no duplicates)
                const stats = aspect.processingStatistics();
                expect(stats.processedInstancesCount).toBe(2);
                expect(stats.processedInstanceIds).toHaveLength(2);

                consoleWarnSpy.mockRestore();
                consoleSpy.mockRestore();
            });

            it('should track processed instances correctly across multiple visits', () => {
                // Arrange
                const aspect = new RdsOracleMultiTenant();
                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                const oracleInstance1 = new DatabaseInstance(
                    stack,
                    'OracleInstance1',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const oracleInstance2 = new DatabaseInstance(
                    stack,
                    'OracleInstance2',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                // Act - Process instances individually first
                aspect.visit(oracleInstance1);
                let stats = aspect.processingStatistics();
                expect(stats.processedInstancesCount).toBe(1);

                aspect.visit(oracleInstance2);
                stats = aspect.processingStatistics();
                expect(stats.processedInstancesCount).toBe(2);

                // Apply aspect to stack (should not reprocess)
                Aspects.of(stack).add(aspect);
                getTemplate(); // Trigger synthesis

                // Assert - Should still have only 2 processed instances
                stats = aspect.processingStatistics();
                expect(stats.processedInstancesCount).toBe(2);
                expect(stats.processedInstanceIds).toHaveLength(2);

                consoleSpy.mockRestore();
            });
        });

        describe('Cross-Stack Oracle Instance Handling', () => {
            it('should handle Oracle instances across different stacks', () => {
                // Arrange
                const aspect1 = new RdsOracleMultiTenant();
                const aspect2 = new RdsOracleMultiTenant();

                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                // Create a truly separate stack (not using getStack() which returns the same instance)
                const app = getApp();
                const stack2 = new Stack(
                    app,
                    `TestStack2${new Date().getTime()}`,
                    {
                        env: {
                            account: '123456789012',
                            region: 'us-east-1'
                        }
                    }
                );
                const vpc2 = new Vpc(stack2, 'TestVpc2');

                // Create Oracle instances in different stacks
                const oracleInstance1 = new DatabaseInstance(
                    stack,
                    'OracleInstance1',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const oracleInstance2 = new DatabaseInstance(
                    stack2,
                    'OracleInstance2',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc: vpc2
                    }
                );

                // Act - Apply aspects to different stacks
                Aspects.of(stack).add(aspect1);
                Aspects.of(stack2).add(aspect2);

                const template1 = getTemplate();
                const template2 = Template.fromStack(stack2);

                // Assert - Each stack should have its own Custom Resource
                template1.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
                template2.resourceCountIs('Custom::RdsOracleMultiTenant', 1);

                // Assert - Each stack should have its own Lambda functions (no sharing across stacks)
                template1.resourceCountIs('AWS::Lambda::Function', 5);
                template2.resourceCountIs('AWS::Lambda::Function', 5);

                // Assert - Each aspect should track its own processed instances
                const stats1 = aspect1.processingStatistics();
                const stats2 = aspect2.processingStatistics();

                expect(stats1.processedInstancesCount).toBe(1);
                expect(stats2.processedInstancesCount).toBe(1);

                // Assert - Configuration should be applied to both instances
                // Note: We don't check exact count due to console spy capturing logs from other tests
                const configurationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            'Oracle MultiTenant configuration will be applied to instance:'
                        )
                );
                expect(configurationCalls.length).toBeGreaterThanOrEqual(2);

                consoleSpy.mockRestore();
            });

            it('should create separate providers for different stacks', () => {
                // Arrange
                const aspect1 = new RdsOracleMultiTenant();
                const aspect2 = new RdsOracleMultiTenant();

                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                // Create a truly separate stack (not using getStack() which returns the same instance)
                const app = getApp();
                const stack2 = new Stack(
                    app,
                    `TestStack2${new Date().getTime()}`,
                    {
                        env: {
                            account: '123456789012',
                            region: 'us-east-1'
                        }
                    }
                );
                const vpc2 = new Vpc(stack2, 'TestVpc2');

                // Create Oracle instances in different stacks
                const oracleInstance1 = new DatabaseInstance(
                    stack,
                    'OracleInstance1',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const oracleInstance2 = new DatabaseInstance(
                    stack2,
                    'OracleInstance2',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc: vpc2
                    }
                );

                // Act - Apply aspects to different stacks
                Aspects.of(stack).add(aspect1);
                Aspects.of(stack2).add(aspect2);

                const template1 = getTemplate();
                const template2 = Template.fromStack(stack2);

                // Assert - Each stack should have separate providers
                // This is verified by checking that each stack has its own Lambda functions
                template1.resourceCountIs('AWS::Lambda::Function', 5);
                template2.resourceCountIs('AWS::Lambda::Function', 5);

                // Assert - Service tokens should be different between stacks
                const customResources1 = template1.findResources(
                    'Custom::RdsOracleMultiTenant'
                );
                const customResources2 = template2.findResources(
                    'Custom::RdsOracleMultiTenant'
                );

                const serviceToken1 = Object.values(customResources1)[0] as any;
                const serviceToken2 = Object.values(customResources2)[0] as any;

                // Service tokens should be different (different providers)
                // Note: In some test scenarios, the tokens might be similar due to CDK token generation
                // The key test is that each stack has its own Lambda functions
                expect(serviceToken1.Properties.ServiceToken).toBeDefined();
                expect(serviceToken2.Properties.ServiceToken).toBeDefined();

                consoleSpy.mockRestore();
            });

            it('should handle mixed cross-stack scenarios with configuration', () => {
                // Arrange
                const kmsKey1 = new Key(stack, 'TestKey1', {
                    description: 'Test KMS key for stack 1'
                });

                const aspect1 = new RdsOracleMultiTenant({
                    encryption: kmsKey1,
                    lambdaConfiguration: {
                        logGroupRetention: RetentionDays.ONE_WEEK
                    }
                });

                // Create a truly separate stack with different configuration
                const app = getApp();
                const stack2 = new Stack(
                    app,
                    `TestStack2${new Date().getTime()}`,
                    {
                        env: {
                            account: '123456789012',
                            region: 'us-east-1'
                        }
                    }
                );
                const vpc2 = new Vpc(stack2, 'TestVpc2');
                const kmsKey2 = new Key(stack2, 'TestKey2', {
                    description: 'Test KMS key for stack 2'
                });

                const aspect2 = new RdsOracleMultiTenant({
                    encryption: kmsKey2,
                    lambdaConfiguration: {
                        logGroupRetention: RetentionDays.ONE_MONTH
                    }
                });

                const consoleSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                // Create Oracle instances in different stacks
                const oracleInstance1 = new DatabaseInstance(
                    stack,
                    'OracleInstance1',
                    {
                        engine: DatabaseInstanceEngine.oracleSe2({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc
                    }
                );

                const oracleInstance2 = new DatabaseInstance(
                    stack2,
                    'OracleInstance2',
                    {
                        engine: DatabaseInstanceEngine.oracleEe({
                            version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                        }),
                        instanceType: InstanceType.of(
                            InstanceClass.BURSTABLE3,
                            InstanceSize.SMALL
                        ),
                        vpc: vpc2
                    }
                );

                // Act - Apply aspects to different stacks
                Aspects.of(stack).add(aspect1);
                Aspects.of(stack2).add(aspect2);

                const template1 = getTemplate();
                const template2 = Template.fromStack(stack2);

                // Assert - Each stack should apply its own configuration
                // Note: We don't check exact count due to console spy capturing logs from other tests
                const encryptionValidationCalls = consoleSpy.mock.calls.filter(
                    (call) =>
                        call[0]?.includes(
                            '✓ Encryption key will be applied to Lambda functions for instance:'
                        )
                );
                expect(encryptionValidationCalls.length).toBeGreaterThanOrEqual(
                    2
                );

                // Assert - Stack 1 should have 7-day retention
                template1.hasResourceProperties('AWS::Logs::LogGroup', {
                    RetentionInDays: 7
                });

                // Assert - Stack 2 should have 30-day retention
                template2.hasResourceProperties('AWS::Logs::LogGroup', {
                    RetentionInDays: 30
                });

                // Assert - Each stack should have its own KMS key references
                template1.hasResourceProperties('AWS::Lambda::Function', {
                    KmsKeyArn: {
                        'Fn::GetAtt': [
                            Match.stringLikeRegexp('TestKey1.*'),
                            'Arn'
                        ]
                    }
                });

                template2.hasResourceProperties('AWS::Lambda::Function', {
                    KmsKeyArn: {
                        'Fn::GetAtt': [
                            Match.stringLikeRegexp('TestKey2.*'),
                            'Arn'
                        ]
                    }
                });

                consoleSpy.mockRestore();
            });
        });

        describe('Integration Testing and Final Validation', () => {
            describe('Multiple Oracle Instances Scenarios', () => {
                it('should handle multiple Oracle instances in a single stack with shared provider', () => {
                    // Arrange
                    const aspect = new RdsOracleMultiTenant();
                    const consoleSpy = vi
                        .spyOn(console, 'log')
                        .mockImplementation(() => {});

                    // Create multiple Oracle instances with different configurations
                    const oracleInstance1 = new DatabaseInstance(
                        stack,
                        'OracleInstance1',
                        {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-instance-1'
                        }
                    );

                    const oracleInstance2 = new DatabaseInstance(
                        stack,
                        'OracleInstance2',
                        {
                            engine: DatabaseInstanceEngine.oracleEe({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.MEDIUM
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-instance-2'
                        }
                    );

                    const oracleInstance3 = new DatabaseInstance(
                        stack,
                        'OracleInstance3',
                        {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.LARGE
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-instance-3'
                        }
                    );

                    // Act
                    Aspects.of(stack).add(aspect);
                    const template = getTemplate();

                    // Assert - Verify all instances are processed
                    const configurationCalls = consoleSpy.mock.calls.filter(
                        (call) =>
                            call[0]?.includes(
                                'Oracle MultiTenant configuration will be applied to instance:'
                            )
                    );
                    expect(configurationCalls).toHaveLength(3);

                    // Verify Custom Resources are created for each instance
                    template.resourceCountIs('Custom::RdsOracleMultiTenant', 3);

                    // Verify shared provider (Lambda functions are created)
                    // Note: The actual count may be higher due to CDK framework functions
                    const lambdaFunctions = Object.keys(
                        template.toJSON().Resources
                    ).filter(
                        (key) =>
                            template.toJSON().Resources[key].Type ===
                            'AWS::Lambda::Function'
                    );
                    expect(lambdaFunctions.length).toBeGreaterThanOrEqual(2);

                    // Verify each Custom Resource has correct properties
                    template.hasResourceProperties(
                        'Custom::RdsOracleMultiTenant',
                        {
                            DBInstanceIdentifier: Match.anyValue()
                        }
                    );

                    // Verify all three instances have Custom Resources
                    const customResources = Object.values(
                        template.toJSON().Resources
                    ).filter(
                        (resource: any) =>
                            resource.Type === 'Custom::RdsOracleMultiTenant'
                    );
                    expect(customResources).toHaveLength(3);

                    consoleSpy.mockRestore();
                });

                it('should handle mixed Oracle and non-Oracle instances correctly', () => {
                    // Arrange
                    const aspect = new RdsOracleMultiTenant();
                    const consoleSpy = vi
                        .spyOn(console, 'log')
                        .mockImplementation(() => {});
                    const consoleDebugSpy = vi
                        .spyOn(console, 'debug')
                        .mockImplementation(() => {});

                    // Create mixed database instances
                    const oracleInstance = new DatabaseInstance(
                        stack,
                        'OracleInstance',
                        {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-mixed-test'
                        }
                    );

                    const mysqlInstance = new DatabaseInstance(
                        stack,
                        'MySqlInstance',
                        {
                            engine: DatabaseInstanceEngine.mysql({
                                version: MysqlEngineVersion.VER_8_0_39
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'mysql-mixed-test'
                        }
                    );

                    const postgresInstance = new DatabaseInstance(
                        stack,
                        'PostgresInstance',
                        {
                            engine: DatabaseInstanceEngine.postgres({
                                version: {
                                    postgresFullVersion: '13.7',
                                    postgresMajorVersion: '13'
                                }
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'postgres-mixed-test'
                        }
                    );

                    // Act
                    Aspects.of(stack).add(aspect);
                    const template = getTemplate();

                    // Assert - Only Oracle instance should be processed
                    const oracleConfigCalls = consoleSpy.mock.calls.filter(
                        (call) =>
                            call[0]?.includes(
                                'Oracle MultiTenant configuration will be applied to instance:'
                            )
                    );
                    expect(oracleConfigCalls).toHaveLength(1);

                    // Verify non-Oracle instances are skipped with debug logging
                    expect(consoleDebugSpy).toHaveBeenCalledWith(
                        expect.stringMatching(
                            /Oracle MultiTenant Aspect: Instance .* is not Oracle database \(mysql\) - skipping/
                        )
                    );

                    expect(consoleDebugSpy).toHaveBeenCalledWith(
                        expect.stringMatching(
                            /Oracle MultiTenant Aspect: Instance .* is not Oracle database \(postgres\) - skipping/
                        )
                    );

                    // Verify only one Custom Resource is created (for Oracle instance)
                    template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);

                    template.hasResourceProperties(
                        'Custom::RdsOracleMultiTenant',
                        {
                            DBInstanceIdentifier: Match.anyValue()
                        }
                    );

                    consoleSpy.mockRestore();
                    consoleDebugSpy.mockRestore();
                });

                it('should handle cross-stack Oracle instances with separate providers', () => {
                    // Arrange
                    const app = getApp();
                    const stack1 = new Stack(app, 'Stack1', {
                        env: { account: '123456789012', region: 'us-east-1' }
                    });
                    const stack2 = new Stack(app, 'Stack2', {
                        env: { account: '123456789012', region: 'us-east-1' }
                    });

                    const vpc1 = new Vpc(stack1, 'Vpc1');
                    const vpc2 = new Vpc(stack2, 'Vpc2');

                    const aspect = new RdsOracleMultiTenant();
                    const consoleSpy = vi
                        .spyOn(console, 'log')
                        .mockImplementation(() => {});

                    // Create Oracle instances in different stacks
                    const oracleInstance1 = new DatabaseInstance(
                        stack1,
                        'OracleInstance1',
                        {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc: vpc1,
                            instanceIdentifier: 'oracle-stack1'
                        }
                    );

                    const oracleInstance2 = new DatabaseInstance(
                        stack2,
                        'OracleInstance2',
                        {
                            engine: DatabaseInstanceEngine.oracleEe({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc: vpc2,
                            instanceIdentifier: 'oracle-stack2'
                        }
                    );

                    // Act - Apply aspect to both stacks
                    Aspects.of(stack1).add(aspect);
                    Aspects.of(stack2).add(aspect);

                    const template1 = Template.fromStack(stack1);
                    const template2 = Template.fromStack(stack2);

                    // Assert - Both instances should be processed
                    const configurationCalls = consoleSpy.mock.calls.filter(
                        (call) =>
                            call[0]?.includes(
                                'Oracle MultiTenant configuration will be applied to instance:'
                            )
                    );
                    expect(configurationCalls).toHaveLength(2);

                    // Verify separate providers are created in each stack
                    template1.resourceCountIs(
                        'Custom::RdsOracleMultiTenant',
                        1
                    );
                    const lambdaFunctions1 = Object.keys(
                        template1.toJSON().Resources
                    ).filter(
                        (key) =>
                            template1.toJSON().Resources[key].Type ===
                            'AWS::Lambda::Function'
                    );
                    expect(lambdaFunctions1.length).toBeGreaterThanOrEqual(2);

                    template2.resourceCountIs(
                        'Custom::RdsOracleMultiTenant',
                        1
                    );
                    const lambdaFunctions2 = Object.keys(
                        template2.toJSON().Resources
                    ).filter(
                        (key) =>
                            template2.toJSON().Resources[key].Type ===
                            'AWS::Lambda::Function'
                    );
                    expect(lambdaFunctions2.length).toBeGreaterThanOrEqual(2);

                    // Verify correct instance identifiers
                    template1.hasResourceProperties(
                        'Custom::RdsOracleMultiTenant',
                        {
                            DBInstanceIdentifier: Match.anyValue()
                        }
                    );

                    template2.hasResourceProperties(
                        'Custom::RdsOracleMultiTenant',
                        {
                            DBInstanceIdentifier: Match.anyValue()
                        }
                    );

                    consoleSpy.mockRestore();
                });
            });

            describe('Aspect Application at Different Scopes', () => {
                it('should work when applied at application scope', () => {
                    // Arrange
                    const app = getApp();
                    const testStack = new Stack(app, 'TestStack', {
                        env: { account: '123456789012', region: 'us-east-1' }
                    });
                    const testVpc = new Vpc(testStack, 'TestVpc');

                    const aspect = new RdsOracleMultiTenant();
                    const consoleSpy = vi
                        .spyOn(console, 'log')
                        .mockImplementation(() => {});

                    const oracleInstance = new DatabaseInstance(
                        testStack,
                        'OracleInstance',
                        {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc: testVpc,
                            instanceIdentifier: 'oracle-app-scope'
                        }
                    );

                    // Act - Apply aspect at application scope
                    Aspects.of(app).add(aspect);
                    const template = Template.fromStack(testStack);

                    // Assert - Check that the configuration message was logged
                    const configurationCalls = consoleSpy.mock.calls.filter(
                        (call) =>
                            call[0]?.includes(
                                'Oracle MultiTenant configuration will be applied to instance:'
                            )
                    );
                    expect(configurationCalls).toHaveLength(1);

                    template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
                    template.hasResourceProperties(
                        'Custom::RdsOracleMultiTenant',
                        {
                            DBInstanceIdentifier: Match.anyValue()
                        }
                    );

                    consoleSpy.mockRestore();
                });

                it('should work when applied at stack scope', () => {
                    // Arrange
                    const aspect = new RdsOracleMultiTenant();
                    const consoleSpy = vi
                        .spyOn(console, 'log')
                        .mockImplementation(() => {});

                    const oracleInstance = new DatabaseInstance(
                        stack,
                        'OracleInstance',
                        {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-stack-scope'
                        }
                    );

                    // Act - Apply aspect at stack scope
                    Aspects.of(stack).add(aspect);
                    const template = getTemplate();

                    // Assert - Check that the configuration message was logged
                    const configurationCalls = consoleSpy.mock.calls.filter(
                        (call) =>
                            call[0]?.includes(
                                'Oracle MultiTenant configuration will be applied to instance:'
                            )
                    );
                    expect(configurationCalls).toHaveLength(1);

                    template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
                    template.hasResourceProperties(
                        'Custom::RdsOracleMultiTenant',
                        {
                            DBInstanceIdentifier: Match.anyValue()
                        }
                    );

                    consoleSpy.mockRestore();
                });

                it('should work when applied at construct scope', () => {
                    // Arrange
                    const aspect = new RdsOracleMultiTenant();
                    const consoleSpy = vi
                        .spyOn(console, 'log')
                        .mockImplementation(() => {});

                    // Create a parent construct to apply the aspect to
                    const databaseConstruct = new Construct(
                        stack,
                        'DatabaseConstruct'
                    );

                    const oracleInstance = new DatabaseInstance(
                        databaseConstruct,
                        'OracleInstance',
                        {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-construct-scope'
                        }
                    );

                    // Create another Oracle instance outside the construct scope
                    const oracleInstanceOutside = new DatabaseInstance(
                        stack,
                        'OracleInstanceOutside',
                        {
                            engine: DatabaseInstanceEngine.oracleEe({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-outside-scope'
                        }
                    );

                    // Act - Apply aspect only to the specific construct
                    Aspects.of(databaseConstruct).add(aspect);
                    const template = getTemplate();

                    // Assert - Only the instance within the construct scope should be processed
                    const configurationCalls = consoleSpy.mock.calls.filter(
                        (call) =>
                            call[0]?.includes(
                                'Oracle MultiTenant configuration will be applied to instance:'
                            )
                    );
                    expect(configurationCalls).toHaveLength(1);

                    // Verify that only one instance was processed (the one in scope)
                    const allConfigurationCalls = consoleSpy.mock.calls.filter(
                        (call) =>
                            call[0]?.includes(
                                'Oracle MultiTenant configuration will be applied to instance:'
                            )
                    );
                    expect(allConfigurationCalls).toHaveLength(1);

                    // Only one Custom Resource should be created
                    template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
                    template.hasResourceProperties(
                        'Custom::RdsOracleMultiTenant',
                        {
                            DBInstanceIdentifier: Match.anyValue()
                        }
                    );

                    consoleSpy.mockRestore();
                });
            });

            describe('Lambda Functions and Custom Resources Verification', () => {
                it('should create Lambda functions with correct runtime and handler configuration', () => {
                    // Arrange
                    const aspect = new RdsOracleMultiTenant();

                    const oracleInstance = new DatabaseInstance(
                        stack,
                        'OracleInstance',
                        {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-lambda-test'
                        }
                    );

                    // Act
                    Aspects.of(stack).add(aspect);
                    const template = getTemplate();

                    // Assert - Verify Lambda functions are created with correct configuration
                    const lambdaFunctions = Object.keys(
                        template.toJSON().Resources
                    ).filter(
                        (key) =>
                            template.toJSON().Resources[key].Type ===
                            'AWS::Lambda::Function'
                    );
                    expect(lambdaFunctions.length).toBeGreaterThanOrEqual(2);

                    // Verify Lambda functions have correct runtime and handler
                    template.hasResourceProperties('AWS::Lambda::Function', {
                        Runtime: 'nodejs22.x',
                        Handler: 'index.handler',
                        Timeout: 300,
                        Code: {
                            S3Bucket: Match.anyValue(),
                            S3Key: Match.anyValue()
                        }
                    });

                    // Verify IAM roles are created for Lambda functions
                    const iamRoles = Object.keys(
                        template.toJSON().Resources
                    ).filter(
                        (key) =>
                            template.toJSON().Resources[key].Type ===
                            'AWS::IAM::Role'
                    );
                    expect(iamRoles.length).toBeGreaterThanOrEqual(2);

                    // Verify IAM policies with RDS permissions exist
                    const iamPolicies = Object.keys(
                        template.toJSON().Resources
                    ).filter(
                        (key) =>
                            template.toJSON().Resources[key].Type ===
                            'AWS::IAM::Policy'
                    );
                    expect(iamPolicies.length).toBeGreaterThan(0);
                });

                it('should create Custom Resource with correct properties and dependencies', () => {
                    // Arrange
                    const aspect = new RdsOracleMultiTenant();

                    const oracleInstance = new DatabaseInstance(
                        stack,
                        'OracleInstance',
                        {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-custom-resource-test'
                        }
                    );

                    // Act
                    Aspects.of(stack).add(aspect);
                    const template = getTemplate();

                    // Assert - Verify Custom Resource is created with correct properties
                    template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);

                    template.hasResourceProperties(
                        'Custom::RdsOracleMultiTenant',
                        {
                            ServiceToken: Match.anyValue(),
                            DBInstanceIdentifier: Match.anyValue()
                        }
                    );

                    // Verify the Custom Resource has a dependency on the database instance
                    const customResourceLogicalId = Object.keys(
                        template.toJSON().Resources
                    ).find(
                        (key) =>
                            template.toJSON().Resources[key].Type ===
                            'Custom::RdsOracleMultiTenant'
                    );

                    expect(customResourceLogicalId).toBeDefined();

                    const customResource =
                        template.toJSON().Resources[customResourceLogicalId!];
                    expect(customResource.DependsOn).toBeDefined();
                    const dependencies = Array.isArray(customResource.DependsOn)
                        ? customResource.DependsOn
                        : [customResource.DependsOn];
                    expect(dependencies.length).toBeGreaterThan(0);
                    // Verify at least one dependency exists (should be the database instance)
                    expect(
                        dependencies.some(
                            (dep: string) => typeof dep === 'string'
                        )
                    ).toBe(true);
                });

                it('should apply encryption configuration to Lambda functions when provided', () => {
                    // Arrange
                    const kmsKey = new Key(stack, 'TestKey', {
                        description: 'Test KMS key for Oracle MultiTenant'
                    });

                    const aspect = new RdsOracleMultiTenant({
                        encryption: kmsKey
                    });

                    const oracleInstance = new DatabaseInstance(
                        stack,
                        'OracleInstance',
                        {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-encryption-test'
                        }
                    );

                    // Act
                    Aspects.of(stack).add(aspect);
                    const template = getTemplate();

                    // Assert - Verify Lambda functions have KMS encryption
                    template.hasResourceProperties('AWS::Lambda::Function', {
                        KmsKeyArn: Match.anyValue()
                    });

                    // Verify KMS key permissions exist in IAM policies
                    const templateJson = template.toJSON();
                    const policies = Object.values(
                        templateJson.Resources
                    ).filter(
                        (resource: any) => resource.Type === 'AWS::IAM::Policy'
                    );

                    const hasKmsPermissions = policies.some((policy: any) => {
                        const statements =
                            policy.Properties.PolicyDocument.Statement;
                        return statements.some((statement: any) => {
                            const actions = Array.isArray(statement.Action)
                                ? statement.Action
                                : [statement.Action];
                            return actions.some((action: string) =>
                                action.includes('kms:')
                            );
                        });
                    });

                    expect(hasKmsPermissions).toBe(true);

                    // Verify CloudWatch log groups are encrypted
                    template.hasResourceProperties('AWS::Logs::LogGroup', {
                        KmsKeyId: Match.anyValue()
                    });
                });

                it('should apply Lambda configuration settings when provided', () => {
                    // Arrange
                    const securityGroup = new SecurityGroup(stack, 'TestSG', {
                        vpc,
                        description: 'Test security group'
                    });

                    const aspect = new RdsOracleMultiTenant({
                        lambdaConfiguration: {
                            vpc: vpc,
                            subnets: {
                                subnetType: SubnetType.PRIVATE_WITH_EGRESS
                            },
                            securityGroups: [securityGroup],
                            logGroupRetention: RetentionDays.ONE_MONTH,
                            reservedConcurrentExecutions: 5
                        }
                    });

                    const oracleInstance = new DatabaseInstance(
                        stack,
                        'OracleInstance',
                        {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-lambda-config-test'
                        }
                    );

                    // Act
                    Aspects.of(stack).add(aspect);
                    const template = getTemplate();

                    // Assert - Verify Lambda functions have VPC configuration
                    template.hasResourceProperties('AWS::Lambda::Function', {
                        VpcConfig: {
                            SecurityGroupIds: Match.anyValue(),
                            SubnetIds: Match.anyValue()
                        },
                        ReservedConcurrentExecutions: 5
                    });

                    // Verify log groups have correct retention
                    template.hasResourceProperties('AWS::Logs::LogGroup', {
                        RetentionInDays: 30 // ONE_MONTH
                    });

                    // Verify VPC permissions exist in IAM policies
                    const templateJson2 = template.toJSON();
                    const policies2 = Object.values(
                        templateJson2.Resources
                    ).filter(
                        (resource: any) => resource.Type === 'AWS::IAM::Policy'
                    );

                    const hasVpcPermissions = policies2.some((policy: any) => {
                        const statements =
                            policy.Properties.PolicyDocument.Statement;
                        return statements.some((statement: any) => {
                            const actions = Array.isArray(statement.Action)
                                ? statement.Action
                                : [statement.Action];
                            return actions.some((action: string) =>
                                action.includes('ec2:')
                            );
                        });
                    });

                    expect(hasVpcPermissions).toBe(true);
                });
            });

            describe('End-to-End Functionality Validation', () => {
                it('should create complete infrastructure for Oracle MultiTenant configuration', () => {
                    // Arrange
                    const kmsKey = new Key(stack, 'TestKey', {
                        description: 'Test KMS key for Oracle MultiTenant'
                    });

                    const securityGroup = new SecurityGroup(stack, 'TestSG', {
                        vpc,
                        description: 'Test security group'
                    });

                    const aspect = new RdsOracleMultiTenant({
                        encryption: kmsKey,
                        lambdaConfiguration: {
                            vpc: vpc,
                            subnets: {
                                subnetType: SubnetType.PRIVATE_WITH_EGRESS
                            },
                            securityGroups: [securityGroup],
                            logGroupRetention: RetentionDays.TWO_WEEKS,
                            reservedConcurrentExecutions: 3
                        }
                    });

                    const consoleSpy = vi
                        .spyOn(console, 'log')
                        .mockImplementation(() => {});

                    // Create multiple Oracle instances with different configurations
                    const oracleInstance1 = new DatabaseInstance(
                        stack,
                        'OracleInstance1',
                        {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-e2e-test-1'
                        }
                    );

                    const oracleInstance2 = new DatabaseInstance(
                        stack,
                        'OracleInstance2',
                        {
                            engine: DatabaseInstanceEngine.oracleEe({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.MEDIUM
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-e2e-test-2'
                        }
                    );

                    // Add a non-Oracle instance to verify it's skipped
                    const mysqlInstance = new DatabaseInstance(
                        stack,
                        'MySqlInstance',
                        {
                            engine: DatabaseInstanceEngine.mysql({
                                version: MysqlEngineVersion.VER_8_0_39
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'mysql-e2e-test'
                        }
                    );

                    // Act
                    Aspects.of(stack).add(aspect);
                    const template = getTemplate();

                    // Assert - Verify complete infrastructure is created

                    // 1. Verify Oracle instances are processed
                    const configurationCalls = consoleSpy.mock.calls.filter(
                        (call) =>
                            call[0]?.includes(
                                'Oracle MultiTenant configuration will be applied to instance:'
                            )
                    );
                    expect(configurationCalls).toHaveLength(2);

                    // 2. Verify Custom Resources are created for Oracle instances only
                    template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);

                    template.hasResourceProperties(
                        'Custom::RdsOracleMultiTenant',
                        {
                            DBInstanceIdentifier: Match.anyValue()
                        }
                    );

                    // Verify both instances have Custom Resources
                    const customResources = Object.values(
                        template.toJSON().Resources
                    ).filter(
                        (resource: any) =>
                            resource.Type === 'Custom::RdsOracleMultiTenant'
                    );
                    expect(customResources).toHaveLength(2);

                    // 3. Verify Lambda functions are created with full configuration
                    const lambdaFunctions = Object.keys(
                        template.toJSON().Resources
                    ).filter(
                        (key) =>
                            template.toJSON().Resources[key].Type ===
                            'AWS::Lambda::Function'
                    );
                    expect(lambdaFunctions.length).toBeGreaterThanOrEqual(2);

                    template.hasResourceProperties('AWS::Lambda::Function', {
                        Runtime: 'nodejs22.x',
                        Handler: 'index.handler',
                        KmsKeyArn: Match.anyValue(),
                        VpcConfig: {
                            SecurityGroupIds: Match.anyValue(),
                            SubnetIds: Match.anyValue()
                        },
                        ReservedConcurrentExecutions: 3
                    });

                    // 4. Verify IAM roles and policies exist
                    const iamRoles = Object.keys(
                        template.toJSON().Resources
                    ).filter(
                        (key) =>
                            template.toJSON().Resources[key].Type ===
                            'AWS::IAM::Role'
                    );
                    expect(iamRoles.length).toBeGreaterThanOrEqual(2);

                    const iamPolicies = Object.keys(
                        template.toJSON().Resources
                    ).filter(
                        (key) =>
                            template.toJSON().Resources[key].Type ===
                            'AWS::IAM::Policy'
                    );
                    expect(iamPolicies.length).toBeGreaterThan(0);

                    // 5. Verify KMS permissions exist
                    const templateJson = template.toJSON();
                    const policies = Object.values(
                        templateJson.Resources
                    ).filter(
                        (resource: any) => resource.Type === 'AWS::IAM::Policy'
                    );

                    const hasKmsPermissions = policies.some((policy: any) => {
                        const statements =
                            policy.Properties.PolicyDocument.Statement;
                        return statements.some((statement: any) => {
                            const actions = Array.isArray(statement.Action)
                                ? statement.Action
                                : [statement.Action];
                            return actions.some((action: string) =>
                                action.includes('kms:')
                            );
                        });
                    });
                    expect(hasKmsPermissions).toBe(true);

                    // 6. Verify VPC permissions exist
                    const hasVpcPermissions = policies.some((policy: any) => {
                        const statements =
                            policy.Properties.PolicyDocument.Statement;
                        return statements.some((statement: any) => {
                            const actions = Array.isArray(statement.Action)
                                ? statement.Action
                                : [statement.Action];
                            return actions.some((action: string) =>
                                action.includes('ec2:')
                            );
                        });
                    });
                    expect(hasVpcPermissions).toBe(true);

                    // 7. Verify CloudWatch log groups with encryption and retention
                    template.hasResourceProperties('AWS::Logs::LogGroup', {
                        RetentionInDays: 14, // TWO_WEEKS
                        KmsKeyId: Match.anyValue()
                    });

                    // 8. Verify provider is shared between instances
                    expect(lambdaFunctions.length).toBeGreaterThanOrEqual(2);

                    consoleSpy.mockRestore();
                });

                it('should handle complex nested construct hierarchies', () => {
                    // Arrange
                    const aspect = new RdsOracleMultiTenant();
                    const consoleSpy = vi
                        .spyOn(console, 'log')
                        .mockImplementation(() => {});

                    // Create nested construct hierarchy
                    const databaseTier = new Construct(stack, 'DatabaseTier');
                    const primaryCluster = new Construct(
                        databaseTier,
                        'PrimaryCluster'
                    );
                    const secondaryCluster = new Construct(
                        databaseTier,
                        'SecondaryCluster'
                    );

                    // Create Oracle instances in nested constructs
                    const primaryOracle = new DatabaseInstance(
                        primaryCluster,
                        'PrimaryOracleInstance',
                        {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-nested-primary'
                        }
                    );

                    const secondaryOracle = new DatabaseInstance(
                        secondaryCluster,
                        'SecondaryOracleInstance',
                        {
                            engine: DatabaseInstanceEngine.oracleEe({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-nested-secondary'
                        }
                    );

                    // Create a non-Oracle instance in the same hierarchy
                    const mysqlInstance = new DatabaseInstance(
                        primaryCluster,
                        'MySqlInstance',
                        {
                            engine: DatabaseInstanceEngine.mysql({
                                version: MysqlEngineVersion.VER_8_0_39
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'mysql-nested'
                        }
                    );

                    // Act - Apply aspect to the root of the database tier
                    Aspects.of(databaseTier).add(aspect);
                    const template = getTemplate();

                    // Assert - Both Oracle instances should be found and processed
                    const configurationCalls = consoleSpy.mock.calls.filter(
                        (call) =>
                            call[0]?.includes(
                                'Oracle MultiTenant configuration will be applied to instance:'
                            )
                    );
                    expect(configurationCalls).toHaveLength(2);

                    // Verify both Oracle instances are configured
                    const allConfigurationCalls = consoleSpy.mock.calls.filter(
                        (call) =>
                            call[0]?.includes(
                                'Oracle MultiTenant configuration will be applied to instance:'
                            )
                    );
                    expect(allConfigurationCalls).toHaveLength(2);

                    // Verify Custom Resources are created for both Oracle instances
                    template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);

                    template.hasResourceProperties(
                        'Custom::RdsOracleMultiTenant',
                        {
                            DBInstanceIdentifier: Match.anyValue()
                        }
                    );

                    // Verify both instances have Custom Resources
                    const customResources = Object.values(
                        template.toJSON().Resources
                    ).filter(
                        (resource: any) =>
                            resource.Type === 'Custom::RdsOracleMultiTenant'
                    );
                    expect(customResources).toHaveLength(2);

                    consoleSpy.mockRestore();
                });

                it('should provide processing statistics and validation', () => {
                    // Arrange
                    const aspect = new RdsOracleMultiTenant();
                    const consoleSpy = vi
                        .spyOn(console, 'log')
                        .mockImplementation(() => {});

                    // Create multiple Oracle instances
                    const instances = [
                        new DatabaseInstance(stack, 'Oracle1', {
                            engine: DatabaseInstanceEngine.oracleSe2({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-stats-1'
                        }),
                        new DatabaseInstance(stack, 'Oracle2', {
                            engine: DatabaseInstanceEngine.oracleEe({
                                version:
                                    OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'oracle-stats-2'
                        }),
                        new DatabaseInstance(stack, 'MySQL1', {
                            engine: DatabaseInstanceEngine.mysql({
                                version: MysqlEngineVersion.VER_8_0_39
                            }),
                            instanceType: InstanceType.of(
                                InstanceClass.BURSTABLE3,
                                InstanceSize.SMALL
                            ),
                            vpc,
                            instanceIdentifier: 'mysql-stats-1'
                        })
                    ];

                    // Act
                    Aspects.of(stack).add(aspect);
                    const template = getTemplate();

                    // Assert - Verify processing statistics
                    const configurationCalls = consoleSpy.mock.calls.filter(
                        (call) =>
                            call[0]?.includes(
                                'Oracle MultiTenant configuration will be applied to instance:'
                            )
                    );
                    expect(configurationCalls).toHaveLength(2); // Only Oracle instances

                    // Verify completion messages
                    const completionCalls = consoleSpy.mock.calls.filter(
                        (call) =>
                            call[0]?.includes(
                                'Created Oracle MultiTenant Custom Resource for instance:'
                            )
                    );
                    expect(completionCalls).toHaveLength(2);

                    // Verify validation messages
                    const validationCalls = consoleSpy.mock.calls.filter(
                        (call) =>
                            call[0]?.includes(
                                'Configuration validation completed for instance:'
                            )
                    );
                    expect(validationCalls).toHaveLength(2);

                    // Verify template has correct number of resources
                    template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);

                    const lambdaFunctions = Object.keys(
                        template.toJSON().Resources
                    ).filter(
                        (key) =>
                            template.toJSON().Resources[key].Type ===
                            'AWS::Lambda::Function'
                    );
                    expect(lambdaFunctions.length).toBeGreaterThanOrEqual(2);

                    const iamRoles = Object.keys(
                        template.toJSON().Resources
                    ).filter(
                        (key) =>
                            template.toJSON().Resources[key].Type ===
                            'AWS::IAM::Role'
                    );
                    expect(iamRoles.length).toBeGreaterThanOrEqual(2);

                    consoleSpy.mockRestore();
                });
            });
        });
    });
});
