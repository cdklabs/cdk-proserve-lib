// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as fs from 'node:fs';
import * as path from 'node:path';
import {
    CompatibilityConfig,
    ComponentCompatibility,
    PartitionStatus
} from './types/compatibility';

/**
 * Error information for compatibility configuration loading failures.
 */
interface CompatibilityError {
    readonly component: string;
    readonly type: 'aspect' | 'construct' | 'pattern';
    readonly error: string;
    readonly fallbackUsed: boolean;
}

/**
 * Enhanced compatibility matrix generator that supports component-specific configuration files.
 * This class scans for compatibility.ts files in test directories and falls back to default
 * rules when configuration files are missing.
 */
export class CompatibilityMatrixGenerator {
    private readonly errors: CompatibilityError[] = [];
    private readonly sourceDirectories = {
        aspects: 'src/aspects',
        constructs: 'src/constructs',
        patterns: 'src/patterns'
    };

    private readonly testDirectories = {
        aspects: 'test/aspects',
        constructs: 'test/constructs',
        patterns: 'test/patterns'
    };

    /**
     * Generates the complete compatibility matrix by scanning components and their configurations.
     * @returns Promise that resolves when the matrix generation is complete
     */
    async generateMatrix(): Promise<void> {
        console.log('Starting compatibility matrix generation...');

        // Clear any previous errors
        this.errors.length = 0;

        const components = await this.scanComponents();
        const matrixContent = this.generateMarkdown(components);
        await this.writeMatrix(matrixContent);

        console.log(
            `Compatibility matrix updated -- total items: ${components.length}`
        );
        const counts = this.getComponentCounts(components);
        console.log(`  Aspects: ${counts.aspects}`);
        console.log(`  Constructs: ${counts.constructs}`);
        console.log(`  Patterns: ${counts.patterns}`);

        // Report any errors that occurred during processing
        if (this.errors.length > 0) {
            console.warn(
                `\nEncountered ${this.errors.length} error(s) during compatibility matrix generation:`
            );
            this.errors.forEach((error) => {
                console.warn(
                    `  - ${error.type}/${error.component}: ${error.error} (fallback: ${error.fallbackUsed ? 'used' : 'not used'})`
                );
            });
            console.warn(
                'All errors were handled gracefully with fallback to default compatibility rules.\n'
            );
        }
    }

    /**
     * Scans all component directories and loads their compatibility configurations.
     * @returns Promise resolving to array of component compatibility information
     */
    private async scanComponents(): Promise<ComponentCompatibility[]> {
        const components: ComponentCompatibility[] = [];

        // Scan each component type
        for (const [type, sourceDir] of Object.entries(
            this.sourceDirectories
        )) {
            const componentNames = this.getDirectoryItems(sourceDir);

            for (const name of componentNames) {
                try {
                    const config = await this.loadCompatibilityConfig(
                        type as keyof typeof this.sourceDirectories,
                        name
                    );
                    components.push({
                        name,
                        type: this.getComponentType(type),
                        config
                    });
                } catch (error) {
                    const errorMessage =
                        error instanceof Error ? error.message : String(error);
                    this.recordError({
                        component: name,
                        type: this.getComponentType(type),
                        error: errorMessage,
                        fallbackUsed: true
                    });

                    // Fall back to default configuration
                    const defaultConfig = this.getDefaultCompatibility();
                    components.push({
                        name,
                        type: this.getComponentType(type),
                        config: defaultConfig
                    });
                }
            }
        }

        // Sort components by type and name for consistent output
        return components.sort((a, b) => {
            if (a.type !== b.type) {
                const typeOrder = { aspect: 0, construct: 1, pattern: 2 };
                return typeOrder[a.type] - typeOrder[b.type];
            }
            return a.name.localeCompare(b.name);
        });
    }

