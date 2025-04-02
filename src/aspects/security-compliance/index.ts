// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { IAspect } from 'aws-cdk-lib';
import { MethodLoggingLevel } from 'aws-cdk-lib/aws-apigateway';
import { IConstruct } from 'constructs';
import { Settings, Suppressions } from './types';
import * as v from './visitors';
import { VisitorRegistry } from './visitors/registry';

export * from './types';
export interface SecurityComplianceProps {
    /**
     * Settings for the aspect
     */
    readonly settings?: Settings;
    /**
     * Suppressions to add for CDK Nag. You must add your own reasoning to each
     * suppression. These helpers have been created for common nag suppression
     * use-cases. It is recommended to review the suppressions that are added
     * and ensure that they adhere to your organizational level of acceptance.
     * Each suppression must be supplied with a reason for the suppression as
     * a string to each suppression property.
     *
     * If you are not using CDK Nag or do not want to use any suppressions, you
     * can ignore this property.
     */
    readonly suppressions?: Suppressions;
}

/**
 * Applies best practice security settings to be in compliance with security
 * tools such as CDK Nag.
 *
 * This aspect automatically implements AWS security best practices and compliance
 * requirements for various AWS services used in your CDK applications.
 * It can be configured with custom settings and supports suppressing specific
 * CDK Nag warnings with proper justification.
 *
 * @example
 * import { App, Stack, Aspects } from 'aws-cdk-lib';
 * import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
 * import { Bucket } from 'aws-cdk-lib/aws-s3';
 * import { SecurityCompliance } from '../../../src/aspects/security-compliance';
 *
 * const app = new App();
 * const stack = new Stack(app, 'MySecureStack');
 *
 * // Create resources
 * const myBucket = new Bucket(stack, 'MyBucket');
 * const myFunction = new Function(stack, 'MyFunction', {
 *     runtime: Runtime.NODEJS_18_X,
 *     handler: 'index.handler',
 *     code: Code.fromInline(
 *         'exports.handler = async () => { return { statusCode: 200 }; }'
 *     )
 * });
 *
 * // Apply the SecurityCompliance aspect with custom settings
 * const securityAspect = new SecurityCompliance({
 *     settings: {
 *         s3: {
 *             serverAccessLogs: {
 *                 destinationBucketName: 'my-access-logs-bucket'
 *             },
 *             versioning: {
 *                 disabled: false
 *             }
 *         },
 *         lambda: {
 *             reservedConcurrentExecutions: {
 *                 concurrentExecutionCount: 5
 *             }
 *         }
 *     },
 *     suppressions: {
 *         lambdaNotInVpc:
 *             'This is a development environment where VPC is not required',
 *         iamNoInlinePolicies: 'Inline policies are acceptable for this use case'
 *     }
 * });
 *
 * // Apply the aspect to the stack
 * Aspects.of(app).add(securityAspect);
 */
export class SecurityCompliance implements IAspect {
    /**
     * Settings for the aspect
     */
    private readonly settings: Settings;
    /**
     * Suppressions for the aspect
     */
    private readonly suppressions?: Suppressions;

    /**
     * Visitor Registry stores all of the Visitor classes that will be used
     * by the Aspect to visit each node. The registry is organized by AWS
     * service.
     */
    private readonly vr = new VisitorRegistry();

    constructor(props?: SecurityComplianceProps) {
        // set defaults
        this.settings = {
            ...props?.settings,
            apiGateway: {
                stageMethodLogging: {
                    loggingLevel:
                        props?.settings?.apiGateway?.stageMethodLogging
                            ?.loggingLevel ?? MethodLoggingLevel.ERROR,
                    disabled:
                        props?.settings?.apiGateway?.stageMethodLogging
                            ?.disabled ?? false
                }
            },
            lambda: {
                reservedConcurrentExecutions: {
                    concurrentExecutionCount:
                        props?.settings?.lambda?.reservedConcurrentExecutions
                            ?.concurrentExecutionCount ?? 1,
                    disabled:
                        props?.settings?.lambda?.reservedConcurrentExecutions
                            ?.disabled ?? false
                }
            }
        };
        this.suppressions = props?.suppressions;

        this.registerVisitors();
    }

    private registerVisitors(): void {
        this.vr.register(new v.ApiGatewayVisitor(this.settings.apiGateway));
        this.vr.register(new v.DynamoDbVisitor(this.settings.dynamoDb));
        this.vr.register(new v.EcsClusterVisitor(this.settings.ecs));
        this.vr.register(new v.LambdaVisitor(this.settings.lambda));
        this.vr.register(new v.S3Visitor(this.settings.s3));
        this.vr.register(
            new v.StepFunctionsVisitor(this.settings.stepFunctions)
        );
        this.vr.register(new v.StackSuppressionsVisitor(this.suppressions));
        this.vr.register(
            new v.CdkGeneratedSuppressionsVisitor(this.suppressions)
        );
    }

    /**
     * Apply the aspect to the node
     */
    public visit(node: IConstruct): void {
        this.vr.visitNode(node);
    }
}
