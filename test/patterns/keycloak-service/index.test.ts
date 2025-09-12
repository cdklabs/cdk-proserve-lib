// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import { Annotations, Match } from 'aws-cdk-lib/assertions';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Vpc, IpAddresses } from 'aws-cdk-lib/aws-ec2';
import { ContainerImage } from 'aws-cdk-lib/aws-ecs';
import {
    ApplicationLoadBalancer,
    NetworkLoadBalancer
} from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { NagSuppressions } from 'cdk-nag';
import { beforeEach, describe, it, expect } from 'vitest';
import { KeycloakService } from '../../../src/patterns/keycloak-service';
import { describeCdkTest } from '../../../utilities/cdk-nag-test';

describeCdkTest(KeycloakService, (id, getStack, getTemplate) => {
    let stack: Stack;
    let vpc: Vpc;
    let image: ContainerImage;

    beforeEach(() => {
        stack = getStack();

        vpc = new Vpc(stack, 'TestVpc', {
            ipAddresses: IpAddresses.cidr('10.0.0.0/16'),
            maxAzs: 2
        });

        image = ContainerImage.fromRegistry('keycloak/keycloak:26.3.2');

        NagSuppressions.addStackSuppressions(
            stack,
            [
                {
                    id: 'CdkNagValidationFailure',
                    reason: 'Not validated for test'
                },
                {
                    id: 'NIST.800.53.R5-ELBLoggingEnabled',
                    reason: 'SSL termination is handled within the Keycloak container'
                },
                {
                    id: 'NIST.800.53.R5-ELBv2ACMCertificateRequired',
                    reason: 'SSL termination is handled within the Keycloak container'
                },
                {
                    id: 'NIST.800.53.R5-RDSEnhancedMonitoringEnabled',
                    reason: 'Not required'
                },
                {
                    id: 'NIST.800.53.R5-RDSInBackupPlan',
                    reason: 'The consumer specifies if they want a backup plan or not'
                },
                {
                    id: 'NIST.800.53.R5-SecretsManagerRotationEnabled',
                    reason: 'Cannot automatically rotate the Keycloak secret'
                },
                {
                    id: 'AwsSolutions-ECS2',
                    reason: 'Intentional'
                },
                {
                    id: 'AwsSolutions-ELB2',
                    reason: 'The load balancer does not have a TLS listener which is the only supported listener for access logs'
                },
                {
                    id: 'AwsSolutions-RDS6',
                    reason: 'Cannot enable as Keycloak does not support IAM authentication access to the database'
                },
                {
                    id: 'AwsSolutions-SMG4',
                    reason: 'Cannot automatically rotate the Keycloak secret'
                }
            ],
            true
        );
    });

    describe('Basic Construction', () => {
        it('creates KeycloakService with minimal configuration', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc
            });

            const template = getTemplate();
            template.hasResourceProperties('AWS::RDS::DBCluster', {
                Engine: 'aurora-postgresql'
            });
            template.hasResourceProperties('AWS::ECS::Service', {});
            template.hasResourceProperties(
                'AWS::ElasticLoadBalancingV2::LoadBalancer',
                {
                    Type: 'network'
                }
            );
        });

        it('creates admin user secret when not provided', () => {
            const service = new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc
            });

            expect(service.adminUser).toBeDefined();
            const template = getTemplate();
            template.hasResourceProperties('AWS::SecretsManager::Secret', {
                GenerateSecretString: {
                    GenerateStringKey: 'password',
                    SecretStringTemplate: JSON.stringify({
                        username: 'kcadmin'
                    })
                }
            });
        });

        it('uses provided admin user secret', () => {
            const adminUser = new Secret(stack, 'AdminUser', {
                generateSecretString: {
                    generateStringKey: 'password',
                    secretStringTemplate: JSON.stringify({ username: 'admin' })
                }
            });

            const service = new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        },
                        adminUser
                    }
                },
                vpc
            });

            expect(service.adminUser).toBe(adminUser);
        });
    });

    describe('Configuration Validation', () => {
        it('validates hostname without protocol', () => {
            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'https://auth.example.com'
                            }
                        }
                    },
                    vpc
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp('protocol specified')
                )
            ).toHaveLength(1);
        });

        it('validates hostname without port', () => {
            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com:8080'
                            }
                        }
                    },
                    vpc
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp('port specified')
                )
            ).toHaveLength(1);
        });

        it('validates hostname without path', () => {
            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com/path'
                            }
                        }
                    },
                    vpc
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp('path specified')
                )
            ).toHaveLength(1);
        });

        it('validates path format must start with /', () => {
            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com'
                            },
                            path: 'invalid-path'
                        }
                    },
                    vpc
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp('must start with')
                )
            ).toHaveLength(1);
        });

        it('validates path format must not end with /', () => {
            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com'
                            },
                            path: '/invalid-path/'
                        }
                    },
                    vpc
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp('and not end with')
                )
            ).toHaveLength(1);
        });

        it('validates management path format must start with /', () => {
            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com'
                            },
                            management: {
                                port: 9000,
                                path: 'invalid-path'
                            }
                        }
                    },
                    vpc
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp('must start with')
                )
            ).toHaveLength(1);
        });

        it('validates management path format must not end with /', () => {
            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com'
                            },
                            management: {
                                port: 9000,
                                path: '/invalid-path/'
                            }
                        }
                    },
                    vpc
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp('and not end with')
                )
            ).toHaveLength(1);
        });

        it('warns about missing logging level', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc
            });

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findWarning(
                    '*',
                    Match.stringLikeRegexp('logging level')
                )
            ).toHaveLength(1);
        });

        it('warns about missing admin hostname', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc
            });

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findWarning(
                    '*',
                    Match.stringLikeRegexp('administration console hostname')
                )
            ).toHaveLength(1);
        });
    });

    describe('DNS Zone Configuration', () => {
        it('validates default hostname matches DNS zone', () => {
            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.different.com'
                            }
                        }
                    },
                    vpc,
                    overrides: {
                        fabric: {
                            dnsZoneName: 'example.com'
                        }
                    }
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError('*', Match.stringLikeRegexp('zone names'))
            ).toHaveLength(1);
        });

        it('validates admin hostname matches DNS zone', () => {
            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com',
                                admin: 'admin.auth.different.com'
                            }
                        }
                    },
                    vpc,
                    overrides: {
                        fabric: {
                            dnsZoneName: 'example.com'
                        }
                    }
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError('*', Match.stringLikeRegexp('zone names'))
            ).toHaveLength(1);
        });

        it('creates Route53 records when DNS zone is provided', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com',
                            admin: 'admin.auth.example.com'
                        }
                    }
                },
                vpc,
                overrides: {
                    fabric: {
                        dnsZoneName: 'example.com'
                    }
                }
            });

            const template = getTemplate();
            template.hasResourceProperties('AWS::Route53::RecordSet', {
                Name: 'auth.example.com.'
            });
            template.hasResourceProperties('AWS::Route53::RecordSet', {
                Name: 'admin.auth.example.com.'
            });
        });
    });

    describe('Encryption Configuration', () => {
        it('creates encryption key when not provided', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc
            });

            const template = getTemplate();
            template.hasResourceProperties('AWS::KMS::Key', {});
        });

        it('uses provided encryption key', () => {
            const key = new Key(stack, 'TestKey');

            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc,
                encryption: key
            });

            const template = getTemplate();
            template.hasResourceProperties('AWS::SecretsManager::Secret', {
                KmsKeyId: {
                    'Fn::GetAtt': [Match.stringLikeRegexp('TestKey'), 'Arn']
                }
            });
        });
    });

    describe('Removal Policies', () => {
        it('applies removal policies correctly', () => {
            NagSuppressions.addStackSuppressions(
                stack,
                [
                    {
                        id: 'NIST.800.53.R5-RDSInstanceDeletionProtectionEnabled',
                        reason: 'Intentionally disabled for test'
                    },
                    {
                        id: 'NIST.800.53.R5-ELBDeletionProtectionEnabled',
                        reason: 'Intentionally disabled for test'
                    },
                    {
                        id: 'AwsSolutions-RDS10',
                        reason: 'Intentionally disabled for test'
                    }
                ],
                true
            );

            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc,
                removalPolicies: {
                    data: RemovalPolicy.DESTROY,
                    logs: RemovalPolicy.DESTROY
                }
            });

            const template = getTemplate();
            template.hasResourceProperties('AWS::RDS::DBCluster', {
                DeletionProtection: false
            });
        });

        it('uses retain policy by default', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc
            });

            const template = getTemplate();
            template.hasResourceProperties('AWS::RDS::DBCluster', {
                DeletionProtection: true
            });
        });
    });

    describe('Log Retention', () => {
        it('sets log retention duration', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc,
                logRetentionDuration: RetentionDays.ONE_MONTH
            });

            const template = getTemplate();
            template.hasResourceProperties('AWS::Logs::LogGroup', {
                RetentionInDays: 30
            });
        });
    });

    describe('Cluster Configuration', () => {
        it('configures cluster scaling', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc,
                overrides: {
                    cluster: {
                        scaling: {
                            minimum: 2,
                            maximum: 10
                        }
                    }
                }
            });

            const template = getTemplate();
            template.hasResourceProperties('AWS::ECS::Service', {
                DesiredCount: 1
            });
            template.hasResourceProperties(
                'AWS::ApplicationAutoScaling::ScalableTarget',
                {
                    MaxCapacity: 10,
                    MinCapacity: 2
                }
            );
        });

        it('configures CPU-based scaling when scaling is enabled', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc,
                overrides: {
                    cluster: {
                        scaling: {
                            minimum: 1,
                            maximum: 5
                        }
                    }
                }
            });

            const template = getTemplate();
            template.hasResourceProperties(
                'AWS::ApplicationAutoScaling::ScalingPolicy',
                {
                    PolicyType: 'TargetTrackingScaling',
                    TargetTrackingScalingPolicyConfiguration: {
                        TargetValue: 70,
                        PredefinedMetricSpecification: {
                            PredefinedMetricType:
                                'ECSServiceAverageCPUUtilization'
                        }
                    }
                }
            );
        });

        it('configures request-based scaling with default strategy', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc,
                overrides: {
                    cluster: {
                        scaling: {
                            minimum: 1,
                            maximum: 3,
                            requestCountScaling: {
                                enabled: true
                            }
                        }
                    }
                }
            });

            const template = getTemplate();
            template.hasResourceProperties(
                'AWS::ApplicationAutoScaling::ScalingPolicy',
                {
                    PolicyType: 'TargetTrackingScaling',
                    TargetTrackingScalingPolicyConfiguration: {
                        TargetValue: 80,
                        ScaleInCooldown: 300,
                        ScaleOutCooldown: 300,
                        CustomizedMetricSpecification: {
                            MetricName: 'ActiveFlowCount',
                            Namespace: 'AWS/NetworkELB',
                            Statistic: 'Average'
                        }
                    }
                }
            );
        });

        it('configures request-based scaling with custom strategy', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc,
                overrides: {
                    cluster: {
                        scaling: {
                            minimum: 2,
                            maximum: 8,
                            requestCountScaling: {
                                enabled: true,
                                threshold: 50
                            }
                        }
                    }
                }
            });

            const template = getTemplate();
            template.hasResourceProperties(
                'AWS::ApplicationAutoScaling::ScalingPolicy',
                {
                    PolicyType: 'TargetTrackingScaling',
                    TargetTrackingScalingPolicyConfiguration: {
                        TargetValue: 50,
                        ScaleInCooldown: 300,
                        ScaleOutCooldown: 300,
                        CustomizedMetricSpecification: {
                            MetricName: 'ActiveFlowCount',
                            Namespace: 'AWS/NetworkELB',
                            Statistic: 'Average'
                        }
                    }
                }
            );
        });

        it('validates scaling configuration when minimum equals maximum', () => {
            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com'
                            }
                        }
                    },
                    vpc,
                    overrides: {
                        cluster: {
                            scaling: {
                                minimum: 2,
                                maximum: 2
                            }
                        }
                    }
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp(
                        'different minimum and maximum bounds'
                    )
                )
            ).toHaveLength(1);
        });

        it('configures task sizing', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc,
                overrides: {
                    cluster: {
                        sizing: {
                            cpu: 2048,
                            memoryMb: 4096
                        }
                    }
                }
            });

            const template = getTemplate();
            template.hasResourceProperties('AWS::ECS::TaskDefinition', {
                Cpu: '2048',
                Memory: '4096'
            });
        });
    });

    describe('Database Configuration', () => {
        it('creates serverless database by default', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc
            });

            const template = getTemplate();
            template.hasResourceProperties('AWS::RDS::DBCluster', {
                ServerlessV2ScalingConfiguration: Match.anyValue()
            });
        });

        it('configures traditional database when specified', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc,
                overrides: {
                    database: {
                        serverless: false
                    }
                }
            });

            const template = getTemplate();
            template.hasResourceProperties('AWS::RDS::DBCluster', {
                ServerlessV2ScalingConfiguration: Match.absent()
            });
        });

        it('configures database scaling when specified', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc,
                overrides: {
                    database: {
                        scaling: {
                            minCapacity: 2,
                            maxCapacity: 10
                        }
                    }
                }
            });

            const template = getTemplate();
            template.hasResourceProperties('AWS::RDS::DBCluster', {
                ServerlessV2ScalingConfiguration: {
                    MaxCapacity: 10,
                    MinCapacity: 2
                }
            });
        });
    });

    describe('Fabric Configuration', () => {
        it('creates internal load balancer by default', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc
            });

            const template = getTemplate();
            template.hasResourceProperties(
                'AWS::ElasticLoadBalancingV2::LoadBalancer',
                {
                    Scheme: 'internal'
                }
            );
        });

        it('creates internet-facing load balancer when specified', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc,
                overrides: {
                    fabric: {
                        internetFacing: true
                    }
                }
            });

            const template = getTemplate();
            template.hasResourceProperties(
                'AWS::ElasticLoadBalancingV2::LoadBalancer',
                {
                    Scheme: 'internet-facing'
                }
            );
        });

        it('imports existing Network Load Balancer', () => {
            const existingNlb =
                NetworkLoadBalancer.fromNetworkLoadBalancerAttributes(
                    stack,
                    'ExistingNlb',
                    {
                        loadBalancerArn:
                            'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/net/test-nlb/1234567890123456',
                        loadBalancerDnsName:
                            'test-nlb-1234567890123456.elb.us-east-1.amazonaws.com',
                        vpc: Vpc.fromVpcAttributes(stack, 'ExistingVpc', {
                            availabilityZones: ['us-east-1a', 'us-east-1b'],
                            vpcId: 'vpc-abc1234'
                        })
                    }
                );

            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc,
                overrides: {
                    fabric: {
                        loadBalancer: {
                            resource: existingNlb
                        }
                    }
                }
            });

            const template = getTemplate();
            template.hasResourceProperties(
                'AWS::ElasticLoadBalancingV2::Listener',
                {
                    LoadBalancerArn:
                        'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/net/test-nlb/1234567890123456',
                    Port: 443,
                    Protocol: 'TCP'
                }
            );
        });

        it('imports existing Application Load Balancer with certificate', () => {
            const existingAlb =
                ApplicationLoadBalancer.fromApplicationLoadBalancerAttributes(
                    stack,
                    'ExistingAlb',
                    {
                        loadBalancerArn:
                            'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/test-alb/1234567890123456',
                        loadBalancerDnsName:
                            'test-alb-1234567890123456.elb.us-east-1.amazonaws.com',
                        securityGroupId: 'sg-12345678',
                        vpc: Vpc.fromVpcAttributes(stack, 'ExistingVpc', {
                            availabilityZones: ['us-east-1a', 'us-east-1b'],
                            vpcId: 'vpc-abc1234'
                        })
                    }
                );

            const certificate = Certificate.fromCertificateArn(
                stack,
                'Certificate',
                'arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012'
            );

            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        }
                    }
                },
                vpc,
                overrides: {
                    cluster: {
                        scaling: {
                            maximum: 3,
                            minimum: 1,
                            requestCountScaling: {
                                enabled: true
                            }
                        }
                    },
                    fabric: {
                        loadBalancer: {
                            resource: existingAlb,
                            certificate: certificate
                        }
                    }
                }
            });

            const template = getTemplate();
            template.hasResourceProperties(
                'AWS::ElasticLoadBalancingV2::Listener',
                {
                    LoadBalancerArn:
                        'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/test-alb/1234567890123456',
                    Port: 443,
                    Protocol: 'HTTPS',
                    Certificates: [
                        {
                            CertificateArn:
                                'arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012'
                        }
                    ]
                }
            );
        });

        it('imports ALB with separate management certificate', () => {
            const existingAlb =
                ApplicationLoadBalancer.fromApplicationLoadBalancerAttributes(
                    stack,
                    'ExistingAlb',
                    {
                        loadBalancerArn:
                            'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/test-alb/1234567890123456',
                        loadBalancerDnsName:
                            'test-alb-1234567890123456.elb.us-east-1.amazonaws.com',
                        securityGroupId: 'sg-12345678',
                        vpc: Vpc.fromVpcAttributes(stack, 'ExistingVpc', {
                            availabilityZones: ['us-east-1a', 'us-east-1b'],
                            vpcId: 'vpc-abc1234'
                        })
                    }
                );

            const certificate = Certificate.fromCertificateArn(
                stack,
                'Certificate',
                'arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012'
            );
            const managementCertificate = Certificate.fromCertificateArn(
                stack,
                'ManagementCertificate',
                'arn:aws:acm:us-east-1:123456789012:certificate/87654321-4321-4321-4321-210987654321'
            );

            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        },
                        management: {
                            port: 9000
                        }
                    }
                },
                vpc,
                overrides: {
                    fabric: {
                        loadBalancer: {
                            resource: existingAlb,
                            certificate: certificate,
                            managementCertificate: managementCertificate
                        }
                    }
                }
            });

            const template = getTemplate();
            template.hasResourceProperties(
                'AWS::ElasticLoadBalancingV2::Listener',
                {
                    LoadBalancerArn:
                        'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/test-alb/1234567890123456',
                    Port: 9000,
                    Protocol: 'HTTPS',
                    Certificates: [
                        {
                            CertificateArn:
                                'arn:aws:acm:us-east-1:123456789012:certificate/87654321-4321-4321-4321-210987654321'
                        }
                    ]
                }
            );
        });

        it('validates management certificate required for ALB with management interface', () => {
            const existingAlb =
                ApplicationLoadBalancer.fromApplicationLoadBalancerAttributes(
                    stack,
                    'ExistingAlb',
                    {
                        loadBalancerArn:
                            'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/test-alb/1234567890123456',
                        loadBalancerDnsName:
                            'test-alb-1234567890123456.elb.us-east-1.amazonaws.com',
                        securityGroupId: 'sg-12345678',
                        vpc: Vpc.fromVpcAttributes(stack, 'ExistingVpc', {
                            availabilityZones: ['us-east-1a', 'us-east-1b'],
                            vpcId: 'vpc-abc1234'
                        })
                    }
                );

            const certificate = Certificate.fromCertificateArn(
                stack,
                'Certificate',
                'arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012'
            );

            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com'
                            },
                            management: {
                                port: 9000
                            }
                        }
                    },
                    vpc,
                    overrides: {
                        fabric: {
                            loadBalancer: {
                                resource: existingAlb,
                                certificate: certificate
                            }
                        }
                    }
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp(
                        'TLS certificate.*management endpoint'
                    )
                )
            ).toHaveLength(1);
        });

        it('enables sticky sessions for Application Load Balancer', () => {
            const existingAlb =
                ApplicationLoadBalancer.fromApplicationLoadBalancerAttributes(
                    stack,
                    'ExistingAlb',
                    {
                        loadBalancerArn:
                            'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/test-alb/1234567890123456',
                        loadBalancerDnsName:
                            'test-alb-1234567890123456.elb.us-east-1.amazonaws.com',
                        securityGroupId: 'sg-12345678',
                        vpc: Vpc.fromVpcAttributes(stack, 'ExistingVpc', {
                            availabilityZones: ['us-east-1a', 'us-east-1b'],
                            vpcId: 'vpc-abc1234'
                        })
                    }
                );

            const certificate = Certificate.fromCertificateArn(
                stack,
                'Certificate',
                'arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012'
            );
            const managementCertificate = Certificate.fromCertificateArn(
                stack,
                'ManagementCertificate',
                'arn:aws:acm:us-east-1:123456789012:certificate/87654321-4321-4321-4321-210987654321'
            );

            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        },
                        management: {
                            port: 9000
                        }
                    }
                },
                vpc,
                overrides: {
                    fabric: {
                        loadBalancer: {
                            resource: existingAlb,
                            certificate: certificate,
                            managementCertificate: managementCertificate
                        }
                    }
                }
            });

            const template = getTemplate();
            template.resourcePropertiesCountIs(
                'AWS::ElasticLoadBalancingV2::TargetGroup',
                {
                    TargetGroupAttributes: [
                        {
                            Key: 'stickiness.enabled',
                            Value: 'true'
                        },
                        {
                            Key: 'stickiness.type',
                            Value: 'app_cookie'
                        },
                        {
                            Key: 'stickiness.app_cookie.cookie_name',
                            Value: 'AUTH_SESSION_ID'
                        },
                        {
                            Key: 'stickiness.app_cookie.duration_seconds',
                            Value: '3600'
                        }
                    ]
                },
                2
            );
        });
    });

    describe('Management Interface', () => {
        it('configures management interface when specified', () => {
            new KeycloakService(stack, id, {
                keycloak: {
                    image,
                    version: KeycloakService.EngineVersion.V26_3_2,
                    configuration: {
                        hostnames: {
                            default: 'auth.example.com'
                        },
                        management: {
                            port: 9000,
                            health: true,
                            metrics: true,
                            path: '/management'
                        }
                    }
                },
                vpc
            });

            const template = getTemplate();
            template.hasResourceProperties('AWS::ECS::TaskDefinition', {
                ContainerDefinitions: Match.arrayWith([
                    Match.objectLike({
                        PortMappings: Match.arrayWith([
                            Match.objectLike({
                                ContainerPort: 8001
                            })
                        ])
                    })
                ])
            });
        });
    });

    describe('Version Support', () => {
        it('supports version 26.3.2', () => {
            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com'
                            }
                        }
                    },
                    vpc
                });
            }).not.toThrow();
        });

        it('rejects unsupported versions', () => {
            const unsupportedVersion =
                KeycloakService.EngineVersion.of('25.0.0');

            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: unsupportedVersion,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com'
                            }
                        }
                    },
                    vpc
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp('not supported')
                )
            ).toHaveLength(1);
        });
    });

    describe('VPC Subnet Requirements', () => {
        it('requires multiple availability zones for workload subnets', () => {
            const singleAzVpc = new Vpc(stack, 'SingleAzVpc', {
                ipAddresses: IpAddresses.cidr('10.1.0.0/16'),
                maxAzs: 1
            });

            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com'
                            }
                        }
                    },
                    vpc: singleAzVpc
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp(
                        'Keycloak requires at least two .*? subnets'
                    )
                )
            ).toHaveLength(2);
        });

        it('requires multiple availability zones for internet-facing load balancer', () => {
            const singleAzVpc = new Vpc(stack, 'SingleAzVpc', {
                ipAddresses: IpAddresses.cidr('10.1.0.0/16'),
                maxAzs: 1
            });

            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com'
                            }
                        }
                    },
                    vpc: singleAzVpc,
                    overrides: {
                        fabric: {
                            internetFacing: true
                        }
                    }
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp('public subnets')
                )
            ).toHaveLength(1);
        });
    });

    describe('Load Balancer VPC Validation', () => {
        it('validates imported Network Load Balancer has VPC specified', () => {
            const existingNlb =
                NetworkLoadBalancer.fromNetworkLoadBalancerAttributes(
                    stack,
                    'ExistingNlb',
                    {
                        loadBalancerArn:
                            'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/net/test-nlb/1234567890123456',
                        loadBalancerDnsName:
                            'test-nlb-1234567890123456.elb.us-east-1.amazonaws.com'
                    }
                );

            expect(() => {
                new KeycloakService(stack, id, {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com'
                            }
                        }
                    },
                    vpc,
                    overrides: {
                        fabric: {
                            loadBalancer: {
                                resource: existingNlb
                            }
                        }
                    }
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp('must have a VPC specified')
                )
            ).toHaveLength(1);
        });

        it('validates imported Application Load Balancer has VPC specified', () => {
            const existingAlb =
                ApplicationLoadBalancer.fromApplicationLoadBalancerAttributes(
                    stack,
                    'ExistingAlb',
                    {
                        loadBalancerArn:
                            'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/test-alb/1234567890123456',
                        loadBalancerDnsName:
                            'test-alb-1234567890123456.elb.us-east-1.amazonaws.com',
                        securityGroupId: 'sg-12345678'
                    }
                );

            const certificate = Certificate.fromCertificateArn(
                stack,
                'Certificate2',
                'arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012'
            );

            expect(() => {
                new KeycloakService(stack, id + '2', {
                    keycloak: {
                        image,
                        version: KeycloakService.EngineVersion.V26_3_2,
                        configuration: {
                            hostnames: {
                                default: 'auth.example.com'
                            }
                        }
                    },
                    vpc,
                    overrides: {
                        fabric: {
                            loadBalancer: {
                                resource: existingAlb,
                                certificate: certificate
                            }
                        }
                    }
                });
            }).not.toThrow();

            const annotations = Annotations.fromStack(stack);
            expect(
                annotations.findError(
                    '*',
                    Match.stringLikeRegexp('must have a VPC specified')
                )
            ).toHaveLength(1);
        });
    });

    describe('EngineVersion', () => {
        it('creates version correctly', () => {
            const version = KeycloakService.EngineVersion.of('26.3.2');
            expect(version.value).toBe('26.3.2');
        });

        it('compares versions correctly', () => {
            const version1 = KeycloakService.EngineVersion.V26_3_2;
            const version2 = KeycloakService.EngineVersion.of('26.3.2');
            const version3 = KeycloakService.EngineVersion.of('25.0.0');

            expect(version1.is(version2)).toBe(true);
            expect(version1.is(version3)).toBe(false);
        });
    });
});
