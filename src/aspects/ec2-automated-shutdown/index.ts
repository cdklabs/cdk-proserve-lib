// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'path';
import { Stack, Duration, IAspect, Aws, CfnResource } from 'aws-cdk-lib';
import { Metric, Alarm, ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import { LambdaAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import { CfnInstance } from 'aws-cdk-lib/aws-ec2';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { IConstruct } from 'constructs';
import { SecureFunction } from '../../constructs/secure-function';
import { LambdaConfiguration } from '../../types/lambda-configuration';
import { Ec2MetricName } from './types';

export interface CustomMetricConfig {
    readonly metricName: Ec2MetricName;
    readonly period: Duration;
    readonly statistic: string;
    readonly threshold: number;
}

export interface Ec2ShutdownProps {
    /**
     * Optional custom metric configuration.
     * If not provided, defaults to CPU utilization with a 5% threshold.
     */

    readonly metricConfig?: CustomMetricConfig;

    /**
     * Optional Lambda configuration settings.
     */
    readonly lambdaConfiguration?: LambdaConfiguration;

    /**
     * Optional KMS Encryption Key to use for encrypting resources.
     */
    readonly encryption?: IKey;
}

/**
 * Aspect that applies a mechanism to automatically shut down
 * an EC2 instance when its CPU utilization falls below a specified threshold.
 * Allows for cost optimization and the reduction of resources not being actively used.
 */
export class Ec2AutomatedShutdown implements IAspect {
    // private static processedInstances: Set<string> = new Set();
    private static policyByStack: Map<string, PolicyStatement> = new Map();
    private static lambdaByStack: Map<string, SecureFunction> = new Map();
    private readonly defaultMetricConfig: CustomMetricConfig = {
        metricName: 'CPUUtilization',
        period: Duration.minutes(1),
        statistic: 'Average',
        threshold: 5
    };

    constructor(private readonly props: Ec2ShutdownProps) {}

    visit(node: IConstruct): void {
        const cfnResource = node as CfnResource;
        if (
            cfnResource.cfnResourceType !== CfnInstance.CFN_RESOURCE_TYPE_NAME
        ) {
            return;
        }
        const stack = Stack.of(node);
        const cfnInstance = node as CfnInstance;

        this.createShutdownMechanism(cfnInstance, stack);
    }

    private getLambdaFunction(stack: Stack): SecureFunction {
        const stackId = stack.stackId;
        if (!Ec2AutomatedShutdown.lambdaByStack.has(stackId)) {
            const lambda = new SecureFunction(stack, 'Ec2ShutdownFunction', {
                code: Code.fromAsset(join(__dirname, 'handler')),
                runtime: Runtime.NODEJS_20_X,
                handler: 'index.handler',
                timeout: Duration.seconds(15),
                encryption: this.props.encryption,
                ...this.props.lambdaConfiguration
            });

            if (!Ec2AutomatedShutdown.policyByStack.has(stackId)) {
                const policy = new PolicyStatement({
                    actions: ['ec2:StopInstances'],
                    effect: Effect.ALLOW
                });
                Ec2AutomatedShutdown.policyByStack.set(stackId, policy);
                lambda.role.addToPolicy(policy);
            }
            Ec2AutomatedShutdown.lambdaByStack.set(stackId, lambda);
        }
        return Ec2AutomatedShutdown.lambdaByStack.get(stackId)!;
    }

    private addInstanceToPolicy(instance: CfnInstance, stack: Stack): void {
        const stackId = stack.stackId;
        const policy = Ec2AutomatedShutdown.policyByStack.get(stackId);

        if (!policy) {
            throw new Error('Policy not initialized');
        }

        const instanceArn = `arn:${Aws.PARTITION}:ec2:${Aws.REGION}:${Aws.ACCOUNT_ID}:instance/${instance.ref}`;

        policy.addResources(instanceArn);
    }

    private createShutdownMechanism(instance: IConstruct, stack: Stack): void {
        console.log(
            'Creating shutdown mechanism for instance:',
            instance.node.id
        );

        const lambdaFunction = this.getLambdaFunction(stack);

        let instanceId: string;
        if (instance instanceof CfnInstance) {
            instanceId = instance.ref;
        } else {
            throw new Error('Unsupported instance type');
        }

        this.addInstanceToPolicy(instance, stack);

        const metricConfig =
            this.props.metricConfig || this.defaultMetricConfig;

        const metric = new Metric({
            namespace: 'AWS/EC2',
            metricName: metricConfig.metricName as string,
            dimensionsMap: { InstanceId: instanceId },
            period: metricConfig.period,
            statistic: metricConfig.statistic
        });

        const alarm = new Alarm(
            instance,
            `${metric.metricName}-${instance.node.addr}`,
            {
                metric: metric,
                threshold: metricConfig.threshold,
                evaluationPeriods: 2,
                comparisonOperator: ComparisonOperator.LESS_THAN_THRESHOLD,
                datapointsToAlarm: 2
            }
        );

        alarm.addAlarmAction(new LambdaAction(lambdaFunction.function));
    }
}
