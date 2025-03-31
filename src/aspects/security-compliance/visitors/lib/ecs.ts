// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CfnResource } from 'aws-cdk-lib';
import { CfnCluster, ContainerInsights } from 'aws-cdk-lib/aws-ecs';
import { IConstruct } from 'constructs';
import { EcsSettings } from '../../types';
import { BaseVisitor } from '../base';

export class EcsClusterVisitor extends BaseVisitor<CfnCluster, EcsSettings> {
    public override canVisit(node: IConstruct): node is CfnCluster {
        return (
            (node as CfnResource).cfnResourceType ===
            CfnCluster.CFN_RESOURCE_TYPE_NAME
        );
    }

    public override visit(node: CfnCluster): void {
        if (!this.settings?.clusterContainerInsights?.disabled) {
            if (!node.clusterSettings) {
                // If clusterSettings is undefined, initialize it as an array
                node.clusterSettings = [];
            } else if (!Array.isArray(node.clusterSettings)) {
                // If it's an IResolvable (non-array), set the clusterSettings
                // to an array with the IResolvable included
                node.clusterSettings = [node.clusterSettings];
            }

            // Check if containerInsights setting already exists
            const containerInsightsIndex = node.clusterSettings.findIndex(
                (setting) => {
                    if (typeof setting === 'object' && 'name' in setting) {
                        return setting.name === 'containerInsights';
                    }
                    return false;
                }
            );

            if (containerInsightsIndex < 0) {
                // Add new setting
                node.clusterSettings.push({
                    name: 'containerInsights',
                    value: ContainerInsights.ENABLED
                });
            }
        }
    }
}
