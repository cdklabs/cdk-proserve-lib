// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdkCustomResourceEvent } from 'aws-lambda';
import { getClient } from './client';
import { detectDomainType } from './detect-domain-type';
import { ProvisionerConfiguration } from '../../types/provisioner-configuration';
import { ResourceProperties } from '../../types/resource-properties';
import { waitForOpenSearchAvailability } from '../../../../../common/lambda/aos-availability-check';

/**
 * Creates the configuration to be used by provisioners
 * @param event Input metadata for the custom resource
 * @param assetPath Location of the extracted provisioning configuration assets
 * @returns Provisioner configuration
 */
export async function createProvisionerConfig(
    event: CdkCustomResourceEvent<ResourceProperties>,
    assetPath: string
): Promise<ProvisionerConfiguration> {
    const client = getClient(event);

    // Wait for OpenSearch to be available before proceeding
    await waitForOpenSearchAvailability(client);

    const domainType = await detectDomainType(client);

    return {
        action: event.RequestType,
        allowDestructiveOperations:
            event.ResourceProperties.AllowDestructiveOperations,
        assetPath: assetPath,
        client: client,
        domainType: domainType
    };
}
