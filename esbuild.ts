// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { build, BuildOptions } from 'esbuild';
import glob from 'glob';

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
 * Finds all the handler functions that need to be built automatically via glob path search
 * @returns Paths to all the handler functions that need to be built
 */
function findHandlers(): Promise<string[]> {
    const handlers = [
        '**/handler/index.ts',
        '**/handler/on-event/index.ts',
        '**/handler/is-complete/index.ts'
    ].map(
        (path) =>
            new Promise<string[]>((resolve, reject) => {
                glob(path, { cwd: 'src' }, (err, files) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(files);
                    }
                });
            })
    );

    return new Promise((resolve, reject) =>
        Promise.all(handlers)
            .then((paths) => {
                resolve(
                    paths
                        .flatMap((path) => path)
                        .map((path) => join('src', path))
                );
            })
            .catch((r) => reject(r))
    );
}

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
 * Removes the handler directories and all files contained within for the given entry points before recreating them.
 * This removes handler code that was built by JSII with TSC since esbuild is being used to bundle and minify these
 * files separately
 * @param entryPoints All entry points for esbuild
 */
function emptyHandlerDirectories(entryPoints: string[]) {
    entryPoints
        .map((p) =>
            p.replace(/^src/, 'lib').replace(/\/handler\/.*?$/g, '/handler')
        )
        .forEach((p) => {
            rmSync(p, {
                force: true,
                recursive: true
            });

            mkdirSync(p, { recursive: true });
        });
}

/**
 * Bundling
 */
void (async () => {
    const entryPoints = await findHandlers();
    emptyHandlerDirectories(entryPoints);

    await build({
        ...buildDefaults,
        entryPoints: entryPoints,
        outdir: determineOutdir(entryPoints, 'lib')
    });
})();
