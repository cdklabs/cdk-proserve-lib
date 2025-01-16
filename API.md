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


### Ec2LinuxImagePipeline <a name="Ec2LinuxImagePipeline" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline"></a>

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer"></a>

```typescript
import { patterns } from '@cdklabs/cdk-proserve-lib'

new patterns.Ec2LinuxImagePipeline(scope: Construct, id: string, props: Ec2LinuxImagePipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.isConstruct"></a>

```typescript
import { patterns } from '@cdklabs/cdk-proserve-lib'

patterns.Ec2LinuxImagePipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.property.imagePipelineArn">imagePipelineArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.property.imagePipelineTopic">imagePipelineTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.property.latestAmi">latestAmi</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `imagePipelineArn`<sup>Required</sup> <a name="imagePipelineArn" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.property.imagePipelineArn"></a>

```typescript
public readonly imagePipelineArn: string;
```

- *Type:* string

---

##### `imagePipelineTopic`<sup>Required</sup> <a name="imagePipelineTopic" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.property.imagePipelineTopic"></a>

```typescript
public readonly imagePipelineTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic

---

##### `latestAmi`<sup>Optional</sup> <a name="latestAmi" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.property.latestAmi"></a>

```typescript
public readonly latestAmi: string;
```

- *Type:* string

---


### FriendlyEmbrace <a name="FriendlyEmbrace" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace"></a>

Friendly Embrace Custom Resource.

A custom resource that is designed remove the "Deadly Embrace" problem that
occurs when you attempt to update a CloudFormation stack that is exporting
a resource used by another stack. This custom resource will run after all of
your stacks have been deployed and remove the dependencies by hardcoding
each export for all stacks that use it. For this reason, this custom resource
should run inside of its own stack and should be the last stack that is
deployed for your application.

> NOTE: You may need to add more permissions to the handler if the custom
resource cannot update your stacks. You can call upon the `handler` property
of the class to add more permissions to it.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.FriendlyEmbrace(scope: Construct, id: string, props?: FriendlyEmbraceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | Parent to which the custom resource belongs. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer.parameter.id">id</a></code> | <code>string</code> | Unique identifier for the custom resource. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps</code> | Metadata for configuring the custom resource. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

Parent to which the custom resource belongs.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer.parameter.id"></a>

- *Type:* string

Unique identifier for the custom resource.

---

##### `props`<sup>Optional</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps

Metadata for configuring the custom resource.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

constructs.FriendlyEmbrace.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.property.onEventHandler">onEventHandler</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.NodejsFunction</code> | Handler for the custom resource. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `onEventHandler`<sup>Required</sup> <a name="onEventHandler" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.property.onEventHandler"></a>

```typescript
public readonly onEventHandler: NodejsFunction;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

Handler for the custom resource.

---


### NetworkFirewall <a name="NetworkFirewall" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall"></a>

AWS Network Firewall.

Configures a new AWS Network Firewall in a VPC. Sets up according to best
practices found at:

