// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { buildMockArn, mockAccount, mockRegion } from '../../../fixtures';

/**
 * Mock Firewall Name
 */
export const mockFirewallName = 'TestFirewall';

/**
 * Mock Firewall Policy ARN
 */
export const mockFirewallPolicyArn = buildMockArn(
    'aws',
    'network-firewall',
    'firewall-policy/test-policy',
    mockRegion,
    mockAccount
);
