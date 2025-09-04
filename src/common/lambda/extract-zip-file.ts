// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import AdmZip = require('adm-zip');

/**
 * Extracts a ZIP file to a specified location
 *
 * @param zipFilePath Path to the ZIP file
 * @param extractPath Optional path to extract to; if not provided, a temp directory is used
 * @returns Path where the files were extracted
 */
export function extractZipFile(
    zipFilePath: string,
    extractPath?: string
): string {
    // Determine extraction path - use provided path or create one in temp directory
    const fileName = basename(zipFilePath) ?? 'archive';
    const targetPath = extractPath || join(tmpdir(), `${fileName}-extracted`);

    // Extract ZIP contents
    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(targetPath, true); // True to overwrite existing files

    return targetPath;
}
