// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as cdk from 'aws-cdk-lib';
import { AosProvisionAndFlowStack } from '../lib/aos-provision-and-flow-stack';

const app = new cdk.App();
new AosProvisionAndFlowStack(app, 'AosProvisionAndFlowStack');
