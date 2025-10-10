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
        iso: PartitionStatus.NOT_COMPATIBLE,
        isob: PartitionStatus.NOT_COMPATIBLE
    },
    notes: 'EC2 automated shutdown relies on EventBridge and Systems Manager, which may not be available in ISO/ISO-B partitions.',
    lastUpdated: '2024-10-09'
};
