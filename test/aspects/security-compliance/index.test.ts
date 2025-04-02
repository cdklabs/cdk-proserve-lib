// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { CfnPolicy } from 'aws-cdk-lib/aws-iam';
import { CfnLogGroup } from 'aws-cdk-lib/aws-logs';
import { CfnStateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { describe, beforeEach, it, expect } from 'vitest';
import { SecurityCompliance } from '../../../src/aspects/security-compliance';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

describeCdkTest(SecurityCompliance, (_, getStack, __) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();
    });

    describe('visit', () => {
        it('should apply stack suppressions when suppressions are provided', () => {
            // Arrange
            const aspect = new SecurityCompliance({
                suppressions: {
                    cdkCommonGrants: 'test reason for common grants',
                    iamNoInlinePolicies: 'test reason for no inline policies',
                    lambdaNoDlq: 'test reason for no DLQ',
                    lambdaNotInVpc: 'test reason for not in VPC',
                    s3BucketReplication: 'test reason for no replication'
                }
            });

            // Act
            aspect.visit(stack);

            // Assert
            const metadata = stack.templateOptions.metadata?.cdk_nag;
            expect(metadata).toBeDefined();
            expect(metadata?.rules_to_suppress).toHaveLength(5);
            expect(metadata?.rules_to_suppress).toContainEqual({
                id: 'AwsSolutions-IAM5',
                reason: 'test reason for common grants',
                appliesTo: [
                    'Action::kms:ReEncrypt*',
                    'Action::kms:GenerateDataKey*',
                    'Action::s3:GetBucket*',
                    'Action::s3:GetObject*',
                    'Action::s3:List*',
                    'Action::s3:DeleteObject*',
                    'Action::s3:Abort*'
                ]
            });
        });

        it('should apply CDK generated suppressions to framework Lambda policies', () => {
            // Arrange
            const aspect = new SecurityCompliance({
                suppressions: {
                    cdkGeneratedResources:
                        'test reason for CDK generated lambdas'
                }
            });

            const policy = new CfnPolicy(stack, 'TestPolicy', {
                policyDocument: {},
                policyName: 'test-policy'
            });

            // Simulate framework lambda path
            Object.defineProperty(policy.node, 'path', {
                value: 'Stack/framework-something/Policy'
            });

            // Act
            aspect.visit(policy);

            // Assert
            const metadata = policy.getMetadata('cdk_nag');
            expect(metadata).toBeDefined();
            expect(metadata.rules_to_suppress).toHaveLength(1);
            expect(metadata.rules_to_suppress[0]).toEqual({
                id: 'AwsSolutions-IAM5',
                reason: 'test reason for CDK generated lambdas'
            });
        });

        it('should merge with existing stack suppressions', () => {
            // Arrange
            const aspect = new SecurityCompliance({
                suppressions: {
                    cdkCommonGrants: 'test reason'
                }
            });

            // Add existing suppression
            stack.addMetadata('cdk_nag', {
                rules_to_suppress: [
                    {
                        id: 'ExistingRule',
                        reason: 'existing reason'
                    }
                ]
            });

            // Act
            aspect.visit(stack);

            // Assert
            const metadata = stack.templateOptions.metadata?.cdk_nag;
            expect(metadata).toBeDefined();
            expect(metadata?.rules_to_suppress).toHaveLength(2);
            expect(metadata?.rules_to_suppress).toContainEqual({
                id: 'ExistingRule',
                reason: 'existing reason'
            });
        });

        it('should apply suppressions to waiter state machine policies', () => {
            // Arrange
            const aspect = new SecurityCompliance({
                suppressions: {
                    cdkGeneratedResources: 'test reason'
                }
            });

            const policy = new CfnPolicy(stack, 'TestPolicy', {
                policyDocument: {},
                policyName: 'test-policy'
            });

            // Simulate waiter state machine path
            Object.defineProperty(policy.node, 'path', {
                value: 'Stack/waiter-state-machine/Policy'
            });

            // Act
            aspect.visit(policy);

            // Assert
            const metadata = policy.getMetadata('cdk_nag');
            expect(metadata).toBeDefined();
            expect(metadata.rules_to_suppress).toHaveLength(1);
        });

        it('should apply suppressions to cdk generated log groups', () => {
            // Arrange
            const aspect = new SecurityCompliance({
                suppressions: {
                    cdkGeneratedResources: 'test reason'
                }
            });

            const logGroup = new CfnLogGroup(stack, 'TestLogGroup', {});

            // Simulate waiter log group path
            Object.defineProperty(logGroup.node, 'path', {
                value: 'Stack/waiter-state-machine/LogGroup'
            });

            // Act
            aspect.visit(logGroup);

            // Assert
            const metadata = logGroup.getMetadata('cdk_nag');
            expect(metadata).toBeDefined();
            expect(metadata.rules_to_suppress).toHaveLength(1);
        });

        it('should apply suppressions to cdk generated state machines', () => {
            // Arrange
            const aspect = new SecurityCompliance({
                suppressions: {
                    cdkGeneratedResources: 'test reason'
                }
            });

            const stateMachine = new CfnStateMachine(
                stack,
                'TestStateMachine',
                {
                    roleArn: ''
                }
            );

            // Simulate waiter log group path
            Object.defineProperty(stateMachine.node, 'path', {
                value: 'Stack/waiter-state-machine/LogGroup'
            });

            // Act
            aspect.visit(stateMachine);

            // Assert
            const metadata = stateMachine.getMetadata('cdk_nag');
            expect(metadata).toBeDefined();
            expect(metadata.rules_to_suppress).toHaveLength(1);
        });

        it('should apply suppressions to log retention policies', () => {
            // Arrange
            const aspect = new SecurityCompliance({
                suppressions: {
                    cdkGeneratedResources: 'test reason'
                }
            });

            const policy = new CfnPolicy(stack, 'TestPolicy', {
                policyDocument: {},
                policyName: 'test-policy'
            });

            // Simulate log retention path
            Object.defineProperty(policy.node, 'path', {
                value: 'Stack/LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8a/Policy'
            });

            // Act
            aspect.visit(policy);

            // Assert
            const metadata = policy.getMetadata('cdk_nag');
            expect(metadata).toBeDefined();
            expect(metadata.rules_to_suppress).toHaveLength(1);
        });
    });
});
