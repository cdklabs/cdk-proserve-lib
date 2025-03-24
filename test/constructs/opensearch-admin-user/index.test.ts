// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Domain, EngineVersion } from 'aws-cdk-lib/aws-opensearchservice';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { NagSuppressions } from 'cdk-nag';
import { PolicyProperties } from 'cloudform-types/types/iam/policy';
import { FunctionProperties } from 'cloudform-types/types/lambda/function';
import { beforeEach, it } from 'vitest';
import { mockPasswordParameterName } from './fixtures';
import { OpenSearchAdminUser } from '../../../src/constructs/opensearch-admin-user/index';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

const passwordParameterElementName = 'PasswordParamater';
const passwordSecretElementName = 'PasswordSecret';
const passwordKeyElementName = 'PasswordKey';

describeCdkTest(OpenSearchAdminUser, (id, getStack, getTemplate) => {
    let stack: Stack;
    let domain: Domain;
    let username: StringParameter;

    function getTemplateWithSecretsAndNag(s: Stack): Template {
        const originalTemplate = Template.fromStack(s);

        const secretResourceIds = Object.keys(
            originalTemplate.findResources('AWS::SecretsManager::Secret')
        );

        NagSuppressions.addStackSuppressions(
            s,
            [
                {
                    id: 'AwsSolutions-IAM5',
                    appliesTo: secretResourceIds.map(
                        (resourceId) => `Resource::<${resourceId}>*`
                    ),
                    reason: 'Permissions are tightly scoped up to the known principal prefix.'
                }
            ],
            true
        );

        return getTemplate();
    }

    beforeEach(() => {
        stack = getStack();

        domain = new Domain(stack, 'TestDomain', {
            domainName: 'test-domain',
            version: EngineVersion.OPENSEARCH_1_3
        });

        username = new StringParameter(stack, 'Username', {
            parameterName: '/test/username',
            stringValue: 'admin'
        });
    });

    it('creates custom resource with correct properties (parameter)', () => {
        // Arrange
        const password = new StringParameter(
            stack,
            passwordParameterElementName,
            {
                parameterName: mockPasswordParameterName,
                stringValue: 'password123'
            }
        );

        // Act
        new OpenSearchAdminUser(stack, id, {
            username,
            credential: {
                parameter: password
            },
            domain
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties('Custom::OpenSearchAdminUser', {
            ServiceToken: {
                'Fn::GetAtt': Match.anyValue()
            },
            DomainName: Match.objectLike({
                Ref: Match.stringLikeRegexp('TestDomain')
            }),
            PasswordParameterName: Match.objectLike({
                Ref: Match.stringLikeRegexp(passwordParameterElementName)
            }),
            UsernameParameterName: Match.objectLike({
                Ref: Match.stringLikeRegexp('Username')
            })
        });

        const lambdaResourceProperties: Partial<FunctionProperties> = {
            Handler: 'index.handler',
            ReservedConcurrentExecutions: 5,
            Runtime: 'nodejs22.x',
            Timeout: 60
        };

        template.hasResourceProperties(
            'AWS::Lambda::Function',
            lambdaResourceProperties
        );
    });

    it('creates custom resource with correct properties (secret)', () => {
        // Arrange
        const password = new Secret(stack, passwordSecretElementName, {});

        // Act
        new OpenSearchAdminUser(stack, id, {
            username,
            credential: {
                secret: password
            },
            domain
        });

        // Assert
        const template = getTemplateWithSecretsAndNag(stack);

        template.hasResourceProperties('Custom::OpenSearchAdminUser', {
            ServiceToken: {
                'Fn::GetAtt': Match.anyValue()
            },
            DomainName: Match.objectLike({
                Ref: Match.stringLikeRegexp('TestDomain')
            }),
            PasswordSecretArn: Match.objectLike({
                Ref: Match.stringLikeRegexp(passwordSecretElementName)
            }),
            UsernameParameterName: Match.objectLike({
                Ref: Match.stringLikeRegexp('Username')
            })
        });

        const lambdaResourceProperties: Partial<FunctionProperties> = {
            Handler: 'index.handler',
            ReservedConcurrentExecutions: 5,
            Runtime: 'nodejs22.x',
            Timeout: 60
        };

        template.hasResourceProperties(
            'AWS::Lambda::Function',
            lambdaResourceProperties
        );
    });

    it('grants necessary permissions to Lambda function (unencrypted parameter)', () => {
        // Arrange
        const password = new StringParameter(
            stack,
            passwordParameterElementName,
            {
                parameterName: mockPasswordParameterName,
                stringValue: 'password123'
            }
        );

        // Act
        new OpenSearchAdminUser(stack, id, {
            username,
            credential: {
                parameter: password
            },
            domain
        });

        // Assert
        const template = getTemplate();

        const iamPolicyProperties: Partial<PolicyProperties> = {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 'es:UpdateDomainConfig',
                        Effect: 'Allow',
                        Resource: Match.anyValue()
                    }),
                    Match.objectLike({
                        Action: [
                            'ssm:DescribeParameters',
                            'ssm:GetParameters',
                            'ssm:GetParameter',
                            'ssm:GetParameterHistory'
                        ],
                        Effect: 'Allow',
                        Resource: Match.anyValue()
                    })
                ])
            }
        };

        template.hasResourceProperties('AWS::IAM::Policy', iamPolicyProperties);
    });

    it('grants necessary permissions to Lambda function (encrypted parameter)', () => {
        // Arrange
        const passwordKey = new Key(stack, passwordKeyElementName);
        const password = new StringParameter(
            stack,
            passwordParameterElementName,
            {
                parameterName: mockPasswordParameterName,
                stringValue: 'password123'
            }
        );

        // Act
        new OpenSearchAdminUser(stack, id, {
            username,
            credential: {
                parameter: password,
                encryption: passwordKey
            },
            domain
        });

        // Assert
        const template = getTemplate();

        const iamPolicyProperties: Partial<PolicyProperties> = {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 'es:UpdateDomainConfig',
                        Effect: 'Allow',
                        Resource: Match.anyValue()
                    }),
                    Match.objectLike({
                        Action: [
                            'ssm:DescribeParameters',
                            'ssm:GetParameters',
                            'ssm:GetParameter',
                            'ssm:GetParameterHistory'
                        ],
                        Effect: 'Allow',
                        Resource: Match.anyValue()
                    }),
                    Match.objectLike({
                        Action: 'kms:Decrypt',
                        Effect: 'Allow',
                        Resource: {
                            'Fn::GetAtt': [
                                Match.stringLikeRegexp(passwordKeyElementName),
                                'Arn'
                            ]
                        }
                    })
                ])
            }
        };

        template.hasResourceProperties('AWS::IAM::Policy', iamPolicyProperties);
    });

    it('grants necessary permissions to Lambda function (unencrypted secret)', () => {
        // Arrange
        const password = new Secret(stack, passwordSecretElementName, {});

        // Act
        new OpenSearchAdminUser(stack, id, {
            username,
            credential: {
                secret: password
            },
            domain
        });

        // Assert
        const template = getTemplateWithSecretsAndNag(stack);

        const iamPolicyProperties: Partial<PolicyProperties> = {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 'es:UpdateDomainConfig',
                        Effect: 'Allow',
                        Resource: Match.anyValue()
                    }),
                    Match.objectLike({
                        Action: [
                            'ssm:DescribeParameters',
                            'ssm:GetParameters',
                            'ssm:GetParameter',
                            'ssm:GetParameterHistory'
                        ],
                        Effect: 'Allow',
                        Resource: Match.anyValue()
                    }),
                    Match.objectLike({
                        Action: Match.arrayWith([
                            'secretsmanager:GetSecretValue'
                        ])
                    })
                ])
            }
        };

        template.hasResourceProperties('AWS::IAM::Policy', iamPolicyProperties);
    });

    it('grants necessary permissions to Lambda function (encrypted secret)', () => {
        // Arrange
        const passwordKey = new Key(stack, passwordKeyElementName);
        const password = new Secret(stack, passwordSecretElementName, {
            encryptionKey: passwordKey
        });

        // Act
        new OpenSearchAdminUser(stack, id, {
            username,
            credential: {
                secret: password,
                encryption: passwordKey
            },
            domain
        });

        // Assert
        const template = getTemplateWithSecretsAndNag(stack);

        const iamPolicyProperties: Partial<PolicyProperties> = {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 'es:UpdateDomainConfig',
                        Effect: 'Allow',
                        Resource: Match.anyValue()
                    }),
                    Match.objectLike({
                        Action: [
                            'ssm:DescribeParameters',
                            'ssm:GetParameters',
                            'ssm:GetParameter',
                            'ssm:GetParameterHistory'
                        ],
                        Effect: 'Allow',
                        Resource: Match.anyValue()
                    }),
                    Match.objectLike({
                        Action: 'kms:Decrypt',
                        Effect: 'Allow',
                        Resource: {
                            'Fn::GetAtt': [
                                Match.stringLikeRegexp(passwordKeyElementName),
                                'Arn'
                            ]
                        }
                    }),
                    Match.objectLike({
                        Action: [
                            'secretsmanager:GetSecretValue',
                            'secretsmanager:DescribeSecret'
                        ],
                        Effect: 'Allow',
                        Resource: {
                            'Fn::Join': [
                                '',
                                [
                                    {
                                        Ref: Match.stringLikeRegexp(
                                            passwordSecretElementName
                                        )
                                    },
                                    '*'
                                ]
                            ]
                        }
                    })
                ])
            }
        };

        template.hasResourceProperties('AWS::IAM::Policy', iamPolicyProperties);
    });

    it('grants KMS permissions when domainKey is provided', () => {
        // Arrange
        const password = new StringParameter(
            stack,
            passwordParameterElementName,
            {
                parameterName: mockPasswordParameterName,
                stringValue: 'password123'
            }
        );

        const domainKeyElementName = 'TestDomainKey';
        const domainKey = new Key(stack, domainKeyElementName);

        // Act
        new OpenSearchAdminUser(stack, id, {
            username,
            credential: {
                parameter: password
            },
            domain,
            domainKey
        });

        // Assert
        const template = getTemplate();

        // Check that the Lambda function has permission to use the KMS key
        const iamPolicyProperties: Partial<PolicyProperties> = {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 'kms:DescribeKey',
                        Effect: 'Allow',
                        Resource: {
                            'Fn::GetAtt': [
                                Match.stringLikeRegexp(domainKeyElementName),
                                'Arn'
                            ]
                        }
                    })
                ])
            }
        };

        template.hasResourceProperties('AWS::IAM::Policy', iamPolicyProperties);
    });

    it('creates encrypted resources with provided key', () => {
        // Arrange
        const password = new StringParameter(
            stack,
            passwordParameterElementName,
            {
                parameterName: mockPasswordParameterName,
                stringValue: 'password123'
            }
        );

        const encryptionElementName = 'TestWorkerKey';
        const encryption = new Key(stack, encryptionElementName);

        // Act
        new OpenSearchAdminUser(stack, id, {
            username,
            credential: {
                parameter: password
            },
            domain,
            encryption
        });

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::Lambda::Function', {
            KmsKeyArn: {
                'Fn::GetAtt': [
                    Match.stringLikeRegexp(encryptionElementName),
                    'Arn'
                ]
            }
        });
    });
});
