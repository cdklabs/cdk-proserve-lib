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
