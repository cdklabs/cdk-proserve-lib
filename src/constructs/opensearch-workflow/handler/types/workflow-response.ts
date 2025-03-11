/**
 * (c) 2025 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
 *
 * This AWS Content is provided subject to the terms of the AWS Customer
 * Agreement available at https://aws.amazon.com/agreement or other written
 * agreement between Customer and either Amazon Web Services, Inc. or
 * Amazon Web Services EMEA SARL or both.
 */

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
