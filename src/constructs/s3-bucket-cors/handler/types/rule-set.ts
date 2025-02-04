// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CORSRule } from '@aws-sdk/client-s3';

/**
 * Collection of cross-origin access rules
 */
export interface RuleSet {
    /**
     * Rules which have IDs
     * The key is the ID and the value is the rule
     */
    readonly named: Map<string, CORSRule>;

    /**
     * Rules which do not have IDs
     */
    readonly unnamed: CORSRule[];
}
