import { IConstruct } from 'constructs';
import { BaseVisitor } from './base';

export class VisitorRegistry {
    private visitors: BaseVisitor<IConstruct, unknown>[] = [];

    public register(visitor: BaseVisitor<IConstruct, unknown>): void {
        this.visitors.push(visitor);
    }

    public visitNode(node: IConstruct): void {
        for (const visitor of this.visitors) {
            if (visitor.canVisit(node)) {
                visitor.visit(node);
            }
        }
    }
}
