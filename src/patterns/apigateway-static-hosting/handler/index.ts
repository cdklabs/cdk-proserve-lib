// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import SE from '@codegenie/serverless-express';
import { InlineHost } from '../worker/hosts/inline';
import { S3Host } from '../worker/hosts/s3';
import { Configuration } from '../worker/types/configuration';

/**
 * Lambda entry point
 */
export const handler = SE({
    app: (() => {
        const configuration = Configuration.load();
        const host = Configuration.useS3(configuration)
            ? new S3Host(configuration)
            : new InlineHost(configuration);

        return host.create();
    })(),
    binarySettings: {
        contentTypes: ['*/*'] // Forces all responses to come back base64 encoded
    }
});
