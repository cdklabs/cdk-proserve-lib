/**
 * (c) 2025 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
 *
 * This AWS Content is provided subject to the terms of the AWS Customer
 * Agreement available at https://aws.amazon.com/agreement or other written
 * agreement between Customer and either Amazon Web Services, Inc. or
 * Amazon Web Services EMEA SARL or both.
 */

import { join } from 'path';
import { CustomResource, Duration } from 'aws-cdk-lib';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Code, IFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { IDomain } from 'aws-cdk-lib/aws-opensearchservice';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { LambdaConfiguration } from '../../types';
import { SecureFunction } from '../secure-function';
import { IResourceProperties } from './handler/types/resource-properties';
import { IResponseData } from './handler/types/resource-response';
import { DestructiveOperation } from '../../types/destructive-operation';

/**
 * Properties for configuring an OpenSearch workflow
 */
export interface OpensearchWorkflowProps {
    /**
     * The OpenSearch domain to deploy the workflow to
     */
    readonly domain: IDomain;

    /**
     * IAM role used for domain authentication
     */
    readonly domainAuthentication: IRole;

    /**
     * Path to the Flow Framework template file (YAML or JSON)
     */
    readonly flowFrameworkTemplatePath: string;

    /**
     * Optional creation variables for the workflow. Your template must be
     * configured to accept these variables using `${{{ my_variable }}}` syntax.
     *
     * These variables will be substituted in prior to creation, so that will
     * be available during creation time and provision time.
     */
    readonly templateCreationVariables?: Record<string, string>;

    /**
     * Optional provisioning variables for the workflow. Your template must be
     * configured to accept these variables using `${{ my_variable }}` syntax.
     *
     * https://opensearch.org/docs/latest/automating-configurations/api/provision-workflow
     */
    readonly templateProvisionVariables?: Record<string, string>;

    /**
     * Optional asset variables for the workflow. This can either be an AWS CDK
     * S3 Asset object or a string that represents an S3 path (e.g. `s3://my-bucket/my-key`).
     * Your template must be configured to accept these variables using
     * `${{{ my_variable }}}` syntax. For each one of these variables, an S3
     * pre-signed URL will be generated and substituted into your template right
     * before workflow creation time. If you provide an S3 path, you must grant
     * read permissions to the appropriate bucket in order for the custom
     * resource to be able to generate a pre-signed url.
     */
    readonly templateAssetVariables?: Record<string, Asset | string>;

    /**
     * Whether to allow destructive operations like updating/deleting workflows
     */
    readonly allowDestructiveOperations?: DestructiveOperation;

    /**
     * Optional KMS key for encryption
     */
    readonly encryption?: IKey;

    /**
     * Optional lambda configuration settings for the custom resource provider
     */
    readonly lambdaConfiguration?: LambdaConfiguration;
}

/**
 * A CDK construct that creates and manages an OpenSearch workflow.
 * This construct creates a custom resource that deploys a Flow Framework template to an OpenSearch domain.
 * It handles the deployment and lifecycle management of the workflow through Lambda-backed custom resources.
 *
 * The construct:
 * - Creates a provider with onEvent and isComplete Lambda functions
 * - Uploads the workflow template to S3 as an asset
 * - Sets up necessary IAM permissions and networking configuration
 * - Manages workflow deployment state through a custom resource
 * - Exposes the deployed workflow ID
 */
export class OpensearchWorkflow extends Construct {
    private static serviceTokens = new Map<string, Provider>();

    /**
     * Builds the provider to support the custom resource
     *
     * @param scope Parent to which the custom resource belongs
     * @param props Metadata for configuring the custom resource
     *
     * @returns Service token for interacting with the worker
     */
    private static getOrBuildProvider(
        scope: Construct,
        props: OpensearchWorkflowProps
    ): Provider {
        const stackId = scope.node.id;

        if (!OpensearchWorkflow.serviceTokens.has(stackId)) {
            const provider = new Construct(scope, 'CrOpensearchWorkflow');

            const onEventHandler = new SecureFunction(provider, 'OnEvent', {
                code: Code.fromAsset(join(__dirname, 'handler', 'on-event')),
                handler: 'index.handler',
                memorySize: 512,
                timeout: Duration.minutes(5),
                runtime: Runtime.NODEJS_22_X,
                encryption: props.encryption,
                ...props.lambdaConfiguration
            });

            const isCompleteHandler = new SecureFunction(
                provider,
                'IsComplete',
                {
                    code: Code.fromAsset(
                        join(__dirname, 'handler', 'is-complete')
                    ),
                    handler: 'index.handler',
                    memorySize: 512,
                    timeout: Duration.minutes(5),
                    runtime: Runtime.NODEJS_22_X,
                    encryption: props.encryption,
                    ...props.lambdaConfiguration
                }
            );

            [onEventHandler, isCompleteHandler].forEach((handler) => {
                props.domainAuthentication.grantAssumeRole(handler.role!);
            });

            OpensearchWorkflow.serviceTokens.set(
                stackId,
                new Provider(provider, 'Provider', {
                    onEventHandler: onEventHandler.function,
                    isCompleteHandler: isCompleteHandler.function,
                    queryInterval: Duration.seconds(30),
                    totalTimeout: Duration.minutes(30)
                })
            );
        }
        return OpensearchWorkflow.serviceTokens.get(stackId)!;
    }

