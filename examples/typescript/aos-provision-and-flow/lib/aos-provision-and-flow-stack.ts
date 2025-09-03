// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { Aws, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Domain, EngineVersion } from 'aws-cdk-lib/aws-opensearchservice';
import {
    AccountRootPrincipal,
    AnyPrincipal,
    Effect,
    PolicyStatement,
    PrincipalWithConditions,
    Role
} from 'aws-cdk-lib/aws-iam';
import {
    OpenSearchProvisionDomain,
    OpenSearchWorkflow
} from '@cdklabs/cdk-proserve-lib/constructs';

export class AosProvisionAndFlowStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Create an Admin Role to be used for the OpenSearch Domain access
        const domainAdminRole = new Role(this, 'OpenSearchAdminRole', {
            assumedBy: new PrincipalWithConditions(new AccountRootPrincipal(), {
                StringLike: {
                    'aws:PrincipalArn': `arn:${Aws.PARTITION}:iam::${Aws.ACCOUNT_ID}:role/${this.stackName}-*`
                }
            })
        });

        // Create the OpenSearch Domain
        const domain = new Domain(this, 'AosDomain', {
            version: EngineVersion.OPENSEARCH_2_19,
            fineGrainedAccessControl: {
                masterUserArn: domainAdminRole.roleArn
            },
            ebs: {
                volumeSize: 100
            },
            nodeToNodeEncryption: true,
            encryptionAtRest: {
                enabled: true
            },
            enforceHttps: true,
            removalPolicy: RemovalPolicy.DESTROY,
            accessPolicies: [
                new PolicyStatement({
                    actions: ['es:*'],
                    effect: Effect.ALLOW,
                    principals: [new AnyPrincipal()],
                    resources: [
                        `arn:${Aws.PARTITION}:es:${Aws.REGION}:${Aws.ACCOUNT_ID}:domain/*`
                    ]
                })
            ]
        });

        // Provision the OpenSearch Domain
        const provision = new OpenSearchProvisionDomain(
            this,
            'AosProvisionDomain',
            {
                domain: domain,
                domainAdmin: domainAdminRole,
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
            domain: domain,
            domainAuthentication: domainAdminRole,
            flowFrameworkTemplatePath: join(
                __dirname,
                '..',
                'data',
                'aos-workflows',
                'my-nlp-pipeline.yaml'
            )
        });
        workflow.node.addDependency(provision);

        // Output the model used for the embeddings
        this.exportValue(workflow.getResourceId('deploy_sentence_model'));
    }
}
