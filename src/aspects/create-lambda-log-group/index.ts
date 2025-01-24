// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { IAspect } from 'aws-cdk-lib';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { IConstruct } from 'constructs';

/**
 * Ensures that Lambda log groups are created for all Lambda functions that the
 * aspect applies to.
 *
 * @example
 * cdk.Aspects.of(app).add(new CreateLambdaLogGroup());
 */
export class CreateLambdaLogGroup implements IAspect {
    /**
     * Visits a construct and creates a log group if the construct is a Lambda function.
     * @param node The construct being visited
     */
    visit(node: IConstruct): void {
        if (node instanceof Function) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            node.logGroup; // Calling property forces creation of log group
        }
    }
}
