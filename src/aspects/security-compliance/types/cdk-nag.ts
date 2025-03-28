// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export interface CdkNagSuppression {
    id: string;
    reason: string;
    appliesTo?: string[];
}

export interface CdkNagSuppressions {
    rules_to_suppress: CdkNagSuppression[];
}

export interface CdkNagMetadata {
    cdk_nag?: CdkNagSuppressions;
}
