/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

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
