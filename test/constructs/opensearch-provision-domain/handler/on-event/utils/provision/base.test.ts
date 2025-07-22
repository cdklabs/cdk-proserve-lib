// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { vol } from 'memfs';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { AwsHttpClient } from '../../../../../../../src/common/lambda/aws-http-client';
import { HttpClientResponse } from '../../../../../../../src/common/lambda/http-client/types';
import { HttpClientResponseError } from '../../../../../../../src/common/lambda/http-client/types/exception';
import {
    BaseProvisioner,
    EntityType
} from '../../../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/provision/base';
import { ProvisionerConfiguration } from '../../../../../../../src/constructs/opensearch-provision-domain/handler/types/provisioner-configuration';
import { ProvisioningConfigurationFile } from '../../../../../../../src/constructs/opensearch-provision-domain/handler/types/provisioning-configuration-file';

vi.mock('node:fs');

abstract class ExposedBaseProvisioner extends BaseProvisioner {
    public static testIsHttpError(
        error: unknown
    ): error is HttpClientResponseError {
        return BaseProvisioner.isHttpError(error);
    }

    public static testLoadFile(path: string): ProvisioningConfigurationFile {
        return BaseProvisioner.loadFile(path);
    }

    public static testGetFilePaths(type: EntityType, path: string): string[] {
        return BaseProvisioner.getFilePaths(type, path);
    }
}

describe('OpenSearch Domain Base Provisioner', () => {
    const assetPath = '/asset';

    beforeEach(() => {
        vi.clearAllMocks();
        vol.reset();
    });

    describe('Error Checking', () => {
        it('can identify HttpClientResponse errors', () => {
            // Arrange
            const hcrError = new HttpClientResponseError({
                headers: {},
                statusCode: 400
            });
            const nonHcrError = new Error('Generic');

            // Act
            const testHcrError =
                ExposedBaseProvisioner.testIsHttpError(hcrError);
            const testNonHcrError =
                ExposedBaseProvisioner.testIsHttpError(nonHcrError);

            // Assert
            expect(testHcrError).toBeTruthy();
            expect(testNonHcrError).toBeFalsy();
        });

        it('can identify unknown actions when running', async () => {
            // Arrange
            class Test extends BaseProvisioner {
                protected type: EntityType = 'indices';

                protected create(
                    entity: ProvisioningConfigurationFile
                ): Promise<void> {
                    return new Promise((resolve) => {
                        resolve();
                    });
                }

                protected update(
                    entity: ProvisioningConfigurationFile
                ): Promise<void> {
                    return new Promise((resolve) => {
                        resolve();
                    });
                }

                protected delete(
                    entity: ProvisioningConfigurationFile
                ): Promise<void> {
                    return new Promise((resolve) => {
                        resolve();
                    });
                }
            }

            const errorResponse: Promise<HttpClientResponse<null>> =
                new Promise((resolve) =>
                    resolve({
                        data: null,
                        headers: {},
                        statusCode: 500
                    })
                );

            const client: Partial<Mocked<AwsHttpClient>> = {
                delete: vi.fn().mockReturnValue(errorResponse),
                get: vi.fn().mockReturnValue(errorResponse),
                head: vi.fn().mockReturnValue(errorResponse),
                patch: vi.fn().mockReturnValue(errorResponse),
                post: vi.fn().mockReturnValue(errorResponse),
                put: vi.fn().mockReturnValue(errorResponse)
            };

            const config: ProvisionerConfiguration = {
                action: 'Bad' as 'Create',
                assetPath: assetPath,
                client: client as unknown as AwsHttpClient,
                domainType: 'OpenSearch'
            };

            vol.fromJSON(
                {
                    './indices/1.json': '{}'
                },
                assetPath
            );

            const provisioner = new Test(config);

            // Act & Assert
            await expect(provisioner.run()).rejects.toThrow(
                'Unknown provisioning action'
            );
        });
    });

    describe('File Loader', () => {
        it('should throw an error when trying to load a non-existant file', () => {
            // Arrange
            const file = 'non-existant.json';
            const path = join(assetPath, file);

            // Act
            const run = () => ExposedBaseProvisioner.testLoadFile(path);

            // Assert
            expect(run).toThrow(`Invalid file path: ${path}`);
        });

        it('should throw an error when trying to load a directory as a file', () => {
            // Act
            const run = () => ExposedBaseProvisioner.testLoadFile(assetPath);

            // Assert
            expect(run).toThrow(`Invalid file path: ${assetPath}`);
        });
    });

    describe('Directory Walker', () => {
        it('should throw an error when given a non-existant directory', () => {
            // Arrange
            const path = 'non-existent-dir';

            // Act
            const run = () =>
                ExposedBaseProvisioner.testGetFilePaths('indices', path);

            // Assert
            expect(run).toThrow(`Invalid directory path: ${path}`);
        });

        it('should throw an error when given a file instead of a directory', () => {
            // Arrange
            const file = 'test.json';
            const path = join(assetPath, file);

            vol.fromJSON(
                {
                    [file]: 'hello world'
                },
                assetPath
            );

            // Act
            const run = () =>
                ExposedBaseProvisioner.testGetFilePaths('indices', path);

            // Assert
            expect(run).toThrow(`Invalid directory path: ${path}`);
        });

        it('should walk all subdirectories', () => {
            // Arrange
            vol.fromJSON(
                {
                    './indices/file1.txt': '1',
                    './indices/dir1/file2.txt': '2',
                    './indices/dir2/inner1/file3.txt': '3'
                },
                assetPath
            );

            // Act
            const result = ExposedBaseProvisioner.testGetFilePaths(
                'indices',
                assetPath
            );

            // Assert
            expect(result).toEqual([
                '/asset/indices/dir1/file2.txt',
                '/asset/indices/dir2/inner1/file3.txt',
                '/asset/indices/file1.txt'
            ]);
        });
    });
});
