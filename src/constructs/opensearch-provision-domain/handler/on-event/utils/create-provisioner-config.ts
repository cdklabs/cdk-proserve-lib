// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdkCustomResourceEvent } from 'aws-lambda';
import { getClient } from './client';
import { ProvisionerConfiguration } from '../../types/provisioner-configuration';
import { ResourceProperties } from '../../types/resource-properties';

/**
 * Creates the configuration to be used by provisioners
 * @param event Input metadata for the custom resource
 * @param assetPath Location of the extracted provisioning configuration assets
 * @returns Provisioner configuration
 */
export function createProvisionerConfig(
    event: CdkCustomResourceEvent<ResourceProperties>,
    assetPath: string
): ProvisionerConfiguration {
    return {
        action: event.RequestType,
        allowDestructiveOperations:
            event.ResourceProperties.AllowDestructiveOperations,
        assetPath: assetPath,
        client: getClient(event),
        domainType: event.ResourceProperties.DomainType
    };
}
