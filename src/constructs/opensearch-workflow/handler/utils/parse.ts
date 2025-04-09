// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { GetObjectCommand, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { load } from 'js-yaml';
import { Json } from '../../../../types/json';

/**
 * Parses a given template string that can be JSON or YAML.
 */
export function parseTemplate(template: string): Json {
    try {
        // Try parsing as JSON first
        return JSON.parse(template) as Json;
    } catch {
        try {
            // If JSON parsing fails, try parsing as YAML
            // Remediation is to use `safeLoad` function which was removed from js-yaml 4.0.0 as
            // all load functions are now safe by default.
            // https://github.com/nodeca/js-yaml/blob/master/CHANGELOG.md#400---2021-01-03
            // nosemgrep: nodejs_scan.javascript-eval-rule-yaml_deserialize
            return load(template) as Json;
        } catch {
            throw new Error(
                'Invalid template format. Must be valid JSON or YAML.'
            );
        }
    }
}

/**
 * Substitute values into a template string.
 *
 * @param templateContents the contents of the template to perform substitutions
 * @param substitutions the substitions map to use for variable replacement
 * @returns the original template with all substitutions made
 */
export function substituteTemplateValues(
    templateContents: string,
    substitutions?: Record<string, string>
): string {
    if (!substitutions) return templateContents;

    return Object.entries(substitutions).reduce((acc, [key, value]) => {
        // nosemgrep: eslint.detect-non-literal-regexp
        const regex = new RegExp(`\\$\\{\\{\\{[ ]*${key}[ ]*\\}\\}\\}`, 'g');
        return acc.replace(regex, value);
    }, templateContents);
}

/**
 * Generates a mapping of keys to pre-signed S3 URLs.
 *
 * This function takes a record of key-value pairs where the value is an S3 path in the format
 * 's3://bucket-name/path/to/object', and transforms each value into a pre-signed URL that allows
 * temporary access to the object for 1 hour.
 *
 * @param s3PathMappings - An optional record mapping keys to S3 paths in the format 's3://bucket-name/path/to/object'
 * @returns A promise that resolves to a record mapping the original keys to their corresponding pre-signed URLs.
 * If no mappings are provided, returns an empty object.
 *
 * @example
 * // Input
 * const mappings = {
 *   'myImage': 's3://my-bucket/images/picture.jpg',
 *   'myDocument': 's3://my-bucket/documents/file.pdf'
 * };
 *
 * // Output
 * // {
 * //   'myImage': 'https://my-bucket.s3.amazonaws.com/images/picture.jpg?...',
 * //   'myDocument': 'https://my-bucket.s3.amazonaws.com/documents/file.pdf?...'
 * // }
 */
export async function generatePresignedUrlMapping(
    s3PathMappings?: Record<string, string>
): Promise<Record<string, string>> {
    if (!s3PathMappings) return {};

    const substitutions: Record<string, string> = {};
    const client = new S3();

    for (const [replacementKey, s3Path] of Object.entries(s3PathMappings)) {
        const [bucket, ...keyParts] = s3Path.replace('s3://', '').split('/');
        const key = keyParts.join('/');

        // Create pre-signed url
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key
        });
        const url = await getSignedUrl(client, command, { expiresIn: 3600 }); // 1 hour expiration

        substitutions[replacementKey] = url;
    }

    return substitutions;
}
