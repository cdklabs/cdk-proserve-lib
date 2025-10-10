# AWS Partition Compatibility Matrix

This document tracks the compatibility of all constructs, aspects, and patterns in the CDK ProServe Library across different AWS partitions.

## AWS Partitions

- **Commercial** (`aws`): Standard AWS regions
- **GovCloud** (`aws-us-gov`): AWS GovCloud (US) regions
- **ISO** (`aws-iso`): AWS ISO regions
- **ISOB** (`aws-iso-b`): AWS ISO-B regions

## Compatibility Legend

- ✅ **Fully Compatible**: Works without modifications
- ⚠️ **Partially Compatible**: Works with limitations or requires configuration changes
- ❌ **Not Compatible**: Does not work in this partition
- 🔍 **Needs Testing**: Compatibility unknown, requires validation

---

## Aspects

| Aspect                    | Commercial | GovCloud | ISO | ISOB | Notes                                                                                                                 |
| ------------------------- | ---------- | -------- | --- | ---- | --------------------------------------------------------------------------------------------------------------------- |
| apply-removal-policy      | 🔍         | 🔍       | 🔍  | 🔍   | Needs compatibility assessment                                                                                        |
| create-lambda-log-group   | 🔍         | 🔍       | 🔍  | 🔍   | Needs compatibility assessment                                                                                        |
| ec2-automated-shutdown    | ✅         | ✅       | ❌  | ❌   | EC2 automated shutdown relies on EventBridge and Systems Manager, which may not be available in ISO/ISO-B partitions. |
| rds-oracle-multi-tenant   | ✅         | ✅       | 🔍  | 🔍   |                                                                                                                       |
| secure-sagemaker-notebook | 🔍         | 🔍       | 🔍  | 🔍   | Needs compatibility assessment                                                                                        |
| security-compliance       | ✅         | 🔍       | 🔍  | 🔍   | Some compliance rules may vary in ISO/ISO-B partitions due to service availability differences.                       |
| set-log-retention         | ✅         | ✅       | ✅  | ✅   | CloudWatch Logs retention settings are available consistently across all AWS partitions.                              |
| sqs-require-ssl           | 🔍         | 🔍       | 🔍  | 🔍   | Needs compatibility assessment                                                                                        |

---

## Constructs

| Construct                   | Commercial | GovCloud | ISO | ISOB | Notes                                                                               |
| --------------------------- | ---------- | -------- | --- | ---- | ----------------------------------------------------------------------------------- |
| dynamodb-provision-table    | 🔍         | 🔍       | 🔍  | 🔍   | Needs compatibility assessment                                                      |
| ec2-image-builder-get-image | 🔍         | 🔍       | 🔍  | 🔍   | Needs compatibility assessment                                                      |
| ec2-image-builder-start     | 🔍         | 🔍       | 🔍  | 🔍   | Needs compatibility assessment                                                      |
| ec2-image-pipeline          | 🔍         | 🔍       | 🔍  | 🔍   | Needs compatibility assessment                                                      |
| friendly-embrace            | 🔍         | 🔍       | 🔍  | 🔍   | Needs compatibility assessment                                                      |
| iam-server-certificate      | 🔍         | 🔍       | 🔍  | 🔍   | Needs compatibility assessment                                                      |
| network-firewall            | ✅         | ✅       | 🔍  | 🔍   |                                                                                     |
| network-firewall-endpoints  | 🔍         | 🔍       | 🔍  | 🔍   | Needs compatibility assessment                                                      |
| opensearch-admin-user       | ✅         | ✅       | 🔍  | 🔍   |                                                                                     |
| opensearch-provision-domain | ✅         | ✅       | 🔍  | 🔍   |                                                                                     |
| opensearch-workflow         | ✅         | ✅       | 🔍  | 🔍   |                                                                                     |
| secure-function             | ✅         | ✅       | ✅  | ✅   | Lambda functions are available in all AWS partitions with consistent functionality. |
| web-application-firewall    | ✅         | ✅       | ⚠️  | ⚠️   |                                                                                     |

---

## Patterns

| Pattern                   | Commercial | GovCloud | ISO | ISOB | Notes                                                                                                                       |
| ------------------------- | ---------- | -------- | --- | ---- | --------------------------------------------------------------------------------------------------------------------------- |
| apigateway-static-hosting | ✅         | ✅       | ⚠️  | ⚠️   | API Gateway and S3 static hosting work in all partitions. Some API Gateway features may be limited in ISO/ISO-B partitions. |
| ec2-linux-image-pipeline  | ✅         | ✅       | 🔍  | 🔍   |                                                                                                                             |
| keycloak-service          | ✅         | 🔍       | 🔍  | 🔍   |                                                                                                                             |
