# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Ec2ImageBuilderGetImage <a name="Ec2ImageBuilderGetImage" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage"></a>

Custom construct that retrieves the AMI ID from an EC2 Image Builder image build version.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve'

new constructs.Ec2ImageBuilderGetImage(scope: Construct, id: string, props: Ec2ImageBuilderGetImageProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope in which to define this construct. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImageProps</code> | Configuration properties. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.Initializer.parameter.id"></a>

- *Type:* string

The scoped construct ID.

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImageProps

Configuration properties.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve'

constructs.Ec2ImageBuilderGetImage.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.property.ami">ami</a></code> | <code>string</code> | The AMI ID retrieved from the EC2 Image Builder image. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `ami`<sup>Required</sup> <a name="ami" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImage.property.ami"></a>

```typescript
public readonly ami: string;
```

- *Type:* string

The AMI ID retrieved from the EC2 Image Builder image.

---


### Ec2ImageBuilderStart <a name="Ec2ImageBuilderStart" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart"></a>

Starts an EC2 Image Builder pipeline execution.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve'

new constructs.Ec2ImageBuilderStart(scope: Construct, id: string, props: Ec2ImageBuilderStartProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The construct scope. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.Initializer.parameter.id">id</a></code> | <code>string</code> | The construct ID. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps</code> | Configuration properties. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The construct scope.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.Initializer.parameter.id"></a>

- *Type:* string

The construct ID.

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps

Configuration properties.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve'

constructs.Ec2ImageBuilderStart.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.property.imageBuildVersionArn">imageBuildVersionArn</a></code> | <code>string</code> | The ARN of the image build version created by the pipeline execution. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `imageBuildVersionArn`<sup>Required</sup> <a name="imageBuildVersionArn" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.property.imageBuildVersionArn"></a>

```typescript
public readonly imageBuildVersionArn: string;
```

- *Type:* string

The ARN of the image build version created by the pipeline execution.

---


### OpensearchAdminUser <a name="OpensearchAdminUser" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUser"></a>

OpensearchAdminUser construct creates a custom resource to manage an admin user for an Amazon Opensearch domain.

This construct creates a Lambda-backed custom resource that adds an admin user to the specified Opensearch domain.
It uses the provided SSM parameters for the username and password, and sets up the necessary IAM permissions
for the Lambda function to interact with the Opensearch domain and SSM parameters.

The construct also handles encryption for the Lambda function's environment variables and dead letter queue,
using either a provided KMS key or an AWS managed key.

*Example*

```typescript
const adminUser = new OpensearchAdminUser(this, 'OpensearchAdminUser', {
  username: usernameParameter,
  password: passwordParameter,
  domain: opensearchDomain,
  domainKey: opensearchDomainKey,
  workerEncryption: workerKmsKey
});
```


#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve'

new constructs.OpensearchAdminUser(scope: Construct, id: string, props: OpensearchAdminUserProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve'

constructs.OpensearchAdminUser.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUser.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### CustomResourceLambdaConfiguration <a name="CustomResourceLambdaConfiguration" id="@cdklabs/cdk-proserve.interfaces.CustomResourceLambdaConfiguration"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve.interfaces.CustomResourceLambdaConfiguration.Initializer"></a>

```typescript
import { interfaces } from '@cdklabs/cdk-proserve'

const customResourceLambdaConfiguration: interfaces.CustomResourceLambdaConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.interfaces.CustomResourceLambdaConfiguration.property.subnets">subnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Optional subnet selection for the Lambda functions. |
| <code><a href="#@cdklabs/cdk-proserve.interfaces.CustomResourceLambdaConfiguration.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC where the Lambda functions will be deployed. |

---

##### `subnets`<sup>Optional</sup> <a name="subnets" id="@cdklabs/cdk-proserve.interfaces.CustomResourceLambdaConfiguration.property.subnets"></a>

```typescript
public readonly subnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

Optional subnet selection for the Lambda functions.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@cdklabs/cdk-proserve.interfaces.CustomResourceLambdaConfiguration.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

VPC where the Lambda functions will be deployed.

---

### Ec2ImageBuilderGetImageProps <a name="Ec2ImageBuilderGetImageProps" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImageProps"></a>

Properties for the Ec2ImageBuilderGetImage construct.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImageProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve'

const ec2ImageBuilderGetImageProps: constructs.Ec2ImageBuilderGetImageProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImageProps.property.imageBuildVersionArn">imageBuildVersionArn</a></code> | <code>string</code> | The ARN of the EC2 Image Builder image build version. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImageProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve.interfaces.CustomResourceLambdaConfiguration</code> | Optional Lambda configuration settings. |

---

##### `imageBuildVersionArn`<sup>Required</sup> <a name="imageBuildVersionArn" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImageProps.property.imageBuildVersionArn"></a>

```typescript
public readonly imageBuildVersionArn: string;
```

- *Type:* string

The ARN of the EC2 Image Builder image build version.

---

##### `lambdaConfiguration`<sup>Optional</sup> <a name="lambdaConfiguration" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderGetImageProps.property.lambdaConfiguration"></a>

```typescript
public readonly lambdaConfiguration: CustomResourceLambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve.interfaces.CustomResourceLambdaConfiguration

Optional Lambda configuration settings.

---

### Ec2ImageBuilderStartProps <a name="Ec2ImageBuilderStartProps" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps"></a>

Properties for the EC2 Image Builder Start custom resource.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve'

const ec2ImageBuilderStartProps: constructs.Ec2ImageBuilderStartProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps.property.pipelineArn">pipelineArn</a></code> | <code>string</code> | The ARN of the Image Builder pipeline to start. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional KMS Encryption Key to use for encrypting resources. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps.property.hash">hash</a></code> | <code>string</code> | An optional user-generated hash value that will determine if the construct will start the build pipeline. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve.interfaces.LambdaConfiguration</code> | Optional Lambda configuration settings. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps.property.waitForCompletion">waitForCompletion</a></code> | <code>@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.WaitForCompletionProps</code> | Set these properties to wait for the Image Build to complete. |

---

##### `pipelineArn`<sup>Required</sup> <a name="pipelineArn" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps.property.pipelineArn"></a>

```typescript
public readonly pipelineArn: string;
```

- *Type:* string

The ARN of the Image Builder pipeline to start.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional KMS Encryption Key to use for encrypting resources.

---

##### `hash`<sup>Optional</sup> <a name="hash" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps.property.hash"></a>

```typescript
public readonly hash: string;
```

- *Type:* string

An optional user-generated hash value that will determine if the construct will start the build pipeline.

If this is not set, the pipeline
will only start once on initial deployment. By setting this, you can for
example start a new build if your build instructions have changed and
then wait for the pipeline to complete again.

This hash should be a short
string, ideally ~7 characters or less. It will be set as the Physical ID
of the Custom Resource and also used to append to Waiter function
Physical IDs.

---

##### `lambdaConfiguration`<sup>Optional</sup> <a name="lambdaConfiguration" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps.property.lambdaConfiguration"></a>

```typescript
public readonly lambdaConfiguration: LambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve.interfaces.LambdaConfiguration

Optional Lambda configuration settings.

---

##### `waitForCompletion`<sup>Optional</sup> <a name="waitForCompletion" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStartProps.property.waitForCompletion"></a>

```typescript
public readonly waitForCompletion: WaitForCompletionProps;
```

- *Type:* @cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.WaitForCompletionProps

Set these properties to wait for the Image Build to complete.

This is
useful if you need the AMI before your next infrastructure step.

---

### LambdaConfiguration <a name="LambdaConfiguration" id="@cdklabs/cdk-proserve.interfaces.LambdaConfiguration"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve.interfaces.LambdaConfiguration.Initializer"></a>

```typescript
import { interfaces } from '@cdklabs/cdk-proserve'

const lambdaConfiguration: interfaces.LambdaConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.interfaces.LambdaConfiguration.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | Optional SQS queue to use as a dead letter queue. |
| <code><a href="#@cdklabs/cdk-proserve.interfaces.LambdaConfiguration.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | Security groups to attach to the provider Lambda functions. |
| <code><a href="#@cdklabs/cdk-proserve.interfaces.LambdaConfiguration.property.subnets">subnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Optional subnet selection for the Lambda functions. |
| <code><a href="#@cdklabs/cdk-proserve.interfaces.LambdaConfiguration.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC where the Lambda functions will be deployed. |

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="@cdklabs/cdk-proserve.interfaces.LambdaConfiguration.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue

Optional SQS queue to use as a dead letter queue.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@cdklabs/cdk-proserve.interfaces.LambdaConfiguration.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

Security groups to attach to the provider Lambda functions.

---

##### `subnets`<sup>Optional</sup> <a name="subnets" id="@cdklabs/cdk-proserve.interfaces.LambdaConfiguration.property.subnets"></a>

```typescript
public readonly subnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

Optional subnet selection for the Lambda functions.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@cdklabs/cdk-proserve.interfaces.LambdaConfiguration.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

VPC where the Lambda functions will be deployed.

---

### OpensearchAdminUserProps <a name="OpensearchAdminUserProps" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps"></a>

Properties for the OpensearchAdminUser construct.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve'

const opensearchAdminUserProps: constructs.OpensearchAdminUserProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps.property.domain">domain</a></code> | <code>aws-cdk-lib.aws_opensearchservice.IDomain</code> | The Opensearch domain to which the admin user will be added. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps.property.password">password</a></code> | <code>aws-cdk-lib.aws_ssm.IParameter</code> | The SSM parameter containing the password for the Opensearch admin user. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps.property.username">username</a></code> | <code>aws-cdk-lib.aws_ssm.IParameter</code> | The SSM parameter containing the username for the Opensearch admin user. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps.property.domainKey">domainKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps.property.workerEncryption">workerEncryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional. |

---

##### `domain`<sup>Required</sup> <a name="domain" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps.property.domain"></a>

```typescript
public readonly domain: IDomain;
```

- *Type:* aws-cdk-lib.aws_opensearchservice.IDomain

The Opensearch domain to which the admin user will be added.

---

##### `password`<sup>Required</sup> <a name="password" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps.property.password"></a>

```typescript
public readonly password: IParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IParameter

The SSM parameter containing the password for the Opensearch admin user.

---

##### `username`<sup>Required</sup> <a name="username" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps.property.username"></a>

```typescript
public readonly username: IParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IParameter

The SSM parameter containing the username for the Opensearch admin user.

---

##### `domainKey`<sup>Optional</sup> <a name="domainKey" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps.property.domainKey"></a>

```typescript
public readonly domainKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional.

The KMS key used to encrypt the Opensearch domain.
If provided, the construct will grant the necessary permissions to use this key.

---

##### `workerEncryption`<sup>Optional</sup> <a name="workerEncryption" id="@cdklabs/cdk-proserve.constructs.OpensearchAdminUserProps.property.workerEncryption"></a>

```typescript
public readonly workerEncryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional.

The KMS key used to encrypt the worker resources (e.g., Lambda function environment variables).
If provided, this key will be used for encryption; otherwise, an AWS managed key will be used.

---

### WaitForCompletionProps <a name="WaitForCompletionProps" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.WaitForCompletionProps"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.WaitForCompletionProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve'

const waitForCompletionProps: constructs.Ec2ImageBuilderStart.WaitForCompletionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.WaitForCompletionProps.property.topic">topic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | An SNS Topic that will signal when the pipeline is complete. |
| <code><a href="#@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.WaitForCompletionProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The maximum amount of time to wait for the image build pipeline to complete. |

---

##### `topic`<sup>Required</sup> <a name="topic" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.WaitForCompletionProps.property.topic"></a>

```typescript
public readonly topic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic

An SNS Topic that will signal when the pipeline is complete.

This is
typically configured on your EC2 Image Builder pipeline to trigger an
SNS notification when the pipeline completes.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@cdklabs/cdk-proserve.constructs.Ec2ImageBuilderStart.WaitForCompletionProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* 12 hours

The maximum amount of time to wait for the image build pipeline to complete.

This is set to a maximum of 12 hours by default.

---



