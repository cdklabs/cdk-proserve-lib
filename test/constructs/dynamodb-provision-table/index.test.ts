// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Key } from 'aws-cdk-lib/aws-kms';
import { NagSuppressions } from 'cdk-nag';
import { PolicyProperties } from 'cloudform-types/types/iam/policy';
import { FunctionProperties } from 'cloudform-types/types/lambda/function';
import {
    mockItemOne,
    mockItemPrimaryKey,
    mockItemSortKey,
    resourceType
} from './fixtures';
import { DynamoDbProvisionTable } from '../../../src/constructs';
import { describeCdkTest } from '../../../utilities/cdk-nag-jest';
import { buildMockArn, mockAccount, mockRegion } from '../../fixtures';

const tableElementName = 'Table';
const keyElementName = 'Encryption';

describeCdkTest(DynamoDbProvisionTable, (id, getStack, getTemplate) => {
    let stack: Stack;

    beforeEach(() => {
        stack = getStack();

        NagSuppressions.addStackSuppressions(stack, []);
    });

    it('creates custom resource with correct properties', () => {
        // Arrange
        const tableName = 'test';
        const table = Table.fromTableName(stack, tableElementName, tableName);
        const encryption = Key.fromKeyArn(
            stack,
            keyElementName,
            buildMockArn('aws', 'kms', 'key/abc', mockRegion, mockAccount)
        );

        // Act
        new DynamoDbProvisionTable(stack, id, {
            items: [mockItemOne],
            table: {
                partitionKeyName: mockItemPrimaryKey,
                resource: table,
                encryption: encryption,
                sortKeyName: mockItemSortKey
            }
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties(resourceType, {
            ServiceToken: {
                'Fn::GetAtt': Match.anyValue()
            },
            TableName: tableName,
            Items: [mockItemOne],
            PartitionKeyName: mockItemPrimaryKey,
            SortKeyName: mockItemSortKey
        });

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

    it('grants necessary permissions to Lambda function (unencrypted table)', () => {
        // Arrange
        const table = Table.fromTableName(stack, tableElementName, 'test');

        // Act
        new DynamoDbProvisionTable(stack, id, {
            items: [mockItemOne],
            table: {
                partitionKeyName: mockItemPrimaryKey,
                resource: table,
                sortKeyName: mockItemSortKey
            }
        });

        // Assert
        const template = getTemplate();

        const iamPolicyProperties: Partial<PolicyProperties> = {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: [
                            'dynamodb:BatchGetItem',
                            'dynamodb:GetRecords',
                            'dynamodb:GetShardIterator',
                            'dynamodb:Query',
                            'dynamodb:GetItem',
                            'dynamodb:Scan',
                            'dynamodb:ConditionCheckItem',
                            'dynamodb:BatchWriteItem',
                            'dynamodb:PutItem',
                            'dynamodb:UpdateItem',
                            'dynamodb:DeleteItem',
                            'dynamodb:DescribeTable'
                        ],
                        Effect: 'Allow',
                        Resource: [
                            {
                                'Fn::Join': [
                                    '',
                                    [
                                        'arn:',
                                        { Ref: 'AWS::Partition' },
                                        Match.stringLikeRegexp('table/test$')
                                    ]
                                ]
                            },
                            {
                                Ref: 'AWS::NoValue'
                            }
                        ]
                    })
                ])
            }
        };

        template.hasResourceProperties('AWS::IAM::Policy', iamPolicyProperties);
    });

    it('grants necessary permissions to Lambda function (encrypted table)', () => {
        // Arrange
        const table = Table.fromTableName(stack, tableElementName, 'test');
        const keyArn = buildMockArn(
            'aws',
            'kms',
            'key/abc',
            mockRegion,
            mockAccount
        );
        const encryption = Key.fromKeyArn(stack, keyElementName, keyArn);

        // Act
        new DynamoDbProvisionTable(stack, id, {
            items: [mockItemOne],
            table: {
                partitionKeyName: mockItemPrimaryKey,
                resource: table,
                encryption: encryption,
                sortKeyName: mockItemSortKey
            }
        });

        // Assert
        const template = getTemplate();

        const iamPolicyProperties: Partial<PolicyProperties> = {
            PolicyDocument: {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: [
                            'kms:Decrypt',
                            'kms:Encrypt',
                            'kms:ReEncrypt*',
                            'kms:GenerateDataKey*'
                        ],
                        Effect: 'Allow',
                        Resource: keyArn
                    })
                ])
            }
        };

        template.hasResourceProperties('AWS::IAM::Policy', iamPolicyProperties);
    });

    it('creates encrypted resources with provided key', () => {
        // Arrange
        const table = Table.fromTableName(stack, tableElementName, 'test');
        const encryption = new Key(stack, keyElementName);

        // Act
        new DynamoDbProvisionTable(stack, id, {
            items: [mockItemOne],
            table: {
                partitionKeyName: mockItemPrimaryKey,
                resource: table,
                sortKeyName: mockItemSortKey
            },
            encryption: encryption
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties('AWS::Lambda::Function', {
            KmsKeyArn: {
                'Fn::GetAtt': [Match.stringLikeRegexp(keyElementName), 'Arn']
            }
        });
    });
});
