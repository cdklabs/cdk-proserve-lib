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

import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Function, FunctionProps } from 'aws-cdk-lib/aws-lambda';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { DefaultConfig } from '../../common/default-config';

export interface SecureFunctionProps extends FunctionProps {
    /**
     * Optional retention period for the Lambda functions log group.
     * Default: RetentionDays.ONE_MONTH
     */
    readonly logGroupRetention?: RetentionDays;

    /**
     * Optional encryption key for the Lambda functions log group.
     */
    readonly encryption?: IKey;
}

export class SecureFunction extends Construct {
    public readonly function: Function;
    public readonly logGroup: LogGroup;
    public readonly role: Role;

    constructor(scope: Construct, id: string, props: SecureFunctionProps) {
        super(scope, id);

        const defaultProps: Partial<FunctionProps> = {
            reservedConcurrentExecutions: 5
        };

        this.role = new Role(this, 'Role', {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com')
        });

        // Create the log group beforehand
        this.logGroup = new LogGroup(this, 'LogGroup', {
            retention: props.logGroupRetention
                ? props.logGroupRetention
                : DefaultConfig.logRetention,
            encryptionKey: props.encryption
        });

        this.function = new Function(this, 'Function', {
            ...defaultProps,
            ...props,
            environmentEncryption:
                props.encryption ?? props.environmentEncryption,
            logGroup: this.logGroup,
            role: this.role
        });

        // Grant permissions to use the key for lambda environment and logs
        if (props.encryption) {
            props.encryption.grantEncryptDecrypt(this.function);
        }

        // Grant the function permission to write to the log group
        this.logGroup.grantWrite(this.function);
    }
}
