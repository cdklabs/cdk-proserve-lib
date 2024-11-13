# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Ec2ImageBuilderGetImage <a name="Ec2ImageBuilderGetImage" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage"></a>

Custom construct that retrieves the AMI ID from an EC2 Image Builder image build version.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.Ec2ImageBuilderGetImage(scope: Construct, id: string, props: Ec2ImageBuilderGetImageProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope in which to define this construct. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImageProps</code> | Configuration properties. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.Initializer.parameter.id"></a>

- *Type:* string

The scoped construct ID.

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImageProps

Configuration properties.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

constructs.Ec2ImageBuilderGetImage.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.property.ami">ami</a></code> | <code>string</code> | The AMI ID retrieved from the EC2 Image Builder image. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `ami`<sup>Required</sup> <a name="ami" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage.property.ami"></a>

```typescript
public readonly ami: string;
```

- *Type:* string

The AMI ID retrieved from the EC2 Image Builder image.

---


### Ec2ImageBuilderStart <a name="Ec2ImageBuilderStart" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart"></a>

Starts an EC2 Image Builder pipeline execution.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.Ec2ImageBuilderStart(scope: Construct, id: string, props: Ec2ImageBuilderStartProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The construct scope. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.Initializer.parameter.id">id</a></code> | <code>string</code> | The construct ID. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps</code> | Configuration properties. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The construct scope.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.Initializer.parameter.id"></a>

- *Type:* string

The construct ID.

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps

Configuration properties.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

constructs.Ec2ImageBuilderStart.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.property.imageBuildVersionArn">imageBuildVersionArn</a></code> | <code>string</code> | The ARN of the image build version created by the pipeline execution. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `imageBuildVersionArn`<sup>Required</sup> <a name="imageBuildVersionArn" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.property.imageBuildVersionArn"></a>

```typescript
public readonly imageBuildVersionArn: string;
```

- *Type:* string

The ARN of the image build version created by the pipeline execution.

---


### Ec2ImagePipeline <a name="Ec2ImagePipeline" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline"></a>

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.Ec2ImagePipeline(scope: Construct, id: string, props: Ec2ImagePipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

constructs.Ec2ImagePipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.property.imagePipelineArn">imagePipelineArn</a></code> | <code>string</code> | The Image Pipeline ARN that gets created. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.property.imagePipelineTopic">imagePipelineTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The Image Pipeline Topic that gets created. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.property.latestAmi">latestAmi</a></code> | <code>string</code> | The latest AMI built by the pipeline. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `imagePipelineArn`<sup>Required</sup> <a name="imagePipelineArn" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.property.imagePipelineArn"></a>

```typescript
public readonly imagePipelineArn: string;
```

- *Type:* string

The Image Pipeline ARN that gets created.

---

##### `imagePipelineTopic`<sup>Required</sup> <a name="imagePipelineTopic" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.property.imagePipelineTopic"></a>

```typescript
public readonly imagePipelineTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic

The Image Pipeline Topic that gets created.

---

##### `latestAmi`<sup>Optional</sup> <a name="latestAmi" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.property.latestAmi"></a>

```typescript
public readonly latestAmi: string;
```

- *Type:* string

The latest AMI built by the pipeline.

NOTE: You must have enabled the
Build Configuration option to wait for image build completion for this
property to be available.

---


### Ec2LinuxStigImagePipeline <a name="Ec2LinuxStigImagePipeline" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline"></a>

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.Initializer"></a>

```typescript
import { patterns } from '@cdklabs/cdk-proserve-lib'

new patterns.Ec2LinuxStigImagePipeline(scope: Construct, id: string, props: Ec2LinuxStigImagePipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.isConstruct"></a>

```typescript
import { patterns } from '@cdklabs/cdk-proserve-lib'

patterns.Ec2LinuxStigImagePipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.property.imagePipelineArn">imagePipelineArn</a></code> | <code>string</code> | The Image Pipeline ARN that gets created. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.property.imagePipelineTopic">imagePipelineTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The Image Pipeline Topic that gets created. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.property.latestAmi">latestAmi</a></code> | <code>string</code> | The latest AMI built by the pipeline. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `imagePipelineArn`<sup>Required</sup> <a name="imagePipelineArn" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.property.imagePipelineArn"></a>

```typescript
public readonly imagePipelineArn: string;
```

- *Type:* string

The Image Pipeline ARN that gets created.

---

##### `imagePipelineTopic`<sup>Required</sup> <a name="imagePipelineTopic" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.property.imagePipelineTopic"></a>

```typescript
public readonly imagePipelineTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic

The Image Pipeline Topic that gets created.

---

##### `latestAmi`<sup>Optional</sup> <a name="latestAmi" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.property.latestAmi"></a>

```typescript
public readonly latestAmi: string;
```

- *Type:* string

The latest AMI built by the pipeline.

NOTE: You must have enabled the
Build Configuration option to wait for image build completion for this
property to be available.

---


### OpensearchAdminUser <a name="OpensearchAdminUser" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser"></a>

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


#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.OpensearchAdminUser(scope: Construct, id: string, props: OpensearchAdminUserProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

constructs.OpensearchAdminUser.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUser.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### BuildConfigurationProps <a name="BuildConfigurationProps" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const buildConfigurationProps: constructs.Ec2ImagePipeline.BuildConfigurationProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps.property.start">start</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps.property.hash">hash</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps.property.waitForCompletion">waitForCompletion</a></code> | <code>boolean</code> | *No description.* |

---

##### `start`<sup>Required</sup> <a name="start" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps.property.start"></a>

```typescript
public readonly start: boolean;
```

- *Type:* boolean

---

##### `hash`<sup>Optional</sup> <a name="hash" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps.property.hash"></a>

```typescript
public readonly hash: string;
```

- *Type:* string

---

##### `waitForCompletion`<sup>Optional</sup> <a name="waitForCompletion" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps.property.waitForCompletion"></a>

```typescript
public readonly waitForCompletion: boolean;
```

- *Type:* boolean

---

### CustomResourceLambdaConfiguration <a name="CustomResourceLambdaConfiguration" id="@cdklabs/cdk-proserve-lib.interfaces.CustomResourceLambdaConfiguration"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.interfaces.CustomResourceLambdaConfiguration.Initializer"></a>

```typescript
import { interfaces } from '@cdklabs/cdk-proserve-lib'

const customResourceLambdaConfiguration: interfaces.CustomResourceLambdaConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.interfaces.CustomResourceLambdaConfiguration.property.subnets">subnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Optional subnet selection for the Lambda functions. |
| <code><a href="#@cdklabs/cdk-proserve-lib.interfaces.CustomResourceLambdaConfiguration.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC where the Lambda functions will be deployed. |

---

##### `subnets`<sup>Optional</sup> <a name="subnets" id="@cdklabs/cdk-proserve-lib.interfaces.CustomResourceLambdaConfiguration.property.subnets"></a>

```typescript
public readonly subnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

Optional subnet selection for the Lambda functions.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@cdklabs/cdk-proserve-lib.interfaces.CustomResourceLambdaConfiguration.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

VPC where the Lambda functions will be deployed.

---

### Ec2ImageBuilderGetImageProps <a name="Ec2ImageBuilderGetImageProps" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImageProps"></a>

Properties for the Ec2ImageBuilderGetImage construct.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImageProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const ec2ImageBuilderGetImageProps: constructs.Ec2ImageBuilderGetImageProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImageProps.property.imageBuildVersionArn">imageBuildVersionArn</a></code> | <code>string</code> | The ARN of the EC2 Image Builder image build version. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImageProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.interfaces.CustomResourceLambdaConfiguration</code> | Optional Lambda configuration settings. |

---

##### `imageBuildVersionArn`<sup>Required</sup> <a name="imageBuildVersionArn" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImageProps.property.imageBuildVersionArn"></a>

```typescript
public readonly imageBuildVersionArn: string;
```

- *Type:* string

The ARN of the EC2 Image Builder image build version.

---

##### `lambdaConfiguration`<sup>Optional</sup> <a name="lambdaConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImageProps.property.lambdaConfiguration"></a>

```typescript
public readonly lambdaConfiguration: CustomResourceLambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve-lib.interfaces.CustomResourceLambdaConfiguration

Optional Lambda configuration settings.

---

### Ec2ImageBuilderStartProps <a name="Ec2ImageBuilderStartProps" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps"></a>

Properties for the EC2 Image Builder Start custom resource.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const ec2ImageBuilderStartProps: constructs.Ec2ImageBuilderStartProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps.property.pipelineArn">pipelineArn</a></code> | <code>string</code> | The ARN of the Image Builder pipeline to start. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional KMS Encryption Key to use for encrypting resources. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps.property.hash">hash</a></code> | <code>string</code> | An optional user-generated hash value that will determine if the construct will start the build pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration</code> | Optional Lambda configuration settings. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps.property.waitForCompletion">waitForCompletion</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.WaitForCompletionProps</code> | Set these properties to wait for the Image Build to complete. |

---

##### `pipelineArn`<sup>Required</sup> <a name="pipelineArn" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps.property.pipelineArn"></a>

```typescript
public readonly pipelineArn: string;
```

- *Type:* string

The ARN of the Image Builder pipeline to start.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional KMS Encryption Key to use for encrypting resources.

---

##### `hash`<sup>Optional</sup> <a name="hash" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps.property.hash"></a>

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

##### `lambdaConfiguration`<sup>Optional</sup> <a name="lambdaConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps.property.lambdaConfiguration"></a>

```typescript
public readonly lambdaConfiguration: LambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration

Optional Lambda configuration settings.

---

##### `waitForCompletion`<sup>Optional</sup> <a name="waitForCompletion" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps.property.waitForCompletion"></a>

```typescript
public readonly waitForCompletion: WaitForCompletionProps;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.WaitForCompletionProps

Set these properties to wait for the Image Build to complete.

This is
useful if you need the AMI before your next infrastructure step.

---

### Ec2ImagePipelineBaseProps <a name="Ec2ImagePipelineBaseProps" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps"></a>

Base properties for EC2 Image Pipeline configuration.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const ec2ImagePipelineBaseProps: constructs.Ec2ImagePipelineBaseProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.version">version</a></code> | <code>string</code> | Version of the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.buildConfiguration">buildConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps</code> | Configuration options for the build process. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.description">description</a></code> | <code>string</code> | Description of the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | KMS key for encryption. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.instanceTypes">instanceTypes</a></code> | <code>string[]</code> | Instance types for the Image Builder Pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.vpcConfiguration">vpcConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps</code> | VPC configuration for the image pipeline. |

---

##### `version`<sup>Required</sup> <a name="version" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version of the image pipeline.

---

##### `buildConfiguration`<sup>Optional</sup> <a name="buildConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.buildConfiguration"></a>

```typescript
public readonly buildConfiguration: BuildConfigurationProps;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps

Configuration options for the build process.

---

##### `description`<sup>Optional</sup> <a name="description" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Description of the image pipeline.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

KMS key for encryption.

---

##### `instanceTypes`<sup>Optional</sup> <a name="instanceTypes" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.instanceTypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* string[]

Instance types for the Image Builder Pipeline.

Default: [t3.medium]

---

##### `vpcConfiguration`<sup>Optional</sup> <a name="vpcConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.vpcConfiguration"></a>

```typescript
public readonly vpcConfiguration: VpcConfigurationProps;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps

VPC configuration for the image pipeline.

---

### Ec2ImagePipelineProps <a name="Ec2ImagePipelineProps" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps"></a>

Properties for EC2 Image Pipeline, extending the base properties.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const ec2ImagePipelineProps: constructs.Ec2ImagePipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.version">version</a></code> | <code>string</code> | Version of the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.buildConfiguration">buildConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps</code> | Configuration options for the build process. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.description">description</a></code> | <code>string</code> | Description of the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | KMS key for encryption. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.instanceTypes">instanceTypes</a></code> | <code>string[]</code> | Instance types for the Image Builder Pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.vpcConfiguration">vpcConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps</code> | VPC configuration for the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.blockDeviceMappings">blockDeviceMappings</a></code> | <code>aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.InstanceBlockDeviceMappingProperty[]</code> | Block device mappings for the image. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.components">components</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component \| aws-cdk-lib.aws_imagebuilder.CfnComponent[]</code> | Components to be included in the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.machineImage">machineImage</a></code> | <code>aws-cdk-lib.aws_ec2.IMachineImage</code> | The machine image to use as a base for the pipeline. |

---

##### `version`<sup>Required</sup> <a name="version" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version of the image pipeline.

---

##### `buildConfiguration`<sup>Optional</sup> <a name="buildConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.buildConfiguration"></a>

```typescript
public readonly buildConfiguration: BuildConfigurationProps;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps

Configuration options for the build process.

---

##### `description`<sup>Optional</sup> <a name="description" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Description of the image pipeline.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

KMS key for encryption.

---

##### `instanceTypes`<sup>Optional</sup> <a name="instanceTypes" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.instanceTypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* string[]

Instance types for the Image Builder Pipeline.

Default: [t3.medium]

---

##### `vpcConfiguration`<sup>Optional</sup> <a name="vpcConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.vpcConfiguration"></a>

```typescript
public readonly vpcConfiguration: VpcConfigurationProps;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps

VPC configuration for the image pipeline.

---

##### `blockDeviceMappings`<sup>Optional</sup> <a name="blockDeviceMappings" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.blockDeviceMappings"></a>

```typescript
public readonly blockDeviceMappings: InstanceBlockDeviceMappingProperty[];
```

- *Type:* aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.InstanceBlockDeviceMappingProperty[]

Block device mappings for the image.

---

##### `components`<sup>Optional</sup> <a name="components" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.components"></a>

```typescript
public readonly components: Component | CfnComponent[];
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component | aws-cdk-lib.aws_imagebuilder.CfnComponent[]

Components to be included in the image pipeline.

Can be either custom Ec2ImagePipeline.Component or AWS CDK imagebuilder.CfnComponent.

---

##### `machineImage`<sup>Optional</sup> <a name="machineImage" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.machineImage"></a>

```typescript
public readonly machineImage: IMachineImage;
```

- *Type:* aws-cdk-lib.aws_ec2.IMachineImage

The machine image to use as a base for the pipeline.

---

### Ec2LinuxStigImagePipelineProps <a name="Ec2LinuxStigImagePipelineProps" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps"></a>

Properties for creating a Linux STIG Image Pipeline.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.Initializer"></a>

```typescript
import { patterns } from '@cdklabs/cdk-proserve-lib'

const ec2LinuxStigImagePipelineProps: patterns.Ec2LinuxStigImagePipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.version">version</a></code> | <code>string</code> | Version of the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.buildConfiguration">buildConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps</code> | Configuration options for the build process. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.description">description</a></code> | <code>string</code> | Description of the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | KMS key for encryption. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.instanceTypes">instanceTypes</a></code> | <code>string[]</code> | Instance types for the Image Builder Pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.vpcConfiguration">vpcConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps</code> | VPC configuration for the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.extraComponents">extraComponents</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component \| aws-cdk-lib.aws_imagebuilder.CfnComponent[]</code> | Additional components to install in the image. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.extraDeviceMappings">extraDeviceMappings</a></code> | <code>aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.InstanceBlockDeviceMappingProperty[]</code> | Additional EBS volume mappings to add to the image. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.operatingSystem">operatingSystem</a></code> | <code>@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.OperatingSystem</code> | The operating system to use for the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.rootVolumeSize">rootVolumeSize</a></code> | <code>number</code> | Size for the root volume in GB. |

---

##### `version`<sup>Required</sup> <a name="version" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version of the image pipeline.

---

##### `buildConfiguration`<sup>Optional</sup> <a name="buildConfiguration" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.buildConfiguration"></a>

```typescript
public readonly buildConfiguration: BuildConfigurationProps;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps

Configuration options for the build process.

---

##### `description`<sup>Optional</sup> <a name="description" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Description of the image pipeline.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

KMS key for encryption.

---

##### `instanceTypes`<sup>Optional</sup> <a name="instanceTypes" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.instanceTypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* string[]

Instance types for the Image Builder Pipeline.

Default: [t3.medium]

---

##### `vpcConfiguration`<sup>Optional</sup> <a name="vpcConfiguration" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.vpcConfiguration"></a>

```typescript
public readonly vpcConfiguration: VpcConfigurationProps;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps

VPC configuration for the image pipeline.

---

##### `extraComponents`<sup>Optional</sup> <a name="extraComponents" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.extraComponents"></a>

```typescript
public readonly extraComponents: Component | CfnComponent[];
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component | aws-cdk-lib.aws_imagebuilder.CfnComponent[]

Additional components to install in the image.

These will be added after the default Linux components.

---

##### `extraDeviceMappings`<sup>Optional</sup> <a name="extraDeviceMappings" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.extraDeviceMappings"></a>

```typescript
public readonly extraDeviceMappings: InstanceBlockDeviceMappingProperty[];
```

- *Type:* aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.InstanceBlockDeviceMappingProperty[]

Additional EBS volume mappings to add to the image.

These will be added in addition to the root volume.

---

##### `operatingSystem`<sup>Optional</sup> <a name="operatingSystem" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.operatingSystem"></a>

```typescript
public readonly operatingSystem: OperatingSystem;
```

- *Type:* @cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.OperatingSystem

The operating system to use for the image pipeline.

---

##### `rootVolumeSize`<sup>Optional</sup> <a name="rootVolumeSize" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipelineProps.property.rootVolumeSize"></a>

```typescript
public readonly rootVolumeSize: number;
```

- *Type:* number
- *Default:* 10

Size for the root volume in GB.

Default: 10 GB.

---

### LambdaConfiguration <a name="LambdaConfiguration" id="@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration.Initializer"></a>

```typescript
import { interfaces } from '@cdklabs/cdk-proserve-lib'

const lambdaConfiguration: interfaces.LambdaConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | Optional SQS queue to use as a dead letter queue. |
| <code><a href="#@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | Security groups to attach to the provider Lambda functions. |
| <code><a href="#@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration.property.subnets">subnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Optional subnet selection for the Lambda functions. |
| <code><a href="#@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC where the Lambda functions will be deployed. |

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue

Optional SQS queue to use as a dead letter queue.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

Security groups to attach to the provider Lambda functions.

---

##### `subnets`<sup>Optional</sup> <a name="subnets" id="@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration.property.subnets"></a>

```typescript
public readonly subnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

Optional subnet selection for the Lambda functions.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

VPC where the Lambda functions will be deployed.

---

### OpensearchAdminUserProps <a name="OpensearchAdminUserProps" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps"></a>

Properties for the OpensearchAdminUser construct.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const opensearchAdminUserProps: constructs.OpensearchAdminUserProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps.property.domain">domain</a></code> | <code>aws-cdk-lib.aws_opensearchservice.IDomain</code> | The Opensearch domain to which the admin user will be added. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps.property.password">password</a></code> | <code>aws-cdk-lib.aws_ssm.IParameter</code> | The SSM parameter containing the password for the Opensearch admin user. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps.property.username">username</a></code> | <code>aws-cdk-lib.aws_ssm.IParameter</code> | The SSM parameter containing the username for the Opensearch admin user. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps.property.domainKey">domainKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps.property.workerEncryption">workerEncryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional. |

---

##### `domain`<sup>Required</sup> <a name="domain" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps.property.domain"></a>

```typescript
public readonly domain: IDomain;
```

- *Type:* aws-cdk-lib.aws_opensearchservice.IDomain

The Opensearch domain to which the admin user will be added.

---

##### `password`<sup>Required</sup> <a name="password" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps.property.password"></a>

```typescript
public readonly password: IParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IParameter

The SSM parameter containing the password for the Opensearch admin user.

---

##### `username`<sup>Required</sup> <a name="username" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps.property.username"></a>

```typescript
public readonly username: IParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IParameter

The SSM parameter containing the username for the Opensearch admin user.

---

##### `domainKey`<sup>Optional</sup> <a name="domainKey" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps.property.domainKey"></a>

```typescript
public readonly domainKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional.

The KMS key used to encrypt the Opensearch domain.
If provided, the construct will grant the necessary permissions to use this key.

---

##### `workerEncryption`<sup>Optional</sup> <a name="workerEncryption" id="@cdklabs/cdk-proserve-lib.constructs.OpensearchAdminUserProps.property.workerEncryption"></a>

```typescript
public readonly workerEncryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional.

The KMS key used to encrypt the worker resources (e.g., Lambda function environment variables).
If provided, this key will be used for encryption; otherwise, an AWS managed key will be used.

---

### VpcConfigurationProps <a name="VpcConfigurationProps" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps"></a>

VPC Configuration.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const vpcConfigurationProps: constructs.Ec2ImagePipeline.VpcConfigurationProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps.property.securityGroup">securityGroup</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps.property.subnet">subnet</a></code> | <code>aws-cdk-lib.aws_ec2.ISubnet</code> | *No description.* |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `securityGroup`<sup>Optional</sup> <a name="securityGroup" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps.property.securityGroup"></a>

```typescript
public readonly securityGroup: ISecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup

---

##### `subnet`<sup>Optional</sup> <a name="subnet" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps.property.subnet"></a>

```typescript
public readonly subnet: ISubnet;
```

- *Type:* aws-cdk-lib.aws_ec2.ISubnet

---

### WaitForCompletionProps <a name="WaitForCompletionProps" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.WaitForCompletionProps"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.WaitForCompletionProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const waitForCompletionProps: constructs.Ec2ImageBuilderStart.WaitForCompletionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.WaitForCompletionProps.property.topic">topic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | An SNS Topic that will signal when the pipeline is complete. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.WaitForCompletionProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The maximum amount of time to wait for the image build pipeline to complete. |

---

##### `topic`<sup>Required</sup> <a name="topic" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.WaitForCompletionProps.property.topic"></a>

```typescript
public readonly topic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic

An SNS Topic that will signal when the pipeline is complete.

This is
typically configured on your EC2 Image Builder pipeline to trigger an
SNS notification when the pipeline completes.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStart.WaitForCompletionProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* 12 hours

The maximum amount of time to wait for the image build pipeline to complete.

This is set to a maximum of 12 hours by default.

---



## Enums <a name="Enums" id="Enums"></a>

### Component <a name="Component" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component"></a>

Image Builder Component.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CLOUDWATCH_AGENT_LINUX">AMAZON_CLOUDWATCH_AGENT_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CLOUDWATCH_AGENT_WINDOWS">AMAZON_CLOUDWATCH_AGENT_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_APT_GENERIC">AMAZON_CORRETTO_11_APT_GENERIC</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_HEADLESS">AMAZON_CORRETTO_11_HEADLESS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_RPM_GENERIC">AMAZON_CORRETTO_11_RPM_GENERIC</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_WINDOWS">AMAZON_CORRETTO_11_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11">AMAZON_CORRETTO_11</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_HEADLESS">AMAZON_CORRETTO_17_HEADLESS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_JDK">AMAZON_CORRETTO_17_JDK</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_JRE">AMAZON_CORRETTO_17_JRE</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_WINDOWS">AMAZON_CORRETTO_17_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_HEADLESS">AMAZON_CORRETTO_21_HEADLESS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_JDK">AMAZON_CORRETTO_21_JDK</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_JRE">AMAZON_CORRETTO_21_JRE</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_WINDOWS">AMAZON_CORRETTO_21_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_APT_GENERIC">AMAZON_CORRETTO_8_APT_GENERIC</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_JDK">AMAZON_CORRETTO_8_JDK</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_JRE">AMAZON_CORRETTO_8_JRE</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_RPM_GENERIC">AMAZON_CORRETTO_8_RPM_GENERIC</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_WINDOWS">AMAZON_CORRETTO_8_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_KINESIS_AGENT_WINDOWS">AMAZON_KINESIS_AGENT_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ANACONDA_WINDOWS">ANACONDA_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.APACHE_TOMCAT_9_LINUX">APACHE_TOMCAT_9_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.APT_REPOSITORY_TEST_LINUX">APT_REPOSITORY_TEST_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_LINUX">AWS_CLI_VERSION_2_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_WINDOWS">AWS_CLI_VERSION_2_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CODEDEPLOY_AGENT_LINUX">AWS_CODEDEPLOY_AGENT_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CODEDEPLOY_AGENT_WINDOWS">AWS_CODEDEPLOY_AGENT_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_VSS_COMPONENTS_WINDOWS">AWS_VSS_COMPONENTS_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.CHOCOLATEY">CHOCOLATEY</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.CHRONY_TIME_CONFIGURATION_TEST">CHRONY_TIME_CONFIGURATION_TEST</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DCV_SERVER_LINUX">DCV_SERVER_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DCV_SERVER_WINDOWS">DCV_SERVER_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DISTRIBUTOR_PACKAGE_WINDOWS">DISTRIBUTOR_PACKAGE_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOCKER_CE_CENTOS">DOCKER_CE_CENTOS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOCKER_CE_LINUX">DOCKER_CE_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOCKER_CE_UBUNTU">DOCKER_CE_UBUNTU</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_DESKTOP_RUNTIME_LTS_WINDOWS">DOTNET_DESKTOP_RUNTIME_LTS_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_HOSTING_BUNDLE_LTS_WINDOWS">DOTNET_HOSTING_BUNDLE_LTS_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_RUNTIME_LTS_LINUX">DOTNET_RUNTIME_LTS_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_RUNTIME_LTS_WINDOWS">DOTNET_RUNTIME_LTS_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_SDK_LTS_LINUX">DOTNET_SDK_LTS_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_SDK_LTS_WINDOWS">DOTNET_SDK_LTS_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EBS_VOLUME_USAGE_TEST_LINUX">EBS_VOLUME_USAGE_TEST_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EBS_VOLUME_USAGE_TEST_WINDOWS">EBS_VOLUME_USAGE_TEST_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EC2_NETWORK_ROUTE_TEST_WINDOWS">EC2_NETWORK_ROUTE_TEST_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EC2LAUNCH_V2_WINDOWS">EC2LAUNCH_V2_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ECS_OPTIMIZED_AMI_WINDOWS">ECS_OPTIMIZED_AMI_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EKS_OPTIMIZED_AMI_WINDOWS">EKS_OPTIMIZED_AMI_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ENI_ATTACHMENT_TEST_LINUX">ENI_ATTACHMENT_TEST_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ENI_ATTACHMENT_TEST_WINDOWS">ENI_ATTACHMENT_TEST_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.GO_LINUX">GO_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.GO_STABLE_LINUX">GO_STABLE_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.GO_STABLE_WINDOWS">GO_STABLE_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.GO_WINDOWS">GO_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.HELLO_WORLD_LINUX">HELLO_WORLD_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.HELLO_WORLD_WINDOWS">HELLO_WORLD_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.INSPECTOR_TEST_LINUX">INSPECTOR_TEST_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.INSPECTOR_TEST_WINDOWS">INSPECTOR_TEST_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.INSTALL_PACKAGE_FROM_REPOSITORY">INSTALL_PACKAGE_FROM_REPOSITORY</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.MARIADB_LINUX">MARIADB_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.MATE_DE_LINUX">MATE_DE_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.MONO_LINUX">MONO_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PHP_8_2_LINUX">PHP_8_2_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_LTS_LINUX">POWERSHELL_LTS_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_LTS_WINDOWS">POWERSHELL_LTS_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_SNAP">POWERSHELL_SNAP</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_YUM">POWERSHELL_YUM</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PUTTY">PUTTY</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PYTHON_3_LINUX">PYTHON_3_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PYTHON_3_WINDOWS">PYTHON_3_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_LINUX">REBOOT_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_TEST_LINUX">REBOOT_TEST_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_TEST_WINDOWS">REBOOT_TEST_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_WINDOWS">REBOOT_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SAN_SIFT_LINUX">SAN_SIFT_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SCAP_COMPLIANCE_CHECKER_LINUX">SCAP_COMPLIANCE_CHECKER_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SCAP_COMPLIANCE_CHECKER_WINDOWS">SCAP_COMPLIANCE_CHECKER_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SIMPLE_BOOT_TEST_LINUX">SIMPLE_BOOT_TEST_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SIMPLE_BOOT_TEST_WINDOWS">SIMPLE_BOOT_TEST_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_LINUX_HIGH">STIG_BUILD_LINUX_HIGH</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_LINUX_LOW">STIG_BUILD_LINUX_LOW</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_LINUX_MEDIUM">STIG_BUILD_LINUX_MEDIUM</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_WINDOWS_HIGH">STIG_BUILD_WINDOWS_HIGH</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_WINDOWS_LOW">STIG_BUILD_WINDOWS_LOW</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_WINDOWS_MEDIUM">STIG_BUILD_WINDOWS_MEDIUM</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_LINUX_KERNEL_5">UPDATE_LINUX_KERNEL_5</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_LINUX_KERNEL_ML">UPDATE_LINUX_KERNEL_ML</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_LINUX">UPDATE_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_WINDOWS">UPDATE_WINDOWS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.VALIDATE_SINGLE_SSH_PUBLIC_KEY_TEST_LINUX">VALIDATE_SINGLE_SSH_PUBLIC_KEY_TEST_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.VALIDATE_SSH_HOST_KEY_GENERATION_LINUX">VALIDATE_SSH_HOST_KEY_GENERATION_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.VALIDATE_SSH_PUBLIC_KEY_LINUX">VALIDATE_SSH_PUBLIC_KEY_LINUX</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.WINDOWS_ACTIVATION_TEST">WINDOWS_ACTIVATION_TEST</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.WINDOWS_IS_READY_WITH_PASSWORD_GENERATION_TEST">WINDOWS_IS_READY_WITH_PASSWORD_GENERATION_TEST</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.WINDOWS_SERVER_IIS">WINDOWS_SERVER_IIS</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.YUM_REPOSITORY_TEST_LINUX">YUM_REPOSITORY_TEST_LINUX</a></code> | *No description.* |

---

##### `AMAZON_CLOUDWATCH_AGENT_LINUX` <a name="AMAZON_CLOUDWATCH_AGENT_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CLOUDWATCH_AGENT_LINUX"></a>

---


##### `AMAZON_CLOUDWATCH_AGENT_WINDOWS` <a name="AMAZON_CLOUDWATCH_AGENT_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CLOUDWATCH_AGENT_WINDOWS"></a>

---


##### `AMAZON_CORRETTO_11_APT_GENERIC` <a name="AMAZON_CORRETTO_11_APT_GENERIC" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_APT_GENERIC"></a>

---


##### `AMAZON_CORRETTO_11_HEADLESS` <a name="AMAZON_CORRETTO_11_HEADLESS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_HEADLESS"></a>

---


##### `AMAZON_CORRETTO_11_RPM_GENERIC` <a name="AMAZON_CORRETTO_11_RPM_GENERIC" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_RPM_GENERIC"></a>

---


##### `AMAZON_CORRETTO_11_WINDOWS` <a name="AMAZON_CORRETTO_11_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_WINDOWS"></a>

---


##### `AMAZON_CORRETTO_11` <a name="AMAZON_CORRETTO_11" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11"></a>

---


##### `AMAZON_CORRETTO_17_HEADLESS` <a name="AMAZON_CORRETTO_17_HEADLESS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_HEADLESS"></a>

---


##### `AMAZON_CORRETTO_17_JDK` <a name="AMAZON_CORRETTO_17_JDK" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_JDK"></a>

---


##### `AMAZON_CORRETTO_17_JRE` <a name="AMAZON_CORRETTO_17_JRE" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_JRE"></a>

---


##### `AMAZON_CORRETTO_17_WINDOWS` <a name="AMAZON_CORRETTO_17_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_WINDOWS"></a>

---


##### `AMAZON_CORRETTO_21_HEADLESS` <a name="AMAZON_CORRETTO_21_HEADLESS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_HEADLESS"></a>

---


##### `AMAZON_CORRETTO_21_JDK` <a name="AMAZON_CORRETTO_21_JDK" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_JDK"></a>

---


##### `AMAZON_CORRETTO_21_JRE` <a name="AMAZON_CORRETTO_21_JRE" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_JRE"></a>

---


##### `AMAZON_CORRETTO_21_WINDOWS` <a name="AMAZON_CORRETTO_21_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_WINDOWS"></a>

---


##### `AMAZON_CORRETTO_8_APT_GENERIC` <a name="AMAZON_CORRETTO_8_APT_GENERIC" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_APT_GENERIC"></a>

---


##### `AMAZON_CORRETTO_8_JDK` <a name="AMAZON_CORRETTO_8_JDK" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_JDK"></a>

---


##### `AMAZON_CORRETTO_8_JRE` <a name="AMAZON_CORRETTO_8_JRE" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_JRE"></a>

---


##### `AMAZON_CORRETTO_8_RPM_GENERIC` <a name="AMAZON_CORRETTO_8_RPM_GENERIC" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_RPM_GENERIC"></a>

---


##### `AMAZON_CORRETTO_8_WINDOWS` <a name="AMAZON_CORRETTO_8_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_WINDOWS"></a>

---


##### `AMAZON_KINESIS_AGENT_WINDOWS` <a name="AMAZON_KINESIS_AGENT_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_KINESIS_AGENT_WINDOWS"></a>

---


##### `ANACONDA_WINDOWS` <a name="ANACONDA_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ANACONDA_WINDOWS"></a>

---


##### `APACHE_TOMCAT_9_LINUX` <a name="APACHE_TOMCAT_9_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.APACHE_TOMCAT_9_LINUX"></a>

---


##### `APT_REPOSITORY_TEST_LINUX` <a name="APT_REPOSITORY_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.APT_REPOSITORY_TEST_LINUX"></a>

---


##### `AWS_CLI_VERSION_2_LINUX` <a name="AWS_CLI_VERSION_2_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_LINUX"></a>

---


##### `AWS_CLI_VERSION_2_WINDOWS` <a name="AWS_CLI_VERSION_2_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_WINDOWS"></a>

---


##### `AWS_CODEDEPLOY_AGENT_LINUX` <a name="AWS_CODEDEPLOY_AGENT_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CODEDEPLOY_AGENT_LINUX"></a>

---


##### `AWS_CODEDEPLOY_AGENT_WINDOWS` <a name="AWS_CODEDEPLOY_AGENT_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CODEDEPLOY_AGENT_WINDOWS"></a>

---


##### `AWS_VSS_COMPONENTS_WINDOWS` <a name="AWS_VSS_COMPONENTS_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_VSS_COMPONENTS_WINDOWS"></a>

---


##### `CHOCOLATEY` <a name="CHOCOLATEY" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.CHOCOLATEY"></a>

---


##### `CHRONY_TIME_CONFIGURATION_TEST` <a name="CHRONY_TIME_CONFIGURATION_TEST" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.CHRONY_TIME_CONFIGURATION_TEST"></a>

---


##### `DCV_SERVER_LINUX` <a name="DCV_SERVER_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DCV_SERVER_LINUX"></a>

---


##### `DCV_SERVER_WINDOWS` <a name="DCV_SERVER_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DCV_SERVER_WINDOWS"></a>

---


##### `DISTRIBUTOR_PACKAGE_WINDOWS` <a name="DISTRIBUTOR_PACKAGE_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DISTRIBUTOR_PACKAGE_WINDOWS"></a>

---


##### `DOCKER_CE_CENTOS` <a name="DOCKER_CE_CENTOS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOCKER_CE_CENTOS"></a>

---


##### `DOCKER_CE_LINUX` <a name="DOCKER_CE_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOCKER_CE_LINUX"></a>

---


##### `DOCKER_CE_UBUNTU` <a name="DOCKER_CE_UBUNTU" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOCKER_CE_UBUNTU"></a>

---


##### `DOTNET_DESKTOP_RUNTIME_LTS_WINDOWS` <a name="DOTNET_DESKTOP_RUNTIME_LTS_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_DESKTOP_RUNTIME_LTS_WINDOWS"></a>

---


##### `DOTNET_HOSTING_BUNDLE_LTS_WINDOWS` <a name="DOTNET_HOSTING_BUNDLE_LTS_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_HOSTING_BUNDLE_LTS_WINDOWS"></a>

---


##### `DOTNET_RUNTIME_LTS_LINUX` <a name="DOTNET_RUNTIME_LTS_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_RUNTIME_LTS_LINUX"></a>

---


##### `DOTNET_RUNTIME_LTS_WINDOWS` <a name="DOTNET_RUNTIME_LTS_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_RUNTIME_LTS_WINDOWS"></a>

---


##### `DOTNET_SDK_LTS_LINUX` <a name="DOTNET_SDK_LTS_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_SDK_LTS_LINUX"></a>

---


##### `DOTNET_SDK_LTS_WINDOWS` <a name="DOTNET_SDK_LTS_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_SDK_LTS_WINDOWS"></a>

---


##### `EBS_VOLUME_USAGE_TEST_LINUX` <a name="EBS_VOLUME_USAGE_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EBS_VOLUME_USAGE_TEST_LINUX"></a>

---


##### `EBS_VOLUME_USAGE_TEST_WINDOWS` <a name="EBS_VOLUME_USAGE_TEST_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EBS_VOLUME_USAGE_TEST_WINDOWS"></a>

---


##### `EC2_NETWORK_ROUTE_TEST_WINDOWS` <a name="EC2_NETWORK_ROUTE_TEST_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EC2_NETWORK_ROUTE_TEST_WINDOWS"></a>

---


##### `EC2LAUNCH_V2_WINDOWS` <a name="EC2LAUNCH_V2_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EC2LAUNCH_V2_WINDOWS"></a>

---


##### `ECS_OPTIMIZED_AMI_WINDOWS` <a name="ECS_OPTIMIZED_AMI_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ECS_OPTIMIZED_AMI_WINDOWS"></a>

---


##### `EKS_OPTIMIZED_AMI_WINDOWS` <a name="EKS_OPTIMIZED_AMI_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EKS_OPTIMIZED_AMI_WINDOWS"></a>

---


##### `ENI_ATTACHMENT_TEST_LINUX` <a name="ENI_ATTACHMENT_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ENI_ATTACHMENT_TEST_LINUX"></a>

---


##### `ENI_ATTACHMENT_TEST_WINDOWS` <a name="ENI_ATTACHMENT_TEST_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ENI_ATTACHMENT_TEST_WINDOWS"></a>

---


##### `GO_LINUX` <a name="GO_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.GO_LINUX"></a>

---


##### `GO_STABLE_LINUX` <a name="GO_STABLE_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.GO_STABLE_LINUX"></a>

---


##### `GO_STABLE_WINDOWS` <a name="GO_STABLE_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.GO_STABLE_WINDOWS"></a>

---


##### `GO_WINDOWS` <a name="GO_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.GO_WINDOWS"></a>

---


##### `HELLO_WORLD_LINUX` <a name="HELLO_WORLD_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.HELLO_WORLD_LINUX"></a>

---


##### `HELLO_WORLD_WINDOWS` <a name="HELLO_WORLD_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.HELLO_WORLD_WINDOWS"></a>

---


##### `INSPECTOR_TEST_LINUX` <a name="INSPECTOR_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.INSPECTOR_TEST_LINUX"></a>

---


##### `INSPECTOR_TEST_WINDOWS` <a name="INSPECTOR_TEST_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.INSPECTOR_TEST_WINDOWS"></a>

---


##### `INSTALL_PACKAGE_FROM_REPOSITORY` <a name="INSTALL_PACKAGE_FROM_REPOSITORY" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.INSTALL_PACKAGE_FROM_REPOSITORY"></a>

---


##### `MARIADB_LINUX` <a name="MARIADB_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.MARIADB_LINUX"></a>

---


##### `MATE_DE_LINUX` <a name="MATE_DE_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.MATE_DE_LINUX"></a>

---


##### `MONO_LINUX` <a name="MONO_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.MONO_LINUX"></a>

---


##### `PHP_8_2_LINUX` <a name="PHP_8_2_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PHP_8_2_LINUX"></a>

---


##### `POWERSHELL_LTS_LINUX` <a name="POWERSHELL_LTS_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_LTS_LINUX"></a>

---


##### `POWERSHELL_LTS_WINDOWS` <a name="POWERSHELL_LTS_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_LTS_WINDOWS"></a>

---


##### `POWERSHELL_SNAP` <a name="POWERSHELL_SNAP" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_SNAP"></a>

---


##### `POWERSHELL_YUM` <a name="POWERSHELL_YUM" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_YUM"></a>

---


##### `PUTTY` <a name="PUTTY" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PUTTY"></a>

---


##### `PYTHON_3_LINUX` <a name="PYTHON_3_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PYTHON_3_LINUX"></a>

---


##### `PYTHON_3_WINDOWS` <a name="PYTHON_3_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PYTHON_3_WINDOWS"></a>

---


##### `REBOOT_LINUX` <a name="REBOOT_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_LINUX"></a>

---


##### `REBOOT_TEST_LINUX` <a name="REBOOT_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_TEST_LINUX"></a>

---


##### `REBOOT_TEST_WINDOWS` <a name="REBOOT_TEST_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_TEST_WINDOWS"></a>

---


##### `REBOOT_WINDOWS` <a name="REBOOT_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_WINDOWS"></a>

---


##### `SAN_SIFT_LINUX` <a name="SAN_SIFT_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SAN_SIFT_LINUX"></a>

---


##### `SCAP_COMPLIANCE_CHECKER_LINUX` <a name="SCAP_COMPLIANCE_CHECKER_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SCAP_COMPLIANCE_CHECKER_LINUX"></a>

---


##### `SCAP_COMPLIANCE_CHECKER_WINDOWS` <a name="SCAP_COMPLIANCE_CHECKER_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SCAP_COMPLIANCE_CHECKER_WINDOWS"></a>

---


##### `SIMPLE_BOOT_TEST_LINUX` <a name="SIMPLE_BOOT_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SIMPLE_BOOT_TEST_LINUX"></a>

---


##### `SIMPLE_BOOT_TEST_WINDOWS` <a name="SIMPLE_BOOT_TEST_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SIMPLE_BOOT_TEST_WINDOWS"></a>

---


##### `STIG_BUILD_LINUX_HIGH` <a name="STIG_BUILD_LINUX_HIGH" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_LINUX_HIGH"></a>

---


##### `STIG_BUILD_LINUX_LOW` <a name="STIG_BUILD_LINUX_LOW" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_LINUX_LOW"></a>

---


##### `STIG_BUILD_LINUX_MEDIUM` <a name="STIG_BUILD_LINUX_MEDIUM" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_LINUX_MEDIUM"></a>

---


##### `STIG_BUILD_WINDOWS_HIGH` <a name="STIG_BUILD_WINDOWS_HIGH" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_WINDOWS_HIGH"></a>

---


##### `STIG_BUILD_WINDOWS_LOW` <a name="STIG_BUILD_WINDOWS_LOW" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_WINDOWS_LOW"></a>

---


##### `STIG_BUILD_WINDOWS_MEDIUM` <a name="STIG_BUILD_WINDOWS_MEDIUM" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_WINDOWS_MEDIUM"></a>

---


##### `UPDATE_LINUX_KERNEL_5` <a name="UPDATE_LINUX_KERNEL_5" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_LINUX_KERNEL_5"></a>

---


##### `UPDATE_LINUX_KERNEL_ML` <a name="UPDATE_LINUX_KERNEL_ML" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_LINUX_KERNEL_ML"></a>

---


##### `UPDATE_LINUX` <a name="UPDATE_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_LINUX"></a>

---


##### `UPDATE_WINDOWS` <a name="UPDATE_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_WINDOWS"></a>

---


##### `VALIDATE_SINGLE_SSH_PUBLIC_KEY_TEST_LINUX` <a name="VALIDATE_SINGLE_SSH_PUBLIC_KEY_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.VALIDATE_SINGLE_SSH_PUBLIC_KEY_TEST_LINUX"></a>

---


##### `VALIDATE_SSH_HOST_KEY_GENERATION_LINUX` <a name="VALIDATE_SSH_HOST_KEY_GENERATION_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.VALIDATE_SSH_HOST_KEY_GENERATION_LINUX"></a>

---


##### `VALIDATE_SSH_PUBLIC_KEY_LINUX` <a name="VALIDATE_SSH_PUBLIC_KEY_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.VALIDATE_SSH_PUBLIC_KEY_LINUX"></a>

---


##### `WINDOWS_ACTIVATION_TEST` <a name="WINDOWS_ACTIVATION_TEST" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.WINDOWS_ACTIVATION_TEST"></a>

---


##### `WINDOWS_IS_READY_WITH_PASSWORD_GENERATION_TEST` <a name="WINDOWS_IS_READY_WITH_PASSWORD_GENERATION_TEST" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.WINDOWS_IS_READY_WITH_PASSWORD_GENERATION_TEST"></a>

---


##### `WINDOWS_SERVER_IIS` <a name="WINDOWS_SERVER_IIS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.WINDOWS_SERVER_IIS"></a>

---


##### `YUM_REPOSITORY_TEST_LINUX` <a name="YUM_REPOSITORY_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.YUM_REPOSITORY_TEST_LINUX"></a>

---


### OperatingSystem <a name="OperatingSystem" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.OperatingSystem"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.OperatingSystem.RED_HAT_ENTERPRISE_LINUX_8_9">RED_HAT_ENTERPRISE_LINUX_8_9</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.OperatingSystem.AMAZON_LINUX_2">AMAZON_LINUX_2</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.OperatingSystem.AMAZON_LINUX_2023">AMAZON_LINUX_2023</a></code> | *No description.* |

---

##### `RED_HAT_ENTERPRISE_LINUX_8_9` <a name="RED_HAT_ENTERPRISE_LINUX_8_9" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.OperatingSystem.RED_HAT_ENTERPRISE_LINUX_8_9"></a>

---


##### `AMAZON_LINUX_2` <a name="AMAZON_LINUX_2" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.OperatingSystem.AMAZON_LINUX_2"></a>

---


##### `AMAZON_LINUX_2023` <a name="AMAZON_LINUX_2023" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxStigImagePipeline.OperatingSystem.AMAZON_LINUX_2023"></a>

---

