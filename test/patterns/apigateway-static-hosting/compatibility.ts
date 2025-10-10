// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    CompatibilityConfig,
    PartitionStatus
} from '../../../utilities/generators/lib/types/compatibility';

export const compatibility: CompatibilityConfig = {
    partitions: {
        commercial: PartitionStatus.FULLY_COMPATIBLE,
        govcloud: PartitionStatus.FULLY_COMPATIBLE,
        iso: PartitionStatus.PARTIALLY_COMPATIBLE,
        isob: PartitionStatus.PARTIALLY_COMPATIBLE
    },
    notes: 'API Gateway and S3 static hosting work in all partitions. Some API Gateway features may be limited in ISO/ISO-B partitions.',
    lastUpdated: '2024-10-09'
};
