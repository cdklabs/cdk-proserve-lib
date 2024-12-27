/**
 * (c) 2024 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
 *
 * This AWS Content is provided subject to the terms of the AWS Customer
 * Agreement available at https://aws.amazon.com/agreement or other written
 * agreement between Customer and either Amazon Web Services, Inc. or
 * Amazon Web Services EMEA SARL or both.
 */

/**
 * Input to the custom resource
 */
export interface ResourceProperties {
    /**
     * Name of the stacks whose dependencies should be broken
     */
    readonly stackNames: string[];

    /**
     * Current time which is used to force rerun of CR every time
     */
    readonly timestamp: string;

    /**
     * Whether or not stacks in error state should be fatal to CR completion
     */
    readonly ignoreInvalidStates?: boolean;
}
