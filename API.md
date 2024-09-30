# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### OpensearchAdminUser <a name="OpensearchAdminUser" id="@cdklabs/proserve-constructs.OpensearchAdminUser"></a>

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


#### Initializers <a name="Initializers" id="@cdklabs/proserve-constructs.OpensearchAdminUser.Initializer"></a>

```typescript
import { OpensearchAdminUser } from '@cdklabs/proserve-constructs'

new OpensearchAdminUser(scope: Construct, id: string, props: OpensearchAdminUserProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/proserve-constructs.OpensearchAdminUser.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cdklabs/proserve-constructs.OpensearchAdminUser.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cdklabs/proserve-constructs.OpensearchAdminUser.Initializer.parameter.props">props</a></code> | <code><a href="#@cdklabs/proserve-constructs.OpensearchAdminUserProps">OpensearchAdminUserProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/proserve-constructs.OpensearchAdminUser.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/proserve-constructs.OpensearchAdminUser.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/proserve-constructs.OpensearchAdminUser.Initializer.parameter.props"></a>

- *Type:* <a href="#@cdklabs/proserve-constructs.OpensearchAdminUserProps">OpensearchAdminUserProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/proserve-constructs.OpensearchAdminUser.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/proserve-constructs.OpensearchAdminUser.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/proserve-constructs.OpensearchAdminUser.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/proserve-constructs.OpensearchAdminUser.isConstruct"></a>

```typescript
import { OpensearchAdminUser } from '@cdklabs/proserve-constructs'

OpensearchAdminUser.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/proserve-constructs.OpensearchAdminUser.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/proserve-constructs.OpensearchAdminUser.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/proserve-constructs.OpensearchAdminUser.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### OpensearchAdminUserProps <a name="OpensearchAdminUserProps" id="@cdklabs/proserve-constructs.OpensearchAdminUserProps"></a>

Properties for the OpensearchAdminUser construct.

#### Initializer <a name="Initializer" id="@cdklabs/proserve-constructs.OpensearchAdminUserProps.Initializer"></a>

```typescript
import { OpensearchAdminUserProps } from '@cdklabs/proserve-constructs'

const opensearchAdminUserProps: OpensearchAdminUserProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/proserve-constructs.OpensearchAdminUserProps.property.domain">domain</a></code> | <code>aws-cdk-lib.aws_opensearchservice.IDomain</code> | The Opensearch domain to which the admin user will be added. |
| <code><a href="#@cdklabs/proserve-constructs.OpensearchAdminUserProps.property.password">password</a></code> | <code>aws-cdk-lib.aws_ssm.IParameter</code> | The SSM parameter containing the password for the Opensearch admin user. |
| <code><a href="#@cdklabs/proserve-constructs.OpensearchAdminUserProps.property.username">username</a></code> | <code>aws-cdk-lib.aws_ssm.IParameter</code> | The SSM parameter containing the username for the Opensearch admin user. |
| <code><a href="#@cdklabs/proserve-constructs.OpensearchAdminUserProps.property.domainKey">domainKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional. |
| <code><a href="#@cdklabs/proserve-constructs.OpensearchAdminUserProps.property.workerEncryption">workerEncryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | Optional. |

---

##### `domain`<sup>Required</sup> <a name="domain" id="@cdklabs/proserve-constructs.OpensearchAdminUserProps.property.domain"></a>

```typescript
public readonly domain: IDomain;
```

- *Type:* aws-cdk-lib.aws_opensearchservice.IDomain

The Opensearch domain to which the admin user will be added.

---

##### `password`<sup>Required</sup> <a name="password" id="@cdklabs/proserve-constructs.OpensearchAdminUserProps.property.password"></a>

```typescript
public readonly password: IParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IParameter

The SSM parameter containing the password for the Opensearch admin user.

---

##### `username`<sup>Required</sup> <a name="username" id="@cdklabs/proserve-constructs.OpensearchAdminUserProps.property.username"></a>

```typescript
public readonly username: IParameter;
```

- *Type:* aws-cdk-lib.aws_ssm.IParameter

The SSM parameter containing the username for the Opensearch admin user.

---

##### `domainKey`<sup>Optional</sup> <a name="domainKey" id="@cdklabs/proserve-constructs.OpensearchAdminUserProps.property.domainKey"></a>

```typescript
public readonly domainKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional.

The KMS key used to encrypt the Opensearch domain.
If provided, the construct will grant the necessary permissions to use this key.

---

##### `workerEncryption`<sup>Optional</sup> <a name="workerEncryption" id="@cdklabs/proserve-constructs.OpensearchAdminUserProps.property.workerEncryption"></a>

```typescript
public readonly workerEncryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

Optional.

The KMS key used to encrypt the worker resources (e.g., Lambda function environment variables).
If provided, this key will be used for encryption; otherwise, an AWS managed key will be used.

---



