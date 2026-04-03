// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    CompatibilityConfig,
    PartitionStatus
} from '../../../utilities/generators/lib/types/compatibility';

export const compatibility: CompatibilityConfig = {
    partitions: {
        commercial: PartitionStatus.FULLY_COMPATIBLE,
        govcloud: PartitionStatus.PARTIALLY_COMPATIBLE,
        other: PartitionStatus.PARTIALLY_COMPATIBLE
    },
    notes: 'Some compliance rules may vary across partitions due to service availability differences.'
};
