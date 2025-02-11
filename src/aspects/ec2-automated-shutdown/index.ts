// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'path';
<<<<<<< HEAD
import { Stack, Duration, IAspect, Aws } from 'aws-cdk-lib';
import { Metric, Alarm, ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import { LambdaAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import { Instance, CfnInstance } from 'aws-cdk-lib/aws-ec2';
import { PolicyStatement, Effect, AnyPrincipal } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { SnsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { IConstruct } from 'constructs';
import { SecureFunction } from '../../constructs/secure-function';
import { LambdaConfiguration } from '../../interfaces/lambda-configuration';

/**
 * Cleanup:
 * EC2 -> Ec2 : done
 * include name of instance in logical identifiers: done
 * PascalCase for naming + identifiers:
 */

export interface CustomMetricConfig {
    readonly metricName: string;
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
=======
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Stack, Duration } from 'aws-cdk-lib';
import { PolicyStatement, Effect, AnyPrincipal } from 'aws-cdk-lib/aws-iam';
import { Code } from 'aws-cdk-lib/aws-lambda';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Metric, Alarm, ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import { SnsEventSource} from 'aws-cdk-lib/aws-lambda-event-sources';
import { IAspect } from 'aws-cdk-lib';
import { Instance, CfnInstance } from 'aws-cdk-lib/aws-ec2';
import { IConstruct } from 'constructs';
import { SecureFunction } from '../../constructs/secure-function';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { LambdaConfiguration } from '../../interfaces/lambda-configuration';


export interface EC2ShutdownProps {
    /**
     * The % CPU threshold below which the instance will be shut down
     */
    readonly cpuThreshold: number;
>>>>>>> 2ac9be4 (ec2 automated shutdown aspect)

    /**
     * Optional Lambda configuration settings.
     */
<<<<<<< HEAD
    readonly lambdaConfiguration?: LambdaConfiguration;
=======
     readonly lambdaConfiguration?: LambdaConfiguration
>>>>>>> 2ac9be4 (ec2 automated shutdown aspect)

    /**
     * Optional KMS Encryption Key to use for encrypting resources.
     */
<<<<<<< HEAD
    readonly encryption?: IKey;
=======
    readonly encryption?: IKey; 
>>>>>>> 2ac9be4 (ec2 automated shutdown aspect)
}

/**
 * Aspect that applies a mechanism to automatically shut down
 * an EC2 instance when its CPU utilization falls below a specified threshold.
 * Allows for cost optimization and the reduction of resources not being actively used.
 */
export class Ec2AutomatedShutdown implements IAspect {
<<<<<<< HEAD
    private static policyByStack: Map<string, PolicyStatement> = new Map();
    private static lambdaByStack: Map<string, SecureFunction> = new Map();
    private readonly defaultMetricConfig: CustomMetricConfig = {
        metricName: 'CPUUtilization',
        period: Duration.minutes(1),
        statistic: 'Average',
        threshold: 5
    };

    constructor(private readonly props: Ec2ShutdownProps) {}
=======
    private lambdaFunction!: SecureFunction;
    private processedStacks: Set<Stack> = new Set();
    private counter = 0; 

    constructor(private readonly props: EC2ShutdownProps) {
        if (props.cpuThreshold <= 0 || props.cpuThreshold > 100) {
            throw new Error('CPU threshold must be between 0 and 100');
        }
    }
>>>>>>> 2ac9be4 (ec2 automated shutdown aspect)

    visit(node: IConstruct): void {
        if (!(node instanceof Instance) && !(node instanceof CfnInstance)) {
            return;
        }
<<<<<<< HEAD
        const stack = Stack.of(node);
        this.createShutdownMechanism(node, stack);
    }

    private getLambdaFunction(stack: Stack): SecureFunction {
        const stackId = stack.stackId;
        if (!Ec2AutomatedShutdown.lambdaByStack.has(stackId)) {
            const lambda = new SecureFunction(stack, 'Ec2ShutdownFunction', {
=======
    
        const stack = Stack.of(node);

        if (!this.processedStacks.has(stack)) {
            this.ensureLambdaFunction(stack);
            this.processedStacks.add(stack);
        }

        this.createShutdownMechanism(node);
    }

    private ensureLambdaFunction(stack: Stack): void {
        if (!this.lambdaFunction) {
            this.lambdaFunction = new SecureFunction(stack, 'EC2ShutdownFunction', {
>>>>>>> 2ac9be4 (ec2 automated shutdown aspect)
                code: Code.fromAsset(join(__dirname, 'handler')),
                runtime: Runtime.NODEJS_20_X,
                handler: 'index.handler',
                timeout: Duration.seconds(15),
<<<<<<< HEAD
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

    private addInstanceToPolicy(
        instance: Instance | CfnInstance,
        stack: Stack
    ): void {
        const stackId = stack.stackId;
        const policy = Ec2AutomatedShutdown.policyByStack.get(stackId);

        if (!policy) {
            throw new Error('Policy not initialized');
        }

        const instanceArn = `arn:${Aws.ACCOUNT}:ec2:${stack.region}:${stack.account}:instance/${
            instance instanceof Instance ? instance.instanceId : instance.ref
        }`;

        policy.addResources(instanceArn);
    }

    private createShutdownMechanism(instance: IConstruct, stack: Stack): void {
        const lambdaFunction = this.getLambdaFunction(stack);

=======
                encryption: this.props.encryption,  
                ...this.props.lambdaConfiguration
            });

            this.lambdaFunction.role.addToPolicy(
                new PolicyStatement({
                    actions: ['ec2:StopInstances'],
                    resources: ['*']
                })
            );
        }
    }

    private createShutdownMechanism(instance: IConstruct): void {
        if (!this.lambdaFunction) {
            throw new Error('Lambda Function not initialized');
        }

>>>>>>> 2ac9be4 (ec2 automated shutdown aspect)
        let instanceId: string;
        if (instance instanceof Instance) {
            instanceId = instance.instanceId;
        } else if (instance instanceof CfnInstance) {
            instanceId = instance.ref;
        } else {
            throw new Error('Unsupported instance type');
        }

<<<<<<< HEAD
        this.addInstanceToPolicy(instance, stack);

        const topic = new Topic(stack, `${instance.node.id}Ec2ShutdownTopic`, {
            displayName: `Ec2 Shutdown Topic for ${instance.node.id}`,
            masterKey: this.props.encryption
        });

        lambdaFunction.function.addEventSource(new SnsEventSource(topic));

        topic.addToResourcePolicy(
            new PolicyStatement({
                sid: 'AllowPublishThroughSSLOnly',
                effect: Effect.DENY,
                principals: [new AnyPrincipal()],
                actions: ['sns:Publish'],
                resources: [topic.topicArn],
                conditions: {
                    Bool: {
                        'aws:SecureTransport': 'false'
                    }
                }
            })
        );

        const metricConfig =
            this.props.metricConfig || this.defaultMetricConfig;

        const metric = new Metric({
            namespace: 'AWS/EC2',
            metricName: metricConfig.metricName,
            dimensionsMap: { InstanceId: instanceId },
            period: metricConfig.period,
            statistic: metricConfig.statistic
        });

        const alarm = new Alarm(
            instance,
            `${metric.metricName}-${instance.node.id}'`,
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
=======
        const uniqueId = `${++this.counter}`;
        const topic = new Topic(instance, `ShutdownTopic-${uniqueId}}`);
        this.lambdaFunction.function.addEventSource(new SnsEventSource(topic));

        //Enforce SSL for Topic 
        topic.addToResourcePolicy(new PolicyStatement({
            sid: 'AllowPublishThroughSSLOnly',
            effect: Effect.DENY,
            principals: [new AnyPrincipal()],
            actions: ['sns:Publish'],
            resources: [topic.topicArn],
            conditions: {
                'Bool': {
                    'aws:SecureTransport': 'false'
                }
            }
        }));

        const metric = new Metric({
            namespace: 'AWS/EC2',
            metricName: 'CPUUtilization',
            dimensionsMap: { InstanceId: instanceId },
            period: Duration.minutes(1),
            statistic: 'Average'
        });

        const alarm = new Alarm(instance, `LowCPUAlarm-${uniqueId}'`, {
            metric: metric,
            threshold: this.props.cpuThreshold,
            evaluationPeriods: 2,
            comparisonOperator: ComparisonOperator.LESS_THAN_THRESHOLD,
            datapointsToAlarm: 2,
        });

        alarm.addAlarmAction(new SnsAction(topic));
    }
}
>>>>>>> 2ac9be4 (ec2 automated shutdown aspect)
