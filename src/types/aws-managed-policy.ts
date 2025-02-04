// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';

/** AWS Managed Policy */
export class AwsManagedPolicy {
    public static readonly ADMINISTRATOR_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess');

    public static readonly POWER_USER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('PowerUserAccess');

    public static readonly READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess');

    public static readonly AWS_CLOUD_FORMATION_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCloudFormationReadOnlyAccess'
        );

    public static readonly CLOUD_FRONT_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('CloudFrontFullAccess');

    public static readonly AWS_CLOUD_HSM_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCloudHSMFullAccess');

    public static readonly AWS_CLOUD_HSM_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCloudHSMReadOnlyAccess');

    public static readonly RESOURCE_GROUPS_AND_TAG_EDITOR_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'ResourceGroupsandTagEditorFullAccess'
        );

    public static readonly RESOURCE_GROUPS_AND_TAG_EDITOR_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'ResourceGroupsandTagEditorReadOnlyAccess'
        );

    public static readonly CLOUD_FRONT_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('CloudFrontReadOnlyAccess');

    public static readonly CLOUD_SEARCH_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('CloudSearchFullAccess');

    public static readonly CLOUD_SEARCH_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('CloudSearchReadOnlyAccess');

    public static readonly CLOUD_WATCH_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('CloudWatchFullAccess');

    public static readonly CLOUD_WATCH_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('CloudWatchReadOnlyAccess');

    public static readonly CLOUD_WATCH_LOGS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess');

    public static readonly CLOUD_WATCH_LOGS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsReadOnlyAccess');

    public static readonly AWS_DIRECT_CONNECT_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSDirectConnectFullAccess');

    public static readonly AWS_DIRECT_CONNECT_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDirectConnectReadOnlyAccess'
        );

    public static readonly AMAZON_APP_STREAM_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonAppStreamFullAccess');

    public static readonly AMAZON_APP_STREAM_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonAppStreamReadOnlyAccess');

    public static readonly AMAZON_DYNAMO_DB_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess');

    public static readonly AMAZON_DYNAMO_DB_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBReadOnlyAccess');

    public static readonly AMAZON_DYNAMO_DB_FULL_ACCESSWITH_DATA_PIPELINE =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonDynamoDBFullAccesswithDataPipeline'
        );

    public static readonly AMAZON_EC2_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2FullAccess');

    public static readonly AMAZON_EC2_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ReadOnlyAccess');

    public static readonly AMAZON_ELASTI_CACHE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonElastiCacheFullAccess');

    public static readonly AMAZON_ELASTI_CACHE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElastiCacheReadOnlyAccess'
        );

    public static readonly AMAZON_ELASTIC_MAP_REDUCE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticMapReduceFullAccess'
        );

    public static readonly AMAZON_ELASTIC_MAP_REDUCE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticMapReduceReadOnlyAccess'
        );

    public static readonly AMAZON_GLACIER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonGlacierReadOnlyAccess');

    public static readonly AMAZON_GLACIER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonGlacierFullAccess');

    public static readonly AMAZON_KINESIS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonKinesisFullAccess');

    public static readonly AMAZON_KINESIS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonKinesisReadOnlyAccess');

    public static readonly AWS_MARKETPLACE_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSMarketplaceRead-only');

    public static readonly AWS_MARKETPLACE_MANAGE_SUBSCRIPTIONS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMarketplaceManageSubscriptions'
        );

    public static readonly AMAZON_MOBILE_ANALYTICS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonMobileAnalyticsFullAccess'
        );

    public static readonly AMAZON_MOBILE_ANALYTICS_FINANCIAL_REPORT_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonMobileAnalyticsFinancialReportAccess'
        );

    public static readonly AMAZON_MOBILE_ANALYTICS_NON_FINANCIAL_REPORT_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonMobileAnalyticsNon-financialReportAccess'
        );

    public static readonly AMAZON_MOBILE_ANALYTICS_WRITE_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonMobileAnalyticsWriteOnlyAccess'
        );

    public static readonly IAM_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('IAMFullAccess');

    public static readonly IAM_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('IAMReadOnlyAccess');

    public static readonly AWS_KEY_MANAGEMENT_SERVICE_POWER_USER =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSKeyManagementServicePowerUser'
        );

    public static readonly AMAZON_WORK_MAIL_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonWorkMailFullAccess');

    public static readonly AMAZON_WORK_MAIL_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonWorkMailReadOnlyAccess');

    public static readonly AWS_IMPORT_EXPORT_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSImportExportReadOnlyAccess');

    public static readonly AWS_IMPORT_EXPORT_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSImportExportFullAccess');

    public static readonly AWS_LAMBDA_EXECUTE =
        ManagedPolicy.fromAwsManagedPolicyName('AWSLambdaExecute');

    public static readonly AWS_LAMBDA_INVOCATION_DYNAMO_DB =
        ManagedPolicy.fromAwsManagedPolicyName('AWSLambdaInvocation-DynamoDB');

    public static readonly AMAZON_REDSHIFT_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonRedshiftFullAccess');

    public static readonly AMAZON_REDSHIFT_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonRedshiftReadOnlyAccess');

    public static readonly AMAZON_RDS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonRDSFullAccess');

    public static readonly AMAZON_RDS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonRDSReadOnlyAccess');

    public static readonly AMAZON_ROUTE53_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonRoute53FullAccess');

    public static readonly AMAZON_ROUTE53_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonRoute53ReadOnlyAccess');

    public static readonly AMAZON_ROUTE53_DOMAINS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53DomainsFullAccess'
        );

    public static readonly AMAZON_ROUTE53_DOMAINS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53DomainsReadOnlyAccess'
        );

    public static readonly AMAZON_S3_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess');

    public static readonly AMAZON_S3_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess');

    public static readonly SECURITY_AUDIT =
        ManagedPolicy.fromAwsManagedPolicyName('SecurityAudit');

    public static readonly AMAZON_SES_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonSESFullAccess');

    public static readonly AMAZON_SES_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonSESReadOnlyAccess');

    public static readonly SIMPLE_WORKFLOW_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('SimpleWorkflowFullAccess');

    public static readonly AMAZON_SNS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonSNSFullAccess');

    public static readonly AMAZON_SNS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonSNSReadOnlyAccess');

    public static readonly AMAZON_SQS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonSQSFullAccess');

    public static readonly AMAZON_SQS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonSQSReadOnlyAccess');

    public static readonly AWS_STORAGE_GATEWAY_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSStorageGatewayFullAccess');

    public static readonly AWS_STORAGE_GATEWAY_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSStorageGatewayReadOnlyAccess'
        );

    public static readonly AWS_SUPPORT_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSSupportAccess');

    public static readonly AWS_DIRECTORY_SERVICE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSDirectoryServiceFullAccess');

    public static readonly AWS_DIRECTORY_SERVICE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDirectoryServiceReadOnlyAccess'
        );

    public static readonly AMAZON_ZOCALO_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonZocaloFullAccess');

    public static readonly AMAZON_ZOCALO_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonZocaloReadOnlyAccess');

    public static readonly AMAZON_VPC_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonVPCFullAccess');

    public static readonly AMAZON_VPC_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonVPCReadOnlyAccess');

    public static readonly AWS_ACCOUNT_ACTIVITY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAccountActivityAccess');

    public static readonly AWS_ACCOUNT_USAGE_REPORT_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAccountUsageReportAccess');

    public static readonly AWS_CONNECTOR =
        ManagedPolicy.fromAwsManagedPolicyName('AWSConnector');

    public static readonly AWS_MARKETPLACE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSMarketplaceFullAccess');

    public static readonly AWS_CONFIG_USER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSConfigUserAccess');

    public static readonly AMAZON_COGNITO_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonCognitoReadOnly');

    public static readonly AMAZON_COGNITO_POWER_USER =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonCognitoPowerUser');

    public static readonly AMAZON_COGNITO_DEVELOPER_AUTHENTICATED_IDENTITIES =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCognitoDeveloperAuthenticatedIdentities'
        );

    public static readonly AMAZON_WORK_SPACES_APPLICATION_MANAGER_ADMIN_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonWorkSpacesApplicationManagerAdminAccess'
        );

    public static readonly AMAZON_MACHINE_LEARNING_BATCH_PREDICTIONS_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonMachineLearningBatchPredictionsAccess'
        );

    public static readonly AMAZON_MACHINE_LEARNING_CREATE_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonMachineLearningCreateOnlyAccess'
        );

    public static readonly AMAZON_MACHINE_LEARNING_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonMachineLearningFullAccess'
        );

    public static readonly AMAZON_MACHINE_LEARNING_MANAGE_REAL_TIME_ENDPOINT_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonMachineLearningManageRealTimeEndpointOnlyAccess'
        );

    public static readonly AMAZON_MACHINE_LEARNING_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonMachineLearningReadOnlyAccess'
        );

    public static readonly AMAZON_MACHINE_LEARNING_REAL_TIME_PREDICTION_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonMachineLearningRealTimePredictionOnlyAccess'
        );

    public static readonly AWS_CODE_DEPLOY_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeDeployFullAccess');

    public static readonly AWS_CODE_DEPLOY_DEPLOYER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeDeployDeployerAccess');

    public static readonly AWS_CODE_DEPLOY_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeDeployReadOnlyAccess');

    public static readonly AMAZON_ELASTIC_FILE_SYSTEM_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticFileSystemFullAccess'
        );

    public static readonly AMAZON_ELASTIC_FILE_SYSTEM_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticFileSystemReadOnlyAccess'
        );

    public static readonly AMAZON_SSM_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMFullAccess');

    public static readonly AMAZON_SSM_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMReadOnlyAccess');

    public static readonly CLOUD_WATCH_ACTIONS_EC2_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('CloudWatchActionsEC2Access');

    public static readonly AWS_CODE_PIPELINE_CUSTOM_ACTION_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCodePipelineCustomActionAccess'
        );

    public static readonly AWS_CODE_COMMIT_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeCommitFullAccess');

    public static readonly AWS_CODE_COMMIT_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeCommitReadOnly');

    public static readonly AWS_CODE_COMMIT_POWER_USER =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeCommitPowerUser');

    public static readonly IAM_USER_SSH_KEYS =
        ManagedPolicy.fromAwsManagedPolicyName('IAMUserSSHKeys');

    public static readonly AMAZON_API_GATEWAY_ADMINISTRATOR =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonAPIGatewayAdministrator');

    public static readonly AMAZON_API_GATEWAY_INVOKE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonAPIGatewayInvokeFullAccess'
        );

    public static readonly AWS_DEVICE_FARM_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSDeviceFarmFullAccess');

    public static readonly AMAZON_DRSVPC_MANAGEMENT =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonDRSVPCManagement');

    public static readonly AMAZON_WORK_SPACES_ADMIN =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonWorkSpacesAdmin');

    public static readonly AMAZON_ES_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonESFullAccess');

    public static readonly AMAZON_ES_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonESReadOnlyAccess');

    public static readonly AWS_WAF_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSWAFReadOnlyAccess');

    public static readonly AWS_WAF_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSWAFFullAccess');

    public static readonly AMAZON_INSPECTOR_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonInspectorReadOnlyAccess');

    public static readonly AMAZON_INSPECTOR_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonInspectorFullAccess');

    public static readonly AMAZON_KINESIS_FIREHOSE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonKinesisFirehoseReadOnlyAccess'
        );

    public static readonly AMAZON_KINESIS_FIREHOSE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonKinesisFirehoseFullAccess'
        );

    public static readonly AWS_IO_T_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTFullAccess');

    public static readonly AWS_IO_T_DATA_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTDataAccess');

    public static readonly AWS_IO_T_CONFIG_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTConfigAccess');

    public static readonly AWS_IO_T_CONFIG_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTConfigReadOnlyAccess');

    public static readonly AMAZON_MECHANICAL_TURK_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonMechanicalTurkFullAccess'
        );

    public static readonly AMAZON_MECHANICAL_TURK_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMechanicalTurkReadOnly');

    public static readonly AMAZON_EC2_CONTAINER_REGISTRY_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEC2ContainerRegistryReadOnly'
        );

    public static readonly AMAZON_EC2_CONTAINER_REGISTRY_POWER_USER =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEC2ContainerRegistryPowerUser'
        );

    public static readonly AMAZON_EC2_CONTAINER_REGISTRY_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEC2ContainerRegistryFullAccess'
        );

    public static readonly CLOUD_WATCH_EVENTS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchEventsReadOnlyAccess'
        );

    public static readonly CLOUD_WATCH_EVENTS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('CloudWatchEventsFullAccess');

    public static readonly AWS_CERTIFICATE_MANAGER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCertificateManagerFullAccess'
        );

    public static readonly AWS_CERTIFICATE_MANAGER_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCertificateManagerReadOnly');

    public static readonly AWS_ELASTIC_BEANSTALK_WEB_TIER =
        ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier');

    public static readonly AWS_ELASTIC_BEANSTALK_WORKER_TIER =
        ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWorkerTier');

    public static readonly AWS_ELASTIC_BEANSTALK_MULTICONTAINER_DOCKER =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElasticBeanstalkMulticontainerDocker'
        );

    public static readonly AWS_MARKETPLACE_METERING_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMarketplaceMeteringFullAccess'
        );

    public static readonly AWS_APPLICATION_DISCOVERY_SERVICE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSApplicationDiscoveryServiceFullAccess'
        );

    public static readonly AWS_APPLICATION_DISCOVERY_AGENT_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSApplicationDiscoveryAgentAccess'
        );

    public static readonly AWS_OPS_WORKS_INSTANCE_REGISTRATION =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSOpsWorksInstanceRegistration'
        );

    public static readonly AWS_CODE_PIPELINE_APPROVER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodePipelineApproverAccess');

    public static readonly AWS_AGENTLESS_DISCOVERY_SERVICE =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAgentlessDiscoveryService');

    public static readonly AMAZON_KINESIS_ANALYTICS_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonKinesisAnalyticsReadOnly'
        );

    public static readonly AMAZON_KINESIS_ANALYTICS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonKinesisAnalyticsFullAccess'
        );

    public static readonly SERVER_MIGRATION_CONNECTOR =
        ManagedPolicy.fromAwsManagedPolicyName('ServerMigrationConnector');

    public static readonly IAM_USER_CHANGE_PASSWORD =
        ManagedPolicy.fromAwsManagedPolicyName('IAMUserChangePassword');

    public static readonly AWS_OPS_WORKS_CM_INSTANCE_PROFILE_ROLE =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSOpsWorksCMInstanceProfileRole'
        );

    public static readonly AMAZON_REKOGNITION_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonRekognitionFullAccess');

    public static readonly AMAZON_REKOGNITION_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRekognitionReadOnlyAccess'
        );

    public static readonly AMAZON_ATHENA_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonAthenaFullAccess');

    public static readonly AMAZON_POLLY_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonPollyFullAccess');

    public static readonly AMAZON_POLLY_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonPollyReadOnlyAccess');

    public static readonly AWS_XRAY_WRITE_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSXrayWriteOnlyAccess');

    public static readonly AWS_XRAY_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSXrayReadOnlyAccess');

    public static readonly AWS_XRAY_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSXrayFullAccess');

    public static readonly AWS_CODE_BUILD_DEVELOPER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeBuildDeveloperAccess');

    public static readonly AWS_CODE_BUILD_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeBuildReadOnlyAccess');

    public static readonly AWS_CODE_BUILD_ADMIN_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeBuildAdminAccess');

    public static readonly AWS_HEALTH_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSHealthFullAccess');

    public static readonly AWS_BATCH_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSBatchFullAccess');

    public static readonly IAM_SELF_MANAGE_SERVICE_SPECIFIC_CREDENTIALS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'IAMSelfManageServiceSpecificCredentials'
        );

    public static readonly AWS_STEP_FUNCTIONS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSStepFunctionsReadOnlyAccess'
        );

    public static readonly AWS_STEP_FUNCTIONS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSStepFunctionsFullAccess');

    public static readonly AWS_STEP_FUNCTIONS_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSStepFunctionsConsoleFullAccess'
        );

    public static readonly AUTO_SCALING_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AutoScalingFullAccess');

    public static readonly AUTO_SCALING_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AutoScalingReadOnlyAccess');

    public static readonly AUTO_SCALING_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AutoScalingConsoleFullAccess');

    public static readonly AUTO_SCALING_CONSOLE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AutoScalingConsoleReadOnlyAccess'
        );

    public static readonly AWS_DATA_PIPELINE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSDataPipeline_FullAccess');

    public static readonly AWS_DATA_PIPELINE_POWER_USER =
        ManagedPolicy.fromAwsManagedPolicyName('AWSDataPipeline_PowerUser');

    public static readonly AWS_ELASTIC_BEANSTALK_CUSTOM_PLATFORMFOR_EC2_ROLE =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElasticBeanstalkCustomPlatformforEC2Role'
        );

    public static readonly AMAZON_CLOUD_DIRECTORY_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCloudDirectoryFullAccess'
        );

    public static readonly AMAZON_CLOUD_DIRECTORY_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCloudDirectoryReadOnlyAccess'
        );

    public static readonly AWS_MARKETPLACE_GET_ENTITLEMENTS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSMarketplaceGetEntitlements');

    public static readonly AWS_OPS_WORKS_CLOUD_WATCH_LOGS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSOpsWorksCloudWatchLogs');

    public static readonly AMAZON_LEX_RUN_BOTS_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonLexRunBotsOnly');

    public static readonly AMAZON_LEX_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonLexReadOnly');

    public static readonly AMAZON_LEX_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonLexFullAccess');

    public static readonly AWS_CODE_STAR_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeStarFullAccess');

    public static readonly AWS_GREENGRASS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSGreengrassFullAccess');

    public static readonly AMAZON_VPC_CROSS_ACCOUNT_NETWORK_INTERFACE_OPERATIONS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonVPCCrossAccountNetworkInterfaceOperations'
        );

    public static readonly AMAZON_SSM_AUTOMATION_APPROVER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSSMAutomationApproverAccess'
        );

    public static readonly AWS_GLUE_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSGlueConsoleFullAccess');

    public static readonly AWS_MIGRATION_HUB_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSMigrationHubFullAccess');

    public static readonly AMAZON_MACIE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMacieFullAccess');

    public static readonly AMAZON_CHIME_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonChimeReadOnly');

    public static readonly AMAZON_CHIME_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonChimeFullAccess');

    public static readonly AMAZON_CHIME_USER_MANAGEMENT =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonChimeUserManagement');

    public static readonly AMAZON_ECS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonECS_FullAccess');

    public static readonly AWS_PRICE_LIST_SERVICE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSPriceListServiceFullAccess');

    public static readonly AMAZON_MQ_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMQFullAccess');

    public static readonly AMAZON_MQ_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMQReadOnlyAccess');

    public static readonly AMAZON_GUARD_DUTY_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonGuardDutyReadOnlyAccess');

    public static readonly AMAZON_GUARD_DUTY_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonGuardDutyFullAccess');

    public static readonly AMAZON_SAGE_MAKER_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonSageMakerReadOnly');

    public static readonly AMAZON_SAGE_MAKER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonSageMakerFullAccess');

    public static readonly AMAZON_FREE_RTOS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonFreeRTOSFullAccess');

    public static readonly AWS_DEEP_LENS_LAMBDA_FUNCTION_ACCESS_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDeepLensLambdaFunctionAccessPolicy'
        );

    public static readonly AWS_QUICK_SIGHT_IO_T_ANALYTICS_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSightIoTAnalyticsAccess'
        );

    public static readonly COMPREHEND_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('ComprehendFullAccess');

    public static readonly COMPREHEND_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('ComprehendReadOnly');

    public static readonly TRANSLATE_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('TranslateReadOnly');

    public static readonly AWS_CLOUD9_USER =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCloud9User');

    public static readonly AWS_CLOUD9_ADMINISTRATOR =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCloud9Administrator');

    public static readonly AWS_CLOUD9_ENVIRONMENT_MEMBER =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCloud9EnvironmentMember');

    public static readonly ALEXA_FOR_BUSINESS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AlexaForBusinessFullAccess');

    public static readonly ALEXA_FOR_BUSINESS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AlexaForBusinessReadOnlyAccess'
        );

    public static readonly ALEXA_FOR_BUSINESS_DEVICE_SETUP =
        ManagedPolicy.fromAwsManagedPolicyName('AlexaForBusinessDeviceSetup');

    public static readonly ALEXA_FOR_BUSINESS_GATEWAY_EXECUTION =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AlexaForBusinessGatewayExecution'
        );

    public static readonly AMAZON_KINESIS_VIDEO_STREAMS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonKinesisVideoStreamsReadOnlyAccess'
        );

    public static readonly AMAZON_KINESIS_VIDEO_STREAMS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonKinesisVideoStreamsFullAccess'
        );

    public static readonly AWS_ELEMENTAL_MEDIA_PACKAGE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElementalMediaPackageFullAccess'
        );

    public static readonly AWS_ELEMENTAL_MEDIA_PACKAGE_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElementalMediaPackageReadOnly'
        );

    public static readonly AMAZON_ROUTE53_AUTO_NAMING_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53AutoNamingReadOnlyAccess'
        );

    public static readonly AMAZON_ROUTE53_AUTO_NAMING_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53AutoNamingFullAccess'
        );

    public static readonly AWS_SERVICE_CATALOG_ADMIN_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSServiceCatalogAdminFullAccess'
        );

    public static readonly AWS_SERVICE_CATALOG_END_USER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSServiceCatalogEndUserFullAccess'
        );

    public static readonly AMAZON_ES_COGNITO_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonESCognitoAccess');

    public static readonly AWS_ELEMENTAL_MEDIA_STORE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElementalMediaStoreFullAccess'
        );

    public static readonly CLOUD_WATCH_AGENT_ADMIN_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('CloudWatchAgentAdminPolicy');

    public static readonly CLOUD_WATCH_AGENT_SERVER_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('CloudWatchAgentServerPolicy');

    public static readonly AWS_RESOURCE_GROUPS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSResourceGroupsReadOnlyAccess'
        );

    public static readonly AWS_ELEMENTAL_MEDIA_STORE_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElementalMediaStoreReadOnly'
        );

    public static readonly AMAZON_ROUTE53_AUTO_NAMING_REGISTRANT_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53AutoNamingRegistrantAccess'
        );

    public static readonly AWS_APP_SYNC_ADMINISTRATOR =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAppSyncAdministrator');

    public static readonly AWS_APP_SYNC_SCHEMA_AUTHOR =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAppSyncSchemaAuthor');

    public static readonly AWS_APP_SYNC_INVOKE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAppSyncInvokeFullAccess');

    public static readonly AMAZON_TRANSCRIBE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonTranscribeReadOnlyAccess'
        );

    public static readonly AMAZON_TRANSCRIBE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonTranscribeFullAccess');

    public static readonly SECRETS_MANAGER_READ_WRITE =
        ManagedPolicy.fromAwsManagedPolicyName('SecretsManagerReadWrite');

    public static readonly AMAZON_ELASTIC_TRANSCODER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticTranscoder_FullAccess'
        );

    public static readonly AWS_FM_ADMIN_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSFMAdminFullAccess');

    public static readonly AWS_FM_ADMIN_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSFMAdminReadOnlyAccess');

    public static readonly AWS_FM_MEMBER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSFMMemberReadOnlyAccess');

    public static readonly AWS_IO_T1_CLICK_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoT1ClickReadOnlyAccess');

    public static readonly AWS_IO_T1_CLICK_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoT1ClickFullAccess');

    public static readonly AMAZON_EKS_CLUSTER_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSClusterPolicy');

    public static readonly AMAZON_EKS_CNI_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEKS_CNI_Policy');

    public static readonly AMAZON_EKS_SERVICE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSServicePolicy');

    public static readonly AMAZON_EKS_WORKER_NODE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSWorkerNodePolicy');

    public static readonly NEPTUNE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('NeptuneReadOnlyAccess');

    public static readonly NEPTUNE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('NeptuneFullAccess');

    public static readonly AMAZON_ELASTIC_TRANSCODER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticTranscoder_ReadOnlyAccess'
        );

    public static readonly AMAZON_ELASTIC_TRANSCODER_JOBS_SUBMITTER =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticTranscoder_JobsSubmitter'
        );

    public static readonly AWS_IO_T_ANALYTICS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTAnalyticsReadOnlyAccess');

    public static readonly AWS_IO_T_ANALYTICS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTAnalyticsFullAccess');

    public static readonly NEPTUNE_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('NeptuneConsoleFullAccess');

    public static readonly AWS_ELEMENTAL_MEDIA_CONVERT_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElementalMediaConvertReadOnly'
        );

    public static readonly AWS_ELEMENTAL_MEDIA_CONVERT_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElementalMediaConvertFullAccess'
        );

    public static readonly AWS_SSO_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSSSOReadOnly');

    public static readonly AWS_SSO_MASTER_ACCOUNT_ADMINISTRATOR =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSSSOMasterAccountAdministrator'
        );

    public static readonly AWS_SSO_MEMBER_ACCOUNT_ADMINISTRATOR =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSSSOMemberAccountAdministrator'
        );

    public static readonly AWS_MARKETPLACE_IMAGE_BUILD_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMarketplaceImageBuildFullAccess'
        );

    public static readonly AWS_DISCOVERY_CONTINUOUS_EXPORT_FIREHOSE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDiscoveryContinuousExportFirehosePolicy'
        );

    public static readonly AWS_X_RAY_DAEMON_WRITE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess');

    public static readonly ELASTIC_LOAD_BALANCING_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('ElasticLoadBalancingReadOnly');

    public static readonly ELASTIC_LOAD_BALANCING_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'ElasticLoadBalancingFullAccess'
        );

    public static readonly AMAZON_REDSHIFT_QUERY_EDITOR =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonRedshiftQueryEditor');

    public static readonly AWS_GLUE_CONSOLE_SAGE_MAKER_NOTEBOOK_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSGlueConsoleSageMakerNotebookFullAccess'
        );

    public static readonly AMAZON_CONNECT_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonConnectReadOnlyAccess');

    public static readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_AUDITOR =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCertificateManagerPrivateCAAuditor'
        );

    public static readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_USER =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCertificateManagerPrivateCAUser'
        );

    public static readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCertificateManagerPrivateCAFullAccess'
        );

    public static readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCertificateManagerPrivateCAReadOnly'
        );

    public static readonly AWS_GREENGRASS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSGreengrassReadOnlyAccess');

    public static readonly AWS_SSO_DIRECTORY_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSSSODirectoryReadOnly');

    public static readonly AWS_SSO_DIRECTORY_ADMINISTRATOR =
        ManagedPolicy.fromAwsManagedPolicyName('AWSSSODirectoryAdministrator');

    public static readonly AWS_ORGANIZATIONS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSOrganizationsFullAccess');

    public static readonly AWS_ORGANIZATIONS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSOrganizationsReadOnlyAccess'
        );

    public static readonly AMAZON_RDS_DATA_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonRDSDataFullAccess');

    public static readonly AWS_ROBO_MAKER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSRoboMakerReadOnlyAccess');

    public static readonly AWS_ROBO_MAKER_SERVICE_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSRoboMakerServiceRolePolicy');

    public static readonly GLOBAL_ACCELERATOR_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'GlobalAcceleratorReadOnlyAccess'
        );

    public static readonly GLOBAL_ACCELERATOR_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('GlobalAcceleratorFullAccess');

    public static readonly AWS_PRIVATE_MARKETPLACE_ADMIN_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSPrivateMarketplaceAdminFullAccess'
        );

    public static readonly COMPREHEND_MEDICAL_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('ComprehendMedicalFullAccess');

    public static readonly AWS_CODE_DEPLOY_ROLE_FOR_ECS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeDeployRoleForECS');

    public static readonly AWS_CODE_DEPLOY_ROLE_FOR_ECS_LIMITED =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCodeDeployRoleForECSLimited'
        );

    public static readonly TRANSLATE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('TranslateFullAccess');

    public static readonly AWS_SECURITY_HUB_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSSecurityHubFullAccess');

    public static readonly AWS_SECURITY_HUB_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSSecurityHubReadOnlyAccess');

    public static readonly AMAZON_F_SX_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonFSxReadOnlyAccess');

    public static readonly AMAZON_F_SX_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonFSxFullAccess');

    public static readonly AMAZON_F_SX_CONSOLE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonFSxConsoleReadOnlyAccess'
        );

    public static readonly AMAZON_F_SX_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonFSxConsoleFullAccess');

    public static readonly AMAZON_TEXTRACT_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonTextractFullAccess');

    public static readonly AWS_CLOUD_MAP_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCloudMapReadOnlyAccess');

    public static readonly AWS_CLOUD_MAP_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCloudMapFullAccess');

    public static readonly AWS_CLOUD_MAP_DISCOVER_INSTANCE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCloudMapDiscoverInstanceAccess'
        );

    public static readonly AWS_CLOUD_MAP_REGISTER_INSTANCE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCloudMapRegisterInstanceAccess'
        );

    public static readonly WELL_ARCHITECTED_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'WellArchitectedConsoleFullAccess'
        );

    public static readonly WELL_ARCHITECTED_CONSOLE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'WellArchitectedConsoleReadOnlyAccess'
        );

    public static readonly AWS_IO_T_SITE_WISE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTSiteWiseFullAccess');

    public static readonly AWS_IO_T_SITE_WISE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTSiteWiseReadOnlyAccess');

    public static readonly AMAZON_MQ_API_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMQApiReadOnlyAccess');

    public static readonly AMAZON_MQ_API_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMQApiFullAccess');

    public static readonly AMAZON_DOC_DB_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonDocDBFullAccess');

    public static readonly AMAZON_DOC_DB_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonDocDBReadOnlyAccess');

    public static readonly AMAZON_DOC_DB_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonDocDBConsoleFullAccess');

    public static readonly AWS_IO_T_EVENTS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTEventsReadOnlyAccess');

    public static readonly AWS_IO_T_EVENTS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTEventsFullAccess');

    public static readonly AMAZON_MSK_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMSKFullAccess');

    public static readonly AMAZON_MSK_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMSKReadOnlyAccess');

    public static readonly AMAZON_FORECAST_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonForecastFullAccess');

    public static readonly AWS_DATA_SYNC_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSDataSyncReadOnlyAccess');

    public static readonly AWS_DATA_SYNC_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSDataSyncFullAccess');

    public static readonly WORK_LINK_SERVICE_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('WorkLinkServiceRolePolicy');

    public static readonly AWS_DEEP_RACER_CLOUD_FORMATION_ACCESS_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDeepRacerCloudFormationAccessPolicy'
        );

    public static readonly AWS_DEEP_RACER_ROBO_MAKER_ACCESS_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDeepRacerRoboMakerAccessPolicy'
        );

    public static readonly AMAZON_SSM_MANAGED_INSTANCE_CORE =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore');

    public static readonly AMAZON_SSM_DIRECTORY_SERVICE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSSMDirectoryServiceAccess'
        );

    public static readonly AWS_IQ_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIQFullAccess');

    public static readonly AWS_APP_MESH_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAppMeshFullAccess');

    public static readonly AWS_APP_MESH_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAppMeshReadOnly');

    public static readonly AMAZON_MANAGED_BLOCKCHAIN_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonManagedBlockchainConsoleFullAccess'
        );

    public static readonly AMAZON_MANAGED_BLOCKCHAIN_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonManagedBlockchainFullAccess'
        );

    public static readonly AMAZON_MANAGED_BLOCKCHAIN_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonManagedBlockchainReadOnlyAccess'
        );

    public static readonly AWS_DENY_ALL =
        ManagedPolicy.fromAwsManagedPolicyName('AWSDenyAll');

    public static readonly AMAZON_ROUTE53_RESOLVER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53ResolverFullAccess'
        );

    public static readonly AMAZON_ROUTE53_RESOLVER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53ResolverReadOnlyAccess'
        );

    public static readonly AWS_IO_T_SITE_WISE_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSIoTSiteWiseConsoleFullAccess'
        );

    public static readonly AWS_RESOURCE_ACCESS_MANAGER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSResourceAccessManagerFullAccess'
        );

    public static readonly AWS_OPS_WORKS_REGISTER_CLI_ON_PREMISES =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSOpsWorksRegisterCLI_OnPremises'
        );

    public static readonly AWS_OPS_WORKS_REGISTER_CLI_EC2 =
        ManagedPolicy.fromAwsManagedPolicyName('AWSOpsWorksRegisterCLI_EC2');

    public static readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_PRIVILEGED_USER =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCertificateManagerPrivateCAPrivilegedUser'
        );

    public static readonly IAM_ACCESS_ADVISOR_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('IAMAccessAdvisorReadOnly');

    public static readonly SERVICE_QUOTAS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('ServiceQuotasReadOnlyAccess');

    public static readonly SERVICE_QUOTAS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('ServiceQuotasFullAccess');

    public static readonly AWS_MARKETPLACE_PROCUREMENT_SYSTEM_ADMIN_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMarketplaceProcurementSystemAdminFullAccess'
        );

    public static readonly EC2_INSTANCE_CONNECT =
        ManagedPolicy.fromAwsManagedPolicyName('EC2InstanceConnect');

    public static readonly AMAZON_WORK_SPACES_SERVICE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonWorkSpacesServiceAccess');

    public static readonly AMAZON_WORK_SPACES_SELF_SERVICE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonWorkSpacesSelfServiceAccess'
        );

    public static readonly AWS_MARKETPLACE_SELLER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMarketplaceSellerFullAccess'
        );

    public static readonly AWS_MARKETPLACE_SELLER_PRODUCTS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMarketplaceSellerProductsFullAccess'
        );

    public static readonly AWS_MARKETPLACE_SELLER_PRODUCTS_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMarketplaceSellerProductsReadOnly'
        );

    public static readonly AWS_APP_MESH_ENVOY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAppMeshEnvoyAccess');

    public static readonly AMAZON_EVENT_BRIDGE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEventBridgeReadOnlyAccess'
        );

    public static readonly AMAZON_EVENT_BRIDGE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEventBridgeFullAccess');

    public static readonly CLOUD_WATCH_AUTOMATIC_DASHBOARDS_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchAutomaticDashboardsAccess'
        );

    public static readonly AWS_CLOUD_FORMATION_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCloudFormationFullAccess');

    public static readonly ELEMENTAL_APPLIANCES_SOFTWARE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'ElementalAppliancesSoftwareFullAccess'
        );

    public static readonly AWS_APP_MESH_PREVIEW_ENVOY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAppMeshPreviewEnvoyAccess');

    public static readonly AWS_LAKE_FORMATION_DATA_ADMIN =
        ManagedPolicy.fromAwsManagedPolicyName('AWSLakeFormationDataAdmin');

    public static readonly AMAZON_QLDB_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonQLDBReadOnly');

    public static readonly AMAZON_QLDB_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonQLDBFullAccess');

    public static readonly AMAZON_QLDB_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonQLDBConsoleFullAccess');

    public static readonly ALEXA_FOR_BUSINESS_POLY_DELEGATED_ACCESS_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AlexaForBusinessPolyDelegatedAccessPolicy'
        );

    public static readonly AWS_SERVICE_CATALOG_END_USER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSServiceCatalogEndUserReadOnlyAccess'
        );

    public static readonly AWS_SERVICE_CATALOG_ADMIN_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSServiceCatalogAdminReadOnlyAccess'
        );

    public static readonly AWS_PRIVATE_MARKETPLACE_REQUESTS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSPrivateMarketplaceRequests');

    public static readonly AWS_FOR_WORD_PRESS_PLUGIN_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSForWordPressPluginPolicy');

    public static readonly AWS_SAVINGS_PLANS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSSavingsPlansReadOnlyAccess');

    public static readonly AWS_SAVINGS_PLANS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSSavingsPlansFullAccess');

    public static readonly AMAZON_EC2_ROLE_POLICY_FOR_LAUNCH_WIZARD =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEC2RolePolicyForLaunchWizard'
        );

    public static readonly AWS_DATA_EXCHANGE_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSDataExchangeReadOnly');

    public static readonly AWS_DATA_EXCHANGE_SUBSCRIBER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDataExchangeSubscriberFullAccess'
        );

    public static readonly AWS_DATA_EXCHANGE_PROVIDER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDataExchangeProviderFullAccess'
        );

    public static readonly AWS_DATA_EXCHANGE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSDataExchangeFullAccess');

    public static readonly AWS_BACKUP_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSBackupFullAccess');

    public static readonly AWS_BACKUP_OPERATOR_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSBackupOperatorAccess');

    public static readonly AWS_MARKETPLACE_METERING_REGISTER_USAGE =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMarketplaceMeteringRegisterUsage'
        );

    public static readonly AMAZON_EKS_FARGATE_POD_EXECUTION_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEKSFargatePodExecutionRolePolicy'
        );

    public static readonly CLOUD_WATCH_SYNTHETICS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchSyntheticsFullAccess'
        );

    public static readonly CLOUD_WATCH_SYNTHETICS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchSyntheticsReadOnlyAccess'
        );

    public static readonly AMAZON_EVENT_BRIDGE_SCHEMAS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEventBridgeSchemasReadOnlyAccess'
        );

    public static readonly AMAZON_EVENT_BRIDGE_SCHEMAS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEventBridgeSchemasFullAccess'
        );

    public static readonly EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER =
        ManagedPolicy.fromAwsManagedPolicyName(
            'EC2InstanceProfileForImageBuilder'
        );

    public static readonly IAM_ACCESS_ANALYZER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('IAMAccessAnalyzerFullAccess');

    public static readonly IAM_ACCESS_ANALYZER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'IAMAccessAnalyzerReadOnlyAccess'
        );

    public static readonly AMAZON_CODE_GURU_REVIEWER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCodeGuruReviewerFullAccess'
        );

    public static readonly AMAZON_CODE_GURU_REVIEWER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCodeGuruReviewerReadOnlyAccess'
        );

    public static readonly AMAZON_CODE_GURU_PROFILER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCodeGuruProfilerFullAccess'
        );

    public static readonly AMAZON_CODE_GURU_PROFILER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCodeGuruProfilerReadOnlyAccess'
        );

    public static readonly AMAZON_MCS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMCSFullAccess');

    public static readonly AMAZON_MCS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMCSReadOnlyAccess');

    public static readonly AMAZON_KENDRA_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonKendraReadOnlyAccess');

    public static readonly AMAZON_KENDRA_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonKendraFullAccess');

    public static readonly AMAZON_SAGE_MAKER_MECHANICAL_TURK_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerMechanicalTurkAccess'
        );

    public static readonly AMAZON_AUGMENTED_AI_HUMAN_LOOP_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonAugmentedAIHumanLoopFullAccess'
        );

    public static readonly AMAZON_AUGMENTED_AI_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonAugmentedAIFullAccess');

    public static readonly AWS_NETWORK_MANAGER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSNetworkManagerReadOnlyAccess'
        );

    public static readonly AWS_NETWORK_MANAGER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSNetworkManagerFullAccess');

    public static readonly AMAZON_FRAUD_DETECTOR_FULL_ACCESS_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonFraudDetectorFullAccessPolicy'
        );

    public static readonly AWS_RESOURCE_ACCESS_MANAGER_RESOURCE_SHARE_PARTICIPANT_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSResourceAccessManagerResourceShareParticipantAccess'
        );

    public static readonly AWS_RESOURCE_ACCESS_MANAGER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSResourceAccessManagerReadOnlyAccess'
        );

    public static readonly AWS_IMAGE_BUILDER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSImageBuilderReadOnlyAccess');

    public static readonly AWS_IMAGE_BUILDER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSImageBuilderFullAccess');

    public static readonly AMAZON_REKOGNITION_CUSTOM_LABELS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRekognitionCustomLabelsFullAccess'
        );

    public static readonly AMAZON_WORK_DOCS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonWorkDocsReadOnlyAccess');

    public static readonly AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_WRITE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticFileSystemClientReadWriteAccess'
        );

    public static readonly AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticFileSystemClientReadOnlyAccess'
        );

    public static readonly AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticFileSystemClientFullAccess'
        );

    public static readonly AMAZON_CHIME_SDK =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonChimeSDK');

    public static readonly AWS_IO_T_DEVICE_TESTER_FOR_FREE_RTOS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSIoTDeviceTesterForFreeRTOSFullAccess'
        );

    public static readonly AWS_IO_T_DEVICE_TESTER_FOR_GREENGRASS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSIoTDeviceTesterForGreengrassFullAccess'
        );

    public static readonly COMPUTE_OPTIMIZER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'ComputeOptimizerReadOnlyAccess'
        );

    public static readonly ELEMENTAL_APPLIANCES_SOFTWARE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'ElementalAppliancesSoftwareReadOnlyAccess'
        );

    public static readonly GAME_LIFT_GAME_SERVER_GROUP_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('GameLiftGameServerGroupPolicy');

    public static readonly AWS_WAF_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSWAFConsoleFullAccess');

    public static readonly AWS_WAF_CONSOLE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSWAFConsoleReadOnlyAccess');

    public static readonly AMAZON_WORK_DOCS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonWorkDocsFullAccess');

    public static readonly AMAZON_AUGMENTED_AI_INTEGRATED_API_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonAugmentedAIIntegratedAPIAccess'
        );

    public static readonly AMAZON_KEYSPACES_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonKeyspacesFullAccess');

    public static readonly AMAZON_KEYSPACES_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonKeyspacesReadOnlyAccess');

    public static readonly AMAZON_DETECTIVE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonDetectiveFullAccess');

    public static readonly AWS_PURCHASE_ORDERS_SERVICE_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSPurchaseOrdersServiceRolePolicy'
        );

    public static readonly SERVER_MIGRATION_SERVICE_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'ServerMigrationServiceConsoleFullAccess'
        );

    public static readonly AMAZON_SSM_PATCH_ASSOCIATION =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMPatchAssociation');

    public static readonly AWS_CLOUD9_SSM_INSTANCE_PROFILE =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCloud9SSMInstanceProfile');

    public static readonly AWS_THINKBOX_AWS_PORTAL_GATEWAY_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSThinkboxAWSPortalGatewayPolicy'
        );

    public static readonly AWS_THINKBOX_AWS_PORTAL_WORKER_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSThinkboxAWSPortalWorkerPolicy'
        );

    public static readonly AWS_THINKBOX_ASSET_SERVER_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSThinkboxAssetServerPolicy');

    public static readonly AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ACCESS_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSThinkboxDeadlineResourceTrackerAccessPolicy'
        );

    public static readonly AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ADMIN_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSThinkboxDeadlineResourceTrackerAdminPolicy'
        );

    public static readonly AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_WORKER_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSThinkboxDeadlineSpotEventPluginWorkerPolicy'
        );

    public static readonly AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_ADMIN_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSThinkboxDeadlineSpotEventPluginAdminPolicy'
        );

    public static readonly AWS_THINKBOX_AWS_PORTAL_ADMIN_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSThinkboxAWSPortalAdminPolicy'
        );

    public static readonly AMAZON_APP_FLOW_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonAppFlowReadOnlyAccess');

    public static readonly AMAZON_APP_FLOW_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonAppFlowFullAccess');

    public static readonly ALEXA_FOR_BUSINESS_LIFESIZE_DELEGATED_ACCESS_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AlexaForBusinessLifesizeDelegatedAccessPolicy'
        );

    public static readonly ELEMENTAL_ACTIVATIONS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'ElementalActivationsFullAccess'
        );

    public static readonly AWS_CODE_ARTIFACT_ADMIN_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeArtifactAdminAccess');

    public static readonly AWS_BACKUP_ORGANIZATION_ADMIN_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSBackupOrganizationAdminAccess'
        );

    public static readonly AMAZON_HONEYCODE_TEAM_ASSOCIATION_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonHoneycodeTeamAssociationReadOnlyAccess'
        );

    public static readonly AMAZON_HONEYCODE_WORKBOOK_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonHoneycodeWorkbookReadOnlyAccess'
        );

    public static readonly AMAZON_HONEYCODE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonHoneycodeFullAccess');

    public static readonly AMAZON_HONEYCODE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonHoneycodeReadOnlyAccess');

    public static readonly AMAZON_HONEYCODE_TEAM_ASSOCIATION_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonHoneycodeTeamAssociationFullAccess'
        );

    public static readonly AMAZON_HONEYCODE_WORKBOOK_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonHoneycodeWorkbookFullAccess'
        );

    public static readonly AWS_CODE_ARTIFACT_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeArtifactReadOnlyAccess');

    public static readonly AWS_ELEMENTAL_MEDIA_LIVE_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSElementalMediaLiveReadOnly');

    public static readonly AWS_ELEMENTAL_MEDIA_LIVE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElementalMediaLiveFullAccess'
        );

    public static readonly AMAZON_SAGE_MAKER_GROUND_TRUTH_EXECUTION =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerGroundTruthExecution'
        );

    public static readonly AWS_CODE_PIPELINE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCodePipeline_ReadOnlyAccess'
        );

    public static readonly AWS_CODE_PIPELINE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodePipeline_FullAccess');

    public static readonly AWS_LAKE_FORMATION_CROSS_ACCOUNT_MANAGER =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSLakeFormationCrossAccountManager'
        );

    public static readonly AMAZON_BRAKET_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonBraketFullAccess');

    public static readonly AWS_COMPROMISED_KEY_QUARANTINE =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCompromisedKeyQuarantine');

    public static readonly AMAZON_EKSVPC_RESOURCE_CONTROLLER =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEKSVPCResourceController'
        );

    public static readonly AWS_TRANSFER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSTransferReadOnlyAccess');

    public static readonly AWS_BILLING_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSBillingReadOnlyAccess');

    public static readonly ELEMENTAL_ACTIVATIONS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'ElementalActivationsReadOnlyAccess'
        );

    public static readonly ELEMENTAL_ACTIVATIONS_GENERATE_LICENSES =
        ManagedPolicy.fromAwsManagedPolicyName(
            'ElementalActivationsGenerateLicenses'
        );

    public static readonly ELEMENTAL_ACTIVATIONS_DOWNLOAD_SOFTWARE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'ElementalActivationsDownloadSoftwareAccess'
        );

    public static readonly AMAZON_REDSHIFT_DATA_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonRedshiftDataFullAccess');

    public static readonly AWS_ROBO_MAKER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSRoboMaker_FullAccess');

    public static readonly AWS_MARKETPLACE_AMI_INGESTION =
        ManagedPolicy.fromAwsManagedPolicyName('AWSMarketplaceAmiIngestion');

    public static readonly AMAZON_ELASTIC_MAP_REDUCE_PLACEMENT_GROUP_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticMapReducePlacementGroupPolicy'
        );

    public static readonly AMAZON_ELASTIC_FILE_SYSTEMS_UTILS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonElasticFileSystemsUtils');

    public static readonly EC2_IMAGE_BUILDER_CROSS_ACCOUNT_DISTRIBUTION_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'Ec2ImageBuilderCrossAccountDistributionAccess'
        );

    public static readonly AMAZON_TIMESTREAM_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonTimestreamReadOnlyAccess'
        );

    public static readonly AMAZON_TIMESTREAM_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonTimestreamFullAccess');

    public static readonly AMAZON_TIMESTREAM_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonTimestreamConsoleFullAccess'
        );

    public static readonly AMAZON_S3_OUTPOSTS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonS3OutpostsFullAccess');

    public static readonly AMAZON_S3_OUTPOSTS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonS3OutpostsReadOnlyAccess'
        );

    public static readonly AWS_DEEP_RACER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSDeepRacerFullAccess');

    public static readonly CLOUD_WATCH_LAMBDA_INSIGHTS_EXECUTION_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchLambdaInsightsExecutionRolePolicy'
        );

    public static readonly AWS_CLOUD_TRAIL_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCloudTrail_FullAccess');

    public static readonly AWS_BUDGETS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSBudgetsReadOnlyAccess');

    public static readonly AWS_BUDGETS_ACTIONS_WITH_AWS_RESOURCE_CONTROL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSBudgetsActionsWithAWSResourceControlAccess'
        );

    public static readonly AWS_GLUE_DATA_BREW_FULL_ACCESS_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AwsGlueDataBrewFullAccessPolicy'
        );

    public static readonly AWS_SERVICE_CATALOG_APP_REGISTRY_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSServiceCatalogAppRegistryFullAccess'
        );

    public static readonly AWS_SERVICE_CATALOG_APP_REGISTRY_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSServiceCatalogAppRegistryReadOnlyAccess'
        );

    public static readonly AWS_LAMBDA_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_ReadOnlyAccess');

    public static readonly AWS_LAMBDA_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess');

    public static readonly AWS_GLUE_SCHEMA_REGISTRY_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSGlueSchemaRegistryFullAccess'
        );

    public static readonly AWS_GLUE_SCHEMA_REGISTRY_READONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSGlueSchemaRegistryReadonlyAccess'
        );

    public static readonly AMAZON_CONNECT_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonConnect_FullAccess');

    public static readonly CLOUD_WATCH_APPLICATION_INSIGHTS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchApplicationInsightsFullAccess'
        );

    public static readonly CLOUD_WATCH_APPLICATION_INSIGHTS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchApplicationInsightsReadOnlyAccess'
        );

    public static readonly ELEMENTAL_SUPPORT_CENTER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'ElementalSupportCenterFullAccess'
        );

    public static readonly AMAZON_SAGE_MAKER_ADMIN_SERVICE_CATALOG_PRODUCTS_SERVICE_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerAdmin-ServiceCatalogProductsServiceRolePolicy'
        );

    public static readonly AWS_PANORAMA_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSPanoramaFullAccess');

    public static readonly AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_POWER_USER =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticContainerRegistryPublicPowerUser'
        );

    public static readonly AMAZON_SAGE_MAKER_FEATURE_STORE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerFeatureStoreAccess'
        );

    public static readonly AMAZON_DEV_OPS_GURU_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonDevOpsGuruReadOnlyAccess'
        );

    public static readonly AMAZON_DEV_OPS_GURU_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonDevOpsGuruFullAccess');

    public static readonly AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticContainerRegistryPublicFullAccess'
        );

    public static readonly AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonElasticContainerRegistryPublicReadOnly'
        );

    public static readonly ADMINISTRATOR_ACCESS_AMPLIFY =
        ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess-Amplify');

    public static readonly AMAZON_MONITRON_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMonitronFullAccess');

    public static readonly EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER_ECR_CONTAINER_BUILDS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'EC2InstanceProfileForImageBuilderECRContainerBuilds'
        );

    public static readonly AWS_AUDIT_MANAGER_ADMINISTRATOR_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSAuditManagerAdministratorAccess'
        );

    public static readonly AWS_TRANSFER_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSTransferConsoleFullAccess');

    public static readonly AWS_TRANSFER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSTransferFullAccess');

    public static readonly AWS_IO_T_WIRELESS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTWirelessFullAccess');

    public static readonly AWS_IO_T_WIRELESS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTWirelessReadOnlyAccess');

    public static readonly AWS_IO_T_WIRELESS_FULL_PUBLISH_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSIoTWirelessFullPublishAccess'
        );

    public static readonly AWS_IO_T_WIRELESS_GATEWAY_CERT_MANAGER =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSIoTWirelessGatewayCertManager'
        );

    public static readonly AWS_IO_T_WIRELESS_DATA_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTWirelessDataAccess');

    public static readonly AWS_IO_T_WIRELESS_LOGGING =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIoTWirelessLogging');

    public static readonly AWS_CLOUD_SHELL_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCloudShellFullAccess');

    public static readonly AMAZON_PROMETHEUS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonPrometheusFullAccess');

    public static readonly AMAZON_PROMETHEUS_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonPrometheusConsoleFullAccess'
        );

    public static readonly AMAZON_PROMETHEUS_QUERY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonPrometheusQueryAccess');

    public static readonly AMAZON_PROMETHEUS_REMOTE_WRITE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonPrometheusRemoteWriteAccess'
        );

    public static readonly AWS_OPS_WORKS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSOpsWorks_FullAccess');

    public static readonly AWS_ELASTIC_BEANSTALK_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkReadOnly');

    public static readonly ADMINISTRATOR_ACCESS_AWS_ELASTIC_BEANSTALK =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AdministratorAccess-AWSElasticBeanstalk'
        );

    public static readonly AMAZON_WORK_MAIL_MESSAGE_FLOW_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonWorkMailMessageFlowReadOnlyAccess'
        );

    public static readonly AMAZON_CODE_GURU_PROFILER_AGENT_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCodeGuruProfilerAgentAccess'
        );

    public static readonly AMAZON_WORK_MAIL_MESSAGE_FLOW_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonWorkMailMessageFlowFullAccess'
        );

    public static readonly AMAZON_HEALTH_LAKE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonHealthLakeFullAccess');

    public static readonly AMAZON_HEALTH_LAKE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonHealthLakeReadOnlyAccess'
        );

    public static readonly AWS_PROTON_DEVELOPER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSProtonDeveloperAccess');

    public static readonly AWS_PROTON_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSProtonFullAccess');

    public static readonly AWS_PROTON_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSProtonReadOnlyAccess');

    public static readonly AWS_GRAFANA_CONSOLE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSGrafanaConsoleReadOnlyAccess'
        );

    public static readonly AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSGrafanaWorkspacePermissionManagement'
        );

    public static readonly AWS_GRAFANA_ACCOUNT_ADMINISTRATOR =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSGrafanaAccountAdministrator'
        );

    public static readonly AWS_ELASTIC_BEANSTALK_MANAGED_UPDATES_CUSTOMER_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy'
        );

    public static readonly AMAZON_EMR_READ_ONLY_ACCESS_POLICY_V2 =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEMRReadOnlyAccessPolicy_v2'
        );

    public static readonly AMAZON_EMR_FULL_ACCESS_POLICY_V2 =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEMRFullAccessPolicy_v2');

    public static readonly AWS_SECURITY_HUB_ORGANIZATIONS_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSSecurityHubOrganizationsAccess'
        );

    public static readonly AWS_APPLICATION_MIGRATION_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSApplicationMigrationFullAccess'
        );

    public static readonly AWS_APPLICATION_MIGRATION_AGENT_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSApplicationMigrationAgentPolicy'
        );

    public static readonly AWS_APPLICATION_MIGRATION_EC2_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSApplicationMigrationEC2Access'
        );

    public static readonly AWS_APPLICATION_MIGRATION_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSApplicationMigrationReadOnlyAccess'
        );

    public static readonly AMAZON_LOOKOUT_EQUIPMENT_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonLookoutEquipmentFullAccess'
        );

    public static readonly AWS_COMPROMISED_KEY_QUARANTINE_V2 =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCompromisedKeyQuarantineV2');

    public static readonly AMAZON_NIMBLE_STUDIO_LAUNCH_PROFILE_WORKER =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonNimbleStudio-LaunchProfileWorker'
        );

    public static readonly AMAZON_NIMBLE_STUDIO_STUDIO_ADMIN =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonNimbleStudio-StudioAdmin'
        );

    public static readonly AMAZON_NIMBLE_STUDIO_STUDIO_USER =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonNimbleStudio-StudioUser');

    public static readonly AMAZON_LOOKOUT_EQUIPMENT_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonLookoutEquipmentReadOnlyAccess'
        );

    public static readonly AMAZON_LOOKOUT_METRICS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonLookoutMetricsReadOnlyAccess'
        );

    public static readonly AMAZON_LOOKOUT_METRICS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonLookoutMetricsFullAccess'
        );

    public static readonly AWS_INCIDENT_MANAGER_RESOLVER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSIncidentManagerResolverAccess'
        );

    public static readonly AMAZON_LOOKOUT_VISION_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonLookoutVisionReadOnlyAccess'
        );

    public static readonly AMAZON_LOOKOUT_VISION_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonLookoutVisionFullAccess');

    public static readonly AMAZON_LOOKOUT_VISION_CONSOLE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonLookoutVisionConsoleReadOnlyAccess'
        );

    public static readonly AMAZON_LOOKOUT_VISION_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonLookoutVisionConsoleFullAccess'
        );

    public static readonly AWS_BUG_BUST_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSBugBustFullAccess');

    public static readonly AWS_BUG_BUST_PLAYER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSBugBustPlayerAccess');

    public static readonly AMAZON_SAGE_MAKER_PIPELINES_INTEGRATIONS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerPipelinesIntegrations'
        );

    public static readonly AMAZON_ROUTE53_RECOVERY_READINESS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53RecoveryReadinessFullAccess'
        );

    public static readonly AMAZON_ROUTE53_RECOVERY_CLUSTER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53RecoveryClusterReadOnlyAccess'
        );

    public static readonly AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53RecoveryControlConfigFullAccess'
        );

    public static readonly AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53RecoveryControlConfigReadOnlyAccess'
        );

    public static readonly AMAZON_ROUTE53_RECOVERY_READINESS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53RecoveryReadinessReadOnlyAccess'
        );

    public static readonly AMAZON_ROUTE53_RECOVERY_CLUSTER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53RecoveryClusterFullAccess'
        );

    public static readonly AWS_BACKUP_AUDIT_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSBackupAuditAccess');

    public static readonly AMAZON_OPEN_SEARCH_SERVICE_COGNITO_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonOpenSearchServiceCognitoAccess'
        );

    public static readonly AMAZON_OPEN_SEARCH_SERVICE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonOpenSearchServiceFullAccess'
        );

    public static readonly AMAZON_OPEN_SEARCH_SERVICE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonOpenSearchServiceReadOnlyAccess'
        );

    public static readonly AMAZON_MSK_CONNECT_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonMSKConnectReadOnlyAccess'
        );

    public static readonly AMAZON_REDSHIFT_QUERY_EDITOR_V2_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRedshiftQueryEditorV2FullAccess'
        );

    public static readonly AMAZON_REDSHIFT_QUERY_EDITOR_V2_NO_SHARING =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRedshiftQueryEditorV2NoSharing'
        );

    public static readonly AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_SHARING =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRedshiftQueryEditorV2ReadSharing'
        );

    public static readonly AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_WRITE_SHARING =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRedshiftQueryEditorV2ReadWriteSharing'
        );

    public static readonly AMAZON_CONNECT_VOICE_ID_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonConnectVoiceIDFullAccess'
        );

    public static readonly AWS_ACCOUNT_MANAGEMENT_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSAccountManagementFullAccess'
        );

    public static readonly AWS_ACCOUNT_MANAGEMENT_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSAccountManagementReadOnlyAccess'
        );

    public static readonly AMAZON_MEMORY_DB_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMemoryDBFullAccess');

    public static readonly AMAZON_MEMORY_DB_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMemoryDBReadOnlyAccess');

    public static readonly AWS_MIGRATION_HUB_STRATEGY_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMigrationHubStrategyConsoleFullAccess'
        );

    public static readonly AWS_MIGRATION_HUB_STRATEGY_COLLECTOR =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMigrationHubStrategyCollector'
        );

    public static readonly AWS_DEEP_RACER_ACCOUNT_ADMIN_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDeepRacerAccountAdminAccess'
        );

    public static readonly AWS_DEEP_RACER_DEFAULT_MULTI_USER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDeepRacerDefaultMultiUserAccess'
        );

    public static readonly AMAZON_REDSHIFT_ALL_COMMANDS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRedshiftAllCommandsFullAccess'
        );

    public static readonly AWS_APPLICATION_MIGRATION_V_CENTER_CLIENT_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSApplicationMigrationVCenterClientPolicy'
        );

    public static readonly AMAZON_DEV_OPS_GURU_ORGANIZATIONS_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonDevOpsGuruOrganizationsAccess'
        );

    public static readonly AWS_ELASTIC_DISASTER_RECOVERY_AGENT_INSTALLATION_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElasticDisasterRecoveryAgentInstallationPolicy'
        );

    public static readonly AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElasticDisasterRecoveryConsoleFullAccess'
        );

    public static readonly AWS_ELASTIC_DISASTER_RECOVERY_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElasticDisasterRecoveryReadOnlyAccess'
        );

    public static readonly AWS_ELASTIC_DISASTER_RECOVERY_FAILBACK_INSTALLATION_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElasticDisasterRecoveryFailbackInstallationPolicy'
        );

    public static readonly AWS_ELEMENTAL_MEDIA_TAILOR_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElementalMediaTailorFullAccess'
        );

    public static readonly AWS_ELEMENTAL_MEDIA_TAILOR_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElementalMediaTailorReadOnly'
        );

    public static readonly AMAZON_BRAKET_JOBS_EXECUTION_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonBraketJobsExecutionPolicy'
        );

    public static readonly AWS_MIGRATION_HUB_REFACTOR_SPACES_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMigrationHubRefactorSpacesFullAccess'
        );

    public static readonly AMAZON_CLOUD_WATCH_EVIDENTLY_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCloudWatchEvidentlyReadOnlyAccess'
        );

    public static readonly AMAZON_CLOUD_WATCH_EVIDENTLY_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCloudWatchEvidentlyFullAccess'
        );

    public static readonly AMAZON_CLOUD_WATCH_RUM_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCloudWatchRUMReadOnlyAccess'
        );

    public static readonly AMAZON_CLOUD_WATCH_RUM_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonCloudWatchRUMFullAccess');

    public static readonly AMAZON_INSPECTOR2_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonInspector2FullAccess');

    public static readonly AMAZON_WORK_SPACES_WEB_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonWorkSpacesWebReadOnly');

    public static readonly AMAZON_DEV_OPS_GURU_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonDevOpsGuruConsoleFullAccess'
        );

    public static readonly AWS_APP_RUNNER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAppRunnerFullAccess');

    public static readonly AMAZON_INSPECTOR2_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonInspector2ReadOnlyAccess'
        );

    public static readonly AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_RESTORE =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSBackupServiceRolePolicyForS3Restore'
        );

    public static readonly AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_BACKUP =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSBackupServiceRolePolicyForS3Backup'
        );

    public static readonly AWS_APP_RUNNER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAppRunnerReadOnlyAccess');

    public static readonly AWS_IDENTITY_SYNC_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIdentitySyncFullAccess');

    public static readonly AWS_IDENTITY_SYNC_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSIdentitySyncReadOnlyAccess');

    public static readonly AMAZON_SAGE_MAKER_SERVICE_CATALOG_PRODUCTS_CODE_BUILD_SERVICE_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerServiceCatalogProductsCodeBuildServiceRolePolicy'
        );

    public static readonly AMAZON_RDS_PERFORMANCE_INSIGHTS_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRDSPerformanceInsightsReadOnly'
        );

    public static readonly ROSA_MANAGE_SUBSCRIPTION =
        ManagedPolicy.fromAwsManagedPolicyName('ROSAManageSubscription');

    public static readonly AWS_BILLING_CONDUCTOR_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSBillingConductorFullAccess');

    public static readonly AWS_BILLING_CONDUCTOR_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSBillingConductorReadOnlyAccess'
        );

    public static readonly AWS_GLUE_SESSION_USER_RESTRICTED_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AwsGlueSessionUserRestrictedPolicy'
        );

    public static readonly AWS_GLUE_SESSION_USER_RESTRICTED_NOTEBOOK_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AwsGlueSessionUserRestrictedNotebookPolicy'
        );

    public static readonly AWS_MIGRATION_HUB_ORCHESTRATOR_PLUGIN =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMigrationHubOrchestratorPlugin'
        );

    public static readonly AWS_MIGRATION_HUB_ORCHESTRATOR_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMigrationHubOrchestratorConsoleFullAccess'
        );

    public static readonly AWS_MIGRATION_HUB_ORCHESTRATOR_INSTANCE_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMigrationHubOrchestratorInstanceRolePolicy'
        );

    public static readonly AWS_BUDGETS_ACTIONS_ROLE_POLICY_FOR_RESOURCE_ADMINISTRATION_WITH_SSM =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSBudgetsActions_RolePolicyForResourceAdministrationWithSSM'
        );

    public static readonly AWS_CLOUD_TRAIL_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCloudTrail_ReadOnlyAccess');

    public static readonly AWS_APPLICATION_MIGRATION_AGENT_INSTALLATION_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSApplicationMigrationAgentInstallationPolicy'
        );

    public static readonly AWS_VENDOR_INSIGHTS_VENDOR_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSVendorInsightsVendorFullAccess'
        );

    public static readonly AWS_VENDOR_INSIGHTS_VENDOR_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSVendorInsightsVendorReadOnly'
        );

    public static readonly AWS_VENDOR_INSIGHTS_ASSESSOR_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSVendorInsightsAssessorFullAccess'
        );

    public static readonly AWS_VENDOR_INSIGHTS_ASSESSOR_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSVendorInsightsAssessorReadOnly'
        );

    public static readonly AWS_TRUSTED_ADVISOR_PRIORITY_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSTrustedAdvisorPriorityFullAccess'
        );

    public static readonly AWS_TRUSTED_ADVISOR_PRIORITY_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSTrustedAdvisorPriorityReadOnlyAccess'
        );

    public static readonly AWS_APPLICATION_DISCOVERY_AGENTLESS_COLLECTOR_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSApplicationDiscoveryAgentlessCollectorAccess'
        );

    public static readonly AWS_SUPPORT_APP_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSSupportAppFullAccess');

    public static readonly AWS_SUPPORT_APP_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSSupportAppReadOnlyAccess');

    public static readonly AMAZON_EKS_LOCAL_OUTPOST_CLUSTER_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEKSLocalOutpostClusterPolicy'
        );

    public static readonly GROUND_TRUTH_SYNTHETIC_CONSOLE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'GroundTruthSyntheticConsoleReadOnlyAccess'
        );

    public static readonly GROUND_TRUTH_SYNTHETIC_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'GroundTruthSyntheticConsoleFullAccess'
        );

    public static readonly AMAZON_SSM_MANAGED_EC2_INSTANCE_DEFAULT_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSSMManagedEC2InstanceDefaultPolicy'
        );

    public static readonly AMAZON_SAGE_MAKER_CANVAS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerCanvasFullAccess'
        );

    public static readonly AWS_SUPPORT_PLANS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSSupportPlansReadOnlyAccess');

    public static readonly AWS_SUPPORT_PLANS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSSupportPlansFullAccess');

    public static readonly AWS_REFACTORING_TOOLKIT_SIDECAR_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSRefactoringToolkitSidecarPolicy'
        );

    public static readonly AWS_REFACTORING_TOOLKIT_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSRefactoringToolkitFullAccess'
        );

    public static readonly AWS_RESOURCE_EXPLORER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSResourceExplorerReadOnlyAccess'
        );

    public static readonly AWS_RESOURCE_EXPLORER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSResourceExplorerFullAccess');

    public static readonly AMAZON_WORKSPACES_PCA_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonWorkspacesPCAAccess');

    public static readonly AWS_PROTON_CODE_BUILD_PROVISIONING_BASIC_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSProtonCodeBuildProvisioningBasicAccess'
        );

    public static readonly AMAZON_EVENT_BRIDGE_SCHEDULER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEventBridgeSchedulerFullAccess'
        );

    public static readonly AMAZON_EVENT_BRIDGE_SCHEDULER_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEventBridgeSchedulerReadOnlyAccess'
        );

    public static readonly AWS_BACKUP_RESTORE_ACCESS_FOR_SAPHANA =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSBackupRestoreAccessForSAPHANA'
        );

    public static readonly AWS_BACKUP_DATA_TRANSFER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSBackupDataTransferAccess');

    public static readonly AWS_SYSTEMS_MANAGER_FOR_SAP_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSSystemsManagerForSAPFullAccess'
        );

    public static readonly AWS_SYSTEMS_MANAGER_FOR_SAP_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSSystemsManagerForSAPReadOnlyAccess'
        );

    public static readonly AWS_APPLICATION_MIGRATION_SSM_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSApplicationMigrationSSMAccess'
        );

    public static readonly OAM_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('OAMReadOnlyAccess');

    public static readonly OAM_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('OAMFullAccess');

    public static readonly AWS_XRAY_CROSS_ACCOUNT_SHARING_CONFIGURATION =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSXrayCrossAccountSharingConfiguration'
        );

    public static readonly CLOUD_WATCH_LOGS_CROSS_ACCOUNT_SHARING_CONFIGURATION =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchLogsCrossAccountSharingConfiguration'
        );

    public static readonly CLOUD_WATCH_CROSS_ACCOUNT_SHARING_CONFIGURATION =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchCrossAccountSharingConfiguration'
        );

    public static readonly AWS_WICKR_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSWickrFullAccess');

    public static readonly AMAZON_OMICS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonOmicsReadOnlyAccess');

    public static readonly AMAZON_SECURITY_LAKE_PERMISSIONS_BOUNDARY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSecurityLakePermissionsBoundary'
        );

    public static readonly AMAZON_SAGE_MAKER_MODEL_GOVERNANCE_USE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerModelGovernanceUseAccess'
        );

    public static readonly AMAZON_EVENT_BRIDGE_PIPES_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEventBridgePipesFullAccess'
        );

    public static readonly AMAZON_EVENT_BRIDGE_PIPES_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEventBridgePipesReadOnlyAccess'
        );

    public static readonly AMAZON_EVENT_BRIDGE_PIPES_OPERATOR_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEventBridgePipesOperatorAccess'
        );

    public static readonly AWS_OUTPOSTS_AUTHORIZE_SERVER_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSOutpostsAuthorizeServerPolicy'
        );

    public static readonly AWS_CLEAN_ROOMS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCleanRoomsReadOnlyAccess');

    public static readonly AWS_CLEAN_ROOMS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCleanRoomsFullAccess');

    public static readonly AWS_CLEAN_ROOMS_FULL_ACCESS_NO_QUERYING =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCleanRoomsFullAccessNoQuerying'
        );

    public static readonly AMAZON_DETECTIVE_MEMBER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonDetectiveMemberAccess');

    public static readonly AMAZON_DETECTIVE_INVESTIGATOR_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonDetectiveInvestigatorAccess'
        );

    public static readonly AMAZON_COGNITO_UNAUTHENTICATED_IDENTITIES =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCognitoUnauthenticatedIdentities'
        );

    public static readonly AWS_PRIVATE_CA_USER =
        ManagedPolicy.fromAwsManagedPolicyName('AWSPrivateCAUser');

    public static readonly AWS_PRIVATE_CA_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSPrivateCAFullAccess');

    public static readonly AWS_PRIVATE_CA_PRIVILEGED_USER =
        ManagedPolicy.fromAwsManagedPolicyName('AWSPrivateCAPrivilegedUser');

    public static readonly AWS_PRIVATE_CA_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSPrivateCAReadOnly');

    public static readonly AWS_PRIVATE_CA_AUDITOR =
        ManagedPolicy.fromAwsManagedPolicyName('AWSPrivateCAAuditor');

    public static readonly AMAZON_OMICS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonOmicsFullAccess');

    public static readonly AMAZON_DETECTIVE_ORGANIZATIONS_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonDetectiveOrganizationsAccess'
        );

    public static readonly MEDIA_CONNECT_GATEWAY_INSTANCE_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'MediaConnectGatewayInstanceRolePolicy'
        );

    public static readonly AMAZON_SAGE_MAKER_CANVAS_AI_SERVICES_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerCanvasAIServicesAccess'
        );

    public static readonly AWS_GROUND_STATION_AGENT_INSTANCE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSGroundStationAgentInstancePolicy'
        );

    public static readonly VPC_LATTICE_SERVICES_INVOKE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'VPCLatticeServicesInvokeAccess'
        );

    public static readonly VPC_LATTICE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('VPCLatticeReadOnlyAccess');

    public static readonly VPC_LATTICE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('VPCLatticeFullAccess');

    public static readonly AWS_MIGRATION_HUB_REFACTOR_SPACES_ENVIRONMENTS_WITHOUT_BRIDGES_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMigrationHubRefactorSpaces-EnvironmentsWithoutBridgesFullAccess'
        );

    public static readonly AMAZON_SAGE_MAKER_MODEL_REGISTRY_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerModelRegistryFullAccess'
        );

    public static readonly AMAZON_CODE_CATALYST_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCodeCatalystReadOnlyAccess'
        );

    public static readonly AMAZON_CODE_CATALYST_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonCodeCatalystFullAccess');

    public static readonly AMAZON_OPEN_SEARCH_INGESTION_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonOpenSearchIngestionReadOnlyAccess'
        );

    public static readonly AMAZON_OPEN_SEARCH_INGESTION_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonOpenSearchIngestionFullAccess'
        );

    public static readonly AMAZON_VPC_REACHABILITY_ANALYZER_PATH_COMPONENT_READ_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonVPCReachabilityAnalyzerPathComponentReadPolicy'
        );

    public static readonly AMAZON_CODE_GURU_SECURITY_SCAN_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCodeGuruSecurityScanAccess'
        );

    public static readonly AMAZON_CODE_GURU_SECURITY_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCodeGuruSecurityFullAccess'
        );

    public static readonly AMAZON_SECURITY_LAKE_ADMINISTRATOR =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSecurityLakeAdministrator'
        );

    public static readonly AMAZON_DOC_DB_ELASTIC_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonDocDBElasticFullAccess');

    public static readonly AMAZON_DOC_DB_ELASTIC_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonDocDBElasticReadOnlyAccess'
        );

    public static readonly AMAZON_VPC_REACHABILITY_ANALYZER_FULL_ACCESS_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonVPCReachabilityAnalyzerFullAccessPolicy'
        );

    public static readonly AMAZON_MACIE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonMacieReadOnlyAccess');

    public static readonly AMAZON_VPC_NETWORK_ACCESS_ANALYZER_FULL_ACCESS_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonVPCNetworkAccessAnalyzerFullAccessPolicy'
        );

    public static readonly AWS_RESILIENCE_HUB_ASSSESSMENT_EXECUTION_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSResilienceHubAsssessmentExecutionPolicy'
        );

    public static readonly AWS_APP_FABRIC_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAppFabricFullAccess');

    public static readonly AWS_APP_FABRIC_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSAppFabricReadOnlyAccess');

    public static readonly AMAZON_COGNITO_UN_AUTHED_IDENTITIES_SESSION_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonCognitoUnAuthedIdentitiesSessionPolicy'
        );

    public static readonly AWS_ELEMENTAL_MEDIA_PACKAGE_V2_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElementalMediaPackageV2FullAccess'
        );

    public static readonly AWS_ELEMENTAL_MEDIA_PACKAGE_V2_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElementalMediaPackageV2ReadOnly'
        );

    public static readonly AWS_HEALTH_IMAGING_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSHealthImagingFullAccess');

    public static readonly AWS_HEALTH_IMAGING_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSHealthImagingReadOnlyAccess'
        );

    public static readonly CLOUD_WATCH_FULL_ACCESS_V2 =
        ManagedPolicy.fromAwsManagedPolicyName('CloudWatchFullAccessV2');

    public static readonly AMAZON_RDS_PERFORMANCE_INSIGHTS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRDSPerformanceInsightsFullAccess'
        );

    public static readonly AWS_ENTITY_RESOLUTION_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSEntityResolutionConsoleFullAccess'
        );

    public static readonly AWS_ENTITY_RESOLUTION_CONSOLE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSEntityResolutionConsoleReadOnlyAccess'
        );

    public static readonly AWS_APPLICATION_MIGRATION_SERVICE_EC2_INSTANCE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSApplicationMigrationServiceEc2InstancePolicy'
        );

    public static readonly AMAZON_LAUNCH_WIZARD_FULL_ACCESS_V2 =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonLaunchWizardFullAccessV2'
        );

    public static readonly AMAZON_DATA_ZONE_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonDataZoneEnvironmentRolePermissionsBoundary'
        );

    public static readonly AMAZON_KEYSPACES_READ_ONLY_ACCESS_V2 =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonKeyspacesReadOnlyAccess_v2'
        );

    public static readonly AWS_ELASTIC_DISASTER_RECOVERY_LAUNCH_ACTIONS_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElasticDisasterRecoveryLaunchActionsPolicy'
        );

    public static readonly AMAZON_DATA_ZONE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonDataZoneFullAccess');

    public static readonly AMAZON_DATA_ZONE_REDSHIFT_GLUE_PROVISIONING_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonDataZoneRedshiftGlueProvisioningPolicy'
        );

    public static readonly AMAZON_DATA_ZONE_FULL_USER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonDataZoneFullUserAccess');

    public static readonly AMAZON_SAGE_MAKER_CANVAS_DATA_PREP_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerCanvasDataPrepFullAccess'
        );

    public static readonly AWS_IAM_IDENTITY_CENTER_ALLOW_LIST_FOR_IDENTITY_CONTEXT =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSIAMIdentityCenterAllowListForIdentityContext'
        );

    public static readonly PARTNER_CENTRAL_ACCOUNT_MANAGEMENT_USER_ROLE_ASSOCIATION =
        ManagedPolicy.fromAwsManagedPolicyName(
            'PartnerCentralAccountManagementUserRoleAssociation'
        );

    public static readonly AWS_INCIDENT_MANAGER_INCIDENT_ACCESS_SERVICE_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSIncidentManagerIncidentAccessServiceRolePolicy'
        );

    public static readonly AWS_RESOURCE_EXPLORER_ORGANIZATIONS_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSResourceExplorerOrganizationsAccess'
        );

    public static readonly AWS_REPOST_SPACE_SUPPORT_OPERATIONS_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSRepostSpaceSupportOperationsPolicy'
        );

    public static readonly AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS_V2 =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSElasticDisasterRecoveryConsoleFullAccess_v2'
        );

    public static readonly AMAZON_ONE_ENTERPRISE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonOneEnterpriseFullAccess');

    public static readonly AMAZON_ONE_ENTERPRISE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonOneEnterpriseReadOnlyAccess'
        );

    public static readonly AMAZON_ONE_ENTERPRISE_INSTALLER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonOneEnterpriseInstallerAccess'
        );

    public static readonly AMAZON_Q_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonQFullAccess');

    public static readonly AMAZON_SAGE_MAKER_CLUSTER_INSTANCE_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerClusterInstanceRolePolicy'
        );

    public static readonly AWS_CLEAN_ROOMS_ML_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCleanRoomsMLReadOnlyAccess');

    public static readonly AWS_CLEAN_ROOMS_ML_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCleanRoomsMLFullAccess');

    public static readonly NEPTUNE_GRAPH_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('NeptuneGraphReadOnlyAccess');

    public static readonly IVS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('IVSReadOnlyAccess');

    public static readonly AMAZON_BEDROCK_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonBedrockFullAccess');

    public static readonly AMAZON_BEDROCK_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonBedrockReadOnly');

    public static readonly COST_OPTIMIZATION_HUB_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CostOptimizationHubReadOnlyAccess'
        );

    public static readonly IVS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('IVSFullAccess');

    public static readonly COST_OPTIMIZATION_HUB_ADMIN_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CostOptimizationHubAdminAccess'
        );

    public static readonly AWS_ARTIFACT_REPORTS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSArtifactReportsReadOnlyAccess'
        );

    public static readonly AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT_V2 =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSGrafanaWorkspacePermissionManagementV2'
        );

    public static readonly AMAZON_INSPECTOR2_MANAGED_CIS_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonInspector2ManagedCisPolicy'
        );

    public static readonly AMAZON_SAGE_MAKER_CANVAS_BEDROCK_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerCanvasBedrockAccess'
        );

    public static readonly AMAZON_RDS_CUSTOM_INSTANCE_PROFILE_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRDSCustomInstanceProfileRolePolicy'
        );

    public static readonly AMAZON_TIMESTREAM_INFLUX_DB_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonTimestreamInfluxDBFullAccess'
        );

    public static readonly AWS_EC2_VSS_SNAPSHOT_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AWSEC2VssSnapshotPolicy');

    public static readonly AWS_QUICK_SIGHT_ASSET_BUNDLE_EXPORT_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSightAssetBundleExportPolicy'
        );

    public static readonly AWS_QUICK_SIGHT_ASSET_BUNDLE_IMPORT_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSightAssetBundleImportPolicy'
        );

    public static readonly AWS_DEADLINE_CLOUD_USER_ACCESS_FARMS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDeadlineCloud-UserAccessFarms'
        );

    public static readonly AWS_DEADLINE_CLOUD_USER_ACCESS_FLEETS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDeadlineCloud-UserAccessFleets'
        );

    public static readonly AWS_DEADLINE_CLOUD_USER_ACCESS_JOBS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDeadlineCloud-UserAccessJobs'
        );

    public static readonly AWS_DEADLINE_CLOUD_USER_ACCESS_QUEUES =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDeadlineCloud-UserAccessQueues'
        );

    public static readonly AWS_DEADLINE_CLOUD_FLEET_WORKER =
        ManagedPolicy.fromAwsManagedPolicyName('AWSDeadlineCloud-FleetWorker');

    public static readonly AWS_DEADLINE_CLOUD_WORKER_HOST =
        ManagedPolicy.fromAwsManagedPolicyName('AWSDeadlineCloud-WorkerHost');

    public static readonly AMAZON_DATA_ZONE_SAGE_MAKER_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonDataZoneSageMakerEnvironmentRolePermissionsBoundary'
        );

    public static readonly AMAZON_DATA_ZONE_SAGE_MAKER_PROVISIONING_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonDataZoneSageMakerProvisioningRolePolicy'
        );

    public static readonly AMAZON_DATA_ZONE_SAGE_MAKER_MANAGE_ACCESS_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonDataZoneSageMakerManageAccessRolePolicy'
        );

    public static readonly AMAZON_ROUTE53_PROFILES_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53ProfilesReadOnlyAccess'
        );

    public static readonly AMAZON_ROUTE53_PROFILES_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonRoute53ProfilesFullAccess'
        );

    public static readonly AMAZON_OPEN_SEARCH_DIRECT_QUERY_GLUE_CREATE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonOpenSearchDirectQueryGlueCreateAccess'
        );

    public static readonly EC2_FAST_LAUNCH_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('EC2FastLaunchFullAccess');

    public static readonly CLOUD_WATCH_APPLICATION_SIGNALS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchApplicationSignalsReadOnlyAccess'
        );

    public static readonly CLOUD_WATCH_APPLICATION_SIGNALS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchApplicationSignalsFullAccess'
        );

    public static readonly AMAZON_WORK_SPACES_SECURE_BROWSER_READ_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonWorkSpacesSecureBrowserReadOnly'
        );

    public static readonly AWS_QUICK_SETUP_PATCH_POLICY_BASELINE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupPatchPolicyBaselineAccess'
        );

    public static readonly AWS_SYSTEMS_MANAGER_ENABLE_CONFIG_RECORDING_EXECUTION_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSSystemsManagerEnableConfigRecordingExecutionPolicy'
        );

    public static readonly AWS_SYSTEMS_MANAGER_ENABLE_EXPLORER_EXECUTION_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSSystemsManagerEnableExplorerExecutionPolicy'
        );

    public static readonly AWS_QUICK_SETUP_DEV_OPS_GURU_PERMISSIONS_BOUNDARY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupDevOpsGuruPermissionsBoundary'
        );

    public static readonly AWS_QUICK_SETUP_PATCH_POLICY_PERMISSIONS_BOUNDARY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupPatchPolicyPermissionsBoundary'
        );

    public static readonly AWS_QUICK_SETUP_SSM_HOST_MGMT_PERMISSIONS_BOUNDARY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupSSMHostMgmtPermissionsBoundary'
        );

    public static readonly AWS_QUICK_SETUP_DISTRIBUTOR_PERMISSIONS_BOUNDARY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupDistributorPermissionsBoundary'
        );

    public static readonly AWS_QUICK_SETUP_CFGC_PACKS_PERMISSIONS_BOUNDARY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupCFGCPacksPermissionsBoundary'
        );

    public static readonly AWS_QUICK_SETUP_SCHEDULER_PERMISSIONS_BOUNDARY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupSchedulerPermissionsBoundary'
        );

    public static readonly AWS_QUICK_SETUP_DEPLOYMENT_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupDeploymentRolePolicy'
        );

    public static readonly AWS_QUICK_SETUP_PATCH_POLICY_DEPLOYMENT_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupPatchPolicyDeploymentRolePolicy'
        );

    public static readonly AMAZON_WORK_SPACES_POOL_SERVICE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonWorkSpacesPoolServiceAccess'
        );

    public static readonly AMAZON_Q_DEVELOPER_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonQDeveloperAccess');

    public static readonly AMAZON_WORK_SPACES_THIN_CLIENT_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonWorkSpacesThinClientReadOnlyAccess'
        );

    public static readonly AMAZON_SAGE_MAKER_CANVAS_EMR_SERVERLESS_EXECUTION_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerCanvasEMRServerlessExecutionRolePolicy'
        );

    public static readonly AMAZON_BEDROCK_STUDIO_PERMISSIONS_BOUNDARY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonBedrockStudioPermissionsBoundary'
        );

    public static readonly AMAZON_WORK_SPACES_THIN_CLIENT_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonWorkSpacesThinClientFullAccess'
        );

    public static readonly AWS_COMPROMISED_KEY_QUARANTINE_V3 =
        ManagedPolicy.fromAwsManagedPolicyName('AWSCompromisedKeyQuarantineV3');

    public static readonly AWS_DIRECTORY_SERVICE_DATA_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDirectoryServiceDataFullAccess'
        );

    public static readonly AWS_DIRECTORY_SERVICE_DATA_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDirectoryServiceDataReadOnlyAccess'
        );

    public static readonly AMAZON_EKS_WORKER_NODE_MINIMAL_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEKSWorkerNodeMinimalPolicy'
        );

    public static readonly AMAZON_EC2_CONTAINER_REGISTRY_PULL_ONLY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonEC2ContainerRegistryPullOnly'
        );

    public static readonly RESOURCE_GROUPS_TAGGING_API_TAG_UNTAG_SUPPORTED_RESOURCES =
        ManagedPolicy.fromAwsManagedPolicyName(
            'ResourceGroupsTaggingAPITagUntagSupportedResources'
        );

    public static readonly AMAZON_VERIFIED_PERMISSIONS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonVerifiedPermissionsFullAccess'
        );

    public static readonly AMAZON_VERIFIED_PERMISSIONS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonVerifiedPermissionsReadOnlyAccess'
        );

    public static readonly CLOUD_WATCH_LAMBDA_APPLICATION_SIGNALS_EXECUTION_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchLambdaApplicationSignalsExecutionRolePolicy'
        );

    public static readonly CLOUD_WATCH_INTERNET_MONITOR_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchInternetMonitorFullAccess'
        );

    public static readonly AWS_DATA_EXCHANGE_DATA_GRANT_OWNER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDataExchangeDataGrantOwnerFullAccess'
        );

    public static readonly AWS_DATA_EXCHANGE_DATA_GRANT_RECEIVER_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSDataExchangeDataGrantReceiverFullAccess'
        );

    public static readonly AMAZON_EKS_NETWORKING_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSNetworkingPolicy');

    public static readonly AMAZON_EKS_LOAD_BALANCING_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSLoadBalancingPolicy');

    public static readonly AMAZON_EKS_BLOCK_STORAGE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSBlockStoragePolicy');

    public static readonly AMAZON_EKS_COMPUTE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSComputePolicy');

    public static readonly GAME_LIFT_CONTAINER_FLEET_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('GameLiftContainerFleetPolicy');

    public static readonly CLOUD_WATCH_INTERNET_MONITOR_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchInternetMonitorReadOnlyAccess'
        );

    public static readonly AWS_PARTNER_CENTRAL_OPPORTUNITY_MANAGEMENT =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSPartnerCentralOpportunityManagement'
        );

    public static readonly AWS_PARTNER_CENTRAL_SANDBOX_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSPartnerCentralSandboxFullAccess'
        );

    public static readonly AMAZON_ECS_INFRASTRUCTURE_ROLE_POLICY_FOR_VPC_LATTICE =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonECSInfrastructureRolePolicyForVpcLattice'
        );

    public static readonly AWS_QUICK_SETUP_ENABLE_DHMC_EXECUTION_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupEnableDHMCExecutionPolicy'
        );

    public static readonly AWS_QUICK_SETUP_MANAGED_INSTANCE_PROFILE_EXECUTION_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupManagedInstanceProfileExecutionPolicy'
        );

    public static readonly AWS_QUICK_SETUP_SSM_LIFECYCLE_MANAGEMENT_EXECUTION_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupSSMLifecycleManagementExecutionPolicy'
        );

    public static readonly AWS_QUICK_SETUP_SSM_DEPLOYMENT_S3_BUCKET_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupSSMDeploymentS3BucketRolePolicy'
        );

    public static readonly AWS_QUICK_SETUP_ENABLE_AREX_EXECUTION_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupEnableAREXExecutionPolicy'
        );

    public static readonly AWS_QUICK_SETUP_SSM_MANAGE_RESOURCES_EXECUTION_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupSSMManageResourcesExecutionPolicy'
        );

    public static readonly AWS_QUICK_SETUP_SSM_DEPLOYMENT_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSQuickSetupSSMDeploymentRolePolicy'
        );

    public static readonly AWS_SSM_AUTOMATION_DIAGNOSIS_BUCKET_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWS-SSM-Automation-DiagnosisBucketPolicy'
        );

    public static readonly AWS_SSM_DIAGNOSIS_AUTOMATION_ADMINISTRATION_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWS-SSM-DiagnosisAutomation-AdministrationRolePolicy'
        );

    public static readonly AWS_SSM_DIAGNOSIS_AUTOMATION_EXECUTION_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWS-SSM-DiagnosisAutomation-ExecutionRolePolicy'
        );

    public static readonly AWS_SSM_DIAGNOSIS_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWS-SSM-DiagnosisAutomation-OperationalAccountAdministrationRolePolicy'
        );

    public static readonly AWS_SSM_REMEDIATION_AUTOMATION_ADMINISTRATION_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWS-SSM-RemediationAutomation-AdministrationRolePolicy'
        );

    public static readonly AWS_SSM_REMEDIATION_AUTOMATION_EXECUTION_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWS-SSM-RemediationAutomation-ExecutionRolePolicy'
        );

    public static readonly AWS_SSM_REMEDIATION_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWS-SSM-RemediationAutomation-OperationalAccountAdministrationRolePolicy'
        );

    public static readonly AWS_PARTNER_CENTRAL_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AWSPartnerCentralFullAccess');

    public static readonly AWS_MARKETPLACE_SELLER_OFFER_MANAGEMENT =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSMarketplaceSellerOfferManagement'
        );

    public static readonly SAGE_MAKER_STUDIO_PROJECT_ROLE_MACHINE_LEARNING_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'SageMakerStudioProjectRoleMachineLearningPolicy'
        );

    public static readonly SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_PERMISSIONS_BOUNDARY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'SageMakerStudioProjectUserRolePermissionsBoundary'
        );

    public static readonly SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'SageMakerStudioProjectUserRolePolicy'
        );

    public static readonly AWS_ARTIFACT_AGREEMENTS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSArtifactAgreementsFullAccess'
        );

    public static readonly AWS_ARTIFACT_AGREEMENTS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSArtifactAgreementsReadOnlyAccess'
        );

    public static readonly AWS_PARTNER_LED_SUPPORT_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSPartnerLedSupportReadOnlyAccess'
        );

    public static readonly SAGE_MAKER_STUDIO_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('SageMakerStudioFullAccess');

    public static readonly CLOUD_WATCH_OPEN_SEARCH_DASHBOARDS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchOpenSearchDashboardsFullAccess'
        );

    public static readonly CLOUD_WATCH_OPEN_SEARCH_DASHBOARD_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchOpenSearchDashboardAccess'
        );

    public static readonly CLOUD_WATCH_NETWORK_FLOW_MONITOR_AGENT_PUBLISH_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'CloudWatchNetworkFlowMonitorAgentPublishPolicy'
        );

    public static readonly AWS_SECURITY_INCIDENT_RESPONSE_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSSecurityIncidentResponseReadOnlyAccess'
        );

    public static readonly AWS_SECURITY_INCIDENT_RESPONSE_CASE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSSecurityIncidentResponseCaseFullAccess'
        );

    public static readonly AWS_SECURITY_INCIDENT_RESPONSE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSSecurityIncidentResponseFullAccess'
        );

    public static readonly AI_OPS_ASSISTANT_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AIOpsAssistantPolicy');

    public static readonly AI_OPS_CONSOLE_ADMIN_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName('AIOpsConsoleAdminPolicy');

    public static readonly AI_OPS_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AIOpsReadOnlyAccess');

    public static readonly AI_OPS_OPERATOR_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AIOpsOperatorAccess');

    public static readonly AMAZON_S3_TABLES_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonS3TablesReadOnlyAccess');

    public static readonly AMAZON_AURORA_DSQL_READ_ONLY_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonAuroraDSQLReadOnlyAccess'
        );

    public static readonly AMAZON_S3_TABLES_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonS3TablesFullAccess');

    public static readonly Q_BUSINESS_QUICKSIGHT_PLUGIN_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'QBusinessQuicksightPluginPolicy'
        );

    public static readonly AMAZON_AURORA_DSQL_CONSOLE_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonAuroraDSQLConsoleFullAccess'
        );

    public static readonly AMAZON_AURORA_DSQL_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName('AmazonAuroraDSQLFullAccess');

    public static readonly AMAZON_SAGE_MAKER_TRAINING_PLAN_CREATE_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerTrainingPlanCreateAccess'
        );

    public static readonly AMAZON_SAGE_MAKER_CANVAS_SM_DATA_SCIENCE_ASSISTANT_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerCanvasSMDataScienceAssistantAccess'
        );

    public static readonly AWS_PARTNER_CENTRAL_SELLING_RESOURCE_SNAPSHOT_JOB_EXECUTION_ROLE_POLICY =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSPartnerCentralSellingResourceSnapshotJobExecutionRolePolicy'
        );

    public static readonly AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_INDEXING =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSBackupServiceRolePolicyForIndexing'
        );

    public static readonly AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_ITEM_RESTORES =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AWSBackupServiceRolePolicyForItemRestores'
        );

    public static readonly AMAZON_SAGE_MAKER_PARTNER_APPS_FULL_ACCESS =
        ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSageMakerPartnerAppsFullAccess'
        );

    private constructor() {} // Prevents instantiation
}
/** End AWS Managed Policy */
