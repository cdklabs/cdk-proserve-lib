// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CompatibilityMatrixGenerator } from './compatibility-matrix-generator';

async function updateCompatibilityMatrix(): Promise<void> {
    try {
        const generator = new CompatibilityMatrixGenerator();
        await generator.generateMatrix();
    } catch (error) {
        console.error('Failed to update compatibility matrix:', error);
        process.exit(1);
    }
}

// Run the update
updateCompatibilityMatrix();
