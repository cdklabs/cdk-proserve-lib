/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import {
    AwsCustomResource,
    AwsCustomResourcePolicy,
    AwsSdkCall,
    PhysicalResourceId
} from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

/**
 * Properties for the EC2 Image Builder Start custom resource
 */
interface Ec2ImageBuilderStartProps {
    /**
     * The ARN of the Image Builder pipeline to start
     */
    pipelineArn: string;
}

/**
 * Starts an EC2 Image Builder pipeline execution
 */
export class Ec2ImageBuilderStart extends Construct {
    /** The ARN of the image build version created by the pipeline execution */
    public readonly imageBuildVersionArn: string;

    /**
     * Creates a new EC2 Image Builder Start custom resource
     * @param scope The construct scope
     * @param id The construct ID
     * @param props Configuration properties
     */
    constructor(
        scope: Construct,
        id: string,
        props: Ec2ImageBuilderStartProps
    ) {
        super(scope, id);

        const customResource = new AwsCustomResource(this, 'Resource', {
            policy: AwsCustomResourcePolicy.fromSdkCalls({
                resources: [props.pipelineArn]
            }),
            logRetention: RetentionDays.ONE_YEAR,
            onCreate: this.start(id, props.pipelineArn),
            onUpdate: this.start(id, props.pipelineArn),
            resourceType: 'Custom::Ec2ImageBuilderStart'
        });

        this.imageBuildVersionArn = customResource.getResponseField(
            'imageBuildVersionArn'
        );
    }

    /**
     * Creates the AWS SDK call parameters to start the pipeline execution
     * @param id The construct ID
     * @param pipelineArn The ARN of the Image Builder pipeline to execute
     * @returns The AWS SDK call configuration
     */
    private start(id: string, pipelineArn: string): AwsSdkCall {
        const params = {
            imagePipelineArn: pipelineArn
        };

        return {
            action: 'startImagePipelineExecution',
            service: 'Imagebuilder',
            parameters: params,
            physicalResourceId: PhysicalResourceId.of(id)
        };
    }
}
