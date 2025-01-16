// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Ec2LinuxImagePipeline } from '..';

export class FeatureError extends Error {
    constructor(
        feature: Ec2LinuxImagePipeline.Feature,
        operatingSystem?: Ec2LinuxImagePipeline.OperatingSystem,
        message?: string
    ) {
        let defaultMessage: string;
        if (operatingSystem) {
            defaultMessage = `Feature '${feature}' is not compatible with the operating system '${operatingSystem}'.`;
        } else {
            defaultMessage = `Feature '${feature}' is not currently supported.`;
        }
        super(message ?? defaultMessage);
        this.name = 'FeatureError';
    }
}
