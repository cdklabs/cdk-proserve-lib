// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { project } from '../../../.projenrc';

/**
 * Configures dependencies for the project and any overrides/resolutions.
 */
export const configureDependencies = () => {
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
        '@types/aws-lambda@8.10.141',
        'axios@1.7.7',
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
