// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

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
