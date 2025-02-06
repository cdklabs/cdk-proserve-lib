// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { dirname } from 'node:path';
import { build, BuildOptions } from 'esbuild';

/**
 * Defaults
 */
const buildDefaults: Partial<BuildOptions> = {
    bundle: true,
    minify: true,
    platform: 'node',
    tsconfig: 'tsconfig.dev.json'
};

/**
 * Helpers
 */
/**
 * Helps determine the `outdir` option for esbuild.
 *
 * This is important because if there are multiple entry points, esbuild will replicate the directory structure
 * into the output directory starting from the lowest common ancestor directory among all input entry point paths.
 *
 * If there is a single entry point, however, esbuild uses the output directory as the full path meaning files appear
 * in the wrong location.
 *
 * @param entryPoints All entry points for esbuild
 * @param base The intended directory to use as the base directory for output
 * @returns The correct value for esbuild's outdir
 */
function determineOutdir(entryPoints: string[], base: string): string {
    if (entryPoints.length === 1) {
        return dirname(entryPoints[0]).replace(/^src/, 'lib');
    } else {
        return base;
    }
}

/**
 * Bundling for constructs
 */
const constructEntryPoints = [
    'src/constructs/ec2-image-builder-start/handler/index.ts',
    'src/constructs/opensearch-admin-user/handler/on-event/index.ts',
    'src/constructs/friendly-embrace/handler/on-event/index.ts',
    'src/constructs/iam-server-certificate/handler/on-event/index.ts'
];
build({
    ...buildDefaults,
    entryPoints: constructEntryPoints,
    outdir: determineOutdir(constructEntryPoints, 'lib/constructs')
});

/**
 * Bundling for patterns
 */
const patternEntryPoints = [
    'src/patterns/apigateway-static-hosting/handler/index.ts'
];
build({
    ...buildDefaults,
    entryPoints: patternEntryPoints,
    outdir: determineOutdir(patternEntryPoints, 'lib/patterns')
});