> [https://aws.github.io/aws-security-services-best-practices/guides/network-firewall/](https://aws.github.io/aws-security-services-best-practices/guides/network-firewall/)

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.NetworkFirewall(scope: Construct, id: string, props: NetworkFirewallProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | - Parent construct scope. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.Initializer.parameter.id">id</a></code> | <code>string</code> | - Construct ID used to generate unique resource names. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps</code> | - Network Firewall configuration properties. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

Parent construct scope.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.Initializer.parameter.id"></a>

- *Type:* string

Construct ID used to generate unique resource names.

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps

Network Firewall configuration properties.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

constructs.NetworkFirewall.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.property.firewall">firewall</a></code> | <code>aws-cdk-lib.aws_networkfirewall.CfnFirewall</code> | The underlying CloudFormation Network Firewall resource. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `firewall`<sup>Required</sup> <a name="firewall" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.property.firewall"></a>

```typescript
public readonly firewall: CfnFirewall;
```

- *Type:* aws-cdk-lib.aws_networkfirewall.CfnFirewall

The underlying CloudFormation Network Firewall resource.

---


### NetworkFirewallEndpoints <a name="NetworkFirewallEndpoints" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints"></a>

Construct that retrieves and manages Network Firewall endpoints Uses AWS Custom Resources to fetch endpoint information from the Network Firewall service.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.NetworkFirewallEndpoints(scope: Construct, id: string, props: NetworkFirewallEndpointsProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope in which to define this construct. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpointsProps</code> | Configuration properties for the construct. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.Initializer.parameter.id"></a>

- *Type:* string

The scoped construct ID.

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpointsProps

Configuration properties for the construct.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.getEndpointId">getEndpointId</a></code> | Gets the endpoint ID for a specific availability zone. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `getEndpointId` <a name="getEndpointId" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.getEndpointId"></a>

```typescript
public getEndpointId(availabilityZone: string): string
```

Gets the endpoint ID for a specific availability zone.

###### `availabilityZone`<sup>Required</sup> <a name="availabilityZone" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.getEndpointId.parameter.availabilityZone"></a>

- *Type:* string

The availability zone to get the endpoint ID for.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

constructs.NetworkFirewallEndpoints.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpoints.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### OpenSearchAdminUser <a name="OpenSearchAdminUser" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser"></a>

OpenSearchAdminUser construct creates a custom resource to manage an admin user for an Amazon OpenSearch domain.

This construct creates a Lambda-backed custom resource that adds an admin user to the specified OpenSearch domain.
It uses the provided SSM parameter for the username, a provided SSM parameter or Secrets Manager secret for the
password, and sets up the necessary IAM permissions for the Lambda function to interact with the OpenSearch domain
and SSM parameter(s) and/or secret.

The construct also handles encryption for the Lambda function's environment variables and dead letter queue,
using either a provided KMS key or an AWS managed key.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.OpenSearchAdminUser(scope: Construct, id: string, props: OpenSearchAdminUserProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | Parent to which the custom resource belongs. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.Initializer.parameter.id">id</a></code> | <code>string</code> | Unique identifier for this instance. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps</code> | Metadata for configuring the custom resource. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

Parent to which the custom resource belongs.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.Initializer.parameter.id"></a>

- *Type:* string

Unique identifier for this instance.

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps

Metadata for configuring the custom resource.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

constructs.OpenSearchAdminUser.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### WebApplicationFirewall <a name="WebApplicationFirewall" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall"></a>

WebApplicationFirewall construct represents a WAF (Web Application Firewall) that can be associated with AWS resources like Application Load Balancers.

It allows configuring AWS managed rule groups, logging, and visibility settings.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.WebApplicationFirewall(scope: Construct, id: string, props?: WebApplicationFirewallProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.associate">associate</a></code> | Associates the Web Application Firewall to an applicable resource. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `associate` <a name="associate" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.associate"></a>

```typescript
public associate(resource: ApplicationLoadBalancer): void
```

Associates the Web Application Firewall to an applicable resource.

###### `resource`<sup>Required</sup> <a name="resource" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.associate.parameter.resource"></a>

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationLoadBalancer

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

constructs.WebApplicationFirewall.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.property.webAcl">webAcl</a></code> | <code>aws-cdk-lib.aws_wafv2.CfnWebACL</code> | The WAF Web ACL (Access Control List) resource. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_logs.LogGroup</code> | Optional CloudWatch log group for WAF logging. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `webAcl`<sup>Required</sup> <a name="webAcl" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.property.webAcl"></a>

```typescript
public readonly webAcl: CfnWebACL;
```

- *Type:* aws-cdk-lib.aws_wafv2.CfnWebACL

The WAF Web ACL (Access Control List) resource.

---

##### `logGroup`<sup>Optional</sup> <a name="logGroup" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.property.logGroup"></a>

```typescript
public readonly logGroup: LogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.LogGroup

Optional CloudWatch log group for WAF logging.

This is available if you
have configured `logging` on the construct.

---


## Structs <a name="Structs" id="Structs"></a>

### ApplyRemovalPolicyProps <a name="ApplyRemovalPolicyProps" id="@cdklabs/cdk-proserve-lib.aspects.ApplyRemovalPolicyProps"></a>

Properties for configuring the removal policy settings.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.aspects.ApplyRemovalPolicyProps.Initializer"></a>

```typescript
import { aspects } from '@cdklabs/cdk-proserve-lib'

const applyRemovalPolicyProps: aspects.ApplyRemovalPolicyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.aspects.ApplyRemovalPolicyProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | The removal policy to apply to the resource. |

---

##### `removalPolicy`<sup>Required</sup> <a name="removalPolicy" id="@cdklabs/cdk-proserve-lib.aspects.ApplyRemovalPolicyProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy

The removal policy to apply to the resource.

---

### AwsCustomResourceLambdaConfiguration <a name="AwsCustomResourceLambdaConfiguration" id="@cdklabs/cdk-proserve-lib.interfaces.AwsCustomResourceLambdaConfiguration"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.interfaces.AwsCustomResourceLambdaConfiguration.Initializer"></a>

```typescript
import { interfaces } from '@cdklabs/cdk-proserve-lib'

const awsCustomResourceLambdaConfiguration: interfaces.AwsCustomResourceLambdaConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.interfaces.AwsCustomResourceLambdaConfiguration.property.subnets">subnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Optional subnet selection for the Lambda functions. |
| <code><a href="#@cdklabs/cdk-proserve-lib.interfaces.AwsCustomResourceLambdaConfiguration.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC where the Lambda functions will be deployed. |

---

##### `subnets`<sup>Optional</sup> <a name="subnets" id="@cdklabs/cdk-proserve-lib.interfaces.AwsCustomResourceLambdaConfiguration.property.subnets"></a>

```typescript
public readonly subnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

Optional subnet selection for the Lambda functions.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@cdklabs/cdk-proserve-lib.interfaces.AwsCustomResourceLambdaConfiguration.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

VPC where the Lambda functions will be deployed.

---

### AwsManagedRuleGroupConfig <a name="AwsManagedRuleGroupConfig" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroupConfig"></a>

Configuration interface for AWS Managed Rule Groups.

This interface allows you to specify a managed rule group and optionally
override the default actions for specific rules within that group.

*Example*

```typescript
{
  ruleGroup: AwsManagedRuleGroup.COMMON_RULE_SET,
  ruleGroupActionOverrides: [
    {
      name: 'GenericLFI_QUERYARGUMENTS',
      action: OverrideAction.ALLOW
    }
  ]
}
```


#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroupConfig.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const awsManagedRuleGroupConfig: constructs.WebApplicationFirewall.AwsManagedRuleGroupConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroupConfig.property.ruleGroup">ruleGroup</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup</code> | The AWS Managed Rule Group to apply. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroupConfig.property.ruleGroupActionOverrides">ruleGroupActionOverrides</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideConfig[]</code> | Optional list of rule action overrides. |

---

##### `ruleGroup`<sup>Required</sup> <a name="ruleGroup" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroupConfig.property.ruleGroup"></a>

```typescript
public readonly ruleGroup: AwsManagedRuleGroup;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup

The AWS Managed Rule Group to apply.

---

##### `ruleGroupActionOverrides`<sup>Optional</sup> <a name="ruleGroupActionOverrides" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroupConfig.property.ruleGroupActionOverrides"></a>

```typescript
public readonly ruleGroupActionOverrides: OverrideConfig[];
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideConfig[]

Optional list of rule action overrides.

---

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
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImageProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.interfaces.AwsCustomResourceLambdaConfiguration</code> | Optional Lambda configuration settings. |

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
public readonly lambdaConfiguration: AwsCustomResourceLambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve-lib.interfaces.AwsCustomResourceLambdaConfiguration

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
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration</code> | Optional Lambda configuration settings. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.vpcConfiguration">vpcConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps</code> | VPC configuration for the image pipeline. |

---

##### `version`<sup>Required</sup> <a name="version" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version of the image pipeline.

This must be updated if you make
underlying changes to the pipeline configuration.

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

##### `lambdaConfiguration`<sup>Optional</sup> <a name="lambdaConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.lambdaConfiguration"></a>

```typescript
public readonly lambdaConfiguration: LambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration

Optional Lambda configuration settings.

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
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration</code> | Optional Lambda configuration settings. |
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

This must be updated if you make
underlying changes to the pipeline configuration.

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

##### `lambdaConfiguration`<sup>Optional</sup> <a name="lambdaConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.lambdaConfiguration"></a>

```typescript
public readonly lambdaConfiguration: LambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration

Optional Lambda configuration settings.

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

### Ec2LinuxImagePipelineProps <a name="Ec2LinuxImagePipelineProps" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps"></a>

Properties for creating a Linux STIG Image Pipeline.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.Initializer"></a>

```typescript
import { patterns } from '@cdklabs/cdk-proserve-lib'

const ec2LinuxImagePipelineProps: patterns.Ec2LinuxImagePipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.version">version</a></code> | <code>string</code> | Version of the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.buildConfiguration">buildConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps</code> | Configuration options for the build process. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.description">description</a></code> | <code>string</code> | Description of the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | KMS key for encryption. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.instanceTypes">instanceTypes</a></code> | <code>string[]</code> | Instance types for the Image Builder Pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration</code> | Optional Lambda configuration settings. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.vpcConfiguration">vpcConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps</code> | VPC configuration for the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.extraComponents">extraComponents</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component \| aws-cdk-lib.aws_imagebuilder.CfnComponent[]</code> | Additional components to install in the image. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.extraDeviceMappings">extraDeviceMappings</a></code> | <code>aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.InstanceBlockDeviceMappingProperty[]</code> | Additional EBS volume mappings to add to the image. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.features">features</a></code> | <code>@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Feature[]</code> | A list of features to install. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.operatingSystem">operatingSystem</a></code> | <code>@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.OperatingSystem</code> | The operating system to use for the image pipeline. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.rootVolumeSize">rootVolumeSize</a></code> | <code>number</code> | Size for the root volume in GB. |

---

##### `version`<sup>Required</sup> <a name="version" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version of the image pipeline.

This must be updated if you make
underlying changes to the pipeline configuration.

---

##### `buildConfiguration`<sup>Optional</sup> <a name="buildConfiguration" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.buildConfiguration"></a>

```typescript
public readonly buildConfiguration: BuildConfigurationProps;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.BuildConfigurationProps

Configuration options for the build process.

---

##### `description`<sup>Optional</sup> <a name="description" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Description of the image pipeline.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

KMS key for encryption.

---

##### `instanceTypes`<sup>Optional</sup> <a name="instanceTypes" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.instanceTypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* string[]

Instance types for the Image Builder Pipeline.

Default: [t3.medium]

---

##### `lambdaConfiguration`<sup>Optional</sup> <a name="lambdaConfiguration" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.lambdaConfiguration"></a>

```typescript
public readonly lambdaConfiguration: LambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration

Optional Lambda configuration settings.

---

##### `vpcConfiguration`<sup>Optional</sup> <a name="vpcConfiguration" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.vpcConfiguration"></a>

```typescript
public readonly vpcConfiguration: VpcConfigurationProps;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.VpcConfigurationProps

VPC configuration for the image pipeline.

---

##### `extraComponents`<sup>Optional</sup> <a name="extraComponents" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.extraComponents"></a>

```typescript
public readonly extraComponents: Component | CfnComponent[];
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component | aws-cdk-lib.aws_imagebuilder.CfnComponent[]

Additional components to install in the image.

These will be added after the default Linux components.

---

##### `extraDeviceMappings`<sup>Optional</sup> <a name="extraDeviceMappings" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.extraDeviceMappings"></a>

```typescript
public readonly extraDeviceMappings: InstanceBlockDeviceMappingProperty[];
```

- *Type:* aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.InstanceBlockDeviceMappingProperty[]

Additional EBS volume mappings to add to the image.

These will be added in addition to the root volume.

---

##### `features`<sup>Optional</sup> <a name="features" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.features"></a>

```typescript
public readonly features: Feature[];
```

- *Type:* @cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Feature[]

A list of features to install.

---

##### `operatingSystem`<sup>Optional</sup> <a name="operatingSystem" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.operatingSystem"></a>

```typescript
public readonly operatingSystem: OperatingSystem;
```

- *Type:* @cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.OperatingSystem

The operating system to use for the image pipeline.

---

##### `rootVolumeSize`<sup>Optional</sup> <a name="rootVolumeSize" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.rootVolumeSize"></a>

```typescript
public readonly rootVolumeSize: number;
```

- *Type:* number
- *Default:* 10

Size for the root volume in GB.

Default: 10 GB.

---

### FriendlyEmbraceProps <a name="FriendlyEmbraceProps" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps"></a>

Input metadata for the custom resource.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const friendlyEmbraceProps: constructs.FriendlyEmbraceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps.property.bucketConfiguration">bucketConfiguration</a></code> | <code>aws-cdk-lib.aws_s3.BucketProps</code> | Optional S3 Bucket configuration settings. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Encryption key for protecting the Lambda environment. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps.property.ignoreInvalidStates">ignoreInvalidStates</a></code> | <code>boolean</code> | Whether or not stacks in error state should be fatal to CR completion. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration</code> | Optional Lambda configuration settings. |

---

##### `bucketConfiguration`<sup>Optional</sup> <a name="bucketConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps.property.bucketConfiguration"></a>

```typescript
public readonly bucketConfiguration: BucketProps;
```

- *Type:* aws-cdk-lib.aws_s3.BucketProps

Optional S3 Bucket configuration settings.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Encryption key for protecting the Lambda environment.

---

##### `ignoreInvalidStates`<sup>Optional</sup> <a name="ignoreInvalidStates" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps.property.ignoreInvalidStates"></a>

```typescript
public readonly ignoreInvalidStates: boolean;
```

- *Type:* boolean

Whether or not stacks in error state should be fatal to CR completion.

---

##### `lambdaConfiguration`<sup>Optional</sup> <a name="lambdaConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps.property.lambdaConfiguration"></a>

```typescript
public readonly lambdaConfiguration: LambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration

Optional Lambda configuration settings.

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
| <code><a href="#@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration.property.logGroupRetention">logGroupRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | Optional retention period for the Lambda functions log group. |
| <code><a href="#@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration.property.reservedConcurrentExecutions">reservedConcurrentExecutions</a></code> | <code>number</code> | The number of concurrent executions for the provider Lambda function. |
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

##### `logGroupRetention`<sup>Optional</sup> <a name="logGroupRetention" id="@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration.property.logGroupRetention"></a>

```typescript
public readonly logGroupRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* RetentionDays.ONE_MONTH

Optional retention period for the Lambda functions log group.

---

##### `reservedConcurrentExecutions`<sup>Optional</sup> <a name="reservedConcurrentExecutions" id="@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration.property.reservedConcurrentExecutions"></a>

```typescript
public readonly reservedConcurrentExecutions: number;
```

- *Type:* number

The number of concurrent executions for the provider Lambda function.

Default: 5

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

### LoggingConfiguration <a name="LoggingConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LoggingConfiguration"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LoggingConfiguration.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const loggingConfiguration: constructs.NetworkFirewall.LoggingConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LoggingConfiguration.property.logTypes">logTypes</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LogType[]</code> | The type of logs to write for the Network Firewall. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LoggingConfiguration.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional KMS key for encrypting Network Firewall logs. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LoggingConfiguration.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_logs.ILogGroup</code> | Log group to use for Network Firewall Logging. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LoggingConfiguration.property.logRetention">logRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | If you do not specify a log group, the amount of time to keep logs in the automatically created Log Group. |

---

##### `logTypes`<sup>Required</sup> <a name="logTypes" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LoggingConfiguration.property.logTypes"></a>

```typescript
public readonly logTypes: LogType[];
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LogType[]

The type of logs to write for the Network Firewall.

This can be `TLS`, `FLOW`, or `ALERT`.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LoggingConfiguration.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional KMS key for encrypting Network Firewall logs.

---

##### `logGroup`<sup>Optional</sup> <a name="logGroup" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LoggingConfiguration.property.logGroup"></a>

```typescript
public readonly logGroup: ILogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.ILogGroup

Log group to use for Network Firewall Logging.

If not specified, a log group is created for you. The encryption key provided will be used to encrypt it if one was provided to the construct.

---

##### `logRetention`<sup>Optional</sup> <a name="logRetention" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LoggingConfiguration.property.logRetention"></a>

```typescript
public readonly logRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays

If you do not specify a log group, the amount of time to keep logs in the automatically created Log Group.

Default: one week

---

### NetworkFirewallEndpointsProps <a name="NetworkFirewallEndpointsProps" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpointsProps"></a>

Properties for the NetworkFirewallEndpoints construct.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpointsProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const networkFirewallEndpointsProps: constructs.NetworkFirewallEndpointsProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpointsProps.property.firewall">firewall</a></code> | <code>aws-cdk-lib.aws_networkfirewall.CfnFirewall</code> | The AWS Network Firewall to get the Endpoints for. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpointsProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.interfaces.AwsCustomResourceLambdaConfiguration</code> | Optional Lambda configuration settings. |

---

##### `firewall`<sup>Required</sup> <a name="firewall" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpointsProps.property.firewall"></a>

```typescript
public readonly firewall: CfnFirewall;
```

- *Type:* aws-cdk-lib.aws_networkfirewall.CfnFirewall

The AWS Network Firewall to get the Endpoints for.

---

##### `lambdaConfiguration`<sup>Optional</sup> <a name="lambdaConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpointsProps.property.lambdaConfiguration"></a>

```typescript
public readonly lambdaConfiguration: AwsCustomResourceLambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve-lib.interfaces.AwsCustomResourceLambdaConfiguration

Optional Lambda configuration settings.

---

### NetworkFirewallProps <a name="NetworkFirewallProps" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps"></a>

Properties for configuring a NetworkFirewall.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const networkFirewallProps: constructs.NetworkFirewallProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps.property.firewallSubnets">firewallSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.ISubnet[]</code> | List of subnets where the Network Firewall will be placed These should typically be dedicated firewall subnets. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps.property.suricataRulesCapacity">suricataRulesCapacity</a></code> | <code>number</code> | The capacity to set for the Suricata rule group. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps.property.suricataRulesFilePath">suricataRulesFilePath</a></code> | <code>string</code> | Path to the Suricata rules file on the local file system. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC where the Network Firewall will be deployed. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps.property.configureVpcRoutes">configureVpcRoutes</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.NetworkFirewallVpcRouteProps</code> | Network Firewall routing configuration. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps.property.logging">logging</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LoggingConfiguration</code> | Optional logging configuration for the Network Firewall. |

---

##### `firewallSubnets`<sup>Required</sup> <a name="firewallSubnets" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps.property.firewallSubnets"></a>

```typescript
public readonly firewallSubnets: ISubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISubnet[]

List of subnets where the Network Firewall will be placed These should typically be dedicated firewall subnets.

---

##### `suricataRulesCapacity`<sup>Required</sup> <a name="suricataRulesCapacity" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps.property.suricataRulesCapacity"></a>

```typescript
public readonly suricataRulesCapacity: number;
```

- *Type:* number

The capacity to set for the Suricata rule group.

This cannot be modified
after creation. You should set this to the upper bound of what you expect
your firewall rule group to consume.

---

##### `suricataRulesFilePath`<sup>Required</sup> <a name="suricataRulesFilePath" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps.property.suricataRulesFilePath"></a>

```typescript
public readonly suricataRulesFilePath: string;
```

- *Type:* string

Path to the Suricata rules file on the local file system.

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

VPC where the Network Firewall will be deployed.

---

##### `configureVpcRoutes`<sup>Optional</sup> <a name="configureVpcRoutes" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps.property.configureVpcRoutes"></a>

```typescript
public readonly configureVpcRoutes: NetworkFirewallVpcRouteProps;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.NetworkFirewallVpcRouteProps

Network Firewall routing configuration.

By configuring these settings,
the Construct will automatically setup basic routing statements for you
for the provided subnets.

---

##### `logging`<sup>Optional</sup> <a name="logging" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallProps.property.logging"></a>

```typescript
public readonly logging: LoggingConfiguration;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LoggingConfiguration

Optional logging configuration for the Network Firewall.

If not provided,
logs will not be written.

---

### NetworkFirewallVpcRouteProps <a name="NetworkFirewallVpcRouteProps" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.NetworkFirewallVpcRouteProps"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.NetworkFirewallVpcRouteProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const networkFirewallVpcRouteProps: constructs.NetworkFirewall.NetworkFirewallVpcRouteProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.NetworkFirewallVpcRouteProps.property.protectedSubnets">protectedSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.ISubnet[]</code> | Subnets that will sit behind the network firewall and should have routes to the Network Firewall. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.NetworkFirewallVpcRouteProps.property.destinationCidr">destinationCidr</a></code> | <code>string</code> | The destination CIDR block for the firewall (protectedSubnets) route. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.NetworkFirewallVpcRouteProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.interfaces.AwsCustomResourceLambdaConfiguration</code> | Configuration for the Lambda function that will be used to retrieve info about the AWS Network Firewall in order to setup the routing. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.NetworkFirewallVpcRouteProps.property.returnSubnets">returnSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.ISubnet[]</code> | Subnets that should have routes back to the protected subnets. |

---

##### `protectedSubnets`<sup>Required</sup> <a name="protectedSubnets" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.NetworkFirewallVpcRouteProps.property.protectedSubnets"></a>

```typescript
public readonly protectedSubnets: ISubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISubnet[]

Subnets that will sit behind the network firewall and should have routes to the Network Firewall.

By supplying this parameter, routes will
be created for these subnets to the Network Firewall. Specify the
optional `destinationCidr` parameter if you want to restrict the
routes to a specific CIDR block. By default, routes will be created
for all outbound traffic (0.0.0.0/0) to the firewall.

---

##### `destinationCidr`<sup>Optional</sup> <a name="destinationCidr" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.NetworkFirewallVpcRouteProps.property.destinationCidr"></a>

```typescript
public readonly destinationCidr: string;
```

- *Type:* string

The destination CIDR block for the firewall (protectedSubnets) route.

If not specified, defaults to '0.0.0.0/0' (all IPv4 traffic).

---

##### `lambdaConfiguration`<sup>Optional</sup> <a name="lambdaConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.NetworkFirewallVpcRouteProps.property.lambdaConfiguration"></a>

```typescript
public readonly lambdaConfiguration: AwsCustomResourceLambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve-lib.interfaces.AwsCustomResourceLambdaConfiguration

Configuration for the Lambda function that will be used to retrieve info about the AWS Network Firewall in order to setup the routing.

---

##### `returnSubnets`<sup>Optional</sup> <a name="returnSubnets" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.NetworkFirewallVpcRouteProps.property.returnSubnets"></a>

```typescript
public readonly returnSubnets: ISubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISubnet[]

Subnets that should have routes back to the protected subnets.

Since
traffic is flowing through the firewall, routes should be put into the
subnets where traffic is returning to. This is most likely your public
subnets in the VPC. By supplying this parameter, routes will be created
that send all traffic destined for the `protectedSubnets` back to the
firewall for proper routing.

---

### OpenSearchAdminUserProps <a name="OpenSearchAdminUserProps" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps"></a>

Properties for the OpenSearchAdminUser construct.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const openSearchAdminUserProps: constructs.OpenSearchAdminUserProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.property.credential">credential</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordParameterProps \| @cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordSecretProps</code> | The SSM parameter or Secret containing the password for the OpenSearch admin user. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.property.domain">domain</a></code> | <code>aws-cdk-lib.aws_opensearchservice.IDomain</code> | The OpenSearch domain to which the admin user will be added. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.property.username">username</a></code> | <code>aws-cdk-lib.aws_ssm.IParameter</code> | The SSM parameter containing the username for the OpenSearch admin user. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.property.domainKey">domainKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration</code> | Optional Lambda configuration settings. |

---

##### `credential`<sup>Required</sup> <a name="credential" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.property.credential"></a>

```typescript
public readonly credential: PasswordParameterProps | PasswordSecretProps;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordParameterProps | @cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordSecretProps

The SSM parameter or Secret containing the password for the OpenSearch admin user.

---

##### `domain`<sup>Required</sup> <a name="domain" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.property.domain"></a>

```typescript
public readonly domain: IDomain;
```

- *Type:* aws-cdk-lib.aws_opensearchservice.IDomain

The OpenSearch domain to which the admin user will be added.

---

##### `username`<sup>Required</sup> <a name="username" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.property.username"></a>

```typescript
public readonly username: IParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IParameter

The SSM parameter containing the username for the OpenSearch admin user.

---

##### `domainKey`<sup>Optional</sup> <a name="domainKey" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.property.domainKey"></a>

```typescript
public readonly domainKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional.

The KMS key used to encrypt the OpenSearch domain.
If provided, the construct will grant the necessary permissions to use this key.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional.

The KMS key used to encrypt the worker resources (e.g., Lambda function environment variables).
If provided, this key will be used for encryption; otherwise, an AWS managed key will be used.

---

##### `lambdaConfiguration`<sup>Optional</sup> <a name="lambdaConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.property.lambdaConfiguration"></a>

```typescript
public readonly lambdaConfiguration: LambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve-lib.interfaces.LambdaConfiguration

Optional Lambda configuration settings.

---

### OverrideConfig <a name="OverrideConfig" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideConfig"></a>

Configuration for rule overrides.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideConfig.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const overrideConfig: constructs.WebApplicationFirewall.OverrideConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideConfig.property.action">action</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideAction</code> | The action to take for the specific rule. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideConfig.property.name">name</a></code> | <code>string</code> | The name of the specific rule to override. |

---

##### `action`<sup>Required</sup> <a name="action" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideConfig.property.action"></a>

```typescript
public readonly action: OverrideAction;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideAction

The action to take for the specific rule.

---

##### `name`<sup>Required</sup> <a name="name" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideConfig.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the specific rule to override.

---

### PasswordParameterProps <a name="PasswordParameterProps" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordParameterProps"></a>

Properties for the admin user password specific to when the credential is stored in AWS Systems Manager Parameter Store.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordParameterProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const passwordParameterProps: constructs.OpenSearchAdminUser.PasswordParameterProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordParameterProps.property.parameter">parameter</a></code> | <code>aws-cdk-lib.aws_ssm.IParameter</code> | Reference to the AWS Systems Manager Parameter Store parameter that contains the admin credential. |

---

##### `parameter`<sup>Required</sup> <a name="parameter" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordParameterProps.property.parameter"></a>

```typescript
public readonly parameter: IParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IParameter

Reference to the AWS Systems Manager Parameter Store parameter that contains the admin credential.

---

### PasswordSecretProps <a name="PasswordSecretProps" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordSecretProps"></a>

Properties for the admin user password specific to when the credential is stored in AWS Secrets Manager.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordSecretProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const passwordSecretProps: constructs.OpenSearchAdminUser.PasswordSecretProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordSecretProps.property.secret">secret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | Reference to the AWS Secrets Manager secret that contains the admin credential. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordSecretProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional encryption key that protects the secret. |

---

##### `secret`<sup>Required</sup> <a name="secret" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordSecretProps.property.secret"></a>

```typescript
public readonly secret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

Reference to the AWS Secrets Manager secret that contains the admin credential.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordSecretProps.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional encryption key that protects the secret.

---

### SetLogRetentionProps <a name="SetLogRetentionProps" id="@cdklabs/cdk-proserve-lib.aspects.SetLogRetentionProps"></a>

Properties for configuring log retention settings.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.aspects.SetLogRetentionProps.Initializer"></a>

```typescript
import { aspects } from '@cdklabs/cdk-proserve-lib'

const setLogRetentionProps: aspects.SetLogRetentionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.aspects.SetLogRetentionProps.property.period">period</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | The retention period for the logs. |

---

##### `period`<sup>Required</sup> <a name="period" id="@cdklabs/cdk-proserve-lib.aspects.SetLogRetentionProps.property.period"></a>

```typescript
public readonly period: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays

The retention period for the logs.

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

### WebApplicationFirewallLoggingConfig <a name="WebApplicationFirewallLoggingConfig" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.WebApplicationFirewallLoggingConfig"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.WebApplicationFirewallLoggingConfig.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const webApplicationFirewallLoggingConfig: constructs.WebApplicationFirewall.WebApplicationFirewallLoggingConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.WebApplicationFirewallLoggingConfig.property.logGroupNameAffix">logGroupNameAffix</a></code> | <code>string</code> | Log Group name affix to be appended to aws-waf-logs-<affix>. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.WebApplicationFirewallLoggingConfig.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.Key</code> | KMS key to use for encryption of the log group. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.WebApplicationFirewallLoggingConfig.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for the log group. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.WebApplicationFirewallLoggingConfig.property.retention">retention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | Retention period for the log group. |

---

##### `logGroupNameAffix`<sup>Required</sup> <a name="logGroupNameAffix" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.WebApplicationFirewallLoggingConfig.property.logGroupNameAffix"></a>

```typescript
public readonly logGroupNameAffix: string;
```

- *Type:* string

Log Group name affix to be appended to aws-waf-logs-<affix>.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.WebApplicationFirewallLoggingConfig.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: Key;
```

- *Type:* aws-cdk-lib.aws_kms.Key

KMS key to use for encryption of the log group.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.WebApplicationFirewallLoggingConfig.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* DESTROY

Removal policy for the log group.

---

##### `retention`<sup>Optional</sup> <a name="retention" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.WebApplicationFirewallLoggingConfig.property.retention"></a>

```typescript
public readonly retention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* ONE_MONTH

Retention period for the log group.

---

### WebApplicationFirewallProps <a name="WebApplicationFirewallProps" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const webApplicationFirewallProps: constructs.WebApplicationFirewallProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps.property.awsManagedRuleGroups">awsManagedRuleGroups</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroupConfig \| @cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup[]</code> | List of AWS Managed Rule Groups to use for the firewall. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps.property.cloudWatchMetricsEnabled">cloudWatchMetricsEnabled</a></code> | <code>boolean</code> | Whether to enable CloudWatch metrics. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps.property.logging">logging</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.WebApplicationFirewallLoggingConfig</code> | Logging configuration for the firewall. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps.property.sampledRequestsEnabled">sampledRequestsEnabled</a></code> | <code>boolean</code> | Whether to enable sampled requests. |

---

##### `awsManagedRuleGroups`<sup>Optional</sup> <a name="awsManagedRuleGroups" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps.property.awsManagedRuleGroups"></a>

```typescript
public readonly awsManagedRuleGroups: AwsManagedRuleGroupConfig | AwsManagedRuleGroup[];
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroupConfig | @cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup[]
- *Default:* []

List of AWS Managed Rule Groups to use for the firewall.

---

##### `cloudWatchMetricsEnabled`<sup>Optional</sup> <a name="cloudWatchMetricsEnabled" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps.property.cloudWatchMetricsEnabled"></a>

```typescript
public readonly cloudWatchMetricsEnabled: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable CloudWatch metrics.

---

##### `logging`<sup>Optional</sup> <a name="logging" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps.property.logging"></a>

```typescript
public readonly logging: WebApplicationFirewallLoggingConfig;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.WebApplicationFirewallLoggingConfig

Logging configuration for the firewall.

---

##### `sampledRequestsEnabled`<sup>Optional</sup> <a name="sampledRequestsEnabled" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps.property.sampledRequestsEnabled"></a>

```typescript
public readonly sampledRequestsEnabled: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable sampled requests.

---

## Classes <a name="Classes" id="Classes"></a>

### ApplyRemovalPolicy <a name="ApplyRemovalPolicy" id="@cdklabs/cdk-proserve-lib.aspects.ApplyRemovalPolicy"></a>

- *Implements:* aws-cdk-lib.IAspect

Aspect that applies the provided Removal Policy to all resources.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.aspects.ApplyRemovalPolicy.Initializer"></a>

```typescript
import { aspects } from '@cdklabs/cdk-proserve-lib'

new aspects.ApplyRemovalPolicy(props: ApplyRemovalPolicyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.aspects.ApplyRemovalPolicy.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.aspects.ApplyRemovalPolicyProps</code> | Configuration properties for removal policy. |

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.aspects.ApplyRemovalPolicy.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.aspects.ApplyRemovalPolicyProps

Configuration properties for removal policy.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.aspects.ApplyRemovalPolicy.visit">visit</a></code> | Visits a construct and applies the removal policy. |

---

##### `visit` <a name="visit" id="@cdklabs/cdk-proserve-lib.aspects.ApplyRemovalPolicy.visit"></a>

```typescript
public visit(node: IConstruct): void
```

Visits a construct and applies the removal policy.

###### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.aspects.ApplyRemovalPolicy.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

The construct being visited.

---




### CreateLambdaLogGroup <a name="CreateLambdaLogGroup" id="@cdklabs/cdk-proserve-lib.aspects.CreateLambdaLogGroup"></a>

- *Implements:* aws-cdk-lib.IAspect

An aspect that ensures Lambda log groups are created for all Lambda functions.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.aspects.CreateLambdaLogGroup.Initializer"></a>

```typescript
import { aspects } from '@cdklabs/cdk-proserve-lib'

new aspects.CreateLambdaLogGroup()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.aspects.CreateLambdaLogGroup.visit">visit</a></code> | Visits a construct and creates a log group if the construct is a Lambda function. |

---

##### `visit` <a name="visit" id="@cdklabs/cdk-proserve-lib.aspects.CreateLambdaLogGroup.visit"></a>

```typescript
public visit(node: IConstruct): void
```

Visits a construct and creates a log group if the construct is a Lambda function.

###### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.aspects.CreateLambdaLogGroup.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

The construct being visited.

---




### SetLogRetention <a name="SetLogRetention" id="@cdklabs/cdk-proserve-lib.aspects.SetLogRetention"></a>

- *Implements:* aws-cdk-lib.IAspect

Aspect that sets log retention period for CloudWatch Log Groups.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.aspects.SetLogRetention.Initializer"></a>

```typescript
import { aspects } from '@cdklabs/cdk-proserve-lib'

new aspects.SetLogRetention(props: SetLogRetentionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.aspects.SetLogRetention.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.aspects.SetLogRetentionProps</code> | Configuration properties for log retention. |

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.aspects.SetLogRetention.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.aspects.SetLogRetentionProps

Configuration properties for log retention.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.aspects.SetLogRetention.visit">visit</a></code> | Visits a construct and sets log retention if applicable. |

---

##### `visit` <a name="visit" id="@cdklabs/cdk-proserve-lib.aspects.SetLogRetention.visit"></a>

```typescript
public visit(node: IConstruct): void
```

Visits a construct and sets log retention if applicable.

###### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.aspects.SetLogRetention.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

The construct being visited.

---




### SqsRequireSsl <a name="SqsRequireSsl" id="@cdklabs/cdk-proserve-lib.aspects.SqsRequireSsl"></a>

- *Implements:* aws-cdk-lib.IAspect

An aspect that enforces SSL/TLS requirements for SQS queues.

When applied to a CDK construct, it adds a resource policy to any SQS queue
that denies all actions when the request is not made over a secure transport.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.aspects.SqsRequireSsl.Initializer"></a>

```typescript
import { aspects } from '@cdklabs/cdk-proserve-lib'

new aspects.SqsRequireSsl()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.aspects.SqsRequireSsl.visit">visit</a></code> | Visits a construct and adds SSL/TLS requirement policy if it's an SQS queue. |

---

##### `visit` <a name="visit" id="@cdklabs/cdk-proserve-lib.aspects.SqsRequireSsl.visit"></a>

```typescript
public visit(node: IConstruct): void
```

Visits a construct and adds SSL/TLS requirement policy if it's an SQS queue.

###### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.aspects.SqsRequireSsl.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

The construct being visited.

---





## Enums <a name="Enums" id="Enums"></a>

### AwsManagedRuleGroup <a name="AwsManagedRuleGroup" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup"></a>

WAF Managed Rule Groups.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.COMMON_RULE_SET">COMMON_RULE_SET</a></code> | Contains rules that are generally applicable to web applications. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.ADMIN_PROTECTION_RULE_SET">ADMIN_PROTECTION_RULE_SET</a></code> | Contains rules that allow you to block external access to exposed admin pages. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.KNOWN_BAD_INPUTS_RULE_SET">KNOWN_BAD_INPUTS_RULE_SET</a></code> | Contains rules that allow you to block request patterns that are known to be invalid and are associated with exploitation or discovery of vulnerabilities. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.SQL_DATABASE_RULE_SET">SQL_DATABASE_RULE_SET</a></code> | Contains rules that allow you to block request patterns associated with exploitation of SQL databases, like SQL injection attacks. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.LINUX_RULE_SET">LINUX_RULE_SET</a></code> | Contains rules that block request patterns associated with exploitation of vulnerabilities specific to Linux, including LFI attacks. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.UNIX_RULE_SET">UNIX_RULE_SET</a></code> | Contains rules that block request patterns associated with exploiting vulnerabilities specific to POSIX/POSIX-like OS, including LFI attacks. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.WINDOWS_RULE_SET">WINDOWS_RULE_SET</a></code> | Contains rules that block request patterns associated with exploiting vulnerabilities specific to Windows, (e.g., PowerShell commands). This can help prevent exploits that allow attacker to run unauthorized commands or execute malicious code. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.PHP_RULE_SET">PHP_RULE_SET</a></code> | Contains rules that block request patterns associated with exploiting vulnerabilities specific to the use of the PHP, including injection of unsafe PHP functions. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.WORD_PRESS_RULE_SET">WORD_PRESS_RULE_SET</a></code> | The WordPress Applications group contains rules that block request patterns associated with the exploitation of vulnerabilities specific to WordPress sites. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.AMAZON_IP_REPUTATION_LIST">AMAZON_IP_REPUTATION_LIST</a></code> | This group contains rules that are based on Amazon threat intelligence. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.ANONYMOUS_IP_LIST">ANONYMOUS_IP_LIST</a></code> | This group contains rules that allow you to block requests from services that allow obfuscation of viewer identity. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.BOT_CONTROL_RULE_SET">BOT_CONTROL_RULE_SET</a></code> | Provides protection against automated bots that can consume excess resources, skew business metrics, cause downtime, or perform malicious activities. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.ATP_RULE_SET">ATP_RULE_SET</a></code> | Provides protection for your login page against stolen credentials, credential stuffing attacks, brute force login attempts, and other anomalous login activities. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.ACFP_RULE_SET">ACFP_RULE_SET</a></code> | Provides protection against the creation of fraudulent accounts on your site. |

---

##### `COMMON_RULE_SET` <a name="COMMON_RULE_SET" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.COMMON_RULE_SET"></a>

Contains rules that are generally applicable to web applications.

This provides protection against exploitation of a wide range of vulnerabilities, including those described in OWASP publications.

---


##### `ADMIN_PROTECTION_RULE_SET` <a name="ADMIN_PROTECTION_RULE_SET" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.ADMIN_PROTECTION_RULE_SET"></a>

Contains rules that allow you to block external access to exposed admin pages.

This may be useful if you are running third-party software or would like to reduce the risk of a malicious actor gaining administrative access to your application.

---


##### `KNOWN_BAD_INPUTS_RULE_SET` <a name="KNOWN_BAD_INPUTS_RULE_SET" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.KNOWN_BAD_INPUTS_RULE_SET"></a>

Contains rules that allow you to block request patterns that are known to be invalid and are associated with exploitation or discovery of vulnerabilities.

This can help reduce the risk of a malicious actor discovering a vulnerable application.

---


##### `SQL_DATABASE_RULE_SET` <a name="SQL_DATABASE_RULE_SET" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.SQL_DATABASE_RULE_SET"></a>

Contains rules that allow you to block request patterns associated with exploitation of SQL databases, like SQL injection attacks.

This can help prevent remote injection of unauthorized queries.

---


##### `LINUX_RULE_SET` <a name="LINUX_RULE_SET" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.LINUX_RULE_SET"></a>

Contains rules that block request patterns associated with exploitation of vulnerabilities specific to Linux, including LFI attacks.

This can help prevent attacks that expose file contents or execute code for which the attacker should not have had access.

---


##### `UNIX_RULE_SET` <a name="UNIX_RULE_SET" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.UNIX_RULE_SET"></a>

Contains rules that block request patterns associated with exploiting vulnerabilities specific to POSIX/POSIX-like OS, including LFI attacks.

This can help prevent attacks that expose file contents or execute code for which access should not been allowed.

---


##### `WINDOWS_RULE_SET` <a name="WINDOWS_RULE_SET" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.WINDOWS_RULE_SET"></a>

Contains rules that block request patterns associated with exploiting vulnerabilities specific to Windows, (e.g., PowerShell commands). This can help prevent exploits that allow attacker to run unauthorized commands or execute malicious code.

---


##### `PHP_RULE_SET` <a name="PHP_RULE_SET" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.PHP_RULE_SET"></a>

Contains rules that block request patterns associated with exploiting vulnerabilities specific to the use of the PHP, including injection of unsafe PHP functions.

This can help prevent exploits that allow an attacker to remotely execute code or commands.

---


##### `WORD_PRESS_RULE_SET` <a name="WORD_PRESS_RULE_SET" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.WORD_PRESS_RULE_SET"></a>

The WordPress Applications group contains rules that block request patterns associated with the exploitation of vulnerabilities specific to WordPress sites.

---


##### `AMAZON_IP_REPUTATION_LIST` <a name="AMAZON_IP_REPUTATION_LIST" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.AMAZON_IP_REPUTATION_LIST"></a>

This group contains rules that are based on Amazon threat intelligence.

This is useful if you would like to block sources associated with bots or other threats.

---


##### `ANONYMOUS_IP_LIST` <a name="ANONYMOUS_IP_LIST" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.ANONYMOUS_IP_LIST"></a>

This group contains rules that allow you to block requests from services that allow obfuscation of viewer identity.

This can include request originating from VPN, proxies, Tor nodes, and hosting providers. This is useful if you want to filter out viewers that may be trying to hide their identity from your application.

---


##### `BOT_CONTROL_RULE_SET` <a name="BOT_CONTROL_RULE_SET" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.BOT_CONTROL_RULE_SET"></a>

Provides protection against automated bots that can consume excess resources, skew business metrics, cause downtime, or perform malicious activities.

Bot Control provides additional visibility through Amazon CloudWatch and generates labels that you can use to control bot traffic to your applications.

---


##### `ATP_RULE_SET` <a name="ATP_RULE_SET" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.ATP_RULE_SET"></a>

Provides protection for your login page against stolen credentials, credential stuffing attacks, brute force login attempts, and other anomalous login activities.

With account takeover prevention, you can prevent unauthorized access that may lead to fraudulent activities, or inform legitimate users to take a preventive action.

---


##### `ACFP_RULE_SET` <a name="ACFP_RULE_SET" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.AwsManagedRuleGroup.ACFP_RULE_SET"></a>

Provides protection against the creation of fraudulent accounts on your site.

Fraudulent accounts can be used for activities such as obtaining sign-up bonuses and impersonating legitimate users.

---


### Component <a name="Component" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component"></a>

Image Builder Component.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CLOUDWATCH_AGENT_LINUX">AMAZON_CLOUDWATCH_AGENT_LINUX</a></code> | Installs the latest version of the Amazon CloudWatch agent. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CLOUDWATCH_AGENT_WINDOWS">AMAZON_CLOUDWATCH_AGENT_WINDOWS</a></code> | Installs the latest version of the Amazon CloudWatch agent. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_APT_GENERIC">AMAZON_CORRETTO_11_APT_GENERIC</a></code> | Installs Amazon Corretto 11 for Debian-based Linux platforms in accordance with the Amazon Corretto 11 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/generic-linux-install.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_HEADLESS">AMAZON_CORRETTO_11_HEADLESS</a></code> | Installs Amazon Corretto 11 Headless. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_RPM_GENERIC">AMAZON_CORRETTO_11_RPM_GENERIC</a></code> | Installs Amazon Corretto 11 for RPM-based Linux platforms in accordance with the Amazon Corretto 11 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/generic-linux-install.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_WINDOWS">AMAZON_CORRETTO_11_WINDOWS</a></code> | Installs Amazon Corretto 11 for Windows in accordance with the Amazon Corretto 11 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/windows-7-install.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11">AMAZON_CORRETTO_11</a></code> | Installs Amazon Corretto 11. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_HEADLESS">AMAZON_CORRETTO_17_HEADLESS</a></code> | Installs Amazon Corretto 17 Headless. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_JDK">AMAZON_CORRETTO_17_JDK</a></code> | Installs Amazon Corretto 17 JDK in accordance with the Amazon Corretto 17 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/linux-info.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_JRE">AMAZON_CORRETTO_17_JRE</a></code> | Installs Amazon Corretto 17 JRE. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_WINDOWS">AMAZON_CORRETTO_17_WINDOWS</a></code> | Installs Amazon Corretto 17 for Windows in accordance with the Amazon Corretto 17 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/windows-7-install.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_HEADLESS">AMAZON_CORRETTO_21_HEADLESS</a></code> | Installs Amazon Corretto 21 Headless. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_JDK">AMAZON_CORRETTO_21_JDK</a></code> | Installs Amazon Corretto 21 JDK in accordance with the Amazon Corretto 21 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-21-ug/linux-info.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_JRE">AMAZON_CORRETTO_21_JRE</a></code> | Installs Amazon Corretto 21 JRE. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_WINDOWS">AMAZON_CORRETTO_21_WINDOWS</a></code> | Installs Amazon Corretto 21 for Windows in accordance with the Amazon Corretto 21 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-21-ug/windows-10-install.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_APT_GENERIC">AMAZON_CORRETTO_8_APT_GENERIC</a></code> | Installs Amazon Corretto 8 for Debian-based Linux platforms in accordance with the Amazon Corretto 8 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/generic-linux-install.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_JDK">AMAZON_CORRETTO_8_JDK</a></code> | Installs Amazon Corretto 8 JDK. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_JRE">AMAZON_CORRETTO_8_JRE</a></code> | Installs Amazon Corretto 8 JRE. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_RPM_GENERIC">AMAZON_CORRETTO_8_RPM_GENERIC</a></code> | Installs Amazon Corretto 8 for RPM-based Linux platforms in accordance with the Amazon Corretto 8 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/generic-linux-install.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_WINDOWS">AMAZON_CORRETTO_8_WINDOWS</a></code> | Installs Amazon Corretto 8 for Windows in accordance with the Amazon Corretto 8 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/windows-7-install.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_KINESIS_AGENT_WINDOWS">AMAZON_KINESIS_AGENT_WINDOWS</a></code> | Installs the latest version of Amazon Kinesis Agent for Windows. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ANACONDA_WINDOWS">ANACONDA_WINDOWS</a></code> | Installs the Anaconda distribution and environments for Tensorflow, PyTorch, and MXNet. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.APACHE_TOMCAT_9_LINUX">APACHE_TOMCAT_9_LINUX</a></code> | Installs the latest version of Apache Tomcat and the JRE, sets required environment variables, and schedules Tomcat to run on startup. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.APT_REPOSITORY_TEST_LINUX">APT_REPOSITORY_TEST_LINUX</a></code> | Tests whether the apt package manager is functioning correctly. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_LINUX">AWS_CLI_VERSION_2_LINUX</a></code> | Installs the latest version of the AWS CLI version 2, and creates the symlink /usr/bin/aws that points to the installed application. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_WINDOWS">AWS_CLI_VERSION_2_WINDOWS</a></code> | Installs the latest version of the AWS CLI version 2. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CODEDEPLOY_AGENT_LINUX">AWS_CODEDEPLOY_AGENT_LINUX</a></code> | Installs the latest version of the AWS CodeDeploy agent. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CODEDEPLOY_AGENT_WINDOWS">AWS_CODEDEPLOY_AGENT_WINDOWS</a></code> | Installs the latest version of the AWS CodeDeploy agent. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_VSS_COMPONENTS_WINDOWS">AWS_VSS_COMPONENTS_WINDOWS</a></code> | Installs the AwsVssComponents Distributor package on a Windows instance. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.CHOCOLATEY">CHOCOLATEY</a></code> | Installs Chocolatey for Windows. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.CHRONY_TIME_CONFIGURATION_TEST">CHRONY_TIME_CONFIGURATION_TEST</a></code> | Validates the Chrony configuration file and ensures that Chrony time sources on Amazon Linux 2 are configured for the Amazon time servers. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DCV_SERVER_LINUX">DCV_SERVER_LINUX</a></code> | Install and configure the latest NICE DCV server on Linux. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DCV_SERVER_WINDOWS">DCV_SERVER_WINDOWS</a></code> | Install and configure the latest NICE DCV server on Windows. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DISTRIBUTOR_PACKAGE_WINDOWS">DISTRIBUTOR_PACKAGE_WINDOWS</a></code> | Installs a Distributor package on a Windows instance. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOCKER_CE_CENTOS">DOCKER_CE_CENTOS</a></code> | Installs Docker Community Edition from the Docker package repository, and enables the centos user to manage Docker without using sudo. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOCKER_CE_LINUX">DOCKER_CE_LINUX</a></code> | Install the latest Docker Community Edition from Amazon Linux Extras, and enable the ec2-user user to manage docker without using sudo. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOCKER_CE_UBUNTU">DOCKER_CE_UBUNTU</a></code> | Installs Docker Community Edition from the Docker package repository, and enables the ubuntu user to manage Docker without using sudo. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_DESKTOP_RUNTIME_LTS_WINDOWS">DOTNET_DESKTOP_RUNTIME_LTS_WINDOWS</a></code> | Installs the latest 8.0 channel release of the Microsoft .NET Desktop Runtime. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_HOSTING_BUNDLE_LTS_WINDOWS">DOTNET_HOSTING_BUNDLE_LTS_WINDOWS</a></code> | Installs the latest 8.0 channel release of the Microsoft .NET Hosting Bundle. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_RUNTIME_LTS_LINUX">DOTNET_RUNTIME_LTS_LINUX</a></code> | Installs the latest 8.0 channel release of the Microsoft .NET Runtime. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_RUNTIME_LTS_WINDOWS">DOTNET_RUNTIME_LTS_WINDOWS</a></code> | Installs the latest 8.0 channel release of the Microsoft .NET Runtime. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_SDK_LTS_LINUX">DOTNET_SDK_LTS_LINUX</a></code> | Installs the latest 8.0 channel release of the Microsoft .NET SDK. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_SDK_LTS_WINDOWS">DOTNET_SDK_LTS_WINDOWS</a></code> | Installs the latest 8.0 channel release of the Microsoft .NET SDK. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EBS_VOLUME_USAGE_TEST_LINUX">EBS_VOLUME_USAGE_TEST_LINUX</a></code> | The EBS volume usage test performs the following actions: 1) It creates an EBS volume and attaches it to the instance. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EBS_VOLUME_USAGE_TEST_WINDOWS">EBS_VOLUME_USAGE_TEST_WINDOWS</a></code> | The EBS volume usage test performs the following actions: 1) It creates an EBS volume and attaches it to the instance. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EC2_NETWORK_ROUTE_TEST_WINDOWS">EC2_NETWORK_ROUTE_TEST_WINDOWS</a></code> | Test to ensure all required EC2 network routes exist in the route table. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EC2LAUNCH_V2_WINDOWS">EC2LAUNCH_V2_WINDOWS</a></code> | Installs the latest version of EC2Launch v2. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ECS_OPTIMIZED_AMI_WINDOWS">ECS_OPTIMIZED_AMI_WINDOWS</a></code> | Installs Amazon ECS-optimized Windows artifacts. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EKS_OPTIMIZED_AMI_WINDOWS">EKS_OPTIMIZED_AMI_WINDOWS</a></code> | Installs Amazon EKS-optimized Windows artifacts for Amazon EKS version 1.30. This includes kubelet version 1.30.2, containerd version 1.7.14, and CSI Proxy version 1.1.2. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ENI_ATTACHMENT_TEST_LINUX">ENI_ATTACHMENT_TEST_LINUX</a></code> | The ENI attachment test performs the following actions: 1) It creates an elastic network interface (ENI) and attaches it to the instance. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ENI_ATTACHMENT_TEST_WINDOWS">ENI_ATTACHMENT_TEST_WINDOWS</a></code> | The ENI attachment test performs the following actions: 1) It creates an elastic network interface (ENI) and attaches it to the instance. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.GO_STABLE_LINUX">GO_STABLE_LINUX</a></code> | Installs the latest stable release of the Go programming language using the release information from https://go.dev/dl/. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.GO_STABLE_WINDOWS">GO_STABLE_WINDOWS</a></code> | Installs the latest stable release of the Go programming language using the release information from https://go.dev/dl/. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.HELLO_WORLD_LINUX">HELLO_WORLD_LINUX</a></code> | Hello world testing document for Linux. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.HELLO_WORLD_WINDOWS">HELLO_WORLD_WINDOWS</a></code> | Hello world testing document for Windows. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.INSPECTOR_TEST_LINUX">INSPECTOR_TEST_LINUX</a></code> | Performs a Center for Internet Security (CIS) security assessment for an instance, using Amazon Inspector (Inspector). |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.INSPECTOR_TEST_WINDOWS">INSPECTOR_TEST_WINDOWS</a></code> | Performs a Center for Internet Security (CIS) security assessment for an instance, using Amazon Inspector (Inspector). |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.INSTALL_PACKAGE_FROM_REPOSITORY">INSTALL_PACKAGE_FROM_REPOSITORY</a></code> | Installs a package from the Linux repository. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.MARIADB_LINUX">MARIADB_LINUX</a></code> | Installs the MariaDB package using apt, yum, or zypper. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.MATE_DE_LINUX">MATE_DE_LINUX</a></code> | Installs the MATE Desktop Environment, xrdp, TigerVNC server, and enables the xrdp service. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.MONO_LINUX">MONO_LINUX</a></code> | Installs the latest version of the Mono framework. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PHP_8_2_LINUX">PHP_8_2_LINUX</a></code> | Installs PHP 8.2. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_LTS_LINUX">POWERSHELL_LTS_LINUX</a></code> | Installs the latest LTS 7.4 release of PowerShell following the instructions at https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-linux?view=powershell-7.4. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_LTS_WINDOWS">POWERSHELL_LTS_WINDOWS</a></code> | Installs the latest LTS 7.4 release of PowerShell using the MSI installer from the GitHub repository located at https://github.com/PowerShell/PowerShell. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_SNAP">POWERSHELL_SNAP</a></code> | Installs the latest version of PowerShell using snap. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_YUM">POWERSHELL_YUM</a></code> | Installs the latest version of PowerShell from the Microsoft RedHat repository. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PUTTY">PUTTY</a></code> | Installs the latest version of PuTTY from the 64-bit MSI link on the release page: https://the.earth.li/~sgtatham/putty/latest/w64/. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PYTHON_3_LINUX">PYTHON_3_LINUX</a></code> | Installs the Python 3 package using apt, yum, or zypper. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PYTHON_3_WINDOWS">PYTHON_3_WINDOWS</a></code> | Installs Python 3.8.2 for Windows. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_LINUX">REBOOT_LINUX</a></code> | Reboots the system. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_TEST_LINUX">REBOOT_TEST_LINUX</a></code> | Tests whether the system can reboot successfully. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_TEST_WINDOWS">REBOOT_TEST_WINDOWS</a></code> | Tests whether the system can reboot successfully. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_WINDOWS">REBOOT_WINDOWS</a></code> | Reboots the system. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SAN_SIFT_LINUX">SAN_SIFT_LINUX</a></code> | Installs SANS SIFT v1.14.0 on Ubuntu, allowing you to leverage a suite of forensics tools. For more information, see https://www.sans.org/tools/sift-workstation/. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SCAP_COMPLIANCE_CHECKER_LINUX">SCAP_COMPLIANCE_CHECKER_LINUX</a></code> | Installs and runs SCAP Compliance Checker (SCC) 5.8 for Red Hat Enterprise Linux (RHEL) 7/8, Ubuntu 18.04/20.04 with all current STIG Q4 2023 benchmarks. SCC supports the AMD64 architecture. Other architectures are not currently supported. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/toe-stig.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SCAP_COMPLIANCE_CHECKER_WINDOWS">SCAP_COMPLIANCE_CHECKER_WINDOWS</a></code> | Installs and runs SCAP Compliance Checker (SCC) 5.10 for Windows with all current STIG Q3 2024 benchmarks. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-builder-stig.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SIMPLE_BOOT_TEST_LINUX">SIMPLE_BOOT_TEST_LINUX</a></code> | Executes a simple boot test. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SIMPLE_BOOT_TEST_WINDOWS">SIMPLE_BOOT_TEST_WINDOWS</a></code> | Executes a simple boot test. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_LINUX_HIGH">STIG_BUILD_LINUX_HIGH</a></code> | Applies the high, medium, and low severity STIG settings for Red Hat Enterprise Linux (RHEL) to Amazon Linux 2, Amazon Linux 2023, RHEL 7, CentOS Linux 7, CentOS Linux 8, CentOS Stream 9, RHEL 8, RHEL 9, Ubuntu 18.04, Ubuntu 20.04, and Ubuntu 22.04 instances. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/toe-stig.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_LINUX_LOW">STIG_BUILD_LINUX_LOW</a></code> | Applies the low severity STIG settings for Red Hat Enterprise Linux (RHEL) to Amazon Linux 2, Amazon Linux 2023, RHEL 7, CentOS Linux 7, CentOS Linux 8, CentOS Stream 9, RHEL 8, RHEL 9, Ubuntu 18.04, Ubuntu 20.04, and Ubuntu 22.04 instances. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/toe-stig.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_LINUX_MEDIUM">STIG_BUILD_LINUX_MEDIUM</a></code> | Applies the medium and low severity STIG settings for Red Hat Enterprise Linux (RHEL) to Amazon Linux 2, Amazon Linux 2023, RHEL 7, CentOS Linux 7, CentOS Linux 8, CentOS Stream 9, RHEL 8, RHEL 9, Ubuntu 18.04, Ubuntu 20.04, and Ubuntu 22.04 instances. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/toe-stig.html. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_WINDOWS_HIGH">STIG_BUILD_WINDOWS_HIGH</a></code> | Applies the high, medium, and low severity STIG settings to Windows instances. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_WINDOWS_LOW">STIG_BUILD_WINDOWS_LOW</a></code> | Applies the low severity STIG settings to Windows instances. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_WINDOWS_MEDIUM">STIG_BUILD_WINDOWS_MEDIUM</a></code> | Applies the medium and low severity STIG settings to Windows instances. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_LINUX_KERNEL_5">UPDATE_LINUX_KERNEL_5</a></code> | Installs the Linux kernel 5.* for Amazon Linux 2 from Amazon Linux Extras. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_LINUX_KERNEL_ML">UPDATE_LINUX_KERNEL_ML</a></code> | Installs the latest mainline release of the Linux kernel for CentOS 7 and Red Hat Enterprise Linux 7 and 8 via the 'kernel-ml' package from https://www.elrepo.org. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_LINUX">UPDATE_LINUX</a></code> | Updates Linux by installing all available updates via the UpdateOS action module. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_WINDOWS">UPDATE_WINDOWS</a></code> | Updates Windows with the latest security updates. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.VALIDATE_SINGLE_SSH_PUBLIC_KEY_TEST_LINUX">VALIDATE_SINGLE_SSH_PUBLIC_KEY_TEST_LINUX</a></code> | Ensures the `authorized_keys` file contains only the SSH public key returned from the EC2 Instance Metadata Service. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.VALIDATE_SSH_HOST_KEY_GENERATION_LINUX">VALIDATE_SSH_HOST_KEY_GENERATION_LINUX</a></code> | Verifies whether the SSH host key was generated after the latest boot. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.VALIDATE_SSH_PUBLIC_KEY_LINUX">VALIDATE_SSH_PUBLIC_KEY_LINUX</a></code> | Ensures the `authorized_keys` file contains the SSH public key returned from the EC2 Instance Metadata Service. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.WINDOWS_ACTIVATION_TEST">WINDOWS_ACTIVATION_TEST</a></code> | Verifies the Windows license status in the Common Information Model. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.WINDOWS_IS_READY_WITH_PASSWORD_GENERATION_TEST">WINDOWS_IS_READY_WITH_PASSWORD_GENERATION_TEST</a></code> | Checks the EC2 logs for the statement `Windows is Ready to use` and for the password generation message on Windows Server 2016 and later SKUs. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.WINDOWS_SERVER_IIS">WINDOWS_SERVER_IIS</a></code> | Installs the Internet Information Services (IIS) web server and management tools. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.YUM_REPOSITORY_TEST_LINUX">YUM_REPOSITORY_TEST_LINUX</a></code> | Tests whether yum repository works successfully. |

---

##### `AMAZON_CLOUDWATCH_AGENT_LINUX` <a name="AMAZON_CLOUDWATCH_AGENT_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CLOUDWATCH_AGENT_LINUX"></a>

Installs the latest version of the Amazon CloudWatch agent.

This component installs only the agent. You must take additional steps to configure and use the Amazon CloudWatch agent. For more information, see the documentation at https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Agent-on-EC2-Instance.html.

---


##### `AMAZON_CLOUDWATCH_AGENT_WINDOWS` <a name="AMAZON_CLOUDWATCH_AGENT_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CLOUDWATCH_AGENT_WINDOWS"></a>

Installs the latest version of the Amazon CloudWatch agent.

This component installs only the agent. You must take additional steps to configure and use the Amazon CloudWatch agent. For more information, see the documentation at https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Agent-on-EC2-Instance.html.

---


##### `AMAZON_CORRETTO_11_APT_GENERIC` <a name="AMAZON_CORRETTO_11_APT_GENERIC" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_APT_GENERIC"></a>

Installs Amazon Corretto 11 for Debian-based Linux platforms in accordance with the Amazon Corretto 11 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/generic-linux-install.html.

---


##### `AMAZON_CORRETTO_11_HEADLESS` <a name="AMAZON_CORRETTO_11_HEADLESS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_HEADLESS"></a>

Installs Amazon Corretto 11 Headless.

---


##### `AMAZON_CORRETTO_11_RPM_GENERIC` <a name="AMAZON_CORRETTO_11_RPM_GENERIC" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_RPM_GENERIC"></a>

Installs Amazon Corretto 11 for RPM-based Linux platforms in accordance with the Amazon Corretto 11 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/generic-linux-install.html.

---


##### `AMAZON_CORRETTO_11_WINDOWS` <a name="AMAZON_CORRETTO_11_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11_WINDOWS"></a>

Installs Amazon Corretto 11 for Windows in accordance with the Amazon Corretto 11 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/windows-7-install.html.

---


##### `AMAZON_CORRETTO_11` <a name="AMAZON_CORRETTO_11" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_11"></a>

Installs Amazon Corretto 11.

---


##### `AMAZON_CORRETTO_17_HEADLESS` <a name="AMAZON_CORRETTO_17_HEADLESS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_HEADLESS"></a>

Installs Amazon Corretto 17 Headless.

---


##### `AMAZON_CORRETTO_17_JDK` <a name="AMAZON_CORRETTO_17_JDK" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_JDK"></a>

Installs Amazon Corretto 17 JDK in accordance with the Amazon Corretto 17 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/linux-info.html.

---


##### `AMAZON_CORRETTO_17_JRE` <a name="AMAZON_CORRETTO_17_JRE" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_JRE"></a>

Installs Amazon Corretto 17 JRE.

---


##### `AMAZON_CORRETTO_17_WINDOWS` <a name="AMAZON_CORRETTO_17_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_17_WINDOWS"></a>

Installs Amazon Corretto 17 for Windows in accordance with the Amazon Corretto 17 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/windows-7-install.html.

---


##### `AMAZON_CORRETTO_21_HEADLESS` <a name="AMAZON_CORRETTO_21_HEADLESS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_HEADLESS"></a>

Installs Amazon Corretto 21 Headless.

---


##### `AMAZON_CORRETTO_21_JDK` <a name="AMAZON_CORRETTO_21_JDK" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_JDK"></a>

Installs Amazon Corretto 21 JDK in accordance with the Amazon Corretto 21 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-21-ug/linux-info.html.

---


##### `AMAZON_CORRETTO_21_JRE` <a name="AMAZON_CORRETTO_21_JRE" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_JRE"></a>

Installs Amazon Corretto 21 JRE.

---


##### `AMAZON_CORRETTO_21_WINDOWS` <a name="AMAZON_CORRETTO_21_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_21_WINDOWS"></a>

Installs Amazon Corretto 21 for Windows in accordance with the Amazon Corretto 21 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-21-ug/windows-10-install.html.

---


##### `AMAZON_CORRETTO_8_APT_GENERIC` <a name="AMAZON_CORRETTO_8_APT_GENERIC" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_APT_GENERIC"></a>

Installs Amazon Corretto 8 for Debian-based Linux platforms in accordance with the Amazon Corretto 8 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/generic-linux-install.html.

---


##### `AMAZON_CORRETTO_8_JDK` <a name="AMAZON_CORRETTO_8_JDK" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_JDK"></a>

Installs Amazon Corretto 8 JDK.

---


##### `AMAZON_CORRETTO_8_JRE` <a name="AMAZON_CORRETTO_8_JRE" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_JRE"></a>

Installs Amazon Corretto 8 JRE.

---


##### `AMAZON_CORRETTO_8_RPM_GENERIC` <a name="AMAZON_CORRETTO_8_RPM_GENERIC" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_RPM_GENERIC"></a>

Installs Amazon Corretto 8 for RPM-based Linux platforms in accordance with the Amazon Corretto 8 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/generic-linux-install.html.

---


##### `AMAZON_CORRETTO_8_WINDOWS` <a name="AMAZON_CORRETTO_8_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_CORRETTO_8_WINDOWS"></a>

Installs Amazon Corretto 8 for Windows in accordance with the Amazon Corretto 8 User Guide at https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/windows-7-install.html.

---


##### `AMAZON_KINESIS_AGENT_WINDOWS` <a name="AMAZON_KINESIS_AGENT_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AMAZON_KINESIS_AGENT_WINDOWS"></a>

Installs the latest version of Amazon Kinesis Agent for Windows.

---


##### `ANACONDA_WINDOWS` <a name="ANACONDA_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ANACONDA_WINDOWS"></a>

Installs the Anaconda distribution and environments for Tensorflow, PyTorch, and MXNet.

---


##### `APACHE_TOMCAT_9_LINUX` <a name="APACHE_TOMCAT_9_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.APACHE_TOMCAT_9_LINUX"></a>

Installs the latest version of Apache Tomcat and the JRE, sets required environment variables, and schedules Tomcat to run on startup.

---


##### `APT_REPOSITORY_TEST_LINUX` <a name="APT_REPOSITORY_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.APT_REPOSITORY_TEST_LINUX"></a>

Tests whether the apt package manager is functioning correctly.

---


##### `AWS_CLI_VERSION_2_LINUX` <a name="AWS_CLI_VERSION_2_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_LINUX"></a>

Installs the latest version of the AWS CLI version 2, and creates the symlink /usr/bin/aws that points to the installed application.

For more information, see https://docs.aws.amazon.com/cli/latest/userguide/.

---


##### `AWS_CLI_VERSION_2_WINDOWS` <a name="AWS_CLI_VERSION_2_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_WINDOWS"></a>

Installs the latest version of the AWS CLI version 2.

For more information, review the user guide at https://docs.aws.amazon.com/cli/latest/userguide/.

---


##### `AWS_CODEDEPLOY_AGENT_LINUX` <a name="AWS_CODEDEPLOY_AGENT_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CODEDEPLOY_AGENT_LINUX"></a>

Installs the latest version of the AWS CodeDeploy agent.

This component installs only the agent. You must take additional steps to configure and use the AWS CodeDeploy agent. For more information, see the documentation at https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html.

---


##### `AWS_CODEDEPLOY_AGENT_WINDOWS` <a name="AWS_CODEDEPLOY_AGENT_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_CODEDEPLOY_AGENT_WINDOWS"></a>

Installs the latest version of the AWS CodeDeploy agent.

This component installs only the agent. You must take additional steps to configure and use the agent. For more information, see the documentation at https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install-windows.html.

---


##### `AWS_VSS_COMPONENTS_WINDOWS` <a name="AWS_VSS_COMPONENTS_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.AWS_VSS_COMPONENTS_WINDOWS"></a>

Installs the AwsVssComponents Distributor package on a Windows instance.

The instance must have an AWS Tools for PowerShell version that includes Systems Manager modules installed. The IAM profile attached to the build instance must have the following permissions - configure the ssm:SendCommand permission with the AWS-ConfigureAWSPackage Systems Manager document on all instances in the Region, and configure the ssm:GetCommandInvocation permission for '*'. For more information, see the documentation at https://docs.aws.amazon.com/imagebuilder/latest/userguide/mgdcomponent-distributor-win.html and https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/application-consistent-snapshots.html.

---


##### `CHOCOLATEY` <a name="CHOCOLATEY" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.CHOCOLATEY"></a>

Installs Chocolatey for Windows.

---


##### `CHRONY_TIME_CONFIGURATION_TEST` <a name="CHRONY_TIME_CONFIGURATION_TEST" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.CHRONY_TIME_CONFIGURATION_TEST"></a>

Validates the Chrony configuration file and ensures that Chrony time sources on Amazon Linux 2 are configured for the Amazon time servers.

Uses validation steps outlined here: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/set-time.html.

---


##### `DCV_SERVER_LINUX` <a name="DCV_SERVER_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DCV_SERVER_LINUX"></a>

Install and configure the latest NICE DCV server on Linux.

---


##### `DCV_SERVER_WINDOWS` <a name="DCV_SERVER_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DCV_SERVER_WINDOWS"></a>

Install and configure the latest NICE DCV server on Windows.

---


##### `DISTRIBUTOR_PACKAGE_WINDOWS` <a name="DISTRIBUTOR_PACKAGE_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DISTRIBUTOR_PACKAGE_WINDOWS"></a>

Installs a Distributor package on a Windows instance.

The instance must have an AWS Tools for PowerShell version that includes Systems Manager modules installed. The IAM profile attached to the build instance must have the following permissions - configure the ssm:SendCommand permission with the AWS-ConfigureAWSPackage Systems Manager document on all instances in the Region, and configure the ssm:GetCommandInvocation permission for '*'. For more information, see the documentation at https://docs.aws.amazon.com/imagebuilder/latest/userguide/mgdcomponent-distributor-win.html.

---


##### `DOCKER_CE_CENTOS` <a name="DOCKER_CE_CENTOS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOCKER_CE_CENTOS"></a>

Installs Docker Community Edition from the Docker package repository, and enables the centos user to manage Docker without using sudo.

For more information, review the installation guide at https://docs.docker.com/install/linux/docker-ce/centos/.

---


##### `DOCKER_CE_LINUX` <a name="DOCKER_CE_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOCKER_CE_LINUX"></a>

Install the latest Docker Community Edition from Amazon Linux Extras, and enable the ec2-user user to manage docker without using sudo.

---


##### `DOCKER_CE_UBUNTU` <a name="DOCKER_CE_UBUNTU" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOCKER_CE_UBUNTU"></a>

Installs Docker Community Edition from the Docker package repository, and enables the ubuntu user to manage Docker without using sudo.

For more information, review the installation guide at https://docs.docker.com/install/linux/docker-ce/ubuntu/.

---


##### `DOTNET_DESKTOP_RUNTIME_LTS_WINDOWS` <a name="DOTNET_DESKTOP_RUNTIME_LTS_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_DESKTOP_RUNTIME_LTS_WINDOWS"></a>

Installs the latest 8.0 channel release of the Microsoft .NET Desktop Runtime. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0.

---


##### `DOTNET_HOSTING_BUNDLE_LTS_WINDOWS` <a name="DOTNET_HOSTING_BUNDLE_LTS_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_HOSTING_BUNDLE_LTS_WINDOWS"></a>

Installs the latest 8.0 channel release of the Microsoft .NET Hosting Bundle. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0.

---


##### `DOTNET_RUNTIME_LTS_LINUX` <a name="DOTNET_RUNTIME_LTS_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_RUNTIME_LTS_LINUX"></a>

Installs the latest 8.0 channel release of the Microsoft .NET Runtime. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0.

---


##### `DOTNET_RUNTIME_LTS_WINDOWS` <a name="DOTNET_RUNTIME_LTS_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_RUNTIME_LTS_WINDOWS"></a>

Installs the latest 8.0 channel release of the Microsoft .NET Runtime. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0.

---


##### `DOTNET_SDK_LTS_LINUX` <a name="DOTNET_SDK_LTS_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_SDK_LTS_LINUX"></a>

Installs the latest 8.0 channel release of the Microsoft .NET SDK. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0.

---


##### `DOTNET_SDK_LTS_WINDOWS` <a name="DOTNET_SDK_LTS_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.DOTNET_SDK_LTS_WINDOWS"></a>

Installs the latest 8.0 channel release of the Microsoft .NET SDK. For more information, see the .NET 8.0 download page at https://dotnet.microsoft.com/download/dotnet/8.0.

---


##### `EBS_VOLUME_USAGE_TEST_LINUX` <a name="EBS_VOLUME_USAGE_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EBS_VOLUME_USAGE_TEST_LINUX"></a>

The EBS volume usage test performs the following actions: 1) It creates an EBS volume and attaches it to the instance.

2) It creates a temporary file on the volume and detaches the volume. 3) It reattaches the volume and validates that the file exists. 4) It detaches and deletes the volume. To perform this test, an IAM policy with the following actions is required: ec2:AttachVolume, ec2:Create Tags, ec2:CreateVolume, ec2:DeleteVolume, ec2:DescribeVolumes, and ec2:DetachVolume.

