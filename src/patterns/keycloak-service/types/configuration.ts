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
     * Username for authenticating to the database
     */
    readonly username: string;

    /**
     * Credentials for authenticating to the database
     */
    readonly credentials: ISecret;
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
     * Port to serve the management web traffic on
     */
    readonly management: number;
}

/**
 * Configuration for the full Keycloak service
 */
export interface ServiceConfiguration
    extends KeycloakService.ApplicationConfiguration {
    /**
     * Bootstrapped admin user
     */
    readonly adminUser: KeycloakService.AdminUserConfiguration;

    /**
     * Backend database to support Keycloak
     */
    readonly database: DatabaseConnectionConfiguration;

    /**
     * Ports for accessing exposed Keycloak HTTPS endpoints
     */
    readonly ports: PortConfiguration;
}
