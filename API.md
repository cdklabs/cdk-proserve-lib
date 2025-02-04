# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Ec2ImageBuilderGetImage <a name="Ec2ImageBuilderGetImage" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImage"></a>

Retrieves an EC2 Image Builder image build version.

This is useful for retrieving the AMI ID of an image that was built by an
EC2 Image Builder pipeline.

*Example*

```typescript
import { CfnOutput } from 'aws-cdk-lib';
import { Ec2ImageBuilderGetImage } from '@cdklabs/cdk-proserve-lib/constructs';

const image = new Ec2ImageBuilderGetImage(this, 'SomeImage', {
  imageBuildVersionArn: 'arn:aws:imagebuilder:us-east-1:123456789012:image/some-image/0.0.1/1'
});
new CfnOutput(this, 'AmiId', { value: image.ami });
```


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

Starts an EC2 Image Builder Pipeline and optionally waits for the build to complete.

This construct is useful if you want to create an image as part of your IaC
deployment. By waiting for completion of this construct, you can use the
image in the same deployment by retrieving the AMI and passing it to an EC2
build step.

*Example*

```typescript
import { Duration } from 'aws-cdk-lib';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Ec2ImageBuilderStart } from '@cdklabs/cdk-proserve-lib/constructs';

const topic = Topic.fromTopicArn(
  this,
  'MyTopic',
  'arn:aws:sns:us-east-1:123456789012:my-notification-topic'
);
new Ec2ImageBuilderStart(this, 'ImageBuilderStart', {
  pipelineArn:
    'arn:aws:imagebuilder:us-east-1:123456789012:image-pipeline/my-image-pipeline',
  waitForCompletion: {
    topic: topic,
    timeout: Duration.hours(7)  // wait up to 7 hours for completion
  }
});
```


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

An EC2 Image Pipeline that can be used to build a Amazon Machine Image (AMI) automatically.

This construct simplifies the process of creating an EC2 Image Pipeline and
provides all of the available components that can be used that are maintained
by AWS.

*Example*

```typescript
import { CfnOutput } from 'aws-cdk-lib';
import { Ec2ImagePipeline } from '@cdklabs/cdk-proserve-lib/constructs';

const pipeline = new Ec2ImagePipeline(this, 'ImagePipeline', {
  version: '0.1.0',
  buildConfiguration: {
    start: true,
    waitForCompletion: true
  },
  components: [
    Ec2ImagePipeline.Component.AWS_CLI_VERSION_2_LINUX,
    Ec2ImagePipeline.Component.DOCKER_CE_LINUX
  ]
});
new CfnOutput(this, 'ImagePipelineAmi', { value: pipeline.latestAmi! });
```


#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.Ec2ImagePipeline(scope: Construct, id: string, props: Ec2ImagePipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope in which to define this construct. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps</code> | Configuration properties. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer.parameter.id"></a>

- *Type:* string

The scoped construct ID.

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps

Configuration properties.

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

A pattern to build an EC2 Image Pipeline specifically for Linux.

This pattern contains opinionated code and features to help create a linux
pipeline. This pattern further simplifies setting up an image pipeline by
letting you choose specific operating systems and features.

The example below shows how you can configure an image that contains the AWS
CLI and retains the SSM agent on the image. The image will have a 100GB root
volume.

*Example*

```typescript
import { Ec2LinuxImagePipeline } from '@cdklabs/cdk-proserve-lib/patterns';

new Ec2LinuxImagePipeline(this, 'ImagePipeline', {
  version: '0.1.0',
  operatingSystem:
    Ec2LinuxImagePipeline.OperatingSystem.RED_HAT_ENTERPRISE_LINUX_8_9,
  rootVolumeSize: 100,
    buildConfiguration: {
      start: true,
      waitForCompletion: true
    },
  features: [
    Ec2LinuxImagePipeline.Feature.AWS_CLI,
    Ec2LinuxImagePipeline.Feature.RETAIN_SSM_AGENT
  ]
);
```


#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer"></a>

```typescript
import { patterns } from '@cdklabs/cdk-proserve-lib'

new patterns.Ec2LinuxImagePipeline(scope: Construct, id: string, props: Ec2LinuxImagePipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope in which to define this construct. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps</code> | Configuration properties. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer.parameter.id"></a>

- *Type:* string

The scoped construct ID.

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipeline.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps

Configuration properties.

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

The Friendly Embrace construct can be used to remove CloudFormation stack dependencies that are based on stack exports and imports.

🚨 WARNING: This construct is experimental and will directly modify
CloudFormation stacks in your CDK application via a Lambda-backed Custom
Resource. It is not recommended to use this construct in a production
environment.

A custom resource that is designed to remove the "Deadly Embrace" problem that
occurs when you attempt to update a CloudFormation stack that is exporting
a resource used by another stack. This custom resource will run before all of
your stacks deploy/update and remove the dependencies by hardcoding each
export for all stacks that use it. For this reason, this construct should run
inside of its own stack and should be the last stack that is instantiated for
your application. That way the construct will be able to retrieve all of the
stacks from your CDK resource tree that it needs to update.

> NOTE: You may need to add more permissions to the handler if the custom
resource cannot update your stacks. You can call upon the `handler` property
of the class to add more permissions to it.

*Example*

```typescript
import { App, Stack } from 'aws-cdk-lib';
import { FriendlyEmbrace } from '@cdklabs/cdk-proserve-lib/constructs';

const app = new App();
// ... other stack definitions
const embrace = new Stack(app, 'FriendlyEmbrace'); // last stack
new FriendlyEmbrace(embrace, 'FriendlyEmbrace'); // only construct in stack
```


#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.FriendlyEmbrace(scope: Construct, id: string, props?: FriendlyEmbraceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope in which to define this construct. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer.parameter.id">id</a></code> | <code>string</code> | The construct ID. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps</code> | Configuration properties. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer.parameter.id"></a>

- *Type:* string

The construct ID.

---

##### `props`<sup>Optional</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbrace.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps

Configuration properties.

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


### IamServerCertificate <a name="IamServerCertificate" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate"></a>

A construct that creates a Custom Resource to manage an AWS Identity and Access Management Server Certificate for use in regions/partitions where AWS Certificate Manager is not available.

This construct allows you to create an IAM Server Certificate using a certificate and private key stored in either
AWS Systems Manager Parameter Store or AWS Secrets Manager. It uses a Custom Resource to manage the lifecycle of the
server certificate.

The construct also handles encryption for the framework resources using either a provided KMS key or an
AWS managed key.

*Example*

```typescript
import { Key } from 'aws-cdk-lib/aws-kms';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { IamServerCertificate } from '@cdklabs/cdk-proserve-lib/constructs';

const keyArn = 'arn:aws:kms:us-east-1:111111111111:key/sample-key-id';
const key = Key.fromKeyArn(this, 'Encryption', keyArn);

const certificateData = StringParameter.fromSecureStringParameterAttributes(this, 'CertificateData', {
     parameterName: 'sample-parameter',
     encryptionKey: key
});

const privateKeyData = Secret.fromSecretAttributes(this, 'PrivateKeySecret', {
     encryptionKey: key,
     secretCompleteArn: 'arn:aws:secretsmanager:us-east-1:111111111111:secret:PrivateKeySecret-aBc123'
});

const certificate = new IamServerCertificate(this, 'ServerCertificate', {
     certificate: {
         parameter: certificateData,
         encryption: key
     },
     privateKey: {
         secret: privateKeyData,
         encryption: key
     },
     prefix: 'myapp'
});
```


#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.IamServerCertificate(scope: Construct, id: string, props: IamServerCertificateProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | Parent to which the Custom Resource belongs. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.Initializer.parameter.id">id</a></code> | <code>string</code> | Unique identifier for this instance. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps</code> | Metadata for configuring the Custom Resource. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

Parent to which the Custom Resource belongs.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.Initializer.parameter.id"></a>

- *Type:* string

Unique identifier for this instance.

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps

Metadata for configuring the Custom Resource.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

constructs.IamServerCertificate.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.property.arn">arn</a></code> | <code>string</code> | ARN for the created AWS IAM Server Certificate. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.property.arn"></a>

```typescript
public readonly arn: string;
```

- *Type:* string

ARN for the created AWS IAM Server Certificate.

---


### NetworkFirewall <a name="NetworkFirewall" id="@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall"></a>

Creates an AWS Network Firewall using a user-supplied Suricata rules file in a VPC.

Follows guidelines that can be found at:

> [https://aws.github.io/aws-security-services-best-practices/guides/network-firewall/](https://aws.github.io/aws-security-services-best-practices/guides/network-firewall/)

*Example*

```typescript
import { NetworkFirewall } from '@cdklabs/cdk-proserve-lib/constructs';

new NetworkFirewall(this, 'Firewall', {
  vpc,
  firewallSubnets: vpc.selectSubnets({subnetGroupName: 'firewall'}).subnets,
  suricataRulesFilePath: './firewall-rules-suricata.txt',
  suricataRulesCapacity: 1000  // perform your own calculation based on the rules
});
```


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

Retrieves Network Firewall endpoints so that you can reference them in your other resources.

Uses an AWS Custom Resource to fetch endpoint information from the Network
Firewall service. This is useful so that you can both create a Network
Firewall and reference the endpoints it creates, to do things like configure
routing to the firewall.

*Example*

```typescript
import { CfnOutput } from 'aws-cdk-lib';
import { NetworkFirewallEndpoints } from '@cdklabs/cdk-proserve-lib/constructs';

const endpoints = new NetworkFirewallEndpoints(this, 'Endpoints', {
  firewall: cfnFirewall,  // CfnFirewall resource to find endpoints for
});
const az1EndpointId = endpoints.getEndpointId('us-east-1a');
const az2EndpointId = endpoints.getEndpointId('us-east-1b');
new CfnOutput(this, 'Az1EndpointId', { value: az1Endpoint });
new CfnOutput(this, 'Az2EndpointId', { value: az2Endpoint });
```


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

*Example*

```typescript
import { Key } from 'aws-cdk-lib/aws-kms';
import { Domain } from 'aws-cdk-lib/aws-opensearchservice';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { OpenSearchAdminUser } from '@cdklabs/cdk-proserve-lib/constructs';

const keyArn = 'arn:aws:kms:us-east-1:111111111111:key/sample-key-id';
const key = Key.fromKeyArn(this, 'Encryption', keyArn);

const adminCredential = StringParameter.fromSecureStringParameterAttributes(this, 'AdminCredential', {
     parameterName: 'sample-parameter',
     encryptionKey: key
});

const domainKeyArn = 'arn:aws:kms:us-east-1:111111111111:key/sample-domain-key-id';
const domainKey = Key.fromKeyArn(this, 'DomainEncryption', domainKeyArn);
const domain = Domain.fromDomainEndpoint(this, 'Domain', 'vpc-testdomain.us-east-1.es.amazonaws.com');

