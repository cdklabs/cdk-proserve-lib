// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Token } from 'aws-cdk-lib';

export enum ValidationTypes {
    AWS_ARN = 'AWS_ARN',
    SEMVER = 'SEMVER'
}

const ValidationPatterns: Record<ValidationTypes, RegExp> = {
    [ValidationTypes.AWS_ARN]: /^arn:([a-z0-9-]+):([a-z0-9-]+):/,
    [ValidationTypes.SEMVER]:
        /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
};

export function validate(parameter: string, type: ValidationTypes): void {
    if (!Token.isUnresolved(parameter)) {
        const pattern = ValidationPatterns[type];
        // nosemgrep: nodejs_scan.javascript-dos-rule-regex_dos
        if (!pattern.test(parameter)) {
            throw new Error(
                `Invalid format for parameter value "${parameter}". Expected type: ${type}. Please ensure the parameter matches the required format.`
            );
        }
    }
}
