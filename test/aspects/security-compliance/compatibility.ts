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
    notes: 'Security compliance aspect works across all partitions. Some compliance rules may vary in ISO/ISO-B partitions due to service availability differences.',
    lastUpdated: '2024-10-09'
};
