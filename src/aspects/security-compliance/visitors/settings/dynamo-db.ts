// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CfnResource } from 'aws-cdk-lib';
import { CfnTable } from 'aws-cdk-lib/aws-dynamodb';
import { IConstruct } from 'constructs';
import { DynamoDbSettings } from '../../types';
import { BaseVisitor } from '../base';

export class DynamoDbVisitor extends BaseVisitor<CfnTable, DynamoDbSettings> {
    public override canVisit(node: IConstruct): node is CfnTable {
        return (
            (node as CfnResource).cfnResourceType ===
            CfnTable.CFN_RESOURCE_TYPE_NAME
        );
    }

    public override visit(node: CfnTable): void {
        // Enable Point-in-Time Recovery
        if (
            !this.settings?.pointInTimeRecovery?.disabled &&
            !node.pointInTimeRecoverySpecification
        ) {
            node.pointInTimeRecoverySpecification = {
                pointInTimeRecoveryEnabled: true
            };
        }
    }
}
