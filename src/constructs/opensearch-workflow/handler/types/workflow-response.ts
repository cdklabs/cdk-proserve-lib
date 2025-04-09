// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Represents the possible states of a workflow.
 * COMPLETED - The workflow has successfully finished execution
 * PROVISIONING - The workflow is currently in progress
 * NOT_STARTED - The workflow has been created but not yet begun
 * FAILED - The workflow encountered an error during execution
 */
export type WorkflowState =
    | 'COMPLETED'
    | 'PROVISIONING'
    | 'NOT_STARTED'
    | 'FAILED';

/**
 * Response returned when a workflow is created.
 */
export interface WorkflowResponse {
    /** Unique identifier for the created workflow */
    workflow_id: string;
}

/**
 * Represents a resource that was created during a workflow execution.
 */
export interface WorkflowResourcesCreated {
    /** Name of the workflow step that created the resource */
    readonly workflow_step_name: string;
    /** Unique identifier for the workflow step */
    readonly workflow_step_id: string;
    /** Identifier for the created resource */
    readonly resource_id: string;
    /** Type of resource that was created */
    readonly resource_type: string;
}

/**
 * Response containing the current status of a workflow.
 */
export interface WorkflowStatusResponse {
    /** Unique identifier for the workflow */
    readonly workflow_id: string;
    /** Current state of the workflow */
    readonly state?: WorkflowState;
    /** List of resources that have been created by the workflow */
    readonly resources_created?: WorkflowResourcesCreated[];
    /** Error message if the workflow failed */
    readonly error?: string;
}
