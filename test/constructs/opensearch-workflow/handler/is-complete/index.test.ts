// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { AwsHttpClient } from '../../../../../src/common/lambda/aws-http-client';
import { AwsHttpClientResponseError } from '../../../../../src/common/lambda/aws-http-client/types/exception';
import { handler } from '../../../../../src/constructs/opensearch-workflow/handler/is-complete';
import { WorkflowStatusResponse } from '../../../../../src/constructs/opensearch-workflow/handler/types/workflow-response';
import { flattenResponse } from '../../../../../src/constructs/opensearch-workflow/handler/utils/flatten';
import {
    createMockResponse,
    mockContext,
    mockCreateCompleteEvent,
    mockCreateProvisioningEvent,
    mockDeleteEvent,
    mockDeleteNoDestructiveEvent,
    mockUpdateEvent,
    mockWorkflowId
} from '../../fixtures';

// Mock the dependencies
jest.mock('../../../../../src/common/lambda/aws-http-client');

describe('OpenSearch Workflow IsComplete Handler', () => {
    let mockHttpClient: jest.Mocked<AwsHttpClient>;

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock HTTP client
        mockHttpClient = {
            get: jest.fn()
        } as unknown as jest.Mocked<AwsHttpClient>;
        (
            AwsHttpClient as jest.MockedClass<typeof AwsHttpClient>
        ).mockImplementation(() => mockHttpClient);

        // Default GET response
        mockHttpClient.get.mockImplementation(() => {
            return Promise.resolve(
                createMockResponse({
                    state: 'COMPLETED',
                    workflow_id: mockWorkflowId
                })
            );
        });
    });

    it('should return IsComplete: true when workflow is COMPLETED for CREATE', async () => {
        // Act
        const response = await handler(mockCreateCompleteEvent, mockContext);

        // Assert
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            `/_plugins/_flow_framework/workflow/${mockWorkflowId}/_status`
        );
        expect(response).toEqual({
            IsComplete: true,
            Data: { workflow_id: mockWorkflowId }
        });
    });

    it('should return IsComplete: false when workflow is still PROVISIONING for CREATE', async () => {
        // Arrange
        mockHttpClient.get.mockResolvedValueOnce(
            createMockResponse({ state: 'PROVISIONING' })
        );

        // Act
        const response = await handler(
            mockCreateProvisioningEvent,
            mockContext
        );

        // Assert
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            `/_plugins/_flow_framework/workflow/${mockWorkflowId}/_status`
        );
        expect(response).toEqual({
            IsComplete: false
        });
    });

    it('should return IsComplete: false when workflow is NOT_STARTED for CREATE', async () => {
        // Arrange
        mockHttpClient.get.mockResolvedValueOnce(
            createMockResponse({ state: 'NOT_STARTED' })
        );

        // Act
        const response = await handler(
            mockCreateProvisioningEvent,
            mockContext
        );

        // Assert
        expect(response).toEqual({
            IsComplete: false
        });
    });

    it('should return IsComplete: true when workflow is COMPLETED for UPDATE', async () => {
        // Act
        const response = await handler(mockUpdateEvent, mockContext);

        // Assert
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            `/_plugins/_flow_framework/workflow/${mockWorkflowId}/_status`
        );
        expect(response).toEqual({
            IsComplete: true,
            Data: { workflow_id: mockWorkflowId }
        });
    });

    it('should return IsComplete: false when workflow still exists for DELETE', async () => {
        // Act
        const response = await handler(mockDeleteEvent, mockContext);

        // Assert
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            `/_plugins/_flow_framework/workflow/${mockWorkflowId}/_status`
        );
        expect(response).toEqual({
            IsComplete: false
        });
    });

    it('should return IsComplete: true when workflow does not exist for DELETE', async () => {
        // Arrange
        const error = new AwsHttpClientResponseError({
            statusCode: 404,
            headers: {},
            body: 'Not Found'
        });
        mockHttpClient.get.mockRejectedValueOnce(error);

        // Act
        const response = await handler(mockDeleteEvent, mockContext);

        // Assert
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            `/_plugins/_flow_framework/workflow/${mockWorkflowId}/_status`
        );
        expect(response).toEqual({
            IsComplete: true
        });
    });

    it('should return IsComplete: true without checking when destructive operations are not allowed for DELETE', async () => {
        // Act
        const response = await handler(
            mockDeleteNoDestructiveEvent,
            mockContext
        );

        // Assert
        expect(mockHttpClient.get).not.toHaveBeenCalled();
        expect(response).toEqual({
            IsComplete: true
        });
    });

    it('should throw error when workflow is in an unexpected state', async () => {
        // Arrange
        mockHttpClient.get.mockResolvedValueOnce(
            createMockResponse({ state: 'FAILED', error: 'Workflow error' })
        );

        // Act & Assert
        await expect(
            handler(mockCreateCompleteEvent, mockContext)
        ).rejects.toThrow(
            `Unexpected state (FAILED) while provisioning workflow (${mockWorkflowId}), error: Workflow error`
        );
    });

    it('should throw error when API returns non-404 error during DELETE check', async () => {
        // Arrange
        const error = new AwsHttpClientResponseError({
            statusCode: 500,
            headers: {},
            body: 'Server Error'
        });
        mockHttpClient.get.mockRejectedValueOnce(error);

        // Act & Assert
        await expect(handler(mockDeleteEvent, mockContext)).rejects.toThrow();
    });

    it('should handle unexpected errors', async () => {
        // Arrange
        const error = new Error('Some other error');
        mockHttpClient.get.mockRejectedValueOnce(error);

        // Act & Assert
        await expect(handler(mockDeleteEvent, mockContext)).rejects.toThrow();
    });

    it('should throw error when PhysicalResourceId is missing', async () => {
        // Arrange
        const eventWithoutPhysicalId = {
            ...mockCreateCompleteEvent,
            PhysicalResourceId: undefined
        } as unknown as typeof mockCreateCompleteEvent;

        // Act & Assert
        await expect(
            handler(eventWithoutPhysicalId, mockContext)
        ).rejects.toThrow(
            'Could not find PhysicalResourceId (workflowId) from Custom Resource state.'
        );
    });

    it('should correctly flatten workflow response with resources', () => {
        // Arrange
        const workflowId = 'workflow-123';
        const workflowResponse: WorkflowStatusResponse = {
            workflow_id: workflowId,
            state: 'COMPLETED',
            resources_created: [
                {
                    resource_id: 'bar',
                    resource_type: 'model',
                    workflow_step_id: 'foo',
                    workflow_step_name: 'step1'
                },
                {
                    resource_id: 'zing',
                    resource_type: 'index',
                    workflow_step_id: 'baz',
                    workflow_step_name: 'step2'
                }
            ]
        };

        // Act
        const result = flattenResponse(workflowResponse);

        // Assert
        expect(result).toEqual({
            workflow_id: workflowId,
            foo: 'bar',
            baz: 'zing'
        });
    });
});
