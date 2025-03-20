// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { NagSuppressions } from 'cdk-nag';
import { SqsRequireSsl } from '../../../src/aspects/sqs-require-ssl';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

describeCdkTest(SqsRequireSsl, (id, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();
    });

    it('adds SSL requirement policy to SQS queue', () => {
        // Arrange
        const queue = new Queue(stack, id);
        NagSuppressions.addResourceSuppressions(queue, [
            {
                id: 'AwsSolutions-SQS3',
                reason: 'This queue does not need a DLQ as it is just used for testing the Aspect.'
            }
        ]);

        // Act
        Aspects.of(stack).add(new SqsRequireSsl());

        // Assert
        const template = getTemplate();
        template.hasResourceProperties('AWS::SQS::QueuePolicy', {
            PolicyDocument: {
                Statement: [
                    {
                        Action: 'sqs:*',
                        Condition: {
                            Bool: {
                                'aws:SecureTransport': 'false'
                            }
                        },
                        Effect: 'Deny',
                        Principal: {
                            AWS: '*'
                        },
                        Resource: {
                            'Fn::GetAtt': [Match.stringLikeRegexp(id), 'Arn']
                        }
                    }
                ],
                Version: '2012-10-17'
            }
        });
    });
});
