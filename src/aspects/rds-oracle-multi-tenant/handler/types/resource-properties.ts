// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Properties passed to the Lambda handler from the Custom Resource
 */
export interface IResourceProperties {
    /**
     * The RDS database instance identifier
     */
    readonly DBInstanceIdentifier: string;
}
