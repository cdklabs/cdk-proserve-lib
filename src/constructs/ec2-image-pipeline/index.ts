// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

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
    AnyPrincipal,
    ArnPrincipal,
    Effect,
    InstanceProfile,
    ManagedPolicy,
    PolicyStatement,
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
import { validate, ValidationTypes } from '../../common/validate';
import { LambdaConfiguration } from '../../types';
import { Ec2ImageBuilderGetImage } from '../ec2-image-builder-get-image';
import { Ec2ImageBuilderStart } from '../ec2-image-builder-start';
import { Ec2ImagePipelineBuildError } from './types/exception';

/**
 * Base properties for EC2 Image Pipeline configuration.
 */
export interface Ec2ImagePipelineBaseProps {
    /**
     * Version of the image pipeline. This must be updated if you make
     * underlying changes to the pipeline configuration.
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

    /**
     * Optional Lambda configuration settings.
     */
    readonly lambdaConfiguration?: LambdaConfiguration;
}

/**
 * Properties for EC2 Image Pipeline, extending the base properties.
 */
export interface Ec2ImagePipelineProps extends Ec2ImagePipelineBaseProps {
    /**
     * The machine image to use as a base for the pipeline.
     *
     * @default AmazonLinux2023
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

/**
 * An EC2 Image Pipeline that can be used to build a Amazon Machine Image (AMI)
 * automatically.
 *
 * This construct simplifies the process of creating an EC2 Image Pipeline and
 * provides all of the available components that can be used that are maintained
 * by AWS.
 *
 * @example
 *
 * import { CfnOutput } from 'aws-cdk-lib';
 * import { Ec2ImagePipeline } from '@cdklabs/cdk-proserve-lib/constructs';
 *
 * const pipeline = new Ec2ImagePipeline(this, 'ImagePipeline', {
 *   version: '0.1.0',
 *   buildConfiguration: {
 *     start: true,
 *     waitForCompletion: true
 *   },
 *   components: [
 *     Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_LINUX,
 *     Ec2ImagePipeline.Component.DOCKER_CE_LINUX
 *   ]
 * });
 * new CfnOutput(this, 'ImagePipelineAmi', { value: pipeline.latestAmi! });
 */
export class Ec2ImagePipeline extends Construct {
    private readonly _latestAmi: string | undefined;
    private readonly _buildConfigured: boolean;

    /**
     * The Image Pipeline ARN that gets created.
     */
    public readonly imagePipelineArn: string;

    /**
     * The Image Pipeline Topic that gets created.
     */
    public readonly imagePipelineTopic: ITopic;

    /**
     * The latest AMI built by the pipeline. NOTE: You must have enabled the
     * Build Configuration option to wait for image build completion for this
     * property to be available.
     */
    public get latestAmi(): string | undefined {
        if (!this._buildConfigured) {
            throw new Ec2ImagePipelineBuildError();
        }
        return this._latestAmi;
    }

    /**
     * An EC2 Image Pipeline that can be used to build a Amazon Machine Image
     * (AMI) automatically.
     *
     * @param scope The scope in which to define this construct
     * @param id The scoped construct ID
     * @param props Configuration properties
     */
    constructor(scope: Construct, id: string, props: Ec2ImagePipelineProps) {
        super(scope, id);

        validate(props.version, ValidationTypes.SEMVER);

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
            masterKey: props?.encryption,
            enforceSSL: true
        });
        topic.addToResourcePolicy(
            new PolicyStatement({
                effect: Effect.DENY,
                principals: [new AnyPrincipal()],
                actions: ['sns:Publish'],
                resources: [topic.topicArn],
                conditions: {
                    Bool: {
                        'aws:SecureTransport': 'false'
                    }
                }
            })
        );

