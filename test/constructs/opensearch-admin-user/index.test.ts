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

import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Domain, EngineVersion } from 'aws-cdk-lib/aws-opensearchservice';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { PolicyProperties } from 'cloudform-types/types/iam/policy';
import { FunctionProperties } from 'cloudform-types/types/lambda/function';
import { mockPasswordParameterName } from './fixtures';
import { OpenSearchAdminUser } from '../../../src/constructs/opensearch-admin-user/index';
import {
    getTemplateWithCdkNag,
    validateNoCdkNagFindings
} from '../../../utilities/cdk-nag-jest';

const constructName = 'OpensearchAdminUser';
const passwordParameterElementName = 'PasswordParamater';
const passwordSecretElementName = 'PasswordSecret';

describe(constructName, () => {
    let stack: Stack;
    let domain: Domain;
    let username: StringParameter;

    beforeEach(() => {
        stack = new Stack(undefined, `TST${new Date().getTime()}`);

        domain = new Domain(stack, 'TestDomain', {
            domainName: 'test-domain',
            version: EngineVersion.OPENSEARCH_1_3
        });

        username = new StringParameter(stack, 'Username', {
            parameterName: '/test/username',
            stringValue: 'admin'
        });
    });

    afterEach(() => {
        validateNoCdkNagFindings(stack, constructName);
        validateNoCdkNagFindings(stack, OpenSearchAdminUser.name);
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
        new OpenSearchAdminUser(stack, constructName, {
            username,
            credential: {
                parameter: password
            },
            domain
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

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
            Runtime: 'nodejs20.x',
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
        new OpenSearchAdminUser(stack, constructName, {
            username,
            credential: {
                secret: password
            },
            domain
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

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
            Runtime: 'nodejs20.x',
            Timeout: 60
        };

        template.hasResourceProperties(
            'AWS::Lambda::Function',
            lambdaResourceProperties
        );
    });

    it('grants necessary permissions to Lambda function (parameter)', () => {
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
        new OpenSearchAdminUser(stack, constructName, {
            username,
            credential: {
                parameter: password
            },
            domain
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

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

    it('grants necessary permissions to Lambda function (unencrypted secret)', () => {
        // Arrange
        const password = new Secret(stack, passwordSecretElementName, {});

        // Act
        new OpenSearchAdminUser(stack, constructName, {
            username,
            credential: {
                secret: password
            },
            domain
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

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
        const passwordKeyElementName = 'PasswordKey';
        const passwordKey = new Key(stack, passwordKeyElementName);
        const password = new Secret(stack, passwordSecretElementName, {
            encryptionKey: passwordKey
        });

        // Act
        new OpenSearchAdminUser(stack, constructName, {
            username,
            credential: {
                secret: password,
                encryption: passwordKey
            },
            domain
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

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
                    }),

                    Match.objectLike({
                        Action: [
                            'kms:Decrypt',
                            'kms:Encrypt',
                            'kms:ReEncrypt*',
                            'kms:GenerateDataKey*'
                        ],
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
        new OpenSearchAdminUser(stack, constructName, {
            username,
            credential: {
                parameter: password
            },
            domain,
            domainKey
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

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
        new OpenSearchAdminUser(stack, constructName, {
            username,
            credential: {
                parameter: password
            },
            domain,
            encryption
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);
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
