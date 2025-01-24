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

- [**Ec2ImageBuilderGetImage**](API.md#ec2imagebuildergetimage-): Retrieves an EC2 Image Builder image build version.
- [**Ec2ImageBuilderStart**](API.md#ec2imagebuilderstart-): Starts an EC2 Image Builder Pipeline and optionally waits for the build to complete.
- [**Ec2ImagePipeline**](API.md#ec2imagepipeline-): An EC2 Image Pipeline that can be used to build a Amazon Machine Image (AMI) automatically.
- [**FriendlyEmbrace**](API.md#friendlyembrace-): The Friendly Embrace construct can be used to remove CloudFormation stack dependencies that are based on stack exports and imports.
- [**IamServerCertificate**](API.md#iamservercertificate-): A construct that creates a Custom Resource to manage an AWS Identity and Access Management Server Certificate for use in regions/partitions where AWS Certificate Manager is not available.
- [**NetworkFirewall**](API.md#networkfirewall-): Creates an AWS Network Firewall using a user-supplied Suricata rules file in a VPC.
- [**NetworkFirewallEndpoints**](API.md#networkfirewallendpoints-): Retrieves Network Firewall endpoints so that you can reference them in your other resources.
- [**OpenSearchAdminUser**](API.md#opensearchadminuser-): OpenSearchAdminUser construct creates a custom resource to manage an admin user for an Amazon OpenSearch domain.
- [**WebApplicationFirewall**](API.md#webapplicationfirewall-): Creates an AWS Web Application Firewall (WAF) that can be associated with resources such as an Application Load Balancer.

### Aspects

Count: 4

- [**ApplyRemovalPolicy**](API.md#applyremovalpolicy-): Sets a user specified Removal Policy to all resources that the aspect applies to.
- [**CreateLambdaLogGroup**](API.md#createlambdaloggroup-): Ensures that Lambda log groups are created for all Lambda functions that the aspect applies to.
- [**SetLogRetention**](API.md#setlogretention-): Aspect that sets the log retention period for CloudWatch log groups to a user-supplied retention period.
- [**SqsRequireSsl**](API.md#sqsrequiressl-): Enforces SSL/TLS requirements on Simple Queue Service (SQS) for all resources that the aspect applies to.

### Patterns

Count: 1

- [**Ec2LinuxImagePipeline**](API.md#ec2linuximagepipeline-): A pattern to build an EC2 Image Pipeline specifically for Linux.

## License

This project is licensed under the [Apache-2.0 License](LICENSE).
