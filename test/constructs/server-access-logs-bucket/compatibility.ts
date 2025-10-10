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
        iso: PartitionStatus.FULLY_COMPATIBLE,
        isob: PartitionStatus.FULLY_COMPATIBLE
    },
    notes: 'S3 server access logging is available in all AWS partitions with consistent functionality.',
    lastUpdated: '2024-10-09'
};
