// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { AwsHttpClient } from '../../../../../../../src/common/lambda/aws-http-client';
import { HttpClientResponse } from '../../../../../../../src/common/lambda/http-client/types';
import { ClusterSettingsProvisioner } from '../../../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/provision';
import { BaseProvisioner } from '../../../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/provision/base';
import { ProvisionerConfiguration } from '../../../../../../../src/constructs/opensearch-provision-domain/handler/types/provisioner-configuration';
import { DestructiveOperation } from '../../../../../../../src/types';
import { Mutable } from '../../../../../../fixtures/types';

describe('OpenSearch Domain Cluster Settings Provisioner', () => {
    const assetPath = '/asset';
    const noopMethodName = 'noOperation';
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

        client = {
            delete: vi.fn().mockReturnValue(errorResponse),
            get: vi.fn().mockReturnValue(errorResponse),
            head: vi.fn().mockReturnValue(errorResponse),
            patch: vi.fn().mockReturnValue(errorResponse),
            post: vi.fn().mockReturnValue(errorResponse),
            put: vi.fn().mockReturnValue(errorResponse)
        };
    });

    describe('Error Checking', () => {
        beforeEach(() => {
            config = {
                action: 'Create',
                assetPath: assetPath,
                client: client as unknown as AwsHttpClient,
                domainType: 'OpenSearch'
            };
        });

        it('can identify unknown actions when running', async () => {
            // Arrange
            config.action = 'Bad' as 'Create';

            const provisioner = new ClusterSettingsProvisioner(config);

            // Act & Assert
            await expect(provisioner.run()).rejects.toThrow(
                'Unknown provisioning action'
            );
        });
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

        it('should call the cluster settings update API with the new settings', async () => {
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

            const settings = {
                persistent: {
                    test: true
                }
            };

            const provisioner = new ClusterSettingsProvisioner(
                config,
                settings
            );

            // Act
            await provisioner.run();

            // Assert
            expect(client.put).toHaveBeenCalledExactlyOnceWith(
                '/_cluster/settings',
                settings,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
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
            const provisioner = new ClusterSettingsProvisioner(config);
            const updateSpy = vi.spyOn(provisioner as any, updateMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(updateSpy).not.toHaveBeenCalled();
        });

        it('should execute if the UPDATE destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.UPDATE;

            const provisioner = new ClusterSettingsProvisioner(config);
            const updateSpy = vi.spyOn(provisioner as any, updateMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(updateSpy).toHaveBeenCalled();
        });

        it('should execute if the ALL destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.ALL;

            const provisioner = new ClusterSettingsProvisioner(config);
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
                const provisioner = new ClusterSettingsProvisioner(config);
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
            const provisioner = new ClusterSettingsProvisioner(config);
            const deleteSpy = vi.spyOn(provisioner as any, deleteMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(deleteSpy).not.toHaveBeenCalled();
        });

        it('should execute if the DELETE destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.DELETE;

            const provisioner = new ClusterSettingsProvisioner(config);
            const deleteSpy = vi.spyOn(provisioner as any, deleteMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(deleteSpy).toHaveBeenCalled();
        });

        it('should execute if the ALL destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.ALL;

            const provisioner = new ClusterSettingsProvisioner(config);
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

            it('should be a no-operation', async () => {
                // Arange
                const provisioner = new ClusterSettingsProvisioner(config);
                const noopSpy = vi.spyOn(
                    BaseProvisioner as any,
                    noopMethodName
                );

                // Act
                await provisioner.run();

                // Assert
                expect(noopSpy).toHaveBeenCalled();
                expect(client.delete).not.toHaveBeenCalled();
                expect(client.get).not.toHaveBeenCalled();
                expect(client.head).not.toHaveBeenCalled();
                expect(client.patch).not.toHaveBeenCalled();
                expect(client.post).not.toHaveBeenCalled();
                expect(client.put).not.toHaveBeenCalled();
            });
        });
    });
});
