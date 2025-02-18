// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';

import {
    EndpointConfiguration,
    EndpointType,
    LogGroupLogDestination
} from 'aws-cdk-lib/aws-apigateway';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { InterfaceVpcEndpoint } from 'aws-cdk-lib/aws-ec2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
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
import { PolicyProperties } from 'cloudform-types/types/iam/policy';
import { FunctionProperties } from 'cloudform-types/types/lambda/function';
import { DeletionPolicy } from 'cloudform-types/types/resource';
import CfnBucketElement from 'cloudform-types/types/s3/bucket';
import { BucketPolicyProperties } from 'cloudform-types/types/s3/bucketPolicy';
import {
    mockBadAssetPath,
    mockFolderAsset,
    mockFolderAssetPath,
    mockMissingAssetPath,
    mockZipAssetPath
} from './fixtures';
import {
    ApiGatewayStaticHosting,
    ApiGatewayStaticHostingProps
} from '../../../src/patterns/apigateway-static-hosting';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';
import { buildMockArn, mockAccount, mockRegion } from '../../fixtures/account';

type TestPatternCreator = () => ApiGatewayStaticHosting;

function createPatternUnderTest(
    stack: Stack,
    id: string,
    nagProps: Partial<ApiGatewayStaticHostingProps>,
    testProps: ApiGatewayStaticHostingProps,
    deferred?: boolean
): ApiGatewayStaticHosting | TestPatternCreator {
    const creator: TestPatternCreator = () => {
        return new ApiGatewayStaticHosting(stack, id, {
            ...nagProps,
            ...testProps
        });
    };

    return deferred ? creator : creator();
}

function createPartialNameMatcher(
    resource: 'store' | 'handler' | 'api',
    id: string,
    subResource?: string
) {
    const resourceName = (() => {
        switch (resource) {
            case 'store':
                return 'Store';
            case 'handler':
                return 'ServeProxy';
            case 'api':
                return 'DistributionEndpoint';
        }
    })();

    const mainResource = `${id}${resourceName}`;

    return subResource
        ? Match.stringLikeRegexp(`${mainResource}${subResource}`)
        : Match.stringLikeRegexp(mainResource);
}