---


##### `EBS_VOLUME_USAGE_TEST_WINDOWS` <a name="EBS_VOLUME_USAGE_TEST_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EBS_VOLUME_USAGE_TEST_WINDOWS"></a>

The EBS volume usage test performs the following actions: 1) It creates an EBS volume and attaches it to the instance.

2) It creates a temporary file on the volume and detaches the volume. 3) It reattaches the volume and validates that the file exists. 4) It detaches and deletes the volume. To perform this test, an IAM policy with the following actions is required: ec2:AttachVolume, ec2:Create Tags, ec2:CreateVolume, ec2:DeleteVolume, ec2:DescribeVolumes, and ec2:DetachVolume.

---


##### `EC2_NETWORK_ROUTE_TEST_WINDOWS` <a name="EC2_NETWORK_ROUTE_TEST_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EC2_NETWORK_ROUTE_TEST_WINDOWS"></a>

Test to ensure all required EC2 network routes exist in the route table.

---


##### `EC2LAUNCH_V2_WINDOWS` <a name="EC2LAUNCH_V2_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EC2LAUNCH_V2_WINDOWS"></a>

Installs the latest version of EC2Launch v2.

For more information, see the documentation at https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/ec2launch-v2.html.

---


##### `ECS_OPTIMIZED_AMI_WINDOWS` <a name="ECS_OPTIMIZED_AMI_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ECS_OPTIMIZED_AMI_WINDOWS"></a>

