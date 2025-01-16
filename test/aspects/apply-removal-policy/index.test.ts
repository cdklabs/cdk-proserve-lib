// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Key } from 'aws-cdk-lib/aws-kms';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { ApplyRemovalPolicy } from '../../../src/aspects/apply-removal-policy';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';

describeCdkTest(ApplyRemovalPolicy, (_, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();
    });

    it('should set removal policy on resource', () => {
        // Arrange
        const key = new Key(stack, 'Key', { enableKeyRotation: true });
        new LogGroup(stack, 'LogGroup', { encryptionKey: key });

        // Act
        Aspects.of(stack).add(
            new ApplyRemovalPolicy({ removalPolicy: RemovalPolicy.DESTROY })
        );

        // Assert
        const template = getTemplate();
        template.hasResource('AWS::Logs::LogGroup', {
            DeletionPolicy: 'Delete',
            UpdateReplacePolicy: 'Delete'
        });
    });
});
