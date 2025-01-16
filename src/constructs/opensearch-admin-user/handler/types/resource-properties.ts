// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

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
