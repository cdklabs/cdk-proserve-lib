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
import { describe, beforeEach, it, expect } from 'vitest';
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
            const aspect = new RdsOracleMultiTenant();
            expect(aspect).toBeDefined();
            expect(typeof aspect.visit).toBe('function');
            expect(aspect.visit.length).toBe(1);
        });

        it('should have a visit method that accepts IConstruct parameter', () => {
            const aspect = new RdsOracleMultiTenant();
            const testConstruct = new Construct(stack, 'TestConstruct');
            expect(() => aspect.visit(testConstruct)).not.toThrow();
        });

        it('should be applicable as an Aspect using Aspects.of().add()', () => {
            const aspect = new RdsOracleMultiTenant();
            expect(() => Aspects.of(stack).add(aspect)).not.toThrow();
        });
    });

    describe('Oracle Database Detection', () => {
        it('should identify Oracle SE2 database instances', () => {
            const aspect = new RdsOracleMultiTenant();
            new DatabaseInstance(stack, 'OracleInstance', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                DBInstanceIdentifier: Match.anyValue()
            });
        });

        it('should identify Oracle EE database instances', () => {
            const aspect = new RdsOracleMultiTenant();
            new DatabaseInstance(stack, 'OracleEEInstance', {
                engine: DatabaseInstanceEngine.oracleEe({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                DBInstanceIdentifier: Match.anyValue()
            });
        });

        it('should identify different Oracle engine types correctly', () => {
            const aspect = new RdsOracleMultiTenant();

            // Test with mock Oracle engine types
            const oracleInstanceSE = new DatabaseInstance(
                stack,
                'OracleInstanceSE',
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

            // Mock different Oracle engine types
            const mockEngineOracle = { engineType: 'oracle-se' };
            Object.defineProperty(oracleInstanceSE, 'engine', {
                get: () => mockEngineOracle,
                configurable: true
            });

            aspect.visit(oracleInstanceSE);

            // Test with uppercase Oracle engine type
            const oracleInstanceUppercase = new DatabaseInstance(
                stack,
                'OracleInstanceUppercase',
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

            const mockEngineOracleUppercase = { engineType: 'ORACLE-EE' };
            Object.defineProperty(oracleInstanceUppercase, 'engine', {
                get: () => mockEngineOracleUppercase,
                configurable: true
            });

            aspect.visit(oracleInstanceUppercase);

            const template = getTemplate();
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);
        });

        it('should skip non-Oracle database instances', () => {
            const aspect = new RdsOracleMultiTenant();
            new DatabaseInstance(stack, 'MySqlInstance', {
                engine: DatabaseInstanceEngine.mysql({
                    version: MysqlEngineVersion.VER_8_0_39
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            template.resourceCountIs('Custom::RdsOracleMultiTenant', 0);
        });

        it('should handle multiple Oracle instances in the same stack', () => {
            const aspect = new RdsOracleMultiTenant();
            new DatabaseInstance(stack, 'OracleInstance1', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            new DatabaseInstance(stack, 'OracleInstance2', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);
        });

        it('should prevent duplicate processing of the same Oracle instance', () => {
            const aspect = new RdsOracleMultiTenant();
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

            // Apply the aspect twice
            Aspects.of(stack).add(aspect);
            Aspects.of(oracleInstance).add(aspect);

            const template = getTemplate();
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
        });

        it('should track processed instances correctly', () => {
            const aspect = new RdsOracleMultiTenant();
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
                    instanceIdentifier: 'oracle-instance-1'
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
                    vpc,
                    instanceIdentifier: 'oracle-instance-2'
                }
            );

            // Visit instances individually to test tracking
            aspect.visit(oracleInstance1);
            aspect.visit(oracleInstance2);

            // Visit the same instances again to test duplicate prevention
            aspect.visit(oracleInstance1);
            aspect.visit(oracleInstance2);

            const template = getTemplate();
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);
        });

        it('should add instances to processed set when applying configuration', () => {
            const aspect = new RdsOracleMultiTenant();
            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstanceTracking',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc,
                    instanceIdentifier: 'oracle-tracking-test'
                }
            );

            // Visit the instance to trigger processing
            aspect.visit(oracleInstance);

            // Visit again to verify it's now in the processed set
            aspect.visit(oracleInstance);

            const template = getTemplate();
            // Should only create one Custom Resource despite two visits
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
        });

        it('should explicitly test processedInstances.add functionality', () => {
            const aspect = new RdsOracleMultiTenant();

            // Create multiple instances with explicit identifiers
            const oracleInstance1 = new DatabaseInstance(
                stack,
                'OracleInstanceAdd1',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc,
                    instanceIdentifier: 'explicit-add-test-1'
                }
            );

            const oracleInstance2 = new DatabaseInstance(
                stack,
                'OracleInstanceAdd2',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc,
                    instanceIdentifier: 'explicit-add-test-2'
                }
            );

            // Process first instance - should add to processed set
            aspect.visit(oracleInstance1);

            // Process second instance - should add to processed set
            aspect.visit(oracleInstance2);

            // Process first instance again - should be skipped (already in processed set)
            aspect.visit(oracleInstance1);

            const template = getTemplate();
            // Should create exactly 2 Custom Resources (one for each unique instance)
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);
        });
    });

    describe('Configuration Property Application', () => {
        it('should apply encryption settings to Lambda functions', () => {
            const kmsKey = new Key(stack, 'TestKey', {
                description: 'Test KMS key for Oracle MultiTenant'
            });

            const aspect = new RdsOracleMultiTenant({
                encryption: kmsKey
            });

            new DatabaseInstance(stack, 'OracleInstance', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            template.hasResourceProperties('AWS::Lambda::Function', {
                KmsKeyArn: Match.anyValue()
            });
        });

        it('should apply Lambda configuration settings consistently', () => {
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

            new DatabaseInstance(stack, 'OracleInstance', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            template.hasResourceProperties('AWS::Lambda::Function', {
                VpcConfig: {
                    SecurityGroupIds: Match.anyValue(),
                    SubnetIds: Match.anyValue()
                },
                ReservedConcurrentExecutions: 10
            });

            template.hasResourceProperties('AWS::Logs::LogGroup', {
                RetentionInDays: 90
            });
        });

        it('should apply configuration consistently across multiple Oracle instances', () => {
            const kmsKey = new Key(stack, 'TestKey', {
                description: 'Test KMS key for Oracle MultiTenant'
            });

            const aspect = new RdsOracleMultiTenant({
                encryption: kmsKey,
                lambdaConfiguration: {
                    logGroupRetention: RetentionDays.ONE_WEEK
                }
            });

            new DatabaseInstance(stack, 'OracleInstance1', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            new DatabaseInstance(stack, 'OracleInstance2', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);
        });
    });

    describe('Error Handling and Edge Cases', () => {
        it('should handle database instances with missing engine gracefully', () => {
            const aspect = new RdsOracleMultiTenant();
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

            aspect.visit(oracleInstance);
            const template = getTemplate();

            template.resourceCountIs('Custom::RdsOracleMultiTenant', 0);
        });

        it('should handle database instances with missing engine type gracefully', () => {
            const aspect = new RdsOracleMultiTenant();
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

            aspect.visit(oracleInstance);
            const template = getTemplate();

            template.resourceCountIs('Custom::RdsOracleMultiTenant', 0);
        });

        it('should handle database instances with missing instance identifier gracefully', () => {
            const aspect = new RdsOracleMultiTenant();
            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstanceNoId',
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

            // Mock the instanceIdentifier property to return null
            Object.defineProperty(oracleInstance, 'instanceIdentifier', {
                get: () => null,
                configurable: true
            });

            aspect.visit(oracleInstance);
            const template = getTemplate();

            template.resourceCountIs('Custom::RdsOracleMultiTenant', 0);
        });

        it('should handle database instances with empty instance identifier gracefully', () => {
            const aspect = new RdsOracleMultiTenant();
            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstanceEmptyId',
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

            // Mock the instanceIdentifier property to return empty string
            Object.defineProperty(oracleInstance, 'instanceIdentifier', {
                get: () => '',
                configurable: true
            });

            aspect.visit(oracleInstance);
            const template = getTemplate();

            template.resourceCountIs('Custom::RdsOracleMultiTenant', 0);
        });

        it('should handle database instances with unresolved token identifier gracefully', () => {
            const aspect = new RdsOracleMultiTenant();
            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstanceTokenId',
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

            // Mock the instanceIdentifier property to return a token (unresolved)
            // This simulates when the identifier is a CDK token that hasn't been resolved yet
            Object.defineProperty(oracleInstance, 'instanceIdentifier', {
                get: () => '${Token[TOKEN.123]}',
                configurable: true
            });

            aspect.visit(oracleInstance);
            const template = getTemplate();

            // Now we accept tokens, so a Custom Resource should be created
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
        });

        it('should handle exceptions during duplicate check gracefully', () => {
            const aspect = new RdsOracleMultiTenant();
            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstanceDuplicateCheckError',
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

            // First visit to add to processed instances
            aspect.visit(oracleInstance);

            // Mock the instanceIdentifier property to throw an error on second access
            let callCount = 0;
            const originalIdentifier = oracleInstance.instanceIdentifier;
            Object.defineProperty(oracleInstance, 'instanceIdentifier', {
                get: () => {
                    callCount++;
                    if (callCount > 3) {
                        // Allow first few calls to succeed, then throw
                        throw new Error(
                            'Instance identifier access error during duplicate check'
                        );
                    }
                    return originalIdentifier;
                },
                configurable: true
            });

            // Second visit should handle the error gracefully
            aspect.visit(oracleInstance);
            const template = getTemplate();

            // Should still have the original Custom Resource
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
        });

        it('should handle exceptions during processed instances check', () => {
            const aspect = new RdsOracleMultiTenant();
            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstanceProcessedError',
                {
                    engine: DatabaseInstanceEngine.oracleSe2({
                        version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                    }),
                    instanceType: InstanceType.of(
                        InstanceClass.BURSTABLE3,
                        InstanceSize.SMALL
                    ),
                    vpc,
                    instanceIdentifier: 'test-processed-error'
                }
            );

            // Mock the processedInstances.has method to throw an error
            const aspectWithAccess = aspect as any;
            const originalHas = aspectWithAccess.processedInstances.has;
            aspectWithAccess.processedInstances.has = () => {
                throw new Error('Set access error');
            };

            try {
                // Visit should handle the error gracefully and assume not processed
                aspect.visit(oracleInstance);
                const template = getTemplate();

                // Should create Custom Resource since error assumes not processed
                template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
            } finally {
                // Restore the original method
                aspectWithAccess.processedInstances.has = originalHas;
            }
        });

        it('should handle null instance identifier in isAlreadyProcessed check', () => {
            const aspect = new RdsOracleMultiTenant();
            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstanceNullIdProcessed',
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

            // Mock the instanceIdentifier to return null during isAlreadyProcessed check
            Object.defineProperty(oracleInstance, 'instanceIdentifier', {
                get: () => null,
                configurable: true
            });

            // Visit should handle null identifier gracefully
            aspect.visit(oracleInstance);
            const template = getTemplate();

            // Should not create Custom Resource due to null identifier
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 0);
        });

        it('should handle non-DatabaseInstance constructs gracefully', () => {
            const aspect = new RdsOracleMultiTenant();
            const plainConstruct = new Construct(stack, 'PlainConstruct');
            const kmsKey = new Key(stack, 'TestKey');
            const securityGroup = new SecurityGroup(stack, 'TestSG', { vpc });

            aspect.visit(plainConstruct);
            aspect.visit(kmsKey);
            aspect.visit(securityGroup);

            expect(true).toBe(true); // Test passes if no exceptions are thrown
        });
    });

    describe('Resource Creation and Provider Reuse', () => {
        it('should create Custom Resource for Oracle instance', () => {
            const aspect = new RdsOracleMultiTenant();
            new DatabaseInstance(stack, 'OracleInstance', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                DBInstanceIdentifier: Match.anyValue()
            });

            template.hasResourceProperties('AWS::Lambda::Function', {
                Handler: 'index.handler',
                Runtime: 'nodejs22.x'
            });

            template.resourceCountIs('AWS::Lambda::Function', 5);
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
        });

        it('should reuse provider for multiple Oracle instances in same stack', () => {
            const aspect = new RdsOracleMultiTenant();
            new DatabaseInstance(stack, 'OracleInstance1', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            new DatabaseInstance(stack, 'OracleInstance2', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);
            template.resourceCountIs('AWS::Lambda::Function', 5); // Shared functions

            // Verify both Custom Resources use the same service token
            const customResources = template.findResources(
                'Custom::RdsOracleMultiTenant'
            );
            const serviceTokens = Object.values(customResources).map(
                (resource: any) => resource.Properties.ServiceToken
            );
            expect(serviceTokens).toHaveLength(2);
            expect(serviceTokens[0]).toEqual(serviceTokens[1]);
        });

        it('should create Lambda functions with correct configuration', () => {
            const aspect = new RdsOracleMultiTenant();
            new DatabaseInstance(stack, 'OracleInstance', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            template.hasResourceProperties('AWS::Lambda::Function', {
                Runtime: 'nodejs22.x',
                Handler: 'index.handler',
                Timeout: 300
            });

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
        });

        it('should generate template with encryption when KMS key provided', () => {
            const kmsKey = new Key(stack, 'TestKey', {
                description: 'Test KMS key for Oracle MultiTenant'
            });

            const aspect = new RdsOracleMultiTenant({
                encryption: kmsKey
            });

            new DatabaseInstance(stack, 'OracleInstance', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            template.hasResourceProperties('AWS::Lambda::Function', {
                KmsKeyArn: Match.anyValue()
            });

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
        });
    });

    describe('Method Coverage Tests', () => {
        it('should test all private methods through public interface', () => {
            const aspect = new RdsOracleMultiTenant();

            // Test validateDatabaseInstance through visit
            const validOracleInstance = new DatabaseInstance(
                stack,
                'ValidOracleInstance',
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

            // Test isOracleDatabase with different engines
            const oracleEeInstance = new DatabaseInstance(
                stack,
                'OracleEeInstance',
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

            new DatabaseInstance(stack, 'MySqlInstance', {
                engine: DatabaseInstanceEngine.mysql({
                    version: MysqlEngineVersion.VER_8_0_39
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            // Test isAlreadyProcessed by visiting same instance multiple times
            aspect.visit(validOracleInstance);
            aspect.visit(validOracleInstance); // Should be skipped
            aspect.visit(oracleEeInstance);

            const template = getTemplate();

            // Should create Custom Resources only for Oracle instances
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);
        });

        it('should test validation edge cases thoroughly', () => {
            const aspect = new RdsOracleMultiTenant();

            // Test instance with very long identifier (should be rejected)
            const oracleInstanceLongId = new DatabaseInstance(
                stack,
                'OracleInstanceLongId',
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

            // Mock the instanceIdentifier to return a very long string (>63 chars)
            const longId = 'a'.repeat(64);
            Object.defineProperty(oracleInstanceLongId, 'instanceIdentifier', {
                get: () => longId,
                configurable: true
            });

            aspect.visit(oracleInstanceLongId);

            // Test instance with whitespace-only identifier
            const oracleInstanceWhitespaceId = new DatabaseInstance(
                stack,
                'OracleInstanceWhitespaceId',
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

            Object.defineProperty(
                oracleInstanceWhitespaceId,
                'instanceIdentifier',
                {
                    get: () => '   ',
                    configurable: true
                }
            );

            aspect.visit(oracleInstanceWhitespaceId);

            const template = getTemplate();

            // Should not create Custom Resources for invalid instances
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 0);
        });

        it('should test createLambdaConfiguration with different configurations', () => {
            const kmsKey = new Key(stack, 'TestKey');
            const securityGroup = new SecurityGroup(stack, 'TestSG', { vpc });

            // Test with both encryption and Lambda configuration
            const aspect = new RdsOracleMultiTenant({
                encryption: kmsKey,
                lambdaConfiguration: {
                    vpc: vpc,
                    subnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
                    securityGroups: [securityGroup],
                    logGroupRetention: RetentionDays.ONE_WEEK
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

            aspect.visit(oracleInstance);
            const template = getTemplate();

            // Should create Custom Resource with all configurations applied
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
            template.hasResourceProperties('AWS::Lambda::Function', {
                KmsKeyArn: Match.anyValue(),
                VpcConfig: Match.anyValue()
            });
        });

        it('should test extractInstanceIdentifier with explicit identifier', () => {
            const aspect = new RdsOracleMultiTenant();

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
                    vpc,
                    instanceIdentifier: 'test-oracle-instance'
                }
            );

            aspect.visit(oracleInstance);
            const template = getTemplate();

            template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                DBInstanceIdentifier: Match.anyValue()
            });
        });

        it('should test complete applyMultiTenantConfiguration flow', () => {
            const aspect = new RdsOracleMultiTenant();

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

            aspect.visit(oracleInstance);
            const template = getTemplate();

            // Verify complete infrastructure is created
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
            template.resourceCountIs('AWS::Lambda::Function', 5);
            template.resourceCountIs('AWS::IAM::Role', 6);
            template.resourceCountIs('AWS::IAM::Policy', 6);
            template.resourceCountIs('AWS::Logs::LogGroup', 2);
        });
    });

    describe('Integration Tests', () => {
        it('should handle mixed Oracle and non-Oracle instances correctly', () => {
            const aspect = new RdsOracleMultiTenant();

            new DatabaseInstance(stack, 'OracleInstance', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            new DatabaseInstance(stack, 'MySqlInstance', {
                engine: DatabaseInstanceEngine.mysql({
                    version: MysqlEngineVersion.VER_8_0_39
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            // Should only create Custom Resource for Oracle instance
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
        });

        it('should work when applied at different scopes', () => {
            const app = getApp();
            const testStack = new Stack(app, 'TestStack');
            const testVpc = new Vpc(testStack, 'TestVpc');

            const aspect = new RdsOracleMultiTenant();

            new DatabaseInstance(testStack, 'OracleInstance', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc: testVpc
            });

            // Test application at stack scope
            Aspects.of(testStack).add(aspect);

            const template = Template.fromStack(testStack);
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 1);
        });

        it('should handle complex configuration with multiple instances', () => {
            const kmsKey = new Key(stack, 'TestKey');
            const securityGroup = new SecurityGroup(stack, 'TestSG', { vpc });

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

            new DatabaseInstance(stack, 'OracleInstance1', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            new DatabaseInstance(stack, 'OracleInstance2', {
                engine: DatabaseInstanceEngine.oracleEe({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(stack).add(aspect);
            const template = getTemplate();

            // Verify configuration is applied consistently to both instances
            template.resourceCountIs('Custom::RdsOracleMultiTenant', 2);

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
        });

        it('should handle nested construct hierarchies', () => {
            const aspect = new RdsOracleMultiTenant();

            const parentConstruct = new Construct(stack, 'ParentConstruct');
            const childConstruct = new Construct(
                parentConstruct,
                'ChildConstruct'
            );

            new DatabaseInstance(childConstruct, 'NestedOracleInstance', {
                engine: DatabaseInstanceEngine.oracleSe2({
                    version: OracleEngineVersion.VER_19_0_0_0_2020_04_R1
                }),
                instanceType: InstanceType.of(
                    InstanceClass.BURSTABLE3,
                    InstanceSize.SMALL
                ),
                vpc
            });

            Aspects.of(parentConstruct).add(aspect);
            const template = getTemplate();

            template.hasResourceProperties('Custom::RdsOracleMultiTenant', {
                DBInstanceIdentifier: Match.anyValue()
            });
        });

        it('should handle errors during custom resource creation gracefully', () => {
            const aspect = new RdsOracleMultiTenant();

            const oracleInstance = new DatabaseInstance(
                stack,
                'OracleInstanceError',
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

            // Mock the Stack.of method to throw an error during provider creation
            const originalStackOf = Stack.of;
            Stack.of = () => {
                throw new Error('Stack access error');
            };

            try {
                expect(() => aspect.visit(oracleInstance)).toThrow(
                    'Stack access error'
                );
            } finally {
                // Restore the original method
                Stack.of = originalStackOf;
            }
        });
    });
});
