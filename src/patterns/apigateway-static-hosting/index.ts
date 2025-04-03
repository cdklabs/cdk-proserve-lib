// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import {
    Cors,
    DomainNameOptions,
    EndpointConfiguration,
    IAccessLogDestination,
    LambdaIntegration,
    MethodLoggingLevel,
    RestApi
} from 'aws-cdk-lib/aws-apigateway';
import { PolicyDocument } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import {
    Code,
    Function,
    Runtime,
    SingletonFunction
} from 'aws-cdk-lib/aws-lambda';
import {
    BlockPublicAccess,
    Bucket,
    BucketAccessControl,
    BucketEncryption,
    IBucket
} from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { SecureFunction } from '../../constructs/secure-function';
import { LambdaConfiguration } from '../../types';
import { S3HostingConfiguration } from './worker/hosts/s3';
import { DefaultConfig } from '../../common/default-config';

/**
 * Properties for configuring the static hosting pattern
 */
export interface ApiGatewayStaticHostingProps {
    /**
     * Configuration information for the distribution endpoint that will be used to serve static content
     */
    readonly domain: ApiGatewayStaticHosting.DomainConfiguration;

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
     * Amazon S3 bucket where access logs should be stored
     * @default undefined A new bucket will be created for storing access logs
     */
    readonly accessLoggingBucket?: IBucket;

    /**
     * Destination where Amazon API Gateway logs can be sent
     */
    readonly apiLogDestination?: IAccessLogDestination;

    /**
     * A version identifier to deploy to the Amazon S3 bucket to help with rapid identification of current deployment
     * This will appear as `metadata.json` at the root of the bucket
     * @example 1.0.2
     * @default undefined No version information will be deployed to the Amazon S3 bucket
     */
    readonly versionTag?: string;

    /**
     * Resource access policy to define on the API itself to control who can invoke the endpoint
     */
    readonly accessPolicy?: PolicyDocument;
}

