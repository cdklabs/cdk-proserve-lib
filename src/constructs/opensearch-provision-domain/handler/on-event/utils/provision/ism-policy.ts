// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { BaseProvisioner, EntityType } from './base';
import { HttpRequestOptions } from '../../../../../../common/lambda/http-client/types';
import { OpenSearchIsmGetPolicyResponse } from '../../../types/opensearch/ilm/get-policy';
import { OpenSearchIsmPolicy } from '../../../types/opensearch/ilm/policy';
import { ProvisionerConfiguration } from '../../../types/provisioner-configuration';
import { ProvisioningConfigurationFile } from '../../../types/provisioning-configuration-file';

/**
 * Provisioner for Index State Management (ISM) within an Amazon OpenSearch Service domain
 */
export class IsmPolicyProvisioner extends BaseProvisioner {
    protected override type: EntityType = 'ism-policies';

    /**
     * Partial endpoint for the security tool
     */
    private endpoint: string;

    constructor(configuration: ProvisionerConfiguration) {
        super(configuration);

        this.endpoint =
            this.configuration.domainType === 'Elasticsearch'
                ? '_ilm/policy'
                : '_plugins/_ism/policies';
    }

    protected override async create(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        // Check if policy exists using HEAD request
        const current = await this.configuration.client.head(
            `/${this.endpoint}/${entity.name}`
        );

        if (current.statusCode === 200) {
            console.log(
                `Policy ${entity.name} already exists, skipping creation`
            );
        } else if (current.statusCode === 404) {
            // Only create if it doesn't exist
            await this.configuration.client.put(
                `/${this.endpoint}/${entity.name}`,
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
        const currentPolicyResponse = await this.configuration.client.get(
            `/${this.endpoint}/${entity.name}`
        );

        if (currentPolicyResponse.statusCode !== 404) {
            const currentPolicy = currentPolicyResponse.data;

            const options: HttpRequestOptions = {
                headers: BaseProvisioner.jsonContentTypeHeader
            };

            if (this.configuration.domainType === 'OpenSearch') {
                options.params = {
                    if_seq_no: (
                        currentPolicy as OpenSearchIsmGetPolicyResponse
                    )._seq_no.toString(),
                    if_primary_term: (
                        currentPolicy as OpenSearchIsmGetPolicyResponse
                    )._primary_term.toString()
                };
            }

            const updateResponse = await this.configuration.client.put(
                `/${this.endpoint}/${entity.name}`,
                JSON.parse(entity.contents),
                options
            );

            if (updateResponse.statusCode !== 200) {
                throw new Error(`Failed to update policy ${entity.name}`);
            }

            if (this.configuration.domainType === 'OpenSearch') {
                const newPolicy = JSON.parse(
                    entity.contents
                ) as OpenSearchIsmPolicy;

                const indexPatterns =
                    newPolicy.policy?.ism_template?.index_patterns ?? [];

                for (const pattern of indexPatterns) {
                    await this.configuration.client.post(
                        `/_plugins/_ism/change_policy/${pattern}`,
                        {
                            policy_id: entity.name
                        },
                        {
                            headers: BaseProvisioner.jsonContentTypeHeader
                        }
                    );
                }
            }
        } else {
            await this.create(entity);
        }
    }

    protected override async delete(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        await this.configuration.client.delete(
            `/${this.endpoint}/${entity.name}`
        );
    }
}
