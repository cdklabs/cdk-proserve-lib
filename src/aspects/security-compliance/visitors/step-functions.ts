import { CfnStateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { StepFunctionsSettings } from '../types';
import { BaseVisitor } from './base';
import { IConstruct } from 'constructs';

export class StepFunctionsVisitor extends BaseVisitor<
    CfnStateMachine,
    StepFunctionsSettings
> {
    public override canVisit(node: IConstruct): node is CfnStateMachine {
        return node instanceof CfnStateMachine;
    }

    public override visit(node: CfnStateMachine): void {
        if (
            !this.settings?.xRayTracing?.disabled &&
            !node.tracingConfiguration
        ) {
            node.tracingConfiguration = {
                enabled: true
            };
        }
    }
}
