// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];
