// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Domain } from 'aws-cdk-lib/aws-opensearchservice';
import { Role } from 'aws-cdk-lib/aws-iam';
import {
    OpenSearchProvisionDomain,
    OpenSearchWorkflow
} from '@cdklabs/cdk-proserve-lib/constructs';

export interface AosProvisionAndFlowStackProps extends StackProps {
    readonly domain: Domain;
    readonly domainAdminRole: Role;
}

export class AosProvisionAndFlowStack extends Stack {
    readonly domain: Domain;

    constructor(
        scope: Construct,
        id: string,
        props: AosProvisionAndFlowStackProps
    ) {
        super(scope, id, props);

        // Provision the OpenSearch Domain
        const provision = new OpenSearchProvisionDomain(
            this,
            'AosProvisionDomain',
            {
                domain: props.domain,
                domainAdmin: props.domainAdminRole,
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
            domain: props.domain,
            domainAuthentication: props.domainAdminRole,
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
