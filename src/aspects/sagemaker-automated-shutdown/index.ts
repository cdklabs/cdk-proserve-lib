// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack, IAspect } from 'aws-cdk-lib';
import {
    CfnNotebookInstance,
    CfnNotebookInstanceLifecycleConfig
} from 'aws-cdk-lib/aws-sagemaker';
import { IConstruct } from 'constructs';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface SageMakerShutdownProps {
    readonly idleTimeoutMinutes?: number;
}

export class SageMakerAutomatedShutdown implements IAspect {
    private processedInstances: Set<string> = new Set();

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

        const onStartScript = this.generateStartupScript(
            scriptContent,
            idleTimeoutMinutes
        );

        return new CfnNotebookInstanceLifecycleConfig(
            stack,
            `AutoShutdownConfig-${instance.node.id}`,
            {
                notebookInstanceLifecycleConfigName: `auto-shutdown-${instance.node.id}`,
                onStart: [
                    {
                        content: Buffer.from(onStartScript).toString('base64')
                    }
                ]
            }
        );
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
