// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { NodePackageManager } from 'projen/lib/javascript';
import * as p from './utilities/projen';

/**
 * Project Definition
 */
const project = new CdklabsConstructLibrary({
    author: 'Derrike Nunn && Luciano Taranto',
    authorAddress: 'aws-cdk-dev@amazon.com',
    stability: 'experimental',
    private: false,
    keywords: ['aws', 'awscdk', 'aws-cdk', 'cdk'],
    jsiiVersion: '~5.7',
    cdkVersion: '2.177.0',
    defaultReleaseBranch: 'main',
    rosettaOptions: {
        strict: false
    },
    name: '@cdklabs/cdk-proserve-lib',
    packageName: '@cdklabs/cdk-proserve-lib',
    description:
        'AWS CDK library containing constructs, aspects, and patterns.',
    projenrcTs: true,
    packageManager: NodePackageManager.YARN_CLASSIC,
    prettier: true,
    prettierOptions: p.prettierOptions,
    enablePRAutoMerge: true,
    codeCov: true,
    versionrcOptions: {
        preset: 'conventionalcommits'
    }
});

p.configureBuild(project);
p.configureDependencies(project);
p.configureGenerators(project);
p.configureIgnores(project);
p.configureLicense(project);
p.configureLinting(project);
p.configurePackaging(project);

project.synth();
