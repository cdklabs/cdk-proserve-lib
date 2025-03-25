// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';
import { PassThrough } from 'stream';
import { GetObjectCommand, HeadObjectCommand, S3 } from '@aws-sdk/client-s3';
import { sdkStreamMixin } from '@aws-sdk/util-stream';
import { mockClient } from 'aws-sdk-client-mock';
import { vi, describe, beforeEach, it, expect, Mock } from 'vitest';
import { downloadS3Asset } from '../../../src/common/lambda/download-s3-asset';

// Mock fs.createWriteStream
vi.mock('node:fs', async () => {
    const createWriteStreamMock = vi.fn();

    return {
        default: {
            createWriteStream: createWriteStreamMock
        },
        createWriteStream: createWriteStreamMock
    };
});

describe('downloadS3Asset', () => {
    const mockS3 = mockClient(S3);

    beforeEach(() => {
        vi.clearAllMocks();
        mockS3.reset();
    });

    it('should download an S3 asset successfully', async () => {
        // Setup mock data
        const mockETag = '"abc123"';
        const mockFileName = 'test-file.json';
        const s3ObjectUri = `s3://test-bucket/${mockFileName}`;
        const expectedFilePath = path.join(os.tmpdir(), mockFileName);

        // Mock the S3 response for HeadObject
        mockS3.on(HeadObjectCommand).resolves({
            ETag: mockETag
        });

        // Create mock streams
        const mockReadable = new Readable({
            read() {} // required implementation
        });

        // Convert to SDK stream
        const mockSdkStream = sdkStreamMixin(mockReadable);

        // Use a PassThrough stream which is both readable and writable
        const mockPassThrough = new PassThrough();

        // Mock the S3 response for GetObject
        mockS3.on(GetObjectCommand).resolves({
            Body: mockSdkStream
        });

        // Mock createWriteStream
        const mockCreateWriteStream = vi.mocked(fs.createWriteStream);
        (fs.createWriteStream as Mock).mockReturnValue(mockPassThrough);

        // Store the original pipe method
        const originalPipe = Readable.prototype.pipe;

        // Mock the pipe method on all Readable instances
        Readable.prototype.pipe = vi.fn(function () {
            // Emit finish event on next tick
            process.nextTick(() => {
                mockPassThrough.emit('finish');
            });

            return mockPassThrough;
        }) as any;

        // Call the function
        const result = await downloadS3Asset(s3ObjectUri);

        // Restore original pipe method
        Readable.prototype.pipe = originalPipe;

        // Assertions
        expect(mockS3.calls()).toHaveLength(2); // One call to headObject, one to getObject

        // Check HeadObject was called with correct parameters
        const headCall = mockS3.call(0);
        expect(headCall.args[0].input).toEqual({
            Bucket: 'test-bucket',
            Key: mockFileName
        });

        // Check GetObject was called with correct parameters
        const getCall = mockS3.call(1);
        expect(getCall.args[0].input).toEqual({
            Bucket: 'test-bucket',
            Key: mockFileName
        });

        expect(mockCreateWriteStream).toHaveBeenCalledWith(expectedFilePath);

        expect(result).toEqual({
            filePath: expectedFilePath,
            etag: mockETag
        });
    });

    it('should handle nested S3 paths correctly', async () => {
        // Setup mock data with nested path
        const mockETag = '"xyz789"';
        const s3ObjectUri = 's3://test-bucket/nested/path/test-file.json';
        const mockFileName = 'test-file.json';
        const expectedFilePath = path.join(os.tmpdir(), mockFileName);

        // Mock the S3 response
        mockS3.on(HeadObjectCommand).resolves({
            ETag: mockETag
        });

        // Create mock streams
        const mockReadable = new Readable({
            read() {} // required implementation
        });

        // Convert to SDK stream
        const mockSdkStream = sdkStreamMixin(mockReadable);

        // Use a PassThrough stream which is both readable and writable
        const mockPassThrough = new PassThrough();

        mockS3.on(GetObjectCommand).resolves({
            Body: mockSdkStream
        });

        // Mock createWriteStream
        (fs.createWriteStream as Mock).mockReturnValue(mockPassThrough);

        // Store the original pipe method
        const originalPipe = Readable.prototype.pipe;

        // Mock the pipe method on all Readable instances
        Readable.prototype.pipe = vi.fn(function () {
            // Emit finish event on next tick
            process.nextTick(() => {
                mockPassThrough.emit('finish');
            });

            return mockPassThrough;
        }) as any;

        // Call the function
        const result = await downloadS3Asset(s3ObjectUri);

        // Restore original pipe method
        Readable.prototype.pipe = originalPipe;

        // Assertions
        // Check HeadObject was called with correct parameters
        const headCall = mockS3.call(0);
        expect(headCall.args[0].input).toEqual({
            Bucket: 'test-bucket',
            Key: 'nested/path/test-file.json'
        });

        // Check GetObject was called with correct parameters
        const getCall = mockS3.call(1);
        expect(getCall.args[0].input).toEqual({
            Bucket: 'test-bucket',
            Key: 'nested/path/test-file.json'
        });

        expect(fs.createWriteStream).toHaveBeenCalledWith(expectedFilePath);

        expect(result).toEqual({
            filePath: expectedFilePath,
            etag: mockETag
        });
    });

    it('should throw error when S3 object body is not a readable stream', async () => {
        // Setup mock data
        const s3ObjectUri = 's3://test-bucket/invalid-body.json';

        // Mock the S3 response with invalid body type
        mockS3.on(HeadObjectCommand).resolves({
            ETag: '"invalid-etag"'
        });

        mockS3.on(GetObjectCommand).resolves({
            Body: 'not a readable stream' as any
        });

        // Call the function and expect it to reject
        await expect(downloadS3Asset(s3ObjectUri)).rejects.toThrow(
            'S3 object body is not a readable stream'
        );
    });
});
