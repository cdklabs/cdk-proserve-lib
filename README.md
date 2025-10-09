<!--
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
-->

# CDK ProServe Library

[![npm version](https://img.shields.io/npm/v/@cdklabs/cdk-proserve-lib?color=green)](https://www.npmjs.com/package/@cdklabs/cdk-proserve-lib)
[![PyPI version](https://img.shields.io/pypi/v/cdklabs.cdk-proserve-lib?color=yellow)](https://pypi.org/project/cdklabs.cdk-proserve-lib)
[![Maven version](https://img.shields.io/maven-central/v/io.github.cdklabs/cdk-proserve-lib?color=red)](https://central.sonatype.com/artifact/io.github.cdklabs/cdk-proserve-lib)
[![NuGet version](https://img.shields.io/nuget/v/Cdklabs.CdkProserveLib?color=purple)](https://www.nuget.org/packages/Cdklabs.CdkProserveLib)
[![Go version](https://img.shields.io/github/v/release/cdklabs/cdk-proserve-lib?color=blue&label=go)](https://github.com/cdklabs/cdk-proserve-lib-go/tree/main/cdklabscdkproservelib)
[![codecov](https://codecov.io/gh/cdklabs/cdk-proserve-lib/graph/badge.svg?token=FAXq3coTvd)](https://codecov.io/gh/cdklabs/cdk-proserve-lib)

[![View on Construct Hub](https://constructs.dev/badge?package=@cdklabs/cdk-proserve-lib)](https://constructs.dev/packages/@cdklabs/cdk-proserve-lib)

A comprehensive [AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/) library that provides a collection of well-architected constructs, aspects, and patterns for accelerating your cloud infrastructure development.

## 🛠️ Installation

This library is available in multiple programming languages through their respective package managers.

<details>
<summary>TypeScript/JavaScript</summary>

```bash
npm install @cdklabs/cdk-proserve-lib
```

</details>

<details>
<summary>Python</summary>

```bash
pip install cdklabs.cdk-proserve-lib
```

</details>

<details>
<summary>Java</summary>

Add the following to your `pom.xml`:

```xml
<dependency>
    <groupId>io.github.cdklabs</groupId>
    <artifactId>cdk-proserve-lib</artifactId>
    <version>[VERSION]</version>
</dependency>
```

Replace `[VERSION]` with the desired version from Maven Central.

</details>

<details>
<summary>.NET</summary>

```bash
dotnet add package Cdklabs.CdkProserveLib
```

</details>

<details>
<summary>Go</summary>

```bash
go get github.com/cdklabs/cdk-proserve-lib-go/cdklabscdkproservelib
```

</details>

## 📚 Library

The library consists of [constructs](#-constructs), [aspects](#-aspects), and [patterns](#-patterns) that you can utilize in AWS CDK applications.

Total: 23

### 🧱 Constructs

Constructs are the basic building blocks of AWS Cloud Development Kit (AWS CDK) applications. A construct is a component within your application that represents one or more AWS CloudFormation resources and their configuration. You build your application, piece by piece, by importing and configuring constructs. To learn more about constructs, check out the [AWS CDK documentation](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html).

Count: 13

- [**DynamoDbProvisionTable**](API.md#dynamodbprovisiontable-): Controls the contents of an Amazon DynamoDB table from Infrastructure as Code.
- [**Ec2ImageBuilderGetImage**](API.md#ec2imagebuildergetimage-): Retrieves an EC2 Image Builder image build version.
- [**Ec2ImageBuilderStart**](API.md#ec2imagebuilderstart-): Starts an EC2 Image Builder Pipeline and optionally waits for the build to complete.
- [**Ec2ImagePipeline**](API.md#ec2imagepipeline-): An EC2 Image Pipeline that can be used to build a Amazon Machine Image (AMI) automatically.
- [**FriendlyEmbrace**](API.md#friendlyembrace-): The Friendly Embrace construct can be used to remove CloudFormation stack dependencies that are based on stack exports and imports.
- [**IamServerCertificate**](API.md#iamservercertificate-): Manages an AWS Identity and Access Management Server Certificate for use in regions/partitions where AWS Certificate Manager is not available.
- [**NetworkFirewall**](API.md#networkfirewall-): Creates an AWS Network Firewall using a user-supplied Suricata rules file in a VPC.
- [**NetworkFirewallEndpoints**](API.md#networkfirewallendpoints-): Retrieves Network Firewall endpoints so that you can reference them in your other resources.
- [**OpenSearchAdminUser**](API.md#opensearchadminuser-): Manages an admin user for an Amazon OpenSearch domain.
- [**OpenSearchProvisionDomain**](API.md#opensearchprovisiondomain-): Controls the contents of an Amazon OpenSearch Service domain from Infrastructure as Code.
- [**OpenSearchWorkflow**](API.md#opensearchworkflow-): Create OpenSearch Workflows using the flow framework to automate the provisioning of complex tasks using JSON or YAML.
- [**ServerAccessLogsBucket**](API.md#serveraccesslogsbucket-): A secure S3 bucket configured to receive server access logs from other S3 buckets.
- [**WebApplicationFirewall**](API.md#webapplicationfirewall-): Creates an AWS Web Application Firewall (WAF) that can be associated with resources such as an Application Load Balancer.

### 🎭 Aspects

Aspects are a way to apply an operation to all constructs in a given scope. The aspect could modify the constructs, such as by adding tags. Or it could verify something about the state of the constructs, such as making sure that all buckets are encrypted. To learn more about aspects, check out the [AWS CDK documentation](https://docs.aws.amazon.com/cdk/v2/guide/aspects.html).

Count: 8

- [**ApplyRemovalPolicy**](API.md#applyremovalpolicy-): Sets a user specified Removal Policy to all resources that the aspect applies to.
- [**CreateLambdaLogGroup**](API.md#createlambdaloggroup-): Ensures that Lambda log groups are created for all Lambda functions that the aspect applies to.
- [**Ec2AutomatedShutdown**](API.md#ec2automatedshutdown-): Automatically shut down EC2 instances when an alarm is triggered based off of a provided metric.
- [**RdsOracleMultiTenant**](API.md#rdsoraclemultitenant-): Enables Oracle MultiTenant configuration on RDS Oracle database instances.
- [**SecureSageMakerNotebook**](API.md#securesagemakernotebook-): Aspect that enforces security controls on SageMaker Notebook Instances by requiring VPC placement, disabling direct internet access, and preventing root access to the notebook environment.
- [**SecurityCompliance**](API.md#securitycompliance-): Applies best practice security settings to be in compliance with security tools such as CDK Nag.
- [**SetLogRetention**](API.md#setlogretention-): Aspect that sets the log retention period for CloudWatch log groups to a user-supplied retention period.
- [**SqsRequireSsl**](API.md#sqsrequiressl-): Enforces SSL/TLS requirements on Simple Queue Service (SQS) for all resources that the aspect applies to.

### 🎯 Patterns

Patterns are higher-level abstractions that combine multiple constructs and their configurations to form an opinionated solution. They help developers implement best practices and reduce the amount of code needed to build well-architected infrastructure. Patterns typically orchestrate multiple AWS services together in a way that follows AWS best practices. To learn more about patterns, check out the [AWS CDK documentation](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs_lib_levels).

Count: 3

- [**ApiGatewayStaticHosting**](API.md#apigatewaystatichosting-): A pattern that deploys resources to support the hosting of static assets within an AWS account.
- [**Ec2LinuxImagePipeline**](API.md#ec2linuximagepipeline-): A pattern to build an EC2 Image Pipeline specifically for Linux.
- [**KeycloakService**](API.md#keycloakservice-): Deploys a production-grade Keycloak service.

## 🤝 Contributors

[![contributors](https://contrib.rocks/image?repo=cdklabs/cdk-proserve-lib&max=50)](https://github.com/cdklabs/cdk-proserve-lib/graphs/contributors)

## 📄 License

This project is licensed under the [Apache-2.0 License](LICENSE).
