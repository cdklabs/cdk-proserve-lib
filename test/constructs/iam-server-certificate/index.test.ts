// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { NagSuppressions } from 'cdk-nag';
import { PolicyProperties } from 'cloudform-types/types/iam/policy';
import { FunctionProperties } from 'cloudform-types/types/lambda/function';
import {
    mockCertificateParameterName,
    mockCertificateValue,
    mockPrefix,
    mockPrivateKeyParameterName,
    mockPrivateKeyValue
} from './fixtures';
import { IamServerCertificate } from '../../../src/constructs';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';

const certificateParameterElementName = 'CertificateParameter';
const privateKeyParameterElementName = 'PrivateKeyParameter';
const secretKeyElementName = 'SecretEncryptionKey';
const certificateSecretElementName = 'CertificateSecret';
const privateKeySecretElementName = 'PrivateKeySecret';

describeCdkTest(IamServerCertificate, (id, getStack, getTemplate) => {
    let stack: Stack;

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

        NagSuppressions.addStackSuppressions(stack, [
            {
                id: 'AwsSolutions-IAM5',
                appliesTo: [
                    `Resource::arn:<AWS::Partition>:iam::<AWS::AccountId>:server-certificate/${mockPrefix}-*`
                ],
                reason: 'Permissions are tightly scoped up to the known principal prefix.'
            }
        ]);
    });

    it('creates custom resource with correct properties (parameter)', () => {
        // Arrange
        const certificate = new StringParameter(
            stack,
            certificateParameterElementName,
            {
                parameterName: mockCertificateParameterName,
                stringValue: mockCertificateValue
            }
        );
        const privateKey = new StringParameter(
            stack,
            privateKeyParameterElementName,
            {
                parameterName: mockPrivateKeyParameterName,
                stringValue: mockPrivateKeyValue
            }
        );

        // Act
        new IamServerCertificate(stack, id, {
            certificate: {
                parameter: certificate
            },
            prefix: mockPrefix,
            privateKey: {
                parameter: privateKey
            }
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties('Custom::IamServerCertificate', {
            ServiceToken: {
                'Fn::GetAtt': Match.anyValue()
            },
            CertificatePrefix: mockPrefix,
            Certificate: {
                Source: 'parameter',
                Id: Match.objectLike({
                    Ref: Match.stringLikeRegexp(certificateParameterElementName)
                })
            },
            PrivateKey: {
                Source: 'parameter',
                Id: Match.objectLike({
                    Ref: Match.stringLikeRegexp(privateKeyParameterElementName)
                })
            }
        });

        const lambdaResourceProperties: Partial<FunctionProperties> = {
            Handler: 'index.handler',
            ReservedConcurrentExecutions: 5,
            Runtime: 'nodejs20.x',
            Timeout: 60,
            MemorySize: 512
        };

        template.hasResourceProperties(
            'AWS::Lambda::Function',
            lambdaResourceProperties
        );
    });

    it('creates custom resource with correct properties (secret)', () => {
        // Arrange
        const key = new Key(stack, secretKeyElementName);
        const certificate = new Secret(stack, certificateSecretElementName, {
            encryptionKey: key
        });
        const privateKey = new Secret(stack, privateKeySecretElementName, {
            encryptionKey: key
        });

        // Act
        new IamServerCertificate(stack, id, {
            certificate: {
                secret: certificate,
                encryption: key
            },
            prefix: mockPrefix,
            privateKey: {
                secret: privateKey,
                encryption: key
            }
        });

        // Assert
        const template = getTemplateWithSecretsAndNag(stack);

        template.hasResourceProperties('Custom::IamServerCertificate', {
            ServiceToken: {
                'Fn::GetAtt': Match.anyValue()
            },
            CertificatePrefix: mockPrefix,
            Certificate: {
                Source: 'secret',
                Id: Match.objectLike({
                    Ref: Match.stringLikeRegexp(certificateSecretElementName)
                })
            },
            PrivateKey: {
                Source: 'secret',
                Id: Match.objectLike({
                    Ref: Match.stringLikeRegexp(privateKeySecretElementName)
                })
            }
        });

        const lambdaResourceProperties: Partial<FunctionProperties> = {
            Handler: 'index.handler',
            ReservedConcurrentExecutions: 5,
            Runtime: 'nodejs20.x',
            Timeout: 60,
            MemorySize: 512
        };

        template.hasResourceProperties(
            'AWS::Lambda::Function',
            lambdaResourceProperties
        );
    });

    it('creates custom resource with correct properties (parameter, secret)', () => {
        // Arrange
        const key = new Key(stack, secretKeyElementName);
        const certificate = new StringParameter(
            stack,
            certificateParameterElementName,
            {
                parameterName: mockCertificateParameterName,
                stringValue: mockCertificateValue
            }
        );
        const privateKey = new Secret(stack, privateKeySecretElementName, {
            encryptionKey: key
        });

        // Act
        new IamServerCertificate(stack, id, {
            certificate: {
                parameter: certificate
            },
            prefix: mockPrefix,
            privateKey: {
                secret: privateKey,
                encryption: key
            }
        });

        // Assert
        const template = getTemplateWithSecretsAndNag(stack);

        template.hasResourceProperties('Custom::IamServerCertificate', {
            ServiceToken: {
                'Fn::GetAtt': Match.anyValue()
            },
            CertificatePrefix: mockPrefix,
            Certificate: {
                Source: 'parameter',
                Id: Match.objectLike({
                    Ref: Match.stringLikeRegexp(certificateParameterElementName)
                })
            },
            PrivateKey: {
                Source: 'secret',
                Id: Match.objectLike({
                    Ref: Match.stringLikeRegexp(privateKeySecretElementName)
                })
            }
        });

        const lambdaResourceProperties: Partial<FunctionProperties> = {
            Handler: 'index.handler',
            ReservedConcurrentExecutions: 5,
            Runtime: 'nodejs20.x',
            Timeout: 60,
            MemorySize: 512
        };

        template.hasResourceProperties(
            'AWS::Lambda::Function',
            lambdaResourceProperties
        );
    });

    it('creates custom resource with correct properties (secret, parameter)', () => {
        // Arrange
        const key = new Key(stack, secretKeyElementName);
        const certificate = new Secret(stack, certificateSecretElementName, {
            encryptionKey: key
        });
        const privateKey = new StringParameter(
            stack,
            privateKeyParameterElementName,
            {
                parameterName: mockPrivateKeyParameterName,
                stringValue: mockPrivateKeyValue
            }
        );

        // Act
        new IamServerCertificate(stack, id, {
            certificate: {
                secret: certificate,
                encryption: key
            },
            prefix: mockPrefix,
            privateKey: {
                parameter: privateKey
            }
        });

        // Assert
        const template = getTemplateWithSecretsAndNag(stack);

        template.hasResourceProperties('Custom::IamServerCertificate', {
            ServiceToken: {
                'Fn::GetAtt': Match.anyValue()
            },
            CertificatePrefix: mockPrefix,
            Certificate: {
                Source: 'secret',
                Id: Match.objectLike({
                    Ref: Match.stringLikeRegexp(certificateSecretElementName)
                })
            },
            PrivateKey: {
                Source: 'parameter',
                Id: Match.objectLike({
                    Ref: Match.stringLikeRegexp(privateKeyParameterElementName)
                })
            }
        });

        const lambdaResourceProperties: Partial<FunctionProperties> = {
            Handler: 'index.handler',
            ReservedConcurrentExecutions: 5,
            Runtime: 'nodejs20.x',
            Timeout: 60,
            MemorySize: 512
        };

        template.hasResourceProperties(
            'AWS::Lambda::Function',
            lambdaResourceProperties
        );
    });

    it('grants necessary permissions to Lambda function (parameter)', () => {
        // Arrange
        const certificate = new StringParameter(
            stack,
            certificateParameterElementName,
            {
                parameterName: mockCertificateParameterName,
                stringValue: mockCertificateValue
            }
        );
        const privateKey = new StringParameter(
            stack,
            privateKeyParameterElementName,
            {
                parameterName: mockPrivateKeyParameterName,
                stringValue: mockPrivateKeyValue
            }
        );

        // Act
        new IamServerCertificate(stack, id, {
            certificate: {
                parameter: certificate
            },
            prefix: mockPrefix,
            privateKey: {
                parameter: privateKey
            }
        });

        // Assert
        const template = getTemplate();

        const iamPolicyProperties: Partial<PolicyProperties> = {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: [
                            'iam:UploadServerCertificate',
                            'iam:DeleteServerCertificate'
                        ],
                        Effect: 'Allow',
                        Resource: {
                            'Fn::Join': [
                                '',
                                [
                                    'arn:',
                                    { Ref: 'AWS::Partition' },
                                    ':iam::',
                                    { Ref: 'AWS::AccountId' },
                                    `:server-certificate/${mockPrefix}-*`
                                ]
                            ]
                        }
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

    it('grants necessary permissions to Lambda function (unencrypted secret)', () => {
        // Arrange
        const certificate = new Secret(stack, certificateSecretElementName);
        const privateKey = new Secret(stack, privateKeySecretElementName);

        // Act
        new IamServerCertificate(stack, id, {
            certificate: {
                secret: certificate
            },
            prefix: mockPrefix,
            privateKey: {
                secret: privateKey
            }
        });

        // Assert
        const template = getTemplateWithSecretsAndNag(stack);

        const iamPolicyProperties: Partial<PolicyProperties> = {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: [
                            'iam:UploadServerCertificate',
                            'iam:DeleteServerCertificate'
                        ],
                        Effect: 'Allow',
                        Resource: {
                            'Fn::Join': [
                                '',
                                [
                                    'arn:',
                                    { Ref: 'AWS::Partition' },
                                    ':iam::',
                                    { Ref: 'AWS::AccountId' },
                                    `:server-certificate/${mockPrefix}-*`
                                ]
                            ]
                        }
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
        const key = new Key(stack, secretKeyElementName);
        const certificate = new Secret(stack, certificateSecretElementName, {
            secretName: 'CertificateSecret',
            encryptionKey: key
        });
        const privateKey = new Secret(stack, privateKeySecretElementName, {
            encryptionKey: key
        });

        // Act
        new IamServerCertificate(stack, id, {
            certificate: {
                secret: certificate,
                encryption: key
            },
            prefix: mockPrefix,
            privateKey: {
                secret: privateKey,
                encryption: key
            }
        });

        // Assert
        const template = getTemplateWithSecretsAndNag(stack);

        const iamPolicyProperties: Partial<PolicyProperties> = {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: [
                            'iam:UploadServerCertificate',
                            'iam:DeleteServerCertificate'
                        ],
                        Effect: 'Allow',
                        Resource: {
                            'Fn::Join': [
                                '',
                                [
                                    'arn:',
                                    { Ref: 'AWS::Partition' },
                                    ':iam::',
                                    { Ref: 'AWS::AccountId' },
                                    `:server-certificate/${mockPrefix}-*`
                                ]
                            ]
                        }
                    }),
                    Match.objectLike({
                        Action: [
                            'secretsmanager:GetSecretValue',
                            'secretsmanager:DescribeSecret'
                        ],
                        Effect: 'Allow'
                        // Resource: Match
                    }),
                    Match.objectLike({
                        Action: 'kms:Decrypt',
                        Effect: 'Allow',
                        Resource: {
                            'Fn::GetAtt': [
                                Match.stringLikeRegexp(secretKeyElementName),
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
        const encryptionElementName = 'TestEncryptionKey';
        const encryption = new Key(stack, encryptionElementName);
        const certificate = new Secret(stack, certificateSecretElementName);
        const privateKey = new Secret(stack, privateKeySecretElementName);

        // Act
        new IamServerCertificate(stack, id, {
            certificate: {
                secret: certificate
            },
            prefix: mockPrefix,
            privateKey: {
                secret: privateKey
            },
            encryption: encryption
        });

        // Assert
        const template = getTemplateWithSecretsAndNag(stack);

        template.hasResourceProperties('AWS::Lambda::Function', {
            KmsKeyArn: {
                'Fn::GetAtt': [
                    Match.stringLikeRegexp(encryptionElementName),
                    'Arn'
                ]
            }
        });
    });

    it('exposes certificate ARN', () => {
        const certificate = new Secret(stack, certificateSecretElementName);
        const privateKey = new Secret(stack, privateKeySecretElementName);

        // Act
        const serverCertificate = new IamServerCertificate(stack, id, {
            certificate: {
                secret: certificate
            },
            prefix: mockPrefix,
            privateKey: {
                secret: privateKey
            }
        });

        // Assert
        expect(serverCertificate.arn).toBeDefined();
    });
});
