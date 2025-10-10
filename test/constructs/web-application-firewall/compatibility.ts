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
    notes: 'WAF is available in all partitions. ISO/ISO-B partitions may have limited rule group availability.',
    lastUpdated: '2024-10-09'
};
