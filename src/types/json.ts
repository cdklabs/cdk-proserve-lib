// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

// NOTE: This type cannot be converted by JSII
// It can be used inside of code that will not be converted by JSII (e.g. Lambda handlers)
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];
