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
import { AwsHttpClient } from '../../../../common/lambda/aws-http-client';
import { downloadS3Asset } from '../../../../common/lambda/download-s3-asset';
import { extractZipFile } from '../../../../common/lambda/extract-zip-file';
import { ProvisionerConfiguration } from '../types/provisioner-configuration';
import { ResourceProperties } from '../types/resource-properties';
import {
    ClusterSettingsProvisioner,
    ComponentTemplateProvisioner,
    IndexProvisioner,
    IndexTemplateProvisioner,
    IsmPolicyProvisioner,
    RoleMappingProvisioner,
    RoleProvisioner,
    SavedObjectProvisioner
} from './utils/provision';
import { BaseProvisioner } from './utils/provision/base';

/**
 * Creates the configuration to be used by provisioners
 * @param event Input metadata for the custom resource
 * @param assetPath Location of the extracted provisioning configuration assets
 * @returns Provisioner configuration
 */
function createProvisionerConfig(
    event: CdkCustomResourceEvent<ResourceProperties>,
    assetPath: string
): ProvisionerConfiguration {
    const client = new AwsHttpClient({
        service: 'es',
        baseUrl: `https://${event.ResourceProperties.DomainEndpoint}`,
        passNonSuccessfulStatusCodes: true,
        roleArn: event.ResourceProperties.AdminRoleArn,
        timeout: 45000
    });

    return {
        action: event.RequestType,
        allowDestructiveOperations:
            event.ResourceProperties.AllowDestructiveOperations,
        assetPath: assetPath,
        client: client
    };
}

/**
 * Creates, configures, and orders all provisioners
 * @param event Input metadata for the custom resource
 * @param config Configuration for the provisioners
 * @returns Provisioners
 */
function getProvisioners(
    event: CdkCustomResourceEvent<ResourceProperties>,
    config: ProvisionerConfiguration
): BaseProvisioner[] {
    const provisioners: BaseProvisioner[] = [];

    provisioners.push(
        new ClusterSettingsProvisioner(
            config,
            event.ResourceProperties.ClusterSettings
        )
    );
    provisioners.push(new IsmPolicyProvisioner(config));
    provisioners.push(new ComponentTemplateProvisioner(config));
    provisioners.push(new IndexTemplateProvisioner(config));
    provisioners.push(new IndexProvisioner(config));
    provisioners.push(new RoleProvisioner(config));
    provisioners.push(
        new RoleMappingProvisioner(
            config,
            event.ResourceProperties.DynamicRoleMappings
        )
    );
    provisioners.push(new SavedObjectProvisioner(config));

    return config.action === 'Delete' ? provisioners.reverse() : provisioners;
}

/**
 * Downloads and extracts the zip asset containing all the provisioning configuration files
 * @param uri URI to the zip asset in Amazon Simple Storage Service (S3)
 * @returns Etag for the asset downloaded and path on disk to the extracted files
 */
async function downloadAndExtractAsset(
    uri: string
): Promise<{ etag: string; path: string }> {
    const asset = await downloadS3Asset(uri);
    const finalPath = extractZipFile(asset.filePath);

    return {
        etag: asset.etag,
        path: finalPath
    };
}

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

    const config = createProvisionerConfig(event, asset.path);
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
    // TODO: Probably doesnt work properly since no access to OLD resource properties
    const asset = await downloadAndExtractAsset(
        event.ResourceProperties.AssetS3Uri
    );

    const config = createProvisionerConfig(event, asset.path);
    const provisioners = getProvisioners(event, config);

    for (const provisioner of provisioners) {
        await provisioner.run();
    }

    return {
        PhysicalResourceId: asset.etag
    };
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

    const config = createProvisionerConfig(event, asset.path);
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
