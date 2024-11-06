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
 * Properties for the Ec2ImageBuilderGetImage construct
 */
export interface Ec2ImageBuilderGetImageProps {
    /**
     * The ARN of the EC2 Image Builder image build version
     */
    readonly imageBuildVersionArn: string;
}

/**
 * Custom construct that retrieves the AMI ID from an EC2 Image Builder image build version
 */
export class Ec2ImageBuilderGetImage extends Construct {
    /**
     * The AMI ID retrieved from the EC2 Image Builder image
     */
    public readonly ami: string;

    /**
     * The response field path to extract the AMI ID from the API response
     */
    private readonly apiResponseField: string =
        'image.outputResources.amis.0.image';

    /**
     * Retrieves an Image from EC2 Image Builder so that you can grab the AMI
     * that was built by the Image Builder pipeline.
     *
     * @param scope The scope in which to define this construct
     * @param id The scoped construct ID
     * @param props Configuration properties
     */
    constructor(
        scope: Construct,
        id: string,
        props: Ec2ImageBuilderGetImageProps
    ) {
        super(scope, id);

        const customResource = new AwsCustomResource(
            this,
            'ImagePipelineAmiResource',
            {
                policy: AwsCustomResourcePolicy.fromSdkCalls({
                    resources: [props.imageBuildVersionArn]
                }),
                logRetention: RetentionDays.ONE_YEAR,
                onCreate: this.getImage(id, props.imageBuildVersionArn),
                onUpdate: this.getImage(id, props.imageBuildVersionArn),
                resourceType: 'Custom::Ec2ImageBuilderGetImage'
            }
        );

        this.ami = customResource.getResponseField(this.apiResponseField);
    }

    /**
     * Creates the AWS SDK call parameters for the Image Builder getImage API
     * @param id The construct ID to use as the physical resource ID
     * @param imageBuildVersionArn The ARN of the image build version to retrieve
     * @returns The AWS SDK call configuration
     */
    private getImage(id: string, imageBuildVersionArn: string): AwsSdkCall {
        const params = {
            imageBuildVersionArn: imageBuildVersionArn
        };

        return {
            service: 'Imagebuilder',
            action: 'getImage',
            parameters: params,
            physicalResourceId: PhysicalResourceId.of(id),
            outputPaths: [this.apiResponseField]
        };
    }
}
