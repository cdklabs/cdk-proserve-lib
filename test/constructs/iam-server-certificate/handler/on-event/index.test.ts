// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    DeleteServerCertificateCommand,
    IAM,
    UploadServerCertificateCommand
} from '@aws-sdk/client-iam';
import {
    GetSecretValueCommand,
    SecretsManager
} from '@aws-sdk/client-secrets-manager';
import { GetParameterCommand, SSM } from '@aws-sdk/client-ssm';
import {
    CdkCustomResourceResponse,
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceUpdateEvent
} from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import 'aws-sdk-client-mock-jest';
import { handler } from '../../../../../src/constructs/iam-server-certificate/handler/on-event';
import {
    FailedToCreateIamServerCertificateException,
    FailedToRetrieveValueException
} from '../../../../../src/constructs/iam-server-certificate/handler/types/exceptions';
import { ResourceProperties } from '../../../../../src/constructs/iam-server-certificate/handler/types/resource-properties';
import { ResponseData } from '../../../../../src/constructs/iam-server-certificate/handler/types/resource-response';
import {
    buildMockCreateEvent,
    buildMockDeleteEvent,
    buildMockUpdateEvent,
    mockContext
} from '../../../../fixtures';
import {
    mockCertificateParameterName,
    mockCertificateSecretArn,
    mockCertificateValue,
    mockPrefix,
    mockPrivateKeyParameterName,
    mockPrivateKeySecretArn,
    mockPrivateKeyValue,
    mockServerCertificateArn,
    mockServerCertificateName,
    resourceType
} from '../../fixtures';

