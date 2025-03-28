// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { InlineHostingConfiguration } from '../hosts/inline';
import { S3HostingConfiguration } from '../hosts/s3';

/**
 * Configuration common to any hosting scheme
 */
export interface CommonHostingConfiguration {
    /**
     * Name of the index page for a Single Page Application (SPA)
     *
     * This is used as a default key to load when the path provided does not map to a concrete static asset.
     *
     * @example index.html
     */
    readonly spaIndexPage?: string;

    /**
     * Path within the store to load static assets from
     *
     * @default undefined Loads from the root of the store
     */
    readonly staticFilePath?: string;

    /**
     * If specified, the host will not log any HTTP requests
     *
     * @default false
     */
    readonly disableHttpLogging?: boolean;

    /**
     * If specified, the host will allow full error stacks to be returned to the client
     * It is recommended to not enable this in production
     *
     * @default false
     */
    readonly enableVerboseErrors?: boolean;
}

/**
 * Configuration for hosting static assets
 */
export type HostingConfiguration =
    | InlineHostingConfiguration
    | S3HostingConfiguration;

/**
 * Utilities for manipulating the handler configuration
 */
export class Configuration {
    /**
     * Loads the hosting configuration from the environment
     * @returns Hosting configuration
     * @throws {Error} When the configuration environment variable is missing
     */
    static load(): HostingConfiguration {
        const config = process.env.CONFIGURATION;

        if (!config) {
            throw new Error('CONFIGURATION is missing from environment');
        }

        return JSON.parse(config) as HostingConfiguration;
    }

    /**
     * Determines if Amazon S3 is being used as the backend store for static assets
     * @param config The loaded hosting configuration
     * @returns True if the hosting configuration is for an Amazon S3 backed store, false otherwise
     */
    static useS3(
        config: HostingConfiguration
    ): config is S3HostingConfiguration {
        const nameProp: keyof S3HostingConfiguration = 'bucketName';
        return nameProp in config;
    }
}
