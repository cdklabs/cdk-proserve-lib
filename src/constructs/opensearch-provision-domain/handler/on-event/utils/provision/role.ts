// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { BaseProvisioner, EntityType } from './base';
import { ProvisionerConfiguration } from '../../../types/provisioner-configuration';
import { ProvisioningConfigurationFile } from '../../../types/provisioning-configuration-file';

/**
 * Provisioner for Roles within an Amazon OpenSearch Service domain
 */
export class RoleProvisioner extends BaseProvisioner {
    protected override type: EntityType = 'roles';

    /**
     * Partial endpoint for the security tool
     */
    private endpoint: string;

    constructor(configuration: ProvisionerConfiguration) {
        super(configuration);

        this.endpoint =
            this.configuration.domainType === 'Elasticsearch'
                ? '_security/role'
                : '_plugins/_security/api/roles';
    }

    protected override async create(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        await this.configuration.client.put(
            `/${this.endpoint}/${entity.name}`,
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
            `/${this.endpoint}/${entity.name}`
        );
    }
}
