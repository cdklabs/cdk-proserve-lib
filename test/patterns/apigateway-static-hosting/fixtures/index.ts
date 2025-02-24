// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { ApiGatewayStaticHosting } from '../../../../src/patterns/apigateway-static-hosting';

/**
 * Paths to mock static assets
 */
export const mockFolderAssetPath = join(__dirname, 'site');
export const mockZipAssetPath = join(__dirname, 'site.zip');
export const mockBadAssetPath = join(__dirname, 'site', 'main.html');
export const mockMissingAssetPath = join(__dirname, 'nonexistant.zip');

/**
 * Mock static asset configuration
 */
export const mockFolderAsset: ApiGatewayStaticHosting.Asset = {
    id: 'folder',
    path: mockFolderAssetPath
};
