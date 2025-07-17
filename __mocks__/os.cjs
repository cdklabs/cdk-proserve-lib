// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { vi } from 'vitest';

const actual = vi.importActual('node:os');

module.exports = {
    ...actual,
    tmpdir: () => '/virtual-tmp'
};
