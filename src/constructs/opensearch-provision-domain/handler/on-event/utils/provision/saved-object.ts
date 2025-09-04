// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { getRandomValues } from 'node:crypto';
import { BaseProvisioner, EntityType } from './base';
import { ProvisionerConfiguration } from '../../../types/provisioner-configuration';
import { ProvisioningConfigurationFile } from '../../../types/provisioning-configuration-file';

/**
 * Provisioner for Saved Objects within an Amazon OpenSearch Service domain
 */
export class SavedObjectProvisioner extends BaseProvisioner {
    /**
     * Generates the delimiter for a multpart form submission
     * @returns Boundary delimiter
     */
    private static generateMultipartFormBoundary(): string {
        const head = '-'.repeat(26);
        const tail = getRandomValues(new Uint8Array(24))
            .map((v) => +v.toString(16))
            .join('');

        return `${head}${tail}`;
    }

    protected override type: EntityType = 'saved-objects';

    /**
     * Partial endpoint for the visualization tool
     */
    private endpoint: string;

    constructor(configuration: ProvisionerConfiguration) {
        super(configuration);

        this.endpoint =
            configuration.domainType === 'Elasticsearch'
                ? '_kibana'
                : '_dashboards';
    }

    protected override async create(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        const boundary = SavedObjectProvisioner.generateMultipartFormBoundary();
        const boundaryHeader = `--${boundary}`;
        const boundaryFooter = `--${boundary}--`;

        const requestBody = [
            boundaryHeader,
            `Content-Disposition: form-data; name="file"; filename="${entity.name}.ndjson"`,
            `Content-Type: application/x-ndjson`,
            '',
            entity.contents,
            boundaryFooter
        ];

        const xsrfTokenPreamble =
            this.configuration.domainType === 'OpenSearch' ? 'osd' : 'kbn';

        await this.configuration.client.post(
            `/${this.endpoint}/api/saved_objects/_import?overwrite=true`,
            requestBody.join('\r\n'),
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${boundary}`,
                    [`${xsrfTokenPreamble}-xsrf`]: 'true'
                }
            }
        );
    }

    protected override update(
        _entity: ProvisioningConfigurationFile
    ): Promise<void> {
        return BaseProvisioner.noOperation();
    }

    protected override delete(
        _entity: ProvisioningConfigurationFile
    ): Promise<void> {
        return BaseProvisioner.noOperation();
    }
}
