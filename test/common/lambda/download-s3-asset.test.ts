// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { tmpdir } from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';
import { GetObjectCommand, HeadObjectCommand, S3 } from '@aws-sdk/client-s3';
import { sdkStreamMixin } from '@aws-sdk/util-stream';
import { mockClient } from 'aws-sdk-client-mock';
import { vol, fs } from 'memfs';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { downloadS3Asset } from '../../../src/common/lambda/download-s3-asset';

vi.mock('node:fs');
vi.mock('node:fs/promises');
vi.mock('node:os');

describe('downloadS3Asset', () => {
    const mockS3 = mockClient(S3);
    const tempDir = tmpdir();

    beforeEach(() => {
        vi.clearAllMocks();
        mockS3.reset();
        vol.reset();

        // Create empty directory on mocked filesystem
        vol.fromJSON({
            [tempDir]: null
        });
    });

    it('should download an S3 asset successfully', async () => {
        // Setup mock data
        const mockETag = '"abc123"';
        const mockFileName = 'test-file.json';
        const s3ObjectUri = `s3://test-bucket/${mockFileName}`;
        const expectedFilePath = path.join(tempDir, mockFileName);
        const mockContent = 'file content';

        // Mock the S3 response for HeadObject
        mockS3.on(HeadObjectCommand).resolves({
            ETag: mockETag
        });

        // Create a readable stream with mock content
        const mockReadable = new Readable();
        mockReadable.push(mockContent);
        mockReadable.push(null); // End the stream

        // Convert to SDK stream
        const mockSdkStream = sdkStreamMixin(mockReadable);

        // Mock the S3 response for GetObject
        mockS3.on(GetObjectCommand).resolves({
            Body: mockSdkStream
        });

        // Call the function
        const result = await downloadS3Asset(s3ObjectUri);

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

        // Verify the file was created with correct content
        expect(fs.existsSync(expectedFilePath)).toBe(true);
        expect(fs.readFileSync(expectedFilePath, 'utf8')).toBe(mockContent);

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
        const expectedFilePath = path.join(tempDir, mockFileName);
        const mockContent = 'nested file content';

        // Mock the S3 response
        mockS3.on(HeadObjectCommand).resolves({
            ETag: mockETag
        });

        // Create a readable stream with mock content
        const mockReadable = new Readable();
        mockReadable.push(mockContent);
        mockReadable.push(null); // End the stream

        // Convert to SDK stream
        const mockSdkStream = sdkStreamMixin(mockReadable);

        mockS3.on(GetObjectCommand).resolves({
            Body: mockSdkStream
        });

        // Call the function
        const result = await downloadS3Asset(s3ObjectUri);

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

        // Verify the file was created with correct content
        expect(fs.existsSync(expectedFilePath)).toBe(true);
        expect(fs.readFileSync(expectedFilePath, 'utf8')).toBe(mockContent);

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
