// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    CORSRule as SdkCORSRule,
    NoSuchBucket,
    S3ServiceException,
    S3
} from '@aws-sdk/client-s3';
import {
    CdkCustomResourceEvent,
    CdkCustomResourceResponse,
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceUpdateEvent,
    Context
} from 'aws-lambda';
import { RuleConflictException } from '../types/exceptions';
import { CORSRule, ResourceProperties } from '../types/resource-properties';
import { RuleSet } from '../types/rule-set';

/**
 * Preprocesses input CORS rules before application to an Amazon S3 bucket
 * @param rules Input rules to be modified
 * @returns CORS rules which have been modified
 */
function preprocess(rules: CORSRule[]): CORSRule[] {
    const processed: CORSRule[] = [];

    rules.forEach((r) => {
        // Lowercase all origins
        const newOrigins = r.AllowedOrigins?.map((o) => o.toLowerCase());

        processed.push({
            ...r,
            AllowedOrigins: newOrigins
        });
    });

    return processed;
}

/**
 * Retrieves the current set of CORS rules from an Amazon S3 bucket
 * @param client SDK client for interacting with Amazon S3
 * @param bucketName Name for the Amazon S3 bucket
 * @returns CORS rules for the Amazon S3 bucket
 * @throws {S3ServiceException}
 */
async function getCurrentRules(
    client: S3,
    bucketName: string
): Promise<RuleSet> {
    const rules: SdkCORSRule[] = [];
    const namedRules = new Map<string, CORSRule>();

    try {
        const response = await client.getBucketCors({
            Bucket: bucketName
        });

        if (response.CORSRules) {
            rules.push(...response.CORSRules);
        }
    } catch (e: unknown) {
        // Ignore when a bucket does not have a CORS configuration, this is equivalent to an empty rule set
        if (
            !(e instanceof S3ServiceException) ||
            e.name !== 'NoSuchCORSConfiguration'
        ) {
            throw e;
        }
    }

    // Extract rules with IDs
    rules.forEach((r) => {
        if (r.ID) {
            namedRules.set(r.ID, r as CORSRule);
        }
    });

    // Extract rules without IDs
    const unnamedRules = rules.filter((r) => {
        return !r.ID;
    });

    return {
        named: namedRules,
        unnamed: unnamedRules
    };
}

/**
 * Updates the CORS configuration on an Amazon S3 bucket
 * @param client SDK client for interacting with Amazon S3
 * @param bucketName Name for the Amazon S3 bucket
 * @param rules CORS rules for the new configuration
 */
async function updateRules(client: S3, bucketName: string, rules: RuleSet) {
    if (rules.named.size === 0 && rules.unnamed.length === 0) {
        // Remove the CORS configuration if there are no rules
        await client.deleteBucketCors({
            Bucket: bucketName
        });
    } else {
        await client.putBucketCors({
            Bucket: bucketName,
            CORSConfiguration: {
                CORSRules: [...rules.named.values(), ...rules.unnamed]
            }
        });
    }
}

/**
 * Retrieves unique IDs amongst a set of CORS rules
 * @param rules CORS rules
 * @returns Set of unique IDs from all the rules
 */
function getUniqueIds(rules: CORSRule[]): Set<string> {
    return new Set(
        rules.map((r) => {
            return r.ID;
        })
    );
}

/**
 * Handles AWS CloudFormation CREATE calls
 * @param event Input metadata for the custom resource
 * @returns A promise that resolves to a CloudFormation custom resource response
 * @throws {RuleConflictException} All rules must have unique IDs
 */
async function onCreate(
    event: CloudFormationCustomResourceCreateEvent<ResourceProperties>
): Promise<CdkCustomResourceResponse<never>> {
    const props = event.ResourceProperties;
    const client = new S3({
        region: props.Region
    });

    const currentRules = await getCurrentRules(client, props.BucketName);

    // Validation
    props.Rules.forEach((r) => {
        if (currentRules.named.has(r.ID)) {
            throw new RuleConflictException(r.ID);
        } else {
            currentRules.named.set(r.ID, r);
        }
    });

    await updateRules(client, props.BucketName, currentRules);

    return {
        PhysicalResourceId: event.RequestId
    };
}

/**
 * Handles AWS CloudFormation UPDATE calls
 * @param event Input metadata for the custom resource
 * @returns A promise that resolves to a CloudFormation custom resource response
 * @throws {RuleConflictException} All rules must have unique IDs
 */
