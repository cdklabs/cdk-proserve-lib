// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { readFileSync, writeFileSync } from 'node:fs';
import { WAFV2 } from '@aws-sdk/client-wafv2';

/**
 * Formats AWS WAF rule group names into a consistent enum format.

 * @param name - The original rule group name
 * @returns The formatted name in format ex: EXAMPLE_RULE_GROUP
 */
function formatRuleGroupName(name: string): string {
    let formattedName = name.replace(/^AWSManagedRules/, '');

    formattedName = formattedName
        .replace(/SQLi/g, 'SQL_DATABASE')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .toUpperCase();

    return formattedName;
}

/**
 * Generates and injects an enum of AWS WAF managed rule groups into a specified file.
 *
 * This function:
 * 1. Fetches available AWS WAF managed rule groups using the WAFV2 client
 * 2. Formats the rule group names and their descriptions
 * 3. Generates an enum TypeScript code block
 * 4. Injects the generated enum into a target file between specified markers
 *
 * The target file must contain the markers:
 * - "/** WAF Managed Rule Groups *​/"
 * - "/** End WAF Managed Rule Groups *​/"
 */
export async function generateAndInjectAwsManagedRuleEnum() {
    try {
        const client = new WAFV2({ region: 'us-east-1' });

        const response = await client.listAvailableManagedRuleGroups({
            Scope: 'REGIONAL'
        });
        const ruleGroups = response.ManagedRuleGroups ?? [];

        if (ruleGroups.length === 0) {
            throw new Error('No managed rule groups found');
        }

        // Create a Map to store rule names and their descriptions
        const ruleGroupMap = new Map(
            ruleGroups
                .filter((rule) => rule.Name && rule.Description)
                .map((rule) => [rule.Name, rule.Description])
        );

        // Generate Enum entries with descriptions
        const enumEntries = Array.from(ruleGroupMap.entries()).map(
            ([ruleName, description]) => {
                const name = formatRuleGroupName(ruleName!);
                return `        /** ${description} */\n        ${name} = '${ruleName}'`;
            }
        );

        // Create the Enum string
        const enumString = `    export enum AwsManagedRuleGroup {
${enumEntries.join(',\n\n')}
    }`;

        // Read the existing file content
        const filePath = 'src/constructs/web-application-firewall/index.ts';
        let fileContent = readFileSync(filePath, 'utf8');

        // Find the location to inject the enum
        const startMarker = '/** WAF Managed Rule Groups */';
        const endMarker = '/** End WAF Managed Rule Groups */';
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

        console.log(
            `AWS Managed Rules generated -- count: ${ruleGroupMap.size}`
        );
    } catch (error) {
        console.error('Error generating and injecting enum:', error);
    }
}
