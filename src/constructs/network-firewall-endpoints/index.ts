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
 * Construct that retrieves and manages Network Firewall endpoints
 * Uses AWS Custom Resources to fetch endpoint information from the Network Firewall service
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
     * Creates a new NetworkFirewallEndpoints construct
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
