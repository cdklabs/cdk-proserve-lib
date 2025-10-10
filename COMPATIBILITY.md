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

| Aspect                    | Commercial | GovCloud | ISO | ISOB | Notes                                                                                     |
| ------------------------- | ---------- | -------- | --- | ---- | ----------------------------------------------------------------------------------------- |
| apply-removal-policy      | ✅         | ✅       | ✅  | ✅   |                                                                                           |
| create-lambda-log-group   | ✅         | ✅       | ✅  | ✅   |                                                                                           |
| ec2-automated-shutdown    | ✅         | ✅       | 🔍  | 🔍   |                                                                                           |
| rds-oracle-multi-tenant   | ✅         | ✅       | 🔍  | 🔍   |                                                                                           |
| secure-sagemaker-notebook | ✅         | ✅       | 🔍  | 🔍   |                                                                                           |
| security-compliance       | ✅         | 🔍       | 🔍  | 🔍   | Some compliance rules may vary across partitions due to service availability differences. |
| set-log-retention         | ✅         | ✅       | ✅  | ✅   |                                                                                           |
| sqs-require-ssl           | ✅         | ✅       | ✅  | ✅   |                                                                                           |

---

## Constructs

| Construct                   | Commercial | GovCloud | ISO | ISOB | Notes |
| --------------------------- | ---------- | -------- | --- | ---- | ----- |
| dynamodb-provision-table    | ✅         | ✅       | 🔍  | 🔍   |       |
| ec2-image-builder-get-image | ✅         | ✅       | 🔍  | 🔍   |       |
| ec2-image-builder-start     | ✅         | ✅       | 🔍  | 🔍   |       |
| ec2-image-pipeline          | ✅         | ✅       | 🔍  | 🔍   |       |
| friendly-embrace            | ✅         | ✅       | ✅  | ✅   |       |
| iam-server-certificate      | ✅         | ✅       | ✅  | ✅   |       |
| network-firewall            | ✅         | ✅       | 🔍  | 🔍   |       |
| network-firewall-endpoints  | ✅         | ✅       | 🔍  | 🔍   |       |
| opensearch-admin-user       | ✅         | ✅       | 🔍  | 🔍   |       |
| opensearch-provision-domain | ✅         | ✅       | 🔍  | 🔍   |       |
| opensearch-workflow         | ✅         | ✅       | 🔍  | 🔍   |       |
| secure-function             | ✅         | ✅       | 🔍  | 🔍   |       |
| web-application-firewall    | ✅         | ✅       | 🔍  | 🔍   |       |

---

## Patterns

| Pattern                   | Commercial | GovCloud | ISO | ISOB | Notes |
| ------------------------- | ---------- | -------- | --- | ---- | ----- |
| apigateway-static-hosting | ✅         | ✅       | 🔍  | 🔍   |       |
| ec2-linux-image-pipeline  | ✅         | ✅       | 🔍  | 🔍   |       |
| keycloak-service          | ✅         | 🔍       | 🔍  | 🔍   |       |
