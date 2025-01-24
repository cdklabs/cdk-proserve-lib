// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CfnFirewall } from 'aws-cdk-lib/aws-networkfirewall';
import {
    AwsCustomResource,
    AwsCustomResourcePolicy,
    AwsSdkCall,
    PhysicalResourceId
} from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { DefaultConfig } from '../../common/default-config';
import { AwsCustomResourceLambdaConfiguration } from '../../interfaces';

/**
 * Properties for the NetworkFirewallEndpoints construct
 */
export interface NetworkFirewallEndpointsProps {
    /**
     * The AWS Network Firewall to get the Endpoints for.
     */
    readonly firewall: CfnFirewall;

    /**
     * Optional Lambda configuration settings.
     */
    readonly lambdaConfiguration?: AwsCustomResourceLambdaConfiguration;
}

/**
 * Retrieves Network Firewall endpoints so that you can reference them in your
 * other resources.
 *
 * Uses an AWS Custom Resource to fetch endpoint information from the Network
 * Firewall service. This is useful so that you can both create a Network
 * Firewall and reference the endpoints it creates, to do things like configure
 * routing to the firewall.
 *
 * @example
 * const endpoints = new NetworkFirewallEndpoints(this, 'Endpoints', {
 *   firewall: cfnFirewall,  // CfnFirewall resource to find endpoints for
 * });
 * const az1EndpointId = endpoints.getEndpointId('us-east-1a');
 * const az2EndpointId = endpoints.getEndpointId('us-east-1b');
 * new CfnOutput(this, 'Az1EndpointId', { value: az1Endpoint });
 * new CfnOutput(this, 'Az2EndpointId', { value: az2Endpoint });
 */
export class NetworkFirewallEndpoints extends Construct {
    /**
     * Response field path for the Network Firewall sync states
     */
    private static readonly API_RESPONSE_FIELD: string =
        'FirewallStatus.SyncStates';

    /**
     * AWS Custom Resource for managing the firewall endpoints
     */
    private readonly cr: AwsCustomResource;

    /**
     * Retrieves Network Firewall endpoints so that you can reference them in
     * your other resources.
     *
     * @param scope The scope in which to define this construct
     * @param id The scoped construct ID
     * @param props Configuration properties for the construct
     */
    constructor(
        scope: Construct,
        id: string,
        props: NetworkFirewallEndpointsProps
    ) {
        super(scope, id);

        this.cr = new AwsCustomResource(this, 'FirewallEndpointsCr', {
            onCreate: this.getSdkCall(id, props.firewall.firewallName),
            onUpdate: this.getSdkCall(id, props.firewall.firewallName),
            policy: AwsCustomResourcePolicy.fromSdkCalls({
                resources: [props.firewall.attrFirewallArn]
            }),
            logRetention: DefaultConfig.logRetention,
            ...props.lambdaConfiguration
        });

        this.cr.node.addDependency(props.firewall);
    }

    /**
     * Creates an AWS SDK call configuration for describing the firewall
     * @param id The resource ID to use for the physical resource ID
     * @param firewallName The name of the firewall to describe
     * @returns AWS SDK call configuration
     */
    private getSdkCall(id: string, firewallName: string): AwsSdkCall {
        return {
            service: 'NetworkFirewall',
            action: 'describeFirewall',
            parameters: {
                FirewallName: firewallName
            },
            physicalResourceId: PhysicalResourceId.of(id),
            outputPaths: [NetworkFirewallEndpoints.API_RESPONSE_FIELD]
        };
    }

    /**
     * Gets the endpoint ID for a specific availability zone
     * @param availabilityZone The availability zone to get the endpoint ID for
     * @returns The endpoint ID for the specified availability zone
     */
    public getEndpointId(availabilityZone: string): string {
        return this.cr.getResponseField(
            `${NetworkFirewallEndpoints.API_RESPONSE_FIELD}.${availabilityZone}.Attachment.EndpointId`
        );
    }
}
