// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Defines the response from a REST API GET call to the Index State Management (ISM) API within OpenSearch
 *
 * NOTE: This is only a partial definition and does not include all possible properties
 */
export interface OpenSearchIsmGetPolicyResponse {
    /**
     * Unique identifier for the policy
     */
    readonly _id: string;

    /**
     * Current version of the policy
     */
    readonly _version: number;

    /**
     * Policy sequence number
     */
    readonly _seq_no: number;

    /**
     * Primary term for the policy
     */
    readonly _primary_term: number;

    /**
     * Definition of the policy
     */
    readonly policy: object;
}
