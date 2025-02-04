// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    AwsCustomResource,
    AwsCustomResourcePolicy,
    AwsSdkCall,
    PhysicalResourceId
} from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { DefaultConfig } from '../../common/default-config';
import { validate, ValidationTypes } from '../../common/validate';
import { AwsCustomResourceLambdaConfiguration } from '../../types';

/**
 * Properties for the Ec2ImageBuilderGetImage construct
 */
export interface Ec2ImageBuilderGetImageProps {
    /**
     * The ARN of the EC2 Image Builder image build version
     */
    readonly imageBuildVersionArn: string;

    /**
     * Optional Lambda configuration settings.
     */
    readonly lambdaConfiguration?: AwsCustomResourceLambdaConfiguration;
}

/**
 * Retrieves an EC2 Image Builder image build version.
 *
 * This is useful for retrieving the AMI ID of an image that was built by an
 * EC2 Image Builder pipeline.
 *
 * @example
 *
 * import { CfnOutput } from 'aws-cdk-lib';
 * import { Ec2ImageBuilderGetImage } from '@cdklabs/cdk-proserve-lib/constructs';
 *
 * const image = new Ec2ImageBuilderGetImage(this, 'SomeImage', {
 *   imageBuildVersionArn: 'arn:aws:imagebuilder:us-east-1:123456789012:image/some-image/0.0.1/1'
 * });
 * new CfnOutput(this, 'AmiId', { value: image.ami });
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
     * Retrieves an EC2 Image Builder image build version.
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

        validate(props.imageBuildVersionArn, ValidationTypes.AWS_ARN);

        const customResource = new AwsCustomResource(
            this,
            'ImagePipelineAmiResource',
            {
                policy: AwsCustomResourcePolicy.fromSdkCalls({
                    resources: [props.imageBuildVersionArn]
                }),
                logRetention: DefaultConfig.logRetention,
                onCreate: this.getImage(id, props.imageBuildVersionArn),
                onUpdate: this.getImage(id, props.imageBuildVersionArn),
                resourceType: 'Custom::Ec2ImageBuilderGetImage',
                ...props.lambdaConfiguration
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