Installs Amazon ECS-optimized Windows artifacts.

This includes latest Amazon ECS Container Agent and Docker CE version 20.10.21.

---


##### `EKS_OPTIMIZED_AMI_WINDOWS` <a name="EKS_OPTIMIZED_AMI_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EKS_OPTIMIZED_AMI_WINDOWS"></a>

Installs Amazon EKS-optimized Windows artifacts for Amazon EKS version 1.30. This includes kubelet version 1.30.2, containerd version 1.7.14, and CSI Proxy version 1.1.2.

---


##### `ENI_ATTACHMENT_TEST_LINUX` <a name="ENI_ATTACHMENT_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ENI_ATTACHMENT_TEST_LINUX"></a>

The ENI attachment test performs the following actions: 1) It creates an elastic network interface (ENI) and attaches it to the instance.

2) It validates that the attached ENI has an IP address. 3) It detaches and deletes the ENI. To perform this test, an IAM policy with the following actions is required: ec2:AttachNetworkInterface, ec2:CreateNetworkInterface, ec2:CreateTags, ec2:DeleteNetworkInterface, ec2:DescribeNetworkInterfaces, ec2:DescribeNetworkInterfaceAttribute, and ec2:DetachNetworkInterface.

---


##### `ENI_ATTACHMENT_TEST_WINDOWS` <a name="ENI_ATTACHMENT_TEST_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.ENI_ATTACHMENT_TEST_WINDOWS"></a>