        // Encryption
        if (props.encryption) {
            props.encryption.grantEncryptDecrypt(
                new ArnPrincipal(
                    `arn:${Aws.PARTITION}:iam::${Aws.ACCOUNT_ID}:role/aws-service-role/imagebuilder.amazonaws.com/AWSServiceRoleForImageBuilder`
                )
            );
        }

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
            } else {
                // Handle the CfnComponent
                formattedComponents.push({
                    componentArn: (component as CfnComponent).attrArn
                });
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

        this._buildConfigured = false;
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
                    : props.version,
                encryption: props.encryption,
                lambdaConfiguration: props.lambdaConfiguration
            });

            if (props.buildConfiguration.waitForCompletion) {
                const image = new Ec2ImageBuilderGetImage(this, 'GetImage', {
                    imageBuildVersionArn: imageBuild.imageBuildVersionArn,
                    lambdaConfiguration: {
                        vpc: props.lambdaConfiguration?.vpc,
                        subnets: props.lambdaConfiguration?.subnets
                    }
                });
                image.node.addDependency(imageBuild);

                this._latestAmi = image.ami;
                this._buildConfigured = true;
            }
        }

        this.imagePipelineTopic = topic;
        this.imagePipelineArn = imagePipeline.attrArn;
    }
}

export namespace Ec2ImagePipeline {
    /** Image Builder Component */
    export enum Component {
        /** Installs the latest version of the Amazon CloudWatch agent. This component installs only the agent. You must take additional steps to configure and use the Amazon CloudWatch agent. For more information, see the documentation at https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Agent-on-EC2-Instance.html. */
        AMAZON_CLOUDWATCH_AGENT_LINUX = 'amazon-cloudwatch-agent-linux',

        /** Installs the latest version of the Amazon CloudWatch agent. This component installs only the agent. You must take additional steps to configure and use the Amazon CloudWatch agent. For more information, see the documentation at https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Agent-on-EC2-Instance.html. */
        AMAZON_CLOUDWATCH_AGENT_WINDOWS = 'amazon-cloudwatch-agent-windows',

        /** Installs Amazon Corretto 11 for Debian-based Linux platforms in accordance with the Amazon Corretto 11 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/generic-linux-install.html. */
        AMAZON_CORRETTO_11_APT_GENERIC = 'amazon-corretto-11-apt-generic',

        /** Installs Amazon Corretto 11 Headless */
        AMAZON_CORRETTO_11_HEADLESS = 'amazon-corretto-11-headless',

        /** Installs Amazon Corretto 11 for RPM-based Linux platforms in accordance with the Amazon Corretto 11 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/generic-linux-install.html. */
        AMAZON_CORRETTO_11_RPM_GENERIC = 'amazon-corretto-11-rpm-generic',

        /** Installs Amazon Corretto 11 for Windows in accordance with the Amazon Corretto 11 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/windows-7-install.html. */
        AMAZON_CORRETTO_11_WINDOWS = 'amazon-corretto-11-windows',

        /** Installs Amazon Corretto 11 */
        AMAZON_CORRETTO_11 = 'amazon-corretto-11',

        /** Installs Amazon Corretto 17 Headless */
        AMAZON_CORRETTO_17_HEADLESS = 'amazon-corretto-17-headless',

        /** Installs Amazon Corretto 17 JDK in accordance with the Amazon Corretto 17 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/linux-info.html */
        AMAZON_CORRETTO_17_JDK = 'amazon-corretto-17-jdk',

        /** Installs Amazon Corretto 17 JRE */
        AMAZON_CORRETTO_17_JRE = 'amazon-corretto-17-jre',

        /** Installs Amazon Corretto 17 for Windows in accordance with the Amazon Corretto 17 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/windows-7-install.html. */
        AMAZON_CORRETTO_17_WINDOWS = 'amazon-corretto-17-windows',

        /** Installs Amazon Corretto 21 Headless */
        AMAZON_CORRETTO_21_HEADLESS = 'amazon-corretto-21-headless',

        /** Installs Amazon Corretto 21 JDK in accordance with the Amazon Corretto 21 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-21-ug/linux-info.html */
        AMAZON_CORRETTO_21_JDK = 'amazon-corretto-21-jdk',

