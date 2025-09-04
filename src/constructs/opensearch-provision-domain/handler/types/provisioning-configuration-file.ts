// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Defines a provisioning configuration file on disk
 */
export interface ProvisioningConfigurationFile {
    /**
     * Name of the file
     */
    readonly name: string;

    /**
     * Contents of the file
     */
    readonly contents: string;
}