describe('IamServerCertificate Custom Resource On Event Handler', () => {
    const iamMock = mockClient(IAM);
    const secretsManagerMock = mockClient(SecretsManager);
    const ssmMock = mockClient(SSM);

    beforeEach(() => {
        iamMock.reset();
        secretsManagerMock.reset();
        ssmMock.reset();
    });

    it('should create an IAM Server Certificate when all data values come from AWS Systems Manager Parameter Store', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                CertificatePrefix: mockPrefix,
                Certificate: {
                    Id: mockCertificateParameterName,
                    Source: 'parameter'
                },
                PrivateKey: {
                    Id: mockPrivateKeyParameterName,
                    Source: 'parameter'
                }
            });

        ssmMock
            .on(GetParameterCommand)
            .rejects()
            .on(GetParameterCommand, {
                Name: mockCertificateParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockCertificateValue
                }
            })
            .on(GetParameterCommand, {
                Name: mockPrivateKeyParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockPrivateKeyValue
                }
            });

        iamMock
            .on(UploadServerCertificateCommand)
            .rejects()
            .on(UploadServerCertificateCommand, {
                CertificateBody: mockCertificateValue,
                PrivateKey: mockPrivateKeyValue
            })
            .resolves({
                ServerCertificateMetadata: {
                    Arn: mockServerCertificateArn,
                    Path: 'test-path',
                    ServerCertificateId: 'test-id',
                    ServerCertificateName: mockServerCertificateName
                }
            });

        // Act
        const result = await handler(mockEvent, mockContext);

        // Assert
        expect(result).toMatchObject<CdkCustomResourceResponse<ResponseData>>({
            Data: {
                Arn: mockServerCertificateArn
            }
        });
        expect(iamMock).toHaveReceivedCommandTimes(
            UploadServerCertificateCommand,
            1
        );
        expect(secretsManagerMock).not.toHaveReceivedAnyCommand();
        expect(ssmMock).toHaveReceivedCommandTimes(GetParameterCommand, 2);
    });

    it('should create an IAM Server Certificate when all data values come from AWS Secrets Manager', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                CertificatePrefix: mockPrefix,
                Certificate: {
                    Id: mockCertificateSecretArn,
                    Source: 'secret'
                },
                PrivateKey: {
                    Id: mockPrivateKeySecretArn,
                    Source: 'secret'
                }
            });

        secretsManagerMock
            .on(GetSecretValueCommand)
            .rejects()
            .on(GetSecretValueCommand, {
                SecretId: mockCertificateSecretArn
            })
            .resolves({
                SecretString: mockCertificateValue
            })
            .on(GetSecretValueCommand, {
                SecretId: mockPrivateKeySecretArn
            })
            .resolves({
                SecretString: mockPrivateKeyValue
            });

        iamMock
            .on(UploadServerCertificateCommand)
            .rejects()
            .on(UploadServerCertificateCommand, {
                CertificateBody: mockCertificateValue,
                PrivateKey: mockPrivateKeyValue
            })
            .resolves({
                ServerCertificateMetadata: {
                    Arn: mockServerCertificateArn,
                    Path: 'test-path',
                    ServerCertificateId: 'test-id',
                    ServerCertificateName: mockServerCertificateName
                }
            });

        // Act
        const result = await handler(mockEvent, mockContext);

        // Assert
        expect(result).toMatchObject<CdkCustomResourceResponse<ResponseData>>({
            Data: {
                Arn: mockServerCertificateArn
            }
        });
        expect(iamMock).toHaveReceivedCommandTimes(
            UploadServerCertificateCommand,
            1
        );
        expect(secretsManagerMock).toHaveReceivedCommandTimes(
            GetSecretValueCommand,
            2
        );
        expect(ssmMock).not.toHaveReceivedAnyCommand();
    });

    it('should create an IAM Server Certificate when the certificate comes from AWS Systems Manager Parameter Store and the private key comes from AWS Secrets Manager', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                CertificatePrefix: mockPrefix,
                Certificate: {
                    Id: mockCertificateParameterName,
                    Source: 'parameter'
                },
                PrivateKey: {
                    Id: mockPrivateKeySecretArn,
                    Source: 'secret'
                }
            });

        secretsManagerMock
            .on(GetSecretValueCommand)
            .rejects()
            .on(GetSecretValueCommand, {
                SecretId: mockPrivateKeySecretArn
            })
            .resolves({
                SecretString: mockPrivateKeyValue
            });

        ssmMock
            .on(GetParameterCommand)
            .rejects()
            .on(GetParameterCommand, {
                Name: mockCertificateParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockCertificateValue
                }
            });

        iamMock
            .on(UploadServerCertificateCommand)
            .rejects()
            .on(UploadServerCertificateCommand, {
                CertificateBody: mockCertificateValue,
                PrivateKey: mockPrivateKeyValue
            })
            .resolves({
                ServerCertificateMetadata: {
                    Arn: mockServerCertificateArn,
                    Path: 'test-path',
                    ServerCertificateId: 'test-id',
                    ServerCertificateName: mockServerCertificateName
                }
            });

        // Act
        const result = await handler(mockEvent, mockContext);

        // Assert
        expect(result).toMatchObject<CdkCustomResourceResponse<ResponseData>>({
            Data: {
                Arn: mockServerCertificateArn
            }
        });

        expect(iamMock).toHaveReceivedCommandTimes(
            UploadServerCertificateCommand,
            1
        );
        expect(secretsManagerMock).toHaveReceivedCommandTimes(
            GetSecretValueCommand,
            1
        );
        expect(ssmMock).toHaveReceivedCommandTimes(GetParameterCommand, 1);
    });

    it('should create an IAM Server Certificate when the certificate comes from AWS Secrets Manager and the private key comes from AWS Systems Manager Parameter Store', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                CertificatePrefix: mockPrefix,
                Certificate: {
                    Id: mockCertificateSecretArn,
                    Source: 'secret'
                },
                PrivateKey: {
                    Id: mockPrivateKeyParameterName,
                    Source: 'parameter'
                }
            });

        secretsManagerMock
            .on(GetSecretValueCommand)
            .rejects()
            .on(GetSecretValueCommand, {
                SecretId: mockCertificateSecretArn
            })
            .resolves({
                SecretString: mockCertificateValue
            });

        ssmMock
            .on(GetParameterCommand)
            .rejects()
            .on(GetParameterCommand, {
                Name: mockPrivateKeyParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockPrivateKeyValue
                }
            });

        iamMock
            .on(UploadServerCertificateCommand)
            .rejects()
            .on(UploadServerCertificateCommand, {
                CertificateBody: mockCertificateValue,
                PrivateKey: mockPrivateKeyValue
            })
            .resolves({
                ServerCertificateMetadata: {
                    Arn: mockServerCertificateArn,
                    Path: 'test-path',
                    ServerCertificateId: 'test-id',
                    ServerCertificateName: mockServerCertificateName
                }
            });

        // Act
        const result = await handler(mockEvent, mockContext);

        // Assert
        expect(result).toMatchObject<CdkCustomResourceResponse<ResponseData>>({
            Data: {
                Arn: mockServerCertificateArn
            }
        });
        expect(iamMock).toHaveReceivedCommandTimes(
            UploadServerCertificateCommand,
            1
        );
        expect(secretsManagerMock).toHaveReceivedCommandTimes(
            GetSecretValueCommand,
            1
        );
        expect(ssmMock).toHaveReceivedCommandTimes(GetParameterCommand, 1);
    });

    it('should return an appropriate error when the certificate fails to provision', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                CertificatePrefix: mockPrefix,
                Certificate: {
                    Id: mockCertificateParameterName,
                    Source: 'parameter'
                },
                PrivateKey: {
                    Id: mockPrivateKeyParameterName,
                    Source: 'parameter'
                }
            });

        ssmMock
            .on(GetParameterCommand)
            .rejects()
            .on(GetParameterCommand, {
                Name: mockCertificateParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockCertificateValue
                }
            })
            .on(GetParameterCommand, {
                Name: mockPrivateKeyParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockPrivateKeyValue
                }
            });

        iamMock
            .on(UploadServerCertificateCommand)
            .rejects()
            .on(UploadServerCertificateCommand, {
                CertificateBody: mockCertificateValue,
                PrivateKey: mockPrivateKeyValue
            })
            .resolves({});

        // Act
        const result = handler(mockEvent, mockContext);

        // Assert
        await expect(result).rejects.toThrow(
            FailedToCreateIamServerCertificateException
        );
        expect(iamMock).toHaveReceivedCommandTimes(
            UploadServerCertificateCommand,
            1
        );
        expect(secretsManagerMock).not.toHaveReceivedAnyCommand();
        expect(ssmMock).toHaveReceivedCommandTimes(GetParameterCommand, 2);
    });

    it('should return an appropriate error when the certificate cannot be loaded from AWS Systems Manager Parameter Store', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                CertificatePrefix: mockPrefix,
                Certificate: {
                    Id: mockCertificateParameterName,
                    Source: 'parameter'
                },
                PrivateKey: {
                    Id: mockPrivateKeyParameterName,
                    Source: 'parameter'
                }
            });

        ssmMock
            .on(GetParameterCommand)
            .rejects()
            .on(GetParameterCommand, {
                Name: mockCertificateParameterName,
                WithDecryption: true
            })
            .resolves({});

        // Act
        const result = handler(mockEvent, mockContext);

        // Assert
        await expect(result).rejects.toThrow(FailedToRetrieveValueException);
        await expect(result).rejects.toThrow(
            /AWS Systems Manager Parameter Store$/
        );

        expect(iamMock).not.toHaveReceivedAnyCommand();
        expect(secretsManagerMock).not.toHaveReceivedAnyCommand();
        expect(ssmMock).toHaveReceivedCommandTimes(GetParameterCommand, 1);
    });

    it('should return an appropriate error when the private key cannot be loaded from AWS Systems Manager Parameter Store', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                CertificatePrefix: mockPrefix,
                Certificate: {
                    Id: mockCertificateParameterName,
                    Source: 'parameter'
                },
                PrivateKey: {
                    Id: mockPrivateKeyParameterName,
                    Source: 'parameter'
                }
            });

        ssmMock
            .on(GetParameterCommand)
            .rejects()
            .on(GetParameterCommand, {
                Name: mockCertificateParameterName,
                WithDecryption: true
            })
            .resolves({
                Parameter: {
                    Value: mockCertificateValue
                }
            })
            .on(GetParameterCommand, {
                Name: mockPrivateKeyParameterName,
                WithDecryption: true
            })
            .resolves({});

        // Act
        const result = handler(mockEvent, mockContext);

        // Assert
        await expect(result).rejects.toThrow(FailedToRetrieveValueException);
        await expect(result).rejects.toThrow(
            /AWS Systems Manager Parameter Store$/
        );
        expect(iamMock).not.toHaveReceivedAnyCommand();
        expect(secretsManagerMock).not.toHaveReceivedAnyCommand();
        expect(ssmMock).toHaveReceivedCommandTimes(GetParameterCommand, 2);
    });

    it('should return an appropriate error when the certificate cannot be loaded from AWS Secrets Manager', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                CertificatePrefix: mockPrefix,
                Certificate: {
                    Id: mockCertificateSecretArn,
                    Source: 'secret'
                },
                PrivateKey: {
                    Id: mockPrivateKeyParameterName,
                    Source: 'parameter'
                }
            });

        secretsManagerMock
            .on(GetSecretValueCommand)
            .rejects()
            .on(GetSecretValueCommand, {
                SecretId: mockCertificateSecretArn
            })
            .resolves({});

        // Act
        const result = handler(mockEvent, mockContext);

        // Assert
        await expect(result).rejects.toThrow(FailedToRetrieveValueException);
        await expect(result).rejects.toThrow(/AWS Secrets Manager$/);
        expect(iamMock).not.toHaveReceivedAnyCommand();
        expect(secretsManagerMock).toHaveReceivedCommandTimes(
            GetSecretValueCommand,
            1
        );
        expect(ssmMock).not.toHaveReceivedAnyCommand();
    });

    it('should return an appropriate error when the private key cannot be loaded from AWS Secrets Manager', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceCreateEvent<ResourceProperties> =
            buildMockCreateEvent(resourceType, {
                CertificatePrefix: mockPrefix,
                Certificate: {
                    Id: mockCertificateSecretArn,
                    Source: 'secret'
                },
                PrivateKey: {
                    Id: mockPrivateKeySecretArn,
                    Source: 'secret'
                }
            });

        secretsManagerMock
            .on(GetSecretValueCommand)
            .rejects()
            .on(GetSecretValueCommand, {
                SecretId: mockCertificateSecretArn
            })
            .resolves({
                SecretString: mockCertificateValue
            })
            .on(GetSecretValueCommand, {
                SecretId: mockPrivateKeySecretArn
            })
            .resolves({});

        // Act
        const result = handler(mockEvent, mockContext);

        // Assert
        await expect(result).rejects.toThrow(FailedToRetrieveValueException);
        await expect(result).rejects.toThrow(/AWS Secrets Manager$/);
        expect(iamMock).not.toHaveReceivedAnyCommand();
        expect(secretsManagerMock).toHaveReceivedCommandTimes(
            GetSecretValueCommand,
            2
        );
        expect(ssmMock).not.toHaveReceivedAnyCommand();
    });

    it('should do nothing on an update', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceUpdateEvent<ResourceProperties> =
            buildMockUpdateEvent(
                mockServerCertificateName,
                resourceType,
                {
                    CertificatePrefix: mockPrefix,
                    Certificate: {
                        Id: mockCertificateSecretArn,
                        Source: 'secret'
                    },
                    PrivateKey: {
                        Id: mockPrivateKeySecretArn,
                        Source: 'secret'
                    }
                },
                {
                    CertificatePrefix: `${mockPrefix}old`,
                    Certificate: {
                        Id: mockCertificateParameterName,
                        Source: 'parameter'
                    },
                    PrivateKey: {
                        Id: mockPrivateKeyParameterName,
                        Source: 'parameter'
                    }
                }
            );

        // Act
        const result = await handler(mockEvent, mockContext);

        // Assert
        expect(result).toMatchObject<CdkCustomResourceResponse<ResponseData>>({
            PhysicalResourceId: mockServerCertificateName
        });
        expect(iamMock).not.toHaveReceivedAnyCommand();
        expect(secretsManagerMock).not.toHaveReceivedAnyCommand();
        expect(ssmMock).not.toHaveReceivedAnyCommand();
    });

    it('should remove the server certificate on a delete', async () => {
        // Arrange
        const mockEvent: CloudFormationCustomResourceDeleteEvent<ResourceProperties> =
            buildMockDeleteEvent(mockServerCertificateName, resourceType, {
                CertificatePrefix: mockPrefix,
                Certificate: {
                    Id: mockCertificateSecretArn,
                    Source: 'secret'
                },
                PrivateKey: {
                    Id: mockPrivateKeySecretArn,
                    Source: 'secret'
                }
            });

        iamMock
            .on(DeleteServerCertificateCommand)
            .rejects()
            .on(DeleteServerCertificateCommand, {
                ServerCertificateName: mockServerCertificateName
            });

        // Act
        const result = await handler(mockEvent, mockContext);

        // Assert
        expect(result).toMatchObject<CdkCustomResourceResponse<ResponseData>>({
            PhysicalResourceId: mockServerCertificateName
        });
        expect(iamMock).toHaveReceivedCommandTimes(
            DeleteServerCertificateCommand,
            1
        );
        expect(secretsManagerMock).not.toHaveReceivedAnyCommand();
        expect(ssmMock).not.toHaveReceivedAnyCommand();
    });
});
