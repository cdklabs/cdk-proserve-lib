// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as cdk from 'aws-cdk-lib';
import { AosDomainStack } from '../lib/aos-domain-stack';
import { AosProvisionAndFlowStack } from '../lib/aos-provision-and-flow-stack';

const app = new cdk.App();
const aosDomainStack = new AosDomainStack(app, 'AosDomainStack8');
// new AosProvisionAndFlowStack(app, 'AosProvisionAndFlowStack4', {
//     domain: aosDomainStack.domain,
//     domainAdminRole: aosDomainStack.domainAdminRole
// });
