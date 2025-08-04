// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CdkCustomResourceEvent } from 'aws-lambda';
import { AwsHttpClient } from '../../../../../common/lambda/aws-http-client';
import { ResourceProperties } from '../../types/resource-properties';

/**
 * Creates the HTTP client for interacting with the domain
 * @param event Input metadata for the custom resource
 * @returns Client for interacting with the domain
 */
export function getClient(
    event: CdkCustomResourceEvent<ResourceProperties>
): AwsHttpClient {
    return new AwsHttpClient({
        service: 'es',
        baseUrl: `https://${event.ResourceProperties.DomainEndpoint}`,
        passNonSuccessfulStatusCodes: true,
        roleArn: event.ResourceProperties.AdminRoleArn,
        timeout: 45000
    });
}
