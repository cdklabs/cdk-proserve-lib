# Example: EC2 Linux STIG Image Pipeline

CDK example to create an [AWS EC2 Image Builder](https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html) pipeline for building STIG-compliant Linux AMIs using TypeScript.
The example demonstrates setting up an automated image pipeline that applies Security Technical Implementation Guides (STIGs) to Amazon Linux 2023, along with additional components like AWS CLI and Python.

Once deployed, the pipeline will automatically build a hardened AMI with:

- **STIG compliance**: Security hardening following DoD STIG requirements
- **AWS CLI**: Latest AWS Command Line Interface v2
- **SSM Agent**: Retained for systems management capabilities
- **Python 3**: Additional runtime for scripting and automation
- **100GB root volume**: Expanded storage for enterprise workloads

The pipeline uses AWS-managed components to apply STIG configurations:

```typescript
features: [
    Ec2LinuxImagePipeline.Feature.RETAIN_SSM_AGENT,
    Ec2LinuxImagePipeline.Feature.AWS_CLI,
    Ec2LinuxImagePipeline.Feature.STIG
],
extraComponents: [Ec2ImagePipeline.Component.PYTHON_3_LINUX]
```

Since `waitForCompletion` is enabled, the stack exports the resulting AMI ID for use in other resources or stacks.

## Build and Deploy

The `cdk.json` file tells the CDK Toolkit how to execute your app.

Before getting ready to deploy, ensure the dependencies are installed by executing the following:

```
$ npm install
```

### CDK Deploy

Using the default profile:

```
$ npx cdk deploy
```

With specific profile:

```
$ npx cdk deploy --profile test
```

## References

- [AWS EC2 Image Builder User Guide](https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html)
