// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { TaskStep } from 'projen';
import {
    YarnNodeLinker,
    NodePackageManager,
    QuoteProps,
    TrailingComma,
    ArrowParens,
    EndOfLine
} from 'projen/lib/javascript';

/**
 * Dependencies
 */
const sdkVersion = '3.600.0';
const deps = [
    `@aws-sdk/client-iam@${sdkVersion}`,
    `@aws-sdk/client-secrets-manager@${sdkVersion}`,
    `@aws-sdk/client-ssm@${sdkVersion}`,
    `@aws-sdk/client-opensearch@${sdkVersion}`,
    `@aws-sdk/client-imagebuilder@${sdkVersion}`,
    `@aws-sdk/client-cloudformation@${sdkVersion}`,
    `@aws-sdk/client-s3@${sdkVersion}`,
    '@types/aws-lambda@8.10.141',
    'axios@1.7.7',
    'uuid@11.0.3'
];

/**
 * Project Definition
 */
const project = new CdklabsConstructLibrary({
    author: 'Derrike Nunn',
    authorAddress: 'nunnderr@amazon.com',
    jsiiVersion: '~5.7',
    cdkVersion: '2.160.0',
    defaultReleaseBranch: 'main',
    deps: deps,
    bundledDeps: deps,
    rosettaOptions: {
        strict: false
    },
    devDeps: [
        'aws-sdk-client-mock',
        'aws-sdk-client-mock-jest',
        'cdklabs-projen-project-types',
        'cloudform-types',
        'esbuild',
        'husky',
        'lint-staged',
        '@aws-sdk/client-wafv2',
        '@types/uuid',
        'cdk-nag@2.34.0'
    ],
    name: '@cdklabs/cdk-proserve-lib',
    packageName: '@cdklabs/cdk-proserve-lib',
    projenrcTs: true,
    gitignore: ['.DS_Store', '.python-version', '.nvmrc', 'test.json'],
    packageManager: NodePackageManager.YARN_BERRY,
    prettier: true,
    // jsiiTargetLanguages: [JsiiLanguage.PYTHON],
    prettierOptions: {
        settings: {
            tabWidth: 4,
            useTabs: false,
            semi: true,
            singleQuote: true,
            quoteProps: QuoteProps.ASNEEDED,
            trailingComma: TrailingComma.NONE,
            bracketSpacing: true,
            arrowParens: ArrowParens.ALWAYS,
            endOfLine: EndOfLine.LF
        },
        overrides: [
            {
                files: ['*.yml', '*.yaml'],
                options: {
                    singleQuote: false,
                    tabWidth: 2
                }
            }
        ]
    },
    workflowBootstrapSteps: [
        { name: 'Install corepack', run: 'sudo corepack enable' }
    ],
    yarnBerryOptions: {
        yarnRcOptions: {
            enableTelemetry: false,
            nodeLinker: YarnNodeLinker.NODE_MODULES
        }
    }
});

/**
 * Package.json Modifications
 */
project.addFields({
    exports: {
        '.': './index.js',
        './aspects': './aspects/index.js',
        './constructs': './constructs/index.js',
        './interfaces': './interfaces/index.js',
        './patterns': './patterns/index.js'
    },
    // Represents the structure in the package staging directory
    files: [
        'API.md',
        'index.js',
        'index.d.ts',
        'aspects/**/*',
        'common/**/*',
        'constructs/**/*',
        'interfaces/**/*',
        'patterns/**/*',
        'tsconfig.tsbuildinfo',
        '.jsii',
        '.jsii.gz'
    ],
    'lint-staged': {
        '**/*': ['prettier --write --ignore-unknown']
    },
    // Represents the structure in the package staging directory
    main: 'index.js'
});

project.addScripts({
    'generate:enums': 'yarn ts-node utilities/generators',
    prepare: 'husky'
});

/**
 * Tsconfig Modifications
 */
project.tsconfigDev?.addInclude('esbuild.ts');

/**
 * Tasks
 */
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

// Packaging Task
const stageDir = 'dist/stage';
const buildFiles = [
    '-R lib/*',
    '-R .git',
    'API.md',
    'package.json',
    'yarn.lock',
    '.jsii',
    'LICENSE',
    'README.md',
    '.npmignore'
];

const prePackageTask = project.addTask('pre-package', {
    description: 'Prepares the structure for packaging.',
    steps: [
        {
            exec: `mkdir -p ${stageDir}`,
            name: 'Make package staging directory.'
        },
        ...buildFiles.map<TaskStep>((f) => {
            return {
                exec: `cp ${f} ${stageDir}`,
                name: `Copy build file (${f}) to package staging directory.`
            };
        }),
        {
            exec: `cd ${stageDir} && yarn`,
            name: 'Install modules for package staging.'
        }
    ],
    condition: 'node -e "if (process.env.CI) process.exit(1)"'
});

const postPackageTask = project.addTask('post-package', {
    description: 'Cleans up after packaging completes.',
    steps: [
        {
            exec: `rm -rf ${stageDir}`,
            name: 'Remove the package staging directory.'
        }
    ],
    condition: 'node -e "if (process.env.CI) process.exit(1)"'
});

const packageTask = project.tasks.tryFind('package');
packageTask?.prependSpawn(prePackageTask);
packageTask?.spawn(postPackageTask);

const packageLanguageTasks = ['js', 'java', 'python', 'dotnet', 'go'];

packageLanguageTasks.forEach((l) => {
    const languageTask = project.tasks.tryFind(`package:${l}`);
    const currentCommand = languageTask?.steps.at(0)?.exec;

    if (currentCommand) {
        languageTask.updateStep(0, {
            exec: `if [ -d "${stageDir}" ]; then cd ${stageDir} && ${currentCommand}; else ${currentCommand}; fi`
        });

        languageTask.exec(`cp -R ${stageDir}/dist/${l} dist/`, {
            name: 'Extract the packaged distributions.',
            condition: 'node -e "if (process.env.CI) process.exit(1)"'
        });

        // languageTask.prependSpawn(prePackageTask, {
        //     condition: `! [ -d "${stageDir}" ]`
        // });
    }
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

/**
 * README
 */
const readmeTask = project.addTask('update:readme', {
    description: 'Updates the README with library package information.',
    steps: [
        {
            exec: 'yarn ts-node utilities/generators/lib/update-readme-library.ts',
            name: 'Runs script to automatically update the README.'
        }
    ]
});
project.postCompileTask.spawn(readmeTask);

/**
 * Ignore Patterns
 */
// Linting
const autoGeneratedFiles = [
    '.projen/*.json',
    '.eslintrc.json',
    '.prettierrc.json',
    '.yarnrc.yml',
    'API.md',
    'package.json',
    'tsconfig.dev.json',
    'yarn.lock'
];

autoGeneratedFiles.forEach((f) => {
    project.eslint?.addIgnorePattern(f);
    project.prettier?.addIgnorePattern(f);
});

// Testing
project.jest?.addIgnorePattern('utilities');
project.jest?.addIgnorePattern('<rootDir>/test/(.+/)?fixtures/');

/**
 * Projen Fixes
 */
project.tasks.tryFind('rosetta:extract')?.updateStep(0, {
    exec: 'yarn jsii-rosetta extract'
});

/**
 * Set minimum package versions across dependency chain
 */
project.package.addPackageResolutions(
    'cross-spawn@^7.0.5', // grype finding nov24
    'jsii@^5.7.3' // grype finding dec24
);

project.synth();
