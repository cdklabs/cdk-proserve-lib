/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */
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
 * Aspect that sets log retention period for CloudWatch Log Groups
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