The ENI attachment test performs the following actions: 1) It creates an elastic network interface (ENI) and attaches it to the instance.

2) It validates that the attached ENI has an IP address. 3) It detaches and deletes the ENI. To perform this test, an IAM policy with the following actions is required: ec2:AttachNetworkInterface, ec2:CreateNetworkInterface, ec2:CreateTags, ec2:DeleteNetworkInterface, ec2:DescribeNetworkInterfaces, ec2:DescribeNetworkInterfaceAttribute, and ec2:DetachNetworkInterface.

---


##### `GO_STABLE_LINUX` <a name="GO_STABLE_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.GO_STABLE_LINUX"></a>

Installs the latest stable release of the Go programming language using the release information from https://go.dev/dl/.

---


##### `GO_STABLE_WINDOWS` <a name="GO_STABLE_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.GO_STABLE_WINDOWS"></a>

Installs the latest stable release of the Go programming language using the release information from https://go.dev/dl/.

---


##### `HELLO_WORLD_LINUX` <a name="HELLO_WORLD_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.HELLO_WORLD_LINUX"></a>

Hello world testing document for Linux.

---


##### `HELLO_WORLD_WINDOWS` <a name="HELLO_WORLD_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.HELLO_WORLD_WINDOWS"></a>

Hello world testing document for Windows.

