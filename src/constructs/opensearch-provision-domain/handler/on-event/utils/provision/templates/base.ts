// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ProvisioningConfigurationFile } from '../../../../types/provisioning-configuration-file';
import { BaseProvisioner } from '../base';

/**
 * Describes the type of template that is being provisioned within the Amazon OpenSearch Service domain
 */
export type TemplateType = 'component' | 'index';

/**
 * Base class for managing provisioning template entities within the Amazon OpenSearch Service domain
 */
export abstract class TemplateProvisioner extends BaseProvisioner {
    /**
     * Type of template the provisioner is responsible for handling
     */
    protected abstract templateType: TemplateType;

    protected override async create(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        // Check if template exists using HEAD request
        const current = await this.configuration.client.head(
            `/_${this.templateType}_template/${entity.name}`
        );

        if (current.statusCode === 200) {
            console.log(
                `Template ${entity.name} already exists, skipping creation/update`
            );
        } else if (current.statusCode === 404) {
            // Only create if it doesn't exist
            await this.configuration.client.put(
                `/_${this.templateType}_template/${entity.name}`,
                JSON.parse(entity.contents),
                {
                    headers: BaseProvisioner.jsonContentTypeHeader
                }
            );
        } else {
            throw new Error(
                `Unknown state of ${this.templateType} template ${entity.name}. Query returned ${current.statusCode}`
            );
        }
    }

    protected override async update(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        await this.create(entity);
    }

    protected override async delete(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        const response = await this.configuration.client.delete(
            `/_${this.templateType}_template/${entity.name}`
        );

        if (response.statusCode !== 200) {
            console.warn(
                `Failed to delete ${this.templateType} template ${entity.name}`
            );
        }
    }
}
