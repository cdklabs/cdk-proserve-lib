// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, Duration, Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import {
    DefinitionBody,
    StateMachine,
    Wait,
    WaitTime
} from 'aws-cdk-lib/aws-stepfunctions';
import { beforeEach, describe, it } from 'vitest';
import { SecurityCompliance } from '../../../../src/aspects/security-compliance';
import { describeCdkTest } from '../../../../utilities/cdk-nag-test';

describeCdkTest(SecurityCompliance, (_, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();
    });

    describe('Step Functions', () => {
        it('enables X-Ray tracing by default', () => {
            // Arrange
            new StateMachine(stack, 'TestStateMachine', {
                definitionBody: DefinitionBody.fromChainable(
                    new Wait(stack, 'WaitState', {
                        time: WaitTime.duration(Duration.seconds(1))
                    })
                )
            });

            // Act
            Aspects.of(stack).add(new SecurityCompliance());
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::StepFunctions::StateMachine', {
                TracingConfiguration: {
                    Enabled: true
                }
            });
        });

        it('should not modify if disabled', () => {
            // Arrange
            new StateMachine(stack, 'TestStateMachine', {
                definitionBody: DefinitionBody.fromChainable(
                    new Wait(stack, 'WaitState', {
                        time: WaitTime.duration(Duration.seconds(1))
                    })
                )
            });

            // Act
            Aspects.of(stack).add(
                new SecurityCompliance({
                    settings: {
                        stepFunctions: { xRayTracing: { disabled: true } }
                    }
                })
            );
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::StepFunctions::StateMachine', {
                TracingConfiguration: Match.absent()
            });
        });
    });
});
