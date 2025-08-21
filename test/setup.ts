// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { allCustomMatcher } from 'aws-sdk-client-mock-vitest';
import { expect, vi } from 'vitest';

expect.extend(allCustomMatcher);
