// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { Aws, CustomResource, Duration, Stack } from 'aws-cdk-lib';
import {
    Effect,
    Policy,
    PolicyDocument,
    PolicyStatement
} from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { IParameter } from 'aws-cdk-lib/aws-ssm';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { LambdaConfiguration } from '../../types';
import { SecureFunction } from '../secure-function';
import {
    ResourceProperties,
    ServerCertificateElement
} from './handler/types/resource-properties';

/**
 * Properties for the IamServerCertificate construct.
 */
export interface IamServerCertificateProps {
    /**
     * Prefix to prepend to the AWS IAM Server Certificate name
     */
    readonly prefix: string;

    /**
     * AWS Systems Manager parameter or AWS Secrets Manager secret which contains the public certificate
     */
    readonly certificate:
        | IamServerCertificate.ParameterProps
        | IamServerCertificate.SecretProps;

    /**
     * AWS Systems Manager parameter or AWS Secrets Manager secret which contains the certificate chain if applicable
     */
    readonly certificateChain?:
        | IamServerCertificate.ParameterProps
        | IamServerCertificate.SecretProps;

    /**
     * AWS Systems Manager parameter or AWS Secrets Manager secret which contains the private key
     */
    readonly privateKey:
        | IamServerCertificate.ParameterProps
        | IamServerCertificate.SecretProps;

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
 * Manages an AWS Identity and Access Management Server Certificate for use in regions/partitions where AWS Certificate
 * Manager is not available.
 *
 * This construct allows you to create an IAM Server Certificate using a certificate and private key stored in either
 * AWS Systems Manager Parameter Store or AWS Secrets Manager. It uses a Custom Resource to manage the lifecycle of the
 * server certificate.
 *
 * The construct also handles encryption for the framework resources using either a provided KMS key or an
 * AWS managed key.
 *
 * @example
 *
 * import { Key } from 'aws-cdk-lib/aws-kms';
 * import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
 * import { StringParameter } from 'aws-cdk-lib/aws-ssm';
 * import { IamServerCertificate } from '@cdklabs/cdk-proserve-lib/constructs';
 *
 * const keyArn = 'arn:aws:kms:us-east-1:111111111111:key/sample-key-id';
 * const key = Key.fromKeyArn(this, 'Encryption', keyArn);
 *
 * const certificateData = StringParameter.fromSecureStringParameterAttributes(this, 'CertificateData', {
 *      parameterName: 'sample-parameter',
 *      encryptionKey: key
 * });
 *
 * const privateKeyData = Secret.fromSecretAttributes(this, 'PrivateKeySecret', {
 *      encryptionKey: key,
 *      secretCompleteArn: 'arn:aws:secretsmanager:us-east-1:111111111111:secret:PrivateKeySecret-aBc123'
 * });
 *
 * const certificate = new IamServerCertificate(this, 'ServerCertificate', {
 *      certificate: {
 *          parameter: certificateData,
 *          encryption: key
 *      },
 *      privateKey: {
 *          secret: privateKeyData,
 *          encryption: key
 *      },
 *      prefix: 'myapp'
 * });
 */
export class IamServerCertificate extends Construct {
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
        props: IamServerCertificateProps
    ): Provider {
        const stackId = Stack.of(scope).node.id;

        if (!IamServerCertificate.serviceTokens.has(stackId)) {
            // Create a stack level construct to manage the framework
            const provider = new Construct(
                scope,
                `Cr${IamServerCertificate.name}`
            );

            const onEventHandler = new SecureFunction(provider, 'OnEvent', {
                code: Code.fromAsset(join(__dirname, 'handler', 'on-event')),
                handler: 'index.handler',
                memorySize: 512,
                timeout: Duration.minutes(1),
                runtime: Runtime.NODEJS_22_X,
                encryption: props.encryption,
                ...props.lambdaConfiguration
            });

            IamServerCertificate.serviceTokens.set(
                stackId,
                new Provider(provider, 'Provider', {
                    onEventHandler: onEventHandler.function
                })
            );
        }

        return IamServerCertificate.serviceTokens.get(stackId)!;
    }

    /**
     * Determines if the value for the Certificate/Private Key comes from AWS Secrets Manager
     * @param value Value for either the Certificate or Private Key
     * @returns True if the value comes from AWS Secrets Manager, false if it comes from AWS Systems Manager Parameter Store
     */
    private static isSecret(
        value:
            | IamServerCertificate.ParameterProps
            | IamServerCertificate.SecretProps
    ): value is IamServerCertificate.SecretProps {
        const secretProperty: keyof IamServerCertificate.SecretProps = 'secret';
        return secretProperty in value;
    }

