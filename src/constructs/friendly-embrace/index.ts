// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { Annotations, Aws, CustomResource, Duration } from 'aws-cdk-lib';
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
import { LambdaConfiguration } from '../../types';
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
 * The Friendly Embrace construct can be used to remove CloudFormation stack
 * dependencies that are based on stack exports and imports.
 *
 * 🚨 WARNING: This construct is experimental and will directly modify
 * CloudFormation stacks in your CDK application via a Lambda-backed Custom
 * Resource. It is not recommended to use this construct in a production
 * environment.
 *
 * A custom resource that is designed to remove the "Deadly Embrace" problem that
 * occurs when you attempt to update a CloudFormation stack that is exporting
 * a resource used by another stack. This custom resource will run before all of
 * your stacks deploy/update and remove the dependencies by hardcoding each
 * export for all stacks that use it. For this reason, this construct should run
 * inside of its own stack and should be the last stack that is instantiated for
 * your application. That way the construct will be able to retrieve all of the
 * stacks from your CDK resource tree that it needs to update.
 *
 * > NOTE: You may need to add more permissions to the handler if the custom
 * resource cannot update your stacks. You can call upon the `handler` property
 * of the class to add more permissions to it.
 *
 * @example
 *
 * import { App, Stack } from 'aws-cdk-lib';
 * import { FriendlyEmbrace } from '@cdklabs/cdk-proserve-lib/constructs';
 *
 * const app = new App();
 * // ... other stack definitions
 * const embrace = new Stack(app, 'FriendlyEmbrace'); // last stack
 * new FriendlyEmbrace(embrace, 'FriendlyEmbrace'); // only construct in stack
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
                runtime: Runtime.NODEJS_22_X,
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
     * The Friendly Embrace construct can be used to remove CloudFormation stack
     * dependencies that are based on stack exports and imports.
     *
     * 🚨 WARNING: This construct is experimental and will directly modify
     * CloudFormation stacks in your CDK application via a Lambda-backed Custom
     * Resource. It is not recommended to use this construct in a production
     * environment.
     *
     * @param scope The scope in which to define this construct
     * @param id The construct ID
     * @param props Configuration properties
     */
    constructor(scope: Construct, id: string, props?: FriendlyEmbraceProps) {
        super(scope, id);
        const otherStacks = FriendlyEmbrace.getOtherStacks(scope);
        const provider = FriendlyEmbrace.buildProvider(
            this,
            otherStacks,
            props
        );

        Annotations.of(this).addWarningV2(
            'cdk-proserve-lib:construct:FriendlyEmbrace',
            '🚨 WARNING: This construct is experimental and will directly modify CloudFormation stacks in your CDK application via a Lambda-backed Custom Resource. It is not recommended to use this construct in a production environment.'
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
