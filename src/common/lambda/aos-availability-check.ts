// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { AwsHttpClient } from './aws-http-client';

/**
 * Checks if OpenSearch is available and ready to accept requests
 * @param client AwsHttpClient for making requests to OpenSearch
 * @param maxAttempts Maximum number of retry attempts
 * @param retryInterval Interval between retries in milliseconds
 * @returns Promise that resolves when OpenSearch is available
 */
export async function waitForOpenSearchAvailability(
    client: AwsHttpClient,
    maxAttempts: number = 15,
    retryInterval: number = 60000
): Promise<void> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            // Try to hit the cluster health endpoint
            const healthResponse = await client.get('/_cluster/health');
            if (healthResponse.statusCode !== 200) {
                throw new Error(
                    'Unable to get /_cluster/health to determine availability.'
                );
            }

            console.info('OpenSearch is available and ready');
            return;
        } catch (error) {
            console.info(
                `OpenSearch not ready (attempt ${attempt + 1}/${maxAttempts}). Waiting...`
            );

            if (attempt === maxAttempts - 1) {
                throw new Error(
                    `OpenSearch is not available after ${maxAttempts} attempts.`
                );
            }

            await new Promise((resolve) => setTimeout(resolve, retryInterval));
        }
    }
}