    /**
     * Translates the CDK construct properties to the Custom Resource
     * property format
     * @param props Metadata for configuring the Custom Resource
     * @returns Input for the actual Custom Resource worker
     */
    private static createCustomResourceProperties(
        props: IamServerCertificateProps
    ): ResourceProperties {
        const certificateFromSecret = IamServerCertificate.isSecret(
            props.certificate
        );
        const privateKeyFromSecret = IamServerCertificate.isSecret(
            props.privateKey
        );

        const certificateChain: ServerCertificateElement | undefined = (() => {
            if (props.certificateChain) {
                const certificateChainFromSecret =
                    IamServerCertificate.isSecret(props.certificateChain);

                return {
                    Id: certificateChainFromSecret
                        ? props.certificateChain.secret.secretArn
                        : props.certificateChain.parameter.parameterName,
                    Source: certificateChainFromSecret ? 'secret' : 'parameter'
                };
            } else {
                return undefined;
            }
        })();

        return {
            Certificate: {
                Id: certificateFromSecret
                    ? props.certificate.secret.secretArn
                    : props.certificate.parameter.parameterName,
                Source: certificateFromSecret ? 'secret' : 'parameter'
            },
            CertificateChain: certificateChain,
            CertificatePrefix: props.prefix.endsWith('-')
                ? props.prefix.slice(0, -1)
                : props.prefix,
            PrivateKey: {
                Id: privateKeyFromSecret
                    ? props.privateKey.secret.secretArn
                    : props.privateKey.parameter.parameterName,
                Source: privateKeyFromSecret ? 'secret' : 'parameter'
            }
        };
    }

    /**
     * ARN for the created AWS IAM Server Certificate
     */
    readonly arn: string;

    /**
     * Creates a new AWS IAM Server Certificate
     * @param scope Parent to which the Custom Resource belongs
     * @param id Unique identifier for this instance
     * @param props Metadata for configuring the Custom Resource
     */
    constructor(
        scope: Construct,
        id: string,
        props: IamServerCertificateProps
    ) {
        super(scope, id);

        const provider = IamServerCertificate.getOrBuildProvider(scope, props);

        // Create permissions as a separate policy to ensure in DELETEs they are not removed until after the CR has run
        const providerPermissions = new Policy(this, 'Permissions', {
            document: new PolicyDocument({
                statements: [
                    new PolicyStatement({
                        actions: [
                            'iam:UploadServerCertificate',
                            'iam:DeleteServerCertificate'
                        ],
                        effect: Effect.ALLOW,
                        resources: [
                            `arn:${Aws.PARTITION}:iam::${Aws.ACCOUNT_ID}:server-certificate/${props.prefix}-*`
                        ]
                    })
                ]
            })
        });

        if (props.certificate.encryption) {
            props.certificate.encryption.grantDecrypt(providerPermissions);
        }

        if (IamServerCertificate.isSecret(props.certificate)) {
            this.grantReadForSecret(providerPermissions, props.certificate);
        } else {
            props.certificate.parameter.grantRead(providerPermissions);
        }

        if (props.certificateChain) {
            if (props.certificateChain.encryption) {
                props.certificateChain.encryption.grantDecrypt(
                    providerPermissions
                );
            }

            if (IamServerCertificate.isSecret(props.certificateChain)) {
                this.grantReadForSecret(
                    providerPermissions,
                    props.certificateChain
                );
            } else {
                props.certificateChain.parameter.grantRead(providerPermissions);
            }
        }

        if (props.privateKey.encryption) {
            props.privateKey.encryption.grantDecrypt(providerPermissions);
        }

        if (IamServerCertificate.isSecret(props.privateKey)) {
            this.grantReadForSecret(providerPermissions, props.privateKey);
        } else {
            props.privateKey.parameter.grantRead(providerPermissions);
        }

        provider.onEventHandler.role!.attachInlinePolicy(providerPermissions);

        const cr = new CustomResource(this, 'IamServerCertificate', {
            serviceToken: provider.serviceToken,
            properties:
                IamServerCertificate.createCustomResourceProperties(props),
            resourceType: 'Custom::IamServerCertificate'
        });

        this.arn = cr.getAttString('Arn');
    }

    /**
     * Grants read permissions for an AWS Secrets Manager Secret and its KMS key if it is encrypted
     * @param policy IAM policy to add read permissions to
     * @param resources Secret and its optional encryption key
     */
    private grantReadForSecret(
        policy: Policy,
        resources: IamServerCertificate.SecretProps
    ) {
        policy.addStatements(
            new PolicyStatement({
                actions: [
                    'secretsmanager:GetSecretValue',
                    'secretsmanager:DescribeSecret'
                ],
                effect: Effect.ALLOW,
                resources: [`${resources.secret.secretArn}*`]
            })
        );
    }
}

export namespace IamServerCertificate {
    /**
     * Properties for a server certificate element regardless of where it is stored
     */
    interface ElementProps {
        /**
         * Optional encryption key that protects the secret
         */
        readonly encryption?: IKey;
    }

    /**
     * Properties for a server certificate element when it is stored in AWS Systems Manager Parameter Store
     */
    export interface ParameterProps extends ElementProps {
        /**
         * Reference to the AWS Systems Manager Parameter Store parameter that contains the data
         */
        readonly parameter: IParameter;
    }

    /**
     * Properties for a server certificate element when it is stored in AWS Secrets Manager
     */
    export interface SecretProps extends ElementProps {
        /**
         * Reference to the AWS Secrets Manager secret that contains the data
         */
        readonly secret: ISecret;
    }
}