        /** Installs Amazon Corretto 21 JRE */
        AMAZON_CORRETTO_21_JRE = 'amazon-corretto-21-jre',

        /** Installs Amazon Corretto 21 for Windows in accordance with the Amazon Corretto 21 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-21-ug/windows-10-install.html. */
        AMAZON_CORRETTO_21_WINDOWS = 'amazon-corretto-21-windows',

        /** Installs Amazon Corretto 8 for Debian-based Linux platforms in accordance with the Amazon Corretto 8 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/generic-linux-install.html. */
        AMAZON_CORRETTO_8_APT_GENERIC = 'amazon-corretto-8-apt-generic',

        /** Installs Amazon Corretto 8 JDK. */
        AMAZON_CORRETTO_8_JDK = 'amazon-corretto-8-jdk',

        /** Installs Amazon Corretto 8 JRE. */
        AMAZON_CORRETTO_8_JRE = 'amazon-corretto-8-jre',

        /** Installs Amazon Corretto 8 for RPM-based Linux platforms in accordance with the Amazon Corretto 8 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/generic-linux-install.html. */
        AMAZON_CORRETTO_8_RPM_GENERIC = 'amazon-corretto-8-rpm-generic',

        /** Installs Amazon Corretto 8 for Windows in accordance with the Amazon Corretto 8 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/windows-7-install.html. */
        AMAZON_CORRETTO_8_WINDOWS = 'amazon-corretto-8-windows',

        /** Installs the latest version of Amazon Kinesis Agent for Windows. */
        AMAZON_KINESIS_AGENT_WINDOWS = 'amazon-kinesis-agent-windows',

        /** Installs the Anaconda distribution and environments for Tensorflow, PyTorch, and MXNet. */
        ANACONDA_WINDOWS = 'anaconda-windows',

        /** Installs the latest version of Apache Tomcat and the JRE, sets required environment variables, and schedules Tomcat to run on startup. */
        APACHE_TOMCAT_9_LINUX = 'apache-tomcat-9-linux',

        /** Tests whether the apt package manager is functioning correctly. */
        APT_REPOSITORY_TEST_LINUX = 'apt-repository-test-linux',

        /** Installs the latest version of the AWS CLI version 2, and creates the symlink /usr/bin/aws that points to the installed application. For more information, see https://docs.aws.amazon.com/cli/latest/userguide/. */
        AWS_CLI_VERSION_2_LINUX = 'aws-cli-version-2-linux',

        /** Installs the latest version of the AWS CLI version 2. For more information, review the user guide at https://docs.aws.amazon.com/cli/latest/userguide/. */
        AWS_CLI_VERSION_2_WINDOWS = 'aws-cli-version-2-windows',

        /** Installs the latest version of the AWS CodeDeploy agent. This component installs only the agent. You must take additional steps to configure and use the AWS CodeDeploy agent. For more information, see the documentation at https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html. */
        AWS_CODEDEPLOY_AGENT_LINUX = 'aws-codedeploy-agent-linux',

        /** Installs the latest version of the AWS CodeDeploy agent. This component installs only the agent. You must take additional steps to configure and use the agent. For more information, see the documentation at https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install-windows.html. */
        AWS_CODEDEPLOY_AGENT_WINDOWS = 'aws-codedeploy-agent-windows',

        /** Installs the AwsVssComponents Distributor package on a Windows instance. The instance must have an AWS Tools for PowerShell version that includes Systems Manager modules installed. The IAM profile attached to the build instance must have the following permissions - configure the ssm:SendCommand permission with the AWS-ConfigureAWSPackage Systems Manager document on all instances in the Region, and configure the ssm:GetCommandInvocation permission for '*'. For more information, see the documentation at https://docs.aws.amazon.com/imagebuilder/latest/userguide/mgdcomponent-distributor-win.html and https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/application-consistent-snapshots.html. */
        AWS_VSS_COMPONENTS_WINDOWS = 'aws-vss-components-windows',

        /** Installs Chocolatey for Windows. */
        CHOCOLATEY = 'chocolatey',

