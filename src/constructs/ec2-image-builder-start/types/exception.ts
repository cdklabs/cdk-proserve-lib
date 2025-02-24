// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export class Ec2ImageBuilderStartTimeoutError extends Error {
    constructor() {
        super('Timeout cannot exceed 12 hours');
        this.name = 'Ec2ImageBuilderStartTimeoutError';
    }
}

export class Ec2ImageBuilderStartHashError extends Error {
    constructor() {
        super('Hash must be 7 characters or less');
        this.name = 'Ec2ImageBuilderStartHashError';
    }
}
