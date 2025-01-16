// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

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