    /**
     * Loads compatibility configuration from a component's compatibility.ts file.
     * Falls back to default rules if the file doesn't exist or fails to load.
     * @param type The component type (aspect, construct, pattern)
     * @param name The component name
     * @returns Promise resolving to the compatibility configuration
     */
    private async loadCompatibilityConfig(
        type: keyof typeof this.testDirectories,
        name: string
    ): Promise<CompatibilityConfig> {
        const testDir = this.testDirectories[type];
        const compatibilityPath = path.join(testDir, name, 'compatibility.ts');

        // Check if compatibility file exists
        if (!fs.existsSync(compatibilityPath)) {
            this.recordError({
                component: name,
                type: type as 'aspect' | 'construct' | 'pattern',
                error: 'Compatibility file not found',
                fallbackUsed: true
            });
            return this.getDefaultCompatibility();
        }

        try {
            // Dynamic import of the compatibility configuration
            const absolutePath = path.resolve(compatibilityPath);

            // Clear module cache to ensure fresh import
            delete require.cache[absolutePath];

            const module = await import(absolutePath);

            if (!module.compatibility) {
                this.recordError({
                    component: name,
                    type: type as 'aspect' | 'construct' | 'pattern',
                    error: "No 'compatibility' export found in configuration file",
                    fallbackUsed: true
                });
                return this.getDefaultCompatibility();
            }

            // Validate the loaded configuration
            const config = module.compatibility as CompatibilityConfig;
            this.validateCompatibilityConfig(config, `${type}/${name}`);

            console.log(
                `Loaded compatibility configuration for ${type}/${name}`
            );
            return config;
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : String(error);
            this.recordError({
                component: name,
                type: type as 'aspect' | 'construct' | 'pattern',
                error: `Failed to load or validate configuration: ${errorMessage}`,
                fallbackUsed: true
            });
            return this.getDefaultCompatibility();
        }
    }

    /**
     * Gets directory items (subdirectories) from a given path.
     * @param dirPath The directory path to scan
     * @returns Array of directory names
     */
    private getDirectoryItems(dirPath: string): string[] {
        if (!fs.existsSync(dirPath)) {
            return [];
        }

        return fs
            .readdirSync(dirPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name)
            .sort();
    }

    /**
     * Generates default compatibility configuration for components without explicit configuration.
     * @returns Default compatibility configuration with NEEDS_TESTING status
     */
    private getDefaultCompatibility(): CompatibilityConfig {
        return {
            partitions: {
                commercial: PartitionStatus.NEEDS_TESTING,
                govcloud: PartitionStatus.NEEDS_TESTING,
                other: PartitionStatus.NEEDS_TESTING
            },
            notes: 'Needs compatibility assessment'
        };
    }

    /**
     * Records an error that occurred during compatibility matrix generation.
     * @param error The error information to record
     */
    private recordError(error: CompatibilityError): void {
        this.errors.push(error);
    }

    /**
     * Validates a compatibility configuration object.
     * @param config The configuration to validate
     * @param componentPath The component path for error reporting
     * @throws Error if the configuration is invalid
     */
    private validateCompatibilityConfig(
        config: CompatibilityConfig,
        componentPath: string
    ): void {
        // First perform comprehensive schema validation
        this.validateConfigurationSchema(config, componentPath);

        if (!config.partitions) {
            throw new Error(
                `Missing 'partitions' field in compatibility config for ${componentPath}`
            );
        }

        const requiredPartitions = ['commercial', 'govcloud', 'other'];
        for (const partition of requiredPartitions) {
            if (!(partition in config.partitions)) {
                throw new Error(
                    `Missing '${partition}' partition status in compatibility config for ${componentPath}`
                );
            }

            const status =
                config.partitions[partition as keyof typeof config.partitions];
            if (!Object.values(PartitionStatus).includes(status)) {
                throw new Error(
                    `Invalid partition status '${status}' for ${partition} in compatibility config for ${componentPath}`
                );
            }
        }

        // Validate that notes field is not empty if provided
        if (config.notes !== undefined && typeof config.notes !== 'string') {
            throw new Error(
                `Invalid 'notes' field type in compatibility config for ${componentPath}. Expected string.`
            );
        }

        // Validate that configuration is not null or undefined
        if (!config || typeof config !== 'object') {
            throw new Error(
                `Invalid compatibility configuration for ${componentPath}. Expected object.`
            );
        }
    }

    /**
     * Performs comprehensive schema validation on a compatibility configuration.
     * @param config The configuration to validate
     * @param componentPath The component path for error reporting
     * @throws Error if the configuration schema is invalid
     */
    private validateConfigurationSchema(
        config: any,
        componentPath: string
    ): void {
        // Check if config is an object
        if (!config || typeof config !== 'object' || Array.isArray(config)) {
            throw new Error(
                `Configuration must be an object for ${componentPath}`
            );
        }

        // Check for required partitions field
        if (
            !config.partitions ||
            typeof config.partitions !== 'object' ||
            Array.isArray(config.partitions)
        ) {
            throw new Error(
                `Configuration must have a 'partitions' object for ${componentPath}`
            );
        }

        // Check for unknown fields at root level
        const allowedRootFields = ['partitions', 'notes'];
        const unknownFields = Object.keys(config).filter(
            (key) => !allowedRootFields.includes(key)
        );
        if (unknownFields.length > 0) {
            console.warn(
                `Unknown fields in compatibility config for ${componentPath}: ${unknownFields.join(', ')}`
            );
        }

        // Check for unknown partition fields
        const allowedPartitions = ['commercial', 'govcloud', 'other'];
        const unknownPartitions = Object.keys(config.partitions).filter(
            (key) => !allowedPartitions.includes(key)
        );
        if (unknownPartitions.length > 0) {
            console.warn(
                `Unknown partition fields in compatibility config for ${componentPath}: ${unknownPartitions.join(', ')}`
            );
        }
    }

