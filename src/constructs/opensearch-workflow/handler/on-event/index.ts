// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { readFileSync } from 'node:fs';
import {
    CdkCustomResourceEvent,
    CdkCustomResourceResponse,
    Context
} from 'aws-lambda';
import { AwsHttpClient } from '../../../../common/lambda/aws-http-client';
import { downloadS3Asset } from '../../../../common/lambda/download-s3-asset';
import { DestructiveOperation } from '../../../../types/destructive-operation';
import { Json } from '../../../../types/json';
import { IResourceProperties } from '../types/resource-properties';
import {
    WorkflowResponse,
    WorkflowState,
    WorkflowStatusResponse
} from '../types/workflow-response';
import {
    generatePresignedUrlMapping,
    parseTemplate,
    substituteTemplateValues
} from '../utils/parse';
import { waitForOpenSearchAvailability } from '../../../../common/lambda/aos-availability-check';

/**
 * Handles AWS CloudFormation CREATE calls
 *
 * Creates an OpenSearch Workflow and provisions it immediately.
 *
 * @param client AwsHttpClient for making requests to OpenSearch
 * @param template The workflow template
 * @param provisionVariables Variables to be substituted into the template
 *
 * @returns Metadata about the outcome or an error message
 */
async function onCreate(
    client: AwsHttpClient,
    template: Json,
    provisionVariables?: Record<string, string>
): Promise<CdkCustomResourceResponse<never>> {
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
}

/**
 * Handles AWS CloudFormation UPDATE calls
 *
 * Deprovisions an existing workflow, updates it with the new template,
 * and then provisions it again.
 *
 * @param client AwsHttpClient for making requests to OpenSearch
 * @param workflowId The ID of the workflow to update
 * @param template The workflow template
 * @param provisionVariables Variables to be substituted into the template
 * @returns Metadata about the outcome or an error message
 */
async function onUpdate(
    client: AwsHttpClient,
    workflowId: string,
    template: Json,
    provisionVariables?: Record<string, string>
): Promise<CdkCustomResourceResponse<never>> {
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
}

/**
 * Handles AWS CloudFormation DELETE calls
 *
 * Attempts to deprovision and delete the workflow. The custom resource will
 * perform a deprovision and delete, but will move on if any error occurs.
 *
 * @param client AwsHttpClient for making requests to OpenSearch
 * @param workflowId The ID of the workflow to delete
 *
 * @returns Metadata about the outcome or an error message
 */
async function onDelete(
    client: AwsHttpClient,
    workflowId: string
): Promise<CdkCustomResourceResponse<never>> {
    await client.post<WorkflowResponse>(
        `/_plugins/_flow_framework/workflow/${workflowId}/_deprovision`
    );
    await waitForWorkflowStatus(client, workflowId, 'NOT_STARTED');
    await client.delete(`/_plugins/_flow_framework/workflow/${workflowId}`);

    return {
        PhysicalResourceId: workflowId
    };
}

/**
 * Waits for a workflow to reach a specific target status
 *
 * @param client AwsHttpClient for making requests to OpenSearch
 * @param workflowId The ID of the workflow to wait for
 * @param targetStatus The target status to wait for
 * @param maxAttempts The maximum number of attempts to wait for the target status
 * @param interval The interval (in milliseconds) between attempts
 */
async function waitForWorkflowStatus(
    client: AwsHttpClient,
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

/**
 * Retrieves the template from S3 and substitutes in variables and creates
 * pre-signed URLs if the workflow needs to download a file from a public URL.
 * For example, if you are provisioning the workflow in VPC and need to download
 * a model or reference file from a URL in your template.
 *
 * @param s3ObjectUrl The URL of the template in S3
 * @param templateCreationVariables Variables to be substituted into the template
 * @param templateS3ObjectVariables Objects to generate Presigned URLs for and substite into the template
 * @returns
 */
async function getAndParseTemplateFromS3(
    s3ObjectUrl: string,
    templateCreationVariables?: Record<string, string>,
    templateS3ObjectVariables?: Record<string, string>
) {
    const templateFile = await downloadS3Asset(s3ObjectUrl);
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
    console.info('Handler started');
    console.info(JSON.stringify(event));

    const props = event.ResourceProperties;
    const client = new AwsHttpClient({
        service: 'es',
        roleArn: props.RoleArn,
        baseUrl: `https://${props.DomainEndpoint}`,
        timeout: 45000
    });

    // Wait for OpenSearch to be available before proceeding
    await waitForOpenSearchAvailability(client);

    let template: Json;

    switch (event.RequestType) {
        case 'Create':
            console.info('Running CREATE...');
            template = await getAndParseTemplateFromS3(
                props.AssetS3ObjectUrl,
                props.TemplateCreationVariables,
                props.TemplateS3ObjectUrlVariables
            );
            return onCreate(client, template, props.TemplateProvisionVariables);
        case 'Update':
            if (
                props.AllowDestructiveOperations ===
                    DestructiveOperation.UPDATE ||
                props.AllowDestructiveOperations === DestructiveOperation.ALL
            ) {
                console.info('Running UPDATE...');
                template = await getAndParseTemplateFromS3(
                    props.AssetS3ObjectUrl,
                    props.TemplateCreationVariables,
                    props.TemplateS3ObjectUrlVariables
                );
                return onUpdate(
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
                props.AllowDestructiveOperations ===
                    DestructiveOperation.UPDATE ||
                props.AllowDestructiveOperations === DestructiveOperation.ALL
            ) {
                console.info('Running DELETE...');
                return onDelete(client, event.PhysicalResourceId);
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
