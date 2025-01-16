// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack, Token } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { CfnFirewall } from 'aws-cdk-lib/aws-networkfirewall';
import { mockFirewallName, mockFirewallPolicyArn } from './fixtures';
import { NetworkFirewallEndpoints } from '../../../src/constructs/network-firewall-endpoints';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';
import { mockRegion, mockSubnetId, mockVpcId } from '../../fixtures';

describeCdkTest(NetworkFirewallEndpoints, (id, getStack, getTemplate) => {
    let stack: Stack;
    let firewall: CfnFirewall;

    beforeEach(() => {
        stack = getStack();
        firewall = new CfnFirewall(stack, mockFirewallName, {
            firewallName: mockFirewallName,
            firewallPolicyArn: mockFirewallPolicyArn,
            vpcId: mockVpcId,
            subnetMappings: [{ subnetId: mockSubnetId }]
        });
    });

    it('creates AWS Custom Resource', () => {
        new NetworkFirewallEndpoints(stack, id, {
            firewall: firewall
        });

        const template = getTemplate();
        template.hasResourceProperties('Custom::AWS', {
            ServiceToken: {
                'Fn::GetAtt': [Match.stringLikeRegexp('AWS'), 'Arn']
            },
            Create: Match.stringLikeRegexp(id),
            Update: Match.stringLikeRegexp(id)
        });
    });

    it('adds dependency on firewall', () => {
        new NetworkFirewallEndpoints(stack, id, {
            firewall: firewall
        });

        const template = getTemplate();
        template.hasResource('Custom::AWS', {
            DependsOn: [Match.anyValue(), mockFirewallName]
        });
    });

    it('uses custom Lambda configuration when provided', () => {
        const vpc = new Vpc(stack, 'TestVpc');

        new NetworkFirewallEndpoints(stack, id, {
            firewall: firewall,
            lambdaConfiguration: {
                vpc: vpc
            }
        });

        const template = getTemplate();
        template.hasResourceProperties('AWS::Lambda::Function', {
            VpcConfig: Match.anyValue()
        });
    });

    it('getEndpointId returns an unresolved token', () => {
        const endpoints = new NetworkFirewallEndpoints(stack, id, {
            firewall: firewall
        });

        const endpointId = endpoints.getEndpointId(mockRegion);

        expect(Token.isUnresolved(endpointId)).toEqual(true);
    });
});
