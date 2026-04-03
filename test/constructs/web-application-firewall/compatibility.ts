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
        other: PartitionStatus.NOT_COMPATIBLE
    },
    notes: 'Other partitions require static rule version configuration.' // Need to update construct to support static rule versions.
};
