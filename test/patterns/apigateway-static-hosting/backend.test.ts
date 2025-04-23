// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { NagSuppressions } from 'cdk-nag';
import { PolicyProperties } from 'cloudform-types/types/iam/policy';
import { FunctionProperties } from 'cloudform-types/types/lambda/function';
import { describe, beforeEach, it } from 'vitest';
import { mockFolderAsset } from './fixtures';
import {
    commonStackSuppressions,
    createCommonNagProps,
    createPartialNameMatcher,
    createPatternUnderTest
} from './fixtures/common';
import {
    ApiGatewayStaticHosting,
    ApiGatewayStaticHostingProps
} from '../../../src/patterns/apigateway-static-hosting';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';
import { buildMockArn, mockAccount, mockRegion } from '../../fixtures/account';

describeCdkTest(ApiGatewayStaticHosting, (id, getStack, getTemplate) => {
    let stack: Stack;
    let commonNagProps: Partial<ApiGatewayStaticHostingProps>;

    beforeEach(() => {
        stack = getStack();
        commonNagProps = createCommonNagProps(stack);

        NagSuppressions.addStackSuppressions(stack, commonStackSuppressions);
    });

    /**
     * Store
     */
    const storePartialName = createPartialNameMatcher('store', id);
    const storeResources = [
        {
            'Fn::GetAtt': [storePartialName, 'Arn']
        },
        {
            'Fn::Join': [
                '',
                [
                    {
                        'Fn::GetAtt': [storePartialName, 'Arn']
                    },
                    '/*'
                ]
            ]
        }
    ];

    describe('Backend', () => {
        it('Creates the backend handler with the correct properties (default endpoint)', () => {
            // Arrange
            // No action

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: 'public'
                }
            });

            // Assert
            const template = getTemplate();

            const handlerProperties: Partial<
                | FunctionProperties
                | {
                      Environment: {
                          Variables: Record<string, string | object>;
                      };
                  }
            > = {
                Environment: {
                    Variables: {
                        CONFIGURATION: {
                            'Fn::Join': [
                                '',
                                [
                                    '{"bucketName":"',
                                    {
                                        Ref: storePartialName
                                    },
                                    '","staticFilePath":"public"}'
                                ]
                            ]
                        }
                    }
                },
                Handler: 'index.handler',
                MemorySize: 512,
                ReservedConcurrentExecutions: 5,
                Runtime: 'nodejs22.x',
                Timeout: 29
            };
            const handlerPolicy: Partial<PolicyProperties> = {
                PolicyDocument: Match.objectLike({
                    Statement: Match.arrayWith([
                        {
                            Action: [
                                's3:GetObject*',
                                's3:GetBucket*',
                                's3:List*'
                            ],
                            Effect: 'Allow',
                            Resource: storeResources
                        }
                    ])
                })
            };
            template.hasResourceProperties(
                'AWS::Lambda::Function',
                Match.objectLike(handlerProperties)
            );
            template.hasResourceProperties(
                'AWS::IAM::Policy',
                Match.objectLike(handlerPolicy)
            );
        });

        it('Creates the backend handler with the correct properties (custom domain)', () => {
            // Arrange
            const basePath = '/dev/site1';
            const domain = 'https://example.com';
            const certArn = buildMockArn(
                'aws',
                'acm',
                'certificate/test-cert',
                mockRegion,
                mockAccount
            );

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    options: {
                        certificate: Certificate.fromCertificateArn(
                            stack,
                            'Certificate',
                            certArn
                        ),
                        domainName: domain,
                        basePath: basePath
                    }
                }
            });

            // Assert
            const template = getTemplate();

            const handlerProperties: Partial<
                | FunctionProperties
                | {
                      Environment: {
                          Variables: Record<string, string | object>;
                      };
                  }
            > = {
                Environment: {
                    Variables: {
                        CONFIGURATION: {
                            'Fn::Join': [
                                '',
                                [
                                    '{"bucketName":"',
                                    {
                                        Ref: storePartialName
                                    },
                                    '","staticFilePath":"dev/site1"}'
                                ]
                            ]
                        }
                    }
                }
            };

            template.hasResourceProperties(
                'AWS::Lambda::Function',
                Match.objectLike(handlerProperties)
            );
        });
    });
});
