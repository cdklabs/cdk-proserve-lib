// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Role } from 'aws-cdk-lib/aws-iam';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Domain } from 'aws-cdk-lib/aws-opensearchservice';
import { NagSuppressions } from 'cdk-nag';
import { PolicyProperties } from 'cloudform-types/types/iam/policy';
import { FunctionProperties } from 'cloudform-types/types/lambda/function';
import { beforeEach, it } from 'vitest';
import { OpenSearchProvisionDomain } from '../../../src/constructs';
import { DestructiveOperation } from '../../../src/types';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';
import { buildMockArn, mockAccount, mockRegion } from '../../fixtures';

describeCdkTest(OpenSearchProvisionDomain, (id, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();

        NagSuppressions.addStackSuppressions(stack, [
            {
                id: 'AwsSolutions-IAM5',
                reason: 'Permissions are required to allow the CR to pull assets from the CDK asset staging bucket',
                appliesTo: [
                    'Action::s3:GetObject*',
                    'Action::s3:GetBucket*',
                    'Action::s3:List*',
                    'Resource::arn:<AWS::Partition>:s3:::cdk-hnb659fds-assets-123456789012-us-east-1/*'
                ]
            }
        ]);
    });

    it('creates custom resource with correct properties', () => {
        // Arrange
        const domainEndpoint = `test.${mockRegion}.es.amazonaws.com`;
        const roleArn = buildMockArn(
            'aws',
            'iam',
            'role/test',
            mockRegion,
            mockAccount
        );

        const domain = Domain.fromDomainAttributes(stack, 'Domain', {
            domainArn: buildMockArn(
                'aws',
                'es',
                'domain/test',
                mockRegion,
                mockAccount
            ),
            domainEndpoint: domainEndpoint
        });
        const admin = Role.fromRoleArn(stack, 'Role', roleArn);

        // Act
        new OpenSearchProvisionDomain(stack, id, {
            domain: domain,
            domainAdmin: admin,
            provisioningConfigurationPath: 'test',
            allowDestructiveOperations: DestructiveOperation.ALL,
            clusterSettings: {
                persistent: {
                    test: 'true'
                }
            },
            dynamicRoleMappings: {
                '1': ['CN=test', roleArn],
                otherRole: [roleArn]
            }
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties(
            `Custom::${OpenSearchProvisionDomain.name}`,
            {
                ServiceToken: {
                    'Fn::GetAtt': Match.anyValue()
                },
                AdminRoleArn: roleArn,
                AssetS3Uri: Match.stringLikeRegexp('^s3://.*?$'),
                DomainEndpoint: domainEndpoint,
                AllowDestructiveOperations: 'ALL',
                ClusterSettings: {
                    persistent: {
                        test: 'true'
                    }
                },
                DynamicRoleMappings: {
                    '1': ['CN=test', roleArn],
                    otherRole: [roleArn]
                }
            }
        );

        const lambdaResourceProperties: Partial<FunctionProperties> = {
            Handler: 'index.handler',
            ReservedConcurrentExecutions: 5,
            Runtime: 'nodejs22.x',
            Timeout: 300,
            MemorySize: 512
        };

        template.hasResourceProperties(
            'AWS::Lambda::Function',
            lambdaResourceProperties
        );
    });

    it('grants necessary permissions to Lambda function', () => {
        // Arrange
        const domainEndpoint = `test.${mockRegion}.es.amazonaws.com`;
        const roleArn = buildMockArn(
            'aws',
            'iam',
            'role/test',
            mockRegion,
            mockAccount
        );

        const domain = Domain.fromDomainAttributes(stack, 'Domain', {
            domainArn: buildMockArn(
                'aws',
                'es',
                'domain/test',
                mockRegion,
                mockAccount
            ),
            domainEndpoint: domainEndpoint
        });
        const admin = Role.fromRoleArn(stack, 'Role', roleArn);

        // Act
        new OpenSearchProvisionDomain(stack, id, {
            domain: domain,
            domainAdmin: admin,
            provisioningConfigurationPath: 'test'
        });

        // Assert
        const template = getTemplate();

        const iamPolicyProperties: Partial<PolicyProperties> = {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 'sts:AssumeRole',
                        Effect: 'Allow',
                        Resource: roleArn
                    })
                ])
            }
        };

        template.hasResourceProperties('AWS::IAM::Policy', iamPolicyProperties);
    });

    it('creates encrypted resources with provided key', () => {
        // Arrange
        const encryption = new Key(stack, 'Encryption');
        const domainEndpoint = `test.${mockRegion}.es.amazonaws.com`;
        const roleArn = buildMockArn(
            'aws',
            'iam',
            'role/test',
            mockRegion,
            mockAccount
        );

        const domain = Domain.fromDomainAttributes(stack, 'Domain', {
            domainArn: buildMockArn(
                'aws',
                'es',
                'domain/test',
                mockRegion,
                mockAccount
            ),
            domainEndpoint: domainEndpoint
        });
        const admin = Role.fromRoleArn(stack, 'Role', roleArn);

        // Act
        new OpenSearchProvisionDomain(stack, id, {
            domain: domain,
            domainAdmin: admin,
            provisioningConfigurationPath: 'test',
            encryption: encryption
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties('AWS::Lambda::Function', {
            KmsKeyArn: {
                'Fn::GetAtt': [Match.stringLikeRegexp('Encryption'), 'Arn']
            }
        });
    });
});
