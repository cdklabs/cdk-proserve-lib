// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { readFileSync } from 'fs';
import { join } from 'path';
import { IMachineImage, MachineImage } from 'aws-cdk-lib/aws-ec2';
import { CfnComponent, CfnImageRecipe } from 'aws-cdk-lib/aws-imagebuilder';
import { ITopic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

import { FeatureError } from './types/exception';
import {
    Ec2ImagePipeline,
    Ec2ImagePipelineBaseProps
} from '../../constructs/ec2-image-pipeline';

/**
 * Properties for creating a Linux STIG Image Pipeline
 */
export interface Ec2LinuxImagePipelineProps extends Ec2ImagePipelineBaseProps {
    /**
     * The operating system to use for the image pipeline.
     * Specifies which operating system version to use as the base image.
     * Default: AMAZON_LINUX_2023.
     * @default Ec2LinuxImagePipeline.OperatingSystem.AMAZON_LINUX_2023
     */
    readonly operatingSystem?: Ec2LinuxImagePipeline.OperatingSystem;

    /**
     * Size for the root volume in GB. Default: 10 GB.
     * @default 10
     */
    readonly rootVolumeSize?: number;

    /**
     * A list of features to install on the image.
     * Features are predefined sets of components and configurations.
     * Default: [AWS_CLI, RETAIN_SSM_AGENT]
     * @default [Ec2LinuxImagePipeline.Feature.AWS_CLI, Ec2LinuxImagePipeline.Feature.RETAIN_SSM_AGENT]
     */
    readonly features?: Ec2LinuxImagePipeline.Feature[];

    /**
     * Additional EBS volume mappings to add to the image.
     * These volumes will be added in addition to the root volume.
     * Use this to specify additional storage volumes that should be included in the AMI.
     */
    readonly extraDeviceMappings?: CfnImageRecipe.InstanceBlockDeviceMappingProperty[];

    /**
     * Additional components to install in the image.
     * These components will be added after the default Linux components.
     * Use this to add custom components beyond the predefined features.
     */
    readonly extraComponents?: (Ec2ImagePipeline.Component | CfnComponent)[];
}

/**
 * A pattern to build an EC2 Image Pipeline specifically for Linux.
 *
 * This pattern contains opinionated code and features to help create a linux
 * pipeline. This pattern further simplifies setting up an image pipeline by
 * letting you choose specific operating systems and features.
 *
 * The example below shows how you can configure an image that contains the AWS
 * CLI and retains the SSM agent on the image. The image will have a 100GB root
 * volume.
 *
 * @example
 *
 * import { Ec2LinuxImagePipeline } from '@cdklabs/cdk-proserve-lib/patterns';
 *
 * new Ec2LinuxImagePipeline(this, 'ImagePipeline', {
 *   version: '0.1.0',
 *   operatingSystem:
 *     Ec2LinuxImagePipeline.OperatingSystem.RED_HAT_ENTERPRISE_LINUX_8_9,
 *   rootVolumeSize: 100,
 *     buildConfiguration: {
 *       start: true,
 *       waitForCompletion: true
 *     },
 *   features: [
 *     Ec2LinuxImagePipeline.Feature.AWS_CLI,
 *     Ec2LinuxImagePipeline.Feature.RETAIN_SSM_AGENT
 *   ]
 * );
 */
export class Ec2LinuxImagePipeline extends Construct {
    /**
     * The latest AMI built by the pipeline. NOTE: You must have enabled the
     * Build Configuration option to wait for image build completion for this
     * property to be available.
     */
    public latestAmi: string | undefined;

    /**
     * The Amazon Resource Name (ARN) of the Image Pipeline.
     * Used to uniquely identify this image pipeline.
     */
    public imagePipelineArn: string;

    /**
     * The SNS Topic associated with this Image Pipeline.
     * Publishes notifications about pipeline execution events.
     */
    public imagePipelineTopic: ITopic;

    /**
     * A pattern to build an EC2 Image Pipeline specifically for Linux.
     *
     * @param scope The scope in which to define this construct
     * @param id The scoped construct ID
     * @param props Configuration properties
     */
    constructor(
        scope: Construct,
        id: string,
        props: Ec2LinuxImagePipelineProps
    ) {
        super(scope, id);

        // Determine Machine Image to use
        const os = props.operatingSystem
            ? props.operatingSystem
            : Ec2LinuxImagePipeline.OperatingSystem.AMAZON_LINUX_2023;
        let machineImage: IMachineImage = MachineImage.latestAmazonLinux2023();
        if (
            os ===
            Ec2LinuxImagePipeline.OperatingSystem.RED_HAT_ENTERPRISE_LINUX_8_9
        ) {
            machineImage = MachineImage.lookup({
                name: 'RHEL-8.9?*x86_64?*GP3',
                owners: [
                    '309956199498', // Official Commercial RedHat AMI owner
                    '219670896067' // Official GovCloud RedHat AMI owner
                ]
            });
        } else if (
            os === Ec2LinuxImagePipeline.OperatingSystem.AMAZON_LINUX_2
        ) {
            machineImage = MachineImage.latestAmazonLinux2();
        }

        // Features
        const features = props.features
            ? props.features
            : [
                  Ec2LinuxImagePipeline.Feature.AWS_CLI,
                  Ec2LinuxImagePipeline.Feature.RETAIN_SSM_AGENT
              ];
        const components = this.buildComponents(
            features,
            os,
            props.extraComponents
        );

        // Set root volume size
        const blockDeviceMappings: CfnImageRecipe.InstanceBlockDeviceMappingProperty[] =
            [];
        blockDeviceMappings.push({
            deviceName: this.getRootDeviceName(props.operatingSystem),
            ebs: {
                volumeSize: props.rootVolumeSize ? props.rootVolumeSize : 10
            }
        });
        if (props.extraDeviceMappings) {
            blockDeviceMappings.push(...props.extraDeviceMappings);
        }

        // Extract unused props from super
        const {
            operatingSystem,
            rootVolumeSize,
            extraDeviceMappings,
            extraComponents,
            ...superProps
        } = props;

        // init
        const pipeline = new Ec2ImagePipeline(this, `${id}Pipeline`, {
            ...superProps,
            machineImage,
            blockDeviceMappings,
            components
        });

        // Forward the latestAmi getter to the pipeline instance
        Object.defineProperty(this, 'latestAmi', {
            get: () => pipeline.latestAmi
        });

        this.imagePipelineArn = pipeline.imagePipelineArn;
        this.imagePipelineTopic = pipeline.imagePipelineTopic;
    }

    private getRootDeviceName(
        operatingSystem?: Ec2LinuxImagePipeline.OperatingSystem
    ): string {
        // Default for Amazon Linux instances
        let rootDeviceName: string = '/dev/xvda';

        if (
            operatingSystem ===
            Ec2LinuxImagePipeline.OperatingSystem.RED_HAT_ENTERPRISE_LINUX_8_9
        ) {
            rootDeviceName = '/dev/sda1';
        }

        return rootDeviceName;
    }

    private buildComponents(
        features: Ec2LinuxImagePipeline.Feature[],
        operatingSystem: Ec2LinuxImagePipeline.OperatingSystem,
        extraComponents?: (Ec2ImagePipeline.Component | CfnComponent)[]
    ): (Ec2ImagePipeline.Component | CfnComponent)[] {
        const components: (Ec2ImagePipeline.Component | CfnComponent)[] = [
            Ec2ImagePipeline.Component.UPDATE_LINUX
        ];

        // aws cli
        if (features.includes(Ec2LinuxImagePipeline.Feature.AWS_CLI)) {
            components.push(Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_LINUX);
        }

        // nice dcv
        if (features.includes(Ec2LinuxImagePipeline.Feature.NICE_DCV)) {
            const dcvCompatibleSystems = [
                Ec2LinuxImagePipeline.OperatingSystem.AMAZON_LINUX_2,
                Ec2LinuxImagePipeline.OperatingSystem
                    .RED_HAT_ENTERPRISE_LINUX_8_9
            ];
            if (dcvCompatibleSystems.includes(operatingSystem)) {
                const niceDcvPrereqs = this.createComponentFromTemplate(
                    'NiceDcvPrereqs',
                    'nice-dcv-prereqs'
                );
                components.push(niceDcvPrereqs);
                components.push(Ec2ImagePipeline.Component.DCV_SERVER_LINUX);
            } else {
                throw new FeatureError(
                    Ec2LinuxImagePipeline.Feature.NICE_DCV,
                    operatingSystem
                );
            }
        }

        // User-supplied extra components (come before STIG)
        if (extraComponents) {
            components.push(...extraComponents);
        }

        // STIG
        if (features.includes(Ec2LinuxImagePipeline.Feature.STIG)) {
            components.push(Ec2ImagePipeline.Component.STIG_BUILD_LINUX_HIGH);
        }

        // SCAP
        if (features.includes(Ec2LinuxImagePipeline.Feature.SCAP)) {
            const scapCompatibleSystems = [
                Ec2LinuxImagePipeline.OperatingSystem
                    .RED_HAT_ENTERPRISE_LINUX_8_9
            ];
            if (scapCompatibleSystems.includes(operatingSystem)) {
                components.push(
                    Ec2ImagePipeline.Component.SCAP_COMPLIANCE_CHECKER_LINUX
                );
            } else {
                throw new FeatureError(
                    Ec2LinuxImagePipeline.Feature.SCAP,
                    operatingSystem
                );
            }
        }

        // retain ssm agent
        if (features.includes(Ec2LinuxImagePipeline.Feature.RETAIN_SSM_AGENT)) {
            const retainSsmAgent = this.createComponentFromTemplate(
                'RetainSsmAgent',
                'retain-ssm-agent'
            );
            components.push(retainSsmAgent);
        }

        return components;
    }

    private createComponentFromTemplate(
        id: string,
        templateName: string,
        platform: string = 'Linux',
        version: string = '0.0.1'
    ): CfnComponent {
        const componentTemplate = readFileSync(
            // nosemgrep - private function
            join(__dirname, 'components', `${templateName}.yml`)
        );

        return new CfnComponent(this, id, {
            name: templateName,
            platform: platform,
            version: version,
            data: componentTemplate.toString()
        });
    }
}

export namespace Ec2LinuxImagePipeline {
    export enum Feature {
        AWS_CLI = 'AWS_CLI',
        NICE_DCV = 'NICE_DCV',
        RETAIN_SSM_AGENT = 'RETAIN_SSM_AGENT',
        STIG = 'STIG',
        SCAP = 'SCAP'
    }

    export enum OperatingSystem {
        RED_HAT_ENTERPRISE_LINUX_8_9 = 'RED_HAT_ENTERPRISE_LINUX_8_9',
        AMAZON_LINUX_2 = 'AMAZON_LINUX_2',
        AMAZON_LINUX_2023 = 'AMAZON_LINUX_2023'
    }
}
