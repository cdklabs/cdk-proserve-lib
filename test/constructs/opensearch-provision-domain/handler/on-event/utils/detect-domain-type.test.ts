// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AwsHttpClient } from '../../../../../../src/common/lambda/aws-http-client';
import { detectDomainType } from '../../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/detect-domain-type';
import { DomainInfoResponse } from '../../../../../../src/constructs/opensearch-provision-domain/handler/types/domain-info';

describe('detectDomainType', () => {
    const mockClient = {
        get: vi.fn()
    } as unknown as AwsHttpClient;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('OpenSearch detection', () => {
        it('should detect OpenSearch when distribution is "opensearch"', async () => {
            const mockResponse: DomainInfoResponse = {
                name: 'test-domain',
                cluster_name: 'test-cluster',
                cluster_uuid: 'test-uuid',
                version: {
                    number: '2.3.0',
                    distribution: 'opensearch',
                    build_hash: 'test-hash',
                    build_date: '2023-01-01',
                    build_snapshot: false,
                    lucene_version: '9.4.2',
                    minimum_wire_compatibility_version: '7.10.0',
                    minimum_index_compatibility_version: '7.0.0'
                },
                tagline: 'The OpenSearch Project'
            };

            vi.mocked(mockClient.get).mockResolvedValue({
                data: mockResponse,
                statusCode: 200,
                headers: {},
                body: JSON.stringify(mockResponse)
            });

            const result = await detectDomainType(mockClient);

            expect(result).toBe('OpenSearch');
            expect(mockClient.get).toHaveBeenCalledWith('/');
        });

        it('should detect OpenSearch when tagline has opensearch', async () => {
            const mockResponse: DomainInfoResponse = {
                name: 'test-domain',
                cluster_name: 'test-cluster',
                cluster_uuid: 'test-uuid',
                version: {
                    number: '1.3.0',
                    build_hash: 'test-hash',
                    build_date: '2023-01-01',
                    build_snapshot: false,
                    lucene_version: '8.10.1',
                    minimum_wire_compatibility_version: '7.10.0',
                    minimum_index_compatibility_version: '7.0.0'
                },
                tagline: 'The OpenSearch Project'
            };

            vi.mocked(mockClient.get).mockResolvedValue({
                data: mockResponse,
                statusCode: 200,
                headers: {},
                body: JSON.stringify(mockResponse)
            });

            const result = await detectDomainType(mockClient);

            expect(result).toBe('OpenSearch');
        });
    });

    describe('Elasticsearch detection', () => {
        it('should detect Elasticsearch when no distribution field', async () => {
            const mockResponse: DomainInfoResponse = {
                name: 'test-domain',
                cluster_name: 'test-cluster',
                cluster_uuid: 'test-uuid',
                version: {
                    number: '7.10.2',
                    build_hash: 'test-hash',
                    build_date: '2023-01-01',
                    build_snapshot: false,
                    lucene_version: '8.7.0',
                    minimum_wire_compatibility_version: '6.8.0',
                    minimum_index_compatibility_version: '6.0.0'
                },
                tagline: 'You Know, for Search'
            };

            vi.mocked(mockClient.get).mockResolvedValue({
                data: mockResponse,
                statusCode: 200,
                headers: {},
                body: JSON.stringify(mockResponse)
            });

            const result = await detectDomainType(mockClient);

            expect(result).toBe('Elasticsearch');
        });
    });

    describe('error handling', () => {
        it('should default to OpenSearch when HTTP request fails', async () => {
            const consoleWarnSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});
            vi.mocked(mockClient.get).mockRejectedValue(
                new Error('Network error')
            );

            const result = await detectDomainType(mockClient);

            expect(result).toBe('OpenSearch');
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                'Failed to detect domain type, defaulting to OpenSearch:',
                expect.any(Error)
            );

            consoleWarnSpy.mockRestore();
        });

        it('should default to OpenSearch when response parsing fails', async () => {
            const consoleWarnSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});
            vi.mocked(mockClient.get).mockResolvedValue({
                data: null,
                statusCode: 200,
                headers: {},
                body: 'null'
            });

            const result = await detectDomainType(mockClient);

            expect(result).toBe('OpenSearch');
            expect(consoleWarnSpy).toHaveBeenCalled();

            consoleWarnSpy.mockRestore();
        });
    });
});