        /** Validates the Chrony configuration file and ensures that Chrony time sources on Amazon Linux 2 are configured for the Amazon time servers. Uses validation steps outlined here: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/set-time.html. */
        CHRONY_TIME_CONFIGURATION_TEST = 'chrony-time-configuration-test',

        /** Install and configure the latest NICE DCV server on Linux. */
        DCV_SERVER_LINUX = 'dcv-server-linux',

        /** Install and configure the latest NICE DCV server on Windows. */
        DCV_SERVER_WINDOWS = 'dcv-server-windows',

        /** Installs a Distributor package on a Windows instance. The instance must have an AWS Tools for PowerShell version that includes Systems Manager modules installed. The IAM profile attached to the build instance must have the following permissions - configure the ssm:SendCommand permission with the AWS-ConfigureAWSPackage Systems Manager document on all instances in the Region, and configure the ssm:GetCommandInvocation permission for '*'. For more information, see the documentation at https://docs.aws.amazon.com/imagebuilder/latest/userguide/mgdcomponent-distributor-win.html. */
        DISTRIBUTOR_PACKAGE_WINDOWS = 'distributor-package-windows',

        /** Installs Docker Community Edition from the Docker package repository, and enables the centos user to manage Docker without using sudo. For more information, review the installation guide at https://docs.docker.com/install/linux/docker-ce/centos/. */
        DOCKER_CE_CENTOS = 'docker-ce-centos',

        /** Install the latest Docker Community Edition from Amazon Linux Extras, and enable the ec2-user user to manage docker without using sudo. */
        DOCKER_CE_LINUX = 'docker-ce-linux',

        /** Installs Docker Community Edition from the Docker package repository, and enables the ubuntu user to manage Docker without using sudo. For more information, review the installation guide at https://docs.docker.com/install/linux/docker-ce/ubuntu/. */
        DOCKER_CE_UBUNTU = 'docker-ce-ubuntu',

        /** Installs the latest 8.0 channel release of the Microsoft .NET Desktop Runtime. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0. */
        DOTNET_DESKTOP_RUNTIME_LTS_WINDOWS = 'dotnet-desktop-runtime-lts-windows',

        /** Installs the latest 8.0 channel release of the Microsoft .NET Hosting Bundle. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0. */
        DOTNET_HOSTING_BUNDLE_LTS_WINDOWS = 'dotnet-hosting-bundle-lts-windows',

        /** Installs the latest 8.0 channel release of the Microsoft .NET Runtime. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0. */
        DOTNET_RUNTIME_LTS_LINUX = 'dotnet-runtime-lts-linux',

        /** Installs the latest 8.0 channel release of the Microsoft .NET Runtime. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0. */
        DOTNET_RUNTIME_LTS_WINDOWS = 'dotnet-runtime-lts-windows',

        /** Installs the latest 8.0 channel release of the Microsoft .NET SDK. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0. */
        DOTNET_SDK_LTS_LINUX = 'dotnet-sdk-lts-linux',

        /** Installs the latest 8.0 channel release of the Microsoft .NET SDK. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0. */
        DOTNET_SDK_LTS_WINDOWS = 'dotnet-sdk-lts-windows',

        /** The EBS volume usage test performs the following actions: 1) It creates an EBS volume and attaches it to the instance. 2) It creates a temporary file on the volume and detaches the volume. 3) It reattaches the volume and validates that the file exists. 4) It detaches and deletes the volume. To perform this test, an IAM policy with the following actions is required: ec2:AttachVolume, ec2:Create Tags, ec2:CreateVolume, ec2:DeleteVolume, ec2:DescribeVolumes, and ec2:DetachVolume. */
        EBS_VOLUME_USAGE_TEST_LINUX = 'ebs-volume-usage-test-linux',

