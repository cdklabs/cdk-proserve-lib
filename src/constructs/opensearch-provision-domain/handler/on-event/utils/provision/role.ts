// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ProvisioningConfigurationFile } from '../../../types/provisioning-configuration-file';
import { BaseProvisioner, EntityType } from './base';

/**
 * Provisioner for Roles within an Amazon OpenSearch Service domain
 */
export class RoleProvisioner extends BaseProvisioner {
    protected override type: EntityType = 'roles';

    protected override async create(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        await this.configuration.client.put(
            `/_plugins/_security/api/roles/${entity.name}`, // TODO: Make generalized to Kibana too
            JSON.parse(entity.contents),
            {
                headers: BaseProvisioner.jsonContentTypeHeader
            }
        );
    }

    protected override async update(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        await this.create(entity);
    }

    protected override async delete(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        await this.configuration.client.delete(
            `/_plugins/_security/api/roles/${entity.name}` // TODO: Make generalized to Kibana too
        );
    }
}
