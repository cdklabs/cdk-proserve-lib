// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export class CdkNagError extends Error {
    constructor(
        message: string,
        public annotations: any[]
    ) {
        super(message);
        this.name = 'CdkNagError';
    }
}
