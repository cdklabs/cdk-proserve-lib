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

import { ISecurityGroup, IVpc, SubnetSelection } from 'aws-cdk-lib/aws-ec2';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { IQueue } from 'aws-cdk-lib/aws-sqs';

interface BaseLambdaConfiguration {
    /**
     * VPC where the Lambda functions will be deployed
     */
    readonly vpc?: IVpc;
    /**
     * Optional subnet selection for the Lambda functions
     */
    readonly subnets?: SubnetSelection;
}

export interface LambdaConfiguration extends BaseLambdaConfiguration {
    /**
     * The number of concurrent executions for the provider Lambda function.
     * Default: 5
     */
    readonly reservedConcurrentExecutions?: number;

    /**
     * Security groups to attach to the provider Lambda functions
     */
    readonly securityGroups?: ISecurityGroup[];
    /**
     * Optional SQS queue to use as a dead letter queue
     */
    readonly deadLetterQueue?: IQueue;

    /**
     * Optional retention period for the Lambda functions log group.
     *
     * @default RetentionDays.ONE_MONTH
     */
    readonly logGroupRetention?: RetentionDays;
}

export interface AwsCustomResourceLambdaConfiguration
    extends BaseLambdaConfiguration {}
