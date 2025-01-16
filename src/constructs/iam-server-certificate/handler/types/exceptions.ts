// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Occurs when the module is unable to load a value from either a backend vaults
 */
export class FailedToRetrieveValueException extends Error {
    /**
     * Create new exception
     * @param store The backend vault which contains the value to retrieve
     */
    constructor(
        store: 'AWS Systems Manager Parameter Store' | 'AWS Secrets Manager'
    ) {
        super(`Unable to retrieve value from ${store}`);
    }
}

/**
 * Occurs when the module fails to provision a new AWS IAM Server Certificate
 */
export class FailedToCreateIamServerCertificateException extends Error {
    /**
     * Additional data regarding the failure (e.g. an inner exception or reason)
     */
    readonly data: unknown;

    /**
     * Create new exception
     * @param data Additional information about the failure event (e.g. an inner exception or reason)
     */
    constructor(data?: unknown) {
        super('Failed to create a new AWS IAM Server Certificate');

        this.data = data;
    }
}
