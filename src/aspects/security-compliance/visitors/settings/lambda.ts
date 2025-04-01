// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CfnResource } from 'aws-cdk-lib';
import { CfnFunction } from 'aws-cdk-lib/aws-lambda';
import { IConstruct } from 'constructs';
import { LambdaSettings } from '../../types';
import { BaseVisitor } from '../base';

export class LambdaVisitor extends BaseVisitor<CfnFunction, LambdaSettings> {
    public override canVisit(node: IConstruct): node is CfnFunction {
        return (
            (node as CfnResource).cfnResourceType ===
            CfnFunction.CFN_RESOURCE_TYPE_NAME
        );
    }

    public override visit(node: CfnFunction): void {
        if (
            !this.settings?.reservedConcurrentExecutions?.disabled &&
            !node.reservedConcurrentExecutions
        ) {
            node.reservedConcurrentExecutions =
                this.settings?.reservedConcurrentExecutions?.concurrentExecutionCount;
        }
    }
}
