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
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { ResourceProperties } from './handler/types/resource-properties';
import { OpenSearchAdminUserProps } from './props';

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
 *
 * @example
 * const adminUser = new OpenSearchAdminUser(this, 'OpenSearchAdminUser', {
 *   username: usernameParameter,
 *   password: {
 *       type: 'parameter',
 *       parameter: passwordParameter
 *   },
 *   domain: opensearchDomain,
 *   domainKey: opensearchDomainKey,
 *   workerEncryption: workerKmsKey
 * });
 *
 * @example
 * const adminUser = new OpenSearchAdminUser(this, 'OpenSearchAdminUser', {
 *   username: usernameParameter,
 *   password: {
 *       type: 'secret',
 *       secret: passwordSecret,
 *       encryption: secretEncryptionKey
 *   },
 *   domain: opensearchDomain,
 *   domainKey: opensearchDomainKey,
 *   workerEncryption: workerKmsKey
 * });
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
            const provider = new Construct(scope, 'CrOpenSearchAdminUser');

            const onEventHandler = new NodejsFunction(provider, 'OnEvent', {
                bundling: {
                    minify: true
                },
                entry: join(__dirname, 'handler', 'on-event', 'index.ts'),
                handler: 'index.handler',
                memorySize: 512,
                timeout: Duration.minutes(1),
                runtime: Runtime.NODEJS_20_X,
                environmentEncryption: props.encryption,
                reservedConcurrentExecutions: 5,
                ...props.lambdaConfiguration
            });

            OpenSearchAdminUser.serviceTokens.set(
                stackId,
                new Provider(provider, 'Provider', {
                    onEventHandler: onEventHandler
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
                props.password.type === 'parameter'
                    ? props.password.parameter.parameterName
                    : undefined,
            PasswordSecretArn:
                props.password.type === 'secret'
                    ? props.password.secret.secretArn
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

        if (props.password.type === 'parameter') {
            props.password.parameter.grantRead(provider.onEventHandler);
        } else {
            props.password.secret.grantRead(provider.onEventHandler);

            if (props.password.encryption) {
                props.password.encryption.grantEncryptDecrypt(
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
