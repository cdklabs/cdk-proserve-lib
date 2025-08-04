// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { GetObjectCommand, S3 } from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
import { vol } from 'memfs';
import {
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    Mock,
    Mocked,
    vi
} from 'vitest';
import {
    buildMockCreateEvent,
    buildMockDeleteEvent,
    buildMockUpdateEvent,
    existingResourceId,
    expectedEntities
} from './fixtures';
import { AwsHttpClient } from '../../../../../src/common/lambda/aws-http-client';
import { downloadS3Asset } from '../../../../../src/common/lambda/download-s3-asset';
import { extractZipFile } from '../../../../../src/common/lambda/extract-zip-file';
import { HttpClientResponse } from '../../../../../src/common/lambda/http-client/types';
import { handler } from '../../../../../src/constructs/opensearch-provision-domain/handler/on-event';
import { createProvisionerConfig } from '../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/create-provisioner-config';
import { getProvisioners } from '../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/get-provisioners';
import { EntityType } from '../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/provision/base';
import { DestructiveOperation } from '../../../../../src/types';
import { mockContext } from '../../../../fixtures';

interface Provisioner {
    readonly type: EntityType;
}

function extractTypes(functionReturn: Mock): EntityType[] {
    const lastCallResults = functionReturn.mock.results.at(0)?.value;

    if (lastCallResults !== undefined) {
        return (lastCallResults as Provisioner[]).map((p) => p.type);
    } else {
        return [];
    }
}

// Mock the dependencies
vi.mock('node:fs');

describe('OpenSearchProvisionDomain Custom Resource On Event Handler', () => {
    const s3Mock = mockClient(S3);

    // Handles to mocked functions
    const mockedDownloadS3Asset = vi.mocked(downloadS3Asset);
    const mockedExtractZipFile = vi.mocked(extractZipFile);
    const mockedCreateProvisionerConfig = vi.mocked(createProvisionerConfig);

    beforeAll(() => {
        // Mock library functions
        vi.mock('../../../../../src/common/lambda/download-s3-asset', () => ({
            downloadS3Asset: vi.fn().mockResolvedValue({
                etag: 'test-etag',
                filePath: '/virtual-tmp'
            })
        }));
        vi.mock('../../../../../src/common/lambda/extract-zip-file', () => ({
            extractZipFile: vi.fn().mockReturnValue('/virtual-tmp')
        }));

        // Mock handler utilities
        vi.mock(
            '../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/client',
            () => {
                const passResponse: Promise<HttpClientResponse<null>> =
                    new Promise((resolve) =>
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 200
                        })
                    );

                const client: Partial<Mocked<AwsHttpClient>> = {
                    delete: vi.fn().mockReturnValue(passResponse),
                    get: vi.fn().mockReturnValue(passResponse),
                    head: vi.fn().mockReturnValue(passResponse),
                    patch: vi.fn().mockReturnValue(passResponse),
                    post: vi.fn().mockReturnValue(passResponse),
                    put: vi.fn().mockReturnValue(passResponse)
                };

                return {
                    getClient: vi.fn().mockReturnValue(client)
                };
            }
        );

        vi.mock(
            '../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/create-provisioner-config',
            {
                spy: true
            }
        );

        vi.mock(
            '../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/get-provisioners',
            {
                spy: true
            }
        );
    });

    beforeEach(() => {
        vi.clearAllMocks();
        vol.reset();
        s3Mock.reset();

        vol.fromJSON(
            {
                './templates/component/test-component-template.json': '{}',
                './templates/index/test-index-template.json': '{}',
                './indices/test-index.json': '{}',
                './ism-policies/test-policy.json': '{}',
                './roles/test-role.json': '{}',
                './role-mappings/test-role-mapping.json': 'role1\nrole2',
                './saved-objects/test-saved-object.ndjson': '{}'
            },
            '/virtual-tmp'
        );

        s3Mock.on(GetObjectCommand).resolves({});
    });

    describe('Create', () => {
        it('should download the asset and use that to provision the cluster', async () => {
            // Act
            await handler(buildMockCreateEvent(), mockContext);

            // Assert
            expect(mockedDownloadS3Asset).toHaveBeenCalledOnce();
            expect(mockedExtractZipFile).toHaveBeenCalledOnce();
            expect(mockedExtractZipFile).toHaveBeenCalledAfter(
                mockedDownloadS3Asset
            );
            expect(mockedCreateProvisionerConfig).toHaveBeenCalledOnce();
            expect(mockedCreateProvisionerConfig).toHaveBeenCalledAfter(
                mockedExtractZipFile
            );
        });

        it('should call all provisioners in order', async () => {
            // Act
            await handler(buildMockCreateEvent(), mockContext);

            // Assert
            expect(getProvisioners).toHaveBeenCalledTimes(1);

            const actualEntities = extractTypes(vi.mocked(getProvisioners));
            expect(actualEntities).toEqual(expectedEntities);
        });

        it('should return the asset ETag as the physical resource ID', async () => {
            // Act
            const result = await handler(buildMockCreateEvent(), mockContext);

            // Assert
            expect(result.PhysicalResourceId).toBeDefined();
            expect(result.PhysicalResourceId).toBe('test-etag');
        });
    });

    describe('Update', () => {
        it('should return existing physical resource id without doing anything', async () => {
            // Act
            const result = await handler(
                buildMockUpdateEvent(existingResourceId, {
                    AllowDestructiveOperations: DestructiveOperation.UPDATE
                }),
                mockContext
            );

            // Assert
            expect(mockedDownloadS3Asset).not.toHaveBeenCalled();
            expect(mockedExtractZipFile).not.toHaveBeenCalled();
            expect(mockedCreateProvisionerConfig).not.toHaveBeenCalled();
            expect(result.PhysicalResourceId).toBe(existingResourceId);
        });
    });

    describe('Delete', () => {
        it('should download the asset and use that to update the cluster', async () => {
            // Act
            await handler(
                buildMockDeleteEvent(existingResourceId, {
                    AllowDestructiveOperations: DestructiveOperation.DELETE
                }),
                mockContext
            );

            // Assert
            expect(mockedDownloadS3Asset).toHaveBeenCalledOnce();
            expect(mockedExtractZipFile).toHaveBeenCalledOnce();
            expect(mockedExtractZipFile).toHaveBeenCalledAfter(
                mockedDownloadS3Asset
            );
            expect(mockedCreateProvisionerConfig).toHaveBeenCalledOnce();
            expect(mockedCreateProvisionerConfig).toHaveBeenCalledAfter(
                mockedExtractZipFile
            );
        });

        it('should call all provisioners in reverse order', async () => {
            // Arrange
            const reversedEntities = expectedEntities.reverse();

            // Act
            await handler(
                buildMockDeleteEvent(existingResourceId, {
                    AllowDestructiveOperations: DestructiveOperation.DELETE
                }),
                mockContext
            );

            // Assert
            expect(getProvisioners).toHaveBeenCalledTimes(1);

            const actualEntities = extractTypes(vi.mocked(getProvisioners));
            expect(actualEntities).toEqual(reversedEntities);
        });
    });
});
