// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdklabsTypeScriptProject } from 'cdklabs-projen-project-types';
import { YamlFile } from 'projen';

export const configureTesting = (project: CdklabsTypeScriptProject) => {
    new YamlFile(project, '.codecov.yml', {
        obj: {
            coverage: {
                status: {
                    project: {
                        default: {
                            informational: true
                        }
                    }
                }
            }
        }
    });
};
