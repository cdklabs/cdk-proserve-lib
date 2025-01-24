// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CfnResource, IAspect, RemovalPolicy } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

/**
 * Properties for configuring the removal policy settings
 */
export interface ApplyRemovalPolicyProps {
    /**
     * The removal policy to apply to the resource
     */
    readonly removalPolicy: RemovalPolicy;
}

/**
 * Sets a user specified Removal Policy to all resources that the aspect applies
 * to.
 *
 * This Aspect is useful if you want to enforce a specified removal policy on
 * resources. For example, you could ensure that your removal policy is always
 * set to RETAIN or DESTROY.
 *
 * @example
 *
 * import { App, Aspects, RemovalPolicy } from 'aws-cdk-lib';
 * import { ApplyRemovalPolicy } from '@cdklabs/cdk-proserve-lib/aspects';
 *
 * const app = new App();
 *
 * Aspects.of(app).add(
 *   new ApplyRemovalPolicy({ removalPolicy: RemovalPolicy.DESTROY })
 * );
 */
export class ApplyRemovalPolicy implements IAspect {
    /**
     * Creates a new instance of SetRemovalPolicy
     * @param props Configuration properties for removal policy
     */
    constructor(private readonly props: ApplyRemovalPolicyProps) {}

    /**
     * Visits a construct and applies the removal policy
     * @param node The construct being visited
     */
    visit(node: IConstruct): void {
        if (node instanceof CfnResource) {
            node.applyRemovalPolicy(this.props.removalPolicy);
        }
    }
}
