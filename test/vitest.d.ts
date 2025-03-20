// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import 'vitest';
import { CustomMatcher } from 'aws-sdk-client-mock-vitest';

declare module 'vitest' {
    interface Assertion<T = any> extends CustomMatcher<T> {}
    interface AsymmetricMatchersContaining extends CustomMatcher {}
}
