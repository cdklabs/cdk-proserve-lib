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
     * Default: RetentionDays.ONE_WEEK
     */
    readonly logGroupRetention?: RetentionDays;
}

export interface AwsCustomResourceLambdaConfiguration
    extends BaseLambdaConfiguration {}
