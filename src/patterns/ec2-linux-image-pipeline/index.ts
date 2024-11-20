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
     */
    readonly operatingSystem?: Ec2LinuxImagePipeline.OperatingSystem;

    /**
     * Size for the root volume in GB. Default: 10 GB.
     * @default 10
     */
    readonly rootVolumeSize?: number;

    /**
     * A list of features to install.
     */
    readonly features?: Ec2LinuxImagePipeline.Feature[];

    /**
     * Additional EBS volume mappings to add to the image.
     * These will be added in addition to the root volume.
     */
    readonly extraDeviceMappings?: CfnImageRecipe.InstanceBlockDeviceMappingProperty[];

    /**
     * Additional components to install in the image.
     * These will be added after the default Linux components.
     */
    readonly extraComponents?: (Ec2ImagePipeline.Component | CfnComponent)[];
}

export class Ec2LinuxImagePipeline extends Construct {
    public latestAmi: string | undefined;
    public imagePipelineArn: string;
    public imagePipelineTopic: ITopic;

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

        this.latestAmi = pipeline.latestAmi;
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
