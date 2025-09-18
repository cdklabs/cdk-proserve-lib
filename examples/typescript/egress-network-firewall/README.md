# Example: Egress Network Firewall

CDK example to create an [AWS Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html) for egress traffic filtering using TypeScript.
The example demonstrates setting up a multi-tier VPC with dedicated firewall subnets and automated route configuration for secure egress traffic inspection.

Once deployed, the infrastructure will have a segmented VPC with:

- **Public subnets**: Internet gateway access
- **Firewall subnets**: Network Firewall endpoints
- **Protected subnets**: Workloads with egress routed through firewall
- **Isolated subnets**: No internet access

The firewall uses Suricata rules to allow only specific egress traffic (AWS services, RedHat repositories) while blocking all other outbound connections:

```
# Allow Amazon services
pass tls $HOME_NET any -> $EXTERNAL_NET any (tls.sni; content:".amazonaws.com"; nocase; endswith; flow:to_server; sid:20240002;)

# Block disallowed ports
drop ip $HOME_NET any -> $EXTERNAL_NET ![443] (msg:"Disallowed Egress Port"; sid:20231671;)
```

## Build and Deploy

The `cdk.json` file tells the CDK Toolkit how to execute your app.

Before getting ready to deploy, ensure the dependencies are installed by executing the following:

```
$ npm install
```

### CDK Deploy

This example requires AWS account ID and region to be provided via CDK context. You can provide these in several ways:

**Option 1: Command line context**

```
$ npx cdk deploy --context account=123456789012 --context region=us-east-1
```

**Option 2: Set in cdk.json**

```json
{
 "context": {
  "account": "123456789012",
  "region": "us-east-1"
 }
}
```

## References

- [AWS Network Firewall Best Practices](https://aws.github.io/aws-security-services-best-practices/guides/network-firewall/)
