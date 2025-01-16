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
import { Key } from 'aws-cdk-lib/aws-kms';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { NagSuppressions } from 'cdk-nag';
import { SetLogRetention } from '../../../src/aspects/set-log-retention';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';

describeCdkTest(SetLogRetention, (_, getStack, getTemplate) => {
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

    it('should set retention on LogGroup', () => {
        // Arrange
        const key = new Key(stack, 'Key', { enableKeyRotation: true });
        new LogGroup(stack, 'LogGroup', { encryptionKey: key });

        // Act
        Aspects.of(stack).add(
            new SetLogRetention({ period: RetentionDays.ONE_WEEK })
        );

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::Logs::LogGroup', {
            RetentionInDays: 7
        });
    });

    it('should set retention on custom resource log retention', () => {
        // Arrange
        const func = new Function(stack, 'TestFunction', {
            runtime: Runtime.NODEJS_20_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = () => {};'),
            reservedConcurrentExecutions: 5
        });
        func.logGroup; // triggers custom resource to set log retention

        // Act
        Aspects.of(stack).add(
            new SetLogRetention({ period: RetentionDays.ONE_WEEK })
        );

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('Custom::LogRetention', {
            RetentionInDays: 7
        });
    });
});
