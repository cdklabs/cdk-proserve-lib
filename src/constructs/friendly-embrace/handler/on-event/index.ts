/**
 * (c) 2024 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
 *
 * This AWS Content is provided subject to the terms of the AWS Customer
 * Agreement available at https://aws.amazon.com/agreement or other written
 * agreement between Customer and either Amazon Web Services, Inc. or
 * Amazon Web Services EMEA SARL or both.
 */

import {
    CloudFormation,
    CloudFormationServiceException,
    StackStatus
} from '@aws-sdk/client-cloudformation';
import { S3 } from '@aws-sdk/client-s3';
import {
    CdkCustomResourceHandler,
    CdkCustomResourceResponse,
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceEvent,
    CloudFormationCustomResourceUpdateEvent,
    Context
} from 'aws-lambda';
import { ResourceProperties } from '../types/resource-properties';

// Clients
const cfn = new CloudFormation();
const s3 = new S3();

// Environment
const CFN_TEMPLATE_BUCKET_URL = process.env.CFN_TEMPLATE_BUCKET_URL!;
const CFN_TEMPLATE_BUCKET_NAME = process.env.CFN_TEMPLATE_BUCKET_NAME!;

/**
 * Determines the status of a given stack. Returns undefined if the stack was not found.
 * @param name Name of the stack to check
 * @returns Status of the stack or undefined if non-existent
 */
async function stackStatus(name: string): Promise<StackStatus | undefined> {
    const response = await cfn.describeStacks({
        StackName: name
    });

    return response?.Stacks?.[0]?.StackStatus;
}

/**
 * Determines if an error indicates a CloudFormation stack does not exist
 * @param e Error
 * @returns True if the error is because the stack does not exist, false otherwise
 */
function stackDoesNotExist(e: unknown) {
    return (
        e instanceof CloudFormationServiceException &&
        e.message.includes('does not exist')
    );
}

/**
 * Determines if an error indicates a CloudFormation stack to be updated is in
 * the ROLLBACK_COMPLETE state
 * @param e Error
 * @returns True if the error is because the stack is in an invalid state, false otherwise
 */
function stackInvalidState(e: unknown) {
    return (
        e instanceof CloudFormationServiceException &&
        e.message.includes(
            'is in ROLLBACK_COMPLETE state and can not be updated'
        )
    );
}

/**
 * Retrieves all exports for a given CloudFormation stack
 * @param stackName Name of the CloudFormation stack
 * @returns The exports from the stack
 */
async function getStackExportMap(
    stackName: string
): Promise<Record<string, string>> {
    const exportMap: Record<string, string> = {};

    try {
        const response = await cfn.describeStacks({ StackName: stackName });

        if (!response?.Stacks || response.Stacks.length === 0) {
            return exportMap;
        }

        const stack = response.Stacks[0];

        if (!stack.Outputs) {
            return exportMap;
        }

        for (const output of stack.Outputs) {
            if (output.ExportName && output.OutputValue) {
                exportMap[output.ExportName] = output.OutputValue;
            }
        }
    } catch (error) {
        // expected to not exist if this is the first run
        if (!stackDoesNotExist(error)) {
            throw error;
        }
    }

    return exportMap;
}

/**
 * Replaces imports in elements of a CloudFormation template with concrete values
 * @param obj Elements of the CloudForamation template
 * @param replacements Map connecting dynamic imports for replacement with their concrete values
 * @returns The element after replacement
 */
function replaceImportValues(
    obj: unknown,
    replacements: Record<string, string>
): unknown {
    if (Array.isArray(obj)) {
        return obj.map((item) => replaceImportValues(item, replacements));
    } else if (typeof obj === 'object' && obj !== null) {
        if ('Fn::ImportValue' in obj) {
            type ObjectWithImport = object & { 'Fn::ImportValue': unknown };
            const importKey = (obj as ObjectWithImport)['Fn::ImportValue'];
            if (typeof importKey === 'string' && importKey in replacements) {
                return replacements[importKey];
            }
        }

        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key,
                replaceImportValues(value, replacements)
            ])
        );
    }

    return obj;
}

