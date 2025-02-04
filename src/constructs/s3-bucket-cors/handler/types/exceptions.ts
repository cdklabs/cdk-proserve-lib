// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Occurs when there are CORS rules with duplicate IDs
 */
export class RuleConflictException extends Error {
    /**
     * Create a new exception indicating there were CORS rules with duplicate IDs
     * @param id ID which occurs more than once in the ruleset
     */
    constructor(id: string) {
        super(`Rule with ID ${id} already exists`);
    }
}
