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

import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Key } from 'aws-cdk-lib/aws-kms';
import { NagSuppressions } from 'cdk-nag';
import { FriendlyEmbrace } from '../../../src/constructs/friendly-embrace';
import {
    getTemplateWithCdkNag,
    validateNoCdkNagFindings
} from '../../../utilities/cdk-nag-jest';

const constructName = 'FriendlyEmbrace';

describe(constructName, () => {
    let app: App;
    let stack: Stack;
    let template: Template;

    beforeEach(() => {
        app = new App();
        new Stack(app, 'AppStack'); // must be at least one other stack
        stack = new Stack(app, 'Embrace');

        NagSuppressions.addStackSuppressions(stack, [
            ...['NIST.800.53.R5-S3BucketLoggingEnabled', 'AwsSolutions-S1'].map(
                (id) => ({
                    id,
                    reason: 'Bucket logging is optional and up to the user to set through optional parameters of the construct.'
                })
            ),
            {
                id: 'NIST.800.53.R5-S3BucketReplicationEnabled',
                reason: 'Data is transient and deleted after use. Replication is not necessary.'
            },
            {
                id: 'AwsSolutions-IAM5',
                reason: 'Permissions are tightly scoped by CDK grants and otherwise set to the required permissions for updating CloudFormation stacks.'
            }
        ]);
    });

    afterEach(() => {
        validateNoCdkNagFindings(stack, constructName);
    });

    it('creates S3 bucket with default encryption', () => {
        new FriendlyEmbrace(stack, constructName);
        template = getTemplateWithCdkNag(stack);
        template.hasResourceProperties('AWS::S3::Bucket', {
            BucketEncryption: {
                ServerSideEncryptionConfiguration: [
                    {
                        ServerSideEncryptionByDefault: {
                            SSEAlgorithm: 'aws:kms'
                        }
                    }
                ]
            }
        });
    });

    it('creates Lambda function with expected configuration', () => {
        new FriendlyEmbrace(stack, constructName);
        template = getTemplateWithCdkNag(stack);
        template.hasResourceProperties('AWS::Lambda::Function', {
            Handler: 'index.handler',
            Runtime: 'nodejs20.x',
            Timeout: 300,
            MemorySize: 512
        });
    });

    it('creates custom resource with expected properties', () => {
        new FriendlyEmbrace(stack, constructName);
        template = getTemplateWithCdkNag(stack);
        template.hasResourceProperties('Custom::FriendlyEmbrace', {
            ServiceToken: {
                'Fn::GetAtt': Match.arrayWith([
                    Match.stringLikeRegexp('CrFriendlyEmbraceProvider.*'),
                    'Arn'
                ])
            }
        });
    });

    it('creates IAM role with required permissions', () => {
        new FriendlyEmbrace(stack, constructName);
        template = getTemplateWithCdkNag(stack);
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

        template.hasResourceProperties('AWS::IAM::Policy', {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: [
                            'cloudformation:DescribeStacks',
                            'cloudformation:GetTemplate',
                            'cloudformation:UpdateStack'
                        ],
                        Effect: 'Allow'
                    }),
                    Match.objectLike({
                        Action: [
                            'dynamodb:DescribeTable',
                            'ec2:DescribeSecurityGroups',
                            'ec2:DescribeLaunchTemplates',
                            'ecs:DescribeServices',
                            'elasticloadbalancing:DescribeLoadBalancers',
                            'iam:GetRole',
                            'logs:DescribeLogGroups',
                            'sqs:getqueueattributes'
                        ],
                        Effect: 'Allow'
                    })
                ])
            }
        });
    });

    test('creates S3 bucket with custom KMS encryption', () => {
        const key = new Key(stack, 'TestKey');
        new FriendlyEmbrace(stack, constructName, {
            encryption: key
        });
        template = getTemplateWithCdkNag(stack);
        template.hasResourceProperties('AWS::S3::Bucket', {
            BucketEncryption: {
                ServerSideEncryptionConfiguration: [
                    {
                        ServerSideEncryptionByDefault: {
                            SSEAlgorithm: 'aws:kms',
                            KMSMasterKeyID: Match.anyValue()
                        }
                    }
                ]
            }
        });
    });

    test('sets ignoreInvalidStates in custom resource properties', () => {
        new FriendlyEmbrace(stack, 'TestFriendlyEmbrace', {
            ignoreInvalidStates: true
        });
        template = getTemplateWithCdkNag(stack);
        template.hasResourceProperties('Custom::FriendlyEmbrace', {
            ignoreInvalidStates: true
        });
    });
});
