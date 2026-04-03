// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as cdk from 'aws-cdk-lib';
import { Ec2LinuxStigImagePipelineStack } from '../lib/ec2-linux-stig-image-pipeline';

const app = new cdk.App();

new Ec2LinuxStigImagePipelineStack(app, 'Ec2LinuxStigImagePipelineStack');
