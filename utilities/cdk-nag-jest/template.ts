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
