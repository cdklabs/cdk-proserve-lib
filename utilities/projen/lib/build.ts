// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdklabsTypeScriptProject } from 'cdklabs-projen-project-types';
import { tsNodeCommand } from './common';

/**
 * Configures build settings for the project.
 */
export const configureBuild = (project: CdklabsTypeScriptProject) => {
    // Build (Compile Only) Task
    project.addTask('build:compile', {
        description: 'Performs a full build without packaging',
        steps: [
            {
                spawn: 'default'
            },
            {
                spawn: 'pre-compile'
            },
            {
                spawn: 'compile'
            },
            {
                spawn: 'post-compile'
            }
        ]
    });

    // Lambda Build Task
    const compileLambdas = project.addTask('compile:lambda', {
        description: 'Builds the Lambda function code and bundles dependencies',
        steps: [
            {
                exec: `${tsNodeCommand} esbuild.ts`,
                name: 'Run esbuild.'
            }
        ]
    });
    project.tsconfigDev?.addInclude('esbuild.ts');
    project.postCompileTask.spawn(compileLambdas);

    // Clean Up Task
    project.addTask('clean', {
        description: 'Removes all ephemeral build and test files.',
        steps: [
            {
                exec: 'rm -rf coverage/',
                name: 'Remove coverage information.'
            },
            {
                exec: 'rm -rf dist/',
                name: 'Remove built packages.'
            },
            {
                exec: 'rm -rf lib/',
                name: 'Remove build files.'
            },
            {
                exec: 'rm -rf test-reports/',
                name: 'Remove testing information.'
            },
            {
                exec: 'rm -rf .jsii tsconfig.json',
                name: 'Remove intermediate files.'
            }
        ]
    });

    project.tsconfigDev?.addInclude('utilities/**/*.ts');
};
