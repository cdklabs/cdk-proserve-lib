// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'path';
import {
    CfnWaitCondition,
    CfnWaitConditionHandle,
    Duration
} from 'aws-cdk-lib';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { CfnFunction, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { SnsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { ITopic } from 'aws-cdk-lib/aws-sns';
import {
    AwsCustomResource,
    AwsCustomResourcePolicy,
    AwsSdkCall,
    PhysicalResourceId
} from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { DefaultConfig } from '../../common/default-config';
import { validate, ValidationTypes } from '../../common/validate';
import { LambdaConfiguration } from '../../interfaces/lambda-configuration';
import { SecureFunction } from '../secure-function';

/**
 * Properties for the EC2 Image Builder Start custom resource
 */
export interface Ec2ImageBuilderStartProps {
    /**
     * The ARN of the Image Builder pipeline to start.
     */
    readonly pipelineArn: string;

    /**
     * An optional user-generated hash value that will determine if the
     * construct will start the build pipeline. If this is not set, the pipeline
     * will only start once on initial deployment. By setting this, you can for
     * example start a new build if your build instructions have changed and
     * then wait for the pipeline to complete again.
     *
     * This hash should be a short
     * string, ideally ~7 characters or less. It will be set as the Physical ID
     * of the Custom Resource and also used to append to Waiter function
     * Physical IDs.
     */
    readonly hash?: string;

    /**
     * Set these properties to wait for the Image Build to complete. This is
     * useful if you need the AMI before your next infrastructure step.
     */
    readonly waitForCompletion?: Ec2ImageBuilderStart.WaitForCompletionProps;

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
 * Starts an EC2 Image Builder Pipeline and optionally waits for the build to
 * complete.
 *
 * This construct is useful if you want to create an image as part of your IaC
 * deployment. By waiting for completion of this construct, you can use the
 * image in the same deployment by retrieving the AMI and passing it to an EC2
 * build step.
 *
 * @example
 * const topic = Topic.fromTopicArn(
 *   this,
 *   'MyTopic',
 *   'arn:aws:sns:us-east-1:123456789012:my-notification-topic'
 * );
 * new Ec2ImageBuilderStart(this, 'ImageBuilderStart', {
 *   pipelineArn:
 *     'arn:aws:imagebuilder:us-east-1:123456789012:image-pipeline/my-image-pipeline',
 *   waitForCompletion: {
 *     topic: topic,
 *     timeout: Duration.hours(7)  // wait up to 7 hours for completion
 *   }
 * });
 */
export class Ec2ImageBuilderStart extends Construct {
    /** The ARN of the image build version created by the pipeline execution */
    public readonly imageBuildVersionArn: string;

    /** The underlying custom resource that starts the pipeline execution. */
    private readonly cr: AwsCustomResource;
    /** The hash value supplied by the user or the default value (Run1x) */
    private readonly hash: string;

    /**
     * Starts an EC2 Image Builder Pipeline and optionally waits for the build
     * to complete.
     *
     * @param scope The construct scope
     * @param id The construct ID
     * @param props Configuration properties
     */
    constructor(
        scope: Construct,
        id: string,
        props: Ec2ImageBuilderStartProps
    ) {
        super(scope, id);

        if ((props.waitForCompletion?.timeout?.toSeconds() ?? 0) > 43200) {
            throw new Error('Timeout cannot exceed 12 hours');
        }
        if ((props.hash?.length ?? 0) > 7) {
            throw new Error('Hash must be 7 characters or less');
        }
        validate(props.pipelineArn, ValidationTypes.AWS_ARN);

        this.hash = props.hash ?? 'Run1x';

        this.cr = new AwsCustomResource(this, `Ec2ImageBuilderStartCr`, {
            policy: AwsCustomResourcePolicy.fromSdkCalls({
                resources: [props.pipelineArn]
            }),
            logRetention:
                props.lambdaConfiguration?.logGroupRetention ??
                DefaultConfig.logRetention,
            onCreate: this.start(props.pipelineArn),
            onUpdate: this.start(props.pipelineArn),
            resourceType: 'Custom::Ec2ImageBuilderStart',
            vpc: props.lambdaConfiguration?.vpc,
            vpcSubnets: props.lambdaConfiguration?.subnets
        });

        this.imageBuildVersionArn = this.cr.getResponseField(
            'imageBuildVersionArn'
        );

        // Wait until image build is complete
        this.waitForTopicSignal(props);
    }

    /**
     * Creates the AWS SDK call parameters to start the pipeline execution
     * @param id The construct ID
     * @param pipelineArn The ARN of the Image Builder pipeline to execute
     * @returns The AWS SDK call configuration
     */
    private start(pipelineArn: string): AwsSdkCall {
        const params = {
            imagePipelineArn: pipelineArn
        };

        return {
            action: 'startImagePipelineExecution',
            service: 'Imagebuilder',
            parameters: params,
            physicalResourceId: PhysicalResourceId.of(this.hash)
        };
    }

    private waitForTopicSignal(props: Ec2ImageBuilderStartProps) {
        if (props.waitForCompletion) {
            const waitHandle = new CfnWaitConditionHandle(
                this,
                `WaitHandle${this.hash}`
            );

            const signal = new SecureFunction(this, 'WaiterSignal', {
                code: Code.fromAsset(join(__dirname, 'handler')),
                runtime: Runtime.NODEJS_20_X,
                handler: 'index.handler',
                environment: {
                    WAIT_HANDLE_URL: waitHandle.ref,
                    IMAGE_BUILD_ARN: this.imageBuildVersionArn
                },
                encryption: props.encryption,
                ...props.lambdaConfiguration
            });

            const duration =
                props.waitForCompletion?.timeout ?? Duration.hours(12);
            const waiter = new CfnWaitCondition(this, `Waiter${this.hash}`, {
                handle: waitHandle.ref,
                timeout: duration.toSeconds().toString()
            });
            waiter.addDependency(
                signal.function.node.defaultChild as CfnFunction
            );

            // Subscribe to Image Pipeline Topic
            signal.function.addEventSource(
                new SnsEventSource(props.waitForCompletion?.topic)
            );
        }
    }
}

export namespace Ec2ImageBuilderStart {
    export interface WaitForCompletionProps {
        /**
         * An SNS Topic that will signal when the pipeline is complete. This is
         * typically configured on your EC2 Image Builder pipeline to trigger an
         * SNS notification when the pipeline completes.
         */
        readonly topic: ITopic;

        /**
         * The maximum amount of time to wait for the image build pipeline to
         * complete. This is set to a maximum of 12 hours by default.
         * @default 12 hours
         */
        readonly timeout?: Duration;
    }
}
