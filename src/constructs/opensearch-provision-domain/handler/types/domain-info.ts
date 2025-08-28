// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Response from OpenSearch/Elasticsearch domain root endpoint
 *
 * This interface represents the JSON response returned when querying
 * the root endpoint of an OpenSearch or Elasticsearch domain.
 */
export interface DomainInfoResponse {
    /** The name of the domain */
    readonly name: string;

    /** The cluster name identifier */
    readonly cluster_name: string;

    /** Unique identifier for the cluster */
    readonly cluster_uuid: string;

    /** Version and build information for the domain */
    readonly version: {
        /** Version number (e.g., "2.3.0") */
        readonly number: string;

        /** Build flavor (optional, varies by distribution) */
        readonly build_flavor?: string;

        /** Build type (e.g., "tar", "docker") */
        readonly build_type?: string;

        /** Git commit hash of the build */
        readonly build_hash: string;

        /** ISO date string when the build was created */
        readonly build_date: string;

        /** Whether this is a snapshot build */
        readonly build_snapshot: boolean;

        /** Version of the underlying Lucene search library */
        readonly lucene_version: string;

        /** Minimum wire protocol version for compatibility */
        readonly minimum_wire_compatibility_version: string;

        /** Minimum index version for compatibility */
        readonly minimum_index_compatibility_version: string;

        /** Distribution type - OpenSearch or Elasticsearch */
        readonly distribution?: 'opensearch' | 'elasticsearch';
    };

    /** Marketing tagline for the search engine */
    readonly tagline: string;
}
