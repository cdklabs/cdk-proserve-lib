// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, Stack } from 'aws-cdk-lib';
import { MethodLoggingLevel, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { beforeEach, it, describe } from 'vitest';
import { SecurityCompliance } from '../../../../../src/aspects/security-compliance';
import { describeCdkTest } from '../../../../../utilities/cdk-nag-test';
import { Match } from 'aws-cdk-lib/assertions';

describeCdkTest(SecurityCompliance, (_, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();
    });

    describe('ApiGateway', () => {
        it('enables method logging with default ERROR level', () => {
            // Arrange
            const api = new RestApi(stack, 'TestApi');
            api.root.addMethod('GET'); // Add a method to ensure stage is created

            // Act
            Aspects.of(stack).add(new SecurityCompliance());
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::ApiGateway::Stage', {
                MethodSettings: [
                    {
                        LoggingLevel: 'ERROR',
                        HttpMethod: '*',
                        ResourcePath: '/*',
                        DataTraceEnabled: false
                    }
                ]
            });
        });

        it('correctly handles non-default value for Logging Level', () => {
            // Arrange
            const api = new RestApi(stack, 'TestApi');
            api.root.addMethod('GET'); // Add a method to ensure stage is created

            // Act
            Aspects.of(stack).add(
                new SecurityCompliance({
                    settings: {
                        apiGateway: {
                            stageMethodLogging: {
                                loggingLevel: MethodLoggingLevel.INFO
                            }
                        }
                    }
                })
            );
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::ApiGateway::Stage', {
                MethodSettings: [
                    {
                        LoggingLevel: 'INFO',
                        HttpMethod: '*',
                        ResourcePath: '/*',
                        DataTraceEnabled: false
                    }
                ]
            });
        });

        it('takes no action if stageMethodLogging is disabled', () => {
            // Arrange
            const api = new RestApi(stack, 'TestApi');
            api.root.addMethod('GET'); // Add a method to ensure stage is created

            // Act
            Aspects.of(stack).add(
                new SecurityCompliance({
                    settings: {
                        apiGateway: {
                            stageMethodLogging: {
                                disabled: true
                            }
                        }
                    }
                })
            );
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::ApiGateway::Stage', {
                MethodSettings: Match.absent()
            });
        });
    });
});
