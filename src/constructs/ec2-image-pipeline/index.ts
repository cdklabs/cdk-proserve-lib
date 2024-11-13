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

import { Aws } from 'aws-cdk-lib';
import {
    IMachineImage,
    ISecurityGroup,
    ISubnet,
    IVpc,
    MachineImage,
    SecurityGroup
} from 'aws-cdk-lib/aws-ec2';
import {
    InstanceProfile,
    ManagedPolicy,
    Role,
    ServicePrincipal
} from 'aws-cdk-lib/aws-iam';
import {
    CfnComponent,
    CfnImagePipeline,
    CfnImageRecipe,
    CfnInfrastructureConfiguration
} from 'aws-cdk-lib/aws-imagebuilder';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { ITopic, Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { Ec2ImageBuilderGetImage } from '../ec2-image-builder-get-image';
import { Ec2ImageBuilderStart } from '../ec2-image-builder-start';

/**
 * Base properties for EC2 Image Pipeline configuration.
 */
export interface Ec2ImagePipelineBaseProps {
    /**
     * Version of the image pipeline.
     */
    readonly version: string;

    /**
     * Configuration options for the build process.
     */
    readonly buildConfiguration?: Ec2ImagePipeline.BuildConfigurationProps;

    /**
     * Instance types for the Image Builder Pipeline. Default: [t3.medium]
     */
    readonly instanceTypes?: string[];

    /**
     * Description of the image pipeline.
     */
    readonly description?: string;

    /**
     * KMS key for encryption.
     */
    readonly encryption?: IKey;

    /**
     * VPC configuration for the image pipeline.
     */
    readonly vpcConfiguration?: Ec2ImagePipeline.VpcConfigurationProps;
}

/**
 * Properties for EC2 Image Pipeline, extending the base properties.
 */
export interface Ec2ImagePipelineProps extends Ec2ImagePipelineBaseProps {
    /**
     * The machine image to use as a base for the pipeline.
     */
    readonly machineImage?: IMachineImage;

    /**
     * Block device mappings for the image.
     */
    readonly blockDeviceMappings?: CfnImageRecipe.InstanceBlockDeviceMappingProperty[];

    /**
     * Components to be included in the image pipeline.
     * Can be either custom Ec2ImagePipeline.Component or AWS CDK imagebuilder.CfnComponent.
     */
    readonly components?: (Ec2ImagePipeline.Component | CfnComponent)[];
}

export class Ec2ImagePipeline extends Construct {
    /**
     * The latest AMI built by the pipeline. NOTE: You must have enabled the
     * Build Configuration option to wait for image build completion for this
     * property to be available.
     */
    public readonly latestAmi: string | undefined;

    /**
     * The Image Pipeline ARN that gets created.
     */
    public readonly imagePipelineArn: string;

    /**
     * The Image Pipeline Topic that gets created.
     */
    public readonly imagePipelineTopic: ITopic;

    constructor(scope: Construct, id: string, props: Ec2ImagePipelineProps) {
        super(scope, id);

        let baseMachineImage: IMachineImage = props?.machineImage
            ? props.machineImage
            : MachineImage.latestAmazonLinux2023();

        // Security Group
        let securityGroupIds: string[] | undefined = undefined;
        if (props?.vpcConfiguration) {
            let sg: ISecurityGroup | undefined = undefined;
            if (!props.vpcConfiguration.securityGroup) {
                sg = new SecurityGroup(this, 'ImagePipelineSg', {
                    vpc: props.vpcConfiguration.vpc,
                    allowAllOutbound: true,
                    description: 'Security group for Image Builder pipeline'
                });
            } else {
                sg = props.vpcConfiguration.securityGroup;
            }

            securityGroupIds = [sg.securityGroupId];
        }

        // SNS Topic
        const topic = new Topic(this, 'ImageBuilderTopic', {
            masterKey: props?.encryption
        });

        // IAM Role
        const role = new Role(this, 'ImagePipelineRole', {
            assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
            description: 'IAM role used as part of an Image Builder pipeline',
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName(
                    'EC2InstanceProfileForImageBuilder'
                ),
                ManagedPolicy.fromAwsManagedPolicyName(
                    'AmazonSSMManagedInstanceCore'
                )
            ]
        });

        // Instance Profile
        const instanceProfile = new InstanceProfile(this, 'InstanceProfile', {
            role: role
        });

        // Infrastructure Configuration
        const infraConfig = new CfnInfrastructureConfiguration(
            this,
            'InfrastructureConfiguration',
            {
                name: `${id}InfraConfig`,
                instanceProfileName: instanceProfile.instanceProfileName,
                instanceTypes: props.instanceTypes
                    ? props.instanceTypes
                    : ['t3.medium'],
                snsTopicArn: topic.topicArn,
                description: 'Infrastructure Configuration for Image Builder',
                securityGroupIds: securityGroupIds,
                subnetId: props?.vpcConfiguration?.subnet?.subnetId
            }
        );

        // Image Recipe
        const formattedComponents: CfnImageRecipe.ComponentConfigurationProperty[] =
            [];
        props?.components?.forEach((component) => {
            if (
                Object.values(Ec2ImagePipeline.Component).includes(
                    component as Ec2ImagePipeline.Component
                )
            ) {
                // Handle the enum component
                formattedComponents.push({
                    componentArn: `arn:${Aws.PARTITION}:imagebuilder:${Aws.REGION}:aws:component/${component}/x.x.x`
                });
            } else if (component instanceof CfnComponent) {
                // Handle the CfnComponent
                formattedComponents.push({ componentArn: component.attrArn });
            }
        });

        const imageRecipe = new CfnImageRecipe(this, 'ImageRecipe', {
            name: `${id}ImageRecipe`,
            parentImage: baseMachineImage.getImage(this).imageId,
            version: props.version,
            components: formattedComponents,
            blockDeviceMappings: props?.blockDeviceMappings
        });

        // Image Pipeline
        const imagePipeline = new CfnImagePipeline(this, 'ImagePipeline', {
            name: `${id}ImagePipeline`,
            imageRecipeArn: imageRecipe.attrArn,
            infrastructureConfigurationArn: infraConfig.attrArn,
            description: props?.description
        });

        if (props?.buildConfiguration?.start) {
            const imageBuild = new Ec2ImageBuilderStart(this, 'StartPipeline', {
                pipelineArn: imagePipeline.attrArn,
                waitForCompletion: props.buildConfiguration.waitForCompletion
                    ? {
                          topic: topic
                      }
                    : undefined,
                hash: props.buildConfiguration.hash
                    ? props.buildConfiguration.hash
                    : props.version
            });

            if (props.buildConfiguration.waitForCompletion) {
                const image = new Ec2ImageBuilderGetImage(this, 'GetImage', {
                    imageBuildVersionArn: imageBuild.imageBuildVersionArn
                });
                image.node.addDependency(imageBuild);

                this.latestAmi = image.ami;
            }
        }

        this.imagePipelineTopic = topic;
        this.imagePipelineArn = imagePipeline.attrArn;
    }
}

