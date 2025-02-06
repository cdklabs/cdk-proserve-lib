// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { JsonPatch } from 'projen';

const sdkVersion = '3.600.0';
const lambdaHandlerDepsPinned = [
    `@aws-sdk/client-iam@${sdkVersion}`,
    `@aws-sdk/client-secrets-manager@${sdkVersion}`,
    `@aws-sdk/client-ssm@${sdkVersion}`,
    `@aws-sdk/client-opensearch@${sdkVersion}`,
    `@aws-sdk/client-imagebuilder@${sdkVersion}`,
    `@aws-sdk/client-cloudformation@${sdkVersion}`,
    `@aws-sdk/client-s3@${sdkVersion}`
];
const lambdaHandlerDeps = ['@types/aws-lambda', 'axios', 'uuid'];
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
const ideDepsPinned = ['cdk-nag@2.34.0'];
const cdkLabsDeps = ['cdklabs-projen-project-types'];

export function addCdkProserveLibDevDeps(project: CdklabsConstructLibrary) {
    project.addDevDeps(
        ...lambdaHandlerDeps,
        ...lambdaHandlerDepsPinned,
        ...ideDeps,
        ...ideDepsPinned,
        ...cdkLabsDeps
    );
}

export function fixAutoUpgradeTasks(project: CdklabsConstructLibrary) {
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
