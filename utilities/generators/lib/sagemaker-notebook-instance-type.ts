// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Pricing, GetProductsCommand } from '@aws-sdk/client-pricing';
import { readFileSync, writeFileSync } from 'fs';

function formatInstanceTypeName(name: string): string {
    return name.toUpperCase().replace(/\./g, '_');
}

export async function generateAndInjectSageMakerInstanceTypes() {
    try {
        // Create Pricing client
        const client = new Pricing({ region: 'us-east-1' });

        const command = new GetProductsCommand({
            ServiceCode: 'AmazonSageMaker',
            Filters: [
                {
                    Type: 'TERM_MATCH',
                    Field: 'regionCode',
                    Value: 'us-east-1'
                }
            ]
        });

        const instanceTypes = new Set<string>();
        let nextToken: string | undefined;

        do {
            const response = await client.send(command);

            if (response.PriceList) {
                for (const priceItem of response.PriceList) {
                    const product = JSON.parse(priceItem);

                    if (product.product.productFamily === 'ML Instance') {
                        const instanceName =
                            product.product.attributes.instanceName;
                        if (instanceName) {
                            instanceTypes.add(instanceName);
                        }
                    }
                }
            }

            nextToken = response.NextToken;
            if (nextToken) {
                command.input.NextToken = nextToken;
            }
        } while (nextToken);

        // Sort instance types
        const sortedInstanceTypes = Array.from(instanceTypes).sort();

        // Generate static members
        const classMembers = sortedInstanceTypes.map((instanceType) => {
            const name = formatInstanceTypeName(instanceType);
            return `    /**
     * ${instanceType} Notebook Instance Type
     */
    public static readonly ${name} = '${instanceType}';`;
        });

        // Create the class string
        const classString = `export class SageMakerNotebookInstanceType {

${classMembers.join('\n\n')}

    private constructor() {} // Prevents instantiation
}`;

        // Read the existing file content
        const filePath = 'src/types/sagemaker-notebook-instance-type.ts';
        let fileContent = '';

        try {
            fileContent = readFileSync(filePath, 'utf8');
        } catch (error) {
            // If file doesn't exist, create it with markers
            fileContent = `// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/** SageMaker Instance Type */
/** End SageMaker Instance Type */
`;
        }

        // Find the location to inject the class
        const startMarker = '/** SageMaker Instance Type */';
        const endMarker = '/** End SageMaker Instance Type */';
        const startIndex = fileContent.indexOf(startMarker);
        const endIndex = fileContent.indexOf(endMarker);

        if (startIndex === -1 || endIndex === -1) {
            throw new Error('Could not find injection markers in the file');
        }

        // Replace the existing content between markers with the new class
        const newContent =
            fileContent.slice(0, startIndex + startMarker.length) +
            '\n' +
            classString +
            '\n' +
            fileContent.slice(endIndex);

        // Write the modified content back to the file
        writeFileSync(filePath, newContent);

        console.log(
            `SageMaker Instance Types generated -- count: ${instanceTypes.size}`
        );
    } catch (error) {
        console.error('Error generating and injecting class:', error);
        throw error;
    }
}
