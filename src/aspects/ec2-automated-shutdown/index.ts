// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'path';
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

    /**
     * Optional Lambda configuration settings.
     */
     readonly lambdaConfiguration?: LambdaConfiguration

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
    private lambdaFunction!: SecureFunction;
    private processedStacks: Set<Stack> = new Set();
    private counter = 0; 

    constructor(private readonly props: EC2ShutdownProps) {
        if (props.cpuThreshold <= 0 || props.cpuThreshold > 100) {
            throw new Error('CPU threshold must be between 0 and 100');
        }
    }

    visit(node: IConstruct): void {
        if (!(node instanceof Instance) && !(node instanceof CfnInstance)) {
            return;
        }
    
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
                code: Code.fromAsset(join(__dirname, 'handler')),
                runtime: Runtime.NODEJS_20_X,
                handler: 'index.handler',
                timeout: Duration.seconds(15),
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

        let instanceId: string;
        if (instance instanceof Instance) {
            instanceId = instance.instanceId;
        } else if (instance instanceof CfnInstance) {
            instanceId = instance.ref;
        } else {
            throw new Error('Unsupported instance type');
        }

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