// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Versions of the Keycloak application
 */
export class KeycloakVersion {
    /**
     * Version 26.3.2
     */
    public static readonly V26_3_2 = KeycloakVersion.of('26.3.2');

    /**
     * Create a new KeycloakVersion with an arbitrary version
     * @param version Version of Keycloak
     * @returns KeycloakVersion
     */
    public static of(version: string): KeycloakVersion {
        return new KeycloakVersion(version);
    }

    /**
     * The full version string
     */
    readonly value: string;

    /**
     * Create a new KeycloakVersion from a version string
     * @param version Version of Keycloak
     */
    private constructor(version: string) {
        this.value = version;
    }

    /**
     * Determines if the KeycloakVersion matches a specific version
     * @param keycloak Version to match against
     * @returns True if the current version matches the target version, false otherwise
     */
    public is(keycloak: KeycloakVersion): boolean {
        return this.value === keycloak.value;
    }
}
