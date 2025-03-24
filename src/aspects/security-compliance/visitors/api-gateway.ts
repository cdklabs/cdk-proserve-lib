import { CfnStage } from 'aws-cdk-lib/aws-apigateway';
import { IConstruct } from 'constructs';
import { ApiGatewaySettings } from '../types';
import { BaseVisitor } from './base';

export class ApiGatewayVisitor extends BaseVisitor<
    CfnStage,
    ApiGatewaySettings
> {
    public canVisit(node: IConstruct): node is CfnStage {
        return node instanceof CfnStage;
    }

    public visit(node: CfnStage): void {
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
