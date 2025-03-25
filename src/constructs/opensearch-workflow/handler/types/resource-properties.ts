// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DestructiveOperation } from '../../../../types/destructive-operation';

export interface IResourceProperties {
    readonly DomainEndpoint: string;
    readonly RoleArn: string;
    readonly AssetS3ObjectUrl: string;
    readonly AllowDestructiveOperations?: DestructiveOperation;
    readonly TemplateProvisionVariables?: Record<string, string>;
    readonly TemplateCreationVariables?: Record<string, string>;
    readonly TemplateS3ObjectUrlVariables?: Record<string, string>;
}
