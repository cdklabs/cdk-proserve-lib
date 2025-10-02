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
    /**
     * Type of error encountered during operation
     */
    readonly errorType: 'ValidationError' | 'RuntimeError' | 'PermissionError';

    /**
     * Detailed error message
     */
    readonly errorMessage: string;

    /**
     * DB instance identifier where the error occurred
     */
    readonly dbInstanceId: string;

    /**
     * AWS request ID for tracking
     */
    readonly requestId?: string;
}
