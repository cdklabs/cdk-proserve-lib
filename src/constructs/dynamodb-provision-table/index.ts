// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { CustomResource, Duration, Stack } from 'aws-cdk-lib';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { LambdaConfiguration } from '../../types';
import { SecureFunction } from '../secure-function';
import { ResourceProperties } from './handler/types/resource-properties';
import { TableItem } from './handler/types/table-item';

/**
 * Properties for the DynamoDbProvisionTable construct.
 */
export interface DynamoDbProvisionTableProps {
    /**
     * Table to provision
     */
    readonly table: DynamoDbProvisionTable.TableProps;

    /**
     * Items to provision within the DynamoDB table
     */
    readonly items: TableItem[];

    /**
     * Encryption key for protecting the framework resources
     */
    readonly encryption?: IKey;

    /**
     * Optional Lambda configuration settings.
     */
    readonly lambdaConfiguration?: LambdaConfiguration;
}

/**
 * Controls the contents of an Amazon DynamoDB table from Infrastructure as Code.
 *
 * This construct uses information about the key attributes of a table and a list of rows to populate the table upon
 * creation, update the table upon update, and remove entries from the table upon delete.
 *
 * WARNING: This construct should only be used with tables that are created and fully managed via IaC. While the
 * the construct will only manage rows within the table that it is aware of, there is no way to detect drift and thus
 * it is possible to cause data loss within the table if it is managed outside of IaC as well.
 *
 * The construct also handles encryption for the framework resources using either a provided KMS key or an
 * AWS managed key.
 *
 * @example
 *
 * import { DynamoDbProvisionTable } from '@cdklabs/cdk-proserve-lib/constructs';
 * import { Table } from 'aws-cdk-lib/aws-dynamodb';
 * import { Key } from 'aws-cdk-lib/aws-kms';
 *
 * interface TableRow {
 *     readonly uid: number;
 *     readonly isActive: boolean;
 * }
 *
 * const partitionKey: keyof TableRow = 'uid';
 *
 * const rows: TableRow[] = [
 *     {
 *         isActive: true,
 *         uid: 1
 *     },
 *     {
 *         isActive: true,
 *         uid: 2
 *     },
 *     {
 *         isActive: false,
 *         uid: 3
 *     }
 * ];
 *
 * const tableArn = 'arn:aws:dynamodb:us-west-1:111111111111:table/sample';
 * const table = Table.fromTableArn(this, 'Table', tableArn);
 *
 * const keyArn = 'arn:aws:kms:us-east-1:111111111111:key/sample-key-id';
 * const key = Key.fromKeyArn(this, 'Encryption', keyArn);
 *
 * new DynamoDbProvisionTable(this, 'ProvisionTable', {
 *     items: rows,
 *     table: {
 *         partitionKeyName: partitionKey,
 *         resource: table,
 *         encryption: key
 *     }
 * });

 * }
 */
export class DynamoDbProvisionTable extends Construct {
    /**
     * Mapping of providers for each CDK stack
     * Used to ensure only one provider is created per stack
     */
    private static serviceTokens = new Map<string, Provider>();

    /**
     * Builds the provider to support the Custom Resource
     *
     * @param scope Parent to which the Custom Resource belongs
     * @param props Metadata for configuring the Custom Resource
     *
     * @returns Provider for the worker
     */
    private static getOrBuildProvider(
        scope: Construct,
        props: DynamoDbProvisionTableProps
    ): Provider {
        const stackId = Stack.of(scope).node.id;

        if (!DynamoDbProvisionTable.serviceTokens.has(stackId)) {
            // Create a stack level construct to manage the framework
            const provider = new Construct(
                scope,
                `Cr${DynamoDbProvisionTable.name}`
            );

            const onEventHandler = new SecureFunction(provider, 'OnEvent', {
                code: Code.fromAsset(join(__dirname, 'handler', 'on-event')),
                handler: 'index.handler',
                memorySize: 512,
                timeout: Duration.minutes(1),
                runtime: Runtime.NODEJS_22_X,
                encryption: props.encryption,
                ...props.lambdaConfiguration
            });

            DynamoDbProvisionTable.serviceTokens.set(
                stackId,
                new Provider(provider, 'Provider', {
                    onEventHandler: onEventHandler.function
                })
            );
        }

        return DynamoDbProvisionTable.serviceTokens.get(stackId)!;
    }

    /**
     * Translates the CDK construct properties to the Custom Resource
     * property format
     * @param props Metadata for configuring the Custom Resource
     * @returns Input for the actual Custom Resource worker
     */
    private static createCustomResourceProperties(
        props: DynamoDbProvisionTableProps
    ): ResourceProperties {
        return {
            Items: props.items,
            PartitionKeyName: props.table.partitionKeyName,
            TableName: props.table.resource.tableName,
            SortKeyName: props.table.sortKeyName
        };
    }

    /**
     * Provisions an existing DynamoDB Table with user-specified data
     * @param scope Parent to which the Custom Resource belongs
     * @param id Unique identifier for this instance
     * @param props Metadata for configuring the Custom Resource
     */
    constructor(
        scope: Construct,
        id: string,
        props: DynamoDbProvisionTableProps
    ) {
        super(scope, id);

        const provider = DynamoDbProvisionTable.getOrBuildProvider(
            scope,
            props
        );

        // Create permissions as a separate policy to ensure in DELETEs they are not removed until after the CR has run
        const providerPermissions = new Policy(this, 'Permissions', {
            statements: [
                new PolicyStatement({
                    actions: [
                        'dynamodb:DescribeTable',
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
                        'dynamodb:DeleteItem'
                    ],
                    effect: Effect.ALLOW,
                    resources: [props.table.resource.tableArn]
                })
            ]
        });

        if (props.table.encryption) {
            providerPermissions.addStatements(
                new PolicyStatement({
                    actions: [
                        'kms:Decrypt',
                        'kms:DescribeKey',
                        'kms:Encrypt',
                        'kms:ReEncrypt*',
                        'kms:GenerateDataKey*'
                    ],
                    effect: Effect.ALLOW,
                    resources: [props.table.encryption.keyArn]
                })
            );
        }

        provider.onEventHandler.role!.attachInlinePolicy(providerPermissions);

        new CustomResource(this, 'DynamoDbProvisionTable', {
            serviceToken: provider.serviceToken,
            properties:
                DynamoDbProvisionTable.createCustomResourceProperties(props),
            resourceType: 'Custom::DynamoDbProvisionTable'
        });
    }
}

export namespace DynamoDbProvisionTable {
    /**
     * Information about the table to provision
     */
    export interface TableProps {
        /**
         * CDK representation of the table itself
         */
        readonly resource: ITable;

        /**
         * Name of the partition key for the table
         */
        readonly partitionKeyName: string;

        /**
         * Name of the sort key for the table if applicable
         */
        readonly sortKeyName?: string;

        /**
         * Optional existing encryption key associated with the table
         */
        readonly encryption?: IKey;
    }
}
