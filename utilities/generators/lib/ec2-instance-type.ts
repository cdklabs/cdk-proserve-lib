// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { readFileSync, writeFileSync } from 'node:fs';
import { EC2, InstanceTypeInfo } from '@aws-sdk/client-ec2';

/**
 * Formats an EC2 instance type name to a standardized format.
 * Converts instance types (e.g., "t2.micro") to uppercase with underscores
 * replacing dots and hyphens.
 *
 * @param name - The EC2 instance type name to format
 * @returns The formatted instance type name
 */
function formatInstanceTypeName(name: string): string {
    // Convert instance type (e.g., "t2.micro") to uppercase with underscores
    return name.toUpperCase().replace(/[\.-]/g, '_');
}

/**
 * Generates and injects EC2 instance type definitions into a TypeScript file.
 *
 * This function:
 * 1. Fetches all EC2 instance types from AWS using the EC2 API
 * 2. Creates a map of instance types with their vCPU and memory specifications
 * 3. Generates a TypeScript class with static members for each instance type
 * 4. Injects the generated class into a target file between specified markers
 */
export async function generateAndInjectEc2InstanceTypes() {
    try {
        let allInstanceTypes: InstanceTypeInfo[] = [];
        let nextToken: string | undefined;

        // Create EC2 client
        const client = new EC2({ region: 'us-east-1' });

        do {
            const response = await client.describeInstanceTypes({
                NextToken: nextToken
            });

            if (response.InstanceTypes) {
                allInstanceTypes = allInstanceTypes.concat(
                    response.InstanceTypes
                );
            }
            nextToken = response.NextToken;
        } while (nextToken);

        if (allInstanceTypes.length === 0) {
            throw new Error('No instance types found');
        }

        // Create map of instance types with their descriptions
        const instanceTypeMap = new Map(
            allInstanceTypes
                .filter(
                    (
                        instance
                    ): instance is InstanceTypeInfo & {
                        InstanceType: string;
                    } => typeof instance.InstanceType === 'string'
                )
                .map((instance) => [
                    instance.InstanceType,
                    {
                        vcpus: instance.VCpuInfo?.DefaultVCpus ?? 0,
                        memoryMiB: instance.MemoryInfo?.SizeInMiB ?? 0
                    }
                ])
        );

        // Generate static members
        const classMembers = Array.from(instanceTypeMap.entries())
            .sort(([a], [b]) => a.localeCompare(b)) // Sort by instance type name
            .map(([instanceType, info]) => {
                const name = formatInstanceTypeName(instanceType);
                return `    /**
     * ${instanceType}
     * vCPUs: ${info.vcpus}
     * Memory: ${info.memoryMiB} MiB
     */
    public static readonly ${name} = '${instanceType}';`;
            });

        // Create the class string
        const classString = `export class Ec2InstanceType {

${classMembers.join('\n\n')}

    private constructor() {} // Prevents instantiation
}`;

        // Read the existing file content
        const filePath = 'src/types/ec2-instance-type.ts';
        let fileContent = '';

        try {
            fileContent = readFileSync(filePath, 'utf8');
        } catch (error) {
            // If file doesn't exist, create it with markers
            fileContent = `// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/** EC2 Instance Type */
/** End EC2 Instance Type */
`;
        }

        // Find the location to inject the class
        const startMarker = '/** EC2 Instance Type */';
        const endMarker = '/** End EC2 Instance Type */';
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
            `EC2 Instance Types generated -- count: ${instanceTypeMap.size}`
        );
    } catch (error) {
        console.error('Error generating and injecting class:', error);
    }
}
