// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CfnResource, IAspect, Stack } from 'aws-cdk-lib';
import { ISubnet } from 'aws-cdk-lib/aws-ec2';
import {
    Effect,
    ManagedPolicy,
    PolicyStatement,
    Role
} from 'aws-cdk-lib/aws-iam';
import { CfnNotebookInstance } from 'aws-cdk-lib/aws-sagemaker';

export interface SecureSageMakerNotebookProps {
    /**
     * Sets the VPC Subnet for the Sagemaker Notebook Instance. This only sets
     * the subnet if you supply one. It is recommended to set this to ensure
     * the notebook is locked down to a specific VPC/subnet.
     *
     * *You MUST set this property if you want to enforce this.*
     */
    readonly notebookSubnet?: ISubnet;

    /**
     * Sets the VPC Subnets that the SageMaker Notebook Instance is allowed to
     * launch training and inference jobs into. This is enforced by adding
     * DENY statements to the existing role that the Notebook Instance is using.
     *
     * *You MUST set this property if you want to enforce this.*
     */
    readonly allowedSubnets?: ISubnet[];

    /**
     * Sets the `directInternetAccess` property on the SageMaker Notebooks.
     * By default, this is set to false to disable internet access on any
     * SageMaker Notebook Instance that this aspect is applied to.
     * @default false
     */
    readonly directInternetAccess?: boolean;

    /**
     * Sets the `rootAccess` property on the SageMaker Notebooks.
     * By default, this is set to false to disable root access on any
     * SageMaker Notebook Instance that this aspect is applied to.
     * @default false
     */
    readonly rootAccess?: boolean;
}

/**
 * Aspect that secures SageMaker Notebook Instances by enforcing secure settings
 * such as must be in VPC/jobs must be launched into VPC, disable direct
 * internet access and root access.
 *
 * This Aspect enforces these settings through a combination of setting
 * the CloudFormation properties on the Notebook resource and attaching a
 * DENY policy to the role that is used by the notebook. The policy will enforce
 * that the following API actions contain the correct properties to ensure
 * network isolation and that the VPC subnets are set:
 *
 * - 'sagemaker:CreateTrainingJob',
 * - 'sagemaker:CreateHyperParameterTuningJob',
 * - 'sagemaker:CreateModel',
 * - 'sagemaker:CreateProcessingJob'
 */
export class SecureSageMakerNotebookAspect implements IAspect {
    private static policyByStack: Map<string, ManagedPolicy> = new Map();

    constructor(private readonly props: SecureSageMakerNotebookProps) {}

    visit(node: CfnResource): void {
        if (
            node.cfnResourceType !== CfnNotebookInstance.CFN_RESOURCE_TYPE_NAME
        ) {
            return;
        }
        const notebook = node as CfnNotebookInstance;
        if (this.props.allowedSubnets) {
            this.secureSageMakerNotebookRole(
                notebook,
                this.props.allowedSubnets
            );
        }
        this.secureSageMakerNotebookInstance(notebook);
    }

    private secureSageMakerNotebookRole(
        notebook: CfnNotebookInstance,
        allowedSubnets: ISubnet[]
    ): void {
        // Add security policies to the notebook's role
        const notebookRole = Role.fromRoleArn(
            notebook,
            'ImportedNotebookRole',
            notebook.roleArn
        );

        const stack = Stack.of(notebook);
        const stackId = stack.stackId;

        // Create policy for this stack if it doesn't exist
        if (!SecureSageMakerNotebookAspect.policyByStack.has(stackId)) {
            const commonPolicyProps = {
                actions: [
                    'sagemaker:CreateTrainingJob',
                    'sagemaker:CreateHyperParameterTuningJob',
                    'sagemaker:CreateModel',
                    'sagemaker:CreateProcessingJob'
                ],
                resources: ['*'],
                effect: Effect.DENY
            };

            const policy = new ManagedPolicy(stack, 'NotebookLockdownPolicy');

            policy.addStatements(
                new PolicyStatement({
                    ...commonPolicyProps,
                    conditions: {
                        Bool: { 'sagemaker:NetworkIsolation': false }
                    }
                })
            );

            policy.addStatements(
                new PolicyStatement({
                    ...commonPolicyProps,
                    conditions: {
                        'ForAnyValue:StringNotEquals': {
                            'sagemaker:VpcSubnets': allowedSubnets.map(
                                (subnet) => subnet.subnetId
                            )
                        }
                    }
                })
            );

            policy.addStatements(
                new PolicyStatement({
                    ...commonPolicyProps,
                    conditions: {
                        Null: { 'sagemaker:VpcSubnets': 'true' }
                    }
                })
            );

            SecureSageMakerNotebookAspect.policyByStack.set(stackId, policy);
        }

        const policy =
            SecureSageMakerNotebookAspect.policyByStack.get(stackId)!;
        notebookRole.addManagedPolicy(policy);
    }

    private secureSageMakerNotebookInstance(
        notebook: CfnNotebookInstance
    ): void {
        if (this.props.notebookSubnet) {
            notebook.subnetId = this.props.notebookSubnet.subnetId;
        }

        if (!this.props.directInternetAccess) {
            notebook.directInternetAccess = 'Disabled';
        }
        if (!this.props.rootAccess) {
            notebook.rootAccess = 'Disabled';
        }
    }
}