---


##### `INSPECTOR_TEST_LINUX` <a name="INSPECTOR_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.INSPECTOR_TEST_LINUX"></a>

Performs a Center for Internet Security (CIS) security assessment for an instance, using Amazon Inspector (Inspector).

This component performs the following actions: 1) It installs the Inspector agent. 2) It creates a resource group, assessment target, and assessment template. 3) It runs the assessment and provides a link to the results in the logs and on the Inspector Service console. In order to run successfully, this component requires that the AmazonInspectorFullAccess IAM policy and the ssm:SendCommand and ec2:CreateTags IAM permissions are attached to the instance profile. To find the list of supported Operating Systems and their rules packages, refer to the Inspector documentation https://docs.aws.amazon.com/inspector/v1/userguide/inspector_rule-packages_across_os.html.

---


##### `INSPECTOR_TEST_WINDOWS` <a name="INSPECTOR_TEST_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.INSPECTOR_TEST_WINDOWS"></a>

Performs a Center for Internet Security (CIS) security assessment for an instance, using Amazon Inspector (Inspector).

This component performs the following actions: 1) It installs the Inspector agent. 2) It creates a resource group, assessment target, and assessment template. 3) It runs the assessment and provides a link to the results in the logs and on the Inspector Service console. In order to run successfully, this component requires that the AmazonInspectorFullAccess IAM policy and the ssm:SendCommand and ec2:CreateTags IAM permissions are attached to the instance profile. To find the list of supported Operating Systems and their rules packages, refer to the Inspector documentation https://docs.aws.amazon.com/inspector/v1/userguide/inspector_rule-packages_across_os.html.

