/**
 * (c) 2025 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
 *
 * This AWS Content is provided subject to the terms of the AWS Customer
 * Agreement available at https://aws.amazon.com/agreement or other written
 * agreement between Customer and either Amazon Web Services, Inc. or
 * Amazon Web Services EMEA SARL or both.
 */

import yaml from 'js-yaml';
import { Json } from '../models/json';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
            return yaml.load(template) as Json;
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
        /* eslint-disable security/detect-non-literal-regexp */
        // nosemgrep: eslint.detect-non-literal-regexp
        const regex = new RegExp(`\\$\\{\\{\\{[ ]*${key}[ ]*\\}\\}\\}`, 'g');
        /* eslint-enable security/detect-non-literal-regexp */
        return acc.replace(regex, value);
    }, templateContents);
}

export async function generatePresignedUrlMapping(
    s3PathMappings?: Record<string, string>
): Promise<Record<string, string>> {
    if (!s3PathMappings) return {};

    const substitutions: Record<string, string> = {};
    const client = new S3Client();

    for (const [replacementKey, s3Path] of Object.entries(s3PathMappings)) {
        const [bucket, ...keyParts] = s3Path.replace('s3://', '').split('/');
        const key = keyParts.join('/');

        // Create pre-signed url
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key
        });
        const url = await getSignedUrl(client, command, { expiresIn: 3600 }); // 1 hour expiration

        // eslint-disable-next-line security/detect-object-injection
        substitutions[replacementKey] = url;
    }

    return substitutions;
}
