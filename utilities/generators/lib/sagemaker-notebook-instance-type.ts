// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { readFileSync, writeFileSync } from 'node:fs';
import { Pricing } from '@aws-sdk/client-pricing';

/**
 * Formats an instance type name by converting to uppercase and replacing dots
 * with underscores.
 *
 * @param name - The instance type name to format
 * @returns The formatted instance type name
 */
function formatInstanceTypeName(name: string): string {
    return name.toUpperCase().replace(/\./g, '_');
}

/**
 * Generates and injects SageMaker instance types into a TypeScript class file.
 *
 * This function performs the following steps:
 * 1. Queries the AWS Pricing API to get all SageMaker ML instance types
 * 2. Formats the instance types into TypeScript class members
 * 3. Generates a class containing static members for each instance type
 * 4. Injects the generated class into a target file between specific markers
 *
 * The function queries only us-east-1 region and filters for ML Instance product
 * family. The generated class prevents instantiation and provides static access
 * to instance types.
 */
export async function generateAndInjectSageMakerInstanceTypes() {
    try {
        // Create Pricing client
        const client = new Pricing({ region: 'us-east-1' });

        const instanceTypes = new Set<string>();
        let nextToken: string | undefined;

        do {
            const response = await client.getProducts({
                ServiceCode: 'AmazonSageMaker',
                Filters: [
                    {
                        Type: 'TERM_MATCH',
                        Field: 'regionCode',
                        Value: 'us-east-1'
                    }
                ],
                NextToken: nextToken
            });

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
