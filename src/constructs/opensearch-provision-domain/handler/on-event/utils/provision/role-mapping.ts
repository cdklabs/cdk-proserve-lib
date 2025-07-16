// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DestructiveOperation } from '../../../../../../types';
import { ProvisionerConfiguration } from '../../../types/provisioner-configuration';
import { ProvisioningConfigurationFile } from '../../../types/provisioning-configuration-file';
import { BaseProvisioner, EntityType } from './base';

/**
 * Provisioner for Role Mappings within an Amazon OpenSearch Service domain
 */
export class RoleMappingProvisioner extends BaseProvisioner {
    /**
     * Dynamically created mappings that are specified via the Custom Resource invocation properties instead of via
     * provisioning configuration files. The key is the internal role name and the value is a list of entities to map
     * to that role (e.g. AWS IAM Role ARNs, LDAP DNs, roles, etc.)
     */
    private dynamicMappings?: Map<string, string[]>;

    /**
     * Partial endpoint for the security tool
     */
    private endpoint: string;

    protected override type: EntityType = 'role-mappings';

    /**
     * Create a new provisioner for managing role mappings
     * @param configuration Configuration for customizing the provisioner
     * @param dynamicMappings Dynamically created mappings specified via invocation properties
     */
    constructor(
        configuration: ProvisionerConfiguration,
        dynamicMappings?: Record<string, string[]>
    ) {
        super(configuration);

        if (dynamicMappings) {
            this.dynamicMappings = new Map(Object.entries(dynamicMappings));
        }

        this.endpoint =
            this.configuration.domainType === 'Elasticsearch'
                ? '_security/role_mapping'
                : '_plugins/_security/api/rolesmapping';
    }

    /**
     * Maps backend roles to an internal OpenSearch role that is created
     * @param aosRole Name of the role
     * @param roles Backend role names (e.g. role names, AWS IAM ARNs, LDAP DNs, etc.)
     */
    private async mapBackendRole(aosRole: string, roles: string[]) {
        await this.configuration.client.put(
            `/${this.endpoint}/${aosRole}`,
            {
                backend_roles: roles
            },
            {
                headers: BaseProvisioner.jsonContentTypeHeader
            }
        );
    }

    /**
     * Removes an internal OpenSearch role
     * @param aosRole Name of the role
     */
    private async removeBackendRole(aosRole: string) {
        await this.configuration.client.delete(`/${this.endpoint}/${aosRole}`);
    }

    /**
     * Merges backend roles from a provisioning configuration file with dynamically mapped roles for that entity
     * @param entity Provisioning configuration file for the entity
     * @returns All backend roles (from the file and from the dynamic entries) to be associated with the internal role
     */
    private getAllBackendRoles(
        entity: ProvisioningConfigurationFile
    ): string[] {
        const allRoles = entity.contents.split('\n');

        if (this.dynamicMappings?.has(entity.name)) {
            const dynamicRoles = this.dynamicMappings.get(entity.name) ?? [];
            allRoles.push(...dynamicRoles);
        }

        return allRoles;
    }

    override async run(): Promise<void> {
        const filePaths = RoleMappingProvisioner.getFilePaths(
            this.type,
            this.configuration.assetPath
        );

        if (filePaths.length) {
            await super.run();
        } else if (this.dynamicMappings) {
            for (const aosRole of this.dynamicMappings.keys()) {
                const backendRoles = this.dynamicMappings.get(aosRole) ?? [];

                switch (this.configuration.action) {
                    case 'Create':
                        await this.mapBackendRole(aosRole, backendRoles);
                        break;
                    case 'Update':
                        if (
                            this.configuration.allowDestructiveOperations ===
                                DestructiveOperation.UPDATE ||
                            this.configuration.allowDestructiveOperations ===
                                DestructiveOperation.ALL
                        ) {
                            await this.mapBackendRole(aosRole, backendRoles);
                        }
                        break;
                    case 'Delete':
                        if (
                            this.configuration.allowDestructiveOperations ===
                                DestructiveOperation.DELETE ||
                            this.configuration.allowDestructiveOperations ===
                                DestructiveOperation.ALL
                        ) {
                            await this.removeBackendRole(aosRole);
                        }
                        break;
                    default:
                        throw new Error('Unknown provisioning action');
                }
            }
        }
    }

    protected override async create(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        const backendRoles = this.getAllBackendRoles(entity);
        await this.mapBackendRole(entity.name, backendRoles);
    }

    protected override async update(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        await this.create(entity);
    }

    protected override async delete(
        entity: ProvisioningConfigurationFile
    ): Promise<void> {
        await this.removeBackendRole(entity.name);
    }
}
