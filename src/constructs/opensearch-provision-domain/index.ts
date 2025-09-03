// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { CustomResource, Duration, Stack } from 'aws-cdk-lib';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { IDomain } from 'aws-cdk-lib/aws-opensearchservice';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { DestructiveOperation, LambdaConfiguration } from '../../types';
import { SecureFunction } from '../secure-function';
import { ResourceProperties } from './handler/types/resource-properties';

/**
 * Properties for the OpenSearchProvisionDomain construct.
 */
export interface OpenSearchProvisionDomainProps {
    /**
     * Amazon OpenSearch Service domain to provision
     */
    readonly domain: IDomain;

    /**
     * AWS IAM Role that is configured as an administrative user of the Amazon OpenSearch Service domain
     */
    readonly domainAdmin: IRole;

    /**
     * Allows mapping of a role in an Amazon OpenSearch Service domain to multiple backend roles (like IAM Role ARNs,
     * LDAP DNs, etc.)
     *
     * The key is the role name in OpenSearch and the value is a list of entities to map to that role (e.g. local
     * database users or AWS IAM role ARNs)
     */
    readonly dynamicRoleMappings?: Record<string, string[]>;

    /**
     * Additional settings to configure on the Amazon OpenSearch Service domain cluster itself.
     *
     * These settings will be sent as a JSON request to the /_cluster/settings API on OpenSearch.
     *
     * Additional details can be found
     * [here](https://docs.opensearch.org/docs/latest/api-reference/cluster-api/cluster-settings/)
     */
    readonly clusterSettings?: object;

    /**
     * If specified, defines which destructive operations the Custom Resource will handle.
     *
     * If this is not specified, then the Custom Resource will only modify the domain on a CREATE call from AWS
     * CloudFormation
     */
    readonly allowDestructiveOperations?: DestructiveOperation;

