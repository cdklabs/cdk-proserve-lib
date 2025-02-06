// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import {
    Cors,
    DomainNameOptions,
    EndpointConfiguration,
    LambdaIntegration,
    RestApi
} from 'aws-cdk-lib/aws-apigateway';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Code, Runtime, SingletonFunction } from 'aws-cdk-lib/aws-lambda';
import {
    BlockPublicAccess,
    Bucket,
    BucketAccessControl,
    BucketEncryption
} from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { SecureFunction } from '../../constructs/secure-function';
import { LambdaConfiguration } from '../../types';
import { S3HostingConfiguration } from './handler/hosts/s3';

/**
 * Properties for configuring the static hosting pattern
 */
export interface ApiGatewayStaticHostingProps {
    /**
     * Custom Domain to use for the REST API
     * @default undefined Will use the default API invocation endpoint
     */
    readonly customDomain?: DomainNameOptions;

    /**
     * Endpoint deployment information for the REST API
     * @default undefined Will deploy an edge-optimized API
     */
    readonly endpoint?: EndpointConfiguration;

    /**
     * Encryption key for protecting the framework resources
     * @default undefined AWS service-managed encryption keys will be used where available
     */
    readonly encryption?: IKey;

    /**
     * Optional configuration settings for the backend handler
     */
    readonly lambdaConfiguration?: LambdaConfiguration;

    /**
     * Metadata about the static assets to host
     */
    readonly asset: ApiGatewayStaticHosting.Asset;

    /**
     * Whether or not to retain the Amazon S3 bucket where static assets are deployed on stack deletion
     * @default false The Amazon S3 bucket and all assets contained within will be deleted
     */
    readonly retainStoreOnDeletion?: boolean;

    /**
     * A version identifier to deploy to the Amazon S3 bucket to help with rapid identification of current deployment
     * This will appear as `metadata.json` at the root of the bucket
     * @example 1.0.2
     * @default undefined No version information will be deployed to the Amazon S3 bucket
     */
    readonly versionTag?: string;
}

/**
 * A construct that deploys resources to support the hosting of static assets within an AWS account.
 *
 * Unlike the normal pattern for static content hosting (Amazon S3 fronted by Amazon CloudFront), this pattern instead
 * uses a combination of Amazon S3, AWS Lambda, and Amazon API Gateway. This can be useful for rapidly deploying a
 * static website that follows best practices when Amazon CloudFront is not available.
 *
 * The construct also handles encryption for the framework resources using either a provided KMS key or an
 * AWS managed key.
 *
 * @example
 *
 * import { ApiGatewayStaticHosting } from '@cdklabs/cdk-proserve-lib/patterns';
 * import { EndpointType } from 'aws-cdk-lib/aws-apigateway';
 *
 * new ApiGatewayStaticHosting(this, 'MyWebsite', {
 *     asset: {
 *         id: 'Website',
 *         path: join(__dirname, 'assets', 'website', 'dist'),
 *         destinationPrefix: 'public',
 *         spaIndexPageName: 'index.html'
 *     },
 *     endpoint: {
 *         types: [EndpointType.REGIONAL]
 *     },
 *     retainStoreOnDeletion: true,
 *     versionTag: '1.0.2'
 * });
 *
 */
export class ApiGatewayStaticHosting extends Construct {
    /**
     * Configuration for the construct
     */
    private readonly props: ApiGatewayStaticHostingProps;

    /**
     * API Gateway REST API URL
     */
    public readonly endpoint: string;

    /**
     * Creates a new static hosting pattern
     * @param scope Parent to which the pattern belongs
     * @param id Unique identifier for this instance
     * @param props Metadata for configuring the pattern
     */
    constructor(
        scope: Construct,
        id: string,
        props: ApiGatewayStaticHostingProps
    ) {
        super(scope, id);

        this.props = props;

        const store = this.buildStore();
        const metadata = this.provisionMetadata(store);

        const assetDeployment = this.provisionAsset(this.props.asset, store);

        if (metadata) {
            assetDeployment.node.addDependency(metadata);
        }

        const handler = this.buildHandler(store);
        const api = this.buildApi(handler);

        this.endpoint = api.url;
    }

