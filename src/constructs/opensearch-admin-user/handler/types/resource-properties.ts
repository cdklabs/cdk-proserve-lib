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

/**
 * Invocation properties for the Custom Resource
 */
export interface ResourceProperties {
    /**
     * Name of the OpenSearch domain
     */
    readonly DomainName: string;

    /**
     * Name of the AWS Systems Manager Parameter Store parameter that contains the admin user username
     */
    readonly UsernameParameterName: string;

    /**
     * Name of the AWS Systems Manager Parameter Store parameter that contains the admin user password
     * Either this or the `PasswordSecretArn` must be specified
     */
    readonly PasswordParameterName?: string;

    /**
     * ARN of the AWS Secrets Manager secret that contains the admin user password
     * Either this or the `PasswordParameterName` must be specified
     */
    readonly PasswordSecretArn?: string;
}
