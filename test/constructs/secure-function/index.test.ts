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
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { SecureFunction } from '../../../src/constructs/secure-function';
import {
    getTemplateWithCdkNag,
    validateNoCdkNagFindings
} from '../../../utilities/cdk-nag-jest';

const constructName = 'SecureFunction';

describe(constructName, () => {
    let stack: Stack;

    beforeEach(() => {
        stack = new Stack();
    });

    afterEach(() => {
        validateNoCdkNagFindings(stack, constructName);
    });

    it('creates lambda function with default properties', () => {
        // Act
        new SecureFunction(stack, constructName, {
            runtime: Runtime.NODEJS_20_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = function() { }')
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

        template.hasResourceProperties('AWS::Lambda::Function', {
            Handler: 'index.handler',
            Runtime: 'nodejs20.x',
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
        new SecureFunction(stack, constructName, {
            runtime: Runtime.NODEJS_20_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = function() { }'),
            logGroupRetention: RetentionDays.ONE_WEEK
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

        template.hasResourceProperties('AWS::Logs::LogGroup', {
            RetentionInDays: 7
        });
    });

    it('creates lambda function with encryption', () => {
        // Arrange
        const key = new Key(stack, 'TestKey');

        // Act
        new SecureFunction(stack, constructName, {
            runtime: Runtime.NODEJS_20_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = function() { }'),
            encryption: key
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

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
        new SecureFunction(stack, constructName, {
            runtime: Runtime.NODEJS_20_X,
            handler: 'index.handler',
            code: Code.fromInline('exports.handler = function() { }')
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

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
});
