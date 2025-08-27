// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { RemovalPolicy } from 'aws-cdk-lib';
import { ISubnet, IVpc, Port, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import {
    AuroraPostgresEngineVersion,
    ClientPasswordAuthType,
    ClusterInstance,
    Credentials,
    DatabaseCluster,
    DatabaseClusterEngine,
    DatabaseClusterProps,
    DatabaseProxy,
    ProxyTarget
} from 'aws-cdk-lib/aws-rds';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { KeycloakService } from '..';

/**
 * Properties for configuring the database for Keycloak
 */
export interface KeycloakDatabaseProps {
    /**
     * Optional overrides to the default prescribed configuration
     */
    readonly confugration?: KeycloakService.DatabaseConfiguration;

    /**
     * Key for encrypting resource data
     */
    readonly encryption: IKey;

    /**
     * Policy for lifecycling resources on stack actions
     */
    readonly removalPolicy?: RemovalPolicy;

    /**
     * Network where the Keycloak resources are deployed
     */
    readonly vpc: IVpc;

    /**
     * Subnets where the resources should be deployed
     */
    readonly workloadSubnets: ISubnet[];
}

/**
 * Database for the Keycloak service
 */
export class KeycloakDatabase extends Construct {
    /**
     * Properties for configuring the database for Keycloak
     */
    private readonly props: KeycloakDatabaseProps;

    /**
     * Infrastructure resources for the database
     */
    readonly resources: KeycloakDatabase.Infrastructure;

    /**
     * Create the database for the Keycloak service
     * @param scope Parent to which this construct belongs
     * @param id Unique identifier for the component
     * @param props Properties for configuring the component
     */
    constructor(scope: Construct, id: string, props: KeycloakDatabaseProps) {
        super(scope, id);

        this.props = props;
        this.resources = this.buildDatabase();
    }

    /**
     * Determines if a serverless database should be leveraged
     * @param props Database configuration options to examine
     * @returns Whether the configuration options are for a serverless database or not
     */
    private databaseIsServerless(
        props?: KeycloakService.DatabaseConfiguration
    ): props is KeycloakService.ServerlessDatabaseConfiguration {
        return props === undefined || props.serverless === true;
    }

    /**
     * Generate the database configuration for the cluster
     * @param accessGroup Security group for accessing the database
     * @param credentials Credentials for the database
     * @returns Database cluster configuration
     */
    private generateDatabaseConfiguration(
        accessGroup: SecurityGroup,
        credentials: Credentials
    ): DatabaseClusterProps {
        const removalPolicy =
            this.props.removalPolicy ?? KeycloakDatabase.Defaults.removalPolicy;

        const baseConfiguration: DatabaseClusterProps = {
            engine: DatabaseClusterEngine.auroraPostgres({
                version:
                    this.props.confugration?.versionOverride ??
                    KeycloakDatabase.Defaults.version
            }),
            backup: this.props.confugration?.backup,
            cloudwatchLogsRetention:
                this.props.confugration?.logRetentionDuration ??
                KeycloakDatabase.Defaults.logRetentionDuration,
            credentials: credentials,
            defaultDatabaseName: KeycloakDatabase.Defaults.name,
            deletionProtection: removalPolicy !== RemovalPolicy.DESTROY,
            port: KeycloakDatabase.Defaults.port,
            removalPolicy: removalPolicy,
            securityGroups: [accessGroup],
            storageEncrypted: true,
            storageEncryptionKey: this.props.encryption,
            vpc: this.props.vpc,
            vpcSubnets: {
                onePerAz: true,
                subnets: this.props.workloadSubnets
            }
        };

        const additionalConfiguration: Partial<DatabaseClusterProps> =
            this.databaseIsServerless(this.props.confugration)
                ? {
                      serverlessV2MaxCapacity:
                          this.props.confugration.scaling?.maxCapacity,
                      serverlessV2MinCapacity:
                          this.props.confugration.scaling?.minCapacity,
                      writer: ClusterInstance.serverlessV2('ClusterInstance')
                  }
                : {
                      writer: ClusterInstance.provisioned('ClusterInstance')
                  };

        return {
            ...baseConfiguration,
            ...additionalConfiguration
        };
    }

    /**
     * Builds the database infrastructure
     * @returns Database infrastructure
     */
    private buildDatabase(): KeycloakDatabase.Infrastructure {
        const databaseAccess = new SecurityGroup(this, 'ClusterAccess', {
            vpc: this.props.vpc,
            allowAllOutbound: false
        });
        const proxyAccess = new SecurityGroup(this, 'ProxyAccess', {
            vpc: this.props.vpc,
            allowAllOutbound: false
        });

        databaseAccess.addIngressRule(
            proxyAccess,
            Port.tcp(KeycloakDatabase.Defaults.port),
            'Allow inbound from the proxy'
        );

        const credentials: Credentials = {
            username: KeycloakDatabase.Defaults.username,
            encryptionKey: this.props.encryption
        };

        const db = new DatabaseCluster(
            this,
            'Cluster',
            this.generateDatabaseConfiguration(databaseAccess, credentials)
        );

        db.addRotationMultiUser('RotateCredentials', {
            secret: db.secret!
        });

        const proxy = new DatabaseProxy(this, 'Proxy', {
            proxyTarget: ProxyTarget.fromCluster(db),
            secrets: [db.secret!],
            vpc: this.props.vpc,
            clientPasswordAuthType:
                ClientPasswordAuthType.POSTGRES_SCRAM_SHA_256,
            requireTLS: true,
            securityGroups: [proxyAccess],
            vpcSubnets: {
                onePerAz: true,
                subnets: this.props.workloadSubnets
            }
        });

        return {
            access: proxyAccess,
            cluster: db,
            credentials: db.secret!,
            databaseName: KeycloakDatabase.Defaults.name,
            port: KeycloakDatabase.Defaults.proxyPort,
            proxy: proxy
        };
    }
}

export namespace KeycloakDatabase {
    /**
     * Default configuration options
     */
    export namespace Defaults {
        /**
         * Name for the database
         */
        export const name = 'keycloak';

        /**
         * Username for the database admin
         */
        export const username = 'svcadmin';

        /**
         * TCP port for the database cluster
         */
        export const port = 8006;

        /**
         * TCP port for the database proxy
         */
        export const proxyPort = 5432;

        /**
         * Version of the database engine to use
         */
        export const version = AuroraPostgresEngineVersion.VER_17_5;

        /**
         * How long to retain logs for the database and supporting infrastructure
         */
        export const logRetentionDuration = RetentionDays.ONE_WEEK;

        /**
         * How to lifecycle the database on stack actions
         */
        export const removalPolicy = RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE;
    }

    /**
     * Infrastructure related to the database
     */
    export interface Infrastructure {
        /**
         * Database
         */
        readonly cluster: DatabaseCluster;

        /**
         * Proxy for accessing the database
         */
        readonly proxy: DatabaseProxy;

        /**
         * Security group for controlling access to the database proxy
         */
        readonly access: SecurityGroup;

        /**
         * Credentials for the database admin
         */
        readonly credentials: ISecret;

        /**
         * Port for the database proxy
         */
        readonly port: number;

        /**
         * Name of the database
         */
        readonly databaseName: string;
    }
}
