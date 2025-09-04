// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { App, IAspect, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Construct } from 'constructs';
import { describe, beforeEach, afterEach } from 'vitest';
import { validateNoCdkNagFindings, getTemplateWithCdkNag } from '.';

export function describeCdkTest(
    subject: new (...args: any[]) => Construct | IAspect,
    withCdk: (
        name: string,
        getStack: () => Stack,
        getTemplate: () => Template,
        getApp: () => App
    ) => void
) {
    let app: App | undefined;
    let stack: Stack;

    describe(subject.name, () => {
        beforeEach(() => {
            // Only create an App if the user has called getApp
            if (withCdk.length === 4) {
                app = new App();
            }

            stack = new Stack(app, `TST${new Date().getTime()}`, {
                env: {
                    account: '123456789012',
                    region: 'us-east-1'
                }
            });
        });

        afterEach(() => {
            // Check if the construct is a Construct (not an Aspect)
            const isConstruct = subject.prototype instanceof Construct;
            if (isConstruct) {
                validateNoCdkNagFindings(
                    stack,
                    isConstruct ? subject.name : undefined
                );
            }
        });

        withCdk(
            subject.name,
            () => stack,
            () => getTemplateWithCdkNag(stack),
            () => app!
        );
    });
}
