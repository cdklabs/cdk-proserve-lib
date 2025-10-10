// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { buildMockArn, mockAccount, mockRegion } from '../../../fixtures';

/**
 * Mock AWS Systems Manager Parameter Store parameter name for the certificate parameter
 */
export const mockCertificateParameterName = '/test/certificate';

/**
 * Mock AWS Secrets Manager secret ARN for the certificate parameter
 */
export const mockCertificateSecretArn = buildMockArn(
    'aws',
    'secretsmanager',
    'secret:TestCertificateSecret',
    mockRegion,
    mockAccount
);

/**
 * Mock value for the certificate
 */
export const mockCertificateValue = 'test-certifcate-value';

/**
 * Mock AWS Systems Manager Parameter Store parameter name for the certificate chain parameter
 */
export const mockCertificateChainParameterName = '/test/certificate-chain';

/**
 * Mock AWS Secrets Manager secret ARN for the certificate parameter
 */
export const mockCertificateChainSecretArn = buildMockArn(
    'aws',
    'secretsmanager',
    'secret:TestCertificateChainSecret',
    mockRegion,
    mockAccount
);

/**
 * Mock value for the certificate chain
 */
export const mockCertificateChainValue = 'test-certifcate-chain-value';

/**
 * Mock AWS Systems Manager Parameter Store parameter name for the private key parameter
 */
export const mockPrivateKeyParameterName = '/test/private-key';

/**
 * Mock AWS Secrets Manager secret ARN for the private key parameter
 */
export const mockPrivateKeySecretArn = buildMockArn(
    'aws',
    'secretsmanager',
    'secret:TestPrivateKeySecret',
    mockRegion,
    mockAccount
);

/**
 * Mock value for the private key
 */
export const mockPrivateKeyValue = 'test-private-key-value';

/**
 * Custom resource type used in AWS CloudFormation
 */
export const resourceType = 'Custom::IamServerCertificate';

/**
 * Mock value for the server certificate name prefix
 */
export const mockPrefix = 'test';

/**
 * Mock vaule for the server certificate name
 */
export const mockServerCertificateName = `${mockPrefix}-testname`;

/**
 * Mock ARN for the IAM Server Certificate
 */
export const mockServerCertificateArn = buildMockArn(
    'aws',
    'iam',
    mockServerCertificateName,
    mockRegion,
    mockAccount
);
