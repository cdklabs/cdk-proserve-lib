// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { IAM } from '@aws-sdk/client-iam';
import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { SSM } from '@aws-sdk/client-ssm';
import {
    CdkCustomResourceEvent,
    CdkCustomResourceResponse,
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceUpdateEvent,
    Context
} from 'aws-lambda';
import { v4 } from 'uuid';
import {
    FailedToCreateIamServerCertificateException,
    FailedToRetrieveValueException
} from '../types/exceptions';
import {
    ResourceProperties,
    ServerCertificateElement
} from '../types/resource-properties';
import { ResponseData } from '../types/resource-response';

// Clients
const iam = new IAM();
const secretsmanager = new SecretsManager();
const ssm = new SSM();

/**
 * Helper function to retrieve the password value from the appropriate vault
 * @param element Properties for the element to retrieve
 * @returns Element value
 * @throws {FailedToRetrieveValueException}
 */
async function getValue(element: ServerCertificateElement): Promise<string> {
    if (element.Source === 'parameter') {
        const response = await ssm.getParameter({
            Name: element.Id,
            WithDecryption: true
        });

        if (!response.Parameter?.Value) {
            throw new FailedToRetrieveValueException(
                'AWS Systems Manager Parameter Store'
            );
        } else {
            return response.Parameter.Value;
        }
    } else {
        const response = await secretsmanager.getSecretValue({
            SecretId: element.Id
        });

        if (!response.SecretString) {
            throw new FailedToRetrieveValueException('AWS Secrets Manager');
        } else {
            return response.SecretString;
        }
    }
}

/**
 * Handles AWS CloudFormation CREATE calls
 * @param event Input metadata for the custom resource
 * @returns A promise that resolves to a CloudFormation custom resource response
 */
async function onCreate(
    event: CloudFormationCustomResourceCreateEvent<ResourceProperties>
): Promise<CdkCustomResourceResponse<ResponseData>> {
    const props = event.ResourceProperties;

    const certificate = await getValue(props.Certificate);
    const privateKey = await getValue(props.PrivateKey);

    const name = `${props.CertificatePrefix}-${v4()}`.substring(
        0,
        128 - props.CertificatePrefix.length
    );

    const response = await iam.uploadServerCertificate({
        CertificateBody: certificate,
        PrivateKey: privateKey,
        ServerCertificateName: name
    });

    if (!response.ServerCertificateMetadata?.Arn) {
        throw new FailedToCreateIamServerCertificateException();
    }

    return {
        PhysicalResourceId: name,
        Data: {
            Arn: response.ServerCertificateMetadata.Arn
        }
    };
}

/**
 * Handles AWS CloudFormation UPDATE calls
 * @param event Input metadata for the custom resource
 * @returns A CloudFormation custom resource response
 */
function onUpdate(
    event: CloudFormationCustomResourceUpdateEvent<ResourceProperties>
): CdkCustomResourceResponse<never> {
    return {
        PhysicalResourceId: event.PhysicalResourceId
    };
}

/**
 * Handles AWS CloudFormation DELETE calls
 * @param event Input metadata for the custom resource
 * @returns A CloudFormation custom resource response
 */
async function onDelete(
    event: CloudFormationCustomResourceDeleteEvent<ResourceProperties>
): Promise<CdkCustomResourceResponse<never>> {
    await iam.deleteServerCertificate({
        ServerCertificateName: event.PhysicalResourceId
    });

    return {
        PhysicalResourceId: event.PhysicalResourceId
    };
}

/**
 * Entry point
 * @param event Input provided to the custom resource
 * @param context AWS Lambda context
 * @returns A promise that resolves to a CloudFormation custom resource response
 */
export async function handler(
    event: CdkCustomResourceEvent<ResourceProperties>,
    _context: Context
): Promise<CdkCustomResourceResponse<ResponseData>> {
    switch (event.RequestType) {
        case 'Create':
            console.info('Running CREATE...');
            return onCreate(event);
        case 'Delete':
            console.info('Running DELETE...');
            return onDelete(event);
        case 'Update':
            console.info('Running UPDATE...');
            return onUpdate(event);
    }
}
