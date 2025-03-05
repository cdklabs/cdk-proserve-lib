/**
 * (c) 2025 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
 *
 * This AWS Content is provided subject to the terms of the AWS Customer
 * Agreement available at https://aws.amazon.com/agreement or other written
 * agreement between Customer and either Amazon Web Services, Inc. or
 * Amazon Web Services EMEA SARL or both.
 */

import {
    CdkCustomResourceIsCompleteEvent,
    CdkCustomResourceIsCompleteResponse,
    Context
} from 'aws-lambda';
import { IResourceProperties } from '../models/resource-properties';
import { IResponseData } from '../models/resource-response';
import { WorkflowStatusResponse } from '../models/workflow-response';
import { flattenResponse } from '../utils/flatten';
import {
    AwsHttpClient,
    AwsHttpClientResponseError
} from '../../../../../common/aws-http-client';

/**
 * Checks OpenSearch to determine if the workflow has been completed or not.
 *
 * @param client OpenSearch Axios Client
 * @param workflowId Workflow Id for the workflow in OpenSearch
 * @returns CloudFormation response if the workflow has completed or not
 */
async function isProvisioned(
    client: AwsHttpClient,
    workflowId: string
): Promise<CdkCustomResourceIsCompleteResponse<IResponseData>> {
    const response = await client.get<WorkflowStatusResponse>(
        `/_plugins/_flow_framework/workflow/${workflowId}/_status`
    );
    const workflowResponse = response.data;

    console.info(JSON.stringify(workflowResponse));

    if (
        workflowResponse.state === 'PROVISIONING' ||
        workflowResponse.state === 'NOT_STARTED'
    ) {
        return {
            IsComplete: false
        };
    } else if (workflowResponse.state === 'COMPLETED') {
        const flatData = flattenResponse(workflowResponse);
        console.info(`Workflow (${workflowId}) completed!`);
        console.info(JSON.stringify(flatData));

        return {
            IsComplete: true,
            Data: flatData
        };
    } else {
        throw new Error(
            `Unexpected state (${workflowResponse.state}) while provisioning workflow (${workflowId}), error: ${workflowResponse.error}`
        );
    }
}

/**
 * Returns a CloudFormation success response. The deletion happens in the
 * background, and we do not want to risk CloudFormation errors from deletion
 * failures. Messages are logged to CloudWatch for investigation.
 *
 * @returns Successful completion status
 */
async function isDeleted(
    client: AwsHttpClient,
    workflowId: string
): Promise<CdkCustomResourceIsCompleteResponse<IResponseData>> {
    try {
        const response = await client.get<WorkflowStatusResponse>(
            `/_plugins/_flow_framework/workflow/${workflowId}/_status`
        );
        console.info(
            `Waiting for workflow (${workflowId}) to be deleted... ${JSON.stringify(response.data)}`
        );

        // If the request succeeds, the workflow still exists
        return {
            IsComplete: false
        };
    } catch (error) {
        if (error instanceof AwsHttpClientResponseError) {
            if (error.response.statusCode === 404) {
                console.info(`Workflow (${workflowId}) deleted!`);
                return {
                    IsComplete: true
                };
            }
            throw error;
        } else {
            throw error;
        }
    }
}

export async function handler(
    event: CdkCustomResourceIsCompleteEvent<IResourceProperties>,
    _context: Context
): Promise<CdkCustomResourceIsCompleteResponse<IResponseData>> {
    console.info(JSON.stringify(event));

    const props = event.ResourceProperties;
    const client = new AwsHttpClient({
        service: 'es',
        roleArn: props.RoleArn,
        baseUrl: `https://${props.DomainEndpoint}`,
        timeout: 45000
    });

    let workflowId: string;
    if (event.PhysicalResourceId) {
        workflowId = event.PhysicalResourceId;
    } else {
        throw new Error(
            `Could not find PhysicalResourceId (workflowId) from Custom Resource state.`
        );
    }

    switch (event.RequestType) {
        case 'Create':
            console.info('Checking if CREATE is complete...');
            return await isProvisioned(client, workflowId);
        case 'Update':
            console.info('Checking if UPDATE is complete...');
            return await isProvisioned(client, workflowId);
        case 'Delete':
            console.info('Checking if DELETE is complete...');
            if (props.AllowDestructiveOperations) {
                return await isDeleted(client, workflowId);
            } else {
                return {
                    IsComplete: true
                };
            }
    }
}