---


##### `INSTALL_PACKAGE_FROM_REPOSITORY` <a name="INSTALL_PACKAGE_FROM_REPOSITORY" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.INSTALL_PACKAGE_FROM_REPOSITORY"></a>

Installs a package from the Linux repository.

---


##### `MARIADB_LINUX` <a name="MARIADB_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.MARIADB_LINUX"></a>

Installs the MariaDB package using apt, yum, or zypper.

---


##### `MATE_DE_LINUX` <a name="MATE_DE_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.MATE_DE_LINUX"></a>

Installs the MATE Desktop Environment, xrdp, TigerVNC server, and enables the xrdp service.

---


##### `MONO_LINUX` <a name="MONO_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.MONO_LINUX"></a>

Installs the latest version of the Mono framework.

Follows the instructions found at https://www.mono-project.com/.

---


##### `PHP_8_2_LINUX` <a name="PHP_8_2_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PHP_8_2_LINUX"></a>

Installs PHP 8.2.

---


##### `POWERSHELL_LTS_LINUX` <a name="POWERSHELL_LTS_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_LTS_LINUX"></a>

Installs the latest LTS 7.4 release of PowerShell following the instructions at https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-linux?view=powershell-7.4.

---


##### `POWERSHELL_LTS_WINDOWS` <a name="POWERSHELL_LTS_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_LTS_WINDOWS"></a>