    /**
     * Builds the Amazon S3 bucket to host static assets
     * @returns Amazon S3 bucket
     */
    private buildStore(): Bucket {
        return new Bucket(this, 'AssetsStore', {
            accessControl: BucketAccessControl.PRIVATE,
            autoDeleteObjects: !this.props.retainStoreOnDeletion,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            encryption: this.props.encryption
                ? BucketEncryption.KMS
                : BucketEncryption.S3_MANAGED,
            encryptionKey: this.props.encryption,
            enforceSSL: true,
            publicReadAccess: false,
            removalPolicy: this.props.retainStoreOnDeletion
                ? RemovalPolicy.RETAIN
                : RemovalPolicy.DESTROY,
            versioned: true
        });
    }

    /**
     * Deploys static information to the Amazon S3 bucket to help with versioning
     * @param bucket The Amazon S3 bucket where the resource should be deployed
     * @returns Handler to the deployment
     */
    private provisionMetadata(bucket: Bucket): BucketDeployment | undefined {
        if (this.props.versionTag) {
            const deployAsset = new BucketDeployment(this, 'Metadata', {
                destinationBucket: bucket,
                sources: [
                    Source.jsonData('metadata.json', {
                        version: this.props.versionTag
                    })
                ],
                prune: true
            });

            if (this.props.encryption) {
                // Grant bucket CMK permissions to handler
                deployAsset.node.children.forEach((c) => {
                    if (c instanceof SingletonFunction) {
                        this.props.encryption!.grantEncryptDecrypt(c);
                    }
                });
            }

            return deployAsset;
        } else {
            return undefined;
        }
    }

    /**
     * Deploys assets from the local file system to an Amazon S3 bucket
     * @param asset Metadata about the asset to deploy
     * @param bucket The Amazon S3 bucket where the asset should be deployed
     * @returns Handler to the deployment
     */
    private provisionAsset(
        asset: ApiGatewayStaticHosting.Asset,
        bucket: Bucket
    ): BucketDeployment {
        const deployAsset = new BucketDeployment(this, asset.id, {
            destinationBucket: bucket,
            sources: Array.isArray(asset.path)
                ? asset.path.map((s) => Source.asset(s))
                : [Source.asset(asset.path)],
            destinationKeyPrefix: asset.destinationPrefix,
            prune: false
        });

        if (this.props.encryption) {
            // Grant bucket CMK permissions to handler
            deployAsset.node.children.forEach((c) => {
                if (c instanceof SingletonFunction) {
                    this.props.encryption!.grantEncryptDecrypt(c);
                }
            });
        }

        return deployAsset;
    }

    /**
     * Builds the backend handler to support serving assets
     * @param store Store which contains the static assets
     * @returns Backend handler
     */
    private buildHandler(store: Bucket): SecureFunction {
        const config: S3HostingConfiguration = {
            bucketName: store.bucketName,
            spaIndexPage: this.props.asset.spaIndexPageName,
            staticFilePath: this.props.asset.destinationPrefix
        };

        const handler = new SecureFunction(this, 'Handler', {
            code: Code.fromAsset(join(__dirname, 'handler')),
            handler: 'index.handler',
            memorySize: 512,
            timeout: Duration.seconds(29),
            runtime: Runtime.NODEJS_22_X,
            encryption: this.props.encryption,
            environment: {
                CONFIGURATION: JSON.stringify(config)
            },
            ...this.props.lambdaConfiguration
        });

        store.grantRead(handler.function);

        return handler;
    }

    /**
     * Builds the API which end users will leverage to retrieve static assets
     * @param handler Backend handler to support serving assets
     * @returns API
     */
    private buildApi(handler: SecureFunction): RestApi {
        return new RestApi(this, 'Api', {
            binaryMediaTypes: ['*/*'],
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS
            },
            defaultIntegration: new LambdaIntegration(handler.function, {
                proxy: true,
                timeout: Duration.seconds(29)
            }),
            endpointConfiguration: this.props.endpoint,
            deploy: true,
            description: 'Frontend for static hosting',
            disableExecuteApiEndpoint: this.props.customDomain !== undefined,
            domainName: this.props.customDomain,
            endpointTypes: this.props.endpoint?.types
        });
    }
}

export namespace ApiGatewayStaticHosting {
    /**
     * Static Asset Definition
     */
    export interface Asset {
        /**
         * Unique identifier to delineate an asset from other assets
         */
        readonly id: string;

        /**
         * Path(s) on the local file system to the static asset
         */
        readonly path: string | string[];

        /**
         * Location with the store to provision the static asset
         * @default undefined Root of the store
         */
        readonly destinationPrefix?: string;

        /**
         * Name of the index page for a Single Page Application (SPA)
         *
         * This is used as a default key to load when the path provided does not map to a concrete static asset.
         *
         * @example index.html
         */
        readonly spaIndexPageName?: string;
    }
}
