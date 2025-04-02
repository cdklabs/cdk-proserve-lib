// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack, IAspect, CustomResource, Duration } from 'aws-cdk-lib';
import { Provider } from 'aws-cdk-lib/custom-resources';

import {
    CfnNotebookInstance,
    CfnNotebookInstanceLifecycleConfig
} from 'aws-cdk-lib/aws-sagemaker';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { IConstruct } from 'constructs';
import { SecureFunction } from '../../constructs/secure-function';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { readFileSync } from 'fs';
import { join } from 'path';
import { LambdaConfiguration } from '../../types/lambda-configuration';

export interface SageMakerShutdownProps {
    /**
     * Optional treshold of idle time before notebook instance shutdown.
     * @default = undefined
     */
    readonly idleTimeoutMinutes?: number;

    /**
     * Optional Lambda configuration settings.
     */
    readonly lambdaConfiguration?: LambdaConfiguration;

    /**
     * Optional KMS Encryption Key to use for encrypting resources.
     */
    readonly encryption?: IKey;
}

export class SageMakerAutomatedShutdown implements IAspect {
    private processedInstances: Set<string> = new Set();
    private lambdaFunctions: Map<string, Provider> = new Map();

    constructor(private readonly props: SageMakerShutdownProps = {}) {}

    visit(node: IConstruct): void {
        if (!(node instanceof CfnNotebookInstance)) {
            return;
        }

        const cfnInstance = node as CfnNotebookInstance;
        if (this.processedInstances.has(cfnInstance.ref)) {
            return;
        }

        const stack = Stack.of(node);
        this.applyShutdownMechanism(cfnInstance, stack);
        this.processedInstances.add(cfnInstance.ref);
    }

    private applyShutdownMechanism(
        instance: CfnNotebookInstance,
        stack: Stack
    ): void {
        const lifecycleConfig = this.createLifecycleConfig(instance, stack);
        instance.lifecycleConfigName = lifecycleConfig.ref;
    }

    private createLifecycleConfig(
        instance: CfnNotebookInstance,
        stack: Stack
    ): CfnNotebookInstanceLifecycleConfig {
        const idleTimeoutMinutes = this.props.idleTimeoutMinutes || 60;
        const scriptContent = readFileSync(
            join(__dirname, 'auto-stop-script.py'),
            'utf8'
        );
        const configId = `AutoShutdownConfig-${instance.node.id}`;

        const onStartScript = this.generateStartupScript(
            scriptContent,
            idleTimeoutMinutes
        );

        if (instance.lifecycleConfigName) {
            const provider = this.createCustomResourceLambda(stack);

            const customResource = new CustomResource(
                stack,
                `MergeConfig-${instance.node.id}`,
                {
                    serviceToken: provider.serviceToken,
                    properties: {
                        ConfigName: instance.lifecycleConfigName,
                        Region: stack.region,
                        NewScript:
                            Buffer.from(onStartScript).toString('base64'),
                        ConfigId: instance.node.id
                    }
                }
            );

            return new CfnNotebookInstanceLifecycleConfig(stack, configId, {
                notebookInstanceLifecycleConfigName:
                    instance.lifecycleConfigName,
                onStart: [
                    {
                        content: customResource.getAttString('MergedContent')
                    }
                ]
            });
        }

        // Create new lifecycle config if none exists
        return new CfnNotebookInstanceLifecycleConfig(stack, configId, {
            notebookInstanceLifecycleConfigName: `auto-shutdown-${instance.node.id}`,
            onStart: [
                {
                    content: Buffer.from(onStartScript).toString('base64')
                }
            ]
        });
    }

