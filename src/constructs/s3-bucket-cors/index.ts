// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { CustomResource, Duration, Stack } from 'aws-cdk-lib';
import {
    Effect,
    Policy,
    PolicyDocument,
    PolicyStatement
} from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { CorsRule as CdkCorsRule, IBucket } from 'aws-cdk-lib/aws-s3';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { LambdaConfiguration } from '../../interfaces';
import { SecureFunction } from '../secure-function';
import { ResourceProperties } from './handler/types/resource-properties';
import { AllRulesMustHaveUniqueIdsException } from './types/exceptions';

/**
 * Input metadata for the custom resource
 */
export interface S3BucketCorsProps {
    /**
     * Amazon S3 Bucket on which to modify CORS rules
     */
    readonly bucket: IBucket;

    /**
     * Cross-origin access rules to apply to the Amazon S3 bucket
     */
    readonly corsRules?: S3BucketCors.CorsRule[];

    /**
     * Optional AWS region to which the bucket is deployed
     * If not specified, it is assumed the bucket exists in the same region
     */
    readonly region?: string;

    /**
     * Encryption key for protecting the framework resources
     */
    readonly encryption?: IKey;

    /**
     * Optional Lambda configuration settings.
     */
    readonly lambdaConfiguration?: LambdaConfiguration;
}

/**
 * A construct that creates a Custom Resource to manage CORS rules on an **existing** Amazon S3 bucket. When creating
 * new Amazon S3 buckets via CDK, it is recommended to instead use the `cors` property in the construct props for
 * specifying CORS rules.
 *
 * This Custom Resource works by requiring each and every CORS rule specified has a unique ID. This is used to
 * deconflict rules that are provided via this Custom Resource from CORS rules that may already exist on the existing
 * bucket. This Custom Resource is only destructive (modifies or deletes) for CORS rules that it creates - it will not
 * modify or delete existing CORS rules.
 *
 * @example
 *
 * import { Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3';
 * import { S3BucketCors } from '@cdklabs/cdk-proserve-lib/constructs';
 *
 * const existingBucket = Bucket.fromBucketName(this, 'Store', 'amzn-s3-demo-bucket');
 *
 * new S3BucketCors(this, 'Store-CORS', {
 *      bucket: existingBucket,
 *      corsRules: [
 *          {
 *              allowedMethods: [HttpMethods.PUT],
 *              allowedOrigins: 'https://example.com',
 *              id: 'AllowMultiPartUploadFromExample',
 *              allowedHeaders: ['*'],
 *              exposedHeaders: ['etag']
 *          }
 *      ]
 * });
 */
export class S3BucketCors extends Construct {
    /**
     * Mapping of providers for each CDK stack
     * Used to ensure only one provider is created per stack
     */
    private static serviceTokens = new Map<string, Provider>();

    /**
     * Builds the provider to support the Custom Resource
     *
     * @param scope Parent to which the Custom Resource belongs
     * @param props Metadata for configuring the Custom Resource
     *
     * @returns Provider for the worker
     */
    private static getOrBuildProvider(
        scope: Construct,
        props: S3BucketCorsProps
    ): Provider {
        const stackId = Stack.of(scope).node.id;

        if (!S3BucketCors.serviceTokens.has(stackId)) {
            // Create a stack level construct to manage the framework
            const provider = new Construct(scope, `Cr${S3BucketCors.name}`);

            const onEventHandler = new SecureFunction(provider, 'OnEvent', {
                code: Code.fromAsset(join(__dirname, 'handler', 'on-event')),
                handler: 'index.handler',
                memorySize: 512,
                timeout: Duration.minutes(1),
                runtime: Runtime.NODEJS_22_X,
                encryption: props.encryption,
                ...props.lambdaConfiguration
            });

            S3BucketCors.serviceTokens.set(
                stackId,
                new Provider(provider, 'Provider', {
                    onEventHandler: onEventHandler.function
                })
            );
        }

        return S3BucketCors.serviceTokens.get(stackId)!;
    }

    /**
     * Translates the CDK construct properties to the Custom Resource
     * property format
     * @param props Metadata for configuring the Custom Resource
     * @returns Input for the actual Custom Resource worker
     */
    private static createCustomResourceProperties(
        props: S3BucketCorsProps
    ): ResourceProperties {
        return {
            BucketName: props.bucket.bucketName,
            Region: props.region,
            Rules:
                props.corsRules?.map((r) => {
                    return {
                        AllowedMethods: r.allowedMethods,
                        AllowedOrigins: r.allowedOrigins,
                        AllowedHeaders: r.allowedHeaders,
                        ExposeHeaders: r.exposedHeaders,
                        ID: r.id,
                        MaxAgeSeconds: r.maxAge
                    };
                }) ?? []
        };
    }

    /**
     * Configures CORS rules for an existing Amazon S3 bucket
     * @param scope Parent to which the Custom Resource belongs
     * @param id Unique identifier for this instance
     * @param props Metadata for configuring the Custom Resource
     */
    constructor(scope: Construct, id: string, props: S3BucketCorsProps) {
        super(scope, id);

        // Validate props
        if (props.corsRules) {
            const uniqueRules = new Map<string, S3BucketCors.CorsRule>();

            props.corsRules.forEach((r) => {
                if (!uniqueRules.has(r.id)) {
                    uniqueRules.set(r.id, r);
                }
            });

            if (uniqueRules.size !== props.corsRules.length) {
                throw new AllRulesMustHaveUniqueIdsException();
            }
        }

        const provider = S3BucketCors.getOrBuildProvider(scope, props);

        // Create permissions as a separate policy to ensure in DELETEs they are not removed until after the CR has run
        const providerPermissions = new Policy(this, 'Permissions', {
            document: new PolicyDocument({
                statements: [
                    new PolicyStatement({
                        actions: ['s3:GetBucketCORS', 's3:PutBucketCORS'],
                        effect: Effect.ALLOW,
                        resources: [props.bucket.bucketArn]
                    })
                ]
            })
        });

        provider.onEventHandler.role!.attachInlinePolicy(providerPermissions);

        new CustomResource(this, 'BucketCors', {
            serviceToken: provider.serviceToken,
            properties: S3BucketCors.createCustomResourceProperties(props),
            resourceType: 'Custom::S3BucketCors'
        });
    }
}

export namespace S3BucketCors {
    /**
     * Specifies a cross-origin access rule for an Amazon S3 bucket.
     * Wraps the CDK rule model to enforce IDs as required
     */
    export interface CorsRule extends CdkCorsRule {
        /**
         * A unique identifier for this rule.
         */
        readonly id: string; // Forces the ID to be required
    }
}
