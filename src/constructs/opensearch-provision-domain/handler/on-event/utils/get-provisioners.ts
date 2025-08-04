// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdkCustomResourceEvent } from 'aws-lambda';
import {
    ClusterSettingsProvisioner,
    ComponentTemplateProvisioner,
    IndexProvisioner,
    IndexTemplateProvisioner,
    IsmPolicyProvisioner,
    RoleMappingProvisioner,
    RoleProvisioner,
    SavedObjectProvisioner
} from './provision';
import { BaseProvisioner } from './provision/base';
import { ProvisionerConfiguration } from '../../types/provisioner-configuration';
import { ResourceProperties } from '../../types/resource-properties';

/**
 * Creates, configures, and orders all provisioners
 * @param event Input metadata for the custom resource
 * @param config Configuration for the provisioners
 * @returns Provisioners
 */
export function getProvisioners(
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
