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

import { IMachineImage, MachineImage } from 'aws-cdk-lib/aws-ec2';
import { CfnComponent, CfnImageRecipe } from 'aws-cdk-lib/aws-imagebuilder';
import { Construct } from 'constructs';

import {
    Ec2ImagePipeline,
    Ec2ImagePipelineBaseProps
} from '../../constructs/ec2-image-pipeline';

/**
 * Properties for creating a Linux STIG Image Pipeline
 */
export interface Ec2LinuxStigImagePipelineProps
    extends Ec2ImagePipelineBaseProps {
    /**
     * The operating system to use for the image pipeline.
     */
    readonly operatingSystem?: Ec2LinuxStigImagePipeline.OperatingSystem;

    /**
     * Size for the root volume in GB. Default: 10 GB.
     * @default 10
     */
    readonly rootVolumeSize?: number;

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

export class Ec2LinuxStigImagePipeline extends Ec2ImagePipeline {
    private static getRootDeviceName(
        operatingSystem?: Ec2LinuxStigImagePipeline.OperatingSystem
    ): string {
        // Default for Amazon Linux instances
        let rootDeviceName: string = '/dev/xvda';

        if (
            operatingSystem ===
            Ec2LinuxStigImagePipeline.OperatingSystem
                .RED_HAT_ENTERPRISE_LINUX_8_9
        ) {
            rootDeviceName = '/dev/sda1';
        }

        return rootDeviceName;
    }

    constructor(
        scope: Construct,
        id: string,
        props: Ec2LinuxStigImagePipelineProps
    ) {
        // Determine Machine Image to use
        const os = props.operatingSystem
            ? props.operatingSystem
            : Ec2LinuxStigImagePipeline.OperatingSystem.AMAZON_LINUX_2023;
        let machineImage: IMachineImage = MachineImage.latestAmazonLinux2023();
        if (
            os ===
            Ec2LinuxStigImagePipeline.OperatingSystem
                .RED_HAT_ENTERPRISE_LINUX_8_9
        ) {
            machineImage = MachineImage.lookup({
                name: 'RHEL-8.9?*x86_64?*GP3',
                owners: [
                    '309956199498', // Official Commercial RedHat AMI owner
                    '219670896067' // Official GovCloud RedHat AMI owner
                ]
            });
        } else if (
            os === Ec2LinuxStigImagePipeline.OperatingSystem.AMAZON_LINUX_2
        ) {
            machineImage = MachineImage.latestAmazonLinux2();
        }

        // Set default components for Linux
        const components: (Ec2ImagePipeline.Component | CfnComponent)[] = [
            Ec2ImagePipeline.Component.UPDATE_LINUX,
            Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_LINUX,
            Ec2ImagePipeline.Component.STIG_BUILD_LINUX_HIGH
        ];

        // Define SCAP-compatible operating systems
        const scapCompatibleSystems = [
            Ec2LinuxStigImagePipeline.OperatingSystem
                .RED_HAT_ENTERPRISE_LINUX_8_9
        ];

        // Add SCAP Compliance Checker if the OS supports it
        if (scapCompatibleSystems.includes(os)) {
            components.push(
                Ec2ImagePipeline.Component.SCAP_COMPLIANCE_CHECKER_LINUX
            );
        }

        // Add extra components from the user
        if (props.extraComponents) {
            components.push(...props.extraComponents);
        }

        // Set root volume size
        const blockDeviceMappings: CfnImageRecipe.InstanceBlockDeviceMappingProperty[] =
            [];
        blockDeviceMappings.push({
            deviceName: Ec2LinuxStigImagePipeline.getRootDeviceName(
                props.operatingSystem
            ),
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
        super(scope, id, {
            ...superProps,
            machineImage,
            blockDeviceMappings,
            components
        });
    }
}

export namespace Ec2LinuxStigImagePipeline {
    export enum OperatingSystem {
        RED_HAT_ENTERPRISE_LINUX_8_9 = 'RED_HAT_ENTERPRISE_LINUX_8_9',
        AMAZON_LINUX_2 = 'AMAZON_LINUX_2',
        AMAZON_LINUX_2023 = 'AMAZON_LINUX_2023'
    }
}
