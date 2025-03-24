// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, Stack } from 'aws-cdk-lib';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { beforeEach, describe, it } from 'vitest';
import { SecurityCompliance } from '../../../../src/aspects/security-compliance';
import { SecureFunction } from '../../../../src/constructs/secure-function';
import { describeCdkTest } from '../../../../utilities/cdk-nag-test';

describeCdkTest(SecurityCompliance, (_, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();
    });

    describe('Lambda', () => {
        it('does not apply reserved concurrency if disabled', () => {
            // Arrange
            new SecureFunction(stack, 'TestFunction', {
                runtime: Runtime.NODEJS_22_X,
                handler: 'index.handler',
                code: Code.fromInline('exports.handler = () => {};')
            });

            Aspects.of(stack).add(
                new SecurityCompliance({
                    settings: {
                        lambda: {
                            reservedConcurrentExecutions: {
                                disabled: true
                            }
                        }
                    }
                })
            );

            // Act
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::Lambda::Function', {
                ReservedConcurrentExecutions: 5 // default on SecureFunction
            });
        });

        it('applies default reserved concurrent executions', () => {
            // Arrange
            new SecureFunction(stack, 'TestFunction', {
                runtime: Runtime.NODEJS_22_X,
                handler: 'index.handler',
                code: Code.fromInline('exports.handler = () => {};'),
                reservedConcurrentExecutions: undefined
            });
            Aspects.of(stack).add(new SecurityCompliance());

            // Act
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::Lambda::Function', {
                ReservedConcurrentExecutions: 1
            });
        });

        it('sets a user defined reserved concurrent execution', () => {
            // Arrange
            new SecureFunction(stack, 'TestFunction', {
                runtime: Runtime.NODEJS_22_X,
                handler: 'index.handler',
                code: Code.fromInline('exports.handler = () => {};'),
                reservedConcurrentExecutions: undefined
            });
            Aspects.of(stack).add(
                new SecurityCompliance({
                    settings: {
                        lambda: {
                            reservedConcurrentExecutions: {
                                concurrentExecutionCount: 10
                            }
                        }
                    }
                })
            );

            // Act
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::Lambda::Function', {
                ReservedConcurrentExecutions: 10
            });
        });
    });
});
