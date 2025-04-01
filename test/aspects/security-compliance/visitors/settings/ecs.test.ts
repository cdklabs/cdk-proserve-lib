// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, IResolvable, Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { CfnCluster, ContainerInsights, Cluster } from 'aws-cdk-lib/aws-ecs';
import { beforeEach, it, describe } from 'vitest';
import { SecurityCompliance } from '../../../../../src/aspects/security-compliance';
import { describeCdkTest } from '../../../../../utilities/cdk-nag-test';

describeCdkTest(SecurityCompliance, (_, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();
    });

    describe('ECS Cluster', () => {
        it('enables container insights by default', () => {
            // Arrange
            new Cluster(stack, 'TestCluster');

            // Act
            Aspects.of(stack).add(new SecurityCompliance());
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::ECS::Cluster', {
                ClusterSettings: [
                    {
                        Name: 'containerInsights',
                        Value: 'enabled'
                    }
                ]
            });
        });

        it('does not enable container insights when disabled', () => {
            // Arrange
            new Cluster(stack, 'TestCluster');

            // Act
            Aspects.of(stack).add(
                new SecurityCompliance({
                    settings: {
                        ecs: {
                            clusterContainerInsights: {
                                disabled: true
                            }
                        }
                    }
                })
            );
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::ECS::Cluster', {
                ClusterSettings: Match.absent()
            });
        });

        it('preserves existing cluster settings while adding container insights', () => {
            // Arrange
            const cluster = new Cluster(stack, 'TestCluster');
            const cfnCluster = cluster.node.defaultChild as CfnCluster;
            cfnCluster.clusterSettings = [
                {
                    name: 'existingSetting',
                    value: 'someValue'
                }
            ];

            // Act
            Aspects.of(stack).add(new SecurityCompliance());
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::ECS::Cluster', {
                ClusterSettings: Match.arrayWith([
                    {
                        Name: 'existingSetting',
                        Value: 'someValue'
                    },
                    {
                        Name: 'containerInsights',
                        Value: 'enabled'
                    }
                ])
            });
        });

        it('does not duplicate container insights setting', () => {
            // Arrange
            const cluster = new Cluster(stack, 'TestCluster');
            const cfnCluster = cluster.node.defaultChild as CfnCluster;
            cfnCluster.clusterSettings = [
                {
                    name: 'containerInsights',
                    value: ContainerInsights.DISABLED
                }
            ];

            // Act
            Aspects.of(stack).add(new SecurityCompliance());
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::ECS::Cluster', {
                ClusterSettings: [
                    {
                        Name: 'containerInsights',
                        Value: 'disabled'
                    }
                ]
            });
        });

        it('handles multiple clusters in same stack', () => {
            // Arrange
            new Cluster(stack, 'TestCluster1');
            new Cluster(stack, 'TestCluster2');

            // Act
            Aspects.of(stack).add(new SecurityCompliance());
            const template = getTemplate();

            // Assert
            template.resourceCountIs('AWS::ECS::Cluster', 2);
            template.allResourcesProperties('AWS::ECS::Cluster', {
                ClusterSettings: [
                    {
                        Name: 'containerInsights',
                        Value: 'enabled'
                    }
                ]
            });
        });

        it('handles undefined cluster settings', () => {
            // Arrange
            const cluster = new Cluster(stack, 'TestCluster');
            const cfnCluster = cluster.node.defaultChild as CfnCluster;
            cfnCluster.clusterSettings = undefined;

            // Act
            Aspects.of(stack).add(new SecurityCompliance());
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::ECS::Cluster', {
                ClusterSettings: [
                    {
                        Name: 'containerInsights',
                        Value: 'enabled'
                    }
                ]
            });
        });
        it('handles IResolvable cluster settings', () => {
            // Arrange
            const cluster = new Cluster(stack, 'TestCluster');
            const cfnCluster = cluster.node.defaultChild as CfnCluster;
            const mockResolvable: IResolvable = {
                creationStack: [],
                resolve: () => ({
                    name: 'existingSetting',
                    value: 'someValue'
                })
            };
            cfnCluster.clusterSettings = mockResolvable;

            // Act
            Aspects.of(stack).add(new SecurityCompliance());
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::ECS::Cluster', {
                ClusterSettings: Match.arrayWith([
                    {
                        Name: 'containerInsights',
                        Value: 'enabled'
                    }
                ])
            });
        });

        it('initializes empty array for undefined cluster settings', () => {
            // Arrange
            const cluster = new Cluster(stack, 'TestCluster');
            const cfnCluster = cluster.node.defaultChild as CfnCluster;
            cfnCluster.clusterSettings = undefined;

            // Act
            Aspects.of(stack).add(new SecurityCompliance());
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::ECS::Cluster', {
                ClusterSettings: [
                    {
                        Name: 'containerInsights',
                        Value: 'enabled'
                    }
                ]
            });
        });
    });
});
