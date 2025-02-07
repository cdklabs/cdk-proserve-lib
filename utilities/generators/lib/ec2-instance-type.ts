// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { readFileSync, writeFileSync } from 'fs';
import { EC2 } from '@aws-sdk/client-ec2';

function formatInstanceTypeName(name: string): string {
    // Convert instance type (e.g., "t2.micro") to uppercase with underscores
    return name.toUpperCase().replace(/[\.-]/g, '_');
}

export async function generateAndInjectEc2InstanceTypes() {
    try {
        let allInstanceTypes: any[] = [];
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
                .filter((instance) => instance.InstanceType)
                .map((instance) => [
                    instance.InstanceType,
                    {
                        vcpus: instance.VCpuInfo?.DefaultVCpus,
                        memoryMiB: instance.MemoryInfo?.SizeInMiB
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