Installs the latest LTS 7.4 release of PowerShell using the MSI installer from the GitHub repository located at https://github.com/PowerShell/PowerShell.

---


##### `POWERSHELL_SNAP` <a name="POWERSHELL_SNAP" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_SNAP"></a>

Installs the latest version of PowerShell using snap.

---


##### `POWERSHELL_YUM` <a name="POWERSHELL_YUM" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.POWERSHELL_YUM"></a>

Installs the latest version of PowerShell from the Microsoft RedHat repository.

---


##### `PUTTY` <a name="PUTTY" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PUTTY"></a>

Installs the latest version of PuTTY from the 64-bit MSI link on the release page: https://the.earth.li/~sgtatham/putty/latest/w64/.

---


##### `PYTHON_3_LINUX` <a name="PYTHON_3_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PYTHON_3_LINUX"></a>

Installs the Python 3 package using apt, yum, or zypper.

---


##### `PYTHON_3_WINDOWS` <a name="PYTHON_3_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.PYTHON_3_WINDOWS"></a>

Installs Python 3.8.2 for Windows.

---


##### `REBOOT_LINUX` <a name="REBOOT_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_LINUX"></a>

Reboots the system.

---


##### `REBOOT_TEST_LINUX` <a name="REBOOT_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_TEST_LINUX"></a>

Tests whether the system can reboot successfully.

---


##### `REBOOT_TEST_WINDOWS` <a name="REBOOT_TEST_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_TEST_WINDOWS"></a>

Tests whether the system can reboot successfully.

---


##### `REBOOT_WINDOWS` <a name="REBOOT_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.REBOOT_WINDOWS"></a>

Reboots the system.

---


##### `SAN_SIFT_LINUX` <a name="SAN_SIFT_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SAN_SIFT_LINUX"></a>

Installs SANS SIFT v1.14.0 on Ubuntu, allowing you to leverage a suite of forensics tools. For more information, see https://www.sans.org/tools/sift-workstation/.

---


##### `SCAP_COMPLIANCE_CHECKER_LINUX` <a name="SCAP_COMPLIANCE_CHECKER_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SCAP_COMPLIANCE_CHECKER_LINUX"></a>

Installs and runs SCAP Compliance Checker (SCC) 5.8 for Red Hat Enterprise Linux (RHEL) 7/8, Ubuntu 18.04/20.04 with all current STIG Q4 2023 benchmarks. SCC supports the AMD64 architecture. Other architectures are not currently supported. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/toe-stig.html.

---


##### `SCAP_COMPLIANCE_CHECKER_WINDOWS` <a name="SCAP_COMPLIANCE_CHECKER_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SCAP_COMPLIANCE_CHECKER_WINDOWS"></a>

Installs and runs SCAP Compliance Checker (SCC) 5.10 for Windows with all current STIG Q3 2024 benchmarks. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-builder-stig.html.

---


##### `SIMPLE_BOOT_TEST_LINUX` <a name="SIMPLE_BOOT_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SIMPLE_BOOT_TEST_LINUX"></a>

Executes a simple boot test.

---


##### `SIMPLE_BOOT_TEST_WINDOWS` <a name="SIMPLE_BOOT_TEST_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.SIMPLE_BOOT_TEST_WINDOWS"></a>

Executes a simple boot test.

---


##### `STIG_BUILD_LINUX_HIGH` <a name="STIG_BUILD_LINUX_HIGH" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_LINUX_HIGH"></a>

Applies the high, medium, and low severity STIG settings for Red Hat Enterprise Linux (RHEL) to Amazon Linux 2, Amazon Linux 2023, RHEL 7, CentOS Linux 7, CentOS Linux 8, CentOS Stream 9, RHEL 8, RHEL 9, Ubuntu 18.04, Ubuntu 20.04, and Ubuntu 22.04 instances. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/toe-stig.html.

---


##### `STIG_BUILD_LINUX_LOW` <a name="STIG_BUILD_LINUX_LOW" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_LINUX_LOW"></a>

Applies the low severity STIG settings for Red Hat Enterprise Linux (RHEL) to Amazon Linux 2, Amazon Linux 2023, RHEL 7, CentOS Linux 7, CentOS Linux 8, CentOS Stream 9, RHEL 8, RHEL 9, Ubuntu 18.04, Ubuntu 20.04, and Ubuntu 22.04 instances. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/toe-stig.html.

---


##### `STIG_BUILD_LINUX_MEDIUM` <a name="STIG_BUILD_LINUX_MEDIUM" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_LINUX_MEDIUM"></a>

Applies the medium and low severity STIG settings for Red Hat Enterprise Linux (RHEL) to Amazon Linux 2, Amazon Linux 2023, RHEL 7, CentOS Linux 7, CentOS Linux 8, CentOS Stream 9, RHEL 8, RHEL 9, Ubuntu 18.04, Ubuntu 20.04, and Ubuntu 22.04 instances. For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/toe-stig.html.

---


##### `STIG_BUILD_WINDOWS_HIGH` <a name="STIG_BUILD_WINDOWS_HIGH" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_WINDOWS_HIGH"></a>

Applies the high, medium, and low severity STIG settings to Windows instances.

For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-builder-stig.html.

---


##### `STIG_BUILD_WINDOWS_LOW` <a name="STIG_BUILD_WINDOWS_LOW" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_WINDOWS_LOW"></a>

Applies the low severity STIG settings to Windows instances.

For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-builder-stig.html.

---


##### `STIG_BUILD_WINDOWS_MEDIUM` <a name="STIG_BUILD_WINDOWS_MEDIUM" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.STIG_BUILD_WINDOWS_MEDIUM"></a>

Applies the medium and low severity STIG settings to Windows instances.

For more information, see https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-builder-stig.html.

---


##### `UPDATE_LINUX_KERNEL_5` <a name="UPDATE_LINUX_KERNEL_5" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_LINUX_KERNEL_5"></a>

Installs the Linux kernel 5.* for Amazon Linux 2 from Amazon Linux Extras.

---


##### `UPDATE_LINUX_KERNEL_ML` <a name="UPDATE_LINUX_KERNEL_ML" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_LINUX_KERNEL_ML"></a>

Installs the latest mainline release of the Linux kernel for CentOS 7 and Red Hat Enterprise Linux 7 and 8 via the 'kernel-ml' package from https://www.elrepo.org.

---


##### `UPDATE_LINUX` <a name="UPDATE_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_LINUX"></a>

Updates Linux by installing all available updates via the UpdateOS action module.

---


##### `UPDATE_WINDOWS` <a name="UPDATE_WINDOWS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.UPDATE_WINDOWS"></a>

Updates Windows with the latest security updates.

---


##### `VALIDATE_SINGLE_SSH_PUBLIC_KEY_TEST_LINUX` <a name="VALIDATE_SINGLE_SSH_PUBLIC_KEY_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.VALIDATE_SINGLE_SSH_PUBLIC_KEY_TEST_LINUX"></a>

Ensures the `authorized_keys` file contains only the SSH public key returned from the EC2 Instance Metadata Service.

---


##### `VALIDATE_SSH_HOST_KEY_GENERATION_LINUX` <a name="VALIDATE_SSH_HOST_KEY_GENERATION_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.VALIDATE_SSH_HOST_KEY_GENERATION_LINUX"></a>

Verifies whether the SSH host key was generated after the latest boot.

---


##### `VALIDATE_SSH_PUBLIC_KEY_LINUX` <a name="VALIDATE_SSH_PUBLIC_KEY_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.VALIDATE_SSH_PUBLIC_KEY_LINUX"></a>

Ensures the `authorized_keys` file contains the SSH public key returned from the EC2 Instance Metadata Service.

---


##### `WINDOWS_ACTIVATION_TEST` <a name="WINDOWS_ACTIVATION_TEST" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.WINDOWS_ACTIVATION_TEST"></a>

Verifies the Windows license status in the Common Information Model.

---


##### `WINDOWS_IS_READY_WITH_PASSWORD_GENERATION_TEST` <a name="WINDOWS_IS_READY_WITH_PASSWORD_GENERATION_TEST" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.WINDOWS_IS_READY_WITH_PASSWORD_GENERATION_TEST"></a>

Checks the EC2 logs for the statement `Windows is Ready to use` and for the password generation message on Windows Server 2016 and later SKUs.

This component does not support instances launched without an EC2 key pair.

---


##### `WINDOWS_SERVER_IIS` <a name="WINDOWS_SERVER_IIS" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.WINDOWS_SERVER_IIS"></a>

Installs the Internet Information Services (IIS) web server and management tools.

The installation is performed by enabling the Windows features built into the Windows operating system.

---


##### `YUM_REPOSITORY_TEST_LINUX` <a name="YUM_REPOSITORY_TEST_LINUX" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.YUM_REPOSITORY_TEST_LINUX"></a>

Tests whether yum repository works successfully.

---


### Feature <a name="Feature" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Feature"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Feature.AWS_CLI">AWS_CLI</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Feature.NICE_DCV">NICE_DCV</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Feature.RETAIN_SSM_AGENT">RETAIN_SSM_AGENT</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Feature.STIG">STIG</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Feature.SCAP">SCAP</a></code> | *No description.* |

---

##### `AWS_CLI` <a name="AWS_CLI" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Feature.AWS_CLI"></a>

---


##### `NICE_DCV` <a name="NICE_DCV" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Feature.NICE_DCV"></a>

---


##### `RETAIN_SSM_AGENT` <a name="RETAIN_SSM_AGENT" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Feature.RETAIN_SSM_AGENT"></a>

---


##### `STIG` <a name="STIG" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Feature.STIG"></a>

---


##### `SCAP` <a name="SCAP" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Feature.SCAP"></a>

---


### LogType <a name="LogType" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LogType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LogType.TLS">TLS</a></code> | Logs for events that are related to TLS inspection. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LogType.FLOW">FLOW</a></code> | Standard network traffic flow logs. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LogType.ALERT">ALERT</a></code> | Logs for traffic that matches your stateful rules and that have an action that sends an alert. |

---

##### `TLS` <a name="TLS" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LogType.TLS"></a>

Logs for events that are related to TLS inspection.

For more information, see Inspecting SSL/TLS traffic with TLS inspection configurations in the Network Firewall Developer Guide .

---


##### `FLOW` <a name="FLOW" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LogType.FLOW"></a>

Standard network traffic flow logs.

The stateful rules engine records flow logs for all network traffic that it receives. Each flow log record captures the network flow for a specific standard stateless rule group.

---


##### `ALERT` <a name="ALERT" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.LogType.ALERT"></a>

Logs for traffic that matches your stateful rules and that have an action that sends an alert.

A stateful rule sends alerts for the rule actions DROP, ALERT, and REJECT. For more information, see the StatefulRule property.

---


### OperatingSystem <a name="OperatingSystem" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.OperatingSystem"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.OperatingSystem.RED_HAT_ENTERPRISE_LINUX_8_9">RED_HAT_ENTERPRISE_LINUX_8_9</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.OperatingSystem.AMAZON_LINUX_2">AMAZON_LINUX_2</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.OperatingSystem.AMAZON_LINUX_2023">AMAZON_LINUX_2023</a></code> | *No description.* |

---

##### `RED_HAT_ENTERPRISE_LINUX_8_9` <a name="RED_HAT_ENTERPRISE_LINUX_8_9" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.OperatingSystem.RED_HAT_ENTERPRISE_LINUX_8_9"></a>

---


##### `AMAZON_LINUX_2` <a name="AMAZON_LINUX_2" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.OperatingSystem.AMAZON_LINUX_2"></a>

---


##### `AMAZON_LINUX_2023` <a name="AMAZON_LINUX_2023" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.OperatingSystem.AMAZON_LINUX_2023"></a>

---


### OverrideAction <a name="OverrideAction" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideAction"></a>

Enum representing possible override actions for WAF rules.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideAction.ALLOW">ALLOW</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideAction.BLOCK">BLOCK</a></code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideAction.COUNT">COUNT</a></code> | *No description.* |

---

##### `ALLOW` <a name="ALLOW" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideAction.ALLOW"></a>

---


##### `BLOCK` <a name="BLOCK" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideAction.BLOCK"></a>

---


##### `COUNT` <a name="COUNT" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.OverrideAction.COUNT"></a>

---

