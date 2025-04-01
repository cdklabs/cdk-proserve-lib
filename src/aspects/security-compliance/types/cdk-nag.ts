// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Represents a single cdk-nag rule suppression.
 */
export interface CdkNagSuppression {
    /** The identifier of the cdk-nag rule to suppress. */
    id: string;

    /** The reason to ignore the rule (minimum 10 characters). */
    reason: string;

    /**
     * Optional array of actions to apply the suppression to. Granular control.
     */
    appliesTo?: string[];
}

/**
 * Container for a collection of cdk-nag rule suppressions.
 */
export interface CdkNagSuppressions {
    /** Array of cdk-nag rule suppressions to apply. */
    rules_to_suppress: CdkNagSuppression[];
}

/**
 * Interface for CDK metadata that contains cdk-nag suppressions.
 * This can be added to construct metadata to suppress security rules.
 */
export interface CdkNagMetadata {
    /** Optional cdk-nag suppressions configuration. */
    cdk_nag?: CdkNagSuppressions;
}
