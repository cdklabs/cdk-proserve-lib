// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { OpenSearchIsmGetPolicyResponse } from '../../../types/opensearch/ilm/get-policy';
import { OpenSearchIsmPolicy } from '../../../types/opensearch/ilm/policy';
import { ProvisioningConfigurationFile } from '../../../types/provisioning-configuration-file';
import { BaseProvisioner, EntityType } from './base';

/**
 * Provisioner for Index State Management (ISM) within an Amazon OpenSearch Service domain
 */
export class IsmPolicyProvisioner extends BaseProvisioner {
    protected override type: EntityType = 'ism-policies';

    protected override async create(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        // Check if policy exists using HEAD request
        const current = await this.configuration.client.head(
            `/_plugins/_ism/policies/${entity.name}`
        );

        if (current.statusCode === 200) {
            console.log(
                `Policy ${entity.name} already exists, skipping creation`
            );
        } else if (current.statusCode === 404) {
            // Only create if it doesn't exist
            await this.configuration.client.put(
                `/_plugins/_ism/policies/${entity.name}`, // TODO: Make generalized to Kibana too
                JSON.parse(entity.contents),
                { headers: BaseProvisioner.jsonContentTypeHeader }
            );
        } else {
            throw new Error(
                `Unknown state of policy ${entity.name}. Query returned ${current.statusCode}`
            );
        }
    }

    protected override async update(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        const newPolicy = JSON.parse(entity.contents) as OpenSearchIsmPolicy;

        const currentPolicyResponse = await this.configuration.client.get(
            `_plugins/_ism/policies/${entity.name}` // TODO: Make generalized to Kibana too
        );

        if (currentPolicyResponse.statusCode !== 404) {
            const currentPolicy =
                currentPolicyResponse.data as OpenSearchIsmGetPolicyResponse;

            const updateResponse = await this.configuration.client.put(
                `/_plugins/_ism/policies/${entity.name}`, // TODO: Make generalized to Kibana too
                JSON.parse(entity.contents),
                {
                    headers: BaseProvisioner.jsonContentTypeHeader,
                    params: {
                        if_seq_no: currentPolicy._seq_no.toString(),
                        if_primary_term: currentPolicy._primary_term.toString()
                    }
                }
            );

            if (updateResponse.statusCode !== 200) {
                throw new Error(`Failed to update ISM policy ${entity.name}`);
            }

            const indexPatterns =
                newPolicy.policy?.ism_template?.index_patterns ?? [];

            for (const pattern of indexPatterns) {
                await this.configuration.client.post(
                    `_plugins/_ism/change_policy/${pattern}`, // TODO: Make generalized to Kibana too
                    {
                        policy_id: entity.name
                    },
                    {
                        headers: BaseProvisioner.jsonContentTypeHeader
                    }
                );
            }
        } else {
            await this.create(entity);
        }
    }

    protected override async delete(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        await this.configuration.client.delete(
            `/_plugins/_ism/policies/${entity.name}` // TODO: Make generalized to Kibana too
        );
    }
}
