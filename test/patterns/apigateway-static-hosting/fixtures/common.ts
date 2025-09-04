// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack } from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { LogGroupLogDestination } from 'aws-cdk-lib/aws-apigateway';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { NagPackSuppression } from 'cdk-nag';
import {
    ApiGatewayStaticHosting,
    ApiGatewayStaticHostingProps
} from '../../../../src/patterns/apigateway-static-hosting';

export type TestPatternCreator = () => ApiGatewayStaticHosting;

export const commonStackSuppressions: NagPackSuppression[] = [
    ...['AwsSolutions-APIG4', 'AwsSolutions-COG4'].map((nagId) => {
        return {
            id: nagId,
            reason: 'The consumer of this pattern is required to enforce access restrictions prior to the API if desired.'
        };
    }),
    ...['AwsSolutions-APIG3', 'NIST.800.53.R5-APIGWAssociatedWithWAF'].map(
        (nagId) => {
            return {
                id: nagId,
                reason: 'The consumer has the ability to apply WAF ACL rules to the API if so desired.'
            };
        }
    ),
    {
        id: 'NIST.800.53.R5-APIGWSSLEnabled',
        reason: 'The default execution endpoint and custom domain endpoints have server-side SSL certificates. Client-side SSL certificates are out of scope for this pattern.'
    },
    {
        id: 'NIST.800.53.R5-S3DefaultEncryptionKMS',
        reason: 'The buckets are encrypted using the S3 managed key and the consumer can provide a KMS key if desired.'
    },
    {
        id: 'AwsSolutions-IAM5',
        reason: 'Permissions are tightly scoped by CDK grants and otherwise set to the required permissions for updating CloudFormation stacks.'
    },
    {
        id: 'AwsSolutions-IAM4',
        appliesTo: [
            'Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs'
        ],
        reason: 'This policy is required for API Gateway to function.'
    },
    {
        id: 'NIST.800.53.R5-APIGWCacheEnabledAndEncrypted',
        reason: 'Given the dynamic nature of the pattern, only the consumer would know how to configure and enable caching.'
    },
    {
        id: 'AwsSolutions-APIG2',
        reason: 'Given the dynamic nature of the pattern, only the consumer would know how to configure and enable request validation.'
    },
    {
        id: 'NIST.800.53.R5-S3BucketReplicationEnabled',
        reason: 'Given the assets in this bucket can easily be redeployed with IaC, replication is out of scope.'
    }
];

export function createPatternUnderTest(
    stack: Stack,
    id: string,
    nagProps: Partial<ApiGatewayStaticHostingProps>,
    testProps: ApiGatewayStaticHostingProps,
    deferred?: boolean
): ApiGatewayStaticHosting | TestPatternCreator {
    const creator: TestPatternCreator = () => {
        return new ApiGatewayStaticHosting(stack, id, {
            ...nagProps,
            ...testProps
        });
    };

    return deferred ? creator : creator();
}

export function createPartialNameMatcher(
    resource: 'store' | 'handler' | 'api',
    id: string,
    subResource?: string
) {
    const resourceName = (() => {
        switch (resource) {
            case 'store':
                return 'Store';
            case 'handler':
                return 'ServeProxy';
            case 'api':
                return 'DistributionEndpoint';
        }
    })();

    const mainResource = `${id}${resourceName}`;

    return subResource
        ? Match.stringLikeRegexp(`${mainResource}${subResource}`)
        : Match.stringLikeRegexp(mainResource);
}

export function createCommonNagProps(
    stack: Stack
): Partial<ApiGatewayStaticHostingProps> {
    const nagLoggingBucket = new Bucket(stack, 'NagLoggingBucket');
    const nagApiLogging = new LogGroupLogDestination(
        new LogGroup(stack, 'NagApiLogging')
    );

    return {
        accessLoggingBucket: nagLoggingBucket,
        apiLogDestination: nagApiLogging
    };
}
