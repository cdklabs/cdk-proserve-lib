// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { KeycloakService } from '..';

/**
 * Details for connecting to the database
 */
export interface DatabaseConnectionConfiguration {
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
     * Credentials for authenticating to the database
     */
    readonly credentials: ISecret;
}

/**
 * Details for the Keycloak hostname configuration
 *
 * [Guide: Configuring the hostname](https://www.keycloak.org/server/hostname)
 */
export interface ParsedHostnameConfiguration {
    /**
     * Hostname for all endpoints
     */
    readonly default: URL;

    /**
     * Optional hostname for the administration endpoint
     *
     * This allows for the separation of the user and administration endpoints for increased security
     */
    readonly admin?: URL;
}

/**
 * Details for which ports are used to serve the Keycloak content
 */
export interface PortConfiguration {
    /**
     * Port to serve the standard HTTPS web traffic on
     */
    readonly traffic: number;

    /**
     * Port to serve the management API on
     */
    readonly management?: number;
}

/**
 * Configuration for the full Keycloak service
 */
export interface ServiceConfiguration
    extends Omit<KeycloakService.ApplicationConfiguration, 'port'> {
    /**
     * Bootstrapped admin user
     */
    readonly adminUser: KeycloakService.AdminUserConfiguration;

    /**
     * Backend database to support Keycloak
     */
    readonly database: DatabaseConnectionConfiguration;

    /**
     * Port to serve the standard HTTPS web traffic on
     */
    readonly port: number;
}
