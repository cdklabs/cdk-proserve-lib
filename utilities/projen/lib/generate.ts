// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { project } from '../../../.projenrc';

/**
 * Configures the Generators of the project. Generators will automatically
 * update files in the repository dynamically from information gathered through
 * an API or other means.
 */
export const configureGenerators = () => {
    // Generate Task
    project.addTask('generate', {
        description: 'Automatically update files with generator scripts.',
        steps: [
            {
                exec: 'yarn ts-node ./utilities/generators'
            },
            {
                spawn: 'eslint'
            }
        ]
    });

    // README
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
};
