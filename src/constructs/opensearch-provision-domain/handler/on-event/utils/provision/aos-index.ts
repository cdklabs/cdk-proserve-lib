// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ProvisioningConfigurationFile } from '../../../types/provisioning-configuration-file';
import { BaseProvisioner, EntityType } from './base';

/**
 * Provisioner for indices within an Amazon OpenSearch Service domain
 */
export class IndexProvisioner extends BaseProvisioner {
    protected override type: EntityType = 'indices';

    protected override async create(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        const current = await this.configuration.client.get(`/${entity.name}`);

        if (current.statusCode === 200) {
            console.info(`Index ${entity.name} already exists, skipping.`);
        } else if (current.statusCode === 404) {
            await this.configuration.client.put(
                `/${entity.name}`,
                JSON.parse(entity.contents),
                {
                    headers: BaseProvisioner.jsonContentTypeHeader
                }
            );
        } else {
            throw new Error(
                `Unknown state of index ${entity.name}. Query returned ${current.statusCode}`
            );
        }
    }

    protected override update(
        _entity: ProvisioningConfigurationFile
    ): Promise<void> {
        return BaseProvisioner.noOperation();
    }

    protected override async delete(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        await this.configuration.client.delete(`/${entity.name}`);
    }
}
