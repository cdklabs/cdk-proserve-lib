// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { Aws, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Domain, EngineVersion } from 'aws-cdk-lib/aws-opensearchservice';
import {
    Role,
    AccountRootPrincipal,
    PrincipalWithConditions
} from 'aws-cdk-lib/aws-iam';
import {
    OpenSearchProvisionDomain,
    OpenSearchWorkflow
} from '@cdklabs/cdk-proserve-lib/constructs';

export class AosProvisionAndFlowStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Create an Admin Role to be used for the OpenSearch Domain access
        const adminRole = new Role(this, 'OpenSearchAdminRole', {
            assumedBy: new PrincipalWithConditions(new AccountRootPrincipal(), {
                StringLike: {
                    'aws:PrincipalArn': `arn:${Aws.PARTITION}:iam::${Aws.ACCOUNT_ID}:role/${this.stackName}-*`
                }
            })
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
        const provision = new OpenSearchProvisionDomain(
            this,
            'AosProvisionDomain',
            {
                domain: openSearchDomain,
                domainAdmin: adminRole,
                clusterSettings: {
                    persistent: {
                        'plugins.ml_commons.only_run_on_ml_node': 'false',
                        'plugins.ml_commons.native_memory_threshold': '99'
                    }
                },
                provisioningConfigurationPath: join(
                    __dirname,
                    '..',
                    'data',
                    'aos-config'
                )
            }
        );

        // Setup an ingest pipeline in OpenSearch that creates embeddings
        const workflow = new OpenSearchWorkflow(this, 'EmbeddingsFlow', {
            domain: openSearchDomain,
            domainAuthentication: adminRole,
            flowFrameworkTemplatePath: join(
                __dirname,
                '..',
                'data',
                'aos-workflows',
                'my-nlp-pipeline.yaml'
            )
        });
        workflow.node.addDependency(provision);

        // Export the model used for the embeddings
        this.exportValue(workflow.getResourceId('deploy_sentence_model'));
    }
}
