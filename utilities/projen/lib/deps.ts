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
        `@aws-sdk/client-iam@${sdkVersion}`,
        `@aws-sdk/client-secrets-manager@${sdkVersion}`,
        `@aws-sdk/client-ssm@${sdkVersion}`,
        `@aws-sdk/client-opensearch@${sdkVersion}`,
        `@aws-sdk/client-imagebuilder@${sdkVersion}`,
        `@aws-sdk/client-cloudformation@${sdkVersion}`,
        `@aws-sdk/client-s3@${sdkVersion}`,
        '@codegenie/serverless-express@4.16.0',
        '@smithy/util-stream-node@4.0.2',
        '@types/aws-lambda@8.10.141',
        '@types/express@5.0.0',
        '@types/morgan@1.9.9',
        'axios@1.7.7',
        'express@5.0.1',
        'express-async-handler@1.2.0',
        'mime@4.0.6',
        'morgan@1.10.0',
        'uuid@11.0.3'
    ];

    const ideAndTestDeps = [
        'aws-sdk-client-mock',
        'aws-sdk-client-mock-jest',
        'cdklabs-projen-project-types',
        'cloudform-types',
        'esbuild',
        'husky',
        'lint-staged',
        '@aws-sdk/client-ec2',
        '@aws-sdk/client-pricing',
        '@aws-sdk/client-wafv2',
        '@types/uuid',
        'cdk-nag@2.34.0'
    ];

    project.addDevDeps(...lambdaHandlerDeps, ...ideAndTestDeps);

    /**
     * Resolutions
     */
    project.package.addPackageResolutions(
        'cross-spawn@^7.0.5' // grype finding nov24
    );
};
