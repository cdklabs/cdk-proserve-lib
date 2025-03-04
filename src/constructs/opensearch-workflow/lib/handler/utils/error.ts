/**
 * (c) 2025 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
 *
 * This AWS Content is provided subject to the terms of the AWS Customer
 * Agreement available at https://aws.amazon.com/agreement or other written
 * agreement between Customer and either Amazon Web Services, Inc. or
 * Amazon Web Services EMEA SARL or both.
 */

import axios from 'axios';

export function formatAxiosError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
        return new Error(
            `${error.response?.status} ${JSON.stringify(error.response?.data)}`
        );
    }
    return error instanceof Error ? error : new Error(String(error));
}
