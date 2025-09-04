// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdklabsTypeScriptProject } from 'cdklabs-projen-project-types';

/**
 * Sets up the default ignores for the project.
 */
export const configureIgnores = (project: CdklabsTypeScriptProject) => {
    const ignores = [
        '.DS_Store',
        '.python-version',
        '.nvmrc',
        'test.json',
        '.vscode/',
        '.yarn/',
        'cdk.out',
        'package-lock.json'
    ];

    ignores.forEach((ignore) => {
        project.addGitIgnore(ignore);
    });

    project.jest?.addIgnorePattern('utilities');
    project.jest?.addIgnorePattern('<rootDir>/test/(.+/)?fixtures/');
};
