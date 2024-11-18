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

import { IKey } from 'aws-cdk-lib/aws-kms';
import { IDomain } from 'aws-cdk-lib/aws-opensearchservice';
import { IParameter } from 'aws-cdk-lib/aws-ssm';
import { PasswordParameterProps, PasswordSecretProps } from './secret';
import { LambdaConfiguration } from '../../../interfaces';

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
    readonly password: PasswordParameterProps | PasswordSecretProps;

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
