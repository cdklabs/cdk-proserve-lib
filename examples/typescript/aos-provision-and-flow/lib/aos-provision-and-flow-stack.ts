// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Domain, EngineVersion } from 'aws-cdk-lib/aws-opensearchservice';
import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import {
    OpenSearchProvisionDomain,
    OpenSearchWorkflow
} from '@cdklabs/cdk-proserve-lib/constructs';
import { join } from 'node:path';

export class AosProvisionAndFlowStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Create an Admin Role to be used for the OpenSearch Domain
        const adminRole = new Role(this, 'OpenSearchAdminRole', {
            assumedBy: new ServicePrincipal('opensearch.amazonaws.com'),
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName(
                    'AmazonOpenSearchServiceFullAccess'
                )
            ]
        });

        // Create the OpenSearch Domain
        const openSearchDomain = new Domain(this, 'AosDomain', {
            version: EngineVersion.OPENSEARCH_2_19,
            fineGrainedAccessControl: {
                masterUserArn: adminRole.roleArn
            },
            ebs: {
                volumeSize: 100
            },
            nodeToNodeEncryption: true,
            encryptionAtRest: {
                enabled: true
            },
            enforceHttps: true
        });

        // Provision the OpenSearch Domain
        new OpenSearchProvisionDomain(this, 'AosProvisionDomain', {
            domain: openSearchDomain,
            domainAdmin: adminRole,
            domainType: 'OpenSearch',
            clusterSettings: {
                'plugins.ml_commons.only_run_on_ml_node': 'false',
                'plugins.ml_commons.model_access_control_enabled': 'true'
            },
            provisioningConfigurationPath: join(
                __dirname,
                '..',
                'data',
                'aos-config'
            )
        });

        // Setup an ingest pipeline in OpenSearch that creates embeddings
        new OpenSearchWorkflow(this, 'EmbeddingsFlow', {
            domain: openSearchDomain,
            domainAuthentication: adminRole,
            flowFrameworkTemplatePath: join(
                __dirname,
                '..',
                'data',
                'aos-workflows',
                'model.yaml'
            )
        });
    }
}
