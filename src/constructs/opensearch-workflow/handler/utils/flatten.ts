/**
 * (c) 2025 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
 *
 * This AWS Content is provided subject to the terms of the AWS Customer
 * Agreement available at https://aws.amazon.com/agreement or other written
 * agreement between Customer and either Amazon Web Services, Inc. or
 * Amazon Web Services EMEA SARL or both.
 */

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
