/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

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
