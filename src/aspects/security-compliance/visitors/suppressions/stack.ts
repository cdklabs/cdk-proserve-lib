// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';
import { SecurityCompliance } from '../..';
import { CdkNagMetadata, CdkNagSuppression } from '../../types/cdk-nag';
import { BaseVisitor } from '../base';

export class StackSuppressionsVisitor extends BaseVisitor<
    Stack,
    SecurityCompliance.Suppressions
> {
    public override canVisit(node: IConstruct): node is Stack {
        return Stack.isStack(node);
    }

    public override visit(node: Stack): void {
        if (!this.settings) return;

        const suppressions: CdkNagSuppression[] = [];
        const existingMetadata = node.templateOptions.metadata as
            | CdkNagMetadata
            | undefined;
        const existingRules = existingMetadata?.cdk_nag?.rules_to_suppress;

        if (this.settings?.cdkCommonGrants) {
            suppressions.push({
                id: 'AwsSolutions-IAM5',
                reason: this.settings.cdkCommonGrants,
                appliesTo: [
                    'Action::kms:ReEncrypt*',
                    'Action::kms:GenerateDataKey*',
                    'Action::s3:GetBucket*',
                    'Action::s3:GetObject*',
                    'Action::s3:List*',
                    'Action::s3:DeleteObject*',
                    'Action::s3:Abort*'
                ]
            });
        }
        if (this.settings?.iamNoInlinePolicies) {
            suppressions.push({
                id: 'NIST.800.53.R5-IAMNoInlinePolicy',
                reason: this.settings.iamNoInlinePolicies
            });
        }

        if (this.settings?.lambdaNoDlq) {
            suppressions.push({
                id: 'NIST.800.53.R5-LambdaDLQ',
                reason: this.settings.lambdaNoDlq
            });
        }

        if (this.settings?.lambdaNotInVpc) {
            suppressions.push({
                id: 'NIST.800.53.R5-LambdaInsideVPC',
                reason: this.settings.lambdaNotInVpc
            });
        }

        if (this.settings?.s3BucketReplication) {
            suppressions.push({
                id: 'NIST.800.53.R5-S3BucketReplicationEnabled',
                reason: this.settings.s3BucketReplication
            });
        }

        if (suppressions.length > 0) {
            node.addMetadata('cdk_nag', {
                rules_to_suppress: [...(existingRules ?? []), ...suppressions]
            });
        }
    }
}
