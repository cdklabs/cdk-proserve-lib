// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CfnStage } from 'aws-cdk-lib/aws-apigateway';
import { IConstruct } from 'constructs';
import { ApiGatewaySettings } from '../../types';
import { BaseVisitor } from '../base';

export class ApiGatewayVisitor extends BaseVisitor<
    CfnStage,
    ApiGatewaySettings
> {
    public override canVisit(node: IConstruct): node is CfnStage {
        return node instanceof CfnStage;
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