async function onUpdate(
    event: CloudFormationCustomResourceUpdateEvent<ResourceProperties>
): Promise<CdkCustomResourceResponse<never>> {
    const props = event.ResourceProperties;
    const oldProps = event.OldResourceProperties;

    const newClient = new S3({
        region: props.Region
    });
    const oldClient = new S3({
        region: props.Region
    });

    const newRules = new Map(props.Rules.map((r) => [r.ID, r]));

    const oldIds = getUniqueIds(oldProps.Rules);
    const newIds = getUniqueIds(props.Rules);

    // Node 18.x appears to be missing Set operations (e.g. union, intersection, difference)
    const toAddIds: string[] = []; // IDs which only appear in the new properties
    const toModifyIds: string[] = []; // IDs which appear in both the old and new properties

    newIds.forEach((id) => {
        if (!oldIds.has(id)) {
            toAddIds.push(id);
        } else {
            toModifyIds.push(id);
        }
    });

    const currentRules = await getCurrentRules(newClient, props.BucketName);

    if (props.BucketName !== oldProps.BucketName) {
        // Get rules for the old bucket if bucket names have changed and remove them from the old bucket
        const oldBucketRules = await getCurrentRules(
            oldClient,
            oldProps.BucketName
        );

        oldIds.forEach((id) => oldBucketRules.named.delete(id));

        await updateRules(oldClient, oldProps.BucketName, oldBucketRules);
    } else {
        // Buckets have not changed, remove the rules which only appear in the old properties from the current bucket rule set
        const toRemoveIds: string[] = [];

        oldIds.forEach((id) => {
            if (!newIds.has(id)) {
                toRemoveIds.push(id);
            }
        });

        toRemoveIds.forEach((id) => currentRules.named.delete(id));
    }

    toAddIds.forEach((id) => {
        const rule = newRules.get(id)!;

        if (currentRules.named.has(id)) {
            throw new RuleConflictException(id);
        } else {
            currentRules.named.set(id, rule);
        }
    });

    toModifyIds.forEach((id) => {
        const rule = newRules.get(id)!;
        currentRules.named.set(id, rule);
    });

    await updateRules(newClient, props.BucketName, currentRules);

    return {
        PhysicalResourceId: event.PhysicalResourceId
    };
}

/**
 * Handles AWS CloudFormation DELETE calls
 * @param event Input metadata for the custom resource
 * @returns A promise that resolves to a CloudFormation custom resource response
 * @throws {S3ServiceException}
 */
async function onDelete(
    event: CloudFormationCustomResourceDeleteEvent<ResourceProperties>
): Promise<CdkCustomResourceResponse<never>> {
    try {
        const props = event.ResourceProperties;
        const client = new S3({
            region: props.Region
        });

        const currentRules = await getCurrentRules(client, props.BucketName);

        // Remove rules from the current set if they were in the properties
        props.Rules.forEach((r) => currentRules.named.delete(r.ID));

        await updateRules(client, props.BucketName, currentRules);

        return {
            PhysicalResourceId: event.PhysicalResourceId
        };
    } catch (e) {
        // Ignore missing buckets since if the bucket doesnt exist then the rules do not either
        if (
            e instanceof NoSuchBucket ||
            (e instanceof S3ServiceException && e.name === 'NoSuchBucket')
        ) {
            return {
                PhysicalResourceId: event.PhysicalResourceId
            };
        } else {
            throw e;
        }
    }
}

/**
 * Entry point
 * @param event Input provided to the custom resource
 * @param context AWS Lambda context
 * @returns A promise that resolves to a CloudFormation custom resource response
 */
export async function handler(
    event: CdkCustomResourceEvent<ResourceProperties>,
    context: Context
): Promise<CdkCustomResourceResponse<never>> {
    console.debug(event);
    console.debug(context);

    switch (event.RequestType) {
        case 'Create': {
            console.info('Running CREATE...');

            const preprocessedEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
                {
                    ...event,
                    ResourceProperties: {
                        ...event.ResourceProperties,
                        Rules: preprocess(event.ResourceProperties.Rules)
                    }
                };

            return onCreate(preprocessedEvent);
        }
        case 'Delete': {
            console.info('Running DELETE...');

            const preprocessedEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
                {
                    ...event,
                    ResourceProperties: {
                        ...event.ResourceProperties,
                        Rules: preprocess(event.ResourceProperties.Rules)
                    }
                };

            return onDelete(preprocessedEvent);
        }
        case 'Update': {
            console.info('Running UPDATE...');

            const preprocessedEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
                {
                    ...event,
                    ResourceProperties: {
                        ...event.ResourceProperties,
                        Rules: preprocess(event.ResourceProperties.Rules)
                    },
                    OldResourceProperties: {
                        ...event.OldResourceProperties,
                        Rules: preprocess(event.OldResourceProperties.Rules)
                    }
                };

            return onUpdate(preprocessedEvent);
        }
    }
}
