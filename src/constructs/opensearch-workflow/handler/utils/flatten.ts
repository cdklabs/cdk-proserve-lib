// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { IResponseData } from '../types/resource-response';
import { WorkflowStatusResponse } from '../types/workflow-response';

/**
 * Flattens a workflow status response object into a simpler key-value structure
 *
 * @param response - The workflow status response object to flatten
 * @returns A flattened object containing workflow_id and resource identifiers mapped to their step IDs
 */
export function flattenResponse(
    response: WorkflowStatusResponse
): IResponseData {
    const flatData: IResponseData = {
        workflow_id: response.workflow_id
    };

    response.resources_created?.forEach((resource) => {
        flatData[resource.workflow_step_id] = resource.resource_id;
    });

    return flatData;
}
