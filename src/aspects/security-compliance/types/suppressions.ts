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
     * Suppressions to add for CDK Nag on CDK generated Lambdas. If set to true,
     * this will suppress `AwsSolutions-IAM5` on the policies that are auto
     * created by CDK Generated Lambda functions.
     */
    readonly cdkGeneratedLambdas?: string;

    /**
     * Adds a stack suppression for `NIST.800.53.R5-LambdaDLQ`.
     */
    readonly lambdaNoDlq?: string;

    /**
     * Adds a stack suppression for `NIST.800.53.R5-LambdaInsideVPC`.
     */
    readonly lambdaNotInVpc?: string;

    // readonly s3ServerAccessLogs?: string;

    /**
     * Adds a stack suppression for `NIST.800.53.R5-S3BucketReplicationEnabled`.
     */
    readonly s3BucketReplication?: string;
}
