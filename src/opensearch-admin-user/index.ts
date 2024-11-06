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
import { Aws, CustomResource, Duration } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { IDomain } from 'aws-cdk-lib/aws-opensearchservice';
import { Queue, QueueEncryption } from 'aws-cdk-lib/aws-sqs';
import { IParameter } from 'aws-cdk-lib/aws-ssm';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

/**
 * Properties for the OpensearchAdminUser construct.
 */
export interface OpensearchAdminUserProps {
    /**
     * The SSM parameter containing the username for the Opensearch admin user.
     */
    readonly username: IParameter;

    /**
     * The SSM parameter containing the password for the Opensearch admin user.
     */
    readonly password: IParameter;

    /**
     * The Opensearch domain to which the admin user will be added.
     */
    readonly domain: IDomain;

    /**
     * Optional. The KMS key used to encrypt the Opensearch domain.
     * If provided, the construct will grant the necessary permissions to use this key.
     */
    readonly domainKey?: IKey;

    /**
     * Optional. The KMS key used to encrypt the worker resources (e.g., Lambda function environment variables).
     * If provided, this key will be used for encryption; otherwise, an AWS managed key will be used.
     */
    readonly workerEncryption?: IKey;
}

/**
 * OpensearchAdminUser construct creates a custom resource to manage an admin user for an Amazon Opensearch domain.
 *
 * This construct creates a Lambda-backed custom resource that adds an admin user to the specified Opensearch domain.
 * It uses the provided SSM parameters for the username and password, and sets up the necessary IAM permissions
 * for the Lambda function to interact with the Opensearch domain and SSM parameters.
 *
 * The construct also handles encryption for the Lambda function's environment variables and dead letter queue,
 * using either a provided KMS key or an AWS managed key.
 *
 * @example
 * const adminUser = new OpensearchAdminUser(this, 'OpensearchAdminUser', {
 *   username: usernameParameter,
 *   password: passwordParameter,
 *   domain: opensearchDomain,
 *   domainKey: opensearchDomainKey,
 *   workerEncryption: workerKmsKey
 * });
 */
export class OpensearchAdminUser extends Construct {
    private static serviceTokens = new Map<string, string>();

    private static getOrBuildProvider(
        scope: Construct,
        props: OpensearchAdminUserProps
    ): string {
        const stackId = scope.node.id;

        if (!OpensearchAdminUser.serviceTokens.has(stackId)) {
            const onEventHandler = new NodejsFunction(
                scope,
                'OpensearchAdminUserCrOnEvent',
                {
                    bundling: {
                        minify: true
                    },
                    entry: join(__dirname, 'handler', 'on-event', 'index.ts'),
                    handler: 'index.handler',
                    memorySize: 512,
                    timeout: Duration.minutes(1),
                    runtime: Runtime.NODEJS_18_X,
                    environmentEncryption: props.workerEncryption,
                    deadLetterQueue: new Queue(
                        scope,
                        'OpensearchAdminUserCrOnEventFailed',
                        {
                            encryption: props.workerEncryption
                                ? QueueEncryption.KMS
                                : QueueEncryption.KMS_MANAGED,
                            encryptionMasterKey: props.workerEncryption
                        }
                    )
                }
            );

            onEventHandler.addToRolePolicy(
                new PolicyStatement({
                    actions: ['es:UpdateDomainConfig'],
                    effect: Effect.ALLOW,
                    resources: [
                        `arn:${Aws.PARTITION}:es:${Aws.REGION}:${Aws.ACCOUNT_ID}:domain/${props.domain.domainName}`
                    ]
                })
            );

            if (props.domainKey) {
                props.domainKey.grant(onEventHandler, 'kms:DescribeKey');
            }

            props.username.grantRead(onEventHandler);
            props.password.grantRead(onEventHandler);

            OpensearchAdminUser.serviceTokens.set(
                stackId,
                new Provider(scope, 'OpensearchAdminUserCrProvider', {
                    onEventHandler: onEventHandler
                }).serviceToken
            );
        }

        return OpensearchAdminUser.serviceTokens.get(stackId)!;
    }

    constructor(scope: Construct, id: string, props: OpensearchAdminUserProps) {
        super(scope, id);

        new CustomResource(this, 'OpensearchAdminUserCr', {
            serviceToken: OpensearchAdminUser.getOrBuildProvider(scope, props),
            properties: {
                DomainName: props.domain.domainName,
                PasswordParameterName: props.password.parameterName,
                UsernameParameterName: props.username.parameterName
            },
            resourceType: 'Custom::OpensearchAdminUser'
        });
    }
}