describeCdkTest(ApiGatewayStaticHosting, (id, getStack, getTemplate) => {
    let stack: Stack;
    let commonNagProps: Partial<ApiGatewayStaticHostingProps>;

    beforeEach(() => {
        stack = getStack();

        const nagLoggingBucket = new Bucket(stack, 'NagLoggingBucket');
        const nagApiLogging = new LogGroupLogDestination(
            new LogGroup(stack, 'NagApiLogging')
        );

        commonNagProps = {
            accessLoggingBucket: nagLoggingBucket,
            apiLogDestination: nagApiLogging
        };

        NagSuppressions.addStackSuppressions(stack, [
            ...['AwsSolutions-APIG4', 'AwsSolutions-COG4'].map((nagId) => {
                return {
                    id: nagId,
                    reason: 'The consumer of this pattern is required to enforce access restrictions prior to the API if desired.'
                };
            }),
            ...[
                'AwsSolutions-APIG3',
                'NIST.800.53.R5-APIGWAssociatedWithWAF'
            ].map((nagId) => {
                return {
                    id: nagId,
                    reason: 'The consumer has the ability to apply WAF ACL rules to the API if so desired.'
                };
            }),
            {
                id: 'NIST.800.53.R5-APIGWSSLEnabled',
                reason: 'The default execution endpoint and custom domain endpoints have server-side SSL certificates. Client-side SSL certificates are out of scope for this pattern.'
            },
            {
                id: 'NIST.800.53.R5-S3DefaultEncryptionKMS',
                reason: 'The buckets are encrypted using the S3 managed key and the consumer can provide a KMS key if desired.'
            },
            {
                id: 'AwsSolutions-IAM5',
                reason: 'Permissions are tightly scoped by CDK grants and otherwise set to the required permissions for updating CloudFormation stacks.'
            },
            {
                id: 'AwsSolutions-IAM4',
                appliesTo: [
                    'Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs'
                ],
                reason: 'This policy is required for API Gateway to function.'
            },
            {
                id: 'NIST.800.53.R5-APIGWCacheEnabledAndEncrypted',
                reason: 'Given the dynamic nature of the pattern, only the consumer would know how to configure and enable caching.'
            },
            {
                id: 'AwsSolutions-APIG2',
                reason: 'Given the dynamic nature of the pattern, only the consumer would know how to configure and enable request validation.'
            },
            {
                id: 'NIST.800.53.R5-S3BucketReplicationEnabled',
                reason: 'Given the assets in this bucket can easily be redeployed with IaC, replication is out of scope.'
            }
        ]);
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

    /**
     * Handler
     */
    const handlerPartialName = createPartialNameMatcher('handler', id);

    /**
     * API
     */
    const apiPartialName = createPartialNameMatcher('api', id);

    describe('Storage', () => {
        it('Creates an Amazon S3 bucket to store static assets', () => {
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

            const store: Partial<CfnBucketElement> = {
                Properties: {
                    AccessControl: 'Private',
                    BucketEncryption: {
                        ServerSideEncryptionConfiguration: [
                            {
                                ServerSideEncryptionByDefault: {
                                    SSEAlgorithm: 'AES256'
                                }
                            }
                        ]
                    },
                    PublicAccessBlockConfiguration: {
                        BlockPublicAcls: true,
                        BlockPublicPolicy: true,
                        IgnorePublicAcls: true,
                        RestrictPublicBuckets: true
                    },
                    VersioningConfiguration: {
                        Status: 'Enabled'
                    }
                },
                DeletionPolicy: DeletionPolicy.Delete
            };
            const storePolicy: Partial<
                BucketPolicyProperties | { Bucket: string | object }
            > = {
                Bucket: { Ref: storePartialName },
                PolicyDocument: Match.objectLike({
                    Statement: Match.arrayWith([
                        Match.objectLike({
                            Action: 's3:*',
                            Condition: {
                                Bool: { 'aws:SecureTransport': 'false' }
                            },
                            Effect: 'Deny',
                            Principal: { AWS: '*' },
                            Resource: storeResources
                        })
                    ])
                })
            };

            template.hasResource('AWS::S3::Bucket', Match.objectLike(store));
            template.hasResourceProperties(
                'AWS::S3::BucketPolicy',
                storePolicy
            );
        });

        it('Keeps the Amazon S3 bucket on stack deletion if requested', () => {
            // Arrange
            // No action

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: 'public'
                },
                retainStoreOnDeletion: true
            });

            // Assert
            const template = getTemplate();

            const store: Partial<CfnBucketElement> = {
                DeletionPolicy: DeletionPolicy.Retain
            };
            template.hasResource('AWS::S3::Bucket', Match.objectLike(store));
        });

        it('Loads assets to the Amazon S3 bucket from the local file system', () => {
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

            template.resourcePropertiesCountIs(
                'Custom::S3AutoDeleteObjects',
                Match.objectLike({
                    BucketName: { Ref: storePartialName }
                }),
                1
            );
            template.resourcePropertiesCountIs(
                'Custom::CDKBucketDeployment',
                Match.objectLike({
                    DestinationBucketName: { Ref: storePartialName },
                    Prune: false
                }),
                1
            );
        });

        it('Handles assets when they are folders', () => {
            // Arrange
            // No action

            // Act
            const construct = createPatternUnderTest(
                stack,
                id,
                commonNagProps,
                {
                    asset: mockFolderAsset,
                    domain: {
                        basePath: 'public'
                    }
                },
                true
            );

            // Assert
            expect(construct).not.toThrow();
        });

        it('Handles assets when they are zips', () => {
            // Arrange
            // No action

            // Act
            const construct = createPatternUnderTest(
                stack,
                id,
                commonNagProps,
                {
                    asset: {
                        id: 'zip',
                        path: mockZipAssetPath
                    },
                    domain: {
                        basePath: 'public'
                    }
                },
                true
            );

            // Assert
            expect(construct).not.toThrow();
        });

        it('Throws an error when assets are missing', () => {
            // Arrange
            // No action

            // Act
            const construct = createPatternUnderTest(
                stack,
                id,
                commonNagProps,
                {
                    asset: {
                        id: 'missing',
                        path: mockMissingAssetPath
                    },
                    domain: {
                        basePath: 'public'
                    }
                },
                true
            );

            // Assert
            expect(construct).toThrow();
        });

        it('Throws an error when assets are not an acceptable format', () => {
            // Arrange
            // No action

            // Act
            const construct = createPatternUnderTest(
                stack,
                id,
                commonNagProps,
                {
                    asset: {
                        id: 'bad',
                        path: mockBadAssetPath
                    },
                    domain: {
                        basePath: 'public'
                    }
                },
                true
            );

            // Assert
            expect(construct).toThrow();
        });

        it('Loads multiple assets to the Amazon S3 bucket from the local file system', () => {
            // Arrange
            // No action

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: {
                    id: 'multi',
                    path: [mockFolderAssetPath, mockZipAssetPath]
                },
                domain: {
                    basePath: 'public'
                }
            });

            // Assert
            const template = getTemplate();

            template.resourcePropertiesCountIs(
                'Custom::S3AutoDeleteObjects',
                Match.objectLike({
                    BucketName: { Ref: storePartialName }
                }),
                1
            );
            template.resourcePropertiesCountIs(
                'Custom::CDKBucketDeployment',
                Match.objectLike({
                    DestinationBucketName: { Ref: storePartialName },
                    Prune: false
                }),
                1
            );
        });

        it('Adds custom version information to the bucket deployment', () => {
            // Arrange
            // No action

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: 'public'
                },
                versionTag: '1.0.0'
            });

            // Assert
            const template = getTemplate();

            template.resourcePropertiesCountIs(
                'Custom::S3AutoDeleteObjects',
                Match.objectLike({
                    BucketName: { Ref: storePartialName }
                }),
                1
            );
            template.resourcePropertiesCountIs(
                'Custom::CDKBucketDeployment',
                Match.objectLike({
                    DestinationBucketName: { Ref: storePartialName },
                    Prune: false
                }),
                1
            );
            template.resourcePropertiesCountIs(
                'Custom::CDKBucketDeployment',
                Match.objectLike({
                    DestinationBucketName: { Ref: storePartialName },
                    Prune: true
                }),
                1
            );
        });

        it('Uses an AWS KM CMK to encrypt the storage and assets when provided (version tag)', () => {
            // Arrange
            const key = new Key(stack, 'Encryption');

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: 'public'
                },
                encryption: key,
                versionTag: '1.0.0'
            });

            // Assert
            const template = getTemplate();

            const store: Partial<CfnBucketElement> = {
                Properties: {
                    BucketEncryption: {
                        ServerSideEncryptionConfiguration: [
                            {
                                ServerSideEncryptionByDefault: {
                                    SSEAlgorithm: 'aws:kms',
                                    KMSMasterKeyID: {
                                        'Fn::GetAtt': [
                                            Match.stringLikeRegexp(
                                                'Encryption'
                                            ),
                                            'Arn'
                                        ]
                                    } as unknown as string
                                }
                            }
                        ]
                    }
                }
            };

            template.hasResource('AWS::S3::Bucket', Match.objectLike(store));
        });

        it('Uses an AWS KM CMK to encrypt the storage and assets when provided', () => {
            // Arrange
            const key = new Key(stack, 'Encryption');

            // Act
            createPatternUnderTest(stack, id, commonNagProps, {
                asset: mockFolderAsset,
                domain: {
                    basePath: 'public'
                },
                encryption: key
            });

            // Assert
            const template = getTemplate();

            const store: Partial<CfnBucketElement> = {
                Properties: {
                    BucketEncryption: {
                        ServerSideEncryptionConfiguration: [
                            {
                                ServerSideEncryptionByDefault: {
                                    SSEAlgorithm: 'aws:kms',
                                    KMSMasterKeyID: {
                                        'Fn::GetAtt': [
                                            Match.stringLikeRegexp(
                                                'Encryption'
                                            ),
                                            'Arn'
                                        ]
                                    } as unknown as string
                                }
                            }
                        ]
                    }
                }
            };

            template.hasResource('AWS::S3::Bucket', Match.objectLike(store));
        });
    });

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
                            'method.response.header.Access-Control-Allow-Headers':
                                true,
                            'method.response.header.Access-Control-Allow-Origin':
                                true,
                            'method.response.header.Access-Control-Allow-Methods':
                                true
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