/**
 * Updates CloudFormation stacks to remove dependencies on exports of other stacks
 * @param props Input provided to the custom resource
 */
async function updateStacks(props: ResourceProperties): Promise<void> {
    const exportMap: Record<string, string> = {};

    for (const stack of props.stackNames) {
        const stackExportMap = await getStackExportMap(stack);
        Object.assign(exportMap, stackExportMap);
    }

    console.debug(`Export Map: ${JSON.stringify(exportMap)}`);

    for (const stack of props.stackNames) {
        let objectCreated = false;
        try {
            const { TemplateBody } = await cfn.getTemplate({
                StackName: stack
            });

            if (!TemplateBody) {
                continue;
            }

            const body = JSON.parse(TemplateBody) as unknown;
            const newBody = replaceImportValues(body, exportMap);

            await s3.putObject({
                Bucket: CFN_TEMPLATE_BUCKET_NAME,
                Key: `${stack}.json`,
                Body: JSON.stringify(newBody)
            });
            objectCreated = true;

            await cfn.updateStack({
                StackName: stack,
                TemplateURL: `${CFN_TEMPLATE_BUCKET_URL}/${stack}.json`,
                Capabilities: [
                    'CAPABILITY_IAM',
                    'CAPABILITY_NAMED_IAM',
                    'CAPABILITY_AUTO_EXPAND'
                ]
            });

            // Wait until stack update is complete before proceeding
            let state: StackStatus | undefined;
            do {
                // Wait before each check to avoid the rate limit
                await new Promise((resolve) => {
                    setTimeout(resolve, 2000);
                });

                state = await stackStatus(stack);

                if (
                    state === undefined ||
                    (!state.startsWith('UPDATE_COMPLETE') &&
                        state !== 'UPDATE_IN_PROGRESS')
                ) {
                    throw new Error(
                        state === undefined
                            ? 'Unable to retrieve stack state'
                            : `Stack in unexpected state: ${state}`
                    );
                }
            } while (state !== 'UPDATE_COMPLETE');
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === 'No updates are to be performed.'
            ) {
                console.warn(
                    `No updates are to be performed for stack: ${stack}`
                );
            } else if (stackDoesNotExist(error)) {
                console.warn(`Stack does not exist: ${stack}`);
            } else if (stackInvalidState(error) && props.ignoreInvalidStates) {
                console.warn(`Ignoring stack in invalid state: ${stack}`);
            } else {
                throw error;
            }
        } finally {
            if (objectCreated) {
                await s3.deleteObject({
                    Bucket: CFN_TEMPLATE_BUCKET_NAME,
                    Key: `${stack}.json`
                });
            }
        }
    }
}

/**
 * Handles CREATE event
 * @param event Input provided to the custom resource
 */
async function create(
    event: CloudFormationCustomResourceCreateEvent<ResourceProperties>
) {
    await updateStacks(event.ResourceProperties);
}

/**
 * Handles UPDATE event
 * @param event Input provided to the custom resource
 */
async function update(
    event: CloudFormationCustomResourceUpdateEvent<ResourceProperties>
) {
    if (
        event.OldResourceProperties.timestamp &&
        Date.parse(event.ResourceProperties.timestamp) <
            Date.parse(event.OldResourceProperties.timestamp)
    ) {
        console.log('Rollback detected, skipping update.');
        return;
    } else {
        await updateStacks(event.ResourceProperties);
    }
}

/**
 * Entry point
 * @param event Input provided to the custom resource
 * @param context AWS Lambda context
 * @returns Metadata about the response
 */
export const handler: CdkCustomResourceHandler<ResourceProperties> = async (
    event: CloudFormationCustomResourceEvent<ResourceProperties>,
    context: Context
): Promise<CdkCustomResourceResponse> => {
    console.debug(JSON.stringify(event, null, 2));
    console.debug(context);

    switch (event.RequestType) {
        case 'Create':
            await create(event);
            break;
        case 'Update':
            await update(event);
            break;
        case 'Delete':
            break;
    }

    return new Promise<CdkCustomResourceResponse>((resolve) => {
        resolve({});
    });
};
