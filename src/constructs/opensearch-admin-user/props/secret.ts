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
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { IParameter } from 'aws-cdk-lib/aws-ssm';

/**
 * Identifies how the admin user password is stored in the account
 */
export type PasswordSecretType = 'parameter' | 'secret';

/**
 * Properties for the admin user password common to all vault types
 */
export interface CommonPasswordProps {
    /**
     * Identifies how the admin user password is stored in the account
     */
    readonly type: PasswordSecretType;
}

/**
 * Properties for the admin user password specific to when the credential is stored in AWS Systems Manager Parameter Store
 */
export interface PasswordParameterProps extends CommonPasswordProps {
    readonly type: 'parameter';

    /**
     * Reference to the AWS Systems Manager Parameter Store parameter that contains the admin credential
     */
    readonly parameter: IParameter;
}

/**
 * Properties for the admin user password specific to when the credential is stored in AWS Secrets Manager
 */
export interface PasswordSecretProps extends CommonPasswordProps {
    /**
     * Identifies how the admin user password is stored in the account
     */
    readonly type: 'secret';

    /**
     * Reference to the AWS Secrets Manager secret that contains the admin credential
     */
    readonly secret: ISecret;

    /**
     * Optional encryption key that protects the secret
     */
    readonly encryption?: IKey;
}
