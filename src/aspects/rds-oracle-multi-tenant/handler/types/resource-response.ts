// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Response data returned by the Lambda handler
 */
export interface IResponseData {
    /**
     * The modified DB instance identifier
     */
    readonly DBInstanceIdentifier: string;

    /**
     * Current MultiTenant status
     */
    readonly MultiTenantStatus: string;

    /**
     * Status of the modification operation
     */
    readonly ModificationStatus: string;

    /**
     * Any pending modifications
     */
    readonly PendingModifications?: string;
}

/**
 * Error response format for validation and runtime errors
 */
export interface IErrorResponse {
    readonly errorType: 'ValidationError' | 'RuntimeError' | 'PermissionError';
    readonly errorMessage: string;
    readonly dbInstanceId: string;
    readonly requestId?: string;
}
