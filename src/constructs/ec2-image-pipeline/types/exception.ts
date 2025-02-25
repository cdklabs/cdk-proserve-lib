// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export class Ec2ImagePipelineBuildError extends Error {
    constructor() {
        super(
            'Cannot access the `latestAmi` property of the Image Pipeline without configuring buildConfiguration.start and buildConfiguration.waitForCompletion as true.'
        );
        this.name = 'Ec2ImagePipelineBuildError';
    }
}
