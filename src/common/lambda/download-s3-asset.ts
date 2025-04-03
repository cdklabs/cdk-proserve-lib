// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { createWriteStream } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { Readable } from 'node:stream';
import { S3 } from '@aws-sdk/client-s3';

/**
 * Downloads an S3 object to a local file.
 *
 * @param s3ObjectUri - The S3 URI of the object to download
 * @returns The path to the downloaded file and the ETag of the object
 */
export async function downloadS3Asset(
    s3ObjectUri: string
): Promise<{ filePath: string; etag: string }> {
    const s3Client = new S3();
    const targetParts = s3ObjectUri.replace('s3://', '').split('/');
    const bucket = targetParts[0];
    const key = targetParts.slice(1).join('/');
    const fileName = basename(key) ?? 'fileAsset';

    // Get object metadata
    const metadata = await s3Client.headObject({
        Bucket: bucket,
        Key: key
    });

    // Create path to download template
    const filePath = join(tmpdir(), fileName);

    // Get the object
    const response = await s3Client.getObject({
        Bucket: bucket,
        Key: key
    });

    // Write the object data to a file
    if (response.Body instanceof Readable) {
        const output = createWriteStream(filePath);
        const downloadPipeline = response.Body.pipe(output);

        await new Promise((resolve, reject) => {
            downloadPipeline.on('error', reject);
            downloadPipeline.on('finish', resolve);
        });
    } else {
        throw new Error('S3 object body is not a readable stream');
    }

    return {
        filePath,
        etag: metadata.ETag!
    };
}
