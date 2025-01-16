// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Types of backend credential vaults available
 */
type CredentialVaultBackend = 'parameter-store' | 'secrets-manager';

export class FailedToRetrieveCredentialValueException extends Error {
    /**
     * Mapping of available credential vaults to their service names
     */
    private static readonly vaultBackendNames: Record<
        CredentialVaultBackend,
        string
    > = {
        'parameter-store': 'AWS Systems Manager Parameter Store',
        'secrets-manager': 'AWS Secrets Manager'
    };

    /**
     * Constructor
     * @param vault The backend that contains the credential
     */
    constructor(vault: CredentialVaultBackend) {
        super(
            `Unable to retrieve password from ${FailedToRetrieveCredentialValueException.vaultBackendNames[vault]}`
        );
    }
}

export class InvalidPasswordCredentialVaultException extends Error {
    /**
     * Constructor
     */
    constructor() {
        super(
            'Password must be specified as either an AWS Systems Manager Parameter Store parameter or an AWS Secrets Manager secret'
        );
    }
}
