// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdklabsTypeScriptProject } from 'cdklabs-projen-project-types';
import { YamlFile } from 'projen';
import { GithubWorkflow } from 'projen/lib/github';
import { JobPermission } from 'projen/lib/github/workflows-model';

export const configureLicense = (project: CdklabsTypeScriptProject) => {
    const license = [
        'Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.',
        'SPDX-License-Identifier: Apache-2.0'
    ].join('\n');

    new YamlFile(project, '.licenserc.yaml', {
        obj: {
            header: {
                license: {
                    'spdx-id': 'Apache-2.0',
                    'copyright-owner': 'Amazon.com, Inc. or its affiliates.',
                    content: license,
                    pattern: license
                },
                comment: 'on-failure',
                'paths-ignore': [
                    '**/*.json',
                    ...['html', 'txt'].map(
                        (type) =>
                            `test/patterns/apigateway-static-hosting/**/fixtures/**/*.${type}`
                    ),
                    'test/constructs/opensearch-workflow/fixtures/invalid.txt'
                ],
                paths: ['src', 'test', 'utilities'],
                language: {
                    TypeScript: {
                        extensions: ['.ts', '.tsx'],
                        comment_style_id: 'DoubleSlash'
                    }
                }
            }
        }
    });

    // Create GitHub workflow for license checks
    const workflow = new GithubWorkflow(project.github!, 'lint');

    workflow.on({
        pullRequest: {}
    });

    workflow.addJob('license', {
        runsOn: ['ubuntu-latest'],
        permissions: {
            contents: JobPermission.READ
        },
        steps: [
            {
                uses: 'actions/checkout@v3'
            },
            {
                name: 'Check License Header',
                uses: 'apache/skywalking-eyes/header@5c5b974209f0de5d905f37deb69369068ebfc15c',
                with: {
                    mode: 'check'
                }
            }
        ]
    });
};
