// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';

/**
 * Details for connecting to the database
 */
export interface DatabaseConfiguration {
    /**
     * Database endpoint
     */
    readonly endpoint: string;

    /**
     * Name of the database to connect to
     */
    readonly name: string;

    /**
     * Port on which the database is listening
     */
    readonly port: number;

    /**
     * Username for authenticating to the database
     */
    readonly username: string;

    /**
     * Credentials for authenticating to the database
     */
    readonly credentials: ISecret;
}

/**
 * Details for the bootstrapped admin user within Keycloak
 *
 * [Guide: Bootstrapping an Admin Account](https://www.keycloak.org/server/hostname)
 */
interface KeycloakAdminUserConfiguration {
    /**
     * Username for the bootstrapped admin user in Keycloak
     */
    readonly username: string;

    /**
     * Credentials for the bootstrapped admin user in Keycloak
     */
    readonly credentials: ISecret;
}

/**
 * Details for the Keycloak hostname configuration
 *
 * [Guide: Configuring the hostname](https://www.keycloak.org/server/hostname)
 */
interface KeycloakHostnameConfiguration {
    /**
     * Hostname for all endpoints
     */
    readonly default: string;

    /**
     * Optional hostname for the administration endpoint
     *
     * This allows for the separation of the user and administration endpoints for increased security
     */
    readonly admin?: string;
}

/**
 * Details for the Keycloak path configuration to allow for serving Keycloak interfaces from non-root locations
 */
interface KeycloakPathConfiguration {
    /**
     * Optional alternative relative path for serving content
     */
    readonly default?: string;

    /**
     * Optional alternative relative path for serving content specifically for management
     */
    readonly management?: string;
}

/**
 * Details for which ports are used to serve the Keycloak content
 */
export interface KeycloakPortConfiguration {
    /**
     * Port to serve the standard HTTPS web traffic on
     */
    readonly traffic: number;

    /**
     * Port to serve the management web traffic on
     */
    readonly management: number;
}

/**
 * Configuration for the Keycloak application
 */
export interface KeycloakConfiguration {
    /**
     * Bootstrapped admin user
     */
    readonly adminUser: KeycloakAdminUserConfiguration;

    /**
     * Backend database to support Keycloak
     */
    readonly database: DatabaseConfiguration;

    /**
     * Hostname configuration for Keycloak
     */
    readonly hostnames: KeycloakHostnameConfiguration;

    /**
     * Level of information for Keycloak to log
     */
    readonly loggingLevel?:
        | 'off'
        | 'fatal'
        | 'error'
        | 'warn'
        | 'info'
        | 'debug'
        | 'trace'
        | 'all';

    /**
     * Alternative paths to serve Keycloak content
     */
    readonly paths?: KeycloakPathConfiguration;

    /**
     * Ports for accessing exposed Keycloak HTTPS endpoints
     */
    readonly ports: KeycloakPortConfiguration;
}
