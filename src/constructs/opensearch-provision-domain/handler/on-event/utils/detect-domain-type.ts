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
        const distribution = response.data.version.distribution;
        const tagline = response.data.tagline;

        if (distribution === 'opensearch' || tagline.match(/opensearch/i)) {
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
