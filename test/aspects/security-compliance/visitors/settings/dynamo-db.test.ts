// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, Stack } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { beforeEach, it, describe } from 'vitest';
import { SecurityCompliance } from '../../../../../src/aspects/security-compliance';
import { describeCdkTest } from '../../../../../utilities/cdk-nag-test';

describeCdkTest(SecurityCompliance, (_, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();
    });

    describe('DynamoDb', () => {
        it('enables point-in-time recovery by default', () => {
            // Arrange
            new Table(stack, 'TestTable', {
                partitionKey: { name: 'id', type: AttributeType.STRING },
                billingMode: BillingMode.PAY_PER_REQUEST
            });

            // Act
            Aspects.of(stack).add(new SecurityCompliance());
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::DynamoDB::Table', {
                PointInTimeRecoverySpecification: {
                    PointInTimeRecoveryEnabled: true
                }
            });
        });
    });
});
