// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from 'vitest';
import { AwsHttpClientOptions } from '../../../../../../src/common/lambda/aws-http-client/types';
import { getClient } from '../../../../../../src/constructs/opensearch-provision-domain/handler/on-event/utils/client';
import { buildMockCreateEvent } from '../fixtures';

interface Client {
    readonly options: AwsHttpClientOptions;
}

describe('OpenSearchProvisionDomain Custom Resource On Event Handler Client Utility', () => {
    describe('Create', () => {
        it('should create an HTTP client for interacting with OpenSearch', async () => {
            // Arrange
            const event = buildMockCreateEvent();

            // Act
            const client = getClient(event);
            const accessibleClient = client as unknown as Client;

            // Assert
            expect(accessibleClient.options.baseUrl).toBe(
                `https://${event.ResourceProperties.DomainEndpoint}`
            );
            expect(
                accessibleClient.options.passNonSuccessfulStatusCodes
            ).toBeTruthy();
            expect(accessibleClient.options.roleArn).toBe(
                event.ResourceProperties.AdminRoleArn
            );
            expect(accessibleClient.options.service).toBe('es');
            expect(accessibleClient.options.timeout).toBe(45000);
        });
    });
});