    /**
     * Generates markdown content for the compatibility matrix.
     * @param components Array of component compatibility information
     * @returns The complete markdown content
     */
    private generateMarkdown(components: ComponentCompatibility[]): string {
        const header = this.generateHeader();

        // Group components by type and sort them
        const aspectComponents = components
            .filter((c) => c.type === 'aspect')
            .sort((a, b) => a.name.localeCompare(b.name));
        const constructComponents = components
            .filter((c) => c.type === 'construct')
            .sort((a, b) => a.name.localeCompare(b.name));
        const patternComponents = components
            .filter((c) => c.type === 'pattern')
            .sort((a, b) => a.name.localeCompare(b.name));

        const aspectsTable = this.generateCompatibilityTable(
            aspectComponents,
            'Aspects'
        );
        const constructsTable = this.generateCompatibilityTable(
            constructComponents,
            'Constructs'
        );
        const patternsTable = this.generateCompatibilityTable(
            patternComponents,
            'Patterns'
        );

        return (
            header +
            aspectsTable +
            '\n---\n\n' +
            constructsTable +
            '\n---\n\n' +
            patternsTable
        );
    }

    /**
     * Generates the header section of the compatibility matrix.
     * @returns The header markdown content
     */
    private generateHeader(): string {
        return `# AWS Partition Compatibility Matrix

This document tracks the compatibility of all constructs, aspects, and patterns in the CDK ProServe Library across different AWS partitions.

## AWS Partitions

- **Commercial** (\`aws\`): Standard AWS regions
- **GovCloud** (\`aws-us-gov\`): AWS GovCloud (US) regions
- **Other**: Other AWS partitions

## Compatibility Legend

- ✅ **Fully Compatible**: Works without modifications
- ⚠️ **Partially Compatible**: Works with limitations or requires configuration changes
- ❌ **Not Compatible**: Does not work in this partition
- 🔍 **Needs Testing**: Compatibility unknown, requires validation

---

`;
    }

    /**
     * Generates a compatibility table for a specific component type.
     * @param components Array of components of the same type
     * @param title The table title (e.g., "Aspects", "Constructs")
     * @returns The markdown table content
     */
    private generateCompatibilityTable(
        components: ComponentCompatibility[],
        title: string
    ): string {
        const singularTitle = title.slice(0, -1); // Remove 's' to get singular form

        let table = `## ${title}\n\n`;

        // Handle empty sections
        if (components.length === 0) {
            table += `*No ${title.toLowerCase()} found.*\n`;
            return table;
        }

        table += `| ${singularTitle} | Commercial | GovCloud | Other | Notes |\n`;
        table += '|-----------|------------|----------|-------|-------|\n';

        for (const component of components) {
            const config = component.config;
            const notes = config.notes || '';

            table += `| ${component.name} | ${config.partitions.commercial} | ${config.partitions.govcloud} | ${config.partitions.other} | ${notes} |\n`;
        }

        return table;
    }

    /**
     * Writes the generated matrix content to the COMPATIBILITY.md file.
     * @param content The markdown content to write
     */
    private async writeMatrix(content: string): Promise<void> {
        const compatibilityPath = 'COMPATIBILITY.md';
        fs.writeFileSync(compatibilityPath, content);
    }

    /**
     * Gets component counts by type for logging purposes.
     * @param components Array of all components
     * @returns Object with counts by component type
     */
    private getComponentCounts(components: ComponentCompatibility[]): {
        aspects: number;
        constructs: number;
        patterns: number;
    } {
        return {
            aspects: components.filter((c) => c.type === 'aspect').length,
            constructs: components.filter((c) => c.type === 'construct').length,
            patterns: components.filter((c) => c.type === 'pattern').length
        };
    }

    /**
     * Converts plural component type names to singular for ComponentCompatibility interface.
     * @param pluralType The plural type name (aspects, constructs, patterns)
     * @returns The singular type name (aspect, construct, pattern)
     */
    private getComponentType(
        pluralType: string
    ): 'aspect' | 'construct' | 'pattern' {
        switch (pluralType) {
            case 'aspects':
                return 'aspect';
            case 'constructs':
                return 'construct';
            case 'patterns':
                return 'pattern';
            default:
                throw new Error(`Unknown component type: ${pluralType}`);
        }
    }
}
