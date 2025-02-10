// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { readFileSync, writeFileSync } from 'node:fs';
import { IAM } from '@aws-sdk/client-iam';

function formatPolicyName(name: string): string {
    let processedName = name.replace(/-/g, '_');
    processedName = processedName.replace(/AWS(?![_])/g, 'AWS_');
    processedName = processedName.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2');
    processedName = processedName.replace(/([a-z0-9])([A-Z])/g, '$1_$2');

    let finalName = processedName
        .toUpperCase()
        .replace(/[^A-Z0-9_]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_/, '')
        .replace(/_$/, '');

    // Specific fix for GROUPSAND case
    finalName = finalName.replace('GROUPSAND', 'GROUPS_AND');

    return finalName;
}

export async function generateAndInjectAwsManagedPolicyClass() {
    try {
        let allPolicies: any[] = [];
        let marker: string | undefined;

        do {
            const client = new IAM({ region: 'us-east-1' });

            const response = await client.listPolicies({
                Scope: 'AWS',
                OnlyAttached: false,
                Marker: marker
            });

            if (response.Policies) {
                const rootPathPolicies = response.Policies.filter(
                    (policy) => policy.Path === '/'
                );
                allPolicies = allPolicies.concat(rootPathPolicies);
            }
            marker = response.Marker;
        } while (marker);

        if (allPolicies.length === 0) {
            throw new Error('No policies found');
        }

        const policyMap = new Map(
            allPolicies
                .filter((policy) => {
                    const hasNameAndDesc = policy.PolicyName;
                    if (!hasNameAndDesc) {
                        console.log('Filtered out policy:', policy);
                    }
                    return hasNameAndDesc;
                })
                .map((policy) => [policy.PolicyName, policy.Description])
        );

        // Generate static members
        const classMembers = Array.from(policyMap.entries()).map(
            ([policyName]) => {
                if (!policyName) {
                    throw new Error('Policy name is undefined');
                }
                const name = formatPolicyName(policyName);
                return `    public static readonly ${name} = ManagedPolicy.fromAwsManagedPolicyName('${policyName}');`;
            }
        );

        // Create the class string
        const classString = `export class AwsManagedPolicy {

${classMembers.join('\n\n')}

    private constructor() {} // Prevents instantiation
}`;

        // Read the existing file content
        const filePath = 'src/types/aws-managed-policy.ts';
        let fileContent = '';

        try {
            fileContent = readFileSync(filePath, 'utf8');
        } catch (error) {
            throw new Error(`Error reading file: ${error}`);
        }

        // Find the location to inject the class
        const startMarker = '/** AWS Managed Policy */';
        const endMarker = '/** End AWS Managed Policy */';
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

        console.log(`AWS Managed Policy generated -- count: ${policyMap.size}`);
    } catch (error) {
        console.error('Error generating and injecting class:', error);
    }
}
