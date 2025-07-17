// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DomainType } from './domain-type';
import { DestructiveOperation } from '../../../../types';

/**
 * Invocation properties for the Custom Resource
 */
export interface ResourceProperties {
    /**
     * Endpoint for the Amazon OpenSearch Service (AOS) domain
     */
    readonly DomainEndpoint: string;

    /**
     * Type of the managed Amazon OpenSearch Service domain
     */
    readonly DomainType: DomainType;

    /**
     * Amazon Resource Name (ARN) for the AWS Identity and Access Management (IAM) Role that is an administrative user
     * for the Amazon OpenSearch Service domain
     */
    readonly AdminRoleArn: string;

    /**
     * URI for the zip asset containing the provisioning configuration within Amazon Simple Storage Service (S3)
     */
    readonly AssetS3Uri: string;

    /**
     * If specified, defines which destructive operations the Custom Resource will handle.
     *
     * If this is not specified, then the Custom Resource will only modify the domain on a CREATE call from AWS
     * CloudFormation
     */
    readonly AllowDestructiveOperations?: DestructiveOperation;

    /**
     * Allows mapping of a role in an Amazon OpenSearch Service domain to multiple backend roles (like IAM Role ARNs,
     * LDAP DNs, etc.)
     *
     * The key is the role name in OpenSearch and the value is a list of entities to map to that role (e.g. local
     * database users or AWS IAM role ARNs)
     */
    readonly DynamicRoleMappings?: Record<string, string[]>;

    /**
     * Additional settings to configure on the Amazon OpenSearch Service domain cluster itself.
     *
     * These settings will be sent as a JSON request to the /_cluster/settings API on OpenSearch.
     *
     * Additional details can be found
     * [here](https://docs.opensearch.org/docs/latest/api-reference/cluster-api/cluster-settings/)
     */
    readonly ClusterSettings?: Record<string, string>;
}
