// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import SE from '@codegenie/serverless-express';
import { InlineHost } from './hosts/inline';
import { S3Host } from './hosts/s3';
import { Configuration, useS3 } from './types/configuration';

const configuration = Configuration.load();
const host = useS3(configuration)
    ? new S3Host(configuration)
    : new InlineHost(configuration);

/**
 * Lambda entry point
 */
export const handler = SE({
    app: host.create(),
    binarySettings: {
        contentTypes: ['*/*'] // Forces all responses to come back base64 encoded
    }
});
