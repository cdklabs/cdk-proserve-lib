// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { BaseProvisioner, EntityType } from './base';
import { DestructiveOperation } from '../../../../../../types';
import { Json } from '../../../../../../types/json';
import { ProvisionerConfiguration } from '../../../types/provisioner-configuration';

/**
 * Provisioner for cluster settings within an Amazon OpenSearch Service domain
 */
export class ClusterSettingsProvisioner extends BaseProvisioner {
    /**
     * Settings to configure within the Amazon OpenSearch Service domain
     */
    private clusterSettings?: Json;

    protected override type: EntityType = 'cluster-settings';

    /**
     * Create a new provisioner for managing cluster settings
     * @param configuration Configuration for customizing the provisioner
     * @param clusterSettings Settings to configure within the Amazon OpenSearch Service domain
     */
    constructor(
        configuration: ProvisionerConfiguration,
        clusterSettings?: Json
    ) {
        super(configuration);

        if (clusterSettings) {
            this.clusterSettings = clusterSettings;
        }
    }

    override async run(): Promise<void> {
        switch (this.configuration.action) {
            case 'Delete':
                if (
                    this.configuration.allowDestructiveOperations ===
                        DestructiveOperation.DELETE ||
                    this.configuration.allowDestructiveOperations ===
                        DestructiveOperation.ALL
                ) {
                    await this.delete();
                }
                break;
            case 'Create':
                await this.create();
                break;
            case 'Update':
                if (
                    this.configuration.allowDestructiveOperations ===
                        DestructiveOperation.UPDATE ||
                    this.configuration.allowDestructiveOperations ===
                        DestructiveOperation.ALL
                ) {
                    await this.update();
                }
                break;
            default:
                throw new Error('Unknown provisioning action');
        }
    }

    /**
     * Handles the CREATE action
     */
    protected override async create(): Promise<void> {
        await this.configuration.client.put(
            '/_cluster/settings',
            this.clusterSettings,
            {
                headers: BaseProvisioner.jsonContentTypeHeader
            }
        );
    }

    /**
     * Handles the UPDATE action
     */
    protected override async update(): Promise<void> {
        await this.create();
    }

    /**
     * Handles the DELETE action
     */
    protected override async delete(): Promise<void> {
        return BaseProvisioner.noOperation();
    }
}
