// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as cdk from 'aws-cdk-lib';
import { EgressNetworkFirewallStack } from '../lib/egress-network-firewall-stack';

const app = new cdk.App();
const account = app.node.tryGetContext('account');
const region = app.node.tryGetContext('region');

if (!account || !region) {
    throw new Error(
        'Account and Region must be provided via CDK context. Use --context account=123456789012 --context region=us-east-1 or set in cdk.json'
    );
}

new EgressNetworkFirewallStack(app, 'EgressNetworkFirewallStack', {
    env: {
        account,
        region
    }
});