    /**
     * Translates the CDK construct properties to the custom resource
     * property format
     * @param props Metadata for configuring the custom resource
     * @returns Input for the actual custom resource worker
     */
    private static createCustomResourceProperties(
        props: OpensearchWorkflowProps,
        asset: Asset,
        templateS3ObjectUrlVariables: Record<string, string>
    ): IResourceProperties {
        return {
            RoleArn: props.domainAuthentication.roleArn,
            DomainEndpoint: props.domain.domainEndpoint,
            AssetS3ObjectUrl: asset.s3ObjectUrl,
            AllowDestructiveOperations: props.allowDestructiveOperations,
            TemplateProvisionVariables: props.templateProvisionVariables,
            TemplateCreationVariables: props.templateCreationVariables,
            TemplateS3ObjectUrlVariables: templateS3ObjectUrlVariables
        };
    }

    /**
     * The unique identifier of the deployed OpenSearch workflow.
     * This ID can be used to reference and manage the workflow after deployment.
     */
    public readonly workflowId: string;
    public readonly onEventHandler: IFunction;
    public readonly isCompleteHandler: IFunction;
    private readonly cr: CustomResource;
    /**
     * Constructor
     * @param scope Parent to which the custom resource belongs
     * @param id Unique identifier for the custom resource
     * @param props Metadata for configuring the custom resource
     */
    constructor(scope: Construct, id: string, props: OpensearchWorkflowProps) {
        super(scope, id);

        const asset = new Asset(this, 'TemplateAsset', {
            path: props.flowFrameworkTemplatePath
        });

        // template must be yaml or json
        if (
            !props.flowFrameworkTemplatePath.endsWith('.yaml') &&
            !props.flowFrameworkTemplatePath.endsWith('.yml') &&
            !props.flowFrameworkTemplatePath.endsWith('.json')
        ) {
            throw new Error('Template must be a YAML or JSON file.');
        }

        const provider = OpensearchWorkflow.getOrBuildProvider(scope, props);

        [provider.onEventHandler, provider.isCompleteHandler].forEach(
            (handler) => {
                if (handler) {
                    asset.grantRead(handler);
                }
            }
        );

        const s3ObjectUrlVariables: Record<string, string> = {};
        if (props.templateAssetVariables) {
            for (const [key, value] of Object.entries(
                props.templateAssetVariables
            )) {
                if (value instanceof Asset) {
                    value.grantRead(provider.onEventHandler);
                    s3ObjectUrlVariables[key] = value.s3ObjectUrl;
                } else {
                    s3ObjectUrlVariables[key] = value;
                }
            }
        }

        this.cr = new CustomResource(this, 'OpensearchWorkflow', {
            serviceToken: provider.serviceToken,
            properties: OpensearchWorkflow.createCustomResourceProperties(
                props,
                asset,
                s3ObjectUrlVariables
            ),
            resourceType: 'Custom::OpensearchWorkflow'
        });

        const attribute: keyof IResponseData = 'workflow_id';
        this.workflowId = this.cr.getAttString(attribute);

        this.onEventHandler = provider.onEventHandler;
        this.isCompleteHandler = provider.isCompleteHandler!;
    }

    /**
     * Retrieves a created Resource ID from the Workflow by the provided
     * workflowStepId. The workflowStepId is the `id` value of the node in your
     * list of workflow nodes from your workflow template
     *
     * @param workflowStepId the workflow step id from the workflow template
     * @returns string value of the resource id that was created
     */
    public getResourceId(workflowStepId: string): string {
        return this.cr.getAttString(workflowStepId);
    }
}
