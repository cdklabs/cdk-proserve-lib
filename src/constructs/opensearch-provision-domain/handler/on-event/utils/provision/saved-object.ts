// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { getRandomValues } from 'node:crypto';
import { ProvisioningConfigurationFile } from '../../../types/provisioning-configuration-file';
import { BaseProvisioner, EntityType } from './base';

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

        await this.configuration.client.post(
            '/_dashboards/api/saved_objects/_import?overwrite=true', // TODO: Make generalized to Kibana too
            requestBody.join('\r\n'),
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${boundary}`,
                    'osd-xsrf': 'true'
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
