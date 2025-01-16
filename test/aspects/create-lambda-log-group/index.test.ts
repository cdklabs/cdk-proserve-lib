/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

import { Aspects, Stack } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NagSuppressions } from 'cdk-nag';
import { CreateLambdaLogGroup } from '../../../src/aspects/create-lambda-log-group';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';

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
            runtime: Runtime.NODEJS_20_X,
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
