/**
 * (c) 2025 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
 *
 * This AWS Content is provided subject to the terms of the AWS Customer
 * Agreement available at https://aws.amazon.com/agreement or other written
 * agreement between Customer and either Amazon Web Services, Inc. or
 * Amazon Web Services EMEA SARL or both.
 */

import axios, { AxiosInstance } from 'axios';
import { IResourceProperties } from '../models/resource-properties';
import aws4Interceptor from 'aws4-axios';

export function createSigV4OpensearchClient(
    props: IResourceProperties
): AxiosInstance {
    const client = axios.create({
        baseURL: `https://${props.DomainEndpoint}`,
        timeout: 45000
    });

    const sigv4 = aws4Interceptor({
        options: {
            assumeRoleArn: props.RoleArn,
            service: 'es'
        }
    });

    client.interceptors.request.use(sigv4);

    return client;
}
