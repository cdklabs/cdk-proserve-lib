/**
 * (c) 2025 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
 *
 * This AWS Content is provided subject to the terms of the AWS Customer
 * Agreement available at https://aws.amazon.com/agreement or other written
 * agreement between Customer and either Amazon Web Services, Inc. or
 * Amazon Web Services EMEA SARL or both.
 */

import {
    CdkCustomResourceEvent,
    CdkCustomResourceResponse,
    Context
} from 'aws-lambda';
import { AxiosInstance } from 'axios';
import { readFileSync } from 'fs';
import { Json } from '../models/json';
import { IResourceProperties } from '../models/resource-properties';
import {
    WorkflowResponse,
    WorkflowState,
    WorkflowStatusResponse
} from '../models/workflow-response';
import { createSigV4OpensearchClient } from '../utils/aos-client';
import { downloadFileAsset } from '../utils/asset';
import { formatAxiosError } from '../utils/error';
import {
    generatePresignedUrlMapping,
    parseTemplate,
    substituteTemplateValues
} from '../utils/parse';

/**
 * Handles AWS CloudFormation CREATE calls
 *
 * Creates an OpenSearch Workflow and provisions it immediately.
 *
 * @param event Input metadata for the custom resource
 * @returns Metadata about the outcome or an error message
 */
async function onCreate(
    client: AxiosInstance,
    template: Json,
    provisionVariables?: Record<string, string>
): Promise<CdkCustomResourceResponse<never>> {
    try {
        const createWorkflowResponse = await client.post<WorkflowResponse>(
            `/_plugins/_flow_framework/workflow`,
            template
        );

        const workflowId = createWorkflowResponse.data.workflow_id;

        await client.post<WorkflowResponse>(
            `/_plugins/_flow_framework/workflow/${workflowId}/_provision`,
            provisionVariables
        );

        return {
            PhysicalResourceId: workflowId
        };
    } catch (error) {
        throw formatAxiosError(error);
    }
}

/**
 * Handles AWS CloudFormation UPDATE calls
 *
 * Deprovisions an existing workflow, updates it with the new template,
 * and then provisions it again.
 *
 * @param event Input metadata for the custom resource
 * @param client AxiosInstance for making requests to OpenSearch
 * @param template The new workflow template
 * @returns Metadata about the outcome or an error message
 */
async function onUpdate(
    client: AxiosInstance,
    workflowId: string,
    template: Json,
    provisionVariables?: Record<string, string>
): Promise<CdkCustomResourceResponse<never>> {
    try {
        // Step 1: Deprovision the existing workflow
        console.info(`Deprovisioning workflow ${workflowId}`);
        await client.post<WorkflowResponse>(
            `/_plugins/_flow_framework/workflow/${workflowId}/_deprovision`
        );

        await waitForWorkflowStatus(client, workflowId, 'NOT_STARTED');

        // Step 2: Update the workflow with the new template
        console.info(`Updating workflow ${workflowId}`);
        await client.put<WorkflowResponse>(
            `/_plugins/_flow_framework/workflow/${workflowId}`,
            template
        );

        // Step 3: Provision the updated workflow
        console.info(`Provisioning the updated workflow ${workflowId}`);
        await client.post<WorkflowResponse>(
            `/_plugins/_flow_framework/workflow/${workflowId}/_provision`,
            provisionVariables
        );

        console.info(
            `Workflow ${workflowId} has begun the update (provisioning) process.`
        );

        return {
            PhysicalResourceId: workflowId
        };
    } catch (error) {
        throw formatAxiosError(error);
    }
}

/**
 * Handles AWS CloudFormation DELETE calls
 *
 * Attempts to deprovision and delete the workflow. The custom resource will
 * perform a deprovision and delete, but will move on if any error occurs.
 *
 * @param event Input metadata for the custom resource
 * @returns Metadata about the outcome or an error message
 */
