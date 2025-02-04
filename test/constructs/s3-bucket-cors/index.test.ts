// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { PolicyProperties } from 'cloudform-types/types/iam/policy';
import { FunctionProperties } from 'cloudform-types/types/lambda/function';
import {
    mockAlternateAwsRegion,
    mockCORSRule,
    mockExistingS3BucketName,
    mockInfrastructureCORSRule,
    resourceType
} from './fixtures';
import { S3BucketCors } from '../../../src/constructs/s3-bucket-cors';
import { AllRulesMustHaveUniqueIdsException } from '../../../src/constructs/s3-bucket-cors/types/exceptions';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';

const bucketElementName = 'TestBucket';

describeCdkTest(S3BucketCors, (id, getStack, getTemplate) => {
    let stack: Stack;
    let bucket: Bucket;

    beforeEach(() => {
        stack = getStack();
        bucket = new Bucket(stack, bucketElementName, {
            bucketName: mockExistingS3BucketName
        });
    });

    it('creates custom resource handler with the correct properties', () => {
        // Arrange
        // No action

        // Act
        new S3BucketCors(stack, id, {
            bucket: bucket,
            corsRules: [mockInfrastructureCORSRule]
        });

        // Assert
        const template = getTemplate();

        const lambdaResourceProperties: Partial<FunctionProperties> = {
            Handler: 'index.handler',
            ReservedConcurrentExecutions: 5,
            Runtime: 'nodejs22.x',
            Timeout: 60,
            MemorySize: 512
        };

        template.hasResourceProperties(
            'AWS::Lambda::Function',
            lambdaResourceProperties
        );
    });

    it('creates custom resource with correct properties for a bucket in the same region', () => {
        // Arrange
        // No action

        // Act
        new S3BucketCors(stack, id, {
            bucket: bucket,
            corsRules: [mockInfrastructureCORSRule]
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties(resourceType, {
            ServiceToken: {
                'Fn::GetAtt': Match.anyValue()
            },
            BucketName: {
                Ref: Match.stringLikeRegexp(bucketElementName)
            },
            Rules: [mockCORSRule]
        });
    });

    it('creates custom resource with correct properties for a bucket in a different region', () => {
        // Arrange
        // No action

        // Act
        new S3BucketCors(stack, id, {
            bucket: bucket,
            corsRules: [mockInfrastructureCORSRule],
            region: mockAlternateAwsRegion
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties(resourceType, {
            ServiceToken: {
                'Fn::GetAtt': Match.anyValue()
            },
            BucketName: {
                Ref: Match.stringLikeRegexp(bucketElementName)
            },
            Region: mockAlternateAwsRegion,
            Rules: [mockCORSRule]
        });
    });

    it('validates that all provided CORS rules are unique', async () => {
        // Arrange
        // No action

        // Act
        const test = new Promise<void>((resolve, _reject) => {
            new S3BucketCors(stack, id, {
                bucket: bucket,
                corsRules: [
                    mockInfrastructureCORSRule,
                    mockInfrastructureCORSRule
                ]
            });

            resolve();
        });

        // Assert
        await expect(test).rejects.toThrow(AllRulesMustHaveUniqueIdsException);
    });

    it('grants necessary permissions to Lambda function', () => {
        // Arrange
        // No action

        // Act
        new S3BucketCors(stack, id, {
            bucket: bucket,
            corsRules: [mockInfrastructureCORSRule]
        });

        // Assert
        const template = getTemplate();
        console.log(JSON.stringify(template));

        const iamPolicyProperties: Partial<PolicyProperties> = {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: ['s3:GetBucketCORS', 's3:PutBucketCORS'],
                        Effect: 'Allow',
                        Resource: {
                            'Fn::GetAtt': [
                                Match.stringLikeRegexp(bucketElementName),
                                'Arn'
                            ]
                        }
                    })
                ])
            }
        };

        template.hasResourceProperties('AWS::IAM::Policy', iamPolicyProperties);
    });

    it('creates encrypted resources with provided key', () => {
        // Arrange
        const encryptionElementName = 'TestEncryptionKey';
        const encryption = new Key(stack, encryptionElementName);

        // Act
        new S3BucketCors(stack, id, {
            bucket: bucket,
            corsRules: [mockInfrastructureCORSRule],
            encryption: encryption
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties('AWS::Lambda::Function', {
            KmsKeyArn: {
                'Fn::GetAtt': [
                    Match.stringLikeRegexp(encryptionElementName),
                    'Arn'
                ]
            }
        });
    });
});
