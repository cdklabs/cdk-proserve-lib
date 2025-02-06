// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { JsonPatch } from 'projen';

// Version of AWS SDK v3 to use
const sdkVersion = '3.600.0';

// AWS SDK v3 dependencies with pinned versions for Lambda handlers
const lambdaHandlerDepsPinned = [
    `@aws-sdk/client-iam@${sdkVersion}`,
    `@aws-sdk/client-secrets-manager@${sdkVersion}`,
    `@aws-sdk/client-ssm@${sdkVersion}`,
    `@aws-sdk/client-opensearch@${sdkVersion}`,
    `@aws-sdk/client-imagebuilder@${sdkVersion}`,
    `@aws-sdk/client-cloudformation@${sdkVersion}`,
    `@aws-sdk/client-s3@${sdkVersion}`
];

// Core dependencies for Lambda handlers without version pinning
const lambdaHandlerDeps = ['@types/aws-lambda', 'axios', 'uuid'];

// Development dependencies for IDE and testing
const ideDeps = [
    'aws-sdk-client-mock',
    'aws-sdk-client-mock-jest',
    'cloudform-types',
    'esbuild',
    'husky',
    'lint-staged',
    '@aws-sdk/client-wafv2',
    '@types/uuid'
];

// Development dependencies with pinned versions
const ideDepsPinned = ['cdk-nag@2.34.0'];

// CDK Labs specific dependencies
const cdkLabsDeps = ['cdklabs-projen-project-types'];

/**
 * Adds all required development dependencies to the project
 *
 * @param project - The project to add dependencies to
 */
export function addCdkProserveLibDevDeps(project: CdklabsConstructLibrary) {
    project.addDevDeps(
        ...lambdaHandlerDeps,
        ...lambdaHandlerDepsPinned,
        ...ideDeps,
        ...ideDepsPinned,
        ...cdkLabsDeps
    );
}

/**
 * Modifies the upgrade-dev-deps task in the project's tasks.json to handle
 * dependency updates correctly. This is necessary because running `yarn projen`
 * will reset dependencies that it manages back. By utilizing this function, we
 * only bump dependencies that we have added to the project.
 *
 * @param project - The CDK Labs construct library project to modify
 */
export function fixUpgradeDevDepsTask(project: CdklabsConstructLibrary) {
    project.tryFindObjectFile('.projen/tasks.json')?.patch(
        JsonPatch.replace(`/tasks/upgrade-dev-deps/steps`, [
            {
                exec:
                    'yarn dlx npm-check-updates@16 --upgrade --target=minor --peer --dep=dev --filter=' +
                    [...lambdaHandlerDeps, ...ideDeps].join(',')
            },
            {
                exec: 'unset CI && yarn install'
            },
            {
                exec: 'yarn up ' + [...lambdaHandlerDeps, ...ideDeps].join(' ')
            },
            {
                exec: 'unset CI && npx projen'
            },
            {
                spawn: 'post-upgrade'
            }
        ])
    );
}
