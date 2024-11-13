/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

import { readFileSync, writeFileSync } from 'fs';
import {
    Imagebuilder,
    ListComponentsCommandInput,
    ListComponentsCommandOutput
} from '@aws-sdk/client-imagebuilder';

// Function to format component name
function formatComponentName(name: string): string {
    return name.replace(/-/g, '_').toUpperCase();
}

// Main function to generate the Enum and inject it into the file
async function generateAndInjectComponentEnum() {
    try {
        // Create an ImageBuilder client
        const client = new Imagebuilder({ region: 'us-east-1' });
        let allComponents: any[] = [];
        let nextToken: string | undefined;

        do {
            // Prepare the command input
            const input: ListComponentsCommandInput = {
                owner: 'Amazon',
                maxResults: 25,
                nextToken: nextToken
            };

            // Execute the command
            const response: ListComponentsCommandOutput =
                await client.listComponents(input);
            if (response.componentVersionList) {
                allComponents = allComponents.concat(
                    response.componentVersionList
                );
            }
            nextToken = response.nextToken;
        } while (nextToken);

        if (allComponents.length === 0) {
            throw new Error('No components found');
        }

        // Use a Set to keep only unique component names
        const uniqueComponents = new Set(
            allComponents.map((component) => component.name)
        );

        // Generate Enum entries
        const enumEntries = Array.from(uniqueComponents).map(
            (componentName) => {
                if (!componentName) {
                    throw new Error('Component name is undefined');
                }
                const name = formatComponentName(componentName);
                return `${name} = '${componentName}'`;
            }
        );

        // Create the Enum string
        const enumString = `    export enum Component {
        ${enumEntries.join(',\n        ')}
    }`;

        // Read the existing file content
        const filePath = 'src/constructs/ec2-image-pipeline/index.ts';
        let fileContent = readFileSync(filePath, 'utf8');

        // Find the location to inject the enum
        const startMarker = '/** Image Builder Component */';
        const endMarker = '/** End Image Builder Component */';
        const startIndex = fileContent.indexOf(startMarker);
        const endIndex = fileContent.indexOf(endMarker);

        if (startIndex === -1 || endIndex === -1) {
            throw new Error('Could not find injection markers in the file');
        }

        // Replace the existing content between markers with the new enum
        const newContent =
            fileContent.slice(0, startIndex + startMarker.length) +
            '\n' +
            enumString +
            '\n    ' +
            fileContent.slice(endIndex);

        // Write the modified content back to the file
        writeFileSync(filePath, newContent);

        console.log('Enum injected successfully!');
        console.log(`Total unique components: ${uniqueComponents.size}`);
    } catch (error) {
        console.error('Error generating and injecting enum:', error);
    }
}

// Run the function
void generateAndInjectComponentEnum();
