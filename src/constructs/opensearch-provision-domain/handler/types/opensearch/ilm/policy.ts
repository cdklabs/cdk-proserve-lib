// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Defines an Index State Management (ISM) policy within OpenSearch
 *
 * NOTE: This is only a partial definition and does not include all possible properties
 */
export interface OpenSearchIsmPolicy {
    /**
     * Policy definition
     */
    readonly policy?: {
        /**
         * ISM template to automatically apply the policy to newly created indices
         */
        readonly ism_template?: {
            /**
             * Patterns to match new created index names
             */
            readonly index_patterns?: string[];
        };
    };
}
