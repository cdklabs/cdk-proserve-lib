// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DomainType } from './domain-type';
import { AwsHttpClient } from '../../../../common/lambda/aws-http-client';
import { DestructiveOperation } from '../../../../types';

/**
 * Defines the configuration for each entity provisioner
 */
export interface ProvisionerConfiguration {
    /**
     * HTTP client used to make authenticated calls to the Amazon OpenSearch Service domain
     */
    readonly client: AwsHttpClient;

    /**
     * Location of the provisioning configuration files
     */
    readonly assetPath: string;

    /**
     * AWS CloudFormation action being handled by the Custom Resource
     */
    readonly action: 'Create' | 'Update' | 'Delete';

    /**
     * Which AWS CloudFormation destructive operations, if any, should be handled
     */
    readonly allowDestructiveOperations?: DestructiveOperation;

    /**
     * Type of the managed Amazon OpenSearch Service domain
     */
    readonly domainType: DomainType;
}
