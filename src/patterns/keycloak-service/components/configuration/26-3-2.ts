// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Secret } from 'aws-cdk-lib/aws-ecs';
import { KeycloakConfigurationBuilder } from './builder';
import { ServiceConfiguration } from '../../types/configuration';

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
         * Bootstrap
         */
        const bootstrapConfiguration: Record<string, string> = {
            KC_BOOTSTRAP_ADMIN_USERNAME: this.opts.adminUser.username
        };

        /**
         * HTTP(S)
         */
        const httpConfiguration: Record<string, string> = {
            KC_HTTP_ENABLED: 'false',
            KC_HTTPS_PORT: this.opts.ports.traffic.toString(),
            KC_HTTP_MAX_QUEUED_REQUESTS: '1000'
        };

        if (this.opts.paths?.default) {
            httpConfiguration.KC_HTTP_RELATIVE_PATH = this.opts.paths.default;
        }

        /**
         * Hostname v2
         */
        const hostnameConfiguration: Record<string, string> = {
            KC_HOSTNAME: this.opts.hostnames.default
        };

        // KC_HOSTNAME_BACKCHANNEL_DYNAMIC: 'false',
        // KC_HOSTNAME_DEBUG: 'false',
        // KC_HOSTNAME_STRICT: 'true'

        if (this.opts.hostnames.admin) {
            hostnameConfiguration.KC_HOSTNAME_ADMIN = this.opts.hostnames.admin;
        }

        /**
         * Proxy
         */
        const proxyConfiguration: Record<string, string> = {
            KC_PROXY_PROTOCOL_ENABLED: 'true'
        };

        /**
         * Database
         */
        const databaseConfiguration: Record<string, string> = {
            KC_DB: 'postgres',
            KC_DB_URL_DATABASE: this.opts.database.name,
            KC_DB_URL_HOST: this.opts.database.endpoint,
            KC_DB_URL_PORT: this.opts.database.port.toString(),
            KC_DB_USERNAME: this.opts.database.username
        };

        // KC_DB_URL: this.props.database.endpoint

        /**
         * Management
         */
        const managementConfiguration: Record<string, string> = {
            KC_HEALTH_ENABLED: 'true',
            KC_METRICS_ENABLED: 'true',
            KC_HTTP_MANAGEMENT_PORT: this.opts.ports.management.toString()
        };

        if (this.opts.paths?.management) {
            managementConfiguration.KC_HTTP_MANAGEMENT_RELATIVE_PATH =
                this.opts.paths.management;
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
            ...bootstrapConfiguration,
            ...httpConfiguration,
            ...hostnameConfiguration,
            ...proxyConfiguration,
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
                this.opts.adminUser.credentials
            )
        };

        /**
         * Database
         */
        const databaseConfiguration: Record<string, Secret> = {
            KC_DB_PASSWORD: Secret.fromSecretsManager(
                this.opts.database.credentials
            )
        };

        return {
            ...bootstrapConfiguration,
            ...databaseConfiguration
        };
    }
}
