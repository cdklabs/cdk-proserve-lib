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
 * Aspect that applies the provided Removal Policy to all resources
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
