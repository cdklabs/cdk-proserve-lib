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
import { SetLogRetention } from '../../../src/aspects/set-log-retention';
import {
    validateNoCdkNagFindings,
    getTemplateWithCdkNag
} from '../../../utilities/cdk-nag-jest';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NagSuppressions } from 'cdk-nag';

const aspectName = 'SetLogRetention';
const constructName = 'TestFunction';

describe(aspectName, () => {
    let stack: Stack;

    beforeEach(() => {
        stack = new Stack();

        NagSuppressions.addStackSuppressions(stack, [
            {
                id: 'AwsSolutions-IAM4',
                reason: 'Not testing IAM in this test scenario.'
            }
        ]);
    });

    afterEach(() => {
        validateNoCdkNagFindings(stack, constructName);
    });

    it('should set retention on LogGroup', () => {
        // Arrange
        new LogGroup(stack, 'LogGroup');

        // Act
        Aspects.of(stack).add(
            new SetLogRetention({ period: RetentionDays.ONE_WEEK })
        );

        // Assert
        const template = getTemplateWithCdkNag(stack);
        template.hasResourceProperties('AWS::Logs::LogGroup', {
            RetentionInDays: 7
        });
    });

    it('should set retention on custom resource log retention', () => {
        // Arrange
        const func = new Function(stack, constructName, {
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
        const template = getTemplateWithCdkNag(stack);

        template.hasResourceProperties('Custom::LogRetention', {
            RetentionInDays: 7
        });
    });
});
