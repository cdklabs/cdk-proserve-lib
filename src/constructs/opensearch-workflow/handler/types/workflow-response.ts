// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export type WorkflowState =
    | 'COMPLETED'
    | 'PROVISIONING'
    | 'NOT_STARTED'
    | 'FAILED';

export interface WorkflowResponse {
    workflow_id: string;
}

export interface WorkflowResourcesCreated {
    readonly workflow_step_name: string;
    readonly workflow_step_id: string;
    readonly resource_id: string;
    readonly resource_type: string;
}

export interface WorkflowStatusResponse {
    readonly workflow_id: string;
    readonly state?: WorkflowState;
    readonly resources_created?: WorkflowResourcesCreated[];
    readonly error?: string;
}
