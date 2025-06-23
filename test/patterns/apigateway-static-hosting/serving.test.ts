// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import {
    EndpointConfiguration,
    EndpointType
} from 'aws-cdk-lib/aws-apigateway';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { InterfaceVpcEndpoint } from 'aws-cdk-lib/aws-ec2';
import { NagSuppressions } from 'cdk-nag';
import { BasePathMappingProperties } from 'cloudform-types/types/apiGateway/basePathMapping';
import { DomainNameProperties } from 'cloudform-types/types/apiGateway/domainName';
import {
    Integration,
    MethodProperties
} from 'cloudform-types/types/apiGateway/method';
import { ResourceProperties } from 'cloudform-types/types/apiGateway/resource';
import { RestApiProperties } from 'cloudform-types/types/apiGateway/restApi';
import { StageProperties } from 'cloudform-types/types/apiGateway/stage';
import { describe, beforeEach, it, expect } from 'vitest';
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
     * Handler
     */
    const handlerPartialName = createPartialNameMatcher('handler', id);

    /**
     * API
     */
    const apiPartialName = createPartialNameMatcher('api', id);

    describe('Serving', () => {
        it('Creates an API with a proxy endpoint for ALL routes/methods', () => {
            // Arrange
            const basePath = 'public';

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: basePath
                }
            });

            // Assert
            const template = getTemplate();

            const apiProperties: Partial<RestApiProperties> = {
                BinaryMediaTypes: ['*/*'],
                DisableExecuteApiEndpoint: false
            };
            const deploymentProperties: Partial<
                | StageProperties
                | { DeploymentId: string | object; RestApiId: string | object }
            > = {
                DeploymentId: {
                    Ref: createPartialNameMatcher('api', id, 'Deployment')
                },
                RestApiId: { Ref: apiPartialName },
                StageName: basePath
            };
            const corsMethodProperties: Partial<
                | MethodProperties
                | {
                      MethodResponses: {
                          ResponseParameters: Record<string, unknown>;
                          StatusCode: string;
                      }[];
                      RestApiId: string | object;
                  }
            > = {
                HttpMethod: 'OPTIONS',
                MethodResponses: [
                    {
                        ResponseParameters: {
                            'method.response.header.Access-Control-Allow-Headers': true,
                            'method.response.header.Access-Control-Allow-Origin': true,
                            'method.response.header.Access-Control-Allow-Methods': true
                        },
                        StatusCode: '204'
                    }
                ],
                RestApiId: { Ref: apiPartialName }
            };
            const proxyResourceProperties: Partial<
                | ResourceProperties
                | { ParentId: string | object; RestApiId: string | object }
            > = {
                ParentId: {
                    'Fn::GetAtt': [apiPartialName, 'RootResourceId']
                },
                PathPart: '{proxy+}',
                RestApiId: { Ref: apiPartialName }
            };
            const proxyMethodProperties: Partial<
                | MethodProperties
                | {
                      Integration: Integration | { Uri: string | object };
                      RestApiId: string | object;
                  }
            > = {
                HttpMethod: 'ANY',
                Integration: {
                    Type: 'AWS_PROXY',
                    IntegrationHttpMethod: 'POST',
                    TimeoutInMillis: 29000,
                    Uri: {
                        'Fn::Join': [
                            '',
                            [
                                'arn:',
                                { Ref: 'AWS::Partition' },
                                ':apigateway:us-east-1:lambda:path/2015-03-31/functions/',
                                {
                                    'Fn::GetAtt': [handlerPartialName, 'Arn']
                                },
                                '/invocations'
                            ]
                        ]
                    }
                },
                RestApiId: { Ref: apiPartialName }
            };

            template.hasResourceProperties(
                'AWS::ApiGateway::RestApi',
                Match.objectLike(apiProperties)
            );

            template.hasResourceProperties(
                'AWS::ApiGateway::Resource',
                proxyResourceProperties
            );

            template.resourcePropertiesCountIs(
                'AWS::ApiGateway::Method',
                proxyMethodProperties,
                2
            );

            template.resourcePropertiesCountIs(
                'AWS::ApiGateway::Method',
                corsMethodProperties,
                2
            );

            template.resourcePropertiesCountIs(
                'AWS::ApiGateway::Stage',
                deploymentProperties,
                1
            );

            template.resourceCountIs('AWS::ApiGateway::Deployment', 1);
        });

        it('Creates an API with a stage name that matches the base path when using the default endpoint', () => {
            // Arrange
            const basePath = 'dev';

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: basePath
                }
            });

            // Assert
            const template = getTemplate();

            const deploymentProperties: Partial<StageProperties> = {
                StageName: basePath
            };

            template.resourcePropertiesCountIs(
                'AWS::ApiGateway::Stage',
                deploymentProperties,
                1
            );
        });

        it('Validates when the base path would lead to an invalid stage name when using the default endpoint', () => {
            // Arrange
            const basePath = 'dev@';

            // Act
            const construct = createPatternUnderTest(
                stack,
                id,
                commonNagProps,
                {
                    asset: mockFolderAsset,
                    domain: {
                        basePath: basePath
                    }
                },
                true
            );

            // Assert
            expect(construct).toThrow();
        });

        it('Allows for custom endpoint configuration', () => {
            // Arrange
            const vpceId = 'vpce-abc1234';
            const endpoint =
                InterfaceVpcEndpoint.fromInterfaceVpcEndpointAttributes(
                    stack,
                    'Endpoint',
                    {
                        port: 443,
                        vpcEndpointId: vpceId
                    }
                );
            const endpointConfig: EndpointConfiguration = {
                types: [EndpointType.PRIVATE],
                vpcEndpoints: [endpoint]
            };

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: 'public'
                },
                endpoint: endpointConfig
            });

            // Assert
            const template = getTemplate();

            const apiProperties: Partial<RestApiProperties> = {
                BinaryMediaTypes: ['*/*'],
                DisableExecuteApiEndpoint: false,
                EndpointConfiguration: {
                    Types: ['PRIVATE'],
                    VpcEndpointIds: [vpceId]
                }
            };
            template.hasResourceProperties(
                'AWS::ApiGateway::RestApi',
                Match.objectLike(apiProperties)
            );
        });

        it('Allows for custom domain usage', () => {
            // Arrange
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
                        domainName: domain
                    }
                }
            });

            // Assert
            const template = getTemplate();

            const apiProperties: Partial<RestApiProperties> = {
                BinaryMediaTypes: ['*/*'],
                DisableExecuteApiEndpoint: true
            };
            const domainNameProperties: Partial<DomainNameProperties> = {
                DomainName: domain,
                EndpointConfiguration: { Types: ['REGIONAL'] },
                RegionalCertificateArn: certArn
            };
            const basePathMappingProperties: Partial<
                | BasePathMappingProperties
                | { DomainName: string | object; RestApiId: string | object }
            > = {
                DomainName: {
                    Ref: createPartialNameMatcher('api', id, 'CustomDomain')
                },
                RestApiId: { Ref: apiPartialName }
            };

            template.hasResourceProperties(
                'AWS::ApiGateway::RestApi',
                Match.objectLike(apiProperties)
            );
            template.hasResourceProperties(
                'AWS::ApiGateway::DomainName',
                Match.objectLike(domainNameProperties)
            );
            template.hasResourceProperties(
                'AWS::ApiGateway::BasePathMapping',
                Match.objectLike(basePathMappingProperties)
            );
        });
    });
});