        /** The EBS volume usage test performs the following actions: 1) It creates an EBS volume and attaches it to the instance. 2) It creates a temporary file on the volume and detaches the volume. 3) It reattaches the volume and validates that the file exists. 4) It detaches and deletes the volume. To perform this test, an IAM policy with the following actions is required: ec2:AttachVolume, ec2:Create Tags, ec2:CreateVolume, ec2:DeleteVolume, ec2:DescribeVolumes, and ec2:DetachVolume. */
        EBS_VOLUME_USAGE_TEST_WINDOWS = 'ebs-volume-usage-test-windows',

        /** Test to ensure all required EC2 network routes exist in the route table. */
        EC2_NETWORK_ROUTE_TEST_WINDOWS = 'ec2-network-route-test-windows',

        /** Installs the latest version of EC2Launch v2. For more information, see the documentation at https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/ec2launch-v2.html. */
        EC2LAUNCH_V2_WINDOWS = 'ec2launch-v2-windows',

        /** Installs Amazon ECS-optimized Windows artifacts. This includes latest Amazon ECS Container Agent and Docker CE version 20.10.21. */
        ECS_OPTIMIZED_AMI_WINDOWS = 'ecs-optimized-ami-windows',

        /** Installs Amazon EKS-optimized Windows artifacts for Amazon EKS version 1.32. This includes kubelet version 1.32.0, containerd version 1.7.20, and CSI Proxy version 1.1.2. */
        EKS_OPTIMIZED_AMI_WINDOWS = 'eks-optimized-ami-windows',

        /** The ENI attachment test performs the following actions: 1) It creates an elastic network interface (ENI) and attaches it to the instance. 2) It validates that the attached ENI has an IP address. 3) It detaches and deletes the ENI. To perform this test, an IAM policy with the following actions is required: ec2:AttachNetworkInterface, ec2:CreateNetworkInterface, ec2:CreateTags, ec2:DeleteNetworkInterface, ec2:DescribeNetworkInterfaces, ec2:DescribeNetworkInterfaceAttribute, and ec2:DetachNetworkInterface. */
        ENI_ATTACHMENT_TEST_LINUX = 'eni-attachment-test-linux',

        /** The ENI attachment test performs the following actions: 1) It creates an elastic network interface (ENI) and attaches it to the instance. 2) It validates that the attached ENI has an IP address. 3) It detaches and deletes the ENI. To perform this test, an IAM policy with the following actions is required: ec2:AttachNetworkInterface, ec2:CreateNetworkInterface, ec2:CreateTags, ec2:DeleteNetworkInterface, ec2:DescribeNetworkInterfaces, ec2:DescribeNetworkInterfaceAttribute, and ec2:DetachNetworkInterface. */
        ENI_ATTACHMENT_TEST_WINDOWS = 'eni-attachment-test-windows',

        /** Installs the latest stable release of the Go programming language using the release information from https://go.dev/dl/. */
        GO_STABLE_LINUX = 'go-stable-linux',

        /** Installs the latest stable release of the Go programming language using the release information from https://go.dev/dl/. */
        GO_STABLE_WINDOWS = 'go-stable-windows',

        /** Hello world testing document for Linux. */
        HELLO_WORLD_LINUX = 'hello-world-linux',

        /** Hello world testing document for Windows. */
        HELLO_WORLD_WINDOWS = 'hello-world-windows',

        /** Performs a Center for Internet Security (CIS) security assessment for an instance, using Amazon Inspector (Inspector). This component performs the following actions: 1) It installs the Inspector agent. 2) It creates a resource group, assessment target, and assessment template. 3) It runs the assessment and provides a link to the results in the logs and on the Inspector Service console. In order to run successfully, this component requires that the AmazonInspectorFullAccess IAM policy and the ssm:SendCommand and ec2:CreateTags IAM permissions are attached to the instance profile. To find the list of supported Operating Systems and their rules packages, refer to the Inspector documentation https://docs.aws.amazon.com/inspector/v1/userguide/inspector_rule-packages_across_os.html. */
        INSPECTOR_TEST_LINUX = 'inspector-test-linux',

