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

/**
 * Available backends for sensitive data elements
 */
export type Source = 'parameter' | 'secret';

/**
 * Properties for elements of a Server Certificate
 */
export interface ServerCertificateElement {
    /**
     * Which backend the value should be loaded from
     */
    readonly Source: Source;

    /**
     * The unique identifier used to load the value from the backend
     */
    readonly Id: string;
}

/**
 * Invocation properties for the Custom Resource
 */
export interface ResourceProperties {
    /**
     * Prefix to prepend to the AWS IAM Server Certificate name
     */
    readonly CertificatePrefix: string;

    /**
     * Properties for the public certificate portion of the server certificate
     */
    readonly Certificate: ServerCertificateElement;

    /**
     * Properties for the private key portion of the server certificate
     */
    readonly PrivateKey: ServerCertificateElement;
}
