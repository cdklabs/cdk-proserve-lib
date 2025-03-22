// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, Stack } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NagSuppressions } from 'cdk-nag';
import { CreateLambdaLogGroup } from '../../../src/aspects/create-lambda-log-group';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

describeCdkTest(CreateLambdaLogGroup, (_, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();

        NagSuppressions.addStackSuppressions(stack, [
            {
                id: 'AwsSolutions-IAM4',
                reason: 'Not testing IAM in this test scenario.'
            },
            {
                id: 'AwsSolutions-IAM5',
                reason: 'Permissions are tightly scoped to allow setting log retention. This is an underlying CDK permission grant.'
            }
        ]);
    });

    it('should create log group when visiting a Lambda function', () => {
        // Arrange
        new Function(stack, 'TestFunction', {
            runtime: Runtime.NODEJS_22_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = () => {};'),
            reservedConcurrentExecutions: 5
        });

        // Act
        Aspects.of(stack).add(new CreateLambdaLogGroup());

        // Assert
        const template = getTemplate();
        template.hasResource('Custom::LogRetention', {});
    });
});
