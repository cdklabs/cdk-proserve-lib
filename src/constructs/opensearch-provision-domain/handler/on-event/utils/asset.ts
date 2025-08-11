// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { downloadS3Asset } from '../../../../../common/lambda/download-s3-asset';
import { extractZipFile } from '../../../../../common/lambda/extract-zip-file';

/**
 * Downloads and extracts the zip asset containing all the provisioning configuration files
 * @param uri URI to the zip asset in Amazon Simple Storage Service (S3)
 * @returns Etag for the asset downloaded and path on disk to the extracted files
 */
export async function downloadAndExtractAsset(
    uri: string
): Promise<{ etag: string; path: string }> {
    const asset = await downloadS3Asset(uri);
    const finalPath = extractZipFile(asset.filePath);

    return {
        etag: asset.etag,
        path: finalPath
    };
}
