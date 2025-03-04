/**
 * (c) 2025 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
 *
 * This AWS Content is provided subject to the terms of the AWS Customer
 * Agreement available at https://aws.amazon.com/agreement or other written
 * agreement between Customer and either Amazon Web Services, Inc. or
 * Amazon Web Services EMEA SARL or both.
 */

import { createWriteStream } from 'node:fs';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { aws } from '@aws-wwps-proserve/adc-sdk';
import { S3ReadStream } from 's3-readstream';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

export async function downloadFileAsset(
    assetS3ObjectUrl: string
): Promise<{ filePath: string; etag: string }> {
    const targetParts = assetS3ObjectUrl.replace('s3://', '').split('/');
    const bucket = targetParts[0];
    const key = targetParts.slice(1).join('/');
    const fileName = targetParts.slice(-1).pop() ?? 'fileAsset';

    const metadata = await aws.s3.headObject({
        Bucket: bucket,
        Key: key
    });

    // Create path to download template
    const filePath = join(tmpdir(), fileName);

    const objectStream = new S3ReadStream({
        s3: aws.s3,
        command: new GetObjectCommand({
            Bucket: bucket,
            Key: key
        }),
        maxLength: metadata.ContentLength!
    });

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const output = createWriteStream(filePath);
    const downloadPipeline = objectStream.pipe(output);

    await new Promise((resolve, reject) => {
        downloadPipeline.on('error', reject);
        downloadPipeline.on('close', resolve);
        downloadPipeline.on('finish', resolve);
    });

    return {
        filePath,
        etag: metadata.ETag!
    };
}
