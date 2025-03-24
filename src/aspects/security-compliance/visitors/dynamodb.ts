import { CfnTable } from 'aws-cdk-lib/aws-dynamodb';
import { DynamoDbSettings } from '../types';
import { BaseVisitor } from './base';
import { IConstruct } from 'constructs';

export class DynamoDbVisitor extends BaseVisitor<CfnTable, DynamoDbSettings> {
    public override canVisit(node: IConstruct): node is CfnTable {
        return node instanceof CfnTable;
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
