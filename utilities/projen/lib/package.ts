// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { project } from '../../../.projenrc';

/**
 * Configures the packaging settings for the project.
 */
export const configurePackaging = () => {
    /**
     * Package.json Modifications
     */
    project.addFields({
        exports: {
            '.': './index.js',
            './aspects': './aspects/index.js',
            './constructs': './constructs/index.js',
            './patterns': './patterns/index.js',
            './types': './types/index.js'
        },
        // Represents the structure in the package staging directory
        files: [
            'API.md',
            'lib/index.js',
            'lib/index.d.ts',
            'lib/aspects/**/*',
            'lib/common/**/*',
            'lib/constructs/**/*',
            'lib/patterns/**/*',
            'lib/types/**/*',
            'lib/tsconfig.tsbuildinfo',
            '.jsii',
            '.jsii.gz'
        ],
        // Represents the structure in the package staging directory
        main: 'index.js',
        packageManager:
            'yarn@1.22.19+sha1.4ba7fc5c6e704fce2066ecbfb0b0d8976fe62447'
    });

    project.tsconfigDev?.addInclude('utilities/**/*.ts');

    // Language Packaging Tasks
    const packageLanguageTasks = ['js', 'java', 'python', 'dotnet', 'go'];
    packageLanguageTasks.forEach((l) => {
        const languageTask = project.tasks.tryFind(`package:${l}`);

        languageTask?.updateStep(0, {
            ...languageTask.steps[0],
            condition: `node -e "if (!process.env.CI || (process.env.GITHUB_JOB.toLowerCase() !== 'build' && process.env.GITHUB_JOB.toLowerCase() !== 'release')) process.exit(1)"`
        });

        languageTask?.exec(
            `jsii-pacmak -v --target ${l} --pack-command "rm -rf * && name=\\$(npm pack \"$(pwd)\" | tail -1) && mkdir tmp && tar -xzvf \\$name -C tmp && mv tmp/package/lib/* tmp/package && rm -rf tmp/package/lib && cd tmp && tar -czvf ../\\$name package && cd .. && rm -rf tmp && echo \\$name"`,
            {
                condition: `node -e "if (process.env.CI && (process.env.GITHUB_JOB.toLowerCase() === 'build' || process.env.GITHUB_JOB.toLowerCase() === 'release')) process.exit(1)"`
            }
        );
    });

    // Lambda Build Task
    const compileLambdas = project.addTask('compile:lambda', {
        description: 'Builds the Lambda function code and bundles dependencies',
        steps: [
            {
                exec: 'yarn ts-node esbuild.ts',
                name: 'Run esbuild.'
            }
        ]
    });
    project.tsconfigDev?.addInclude('esbuild.ts');

    /**
     * Asset Bundling
     */
    const srcDir = 'src';
    const outputDir = 'lib';
    const bundleExtensions = ['yml', 'yaml'];
    const bundleTask = project.addTask('bundle', {
        description: 'Distributes assets to the build directory.'
    });
    bundleExtensions.forEach((e) =>
        bundleTask.exec(
            `find ${srcDir} -name "*.${e}" -exec sh -c 'mkdir -p "${outputDir}/$(dirname \${1#${srcDir}/})" && cp "$1" "${outputDir}/\${1#${srcDir}/}"' _ {} \\;`,
            {
                name: `Distribute asset files (.${e}) to the build directory.`
            }
        )
    );
    project.postCompileTask.spawn(bundleTask);
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

    // Rosetta
    project.tasks.tryFind('rosetta:extract')?.updateStep(0, {
        exec: 'yarn jsii-rosetta extract 2> /dev/null 1>&2'
    });
};
