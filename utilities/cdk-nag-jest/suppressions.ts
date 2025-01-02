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

import { Stack } from 'aws-cdk-lib';
import { NagSuppressions } from 'cdk-nag';
import { SecureFunction } from '../../src/constructs/secure-function';

/**
 * Adds common suppressions to the entire stack.
 * @param stack the stack to add suppressions to.
 */
export function addCommonStackSuppressions(stack: Stack) {
    NagSuppressions.addStackSuppressions(
        stack,
        [
            {
                id: 'NIST.800.53.R5-LambdaInsideVPC',
                reason: 'User is given the option to place Lambda in VPC.'
            },
            {
                id: 'NIST.800.53.R5-IAMNoInlinePolicy',
                reason: 'Inline policies are automatically created by CDK grants.'
            },
            {
                id: 'AwsSolutions-IAM4',
                reason: 'AWS Managed Roles are CDK defaults for backend Lambdas.',
                appliesTo: [
                    'Policy::arn:<AWS::Partition>:iam::aws:policy/EC2InstanceProfileForImageBuilder', // TODO: Replace with managed role
                    'Policy::arn:<AWS::Partition>:iam::aws:policy/AmazonSSMManagedInstanceCore' // TODO: Replace with managed role
                ]
            },
            {
                id: 'NIST.800.53.R5-LambdaDLQ',
                reason: 'User is given the option to set a DLQ for Lambda.'
            },
            {
                id: 'AwsSolutions-IAM5',
                reason: 'Set by CDK grants for KMS permissions.',
                appliesTo: [
                    'Action::kms:ReEncrypt*',
                    'Action::kms:GenerateDataKey*'
                ]
            }
        ],
        true
    );
}

/**
 * Determines a given resource type for all resources in a stack and adds
 * specific suppressions to it based on its type.
 * @param stack
 */
export function addCommonResourceSuppressions(stack: Stack) {
    stack.node.findAll().forEach((child) => {
        if (child instanceof SecureFunction) {
            addSuppressionsForSecureFunction(child);
        }
    });
}

/**
 * Adds suppressions to a given SecureFunction.
 * @param resource the SecureFunction to add suppressions to.
 */
function addSuppressionsForSecureFunction(resource: SecureFunction) {
    NagSuppressions.addResourceSuppressions(
        resource,
        [
            {
                id: 'NIST.800.53.R5-CloudWatchLogGroupEncrypted',
                reason: 'User is given the option to set encryption on log group.'
            }
        ],
        true
    );
}
