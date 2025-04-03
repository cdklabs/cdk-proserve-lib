// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'path';
import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Domain, EngineVersion } from 'aws-cdk-lib/aws-opensearchservice';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { NagSuppressions } from 'cdk-nag';
import { FunctionProperties } from 'cloudform-types/types/lambda/function';
import { beforeEach, it, expect } from 'vitest';
import { OpenSearchWorkflow } from '../../../src/constructs/opensearch-workflow/index';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

describeCdkTest(OpenSearchWorkflow, (id, getStack, getTemplate) => {
    let stack: Stack;
    let domain: Domain;
    let authRole: Role;
    const testTemplatePath = join(__dirname, 'fixtures', 'test-template.yaml');

    beforeEach(() => {
        stack = getStack();

        domain = new Domain(stack, 'TestDomain', {
            domainName: 'test-domain',
            version: EngineVersion.OPENSEARCH_1_3
        });

        authRole = new Role(stack, 'TestAuthRole', {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com')
        });

        NagSuppressions.addStackSuppressions(stack, [
            {
                id: 'AwsSolutions-IAM5',
                reason: 'Permissions are tightly scoped by CDK grants for the asset bucket.'
            }
        ]);
    });

    it('creates custom resource with correct properties', () => {
        // Arrange & Act
        new OpenSearchWorkflow(stack, id, {
            domain,
            domainAuthentication: authRole,
            flowFrameworkTemplatePath: testTemplatePath
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties('Custom::OpenSearchWorkflow', {
            ServiceToken: {
                'Fn::GetAtt': Match.anyValue()
            }
        });

        const lambdaResourceProperties: Partial<FunctionProperties> = {
            Handler: 'index.handler',
            Runtime: 'nodejs22.x',
            Timeout: 300 // 5 minutes
        };

        template.hasResourceProperties(
            'AWS::Lambda::Function',
            lambdaResourceProperties
        );
    });

    it('handles template asset variables', () => {
        // Arrange
        const assetPath = join(__dirname, 'fixtures', 'test-template.yaml');
        const asset = new Asset(stack, 'TestAsset', {
            path: assetPath
        });

        // Act
        new OpenSearchWorkflow(stack, id, {
            domain,
            domainAuthentication: authRole,
            flowFrameworkTemplatePath: testTemplatePath,
            templateAssetVariables: {
                asset1: asset,
                s3Path: 's3://my-bucket/my-key'
            }
        });

        // Assert
        const template = getTemplate();

        // Check that the custom resource has the template asset variables
        template.hasResourceProperties('Custom::OpenSearchWorkflow', {
            TemplateS3ObjectUrlVariables: Match.objectLike({
                asset1: Match.stringLikeRegexp('s3://.*'),
                s3Path: 's3://my-bucket/my-key'
            })
        });
    });

    it('exposes workflowId attribute', () => {
        // Arrange & Act
        const workflow = new OpenSearchWorkflow(stack, id, {
            domain,
            domainAuthentication: authRole,
            flowFrameworkTemplatePath: testTemplatePath
        });

        // Assert
        expect(workflow.workflowId).toBeDefined();
    });

    it('exposes getResourceId method', () => {
        // Arrange
        const workflow = new OpenSearchWorkflow(stack, id, {
            domain,
            domainAuthentication: authRole,
            flowFrameworkTemplatePath: testTemplatePath
        });

        // Act
        const resourceId = workflow.getResourceId('test-step-id');

        // Assert
        expect(resourceId).toMatch(/\${Token\[.+\]}/);
    });

    it('throws error if template is not yaml or json', () => {
        // Arrange
        const invalidPath = join(__dirname, 'fixtures', 'invalid.txt');

        // Act & Assert
        expect(() => {
            new OpenSearchWorkflow(stack, id, {
                domain,
                domainAuthentication: authRole,
                flowFrameworkTemplatePath: invalidPath
            });
        }).toThrow('Template must be a YAML or JSON file.');
    });

    it('applies custom lambda configuration', () => {
        // Arrange & Act
        new OpenSearchWorkflow(stack, id, {
            domain,
            domainAuthentication: authRole,
            flowFrameworkTemplatePath: testTemplatePath,
            lambdaConfiguration: {
                reservedConcurrentExecutions: 10
            }
        });

        // Assert
        const template = getTemplate();

        template.hasResourceProperties('AWS::Lambda::Function', {
            ReservedConcurrentExecutions: 10
        });
    });
});
