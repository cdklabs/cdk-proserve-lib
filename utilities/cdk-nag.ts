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
import { Annotations, Match } from 'aws-cdk-lib/assertions';
import {
    AwsSolutionsChecks,
    NIST80053R5Checks,
    NagSuppressions
} from 'cdk-nag';

class CdkNagError extends Error {
    constructor(
        message: string,
        public annotations: any[]
    ) {
        super(message);
        this.name = 'CdkNagError';
    }
}

export function addCdkNagPacks(stack: Stack) {
    Aspects.of(stack).add(new AwsSolutionsChecks({ verbose: true }));
    Aspects.of(stack).add(new NIST80053R5Checks({ verbose: true }));
}

export function checkForCdkNagIssues(stack: Stack, constructName: string) {
    const allIssues: { type: string; pattern: string; annotations: any[] }[] =
        [];

    const checkAnnotations = (type: 'warning' | 'error', pattern: string) => {
        const method = type === 'warning' ? 'findWarning' : 'findError';
        const allAnnotations = Annotations.fromStack(stack)[method](
            '*',
            Match.stringLikeRegexp(pattern)
        );

        // Filter annotations to only include those with constructName in a.id
        const annotations = allAnnotations.filter(
            (a) =>
                a.id.includes(constructName) &&
                !a.id.includes('framework-onEvent')
        );

        if (annotations.length > 0) {
            allIssues.push({ type, pattern, annotations });
        }
    };

    checkAnnotations('warning', 'NIST.*');
    checkAnnotations('warning', 'AwsSolutions-.*');
    checkAnnotations('error', 'NIST.*');
    checkAnnotations('error', 'AwsSolutions-.*');

    if (allIssues.length > 0) {
        const message = allIssues
            .map((issue) => {
                const issueMessage = `Found ${issue.annotations.length} ${issue.pattern} ${issue.type}(s):\n`;
                const details = issue.annotations
                    .map((a) => `${a.id}\n${a.entry.data}`)
                    .join('\n');
                return `${issueMessage}\n${details}`;
            })
            .join('\n\n');

        const allAnnotations = allIssues.flatMap((issue) => issue.annotations);
        throw new CdkNagError(message, allAnnotations);
    }
}

export function addCdkNagCommonSuppressions(stack: Stack) {
    NagSuppressions.addStackSuppressions(
        stack,
        [
            {
                id: 'NIST.800.53.R5-LambdaInsideVPC',
                reason: 'The user is given the option to place Lambda in VPC.'
            },
            {
                id: 'NIST.800.53.R5-IAMNoInlinePolicy',
                reason: 'Inline policies are automatically created by CDK grants.'
            },
            {
                id: 'AwsSolutions-IAM4',
                reason: 'AWS Managed Roles are CDK defaults for backend Lambdas.'
            },
            {
                id: 'NIST.800.53.R5-LambdaDLQ',
                reason: 'The user is given the option to set a DLQ for Lambda.'
            }
        ],
        true
    );
}
