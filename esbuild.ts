// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

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
 * Bundling for constructs
 */
build({
    ...buildDefaults,
    entryPoints: [
        'src/constructs/ec2-image-builder-start/handler/index.ts',
        'src/constructs/opensearch-admin-user/handler/on-event/index.ts',
        'src/constructs/friendly-embrace/handler/on-event/index.ts',
        'src/constructs/iam-server-certificate/handler/on-event/index.ts'
    ],
    outdir: 'lib/constructs'
});

/**
 * Bundling for patterns
 */
build({
    ...buildDefaults,
    entryPoints: ['src/patterns/apigateway-static-hosting/handler/index.ts'],
    outdir: 'lib/patterns'
});
