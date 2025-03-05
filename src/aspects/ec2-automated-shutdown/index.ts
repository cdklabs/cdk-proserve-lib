// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'path';
import { Stack, Duration, IAspect, Aws, CfnResource } from 'aws-cdk-lib';
import { Metric, Alarm, ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import { LambdaAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import { CfnInstance } from 'aws-cdk-lib/aws-ec2';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Code, Runtime, RuntimeManagementMode } from 'aws-cdk-lib/aws-lambda';
import { IConstruct } from 'constructs';
import { SecureFunction } from '../../constructs/secure-function';
import { LambdaConfiguration } from '../../types/lambda-configuration';

/**
 * Optional custom metric configuration for CloudWatch Alarms.
 * If not provided, defaults to CPU utilization with a 5% threshold.
 */
export interface AlarmConfig {
    /**
     * The name of the CloudWatch metric to monitor
     * @default = CPUUtilization
     */
    readonly metricName: Ec2MetricName;
    /**
     * The period over which the metric is measured
     * @default = 1 minute
     */
    readonly period: Duration;
    /**
     * The CloudWatch metric statistic to use
     * @default = 'Average'
     */
    readonly statistic: string;
    /**
     * The threshold value for the alarm
     * @default = 5%
     */
    readonly threshold: number;
    /**
     * The number of periods over which data is compared to the specified threshold
     * @default = 3
     */
    readonly evaluationPeriods: number;
    /**
     * The number of datapoints that must go past/below the threshold to trigger the alarm
     * @default = 2
     */
    readonly datapointsToAlarm: number;
    /**
     * The comparison operator to use for the alarm
     * @default = ComparisonOperator.LESS_THAN_THRESHOLD
     */
    readonly comparisonOperator: ComparisonOperator;
}

export interface Ec2AutomatedShutdownProps {
    /**
     * Optional custom metric configuration.
     * If not provided, defaults to CPU utilization with a 5% threshold.
     */

    readonly alarmConfig?: AlarmConfig;

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
 * an EC2 instance when an alarm is triggered based off of a provided metric .
 * Allows for cost optimization and the reduction of resources not being actively used.
 */
export class Ec2AutomatedShutdown implements IAspect {
    // private static policyByStack: Map<string, PolicyStatement> = new Map();
    private static lambdaByStack: Map<string, SecureFunction> = new Map();
    private static instanceArnsByStack: Map<string, Set<string>> = new Map();
    private processedInstances: Set<string> = new Set();

    private readonly defaultAlarmConfig: AlarmConfig = {
        metricName: Ec2MetricName.CPUUTILIZATION,
        period: Duration.minutes(1),
        statistic: 'Average',
        threshold: 5,
        evaluationPeriods: 3,
        datapointsToAlarm: 2,
        comparisonOperator: ComparisonOperator.LESS_THAN_THRESHOLD
    };

    constructor(private readonly props: Ec2AutomatedShutdownProps = {}) {}

    visit(node: IConstruct): void {
        const cfnResource = node as CfnResource;
        if (
            cfnResource.cfnResourceType !== CfnInstance.CFN_RESOURCE_TYPE_NAME
        ) {
            return;
        }
        const stack = Stack.of(node);
        const cfnInstance = node as CfnInstance;

        if (this.processedInstances.has(cfnInstance.ref)) {
            return;
        }

        // Add instance to processed set
        this.processedInstances.add(cfnInstance.ref);
        this.createShutdownMechanism(cfnInstance, stack);
    }

    private getLambdaFunction(
        stack: Stack,
        instanceArn: string
    ): SecureFunction {
        const stackId = stack.stackId;
        if (!Ec2AutomatedShutdown.lambdaByStack.has(stackId)) {
            const lambda = new SecureFunction(stack, 'Ec2ShutdownFunction', {
                code: Code.fromAsset(join(__dirname, 'handler')),
                runtime: Runtime.NODEJS_20_X,
                handler: 'index.handler',
                timeout: Duration.seconds(15),
                encryption: this.props.encryption,
                ...this.props.lambdaConfiguration,
                runtimeManagementMode: RuntimeManagementMode.AUTO,
                initialPolicy: [
                    new PolicyStatement({
                        actions: ['ec2:StopInstances'],
                        effect: Effect.ALLOW,
                        resources: [instanceArn]
                    })
                ]
            });
            Ec2AutomatedShutdown.lambdaByStack.set(stackId, lambda);
        } else {
            const lambda = Ec2AutomatedShutdown.lambdaByStack.get(stackId)!;
            lambda.function.addToRolePolicy(
                new PolicyStatement({
                    actions: ['ec2:StopInstances'],
                    effect: Effect.ALLOW,
                    resources: [instanceArn]
                })
            );
        }
        return Ec2AutomatedShutdown.lambdaByStack.get(stackId)!;
    }

    private createShutdownMechanism(instance: IConstruct, stack: Stack): void {
        const stackId = stack.stackId;

        if (!Ec2AutomatedShutdown.instanceArnsByStack.has(stackId)) {
            Ec2AutomatedShutdown.instanceArnsByStack.set(stackId, new Set());
        }

        let instanceId: string;
        if (instance instanceof CfnInstance) {
            instanceId = instance.ref;
        } else {
            throw new Error('Unsupported instance type');
        }

        const instanceArn = `arn:${Aws.PARTITION}:ec2:${Aws.REGION}:${Aws.ACCOUNT_ID}:instance/${instanceId}`;
        Ec2AutomatedShutdown.instanceArnsByStack.get(stackId)?.add(instanceArn);

        const lambdaFunction = this.getLambdaFunction(stack, instanceArn);

        const alarmConfig = this.props.alarmConfig || this.defaultAlarmConfig;

        const metric = new Metric({
            namespace: 'AWS/EC2',
            metricName: alarmConfig.metricName as string,
            dimensionsMap: { InstanceId: instanceId },
            period: alarmConfig.period,
            statistic: alarmConfig.statistic
        });

        const alarm = new Alarm(
            instance,
            `${metric.metricName}-${instance.node.addr}`,
            {
                metric: metric,
                threshold: alarmConfig.threshold,
                evaluationPeriods: alarmConfig.evaluationPeriods,
                comparisonOperator: alarmConfig.comparisonOperator,
                datapointsToAlarm: alarmConfig.datapointsToAlarm
            }
        );

        alarm.addAlarmAction(new LambdaAction(lambdaFunction.function));
    }
}

/** CloudWatch Alarm Metric Names */
export enum Ec2MetricName {
    CPUUTILIZATION = 'CPUUtilization',
    DISKREADOPS = 'DiskReadOps',
    DISKWRITEOPS = 'DiskWriteOps',
    DISKREADBYTES = 'DiskReadBytes',
    DISKWRITEBYTES = 'DiskWriteBytes',
    NETWORKIN = 'NetworkIn',
    NETWORKOUT = 'NetworkOut',
    NETWORKPACKETSIN = 'NetworkPacketsIn',
    NETWORKPACKETSOUT = 'NetworkPacketsOut',
    STATUSCHECKFAILED = 'StatusCheckFailed',
    STATUSCHECKFAILED_INSTANCE = 'StatusCheckFailed_Instance',
    STATUSCHECKFAILED_SYSTEM = 'StatusCheckFailed_System',
    METADATANOTOKEN = 'MetadataNoToken',
    CPUCREDITUSAGE = 'CPUCreditUsage',
    CPUCREDITBALANCE = 'CPUCreditBalance',
    CPUSURPLUSCREDITBALANCE = 'CPUSurplusCreditBalance',
    CPUSURPLUSCREDITSCHARGED = 'CPUSurplusCreditsCharged'
}
/** End CloudWatch Alarm Metric Names */
