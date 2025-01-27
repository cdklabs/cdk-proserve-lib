// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { IAspect } from 'aws-cdk-lib';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { IConstruct } from 'constructs';

/**
 * Enforces SSL/TLS requirements on Simple Queue Service (SQS) for all resources
 * that the aspect applies to.
 *
 * This is accomplished by adding a resource policy to any SQS queue that denies
 * all actions when the request is not made over a secure transport.
 *
 * @example
 * import { App, Aspects } from 'aws-cdk-lib';
 * import { SqsRequireSsl } from '@cdklabs/cdk-proserve-lib/aspects';
 *
 * const app = new App();
 *
 * Aspects.of(app).add(new SqsRequireSsl());
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
