// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { readFileSync, writeFileSync } from 'node:fs';
import { Pricing } from '@aws-sdk/client-pricing';

/**
 * The EC2 attributes that come directly from the pricing API.
 */
interface EC2InstanceAttributes {
    enhancedNetworkingSupported: string;
    intelTurboAvailable: string;
    memory: string;
    dedicatedEbsThroughput: string;
    vcpu: string;
    classicnetworkingsupport: string;
    capacitystatus: string;
    locationType: string;
    storage: string;
    instanceFamily: string;
    operatingSystem: string;
    intelAvx2Available: string;
    regionCode: string;
    physicalProcessor: string;
    clockSpeed: string;
    ecu: string;
    networkPerformance: string;
    servicename: string;
    instancesku: string;
    gpuMemory: string;
    vpcnetworkingsupport: string;
    instanceType: string;
    tenancy: string;
    usagetype: string;
    normalizationSizeFactor: string;
    intelAvxAvailable: string;
    processorFeatures: string;
    servicecode: string;
    licenseModel: string;
    currentGeneration: string;
    preInstalledSw: string;
    location: string;
    processorArchitecture: string;
    marketoption: string;
    operation: string;
    availabilityzone: string;
}

/**
 * The EC2 instance details that are used to generate the class.
 */
interface EC2InstanceDetails {
    instanceType: string;
    vcpus: string;
    memory: string;
    networkPerformance?: string;
    physicalProcessor?: string;
    storage?: string;
    clockSpeed?: string;
    gpuMemory?: string;
}

/**
 * Formats an EC2 instance type name to a standardized format.
 * Converts instance types (e.g., "t2.micro") to uppercase with underscores
 * replacing dots and hyphens.
 *
 * @param name - The EC2 instance type name to format
 * @returns The formatted instance type name
 */
function formatInstanceTypeName(name: string): string {
    return name.toUpperCase().replace(/[\.-]/g, '_');
}

/**
 * Generates and injects EC2 instance type definitions into a TypeScript file.
 *
 * This function:
 * 1. Fetches all EC2 instance types from AWS Pricing API
 * 2. Creates a map of instance types with their detailed specifications
 * 3. Generates a TypeScript class with static members for each instance type
 * 4. Injects the generated class into a target file between specified markers
 */
export async function generateAndInjectEc2InstanceTypes() {
    try {
        // Create Pricing client
        const pricingClient = new Pricing({ region: 'us-east-1' });

        // Create instance type map
        const instanceTypeMap = new Map<string, EC2InstanceDetails>();

        // Get info from Pricing API
        let pricingNextToken: string | undefined;

        do {
            const response = await pricingClient.getProducts({
                ServiceCode: 'AmazonEC2',
                Filters: [
                    {
                        Type: 'TERM_MATCH',
                        Field: 'regionCode',
                        Value: 'us-east-1'
                    },
                    {
                        Type: 'TERM_MATCH',
                        Field: 'operatingSystem',
                        Value: 'Linux'
                    }
                ],
                NextToken: pricingNextToken
            });

            if (response.PriceList) {
                for (const priceItem of response.PriceList) {
                    const product = JSON.parse(priceItem);
                    const attrs: EC2InstanceAttributes =
                        product.product.attributes;

                    if (attrs.instanceType) {
                        instanceTypeMap.set(attrs.instanceType, {
                            instanceType: attrs.instanceType,
                            vcpus: attrs.vcpu,
                            memory: attrs.memory,
                            physicalProcessor: attrs.physicalProcessor,
                            clockSpeed: attrs.clockSpeed,
                            storage: attrs.storage,
                            gpuMemory: attrs.gpuMemory,
                            networkPerformance: attrs.networkPerformance
                        });
                    }
                }
            }

            pricingNextToken = response.NextToken;
        } while (pricingNextToken);

        // Generate static members
        const classMembers = Array.from(instanceTypeMap.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([instanceType, info]) => {
                const name = formatInstanceTypeName(instanceType);
                return `    /**
     * ${instanceType}
     * - vCPUs: ${info.vcpus}
     * - Memory: ${info.memory}${
         info.networkPerformance
             ? `\n     * - Network: ${info.networkPerformance}`
             : ''
     }${
         info.physicalProcessor
             ? `\n     * - Processor: ${info.physicalProcessor}`
             : ''
     }${info.clockSpeed ? `\n     * - Clock Speed: ${info.clockSpeed}` : ''}${
         info.storage ? `\n     * - Storage: ${info.storage}` : ''
     }${info.gpuMemory ? `\n     * - GPU Memory: ${info.gpuMemory}` : ''}
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
        throw error;
    }
}

// Execute the generator if running directly
if (require.main === module) {
    generateAndInjectEc2InstanceTypes()
        .then(() => console.log('Completed successfully'))
        .catch((error) => {
            console.error('Failed to generate EC2 instance types:', error);
            process.exit(1);
        });
}
