// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export interface Suppressions {
    /**
     * Suppressions to add for CDK Nag on CDK generated policies. If set to true,
     * this will add a stack suppression for `AwsSolutions-IAM5` on the actions
     * that CDK commonly generates when using `.grant(...)` methods.
     */
    readonly iamCommonCdkGrants?: string;

    /**
     * Adds a stack suppression for `NIST.800.53.R5-IAMNoInlinePolicy`. CDK
     * commonly uses inline policies when adding permissions.
     */
    readonly iamNoInlinePolicies?: string;

    /**
     * Suppressions to add for CDK Nag on CDK generated resources. If set to
     * true, this will suppress `AwsSolutions-IAM5` on the policies that are
     * created by CDK Generated Lambda functions, as well as other CDK generated
     * resources such as Log Groups and Step Functions that support CDK
     * generated custom resources. This only applies to resources that are
     * created by the underlying CDK.
     *
     * - Policy suppression: AwsSolutions-IAM5
     * - Log Group suppression: NIST.800.53.R5-CloudWatchLogGroupEncrypted
     * - Step Function suppression: AwsSolutions-SF1
     */
    readonly cdkGenerated?: string;

    /**
     * Adds a stack suppression for `NIST.800.53.R5-LambdaDLQ`.
     */
    readonly lambdaNoDlq?: string;

    /**
     * Adds a stack suppression for `NIST.800.53.R5-LambdaInsideVPC`.
     */
    readonly lambdaNotInVpc?: string;

    /**
     * Adds a stack suppression for `NIST.800.53.R5-S3BucketReplicationEnabled`.
     */
    readonly s3BucketReplication?: string;
}