    /**
     * Path on the local disk to the files that will be used to provision the Amazon OpenSearch Service domain
     */
    readonly provisioningConfigurationPath: string;

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
 * Controls the contents of an Amazon OpenSearch Service domain from Infrastructure as Code.
 *
 * This construct allows you to manage indices, component/index templates, cluster settings, Index State Management
 * (ISM) policies, role / role mappings, and saved objects for a managed OpenSearch domain from CDK. Within your
 * repository, you would create a directory containing the following sub-directories:
 *
 * - indices
 * - ism-policies
 * - role-mappings
 * - roles
 * - saved-objects
 * - templates
 *   - component
 *   - index
 *
 * Within each subfolder, you can add JSON files to represent objects you want to be provisioned. The schema of the
 * JSON file will be specific to the entity being provisioned and you can find more information withiin the OpenSearch
 * documentation. The name of each file will be used as the name of the entity that is created within OpenSearch.
 *
 * The role-mappings entity is special and its structure is not found in the OpenSearch documentation. The name of the
 * file should be the name of an internal OpenSearch role and will be used to send a PUT request to
 * `/_plugins/_security/api/rolesmapping/<name>`. The contents of the file should be backend role names to map to the
 * internal OpenSearch role (where each backend role appears on a separate line). These backend roles can be LDAP
 * Distinguished Names, AWS Identity and Access Management (IAM) Role ARNs, etc.
 *
 * The custom resource property 'dynamicRoleMappings' allows you to supplement role mappings at CDK deployment time.
 * This is useful in situations where you are dynamically creating the backend role as part of IaC and its identifier
 * will not be known ahead of time. For example, if you create an AWS IAM Role that will be mapped to an internal
 * OpenSearch role like `all_access` via CDK, you can pass that Role ARN to the resource through `dynamicRoleMappings`
 * as such:
 *
 * ```
 * dynamicRoleMappings: {
 *     all_access: [myRole.roleArn]
 * }
 * ```
 *
 * The property allows you to map multiple backend roles to a single internal OpenSearch role hence the value being a
 * list of strings.
 *
 * The custom resource proeprty `clusterSettings` allows you to dynamicall configure cluster settings via IaC. Note
 * that not all OpenSearch settings will be configurable in the managed Amazon OpenSearch Service and you receive an
 * error when trying to do so. Additional details can be found
 * [here](https://docs.opensearch.org/docs/latest/api-reference/cluster-api/cluster-settings/)
 *
 * By default, the custom resource will only modify the domain during AWS CloudFormation CREATE calls. This is to
 * prevent potential data loss or issues as the domain will most likely drift from its initial provisioning
 * configuration once established and used. If you would like to allow the custom resource to manage the domain
 * provisioning during other CloudForamtion lifecycle events, you can do so by setting the `allowDestructiveOperations`
 * property on the custom resource.
 *
 * The construct also handles encryption for the framework resources using either a provided KMS key or an
 * AWS managed key.
 *
 * The recommended pattern for provisioning a managed OpenSearch domain is to leverage this custom resource in a
 * separate CDK stack from the one that deploys your domain. Typically OpenSearch domain deployments and teardowns
 * take a significant amount of time and so you want to minimize errors in the stack that deploys your domain to
 * prevent rollbacks and the need to redeploy. By separating your domain creation and provisioning, failures in
 * provisioning will not cause the domain to be destroyed and will save a significant amount of development time.
 *
 * @example
 *
 * import { join } from 'node:path';
 * import { OpenSearchProvisionDomain } from '@cdklabs/cdk-proserve-lib/constructs';
 * import { DestructiveOperation } from '@cdklabs/cdk-proserve-lib/types';
 * import { Role } from 'aws-cdk-lib/aws-iam';
 * import { Domain } from 'aws-cdk-lib/aws-opensearchservice';
 *
 * const domain = Domain.fromDomainAttributes(this, 'Domain', {
 *     domainArn: 'XXXX',
 *     domainEndpoint: 'XXXX'
 * });
 *
 * const admin = Role.fromRoleArn(this, 'DomainAdmin', 'XXXX');
 * const user = Role.fromRoleArn(this, 'DomainUser', 'XXXX');
 *
 * new OpenSearchProvisionDomain(this, 'ProvisionDomain', {
 *     domain: domain,
 *     domainAdmin: admin,
 *     provisioningConfigurationPath: join(
 *         __dirname,
 *         '..',
 *         'dist',
 *         'cluster-configuration'
 *     ),
 *     allowDestructiveOperations: DestructiveOperation.UPDATE,
 *     clusterSettings: {
 *         persistent: {
 *             'plugins.ml_commons.model_access_control_enabled': 'true'
 *         }
 *     },
 *     dynamicRoleMappings: {
 *         all_access: [user.roleArn]
 *     }
 * });
 */
export class OpenSearchProvisionDomain extends Construct {
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
        props: OpenSearchProvisionDomainProps
    ): Provider {
        const stackId = Stack.of(scope).node.id;

        if (!OpenSearchProvisionDomain.serviceTokens.has(stackId)) {
            // Create a stack level construct to manage the framework
            const provider = new Construct(
                scope,
                `Cr${OpenSearchProvisionDomain.name}`
            );

            const onEventHandler = new SecureFunction(provider, 'OnEvent', {
                code: Code.fromAsset(join(__dirname, 'handler', 'on-event')),
                handler: 'index.handler',
                memorySize: 512,
                timeout: Duration.minutes(5),
                runtime: Runtime.NODEJS_22_X,
                encryption: props.encryption,
                ...props.lambdaConfiguration
            });

            OpenSearchProvisionDomain.serviceTokens.set(
                stackId,
                new Provider(provider, 'Provider', {
                    onEventHandler: onEventHandler.function
                })
            );
        }

        return OpenSearchProvisionDomain.serviceTokens.get(stackId)!;
    }

    /**
     * Translates the CDK construct properties to the Custom Resource
     * property format
     * @param props Metadata for configuring the Custom Resource
     * @param asset Staged asset containing the provisioning files
     * @returns Input for the actual Custom Resource worker
     */
    private static createCustomResourceProperties(
        props: OpenSearchProvisionDomainProps,
        asset: Asset
    ): ResourceProperties {
        return {
            AdminRoleArn: props.domainAdmin.roleArn,
            AssetS3Uri: asset.s3ObjectUrl,
            DomainEndpoint: props.domain.domainEndpoint,
            AllowDestructiveOperations: props.allowDestructiveOperations,
            ClusterSettings: props.clusterSettings,
            DynamicRoleMappings: props.dynamicRoleMappings
        };
    }

    /**
     * Provisions an existing Amazon OpenSearch Service domain with user-specified data
     * @param scope Parent to which the Custom Resource belongs
     * @param id Unique identifier for this instance
     * @param props Metadata for configuring the Custom Resource
     */
    constructor(
        scope: Construct,
        id: string,
        props: OpenSearchProvisionDomainProps
    ) {
        super(scope, id);

        // Add dependency on the underlying OpenSearch Domain and child objects
        this.node.addDependency(props.domain);

        const provider = OpenSearchProvisionDomain.getOrBuildProvider(
            scope,
            props
        );

        const asset = new Asset(this, 'ProvisioningConfigurationFiles', {
            path: props.provisioningConfigurationPath
        });
        asset.grantRead(provider.onEventHandler);
        props.domainAdmin.grantAssumeRole(provider.onEventHandler.role!);

        new CustomResource(this, 'OpenSearchProvisionDomain', {
            serviceToken: provider.serviceToken,
            properties:
                OpenSearchProvisionDomain.createCustomResourceProperties(
                    props,
                    asset
                ),
            resourceType: 'Custom::OpenSearchProvisionDomain'
        });
    }
}
