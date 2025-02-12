// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { project } from '../../../.projenrc';

/**
 * Sets up the default ignores for the project.
 */
export const configureIgnores = () => {
    const ignores = [
        '.DS_Store',
        '.python-version',
        '.nvmrc',
        'test.json',
        '.vscode/',
        '.yarn/'
    ];

    ignores.forEach((ignore) => {
        project.addGitIgnore(ignore);
    });

    project.jest?.addIgnorePattern('utilities');
    project.jest?.addIgnorePattern('<rootDir>/test/(.+/)?fixtures/');
};
