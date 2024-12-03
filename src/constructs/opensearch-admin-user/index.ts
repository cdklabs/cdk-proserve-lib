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

import { join } from 'path';
import { Aws, CustomResource, Duration, Stack } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { IDomain } from 'aws-cdk-lib/aws-opensearchservice';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { IParameter } from 'aws-cdk-lib/aws-ssm';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { LambdaConfiguration } from '../../interfaces';
import { SecureNodejsFunction } from '../secure/nodejs-function';
import { ResourceProperties } from './handler/types/resource-properties';

/**
 * Properties for the OpenSearchAdminUser construct.
 */
export interface OpenSearchAdminUserProps {
    /**
     * The SSM parameter containing the username for the OpenSearch admin user.
     */
    readonly username: IParameter;

    /**
     * The SSM parameter or Secret containing the password for the OpenSearch admin user.
     */
    readonly credential:
        | OpenSearchAdminUser.PasswordParameterProps
        | OpenSearchAdminUser.PasswordSecretProps;

    /**
     * The OpenSearch domain to which the admin user will be added.
     */
    readonly domain: IDomain;

    /**
     * Optional. The KMS key used to encrypt the OpenSearch domain.
     * If provided, the construct will grant the necessary permissions to use this key.
     */
    readonly domainKey?: IKey;

    /**
     * Optional. The KMS key used to encrypt the worker resources (e.g., Lambda function environment variables).
     * If provided, this key will be used for encryption; otherwise, an AWS managed key will be used.
     */
    readonly encryption?: IKey;

    /**
     * Optional Lambda configuration settings.
     */
    readonly lambdaConfiguration?: LambdaConfiguration;
}

/**
 * OpenSearchAdminUser construct creates a custom resource to manage an admin user for an Amazon OpenSearch domain.
 *
 * This construct creates a Lambda-backed custom resource that adds an admin user to the specified OpenSearch domain.
 * It uses the provided SSM parameter for the username, a provided SSM parameter or Secrets Manager secret for the
 * password, and sets up the necessary IAM permissions for the Lambda function to interact with the OpenSearch domain
 * and SSM parameter(s) and/or secret.
 *
 * The construct also handles encryption for the Lambda function's environment variables and dead letter queue,
 * using either a provided KMS key or an AWS managed key.
 */
export class OpenSearchAdminUser extends Construct {
    /**
     * Mapping of providers for each CDK stack
     */
    private static serviceTokens = new Map<string, Provider>();

    /**
     * Builds the provider to support the custom resource
     *
     * @param scope Parent to which the custom resource belongs
     * @param props Metadata for configuring the custom resource
     *
     * @returns Provider for the worker
     */
    private static getOrBuildProvider(
        scope: Construct,
        props: OpenSearchAdminUserProps
    ): Provider {
        const stackId = Stack.of(scope).node.id;

        if (!OpenSearchAdminUser.serviceTokens.has(stackId)) {
            const provider = new Construct(
                scope,
                `Cr${OpenSearchAdminUser.name}`
            );

            const onEventHandler = new SecureNodejsFunction(
                provider,
                'OnEvent',
                {
                    bundling: {
                        minify: true
                    },
                    entry: join(__dirname, 'handler', 'on-event', 'index.ts'),
                    handler: 'index.handler',
                    memorySize: 512,
                    timeout: Duration.minutes(1),
                    runtime: Runtime.NODEJS_20_X,
                    encryption: props.encryption,
                    ...props.lambdaConfiguration
                }
            );

            OpenSearchAdminUser.serviceTokens.set(
                stackId,
                new Provider(provider, 'Provider', {
                    onEventHandler: onEventHandler.nodejsFunction
                })
            );
        }

        return OpenSearchAdminUser.serviceTokens.get(stackId)!;
    }

    /**
     * Translates the CDK construct properties to the custom resource
     * property format
     * @param props Metadata for configuring the custom resource
     * @returns Input for the actual custom resource worker
     */
    private static createCustomResourceProperties(
        props: OpenSearchAdminUserProps
    ): ResourceProperties {
        return {
            DomainName: props.domain.domainName,
            PasswordParameterName:
                'parameter' in props.credential
                    ? props.credential.parameter.parameterName
                    : undefined,
            PasswordSecretArn:
                'secret' in props.credential
                    ? props.credential.secret.secretArn
                    : undefined,
            UsernameParameterName: props.username.parameterName
        };
    }

    /**
     * Constructor
     * @param scope Parent to which the custom resource belongs
     * @param id Unique identifier for this instance
     * @param props Metadata for configuring the custom resource
     */
    constructor(scope: Construct, id: string, props: OpenSearchAdminUserProps) {
        super(scope, id);

        const provider = OpenSearchAdminUser.getOrBuildProvider(scope, props);

        provider.onEventHandler.addToRolePolicy(
            new PolicyStatement({
                actions: ['es:UpdateDomainConfig'],
                effect: Effect.ALLOW,
                resources: [
                    `arn:${Aws.PARTITION}:es:${Aws.REGION}:${Aws.ACCOUNT_ID}:domain/${props.domain.domainName}`
                ]
            })
        );

        if (props.domainKey) {
            props.domainKey.grant(provider.onEventHandler, 'kms:DescribeKey');
        }

        props.username.grantRead(provider.onEventHandler);

        if ('parameter' in props.credential) {
            props.credential.parameter.grantRead(provider.onEventHandler);
        } else {
            props.credential.secret.grantRead(provider.onEventHandler);

            if (props.credential.encryption) {
                props.credential.encryption.grantEncryptDecrypt(
                    provider.onEventHandler
                );
            }
        }

        new CustomResource(this, 'OpenSearchAdminUser', {
            serviceToken: provider.serviceToken,
            properties:
                OpenSearchAdminUser.createCustomResourceProperties(props),
            resourceType: 'Custom::OpenSearchAdminUser'
        });
    }
}

export namespace OpenSearchAdminUser {
    /**
     * Properties for the admin user password specific to when the credential is stored in AWS Systems Manager Parameter Store
     */
    export interface PasswordParameterProps {
        /**
         * Reference to the AWS Systems Manager Parameter Store parameter that contains the admin credential
         */
        readonly parameter: IParameter;
    }

    /**
     * Properties for the admin user password specific to when the credential is stored in AWS Secrets Manager
     */
    export interface PasswordSecretProps {
        /**
         * Reference to the AWS Secrets Manager secret that contains the admin credential
         */
        readonly secret: ISecret;

        /**
         * Optional encryption key that protects the secret
         */
        readonly encryption?: IKey;
    }
}
