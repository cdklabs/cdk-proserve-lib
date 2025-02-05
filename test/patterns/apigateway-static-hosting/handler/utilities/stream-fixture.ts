// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { createReadStream } from 'node:fs';
import { Readable } from 'node:stream';
import { type SdkStream } from '@smithy/types';
import { sdkStreamMixin } from '@smithy/util-stream-node';

/**
 * Converts text input into a readable stream that can be injected through the S3 mock client
 * @param lines Text to stream
 * @returns Readable S3 stream containing the text
 */
export function streamText(lines: string[]): SdkStream<Readable> {
    const stream = new Readable();

    for (const l of lines) {
        stream.push(l);
    }

    stream.push(null);

    return sdkStreamMixin(stream);
}

/**
 * Converts the contents of a file into a readable stream that can be injected through the S3 mock client
 * @param filepath Path to the file which should be streamed
 * @returns Readable S3 stream containing the file contents
 */
export function streamFile(filepath: string): SdkStream<Readable> {
    const stream = createReadStream(filepath);
    return sdkStreamMixin(stream);
}
