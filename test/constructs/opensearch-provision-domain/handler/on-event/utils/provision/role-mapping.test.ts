// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { vol } from 'memfs';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { AwsHttpClient } from '../../../../../../../src/common/lambda/aws-http-client';
import { HttpClientResponse } from '../../../../../../../src/common/lambda/http-client/types';
import { RoleMappingProvisioner } from '../../../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/provision';
import { ProvisionerConfiguration } from '../../../../../../../src/constructs/opensearch-provision-domain/handler/types/provisioner-configuration';
import { DestructiveOperation } from '../../../../../../../src/types';
import { Mutable } from '../../../../../../fixtures/types';

vi.mock('node:fs');

describe('OpenSearch Domain Role Mapping Provisioner', () => {
    const testAdditional1 = 'CN=test1';
    const testAdditional2 = 'aws:arn:iam::123456789012:role/test2';

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
                './role-mappings/1.json': 'role1\nrole2'
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
            it('should create the role mapping', async () => {
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

                const provisioner = new RoleMappingProvisioner(config);

                // Act
                await provisioner.run();

                // Assert
                expect(client.put).toHaveBeenCalledExactlyOnceWith(
                    '/_plugins/_security/api/rolesmapping/1',
                    {
                        backend_roles: ['role1', 'role2']
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
            });

            it('should create the role mapping with dynamic mappings', async () => {
                // Arrange
                client.put?.mockReturnValue(
                    new Promise((resolve) => {
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 200
                        });
                    })
                );

                const provisioner = new RoleMappingProvisioner(config, {
                    '1': [testAdditional1, testAdditional2],
                    otherRole: [testAdditional2]
                });

                // Act
                await provisioner.run();

                // Assert
                expect(client.put).toHaveBeenCalledTimes(2);
                expect(client.put).toHaveBeenCalledWith(
                    '/_plugins/_security/api/rolesmapping/1',
                    {
                        backend_roles: [
                            'role1',
                            'role2',
                            testAdditional1,
                            testAdditional2
                        ]
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                expect(client.put).toHaveBeenCalledWith(
                    '/_plugins/_security/api/rolesmapping/otherRole',
                    {
                        backend_roles: [testAdditional2]
                    },
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

            it('should create the role mapping', async () => {
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

                const provisioner = new RoleMappingProvisioner(config);

                // Act
                await provisioner.run();

                // Assert
                expect(client.put).toHaveBeenCalledExactlyOnceWith(
                    '/_security/role_mapping/1',
                    {
                        backend_roles: ['role1', 'role2']
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
            });

            it('should create the role mapping with dynamic mappings', async () => {
                // Arrange
                client.put?.mockReturnValue(
                    new Promise((resolve) => {
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 200
                        });
                    })
                );

                const provisioner = new RoleMappingProvisioner(config, {
                    '1': [testAdditional1, testAdditional2],
                    otherRole: [testAdditional2]
                });

                // Act
                await provisioner.run();

                // Assert
                expect(client.put).toHaveBeenCalledTimes(2);
                expect(client.put).toHaveBeenCalledWith(
                    '/_security/role_mapping/1',
                    {
                        backend_roles: [
                            'role1',
                            'role2',
                            testAdditional1,
                            testAdditional2
                        ]
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                expect(client.put).toHaveBeenCalledWith(
                    '/_security/role_mapping/otherRole',
                    {
                        backend_roles: [testAdditional2]
                    },
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
            const provisioner = new RoleMappingProvisioner(config);
            const updateSpy = vi.spyOn(provisioner as any, updateMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(updateSpy).not.toHaveBeenCalled();
        });

        it('should execute if the UPDATE destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.UPDATE;

            const provisioner = new RoleMappingProvisioner(config, {
                '1': [testAdditional1, testAdditional2],
                otherRole: [testAdditional2]
            });
            const updateSpy = vi.spyOn(provisioner as any, updateMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(updateSpy).toHaveBeenCalled();
        });

        it('should execute if the ALL destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.ALL;

            const provisioner = new RoleMappingProvisioner(config, {
                '1': [testAdditional1, testAdditional2],
                otherRole: [testAdditional2]
            });
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
                const provisioner = new RoleMappingProvisioner(config, {
                    '1': [testAdditional1, testAdditional2],
                    otherRole: [testAdditional2]
                });

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
            const provisioner = new RoleMappingProvisioner(config);
            const deleteSpy = vi.spyOn(provisioner as any, deleteMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(deleteSpy).not.toHaveBeenCalled();
        });

        it('should execute if the DELETE destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.DELETE;

            const provisioner = new RoleMappingProvisioner(config, {
                '1': [testAdditional1, testAdditional2],
                otherRole: [testAdditional2]
            });
            const deleteSpy = vi.spyOn(provisioner as any, deleteMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(deleteSpy).toHaveBeenCalled();
        });

        it('should execute if the ALL destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.ALL;

            const provisioner = new RoleMappingProvisioner(config, {
                '1': [testAdditional1, testAdditional2],
                otherRole: [testAdditional2]
            });
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
                it('should delete the role mapping', async () => {
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

                    const provisioner = new RoleMappingProvisioner(config);

                    // Act
                    await provisioner.run();

                    // Assert
                    expect(client.delete).toHaveBeenCalledExactlyOnceWith(
                        '/_plugins/_security/api/rolesmapping/1'
                    );
                });

                it('should delete role mappings that include dynamic mappings', async () => {
                    // Arrange
                    client.delete?.mockReturnValue(
                        new Promise((resolve) => {
                            resolve({
                                data: null,
                                headers: {},
                                statusCode: 200
                            });
                        })
                    );

                    const provisioner = new RoleMappingProvisioner(config, {
                        '1': [testAdditional1, testAdditional2],
                        otherRole: [testAdditional2]
                    });

                    // Act
                    await provisioner.run();

                    // Assert
                    expect(client.delete).toHaveBeenCalledTimes(2);
                    expect(client.delete).toHaveBeenCalledWith(
                        '/_plugins/_security/api/rolesmapping/1'
                    );
                    expect(client.delete).toHaveBeenCalledWith(
                        '/_plugins/_security/api/rolesmapping/otherRole'
                    );
                });
            });

            describe('Elasticsearch', () => {
                beforeEach(() => {
                    config.domainType = 'Elasticsearch';
                });

                it('should delete the role mapping', async () => {
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

                    const provisioner = new RoleMappingProvisioner(config);

                    // Act
                    await provisioner.run();

                    // Assert
                    expect(client.delete).toHaveBeenCalledExactlyOnceWith(
                        '/_security/role_mapping/1'
                    );
                });

                it('should delete role mappings that include dynamic mappings', async () => {
                    // Arrange
                    client.delete?.mockReturnValue(
                        new Promise((resolve) => {
                            resolve({
                                data: null,
                                headers: {},
                                statusCode: 200
                            });
                        })
                    );

                    const provisioner = new RoleMappingProvisioner(config, {
                        '1': [testAdditional1, testAdditional2],
                        otherRole: [testAdditional2]
                    });

                    // Act
                    await provisioner.run();

                    // Assert
                    expect(client.delete).toHaveBeenCalledTimes(2);
                    expect(client.delete).toHaveBeenCalledWith(
                        '/_security/role_mapping/1'
                    );
                    expect(client.delete).toHaveBeenCalledWith(
                        '/_security/role_mapping/otherRole'
                    );
                });
            });
        });
    });
});
