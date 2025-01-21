<!--
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
-->

# CDK ProServe Library

[![npm version](https://img.shields.io/npm/v/@cdklabs/cdk-proserve-lib)](https://www.npmjs.com/package/@cdklabs/cdk-proserve-lib)
[![PyPI version](https://img.shields.io/pypi/v/cdklabs.cdk-proserve-lib)](https://pypi.org/project/cdk-proserve-lib/)
[![Maven version](https://img.shields.io/maven-central/v/io.github.cdklabs/cdkproservelib)](https://search.maven.org/search?q=a:cdkproservelib)
[![NuGet version](https://img.shields.io/nuget/v/Cdklabs.CdkProserveLib)](https://www.nuget.org/packages/Cdklabs.CdkProserveLib)
[![Go version](https://img.shields.io/github/go-mod/go-version/cdklabs/cdk-proserve-lib-go?color=blue&filename=cdkproservelib%2Fgo.mod)](https://github.com/cdklabs/cdk-proserve-lib-go)

[![View on Construct Hub](https://constructs.dev/badge?package=@cdklabs/cdk-proserve-lib)](https://constructs.dev/packages/@cdklabs/cdk-proserve-lib)

An [AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/) library.

## Library

The library consists of constructs, aspects, and patterns that you can utilize
in AWS CDK applications.

Total: 14

### Constructs

Count: 9

- [**Ec2ImageBuilderGetImage**](API.md#ec2imagebuildergetimage): Custom construct that retrieves the AMI ID from an EC2 Image Builder image build version.
- [**Ec2ImageBuilderStart**](API.md#ec2imagebuilderstart): Starts an EC2 Image Builder pipeline execution.
- [**Ec2ImagePipeline**](API.md#ec2imagepipeline): 
- [**FriendlyEmbrace**](API.md#friendlyembrace): Friendly Embrace Custom Resource.
- [**IamServerCertificate**](API.md#iamservercertificate): A construct that creates a Custom Resource to manage an AWS Identity and Access Management Server Certificate for use in regions/partitions where AWS Certificate Manager is not available.
- [**NetworkFirewall**](API.md#networkfirewall): AWS Network Firewall.
- [**NetworkFirewallEndpoints**](API.md#networkfirewallendpoints): Construct that retrieves and manages Network Firewall endpoints Uses AWS Custom Resources to fetch endpoint information from the Network Firewall service.
- [**OpenSearchAdminUser**](API.md#opensearchadminuser): OpenSearchAdminUser construct creates a custom resource to manage an admin user for an Amazon OpenSearch domain.
- [**WebApplicationFirewall**](API.md#webapplicationfirewall): WebApplicationFirewall construct represents a WAF (Web Application Firewall) that can be associated with AWS resources like Application Load Balancers.

### Aspects

Count: 4

- [**ApplyRemovalPolicy**](API.md#applyremovalpolicy): Aspect that applies the provided Removal Policy to all resources.
- [**CreateLambdaLogGroup**](API.md#createlambdaloggroup): An aspect that ensures Lambda log groups are created for all Lambda functions.
- [**SetLogRetention**](API.md#setlogretention): Aspect that sets log retention period for CloudWatch Log Groups.
- [**SqsRequireSsl**](API.md#sqsrequiressl): An aspect that enforces SSL/TLS requirements for SQS queues.

### Patterns

Count: 1

- [**Ec2LinuxImagePipeline**](API.md#ec2linuximagepipeline): A pattern to build an image pipeline specifically for Linux.

## License

This project is licensed under the [Apache-2.0 License](LICENSE).

