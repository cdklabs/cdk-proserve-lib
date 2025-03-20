// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { SecureFunction } from '../../../src/constructs/secure-function';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

describeCdkTest(SecureFunction, (id, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();
    });

    it('creates lambda function with default properties', () => {
        // Act
        new SecureFunction(stack, id, {
            runtime: Runtime.NODEJS_22_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = function() { }')
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties('AWS::Lambda::Function', {
            Handler: 'index.handler',
            Runtime: 'nodejs22.x',
            ReservedConcurrentExecutions: 5
        });

        // Verify IAM role
        template.hasResourceProperties('AWS::IAM::Role', {
            AssumeRolePolicyDocument: {
                Statement: [
                    {
                        Action: 'sts:AssumeRole',
                        Effect: 'Allow',
                        Principal: {
                            Service: 'lambda.amazonaws.com'
                        }
                    }
                ]
            }
        });

        // Verify Log Group
        template.hasResourceProperties('AWS::Logs::LogGroup', {
            RetentionInDays: 30 // Default retention
        });
    });

    it('creates lambda function with custom log retention', () => {
        // Act
        new SecureFunction(stack, id, {
            runtime: Runtime.NODEJS_22_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = function() { }'),
            logGroupRetention: RetentionDays.ONE_WEEK
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties('AWS::Logs::LogGroup', {
            RetentionInDays: 7
        });
    });

    it('creates lambda function with encryption', () => {
        // Arrange
        const key = new Key(stack, 'TestKey');

        // Act
        new SecureFunction(stack, id, {
            runtime: Runtime.NODEJS_22_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = function() { }'),
            encryption: key
        });

        // Assert
        const template = getTemplate();

        // Verify Log Group encryption
        template.hasResourceProperties('AWS::Logs::LogGroup', {
            KmsKeyId: {
                'Fn::GetAtt': [Match.stringLikeRegexp('TestKey'), 'Arn']
            }
        });

        // Verify Lambda function encryption
        template.hasResourceProperties('AWS::Lambda::Function', {
            KmsKeyArn: {
                'Fn::GetAtt': [Match.stringLikeRegexp('TestKey'), 'Arn']
            }
        });
    });

    it('grants log write permissions to lambda', () => {
        // Act
        new SecureFunction(stack, id, {
            runtime: Runtime.NODEJS_22_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = function() { }')
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties('AWS::IAM::Policy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: ['logs:CreateLogStream', 'logs:PutLogEvents'],
                        Effect: 'Allow',
                        Resource: {
                            'Fn::GetAtt': [
                                Match.stringLikeRegexp(
                                    'SecureFunctionLogGroup'
                                ),
                                'Arn'
                            ]
                        }
                    })
                ])
            }
        });
    });

    it('grants encryption permissions to logs service principal', () => {
        // Arrange
        const key = new Key(stack, 'TestKey');

        // Act
        new SecureFunction(stack, id, {
            runtime: Runtime.NODEJS_22_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = function() { }'),
            encryption: key
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties('AWS::KMS::Key', {
            KeyPolicy: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: [
                            'kms:Decrypt',
                            'kms:Encrypt',
                            'kms:ReEncrypt*',
                            'kms:GenerateDataKey*'
                        ],
                        Effect: 'Allow',
                        Principal: {
                            Service: 'logs.amazonaws.com'
                        }
                    })
                ])
            }
        });
    });
});
