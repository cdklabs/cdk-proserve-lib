// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { createWriteStream } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Readable } from 'node:stream';
import {
    S3Client,
    GetObjectCommand,
    HeadObjectCommand
} from '@aws-sdk/client-s3';

export async function downloadS3Asset(
    s3ObjectUri: string
): Promise<{ filePath: string; etag: string }> {
    const s3Client = new S3Client();
    const targetParts = s3ObjectUri.replace('s3://', '').split('/');
    const bucket = targetParts[0];
    const key = targetParts.slice(1).join('/');
    const fileName = targetParts.slice(-1).pop() ?? 'fileAsset';

    // Get object metadata
    const headCommand = new HeadObjectCommand({
        Bucket: bucket,
        Key: key
    });

    const metadata = await s3Client.send(headCommand);

    // Create path to download template
    const filePath = join(tmpdir(), fileName);

    // Get the object
    const getCommand = new GetObjectCommand({
        Bucket: bucket,
        Key: key
    });

    const response = await s3Client.send(getCommand);

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
