// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Response from OpenSearch/Elasticsearch domain root endpoint
 */
export interface DomainInfoResponse {
    readonly name: string;
    readonly cluster_name: string;
    readonly cluster_uuid: string;
    readonly version: {
        readonly number: string;
        readonly build_flavor?: string;
        readonly build_type?: string;
        readonly build_hash: string;
        readonly build_date: string;
        readonly build_snapshot: boolean;
        readonly lucene_version: string;
        readonly minimum_wire_compatibility_version: string;
        readonly minimum_index_compatibility_version: string;
        readonly distribution?: 'opensearch' | 'elasticsearch';
    };
    readonly tagline: string;
}
