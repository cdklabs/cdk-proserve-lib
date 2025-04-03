// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CfnResource } from 'aws-cdk-lib';
import { CfnStage } from 'aws-cdk-lib/aws-apigateway';
import { IConstruct } from 'constructs';
import { SecurityCompliance } from '../..';
import { BaseVisitor } from '../base';

export class ApiGatewayVisitor extends BaseVisitor<
    CfnStage,
    SecurityCompliance.ApiGatewaySettings
> {
    public override canVisit(node: IConstruct): node is CfnStage {
        return (
            (node as CfnResource).cfnResourceType ===
            CfnStage.CFN_RESOURCE_TYPE_NAME
        );
    }

    public override visit(node: CfnStage): void {
        if (
            !this.settings?.stageMethodLogging?.disabled &&
            !node.methodSettings
        ) {
            node.methodSettings = [
                {
                    loggingLevel:
                        this.settings?.stageMethodLogging?.loggingLevel,
                    httpMethod: '*',
                    resourcePath: '/*',
                    dataTraceEnabled: false
                }
            ];
        }
    }
}