        /** Performs a Center for Internet Security (CIS) security assessment for an instance, using Amazon Inspector (Inspector). This component performs the following actions: 1) It installs the Inspector agent. 2) It creates a resource group, assessment target, and assessment template. 3) It runs the assessment and provides a link to the results in the logs and on the Inspector Service console. In order to run successfully, this component requires that the AmazonInspectorFullAccess IAM policy and the ssm:SendCommand and ec2:CreateTags IAM permissions are attached to the instance profile. To find the list of supported Operating Systems and their rules packages, refer to the Inspector documentation https://docs.aws.amazon.com/inspector/v1/userguide/inspector_rule-packages_across_os.html. */
        INSPECTOR_TEST_WINDOWS = 'inspector-test-windows',

        /** Installs a package from the Linux repository. */
        INSTALL_PACKAGE_FROM_REPOSITORY = 'install-package-from-repository',

        /** Installs the MariaDB package using apt, yum, or zypper. */
        MARIADB_LINUX = 'mariadb-linux',

        /** Installs the MATE Desktop Environment, xrdp, TigerVNC server, and enables the xrdp service. */
        MATE_DE_LINUX = 'mate-de-linux',

        /** Installs the latest version of the Mono framework. Follows the instructions found at https://www.mono-project.com/. */
        MONO_LINUX = 'mono-linux',

        /** Installs PHP 8.2. */
        PHP_8_2_LINUX = 'php-8_2-linux',

        /** Installs the latest LTS 7.4 release of PowerShell following the instructions at https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-linux?view=powershell-7.4. */
        POWERSHELL_LTS_LINUX = 'powershell-lts-linux',

        /** Installs the latest LTS 7.4 release of PowerShell using the MSI installer from the GitHub repository located at https://github.com/PowerShell/PowerShell. */
        POWERSHELL_LTS_WINDOWS = 'powershell-lts-windows',

        /** Installs the latest version of PowerShell using snap. */
        POWERSHELL_SNAP = 'powershell-snap',

        /** Installs the latest version of PowerShell from the Microsoft RedHat repository. */
        POWERSHELL_YUM = 'powershell-yum',

        /** Installs the latest version of PuTTY from the 64-bit MSI link on the release page: https://the.earth.li/~sgtatham/putty/latest/w64/. */
        PUTTY = 'PuTTY',

        /** Installs the Python 3 package using apt, yum, or zypper. */
        PYTHON_3_LINUX = 'python-3-linux',

        /** Installs Python 3.8.2 for Windows. */
        PYTHON_3_WINDOWS = 'python-3-windows',

        /** Reboots the system. */
        REBOOT_LINUX = 'reboot-linux',

        /** Tests whether the system can reboot successfully */
        REBOOT_TEST_LINUX = 'reboot-test-linux',

        /** Tests whether the system can reboot successfully */
        REBOOT_TEST_WINDOWS = 'reboot-test-windows',

        /** Reboots the system. */
        REBOOT_WINDOWS = 'reboot-windows',

        /** Installs and runs SCAP Compliance Checker (SCC) 5.10 for Red Hat Enterprise Linux (RHEL) 7/8, Ubuntu 18.04/20.04/22.04 with all current STIG Q1 2025 benchmarks. SCC supports the AMD64 architecture. Other architectures are not currently supported or contain issues within the EC2 environment. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/toe-stig.html. */
        SCAP_COMPLIANCE_CHECKER_LINUX = 'scap-compliance-checker-linux',

        /** Installs and runs SCAP Compliance Checker (SCC) 5.10 for Windows with all current STIG Q3 2024 benchmarks. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-builder-stig.html. */
        SCAP_COMPLIANCE_CHECKER_WINDOWS = 'scap-compliance-checker-windows',

        /** Executes a simple boot test. */
        SIMPLE_BOOT_TEST_LINUX = 'simple-boot-test-linux',

        /** Executes a simple boot test. */
        SIMPLE_BOOT_TEST_WINDOWS = 'simple-boot-test-windows',

