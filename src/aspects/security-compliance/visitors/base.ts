// base-visitor.ts
import { IConstruct } from 'constructs';

export abstract class BaseVisitor<T extends IConstruct, S> {
    constructor(protected readonly settings?: S) {}

    /**
     * Checks if this visitor can handle the given construct
     */
    public abstract canVisit(node: IConstruct): node is T;

    /**
     * Apply compliance settings to the construct
     */
    public abstract visit(node: T): void;
}
