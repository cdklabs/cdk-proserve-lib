// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DestructiveOperation } from '../../../../types/destructive-operation';

/**
 * Interface representing the properties required for OpenSearch workflow resources.
 * This defines the structure of properties passed to OpenSearch-related operations.
 */
export interface IResourceProperties {
    /** The endpoint URL of the OpenSearch domain */
    readonly DomainEndpoint: string;
    /** The ARN of the role used for OpenSearch operations */
    readonly RoleArn: string;
    /** The S3 URL where the asset is stored */
    readonly AssetS3ObjectUrl: string;
    /** Configuration flag to allow potentially destructive operations */
    readonly AllowDestructiveOperations?: DestructiveOperation;
    /** Variables to be used during template provisioning */
    readonly TemplateProvisionVariables?: Record<string, string>;
    /** Variables to be used during template creation */
    readonly TemplateCreationVariables?: Record<string, string>;
    /** Variables to substitute in S3 object URLs */
    readonly TemplateS3ObjectUrlVariables?: Record<string, string>;
}
