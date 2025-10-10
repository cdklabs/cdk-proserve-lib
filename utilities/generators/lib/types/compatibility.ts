// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Enum representing the compatibility status of a component with an AWS partition.
 * Uses emoji symbols for visual clarity in the generated compatibility matrix.
 */
export enum PartitionStatus {
    /** Component is fully compatible and tested in this partition */
    FULLY_COMPATIBLE = '✅',
    /** Component has partial compatibility or known limitations in this partition */
    PARTIALLY_COMPATIBLE = '⚠️',
    /** Component is not compatible with this partition */
    NOT_COMPATIBLE = '❌',
    /** Component compatibility has not been tested or verified in this partition */
    NEEDS_TESTING = '🔍'
}

/**
 * Interface defining compatibility status for all AWS partitions.
 * Each partition must have an explicit compatibility status defined.
 */
export interface PartitionCompatibility {
    /** AWS Commercial partition (aws) compatibility status */
    readonly commercial: PartitionStatus;
    /** AWS GovCloud partition (aws-us-gov) compatibility status */
    readonly govcloud: PartitionStatus;
    /** Other AWS partitions (aws-iso, aws-iso-b, etc.) compatibility status */
    readonly other: PartitionStatus;
}

/**
 * Configuration object that defines the complete compatibility information for a component.
 * This is the structure that should be exported from each component's compatibility.ts file.
 */
export interface CompatibilityConfig {
    /** Compatibility status for each AWS partition */
    readonly partitions: PartitionCompatibility;
    /** Optional notes providing additional context about compatibility */
    readonly notes?: string;
}

/**
 * Internal interface used by the generator to represent a component with its compatibility information.
 * This combines the component metadata with its loaded compatibility configuration.
 */
export interface ComponentCompatibility {
    /** The name of the component (directory name) */
    readonly name: string;
    /** The type of component (aspect, construct, or pattern) */
    readonly type: 'aspect' | 'construct' | 'pattern';
    /** The loaded compatibility configuration for this component */
    readonly config: CompatibilityConfig;
}
