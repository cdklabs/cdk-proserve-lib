// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Aspects, Stack } from 'aws-cdk-lib';
import { describeCdkTest } from '../../../../utilities/cdk-nag-jest';
import { SecurityCompliance } from '../../../../src/aspects/security-compliance';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Match } from 'aws-cdk-lib/assertions';

describeCdkTest(SecurityCompliance, (_, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();
    });

    describe('S3', () => {
        it('does not apply reserved concurrency if disabled', () => {
            // Arrange
            new Bucket(stack, 'TestBucket');
            Aspects.of(stack).add(
                new SecurityCompliance({
                    settings: {
                        s3: {
                            versioning: {
                                disabled: true
                            }
                        }
                    }
                })
            );

            // Act
            const template = getTemplate();

            // Assert
            template.hasResourceProperties('AWS::S3::Bucket', {
                VersioningConfiguration: Match.absent()
            });
        });
    });
});
