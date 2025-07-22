// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { vol } from 'memfs';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { AwsHttpClient } from '../../../../../../../src/common/lambda/aws-http-client';
import { HttpClientResponse } from '../../../../../../../src/common/lambda/http-client/types';
import { IsmPolicyProvisioner } from '../../../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/provision';
import { BaseProvisioner } from '../../../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/provision/base';
import { ProvisionerConfiguration } from '../../../../../../../src/constructs/opensearch-provision-domain/handler/types/provisioner-configuration';
import { DestructiveOperation } from '../../../../../../../src/types';
import { Mutable } from '../../../../../../fixtures/types';

vi.mock('node:fs');

describe('OpenSearch Domain ISM Policy Provisioner', () => {
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
        vol.reset();

        vol.fromJSON(
            {
                './ism-policies/1.json': '{}'
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
            it('should create the policy when it does not already exist', async () => {
                // Arrange
                client.head?.mockReturnValueOnce(
                    new Promise((resolve) =>
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 404
                        })
                    )
                );

                client.put?.mockReturnValueOnce(
                    new Promise((resolve) =>
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 200
                        })
                    )
                );

                const provisioner = new IsmPolicyProvisioner(config);

                // Act
                await provisioner.run();

                // Assert
                expect(client.head).toHaveBeenCalledExactlyOnceWith(
                    '/_plugins/_ism/policies/1'
                );
                expect(client.put).toHaveBeenCalledExactlyOnceWith(
                    '/_plugins/_ism/policies/1',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
            });

            it('should skip creating a policy that already exists', async () => {
                // Arrange
                client.head?.mockReturnValueOnce(
                    new Promise((resolve) =>
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 200
                        })
                    )
                );

                const provisioner = new IsmPolicyProvisioner(config);

                // Act
                await provisioner.run();

                // Assert
                expect(client.head).toHaveBeenCalledExactlyOnceWith(
                    '/_plugins/_ism/policies/1'
                );
                expect(client.put).not.toHaveBeenCalled();
            });

            it('should throw an error in any other case', async () => {
                // Arrange
                const provisioner = new IsmPolicyProvisioner(config);

                // Act
                await expect(provisioner.run()).rejects.toThrow(
                    'Unknown state of policy 1. Query returned 500'
                );

                // Assert
                expect(client.head).toHaveBeenCalledExactlyOnceWith(
                    '/_plugins/_ism/policies/1'
                );
                expect(client.put).not.toHaveBeenCalled();
            });
        });

        describe('Elasticsearch', () => {
            beforeEach(() => {
                config.domainType = 'Elasticsearch';
            });

            it('should create the policy when it does not already exist', async () => {
                // Arrange
                client.head?.mockReturnValueOnce(
                    new Promise((resolve) =>
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 404
                        })
                    )
                );

                client.put?.mockReturnValueOnce(
                    new Promise((resolve) =>
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 200
                        })
                    )
                );

                const provisioner = new IsmPolicyProvisioner(config);

                // Act
                await provisioner.run();

                // Assert
                expect(client.head).toHaveBeenCalledExactlyOnceWith(
                    '/_ilm/policy/1'
                );
                expect(client.put).toHaveBeenCalledExactlyOnceWith(
                    '/_ilm/policy/1',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
            });

            it('should skip creating a policy that already exists', async () => {
                // Arrange
                client.head?.mockReturnValueOnce(
                    new Promise((resolve) =>
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 200
                        })
                    )
                );

                const provisioner = new IsmPolicyProvisioner(config);

                // Act
                await provisioner.run();

                // Assert
                expect(client.head).toHaveBeenCalledExactlyOnceWith(
                    '/_ilm/policy/1'
                );
                expect(client.put).not.toHaveBeenCalled();
            });

            it('should throw an error in any other case', async () => {
                // Arrange
                const provisioner = new IsmPolicyProvisioner(config);

                // Act
                await expect(provisioner.run()).rejects.toThrow(
                    'Unknown state of policy 1. Query returned 500'
                );

                // Assert
                expect(client.head).toHaveBeenCalledExactlyOnceWith(
                    '/_ilm/policy/1'
                );
                expect(client.put).not.toHaveBeenCalled();
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
            const provisioner = new IsmPolicyProvisioner(config);
            const updateSpy = vi.spyOn(provisioner as any, updateMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(updateSpy).not.toHaveBeenCalled();
        });

        it('should execute if the UPDATE destructive action is specified', async () => {
            // Arange
            client.get?.mockReturnValueOnce(
                new Promise((resolve) =>
                    resolve({
                        data: null,
                        headers: {},
                        statusCode: 404
                    })
                )
            );
            client.head?.mockReturnValueOnce(
                new Promise((resolve) =>
                    resolve({
                        data: null,
                        headers: {},
                        statusCode: 404
                    })
                )
            );
            client.put?.mockReturnValueOnce(
                new Promise((resolve) =>
                    resolve({
                        data: null,
                        headers: {},
                        statusCode: 404
                    })
                )
            );

            config.allowDestructiveOperations = DestructiveOperation.UPDATE;

            const provisioner = new IsmPolicyProvisioner(config);
            const updateSpy = vi.spyOn(provisioner as any, updateMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(updateSpy).toHaveBeenCalled();
        });

        it('should execute if the ALL destructive action is specified', async () => {
            // Arange
            client.get?.mockReturnValueOnce(
                new Promise((resolve) =>
                    resolve({
                        data: null,
                        headers: {},
                        statusCode: 404
                    })
                )
            );
            client.head?.mockReturnValueOnce(
                new Promise((resolve) =>
                    resolve({
                        data: null,
                        headers: {},
                        statusCode: 404
                    })
                )
            );
            client.put?.mockReturnValueOnce(
                new Promise((resolve) =>
                    resolve({
                        data: null,
                        headers: {},
                        statusCode: 404
                    })
                )
            );

            config.allowDestructiveOperations = DestructiveOperation.ALL;

            const provisioner = new IsmPolicyProvisioner(config);
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

            it('should be a CREATE if the policy does not already exist', async () => {
                // Arange
                client.get?.mockReturnValueOnce(
                    new Promise((resolve) =>
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 404
                        })
                    )
                );
                client.head?.mockReturnValueOnce(
                    new Promise((resolve) =>
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 404
                        })
                    )
                );
                client.put?.mockReturnValueOnce(
                    new Promise((resolve) =>
                        resolve({
                            data: null,
                            headers: {},
                            statusCode: 404
                        })
                    )
                );

                const provisioner = new IsmPolicyProvisioner(config);
                const createSpy = vi.spyOn(provisioner as any, 'create');

                // Act
                await provisioner.run();

                // Assert
                expect(client.get).toHaveBeenCalledExactlyOnceWith(
                    '/_plugins/_ism/policies/1'
                );
                expect(createSpy).toHaveBeenCalled();
            });

            describe('OpenSearch', () => {
                it('should update the policy when performed', async () => {
                    // Arrange
                    vol.reset();
                    vol.fromJSON(
                        {
                            './ism-policies/1.json':
                                '{"policy":{"ism_template":{"index_patterns":["test"]}}}',
                            './ism-policies/2.json': '{}'
                        },
                        assetPath
                    );

                    client.get?.mockReturnValue(
                        new Promise((resolve) =>
                            resolve({
                                data: {
                                    _seq_no: 1,
                                    _primary_term: 1
                                },
                                headers: {},
                                statusCode: 200
                            })
                        )
                    );
                    client.post?.mockReturnValue(
                        new Promise((resolve) =>
                            resolve({
                                data: null,
                                headers: {},
                                statusCode: 200
                            })
                        )
                    );
                    client.put?.mockReturnValue(
                        new Promise((resolve) =>
                            resolve({
                                data: null,
                                headers: {},
                                statusCode: 200
                            })
                        )
                    );

                    const provisioner = new IsmPolicyProvisioner(config);

                    // Act
                    await provisioner.run();

                    // Assert
                    expect(client.get).toHaveBeenCalledTimes(2);
                    expect(client.put).toHaveBeenCalledTimes(2);

                    expect(client.get).toHaveBeenCalledWith(
                        '/_plugins/_ism/policies/1'
                    );
                    expect(client.get).toHaveBeenCalledWith(
                        '/_plugins/_ism/policies/2'
                    );
                    expect(client.put).toHaveBeenCalledWith(
                        '/_plugins/_ism/policies/1',
                        {
                            policy: {
                                ism_template: {
                                    index_patterns: ['test']
                                }
                            }
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: {
                                if_seq_no: '1',
                                if_primary_term: '1'
                            }
                        }
                    );
                    expect(client.put).toHaveBeenCalledWith(
                        '/_plugins/_ism/policies/2',
                        {},
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: {
                                if_seq_no: '1',
                                if_primary_term: '1'
                            }
                        }
                    );
                    expect(client.post).toHaveBeenCalledExactlyOnceWith(
                        '/_plugins/_ism/change_policy/test',
                        {
                            policy_id: '1'
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                });

                it('should raise an error when the update fails', async () => {
                    // Arrange
                    client.get?.mockReturnValueOnce(
                        new Promise((resolve) =>
                            resolve({
                                data: {
                                    _seq_no: 1,
                                    _primary_term: 1
                                },
                                headers: {},
                                statusCode: 200
                            })
                        )
                    );

                    const provisioner = new IsmPolicyProvisioner(config);

                    // Act
                    await expect(provisioner.run()).rejects.toThrow(
                        'Failed to update policy 1'
                    );

                    // Assert
                    expect(client.get).toHaveBeenCalledExactlyOnceWith(
                        '/_plugins/_ism/policies/1'
                    );
                    expect(client.put).toHaveBeenCalledExactlyOnceWith(
                        '/_plugins/_ism/policies/1',
                        {},
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: {
                                if_seq_no: '1',
                                if_primary_term: '1'
                            }
                        }
                    );
                });
            });

            describe('Elasticsearch', () => {
                beforeEach(() => {
                    config.domainType = 'Elasticsearch';
                });

                it('should update the policy when performed', async () => {
                    // Arrange
                    client.get?.mockReturnValueOnce(
                        new Promise((resolve) =>
                            resolve({
                                data: null,
                                headers: {},
                                statusCode: 200
                            })
                        )
                    );
                    client.put?.mockReturnValueOnce(
                        new Promise((resolve) =>
                            resolve({
                                data: null,
                                headers: {},
                                statusCode: 200
                            })
                        )
                    );

                    const provisioner = new IsmPolicyProvisioner(config);

                    // Act
                    await provisioner.run();

                    // Assert
                    expect(client.get).toHaveBeenCalledExactlyOnceWith(
                        '/_ilm/policy/1'
                    );
                    expect(client.put).toHaveBeenCalledExactlyOnceWith(
                        '/_ilm/policy/1',
                        {},
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                });

                it('should raise an error when the update fails', async () => {
                    // Arrange
                    client.get?.mockReturnValueOnce(
                        new Promise((resolve) =>
                            resolve({
                                data: null,
                                headers: {},
                                statusCode: 200
                            })
                        )
                    );

                    const provisioner = new IsmPolicyProvisioner(config);

                    // Act
                    await expect(provisioner.run()).rejects.toThrow(
                        'Failed to update policy 1'
                    );

                    // Assert
                    expect(client.get).toHaveBeenCalledExactlyOnceWith(
                        '/_ilm/policy/1'
                    );
                    expect(client.put).toHaveBeenCalledExactlyOnceWith(
                        '/_ilm/policy/1',
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
            const provisioner = new IsmPolicyProvisioner(config);
            const deleteSpy = vi.spyOn(provisioner as any, deleteMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(deleteSpy).not.toHaveBeenCalled();
        });

        it('should execute if the DELETE destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.DELETE;

            const provisioner = new IsmPolicyProvisioner(config);
            const deleteSpy = vi.spyOn(provisioner as any, deleteMethodName);

            // Act
            await provisioner.run();

            // Assert
            expect(deleteSpy).toHaveBeenCalled();
        });

        it('should execute if the ALL destructive action is specified', async () => {
            // Arange
            config.allowDestructiveOperations = DestructiveOperation.ALL;

            const provisioner = new IsmPolicyProvisioner(config);
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
                it('should delete the policy when performed', async () => {
                    // Arange
                    client.delete?.mockReturnValueOnce(
                        new Promise((resolve) =>
                            resolve({
                                data: null,
                                headers: {},
                                statusCode: 200
                            })
                        )
                    );

                    const provisioner = new IsmPolicyProvisioner(config);

                    // Act
                    await provisioner.run();

                    // Assert
                    expect(client.delete).toHaveBeenCalledExactlyOnceWith(
                        '/_plugins/_ism/policies/1'
                    );
                });
            });

            describe('Elasticsearch', () => {
                beforeEach(() => {
                    config.domainType = 'Elasticsearch';
                });

                it('should delete the policy from Elasticsearch when performed', async () => {
                    // Arange
                    client.delete?.mockReturnValueOnce(
                        new Promise((resolve) =>
                            resolve({
                                data: null,
                                headers: {},
                                statusCode: 200
                            })
                        )
                    );

                    const provisioner = new IsmPolicyProvisioner(config);

                    // Act
                    await provisioner.run();

                    // Assert
                    expect(client.delete).toHaveBeenCalledExactlyOnceWith(
                        '/_ilm/policy/1'
                    );
                });
            });
        });
    });
});
