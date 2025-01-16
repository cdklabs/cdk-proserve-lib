// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { generateAndInjectAwsManagedRuleEnum } from './lib/aws-managed-rule-groups';
import { generateAndInjectImageBuilderComponentEnum } from './lib/image-builder-component';

async function main() {
    try {
        await Promise.all([
            generateAndInjectAwsManagedRuleEnum(),
            generateAndInjectImageBuilderComponentEnum()
        ]);
    } catch (error) {
        console.error('Error running generators:', error);
        process.exit(1);
    }
}

main();
