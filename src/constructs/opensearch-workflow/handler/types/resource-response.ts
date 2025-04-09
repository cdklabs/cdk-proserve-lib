// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * IResponseData represents the data that will be returned from an OpenSearch
 * Workflow response.
 */
export interface IResponseData extends Record<string, string> {
    /**
     * The assigned ID of the Workflow from OpenSearch.
     */
    readonly workflow_id: string;
}
