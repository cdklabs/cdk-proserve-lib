// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, beforeEach, afterEach, it, vi, expect, Mock } from 'vitest';
import { waitForOpenSearchAvailability } from '../../../src/common/lambda/aos-availability-check';
import { AwsHttpClient } from '../../../src/common/lambda/aws-http-client';

// Mock the AwsHttpClient
vi.mock('../../../src/common/lambda/aws-http-client');

describe('waitForOpenSearchAvailability', () => {
    let mockClient: AwsHttpClient;
    let mockGet: Mock;
    let consoleInfoSpy: any;

    beforeEach(() => {
        // Mock console.info to avoid cluttering test output
        consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

        // Create mock client with get method
        mockGet = vi.fn();
        mockClient = {
            get: mockGet
        } as any;
    });

    afterEach(() => {
        vi.clearAllMocks();
        consoleInfoSpy.mockRestore();
    });

    describe('Successful availability check', () => {
        it('should resolve immediately when OpenSearch is available', async () => {
            mockGet.mockResolvedValueOnce({
                statusCode: 200
            });

            await waitForOpenSearchAvailability(mockClient);

            expect(mockGet).toHaveBeenCalledExactlyOnceWith('/_cluster/health');
            expect(consoleInfoSpy).toHaveBeenCalledWith(
                'OpenSearch is available and ready'
            );
        });

        it('should use custom parameters when provided', async () => {
            mockGet.mockResolvedValueOnce({
                statusCode: 200
            });

            await waitForOpenSearchAvailability(mockClient, 5, 1000);

            expect(mockGet).toHaveBeenCalledExactlyOnceWith('/_cluster/health');
        });
    });

    describe('Retry behavior', () => {
        it('should retry when OpenSearch returns non-200 status', async () => {
            mockGet
                .mockResolvedValueOnce({ statusCode: 503 })
                .mockResolvedValueOnce({ statusCode: 200 });

            await waitForOpenSearchAvailability(mockClient, 3, 100);

            expect(mockGet).toHaveBeenCalledTimes(2);
            expect(consoleInfoSpy).toHaveBeenCalledWith(
                'OpenSearch not ready (attempt 1/3). Waiting...'
            );
            expect(consoleInfoSpy).toHaveBeenCalledWith(
                'OpenSearch is available and ready'
            );
        });

        it('should retry when request throws an error', async () => {
            mockGet
                .mockRejectedValueOnce(new Error('Connection failed'))
                .mockResolvedValueOnce({ statusCode: 200 });

            await waitForOpenSearchAvailability(mockClient, 3, 100);

            expect(mockGet).toHaveBeenCalledTimes(2);
            expect(consoleInfoSpy).toHaveBeenCalledWith(
                'OpenSearch not ready (attempt 1/3). Waiting...'
            );
        });
    });

    describe('Error conditions', () => {
        it('should throw error when max attempts exceeded with non-200 status', async () => {
            mockGet.mockResolvedValue({ statusCode: 503 });

            await expect(
                waitForOpenSearchAvailability(mockClient, 2, 100)
            ).rejects.toThrow('OpenSearch is not available after 2 attempts.');

            expect(mockGet).toHaveBeenCalledTimes(2);
        });

        it('should throw error when max attempts exceeded with connection errors', async () => {
            mockGet.mockRejectedValue(new Error('Connection failed'));

            await expect(
                waitForOpenSearchAvailability(mockClient, 2, 100)
            ).rejects.toThrow('OpenSearch is not available after 2 attempts.');

            expect(mockGet).toHaveBeenCalledTimes(2);
        });

        it('should throw max attempts error for non-200 status codes', async () => {
            mockGet.mockResolvedValue({ statusCode: 404 });

            await expect(
                waitForOpenSearchAvailability(mockClient, 1, 100)
            ).rejects.toThrow('OpenSearch is not available after 1 attempts.');
        });
    });

    describe('Default parameters', () => {
        it('should use default maxAttempts and retryInterval', async () => {
            mockGet.mockResolvedValue({ statusCode: 200 });

            await waitForOpenSearchAvailability(mockClient);

            expect(mockGet).toHaveBeenCalledExactlyOnceWith('/_cluster/health');
        });

        it('should respect default maxAttempts when failing', async () => {
            mockGet.mockRejectedValue(new Error('Connection failed'));

            await expect(
                waitForOpenSearchAvailability(mockClient, 15, 100)
            ).rejects.toThrow('OpenSearch is not available after 15 attempts.');

            expect(mockGet).toHaveBeenCalledTimes(15);
        });
    });
});
