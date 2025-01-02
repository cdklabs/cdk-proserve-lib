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

import { join } from 'node:path';
import { Aws, CustomResource, Duration } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import {
    BlockPublicAccess,
    Bucket,
    BucketAccessControl,
    BucketEncryption,
    BucketProps
} from 'aws-cdk-lib/aws-s3';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct, IConstruct } from 'constructs';
import { DefaultConfig } from '../../common/default-config';
import { LambdaConfiguration } from '../../interfaces';
import { SecureFunction } from '../secure-function';
import { ResourceProperties } from './handler/types/resource-properties';

interface IProviderResources {
    onEventHandler: Function;
    serviceToken: string;
}

/**
 * Input metadata for the custom resource
 */
export interface FriendlyEmbraceProps {
    /**
     * Encryption key for protecting the Lambda environment
     */
    readonly encryption?: IKey;

    /**
     * Whether or not stacks in error state should be fatal to CR completion
     */
    readonly ignoreInvalidStates?: boolean;

    /**
     * Optional Lambda configuration settings.
     */
    readonly lambdaConfiguration?: LambdaConfiguration;

    /**
     * Optional S3 Bucket configuration settings.
     */
    readonly bucketConfiguration?: BucketProps;
}

/**
 * Friendly Embrace Custom Resource
 *
 * A custom resource that is designed remove the "Deadly Embrace" problem that
 * occurs when you attempt to update a CloudFormation stack that is exporting
 * a resource used by another stack. This custom resource will run after all of
 * your stacks have been deployed and remove the dependencies by hardcoding
 * each export for all stacks that use it. For this reason, this custom resource
 * should run inside of its own stack and should be the last stack that is
 * deployed for your application.
 *
 * > NOTE: You may need to add more permissions to the handler if the custom
 * resource cannot update your stacks. You can call upon the `handler` property
 * of the class to add more permissions to it.
 */
export class FriendlyEmbrace extends Construct {
    /**
     * Retrieves all the stacks in the CDK app (except the one to which this
     * Construct belongs)
     *
     * @param scope Parent to which the custom resource belongs
     * @returns All stacks in the CDK app except the scope
     */
    private static getOtherStacks(scope: Construct): IConstruct[] {
        return scope.node.root.node.children.filter(
            (stack) => stack.node.id !== scope.node.id
        );
    }

    /**
     * Builds the worker to support the custom resource
     *
     * @param scope Parent to which the custom resource belongs
     * @param otherStacks All stacks in the CDK app except the scope
     * @param props Metadata for configuring the custom resource
     * @returns On event handler and service token for interacting with the
     * worker
     */
    private static buildProvider(
        scope: Construct,
        otherStacks: Construct[],
        props?: FriendlyEmbraceProps
    ): IProviderResources {
        const stackNames: string[] = [];

        otherStacks.forEach((stack) => stackNames.push(stack.node.id));

        const cfnTemplateBucket = new Bucket(scope, 'CfnTemplateBucket', {
            autoDeleteObjects: true,
            removalPolicy: DefaultConfig.removalPolicy,
            encryption: props?.encryption
                ? BucketEncryption.KMS
                : BucketEncryption.KMS_MANAGED,
            encryptionKey: props?.encryption,
            accessControl: BucketAccessControl.PRIVATE,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            enforceSSL: true,
            publicReadAccess: false,
            versioned: true,
            ...props?.bucketConfiguration
        });

        const onEventHandler = new SecureFunction(
            scope,
            'CrFriendlyEmbraceOnEvent',
            {
                code: Code.fromAsset(join(__dirname, 'handler', 'on-event')),
                handler: 'index.handler',
                memorySize: 512,
                timeout: Duration.minutes(5),
                runtime: Runtime.NODEJS_20_X,
                environment: {
                    CFN_TEMPLATE_BUCKET_NAME: cfnTemplateBucket.bucketName,
                    CFN_TEMPLATE_BUCKET_URL: cfnTemplateBucket.urlForObject()
                },
                environmentEncryption: props?.encryption,
                ...props?.lambdaConfiguration
            }
        );

        const policy = new PolicyStatement({
            actions: [
                'cloudformation:DescribeStacks',
                'cloudformation:GetTemplate',
                'cloudformation:UpdateStack'
            ],
            effect: Effect.ALLOW,
            resources: stackNames.map((name) => {
                return `arn:${Aws.PARTITION}:cloudformation:${Aws.REGION}:${Aws.ACCOUNT_ID}:stack/${name}/*`;
            })
        });

        /**
         * This policy is required for the custom resource handler to be able
         * to update CloudFormation stacks. Additional permissions may need to
         * be added depending on the different resources being deployed by the
         * application.
         */
        const readPolicy = new PolicyStatement({
            actions: [
                'dynamodb:DescribeTable',
                'ec2:DescribeSecurityGroups',
                'ec2:DescribeLaunchTemplates',
                'ecs:DescribeServices',
                'elasticloadbalancing:DescribeLoadBalancers',
                'iam:GetRole',
                'logs:DescribeLogGroups',
                'sqs:getqueueattributes'
            ],
            effect: Effect.ALLOW,
            resources: ['*']
        });

        [policy, readPolicy].forEach((p) => {
            onEventHandler.function.addToRolePolicy(p);
        });
        cfnTemplateBucket.grantReadWrite(onEventHandler.function);

        return {
            onEventHandler: onEventHandler.function,
            serviceToken: new Provider(scope, 'CrFriendlyEmbraceProvider', {
                onEventHandler: onEventHandler.function
            }).serviceToken
        };
    }

    /**
     * Translates the CDK construct properties to the custom resource
     * property format
     *
     * @param otherStacks CDK constructs for other stacks within the application
     * @param props Metadata for configuring the custom resource
     * @returns Input for the actual custom resource worker
     */
    private static createCustomResourceProperties(
        otherStacks: Construct[],
        props?: FriendlyEmbraceProps
    ): ResourceProperties {
        const stackNames: string[] = [];

        otherStacks.forEach((stack) => stackNames.push(stack.node.id));

        return {
            stackNames: stackNames,
            timestamp: new Date().toISOString(),
            ignoreInvalidStates: props?.ignoreInvalidStates
        };
    }

    /**
     * Handler for the custom resource
     */
    readonly onEventHandler: NodejsFunction;

    /**
     * Constructor
     *
     * @param scope Parent to which the custom resource belongs
     * @param id Unique identifier for the custom resource
     * @param props Metadata for configuring the custom resource
     */
    constructor(scope: Construct, id: string, props?: FriendlyEmbraceProps) {
        super(scope, id);
        const otherStacks = FriendlyEmbrace.getOtherStacks(scope);
        const provider = FriendlyEmbrace.buildProvider(
            this,
            otherStacks,
            props
        );

        new CustomResource(this, 'CrFriendlyEmbrace', {
            serviceToken: provider.serviceToken,
            properties: FriendlyEmbrace.createCustomResourceProperties(
                otherStacks,
                props
            ),
            resourceType: 'Custom::FriendlyEmbrace'
        });

        this.onEventHandler = provider.onEventHandler;

        otherStacks.forEach((stack) => {
            stack.node.addDependency(scope);
        });
    }
}
