// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { describe, beforeEach, it, expect } from 'vitest';
import { SecurityCompliance } from '../../../../../src/aspects/security-compliance';
import { describeCdkTest } from '../../../../../utilities/cdk-nag-test';

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
    });
});
