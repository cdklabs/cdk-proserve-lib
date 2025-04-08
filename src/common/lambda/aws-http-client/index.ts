// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Sha256 } from '@aws-crypto/sha256-js';
import { STS } from '@aws-sdk/client-sts';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@smithy/signature-v4';
import type { AwsCredentialIdentity, Provider } from '@smithy/types';
import { AwsHttpClientOptions as AwsHttpClientOptions } from './types';
import { Json } from '../../../types/json';
import { HttpClient } from '../http-client';
import {
    HttpMethod,
    RequestResponse,
    HttpClientRequest
} from '../http-client/types';

export class AwsHttpClient extends HttpClient<AwsHttpClientOptions> {
    /**
     * Cached credentials used to sign requests. This class will store
     * credentials while they are active and refresh the cache if needed
     * based on the `credentialsExpiration` class property.
     */
    private cachedCredentials?: AwsCredentialIdentity;

    /**
     * Expiration date of the cached credentials. This class will refresh
     * the cache if the credentials expire within 5 minutes.
     */
    private credentialsExpiration?: Date;

    /**
     * Creates a new AWS HTTP client with SigV4 authentication.
     *
     * @param options - Configuration options for the client
     */
    constructor(options: AwsHttpClientOptions) {
        super(options);

        // Validate required AWS options
        if (!options.service) {
            throw new Error('Service must be specified for AWS SigV4 signing');
        }
    }

    /**
     * Override the sendHttpRequest method to add AWS signing
     */
    protected async sendHttpRequest(
        url: string,
        method: HttpMethod,
        headers: Record<string, string> = {},
        body?: Json
    ): Promise<RequestResponse> {
        const request = this.createRequest(url, method, headers, body);
        const signedRequest = (await this.signRequest(
            request
        )) as HttpClientRequest;
        return this.sendRequest(signedRequest);
    }

    /**
     * Signs an HTTP request using AWS SigV4.
     *
     * @param request - HTTP request to sign
     * @returns Promise resolving to the signed request
     */
    private async signRequest(
        request: HttpClientRequest
    ): Promise<HttpClientRequest> {
        let credentials:
            | AwsCredentialIdentity
            | Provider<AwsCredentialIdentity>;

        // Get region from options or use the Lambda environment variable
        const region = this.options.region ?? process.env.AWS_REGION;
        if (!region) {
            throw new Error(
                'Region is not specified and could not be determined from environment.'
            );
        }

        if ((this.options as AwsHttpClientOptions).roleArn) {
            // Check if we need new credentials (undefined or expiring within 5 minutes)
            const now = new Date();
            const needNewCredentials =
                this.cachedCredentials === undefined ||
                this.credentialsExpiration === undefined ||
                this.credentialsExpiration.getTime() - now.getTime() <
                    5 * 60 * 1000;

            if (needNewCredentials) {
                const stsClient = new STS();
                const response = await stsClient.assumeRole({
                    RoleArn: (this.options as AwsHttpClientOptions).roleArn!,
                    RoleSessionName: 'AwsSigV4Request',
                    DurationSeconds: 900 // 15m (minimum)
                });

                if (!response.Credentials) {
                    throw new Error('Failed to get temporary credentials');
                }

                this.cachedCredentials = {
                    accessKeyId: response.Credentials.AccessKeyId!,
                    secretAccessKey: response.Credentials.SecretAccessKey!,
                    sessionToken: response.Credentials.SessionToken
                };

                // Set expiration time
                this.credentialsExpiration = response.Credentials.Expiration;
            }
            credentials = this.cachedCredentials!;
        } else {
            credentials = defaultProvider();
        }

        const signer = new SignatureV4({
            credentials: credentials,
            region: region,
            service: (this.options as AwsHttpClientOptions).service,
            sha256: Sha256
        });

        return signer.sign(request);
    }
}
