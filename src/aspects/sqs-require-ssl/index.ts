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

import { IAspect } from 'aws-cdk-lib';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { IConstruct } from 'constructs';

/**
 * An aspect that enforces SSL/TLS requirements for SQS queues.
 * When applied to a CDK construct, it adds a resource policy to any SQS queue
 * that denies all actions when the request is not made over a secure transport.
 */
export class SqsRequireSsl implements IAspect {
    /**
     * Visits a construct and adds SSL/TLS requirement policy if it's an SQS queue.
     * @param node The construct being visited
     */
    visit(node: IConstruct): void {
        if (node instanceof Queue) {
            node.addToResourcePolicy(
                new PolicyStatement({
                    actions: ['sqs:*'],
                    effect: Effect.DENY,
                    principals: [new AnyPrincipal()],
                    resources: [node.queueArn],
                    conditions: {
                        Bool: {
                            'aws:SecureTransport': 'false'
                        }
                    }
                })
            );
        }
    }
}
