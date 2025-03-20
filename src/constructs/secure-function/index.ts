// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Function, FunctionProps } from 'aws-cdk-lib/aws-lambda';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { DefaultConfig } from '../../common/default-config';

/**
 * Properties for creating a SecureFunction
 * Extends FunctionProps from AWS Lambda Function to include additional
 * configurations.
 */
export interface SecureFunctionProps extends FunctionProps {
    /**
     * Optional retention period for the Lambda functions log group.
     * Default: RetentionDays.ONE_MONTH
     */
    readonly logGroupRetention?: RetentionDays;

    /**
     * Optional encryption key for the Lambda functions log group.
     */
    readonly encryption?: IKey;
}

/**
 * This construct creates a Lambda Function, IAM Role and Log Group and grants
 * specific permissions for the Lambda to write to the created Log Group. This
 * improves the baseline functionality of the Lambda function, as the original
 * implementation grants permissions to wildcard (*) logs. In addition, this
 * construct will set some sane defaults such as a default retention period of
 * 1 month for the log group and set the reserved concurrent executions to 5
 * instead of using the account limit.
 */
export class SecureFunction extends Construct {
    /** The Lambda function instance */
    public readonly function: Function;
    /** The CloudWatch log group for the Lambda function */
    public readonly logGroup: LogGroup;
    /** The IAM role assigned to the Lambda function */
    public readonly role: Role;

    /**
     * Creates a new SecureFunction
     * @param scope The construct scope
     * @param id The construct ID
     * @param props Configuration properties for the secure function
     */
    constructor(scope: Construct, id: string, props: SecureFunctionProps) {
        super(scope, id);

        const defaultProps: Partial<FunctionProps> = {
            reservedConcurrentExecutions: 5
        };

        this.role = new Role(this, 'Role', {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com')
        });

        if (props.vpc) {
            // Add necessary permissions to create Lambda in VPC
            this.role.addToPolicy(
                new PolicyStatement({
                    actions: [
                        'ec2:CreateNetworkInterface',
                        'ec2:DescribeNetworkInterfaces',
                        'ec2:DeleteNetworkInterface',
                        'ec2:AssignPrivateIpAddresses',
                        'ec2:UnassignPrivateIpAddresses'
                    ],
                    resources: ['*']
                })
            );
        }

        // Create the log group beforehand
        this.logGroup = new LogGroup(this, 'LogGroup', {
            retention: props.logGroupRetention
                ? props.logGroupRetention
                : DefaultConfig.logRetention,
            encryptionKey: props.encryption
        });

        this.function = new Function(this, 'Function', {
            ...defaultProps,
            ...props,
            environmentEncryption:
                props.encryption ?? props.environmentEncryption,
            logGroup: this.logGroup,
            role: this.role
        });

        // Grant permissions to use the key for lambda environment and logs
        if (props.encryption) {
            props.encryption.grantEncryptDecrypt(this.function);
            props.encryption.grantEncryptDecrypt(
                new ServicePrincipal('logs.amazonaws.com')
            );
        }

        // Grant the function permission to write to the log group
        this.logGroup.grantWrite(this.function);
    }
}