    private createCustomResourceLambda(stack: Stack): Provider {
        const stackId = stack.stackId;

        if (this.lambdaFunctions.has(stackId)) {
            return this.lambdaFunctions.get(stackId)!;
        }

        const lambdaRole = new iam.Role(stack, 'LifecycleConfigLambdaRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName(
                    'service-role/AWSLambdaBasicExecutionRole'
                )
            ],
            inlinePolicies: {
                SageMakerAccess: new iam.PolicyDocument({
                    statements: [
                        new iam.PolicyStatement({
                            actions: [
                                'sagemaker:DescribeNotebookInstanceLifecycleConfig',
                                'sagemaker:UpdateNotebookInstanceLifecycleConfig'
                            ],
                            resources: [
                                `arn:aws:sagemaker:${stack.region}:${stack.account}:notebook-instance-lifecycle-config/*`
                            ]
                        })
                    ]
                })
            }
        });

        const secureFunction = new SecureFunction(
            stack,
            'FetchLifecycleConfigFunction',
            {
                runtime: lambda.Runtime.PYTHON_3_13,
                handler: 'index.handler',
                code: lambda.Code.fromInline(`
                import boto3
                import base64
                import cfnresponse
                import json
                
                def handler(event, context):
                    try:
                        print(f"Received event: {json.dumps(event)}")
                        
                        if event['RequestType'] in ['Create', 'Update']:
                            config_name = event['ResourceProperties']['ConfigName']
                            region = event['ResourceProperties']['Region']
                            new_script = event['ResourceProperties']['NewScript']
                            config_id = event['ResourceProperties'].get('ConfigId', '')
                            
                            sagemaker = boto3.client('sagemaker', region_name=region)
                            
                            try:
                                # Get the existing lifecycle config
                                response = sagemaker.describe_notebook_instance_lifecycle_config(
                                    NotebookInstanceLifecycleConfigName=config_name
                                )
                                
                                # Extract existing OnStart scripts, excluding any auto-stop scripts
                                existing_scripts = []
                                if 'OnStart' in response:
                                    for script in response['OnStart']:
                                        content = base64.b64decode(script['Content']).decode('utf-8')
                                        if 'auto-stop-script.py' not in content:
                                            existing_scripts.append(content)
                                
                                final_script = '\\n\\n'.join(existing_scripts + [base64.b64decode(new_script).decode('utf-8')])
                                
                                sagemaker.update_notebook_instance_lifecycle_config(
                                    NotebookInstanceLifecycleConfigName=config_name,
                                    OnStart=[{
                                        'Content': base64.b64encode(final_script.encode('utf-8')).decode('utf-8')
                                    }]
                                )
                                
                                response_data = {
                                    'MergedContent': base64.b64encode(final_script.encode('utf-8')).decode('utf-8')
                                }
                                
                            except sagemaker.exceptions.ResourceNotFound:
                                print(f"Lifecycle config {config_name} not found, using new script only")
                                response_data = {
                                    'MergedContent': new_script
                                }
                            
                            cfnresponse.send(event, context, cfnresponse.SUCCESS, response_data, config_name)
                            
                        elif event['RequestType'] == 'Delete':
                            cfnresponse.send(event, context, cfnresponse.SUCCESS, {}, 
                                           event.get('PhysicalResourceId', event['ResourceProperties'].get('ConfigName')))
                            
                    except Exception as e:
                        print(f"Error occurred: {str(e)}")
                        cfnresponse.send(event, context, cfnresponse.FAILED, {
                            'Error': str(e)
                        }, event.get('PhysicalResourceId', 'error'))
            `),
                role: lambdaRole,
                timeout: Duration.seconds(30),
                reservedConcurrentExecutions: 10,
                encryption: this.props.encryption
            }
        );

        const provider = new Provider(stack, 'LifecycleConfigProvider', {
            onEventHandler: secureFunction.function
        });

        this.lambdaFunctions.set(stackId, provider);
        return provider;
    }

    private generateStartupScript(
        scriptContent: string,
        idleTimeoutMinutes: number
    ): string {
        return `#!/bin/bash
set -e

# Install required packages
pip install requests boto3

# Create the auto-stop script
cat << 'EOF' > /home/ec2-user/SageMaker/auto-stop-script.py
${scriptContent}
EOF

# Make the script executable
chmod +x /home/ec2-user/SageMaker/auto-stop-script.py

# Create a log directory
mkdir -p /home/ec2-user/SageMaker/auto-stop-logs

# Create the cron job to run the script every 15 minutes
(crontab -l 2>/dev/null; echo "*/15 * * * * /usr/bin/python3 /home/ec2-user/SageMaker/auto-stop-script.py --time ${idleTimeoutMinutes} --port 8443 >> /home/ec2-user/SageMaker/auto-stop-logs/cron.log 2>&1") | crontab -
`;
    }
}
