// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { generateAndInjectAwsManagedPolicyClass } from './lib/aws-managed-policy';
import { generateAndInjectAwsManagedRuleEnum } from './lib/aws-managed-rule-groups';
import { generateAndInjectEc2InstanceTypes } from './lib/ec2-instance-type';
import { generateAndInjectImageBuilderComponentEnum } from './lib/image-builder-component';
import { generateAndInjectSageMakerInstanceTypes } from './lib/sagemaker-notebook-instance-type';
import { CompatibilityMatrixGenerator } from './lib/compatibility-matrix-generator';

async function main() {
    try {
        // Create compatibility matrix generator instance
        const compatibilityGenerator = new CompatibilityMatrixGenerator();

        await Promise.all([
            generateAndInjectAwsManagedRuleEnum(),
            generateAndInjectImageBuilderComponentEnum(),
            generateAndInjectAwsManagedPolicyClass(),
            generateAndInjectEc2InstanceTypes(),
            generateAndInjectSageMakerInstanceTypes(),
            compatibilityGenerator.generateMatrix()
        ]);
    } catch (error) {
        console.error('Error running generators:', error);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
});
