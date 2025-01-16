// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AwsSolutionsChecks, NIST80053R5Checks } from 'cdk-nag';
import {
    addCommonResourceSuppressions,
    addCommonStackSuppressions
} from './suppressions';

/**
 * Get a Template object for testing purposes with CDK Nag checks and
 * suppressions added to it.
 *
 * @param stack Stack to get the Template from and attach CDK nag to
 * @param resourceSuppressions if resource suppressions should be added. Default: true
 * @param stackSuppressions if stack suppressions should be added. Default: true
 * @returns
 */
export function getTemplateWithCdkNag(
    stack: Stack,
    resourceSuppressions: boolean = true,
    stackSuppressions: boolean = true
): Template {
    Aspects.of(stack).add(new AwsSolutionsChecks({ verbose: true }));
    Aspects.of(stack).add(new NIST80053R5Checks({ verbose: true }));

    if (resourceSuppressions) {
        addCommonResourceSuppressions(stack);
    }
    if (stackSuppressions) {
        addCommonStackSuppressions(stack);
    }

    return Template.fromStack(stack);
}
