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

import { OpenSearch } from '@aws-sdk/client-opensearch';
import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { SSM } from '@aws-sdk/client-ssm';
import {
    CdkCustomResourceEvent,
    CdkCustomResourceResponse,
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceUpdateEvent,
    Context
} from 'aws-lambda';
import {
    FailedToRetrieveCredentialValueException,
    InvalidPasswordCredentialVaultException
} from '../types/exceptions';
import { ResourceProperties } from '../types/resource-properties';

// Clients
const aos = new OpenSearch();
const secretsmanager = new SecretsManager();
const ssm = new SSM();

/**
 * Helper function to retrieve the password value from the appropriate vault
 * @param props Properties for the current CR invocation
 * @returns Password value
 * @throws {FailedToRetrieveCredentialValueException}
 * @throws {InvalidPasswordCredentialVaultException}
 */
async function getPasswordValue(props: ResourceProperties): Promise<string> {
    if (props.PasswordParameterName && props.PasswordSecretArn) {
        throw new InvalidPasswordCredentialVaultException();
    } else if (props.PasswordParameterName) {
        const aosPasswordResponse = await ssm.getParameter({
            Name: props.PasswordParameterName,
            WithDecryption: true
        });

        if (!aosPasswordResponse.Parameter?.Value) {
            throw new FailedToRetrieveCredentialValueException(
                'parameter-store'
            );
        }

        return aosPasswordResponse.Parameter!.Value!;
    } else if (props.PasswordSecretArn) {
        const aosPasswordResponse = await secretsmanager.getSecretValue({
            SecretId: props.PasswordSecretArn
        });

        if (!aosPasswordResponse.SecretString) {
            throw new FailedToRetrieveCredentialValueException(
                'secrets-manager'
            );
        }

        return aosPasswordResponse.SecretString!;
    } else {
        throw new InvalidPasswordCredentialVaultException();
    }
}

/**
 * Handles AWS CloudFormation CREATE calls
 * @param event Input metadata for the custom resource
 * @returns A promise that resolves to a CloudFormation custom resource response
 */
async function onCreate(
    event: CloudFormationCustomResourceCreateEvent<ResourceProperties>
): Promise<CdkCustomResourceResponse<never>> {
    const props = event.ResourceProperties;

    const aosUsernameResponse = await ssm.getParameter({
        Name: props.UsernameParameterName,
        WithDecryption: true
    });
    const aosPassword = await getPasswordValue(props);

    await aos.updateDomainConfig({
        DomainName: props.DomainName,
        AdvancedSecurityOptions: {
            MasterUserOptions: {
                MasterUserName: aosUsernameResponse.Parameter!.Value!,
                MasterUserPassword: aosPassword
            },
            InternalUserDatabaseEnabled: true
        }
    });

    return {
        PhysicalResourceId: props.DomainName
    };
}

/**
 * Handles AWS CloudFormation UPDATE calls
 * @param event Input metadata for the custom resource
 * @returns A promise that resolves to a CloudFormation custom resource response
 */
function onUpdate(
    event: CloudFormationCustomResourceUpdateEvent<ResourceProperties>
): CdkCustomResourceResponse<never> {
    return {
        PhysicalResourceId: event.PhysicalResourceId
    };
}

/**
 * Handles AWS CloudFormation DELETE calls
 * @param event Input metadata for the custom resource
 * @returns A promise that resolves to a CloudFormation custom resource response
 */
function onDelete(
    event: CloudFormationCustomResourceDeleteEvent<ResourceProperties>
): CdkCustomResourceResponse<never> {
    return {
        PhysicalResourceId: event.PhysicalResourceId
    };
}

/**
 * Entry Point
 * @param event Input metadata for the custom resource
 * @param _context Context for execution of the Lambda function
 * @returns A promise that resolves to a CloudFormation custom resource response
 */
export async function handler(
    event: CdkCustomResourceEvent<ResourceProperties>,
    _context: Context
): Promise<CdkCustomResourceResponse<never>> {
    switch (event.RequestType) {
        case 'Create':
            console.info('Running CREATE...');
            return onCreate(event);
        case 'Delete':
            console.info('Running DELETE...');
            return onDelete(event);
        case 'Update':
            console.info('Running UPDATE...');
            return onUpdate(event);
    }
}
