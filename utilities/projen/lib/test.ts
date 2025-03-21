// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdklabsTypeScriptProject } from 'cdklabs-projen-project-types';
import { YamlFile } from 'projen';

export const configureTesting = (project: CdklabsTypeScriptProject) => {
    // codecov
    new YamlFile(project, '.codecov.yml', {
        obj: {
            coverage: {
                status: {
                    project: {
                        default: {
                            informational: true
                        }
                    },
                    patch: {
                        informational: true
                    }
                }
            }
        }
    });
    project.buildWorkflow?.addPostBuildSteps({
        name: 'Upload coverage to Codecov',
        uses: 'codecov/codecov-action@v4',
        with: {
            token: '${{ secrets.CODECOV_TOKEN }}',
            directory: 'coverage'
        }
    });

    // vitest
    const testTask = project.tasks.tryFind('test');
    testTask!.prependExec('vitest run --passWithNoTests -u', {
        receiveArgs: true
    });
    project.addTask('test:watch', {
        description: 'Run vitest in watch mode.',
        exec: 'vitest --watch'
    });
    project.addTask('test:watch:nocov', {
        description: 'Run vitest in watch mode with no coverage.',
        exec: 'vitest --watch --coverage=false'
    });
};
