/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

import {
    OpenSearch,
    UpdateDomainConfigCommand,
    ValidationException
} from '@aws-sdk/client-opensearch';
import {
    GetSecretValueCommand,
    SecretsManager
} from '@aws-sdk/client-secrets-manager';
import { GetParameterCommand, SSM } from '@aws-sdk/client-ssm';
import {
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceUpdateEvent
} from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import { handler } from '../../../../../src/constructs/opensearch-admin-user/handler/on-event';
import { FailedToRetrieveCredentialValueException } from '../../../../../src/constructs/opensearch-admin-user/handler/types/exceptions';
import { ResourceProperties } from '../../../../../src/constructs/opensearch-admin-user/handler/types/resource-properties';
import { mockContext } from '../../../../fixtures';
import {
    mockCreateEvent,
    mockDomainName,
    mockPasswordParameterName,
    mockUserParameterName,
    mockUsernameValue,
    mockPasswordValue,
    mockPasswordSecretArn,
    mockUpdateEvent,
    mockDeleteEvent
} from '../../fixtures';

describe('Lambda function handler', () => {
    const aosMock = mockClient(OpenSearch);
    const ssmMock = mockClient(SSM);
    const secretsmanagerMock = mockClient(SecretsManager);

    beforeEach(() => {
        aosMock.reset();
        secretsmanagerMock.reset();
        ssmMock.reset();
    });

    it('should handle CREATE event with password parameter successfully', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            {
                ...mockCreateEvent,
                ResourceProperties: {
                    ...mockCreateEvent.ResourceProperties,
                    PasswordParameterName: mockPasswordParameterName
                }
            };

        ssmMock
            .on(GetParameterCommand)
            .rejects()
            .on(GetParameterCommand, {
                Name: mockUserParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockUsernameValue
                }
            })
            .on(GetParameterCommand, {
                Name: mockPasswordParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockPasswordValue
                }
            });

        aosMock
            .on(UpdateDomainConfigCommand)
            .rejects()
            .on(UpdateDomainConfigCommand, {
                DomainName: mockDomainName,
                AdvancedSecurityOptions: {
                    MasterUserOptions: {
                        MasterUserName: mockUsernameValue,
                        MasterUserPassword: mockPasswordValue
                    },
                    InternalUserDatabaseEnabled: true
                }
            });

        // Act
        const result = await handler(mockEvent, mockContext);

        // Assert
        expect(result).toEqual({ PhysicalResourceId: mockDomainName });
        expect(aosMock.calls()).toHaveLength(1);
        expect(secretsmanagerMock.calls()).toHaveLength(0);
        expect(ssmMock.calls()).toHaveLength(2);
    });

    it('should handle CREATE event with password secret successfully', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            {
                ...mockCreateEvent,
                ResourceProperties: {
                    ...mockCreateEvent.ResourceProperties,
                    PasswordSecretArn: mockPasswordSecretArn
                }
            };

        ssmMock
            .on(GetParameterCommand)
            .rejects()
            .on(GetParameterCommand, {
                Name: mockUserParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockUsernameValue
                }
            });

        secretsmanagerMock
            .on(GetSecretValueCommand)
            .rejects()
            .on(GetSecretValueCommand, {
                SecretId: mockPasswordSecretArn
            })
            .resolves({
                SecretString: mockPasswordValue
            });

        aosMock
            .on(UpdateDomainConfigCommand)
            .rejects()
            .on(UpdateDomainConfigCommand, {
                DomainName: mockDomainName,
                AdvancedSecurityOptions: {
                    MasterUserOptions: {
                        MasterUserName: mockUsernameValue,
                        MasterUserPassword: mockPasswordValue
                    },
                    InternalUserDatabaseEnabled: true
                }
            });

        // Act
        const result = await handler(mockEvent, mockContext);

        // Assert
        expect(result).toEqual({ PhysicalResourceId: mockDomainName });
        expect(aosMock.calls()).toHaveLength(1);
        expect(secretsmanagerMock.calls()).toHaveLength(1);
        expect(ssmMock.calls()).toHaveLength(1);
    });

    it('should handle UPDATE event successfully', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
            {
                ...mockUpdateEvent,
                OldResourceProperties: {
                    ...mockUpdateEvent.OldResourceProperties,
                    PasswordParameterName: `${mockPasswordParameterName}old`
                },
                ResourceProperties: {
                    ...mockUpdateEvent.ResourceProperties,
                    PasswordParameterName: mockPasswordParameterName
                }
            };

        // Act
        const result = await handler(mockEvent, mockContext);

        // Assert
        expect(result).toEqual({ PhysicalResourceId: mockDomainName });
        expect(aosMock.calls()).toHaveLength(0);
        expect(secretsmanagerMock.calls()).toHaveLength(0);
        expect(ssmMock.calls()).toHaveLength(0);
    });

    it('should handle DELETE event successfully', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
            {
                ...mockDeleteEvent,
                ResourceProperties: {
                    ...mockDeleteEvent.ResourceProperties,
                    PasswordParameterName: mockPasswordParameterName
                }
            };

        // Act
        const result = await handler(mockEvent, mockContext);

        // Assert
        expect(result).toEqual({ PhysicalResourceId: mockDomainName });
        expect(aosMock.calls()).toHaveLength(0);
        expect(secretsmanagerMock.calls()).toHaveLength(0);
        expect(ssmMock.calls()).toHaveLength(0);
    });

    it('onCreate should return an error message if the credential source is missing', async () => {
        // Act
        const actual = handler(mockCreateEvent, mockContext);

        //Assert
        await expect(actual)
            .rejects.toThrow(
                'Password must be specified as either an AWS Systems Manager Parameter Store parameter or an AWS Secrets Manager secret'
            )
            .finally(() => {
                expect(aosMock.calls()).toHaveLength(0);
                expect(secretsmanagerMock.calls()).toHaveLength(0);
                expect(ssmMock.calls()).toHaveLength(1);
            });
    });

    it('onCreate should return an error message if multiple credential sources are specified', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            {
                ...mockCreateEvent,
                ResourceProperties: {
                    ...mockCreateEvent.ResourceProperties,
                    PasswordParameterName: mockPasswordParameterName,
                    PasswordSecretArn: mockPasswordSecretArn
                }
            };

        // Act
        const actual = handler(mockEvent, mockContext);

        //Assert
        await expect(actual)
            .rejects.toThrow(
                'Password must be specified as either an AWS Systems Manager Parameter Store parameter or an AWS Secrets Manager secret'
            )
            .finally(() => {
                expect(aosMock.calls()).toHaveLength(0);
                expect(secretsmanagerMock.calls()).toHaveLength(0);
                expect(ssmMock.calls()).toHaveLength(1);
            });
    });

    it('onCreate should return an error message when updateDomainConfig fails', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            {
                ...mockCreateEvent,
                ResourceProperties: {
                    ...mockCreateEvent.ResourceProperties,
                    PasswordParameterName: mockPasswordParameterName
                }
            };

        ssmMock
            .on(GetParameterCommand)
            .rejects()
            .on(GetParameterCommand, {
                Name: mockUserParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockUsernameValue
                }
            })
            .on(GetParameterCommand, {
                Name: mockPasswordParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockPasswordValue
                }
            });

        aosMock.on(UpdateDomainConfigCommand).rejects(
            new ValidationException({
                message: 'Bad format',
                $metadata: {}
            })
        );

        // Act
        const actual = handler(mockEvent, mockContext);

        // Assert
        await expect(actual)
            .rejects.toThrow(ValidationException)
            .finally(() => {
                expect(aosMock.calls()).toHaveLength(1);
                expect(secretsmanagerMock.calls()).toHaveLength(0);
                expect(ssmMock.calls()).toHaveLength(2);
            });
    });

    it('onCreate should return an error message when retrieving the credential as parameter fails', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            {
                ...mockCreateEvent,
                ResourceProperties: {
                    ...mockCreateEvent.ResourceProperties,
                    PasswordParameterName: mockPasswordParameterName
                }
            };

        ssmMock
            .on(GetParameterCommand)
            .rejects()
            .on(GetParameterCommand, {
                Name: mockUserParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockUsernameValue
                }
            })
            .on(GetParameterCommand, {
                Name: mockPasswordParameterName,
                WithDecryption: true
            })
            .resolves({});

        // Act
        const actual = handler(mockEvent, mockContext);

        // Assert
        await expect(actual)
            .rejects.toThrow(FailedToRetrieveCredentialValueException)
            .finally(() => {
                expect(aosMock.calls()).toHaveLength(0);
                expect(secretsmanagerMock.calls()).toHaveLength(0);
                expect(ssmMock.calls()).toHaveLength(2);
            });
    });

    it('onCreate should return an error message when retrieving the credential as secret fails', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            {
                ...mockCreateEvent,
                ResourceProperties: {
                    ...mockCreateEvent.ResourceProperties,
                    PasswordSecretArn: mockPasswordSecretArn
                }
            };

        ssmMock
            .on(GetParameterCommand)
            .rejects()
            .on(GetParameterCommand, {
                Name: mockUserParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockUsernameValue
                }
            });

        secretsmanagerMock
            .on(GetSecretValueCommand)
            .rejects()
            .on(GetSecretValueCommand, {
                SecretId: mockPasswordSecretArn
            })
            .resolves({});

        // Act
        const actual = handler(mockEvent, mockContext);

        // Assert
        await expect(actual)
            .rejects.toThrow(FailedToRetrieveCredentialValueException)
            .finally(() => {
                expect(aosMock.calls()).toHaveLength(0);
                expect(secretsmanagerMock.calls()).toHaveLength(1);
                expect(ssmMock.calls()).toHaveLength(1);
            });
    });
});
