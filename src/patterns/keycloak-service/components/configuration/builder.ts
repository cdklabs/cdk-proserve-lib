// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Secret } from 'aws-cdk-lib/aws-ecs';
import { KeycloakService } from '../..';

/**
 * Builder for creating dynamic standard and secure Keycloak configurations that are consumed by the Keycloak
 * container through the environment variables
 *
 * Standard configurations will be consumed by Fargate directly through the environment variables
 *
 * Secure configurations will be consumed by Fargate through AWS Secrets Manager
 */
export abstract class KeycloakConfigurationBuilder {
    /**
     * Determines whether the configuration builder supports a specific verison of Keycloak
     * @param supportedVersions Versions supported by the configuration builder
     * @param targetVersion Version to check
     * @returns Whether the version is supported by the configuration builder
     */
    protected static supportsVersion(
        supportedVersions: KeycloakService.EngineVersion[],
        targetVersion: KeycloakService.EngineVersion
    ): boolean {
        return supportedVersions.some((v) => v.is(targetVersion));
    }

    /**
     * Create a new configuration builder
     */
    protected constructor() {}

    /**
     * Generate the Keycloak configuration environment variables that do not need to be protected
     * @returns Mapping of environment variables to provide to the container where the key is the environment variable
     * name and the value is the actual content
     */
    abstract generateStandardDynamicConfiguration(): Record<string, string>;

    /**
     * Generate the Keycloak configuration environment variables that are sensitive and loaded through AWS Secrets
     * Manager
     * @returns Mapping of secure environment variables to provide to the container where the key is the environment
     * variable name and the value is the secret containing the content
     */
    abstract generateSecureDynamicConfiguration(): Record<string, Secret>;
}
