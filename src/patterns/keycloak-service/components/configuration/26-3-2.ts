// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Secret } from 'aws-cdk-lib/aws-ecs';
import { KeycloakConfigurationBuilder } from './builder';
import { ServiceConfiguration } from '../../types/configuration';
import { KeycloakCluster } from '../cluster';

/**
 * Options for configuring Keycloak
 */
export interface Keycloak_26_3_2_ConfigurationBuilderOptions
    extends ServiceConfiguration {}

/**
 * Builder for creating dynamic standard and secure Keycloak configurations that are consumed by the Keycloak
 * container through the environment variables
 *
 * Standard configurations will be consumed by Fargate directly through the environment variables
 *
 * Secure configurations will be consumed by Fargate through AWS Secrets Manager
 *
 * This builder supports Keycloak 26.3.2
 */
export class Keycloak_26_3_2_ConfigurationBuilder extends KeycloakConfigurationBuilder {
    /**
     * Options for configuring Keycloak
     */
    private readonly opts: Keycloak_26_3_2_ConfigurationBuilderOptions;

    /**
     * Create a new configuration builder for Keycloak 26.3.2
     * @param options Options for configuring Keycloak
     */
    constructor(options: Keycloak_26_3_2_ConfigurationBuilderOptions) {
        super();

        this.opts = options;
    }

    generateStandardDynamicConfiguration(): Record<string, string> {
        /**
         * HTTP(S)
         */
        const httpConfiguration: Record<string, string> = {
            KC_HTTP_ENABLED: 'false',
            KC_HTTPS_PORT:
                KeycloakCluster.Defaults.containerTrafficPort.toString(),
            KC_HTTP_MAX_QUEUED_REQUESTS: '1000'
        };

        if (this.opts.path) {
            httpConfiguration.KC_HTTP_RELATIVE_PATH = this.opts.path;
        }

        /**
         * Hostname v2
         */
        const hostnameConfiguration: Record<string, string> = {
            KC_HOSTNAME: `https://${this.opts.hostnames.default}:${this.opts.port}`
        };

        // KC_HOSTNAME_BACKCHANNEL_DYNAMIC: 'false',
        // KC_HOSTNAME_DEBUG: 'false',
        // KC_HOSTNAME_STRICT: 'true'

        if (this.opts.hostnames.admin) {
            hostnameConfiguration.KC_HOSTNAME_ADMIN = `https://${this.opts.hostnames.admin}:${this.opts.port}`;
        }

        /**
         * Database
         */
        const databaseConfiguration: Record<string, string> = {
            KC_DB: 'postgres',
            KC_DB_DRIVER: 'software.amazon.jdbc.Driver',
            KC_DB_URL: `jdbc:aws-wrapper:postgresql://${this.opts.database.endpoint}:${this.opts.database.port}/${this.opts.database.name}`
        };

        // KC_DB_URL: this.props.database.endpoint

        /**
         * Management
         */
        const managementConfiguration: Record<string, string> = {
            KC_HEALTH_ENABLED: this.opts.management?.health ? 'true' : 'false',
            KC_METRICS_ENABLED: this.opts.management?.metrics
                ? 'true'
                : 'false',
            KC_HTTP_MANAGEMENT_PORT:
                KeycloakCluster.Defaults.containerManagementPort.toString()
        };

        if (this.opts.management?.path) {
            managementConfiguration.KC_HTTP_MANAGEMENT_RELATIVE_PATH =
                this.opts.management.path;
        }

        /**
         * Logging
         */
        const loggingConfiguration: Record<string, string> = {
            KC_LOG: 'console',
            KC_LOG_LEVEL: this.opts.loggingLevel ?? 'warn'
        };

        // KC_LOG_ASYNC: 'true'

        return {
            ...httpConfiguration,
            ...hostnameConfiguration,
            ...databaseConfiguration,
            ...managementConfiguration,
            ...loggingConfiguration
        };
    }

    generateSecureDynamicConfiguration(): Record<string, Secret> {
        /**
         * Bootstrap
         */
        const bootstrapConfiguration: Record<string, Secret> = {
            KC_BOOTSTRAP_ADMIN_PASSWORD: Secret.fromSecretsManager(
                this.opts.adminUser,
                'password'
            ),
            KC_BOOTSTRAP_ADMIN_USERNAME: Secret.fromSecretsManager(
                this.opts.adminUser,
                'username'
            )
        };

        /**
         * Database
         */
        const databaseConfiguration: Record<string, Secret> = {
            KC_DB_PASSWORD: Secret.fromSecretsManager(
                this.opts.database.credentials,
                'password'
            ),
            KC_DB_USERNAME: Secret.fromSecretsManager(
                this.opts.database.credentials,
                'username'
            )
        };

        return {
            ...bootstrapConfiguration,
            ...databaseConfiguration
        };
    }
}
