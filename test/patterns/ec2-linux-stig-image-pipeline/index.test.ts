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

import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Ec2ImagePipeline } from '../../../src/constructs/ec2-image-pipeline';
import { Ec2LinuxImagePipeline } from '../../../src/patterns/ec2-linux-image-pipeline';
import { FeatureError } from '../../../src/patterns/ec2-linux-image-pipeline/types/exception';
import {
    getTemplateWithCdkNag,
    validateNoCdkNagFindings
} from '../../../utilities/cdk-nag-jest';

const constructName = 'Ec2LinuxStigImagePipeline';

describe(constructName, () => {
    let stack: Stack;

    beforeEach(() => {
        stack = new Stack(undefined, undefined, {
            env: {
                account: '123456789012',
                region: 'us-east-1'
            }
        });
    });

    afterEach(() => {
        validateNoCdkNagFindings(stack, constructName);
    });

    it('creates pipeline with default settings', () => {
        // Act
        new Ec2LinuxImagePipeline(stack, constructName, {
            version: '0.1.0',
            features: [
                Ec2LinuxImagePipeline.Feature.AWS_CLI,
                Ec2LinuxImagePipeline.Feature.STIG
            ]
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

        template.hasResourceProperties('AWS::ImageBuilder::ImagePipeline', {
            Name: Match.stringLikeRegexp(constructName)
        });

        template.hasResourceProperties('AWS::ImageBuilder::ImageRecipe', {
            Components: [
                {
                    ComponentArn: {
                        'Fn::Join': [
                            '',
                            [
                                'arn:',
                                { Ref: 'AWS::Partition' },
                                ':imagebuilder:',
                                { Ref: 'AWS::Region' },
                                ':aws:component/update-linux/x.x.x'
                            ]
                        ]
                    }
                },
                {
                    ComponentArn: {
                        'Fn::Join': [
                            '',
                            [
                                'arn:',
                                { Ref: 'AWS::Partition' },
                                ':imagebuilder:',
                                { Ref: 'AWS::Region' },
                                ':aws:component/aws-cli-version-2-linux/x.x.x'
                            ]
                        ]
                    }
                },
                {
                    ComponentArn: {
                        'Fn::Join': [
                            '',
                            [
                                'arn:',
                                { Ref: 'AWS::Partition' },
                                ':imagebuilder:',
                                { Ref: 'AWS::Region' },
                                ':aws:component/stig-build-linux-high/x.x.x'
                            ]
                        ]
                    }
                }
            ]
        });
    });

    it('uses correct machine image for Amazon Linux 2023', () => {
        // Act
        new Ec2LinuxImagePipeline(stack, constructName, {
            version: '0.1.0',
            operatingSystem:
                Ec2LinuxImagePipeline.OperatingSystem.AMAZON_LINUX_2023
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

        template.hasResourceProperties('AWS::ImageBuilder::ImageRecipe', {
            ParentImage: {
                Ref: Match.stringLikeRegexp('amazonlinuxlatestal2023ami')
            }
        });
    });

    it('uses correct machine image for Red Hat Enterprise Linux 8.9', () => {
        // Act
        new Ec2LinuxImagePipeline(stack, constructName, {
            version: '0.1.0',
            operatingSystem:
                Ec2LinuxImagePipeline.OperatingSystem
                    .RED_HAT_ENTERPRISE_LINUX_8_9
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

        template.hasResourceProperties('AWS::ImageBuilder::ImageRecipe', {
            ParentImage: 'ami-1234'
        });
    });

    it('adds SCAP Compliance Checker for compatible OS', () => {
        // Act
        new Ec2LinuxImagePipeline(stack, constructName, {
            version: '0.1.0',
            operatingSystem:
                Ec2LinuxImagePipeline.OperatingSystem
                    .RED_HAT_ENTERPRISE_LINUX_8_9,
            features: [Ec2LinuxImagePipeline.Feature.SCAP]
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);
        template.hasResourceProperties('AWS::ImageBuilder::ImageRecipe', {
            Components: [
                {},
                {
                    ComponentArn: {
                        'Fn::Join': [
                            '',
                            [
                                'arn:',
                                { Ref: 'AWS::Partition' },
                                ':imagebuilder:',
                                { Ref: 'AWS::Region' },
                                ':aws:component/scap-compliance-checker-linux/x.x.x'
                            ]
                        ]
                    }
                }
            ]
        });
    });

    it('sets correct root volume size', () => {
        // Act
        new Ec2LinuxImagePipeline(stack, constructName, {
            version: '0.1.0',
            rootVolumeSize: 20
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

        template.hasResourceProperties('AWS::ImageBuilder::ImageRecipe', {
            BlockDeviceMappings: [
                {
                    DeviceName: '/dev/xvda',
                    Ebs: {
                        VolumeSize: 20
                    }
                }
            ]
        });
    });

    it('adds extra components', () => {
        // Act
        new Ec2LinuxImagePipeline(stack, constructName, {
            version: '0.1.0',
            extraComponents: [
                Ec2ImagePipeline.Component.AMAZON_CLOUDWATCH_AGENT_LINUX
            ]
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

        template.hasResourceProperties('AWS::ImageBuilder::ImageRecipe', {
            Components: [
                {},
                {},
                {
                    ComponentArn: {
                        'Fn::Join': [
                            '',
                            [
                                'arn:',
                                { Ref: 'AWS::Partition' },
                                ':imagebuilder:',
                                { Ref: 'AWS::Region' },
                                ':aws:component/amazon-cloudwatch-agent-linux/x.x.x'
                            ]
                        ]
                    }
                },
                {}
            ]
        });
    });

    it('adds extra device mappings', () => {
        // Act
        new Ec2LinuxImagePipeline(stack, constructName, {
            version: '0.1.0',
            extraDeviceMappings: [
                {
                    deviceName: '/dev/sdb',
                    ebs: {
                        volumeSize: 100
                    }
                }
            ]
        });

        // Assert
        const template = getTemplateWithCdkNag(stack);

        template.hasResourceProperties('AWS::ImageBuilder::ImageRecipe', {
            BlockDeviceMappings: [
                {
                    DeviceName: '/dev/xvda',
                    Ebs: {
                        VolumeSize: 10
                    }
                },
                {
                    DeviceName: '/dev/sdb',
                    Ebs: {
                        VolumeSize: 100
                    }
                }
            ]
        });
    });

    it('adds nice dcv feature for compatible operating systems', () => {
        new Ec2LinuxImagePipeline(stack, constructName, {
            version: '0.1.0',
            operatingSystem:
                Ec2LinuxImagePipeline.OperatingSystem.AMAZON_LINUX_2,
            features: [Ec2LinuxImagePipeline.Feature.NICE_DCV]
        });

        const template = getTemplateWithCdkNag(stack);

        // Check if the NiceDcvPrereqs component is created
        template.hasResourceProperties('AWS::ImageBuilder::Component', {
            Name: 'nice-dcv-prereqs'
        });

        template.hasResourceProperties('AWS::ImageBuilder::ImageRecipe', {
            Components: [
                {}, // linux updates
                {
                    ComponentArn: {
                        'Fn::GetAtt': [
                            Match.stringLikeRegexp(constructName),
                            'Arn'
                        ]
                    }
                },
                {
                    ComponentArn: {
                        'Fn::Join': [
                            '',
                            [
                                'arn:',
                                { Ref: 'AWS::Partition' },
                                ':imagebuilder:',
                                { Ref: 'AWS::Region' },
                                ':aws:component/dcv-server-linux/x.x.x'
                            ]
                        ]
                    }
                }
            ]
        });
    });

    it('throws error for incompatible operating systems', () => {
        expect(() => {
            new Ec2LinuxImagePipeline(stack, constructName, {
                version: '0.1.0',
                operatingSystem:
                    Ec2LinuxImagePipeline.OperatingSystem.AMAZON_LINUX_2023,
                features: [Ec2LinuxImagePipeline.Feature.NICE_DCV]
            });
        }).toThrow(FeatureError);
    });
});