export namespace Ec2ImagePipeline {
    /** Image Builder Component */
    export enum Component {
        AMAZON_CLOUDWATCH_AGENT_LINUX = 'amazon-cloudwatch-agent-linux',
        AMAZON_CLOUDWATCH_AGENT_WINDOWS = 'amazon-cloudwatch-agent-windows',
        AMAZON_CORRETTO_11_APT_GENERIC = 'amazon-corretto-11-apt-generic',
        AMAZON_CORRETTO_11_HEADLESS = 'amazon-corretto-11-headless',
        AMAZON_CORRETTO_11_RPM_GENERIC = 'amazon-corretto-11-rpm-generic',
        AMAZON_CORRETTO_11_WINDOWS = 'amazon-corretto-11-windows',
        AMAZON_CORRETTO_11 = 'amazon-corretto-11',
        AMAZON_CORRETTO_17_HEADLESS = 'amazon-corretto-17-headless',
        AMAZON_CORRETTO_17_JDK = 'amazon-corretto-17-jdk',
        AMAZON_CORRETTO_17_JRE = 'amazon-corretto-17-jre',
        AMAZON_CORRETTO_17_WINDOWS = 'amazon-corretto-17-windows',
        AMAZON_CORRETTO_21_HEADLESS = 'amazon-corretto-21-headless',
        AMAZON_CORRETTO_21_JDK = 'amazon-corretto-21-jdk',
        AMAZON_CORRETTO_21_JRE = 'amazon-corretto-21-jre',
        AMAZON_CORRETTO_21_WINDOWS = 'amazon-corretto-21-windows',
        AMAZON_CORRETTO_8_APT_GENERIC = 'amazon-corretto-8-apt-generic',
        AMAZON_CORRETTO_8_JDK = 'amazon-corretto-8-jdk',
        AMAZON_CORRETTO_8_JRE = 'amazon-corretto-8-jre',
        AMAZON_CORRETTO_8_RPM_GENERIC = 'amazon-corretto-8-rpm-generic',
        AMAZON_CORRETTO_8_WINDOWS = 'amazon-corretto-8-windows',
        AMAZON_KINESIS_AGENT_WINDOWS = 'amazon-kinesis-agent-windows',
        ANACONDA_WINDOWS = 'anaconda-windows',
        APACHE_TOMCAT_9_LINUX = 'apache-tomcat-9-linux',
        APT_REPOSITORY_TEST_LINUX = 'apt-repository-test-linux',
        AWS_CLI_VERSION_2_LINUX = 'aws-cli-version-2-linux',
        AWS_CLI_VERSION_2_WINDOWS = 'aws-cli-version-2-windows',
        AWS_CODEDEPLOY_AGENT_LINUX = 'aws-codedeploy-agent-linux',
        AWS_CODEDEPLOY_AGENT_WINDOWS = 'aws-codedeploy-agent-windows',
        AWS_VSS_COMPONENTS_WINDOWS = 'aws-vss-components-windows',
        CHOCOLATEY = 'chocolatey',
        CHRONY_TIME_CONFIGURATION_TEST = 'chrony-time-configuration-test',
        DCV_SERVER_LINUX = 'dcv-server-linux',
        DCV_SERVER_WINDOWS = 'dcv-server-windows',
        DISTRIBUTOR_PACKAGE_WINDOWS = 'distributor-package-windows',
        DOCKER_CE_CENTOS = 'docker-ce-centos',
        DOCKER_CE_LINUX = 'docker-ce-linux',
        DOCKER_CE_UBUNTU = 'docker-ce-ubuntu',
        DOTNET_DESKTOP_RUNTIME_LTS_WINDOWS = 'dotnet-desktop-runtime-lts-windows',
        DOTNET_HOSTING_BUNDLE_LTS_WINDOWS = 'dotnet-hosting-bundle-lts-windows',
        DOTNET_RUNTIME_LTS_LINUX = 'dotnet-runtime-lts-linux',
        DOTNET_RUNTIME_LTS_WINDOWS = 'dotnet-runtime-lts-windows',
        DOTNET_SDK_LTS_LINUX = 'dotnet-sdk-lts-linux',
        DOTNET_SDK_LTS_WINDOWS = 'dotnet-sdk-lts-windows',
        EBS_VOLUME_USAGE_TEST_LINUX = 'ebs-volume-usage-test-linux',
        EBS_VOLUME_USAGE_TEST_WINDOWS = 'ebs-volume-usage-test-windows',
        EC2_NETWORK_ROUTE_TEST_WINDOWS = 'ec2-network-route-test-windows',
        EC2LAUNCH_V2_WINDOWS = 'ec2launch-v2-windows',
        ECS_OPTIMIZED_AMI_WINDOWS = 'ecs-optimized-ami-windows',
        EKS_OPTIMIZED_AMI_WINDOWS = 'eks-optimized-ami-windows',
        ENI_ATTACHMENT_TEST_LINUX = 'eni-attachment-test-linux',
        ENI_ATTACHMENT_TEST_WINDOWS = 'eni-attachment-test-windows',
        GO_LINUX = 'go-linux',
        GO_STABLE_LINUX = 'go-stable-linux',
        GO_STABLE_WINDOWS = 'go-stable-windows',
        GO_WINDOWS = 'go-windows',
        HELLO_WORLD_LINUX = 'hello-world-linux',
        HELLO_WORLD_WINDOWS = 'hello-world-windows',
        INSPECTOR_TEST_LINUX = 'inspector-test-linux',
        INSPECTOR_TEST_WINDOWS = 'inspector-test-windows',
        INSTALL_PACKAGE_FROM_REPOSITORY = 'install-package-from-repository',
        MARIADB_LINUX = 'mariadb-linux',
        MATE_DE_LINUX = 'mate-de-linux',
        MONO_LINUX = 'mono-linux',
        PHP_8_2_LINUX = 'php-8_2-linux',
        POWERSHELL_LTS_LINUX = 'powershell-lts-linux',
        POWERSHELL_LTS_WINDOWS = 'powershell-lts-windows',
        POWERSHELL_SNAP = 'powershell-snap',
        POWERSHELL_YUM = 'powershell-yum',
        PUTTY = 'PuTTY',
        PYTHON_3_LINUX = 'python-3-linux',
        PYTHON_3_WINDOWS = 'python-3-windows',
        REBOOT_LINUX = 'reboot-linux',
        REBOOT_TEST_LINUX = 'reboot-test-linux',
        REBOOT_TEST_WINDOWS = 'reboot-test-windows',
        REBOOT_WINDOWS = 'reboot-windows',
        SAN_SIFT_LINUX = 'san-sift-linux',
        SCAP_COMPLIANCE_CHECKER_LINUX = 'scap-compliance-checker-linux',
        SCAP_COMPLIANCE_CHECKER_WINDOWS = 'scap-compliance-checker-windows',
        SIMPLE_BOOT_TEST_LINUX = 'simple-boot-test-linux',
        SIMPLE_BOOT_TEST_WINDOWS = 'simple-boot-test-windows',
        STIG_BUILD_LINUX_HIGH = 'stig-build-linux-high',
        STIG_BUILD_LINUX_LOW = 'stig-build-linux-low',
        STIG_BUILD_LINUX_MEDIUM = 'stig-build-linux-medium',
        STIG_BUILD_WINDOWS_HIGH = 'stig-build-windows-high',
        STIG_BUILD_WINDOWS_LOW = 'stig-build-windows-low',
        STIG_BUILD_WINDOWS_MEDIUM = 'stig-build-windows-medium',
        UPDATE_LINUX_KERNEL_5 = 'update-linux-kernel-5',
        UPDATE_LINUX_KERNEL_ML = 'update-linux-kernel-ml',
        UPDATE_LINUX = 'update-linux',
        UPDATE_WINDOWS = 'update-windows',
        VALIDATE_SINGLE_SSH_PUBLIC_KEY_TEST_LINUX = 'validate-single-ssh-public-key-test-linux',
        VALIDATE_SSH_HOST_KEY_GENERATION_LINUX = 'validate-ssh-host-key-generation-linux',
        VALIDATE_SSH_PUBLIC_KEY_LINUX = 'validate-ssh-public-key-linux',
        WINDOWS_ACTIVATION_TEST = 'windows-activation-test',
        WINDOWS_IS_READY_WITH_PASSWORD_GENERATION_TEST = 'windows-is-ready-with-password-generation-test',
        WINDOWS_SERVER_IIS = 'windows-server-iis',
        YUM_REPOSITORY_TEST_LINUX = 'yum-repository-test-linux'
    }
    /** End Image Builder Component */

    /** VPC Configuration */
    export interface VpcConfigurationProps {
        readonly vpc: IVpc;
        readonly subnet?: ISubnet;
        readonly securityGroup?: ISecurityGroup;
    }

    export interface BuildConfigurationProps {
        readonly start: boolean;
        readonly hash?: string;
        readonly waitForCompletion?: boolean;
    }
}
