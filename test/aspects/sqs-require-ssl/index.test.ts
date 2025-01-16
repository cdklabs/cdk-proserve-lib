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

import { Aspects, Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { NagSuppressions } from 'cdk-nag';
import { SqsRequireSsl } from '../../../src/aspects/sqs-require-ssl';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';

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
