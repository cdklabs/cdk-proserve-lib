// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CfnResource } from 'aws-cdk-lib';
import { CfnPolicy } from 'aws-cdk-lib/aws-iam';
import { CfnLogGroup } from 'aws-cdk-lib/aws-logs';
import { CfnStateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { IConstruct } from 'constructs';
import { Suppressions } from '../../types';
import { CdkNagSuppressions } from '../../types/cdk-nag';
import { BaseVisitor } from '../base';

export class CdkGeneratedSuppressionsVisitor extends BaseVisitor<
    CfnResource,
    Suppressions
> {
    public override canVisit(node: IConstruct): node is CfnResource {
        if (!(node instanceof CfnResource)) return false;

        const isSupportedResourceType =
            node.cfnResourceType === CfnPolicy.CFN_RESOURCE_TYPE_NAME ||
            node.cfnResourceType === CfnLogGroup.CFN_RESOURCE_TYPE_NAME ||
            node.cfnResourceType === CfnStateMachine.CFN_RESOURCE_TYPE_NAME;

        if (!isSupportedResourceType) return false;

        // Check if it's a CDK-generated resource
        return (
            node.node.path.includes('/framework-') ||
            node.node.path.includes('/waiter-state-machine/') ||
            node.node.path.includes(
                '/LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8a'
            )
        );
    }

    public override visit(node: CfnResource): void {
        if (!this.settings?.cdkGenerated) return;

        const existingMetadata = node.getMetadata('cdk_nag') as
            | CdkNagSuppressions
            | undefined;

        const suppressions = [...(existingMetadata?.rules_to_suppress ?? [])];

        if (node.cfnResourceType === CfnPolicy.CFN_RESOURCE_TYPE_NAME) {
            suppressions.push({
                id: 'AwsSolutions-IAM5',
                reason: this.settings.cdkGenerated
            });
        }
        if (node.cfnResourceType === CfnLogGroup.CFN_RESOURCE_TYPE_NAME) {
            suppressions.push({
                id: 'NIST.800.53.R5-CloudWatchLogGroupEncrypted',
                reason: this.settings.cdkGenerated
            });
        }
        if (node.cfnResourceType === CfnStateMachine.CFN_RESOURCE_TYPE_NAME) {
            suppressions.push({
                id: 'AwsSolutions-SF1',
                reason: this.settings.cdkGenerated
            });
        }

        node.addMetadata('cdk_nag', {
            rules_to_suppress: suppressions
        });
    }
}
