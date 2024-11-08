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
import { SSM } from '@aws-sdk/client-ssm';
import {
    CdkCustomResourceEvent,
    CdkCustomResourceResponse,
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceUpdateEvent,
    Context
} from 'aws-lambda';

import { IResourceProperties } from '../types/resource-properties';

// Clients
const aos = new OpenSearch();
const ssm = new SSM();

/**
 * Handles AWS CloudFormation CREATE calls
 * @param event Input metadata for the custom resource
 * @returns A promise that resolves to a CloudFormation custom resource response
 */
async function onCreate(
    event: CloudFormationCustomResourceCreateEvent<IResourceProperties>
): Promise<CdkCustomResourceResponse<never>> {
    const props = event.ResourceProperties;

    const aosUsernameResponse = await ssm.getParameter({
        Name: props.UsernameParameterName,
        WithDecryption: true
    });
    const aosPasswordResponse = await ssm.getParameter({
        Name: props.PasswordParameterName,
        WithDecryption: true
    });

    await aos.updateDomainConfig({
        DomainName: props.DomainName,
        AdvancedSecurityOptions: {
            MasterUserOptions: {
                MasterUserName: aosUsernameResponse.Parameter!.Value!,
                MasterUserPassword: aosPasswordResponse.Parameter!.Value!
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
    event: CloudFormationCustomResourceUpdateEvent<IResourceProperties>
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
    event: CloudFormationCustomResourceDeleteEvent<IResourceProperties>
): CdkCustomResourceResponse<never> {
    return {
        PhysicalResourceId: event.PhysicalResourceId
    };
}

export async function handler(
    event: CdkCustomResourceEvent<IResourceProperties>,
    _context: Context
): Promise<CdkCustomResourceResponse<never>> {
    let response: CdkCustomResourceResponse<never>;

    try {
        switch (event.RequestType) {
            case 'Create':
                console.info('Running CREATE...');
                response = await onCreate(event);
                break;
            case 'Delete':
                console.info('Running DELETE...');
                response = onDelete(event);
                break;
            case 'Update':
                console.info('Running UPDATE...');
                response = onUpdate(event);
                break;
        }

        console.info(response);
        return response;
    } catch (e) {
        console.info('Action failed');
        console.info(
            `Reason: ${e instanceof Error ? e.message : (e as string)}`
        );
        throw e;
    }
}
