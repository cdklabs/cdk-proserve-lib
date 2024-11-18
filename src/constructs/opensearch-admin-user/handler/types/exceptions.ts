/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

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
