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
        iso: PartitionStatus.NEEDS_TESTING,
        isob: PartitionStatus.NEEDS_TESTING
    },
    notes: 'Keycloak service pattern uses ECS, RDS, and ALB. GovCloud may have limitations with certain ECS features. ISO/ISO-B compatibility needs verification.',
    lastUpdated: '2024-10-09'
};