/**
 * A pattern that deploys resources to support the hosting of static assets within an AWS account.
 *
 * Unlike the normal pattern for static content hosting (Amazon S3 fronted by Amazon CloudFront), this pattern instead
 * uses a combination of Amazon S3, AWS Lambda, and Amazon API Gateway. This can be useful for rapidly deploying a
 * static website that follows best practices when Amazon CloudFront is not available.
 *
 * The construct also handles encryption for the framework resources using either a provided KMS key or an
 * AWS managed key.
 *
 * There are two methods for exposing the URL to consumers - the default API execution endpoint or via a custom domain
 * name setup.
 *
 * If using the default API execution endpoint, you must provide a base path as this will translate to the
 * stage name of the REST API. You must also ensure that all relative links in the static content either reference
 * the base path in URLs relative to the root (e.g. preceded by '/') or uses URLs that are relative to the current
 * directory (e.g. no '/').
 *
 * If using the custom domain name, then you do not need to provide a base path and relative links in your static
 * content will not require modification. You can choose to specify a base path with this option if so desired - in
 * that case, similar rules regarding relative URLs in the static content above must be followed.
 *
 * @example
 *
 * import { ApiGatewayStaticHosting } from '@cdklabs/cdk-proserve-lib/patterns';
 * import { EndpointType } from 'aws-cdk-lib/aws-apigateway';
 *
 * new ApiGatewayStaticHosting(this, 'MyWebsite', {
 *     asset: {
 *         id: 'Entry',
 *         path: join(__dirname, 'assets', 'website', 'dist'),
 *         spaIndexPageName: 'index.html'
 *     },
 *     domain: {
 *         basePath: 'public'
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
     * Whether or not encryption on the asset deployment worker has already been updated
     *
     * Since it is handled by a SingletonFunction, we only need to update permissions once
     */
    private assetEncryptionConfigured: boolean = false;

    /**
     * Standard format for the base path which removes any whitespace and the leading '/' if present
     */
    private readonly normalizedBasePath?: string;

    /**
     * Provides access to the underlying components of the pattern as an escape hatch.
     *
     * WARNING: Making changes to the properties of the underlying components of this pattern may cause it to not
     * behave as expected or designed. You do so at your own risk.
     */
    public readonly components: ApiGatewayStaticHosting.PatternComponents;

    /**
     * URL for the API that distributes the static content
     */
    public readonly url: string;

    /**
     * Alias domain name for the API that distributes the static content.
     *
     * This is only available if the custom domain name configuration was provided to the pattern. In that event, you
     * would then create either a CNAME or ALIAS record in your DNS system that maps your custom domain name to this
     * value.
     */
    public readonly customDomainNameAlias?: string;

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

        const usingCustomDomain = this.domainIsCustom(this.props.domain);

        if (usingCustomDomain && this.props.domain.options.basePath) {
            this.normalizedBasePath = this.normalizePath(
                this.props.domain.options.basePath
            );
        } else if (!usingCustomDomain) {
            this.normalizedBasePath = this.normalizePath(
                this.props.domain.basePath
            );
        }

        const store = this.buildStore();
        const metadata = this.provisionMetadata(store);

        const assetDeployment = this.provisionAsset(this.props.asset, store);

        if (metadata) {
            assetDeployment.node.addDependency(metadata);
        }

        const proxy = this.buildHandler(store).function;
        const distribution = this.buildApi(proxy);

        this.components = {
            distribution: distribution,
            proxy: proxy,
            store: store
        };

        this.url = distribution.url;
        this.customDomainNameAlias =
            distribution.domainName?.domainNameAliasDomainName;
    }

    /**
     * Normalizes a given URI path by removing whitespace and the preceding slash
     * @param path Path to normalize
     * @returns Normalized path
     */
    private normalizePath(path: string): string {
        return path.trim().replace(/^\//, '');
    }

    /**
     * Generates and validates an Amazon API Gateway stage name based off the given URI path
     * @param path URI path
     * @returns Stage name for Amazon API Gateway
     */
    private generateStageName(path: string): string {
        const validStageName = /^[a-z0-9\-_]{1,128}$/i;
        const normalized = this.normalizePath(path).replace(/\/.*?$/, '');

        if (!validStageName.test(normalized)) {
            throw new Error(
                'Base path beginning contains invalid characters. Can only contain alphanumeric characters, hyphens, and underscores up to a maximum of 128 characters.'
            );
        }

        return normalized;
    }

    /**
     * Determines if the domain configuration is for a custom domain name setup
     * @param c Domain configuration
     * @returns Whether or not the configuration is for a custom domain name setup
     */
    private domainIsCustom(
        c: ApiGatewayStaticHosting.DomainConfiguration
    ): c is ApiGatewayStaticHosting.CustomDomainConfiguration {
        const optionsProp: keyof ApiGatewayStaticHosting.CustomDomainConfiguration =
            'options';
        return optionsProp in c;
    }

    /**
     * Builds the Amazon S3 bucket to host static assets
     * @returns Amazon S3 bucket
     */
    private buildStore(): Bucket {
        return new Bucket(this, 'Store', {
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
                : DefaultConfig.removalPolicy,
            serverAccessLogsBucket: this.props.accessLoggingBucket,
            serverAccessLogsPrefix: this.props.accessLoggingBucket
                ? 'apigateway-static-hosting-store'
                : undefined,
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
                    if (
                        c instanceof SingletonFunction &&
                        !this.assetEncryptionConfigured
                    ) {
                        this.props.encryption!.grantEncryptDecrypt(c);
                        this.assetEncryptionConfigured = true;
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
        const deployAsset = new BucketDeployment(this, `Asset-${asset.id}`, {
            destinationBucket: bucket,
            sources: Array.isArray(asset.path)
                ? asset.path.map((s) => Source.asset(s))
                : [Source.asset(asset.path)],
            destinationKeyPrefix: this.normalizedBasePath,
            prune: false
        });

        if (this.props.encryption) {
            // Grant bucket CMK permissions to handler
            deployAsset.node.children.forEach((c) => {
                if (
                    c instanceof SingletonFunction &&
                    !this.assetEncryptionConfigured
                ) {
                    this.props.encryption!.grantEncryptDecrypt(c);
                    this.assetEncryptionConfigured = true;
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
            staticFilePath: this.normalizedBasePath
        };

        const handler = new SecureFunction(this, 'ServeProxy', {
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
    private buildApi(handler: Function): RestApi {
        const usingCustomDomain = this.domainIsCustom(this.props.domain);

        const stageName = usingCustomDomain
            ? 'prod'
            : this.generateStageName(this.props.domain.basePath);

        const api = new RestApi(this, 'DistributionEndpoint', {
            binaryMediaTypes: ['*/*'],
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS
            },
            defaultIntegration: new LambdaIntegration(handler, {
                proxy: true,
                timeout: Duration.seconds(29)
            }),
            deployOptions: {
                accessLogDestination: this.props.apiLogDestination,
                loggingLevel: MethodLoggingLevel.ERROR,
                stageName: stageName
            },
            endpointConfiguration: this.props.endpoint,
            deploy: true,
            description: 'Frontend for static hosting',
            disableExecuteApiEndpoint: usingCustomDomain,
            domainName: usingCustomDomain
                ? this.props.domain.options
                : undefined,
            policy: this.props.accessPolicy
        });

        api.root.addProxy();

        return api;
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
         * Path(s) on the local file system to the static asset(s)
         *
         * Each path must be either a directory or zip containing the assets
         */
        readonly path: string | string[];

        /**
         * Name of the index page for a Single Page Application (SPA)
         *
         * This is used as a default key to load when the path provided does not map to a concrete static asset.
         *
         * @example index.html
         */
        readonly spaIndexPageName?: string;
    }

    /**
     * Domain configuration when using the Amazon API Gateway Default Execution Endpoint
     */
    export interface DefaultEndpointConfiguration {
        /**
         * Base path where all assets will be located
         *
         * This is because the default execution endpoint does not serve content at the root but off of a stage. As
         * such this base path will be used to create the deployment stage to serve assets from.
         * @example /public
         * @example /dev/site1
         */
        readonly basePath: string;
    }

    /**
     * Domain configuration when using a Custom Domain Name for Amazon API Gateway
     */
    export interface CustomDomainConfiguration {
        /**
         * Options for specifying the custom domain name setup
         */
        readonly options: DomainNameOptions;
    }

    /**
     * Domain configuration for the distribution endpoint
     */
    export type DomainConfiguration =
        | CustomDomainConfiguration
        | DefaultEndpointConfiguration;

    /**
     * Underlying components for the pattern
     */
    export interface PatternComponents {
        /**
         * Provides access to the underlying Amazon API Gateway REST API that serves as the distribution endpoint for the
         * static content.
         *
         * WARNING: Making changes to the properties of the underlying components of this pattern may cause it to not
         * behave as expected or designed. You do so at your own risk.
         */
        readonly distribution: RestApi;

        /**
         * Provides access to the underlying AWS Lambda function that proxies the static content from Amazon S3.
         *
         * WARNING: Making changes to the properties of the underlying components of this pattern may cause it to not
         * behave as expected or designed. You do so at your own risk.
         */
        readonly proxy: Function;

        /**
         * Provides access to the underlying Amazon S3 bucket that stores the static content.
         *
         * WARNING: Making changes to the properties of the underlying components of this pattern may cause it to not
         * behave as expected or designed. You do so at your own risk.
         */
        readonly store: Bucket;
    }
}
