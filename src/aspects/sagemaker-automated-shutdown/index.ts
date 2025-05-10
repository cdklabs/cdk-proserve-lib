// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { readFileSync } from 'fs';
import { join } from 'path';
import { Stack, IAspect } from 'aws-cdk-lib';
import { IKey } from 'aws-cdk-lib/aws-kms';
import {
    CfnNotebookInstance,
    CfnNotebookInstanceLifecycleConfig
} from 'aws-cdk-lib/aws-sagemaker';
import { IConstruct } from 'constructs';

export interface SageMakerShutdownProps {
    /**
     * Optional treshold of idle time before notebook instance shutdown.
     * @default = undefined
     */
    readonly idleTimeoutMinutes?: number;

    /**
     * Optional KMS Encryption Key to use for encrypting resources.
     */
    readonly encryption?: IKey;
}

export class SageMakerAutomatedShutdown implements IAspect {
    constructor(private readonly props: SageMakerShutdownProps = {}) {}

    visit(node: IConstruct): void {
        if (!(node instanceof CfnNotebookInstance)) {
            return;
        }

        const cfnInstance = node as CfnNotebookInstance;
        const stack = Stack.of(node);
        this.applyShutdownMechanism(cfnInstance, stack);
    }

    private applyShutdownMechanism(
        instance: CfnNotebookInstance,
        stack: Stack
    ): void {
        const lifecycleConfig = this.createLifecycleConfig(instance, stack);
        instance.lifecycleConfigName =
            lifecycleConfig.notebookInstanceLifecycleConfigName;
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
            const originalConfig = stack.node
                .findAll()
                .find(
                    (c) =>
                        c instanceof CfnNotebookInstanceLifecycleConfig &&
                        (c as CfnNotebookInstanceLifecycleConfig)
                            .notebookInstanceLifecycleConfigName ===
                            instance.lifecycleConfigName
                ) as CfnNotebookInstanceLifecycleConfig;

            let mergedScript = onStartScript;

            if (originalConfig && originalConfig.onStart) {
                const onStart = originalConfig.onStart;
                if (
                    Array.isArray(onStart) &&
                    onStart.length > 0 &&
                    typeof onStart[0] === 'object' &&
                    'content' in onStart[0] &&
                    onStart[0].content
                ) {
                    const existingContent = Buffer.from(
                        onStart[0].content,
                        'base64'
                    ).toString('utf8');
                    mergedScript = `${existingContent}\n\n${onStartScript}`;
                }
            }

            const mergedConfigName = `merged-auto-shutdown-${instance.node.id}`;

            return new CfnNotebookInstanceLifecycleConfig(stack, configId, {
                notebookInstanceLifecycleConfigName: mergedConfigName,
                onStart: [
                    {
                        content: Buffer.from(mergedScript).toString('base64')
                    }
                ]
            });
        }

        return new CfnNotebookInstanceLifecycleConfig(stack, configId, {
            notebookInstanceLifecycleConfigName: `auto-shutdown-${instance.node.id}`,
            onStart: [
                {
                    content: Buffer.from(onStartScript).toString('base64')
                }
            ]
        });
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
