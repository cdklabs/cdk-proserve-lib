// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { RemovalPolicy } from 'aws-cdk-lib';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';

export const DefaultConfig = {
    /**
     * Default removal policy.
     *
     * @default RemovalPolicy.DESTROY
     */
    removalPolicy: RemovalPolicy.DESTROY,

    /**
     * Retention period for the log group.
     *
     * @default RetentionDays.ONE_MONTH
     */
    logRetention: RetentionDays.ONE_MONTH
};