        /** Applies the high, medium, and low severity STIG settings for Red Hat Enterprise Linux (RHEL) to Amazon Linux 2, Amazon Linux 2023, RHEL 7, CentOS Linux 7, CentOS Linux 8, CentOS Stream 9, RHEL 8, RHEL 9, Ubuntu 18.04, Ubuntu 20.04, and Ubuntu 22.04 instances. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/toe-stig.html. */
        STIG_BUILD_LINUX_HIGH = 'stig-build-linux-high',

        /** Applies the low severity STIG settings for Red Hat Enterprise Linux (RHEL) to Amazon Linux 2, Amazon Linux 2023, RHEL 7, CentOS Linux 7, CentOS Linux 8, CentOS Stream 9, RHEL 8, RHEL 9, Ubuntu 18.04, Ubuntu 20.04, and Ubuntu 22.04 instances. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/toe-stig.html. */
        STIG_BUILD_LINUX_LOW = 'stig-build-linux-low',

        /** Applies the medium and low severity STIG settings for Red Hat Enterprise Linux (RHEL) to Amazon Linux 2, Amazon Linux 2023, RHEL 7, CentOS Linux 7, CentOS Linux 8, CentOS Stream 9, RHEL 8, RHEL 9, Ubuntu 18.04, Ubuntu 20.04, and Ubuntu 22.04 instances. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/toe-stig.html. */
        STIG_BUILD_LINUX_MEDIUM = 'stig-build-linux-medium',

        /** Applies the high, medium, and low severity STIG settings to Windows instances. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-builder-stig.html. */
        STIG_BUILD_WINDOWS_HIGH = 'stig-build-windows-high',

        /** Applies the low severity STIG settings to Windows instances. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-builder-stig.html. */
        STIG_BUILD_WINDOWS_LOW = 'stig-build-windows-low',

        /** Applies the medium and low severity STIG settings to Windows instances. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-builder-stig.html. */
        STIG_BUILD_WINDOWS_MEDIUM = 'stig-build-windows-medium',

        /** Installs the Linux kernel 5.* for Amazon Linux 2 from Amazon Linux Extras. */
        UPDATE_LINUX_KERNEL_5 = 'update-linux-kernel-5',

        /** Installs the latest mainline release of the Linux kernel for CentOS 7 and Red Hat Enterprise Linux 7 and 8 via the 'kernel-ml' package from https://www.elrepo.org. */
        UPDATE_LINUX_KERNEL_ML = 'update-linux-kernel-ml',

        /** Updates Linux by installing all available updates via the UpdateOS action module. */
        UPDATE_LINUX = 'update-linux',

        /** Updates Windows with the latest security updates. */
        UPDATE_WINDOWS = 'update-windows',

        /** Ensures the `authorized_keys` file contains only the SSH public key returned from the EC2 Instance Metadata Service. */
        VALIDATE_SINGLE_SSH_PUBLIC_KEY_TEST_LINUX = 'validate-single-ssh-public-key-test-linux',

        /** Verifies whether the SSH host key was generated after the latest boot. */
        VALIDATE_SSH_HOST_KEY_GENERATION_LINUX = 'validate-ssh-host-key-generation-linux',

        /** Ensures the `authorized_keys` file contains the SSH public key returned from the EC2 Instance Metadata Service. */
        VALIDATE_SSH_PUBLIC_KEY_LINUX = 'validate-ssh-public-key-linux',

        /** Verifies the Windows license status in the Common Information Model. */
        WINDOWS_ACTIVATION_TEST = 'windows-activation-test',

        /** Checks the EC2 logs for the statement `Windows is Ready to use` and for the password generation message on Windows Server 2016 and later SKUs. This component does not support instances launched without an EC2 key pair. */
        WINDOWS_IS_READY_WITH_PASSWORD_GENERATION_TEST = 'windows-is-ready-with-password-generation-test',

        /** Installs the Internet Information Services (IIS) web server and management tools. The installation is performed by enabling the Windows features built into the Windows operating system. */
        WINDOWS_SERVER_IIS = 'windows-server-iis',

        /** Tests whether yum repository works successfully */
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
