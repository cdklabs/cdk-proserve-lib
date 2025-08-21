// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { vol } from 'memfs';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { AwsHttpClient } from '../../../../../../../src/common/lambda/aws-http-client';
import { HttpClientResponse } from '../../../../../../../src/common/lambda/http-client/types';
import { RoleProvisioner } from '../../../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/provision';
import { ProvisionerConfiguration } from '../../../../../../../src/constructs/opensearch-provision-domain/handler/types/provisioner-configuration';
import { DestructiveOperation } from '../../../../../../../src/types';
import { Mutable } from '../../../../../../fixtures/types';

vi.mock('node:fs');

describe('OpenSearch Domain Role Provisioner', () => {
    const assetPath = '/asset';
    const errorResponse: Promise<HttpClientResponse<null>> = new Promise(
        (resolve) =>
            resolve({
                data: null,
                headers: {},
                statusCode: 500
            })
    );

    let client: Partial<Mocked<AwsHttpClient>>;
    let config: Mutable<ProvisionerConfiguration>;

    beforeEach(() => {
        vi.clearAllMocks();
        vol.reset();

        vol.fromJSON(
            {
                './roles/1.json': '{}'
            },
            assetPath
        );

        client = {
            delete: vi.fn().mockReturnValue(errorResponse),
            get: vi.fn().mockReturnValue(errorResponse),
            head: vi.fn().mockReturnValue(errorResponse),
            patch: vi.fn().mockReturnValue(errorResponse),
            post: vi.fn().mockReturnValue(errorResponse),
            put: vi.fn().mockReturnValue(errorResponse)
        };
    });

    describe('Create', () => {
        beforeEach(() => {
            config = {
                action: 'Create',
                assetPath: assetPath,
                client: client as unknown as AwsHttpClient,
                domainType: 'OpenSearch'
            };
        });

        describe('OpenSearch', () => {
            it('should create the role for OpenSearch', async () => {
                // Arrange
                client.put?.mockReturnValueOnce(
                    new Promise((resolve) => {
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 200
                        });
                    })
                );

                const provisioner = new RoleProvisioner(config);

                // Act
                await provisioner.run();

                // Assert
                expect(client.put).toHaveBeenCalledExactlyOnceWith(
                    '/_plugins/_security/api/roles/1',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
            });
        });

        describe('Elasticsearch', () => {
            beforeEach(() => {
                config.domainType = 'Elasticsearch';
            });

            it('should create the role for Elasticsearch', async () => {
                // Arrange
                client.put?.mockReturnValueOnce(
                    new Promise((resolve) => {
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 200
                        });
                    })
                );

                const provisioner = new RoleProvisioner(config);

                // Act
                await provisioner.run();

                // Assert
                expect(client.put).toHaveBeenCalledExactlyOnceWith(
                    '/_security/role/1',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
            });
        });
    });

    describe('Update', () => {
        const updateMethodName = 'update';

        beforeEach(() => {
            config = {
                action: 'Update',
                assetPath: assetPath,
                client: client as unknown as AwsHttpClient,
                domainType: 'OpenSearch'
            };
        });

        it('should not take any action if the UPDATE or ALL destructive actions are not specified', async () => {
            // Arange
            const provisioner = new RoleProvisioner(config);
            const updateSpy = vi.spyOn(provisioner as any, updateMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(updateSpy).not.toHaveBeenCalled();
        });

        it('should execute if the UPDATE destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.UPDATE;

            const provisioner = new RoleProvisioner(config);
            const updateSpy = vi.spyOn(provisioner as any, updateMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(updateSpy).toHaveBeenCalled();
        });

        it('should execute if the ALL destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.ALL;

            const provisioner = new RoleProvisioner(config);
            const updateSpy = vi.spyOn(provisioner as any, updateMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(updateSpy).toHaveBeenCalled();
        });

        describe('When performed', () => {
            beforeEach(() => {
                config.allowDestructiveOperations = DestructiveOperation.UPDATE;
            });

            it('should perform the same action as CREATE', async () => {
                // Arrange
                const provisioner = new RoleProvisioner(config);
                const createSpy = vi.spyOn(provisioner as any, 'create');

                // Act
                await provisioner.run();

                // Assert
                expect(createSpy).toHaveBeenCalled();
            });
        });
    });

    describe('Delete', () => {
        const deleteMethodName = 'delete';

        beforeEach(() => {
            config = {
                action: 'Delete',
                assetPath: assetPath,
                client: client as unknown as AwsHttpClient,
                domainType: 'OpenSearch'
            };
        });

        it('should not take any action if the DELETE or ALL destructive actions are not specified', async () => {
            // Arange
            const provisioner = new RoleProvisioner(config);
            const deleteSpy = vi.spyOn(provisioner as any, deleteMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(deleteSpy).not.toHaveBeenCalled();
        });

        it('should execute if the DELETE destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.DELETE;

            const provisioner = new RoleProvisioner(config);
            const deleteSpy = vi.spyOn(provisioner as any, deleteMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(deleteSpy).toHaveBeenCalled();
        });

        it('should execute if the ALL destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.ALL;

            const provisioner = new RoleProvisioner(config);
            const deleteSpy = vi.spyOn(provisioner as any, deleteMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(deleteSpy).toHaveBeenCalled();
        });

        describe('When performed', () => {
            beforeEach(() => {
                config.allowDestructiveOperations = DestructiveOperation.DELETE;
            });

            describe('OpenSearch', () => {
                it('should delete the role', async () => {
                    // Arrange
                    client.delete?.mockReturnValueOnce(
                        new Promise((resolve) => {
                            resolve({
                                data: null,
                                headers: {},
                                statusCode: 200
                            });
                        })
                    );

                    const provisioner = new RoleProvisioner(config);

                    // Act
                    await provisioner.run();

                    // Assert
                    expect(client.delete).toHaveBeenCalledExactlyOnceWith(
                        '/_plugins/_security/api/roles/1'
                    );
                });
            });

            describe('Elasticsearch', () => {
                beforeEach(() => {
                    config.domainType = 'Elasticsearch';
                });

                it('should delete the role', async () => {
                    // Arrange
                    client.delete?.mockReturnValueOnce(
                        new Promise((resolve) => {
                            resolve({
                                data: null,
                                headers: {},
                                statusCode: 200
                            });
                        })
                    );

                    const provisioner = new RoleProvisioner(config);

                    // Act
                    await provisioner.run();

                    // Assert
                    expect(client.delete).toHaveBeenCalledExactlyOnceWith(
                        '/_security/role/1'
                    );
                });
            });
        });
    });
});
