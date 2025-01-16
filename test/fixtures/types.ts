// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Forces all properties (including sub-properties) to be optional
 * @template T Interface being converted to partial
 */
export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object | undefined
          ? RecursivePartial<T[P]>
          : T[P];
};

/**
 * Forces all top-level properties to be mutable
 * @template T Interface being converted to mutable
 */
export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};

/**
 * Forces all properties (including sub-properties) to be mutable
 * @template T Interface being converted to mutable
 */
export type RecursiveMutable<T> = {
    -readonly [P in keyof T]: T[P] extends (infer U)[]
        ? RecursiveMutable<U>[]
        : T[P] extends object | undefined
          ? RecursiveMutable<T[P]>
          : T[P];
};
