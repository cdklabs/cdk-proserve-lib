// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, parse } from 'node:path';
import { HttpClientResponseError } from '../../../../../../common/lambda/http-client/types/exception';
import { DestructiveOperation } from '../../../../../../types';
import { ProvisionerConfiguration } from '../../../types/provisioner-configuration';
import { ProvisioningConfigurationFile } from '../../../types/provisioning-configuration-file';

/**
 * Describes the type of entity being provisioned within the Amazon OpenSearch Service domain
 */
export type EntityType =
    | 'cluster-settings'
    | 'saved-objects'
    | 'roles'
    | 'role-mappings'
    | 'indices'
    | 'ism-policies'
    | 'templates/component'
    | 'templates/index';

/**
 * Base class for managing provisioning an entity within the Amazon OpenSearch Service domain
 */
export abstract class BaseProvisioner {
    /**
     * Content-Type Header for HTTP Requests
     */
    protected static jsonContentTypeHeader = {
        'Content-Type': 'application/json'
    };

    /**
     * Determines if an error is specifically an HTTP Client Response error
     * @param error Error to check
     * @returns Whether the error is specifically an HTTP Client Response error
     */
    protected static isHttpError(
        error: unknown
    ): error is HttpClientResponseError {
        return error instanceof HttpClientResponseError;
    }

    /**
     * Gets all provisioning configuration files associated with an entity to provision
     * @param type Entity to provision
     * @param path Root path where the provisioning configuration files were extracted from the zip asset
     * @returns Paths to all provisioning configuration files associated with an entity
     */
    protected static getFilePaths(type: EntityType, path: string): string[] {
        return this.getAllFiles(join(path, type), /^.gitkeep$/);
    }

    /**
     * Loads the contents of a provisioning configuration file into memory
     * @param path Path to the provisioning configuration file
     * @returns Name and contents of the provisioning configuration file
     */
    protected static loadFile(path: string): ProvisioningConfigurationFile {
        if (!existsSync(path) || !statSync(path).isFile()) {
            throw new Error(`Invalid file path: ${path}`);
        }

        const contents = readFileSync(path, 'utf-8');
        const name = parse(path).name;

        return {
            contents: contents,
            name: name
        };
    }

    /**
     * Performs no action (as a promise)
     * @returns Promise for completion of the operation
     */
    protected static noOperation(): Promise<void> {
        return new Promise((resolve, _reject) => {
            resolve();
        });
    }

    /**
     * Gets all files within a given directory (include subdirectories) except those specifically excluded by Regular Expression
     * @param path Directory to walk
     * @param exclusion Regular expression used to exclude directories and files from the search
     * @returns Path to all files within a given directory and its subdirectories
     */
    private static getAllFiles(path: string, exclusion?: RegExp): string[] {
        if (!existsSync(path) || !statSync(path).isDirectory()) {
            throw new Error(`Invalid directory path: ${path}`);
        }

        const allFiles: string[] = [];

        readdirSync(path).forEach((child) => {
            const absolutePath = join(path, child);

            if (!exclusion?.test(child)) {
                if (statSync(absolutePath).isDirectory()) {
                    const innerFiles = this.getAllFiles(
                        absolutePath,
                        exclusion
                    );

                    allFiles.push(...innerFiles);
                } else {
                    allFiles.push(absolutePath);
                }
            }
        });

        return allFiles;
    }

    /**
     * Type of entity the provisioner is responsible for handling
     */
    protected abstract type: EntityType;

    /**
     * Configuration for customizing the provisioner
     */
    protected configuration: ProvisionerConfiguration;

    /**
     * Create a new provisioner
     * @param configuration Configuration for customizing the provisioner
     */
    constructor(configuration: ProvisionerConfiguration) {
        this.configuration = configuration;
    }

    /**
     * Handles creating an entity specified by the given provisioning configuration file
     * @param entity Entity to create
     */
    protected abstract create(
        entity: ProvisioningConfigurationFile
    ): Promise<void>;

    /**
     * Handles updating an entity specified by the given provisioning configuration file
     * @param entity Entity to update
     */
    protected abstract update(
        entity: ProvisioningConfigurationFile
    ): Promise<void>;

    /**
     * Handles deleting an entity specified by the given provisioning configuration file
     * @param entity Entity to delete
     */
    protected abstract delete(
        entity: ProvisioningConfigurationFile
    ): Promise<void>;

    /**
     * Executes the provisioner
     */
    async run(): Promise<void> {
        const filePaths = BaseProvisioner.getFilePaths(
            this.type,
            this.configuration.assetPath
        );

        for (const path of filePaths) {
            const entity = BaseProvisioner.loadFile(path);

            switch (this.configuration.action) {
                case 'Delete':
                    if (
                        this.configuration.allowDestructiveOperations ===
                            DestructiveOperation.DELETE ||
                        this.configuration.allowDestructiveOperations ===
                            DestructiveOperation.ALL
                    ) {
                        await this.delete(entity);
                    }
                    break;
                case 'Create':
                    await this.create(entity);
                    break;
                case 'Update':
                    if (
                        this.configuration.allowDestructiveOperations ===
                            DestructiveOperation.UPDATE ||
                        this.configuration.allowDestructiveOperations ===
                            DestructiveOperation.ALL
                    ) {
                        // TODO: Operations should use old resource properties to determine what to remove in the event of 'All'
                        await this.update(entity);
                    }
                    break;
                default:
                    throw new Error('Unknown provisioning action');
            }
        }
    }
}
