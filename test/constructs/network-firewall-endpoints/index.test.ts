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

import { Stack, Token } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { CfnFirewall } from 'aws-cdk-lib/aws-networkfirewall';
import { mockFirewallName, mockFirewallPolicyArn } from './fixtures';
import { NetworkFirewallEndpoints } from '../../../src/constructs/network-firewall-endpoints';
import {
    getTemplateWithCdkNag,
    validateNoCdkNagFindings
} from '../../../utilities/cdk-nag-jest';
import { mockRegion, mockSubnetId, mockVpcId } from '../../fixtures';

const constructName = 'NetworkFirewallEndpoints';

describe(constructName, () => {
    let stack: Stack;
    let firewall: CfnFirewall;

    beforeEach(() => {
        stack = new Stack();
        firewall = new CfnFirewall(stack, mockFirewallName, {
            firewallName: mockFirewallName,
            firewallPolicyArn: mockFirewallPolicyArn,
            vpcId: mockVpcId,
            subnetMappings: [{ subnetId: mockSubnetId }]
        });
    });

    afterEach(() => {
        validateNoCdkNagFindings(stack, constructName);
    });

    it('creates AWS Custom Resource', () => {
        new NetworkFirewallEndpoints(stack, constructName, {
            firewall: firewall
        });

        const template = getTemplateWithCdkNag(stack);
        template.hasResourceProperties('Custom::AWS', {
            ServiceToken: {
                'Fn::GetAtt': [Match.stringLikeRegexp('AWS'), 'Arn']
            },
            Create: Match.stringLikeRegexp(constructName),
            Update: Match.stringLikeRegexp(constructName)
        });
    });

    it('adds dependency on firewall', () => {
        new NetworkFirewallEndpoints(stack, constructName, {
            firewall: firewall
        });

        const template = getTemplateWithCdkNag(stack);
        template.hasResource('Custom::AWS', {
            DependsOn: [Match.anyValue(), mockFirewallName]
        });
    });

    it('uses custom Lambda configuration when provided', () => {
        const vpc = new Vpc(stack, 'TestVpc');

        new NetworkFirewallEndpoints(stack, constructName, {
            firewall: firewall,
            lambdaConfiguration: {
                vpc: vpc
            }
        });

        const template = getTemplateWithCdkNag(stack);
        template.hasResourceProperties('AWS::Lambda::Function', {
            VpcConfig: Match.anyValue()
        });
    });

    it('getEndpointId returns an unresolved token', () => {
        const endpoints = new NetworkFirewallEndpoints(stack, constructName, {
            firewall: firewall
        });

        const endpointId = endpoints.getEndpointId(mockRegion);

        expect(Token.isUnresolved(endpointId)).toEqual(true);
    });
});
