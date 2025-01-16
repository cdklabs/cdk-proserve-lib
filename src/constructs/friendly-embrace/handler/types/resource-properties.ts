// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Input to the custom resource
 */
export interface ResourceProperties {
    /**
     * Name of the stacks whose dependencies should be broken
     */
    readonly stackNames: string[];

    /**
     * Current time which is used to force rerun of CR every time
     */
    readonly timestamp: string;

    /**
     * Whether or not stacks in error state should be fatal to CR completion
     */
    readonly ignoreInvalidStates?: boolean;
}
