// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { IResponseData } from '../types/resource-response';
import { WorkflowStatusResponse } from '../types/workflow-response';

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
