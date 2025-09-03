// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    CdkCustomResourceEvent,
    CdkCustomResourceResponse,
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceUpdateEvent,
    Context
} from 'aws-lambda';
import { ResourceProperties } from '../types/resource-properties';
import { downloadAndExtractAsset } from './utils/asset';
import { createProvisionerConfig } from './utils/create-provisioner-config';
import { getProvisioners } from './utils/get-provisioners';

/**
 * Handles AWS CloudFormation CREATE calls
 * @param event Input metadata for the custom resource
 * @returns A CloudFormation custom resource response
 */
async function onCreate(
    event: CloudFormationCustomResourceCreateEvent<ResourceProperties>
): Promise<CdkCustomResourceResponse<never>> {
    const asset = await downloadAndExtractAsset(
        event.ResourceProperties.AssetS3Uri
    );

    const config = await createProvisionerConfig(event, asset.path);
    const provisioners = getProvisioners(event, config);

    for (const provisioner of provisioners) {
        await provisioner.run();
    }

    return {
        PhysicalResourceId: asset.etag
    };
}

/**
 * Handles AWS CloudFormation UPDATE calls
 * @param event Input metadata for the custom resource
 * @returns A CloudFormation custom resource response
 */
async function onUpdate(
    event: CloudFormationCustomResourceUpdateEvent<ResourceProperties>
): Promise<CdkCustomResourceResponse<never>> {
    return new Promise((resolve) => {
        console.warn('No actions are performed for resource UPDATE');

        resolve({
            PhysicalResourceId: event.PhysicalResourceId
        });
    });
}

/**
 * Handles AWS CloudFormation DELETE calls
 * @param event Input metadata for the custom resource
 * @returns A CloudFormation custom resource response
 */
async function onDelete(
    event: CloudFormationCustomResourceDeleteEvent<ResourceProperties>
): Promise<CdkCustomResourceResponse<never>> {
    const asset = await downloadAndExtractAsset(
        event.ResourceProperties.AssetS3Uri
    );

    const config = await createProvisionerConfig(event, asset.path);
    const provisioners = getProvisioners(event, config);

    for (const provisioner of provisioners) {
        await provisioner.run();
    }

    return {
        PhysicalResourceId: event.PhysicalResourceId
    };
}

/**
 * Entry point
 * @param event Input provided to the custom resource
 * @param context AWS Lambda context
 * @returns A promise that resolves to a CloudFormation custom resource response
 */
export async function handler(
    event: CdkCustomResourceEvent<ResourceProperties>,
    _context: Context
): Promise<CdkCustomResourceResponse<never>> {
    switch (event.RequestType) {
        case 'Create':
            return onCreate(event);
        case 'Delete':
            return onDelete(event);
        case 'Update':
            return onUpdate(event);
    }
}
