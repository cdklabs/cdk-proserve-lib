import { ISecurityGroup, IVpc, SubnetSelection } from 'aws-cdk-lib/aws-ec2';
import { IQueue } from 'aws-cdk-lib/aws-sqs';

export interface LambdaConfiguration {
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
     * VPC where the Lambda functions will be deployed
     */
    readonly vpc?: IVpc;
    /**
     * Optional subnet selection for the Lambda functions
     */
    readonly subnets?: SubnetSelection;
}

export interface CustomResourceLambdaConfiguration {
    /**
     * VPC where the Lambda functions will be deployed
     */
    readonly vpc?: IVpc;
    /**
     * Optional subnet selection for the Lambda functions
     */
    readonly subnets?: SubnetSelection;
}