const adminUser = new OpenSearchAdminUser(this, 'AdminUser', {
     credential: {
         secret: adminCredential,
         encryption: key
     },
     domain: domain,
     domainKey: domainKey,
     username: 'admin'
});
```


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


### S3BucketCors <a name="S3BucketCors" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors"></a>

A construct that creates a Custom Resource to manage CORS rules on an **existing** Amazon S3 bucket.

When creating
new Amazon S3 buckets via CDK, it is recommended to instead use the `cors` property in the construct props for
specifying CORS rules.

This Custom Resource works by requiring each and every CORS rule specified has a unique ID. This is used to
deconflict rules that are provided via this Custom Resource from CORS rules that may already exist on the existing
bucket. This Custom Resource is only destructive (modifies or deletes) for CORS rules that it creates - it will not
modify or delete existing CORS rules.

*Example*

```typescript
import { Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { S3BucketCors } from '@cdklabs/cdk-proserve-lib/constructs';

const existingBucket = Bucket.fromBucketName(this, 'Store', 'amzn-s3-demo-bucket');

new S3BucketCors(this, 'Store-CORS', {
     bucket: existingBucket,
     corsRules: [
         {
             allowedMethods: [HttpMethods.PUT],
             allowedOrigins: 'https://example.com',
             id: 'AllowMultiPartUploadFromExample',
             allowedHeaders: ['*'],
             exposedHeaders: ['etag']
         }
     ]
});
```


#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.S3BucketCors(scope: Construct, id: string, props: S3BucketCorsProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | Parent to which the Custom Resource belongs. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.Initializer.parameter.id">id</a></code> | <code>string</code> | Unique identifier for this instance. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps</code> | Metadata for configuring the Custom Resource. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

Parent to which the Custom Resource belongs.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.Initializer.parameter.id"></a>

- *Type:* string

Unique identifier for this instance.

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps

Metadata for configuring the Custom Resource.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.isConstruct"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

constructs.S3BucketCors.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### WebApplicationFirewall <a name="WebApplicationFirewall" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall"></a>

Creates an AWS Web Application Firewall (WAF) that can be associated with resources such as an Application Load Balancer.

It allows configuring AWS managed rule groups, logging, and visibility
settings. The construct simplifies the creation of a WAF by providing
available AWS managed rule groups that can be utilized.

Currently, the only resource that is supported to associate the WAF with is
an ALB.

*Example*

```typescript
import { ApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { WebApplicationFirewall } from '@cdklabs/cdk-proserve-lib/constructs';

const alb = new ApplicationLoadBalancer(this, 'Alb', { vpc });
const waf = new WebApplicationFirewall(this, 'WAF', {
  awsManagedRuleGroups: [
    WebApplicationFirewall.AwsManagedRuleGroup.COMMON_RULE_SET,
    WebApplicationFirewall.AwsManagedRuleGroup.LINUX_RULE_SET
  ]
});
waf.associate(alb);  // Associate the WAF with the ALB
```


#### Initializers <a name="Initializers" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

new constructs.WebApplicationFirewall(scope: Construct, id: string, props?: WebApplicationFirewallProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope in which to define this construct. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer.parameter.props">props</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps</code> | Configuration properties. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer.parameter.id"></a>

- *Type:* string

The scoped construct ID.

---

##### `props`<sup>Optional</sup> <a name="props" id="@cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewall.Initializer.parameter.props"></a>

- *Type:* @cdklabs/cdk-proserve-lib.constructs.WebApplicationFirewallProps

Configuration properties.

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

### AwsCustomResourceLambdaConfiguration <a name="AwsCustomResourceLambdaConfiguration" id="@cdklabs/cdk-proserve-lib.types.AwsCustomResourceLambdaConfiguration"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.types.AwsCustomResourceLambdaConfiguration.Initializer"></a>

```typescript
import { types } from '@cdklabs/cdk-proserve-lib'

const awsCustomResourceLambdaConfiguration: types.AwsCustomResourceLambdaConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsCustomResourceLambdaConfiguration.property.subnets">subnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Optional subnet selection for the Lambda functions. |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsCustomResourceLambdaConfiguration.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC where the Lambda functions will be deployed. |

---

##### `subnets`<sup>Optional</sup> <a name="subnets" id="@cdklabs/cdk-proserve-lib.types.AwsCustomResourceLambdaConfiguration.property.subnets"></a>

```typescript
public readonly subnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

Optional subnet selection for the Lambda functions.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@cdklabs/cdk-proserve-lib.types.AwsCustomResourceLambdaConfiguration.property.vpc"></a>

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

### CorsRule <a name="CorsRule" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule"></a>

Specifies a cross-origin access rule for an Amazon S3 bucket.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const corsRule: constructs.S3BucketCors.CorsRule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule.property.allowedMethods">allowedMethods</a></code> | <code>aws-cdk-lib.aws_s3.HttpMethods[]</code> | An HTTP method that you allow the origin to execute. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule.property.allowedOrigins">allowedOrigins</a></code> | <code>string[]</code> | One or more origins you want customers to be able to access the bucket from. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule.property.id">id</a></code> | <code>string</code> | A unique identifier for this rule. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule.property.allowedHeaders">allowedHeaders</a></code> | <code>string[]</code> | Headers that are specified in the Access-Control-Request-Headers header. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule.property.exposedHeaders">exposedHeaders</a></code> | <code>string[]</code> | One or more headers in the response that you want customers to be able to access from their applications. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule.property.maxAge">maxAge</a></code> | <code>number</code> | The time in seconds that your browser is to cache the preflight response for the specified resource. |

---

##### `allowedMethods`<sup>Required</sup> <a name="allowedMethods" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule.property.allowedMethods"></a>

```typescript
public readonly allowedMethods: HttpMethods[];
```

- *Type:* aws-cdk-lib.aws_s3.HttpMethods[]

An HTTP method that you allow the origin to execute.

---

##### `allowedOrigins`<sup>Required</sup> <a name="allowedOrigins" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule.property.allowedOrigins"></a>

```typescript
public readonly allowedOrigins: string[];
```

- *Type:* string[]

One or more origins you want customers to be able to access the bucket from.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

A unique identifier for this rule.

---

##### `allowedHeaders`<sup>Optional</sup> <a name="allowedHeaders" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule.property.allowedHeaders"></a>

```typescript
public readonly allowedHeaders: string[];
```

- *Type:* string[]
- *Default:* No headers allowed.

Headers that are specified in the Access-Control-Request-Headers header.

---

##### `exposedHeaders`<sup>Optional</sup> <a name="exposedHeaders" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule.property.exposedHeaders"></a>

```typescript
public readonly exposedHeaders: string[];
```

- *Type:* string[]
- *Default:* No headers exposed.

One or more headers in the response that you want customers to be able to access from their applications.

---

##### `maxAge`<sup>Optional</sup> <a name="maxAge" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule.property.maxAge"></a>

```typescript
public readonly maxAge: number;
```

- *Type:* number
- *Default:* No caching.

The time in seconds that your browser is to cache the preflight response for the specified resource.

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
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderGetImageProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.types.AwsCustomResourceLambdaConfiguration</code> | Optional Lambda configuration settings. |

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

- *Type:* @cdklabs/cdk-proserve-lib.types.AwsCustomResourceLambdaConfiguration

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
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImageBuilderStartProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.types.LambdaConfiguration</code> | Optional Lambda configuration settings. |
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

- *Type:* @cdklabs/cdk-proserve-lib.types.LambdaConfiguration

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
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineBaseProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.types.LambdaConfiguration</code> | Optional Lambda configuration settings. |
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

- *Type:* @cdklabs/cdk-proserve-lib.types.LambdaConfiguration

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
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipelineProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.types.LambdaConfiguration</code> | Optional Lambda configuration settings. |
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

- *Type:* @cdklabs/cdk-proserve-lib.types.LambdaConfiguration

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
- *Default:* AmazonLinux2023

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
| <code><a href="#@cdklabs/cdk-proserve-lib.patterns.Ec2LinuxImagePipelineProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.types.LambdaConfiguration</code> | Optional Lambda configuration settings. |
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

- *Type:* @cdklabs/cdk-proserve-lib.types.LambdaConfiguration

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
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.FriendlyEmbraceProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.types.LambdaConfiguration</code> | Optional Lambda configuration settings. |

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

- *Type:* @cdklabs/cdk-proserve-lib.types.LambdaConfiguration

Optional Lambda configuration settings.

---

### IamServerCertificateProps <a name="IamServerCertificateProps" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps"></a>

Properties for the IamServerCertificate construct.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const iamServerCertificateProps: constructs.IamServerCertificateProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps.property.certificate">certificate</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.ParameterProps \| @cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.SecretProps</code> | AWS Systems Manager parameter or AWS Secrets Manager secret which contains the public certificate. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps.property.prefix">prefix</a></code> | <code>string</code> | Prefix to prepend to the AWS IAM Server Certificate name. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps.property.privateKey">privateKey</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.ParameterProps \| @cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.SecretProps</code> | AWS Systems Manager parameter or AWS Secrets Manager secret which contains the private key. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Encryption key for protecting the framework resources. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.types.LambdaConfiguration</code> | Optional Lambda configuration settings. |

---

##### `certificate`<sup>Required</sup> <a name="certificate" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps.property.certificate"></a>

```typescript
public readonly certificate: ParameterProps | SecretProps;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.ParameterProps | @cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.SecretProps

AWS Systems Manager parameter or AWS Secrets Manager secret which contains the public certificate.

---

##### `prefix`<sup>Required</sup> <a name="prefix" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string

Prefix to prepend to the AWS IAM Server Certificate name.

---

##### `privateKey`<sup>Required</sup> <a name="privateKey" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps.property.privateKey"></a>

```typescript
public readonly privateKey: ParameterProps | SecretProps;
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.ParameterProps | @cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.SecretProps

AWS Systems Manager parameter or AWS Secrets Manager secret which contains the private key.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Encryption key for protecting the framework resources.

---

##### `lambdaConfiguration`<sup>Optional</sup> <a name="lambdaConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificateProps.property.lambdaConfiguration"></a>

```typescript
public readonly lambdaConfiguration: LambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve-lib.types.LambdaConfiguration

Optional Lambda configuration settings.

---

### LambdaConfiguration <a name="LambdaConfiguration" id="@cdklabs/cdk-proserve-lib.types.LambdaConfiguration"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.types.LambdaConfiguration.Initializer"></a>

```typescript
import { types } from '@cdklabs/cdk-proserve-lib'

const lambdaConfiguration: types.LambdaConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.LambdaConfiguration.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | Optional SQS queue to use as a dead letter queue. |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.LambdaConfiguration.property.logGroupRetention">logGroupRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | Optional retention period for the Lambda functions log group. |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.LambdaConfiguration.property.reservedConcurrentExecutions">reservedConcurrentExecutions</a></code> | <code>number</code> | The number of concurrent executions for the provider Lambda function. |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.LambdaConfiguration.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | Security groups to attach to the provider Lambda functions. |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.LambdaConfiguration.property.subnets">subnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Optional subnet selection for the Lambda functions. |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.LambdaConfiguration.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC where the Lambda functions will be deployed. |

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="@cdklabs/cdk-proserve-lib.types.LambdaConfiguration.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue

Optional SQS queue to use as a dead letter queue.

---

##### `logGroupRetention`<sup>Optional</sup> <a name="logGroupRetention" id="@cdklabs/cdk-proserve-lib.types.LambdaConfiguration.property.logGroupRetention"></a>

```typescript
public readonly logGroupRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* RetentionDays.ONE_MONTH

Optional retention period for the Lambda functions log group.

---

##### `reservedConcurrentExecutions`<sup>Optional</sup> <a name="reservedConcurrentExecutions" id="@cdklabs/cdk-proserve-lib.types.LambdaConfiguration.property.reservedConcurrentExecutions"></a>

```typescript
public readonly reservedConcurrentExecutions: number;
```

- *Type:* number

The number of concurrent executions for the provider Lambda function.

Default: 5

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@cdklabs/cdk-proserve-lib.types.LambdaConfiguration.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

Security groups to attach to the provider Lambda functions.

---

##### `subnets`<sup>Optional</sup> <a name="subnets" id="@cdklabs/cdk-proserve-lib.types.LambdaConfiguration.property.subnets"></a>

```typescript
public readonly subnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

Optional subnet selection for the Lambda functions.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@cdklabs/cdk-proserve-lib.types.LambdaConfiguration.property.vpc"></a>

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
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewallEndpointsProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.types.AwsCustomResourceLambdaConfiguration</code> | Optional Lambda configuration settings. |

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

- *Type:* @cdklabs/cdk-proserve-lib.types.AwsCustomResourceLambdaConfiguration

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
for the provided subnets. This should be used with caution and you should
double check the routing is correct prior to deployment.

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
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.NetworkFirewall.NetworkFirewallVpcRouteProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.types.AwsCustomResourceLambdaConfiguration</code> | Configuration for the Lambda function that will be used to retrieve info about the AWS Network Firewall in order to setup the routing. |
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

- *Type:* @cdklabs/cdk-proserve-lib.types.AwsCustomResourceLambdaConfiguration

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
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUserProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.types.LambdaConfiguration</code> | Optional Lambda configuration settings. |

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

- *Type:* @cdklabs/cdk-proserve-lib.types.LambdaConfiguration

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

### ParameterProps <a name="ParameterProps" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.ParameterProps"></a>

Properties for a server certificate element when it is stored in AWS Systems Manager Parameter Store.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.ParameterProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const parameterProps: constructs.IamServerCertificate.ParameterProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.ParameterProps.property.parameter">parameter</a></code> | <code>aws-cdk-lib.aws_ssm.IParameter</code> | Reference to the AWS Systems Manager Parameter Store parameter that contains the data. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.ParameterProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional encryption key that protects the secret. |

---

##### `parameter`<sup>Required</sup> <a name="parameter" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.ParameterProps.property.parameter"></a>

```typescript
public readonly parameter: IParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IParameter

Reference to the AWS Systems Manager Parameter Store parameter that contains the data.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.ParameterProps.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional encryption key that protects the secret.

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
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordParameterProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional encryption key that protects the secret. |

---

##### `parameter`<sup>Required</sup> <a name="parameter" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordParameterProps.property.parameter"></a>

```typescript
public readonly parameter: IParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IParameter

Reference to the AWS Systems Manager Parameter Store parameter that contains the admin credential.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.constructs.OpenSearchAdminUser.PasswordParameterProps.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional encryption key that protects the secret.

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

### S3BucketCorsProps <a name="S3BucketCorsProps" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps"></a>

Input metadata for the custom resource.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const s3BucketCorsProps: constructs.S3BucketCorsProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | Amazon S3 Bucket on which to modify CORS rules. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps.property.corsRules">corsRules</a></code> | <code>@cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule[]</code> | Cross-origin access rules to apply to the Amazon S3 bucket. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Encryption key for protecting the framework resources. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps.property.lambdaConfiguration">lambdaConfiguration</a></code> | <code>@cdklabs/cdk-proserve-lib.types.LambdaConfiguration</code> | Optional Lambda configuration settings. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps.property.region">region</a></code> | <code>string</code> | Optional AWS region to which the bucket is deployed If not specified, it is assumed the bucket exists in the same region. |

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps.property.bucket"></a>

```typescript
public readonly bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

Amazon S3 Bucket on which to modify CORS rules.

---

##### `corsRules`<sup>Optional</sup> <a name="corsRules" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps.property.corsRules"></a>

```typescript
public readonly corsRules: CorsRule[];
```

- *Type:* @cdklabs/cdk-proserve-lib.constructs.S3BucketCors.CorsRule[]

Cross-origin access rules to apply to the Amazon S3 bucket.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps.property.encryption"></a>

```typescript
public readonly encryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Encryption key for protecting the framework resources.

---

##### `lambdaConfiguration`<sup>Optional</sup> <a name="lambdaConfiguration" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps.property.lambdaConfiguration"></a>

```typescript
public readonly lambdaConfiguration: LambdaConfiguration;
```

- *Type:* @cdklabs/cdk-proserve-lib.types.LambdaConfiguration

Optional Lambda configuration settings.

---

##### `region`<sup>Optional</sup> <a name="region" id="@cdklabs/cdk-proserve-lib.constructs.S3BucketCorsProps.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

Optional AWS region to which the bucket is deployed If not specified, it is assumed the bucket exists in the same region.

---

### SecretProps <a name="SecretProps" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.SecretProps"></a>

Properties for a server certificate element when it is stored in AWS Secrets Manager.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.SecretProps.Initializer"></a>

```typescript
import { constructs } from '@cdklabs/cdk-proserve-lib'

const secretProps: constructs.IamServerCertificate.SecretProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.SecretProps.property.secret">secret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | Reference to the AWS Secrets Manager secret that contains the data. |
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.SecretProps.property.encryption">encryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional encryption key that protects the secret. |

---

##### `secret`<sup>Required</sup> <a name="secret" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.SecretProps.property.secret"></a>

```typescript
public readonly secret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

Reference to the AWS Secrets Manager secret that contains the data.

---

##### `encryption`<sup>Optional</sup> <a name="encryption" id="@cdklabs/cdk-proserve-lib.constructs.IamServerCertificate.SecretProps.property.encryption"></a>

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

Sets a user specified Removal Policy to all resources that the aspect applies to.

This Aspect is useful if you want to enforce a specified removal policy on
resources. For example, you could ensure that your removal policy is always
set to RETAIN or DESTROY.

*Example*

```typescript
import { App, Aspects, RemovalPolicy } from 'aws-cdk-lib';
import { ApplyRemovalPolicy } from '@cdklabs/cdk-proserve-lib/aspects';

const app = new App();

Aspects.of(app).add(
  new ApplyRemovalPolicy({ removalPolicy: RemovalPolicy.DESTROY })
);
```


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




### AwsManagedPolicy <a name="AwsManagedPolicy" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy"></a>

AWS Managed Policy.




#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ADMINISTRATOR_ACCESS">ADMINISTRATOR_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ADMINISTRATOR_ACCESS_AMPLIFY">ADMINISTRATOR_ACCESS_AMPLIFY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ADMINISTRATOR_ACCESS_AWS_ELASTIC_BEANSTALK">ADMINISTRATOR_ACCESS_AWS_ELASTIC_BEANSTALK</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AI_OPS_ASSISTANT_POLICY">AI_OPS_ASSISTANT_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AI_OPS_CONSOLE_ADMIN_POLICY">AI_OPS_CONSOLE_ADMIN_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AI_OPS_OPERATOR_ACCESS">AI_OPS_OPERATOR_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AI_OPS_READ_ONLY_ACCESS">AI_OPS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ALEXA_FOR_BUSINESS_DEVICE_SETUP">ALEXA_FOR_BUSINESS_DEVICE_SETUP</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ALEXA_FOR_BUSINESS_FULL_ACCESS">ALEXA_FOR_BUSINESS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ALEXA_FOR_BUSINESS_GATEWAY_EXECUTION">ALEXA_FOR_BUSINESS_GATEWAY_EXECUTION</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ALEXA_FOR_BUSINESS_LIFESIZE_DELEGATED_ACCESS_POLICY">ALEXA_FOR_BUSINESS_LIFESIZE_DELEGATED_ACCESS_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ALEXA_FOR_BUSINESS_POLY_DELEGATED_ACCESS_POLICY">ALEXA_FOR_BUSINESS_POLY_DELEGATED_ACCESS_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ALEXA_FOR_BUSINESS_READ_ONLY_ACCESS">ALEXA_FOR_BUSINESS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_API_GATEWAY_ADMINISTRATOR">AMAZON_API_GATEWAY_ADMINISTRATOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_API_GATEWAY_INVOKE_FULL_ACCESS">AMAZON_API_GATEWAY_INVOKE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_APP_FLOW_FULL_ACCESS">AMAZON_APP_FLOW_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_APP_FLOW_READ_ONLY_ACCESS">AMAZON_APP_FLOW_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_APP_STREAM_FULL_ACCESS">AMAZON_APP_STREAM_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_APP_STREAM_READ_ONLY_ACCESS">AMAZON_APP_STREAM_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ATHENA_FULL_ACCESS">AMAZON_ATHENA_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_AUGMENTED_AI_FULL_ACCESS">AMAZON_AUGMENTED_AI_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_AUGMENTED_AI_HUMAN_LOOP_FULL_ACCESS">AMAZON_AUGMENTED_AI_HUMAN_LOOP_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_AUGMENTED_AI_INTEGRATED_API_ACCESS">AMAZON_AUGMENTED_AI_INTEGRATED_API_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_AURORA_DSQL_CONSOLE_FULL_ACCESS">AMAZON_AURORA_DSQL_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_AURORA_DSQL_FULL_ACCESS">AMAZON_AURORA_DSQL_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_AURORA_DSQL_READ_ONLY_ACCESS">AMAZON_AURORA_DSQL_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_BEDROCK_FULL_ACCESS">AMAZON_BEDROCK_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_BEDROCK_READ_ONLY">AMAZON_BEDROCK_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_BEDROCK_STUDIO_PERMISSIONS_BOUNDARY">AMAZON_BEDROCK_STUDIO_PERMISSIONS_BOUNDARY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_BRAKET_FULL_ACCESS">AMAZON_BRAKET_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_BRAKET_JOBS_EXECUTION_POLICY">AMAZON_BRAKET_JOBS_EXECUTION_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CHIME_FULL_ACCESS">AMAZON_CHIME_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CHIME_READ_ONLY">AMAZON_CHIME_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CHIME_SDK">AMAZON_CHIME_SDK</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CHIME_USER_MANAGEMENT">AMAZON_CHIME_USER_MANAGEMENT</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CLOUD_DIRECTORY_FULL_ACCESS">AMAZON_CLOUD_DIRECTORY_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CLOUD_DIRECTORY_READ_ONLY_ACCESS">AMAZON_CLOUD_DIRECTORY_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CLOUD_WATCH_EVIDENTLY_FULL_ACCESS">AMAZON_CLOUD_WATCH_EVIDENTLY_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CLOUD_WATCH_EVIDENTLY_READ_ONLY_ACCESS">AMAZON_CLOUD_WATCH_EVIDENTLY_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CLOUD_WATCH_RUM_FULL_ACCESS">AMAZON_CLOUD_WATCH_RUM_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CLOUD_WATCH_RUM_READ_ONLY_ACCESS">AMAZON_CLOUD_WATCH_RUM_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_CATALYST_FULL_ACCESS">AMAZON_CODE_CATALYST_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_CATALYST_READ_ONLY_ACCESS">AMAZON_CODE_CATALYST_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_PROFILER_AGENT_ACCESS">AMAZON_CODE_GURU_PROFILER_AGENT_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_PROFILER_FULL_ACCESS">AMAZON_CODE_GURU_PROFILER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_PROFILER_READ_ONLY_ACCESS">AMAZON_CODE_GURU_PROFILER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_REVIEWER_FULL_ACCESS">AMAZON_CODE_GURU_REVIEWER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_REVIEWER_READ_ONLY_ACCESS">AMAZON_CODE_GURU_REVIEWER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_SECURITY_FULL_ACCESS">AMAZON_CODE_GURU_SECURITY_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_SECURITY_SCAN_ACCESS">AMAZON_CODE_GURU_SECURITY_SCAN_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_COGNITO_DEVELOPER_AUTHENTICATED_IDENTITIES">AMAZON_COGNITO_DEVELOPER_AUTHENTICATED_IDENTITIES</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_COGNITO_POWER_USER">AMAZON_COGNITO_POWER_USER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_COGNITO_READ_ONLY">AMAZON_COGNITO_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_COGNITO_UN_AUTHED_IDENTITIES_SESSION_POLICY">AMAZON_COGNITO_UN_AUTHED_IDENTITIES_SESSION_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_COGNITO_UNAUTHENTICATED_IDENTITIES">AMAZON_COGNITO_UNAUTHENTICATED_IDENTITIES</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CONNECT_FULL_ACCESS">AMAZON_CONNECT_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CONNECT_READ_ONLY_ACCESS">AMAZON_CONNECT_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CONNECT_VOICE_ID_FULL_ACCESS">AMAZON_CONNECT_VOICE_ID_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY">AMAZON_DATA_ZONE_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_FULL_ACCESS">AMAZON_DATA_ZONE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_FULL_USER_ACCESS">AMAZON_DATA_ZONE_FULL_USER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_REDSHIFT_GLUE_PROVISIONING_POLICY">AMAZON_DATA_ZONE_REDSHIFT_GLUE_PROVISIONING_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_SAGE_MAKER_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY">AMAZON_DATA_ZONE_SAGE_MAKER_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_SAGE_MAKER_MANAGE_ACCESS_ROLE_POLICY">AMAZON_DATA_ZONE_SAGE_MAKER_MANAGE_ACCESS_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_SAGE_MAKER_PROVISIONING_ROLE_POLICY">AMAZON_DATA_ZONE_SAGE_MAKER_PROVISIONING_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DETECTIVE_FULL_ACCESS">AMAZON_DETECTIVE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DETECTIVE_INVESTIGATOR_ACCESS">AMAZON_DETECTIVE_INVESTIGATOR_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DETECTIVE_MEMBER_ACCESS">AMAZON_DETECTIVE_MEMBER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DETECTIVE_ORGANIZATIONS_ACCESS">AMAZON_DETECTIVE_ORGANIZATIONS_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DEV_OPS_GURU_CONSOLE_FULL_ACCESS">AMAZON_DEV_OPS_GURU_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DEV_OPS_GURU_FULL_ACCESS">AMAZON_DEV_OPS_GURU_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DEV_OPS_GURU_ORGANIZATIONS_ACCESS">AMAZON_DEV_OPS_GURU_ORGANIZATIONS_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DEV_OPS_GURU_READ_ONLY_ACCESS">AMAZON_DEV_OPS_GURU_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DOC_DB_CONSOLE_FULL_ACCESS">AMAZON_DOC_DB_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DOC_DB_ELASTIC_FULL_ACCESS">AMAZON_DOC_DB_ELASTIC_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DOC_DB_ELASTIC_READ_ONLY_ACCESS">AMAZON_DOC_DB_ELASTIC_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DOC_DB_FULL_ACCESS">AMAZON_DOC_DB_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DOC_DB_READ_ONLY_ACCESS">AMAZON_DOC_DB_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DRSVPC_MANAGEMENT">AMAZON_DRSVPC_MANAGEMENT</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DYNAMO_DB_FULL_ACCESS">AMAZON_DYNAMO_DB_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DYNAMO_DB_FULL_ACCESSWITH_DATA_PIPELINE">AMAZON_DYNAMO_DB_FULL_ACCESSWITH_DATA_PIPELINE</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DYNAMO_DB_READ_ONLY_ACCESS">AMAZON_DYNAMO_DB_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_CONTAINER_REGISTRY_FULL_ACCESS">AMAZON_EC2_CONTAINER_REGISTRY_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_CONTAINER_REGISTRY_POWER_USER">AMAZON_EC2_CONTAINER_REGISTRY_POWER_USER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_CONTAINER_REGISTRY_PULL_ONLY">AMAZON_EC2_CONTAINER_REGISTRY_PULL_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_CONTAINER_REGISTRY_READ_ONLY">AMAZON_EC2_CONTAINER_REGISTRY_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_FULL_ACCESS">AMAZON_EC2_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_READ_ONLY_ACCESS">AMAZON_EC2_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_ROLE_POLICY_FOR_LAUNCH_WIZARD">AMAZON_EC2_ROLE_POLICY_FOR_LAUNCH_WIZARD</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ECS_FULL_ACCESS">AMAZON_ECS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ECS_INFRASTRUCTURE_ROLE_POLICY_FOR_VPC_LATTICE">AMAZON_ECS_INFRASTRUCTURE_ROLE_POLICY_FOR_VPC_LATTICE</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_BLOCK_STORAGE_POLICY">AMAZON_EKS_BLOCK_STORAGE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_CLUSTER_POLICY">AMAZON_EKS_CLUSTER_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_CNI_POLICY">AMAZON_EKS_CNI_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_COMPUTE_POLICY">AMAZON_EKS_COMPUTE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_FARGATE_POD_EXECUTION_ROLE_POLICY">AMAZON_EKS_FARGATE_POD_EXECUTION_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_LOAD_BALANCING_POLICY">AMAZON_EKS_LOAD_BALANCING_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_LOCAL_OUTPOST_CLUSTER_POLICY">AMAZON_EKS_LOCAL_OUTPOST_CLUSTER_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_NETWORKING_POLICY">AMAZON_EKS_NETWORKING_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_SERVICE_POLICY">AMAZON_EKS_SERVICE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_WORKER_NODE_MINIMAL_POLICY">AMAZON_EKS_WORKER_NODE_MINIMAL_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_WORKER_NODE_POLICY">AMAZON_EKS_WORKER_NODE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKSVPC_RESOURCE_CONTROLLER">AMAZON_EKSVPC_RESOURCE_CONTROLLER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTI_CACHE_FULL_ACCESS">AMAZON_ELASTI_CACHE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTI_CACHE_READ_ONLY_ACCESS">AMAZON_ELASTI_CACHE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_FULL_ACCESS">AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_POWER_USER">AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_POWER_USER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_READ_ONLY">AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_FULL_ACCESS">AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_ONLY_ACCESS">AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_WRITE_ACCESS">AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_WRITE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_FILE_SYSTEM_FULL_ACCESS">AMAZON_ELASTIC_FILE_SYSTEM_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_FILE_SYSTEM_READ_ONLY_ACCESS">AMAZON_ELASTIC_FILE_SYSTEM_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_FILE_SYSTEMS_UTILS">AMAZON_ELASTIC_FILE_SYSTEMS_UTILS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_MAP_REDUCE_FULL_ACCESS">AMAZON_ELASTIC_MAP_REDUCE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_MAP_REDUCE_PLACEMENT_GROUP_POLICY">AMAZON_ELASTIC_MAP_REDUCE_PLACEMENT_GROUP_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_MAP_REDUCE_READ_ONLY_ACCESS">AMAZON_ELASTIC_MAP_REDUCE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_TRANSCODER_FULL_ACCESS">AMAZON_ELASTIC_TRANSCODER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_TRANSCODER_JOBS_SUBMITTER">AMAZON_ELASTIC_TRANSCODER_JOBS_SUBMITTER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_TRANSCODER_READ_ONLY_ACCESS">AMAZON_ELASTIC_TRANSCODER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EMR_FULL_ACCESS_POLICY_V2">AMAZON_EMR_FULL_ACCESS_POLICY_V2</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EMR_READ_ONLY_ACCESS_POLICY_V2">AMAZON_EMR_READ_ONLY_ACCESS_POLICY_V2</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ES_COGNITO_ACCESS">AMAZON_ES_COGNITO_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ES_FULL_ACCESS">AMAZON_ES_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ES_READ_ONLY_ACCESS">AMAZON_ES_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_FULL_ACCESS">AMAZON_EVENT_BRIDGE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_PIPES_FULL_ACCESS">AMAZON_EVENT_BRIDGE_PIPES_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_PIPES_OPERATOR_ACCESS">AMAZON_EVENT_BRIDGE_PIPES_OPERATOR_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_PIPES_READ_ONLY_ACCESS">AMAZON_EVENT_BRIDGE_PIPES_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_READ_ONLY_ACCESS">AMAZON_EVENT_BRIDGE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_SCHEDULER_FULL_ACCESS">AMAZON_EVENT_BRIDGE_SCHEDULER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_SCHEDULER_READ_ONLY_ACCESS">AMAZON_EVENT_BRIDGE_SCHEDULER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_SCHEMAS_FULL_ACCESS">AMAZON_EVENT_BRIDGE_SCHEMAS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_SCHEMAS_READ_ONLY_ACCESS">AMAZON_EVENT_BRIDGE_SCHEMAS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_F_SX_CONSOLE_FULL_ACCESS">AMAZON_F_SX_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_F_SX_CONSOLE_READ_ONLY_ACCESS">AMAZON_F_SX_CONSOLE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_F_SX_FULL_ACCESS">AMAZON_F_SX_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_F_SX_READ_ONLY_ACCESS">AMAZON_F_SX_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_FORECAST_FULL_ACCESS">AMAZON_FORECAST_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_FRAUD_DETECTOR_FULL_ACCESS_POLICY">AMAZON_FRAUD_DETECTOR_FULL_ACCESS_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_FREE_RTOS_FULL_ACCESS">AMAZON_FREE_RTOS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_GLACIER_FULL_ACCESS">AMAZON_GLACIER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_GLACIER_READ_ONLY_ACCESS">AMAZON_GLACIER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_GUARD_DUTY_FULL_ACCESS">AMAZON_GUARD_DUTY_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_GUARD_DUTY_READ_ONLY_ACCESS">AMAZON_GUARD_DUTY_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HEALTH_LAKE_FULL_ACCESS">AMAZON_HEALTH_LAKE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HEALTH_LAKE_READ_ONLY_ACCESS">AMAZON_HEALTH_LAKE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HONEYCODE_FULL_ACCESS">AMAZON_HONEYCODE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HONEYCODE_READ_ONLY_ACCESS">AMAZON_HONEYCODE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HONEYCODE_TEAM_ASSOCIATION_FULL_ACCESS">AMAZON_HONEYCODE_TEAM_ASSOCIATION_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HONEYCODE_TEAM_ASSOCIATION_READ_ONLY_ACCESS">AMAZON_HONEYCODE_TEAM_ASSOCIATION_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HONEYCODE_WORKBOOK_FULL_ACCESS">AMAZON_HONEYCODE_WORKBOOK_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HONEYCODE_WORKBOOK_READ_ONLY_ACCESS">AMAZON_HONEYCODE_WORKBOOK_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_INSPECTOR_FULL_ACCESS">AMAZON_INSPECTOR_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_INSPECTOR_READ_ONLY_ACCESS">AMAZON_INSPECTOR_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_INSPECTOR2_FULL_ACCESS">AMAZON_INSPECTOR2_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_INSPECTOR2_MANAGED_CIS_POLICY">AMAZON_INSPECTOR2_MANAGED_CIS_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_INSPECTOR2_READ_ONLY_ACCESS">AMAZON_INSPECTOR2_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KENDRA_FULL_ACCESS">AMAZON_KENDRA_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KENDRA_READ_ONLY_ACCESS">AMAZON_KENDRA_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KEYSPACES_FULL_ACCESS">AMAZON_KEYSPACES_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KEYSPACES_READ_ONLY_ACCESS">AMAZON_KEYSPACES_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KEYSPACES_READ_ONLY_ACCESS_V2">AMAZON_KEYSPACES_READ_ONLY_ACCESS_V2</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_ANALYTICS_FULL_ACCESS">AMAZON_KINESIS_ANALYTICS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_ANALYTICS_READ_ONLY">AMAZON_KINESIS_ANALYTICS_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_FIREHOSE_FULL_ACCESS">AMAZON_KINESIS_FIREHOSE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_FIREHOSE_READ_ONLY_ACCESS">AMAZON_KINESIS_FIREHOSE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_FULL_ACCESS">AMAZON_KINESIS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_READ_ONLY_ACCESS">AMAZON_KINESIS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_VIDEO_STREAMS_FULL_ACCESS">AMAZON_KINESIS_VIDEO_STREAMS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_VIDEO_STREAMS_READ_ONLY_ACCESS">AMAZON_KINESIS_VIDEO_STREAMS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LAUNCH_WIZARD_FULL_ACCESS_V2">AMAZON_LAUNCH_WIZARD_FULL_ACCESS_V2</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LEX_FULL_ACCESS">AMAZON_LEX_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LEX_READ_ONLY">AMAZON_LEX_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LEX_RUN_BOTS_ONLY">AMAZON_LEX_RUN_BOTS_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_EQUIPMENT_FULL_ACCESS">AMAZON_LOOKOUT_EQUIPMENT_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_EQUIPMENT_READ_ONLY_ACCESS">AMAZON_LOOKOUT_EQUIPMENT_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_METRICS_FULL_ACCESS">AMAZON_LOOKOUT_METRICS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_METRICS_READ_ONLY_ACCESS">AMAZON_LOOKOUT_METRICS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_VISION_CONSOLE_FULL_ACCESS">AMAZON_LOOKOUT_VISION_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_VISION_CONSOLE_READ_ONLY_ACCESS">AMAZON_LOOKOUT_VISION_CONSOLE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_VISION_FULL_ACCESS">AMAZON_LOOKOUT_VISION_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_VISION_READ_ONLY_ACCESS">AMAZON_LOOKOUT_VISION_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACHINE_LEARNING_BATCH_PREDICTIONS_ACCESS">AMAZON_MACHINE_LEARNING_BATCH_PREDICTIONS_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACHINE_LEARNING_CREATE_ONLY_ACCESS">AMAZON_MACHINE_LEARNING_CREATE_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACHINE_LEARNING_FULL_ACCESS">AMAZON_MACHINE_LEARNING_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACHINE_LEARNING_MANAGE_REAL_TIME_ENDPOINT_ONLY_ACCESS">AMAZON_MACHINE_LEARNING_MANAGE_REAL_TIME_ENDPOINT_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACHINE_LEARNING_READ_ONLY_ACCESS">AMAZON_MACHINE_LEARNING_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACHINE_LEARNING_REAL_TIME_PREDICTION_ONLY_ACCESS">AMAZON_MACHINE_LEARNING_REAL_TIME_PREDICTION_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACIE_FULL_ACCESS">AMAZON_MACIE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACIE_READ_ONLY_ACCESS">AMAZON_MACIE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MANAGED_BLOCKCHAIN_CONSOLE_FULL_ACCESS">AMAZON_MANAGED_BLOCKCHAIN_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MANAGED_BLOCKCHAIN_FULL_ACCESS">AMAZON_MANAGED_BLOCKCHAIN_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MANAGED_BLOCKCHAIN_READ_ONLY_ACCESS">AMAZON_MANAGED_BLOCKCHAIN_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MCS_FULL_ACCESS">AMAZON_MCS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MCS_READ_ONLY_ACCESS">AMAZON_MCS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MECHANICAL_TURK_FULL_ACCESS">AMAZON_MECHANICAL_TURK_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MECHANICAL_TURK_READ_ONLY">AMAZON_MECHANICAL_TURK_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MEMORY_DB_FULL_ACCESS">AMAZON_MEMORY_DB_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MEMORY_DB_READ_ONLY_ACCESS">AMAZON_MEMORY_DB_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MOBILE_ANALYTICS_FINANCIAL_REPORT_ACCESS">AMAZON_MOBILE_ANALYTICS_FINANCIAL_REPORT_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MOBILE_ANALYTICS_FULL_ACCESS">AMAZON_MOBILE_ANALYTICS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MOBILE_ANALYTICS_NON_FINANCIAL_REPORT_ACCESS">AMAZON_MOBILE_ANALYTICS_NON_FINANCIAL_REPORT_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MOBILE_ANALYTICS_WRITE_ONLY_ACCESS">AMAZON_MOBILE_ANALYTICS_WRITE_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MONITRON_FULL_ACCESS">AMAZON_MONITRON_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MQ_API_FULL_ACCESS">AMAZON_MQ_API_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MQ_API_READ_ONLY_ACCESS">AMAZON_MQ_API_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MQ_FULL_ACCESS">AMAZON_MQ_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MQ_READ_ONLY_ACCESS">AMAZON_MQ_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MSK_CONNECT_READ_ONLY_ACCESS">AMAZON_MSK_CONNECT_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MSK_FULL_ACCESS">AMAZON_MSK_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MSK_READ_ONLY_ACCESS">AMAZON_MSK_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_NIMBLE_STUDIO_LAUNCH_PROFILE_WORKER">AMAZON_NIMBLE_STUDIO_LAUNCH_PROFILE_WORKER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_NIMBLE_STUDIO_STUDIO_ADMIN">AMAZON_NIMBLE_STUDIO_STUDIO_ADMIN</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_NIMBLE_STUDIO_STUDIO_USER">AMAZON_NIMBLE_STUDIO_STUDIO_USER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OMICS_FULL_ACCESS">AMAZON_OMICS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OMICS_READ_ONLY_ACCESS">AMAZON_OMICS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ONE_ENTERPRISE_FULL_ACCESS">AMAZON_ONE_ENTERPRISE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ONE_ENTERPRISE_INSTALLER_ACCESS">AMAZON_ONE_ENTERPRISE_INSTALLER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ONE_ENTERPRISE_READ_ONLY_ACCESS">AMAZON_ONE_ENTERPRISE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OPEN_SEARCH_DIRECT_QUERY_GLUE_CREATE_ACCESS">AMAZON_OPEN_SEARCH_DIRECT_QUERY_GLUE_CREATE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OPEN_SEARCH_INGESTION_FULL_ACCESS">AMAZON_OPEN_SEARCH_INGESTION_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OPEN_SEARCH_INGESTION_READ_ONLY_ACCESS">AMAZON_OPEN_SEARCH_INGESTION_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OPEN_SEARCH_SERVICE_COGNITO_ACCESS">AMAZON_OPEN_SEARCH_SERVICE_COGNITO_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OPEN_SEARCH_SERVICE_FULL_ACCESS">AMAZON_OPEN_SEARCH_SERVICE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OPEN_SEARCH_SERVICE_READ_ONLY_ACCESS">AMAZON_OPEN_SEARCH_SERVICE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_POLLY_FULL_ACCESS">AMAZON_POLLY_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_POLLY_READ_ONLY_ACCESS">AMAZON_POLLY_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_PROMETHEUS_CONSOLE_FULL_ACCESS">AMAZON_PROMETHEUS_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_PROMETHEUS_FULL_ACCESS">AMAZON_PROMETHEUS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_PROMETHEUS_QUERY_ACCESS">AMAZON_PROMETHEUS_QUERY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_PROMETHEUS_REMOTE_WRITE_ACCESS">AMAZON_PROMETHEUS_REMOTE_WRITE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_Q_DEVELOPER_ACCESS">AMAZON_Q_DEVELOPER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_Q_FULL_ACCESS">AMAZON_Q_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_QLDB_CONSOLE_FULL_ACCESS">AMAZON_QLDB_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_QLDB_FULL_ACCESS">AMAZON_QLDB_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_QLDB_READ_ONLY">AMAZON_QLDB_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_RDS_CUSTOM_INSTANCE_PROFILE_ROLE_POLICY">AMAZON_RDS_CUSTOM_INSTANCE_PROFILE_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_RDS_DATA_FULL_ACCESS">AMAZON_RDS_DATA_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_RDS_FULL_ACCESS">AMAZON_RDS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_RDS_PERFORMANCE_INSIGHTS_FULL_ACCESS">AMAZON_RDS_PERFORMANCE_INSIGHTS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_RDS_PERFORMANCE_INSIGHTS_READ_ONLY">AMAZON_RDS_PERFORMANCE_INSIGHTS_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_RDS_READ_ONLY_ACCESS">AMAZON_RDS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_ALL_COMMANDS_FULL_ACCESS">AMAZON_REDSHIFT_ALL_COMMANDS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_DATA_FULL_ACCESS">AMAZON_REDSHIFT_DATA_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_FULL_ACCESS">AMAZON_REDSHIFT_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_QUERY_EDITOR">AMAZON_REDSHIFT_QUERY_EDITOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_QUERY_EDITOR_V2_FULL_ACCESS">AMAZON_REDSHIFT_QUERY_EDITOR_V2_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_QUERY_EDITOR_V2_NO_SHARING">AMAZON_REDSHIFT_QUERY_EDITOR_V2_NO_SHARING</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_SHARING">AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_SHARING</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_WRITE_SHARING">AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_WRITE_SHARING</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_READ_ONLY_ACCESS">AMAZON_REDSHIFT_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REKOGNITION_CUSTOM_LABELS_FULL_ACCESS">AMAZON_REKOGNITION_CUSTOM_LABELS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REKOGNITION_FULL_ACCESS">AMAZON_REKOGNITION_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REKOGNITION_READ_ONLY_ACCESS">AMAZON_REKOGNITION_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_AUTO_NAMING_FULL_ACCESS">AMAZON_ROUTE53_AUTO_NAMING_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_AUTO_NAMING_READ_ONLY_ACCESS">AMAZON_ROUTE53_AUTO_NAMING_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_AUTO_NAMING_REGISTRANT_ACCESS">AMAZON_ROUTE53_AUTO_NAMING_REGISTRANT_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_DOMAINS_FULL_ACCESS">AMAZON_ROUTE53_DOMAINS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_DOMAINS_READ_ONLY_ACCESS">AMAZON_ROUTE53_DOMAINS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_FULL_ACCESS">AMAZON_ROUTE53_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_PROFILES_FULL_ACCESS">AMAZON_ROUTE53_PROFILES_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_PROFILES_READ_ONLY_ACCESS">AMAZON_ROUTE53_PROFILES_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_READ_ONLY_ACCESS">AMAZON_ROUTE53_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RECOVERY_CLUSTER_FULL_ACCESS">AMAZON_ROUTE53_RECOVERY_CLUSTER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RECOVERY_CLUSTER_READ_ONLY_ACCESS">AMAZON_ROUTE53_RECOVERY_CLUSTER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_FULL_ACCESS">AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_READ_ONLY_ACCESS">AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RECOVERY_READINESS_FULL_ACCESS">AMAZON_ROUTE53_RECOVERY_READINESS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RECOVERY_READINESS_READ_ONLY_ACCESS">AMAZON_ROUTE53_RECOVERY_READINESS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RESOLVER_FULL_ACCESS">AMAZON_ROUTE53_RESOLVER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RESOLVER_READ_ONLY_ACCESS">AMAZON_ROUTE53_RESOLVER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_S3_FULL_ACCESS">AMAZON_S3_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_S3_OUTPOSTS_FULL_ACCESS">AMAZON_S3_OUTPOSTS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_S3_OUTPOSTS_READ_ONLY_ACCESS">AMAZON_S3_OUTPOSTS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_S3_READ_ONLY_ACCESS">AMAZON_S3_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_S3_TABLES_FULL_ACCESS">AMAZON_S3_TABLES_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_S3_TABLES_READ_ONLY_ACCESS">AMAZON_S3_TABLES_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_ADMIN_SERVICE_CATALOG_PRODUCTS_SERVICE_ROLE_POLICY">AMAZON_SAGE_MAKER_ADMIN_SERVICE_CATALOG_PRODUCTS_SERVICE_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CANVAS_AI_SERVICES_ACCESS">AMAZON_SAGE_MAKER_CANVAS_AI_SERVICES_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CANVAS_BEDROCK_ACCESS">AMAZON_SAGE_MAKER_CANVAS_BEDROCK_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CANVAS_DATA_PREP_FULL_ACCESS">AMAZON_SAGE_MAKER_CANVAS_DATA_PREP_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CANVAS_EMR_SERVERLESS_EXECUTION_ROLE_POLICY">AMAZON_SAGE_MAKER_CANVAS_EMR_SERVERLESS_EXECUTION_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CANVAS_FULL_ACCESS">AMAZON_SAGE_MAKER_CANVAS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CANVAS_SM_DATA_SCIENCE_ASSISTANT_ACCESS">AMAZON_SAGE_MAKER_CANVAS_SM_DATA_SCIENCE_ASSISTANT_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CLUSTER_INSTANCE_ROLE_POLICY">AMAZON_SAGE_MAKER_CLUSTER_INSTANCE_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_FEATURE_STORE_ACCESS">AMAZON_SAGE_MAKER_FEATURE_STORE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_FULL_ACCESS">AMAZON_SAGE_MAKER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_GROUND_TRUTH_EXECUTION">AMAZON_SAGE_MAKER_GROUND_TRUTH_EXECUTION</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_MECHANICAL_TURK_ACCESS">AMAZON_SAGE_MAKER_MECHANICAL_TURK_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_MODEL_GOVERNANCE_USE_ACCESS">AMAZON_SAGE_MAKER_MODEL_GOVERNANCE_USE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_MODEL_REGISTRY_FULL_ACCESS">AMAZON_SAGE_MAKER_MODEL_REGISTRY_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_PARTNER_APPS_FULL_ACCESS">AMAZON_SAGE_MAKER_PARTNER_APPS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_PIPELINES_INTEGRATIONS">AMAZON_SAGE_MAKER_PIPELINES_INTEGRATIONS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_READ_ONLY">AMAZON_SAGE_MAKER_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_SERVICE_CATALOG_PRODUCTS_CODE_BUILD_SERVICE_ROLE_POLICY">AMAZON_SAGE_MAKER_SERVICE_CATALOG_PRODUCTS_CODE_BUILD_SERVICE_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_TRAINING_PLAN_CREATE_ACCESS">AMAZON_SAGE_MAKER_TRAINING_PLAN_CREATE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SECURITY_LAKE_ADMINISTRATOR">AMAZON_SECURITY_LAKE_ADMINISTRATOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SECURITY_LAKE_PERMISSIONS_BOUNDARY">AMAZON_SECURITY_LAKE_PERMISSIONS_BOUNDARY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SES_FULL_ACCESS">AMAZON_SES_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SES_READ_ONLY_ACCESS">AMAZON_SES_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SNS_FULL_ACCESS">AMAZON_SNS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SNS_READ_ONLY_ACCESS">AMAZON_SNS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SQS_FULL_ACCESS">AMAZON_SQS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SQS_READ_ONLY_ACCESS">AMAZON_SQS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_AUTOMATION_APPROVER_ACCESS">AMAZON_SSM_AUTOMATION_APPROVER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_DIRECTORY_SERVICE_ACCESS">AMAZON_SSM_DIRECTORY_SERVICE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_FULL_ACCESS">AMAZON_SSM_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_MANAGED_EC2_INSTANCE_DEFAULT_POLICY">AMAZON_SSM_MANAGED_EC2_INSTANCE_DEFAULT_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_MANAGED_INSTANCE_CORE">AMAZON_SSM_MANAGED_INSTANCE_CORE</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_PATCH_ASSOCIATION">AMAZON_SSM_PATCH_ASSOCIATION</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_READ_ONLY_ACCESS">AMAZON_SSM_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TEXTRACT_FULL_ACCESS">AMAZON_TEXTRACT_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TIMESTREAM_CONSOLE_FULL_ACCESS">AMAZON_TIMESTREAM_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TIMESTREAM_FULL_ACCESS">AMAZON_TIMESTREAM_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TIMESTREAM_INFLUX_DB_FULL_ACCESS">AMAZON_TIMESTREAM_INFLUX_DB_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TIMESTREAM_READ_ONLY_ACCESS">AMAZON_TIMESTREAM_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TRANSCRIBE_FULL_ACCESS">AMAZON_TRANSCRIBE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TRANSCRIBE_READ_ONLY_ACCESS">AMAZON_TRANSCRIBE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VERIFIED_PERMISSIONS_FULL_ACCESS">AMAZON_VERIFIED_PERMISSIONS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VERIFIED_PERMISSIONS_READ_ONLY_ACCESS">AMAZON_VERIFIED_PERMISSIONS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VPC_CROSS_ACCOUNT_NETWORK_INTERFACE_OPERATIONS">AMAZON_VPC_CROSS_ACCOUNT_NETWORK_INTERFACE_OPERATIONS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VPC_FULL_ACCESS">AMAZON_VPC_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VPC_NETWORK_ACCESS_ANALYZER_FULL_ACCESS_POLICY">AMAZON_VPC_NETWORK_ACCESS_ANALYZER_FULL_ACCESS_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VPC_REACHABILITY_ANALYZER_FULL_ACCESS_POLICY">AMAZON_VPC_REACHABILITY_ANALYZER_FULL_ACCESS_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VPC_REACHABILITY_ANALYZER_PATH_COMPONENT_READ_POLICY">AMAZON_VPC_REACHABILITY_ANALYZER_PATH_COMPONENT_READ_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VPC_READ_ONLY_ACCESS">AMAZON_VPC_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_DOCS_FULL_ACCESS">AMAZON_WORK_DOCS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_DOCS_READ_ONLY_ACCESS">AMAZON_WORK_DOCS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_MAIL_FULL_ACCESS">AMAZON_WORK_MAIL_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_MAIL_MESSAGE_FLOW_FULL_ACCESS">AMAZON_WORK_MAIL_MESSAGE_FLOW_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_MAIL_MESSAGE_FLOW_READ_ONLY_ACCESS">AMAZON_WORK_MAIL_MESSAGE_FLOW_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_MAIL_READ_ONLY_ACCESS">AMAZON_WORK_MAIL_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_ADMIN">AMAZON_WORK_SPACES_ADMIN</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_APPLICATION_MANAGER_ADMIN_ACCESS">AMAZON_WORK_SPACES_APPLICATION_MANAGER_ADMIN_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_POOL_SERVICE_ACCESS">AMAZON_WORK_SPACES_POOL_SERVICE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_SECURE_BROWSER_READ_ONLY">AMAZON_WORK_SPACES_SECURE_BROWSER_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_SELF_SERVICE_ACCESS">AMAZON_WORK_SPACES_SELF_SERVICE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_SERVICE_ACCESS">AMAZON_WORK_SPACES_SERVICE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_THIN_CLIENT_FULL_ACCESS">AMAZON_WORK_SPACES_THIN_CLIENT_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_THIN_CLIENT_READ_ONLY_ACCESS">AMAZON_WORK_SPACES_THIN_CLIENT_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_WEB_READ_ONLY">AMAZON_WORK_SPACES_WEB_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORKSPACES_PCA_ACCESS">AMAZON_WORKSPACES_PCA_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ZOCALO_FULL_ACCESS">AMAZON_ZOCALO_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ZOCALO_READ_ONLY_ACCESS">AMAZON_ZOCALO_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AUTO_SCALING_CONSOLE_FULL_ACCESS">AUTO_SCALING_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AUTO_SCALING_CONSOLE_READ_ONLY_ACCESS">AUTO_SCALING_CONSOLE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AUTO_SCALING_FULL_ACCESS">AUTO_SCALING_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AUTO_SCALING_READ_ONLY_ACCESS">AUTO_SCALING_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ACCOUNT_ACTIVITY_ACCESS">AWS_ACCOUNT_ACTIVITY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ACCOUNT_MANAGEMENT_FULL_ACCESS">AWS_ACCOUNT_MANAGEMENT_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ACCOUNT_MANAGEMENT_READ_ONLY_ACCESS">AWS_ACCOUNT_MANAGEMENT_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ACCOUNT_USAGE_REPORT_ACCESS">AWS_ACCOUNT_USAGE_REPORT_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_AGENTLESS_DISCOVERY_SERVICE">AWS_AGENTLESS_DISCOVERY_SERVICE</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_FABRIC_FULL_ACCESS">AWS_APP_FABRIC_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_FABRIC_READ_ONLY_ACCESS">AWS_APP_FABRIC_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_MESH_ENVOY_ACCESS">AWS_APP_MESH_ENVOY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_MESH_FULL_ACCESS">AWS_APP_MESH_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_MESH_PREVIEW_ENVOY_ACCESS">AWS_APP_MESH_PREVIEW_ENVOY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_MESH_READ_ONLY">AWS_APP_MESH_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_RUNNER_FULL_ACCESS">AWS_APP_RUNNER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_RUNNER_READ_ONLY_ACCESS">AWS_APP_RUNNER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_SYNC_ADMINISTRATOR">AWS_APP_SYNC_ADMINISTRATOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_SYNC_INVOKE_FULL_ACCESS">AWS_APP_SYNC_INVOKE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_SYNC_SCHEMA_AUTHOR">AWS_APP_SYNC_SCHEMA_AUTHOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_DISCOVERY_AGENT_ACCESS">AWS_APPLICATION_DISCOVERY_AGENT_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_DISCOVERY_AGENTLESS_COLLECTOR_ACCESS">AWS_APPLICATION_DISCOVERY_AGENTLESS_COLLECTOR_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_DISCOVERY_SERVICE_FULL_ACCESS">AWS_APPLICATION_DISCOVERY_SERVICE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_AGENT_INSTALLATION_POLICY">AWS_APPLICATION_MIGRATION_AGENT_INSTALLATION_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_AGENT_POLICY">AWS_APPLICATION_MIGRATION_AGENT_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_EC2_ACCESS">AWS_APPLICATION_MIGRATION_EC2_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_FULL_ACCESS">AWS_APPLICATION_MIGRATION_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_READ_ONLY_ACCESS">AWS_APPLICATION_MIGRATION_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_SERVICE_EC2_INSTANCE_POLICY">AWS_APPLICATION_MIGRATION_SERVICE_EC2_INSTANCE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_SSM_ACCESS">AWS_APPLICATION_MIGRATION_SSM_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_V_CENTER_CLIENT_POLICY">AWS_APPLICATION_MIGRATION_V_CENTER_CLIENT_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ARTIFACT_AGREEMENTS_FULL_ACCESS">AWS_ARTIFACT_AGREEMENTS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ARTIFACT_AGREEMENTS_READ_ONLY_ACCESS">AWS_ARTIFACT_AGREEMENTS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ARTIFACT_REPORTS_READ_ONLY_ACCESS">AWS_ARTIFACT_REPORTS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_AUDIT_MANAGER_ADMINISTRATOR_ACCESS">AWS_AUDIT_MANAGER_ADMINISTRATOR_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_AUDIT_ACCESS">AWS_BACKUP_AUDIT_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_DATA_TRANSFER_ACCESS">AWS_BACKUP_DATA_TRANSFER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_FULL_ACCESS">AWS_BACKUP_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_OPERATOR_ACCESS">AWS_BACKUP_OPERATOR_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_ORGANIZATION_ADMIN_ACCESS">AWS_BACKUP_ORGANIZATION_ADMIN_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_RESTORE_ACCESS_FOR_SAPHANA">AWS_BACKUP_RESTORE_ACCESS_FOR_SAPHANA</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_INDEXING">AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_INDEXING</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_ITEM_RESTORES">AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_ITEM_RESTORES</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_BACKUP">AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_BACKUP</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_RESTORE">AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_RESTORE</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BATCH_FULL_ACCESS">AWS_BATCH_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BILLING_CONDUCTOR_FULL_ACCESS">AWS_BILLING_CONDUCTOR_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BILLING_CONDUCTOR_READ_ONLY_ACCESS">AWS_BILLING_CONDUCTOR_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BILLING_READ_ONLY_ACCESS">AWS_BILLING_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BUDGETS_ACTIONS_ROLE_POLICY_FOR_RESOURCE_ADMINISTRATION_WITH_SSM">AWS_BUDGETS_ACTIONS_ROLE_POLICY_FOR_RESOURCE_ADMINISTRATION_WITH_SSM</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BUDGETS_ACTIONS_WITH_AWS_RESOURCE_CONTROL_ACCESS">AWS_BUDGETS_ACTIONS_WITH_AWS_RESOURCE_CONTROL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BUDGETS_READ_ONLY_ACCESS">AWS_BUDGETS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BUG_BUST_FULL_ACCESS">AWS_BUG_BUST_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BUG_BUST_PLAYER_ACCESS">AWS_BUG_BUST_PLAYER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_FULL_ACCESS">AWS_CERTIFICATE_MANAGER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_PRIVATE_CA_AUDITOR">AWS_CERTIFICATE_MANAGER_PRIVATE_CA_AUDITOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_PRIVATE_CA_FULL_ACCESS">AWS_CERTIFICATE_MANAGER_PRIVATE_CA_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_PRIVATE_CA_PRIVILEGED_USER">AWS_CERTIFICATE_MANAGER_PRIVATE_CA_PRIVILEGED_USER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_PRIVATE_CA_READ_ONLY">AWS_CERTIFICATE_MANAGER_PRIVATE_CA_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_PRIVATE_CA_USER">AWS_CERTIFICATE_MANAGER_PRIVATE_CA_USER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_READ_ONLY">AWS_CERTIFICATE_MANAGER_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLEAN_ROOMS_FULL_ACCESS">AWS_CLEAN_ROOMS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLEAN_ROOMS_FULL_ACCESS_NO_QUERYING">AWS_CLEAN_ROOMS_FULL_ACCESS_NO_QUERYING</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLEAN_ROOMS_ML_FULL_ACCESS">AWS_CLEAN_ROOMS_ML_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLEAN_ROOMS_ML_READ_ONLY_ACCESS">AWS_CLEAN_ROOMS_ML_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLEAN_ROOMS_READ_ONLY_ACCESS">AWS_CLEAN_ROOMS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_FORMATION_FULL_ACCESS">AWS_CLOUD_FORMATION_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_FORMATION_READ_ONLY_ACCESS">AWS_CLOUD_FORMATION_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_HSM_FULL_ACCESS">AWS_CLOUD_HSM_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_HSM_READ_ONLY_ACCESS">AWS_CLOUD_HSM_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_MAP_DISCOVER_INSTANCE_ACCESS">AWS_CLOUD_MAP_DISCOVER_INSTANCE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_MAP_FULL_ACCESS">AWS_CLOUD_MAP_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_MAP_READ_ONLY_ACCESS">AWS_CLOUD_MAP_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_MAP_REGISTER_INSTANCE_ACCESS">AWS_CLOUD_MAP_REGISTER_INSTANCE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_SHELL_FULL_ACCESS">AWS_CLOUD_SHELL_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_TRAIL_FULL_ACCESS">AWS_CLOUD_TRAIL_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_TRAIL_READ_ONLY_ACCESS">AWS_CLOUD_TRAIL_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD9_ADMINISTRATOR">AWS_CLOUD9_ADMINISTRATOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD9_ENVIRONMENT_MEMBER">AWS_CLOUD9_ENVIRONMENT_MEMBER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD9_SSM_INSTANCE_PROFILE">AWS_CLOUD9_SSM_INSTANCE_PROFILE</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD9_USER">AWS_CLOUD9_USER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_ARTIFACT_ADMIN_ACCESS">AWS_CODE_ARTIFACT_ADMIN_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_ARTIFACT_READ_ONLY_ACCESS">AWS_CODE_ARTIFACT_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_BUILD_ADMIN_ACCESS">AWS_CODE_BUILD_ADMIN_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_BUILD_DEVELOPER_ACCESS">AWS_CODE_BUILD_DEVELOPER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_BUILD_READ_ONLY_ACCESS">AWS_CODE_BUILD_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_COMMIT_FULL_ACCESS">AWS_CODE_COMMIT_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_COMMIT_POWER_USER">AWS_CODE_COMMIT_POWER_USER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_COMMIT_READ_ONLY">AWS_CODE_COMMIT_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_DEPLOY_DEPLOYER_ACCESS">AWS_CODE_DEPLOY_DEPLOYER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_DEPLOY_FULL_ACCESS">AWS_CODE_DEPLOY_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_DEPLOY_READ_ONLY_ACCESS">AWS_CODE_DEPLOY_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_DEPLOY_ROLE_FOR_ECS">AWS_CODE_DEPLOY_ROLE_FOR_ECS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_DEPLOY_ROLE_FOR_ECS_LIMITED">AWS_CODE_DEPLOY_ROLE_FOR_ECS_LIMITED</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_PIPELINE_APPROVER_ACCESS">AWS_CODE_PIPELINE_APPROVER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_PIPELINE_CUSTOM_ACTION_ACCESS">AWS_CODE_PIPELINE_CUSTOM_ACTION_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_PIPELINE_FULL_ACCESS">AWS_CODE_PIPELINE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_PIPELINE_READ_ONLY_ACCESS">AWS_CODE_PIPELINE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_STAR_FULL_ACCESS">AWS_CODE_STAR_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_COMPROMISED_KEY_QUARANTINE">AWS_COMPROMISED_KEY_QUARANTINE</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_COMPROMISED_KEY_QUARANTINE_V2">AWS_COMPROMISED_KEY_QUARANTINE_V2</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_COMPROMISED_KEY_QUARANTINE_V3">AWS_COMPROMISED_KEY_QUARANTINE_V3</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CONFIG_USER_ACCESS">AWS_CONFIG_USER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CONNECTOR">AWS_CONNECTOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_EXCHANGE_DATA_GRANT_OWNER_FULL_ACCESS">AWS_DATA_EXCHANGE_DATA_GRANT_OWNER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_EXCHANGE_DATA_GRANT_RECEIVER_FULL_ACCESS">AWS_DATA_EXCHANGE_DATA_GRANT_RECEIVER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_EXCHANGE_FULL_ACCESS">AWS_DATA_EXCHANGE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_EXCHANGE_PROVIDER_FULL_ACCESS">AWS_DATA_EXCHANGE_PROVIDER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_EXCHANGE_READ_ONLY">AWS_DATA_EXCHANGE_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_EXCHANGE_SUBSCRIBER_FULL_ACCESS">AWS_DATA_EXCHANGE_SUBSCRIBER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_PIPELINE_FULL_ACCESS">AWS_DATA_PIPELINE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_PIPELINE_POWER_USER">AWS_DATA_PIPELINE_POWER_USER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_SYNC_FULL_ACCESS">AWS_DATA_SYNC_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_SYNC_READ_ONLY_ACCESS">AWS_DATA_SYNC_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEADLINE_CLOUD_FLEET_WORKER">AWS_DEADLINE_CLOUD_FLEET_WORKER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEADLINE_CLOUD_USER_ACCESS_FARMS">AWS_DEADLINE_CLOUD_USER_ACCESS_FARMS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEADLINE_CLOUD_USER_ACCESS_FLEETS">AWS_DEADLINE_CLOUD_USER_ACCESS_FLEETS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEADLINE_CLOUD_USER_ACCESS_JOBS">AWS_DEADLINE_CLOUD_USER_ACCESS_JOBS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEADLINE_CLOUD_USER_ACCESS_QUEUES">AWS_DEADLINE_CLOUD_USER_ACCESS_QUEUES</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEADLINE_CLOUD_WORKER_HOST">AWS_DEADLINE_CLOUD_WORKER_HOST</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEEP_LENS_LAMBDA_FUNCTION_ACCESS_POLICY">AWS_DEEP_LENS_LAMBDA_FUNCTION_ACCESS_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEEP_RACER_ACCOUNT_ADMIN_ACCESS">AWS_DEEP_RACER_ACCOUNT_ADMIN_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEEP_RACER_CLOUD_FORMATION_ACCESS_POLICY">AWS_DEEP_RACER_CLOUD_FORMATION_ACCESS_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEEP_RACER_DEFAULT_MULTI_USER_ACCESS">AWS_DEEP_RACER_DEFAULT_MULTI_USER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEEP_RACER_FULL_ACCESS">AWS_DEEP_RACER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEEP_RACER_ROBO_MAKER_ACCESS_POLICY">AWS_DEEP_RACER_ROBO_MAKER_ACCESS_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DENY_ALL">AWS_DENY_ALL</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEVICE_FARM_FULL_ACCESS">AWS_DEVICE_FARM_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DIRECT_CONNECT_FULL_ACCESS">AWS_DIRECT_CONNECT_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DIRECT_CONNECT_READ_ONLY_ACCESS">AWS_DIRECT_CONNECT_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DIRECTORY_SERVICE_DATA_FULL_ACCESS">AWS_DIRECTORY_SERVICE_DATA_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DIRECTORY_SERVICE_DATA_READ_ONLY_ACCESS">AWS_DIRECTORY_SERVICE_DATA_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DIRECTORY_SERVICE_FULL_ACCESS">AWS_DIRECTORY_SERVICE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DIRECTORY_SERVICE_READ_ONLY_ACCESS">AWS_DIRECTORY_SERVICE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DISCOVERY_CONTINUOUS_EXPORT_FIREHOSE_POLICY">AWS_DISCOVERY_CONTINUOUS_EXPORT_FIREHOSE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_EC2_VSS_SNAPSHOT_POLICY">AWS_EC2_VSS_SNAPSHOT_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_BEANSTALK_CUSTOM_PLATFORMFOR_EC2_ROLE">AWS_ELASTIC_BEANSTALK_CUSTOM_PLATFORMFOR_EC2_ROLE</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_BEANSTALK_MANAGED_UPDATES_CUSTOMER_ROLE_POLICY">AWS_ELASTIC_BEANSTALK_MANAGED_UPDATES_CUSTOMER_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_BEANSTALK_MULTICONTAINER_DOCKER">AWS_ELASTIC_BEANSTALK_MULTICONTAINER_DOCKER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_BEANSTALK_READ_ONLY">AWS_ELASTIC_BEANSTALK_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_BEANSTALK_WEB_TIER">AWS_ELASTIC_BEANSTALK_WEB_TIER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_BEANSTALK_WORKER_TIER">AWS_ELASTIC_BEANSTALK_WORKER_TIER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_DISASTER_RECOVERY_AGENT_INSTALLATION_POLICY">AWS_ELASTIC_DISASTER_RECOVERY_AGENT_INSTALLATION_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS">AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS_V2">AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS_V2</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_DISASTER_RECOVERY_FAILBACK_INSTALLATION_POLICY">AWS_ELASTIC_DISASTER_RECOVERY_FAILBACK_INSTALLATION_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_DISASTER_RECOVERY_LAUNCH_ACTIONS_POLICY">AWS_ELASTIC_DISASTER_RECOVERY_LAUNCH_ACTIONS_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_DISASTER_RECOVERY_READ_ONLY_ACCESS">AWS_ELASTIC_DISASTER_RECOVERY_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_CONVERT_FULL_ACCESS">AWS_ELEMENTAL_MEDIA_CONVERT_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_CONVERT_READ_ONLY">AWS_ELEMENTAL_MEDIA_CONVERT_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_LIVE_FULL_ACCESS">AWS_ELEMENTAL_MEDIA_LIVE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_LIVE_READ_ONLY">AWS_ELEMENTAL_MEDIA_LIVE_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_PACKAGE_FULL_ACCESS">AWS_ELEMENTAL_MEDIA_PACKAGE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_PACKAGE_READ_ONLY">AWS_ELEMENTAL_MEDIA_PACKAGE_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_PACKAGE_V2_FULL_ACCESS">AWS_ELEMENTAL_MEDIA_PACKAGE_V2_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_PACKAGE_V2_READ_ONLY">AWS_ELEMENTAL_MEDIA_PACKAGE_V2_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_STORE_FULL_ACCESS">AWS_ELEMENTAL_MEDIA_STORE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_STORE_READ_ONLY">AWS_ELEMENTAL_MEDIA_STORE_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_TAILOR_FULL_ACCESS">AWS_ELEMENTAL_MEDIA_TAILOR_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_TAILOR_READ_ONLY">AWS_ELEMENTAL_MEDIA_TAILOR_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ENTITY_RESOLUTION_CONSOLE_FULL_ACCESS">AWS_ENTITY_RESOLUTION_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ENTITY_RESOLUTION_CONSOLE_READ_ONLY_ACCESS">AWS_ENTITY_RESOLUTION_CONSOLE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_FM_ADMIN_FULL_ACCESS">AWS_FM_ADMIN_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_FM_ADMIN_READ_ONLY_ACCESS">AWS_FM_ADMIN_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_FM_MEMBER_READ_ONLY_ACCESS">AWS_FM_MEMBER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_FOR_WORD_PRESS_PLUGIN_POLICY">AWS_FOR_WORD_PRESS_PLUGIN_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_CONSOLE_FULL_ACCESS">AWS_GLUE_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_CONSOLE_SAGE_MAKER_NOTEBOOK_FULL_ACCESS">AWS_GLUE_CONSOLE_SAGE_MAKER_NOTEBOOK_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_DATA_BREW_FULL_ACCESS_POLICY">AWS_GLUE_DATA_BREW_FULL_ACCESS_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_SCHEMA_REGISTRY_FULL_ACCESS">AWS_GLUE_SCHEMA_REGISTRY_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_SCHEMA_REGISTRY_READONLY_ACCESS">AWS_GLUE_SCHEMA_REGISTRY_READONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_SESSION_USER_RESTRICTED_NOTEBOOK_POLICY">AWS_GLUE_SESSION_USER_RESTRICTED_NOTEBOOK_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_SESSION_USER_RESTRICTED_POLICY">AWS_GLUE_SESSION_USER_RESTRICTED_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GRAFANA_ACCOUNT_ADMINISTRATOR">AWS_GRAFANA_ACCOUNT_ADMINISTRATOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GRAFANA_CONSOLE_READ_ONLY_ACCESS">AWS_GRAFANA_CONSOLE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT">AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT_V2">AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT_V2</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GREENGRASS_FULL_ACCESS">AWS_GREENGRASS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GREENGRASS_READ_ONLY_ACCESS">AWS_GREENGRASS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GROUND_STATION_AGENT_INSTANCE_POLICY">AWS_GROUND_STATION_AGENT_INSTANCE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_HEALTH_FULL_ACCESS">AWS_HEALTH_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_HEALTH_IMAGING_FULL_ACCESS">AWS_HEALTH_IMAGING_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_HEALTH_IMAGING_READ_ONLY_ACCESS">AWS_HEALTH_IMAGING_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IAM_IDENTITY_CENTER_ALLOW_LIST_FOR_IDENTITY_CONTEXT">AWS_IAM_IDENTITY_CENTER_ALLOW_LIST_FOR_IDENTITY_CONTEXT</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IDENTITY_SYNC_FULL_ACCESS">AWS_IDENTITY_SYNC_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IDENTITY_SYNC_READ_ONLY_ACCESS">AWS_IDENTITY_SYNC_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IMAGE_BUILDER_FULL_ACCESS">AWS_IMAGE_BUILDER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IMAGE_BUILDER_READ_ONLY_ACCESS">AWS_IMAGE_BUILDER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IMPORT_EXPORT_FULL_ACCESS">AWS_IMPORT_EXPORT_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IMPORT_EXPORT_READ_ONLY_ACCESS">AWS_IMPORT_EXPORT_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_INCIDENT_MANAGER_INCIDENT_ACCESS_SERVICE_ROLE_POLICY">AWS_INCIDENT_MANAGER_INCIDENT_ACCESS_SERVICE_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_INCIDENT_MANAGER_RESOLVER_ACCESS">AWS_INCIDENT_MANAGER_RESOLVER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_ANALYTICS_FULL_ACCESS">AWS_IO_T_ANALYTICS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_ANALYTICS_READ_ONLY_ACCESS">AWS_IO_T_ANALYTICS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_CONFIG_ACCESS">AWS_IO_T_CONFIG_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_CONFIG_READ_ONLY_ACCESS">AWS_IO_T_CONFIG_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_DATA_ACCESS">AWS_IO_T_DATA_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_DEVICE_TESTER_FOR_FREE_RTOS_FULL_ACCESS">AWS_IO_T_DEVICE_TESTER_FOR_FREE_RTOS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_DEVICE_TESTER_FOR_GREENGRASS_FULL_ACCESS">AWS_IO_T_DEVICE_TESTER_FOR_GREENGRASS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_EVENTS_FULL_ACCESS">AWS_IO_T_EVENTS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_EVENTS_READ_ONLY_ACCESS">AWS_IO_T_EVENTS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_FULL_ACCESS">AWS_IO_T_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_SITE_WISE_CONSOLE_FULL_ACCESS">AWS_IO_T_SITE_WISE_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_SITE_WISE_FULL_ACCESS">AWS_IO_T_SITE_WISE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_SITE_WISE_READ_ONLY_ACCESS">AWS_IO_T_SITE_WISE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_WIRELESS_DATA_ACCESS">AWS_IO_T_WIRELESS_DATA_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_WIRELESS_FULL_ACCESS">AWS_IO_T_WIRELESS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_WIRELESS_FULL_PUBLISH_ACCESS">AWS_IO_T_WIRELESS_FULL_PUBLISH_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_WIRELESS_GATEWAY_CERT_MANAGER">AWS_IO_T_WIRELESS_GATEWAY_CERT_MANAGER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_WIRELESS_LOGGING">AWS_IO_T_WIRELESS_LOGGING</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_WIRELESS_READ_ONLY_ACCESS">AWS_IO_T_WIRELESS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T1_CLICK_FULL_ACCESS">AWS_IO_T1_CLICK_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T1_CLICK_READ_ONLY_ACCESS">AWS_IO_T1_CLICK_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IQ_FULL_ACCESS">AWS_IQ_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_KEY_MANAGEMENT_SERVICE_POWER_USER">AWS_KEY_MANAGEMENT_SERVICE_POWER_USER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_LAKE_FORMATION_CROSS_ACCOUNT_MANAGER">AWS_LAKE_FORMATION_CROSS_ACCOUNT_MANAGER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_LAKE_FORMATION_DATA_ADMIN">AWS_LAKE_FORMATION_DATA_ADMIN</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_LAMBDA_EXECUTE">AWS_LAMBDA_EXECUTE</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_LAMBDA_FULL_ACCESS">AWS_LAMBDA_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_LAMBDA_INVOCATION_DYNAMO_DB">AWS_LAMBDA_INVOCATION_DYNAMO_DB</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_LAMBDA_READ_ONLY_ACCESS">AWS_LAMBDA_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_AMI_INGESTION">AWS_MARKETPLACE_AMI_INGESTION</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_FULL_ACCESS">AWS_MARKETPLACE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_GET_ENTITLEMENTS">AWS_MARKETPLACE_GET_ENTITLEMENTS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_IMAGE_BUILD_FULL_ACCESS">AWS_MARKETPLACE_IMAGE_BUILD_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_MANAGE_SUBSCRIPTIONS">AWS_MARKETPLACE_MANAGE_SUBSCRIPTIONS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_METERING_FULL_ACCESS">AWS_MARKETPLACE_METERING_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_METERING_REGISTER_USAGE">AWS_MARKETPLACE_METERING_REGISTER_USAGE</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_PROCUREMENT_SYSTEM_ADMIN_FULL_ACCESS">AWS_MARKETPLACE_PROCUREMENT_SYSTEM_ADMIN_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_READ_ONLY">AWS_MARKETPLACE_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_SELLER_FULL_ACCESS">AWS_MARKETPLACE_SELLER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_SELLER_OFFER_MANAGEMENT">AWS_MARKETPLACE_SELLER_OFFER_MANAGEMENT</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_SELLER_PRODUCTS_FULL_ACCESS">AWS_MARKETPLACE_SELLER_PRODUCTS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_SELLER_PRODUCTS_READ_ONLY">AWS_MARKETPLACE_SELLER_PRODUCTS_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_FULL_ACCESS">AWS_MIGRATION_HUB_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_ORCHESTRATOR_CONSOLE_FULL_ACCESS">AWS_MIGRATION_HUB_ORCHESTRATOR_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_ORCHESTRATOR_INSTANCE_ROLE_POLICY">AWS_MIGRATION_HUB_ORCHESTRATOR_INSTANCE_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_ORCHESTRATOR_PLUGIN">AWS_MIGRATION_HUB_ORCHESTRATOR_PLUGIN</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_REFACTOR_SPACES_ENVIRONMENTS_WITHOUT_BRIDGES_FULL_ACCESS">AWS_MIGRATION_HUB_REFACTOR_SPACES_ENVIRONMENTS_WITHOUT_BRIDGES_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_REFACTOR_SPACES_FULL_ACCESS">AWS_MIGRATION_HUB_REFACTOR_SPACES_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_STRATEGY_COLLECTOR">AWS_MIGRATION_HUB_STRATEGY_COLLECTOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_STRATEGY_CONSOLE_FULL_ACCESS">AWS_MIGRATION_HUB_STRATEGY_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_NETWORK_MANAGER_FULL_ACCESS">AWS_NETWORK_MANAGER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_NETWORK_MANAGER_READ_ONLY_ACCESS">AWS_NETWORK_MANAGER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OPS_WORKS_CLOUD_WATCH_LOGS">AWS_OPS_WORKS_CLOUD_WATCH_LOGS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OPS_WORKS_CM_INSTANCE_PROFILE_ROLE">AWS_OPS_WORKS_CM_INSTANCE_PROFILE_ROLE</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OPS_WORKS_FULL_ACCESS">AWS_OPS_WORKS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OPS_WORKS_INSTANCE_REGISTRATION">AWS_OPS_WORKS_INSTANCE_REGISTRATION</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OPS_WORKS_REGISTER_CLI_EC2">AWS_OPS_WORKS_REGISTER_CLI_EC2</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OPS_WORKS_REGISTER_CLI_ON_PREMISES">AWS_OPS_WORKS_REGISTER_CLI_ON_PREMISES</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ORGANIZATIONS_FULL_ACCESS">AWS_ORGANIZATIONS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ORGANIZATIONS_READ_ONLY_ACCESS">AWS_ORGANIZATIONS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OUTPOSTS_AUTHORIZE_SERVER_POLICY">AWS_OUTPOSTS_AUTHORIZE_SERVER_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PANORAMA_FULL_ACCESS">AWS_PANORAMA_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PARTNER_CENTRAL_FULL_ACCESS">AWS_PARTNER_CENTRAL_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PARTNER_CENTRAL_OPPORTUNITY_MANAGEMENT">AWS_PARTNER_CENTRAL_OPPORTUNITY_MANAGEMENT</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PARTNER_CENTRAL_SANDBOX_FULL_ACCESS">AWS_PARTNER_CENTRAL_SANDBOX_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PARTNER_CENTRAL_SELLING_RESOURCE_SNAPSHOT_JOB_EXECUTION_ROLE_POLICY">AWS_PARTNER_CENTRAL_SELLING_RESOURCE_SNAPSHOT_JOB_EXECUTION_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PARTNER_LED_SUPPORT_READ_ONLY_ACCESS">AWS_PARTNER_LED_SUPPORT_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRICE_LIST_SERVICE_FULL_ACCESS">AWS_PRICE_LIST_SERVICE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_CA_AUDITOR">AWS_PRIVATE_CA_AUDITOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_CA_FULL_ACCESS">AWS_PRIVATE_CA_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_CA_PRIVILEGED_USER">AWS_PRIVATE_CA_PRIVILEGED_USER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_CA_READ_ONLY">AWS_PRIVATE_CA_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_CA_USER">AWS_PRIVATE_CA_USER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_MARKETPLACE_ADMIN_FULL_ACCESS">AWS_PRIVATE_MARKETPLACE_ADMIN_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_MARKETPLACE_REQUESTS">AWS_PRIVATE_MARKETPLACE_REQUESTS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PROTON_CODE_BUILD_PROVISIONING_BASIC_ACCESS">AWS_PROTON_CODE_BUILD_PROVISIONING_BASIC_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PROTON_DEVELOPER_ACCESS">AWS_PROTON_DEVELOPER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PROTON_FULL_ACCESS">AWS_PROTON_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PROTON_READ_ONLY_ACCESS">AWS_PROTON_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PURCHASE_ORDERS_SERVICE_ROLE_POLICY">AWS_PURCHASE_ORDERS_SERVICE_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_CFGC_PACKS_PERMISSIONS_BOUNDARY">AWS_QUICK_SETUP_CFGC_PACKS_PERMISSIONS_BOUNDARY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_DEPLOYMENT_ROLE_POLICY">AWS_QUICK_SETUP_DEPLOYMENT_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_DEV_OPS_GURU_PERMISSIONS_BOUNDARY">AWS_QUICK_SETUP_DEV_OPS_GURU_PERMISSIONS_BOUNDARY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_DISTRIBUTOR_PERMISSIONS_BOUNDARY">AWS_QUICK_SETUP_DISTRIBUTOR_PERMISSIONS_BOUNDARY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_ENABLE_AREX_EXECUTION_POLICY">AWS_QUICK_SETUP_ENABLE_AREX_EXECUTION_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_ENABLE_DHMC_EXECUTION_POLICY">AWS_QUICK_SETUP_ENABLE_DHMC_EXECUTION_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_MANAGED_INSTANCE_PROFILE_EXECUTION_POLICY">AWS_QUICK_SETUP_MANAGED_INSTANCE_PROFILE_EXECUTION_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_PATCH_POLICY_BASELINE_ACCESS">AWS_QUICK_SETUP_PATCH_POLICY_BASELINE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_PATCH_POLICY_DEPLOYMENT_ROLE_POLICY">AWS_QUICK_SETUP_PATCH_POLICY_DEPLOYMENT_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_PATCH_POLICY_PERMISSIONS_BOUNDARY">AWS_QUICK_SETUP_PATCH_POLICY_PERMISSIONS_BOUNDARY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_SCHEDULER_PERMISSIONS_BOUNDARY">AWS_QUICK_SETUP_SCHEDULER_PERMISSIONS_BOUNDARY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_SSM_DEPLOYMENT_ROLE_POLICY">AWS_QUICK_SETUP_SSM_DEPLOYMENT_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_SSM_DEPLOYMENT_S3_BUCKET_ROLE_POLICY">AWS_QUICK_SETUP_SSM_DEPLOYMENT_S3_BUCKET_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_SSM_HOST_MGMT_PERMISSIONS_BOUNDARY">AWS_QUICK_SETUP_SSM_HOST_MGMT_PERMISSIONS_BOUNDARY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_SSM_LIFECYCLE_MANAGEMENT_EXECUTION_POLICY">AWS_QUICK_SETUP_SSM_LIFECYCLE_MANAGEMENT_EXECUTION_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_SSM_MANAGE_RESOURCES_EXECUTION_POLICY">AWS_QUICK_SETUP_SSM_MANAGE_RESOURCES_EXECUTION_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SIGHT_ASSET_BUNDLE_EXPORT_POLICY">AWS_QUICK_SIGHT_ASSET_BUNDLE_EXPORT_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SIGHT_ASSET_BUNDLE_IMPORT_POLICY">AWS_QUICK_SIGHT_ASSET_BUNDLE_IMPORT_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SIGHT_IO_T_ANALYTICS_ACCESS">AWS_QUICK_SIGHT_IO_T_ANALYTICS_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_REFACTORING_TOOLKIT_FULL_ACCESS">AWS_REFACTORING_TOOLKIT_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_REFACTORING_TOOLKIT_SIDECAR_POLICY">AWS_REFACTORING_TOOLKIT_SIDECAR_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_REPOST_SPACE_SUPPORT_OPERATIONS_POLICY">AWS_REPOST_SPACE_SUPPORT_OPERATIONS_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESILIENCE_HUB_ASSSESSMENT_EXECUTION_POLICY">AWS_RESILIENCE_HUB_ASSSESSMENT_EXECUTION_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_ACCESS_MANAGER_FULL_ACCESS">AWS_RESOURCE_ACCESS_MANAGER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_ACCESS_MANAGER_READ_ONLY_ACCESS">AWS_RESOURCE_ACCESS_MANAGER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_ACCESS_MANAGER_RESOURCE_SHARE_PARTICIPANT_ACCESS">AWS_RESOURCE_ACCESS_MANAGER_RESOURCE_SHARE_PARTICIPANT_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_EXPLORER_FULL_ACCESS">AWS_RESOURCE_EXPLORER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_EXPLORER_ORGANIZATIONS_ACCESS">AWS_RESOURCE_EXPLORER_ORGANIZATIONS_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_EXPLORER_READ_ONLY_ACCESS">AWS_RESOURCE_EXPLORER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_GROUPS_READ_ONLY_ACCESS">AWS_RESOURCE_GROUPS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ROBO_MAKER_FULL_ACCESS">AWS_ROBO_MAKER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ROBO_MAKER_READ_ONLY_ACCESS">AWS_ROBO_MAKER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ROBO_MAKER_SERVICE_ROLE_POLICY">AWS_ROBO_MAKER_SERVICE_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SAVINGS_PLANS_FULL_ACCESS">AWS_SAVINGS_PLANS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SAVINGS_PLANS_READ_ONLY_ACCESS">AWS_SAVINGS_PLANS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SECURITY_HUB_FULL_ACCESS">AWS_SECURITY_HUB_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SECURITY_HUB_ORGANIZATIONS_ACCESS">AWS_SECURITY_HUB_ORGANIZATIONS_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SECURITY_HUB_READ_ONLY_ACCESS">AWS_SECURITY_HUB_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SECURITY_INCIDENT_RESPONSE_CASE_FULL_ACCESS">AWS_SECURITY_INCIDENT_RESPONSE_CASE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SECURITY_INCIDENT_RESPONSE_FULL_ACCESS">AWS_SECURITY_INCIDENT_RESPONSE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SECURITY_INCIDENT_RESPONSE_READ_ONLY_ACCESS">AWS_SECURITY_INCIDENT_RESPONSE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SERVICE_CATALOG_ADMIN_FULL_ACCESS">AWS_SERVICE_CATALOG_ADMIN_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SERVICE_CATALOG_ADMIN_READ_ONLY_ACCESS">AWS_SERVICE_CATALOG_ADMIN_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SERVICE_CATALOG_APP_REGISTRY_FULL_ACCESS">AWS_SERVICE_CATALOG_APP_REGISTRY_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SERVICE_CATALOG_APP_REGISTRY_READ_ONLY_ACCESS">AWS_SERVICE_CATALOG_APP_REGISTRY_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SERVICE_CATALOG_END_USER_FULL_ACCESS">AWS_SERVICE_CATALOG_END_USER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SERVICE_CATALOG_END_USER_READ_ONLY_ACCESS">AWS_SERVICE_CATALOG_END_USER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_AUTOMATION_DIAGNOSIS_BUCKET_POLICY">AWS_SSM_AUTOMATION_DIAGNOSIS_BUCKET_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_DIAGNOSIS_AUTOMATION_ADMINISTRATION_ROLE_POLICY">AWS_SSM_DIAGNOSIS_AUTOMATION_ADMINISTRATION_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_DIAGNOSIS_AUTOMATION_EXECUTION_ROLE_POLICY">AWS_SSM_DIAGNOSIS_AUTOMATION_EXECUTION_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_DIAGNOSIS_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY">AWS_SSM_DIAGNOSIS_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_REMEDIATION_AUTOMATION_ADMINISTRATION_ROLE_POLICY">AWS_SSM_REMEDIATION_AUTOMATION_ADMINISTRATION_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_REMEDIATION_AUTOMATION_EXECUTION_ROLE_POLICY">AWS_SSM_REMEDIATION_AUTOMATION_EXECUTION_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_REMEDIATION_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY">AWS_SSM_REMEDIATION_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSO_DIRECTORY_ADMINISTRATOR">AWS_SSO_DIRECTORY_ADMINISTRATOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSO_DIRECTORY_READ_ONLY">AWS_SSO_DIRECTORY_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSO_MASTER_ACCOUNT_ADMINISTRATOR">AWS_SSO_MASTER_ACCOUNT_ADMINISTRATOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSO_MEMBER_ACCOUNT_ADMINISTRATOR">AWS_SSO_MEMBER_ACCOUNT_ADMINISTRATOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSO_READ_ONLY">AWS_SSO_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_STEP_FUNCTIONS_CONSOLE_FULL_ACCESS">AWS_STEP_FUNCTIONS_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_STEP_FUNCTIONS_FULL_ACCESS">AWS_STEP_FUNCTIONS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_STEP_FUNCTIONS_READ_ONLY_ACCESS">AWS_STEP_FUNCTIONS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_STORAGE_GATEWAY_FULL_ACCESS">AWS_STORAGE_GATEWAY_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_STORAGE_GATEWAY_READ_ONLY_ACCESS">AWS_STORAGE_GATEWAY_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SUPPORT_ACCESS">AWS_SUPPORT_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SUPPORT_APP_FULL_ACCESS">AWS_SUPPORT_APP_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SUPPORT_APP_READ_ONLY_ACCESS">AWS_SUPPORT_APP_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SUPPORT_PLANS_FULL_ACCESS">AWS_SUPPORT_PLANS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SUPPORT_PLANS_READ_ONLY_ACCESS">AWS_SUPPORT_PLANS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SYSTEMS_MANAGER_ENABLE_CONFIG_RECORDING_EXECUTION_POLICY">AWS_SYSTEMS_MANAGER_ENABLE_CONFIG_RECORDING_EXECUTION_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SYSTEMS_MANAGER_ENABLE_EXPLORER_EXECUTION_POLICY">AWS_SYSTEMS_MANAGER_ENABLE_EXPLORER_EXECUTION_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SYSTEMS_MANAGER_FOR_SAP_FULL_ACCESS">AWS_SYSTEMS_MANAGER_FOR_SAP_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SYSTEMS_MANAGER_FOR_SAP_READ_ONLY_ACCESS">AWS_SYSTEMS_MANAGER_FOR_SAP_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_ASSET_SERVER_POLICY">AWS_THINKBOX_ASSET_SERVER_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_AWS_PORTAL_ADMIN_POLICY">AWS_THINKBOX_AWS_PORTAL_ADMIN_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_AWS_PORTAL_GATEWAY_POLICY">AWS_THINKBOX_AWS_PORTAL_GATEWAY_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_AWS_PORTAL_WORKER_POLICY">AWS_THINKBOX_AWS_PORTAL_WORKER_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ACCESS_POLICY">AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ACCESS_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ADMIN_POLICY">AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ADMIN_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_ADMIN_POLICY">AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_ADMIN_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_WORKER_POLICY">AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_WORKER_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_TRANSFER_CONSOLE_FULL_ACCESS">AWS_TRANSFER_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_TRANSFER_FULL_ACCESS">AWS_TRANSFER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_TRANSFER_READ_ONLY_ACCESS">AWS_TRANSFER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_TRUSTED_ADVISOR_PRIORITY_FULL_ACCESS">AWS_TRUSTED_ADVISOR_PRIORITY_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_TRUSTED_ADVISOR_PRIORITY_READ_ONLY_ACCESS">AWS_TRUSTED_ADVISOR_PRIORITY_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_VENDOR_INSIGHTS_ASSESSOR_FULL_ACCESS">AWS_VENDOR_INSIGHTS_ASSESSOR_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_VENDOR_INSIGHTS_ASSESSOR_READ_ONLY">AWS_VENDOR_INSIGHTS_ASSESSOR_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_VENDOR_INSIGHTS_VENDOR_FULL_ACCESS">AWS_VENDOR_INSIGHTS_VENDOR_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_VENDOR_INSIGHTS_VENDOR_READ_ONLY">AWS_VENDOR_INSIGHTS_VENDOR_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_WAF_CONSOLE_FULL_ACCESS">AWS_WAF_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_WAF_CONSOLE_READ_ONLY_ACCESS">AWS_WAF_CONSOLE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_WAF_FULL_ACCESS">AWS_WAF_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_WAF_READ_ONLY_ACCESS">AWS_WAF_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_WICKR_FULL_ACCESS">AWS_WICKR_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_X_RAY_DAEMON_WRITE_ACCESS">AWS_X_RAY_DAEMON_WRITE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_XRAY_CROSS_ACCOUNT_SHARING_CONFIGURATION">AWS_XRAY_CROSS_ACCOUNT_SHARING_CONFIGURATION</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_XRAY_FULL_ACCESS">AWS_XRAY_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_XRAY_READ_ONLY_ACCESS">AWS_XRAY_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_XRAY_WRITE_ONLY_ACCESS">AWS_XRAY_WRITE_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_FRONT_FULL_ACCESS">CLOUD_FRONT_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_FRONT_READ_ONLY_ACCESS">CLOUD_FRONT_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_SEARCH_FULL_ACCESS">CLOUD_SEARCH_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_SEARCH_READ_ONLY_ACCESS">CLOUD_SEARCH_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_ACTIONS_EC2_ACCESS">CLOUD_WATCH_ACTIONS_EC2_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_AGENT_ADMIN_POLICY">CLOUD_WATCH_AGENT_ADMIN_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_AGENT_SERVER_POLICY">CLOUD_WATCH_AGENT_SERVER_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_APPLICATION_INSIGHTS_FULL_ACCESS">CLOUD_WATCH_APPLICATION_INSIGHTS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_APPLICATION_INSIGHTS_READ_ONLY_ACCESS">CLOUD_WATCH_APPLICATION_INSIGHTS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_APPLICATION_SIGNALS_FULL_ACCESS">CLOUD_WATCH_APPLICATION_SIGNALS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_APPLICATION_SIGNALS_READ_ONLY_ACCESS">CLOUD_WATCH_APPLICATION_SIGNALS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_AUTOMATIC_DASHBOARDS_ACCESS">CLOUD_WATCH_AUTOMATIC_DASHBOARDS_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_CROSS_ACCOUNT_SHARING_CONFIGURATION">CLOUD_WATCH_CROSS_ACCOUNT_SHARING_CONFIGURATION</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_EVENTS_FULL_ACCESS">CLOUD_WATCH_EVENTS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_EVENTS_READ_ONLY_ACCESS">CLOUD_WATCH_EVENTS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_FULL_ACCESS">CLOUD_WATCH_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_FULL_ACCESS_V2">CLOUD_WATCH_FULL_ACCESS_V2</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_INTERNET_MONITOR_FULL_ACCESS">CLOUD_WATCH_INTERNET_MONITOR_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_INTERNET_MONITOR_READ_ONLY_ACCESS">CLOUD_WATCH_INTERNET_MONITOR_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_LAMBDA_APPLICATION_SIGNALS_EXECUTION_ROLE_POLICY">CLOUD_WATCH_LAMBDA_APPLICATION_SIGNALS_EXECUTION_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_LAMBDA_INSIGHTS_EXECUTION_ROLE_POLICY">CLOUD_WATCH_LAMBDA_INSIGHTS_EXECUTION_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_LOGS_CROSS_ACCOUNT_SHARING_CONFIGURATION">CLOUD_WATCH_LOGS_CROSS_ACCOUNT_SHARING_CONFIGURATION</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_LOGS_FULL_ACCESS">CLOUD_WATCH_LOGS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_LOGS_READ_ONLY_ACCESS">CLOUD_WATCH_LOGS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_NETWORK_FLOW_MONITOR_AGENT_PUBLISH_POLICY">CLOUD_WATCH_NETWORK_FLOW_MONITOR_AGENT_PUBLISH_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_OPEN_SEARCH_DASHBOARD_ACCESS">CLOUD_WATCH_OPEN_SEARCH_DASHBOARD_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_OPEN_SEARCH_DASHBOARDS_FULL_ACCESS">CLOUD_WATCH_OPEN_SEARCH_DASHBOARDS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_READ_ONLY_ACCESS">CLOUD_WATCH_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_SYNTHETICS_FULL_ACCESS">CLOUD_WATCH_SYNTHETICS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_SYNTHETICS_READ_ONLY_ACCESS">CLOUD_WATCH_SYNTHETICS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.COMPREHEND_FULL_ACCESS">COMPREHEND_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.COMPREHEND_MEDICAL_FULL_ACCESS">COMPREHEND_MEDICAL_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.COMPREHEND_READ_ONLY">COMPREHEND_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.COMPUTE_OPTIMIZER_READ_ONLY_ACCESS">COMPUTE_OPTIMIZER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.COST_OPTIMIZATION_HUB_ADMIN_ACCESS">COST_OPTIMIZATION_HUB_ADMIN_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.COST_OPTIMIZATION_HUB_READ_ONLY_ACCESS">COST_OPTIMIZATION_HUB_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.EC2_FAST_LAUNCH_FULL_ACCESS">EC2_FAST_LAUNCH_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.EC2_IMAGE_BUILDER_CROSS_ACCOUNT_DISTRIBUTION_ACCESS">EC2_IMAGE_BUILDER_CROSS_ACCOUNT_DISTRIBUTION_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.EC2_INSTANCE_CONNECT">EC2_INSTANCE_CONNECT</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER">EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER_ECR_CONTAINER_BUILDS">EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER_ECR_CONTAINER_BUILDS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELASTIC_LOAD_BALANCING_FULL_ACCESS">ELASTIC_LOAD_BALANCING_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELASTIC_LOAD_BALANCING_READ_ONLY">ELASTIC_LOAD_BALANCING_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_ACTIVATIONS_DOWNLOAD_SOFTWARE_ACCESS">ELEMENTAL_ACTIVATIONS_DOWNLOAD_SOFTWARE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_ACTIVATIONS_FULL_ACCESS">ELEMENTAL_ACTIVATIONS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_ACTIVATIONS_GENERATE_LICENSES">ELEMENTAL_ACTIVATIONS_GENERATE_LICENSES</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_ACTIVATIONS_READ_ONLY_ACCESS">ELEMENTAL_ACTIVATIONS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_APPLIANCES_SOFTWARE_FULL_ACCESS">ELEMENTAL_APPLIANCES_SOFTWARE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_APPLIANCES_SOFTWARE_READ_ONLY_ACCESS">ELEMENTAL_APPLIANCES_SOFTWARE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_SUPPORT_CENTER_FULL_ACCESS">ELEMENTAL_SUPPORT_CENTER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.GAME_LIFT_CONTAINER_FLEET_POLICY">GAME_LIFT_CONTAINER_FLEET_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.GAME_LIFT_GAME_SERVER_GROUP_POLICY">GAME_LIFT_GAME_SERVER_GROUP_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.GLOBAL_ACCELERATOR_FULL_ACCESS">GLOBAL_ACCELERATOR_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.GLOBAL_ACCELERATOR_READ_ONLY_ACCESS">GLOBAL_ACCELERATOR_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.GROUND_TRUTH_SYNTHETIC_CONSOLE_FULL_ACCESS">GROUND_TRUTH_SYNTHETIC_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.GROUND_TRUTH_SYNTHETIC_CONSOLE_READ_ONLY_ACCESS">GROUND_TRUTH_SYNTHETIC_CONSOLE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_ACCESS_ADVISOR_READ_ONLY">IAM_ACCESS_ADVISOR_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_ACCESS_ANALYZER_FULL_ACCESS">IAM_ACCESS_ANALYZER_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_ACCESS_ANALYZER_READ_ONLY_ACCESS">IAM_ACCESS_ANALYZER_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_FULL_ACCESS">IAM_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_READ_ONLY_ACCESS">IAM_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_SELF_MANAGE_SERVICE_SPECIFIC_CREDENTIALS">IAM_SELF_MANAGE_SERVICE_SPECIFIC_CREDENTIALS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_USER_CHANGE_PASSWORD">IAM_USER_CHANGE_PASSWORD</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_USER_SSH_KEYS">IAM_USER_SSH_KEYS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IVS_FULL_ACCESS">IVS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IVS_READ_ONLY_ACCESS">IVS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.MEDIA_CONNECT_GATEWAY_INSTANCE_ROLE_POLICY">MEDIA_CONNECT_GATEWAY_INSTANCE_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.NEPTUNE_CONSOLE_FULL_ACCESS">NEPTUNE_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.NEPTUNE_FULL_ACCESS">NEPTUNE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.NEPTUNE_GRAPH_READ_ONLY_ACCESS">NEPTUNE_GRAPH_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.NEPTUNE_READ_ONLY_ACCESS">NEPTUNE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.OAM_FULL_ACCESS">OAM_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.OAM_READ_ONLY_ACCESS">OAM_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.PARTNER_CENTRAL_ACCOUNT_MANAGEMENT_USER_ROLE_ASSOCIATION">PARTNER_CENTRAL_ACCOUNT_MANAGEMENT_USER_ROLE_ASSOCIATION</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.POWER_USER_ACCESS">POWER_USER_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.Q_BUSINESS_QUICKSIGHT_PLUGIN_POLICY">Q_BUSINESS_QUICKSIGHT_PLUGIN_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.READ_ONLY_ACCESS">READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.RESOURCE_GROUPS_AND_TAG_EDITOR_FULL_ACCESS">RESOURCE_GROUPS_AND_TAG_EDITOR_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.RESOURCE_GROUPS_AND_TAG_EDITOR_READ_ONLY_ACCESS">RESOURCE_GROUPS_AND_TAG_EDITOR_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.RESOURCE_GROUPS_TAGGING_API_TAG_UNTAG_SUPPORTED_RESOURCES">RESOURCE_GROUPS_TAGGING_API_TAG_UNTAG_SUPPORTED_RESOURCES</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ROSA_MANAGE_SUBSCRIPTION">ROSA_MANAGE_SUBSCRIPTION</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SAGE_MAKER_STUDIO_FULL_ACCESS">SAGE_MAKER_STUDIO_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SAGE_MAKER_STUDIO_PROJECT_ROLE_MACHINE_LEARNING_POLICY">SAGE_MAKER_STUDIO_PROJECT_ROLE_MACHINE_LEARNING_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_PERMISSIONS_BOUNDARY">SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_PERMISSIONS_BOUNDARY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_POLICY">SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SECRETS_MANAGER_READ_WRITE">SECRETS_MANAGER_READ_WRITE</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SECURITY_AUDIT">SECURITY_AUDIT</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SERVER_MIGRATION_CONNECTOR">SERVER_MIGRATION_CONNECTOR</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SERVER_MIGRATION_SERVICE_CONSOLE_FULL_ACCESS">SERVER_MIGRATION_SERVICE_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SERVICE_QUOTAS_FULL_ACCESS">SERVICE_QUOTAS_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SERVICE_QUOTAS_READ_ONLY_ACCESS">SERVICE_QUOTAS_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SIMPLE_WORKFLOW_FULL_ACCESS">SIMPLE_WORKFLOW_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.TRANSLATE_FULL_ACCESS">TRANSLATE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.TRANSLATE_READ_ONLY">TRANSLATE_READ_ONLY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.VPC_LATTICE_FULL_ACCESS">VPC_LATTICE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.VPC_LATTICE_READ_ONLY_ACCESS">VPC_LATTICE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.VPC_LATTICE_SERVICES_INVOKE_ACCESS">VPC_LATTICE_SERVICES_INVOKE_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.WELL_ARCHITECTED_CONSOLE_FULL_ACCESS">WELL_ARCHITECTED_CONSOLE_FULL_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.WELL_ARCHITECTED_CONSOLE_READ_ONLY_ACCESS">WELL_ARCHITECTED_CONSOLE_READ_ONLY_ACCESS</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.WORK_LINK_SERVICE_ROLE_POLICY">WORK_LINK_SERVICE_ROLE_POLICY</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | *No description.* |

---

##### `ADMINISTRATOR_ACCESS`<sup>Required</sup> <a name="ADMINISTRATOR_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ADMINISTRATOR_ACCESS"></a>

```typescript
public readonly ADMINISTRATOR_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ADMINISTRATOR_ACCESS_AMPLIFY`<sup>Required</sup> <a name="ADMINISTRATOR_ACCESS_AMPLIFY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ADMINISTRATOR_ACCESS_AMPLIFY"></a>

```typescript
public readonly ADMINISTRATOR_ACCESS_AMPLIFY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ADMINISTRATOR_ACCESS_AWS_ELASTIC_BEANSTALK`<sup>Required</sup> <a name="ADMINISTRATOR_ACCESS_AWS_ELASTIC_BEANSTALK" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ADMINISTRATOR_ACCESS_AWS_ELASTIC_BEANSTALK"></a>

```typescript
public readonly ADMINISTRATOR_ACCESS_AWS_ELASTIC_BEANSTALK: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AI_OPS_ASSISTANT_POLICY`<sup>Required</sup> <a name="AI_OPS_ASSISTANT_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AI_OPS_ASSISTANT_POLICY"></a>

```typescript
public readonly AI_OPS_ASSISTANT_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AI_OPS_CONSOLE_ADMIN_POLICY`<sup>Required</sup> <a name="AI_OPS_CONSOLE_ADMIN_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AI_OPS_CONSOLE_ADMIN_POLICY"></a>

```typescript
public readonly AI_OPS_CONSOLE_ADMIN_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AI_OPS_OPERATOR_ACCESS`<sup>Required</sup> <a name="AI_OPS_OPERATOR_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AI_OPS_OPERATOR_ACCESS"></a>

```typescript
public readonly AI_OPS_OPERATOR_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AI_OPS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AI_OPS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AI_OPS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AI_OPS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ALEXA_FOR_BUSINESS_DEVICE_SETUP`<sup>Required</sup> <a name="ALEXA_FOR_BUSINESS_DEVICE_SETUP" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ALEXA_FOR_BUSINESS_DEVICE_SETUP"></a>

```typescript
public readonly ALEXA_FOR_BUSINESS_DEVICE_SETUP: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ALEXA_FOR_BUSINESS_FULL_ACCESS`<sup>Required</sup> <a name="ALEXA_FOR_BUSINESS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ALEXA_FOR_BUSINESS_FULL_ACCESS"></a>

```typescript
public readonly ALEXA_FOR_BUSINESS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ALEXA_FOR_BUSINESS_GATEWAY_EXECUTION`<sup>Required</sup> <a name="ALEXA_FOR_BUSINESS_GATEWAY_EXECUTION" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ALEXA_FOR_BUSINESS_GATEWAY_EXECUTION"></a>

```typescript
public readonly ALEXA_FOR_BUSINESS_GATEWAY_EXECUTION: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ALEXA_FOR_BUSINESS_LIFESIZE_DELEGATED_ACCESS_POLICY`<sup>Required</sup> <a name="ALEXA_FOR_BUSINESS_LIFESIZE_DELEGATED_ACCESS_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ALEXA_FOR_BUSINESS_LIFESIZE_DELEGATED_ACCESS_POLICY"></a>

```typescript
public readonly ALEXA_FOR_BUSINESS_LIFESIZE_DELEGATED_ACCESS_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ALEXA_FOR_BUSINESS_POLY_DELEGATED_ACCESS_POLICY`<sup>Required</sup> <a name="ALEXA_FOR_BUSINESS_POLY_DELEGATED_ACCESS_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ALEXA_FOR_BUSINESS_POLY_DELEGATED_ACCESS_POLICY"></a>

```typescript
public readonly ALEXA_FOR_BUSINESS_POLY_DELEGATED_ACCESS_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ALEXA_FOR_BUSINESS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="ALEXA_FOR_BUSINESS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ALEXA_FOR_BUSINESS_READ_ONLY_ACCESS"></a>

```typescript
public readonly ALEXA_FOR_BUSINESS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_API_GATEWAY_ADMINISTRATOR`<sup>Required</sup> <a name="AMAZON_API_GATEWAY_ADMINISTRATOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_API_GATEWAY_ADMINISTRATOR"></a>

```typescript
public readonly AMAZON_API_GATEWAY_ADMINISTRATOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_API_GATEWAY_INVOKE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_API_GATEWAY_INVOKE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_API_GATEWAY_INVOKE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_API_GATEWAY_INVOKE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_APP_FLOW_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_APP_FLOW_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_APP_FLOW_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_APP_FLOW_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_APP_FLOW_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_APP_FLOW_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_APP_FLOW_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_APP_FLOW_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_APP_STREAM_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_APP_STREAM_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_APP_STREAM_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_APP_STREAM_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_APP_STREAM_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_APP_STREAM_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_APP_STREAM_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_APP_STREAM_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ATHENA_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ATHENA_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ATHENA_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ATHENA_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_AUGMENTED_AI_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_AUGMENTED_AI_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_AUGMENTED_AI_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_AUGMENTED_AI_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_AUGMENTED_AI_HUMAN_LOOP_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_AUGMENTED_AI_HUMAN_LOOP_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_AUGMENTED_AI_HUMAN_LOOP_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_AUGMENTED_AI_HUMAN_LOOP_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_AUGMENTED_AI_INTEGRATED_API_ACCESS`<sup>Required</sup> <a name="AMAZON_AUGMENTED_AI_INTEGRATED_API_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_AUGMENTED_AI_INTEGRATED_API_ACCESS"></a>

```typescript
public readonly AMAZON_AUGMENTED_AI_INTEGRATED_API_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_AURORA_DSQL_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_AURORA_DSQL_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_AURORA_DSQL_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_AURORA_DSQL_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_AURORA_DSQL_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_AURORA_DSQL_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_AURORA_DSQL_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_AURORA_DSQL_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_AURORA_DSQL_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_AURORA_DSQL_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_AURORA_DSQL_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_AURORA_DSQL_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_BEDROCK_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_BEDROCK_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_BEDROCK_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_BEDROCK_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_BEDROCK_READ_ONLY`<sup>Required</sup> <a name="AMAZON_BEDROCK_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_BEDROCK_READ_ONLY"></a>

```typescript
public readonly AMAZON_BEDROCK_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_BEDROCK_STUDIO_PERMISSIONS_BOUNDARY`<sup>Required</sup> <a name="AMAZON_BEDROCK_STUDIO_PERMISSIONS_BOUNDARY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_BEDROCK_STUDIO_PERMISSIONS_BOUNDARY"></a>

```typescript
public readonly AMAZON_BEDROCK_STUDIO_PERMISSIONS_BOUNDARY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_BRAKET_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_BRAKET_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_BRAKET_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_BRAKET_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_BRAKET_JOBS_EXECUTION_POLICY`<sup>Required</sup> <a name="AMAZON_BRAKET_JOBS_EXECUTION_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_BRAKET_JOBS_EXECUTION_POLICY"></a>

```typescript
public readonly AMAZON_BRAKET_JOBS_EXECUTION_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CHIME_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_CHIME_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CHIME_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_CHIME_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CHIME_READ_ONLY`<sup>Required</sup> <a name="AMAZON_CHIME_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CHIME_READ_ONLY"></a>

```typescript
public readonly AMAZON_CHIME_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CHIME_SDK`<sup>Required</sup> <a name="AMAZON_CHIME_SDK" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CHIME_SDK"></a>

```typescript
public readonly AMAZON_CHIME_SDK: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CHIME_USER_MANAGEMENT`<sup>Required</sup> <a name="AMAZON_CHIME_USER_MANAGEMENT" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CHIME_USER_MANAGEMENT"></a>

```typescript
public readonly AMAZON_CHIME_USER_MANAGEMENT: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CLOUD_DIRECTORY_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_CLOUD_DIRECTORY_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CLOUD_DIRECTORY_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_CLOUD_DIRECTORY_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CLOUD_DIRECTORY_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_CLOUD_DIRECTORY_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CLOUD_DIRECTORY_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_CLOUD_DIRECTORY_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CLOUD_WATCH_EVIDENTLY_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_CLOUD_WATCH_EVIDENTLY_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CLOUD_WATCH_EVIDENTLY_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_CLOUD_WATCH_EVIDENTLY_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CLOUD_WATCH_EVIDENTLY_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_CLOUD_WATCH_EVIDENTLY_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CLOUD_WATCH_EVIDENTLY_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_CLOUD_WATCH_EVIDENTLY_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CLOUD_WATCH_RUM_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_CLOUD_WATCH_RUM_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CLOUD_WATCH_RUM_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_CLOUD_WATCH_RUM_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CLOUD_WATCH_RUM_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_CLOUD_WATCH_RUM_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CLOUD_WATCH_RUM_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_CLOUD_WATCH_RUM_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CODE_CATALYST_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_CODE_CATALYST_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_CATALYST_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_CODE_CATALYST_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CODE_CATALYST_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_CODE_CATALYST_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_CATALYST_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_CODE_CATALYST_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CODE_GURU_PROFILER_AGENT_ACCESS`<sup>Required</sup> <a name="AMAZON_CODE_GURU_PROFILER_AGENT_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_PROFILER_AGENT_ACCESS"></a>

```typescript
public readonly AMAZON_CODE_GURU_PROFILER_AGENT_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CODE_GURU_PROFILER_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_CODE_GURU_PROFILER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_PROFILER_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_CODE_GURU_PROFILER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CODE_GURU_PROFILER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_CODE_GURU_PROFILER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_PROFILER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_CODE_GURU_PROFILER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CODE_GURU_REVIEWER_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_CODE_GURU_REVIEWER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_REVIEWER_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_CODE_GURU_REVIEWER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CODE_GURU_REVIEWER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_CODE_GURU_REVIEWER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_REVIEWER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_CODE_GURU_REVIEWER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CODE_GURU_SECURITY_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_CODE_GURU_SECURITY_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_SECURITY_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_CODE_GURU_SECURITY_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CODE_GURU_SECURITY_SCAN_ACCESS`<sup>Required</sup> <a name="AMAZON_CODE_GURU_SECURITY_SCAN_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CODE_GURU_SECURITY_SCAN_ACCESS"></a>

```typescript
public readonly AMAZON_CODE_GURU_SECURITY_SCAN_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_COGNITO_DEVELOPER_AUTHENTICATED_IDENTITIES`<sup>Required</sup> <a name="AMAZON_COGNITO_DEVELOPER_AUTHENTICATED_IDENTITIES" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_COGNITO_DEVELOPER_AUTHENTICATED_IDENTITIES"></a>

```typescript
public readonly AMAZON_COGNITO_DEVELOPER_AUTHENTICATED_IDENTITIES: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_COGNITO_POWER_USER`<sup>Required</sup> <a name="AMAZON_COGNITO_POWER_USER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_COGNITO_POWER_USER"></a>

```typescript
public readonly AMAZON_COGNITO_POWER_USER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_COGNITO_READ_ONLY`<sup>Required</sup> <a name="AMAZON_COGNITO_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_COGNITO_READ_ONLY"></a>

```typescript
public readonly AMAZON_COGNITO_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_COGNITO_UN_AUTHED_IDENTITIES_SESSION_POLICY`<sup>Required</sup> <a name="AMAZON_COGNITO_UN_AUTHED_IDENTITIES_SESSION_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_COGNITO_UN_AUTHED_IDENTITIES_SESSION_POLICY"></a>

```typescript
public readonly AMAZON_COGNITO_UN_AUTHED_IDENTITIES_SESSION_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_COGNITO_UNAUTHENTICATED_IDENTITIES`<sup>Required</sup> <a name="AMAZON_COGNITO_UNAUTHENTICATED_IDENTITIES" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_COGNITO_UNAUTHENTICATED_IDENTITIES"></a>

```typescript
public readonly AMAZON_COGNITO_UNAUTHENTICATED_IDENTITIES: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CONNECT_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_CONNECT_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CONNECT_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_CONNECT_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CONNECT_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_CONNECT_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CONNECT_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_CONNECT_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_CONNECT_VOICE_ID_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_CONNECT_VOICE_ID_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_CONNECT_VOICE_ID_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_CONNECT_VOICE_ID_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DATA_ZONE_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY`<sup>Required</sup> <a name="AMAZON_DATA_ZONE_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY"></a>

```typescript
public readonly AMAZON_DATA_ZONE_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DATA_ZONE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_DATA_ZONE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_DATA_ZONE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DATA_ZONE_FULL_USER_ACCESS`<sup>Required</sup> <a name="AMAZON_DATA_ZONE_FULL_USER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_FULL_USER_ACCESS"></a>

```typescript
public readonly AMAZON_DATA_ZONE_FULL_USER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DATA_ZONE_REDSHIFT_GLUE_PROVISIONING_POLICY`<sup>Required</sup> <a name="AMAZON_DATA_ZONE_REDSHIFT_GLUE_PROVISIONING_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_REDSHIFT_GLUE_PROVISIONING_POLICY"></a>

```typescript
public readonly AMAZON_DATA_ZONE_REDSHIFT_GLUE_PROVISIONING_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DATA_ZONE_SAGE_MAKER_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY`<sup>Required</sup> <a name="AMAZON_DATA_ZONE_SAGE_MAKER_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_SAGE_MAKER_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY"></a>

```typescript
public readonly AMAZON_DATA_ZONE_SAGE_MAKER_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DATA_ZONE_SAGE_MAKER_MANAGE_ACCESS_ROLE_POLICY`<sup>Required</sup> <a name="AMAZON_DATA_ZONE_SAGE_MAKER_MANAGE_ACCESS_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_SAGE_MAKER_MANAGE_ACCESS_ROLE_POLICY"></a>

```typescript
public readonly AMAZON_DATA_ZONE_SAGE_MAKER_MANAGE_ACCESS_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DATA_ZONE_SAGE_MAKER_PROVISIONING_ROLE_POLICY`<sup>Required</sup> <a name="AMAZON_DATA_ZONE_SAGE_MAKER_PROVISIONING_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DATA_ZONE_SAGE_MAKER_PROVISIONING_ROLE_POLICY"></a>

```typescript
public readonly AMAZON_DATA_ZONE_SAGE_MAKER_PROVISIONING_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DETECTIVE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_DETECTIVE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DETECTIVE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_DETECTIVE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DETECTIVE_INVESTIGATOR_ACCESS`<sup>Required</sup> <a name="AMAZON_DETECTIVE_INVESTIGATOR_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DETECTIVE_INVESTIGATOR_ACCESS"></a>

```typescript
public readonly AMAZON_DETECTIVE_INVESTIGATOR_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DETECTIVE_MEMBER_ACCESS`<sup>Required</sup> <a name="AMAZON_DETECTIVE_MEMBER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DETECTIVE_MEMBER_ACCESS"></a>

```typescript
public readonly AMAZON_DETECTIVE_MEMBER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DETECTIVE_ORGANIZATIONS_ACCESS`<sup>Required</sup> <a name="AMAZON_DETECTIVE_ORGANIZATIONS_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DETECTIVE_ORGANIZATIONS_ACCESS"></a>

```typescript
public readonly AMAZON_DETECTIVE_ORGANIZATIONS_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DEV_OPS_GURU_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_DEV_OPS_GURU_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DEV_OPS_GURU_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_DEV_OPS_GURU_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DEV_OPS_GURU_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_DEV_OPS_GURU_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DEV_OPS_GURU_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_DEV_OPS_GURU_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DEV_OPS_GURU_ORGANIZATIONS_ACCESS`<sup>Required</sup> <a name="AMAZON_DEV_OPS_GURU_ORGANIZATIONS_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DEV_OPS_GURU_ORGANIZATIONS_ACCESS"></a>

```typescript
public readonly AMAZON_DEV_OPS_GURU_ORGANIZATIONS_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DEV_OPS_GURU_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_DEV_OPS_GURU_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DEV_OPS_GURU_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_DEV_OPS_GURU_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DOC_DB_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_DOC_DB_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DOC_DB_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_DOC_DB_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DOC_DB_ELASTIC_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_DOC_DB_ELASTIC_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DOC_DB_ELASTIC_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_DOC_DB_ELASTIC_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DOC_DB_ELASTIC_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_DOC_DB_ELASTIC_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DOC_DB_ELASTIC_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_DOC_DB_ELASTIC_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DOC_DB_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_DOC_DB_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DOC_DB_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_DOC_DB_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DOC_DB_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_DOC_DB_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DOC_DB_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_DOC_DB_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DRSVPC_MANAGEMENT`<sup>Required</sup> <a name="AMAZON_DRSVPC_MANAGEMENT" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DRSVPC_MANAGEMENT"></a>

```typescript
public readonly AMAZON_DRSVPC_MANAGEMENT: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DYNAMO_DB_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_DYNAMO_DB_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DYNAMO_DB_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_DYNAMO_DB_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DYNAMO_DB_FULL_ACCESSWITH_DATA_PIPELINE`<sup>Required</sup> <a name="AMAZON_DYNAMO_DB_FULL_ACCESSWITH_DATA_PIPELINE" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DYNAMO_DB_FULL_ACCESSWITH_DATA_PIPELINE"></a>

```typescript
public readonly AMAZON_DYNAMO_DB_FULL_ACCESSWITH_DATA_PIPELINE: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_DYNAMO_DB_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_DYNAMO_DB_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_DYNAMO_DB_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_DYNAMO_DB_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EC2_CONTAINER_REGISTRY_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_EC2_CONTAINER_REGISTRY_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_CONTAINER_REGISTRY_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_EC2_CONTAINER_REGISTRY_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EC2_CONTAINER_REGISTRY_POWER_USER`<sup>Required</sup> <a name="AMAZON_EC2_CONTAINER_REGISTRY_POWER_USER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_CONTAINER_REGISTRY_POWER_USER"></a>

```typescript
public readonly AMAZON_EC2_CONTAINER_REGISTRY_POWER_USER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EC2_CONTAINER_REGISTRY_PULL_ONLY`<sup>Required</sup> <a name="AMAZON_EC2_CONTAINER_REGISTRY_PULL_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_CONTAINER_REGISTRY_PULL_ONLY"></a>

```typescript
public readonly AMAZON_EC2_CONTAINER_REGISTRY_PULL_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EC2_CONTAINER_REGISTRY_READ_ONLY`<sup>Required</sup> <a name="AMAZON_EC2_CONTAINER_REGISTRY_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_CONTAINER_REGISTRY_READ_ONLY"></a>

```typescript
public readonly AMAZON_EC2_CONTAINER_REGISTRY_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EC2_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_EC2_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_EC2_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EC2_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_EC2_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_EC2_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EC2_ROLE_POLICY_FOR_LAUNCH_WIZARD`<sup>Required</sup> <a name="AMAZON_EC2_ROLE_POLICY_FOR_LAUNCH_WIZARD" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EC2_ROLE_POLICY_FOR_LAUNCH_WIZARD"></a>

```typescript
public readonly AMAZON_EC2_ROLE_POLICY_FOR_LAUNCH_WIZARD: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ECS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ECS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ECS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ECS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ECS_INFRASTRUCTURE_ROLE_POLICY_FOR_VPC_LATTICE`<sup>Required</sup> <a name="AMAZON_ECS_INFRASTRUCTURE_ROLE_POLICY_FOR_VPC_LATTICE" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ECS_INFRASTRUCTURE_ROLE_POLICY_FOR_VPC_LATTICE"></a>

```typescript
public readonly AMAZON_ECS_INFRASTRUCTURE_ROLE_POLICY_FOR_VPC_LATTICE: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EKS_BLOCK_STORAGE_POLICY`<sup>Required</sup> <a name="AMAZON_EKS_BLOCK_STORAGE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_BLOCK_STORAGE_POLICY"></a>

```typescript
public readonly AMAZON_EKS_BLOCK_STORAGE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EKS_CLUSTER_POLICY`<sup>Required</sup> <a name="AMAZON_EKS_CLUSTER_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_CLUSTER_POLICY"></a>

```typescript
public readonly AMAZON_EKS_CLUSTER_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EKS_CNI_POLICY`<sup>Required</sup> <a name="AMAZON_EKS_CNI_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_CNI_POLICY"></a>

```typescript
public readonly AMAZON_EKS_CNI_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EKS_COMPUTE_POLICY`<sup>Required</sup> <a name="AMAZON_EKS_COMPUTE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_COMPUTE_POLICY"></a>

```typescript
public readonly AMAZON_EKS_COMPUTE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EKS_FARGATE_POD_EXECUTION_ROLE_POLICY`<sup>Required</sup> <a name="AMAZON_EKS_FARGATE_POD_EXECUTION_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_FARGATE_POD_EXECUTION_ROLE_POLICY"></a>

```typescript
public readonly AMAZON_EKS_FARGATE_POD_EXECUTION_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EKS_LOAD_BALANCING_POLICY`<sup>Required</sup> <a name="AMAZON_EKS_LOAD_BALANCING_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_LOAD_BALANCING_POLICY"></a>

```typescript
public readonly AMAZON_EKS_LOAD_BALANCING_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EKS_LOCAL_OUTPOST_CLUSTER_POLICY`<sup>Required</sup> <a name="AMAZON_EKS_LOCAL_OUTPOST_CLUSTER_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_LOCAL_OUTPOST_CLUSTER_POLICY"></a>

```typescript
public readonly AMAZON_EKS_LOCAL_OUTPOST_CLUSTER_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EKS_NETWORKING_POLICY`<sup>Required</sup> <a name="AMAZON_EKS_NETWORKING_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_NETWORKING_POLICY"></a>

```typescript
public readonly AMAZON_EKS_NETWORKING_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EKS_SERVICE_POLICY`<sup>Required</sup> <a name="AMAZON_EKS_SERVICE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_SERVICE_POLICY"></a>

```typescript
public readonly AMAZON_EKS_SERVICE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EKS_WORKER_NODE_MINIMAL_POLICY`<sup>Required</sup> <a name="AMAZON_EKS_WORKER_NODE_MINIMAL_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_WORKER_NODE_MINIMAL_POLICY"></a>

```typescript
public readonly AMAZON_EKS_WORKER_NODE_MINIMAL_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EKS_WORKER_NODE_POLICY`<sup>Required</sup> <a name="AMAZON_EKS_WORKER_NODE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKS_WORKER_NODE_POLICY"></a>

```typescript
public readonly AMAZON_EKS_WORKER_NODE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EKSVPC_RESOURCE_CONTROLLER`<sup>Required</sup> <a name="AMAZON_EKSVPC_RESOURCE_CONTROLLER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EKSVPC_RESOURCE_CONTROLLER"></a>

```typescript
public readonly AMAZON_EKSVPC_RESOURCE_CONTROLLER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTI_CACHE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ELASTI_CACHE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTI_CACHE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ELASTI_CACHE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTI_CACHE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ELASTI_CACHE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTI_CACHE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ELASTI_CACHE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_POWER_USER`<sup>Required</sup> <a name="AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_POWER_USER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_POWER_USER"></a>

```typescript
public readonly AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_POWER_USER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_READ_ONLY`<sup>Required</sup> <a name="AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_READ_ONLY"></a>

```typescript
public readonly AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_WRITE_ACCESS`<sup>Required</sup> <a name="AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_WRITE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_WRITE_ACCESS"></a>

```typescript
public readonly AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_WRITE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_FILE_SYSTEM_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ELASTIC_FILE_SYSTEM_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_FILE_SYSTEM_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ELASTIC_FILE_SYSTEM_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_FILE_SYSTEM_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ELASTIC_FILE_SYSTEM_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_FILE_SYSTEM_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ELASTIC_FILE_SYSTEM_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_FILE_SYSTEMS_UTILS`<sup>Required</sup> <a name="AMAZON_ELASTIC_FILE_SYSTEMS_UTILS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_FILE_SYSTEMS_UTILS"></a>

```typescript
public readonly AMAZON_ELASTIC_FILE_SYSTEMS_UTILS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_MAP_REDUCE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ELASTIC_MAP_REDUCE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_MAP_REDUCE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ELASTIC_MAP_REDUCE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_MAP_REDUCE_PLACEMENT_GROUP_POLICY`<sup>Required</sup> <a name="AMAZON_ELASTIC_MAP_REDUCE_PLACEMENT_GROUP_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_MAP_REDUCE_PLACEMENT_GROUP_POLICY"></a>

```typescript
public readonly AMAZON_ELASTIC_MAP_REDUCE_PLACEMENT_GROUP_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_MAP_REDUCE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ELASTIC_MAP_REDUCE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_MAP_REDUCE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ELASTIC_MAP_REDUCE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_TRANSCODER_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ELASTIC_TRANSCODER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_TRANSCODER_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ELASTIC_TRANSCODER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_TRANSCODER_JOBS_SUBMITTER`<sup>Required</sup> <a name="AMAZON_ELASTIC_TRANSCODER_JOBS_SUBMITTER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_TRANSCODER_JOBS_SUBMITTER"></a>

```typescript
public readonly AMAZON_ELASTIC_TRANSCODER_JOBS_SUBMITTER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ELASTIC_TRANSCODER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ELASTIC_TRANSCODER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ELASTIC_TRANSCODER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ELASTIC_TRANSCODER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EMR_FULL_ACCESS_POLICY_V2`<sup>Required</sup> <a name="AMAZON_EMR_FULL_ACCESS_POLICY_V2" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EMR_FULL_ACCESS_POLICY_V2"></a>

```typescript
public readonly AMAZON_EMR_FULL_ACCESS_POLICY_V2: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EMR_READ_ONLY_ACCESS_POLICY_V2`<sup>Required</sup> <a name="AMAZON_EMR_READ_ONLY_ACCESS_POLICY_V2" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EMR_READ_ONLY_ACCESS_POLICY_V2"></a>

```typescript
public readonly AMAZON_EMR_READ_ONLY_ACCESS_POLICY_V2: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ES_COGNITO_ACCESS`<sup>Required</sup> <a name="AMAZON_ES_COGNITO_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ES_COGNITO_ACCESS"></a>

```typescript
public readonly AMAZON_ES_COGNITO_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ES_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ES_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ES_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ES_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ES_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ES_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ES_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ES_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EVENT_BRIDGE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_EVENT_BRIDGE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_EVENT_BRIDGE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EVENT_BRIDGE_PIPES_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_EVENT_BRIDGE_PIPES_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_PIPES_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_EVENT_BRIDGE_PIPES_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EVENT_BRIDGE_PIPES_OPERATOR_ACCESS`<sup>Required</sup> <a name="AMAZON_EVENT_BRIDGE_PIPES_OPERATOR_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_PIPES_OPERATOR_ACCESS"></a>

```typescript
public readonly AMAZON_EVENT_BRIDGE_PIPES_OPERATOR_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EVENT_BRIDGE_PIPES_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_EVENT_BRIDGE_PIPES_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_PIPES_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_EVENT_BRIDGE_PIPES_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EVENT_BRIDGE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_EVENT_BRIDGE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_EVENT_BRIDGE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EVENT_BRIDGE_SCHEDULER_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_EVENT_BRIDGE_SCHEDULER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_SCHEDULER_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_EVENT_BRIDGE_SCHEDULER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EVENT_BRIDGE_SCHEDULER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_EVENT_BRIDGE_SCHEDULER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_SCHEDULER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_EVENT_BRIDGE_SCHEDULER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EVENT_BRIDGE_SCHEMAS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_EVENT_BRIDGE_SCHEMAS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_SCHEMAS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_EVENT_BRIDGE_SCHEMAS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_EVENT_BRIDGE_SCHEMAS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_EVENT_BRIDGE_SCHEMAS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_EVENT_BRIDGE_SCHEMAS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_EVENT_BRIDGE_SCHEMAS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_F_SX_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_F_SX_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_F_SX_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_F_SX_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_F_SX_CONSOLE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_F_SX_CONSOLE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_F_SX_CONSOLE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_F_SX_CONSOLE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_F_SX_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_F_SX_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_F_SX_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_F_SX_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_F_SX_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_F_SX_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_F_SX_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_F_SX_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_FORECAST_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_FORECAST_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_FORECAST_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_FORECAST_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_FRAUD_DETECTOR_FULL_ACCESS_POLICY`<sup>Required</sup> <a name="AMAZON_FRAUD_DETECTOR_FULL_ACCESS_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_FRAUD_DETECTOR_FULL_ACCESS_POLICY"></a>

```typescript
public readonly AMAZON_FRAUD_DETECTOR_FULL_ACCESS_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_FREE_RTOS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_FREE_RTOS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_FREE_RTOS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_FREE_RTOS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_GLACIER_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_GLACIER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_GLACIER_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_GLACIER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_GLACIER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_GLACIER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_GLACIER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_GLACIER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_GUARD_DUTY_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_GUARD_DUTY_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_GUARD_DUTY_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_GUARD_DUTY_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_GUARD_DUTY_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_GUARD_DUTY_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_GUARD_DUTY_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_GUARD_DUTY_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_HEALTH_LAKE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_HEALTH_LAKE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HEALTH_LAKE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_HEALTH_LAKE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_HEALTH_LAKE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_HEALTH_LAKE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HEALTH_LAKE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_HEALTH_LAKE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_HONEYCODE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_HONEYCODE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HONEYCODE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_HONEYCODE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_HONEYCODE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_HONEYCODE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HONEYCODE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_HONEYCODE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_HONEYCODE_TEAM_ASSOCIATION_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_HONEYCODE_TEAM_ASSOCIATION_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HONEYCODE_TEAM_ASSOCIATION_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_HONEYCODE_TEAM_ASSOCIATION_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_HONEYCODE_TEAM_ASSOCIATION_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_HONEYCODE_TEAM_ASSOCIATION_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HONEYCODE_TEAM_ASSOCIATION_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_HONEYCODE_TEAM_ASSOCIATION_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_HONEYCODE_WORKBOOK_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_HONEYCODE_WORKBOOK_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HONEYCODE_WORKBOOK_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_HONEYCODE_WORKBOOK_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_HONEYCODE_WORKBOOK_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_HONEYCODE_WORKBOOK_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_HONEYCODE_WORKBOOK_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_HONEYCODE_WORKBOOK_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_INSPECTOR_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_INSPECTOR_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_INSPECTOR_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_INSPECTOR_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_INSPECTOR_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_INSPECTOR_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_INSPECTOR_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_INSPECTOR_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_INSPECTOR2_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_INSPECTOR2_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_INSPECTOR2_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_INSPECTOR2_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_INSPECTOR2_MANAGED_CIS_POLICY`<sup>Required</sup> <a name="AMAZON_INSPECTOR2_MANAGED_CIS_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_INSPECTOR2_MANAGED_CIS_POLICY"></a>

```typescript
public readonly AMAZON_INSPECTOR2_MANAGED_CIS_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_INSPECTOR2_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_INSPECTOR2_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_INSPECTOR2_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_INSPECTOR2_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_KENDRA_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_KENDRA_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KENDRA_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_KENDRA_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_KENDRA_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_KENDRA_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KENDRA_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_KENDRA_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_KEYSPACES_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_KEYSPACES_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KEYSPACES_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_KEYSPACES_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_KEYSPACES_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_KEYSPACES_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KEYSPACES_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_KEYSPACES_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_KEYSPACES_READ_ONLY_ACCESS_V2`<sup>Required</sup> <a name="AMAZON_KEYSPACES_READ_ONLY_ACCESS_V2" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KEYSPACES_READ_ONLY_ACCESS_V2"></a>

```typescript
public readonly AMAZON_KEYSPACES_READ_ONLY_ACCESS_V2: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_KINESIS_ANALYTICS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_KINESIS_ANALYTICS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_ANALYTICS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_KINESIS_ANALYTICS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_KINESIS_ANALYTICS_READ_ONLY`<sup>Required</sup> <a name="AMAZON_KINESIS_ANALYTICS_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_ANALYTICS_READ_ONLY"></a>

```typescript
public readonly AMAZON_KINESIS_ANALYTICS_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_KINESIS_FIREHOSE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_KINESIS_FIREHOSE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_FIREHOSE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_KINESIS_FIREHOSE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_KINESIS_FIREHOSE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_KINESIS_FIREHOSE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_FIREHOSE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_KINESIS_FIREHOSE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_KINESIS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_KINESIS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_KINESIS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_KINESIS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_KINESIS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_KINESIS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_KINESIS_VIDEO_STREAMS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_KINESIS_VIDEO_STREAMS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_VIDEO_STREAMS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_KINESIS_VIDEO_STREAMS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_KINESIS_VIDEO_STREAMS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_KINESIS_VIDEO_STREAMS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_KINESIS_VIDEO_STREAMS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_KINESIS_VIDEO_STREAMS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_LAUNCH_WIZARD_FULL_ACCESS_V2`<sup>Required</sup> <a name="AMAZON_LAUNCH_WIZARD_FULL_ACCESS_V2" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LAUNCH_WIZARD_FULL_ACCESS_V2"></a>

```typescript
public readonly AMAZON_LAUNCH_WIZARD_FULL_ACCESS_V2: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_LEX_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_LEX_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LEX_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_LEX_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_LEX_READ_ONLY`<sup>Required</sup> <a name="AMAZON_LEX_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LEX_READ_ONLY"></a>

```typescript
public readonly AMAZON_LEX_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_LEX_RUN_BOTS_ONLY`<sup>Required</sup> <a name="AMAZON_LEX_RUN_BOTS_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LEX_RUN_BOTS_ONLY"></a>

```typescript
public readonly AMAZON_LEX_RUN_BOTS_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_LOOKOUT_EQUIPMENT_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_LOOKOUT_EQUIPMENT_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_EQUIPMENT_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_LOOKOUT_EQUIPMENT_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_LOOKOUT_EQUIPMENT_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_LOOKOUT_EQUIPMENT_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_EQUIPMENT_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_LOOKOUT_EQUIPMENT_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_LOOKOUT_METRICS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_LOOKOUT_METRICS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_METRICS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_LOOKOUT_METRICS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_LOOKOUT_METRICS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_LOOKOUT_METRICS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_METRICS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_LOOKOUT_METRICS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_LOOKOUT_VISION_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_LOOKOUT_VISION_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_VISION_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_LOOKOUT_VISION_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_LOOKOUT_VISION_CONSOLE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_LOOKOUT_VISION_CONSOLE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_VISION_CONSOLE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_LOOKOUT_VISION_CONSOLE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_LOOKOUT_VISION_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_LOOKOUT_VISION_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_VISION_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_LOOKOUT_VISION_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_LOOKOUT_VISION_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_LOOKOUT_VISION_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_LOOKOUT_VISION_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_LOOKOUT_VISION_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MACHINE_LEARNING_BATCH_PREDICTIONS_ACCESS`<sup>Required</sup> <a name="AMAZON_MACHINE_LEARNING_BATCH_PREDICTIONS_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACHINE_LEARNING_BATCH_PREDICTIONS_ACCESS"></a>

```typescript
public readonly AMAZON_MACHINE_LEARNING_BATCH_PREDICTIONS_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MACHINE_LEARNING_CREATE_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_MACHINE_LEARNING_CREATE_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACHINE_LEARNING_CREATE_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_MACHINE_LEARNING_CREATE_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MACHINE_LEARNING_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_MACHINE_LEARNING_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACHINE_LEARNING_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_MACHINE_LEARNING_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MACHINE_LEARNING_MANAGE_REAL_TIME_ENDPOINT_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_MACHINE_LEARNING_MANAGE_REAL_TIME_ENDPOINT_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACHINE_LEARNING_MANAGE_REAL_TIME_ENDPOINT_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_MACHINE_LEARNING_MANAGE_REAL_TIME_ENDPOINT_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MACHINE_LEARNING_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_MACHINE_LEARNING_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACHINE_LEARNING_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_MACHINE_LEARNING_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MACHINE_LEARNING_REAL_TIME_PREDICTION_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_MACHINE_LEARNING_REAL_TIME_PREDICTION_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACHINE_LEARNING_REAL_TIME_PREDICTION_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_MACHINE_LEARNING_REAL_TIME_PREDICTION_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MACIE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_MACIE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACIE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_MACIE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MACIE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_MACIE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MACIE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_MACIE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MANAGED_BLOCKCHAIN_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_MANAGED_BLOCKCHAIN_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MANAGED_BLOCKCHAIN_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_MANAGED_BLOCKCHAIN_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MANAGED_BLOCKCHAIN_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_MANAGED_BLOCKCHAIN_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MANAGED_BLOCKCHAIN_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_MANAGED_BLOCKCHAIN_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MANAGED_BLOCKCHAIN_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_MANAGED_BLOCKCHAIN_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MANAGED_BLOCKCHAIN_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_MANAGED_BLOCKCHAIN_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MCS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_MCS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MCS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_MCS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MCS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_MCS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MCS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_MCS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MECHANICAL_TURK_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_MECHANICAL_TURK_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MECHANICAL_TURK_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_MECHANICAL_TURK_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MECHANICAL_TURK_READ_ONLY`<sup>Required</sup> <a name="AMAZON_MECHANICAL_TURK_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MECHANICAL_TURK_READ_ONLY"></a>

```typescript
public readonly AMAZON_MECHANICAL_TURK_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MEMORY_DB_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_MEMORY_DB_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MEMORY_DB_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_MEMORY_DB_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MEMORY_DB_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_MEMORY_DB_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MEMORY_DB_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_MEMORY_DB_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MOBILE_ANALYTICS_FINANCIAL_REPORT_ACCESS`<sup>Required</sup> <a name="AMAZON_MOBILE_ANALYTICS_FINANCIAL_REPORT_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MOBILE_ANALYTICS_FINANCIAL_REPORT_ACCESS"></a>

```typescript
public readonly AMAZON_MOBILE_ANALYTICS_FINANCIAL_REPORT_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MOBILE_ANALYTICS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_MOBILE_ANALYTICS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MOBILE_ANALYTICS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_MOBILE_ANALYTICS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MOBILE_ANALYTICS_NON_FINANCIAL_REPORT_ACCESS`<sup>Required</sup> <a name="AMAZON_MOBILE_ANALYTICS_NON_FINANCIAL_REPORT_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MOBILE_ANALYTICS_NON_FINANCIAL_REPORT_ACCESS"></a>

```typescript
public readonly AMAZON_MOBILE_ANALYTICS_NON_FINANCIAL_REPORT_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MOBILE_ANALYTICS_WRITE_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_MOBILE_ANALYTICS_WRITE_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MOBILE_ANALYTICS_WRITE_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_MOBILE_ANALYTICS_WRITE_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MONITRON_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_MONITRON_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MONITRON_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_MONITRON_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MQ_API_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_MQ_API_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MQ_API_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_MQ_API_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MQ_API_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_MQ_API_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MQ_API_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_MQ_API_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MQ_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_MQ_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MQ_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_MQ_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MQ_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_MQ_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MQ_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_MQ_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MSK_CONNECT_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_MSK_CONNECT_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MSK_CONNECT_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_MSK_CONNECT_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MSK_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_MSK_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MSK_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_MSK_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_MSK_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_MSK_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_MSK_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_MSK_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_NIMBLE_STUDIO_LAUNCH_PROFILE_WORKER`<sup>Required</sup> <a name="AMAZON_NIMBLE_STUDIO_LAUNCH_PROFILE_WORKER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_NIMBLE_STUDIO_LAUNCH_PROFILE_WORKER"></a>

```typescript
public readonly AMAZON_NIMBLE_STUDIO_LAUNCH_PROFILE_WORKER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_NIMBLE_STUDIO_STUDIO_ADMIN`<sup>Required</sup> <a name="AMAZON_NIMBLE_STUDIO_STUDIO_ADMIN" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_NIMBLE_STUDIO_STUDIO_ADMIN"></a>

```typescript
public readonly AMAZON_NIMBLE_STUDIO_STUDIO_ADMIN: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_NIMBLE_STUDIO_STUDIO_USER`<sup>Required</sup> <a name="AMAZON_NIMBLE_STUDIO_STUDIO_USER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_NIMBLE_STUDIO_STUDIO_USER"></a>

```typescript
public readonly AMAZON_NIMBLE_STUDIO_STUDIO_USER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_OMICS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_OMICS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OMICS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_OMICS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_OMICS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_OMICS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OMICS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_OMICS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ONE_ENTERPRISE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ONE_ENTERPRISE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ONE_ENTERPRISE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ONE_ENTERPRISE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ONE_ENTERPRISE_INSTALLER_ACCESS`<sup>Required</sup> <a name="AMAZON_ONE_ENTERPRISE_INSTALLER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ONE_ENTERPRISE_INSTALLER_ACCESS"></a>

```typescript
public readonly AMAZON_ONE_ENTERPRISE_INSTALLER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ONE_ENTERPRISE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ONE_ENTERPRISE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ONE_ENTERPRISE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ONE_ENTERPRISE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_OPEN_SEARCH_DIRECT_QUERY_GLUE_CREATE_ACCESS`<sup>Required</sup> <a name="AMAZON_OPEN_SEARCH_DIRECT_QUERY_GLUE_CREATE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OPEN_SEARCH_DIRECT_QUERY_GLUE_CREATE_ACCESS"></a>

```typescript
public readonly AMAZON_OPEN_SEARCH_DIRECT_QUERY_GLUE_CREATE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_OPEN_SEARCH_INGESTION_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_OPEN_SEARCH_INGESTION_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OPEN_SEARCH_INGESTION_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_OPEN_SEARCH_INGESTION_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_OPEN_SEARCH_INGESTION_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_OPEN_SEARCH_INGESTION_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OPEN_SEARCH_INGESTION_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_OPEN_SEARCH_INGESTION_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_OPEN_SEARCH_SERVICE_COGNITO_ACCESS`<sup>Required</sup> <a name="AMAZON_OPEN_SEARCH_SERVICE_COGNITO_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OPEN_SEARCH_SERVICE_COGNITO_ACCESS"></a>

```typescript
public readonly AMAZON_OPEN_SEARCH_SERVICE_COGNITO_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_OPEN_SEARCH_SERVICE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_OPEN_SEARCH_SERVICE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OPEN_SEARCH_SERVICE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_OPEN_SEARCH_SERVICE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_OPEN_SEARCH_SERVICE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_OPEN_SEARCH_SERVICE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_OPEN_SEARCH_SERVICE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_OPEN_SEARCH_SERVICE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_POLLY_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_POLLY_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_POLLY_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_POLLY_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_POLLY_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_POLLY_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_POLLY_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_POLLY_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_PROMETHEUS_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_PROMETHEUS_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_PROMETHEUS_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_PROMETHEUS_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_PROMETHEUS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_PROMETHEUS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_PROMETHEUS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_PROMETHEUS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_PROMETHEUS_QUERY_ACCESS`<sup>Required</sup> <a name="AMAZON_PROMETHEUS_QUERY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_PROMETHEUS_QUERY_ACCESS"></a>

```typescript
public readonly AMAZON_PROMETHEUS_QUERY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_PROMETHEUS_REMOTE_WRITE_ACCESS`<sup>Required</sup> <a name="AMAZON_PROMETHEUS_REMOTE_WRITE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_PROMETHEUS_REMOTE_WRITE_ACCESS"></a>

```typescript
public readonly AMAZON_PROMETHEUS_REMOTE_WRITE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_Q_DEVELOPER_ACCESS`<sup>Required</sup> <a name="AMAZON_Q_DEVELOPER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_Q_DEVELOPER_ACCESS"></a>

```typescript
public readonly AMAZON_Q_DEVELOPER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_Q_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_Q_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_Q_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_Q_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_QLDB_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_QLDB_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_QLDB_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_QLDB_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_QLDB_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_QLDB_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_QLDB_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_QLDB_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_QLDB_READ_ONLY`<sup>Required</sup> <a name="AMAZON_QLDB_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_QLDB_READ_ONLY"></a>

```typescript
public readonly AMAZON_QLDB_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_RDS_CUSTOM_INSTANCE_PROFILE_ROLE_POLICY`<sup>Required</sup> <a name="AMAZON_RDS_CUSTOM_INSTANCE_PROFILE_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_RDS_CUSTOM_INSTANCE_PROFILE_ROLE_POLICY"></a>

```typescript
public readonly AMAZON_RDS_CUSTOM_INSTANCE_PROFILE_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_RDS_DATA_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_RDS_DATA_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_RDS_DATA_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_RDS_DATA_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_RDS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_RDS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_RDS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_RDS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_RDS_PERFORMANCE_INSIGHTS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_RDS_PERFORMANCE_INSIGHTS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_RDS_PERFORMANCE_INSIGHTS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_RDS_PERFORMANCE_INSIGHTS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_RDS_PERFORMANCE_INSIGHTS_READ_ONLY`<sup>Required</sup> <a name="AMAZON_RDS_PERFORMANCE_INSIGHTS_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_RDS_PERFORMANCE_INSIGHTS_READ_ONLY"></a>

```typescript
public readonly AMAZON_RDS_PERFORMANCE_INSIGHTS_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_RDS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_RDS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_RDS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_RDS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_REDSHIFT_ALL_COMMANDS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_REDSHIFT_ALL_COMMANDS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_ALL_COMMANDS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_REDSHIFT_ALL_COMMANDS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_REDSHIFT_DATA_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_REDSHIFT_DATA_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_DATA_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_REDSHIFT_DATA_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_REDSHIFT_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_REDSHIFT_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_REDSHIFT_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_REDSHIFT_QUERY_EDITOR`<sup>Required</sup> <a name="AMAZON_REDSHIFT_QUERY_EDITOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_QUERY_EDITOR"></a>

```typescript
public readonly AMAZON_REDSHIFT_QUERY_EDITOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_REDSHIFT_QUERY_EDITOR_V2_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_REDSHIFT_QUERY_EDITOR_V2_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_QUERY_EDITOR_V2_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_REDSHIFT_QUERY_EDITOR_V2_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_REDSHIFT_QUERY_EDITOR_V2_NO_SHARING`<sup>Required</sup> <a name="AMAZON_REDSHIFT_QUERY_EDITOR_V2_NO_SHARING" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_QUERY_EDITOR_V2_NO_SHARING"></a>

```typescript
public readonly AMAZON_REDSHIFT_QUERY_EDITOR_V2_NO_SHARING: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_SHARING`<sup>Required</sup> <a name="AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_SHARING" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_SHARING"></a>

```typescript
public readonly AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_SHARING: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_WRITE_SHARING`<sup>Required</sup> <a name="AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_WRITE_SHARING" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_WRITE_SHARING"></a>

```typescript
public readonly AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_WRITE_SHARING: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_REDSHIFT_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_REDSHIFT_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REDSHIFT_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_REDSHIFT_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_REKOGNITION_CUSTOM_LABELS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_REKOGNITION_CUSTOM_LABELS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REKOGNITION_CUSTOM_LABELS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_REKOGNITION_CUSTOM_LABELS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_REKOGNITION_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_REKOGNITION_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REKOGNITION_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_REKOGNITION_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_REKOGNITION_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_REKOGNITION_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_REKOGNITION_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_REKOGNITION_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_AUTO_NAMING_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_AUTO_NAMING_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_AUTO_NAMING_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_AUTO_NAMING_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_AUTO_NAMING_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_AUTO_NAMING_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_AUTO_NAMING_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_AUTO_NAMING_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_AUTO_NAMING_REGISTRANT_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_AUTO_NAMING_REGISTRANT_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_AUTO_NAMING_REGISTRANT_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_AUTO_NAMING_REGISTRANT_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_DOMAINS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_DOMAINS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_DOMAINS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_DOMAINS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_DOMAINS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_DOMAINS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_DOMAINS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_DOMAINS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_PROFILES_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_PROFILES_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_PROFILES_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_PROFILES_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_PROFILES_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_PROFILES_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_PROFILES_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_PROFILES_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_RECOVERY_CLUSTER_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_RECOVERY_CLUSTER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RECOVERY_CLUSTER_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_RECOVERY_CLUSTER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_RECOVERY_CLUSTER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_RECOVERY_CLUSTER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RECOVERY_CLUSTER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_RECOVERY_CLUSTER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_RECOVERY_READINESS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_RECOVERY_READINESS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RECOVERY_READINESS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_RECOVERY_READINESS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_RECOVERY_READINESS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_RECOVERY_READINESS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RECOVERY_READINESS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_RECOVERY_READINESS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_RESOLVER_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_RESOLVER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RESOLVER_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_RESOLVER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ROUTE53_RESOLVER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ROUTE53_RESOLVER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ROUTE53_RESOLVER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ROUTE53_RESOLVER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_S3_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_S3_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_S3_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_S3_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_S3_OUTPOSTS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_S3_OUTPOSTS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_S3_OUTPOSTS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_S3_OUTPOSTS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_S3_OUTPOSTS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_S3_OUTPOSTS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_S3_OUTPOSTS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_S3_OUTPOSTS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_S3_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_S3_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_S3_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_S3_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_S3_TABLES_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_S3_TABLES_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_S3_TABLES_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_S3_TABLES_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_S3_TABLES_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_S3_TABLES_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_S3_TABLES_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_S3_TABLES_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_ADMIN_SERVICE_CATALOG_PRODUCTS_SERVICE_ROLE_POLICY`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_ADMIN_SERVICE_CATALOG_PRODUCTS_SERVICE_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_ADMIN_SERVICE_CATALOG_PRODUCTS_SERVICE_ROLE_POLICY"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_ADMIN_SERVICE_CATALOG_PRODUCTS_SERVICE_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_CANVAS_AI_SERVICES_ACCESS`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_CANVAS_AI_SERVICES_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CANVAS_AI_SERVICES_ACCESS"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_CANVAS_AI_SERVICES_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_CANVAS_BEDROCK_ACCESS`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_CANVAS_BEDROCK_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CANVAS_BEDROCK_ACCESS"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_CANVAS_BEDROCK_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_CANVAS_DATA_PREP_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_CANVAS_DATA_PREP_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CANVAS_DATA_PREP_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_CANVAS_DATA_PREP_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_CANVAS_EMR_SERVERLESS_EXECUTION_ROLE_POLICY`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_CANVAS_EMR_SERVERLESS_EXECUTION_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CANVAS_EMR_SERVERLESS_EXECUTION_ROLE_POLICY"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_CANVAS_EMR_SERVERLESS_EXECUTION_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_CANVAS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_CANVAS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CANVAS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_CANVAS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_CANVAS_SM_DATA_SCIENCE_ASSISTANT_ACCESS`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_CANVAS_SM_DATA_SCIENCE_ASSISTANT_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CANVAS_SM_DATA_SCIENCE_ASSISTANT_ACCESS"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_CANVAS_SM_DATA_SCIENCE_ASSISTANT_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_CLUSTER_INSTANCE_ROLE_POLICY`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_CLUSTER_INSTANCE_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_CLUSTER_INSTANCE_ROLE_POLICY"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_CLUSTER_INSTANCE_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_FEATURE_STORE_ACCESS`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_FEATURE_STORE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_FEATURE_STORE_ACCESS"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_FEATURE_STORE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_GROUND_TRUTH_EXECUTION`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_GROUND_TRUTH_EXECUTION" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_GROUND_TRUTH_EXECUTION"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_GROUND_TRUTH_EXECUTION: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_MECHANICAL_TURK_ACCESS`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_MECHANICAL_TURK_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_MECHANICAL_TURK_ACCESS"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_MECHANICAL_TURK_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_MODEL_GOVERNANCE_USE_ACCESS`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_MODEL_GOVERNANCE_USE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_MODEL_GOVERNANCE_USE_ACCESS"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_MODEL_GOVERNANCE_USE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_MODEL_REGISTRY_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_MODEL_REGISTRY_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_MODEL_REGISTRY_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_MODEL_REGISTRY_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_PARTNER_APPS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_PARTNER_APPS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_PARTNER_APPS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_PARTNER_APPS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_PIPELINES_INTEGRATIONS`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_PIPELINES_INTEGRATIONS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_PIPELINES_INTEGRATIONS"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_PIPELINES_INTEGRATIONS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_READ_ONLY`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_READ_ONLY"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_SERVICE_CATALOG_PRODUCTS_CODE_BUILD_SERVICE_ROLE_POLICY`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_SERVICE_CATALOG_PRODUCTS_CODE_BUILD_SERVICE_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_SERVICE_CATALOG_PRODUCTS_CODE_BUILD_SERVICE_ROLE_POLICY"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_SERVICE_CATALOG_PRODUCTS_CODE_BUILD_SERVICE_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SAGE_MAKER_TRAINING_PLAN_CREATE_ACCESS`<sup>Required</sup> <a name="AMAZON_SAGE_MAKER_TRAINING_PLAN_CREATE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SAGE_MAKER_TRAINING_PLAN_CREATE_ACCESS"></a>

```typescript
public readonly AMAZON_SAGE_MAKER_TRAINING_PLAN_CREATE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SECURITY_LAKE_ADMINISTRATOR`<sup>Required</sup> <a name="AMAZON_SECURITY_LAKE_ADMINISTRATOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SECURITY_LAKE_ADMINISTRATOR"></a>

```typescript
public readonly AMAZON_SECURITY_LAKE_ADMINISTRATOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SECURITY_LAKE_PERMISSIONS_BOUNDARY`<sup>Required</sup> <a name="AMAZON_SECURITY_LAKE_PERMISSIONS_BOUNDARY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SECURITY_LAKE_PERMISSIONS_BOUNDARY"></a>

```typescript
public readonly AMAZON_SECURITY_LAKE_PERMISSIONS_BOUNDARY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SES_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_SES_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SES_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_SES_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SES_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_SES_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SES_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_SES_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SNS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_SNS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SNS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_SNS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SNS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_SNS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SNS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_SNS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SQS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_SQS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SQS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_SQS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SQS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_SQS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SQS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_SQS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SSM_AUTOMATION_APPROVER_ACCESS`<sup>Required</sup> <a name="AMAZON_SSM_AUTOMATION_APPROVER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_AUTOMATION_APPROVER_ACCESS"></a>

```typescript
public readonly AMAZON_SSM_AUTOMATION_APPROVER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SSM_DIRECTORY_SERVICE_ACCESS`<sup>Required</sup> <a name="AMAZON_SSM_DIRECTORY_SERVICE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_DIRECTORY_SERVICE_ACCESS"></a>

```typescript
public readonly AMAZON_SSM_DIRECTORY_SERVICE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SSM_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_SSM_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_SSM_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SSM_MANAGED_EC2_INSTANCE_DEFAULT_POLICY`<sup>Required</sup> <a name="AMAZON_SSM_MANAGED_EC2_INSTANCE_DEFAULT_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_MANAGED_EC2_INSTANCE_DEFAULT_POLICY"></a>

```typescript
public readonly AMAZON_SSM_MANAGED_EC2_INSTANCE_DEFAULT_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SSM_MANAGED_INSTANCE_CORE`<sup>Required</sup> <a name="AMAZON_SSM_MANAGED_INSTANCE_CORE" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_MANAGED_INSTANCE_CORE"></a>

```typescript
public readonly AMAZON_SSM_MANAGED_INSTANCE_CORE: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SSM_PATCH_ASSOCIATION`<sup>Required</sup> <a name="AMAZON_SSM_PATCH_ASSOCIATION" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_PATCH_ASSOCIATION"></a>

```typescript
public readonly AMAZON_SSM_PATCH_ASSOCIATION: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_SSM_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_SSM_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_SSM_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_SSM_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_TEXTRACT_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_TEXTRACT_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TEXTRACT_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_TEXTRACT_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_TIMESTREAM_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_TIMESTREAM_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TIMESTREAM_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_TIMESTREAM_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_TIMESTREAM_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_TIMESTREAM_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TIMESTREAM_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_TIMESTREAM_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_TIMESTREAM_INFLUX_DB_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_TIMESTREAM_INFLUX_DB_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TIMESTREAM_INFLUX_DB_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_TIMESTREAM_INFLUX_DB_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_TIMESTREAM_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_TIMESTREAM_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TIMESTREAM_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_TIMESTREAM_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_TRANSCRIBE_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_TRANSCRIBE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TRANSCRIBE_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_TRANSCRIBE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_TRANSCRIBE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_TRANSCRIBE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_TRANSCRIBE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_TRANSCRIBE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_VERIFIED_PERMISSIONS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_VERIFIED_PERMISSIONS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VERIFIED_PERMISSIONS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_VERIFIED_PERMISSIONS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_VERIFIED_PERMISSIONS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_VERIFIED_PERMISSIONS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VERIFIED_PERMISSIONS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_VERIFIED_PERMISSIONS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_VPC_CROSS_ACCOUNT_NETWORK_INTERFACE_OPERATIONS`<sup>Required</sup> <a name="AMAZON_VPC_CROSS_ACCOUNT_NETWORK_INTERFACE_OPERATIONS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VPC_CROSS_ACCOUNT_NETWORK_INTERFACE_OPERATIONS"></a>

```typescript
public readonly AMAZON_VPC_CROSS_ACCOUNT_NETWORK_INTERFACE_OPERATIONS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_VPC_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_VPC_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VPC_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_VPC_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_VPC_NETWORK_ACCESS_ANALYZER_FULL_ACCESS_POLICY`<sup>Required</sup> <a name="AMAZON_VPC_NETWORK_ACCESS_ANALYZER_FULL_ACCESS_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VPC_NETWORK_ACCESS_ANALYZER_FULL_ACCESS_POLICY"></a>

```typescript
public readonly AMAZON_VPC_NETWORK_ACCESS_ANALYZER_FULL_ACCESS_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_VPC_REACHABILITY_ANALYZER_FULL_ACCESS_POLICY`<sup>Required</sup> <a name="AMAZON_VPC_REACHABILITY_ANALYZER_FULL_ACCESS_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VPC_REACHABILITY_ANALYZER_FULL_ACCESS_POLICY"></a>

```typescript
public readonly AMAZON_VPC_REACHABILITY_ANALYZER_FULL_ACCESS_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_VPC_REACHABILITY_ANALYZER_PATH_COMPONENT_READ_POLICY`<sup>Required</sup> <a name="AMAZON_VPC_REACHABILITY_ANALYZER_PATH_COMPONENT_READ_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VPC_REACHABILITY_ANALYZER_PATH_COMPONENT_READ_POLICY"></a>

```typescript
public readonly AMAZON_VPC_REACHABILITY_ANALYZER_PATH_COMPONENT_READ_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_VPC_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_VPC_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_VPC_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_VPC_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_DOCS_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_WORK_DOCS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_DOCS_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_WORK_DOCS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_DOCS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_WORK_DOCS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_DOCS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_WORK_DOCS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_MAIL_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_WORK_MAIL_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_MAIL_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_WORK_MAIL_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_MAIL_MESSAGE_FLOW_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_WORK_MAIL_MESSAGE_FLOW_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_MAIL_MESSAGE_FLOW_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_WORK_MAIL_MESSAGE_FLOW_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_MAIL_MESSAGE_FLOW_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_WORK_MAIL_MESSAGE_FLOW_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_MAIL_MESSAGE_FLOW_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_WORK_MAIL_MESSAGE_FLOW_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_MAIL_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_WORK_MAIL_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_MAIL_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_WORK_MAIL_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_SPACES_ADMIN`<sup>Required</sup> <a name="AMAZON_WORK_SPACES_ADMIN" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_ADMIN"></a>

```typescript
public readonly AMAZON_WORK_SPACES_ADMIN: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_SPACES_APPLICATION_MANAGER_ADMIN_ACCESS`<sup>Required</sup> <a name="AMAZON_WORK_SPACES_APPLICATION_MANAGER_ADMIN_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_APPLICATION_MANAGER_ADMIN_ACCESS"></a>

```typescript
public readonly AMAZON_WORK_SPACES_APPLICATION_MANAGER_ADMIN_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_SPACES_POOL_SERVICE_ACCESS`<sup>Required</sup> <a name="AMAZON_WORK_SPACES_POOL_SERVICE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_POOL_SERVICE_ACCESS"></a>

```typescript
public readonly AMAZON_WORK_SPACES_POOL_SERVICE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_SPACES_SECURE_BROWSER_READ_ONLY`<sup>Required</sup> <a name="AMAZON_WORK_SPACES_SECURE_BROWSER_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_SECURE_BROWSER_READ_ONLY"></a>

```typescript
public readonly AMAZON_WORK_SPACES_SECURE_BROWSER_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_SPACES_SELF_SERVICE_ACCESS`<sup>Required</sup> <a name="AMAZON_WORK_SPACES_SELF_SERVICE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_SELF_SERVICE_ACCESS"></a>

```typescript
public readonly AMAZON_WORK_SPACES_SELF_SERVICE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_SPACES_SERVICE_ACCESS`<sup>Required</sup> <a name="AMAZON_WORK_SPACES_SERVICE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_SERVICE_ACCESS"></a>

```typescript
public readonly AMAZON_WORK_SPACES_SERVICE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_SPACES_THIN_CLIENT_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_WORK_SPACES_THIN_CLIENT_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_THIN_CLIENT_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_WORK_SPACES_THIN_CLIENT_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_SPACES_THIN_CLIENT_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_WORK_SPACES_THIN_CLIENT_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_THIN_CLIENT_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_WORK_SPACES_THIN_CLIENT_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORK_SPACES_WEB_READ_ONLY`<sup>Required</sup> <a name="AMAZON_WORK_SPACES_WEB_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORK_SPACES_WEB_READ_ONLY"></a>

```typescript
public readonly AMAZON_WORK_SPACES_WEB_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_WORKSPACES_PCA_ACCESS`<sup>Required</sup> <a name="AMAZON_WORKSPACES_PCA_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_WORKSPACES_PCA_ACCESS"></a>

```typescript
public readonly AMAZON_WORKSPACES_PCA_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ZOCALO_FULL_ACCESS`<sup>Required</sup> <a name="AMAZON_ZOCALO_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ZOCALO_FULL_ACCESS"></a>

```typescript
public readonly AMAZON_ZOCALO_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AMAZON_ZOCALO_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AMAZON_ZOCALO_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AMAZON_ZOCALO_READ_ONLY_ACCESS"></a>

```typescript
public readonly AMAZON_ZOCALO_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AUTO_SCALING_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AUTO_SCALING_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AUTO_SCALING_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AUTO_SCALING_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AUTO_SCALING_CONSOLE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AUTO_SCALING_CONSOLE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AUTO_SCALING_CONSOLE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AUTO_SCALING_CONSOLE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AUTO_SCALING_FULL_ACCESS`<sup>Required</sup> <a name="AUTO_SCALING_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AUTO_SCALING_FULL_ACCESS"></a>

```typescript
public readonly AUTO_SCALING_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AUTO_SCALING_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AUTO_SCALING_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AUTO_SCALING_READ_ONLY_ACCESS"></a>

```typescript
public readonly AUTO_SCALING_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ACCOUNT_ACTIVITY_ACCESS`<sup>Required</sup> <a name="AWS_ACCOUNT_ACTIVITY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ACCOUNT_ACTIVITY_ACCESS"></a>

```typescript
public readonly AWS_ACCOUNT_ACTIVITY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ACCOUNT_MANAGEMENT_FULL_ACCESS`<sup>Required</sup> <a name="AWS_ACCOUNT_MANAGEMENT_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ACCOUNT_MANAGEMENT_FULL_ACCESS"></a>

```typescript
public readonly AWS_ACCOUNT_MANAGEMENT_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ACCOUNT_MANAGEMENT_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_ACCOUNT_MANAGEMENT_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ACCOUNT_MANAGEMENT_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_ACCOUNT_MANAGEMENT_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ACCOUNT_USAGE_REPORT_ACCESS`<sup>Required</sup> <a name="AWS_ACCOUNT_USAGE_REPORT_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ACCOUNT_USAGE_REPORT_ACCESS"></a>

```typescript
public readonly AWS_ACCOUNT_USAGE_REPORT_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_AGENTLESS_DISCOVERY_SERVICE`<sup>Required</sup> <a name="AWS_AGENTLESS_DISCOVERY_SERVICE" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_AGENTLESS_DISCOVERY_SERVICE"></a>

```typescript
public readonly AWS_AGENTLESS_DISCOVERY_SERVICE: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APP_FABRIC_FULL_ACCESS`<sup>Required</sup> <a name="AWS_APP_FABRIC_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_FABRIC_FULL_ACCESS"></a>

```typescript
public readonly AWS_APP_FABRIC_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APP_FABRIC_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_APP_FABRIC_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_FABRIC_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_APP_FABRIC_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APP_MESH_ENVOY_ACCESS`<sup>Required</sup> <a name="AWS_APP_MESH_ENVOY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_MESH_ENVOY_ACCESS"></a>

```typescript
public readonly AWS_APP_MESH_ENVOY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APP_MESH_FULL_ACCESS`<sup>Required</sup> <a name="AWS_APP_MESH_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_MESH_FULL_ACCESS"></a>

```typescript
public readonly AWS_APP_MESH_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APP_MESH_PREVIEW_ENVOY_ACCESS`<sup>Required</sup> <a name="AWS_APP_MESH_PREVIEW_ENVOY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_MESH_PREVIEW_ENVOY_ACCESS"></a>

```typescript
public readonly AWS_APP_MESH_PREVIEW_ENVOY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APP_MESH_READ_ONLY`<sup>Required</sup> <a name="AWS_APP_MESH_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_MESH_READ_ONLY"></a>

```typescript
public readonly AWS_APP_MESH_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APP_RUNNER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_APP_RUNNER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_RUNNER_FULL_ACCESS"></a>

```typescript
public readonly AWS_APP_RUNNER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APP_RUNNER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_APP_RUNNER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_RUNNER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_APP_RUNNER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APP_SYNC_ADMINISTRATOR`<sup>Required</sup> <a name="AWS_APP_SYNC_ADMINISTRATOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_SYNC_ADMINISTRATOR"></a>

```typescript
public readonly AWS_APP_SYNC_ADMINISTRATOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APP_SYNC_INVOKE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_APP_SYNC_INVOKE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_SYNC_INVOKE_FULL_ACCESS"></a>

```typescript
public readonly AWS_APP_SYNC_INVOKE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APP_SYNC_SCHEMA_AUTHOR`<sup>Required</sup> <a name="AWS_APP_SYNC_SCHEMA_AUTHOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APP_SYNC_SCHEMA_AUTHOR"></a>

```typescript
public readonly AWS_APP_SYNC_SCHEMA_AUTHOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APPLICATION_DISCOVERY_AGENT_ACCESS`<sup>Required</sup> <a name="AWS_APPLICATION_DISCOVERY_AGENT_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_DISCOVERY_AGENT_ACCESS"></a>

```typescript
public readonly AWS_APPLICATION_DISCOVERY_AGENT_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APPLICATION_DISCOVERY_AGENTLESS_COLLECTOR_ACCESS`<sup>Required</sup> <a name="AWS_APPLICATION_DISCOVERY_AGENTLESS_COLLECTOR_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_DISCOVERY_AGENTLESS_COLLECTOR_ACCESS"></a>

```typescript
public readonly AWS_APPLICATION_DISCOVERY_AGENTLESS_COLLECTOR_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APPLICATION_DISCOVERY_SERVICE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_APPLICATION_DISCOVERY_SERVICE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_DISCOVERY_SERVICE_FULL_ACCESS"></a>

```typescript
public readonly AWS_APPLICATION_DISCOVERY_SERVICE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APPLICATION_MIGRATION_AGENT_INSTALLATION_POLICY`<sup>Required</sup> <a name="AWS_APPLICATION_MIGRATION_AGENT_INSTALLATION_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_AGENT_INSTALLATION_POLICY"></a>

```typescript
public readonly AWS_APPLICATION_MIGRATION_AGENT_INSTALLATION_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APPLICATION_MIGRATION_AGENT_POLICY`<sup>Required</sup> <a name="AWS_APPLICATION_MIGRATION_AGENT_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_AGENT_POLICY"></a>

```typescript
public readonly AWS_APPLICATION_MIGRATION_AGENT_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APPLICATION_MIGRATION_EC2_ACCESS`<sup>Required</sup> <a name="AWS_APPLICATION_MIGRATION_EC2_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_EC2_ACCESS"></a>

```typescript
public readonly AWS_APPLICATION_MIGRATION_EC2_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APPLICATION_MIGRATION_FULL_ACCESS`<sup>Required</sup> <a name="AWS_APPLICATION_MIGRATION_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_FULL_ACCESS"></a>

```typescript
public readonly AWS_APPLICATION_MIGRATION_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APPLICATION_MIGRATION_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_APPLICATION_MIGRATION_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_APPLICATION_MIGRATION_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APPLICATION_MIGRATION_SERVICE_EC2_INSTANCE_POLICY`<sup>Required</sup> <a name="AWS_APPLICATION_MIGRATION_SERVICE_EC2_INSTANCE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_SERVICE_EC2_INSTANCE_POLICY"></a>

```typescript
public readonly AWS_APPLICATION_MIGRATION_SERVICE_EC2_INSTANCE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APPLICATION_MIGRATION_SSM_ACCESS`<sup>Required</sup> <a name="AWS_APPLICATION_MIGRATION_SSM_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_SSM_ACCESS"></a>

```typescript
public readonly AWS_APPLICATION_MIGRATION_SSM_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_APPLICATION_MIGRATION_V_CENTER_CLIENT_POLICY`<sup>Required</sup> <a name="AWS_APPLICATION_MIGRATION_V_CENTER_CLIENT_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_APPLICATION_MIGRATION_V_CENTER_CLIENT_POLICY"></a>

```typescript
public readonly AWS_APPLICATION_MIGRATION_V_CENTER_CLIENT_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ARTIFACT_AGREEMENTS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_ARTIFACT_AGREEMENTS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ARTIFACT_AGREEMENTS_FULL_ACCESS"></a>

```typescript
public readonly AWS_ARTIFACT_AGREEMENTS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ARTIFACT_AGREEMENTS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_ARTIFACT_AGREEMENTS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ARTIFACT_AGREEMENTS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_ARTIFACT_AGREEMENTS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ARTIFACT_REPORTS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_ARTIFACT_REPORTS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ARTIFACT_REPORTS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_ARTIFACT_REPORTS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_AUDIT_MANAGER_ADMINISTRATOR_ACCESS`<sup>Required</sup> <a name="AWS_AUDIT_MANAGER_ADMINISTRATOR_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_AUDIT_MANAGER_ADMINISTRATOR_ACCESS"></a>

```typescript
public readonly AWS_AUDIT_MANAGER_ADMINISTRATOR_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BACKUP_AUDIT_ACCESS`<sup>Required</sup> <a name="AWS_BACKUP_AUDIT_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_AUDIT_ACCESS"></a>

```typescript
public readonly AWS_BACKUP_AUDIT_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BACKUP_DATA_TRANSFER_ACCESS`<sup>Required</sup> <a name="AWS_BACKUP_DATA_TRANSFER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_DATA_TRANSFER_ACCESS"></a>

```typescript
public readonly AWS_BACKUP_DATA_TRANSFER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BACKUP_FULL_ACCESS`<sup>Required</sup> <a name="AWS_BACKUP_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_FULL_ACCESS"></a>

```typescript
public readonly AWS_BACKUP_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BACKUP_OPERATOR_ACCESS`<sup>Required</sup> <a name="AWS_BACKUP_OPERATOR_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_OPERATOR_ACCESS"></a>

```typescript
public readonly AWS_BACKUP_OPERATOR_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BACKUP_ORGANIZATION_ADMIN_ACCESS`<sup>Required</sup> <a name="AWS_BACKUP_ORGANIZATION_ADMIN_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_ORGANIZATION_ADMIN_ACCESS"></a>

```typescript
public readonly AWS_BACKUP_ORGANIZATION_ADMIN_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BACKUP_RESTORE_ACCESS_FOR_SAPHANA`<sup>Required</sup> <a name="AWS_BACKUP_RESTORE_ACCESS_FOR_SAPHANA" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_RESTORE_ACCESS_FOR_SAPHANA"></a>

```typescript
public readonly AWS_BACKUP_RESTORE_ACCESS_FOR_SAPHANA: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_INDEXING`<sup>Required</sup> <a name="AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_INDEXING" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_INDEXING"></a>

```typescript
public readonly AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_INDEXING: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_ITEM_RESTORES`<sup>Required</sup> <a name="AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_ITEM_RESTORES" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_ITEM_RESTORES"></a>

```typescript
public readonly AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_ITEM_RESTORES: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_BACKUP`<sup>Required</sup> <a name="AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_BACKUP" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_BACKUP"></a>

```typescript
public readonly AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_BACKUP: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_RESTORE`<sup>Required</sup> <a name="AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_RESTORE" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_RESTORE"></a>

```typescript
public readonly AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_RESTORE: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BATCH_FULL_ACCESS`<sup>Required</sup> <a name="AWS_BATCH_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BATCH_FULL_ACCESS"></a>

```typescript
public readonly AWS_BATCH_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BILLING_CONDUCTOR_FULL_ACCESS`<sup>Required</sup> <a name="AWS_BILLING_CONDUCTOR_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BILLING_CONDUCTOR_FULL_ACCESS"></a>

```typescript
public readonly AWS_BILLING_CONDUCTOR_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BILLING_CONDUCTOR_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_BILLING_CONDUCTOR_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BILLING_CONDUCTOR_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_BILLING_CONDUCTOR_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BILLING_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_BILLING_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BILLING_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_BILLING_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BUDGETS_ACTIONS_ROLE_POLICY_FOR_RESOURCE_ADMINISTRATION_WITH_SSM`<sup>Required</sup> <a name="AWS_BUDGETS_ACTIONS_ROLE_POLICY_FOR_RESOURCE_ADMINISTRATION_WITH_SSM" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BUDGETS_ACTIONS_ROLE_POLICY_FOR_RESOURCE_ADMINISTRATION_WITH_SSM"></a>

```typescript
public readonly AWS_BUDGETS_ACTIONS_ROLE_POLICY_FOR_RESOURCE_ADMINISTRATION_WITH_SSM: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BUDGETS_ACTIONS_WITH_AWS_RESOURCE_CONTROL_ACCESS`<sup>Required</sup> <a name="AWS_BUDGETS_ACTIONS_WITH_AWS_RESOURCE_CONTROL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BUDGETS_ACTIONS_WITH_AWS_RESOURCE_CONTROL_ACCESS"></a>

```typescript
public readonly AWS_BUDGETS_ACTIONS_WITH_AWS_RESOURCE_CONTROL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BUDGETS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_BUDGETS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BUDGETS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_BUDGETS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BUG_BUST_FULL_ACCESS`<sup>Required</sup> <a name="AWS_BUG_BUST_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BUG_BUST_FULL_ACCESS"></a>

```typescript
public readonly AWS_BUG_BUST_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_BUG_BUST_PLAYER_ACCESS`<sup>Required</sup> <a name="AWS_BUG_BUST_PLAYER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_BUG_BUST_PLAYER_ACCESS"></a>

```typescript
public readonly AWS_BUG_BUST_PLAYER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CERTIFICATE_MANAGER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_CERTIFICATE_MANAGER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_FULL_ACCESS"></a>

```typescript
public readonly AWS_CERTIFICATE_MANAGER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CERTIFICATE_MANAGER_PRIVATE_CA_AUDITOR`<sup>Required</sup> <a name="AWS_CERTIFICATE_MANAGER_PRIVATE_CA_AUDITOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_PRIVATE_CA_AUDITOR"></a>

```typescript
public readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_AUDITOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CERTIFICATE_MANAGER_PRIVATE_CA_FULL_ACCESS`<sup>Required</sup> <a name="AWS_CERTIFICATE_MANAGER_PRIVATE_CA_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_PRIVATE_CA_FULL_ACCESS"></a>

```typescript
public readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CERTIFICATE_MANAGER_PRIVATE_CA_PRIVILEGED_USER`<sup>Required</sup> <a name="AWS_CERTIFICATE_MANAGER_PRIVATE_CA_PRIVILEGED_USER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_PRIVATE_CA_PRIVILEGED_USER"></a>

```typescript
public readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_PRIVILEGED_USER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CERTIFICATE_MANAGER_PRIVATE_CA_READ_ONLY`<sup>Required</sup> <a name="AWS_CERTIFICATE_MANAGER_PRIVATE_CA_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_PRIVATE_CA_READ_ONLY"></a>

```typescript
public readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CERTIFICATE_MANAGER_PRIVATE_CA_USER`<sup>Required</sup> <a name="AWS_CERTIFICATE_MANAGER_PRIVATE_CA_USER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_PRIVATE_CA_USER"></a>

```typescript
public readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_USER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CERTIFICATE_MANAGER_READ_ONLY`<sup>Required</sup> <a name="AWS_CERTIFICATE_MANAGER_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CERTIFICATE_MANAGER_READ_ONLY"></a>

```typescript
public readonly AWS_CERTIFICATE_MANAGER_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLEAN_ROOMS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_CLEAN_ROOMS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLEAN_ROOMS_FULL_ACCESS"></a>

```typescript
public readonly AWS_CLEAN_ROOMS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLEAN_ROOMS_FULL_ACCESS_NO_QUERYING`<sup>Required</sup> <a name="AWS_CLEAN_ROOMS_FULL_ACCESS_NO_QUERYING" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLEAN_ROOMS_FULL_ACCESS_NO_QUERYING"></a>

```typescript
public readonly AWS_CLEAN_ROOMS_FULL_ACCESS_NO_QUERYING: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLEAN_ROOMS_ML_FULL_ACCESS`<sup>Required</sup> <a name="AWS_CLEAN_ROOMS_ML_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLEAN_ROOMS_ML_FULL_ACCESS"></a>

```typescript
public readonly AWS_CLEAN_ROOMS_ML_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLEAN_ROOMS_ML_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_CLEAN_ROOMS_ML_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLEAN_ROOMS_ML_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_CLEAN_ROOMS_ML_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLEAN_ROOMS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_CLEAN_ROOMS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLEAN_ROOMS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_CLEAN_ROOMS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD_FORMATION_FULL_ACCESS`<sup>Required</sup> <a name="AWS_CLOUD_FORMATION_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_FORMATION_FULL_ACCESS"></a>

```typescript
public readonly AWS_CLOUD_FORMATION_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD_FORMATION_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_CLOUD_FORMATION_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_FORMATION_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_CLOUD_FORMATION_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD_HSM_FULL_ACCESS`<sup>Required</sup> <a name="AWS_CLOUD_HSM_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_HSM_FULL_ACCESS"></a>

```typescript
public readonly AWS_CLOUD_HSM_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD_HSM_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_CLOUD_HSM_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_HSM_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_CLOUD_HSM_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD_MAP_DISCOVER_INSTANCE_ACCESS`<sup>Required</sup> <a name="AWS_CLOUD_MAP_DISCOVER_INSTANCE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_MAP_DISCOVER_INSTANCE_ACCESS"></a>

```typescript
public readonly AWS_CLOUD_MAP_DISCOVER_INSTANCE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD_MAP_FULL_ACCESS`<sup>Required</sup> <a name="AWS_CLOUD_MAP_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_MAP_FULL_ACCESS"></a>

```typescript
public readonly AWS_CLOUD_MAP_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD_MAP_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_CLOUD_MAP_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_MAP_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_CLOUD_MAP_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD_MAP_REGISTER_INSTANCE_ACCESS`<sup>Required</sup> <a name="AWS_CLOUD_MAP_REGISTER_INSTANCE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_MAP_REGISTER_INSTANCE_ACCESS"></a>

```typescript
public readonly AWS_CLOUD_MAP_REGISTER_INSTANCE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD_SHELL_FULL_ACCESS`<sup>Required</sup> <a name="AWS_CLOUD_SHELL_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_SHELL_FULL_ACCESS"></a>

```typescript
public readonly AWS_CLOUD_SHELL_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD_TRAIL_FULL_ACCESS`<sup>Required</sup> <a name="AWS_CLOUD_TRAIL_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_TRAIL_FULL_ACCESS"></a>

```typescript
public readonly AWS_CLOUD_TRAIL_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD_TRAIL_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_CLOUD_TRAIL_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD_TRAIL_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_CLOUD_TRAIL_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD9_ADMINISTRATOR`<sup>Required</sup> <a name="AWS_CLOUD9_ADMINISTRATOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD9_ADMINISTRATOR"></a>

```typescript
public readonly AWS_CLOUD9_ADMINISTRATOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD9_ENVIRONMENT_MEMBER`<sup>Required</sup> <a name="AWS_CLOUD9_ENVIRONMENT_MEMBER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD9_ENVIRONMENT_MEMBER"></a>

```typescript
public readonly AWS_CLOUD9_ENVIRONMENT_MEMBER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD9_SSM_INSTANCE_PROFILE`<sup>Required</sup> <a name="AWS_CLOUD9_SSM_INSTANCE_PROFILE" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD9_SSM_INSTANCE_PROFILE"></a>

```typescript
public readonly AWS_CLOUD9_SSM_INSTANCE_PROFILE: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CLOUD9_USER`<sup>Required</sup> <a name="AWS_CLOUD9_USER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CLOUD9_USER"></a>

```typescript
public readonly AWS_CLOUD9_USER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_ARTIFACT_ADMIN_ACCESS`<sup>Required</sup> <a name="AWS_CODE_ARTIFACT_ADMIN_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_ARTIFACT_ADMIN_ACCESS"></a>

```typescript
public readonly AWS_CODE_ARTIFACT_ADMIN_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_ARTIFACT_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_CODE_ARTIFACT_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_ARTIFACT_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_CODE_ARTIFACT_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_BUILD_ADMIN_ACCESS`<sup>Required</sup> <a name="AWS_CODE_BUILD_ADMIN_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_BUILD_ADMIN_ACCESS"></a>

```typescript
public readonly AWS_CODE_BUILD_ADMIN_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_BUILD_DEVELOPER_ACCESS`<sup>Required</sup> <a name="AWS_CODE_BUILD_DEVELOPER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_BUILD_DEVELOPER_ACCESS"></a>

```typescript
public readonly AWS_CODE_BUILD_DEVELOPER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_BUILD_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_CODE_BUILD_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_BUILD_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_CODE_BUILD_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_COMMIT_FULL_ACCESS`<sup>Required</sup> <a name="AWS_CODE_COMMIT_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_COMMIT_FULL_ACCESS"></a>

```typescript
public readonly AWS_CODE_COMMIT_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_COMMIT_POWER_USER`<sup>Required</sup> <a name="AWS_CODE_COMMIT_POWER_USER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_COMMIT_POWER_USER"></a>

```typescript
public readonly AWS_CODE_COMMIT_POWER_USER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_COMMIT_READ_ONLY`<sup>Required</sup> <a name="AWS_CODE_COMMIT_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_COMMIT_READ_ONLY"></a>

```typescript
public readonly AWS_CODE_COMMIT_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_DEPLOY_DEPLOYER_ACCESS`<sup>Required</sup> <a name="AWS_CODE_DEPLOY_DEPLOYER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_DEPLOY_DEPLOYER_ACCESS"></a>

```typescript
public readonly AWS_CODE_DEPLOY_DEPLOYER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_DEPLOY_FULL_ACCESS`<sup>Required</sup> <a name="AWS_CODE_DEPLOY_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_DEPLOY_FULL_ACCESS"></a>

```typescript
public readonly AWS_CODE_DEPLOY_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_DEPLOY_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_CODE_DEPLOY_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_DEPLOY_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_CODE_DEPLOY_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_DEPLOY_ROLE_FOR_ECS`<sup>Required</sup> <a name="AWS_CODE_DEPLOY_ROLE_FOR_ECS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_DEPLOY_ROLE_FOR_ECS"></a>

```typescript
public readonly AWS_CODE_DEPLOY_ROLE_FOR_ECS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_DEPLOY_ROLE_FOR_ECS_LIMITED`<sup>Required</sup> <a name="AWS_CODE_DEPLOY_ROLE_FOR_ECS_LIMITED" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_DEPLOY_ROLE_FOR_ECS_LIMITED"></a>

```typescript
public readonly AWS_CODE_DEPLOY_ROLE_FOR_ECS_LIMITED: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_PIPELINE_APPROVER_ACCESS`<sup>Required</sup> <a name="AWS_CODE_PIPELINE_APPROVER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_PIPELINE_APPROVER_ACCESS"></a>

```typescript
public readonly AWS_CODE_PIPELINE_APPROVER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_PIPELINE_CUSTOM_ACTION_ACCESS`<sup>Required</sup> <a name="AWS_CODE_PIPELINE_CUSTOM_ACTION_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_PIPELINE_CUSTOM_ACTION_ACCESS"></a>

```typescript
public readonly AWS_CODE_PIPELINE_CUSTOM_ACTION_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_PIPELINE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_CODE_PIPELINE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_PIPELINE_FULL_ACCESS"></a>

```typescript
public readonly AWS_CODE_PIPELINE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_PIPELINE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_CODE_PIPELINE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_PIPELINE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_CODE_PIPELINE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CODE_STAR_FULL_ACCESS`<sup>Required</sup> <a name="AWS_CODE_STAR_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CODE_STAR_FULL_ACCESS"></a>

```typescript
public readonly AWS_CODE_STAR_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_COMPROMISED_KEY_QUARANTINE`<sup>Required</sup> <a name="AWS_COMPROMISED_KEY_QUARANTINE" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_COMPROMISED_KEY_QUARANTINE"></a>

```typescript
public readonly AWS_COMPROMISED_KEY_QUARANTINE: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_COMPROMISED_KEY_QUARANTINE_V2`<sup>Required</sup> <a name="AWS_COMPROMISED_KEY_QUARANTINE_V2" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_COMPROMISED_KEY_QUARANTINE_V2"></a>

```typescript
public readonly AWS_COMPROMISED_KEY_QUARANTINE_V2: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_COMPROMISED_KEY_QUARANTINE_V3`<sup>Required</sup> <a name="AWS_COMPROMISED_KEY_QUARANTINE_V3" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_COMPROMISED_KEY_QUARANTINE_V3"></a>

```typescript
public readonly AWS_COMPROMISED_KEY_QUARANTINE_V3: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CONFIG_USER_ACCESS`<sup>Required</sup> <a name="AWS_CONFIG_USER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CONFIG_USER_ACCESS"></a>

```typescript
public readonly AWS_CONFIG_USER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_CONNECTOR`<sup>Required</sup> <a name="AWS_CONNECTOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_CONNECTOR"></a>

```typescript
public readonly AWS_CONNECTOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DATA_EXCHANGE_DATA_GRANT_OWNER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_DATA_EXCHANGE_DATA_GRANT_OWNER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_EXCHANGE_DATA_GRANT_OWNER_FULL_ACCESS"></a>

```typescript
public readonly AWS_DATA_EXCHANGE_DATA_GRANT_OWNER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DATA_EXCHANGE_DATA_GRANT_RECEIVER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_DATA_EXCHANGE_DATA_GRANT_RECEIVER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_EXCHANGE_DATA_GRANT_RECEIVER_FULL_ACCESS"></a>

```typescript
public readonly AWS_DATA_EXCHANGE_DATA_GRANT_RECEIVER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DATA_EXCHANGE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_DATA_EXCHANGE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_EXCHANGE_FULL_ACCESS"></a>

```typescript
public readonly AWS_DATA_EXCHANGE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DATA_EXCHANGE_PROVIDER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_DATA_EXCHANGE_PROVIDER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_EXCHANGE_PROVIDER_FULL_ACCESS"></a>

```typescript
public readonly AWS_DATA_EXCHANGE_PROVIDER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DATA_EXCHANGE_READ_ONLY`<sup>Required</sup> <a name="AWS_DATA_EXCHANGE_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_EXCHANGE_READ_ONLY"></a>

```typescript
public readonly AWS_DATA_EXCHANGE_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DATA_EXCHANGE_SUBSCRIBER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_DATA_EXCHANGE_SUBSCRIBER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_EXCHANGE_SUBSCRIBER_FULL_ACCESS"></a>

```typescript
public readonly AWS_DATA_EXCHANGE_SUBSCRIBER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DATA_PIPELINE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_DATA_PIPELINE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_PIPELINE_FULL_ACCESS"></a>

```typescript
public readonly AWS_DATA_PIPELINE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DATA_PIPELINE_POWER_USER`<sup>Required</sup> <a name="AWS_DATA_PIPELINE_POWER_USER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_PIPELINE_POWER_USER"></a>

```typescript
public readonly AWS_DATA_PIPELINE_POWER_USER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DATA_SYNC_FULL_ACCESS`<sup>Required</sup> <a name="AWS_DATA_SYNC_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_SYNC_FULL_ACCESS"></a>

```typescript
public readonly AWS_DATA_SYNC_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DATA_SYNC_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_DATA_SYNC_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DATA_SYNC_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_DATA_SYNC_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DEADLINE_CLOUD_FLEET_WORKER`<sup>Required</sup> <a name="AWS_DEADLINE_CLOUD_FLEET_WORKER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEADLINE_CLOUD_FLEET_WORKER"></a>

```typescript
public readonly AWS_DEADLINE_CLOUD_FLEET_WORKER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DEADLINE_CLOUD_USER_ACCESS_FARMS`<sup>Required</sup> <a name="AWS_DEADLINE_CLOUD_USER_ACCESS_FARMS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEADLINE_CLOUD_USER_ACCESS_FARMS"></a>

```typescript
public readonly AWS_DEADLINE_CLOUD_USER_ACCESS_FARMS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DEADLINE_CLOUD_USER_ACCESS_FLEETS`<sup>Required</sup> <a name="AWS_DEADLINE_CLOUD_USER_ACCESS_FLEETS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEADLINE_CLOUD_USER_ACCESS_FLEETS"></a>

```typescript
public readonly AWS_DEADLINE_CLOUD_USER_ACCESS_FLEETS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DEADLINE_CLOUD_USER_ACCESS_JOBS`<sup>Required</sup> <a name="AWS_DEADLINE_CLOUD_USER_ACCESS_JOBS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEADLINE_CLOUD_USER_ACCESS_JOBS"></a>

```typescript
public readonly AWS_DEADLINE_CLOUD_USER_ACCESS_JOBS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DEADLINE_CLOUD_USER_ACCESS_QUEUES`<sup>Required</sup> <a name="AWS_DEADLINE_CLOUD_USER_ACCESS_QUEUES" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEADLINE_CLOUD_USER_ACCESS_QUEUES"></a>

```typescript
public readonly AWS_DEADLINE_CLOUD_USER_ACCESS_QUEUES: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DEADLINE_CLOUD_WORKER_HOST`<sup>Required</sup> <a name="AWS_DEADLINE_CLOUD_WORKER_HOST" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEADLINE_CLOUD_WORKER_HOST"></a>

```typescript
public readonly AWS_DEADLINE_CLOUD_WORKER_HOST: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DEEP_LENS_LAMBDA_FUNCTION_ACCESS_POLICY`<sup>Required</sup> <a name="AWS_DEEP_LENS_LAMBDA_FUNCTION_ACCESS_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEEP_LENS_LAMBDA_FUNCTION_ACCESS_POLICY"></a>

```typescript
public readonly AWS_DEEP_LENS_LAMBDA_FUNCTION_ACCESS_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DEEP_RACER_ACCOUNT_ADMIN_ACCESS`<sup>Required</sup> <a name="AWS_DEEP_RACER_ACCOUNT_ADMIN_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEEP_RACER_ACCOUNT_ADMIN_ACCESS"></a>

```typescript
public readonly AWS_DEEP_RACER_ACCOUNT_ADMIN_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DEEP_RACER_CLOUD_FORMATION_ACCESS_POLICY`<sup>Required</sup> <a name="AWS_DEEP_RACER_CLOUD_FORMATION_ACCESS_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEEP_RACER_CLOUD_FORMATION_ACCESS_POLICY"></a>

```typescript
public readonly AWS_DEEP_RACER_CLOUD_FORMATION_ACCESS_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DEEP_RACER_DEFAULT_MULTI_USER_ACCESS`<sup>Required</sup> <a name="AWS_DEEP_RACER_DEFAULT_MULTI_USER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEEP_RACER_DEFAULT_MULTI_USER_ACCESS"></a>

```typescript
public readonly AWS_DEEP_RACER_DEFAULT_MULTI_USER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DEEP_RACER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_DEEP_RACER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEEP_RACER_FULL_ACCESS"></a>

```typescript
public readonly AWS_DEEP_RACER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DEEP_RACER_ROBO_MAKER_ACCESS_POLICY`<sup>Required</sup> <a name="AWS_DEEP_RACER_ROBO_MAKER_ACCESS_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEEP_RACER_ROBO_MAKER_ACCESS_POLICY"></a>

```typescript
public readonly AWS_DEEP_RACER_ROBO_MAKER_ACCESS_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DENY_ALL`<sup>Required</sup> <a name="AWS_DENY_ALL" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DENY_ALL"></a>

```typescript
public readonly AWS_DENY_ALL: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DEVICE_FARM_FULL_ACCESS`<sup>Required</sup> <a name="AWS_DEVICE_FARM_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DEVICE_FARM_FULL_ACCESS"></a>

```typescript
public readonly AWS_DEVICE_FARM_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DIRECT_CONNECT_FULL_ACCESS`<sup>Required</sup> <a name="AWS_DIRECT_CONNECT_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DIRECT_CONNECT_FULL_ACCESS"></a>

```typescript
public readonly AWS_DIRECT_CONNECT_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DIRECT_CONNECT_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_DIRECT_CONNECT_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DIRECT_CONNECT_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_DIRECT_CONNECT_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DIRECTORY_SERVICE_DATA_FULL_ACCESS`<sup>Required</sup> <a name="AWS_DIRECTORY_SERVICE_DATA_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DIRECTORY_SERVICE_DATA_FULL_ACCESS"></a>

```typescript
public readonly AWS_DIRECTORY_SERVICE_DATA_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DIRECTORY_SERVICE_DATA_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_DIRECTORY_SERVICE_DATA_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DIRECTORY_SERVICE_DATA_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_DIRECTORY_SERVICE_DATA_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DIRECTORY_SERVICE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_DIRECTORY_SERVICE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DIRECTORY_SERVICE_FULL_ACCESS"></a>

```typescript
public readonly AWS_DIRECTORY_SERVICE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DIRECTORY_SERVICE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_DIRECTORY_SERVICE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DIRECTORY_SERVICE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_DIRECTORY_SERVICE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_DISCOVERY_CONTINUOUS_EXPORT_FIREHOSE_POLICY`<sup>Required</sup> <a name="AWS_DISCOVERY_CONTINUOUS_EXPORT_FIREHOSE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_DISCOVERY_CONTINUOUS_EXPORT_FIREHOSE_POLICY"></a>

```typescript
public readonly AWS_DISCOVERY_CONTINUOUS_EXPORT_FIREHOSE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_EC2_VSS_SNAPSHOT_POLICY`<sup>Required</sup> <a name="AWS_EC2_VSS_SNAPSHOT_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_EC2_VSS_SNAPSHOT_POLICY"></a>

```typescript
public readonly AWS_EC2_VSS_SNAPSHOT_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELASTIC_BEANSTALK_CUSTOM_PLATFORMFOR_EC2_ROLE`<sup>Required</sup> <a name="AWS_ELASTIC_BEANSTALK_CUSTOM_PLATFORMFOR_EC2_ROLE" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_BEANSTALK_CUSTOM_PLATFORMFOR_EC2_ROLE"></a>

```typescript
public readonly AWS_ELASTIC_BEANSTALK_CUSTOM_PLATFORMFOR_EC2_ROLE: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELASTIC_BEANSTALK_MANAGED_UPDATES_CUSTOMER_ROLE_POLICY`<sup>Required</sup> <a name="AWS_ELASTIC_BEANSTALK_MANAGED_UPDATES_CUSTOMER_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_BEANSTALK_MANAGED_UPDATES_CUSTOMER_ROLE_POLICY"></a>

```typescript
public readonly AWS_ELASTIC_BEANSTALK_MANAGED_UPDATES_CUSTOMER_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELASTIC_BEANSTALK_MULTICONTAINER_DOCKER`<sup>Required</sup> <a name="AWS_ELASTIC_BEANSTALK_MULTICONTAINER_DOCKER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_BEANSTALK_MULTICONTAINER_DOCKER"></a>

```typescript
public readonly AWS_ELASTIC_BEANSTALK_MULTICONTAINER_DOCKER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELASTIC_BEANSTALK_READ_ONLY`<sup>Required</sup> <a name="AWS_ELASTIC_BEANSTALK_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_BEANSTALK_READ_ONLY"></a>

```typescript
public readonly AWS_ELASTIC_BEANSTALK_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELASTIC_BEANSTALK_WEB_TIER`<sup>Required</sup> <a name="AWS_ELASTIC_BEANSTALK_WEB_TIER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_BEANSTALK_WEB_TIER"></a>

```typescript
public readonly AWS_ELASTIC_BEANSTALK_WEB_TIER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELASTIC_BEANSTALK_WORKER_TIER`<sup>Required</sup> <a name="AWS_ELASTIC_BEANSTALK_WORKER_TIER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_BEANSTALK_WORKER_TIER"></a>

```typescript
public readonly AWS_ELASTIC_BEANSTALK_WORKER_TIER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELASTIC_DISASTER_RECOVERY_AGENT_INSTALLATION_POLICY`<sup>Required</sup> <a name="AWS_ELASTIC_DISASTER_RECOVERY_AGENT_INSTALLATION_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_DISASTER_RECOVERY_AGENT_INSTALLATION_POLICY"></a>

```typescript
public readonly AWS_ELASTIC_DISASTER_RECOVERY_AGENT_INSTALLATION_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS_V2`<sup>Required</sup> <a name="AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS_V2" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS_V2"></a>

```typescript
public readonly AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS_V2: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELASTIC_DISASTER_RECOVERY_FAILBACK_INSTALLATION_POLICY`<sup>Required</sup> <a name="AWS_ELASTIC_DISASTER_RECOVERY_FAILBACK_INSTALLATION_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_DISASTER_RECOVERY_FAILBACK_INSTALLATION_POLICY"></a>

```typescript
public readonly AWS_ELASTIC_DISASTER_RECOVERY_FAILBACK_INSTALLATION_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELASTIC_DISASTER_RECOVERY_LAUNCH_ACTIONS_POLICY`<sup>Required</sup> <a name="AWS_ELASTIC_DISASTER_RECOVERY_LAUNCH_ACTIONS_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_DISASTER_RECOVERY_LAUNCH_ACTIONS_POLICY"></a>

```typescript
public readonly AWS_ELASTIC_DISASTER_RECOVERY_LAUNCH_ACTIONS_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELASTIC_DISASTER_RECOVERY_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_ELASTIC_DISASTER_RECOVERY_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELASTIC_DISASTER_RECOVERY_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_ELASTIC_DISASTER_RECOVERY_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELEMENTAL_MEDIA_CONVERT_FULL_ACCESS`<sup>Required</sup> <a name="AWS_ELEMENTAL_MEDIA_CONVERT_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_CONVERT_FULL_ACCESS"></a>

```typescript
public readonly AWS_ELEMENTAL_MEDIA_CONVERT_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELEMENTAL_MEDIA_CONVERT_READ_ONLY`<sup>Required</sup> <a name="AWS_ELEMENTAL_MEDIA_CONVERT_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_CONVERT_READ_ONLY"></a>

```typescript
public readonly AWS_ELEMENTAL_MEDIA_CONVERT_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELEMENTAL_MEDIA_LIVE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_ELEMENTAL_MEDIA_LIVE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_LIVE_FULL_ACCESS"></a>

```typescript
public readonly AWS_ELEMENTAL_MEDIA_LIVE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELEMENTAL_MEDIA_LIVE_READ_ONLY`<sup>Required</sup> <a name="AWS_ELEMENTAL_MEDIA_LIVE_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_LIVE_READ_ONLY"></a>

```typescript
public readonly AWS_ELEMENTAL_MEDIA_LIVE_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELEMENTAL_MEDIA_PACKAGE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_ELEMENTAL_MEDIA_PACKAGE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_PACKAGE_FULL_ACCESS"></a>

```typescript
public readonly AWS_ELEMENTAL_MEDIA_PACKAGE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELEMENTAL_MEDIA_PACKAGE_READ_ONLY`<sup>Required</sup> <a name="AWS_ELEMENTAL_MEDIA_PACKAGE_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_PACKAGE_READ_ONLY"></a>

```typescript
public readonly AWS_ELEMENTAL_MEDIA_PACKAGE_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELEMENTAL_MEDIA_PACKAGE_V2_FULL_ACCESS`<sup>Required</sup> <a name="AWS_ELEMENTAL_MEDIA_PACKAGE_V2_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_PACKAGE_V2_FULL_ACCESS"></a>

```typescript
public readonly AWS_ELEMENTAL_MEDIA_PACKAGE_V2_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELEMENTAL_MEDIA_PACKAGE_V2_READ_ONLY`<sup>Required</sup> <a name="AWS_ELEMENTAL_MEDIA_PACKAGE_V2_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_PACKAGE_V2_READ_ONLY"></a>

```typescript
public readonly AWS_ELEMENTAL_MEDIA_PACKAGE_V2_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELEMENTAL_MEDIA_STORE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_ELEMENTAL_MEDIA_STORE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_STORE_FULL_ACCESS"></a>

```typescript
public readonly AWS_ELEMENTAL_MEDIA_STORE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELEMENTAL_MEDIA_STORE_READ_ONLY`<sup>Required</sup> <a name="AWS_ELEMENTAL_MEDIA_STORE_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_STORE_READ_ONLY"></a>

```typescript
public readonly AWS_ELEMENTAL_MEDIA_STORE_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELEMENTAL_MEDIA_TAILOR_FULL_ACCESS`<sup>Required</sup> <a name="AWS_ELEMENTAL_MEDIA_TAILOR_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_TAILOR_FULL_ACCESS"></a>

```typescript
public readonly AWS_ELEMENTAL_MEDIA_TAILOR_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ELEMENTAL_MEDIA_TAILOR_READ_ONLY`<sup>Required</sup> <a name="AWS_ELEMENTAL_MEDIA_TAILOR_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ELEMENTAL_MEDIA_TAILOR_READ_ONLY"></a>

```typescript
public readonly AWS_ELEMENTAL_MEDIA_TAILOR_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ENTITY_RESOLUTION_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_ENTITY_RESOLUTION_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ENTITY_RESOLUTION_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AWS_ENTITY_RESOLUTION_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ENTITY_RESOLUTION_CONSOLE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_ENTITY_RESOLUTION_CONSOLE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ENTITY_RESOLUTION_CONSOLE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_ENTITY_RESOLUTION_CONSOLE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_FM_ADMIN_FULL_ACCESS`<sup>Required</sup> <a name="AWS_FM_ADMIN_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_FM_ADMIN_FULL_ACCESS"></a>

```typescript
public readonly AWS_FM_ADMIN_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_FM_ADMIN_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_FM_ADMIN_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_FM_ADMIN_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_FM_ADMIN_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_FM_MEMBER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_FM_MEMBER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_FM_MEMBER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_FM_MEMBER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_FOR_WORD_PRESS_PLUGIN_POLICY`<sup>Required</sup> <a name="AWS_FOR_WORD_PRESS_PLUGIN_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_FOR_WORD_PRESS_PLUGIN_POLICY"></a>

```typescript
public readonly AWS_FOR_WORD_PRESS_PLUGIN_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GLUE_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_GLUE_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AWS_GLUE_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GLUE_CONSOLE_SAGE_MAKER_NOTEBOOK_FULL_ACCESS`<sup>Required</sup> <a name="AWS_GLUE_CONSOLE_SAGE_MAKER_NOTEBOOK_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_CONSOLE_SAGE_MAKER_NOTEBOOK_FULL_ACCESS"></a>

```typescript
public readonly AWS_GLUE_CONSOLE_SAGE_MAKER_NOTEBOOK_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GLUE_DATA_BREW_FULL_ACCESS_POLICY`<sup>Required</sup> <a name="AWS_GLUE_DATA_BREW_FULL_ACCESS_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_DATA_BREW_FULL_ACCESS_POLICY"></a>

```typescript
public readonly AWS_GLUE_DATA_BREW_FULL_ACCESS_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GLUE_SCHEMA_REGISTRY_FULL_ACCESS`<sup>Required</sup> <a name="AWS_GLUE_SCHEMA_REGISTRY_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_SCHEMA_REGISTRY_FULL_ACCESS"></a>

```typescript
public readonly AWS_GLUE_SCHEMA_REGISTRY_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GLUE_SCHEMA_REGISTRY_READONLY_ACCESS`<sup>Required</sup> <a name="AWS_GLUE_SCHEMA_REGISTRY_READONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_SCHEMA_REGISTRY_READONLY_ACCESS"></a>

```typescript
public readonly AWS_GLUE_SCHEMA_REGISTRY_READONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GLUE_SESSION_USER_RESTRICTED_NOTEBOOK_POLICY`<sup>Required</sup> <a name="AWS_GLUE_SESSION_USER_RESTRICTED_NOTEBOOK_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_SESSION_USER_RESTRICTED_NOTEBOOK_POLICY"></a>

```typescript
public readonly AWS_GLUE_SESSION_USER_RESTRICTED_NOTEBOOK_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GLUE_SESSION_USER_RESTRICTED_POLICY`<sup>Required</sup> <a name="AWS_GLUE_SESSION_USER_RESTRICTED_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GLUE_SESSION_USER_RESTRICTED_POLICY"></a>

```typescript
public readonly AWS_GLUE_SESSION_USER_RESTRICTED_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GRAFANA_ACCOUNT_ADMINISTRATOR`<sup>Required</sup> <a name="AWS_GRAFANA_ACCOUNT_ADMINISTRATOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GRAFANA_ACCOUNT_ADMINISTRATOR"></a>

```typescript
public readonly AWS_GRAFANA_ACCOUNT_ADMINISTRATOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GRAFANA_CONSOLE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_GRAFANA_CONSOLE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GRAFANA_CONSOLE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_GRAFANA_CONSOLE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT`<sup>Required</sup> <a name="AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT"></a>

```typescript
public readonly AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT_V2`<sup>Required</sup> <a name="AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT_V2" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT_V2"></a>

```typescript
public readonly AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT_V2: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GREENGRASS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_GREENGRASS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GREENGRASS_FULL_ACCESS"></a>

```typescript
public readonly AWS_GREENGRASS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GREENGRASS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_GREENGRASS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GREENGRASS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_GREENGRASS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_GROUND_STATION_AGENT_INSTANCE_POLICY`<sup>Required</sup> <a name="AWS_GROUND_STATION_AGENT_INSTANCE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_GROUND_STATION_AGENT_INSTANCE_POLICY"></a>

```typescript
public readonly AWS_GROUND_STATION_AGENT_INSTANCE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_HEALTH_FULL_ACCESS`<sup>Required</sup> <a name="AWS_HEALTH_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_HEALTH_FULL_ACCESS"></a>

```typescript
public readonly AWS_HEALTH_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_HEALTH_IMAGING_FULL_ACCESS`<sup>Required</sup> <a name="AWS_HEALTH_IMAGING_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_HEALTH_IMAGING_FULL_ACCESS"></a>

```typescript
public readonly AWS_HEALTH_IMAGING_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_HEALTH_IMAGING_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_HEALTH_IMAGING_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_HEALTH_IMAGING_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_HEALTH_IMAGING_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IAM_IDENTITY_CENTER_ALLOW_LIST_FOR_IDENTITY_CONTEXT`<sup>Required</sup> <a name="AWS_IAM_IDENTITY_CENTER_ALLOW_LIST_FOR_IDENTITY_CONTEXT" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IAM_IDENTITY_CENTER_ALLOW_LIST_FOR_IDENTITY_CONTEXT"></a>

```typescript
public readonly AWS_IAM_IDENTITY_CENTER_ALLOW_LIST_FOR_IDENTITY_CONTEXT: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IDENTITY_SYNC_FULL_ACCESS`<sup>Required</sup> <a name="AWS_IDENTITY_SYNC_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IDENTITY_SYNC_FULL_ACCESS"></a>

```typescript
public readonly AWS_IDENTITY_SYNC_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IDENTITY_SYNC_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_IDENTITY_SYNC_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IDENTITY_SYNC_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_IDENTITY_SYNC_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IMAGE_BUILDER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_IMAGE_BUILDER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IMAGE_BUILDER_FULL_ACCESS"></a>

```typescript
public readonly AWS_IMAGE_BUILDER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IMAGE_BUILDER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_IMAGE_BUILDER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IMAGE_BUILDER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_IMAGE_BUILDER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IMPORT_EXPORT_FULL_ACCESS`<sup>Required</sup> <a name="AWS_IMPORT_EXPORT_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IMPORT_EXPORT_FULL_ACCESS"></a>

```typescript
public readonly AWS_IMPORT_EXPORT_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IMPORT_EXPORT_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_IMPORT_EXPORT_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IMPORT_EXPORT_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_IMPORT_EXPORT_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_INCIDENT_MANAGER_INCIDENT_ACCESS_SERVICE_ROLE_POLICY`<sup>Required</sup> <a name="AWS_INCIDENT_MANAGER_INCIDENT_ACCESS_SERVICE_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_INCIDENT_MANAGER_INCIDENT_ACCESS_SERVICE_ROLE_POLICY"></a>

```typescript
public readonly AWS_INCIDENT_MANAGER_INCIDENT_ACCESS_SERVICE_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_INCIDENT_MANAGER_RESOLVER_ACCESS`<sup>Required</sup> <a name="AWS_INCIDENT_MANAGER_RESOLVER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_INCIDENT_MANAGER_RESOLVER_ACCESS"></a>

```typescript
public readonly AWS_INCIDENT_MANAGER_RESOLVER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_ANALYTICS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_ANALYTICS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_ANALYTICS_FULL_ACCESS"></a>

```typescript
public readonly AWS_IO_T_ANALYTICS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_ANALYTICS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_ANALYTICS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_ANALYTICS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_IO_T_ANALYTICS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_CONFIG_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_CONFIG_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_CONFIG_ACCESS"></a>

```typescript
public readonly AWS_IO_T_CONFIG_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_CONFIG_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_CONFIG_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_CONFIG_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_IO_T_CONFIG_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_DATA_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_DATA_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_DATA_ACCESS"></a>

```typescript
public readonly AWS_IO_T_DATA_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_DEVICE_TESTER_FOR_FREE_RTOS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_DEVICE_TESTER_FOR_FREE_RTOS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_DEVICE_TESTER_FOR_FREE_RTOS_FULL_ACCESS"></a>

```typescript
public readonly AWS_IO_T_DEVICE_TESTER_FOR_FREE_RTOS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_DEVICE_TESTER_FOR_GREENGRASS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_DEVICE_TESTER_FOR_GREENGRASS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_DEVICE_TESTER_FOR_GREENGRASS_FULL_ACCESS"></a>

```typescript
public readonly AWS_IO_T_DEVICE_TESTER_FOR_GREENGRASS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_EVENTS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_EVENTS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_EVENTS_FULL_ACCESS"></a>

```typescript
public readonly AWS_IO_T_EVENTS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_EVENTS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_EVENTS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_EVENTS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_IO_T_EVENTS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_FULL_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_FULL_ACCESS"></a>

```typescript
public readonly AWS_IO_T_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_SITE_WISE_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_SITE_WISE_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_SITE_WISE_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AWS_IO_T_SITE_WISE_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_SITE_WISE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_SITE_WISE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_SITE_WISE_FULL_ACCESS"></a>

```typescript
public readonly AWS_IO_T_SITE_WISE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_SITE_WISE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_SITE_WISE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_SITE_WISE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_IO_T_SITE_WISE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_WIRELESS_DATA_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_WIRELESS_DATA_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_WIRELESS_DATA_ACCESS"></a>

```typescript
public readonly AWS_IO_T_WIRELESS_DATA_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_WIRELESS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_WIRELESS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_WIRELESS_FULL_ACCESS"></a>

```typescript
public readonly AWS_IO_T_WIRELESS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_WIRELESS_FULL_PUBLISH_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_WIRELESS_FULL_PUBLISH_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_WIRELESS_FULL_PUBLISH_ACCESS"></a>

```typescript
public readonly AWS_IO_T_WIRELESS_FULL_PUBLISH_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_WIRELESS_GATEWAY_CERT_MANAGER`<sup>Required</sup> <a name="AWS_IO_T_WIRELESS_GATEWAY_CERT_MANAGER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_WIRELESS_GATEWAY_CERT_MANAGER"></a>

```typescript
public readonly AWS_IO_T_WIRELESS_GATEWAY_CERT_MANAGER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_WIRELESS_LOGGING`<sup>Required</sup> <a name="AWS_IO_T_WIRELESS_LOGGING" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_WIRELESS_LOGGING"></a>

```typescript
public readonly AWS_IO_T_WIRELESS_LOGGING: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T_WIRELESS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_IO_T_WIRELESS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T_WIRELESS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_IO_T_WIRELESS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T1_CLICK_FULL_ACCESS`<sup>Required</sup> <a name="AWS_IO_T1_CLICK_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T1_CLICK_FULL_ACCESS"></a>

```typescript
public readonly AWS_IO_T1_CLICK_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IO_T1_CLICK_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_IO_T1_CLICK_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IO_T1_CLICK_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_IO_T1_CLICK_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_IQ_FULL_ACCESS`<sup>Required</sup> <a name="AWS_IQ_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_IQ_FULL_ACCESS"></a>

```typescript
public readonly AWS_IQ_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_KEY_MANAGEMENT_SERVICE_POWER_USER`<sup>Required</sup> <a name="AWS_KEY_MANAGEMENT_SERVICE_POWER_USER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_KEY_MANAGEMENT_SERVICE_POWER_USER"></a>

```typescript
public readonly AWS_KEY_MANAGEMENT_SERVICE_POWER_USER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_LAKE_FORMATION_CROSS_ACCOUNT_MANAGER`<sup>Required</sup> <a name="AWS_LAKE_FORMATION_CROSS_ACCOUNT_MANAGER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_LAKE_FORMATION_CROSS_ACCOUNT_MANAGER"></a>

```typescript
public readonly AWS_LAKE_FORMATION_CROSS_ACCOUNT_MANAGER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_LAKE_FORMATION_DATA_ADMIN`<sup>Required</sup> <a name="AWS_LAKE_FORMATION_DATA_ADMIN" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_LAKE_FORMATION_DATA_ADMIN"></a>

```typescript
public readonly AWS_LAKE_FORMATION_DATA_ADMIN: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_LAMBDA_EXECUTE`<sup>Required</sup> <a name="AWS_LAMBDA_EXECUTE" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_LAMBDA_EXECUTE"></a>

```typescript
public readonly AWS_LAMBDA_EXECUTE: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_LAMBDA_FULL_ACCESS`<sup>Required</sup> <a name="AWS_LAMBDA_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_LAMBDA_FULL_ACCESS"></a>

```typescript
public readonly AWS_LAMBDA_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_LAMBDA_INVOCATION_DYNAMO_DB`<sup>Required</sup> <a name="AWS_LAMBDA_INVOCATION_DYNAMO_DB" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_LAMBDA_INVOCATION_DYNAMO_DB"></a>

```typescript
public readonly AWS_LAMBDA_INVOCATION_DYNAMO_DB: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_LAMBDA_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_LAMBDA_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_LAMBDA_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_LAMBDA_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MARKETPLACE_AMI_INGESTION`<sup>Required</sup> <a name="AWS_MARKETPLACE_AMI_INGESTION" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_AMI_INGESTION"></a>

```typescript
public readonly AWS_MARKETPLACE_AMI_INGESTION: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MARKETPLACE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_MARKETPLACE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_FULL_ACCESS"></a>

```typescript
public readonly AWS_MARKETPLACE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MARKETPLACE_GET_ENTITLEMENTS`<sup>Required</sup> <a name="AWS_MARKETPLACE_GET_ENTITLEMENTS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_GET_ENTITLEMENTS"></a>

```typescript
public readonly AWS_MARKETPLACE_GET_ENTITLEMENTS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MARKETPLACE_IMAGE_BUILD_FULL_ACCESS`<sup>Required</sup> <a name="AWS_MARKETPLACE_IMAGE_BUILD_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_IMAGE_BUILD_FULL_ACCESS"></a>

```typescript
public readonly AWS_MARKETPLACE_IMAGE_BUILD_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MARKETPLACE_MANAGE_SUBSCRIPTIONS`<sup>Required</sup> <a name="AWS_MARKETPLACE_MANAGE_SUBSCRIPTIONS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_MANAGE_SUBSCRIPTIONS"></a>

```typescript
public readonly AWS_MARKETPLACE_MANAGE_SUBSCRIPTIONS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MARKETPLACE_METERING_FULL_ACCESS`<sup>Required</sup> <a name="AWS_MARKETPLACE_METERING_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_METERING_FULL_ACCESS"></a>

```typescript
public readonly AWS_MARKETPLACE_METERING_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MARKETPLACE_METERING_REGISTER_USAGE`<sup>Required</sup> <a name="AWS_MARKETPLACE_METERING_REGISTER_USAGE" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_METERING_REGISTER_USAGE"></a>

```typescript
public readonly AWS_MARKETPLACE_METERING_REGISTER_USAGE: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MARKETPLACE_PROCUREMENT_SYSTEM_ADMIN_FULL_ACCESS`<sup>Required</sup> <a name="AWS_MARKETPLACE_PROCUREMENT_SYSTEM_ADMIN_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_PROCUREMENT_SYSTEM_ADMIN_FULL_ACCESS"></a>

```typescript
public readonly AWS_MARKETPLACE_PROCUREMENT_SYSTEM_ADMIN_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MARKETPLACE_READ_ONLY`<sup>Required</sup> <a name="AWS_MARKETPLACE_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_READ_ONLY"></a>

```typescript
public readonly AWS_MARKETPLACE_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MARKETPLACE_SELLER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_MARKETPLACE_SELLER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_SELLER_FULL_ACCESS"></a>

```typescript
public readonly AWS_MARKETPLACE_SELLER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MARKETPLACE_SELLER_OFFER_MANAGEMENT`<sup>Required</sup> <a name="AWS_MARKETPLACE_SELLER_OFFER_MANAGEMENT" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_SELLER_OFFER_MANAGEMENT"></a>

```typescript
public readonly AWS_MARKETPLACE_SELLER_OFFER_MANAGEMENT: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MARKETPLACE_SELLER_PRODUCTS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_MARKETPLACE_SELLER_PRODUCTS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_SELLER_PRODUCTS_FULL_ACCESS"></a>

```typescript
public readonly AWS_MARKETPLACE_SELLER_PRODUCTS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MARKETPLACE_SELLER_PRODUCTS_READ_ONLY`<sup>Required</sup> <a name="AWS_MARKETPLACE_SELLER_PRODUCTS_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MARKETPLACE_SELLER_PRODUCTS_READ_ONLY"></a>

```typescript
public readonly AWS_MARKETPLACE_SELLER_PRODUCTS_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MIGRATION_HUB_FULL_ACCESS`<sup>Required</sup> <a name="AWS_MIGRATION_HUB_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_FULL_ACCESS"></a>

```typescript
public readonly AWS_MIGRATION_HUB_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MIGRATION_HUB_ORCHESTRATOR_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_MIGRATION_HUB_ORCHESTRATOR_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_ORCHESTRATOR_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AWS_MIGRATION_HUB_ORCHESTRATOR_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MIGRATION_HUB_ORCHESTRATOR_INSTANCE_ROLE_POLICY`<sup>Required</sup> <a name="AWS_MIGRATION_HUB_ORCHESTRATOR_INSTANCE_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_ORCHESTRATOR_INSTANCE_ROLE_POLICY"></a>

```typescript
public readonly AWS_MIGRATION_HUB_ORCHESTRATOR_INSTANCE_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MIGRATION_HUB_ORCHESTRATOR_PLUGIN`<sup>Required</sup> <a name="AWS_MIGRATION_HUB_ORCHESTRATOR_PLUGIN" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_ORCHESTRATOR_PLUGIN"></a>

```typescript
public readonly AWS_MIGRATION_HUB_ORCHESTRATOR_PLUGIN: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MIGRATION_HUB_REFACTOR_SPACES_ENVIRONMENTS_WITHOUT_BRIDGES_FULL_ACCESS`<sup>Required</sup> <a name="AWS_MIGRATION_HUB_REFACTOR_SPACES_ENVIRONMENTS_WITHOUT_BRIDGES_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_REFACTOR_SPACES_ENVIRONMENTS_WITHOUT_BRIDGES_FULL_ACCESS"></a>

```typescript
public readonly AWS_MIGRATION_HUB_REFACTOR_SPACES_ENVIRONMENTS_WITHOUT_BRIDGES_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MIGRATION_HUB_REFACTOR_SPACES_FULL_ACCESS`<sup>Required</sup> <a name="AWS_MIGRATION_HUB_REFACTOR_SPACES_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_REFACTOR_SPACES_FULL_ACCESS"></a>

```typescript
public readonly AWS_MIGRATION_HUB_REFACTOR_SPACES_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MIGRATION_HUB_STRATEGY_COLLECTOR`<sup>Required</sup> <a name="AWS_MIGRATION_HUB_STRATEGY_COLLECTOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_STRATEGY_COLLECTOR"></a>

```typescript
public readonly AWS_MIGRATION_HUB_STRATEGY_COLLECTOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_MIGRATION_HUB_STRATEGY_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_MIGRATION_HUB_STRATEGY_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_MIGRATION_HUB_STRATEGY_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AWS_MIGRATION_HUB_STRATEGY_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_NETWORK_MANAGER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_NETWORK_MANAGER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_NETWORK_MANAGER_FULL_ACCESS"></a>

```typescript
public readonly AWS_NETWORK_MANAGER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_NETWORK_MANAGER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_NETWORK_MANAGER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_NETWORK_MANAGER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_NETWORK_MANAGER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_OPS_WORKS_CLOUD_WATCH_LOGS`<sup>Required</sup> <a name="AWS_OPS_WORKS_CLOUD_WATCH_LOGS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OPS_WORKS_CLOUD_WATCH_LOGS"></a>

```typescript
public readonly AWS_OPS_WORKS_CLOUD_WATCH_LOGS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_OPS_WORKS_CM_INSTANCE_PROFILE_ROLE`<sup>Required</sup> <a name="AWS_OPS_WORKS_CM_INSTANCE_PROFILE_ROLE" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OPS_WORKS_CM_INSTANCE_PROFILE_ROLE"></a>

```typescript
public readonly AWS_OPS_WORKS_CM_INSTANCE_PROFILE_ROLE: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_OPS_WORKS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_OPS_WORKS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OPS_WORKS_FULL_ACCESS"></a>

```typescript
public readonly AWS_OPS_WORKS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_OPS_WORKS_INSTANCE_REGISTRATION`<sup>Required</sup> <a name="AWS_OPS_WORKS_INSTANCE_REGISTRATION" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OPS_WORKS_INSTANCE_REGISTRATION"></a>

```typescript
public readonly AWS_OPS_WORKS_INSTANCE_REGISTRATION: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_OPS_WORKS_REGISTER_CLI_EC2`<sup>Required</sup> <a name="AWS_OPS_WORKS_REGISTER_CLI_EC2" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OPS_WORKS_REGISTER_CLI_EC2"></a>

```typescript
public readonly AWS_OPS_WORKS_REGISTER_CLI_EC2: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_OPS_WORKS_REGISTER_CLI_ON_PREMISES`<sup>Required</sup> <a name="AWS_OPS_WORKS_REGISTER_CLI_ON_PREMISES" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OPS_WORKS_REGISTER_CLI_ON_PREMISES"></a>

```typescript
public readonly AWS_OPS_WORKS_REGISTER_CLI_ON_PREMISES: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ORGANIZATIONS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_ORGANIZATIONS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ORGANIZATIONS_FULL_ACCESS"></a>

```typescript
public readonly AWS_ORGANIZATIONS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ORGANIZATIONS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_ORGANIZATIONS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ORGANIZATIONS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_ORGANIZATIONS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_OUTPOSTS_AUTHORIZE_SERVER_POLICY`<sup>Required</sup> <a name="AWS_OUTPOSTS_AUTHORIZE_SERVER_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_OUTPOSTS_AUTHORIZE_SERVER_POLICY"></a>

```typescript
public readonly AWS_OUTPOSTS_AUTHORIZE_SERVER_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PANORAMA_FULL_ACCESS`<sup>Required</sup> <a name="AWS_PANORAMA_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PANORAMA_FULL_ACCESS"></a>

```typescript
public readonly AWS_PANORAMA_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PARTNER_CENTRAL_FULL_ACCESS`<sup>Required</sup> <a name="AWS_PARTNER_CENTRAL_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PARTNER_CENTRAL_FULL_ACCESS"></a>

```typescript
public readonly AWS_PARTNER_CENTRAL_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PARTNER_CENTRAL_OPPORTUNITY_MANAGEMENT`<sup>Required</sup> <a name="AWS_PARTNER_CENTRAL_OPPORTUNITY_MANAGEMENT" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PARTNER_CENTRAL_OPPORTUNITY_MANAGEMENT"></a>

```typescript
public readonly AWS_PARTNER_CENTRAL_OPPORTUNITY_MANAGEMENT: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PARTNER_CENTRAL_SANDBOX_FULL_ACCESS`<sup>Required</sup> <a name="AWS_PARTNER_CENTRAL_SANDBOX_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PARTNER_CENTRAL_SANDBOX_FULL_ACCESS"></a>

```typescript
public readonly AWS_PARTNER_CENTRAL_SANDBOX_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PARTNER_CENTRAL_SELLING_RESOURCE_SNAPSHOT_JOB_EXECUTION_ROLE_POLICY`<sup>Required</sup> <a name="AWS_PARTNER_CENTRAL_SELLING_RESOURCE_SNAPSHOT_JOB_EXECUTION_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PARTNER_CENTRAL_SELLING_RESOURCE_SNAPSHOT_JOB_EXECUTION_ROLE_POLICY"></a>

```typescript
public readonly AWS_PARTNER_CENTRAL_SELLING_RESOURCE_SNAPSHOT_JOB_EXECUTION_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PARTNER_LED_SUPPORT_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_PARTNER_LED_SUPPORT_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PARTNER_LED_SUPPORT_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_PARTNER_LED_SUPPORT_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PRICE_LIST_SERVICE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_PRICE_LIST_SERVICE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRICE_LIST_SERVICE_FULL_ACCESS"></a>

```typescript
public readonly AWS_PRICE_LIST_SERVICE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PRIVATE_CA_AUDITOR`<sup>Required</sup> <a name="AWS_PRIVATE_CA_AUDITOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_CA_AUDITOR"></a>

```typescript
public readonly AWS_PRIVATE_CA_AUDITOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PRIVATE_CA_FULL_ACCESS`<sup>Required</sup> <a name="AWS_PRIVATE_CA_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_CA_FULL_ACCESS"></a>

```typescript
public readonly AWS_PRIVATE_CA_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PRIVATE_CA_PRIVILEGED_USER`<sup>Required</sup> <a name="AWS_PRIVATE_CA_PRIVILEGED_USER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_CA_PRIVILEGED_USER"></a>

```typescript
public readonly AWS_PRIVATE_CA_PRIVILEGED_USER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PRIVATE_CA_READ_ONLY`<sup>Required</sup> <a name="AWS_PRIVATE_CA_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_CA_READ_ONLY"></a>

```typescript
public readonly AWS_PRIVATE_CA_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PRIVATE_CA_USER`<sup>Required</sup> <a name="AWS_PRIVATE_CA_USER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_CA_USER"></a>

```typescript
public readonly AWS_PRIVATE_CA_USER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PRIVATE_MARKETPLACE_ADMIN_FULL_ACCESS`<sup>Required</sup> <a name="AWS_PRIVATE_MARKETPLACE_ADMIN_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_MARKETPLACE_ADMIN_FULL_ACCESS"></a>

```typescript
public readonly AWS_PRIVATE_MARKETPLACE_ADMIN_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PRIVATE_MARKETPLACE_REQUESTS`<sup>Required</sup> <a name="AWS_PRIVATE_MARKETPLACE_REQUESTS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PRIVATE_MARKETPLACE_REQUESTS"></a>

```typescript
public readonly AWS_PRIVATE_MARKETPLACE_REQUESTS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PROTON_CODE_BUILD_PROVISIONING_BASIC_ACCESS`<sup>Required</sup> <a name="AWS_PROTON_CODE_BUILD_PROVISIONING_BASIC_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PROTON_CODE_BUILD_PROVISIONING_BASIC_ACCESS"></a>

```typescript
public readonly AWS_PROTON_CODE_BUILD_PROVISIONING_BASIC_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PROTON_DEVELOPER_ACCESS`<sup>Required</sup> <a name="AWS_PROTON_DEVELOPER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PROTON_DEVELOPER_ACCESS"></a>

```typescript
public readonly AWS_PROTON_DEVELOPER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PROTON_FULL_ACCESS`<sup>Required</sup> <a name="AWS_PROTON_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PROTON_FULL_ACCESS"></a>

```typescript
public readonly AWS_PROTON_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PROTON_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_PROTON_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PROTON_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_PROTON_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_PURCHASE_ORDERS_SERVICE_ROLE_POLICY`<sup>Required</sup> <a name="AWS_PURCHASE_ORDERS_SERVICE_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_PURCHASE_ORDERS_SERVICE_ROLE_POLICY"></a>

```typescript
public readonly AWS_PURCHASE_ORDERS_SERVICE_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_CFGC_PACKS_PERMISSIONS_BOUNDARY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_CFGC_PACKS_PERMISSIONS_BOUNDARY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_CFGC_PACKS_PERMISSIONS_BOUNDARY"></a>

```typescript
public readonly AWS_QUICK_SETUP_CFGC_PACKS_PERMISSIONS_BOUNDARY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_DEPLOYMENT_ROLE_POLICY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_DEPLOYMENT_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_DEPLOYMENT_ROLE_POLICY"></a>

```typescript
public readonly AWS_QUICK_SETUP_DEPLOYMENT_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_DEV_OPS_GURU_PERMISSIONS_BOUNDARY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_DEV_OPS_GURU_PERMISSIONS_BOUNDARY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_DEV_OPS_GURU_PERMISSIONS_BOUNDARY"></a>

```typescript
public readonly AWS_QUICK_SETUP_DEV_OPS_GURU_PERMISSIONS_BOUNDARY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_DISTRIBUTOR_PERMISSIONS_BOUNDARY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_DISTRIBUTOR_PERMISSIONS_BOUNDARY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_DISTRIBUTOR_PERMISSIONS_BOUNDARY"></a>

```typescript
public readonly AWS_QUICK_SETUP_DISTRIBUTOR_PERMISSIONS_BOUNDARY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_ENABLE_AREX_EXECUTION_POLICY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_ENABLE_AREX_EXECUTION_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_ENABLE_AREX_EXECUTION_POLICY"></a>

```typescript
public readonly AWS_QUICK_SETUP_ENABLE_AREX_EXECUTION_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_ENABLE_DHMC_EXECUTION_POLICY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_ENABLE_DHMC_EXECUTION_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_ENABLE_DHMC_EXECUTION_POLICY"></a>

```typescript
public readonly AWS_QUICK_SETUP_ENABLE_DHMC_EXECUTION_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_MANAGED_INSTANCE_PROFILE_EXECUTION_POLICY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_MANAGED_INSTANCE_PROFILE_EXECUTION_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_MANAGED_INSTANCE_PROFILE_EXECUTION_POLICY"></a>

```typescript
public readonly AWS_QUICK_SETUP_MANAGED_INSTANCE_PROFILE_EXECUTION_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_PATCH_POLICY_BASELINE_ACCESS`<sup>Required</sup> <a name="AWS_QUICK_SETUP_PATCH_POLICY_BASELINE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_PATCH_POLICY_BASELINE_ACCESS"></a>

```typescript
public readonly AWS_QUICK_SETUP_PATCH_POLICY_BASELINE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_PATCH_POLICY_DEPLOYMENT_ROLE_POLICY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_PATCH_POLICY_DEPLOYMENT_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_PATCH_POLICY_DEPLOYMENT_ROLE_POLICY"></a>

```typescript
public readonly AWS_QUICK_SETUP_PATCH_POLICY_DEPLOYMENT_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_PATCH_POLICY_PERMISSIONS_BOUNDARY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_PATCH_POLICY_PERMISSIONS_BOUNDARY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_PATCH_POLICY_PERMISSIONS_BOUNDARY"></a>

```typescript
public readonly AWS_QUICK_SETUP_PATCH_POLICY_PERMISSIONS_BOUNDARY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_SCHEDULER_PERMISSIONS_BOUNDARY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_SCHEDULER_PERMISSIONS_BOUNDARY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_SCHEDULER_PERMISSIONS_BOUNDARY"></a>

```typescript
public readonly AWS_QUICK_SETUP_SCHEDULER_PERMISSIONS_BOUNDARY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_SSM_DEPLOYMENT_ROLE_POLICY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_SSM_DEPLOYMENT_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_SSM_DEPLOYMENT_ROLE_POLICY"></a>

```typescript
public readonly AWS_QUICK_SETUP_SSM_DEPLOYMENT_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_SSM_DEPLOYMENT_S3_BUCKET_ROLE_POLICY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_SSM_DEPLOYMENT_S3_BUCKET_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_SSM_DEPLOYMENT_S3_BUCKET_ROLE_POLICY"></a>

```typescript
public readonly AWS_QUICK_SETUP_SSM_DEPLOYMENT_S3_BUCKET_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_SSM_HOST_MGMT_PERMISSIONS_BOUNDARY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_SSM_HOST_MGMT_PERMISSIONS_BOUNDARY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_SSM_HOST_MGMT_PERMISSIONS_BOUNDARY"></a>

```typescript
public readonly AWS_QUICK_SETUP_SSM_HOST_MGMT_PERMISSIONS_BOUNDARY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_SSM_LIFECYCLE_MANAGEMENT_EXECUTION_POLICY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_SSM_LIFECYCLE_MANAGEMENT_EXECUTION_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_SSM_LIFECYCLE_MANAGEMENT_EXECUTION_POLICY"></a>

```typescript
public readonly AWS_QUICK_SETUP_SSM_LIFECYCLE_MANAGEMENT_EXECUTION_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SETUP_SSM_MANAGE_RESOURCES_EXECUTION_POLICY`<sup>Required</sup> <a name="AWS_QUICK_SETUP_SSM_MANAGE_RESOURCES_EXECUTION_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SETUP_SSM_MANAGE_RESOURCES_EXECUTION_POLICY"></a>

```typescript
public readonly AWS_QUICK_SETUP_SSM_MANAGE_RESOURCES_EXECUTION_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SIGHT_ASSET_BUNDLE_EXPORT_POLICY`<sup>Required</sup> <a name="AWS_QUICK_SIGHT_ASSET_BUNDLE_EXPORT_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SIGHT_ASSET_BUNDLE_EXPORT_POLICY"></a>

```typescript
public readonly AWS_QUICK_SIGHT_ASSET_BUNDLE_EXPORT_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SIGHT_ASSET_BUNDLE_IMPORT_POLICY`<sup>Required</sup> <a name="AWS_QUICK_SIGHT_ASSET_BUNDLE_IMPORT_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SIGHT_ASSET_BUNDLE_IMPORT_POLICY"></a>

```typescript
public readonly AWS_QUICK_SIGHT_ASSET_BUNDLE_IMPORT_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_QUICK_SIGHT_IO_T_ANALYTICS_ACCESS`<sup>Required</sup> <a name="AWS_QUICK_SIGHT_IO_T_ANALYTICS_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_QUICK_SIGHT_IO_T_ANALYTICS_ACCESS"></a>

```typescript
public readonly AWS_QUICK_SIGHT_IO_T_ANALYTICS_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_REFACTORING_TOOLKIT_FULL_ACCESS`<sup>Required</sup> <a name="AWS_REFACTORING_TOOLKIT_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_REFACTORING_TOOLKIT_FULL_ACCESS"></a>

```typescript
public readonly AWS_REFACTORING_TOOLKIT_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_REFACTORING_TOOLKIT_SIDECAR_POLICY`<sup>Required</sup> <a name="AWS_REFACTORING_TOOLKIT_SIDECAR_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_REFACTORING_TOOLKIT_SIDECAR_POLICY"></a>

```typescript
public readonly AWS_REFACTORING_TOOLKIT_SIDECAR_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_REPOST_SPACE_SUPPORT_OPERATIONS_POLICY`<sup>Required</sup> <a name="AWS_REPOST_SPACE_SUPPORT_OPERATIONS_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_REPOST_SPACE_SUPPORT_OPERATIONS_POLICY"></a>

```typescript
public readonly AWS_REPOST_SPACE_SUPPORT_OPERATIONS_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_RESILIENCE_HUB_ASSSESSMENT_EXECUTION_POLICY`<sup>Required</sup> <a name="AWS_RESILIENCE_HUB_ASSSESSMENT_EXECUTION_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESILIENCE_HUB_ASSSESSMENT_EXECUTION_POLICY"></a>

```typescript
public readonly AWS_RESILIENCE_HUB_ASSSESSMENT_EXECUTION_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_RESOURCE_ACCESS_MANAGER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_RESOURCE_ACCESS_MANAGER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_ACCESS_MANAGER_FULL_ACCESS"></a>

```typescript
public readonly AWS_RESOURCE_ACCESS_MANAGER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_RESOURCE_ACCESS_MANAGER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_RESOURCE_ACCESS_MANAGER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_ACCESS_MANAGER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_RESOURCE_ACCESS_MANAGER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_RESOURCE_ACCESS_MANAGER_RESOURCE_SHARE_PARTICIPANT_ACCESS`<sup>Required</sup> <a name="AWS_RESOURCE_ACCESS_MANAGER_RESOURCE_SHARE_PARTICIPANT_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_ACCESS_MANAGER_RESOURCE_SHARE_PARTICIPANT_ACCESS"></a>

```typescript
public readonly AWS_RESOURCE_ACCESS_MANAGER_RESOURCE_SHARE_PARTICIPANT_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_RESOURCE_EXPLORER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_RESOURCE_EXPLORER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_EXPLORER_FULL_ACCESS"></a>

```typescript
public readonly AWS_RESOURCE_EXPLORER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_RESOURCE_EXPLORER_ORGANIZATIONS_ACCESS`<sup>Required</sup> <a name="AWS_RESOURCE_EXPLORER_ORGANIZATIONS_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_EXPLORER_ORGANIZATIONS_ACCESS"></a>

```typescript
public readonly AWS_RESOURCE_EXPLORER_ORGANIZATIONS_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_RESOURCE_EXPLORER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_RESOURCE_EXPLORER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_EXPLORER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_RESOURCE_EXPLORER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_RESOURCE_GROUPS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_RESOURCE_GROUPS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_RESOURCE_GROUPS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_RESOURCE_GROUPS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ROBO_MAKER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_ROBO_MAKER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ROBO_MAKER_FULL_ACCESS"></a>

```typescript
public readonly AWS_ROBO_MAKER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ROBO_MAKER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_ROBO_MAKER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ROBO_MAKER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_ROBO_MAKER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_ROBO_MAKER_SERVICE_ROLE_POLICY`<sup>Required</sup> <a name="AWS_ROBO_MAKER_SERVICE_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_ROBO_MAKER_SERVICE_ROLE_POLICY"></a>

```typescript
public readonly AWS_ROBO_MAKER_SERVICE_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SAVINGS_PLANS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_SAVINGS_PLANS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SAVINGS_PLANS_FULL_ACCESS"></a>

```typescript
public readonly AWS_SAVINGS_PLANS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SAVINGS_PLANS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_SAVINGS_PLANS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SAVINGS_PLANS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_SAVINGS_PLANS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SECURITY_HUB_FULL_ACCESS`<sup>Required</sup> <a name="AWS_SECURITY_HUB_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SECURITY_HUB_FULL_ACCESS"></a>

```typescript
public readonly AWS_SECURITY_HUB_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SECURITY_HUB_ORGANIZATIONS_ACCESS`<sup>Required</sup> <a name="AWS_SECURITY_HUB_ORGANIZATIONS_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SECURITY_HUB_ORGANIZATIONS_ACCESS"></a>

```typescript
public readonly AWS_SECURITY_HUB_ORGANIZATIONS_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SECURITY_HUB_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_SECURITY_HUB_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SECURITY_HUB_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_SECURITY_HUB_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SECURITY_INCIDENT_RESPONSE_CASE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_SECURITY_INCIDENT_RESPONSE_CASE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SECURITY_INCIDENT_RESPONSE_CASE_FULL_ACCESS"></a>

```typescript
public readonly AWS_SECURITY_INCIDENT_RESPONSE_CASE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SECURITY_INCIDENT_RESPONSE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_SECURITY_INCIDENT_RESPONSE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SECURITY_INCIDENT_RESPONSE_FULL_ACCESS"></a>

```typescript
public readonly AWS_SECURITY_INCIDENT_RESPONSE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SECURITY_INCIDENT_RESPONSE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_SECURITY_INCIDENT_RESPONSE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SECURITY_INCIDENT_RESPONSE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_SECURITY_INCIDENT_RESPONSE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SERVICE_CATALOG_ADMIN_FULL_ACCESS`<sup>Required</sup> <a name="AWS_SERVICE_CATALOG_ADMIN_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SERVICE_CATALOG_ADMIN_FULL_ACCESS"></a>

```typescript
public readonly AWS_SERVICE_CATALOG_ADMIN_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SERVICE_CATALOG_ADMIN_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_SERVICE_CATALOG_ADMIN_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SERVICE_CATALOG_ADMIN_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_SERVICE_CATALOG_ADMIN_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SERVICE_CATALOG_APP_REGISTRY_FULL_ACCESS`<sup>Required</sup> <a name="AWS_SERVICE_CATALOG_APP_REGISTRY_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SERVICE_CATALOG_APP_REGISTRY_FULL_ACCESS"></a>

```typescript
public readonly AWS_SERVICE_CATALOG_APP_REGISTRY_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SERVICE_CATALOG_APP_REGISTRY_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_SERVICE_CATALOG_APP_REGISTRY_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SERVICE_CATALOG_APP_REGISTRY_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_SERVICE_CATALOG_APP_REGISTRY_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SERVICE_CATALOG_END_USER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_SERVICE_CATALOG_END_USER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SERVICE_CATALOG_END_USER_FULL_ACCESS"></a>

```typescript
public readonly AWS_SERVICE_CATALOG_END_USER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SERVICE_CATALOG_END_USER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_SERVICE_CATALOG_END_USER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SERVICE_CATALOG_END_USER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_SERVICE_CATALOG_END_USER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SSM_AUTOMATION_DIAGNOSIS_BUCKET_POLICY`<sup>Required</sup> <a name="AWS_SSM_AUTOMATION_DIAGNOSIS_BUCKET_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_AUTOMATION_DIAGNOSIS_BUCKET_POLICY"></a>

```typescript
public readonly AWS_SSM_AUTOMATION_DIAGNOSIS_BUCKET_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SSM_DIAGNOSIS_AUTOMATION_ADMINISTRATION_ROLE_POLICY`<sup>Required</sup> <a name="AWS_SSM_DIAGNOSIS_AUTOMATION_ADMINISTRATION_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_DIAGNOSIS_AUTOMATION_ADMINISTRATION_ROLE_POLICY"></a>

```typescript
public readonly AWS_SSM_DIAGNOSIS_AUTOMATION_ADMINISTRATION_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SSM_DIAGNOSIS_AUTOMATION_EXECUTION_ROLE_POLICY`<sup>Required</sup> <a name="AWS_SSM_DIAGNOSIS_AUTOMATION_EXECUTION_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_DIAGNOSIS_AUTOMATION_EXECUTION_ROLE_POLICY"></a>

```typescript
public readonly AWS_SSM_DIAGNOSIS_AUTOMATION_EXECUTION_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SSM_DIAGNOSIS_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY`<sup>Required</sup> <a name="AWS_SSM_DIAGNOSIS_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_DIAGNOSIS_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY"></a>

```typescript
public readonly AWS_SSM_DIAGNOSIS_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SSM_REMEDIATION_AUTOMATION_ADMINISTRATION_ROLE_POLICY`<sup>Required</sup> <a name="AWS_SSM_REMEDIATION_AUTOMATION_ADMINISTRATION_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_REMEDIATION_AUTOMATION_ADMINISTRATION_ROLE_POLICY"></a>

```typescript
public readonly AWS_SSM_REMEDIATION_AUTOMATION_ADMINISTRATION_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SSM_REMEDIATION_AUTOMATION_EXECUTION_ROLE_POLICY`<sup>Required</sup> <a name="AWS_SSM_REMEDIATION_AUTOMATION_EXECUTION_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_REMEDIATION_AUTOMATION_EXECUTION_ROLE_POLICY"></a>

```typescript
public readonly AWS_SSM_REMEDIATION_AUTOMATION_EXECUTION_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SSM_REMEDIATION_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY`<sup>Required</sup> <a name="AWS_SSM_REMEDIATION_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSM_REMEDIATION_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY"></a>

```typescript
public readonly AWS_SSM_REMEDIATION_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SSO_DIRECTORY_ADMINISTRATOR`<sup>Required</sup> <a name="AWS_SSO_DIRECTORY_ADMINISTRATOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSO_DIRECTORY_ADMINISTRATOR"></a>

```typescript
public readonly AWS_SSO_DIRECTORY_ADMINISTRATOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SSO_DIRECTORY_READ_ONLY`<sup>Required</sup> <a name="AWS_SSO_DIRECTORY_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSO_DIRECTORY_READ_ONLY"></a>

```typescript
public readonly AWS_SSO_DIRECTORY_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SSO_MASTER_ACCOUNT_ADMINISTRATOR`<sup>Required</sup> <a name="AWS_SSO_MASTER_ACCOUNT_ADMINISTRATOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSO_MASTER_ACCOUNT_ADMINISTRATOR"></a>

```typescript
public readonly AWS_SSO_MASTER_ACCOUNT_ADMINISTRATOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SSO_MEMBER_ACCOUNT_ADMINISTRATOR`<sup>Required</sup> <a name="AWS_SSO_MEMBER_ACCOUNT_ADMINISTRATOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSO_MEMBER_ACCOUNT_ADMINISTRATOR"></a>

```typescript
public readonly AWS_SSO_MEMBER_ACCOUNT_ADMINISTRATOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SSO_READ_ONLY`<sup>Required</sup> <a name="AWS_SSO_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SSO_READ_ONLY"></a>

```typescript
public readonly AWS_SSO_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_STEP_FUNCTIONS_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_STEP_FUNCTIONS_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_STEP_FUNCTIONS_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AWS_STEP_FUNCTIONS_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_STEP_FUNCTIONS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_STEP_FUNCTIONS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_STEP_FUNCTIONS_FULL_ACCESS"></a>

```typescript
public readonly AWS_STEP_FUNCTIONS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_STEP_FUNCTIONS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_STEP_FUNCTIONS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_STEP_FUNCTIONS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_STEP_FUNCTIONS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_STORAGE_GATEWAY_FULL_ACCESS`<sup>Required</sup> <a name="AWS_STORAGE_GATEWAY_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_STORAGE_GATEWAY_FULL_ACCESS"></a>

```typescript
public readonly AWS_STORAGE_GATEWAY_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_STORAGE_GATEWAY_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_STORAGE_GATEWAY_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_STORAGE_GATEWAY_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_STORAGE_GATEWAY_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SUPPORT_ACCESS`<sup>Required</sup> <a name="AWS_SUPPORT_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SUPPORT_ACCESS"></a>

```typescript
public readonly AWS_SUPPORT_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SUPPORT_APP_FULL_ACCESS`<sup>Required</sup> <a name="AWS_SUPPORT_APP_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SUPPORT_APP_FULL_ACCESS"></a>

```typescript
public readonly AWS_SUPPORT_APP_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SUPPORT_APP_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_SUPPORT_APP_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SUPPORT_APP_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_SUPPORT_APP_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SUPPORT_PLANS_FULL_ACCESS`<sup>Required</sup> <a name="AWS_SUPPORT_PLANS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SUPPORT_PLANS_FULL_ACCESS"></a>

```typescript
public readonly AWS_SUPPORT_PLANS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SUPPORT_PLANS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_SUPPORT_PLANS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SUPPORT_PLANS_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_SUPPORT_PLANS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SYSTEMS_MANAGER_ENABLE_CONFIG_RECORDING_EXECUTION_POLICY`<sup>Required</sup> <a name="AWS_SYSTEMS_MANAGER_ENABLE_CONFIG_RECORDING_EXECUTION_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SYSTEMS_MANAGER_ENABLE_CONFIG_RECORDING_EXECUTION_POLICY"></a>

```typescript
public readonly AWS_SYSTEMS_MANAGER_ENABLE_CONFIG_RECORDING_EXECUTION_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SYSTEMS_MANAGER_ENABLE_EXPLORER_EXECUTION_POLICY`<sup>Required</sup> <a name="AWS_SYSTEMS_MANAGER_ENABLE_EXPLORER_EXECUTION_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SYSTEMS_MANAGER_ENABLE_EXPLORER_EXECUTION_POLICY"></a>

```typescript
public readonly AWS_SYSTEMS_MANAGER_ENABLE_EXPLORER_EXECUTION_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SYSTEMS_MANAGER_FOR_SAP_FULL_ACCESS`<sup>Required</sup> <a name="AWS_SYSTEMS_MANAGER_FOR_SAP_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SYSTEMS_MANAGER_FOR_SAP_FULL_ACCESS"></a>

```typescript
public readonly AWS_SYSTEMS_MANAGER_FOR_SAP_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_SYSTEMS_MANAGER_FOR_SAP_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_SYSTEMS_MANAGER_FOR_SAP_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_SYSTEMS_MANAGER_FOR_SAP_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_SYSTEMS_MANAGER_FOR_SAP_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_THINKBOX_ASSET_SERVER_POLICY`<sup>Required</sup> <a name="AWS_THINKBOX_ASSET_SERVER_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_ASSET_SERVER_POLICY"></a>

```typescript
public readonly AWS_THINKBOX_ASSET_SERVER_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_THINKBOX_AWS_PORTAL_ADMIN_POLICY`<sup>Required</sup> <a name="AWS_THINKBOX_AWS_PORTAL_ADMIN_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_AWS_PORTAL_ADMIN_POLICY"></a>

```typescript
public readonly AWS_THINKBOX_AWS_PORTAL_ADMIN_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_THINKBOX_AWS_PORTAL_GATEWAY_POLICY`<sup>Required</sup> <a name="AWS_THINKBOX_AWS_PORTAL_GATEWAY_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_AWS_PORTAL_GATEWAY_POLICY"></a>

```typescript
public readonly AWS_THINKBOX_AWS_PORTAL_GATEWAY_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_THINKBOX_AWS_PORTAL_WORKER_POLICY`<sup>Required</sup> <a name="AWS_THINKBOX_AWS_PORTAL_WORKER_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_AWS_PORTAL_WORKER_POLICY"></a>

```typescript
public readonly AWS_THINKBOX_AWS_PORTAL_WORKER_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ACCESS_POLICY`<sup>Required</sup> <a name="AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ACCESS_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ACCESS_POLICY"></a>

```typescript
public readonly AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ACCESS_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ADMIN_POLICY`<sup>Required</sup> <a name="AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ADMIN_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ADMIN_POLICY"></a>

```typescript
public readonly AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ADMIN_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_ADMIN_POLICY`<sup>Required</sup> <a name="AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_ADMIN_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_ADMIN_POLICY"></a>

```typescript
public readonly AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_ADMIN_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_WORKER_POLICY`<sup>Required</sup> <a name="AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_WORKER_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_WORKER_POLICY"></a>

```typescript
public readonly AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_WORKER_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_TRANSFER_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_TRANSFER_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_TRANSFER_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AWS_TRANSFER_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_TRANSFER_FULL_ACCESS`<sup>Required</sup> <a name="AWS_TRANSFER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_TRANSFER_FULL_ACCESS"></a>

```typescript
public readonly AWS_TRANSFER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_TRANSFER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_TRANSFER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_TRANSFER_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_TRANSFER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_TRUSTED_ADVISOR_PRIORITY_FULL_ACCESS`<sup>Required</sup> <a name="AWS_TRUSTED_ADVISOR_PRIORITY_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_TRUSTED_ADVISOR_PRIORITY_FULL_ACCESS"></a>

```typescript
public readonly AWS_TRUSTED_ADVISOR_PRIORITY_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_TRUSTED_ADVISOR_PRIORITY_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_TRUSTED_ADVISOR_PRIORITY_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_TRUSTED_ADVISOR_PRIORITY_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_TRUSTED_ADVISOR_PRIORITY_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_VENDOR_INSIGHTS_ASSESSOR_FULL_ACCESS`<sup>Required</sup> <a name="AWS_VENDOR_INSIGHTS_ASSESSOR_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_VENDOR_INSIGHTS_ASSESSOR_FULL_ACCESS"></a>

```typescript
public readonly AWS_VENDOR_INSIGHTS_ASSESSOR_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_VENDOR_INSIGHTS_ASSESSOR_READ_ONLY`<sup>Required</sup> <a name="AWS_VENDOR_INSIGHTS_ASSESSOR_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_VENDOR_INSIGHTS_ASSESSOR_READ_ONLY"></a>

```typescript
public readonly AWS_VENDOR_INSIGHTS_ASSESSOR_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_VENDOR_INSIGHTS_VENDOR_FULL_ACCESS`<sup>Required</sup> <a name="AWS_VENDOR_INSIGHTS_VENDOR_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_VENDOR_INSIGHTS_VENDOR_FULL_ACCESS"></a>

```typescript
public readonly AWS_VENDOR_INSIGHTS_VENDOR_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_VENDOR_INSIGHTS_VENDOR_READ_ONLY`<sup>Required</sup> <a name="AWS_VENDOR_INSIGHTS_VENDOR_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_VENDOR_INSIGHTS_VENDOR_READ_ONLY"></a>

```typescript
public readonly AWS_VENDOR_INSIGHTS_VENDOR_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_WAF_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="AWS_WAF_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_WAF_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly AWS_WAF_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_WAF_CONSOLE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_WAF_CONSOLE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_WAF_CONSOLE_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_WAF_CONSOLE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_WAF_FULL_ACCESS`<sup>Required</sup> <a name="AWS_WAF_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_WAF_FULL_ACCESS"></a>

```typescript
public readonly AWS_WAF_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_WAF_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_WAF_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_WAF_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_WAF_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_WICKR_FULL_ACCESS`<sup>Required</sup> <a name="AWS_WICKR_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_WICKR_FULL_ACCESS"></a>

```typescript
public readonly AWS_WICKR_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_X_RAY_DAEMON_WRITE_ACCESS`<sup>Required</sup> <a name="AWS_X_RAY_DAEMON_WRITE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_X_RAY_DAEMON_WRITE_ACCESS"></a>

```typescript
public readonly AWS_X_RAY_DAEMON_WRITE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_XRAY_CROSS_ACCOUNT_SHARING_CONFIGURATION`<sup>Required</sup> <a name="AWS_XRAY_CROSS_ACCOUNT_SHARING_CONFIGURATION" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_XRAY_CROSS_ACCOUNT_SHARING_CONFIGURATION"></a>

```typescript
public readonly AWS_XRAY_CROSS_ACCOUNT_SHARING_CONFIGURATION: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_XRAY_FULL_ACCESS`<sup>Required</sup> <a name="AWS_XRAY_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_XRAY_FULL_ACCESS"></a>

```typescript
public readonly AWS_XRAY_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_XRAY_READ_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_XRAY_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_XRAY_READ_ONLY_ACCESS"></a>

```typescript
public readonly AWS_XRAY_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `AWS_XRAY_WRITE_ONLY_ACCESS`<sup>Required</sup> <a name="AWS_XRAY_WRITE_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.AWS_XRAY_WRITE_ONLY_ACCESS"></a>

```typescript
public readonly AWS_XRAY_WRITE_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_FRONT_FULL_ACCESS`<sup>Required</sup> <a name="CLOUD_FRONT_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_FRONT_FULL_ACCESS"></a>

```typescript
public readonly CLOUD_FRONT_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_FRONT_READ_ONLY_ACCESS`<sup>Required</sup> <a name="CLOUD_FRONT_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_FRONT_READ_ONLY_ACCESS"></a>

```typescript
public readonly CLOUD_FRONT_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_SEARCH_FULL_ACCESS`<sup>Required</sup> <a name="CLOUD_SEARCH_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_SEARCH_FULL_ACCESS"></a>

```typescript
public readonly CLOUD_SEARCH_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_SEARCH_READ_ONLY_ACCESS`<sup>Required</sup> <a name="CLOUD_SEARCH_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_SEARCH_READ_ONLY_ACCESS"></a>

```typescript
public readonly CLOUD_SEARCH_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_ACTIONS_EC2_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_ACTIONS_EC2_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_ACTIONS_EC2_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_ACTIONS_EC2_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_AGENT_ADMIN_POLICY`<sup>Required</sup> <a name="CLOUD_WATCH_AGENT_ADMIN_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_AGENT_ADMIN_POLICY"></a>

```typescript
public readonly CLOUD_WATCH_AGENT_ADMIN_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_AGENT_SERVER_POLICY`<sup>Required</sup> <a name="CLOUD_WATCH_AGENT_SERVER_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_AGENT_SERVER_POLICY"></a>

```typescript
public readonly CLOUD_WATCH_AGENT_SERVER_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_APPLICATION_INSIGHTS_FULL_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_APPLICATION_INSIGHTS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_APPLICATION_INSIGHTS_FULL_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_APPLICATION_INSIGHTS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_APPLICATION_INSIGHTS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_APPLICATION_INSIGHTS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_APPLICATION_INSIGHTS_READ_ONLY_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_APPLICATION_INSIGHTS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_APPLICATION_SIGNALS_FULL_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_APPLICATION_SIGNALS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_APPLICATION_SIGNALS_FULL_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_APPLICATION_SIGNALS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_APPLICATION_SIGNALS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_APPLICATION_SIGNALS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_APPLICATION_SIGNALS_READ_ONLY_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_APPLICATION_SIGNALS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_AUTOMATIC_DASHBOARDS_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_AUTOMATIC_DASHBOARDS_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_AUTOMATIC_DASHBOARDS_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_AUTOMATIC_DASHBOARDS_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_CROSS_ACCOUNT_SHARING_CONFIGURATION`<sup>Required</sup> <a name="CLOUD_WATCH_CROSS_ACCOUNT_SHARING_CONFIGURATION" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_CROSS_ACCOUNT_SHARING_CONFIGURATION"></a>

```typescript
public readonly CLOUD_WATCH_CROSS_ACCOUNT_SHARING_CONFIGURATION: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_EVENTS_FULL_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_EVENTS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_EVENTS_FULL_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_EVENTS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_EVENTS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_EVENTS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_EVENTS_READ_ONLY_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_EVENTS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_FULL_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_FULL_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_FULL_ACCESS_V2`<sup>Required</sup> <a name="CLOUD_WATCH_FULL_ACCESS_V2" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_FULL_ACCESS_V2"></a>

```typescript
public readonly CLOUD_WATCH_FULL_ACCESS_V2: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_INTERNET_MONITOR_FULL_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_INTERNET_MONITOR_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_INTERNET_MONITOR_FULL_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_INTERNET_MONITOR_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_INTERNET_MONITOR_READ_ONLY_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_INTERNET_MONITOR_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_INTERNET_MONITOR_READ_ONLY_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_INTERNET_MONITOR_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_LAMBDA_APPLICATION_SIGNALS_EXECUTION_ROLE_POLICY`<sup>Required</sup> <a name="CLOUD_WATCH_LAMBDA_APPLICATION_SIGNALS_EXECUTION_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_LAMBDA_APPLICATION_SIGNALS_EXECUTION_ROLE_POLICY"></a>

```typescript
public readonly CLOUD_WATCH_LAMBDA_APPLICATION_SIGNALS_EXECUTION_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_LAMBDA_INSIGHTS_EXECUTION_ROLE_POLICY`<sup>Required</sup> <a name="CLOUD_WATCH_LAMBDA_INSIGHTS_EXECUTION_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_LAMBDA_INSIGHTS_EXECUTION_ROLE_POLICY"></a>

```typescript
public readonly CLOUD_WATCH_LAMBDA_INSIGHTS_EXECUTION_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_LOGS_CROSS_ACCOUNT_SHARING_CONFIGURATION`<sup>Required</sup> <a name="CLOUD_WATCH_LOGS_CROSS_ACCOUNT_SHARING_CONFIGURATION" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_LOGS_CROSS_ACCOUNT_SHARING_CONFIGURATION"></a>

```typescript
public readonly CLOUD_WATCH_LOGS_CROSS_ACCOUNT_SHARING_CONFIGURATION: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_LOGS_FULL_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_LOGS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_LOGS_FULL_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_LOGS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_LOGS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_LOGS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_LOGS_READ_ONLY_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_LOGS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_NETWORK_FLOW_MONITOR_AGENT_PUBLISH_POLICY`<sup>Required</sup> <a name="CLOUD_WATCH_NETWORK_FLOW_MONITOR_AGENT_PUBLISH_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_NETWORK_FLOW_MONITOR_AGENT_PUBLISH_POLICY"></a>

```typescript
public readonly CLOUD_WATCH_NETWORK_FLOW_MONITOR_AGENT_PUBLISH_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_OPEN_SEARCH_DASHBOARD_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_OPEN_SEARCH_DASHBOARD_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_OPEN_SEARCH_DASHBOARD_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_OPEN_SEARCH_DASHBOARD_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_OPEN_SEARCH_DASHBOARDS_FULL_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_OPEN_SEARCH_DASHBOARDS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_OPEN_SEARCH_DASHBOARDS_FULL_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_OPEN_SEARCH_DASHBOARDS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_READ_ONLY_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_READ_ONLY_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_SYNTHETICS_FULL_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_SYNTHETICS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_SYNTHETICS_FULL_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_SYNTHETICS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `CLOUD_WATCH_SYNTHETICS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="CLOUD_WATCH_SYNTHETICS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.CLOUD_WATCH_SYNTHETICS_READ_ONLY_ACCESS"></a>

```typescript
public readonly CLOUD_WATCH_SYNTHETICS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `COMPREHEND_FULL_ACCESS`<sup>Required</sup> <a name="COMPREHEND_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.COMPREHEND_FULL_ACCESS"></a>

```typescript
public readonly COMPREHEND_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `COMPREHEND_MEDICAL_FULL_ACCESS`<sup>Required</sup> <a name="COMPREHEND_MEDICAL_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.COMPREHEND_MEDICAL_FULL_ACCESS"></a>

```typescript
public readonly COMPREHEND_MEDICAL_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `COMPREHEND_READ_ONLY`<sup>Required</sup> <a name="COMPREHEND_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.COMPREHEND_READ_ONLY"></a>

```typescript
public readonly COMPREHEND_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `COMPUTE_OPTIMIZER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="COMPUTE_OPTIMIZER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.COMPUTE_OPTIMIZER_READ_ONLY_ACCESS"></a>

```typescript
public readonly COMPUTE_OPTIMIZER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `COST_OPTIMIZATION_HUB_ADMIN_ACCESS`<sup>Required</sup> <a name="COST_OPTIMIZATION_HUB_ADMIN_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.COST_OPTIMIZATION_HUB_ADMIN_ACCESS"></a>

```typescript
public readonly COST_OPTIMIZATION_HUB_ADMIN_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `COST_OPTIMIZATION_HUB_READ_ONLY_ACCESS`<sup>Required</sup> <a name="COST_OPTIMIZATION_HUB_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.COST_OPTIMIZATION_HUB_READ_ONLY_ACCESS"></a>

```typescript
public readonly COST_OPTIMIZATION_HUB_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `EC2_FAST_LAUNCH_FULL_ACCESS`<sup>Required</sup> <a name="EC2_FAST_LAUNCH_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.EC2_FAST_LAUNCH_FULL_ACCESS"></a>

```typescript
public readonly EC2_FAST_LAUNCH_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `EC2_IMAGE_BUILDER_CROSS_ACCOUNT_DISTRIBUTION_ACCESS`<sup>Required</sup> <a name="EC2_IMAGE_BUILDER_CROSS_ACCOUNT_DISTRIBUTION_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.EC2_IMAGE_BUILDER_CROSS_ACCOUNT_DISTRIBUTION_ACCESS"></a>

```typescript
public readonly EC2_IMAGE_BUILDER_CROSS_ACCOUNT_DISTRIBUTION_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `EC2_INSTANCE_CONNECT`<sup>Required</sup> <a name="EC2_INSTANCE_CONNECT" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.EC2_INSTANCE_CONNECT"></a>

```typescript
public readonly EC2_INSTANCE_CONNECT: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER`<sup>Required</sup> <a name="EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER"></a>

```typescript
public readonly EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER_ECR_CONTAINER_BUILDS`<sup>Required</sup> <a name="EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER_ECR_CONTAINER_BUILDS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER_ECR_CONTAINER_BUILDS"></a>

```typescript
public readonly EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER_ECR_CONTAINER_BUILDS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ELASTIC_LOAD_BALANCING_FULL_ACCESS`<sup>Required</sup> <a name="ELASTIC_LOAD_BALANCING_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELASTIC_LOAD_BALANCING_FULL_ACCESS"></a>

```typescript
public readonly ELASTIC_LOAD_BALANCING_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ELASTIC_LOAD_BALANCING_READ_ONLY`<sup>Required</sup> <a name="ELASTIC_LOAD_BALANCING_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELASTIC_LOAD_BALANCING_READ_ONLY"></a>

```typescript
public readonly ELASTIC_LOAD_BALANCING_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ELEMENTAL_ACTIVATIONS_DOWNLOAD_SOFTWARE_ACCESS`<sup>Required</sup> <a name="ELEMENTAL_ACTIVATIONS_DOWNLOAD_SOFTWARE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_ACTIVATIONS_DOWNLOAD_SOFTWARE_ACCESS"></a>

```typescript
public readonly ELEMENTAL_ACTIVATIONS_DOWNLOAD_SOFTWARE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ELEMENTAL_ACTIVATIONS_FULL_ACCESS`<sup>Required</sup> <a name="ELEMENTAL_ACTIVATIONS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_ACTIVATIONS_FULL_ACCESS"></a>

```typescript
public readonly ELEMENTAL_ACTIVATIONS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ELEMENTAL_ACTIVATIONS_GENERATE_LICENSES`<sup>Required</sup> <a name="ELEMENTAL_ACTIVATIONS_GENERATE_LICENSES" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_ACTIVATIONS_GENERATE_LICENSES"></a>

```typescript
public readonly ELEMENTAL_ACTIVATIONS_GENERATE_LICENSES: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ELEMENTAL_ACTIVATIONS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="ELEMENTAL_ACTIVATIONS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_ACTIVATIONS_READ_ONLY_ACCESS"></a>

```typescript
public readonly ELEMENTAL_ACTIVATIONS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ELEMENTAL_APPLIANCES_SOFTWARE_FULL_ACCESS`<sup>Required</sup> <a name="ELEMENTAL_APPLIANCES_SOFTWARE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_APPLIANCES_SOFTWARE_FULL_ACCESS"></a>

```typescript
public readonly ELEMENTAL_APPLIANCES_SOFTWARE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ELEMENTAL_APPLIANCES_SOFTWARE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="ELEMENTAL_APPLIANCES_SOFTWARE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_APPLIANCES_SOFTWARE_READ_ONLY_ACCESS"></a>

```typescript
public readonly ELEMENTAL_APPLIANCES_SOFTWARE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ELEMENTAL_SUPPORT_CENTER_FULL_ACCESS`<sup>Required</sup> <a name="ELEMENTAL_SUPPORT_CENTER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ELEMENTAL_SUPPORT_CENTER_FULL_ACCESS"></a>

```typescript
public readonly ELEMENTAL_SUPPORT_CENTER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `GAME_LIFT_CONTAINER_FLEET_POLICY`<sup>Required</sup> <a name="GAME_LIFT_CONTAINER_FLEET_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.GAME_LIFT_CONTAINER_FLEET_POLICY"></a>

```typescript
public readonly GAME_LIFT_CONTAINER_FLEET_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `GAME_LIFT_GAME_SERVER_GROUP_POLICY`<sup>Required</sup> <a name="GAME_LIFT_GAME_SERVER_GROUP_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.GAME_LIFT_GAME_SERVER_GROUP_POLICY"></a>

```typescript
public readonly GAME_LIFT_GAME_SERVER_GROUP_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `GLOBAL_ACCELERATOR_FULL_ACCESS`<sup>Required</sup> <a name="GLOBAL_ACCELERATOR_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.GLOBAL_ACCELERATOR_FULL_ACCESS"></a>

```typescript
public readonly GLOBAL_ACCELERATOR_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `GLOBAL_ACCELERATOR_READ_ONLY_ACCESS`<sup>Required</sup> <a name="GLOBAL_ACCELERATOR_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.GLOBAL_ACCELERATOR_READ_ONLY_ACCESS"></a>

```typescript
public readonly GLOBAL_ACCELERATOR_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `GROUND_TRUTH_SYNTHETIC_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="GROUND_TRUTH_SYNTHETIC_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.GROUND_TRUTH_SYNTHETIC_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly GROUND_TRUTH_SYNTHETIC_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `GROUND_TRUTH_SYNTHETIC_CONSOLE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="GROUND_TRUTH_SYNTHETIC_CONSOLE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.GROUND_TRUTH_SYNTHETIC_CONSOLE_READ_ONLY_ACCESS"></a>

```typescript
public readonly GROUND_TRUTH_SYNTHETIC_CONSOLE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `IAM_ACCESS_ADVISOR_READ_ONLY`<sup>Required</sup> <a name="IAM_ACCESS_ADVISOR_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_ACCESS_ADVISOR_READ_ONLY"></a>

```typescript
public readonly IAM_ACCESS_ADVISOR_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `IAM_ACCESS_ANALYZER_FULL_ACCESS`<sup>Required</sup> <a name="IAM_ACCESS_ANALYZER_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_ACCESS_ANALYZER_FULL_ACCESS"></a>

```typescript
public readonly IAM_ACCESS_ANALYZER_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `IAM_ACCESS_ANALYZER_READ_ONLY_ACCESS`<sup>Required</sup> <a name="IAM_ACCESS_ANALYZER_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_ACCESS_ANALYZER_READ_ONLY_ACCESS"></a>

```typescript
public readonly IAM_ACCESS_ANALYZER_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `IAM_FULL_ACCESS`<sup>Required</sup> <a name="IAM_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_FULL_ACCESS"></a>

```typescript
public readonly IAM_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `IAM_READ_ONLY_ACCESS`<sup>Required</sup> <a name="IAM_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_READ_ONLY_ACCESS"></a>

```typescript
public readonly IAM_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `IAM_SELF_MANAGE_SERVICE_SPECIFIC_CREDENTIALS`<sup>Required</sup> <a name="IAM_SELF_MANAGE_SERVICE_SPECIFIC_CREDENTIALS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_SELF_MANAGE_SERVICE_SPECIFIC_CREDENTIALS"></a>

```typescript
public readonly IAM_SELF_MANAGE_SERVICE_SPECIFIC_CREDENTIALS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `IAM_USER_CHANGE_PASSWORD`<sup>Required</sup> <a name="IAM_USER_CHANGE_PASSWORD" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_USER_CHANGE_PASSWORD"></a>

```typescript
public readonly IAM_USER_CHANGE_PASSWORD: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `IAM_USER_SSH_KEYS`<sup>Required</sup> <a name="IAM_USER_SSH_KEYS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IAM_USER_SSH_KEYS"></a>

```typescript
public readonly IAM_USER_SSH_KEYS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `IVS_FULL_ACCESS`<sup>Required</sup> <a name="IVS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IVS_FULL_ACCESS"></a>

```typescript
public readonly IVS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `IVS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="IVS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.IVS_READ_ONLY_ACCESS"></a>

```typescript
public readonly IVS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `MEDIA_CONNECT_GATEWAY_INSTANCE_ROLE_POLICY`<sup>Required</sup> <a name="MEDIA_CONNECT_GATEWAY_INSTANCE_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.MEDIA_CONNECT_GATEWAY_INSTANCE_ROLE_POLICY"></a>

```typescript
public readonly MEDIA_CONNECT_GATEWAY_INSTANCE_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `NEPTUNE_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="NEPTUNE_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.NEPTUNE_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly NEPTUNE_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `NEPTUNE_FULL_ACCESS`<sup>Required</sup> <a name="NEPTUNE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.NEPTUNE_FULL_ACCESS"></a>

```typescript
public readonly NEPTUNE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `NEPTUNE_GRAPH_READ_ONLY_ACCESS`<sup>Required</sup> <a name="NEPTUNE_GRAPH_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.NEPTUNE_GRAPH_READ_ONLY_ACCESS"></a>

```typescript
public readonly NEPTUNE_GRAPH_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `NEPTUNE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="NEPTUNE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.NEPTUNE_READ_ONLY_ACCESS"></a>

```typescript
public readonly NEPTUNE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `OAM_FULL_ACCESS`<sup>Required</sup> <a name="OAM_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.OAM_FULL_ACCESS"></a>

```typescript
public readonly OAM_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `OAM_READ_ONLY_ACCESS`<sup>Required</sup> <a name="OAM_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.OAM_READ_ONLY_ACCESS"></a>

```typescript
public readonly OAM_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `PARTNER_CENTRAL_ACCOUNT_MANAGEMENT_USER_ROLE_ASSOCIATION`<sup>Required</sup> <a name="PARTNER_CENTRAL_ACCOUNT_MANAGEMENT_USER_ROLE_ASSOCIATION" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.PARTNER_CENTRAL_ACCOUNT_MANAGEMENT_USER_ROLE_ASSOCIATION"></a>

```typescript
public readonly PARTNER_CENTRAL_ACCOUNT_MANAGEMENT_USER_ROLE_ASSOCIATION: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `POWER_USER_ACCESS`<sup>Required</sup> <a name="POWER_USER_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.POWER_USER_ACCESS"></a>

```typescript
public readonly POWER_USER_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `Q_BUSINESS_QUICKSIGHT_PLUGIN_POLICY`<sup>Required</sup> <a name="Q_BUSINESS_QUICKSIGHT_PLUGIN_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.Q_BUSINESS_QUICKSIGHT_PLUGIN_POLICY"></a>

```typescript
public readonly Q_BUSINESS_QUICKSIGHT_PLUGIN_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `READ_ONLY_ACCESS`<sup>Required</sup> <a name="READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.READ_ONLY_ACCESS"></a>

```typescript
public readonly READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `RESOURCE_GROUPS_AND_TAG_EDITOR_FULL_ACCESS`<sup>Required</sup> <a name="RESOURCE_GROUPS_AND_TAG_EDITOR_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.RESOURCE_GROUPS_AND_TAG_EDITOR_FULL_ACCESS"></a>

```typescript
public readonly RESOURCE_GROUPS_AND_TAG_EDITOR_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `RESOURCE_GROUPS_AND_TAG_EDITOR_READ_ONLY_ACCESS`<sup>Required</sup> <a name="RESOURCE_GROUPS_AND_TAG_EDITOR_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.RESOURCE_GROUPS_AND_TAG_EDITOR_READ_ONLY_ACCESS"></a>

```typescript
public readonly RESOURCE_GROUPS_AND_TAG_EDITOR_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `RESOURCE_GROUPS_TAGGING_API_TAG_UNTAG_SUPPORTED_RESOURCES`<sup>Required</sup> <a name="RESOURCE_GROUPS_TAGGING_API_TAG_UNTAG_SUPPORTED_RESOURCES" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.RESOURCE_GROUPS_TAGGING_API_TAG_UNTAG_SUPPORTED_RESOURCES"></a>

```typescript
public readonly RESOURCE_GROUPS_TAGGING_API_TAG_UNTAG_SUPPORTED_RESOURCES: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `ROSA_MANAGE_SUBSCRIPTION`<sup>Required</sup> <a name="ROSA_MANAGE_SUBSCRIPTION" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.ROSA_MANAGE_SUBSCRIPTION"></a>

```typescript
public readonly ROSA_MANAGE_SUBSCRIPTION: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `SAGE_MAKER_STUDIO_FULL_ACCESS`<sup>Required</sup> <a name="SAGE_MAKER_STUDIO_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SAGE_MAKER_STUDIO_FULL_ACCESS"></a>

```typescript
public readonly SAGE_MAKER_STUDIO_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `SAGE_MAKER_STUDIO_PROJECT_ROLE_MACHINE_LEARNING_POLICY`<sup>Required</sup> <a name="SAGE_MAKER_STUDIO_PROJECT_ROLE_MACHINE_LEARNING_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SAGE_MAKER_STUDIO_PROJECT_ROLE_MACHINE_LEARNING_POLICY"></a>

```typescript
public readonly SAGE_MAKER_STUDIO_PROJECT_ROLE_MACHINE_LEARNING_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_PERMISSIONS_BOUNDARY`<sup>Required</sup> <a name="SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_PERMISSIONS_BOUNDARY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_PERMISSIONS_BOUNDARY"></a>

```typescript
public readonly SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_PERMISSIONS_BOUNDARY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_POLICY`<sup>Required</sup> <a name="SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_POLICY"></a>

```typescript
public readonly SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `SECRETS_MANAGER_READ_WRITE`<sup>Required</sup> <a name="SECRETS_MANAGER_READ_WRITE" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SECRETS_MANAGER_READ_WRITE"></a>

```typescript
public readonly SECRETS_MANAGER_READ_WRITE: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `SECURITY_AUDIT`<sup>Required</sup> <a name="SECURITY_AUDIT" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SECURITY_AUDIT"></a>

```typescript
public readonly SECURITY_AUDIT: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `SERVER_MIGRATION_CONNECTOR`<sup>Required</sup> <a name="SERVER_MIGRATION_CONNECTOR" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SERVER_MIGRATION_CONNECTOR"></a>

```typescript
public readonly SERVER_MIGRATION_CONNECTOR: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `SERVER_MIGRATION_SERVICE_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="SERVER_MIGRATION_SERVICE_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SERVER_MIGRATION_SERVICE_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly SERVER_MIGRATION_SERVICE_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `SERVICE_QUOTAS_FULL_ACCESS`<sup>Required</sup> <a name="SERVICE_QUOTAS_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SERVICE_QUOTAS_FULL_ACCESS"></a>

```typescript
public readonly SERVICE_QUOTAS_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `SERVICE_QUOTAS_READ_ONLY_ACCESS`<sup>Required</sup> <a name="SERVICE_QUOTAS_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SERVICE_QUOTAS_READ_ONLY_ACCESS"></a>

```typescript
public readonly SERVICE_QUOTAS_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `SIMPLE_WORKFLOW_FULL_ACCESS`<sup>Required</sup> <a name="SIMPLE_WORKFLOW_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.SIMPLE_WORKFLOW_FULL_ACCESS"></a>

```typescript
public readonly SIMPLE_WORKFLOW_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `TRANSLATE_FULL_ACCESS`<sup>Required</sup> <a name="TRANSLATE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.TRANSLATE_FULL_ACCESS"></a>

```typescript
public readonly TRANSLATE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `TRANSLATE_READ_ONLY`<sup>Required</sup> <a name="TRANSLATE_READ_ONLY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.TRANSLATE_READ_ONLY"></a>

```typescript
public readonly TRANSLATE_READ_ONLY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `VPC_LATTICE_FULL_ACCESS`<sup>Required</sup> <a name="VPC_LATTICE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.VPC_LATTICE_FULL_ACCESS"></a>

```typescript
public readonly VPC_LATTICE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `VPC_LATTICE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="VPC_LATTICE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.VPC_LATTICE_READ_ONLY_ACCESS"></a>

```typescript
public readonly VPC_LATTICE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `VPC_LATTICE_SERVICES_INVOKE_ACCESS`<sup>Required</sup> <a name="VPC_LATTICE_SERVICES_INVOKE_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.VPC_LATTICE_SERVICES_INVOKE_ACCESS"></a>

```typescript
public readonly VPC_LATTICE_SERVICES_INVOKE_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `WELL_ARCHITECTED_CONSOLE_FULL_ACCESS`<sup>Required</sup> <a name="WELL_ARCHITECTED_CONSOLE_FULL_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.WELL_ARCHITECTED_CONSOLE_FULL_ACCESS"></a>

```typescript
public readonly WELL_ARCHITECTED_CONSOLE_FULL_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `WELL_ARCHITECTED_CONSOLE_READ_ONLY_ACCESS`<sup>Required</sup> <a name="WELL_ARCHITECTED_CONSOLE_READ_ONLY_ACCESS" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.WELL_ARCHITECTED_CONSOLE_READ_ONLY_ACCESS"></a>

```typescript
public readonly WELL_ARCHITECTED_CONSOLE_READ_ONLY_ACCESS: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

##### `WORK_LINK_SERVICE_ROLE_POLICY`<sup>Required</sup> <a name="WORK_LINK_SERVICE_ROLE_POLICY" id="@cdklabs/cdk-proserve-lib.types.AwsManagedPolicy.property.WORK_LINK_SERVICE_ROLE_POLICY"></a>

```typescript
public readonly WORK_LINK_SERVICE_ROLE_POLICY: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

---

### CreateLambdaLogGroup <a name="CreateLambdaLogGroup" id="@cdklabs/cdk-proserve-lib.aspects.CreateLambdaLogGroup"></a>

- *Implements:* aws-cdk-lib.IAspect

Ensures that Lambda log groups are created for all Lambda functions that the aspect applies to.

*Example*

```typescript
import { App, Aspects } from 'aws-cdk-lib';
import { CreateLambdaLogGroup } from '@cdklabs/cdk-proserve-lib/aspects';

const app = new App();

Aspects.of(app).add(new CreateLambdaLogGroup());
```


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

Aspect that sets the log retention period for CloudWatch log groups to a user-supplied retention period.

*Example*

```typescript
import { App, Aspects } from 'aws-cdk-lib';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { SetLogRetention } from '@cdklabs/cdk-proserve-lib/aspects';

const app = new App();

Aspects.of(app).add(
  new SetLogRetention({ period: RetentionDays.EIGHTEEN_MONTHS })
);
```


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

Enforces SSL/TLS requirements on Simple Queue Service (SQS) for all resources that the aspect applies to.

This is accomplished by adding a resource policy to any SQS queue that denies
all actions when the request is not made over a secure transport.

*Example*

```typescript
import { App, Aspects } from 'aws-cdk-lib';
import { SqsRequireSsl } from '@cdklabs/cdk-proserve-lib/aspects';

const app = new App();

Aspects.of(app).add(new SqsRequireSsl());
```


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
| <code><a href="#@cdklabs/cdk-proserve-lib.constructs.Ec2ImagePipeline.Component.EKS_OPTIMIZED_AMI_WINDOWS">EKS_OPTIMIZED_AMI_WINDOWS</a></code> | Installs Amazon EKS-optimized Windows artifacts for Amazon EKS version 1.30. This includes kubelet version 1.30.8, containerd version 1.7.14, and CSI Proxy version 1.1.2. |
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

Installs Amazon EKS-optimized Windows artifacts for Amazon EKS version 1.30. This includes kubelet version 1.30.8, containerd version 1.7.14, and CSI Proxy version 1.1.2.

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

