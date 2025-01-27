// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CfnResource, IAspect } from 'aws-cdk-lib';
import { CfnLogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { IConstruct } from 'constructs';

/**
 * Properties for configuring log retention settings
 */
export interface SetLogRetentionProps {
    /**
     * The retention period for the logs
     */
    readonly period: RetentionDays;
}

/**
 * Aspect that sets the log retention period for CloudWatch log groups to a
 * user-supplied retention period.
 *
 * @example
 *
 * import { App, Aspects } from 'aws-cdk-lib';
 * import { RetentionDays } from 'aws-cdk-lib/aws-logs';
 * import { SetLogRetention } from '@cdklabs/cdk-proserve-lib/aspects';
 *
 * const app = new App();
 *
 * Aspects.of(app).add(
 *   new SetLogRetention({ period: RetentionDays.EIGHTEEN_MONTHS })
 * );
 */
export class SetLogRetention implements IAspect {
    /**
     * Creates a new instance of SetLogRetention
     * @param props Configuration properties for log retention
     */
    constructor(private readonly props: SetLogRetentionProps) {}

    /**
     * Visits a construct and sets log retention if applicable
     * @param node The construct being visited
     */
    visit(node: IConstruct): void {
        if (this.props.period !== RetentionDays.INFINITE) {
            if (node instanceof CfnLogGroup) {
                node.retentionInDays = this.props.period;
            } else if (
                node instanceof CfnResource &&
                node.cfnResourceType === 'Custom::LogRetention'
            ) {
                node.addPropertyOverride('RetentionInDays', this.props.period);
            }
        }
    }
}
