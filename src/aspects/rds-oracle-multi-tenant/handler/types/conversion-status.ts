// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Enum representing the various states of Oracle MultiTenant conversion
 */
export enum ConversionStatus {
    /**
     * Conversion has not been initiated
     */
    NOT_STARTED = 'not-started',

    /**
     * Conversion is currently in progress
     */
    IN_PROGRESS = 'in-progress',

    /**
     * Conversion has completed successfully
     */
    COMPLETED = 'completed',

    /**
     * Conversion has failed
     */
    FAILED = 'failed'
}

/**
 * Interface representing the current state of a database conversion
 */
export interface IConversionState {
    /**
     * Current status of the conversion
     */
    readonly status: ConversionStatus;

    /**
     * Database instance status from RDS API
     */
    readonly dbInstanceStatus: string;

    /**
     * Whether there are pending modifications
     */
    readonly hasPendingModifications: boolean;

    /**
     * Details about pending modifications, if any
     */
    readonly pendingModifications?: Record<string, any>;

    /**
     * Error message if conversion failed
     */
    readonly errorMessage?: string;
}
