// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { AwsHttpClient } from '../../../../../common/lambda/aws-http-client';
import { DomainInfoResponse } from '../../types/domain-info';
import { DomainType } from '../../types/domain-type';

/**
 * Detects the domain type by querying the OpenSearch domain
 * @param client HTTP client for the domain
 * @returns Domain type based on the engine version
 */
export async function detectDomainType(
    client: AwsHttpClient
): Promise<DomainType> {
    try {
        const response = await client.get<DomainInfoResponse>('/');
        response.data.version.distribution;

        // Check version info to determine if it's Elasticsearch or OpenSearch
        const version = response.data.version.number;
        const distribution = response.data.version.distribution;

        // OpenSearch versions start from 1.0.0 and have distribution field
        // Elasticsearch versions are 7.x and below without distribution field
        if (
            distribution === 'opensearch' ||
            version.startsWith('1.') ||
            version.startsWith('2.')
        ) {
            return 'OpenSearch';
        }

        return 'Elasticsearch';
    } catch (error) {
        console.warn(
            'Failed to detect domain type, defaulting to OpenSearch:',
            error
        );
        return 'OpenSearch';
    }
}