async function onDelete(
    client: AxiosInstance,
    workflowId: string
): Promise<CdkCustomResourceResponse<never>> {
    try {
        await client.post<WorkflowResponse>(
            `/_plugins/_flow_framework/workflow/${workflowId}/_deprovision`
        );
        await waitForWorkflowStatus(client, workflowId, 'NOT_STARTED');
        await client.delete(`/_plugins/_flow_framework/workflow/${workflowId}`);
    } catch (error) {
        throw formatAxiosError(error);
    }

    return {
        PhysicalResourceId: workflowId
    };
}

async function waitForWorkflowStatus(
    client: AxiosInstance,
    workflowId: string,
    targetStatus: WorkflowState,
    maxAttempts = 10,
    interval = 5000
) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const response = await client.get<WorkflowStatusResponse>(
            `/_plugins/_flow_framework/workflow/${workflowId}/_status`
        );

        if (response.data.state === targetStatus) {
            console.info(`Workflow ${workflowId} is now ${targetStatus}`);
            return;
        }

        console.info(
            `Waiting for workflow ${workflowId} to be ${targetStatus}. Current status: ${response.data.state}`
        );
        await new Promise((resolve) => setTimeout(resolve, interval));
    }

    throw new Error(
        `Timeout waiting for workflow ${workflowId} to reach ${targetStatus} status`
    );
}

async function getAndParseTemplateFromS3(
    s3ObjectUrl: string,
    templateCreationVariables?: Record<string, string>,
    templateS3ObjectVariables?: Record<string, string>
) {
    const templateFile = await downloadFileAsset(s3ObjectUrl);
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const templateContents = readFileSync(templateFile.filePath, 'utf-8');

    const presignedUrlSubstitutions = await generatePresignedUrlMapping(
        templateS3ObjectVariables
    );
    const allSubstitutions = {
        ...templateCreationVariables,
        ...presignedUrlSubstitutions
    };

    const substitutedContents = substituteTemplateValues(
        templateContents,
        allSubstitutions
    );
    const template = parseTemplate(substitutedContents);
    console.info(`Using Workflow Template: ${JSON.stringify(template)}`);
    return template;
}

export async function handler(
    event: CdkCustomResourceEvent<IResourceProperties>,
    _context: Context
): Promise<CdkCustomResourceResponse<never>> {
    console.info(JSON.stringify(event));

    const props = event.ResourceProperties;
    const client = createSigV4OpensearchClient(props);
    let template: Json;

    switch (event.RequestType) {
        case 'Create':
            console.info('Running CREATE...');
            template = await getAndParseTemplateFromS3(
                props.AssetS3ObjectUrl,
                props.TemplateCreationVariables,
                props.TemplateS3ObjectUrlVariables
            );
            return await onCreate(
                client,
                template,
                props.TemplateProvisionVariables
            );
        case 'Update':
            if (
                props.AllowDestructiveOperations === 'Update' ||
                props.AllowDestructiveOperations === 'All'
            ) {
                console.info('Running UPDATE...');
                template = await getAndParseTemplateFromS3(
                    props.AssetS3ObjectUrl,
                    props.TemplateCreationVariables,
                    props.TemplateS3ObjectUrlVariables
                );
                return await onUpdate(
                    client,
                    event.PhysicalResourceId,
                    template,
                    props.TemplateProvisionVariables
                );
            } else {
                console.info(
                    'UPDATE skipped: AllowDestructiveOperations is false'
                );
                return {
                    PhysicalResourceId: event.PhysicalResourceId
                };
            }
        case 'Delete':
            if (
                props.AllowDestructiveOperations === 'Delete' ||
                props.AllowDestructiveOperations === 'All'
            ) {
                console.info('Running DELETE...');
                return await onDelete(client, event.PhysicalResourceId);
            } else {
                console.info(
                    'DELETE skipped: AllowDestructiveOperations is false'
                );
                return {
                    PhysicalResourceId: event.PhysicalResourceId
                };
            }
    }
}
