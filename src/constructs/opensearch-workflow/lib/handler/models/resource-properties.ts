/**
 * (c) 2025 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
 *
 * This AWS Content is provided subject to the terms of the AWS Customer
 * Agreement available at https://aws.amazon.com/agreement or other written
 * agreement between Customer and either Amazon Web Services, Inc. or
 * Amazon Web Services EMEA SARL or both.
 */

export type DestructiveOperation = 'Update' | 'Delete' | 'All';

export interface IResourceProperties {
    readonly DomainEndpoint: string;
    readonly RoleArn: string;
    readonly AssetS3ObjectUrl: string;
    readonly AllowDestructiveOperations?: DestructiveOperation;
    readonly TemplateProvisionVariables?: Record<string, string>;
    readonly TemplateCreationVariables?: Record<string, string>;
    readonly TemplateS3ObjectUrlVariables?: Record<string, string>;
}
