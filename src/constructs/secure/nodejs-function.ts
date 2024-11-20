import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import {
    NodejsFunction,
    NodejsFunctionProps
} from 'aws-cdk-lib/aws-lambda-nodejs';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export interface SecureNodejsFunctionProps extends NodejsFunctionProps {
    /**
     * Optional retention period for the Lambda functions log group.
     * Default: RetentionDays.ONE_WEEK
     */
    readonly logGroupRetention?: RetentionDays;

    /**
     * Optional encryption key for the Lambda functions log group.
     */
    readonly encryption?: IKey;
}

export class SecureNodejsFunction extends Construct {
    public readonly nodejsFunction: NodejsFunction;
    public readonly logGroup: LogGroup;
    public readonly role: Role;

    constructor(
        scope: Construct,
        id: string,
        props: SecureNodejsFunctionProps
    ) {
        super(scope, id);

        const defaultProps: Partial<NodejsFunctionProps> = {
            bundling: {
                minify: true
            },
            runtime: Runtime.NODEJS_20_X,
            reservedConcurrentExecutions: 5
        };

        this.role = new Role(this, 'Role', {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com')
        });

        // Create the log group beforehand
        this.logGroup = new LogGroup(this, 'LogGroup', {
            retention: props.logGroupRetention
                ? props.logGroupRetention
                : RetentionDays.ONE_WEEK,
            encryptionKey: props.encryption
        });

        this.nodejsFunction = new NodejsFunction(this, 'Function', {
            ...defaultProps,
            ...props,
            environmentEncryption: props.encryption,
            logGroup: this.logGroup,
            role: this.role
        });

        // Grant permissions to use the key for lambda environment and logs
        if (props.encryption) {
            props.encryption.grantEncryptDecrypt(this.nodejsFunction);
        }

        // Grant the function permission to write to the log group
        this.logGroup.grantWrite(this.nodejsFunction);
    }
}
