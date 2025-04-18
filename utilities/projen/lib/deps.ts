// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdklabsTypeScriptProject } from 'cdklabs-projen-project-types';

/**
 * Configures dependencies for the project and any overrides/resolutions.
 */
export const configureDependencies = (project: CdklabsTypeScriptProject) => {
    /**
     * Dependencies
     */
    const sdkVersion = '3.600.0';
    const lambdaHandlerDeps = [
        `@aws-sdk/client-dynamodb@${sdkVersion}`,
        `@aws-sdk/lib-dynamodb@${sdkVersion}`,
        `@aws-sdk/client-iam@${sdkVersion}`,
        `@aws-sdk/client-secrets-manager@${sdkVersion}`,
        `@aws-sdk/client-ssm@${sdkVersion}`,
        `@aws-sdk/client-opensearch@${sdkVersion}`,
        `@aws-sdk/client-imagebuilder@${sdkVersion}`,
        `@aws-sdk/client-cloudformation@${sdkVersion}`,
        `@aws-sdk/client-s3@${sdkVersion}`,
        `@aws-sdk/s3-request-presigner@${sdkVersion}`,
        `@aws-sdk/client-sts@${sdkVersion}`,
        `@aws-sdk/credential-provider-node@${sdkVersion}`,
        `@aws-crypto/sha256-js@5.2.0`,
        `@aws-sdk/client-ec2@${sdkVersion}`,
        '@codegenie/serverless-express@4.16.0',
        '@smithy/signature-v4@5.0.1',
        '@smithy/types@^3.7.2',
        '@smithy/util-stream-node@4.0.2',
        '@types/adm-zip@0.5.7',
        '@types/aws-lambda@8.10.141',
        '@types/express@5.0.0',
        '@types/mime@3.0.0',
        '@types/morgan@1.9.9',
        'adm-zip@0.5.16',
        'express@5.0.1',
        'express-async-handler@1.2.0',
        'js-yaml@4.1.0',
        'mime@3.0.0',
        'morgan@1.10.0',
        'uuid@11.0.3'
    ];

    const ideAndTestDeps = [
        '@aws-sdk/client-pricing',
        '@aws-sdk/client-wafv2',
        '@aws-sdk/util-stream', // download-s3-asset test sdkStreamMixin
        '@types/glob',
        '@types/supertest',
        '@types/uuid',
        '@types/js-yaml',
        'aws-sdk-client-mock',
        'cdk-nag@2.34.0',
        'cdklabs-projen-project-types',
        'cloudform-types',
        'esbuild',
        'glob',
        'husky',
        'lint-staged',
        'supertest',
        'vitest',
        '@vitest/coverage-v8',
        'aws-sdk-client-mock-vitest',
        'mock-fs'
    ];

    project.addDevDeps(...lambdaHandlerDeps, ...ideAndTestDeps);

    /**
     * Resolutions
     */
    project.package.addPackageResolutions(
        'cross-spawn@^7.0.5', // grype finding nov24
        'string-width@^4.2.3', // vitest compatibility
        'strip-ansi@^6.0.1', // vitest compatibility
        'ansi-regex@^5.0.1', // vitest compatiblity
        'wrap-ansi@^7.0.0' // vitest compatiblity
    );
};
