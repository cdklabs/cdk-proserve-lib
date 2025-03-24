import { CfnFunction } from 'aws-cdk-lib/aws-lambda';
import { IConstruct } from 'constructs';
import { LambdaSettings } from '../types';
import { BaseVisitor } from './base';

export class LambdaVisitor extends BaseVisitor<CfnFunction, LambdaSettings> {
    public override canVisit(node: IConstruct): node is CfnFunction {
        return node instanceof CfnFunction;
    }

    public override visit(node: CfnFunction): void {
        console.log('Visiting Lambda', node.node.path);
        if (
            !this.settings?.reservedConcurrentExecutions?.disabled &&
            !node.reservedConcurrentExecutions
        ) {
            node.reservedConcurrentExecutions =
                this.settings?.reservedConcurrentExecutions?.concurrentExecutionCount;
        }
    }
}
