// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/** AWS Managed Policy */
export class AwsManagedPolicy {
    public static readonly ADMINISTRATOR_ACCESS = 'AdministratorAccess';

    public static readonly POWER_USER_ACCESS = 'PowerUserAccess';

    public static readonly READ_ONLY_ACCESS = 'ReadOnlyAccess';

    public static readonly AWS_CLOUD_FORMATION_READ_ONLY_ACCESS =
        'AWSCloudFormationReadOnlyAccess';

    public static readonly CLOUD_FRONT_FULL_ACCESS = 'CloudFrontFullAccess';

    public static readonly AWS_CLOUD_HSM_FULL_ACCESS = 'AWSCloudHSMFullAccess';

    public static readonly AWS_CLOUD_HSM_READ_ONLY_ACCESS =
        'AWSCloudHSMReadOnlyAccess';

    public static readonly RESOURCE_GROUPS_AND_TAG_EDITOR_FULL_ACCESS =
        'ResourceGroupsandTagEditorFullAccess';

    public static readonly RESOURCE_GROUPS_AND_TAG_EDITOR_READ_ONLY_ACCESS =
        'ResourceGroupsandTagEditorReadOnlyAccess';

    public static readonly CLOUD_FRONT_READ_ONLY_ACCESS =
        'CloudFrontReadOnlyAccess';

    public static readonly CLOUD_SEARCH_FULL_ACCESS = 'CloudSearchFullAccess';

    public static readonly CLOUD_SEARCH_READ_ONLY_ACCESS =
        'CloudSearchReadOnlyAccess';

    public static readonly CLOUD_WATCH_FULL_ACCESS = 'CloudWatchFullAccess';

    public static readonly CLOUD_WATCH_READ_ONLY_ACCESS =
        'CloudWatchReadOnlyAccess';

    public static readonly CLOUD_WATCH_LOGS_FULL_ACCESS =
        'CloudWatchLogsFullAccess';

    public static readonly CLOUD_WATCH_LOGS_READ_ONLY_ACCESS =
        'CloudWatchLogsReadOnlyAccess';

    public static readonly AWS_DIRECT_CONNECT_FULL_ACCESS =
        'AWSDirectConnectFullAccess';

    public static readonly AWS_DIRECT_CONNECT_READ_ONLY_ACCESS =
        'AWSDirectConnectReadOnlyAccess';

    public static readonly AMAZON_APP_STREAM_FULL_ACCESS =
        'AmazonAppStreamFullAccess';

    public static readonly AMAZON_APP_STREAM_READ_ONLY_ACCESS =
        'AmazonAppStreamReadOnlyAccess';

    public static readonly AMAZON_DYNAMO_DB_FULL_ACCESS =
        'AmazonDynamoDBFullAccess';

    public static readonly AMAZON_DYNAMO_DB_READ_ONLY_ACCESS =
        'AmazonDynamoDBReadOnlyAccess';

    public static readonly AMAZON_DYNAMO_DB_FULL_ACCESSWITH_DATA_PIPELINE =
        'AmazonDynamoDBFullAccesswithDataPipeline';

    public static readonly AMAZON_EC2_FULL_ACCESS = 'AmazonEC2FullAccess';

    public static readonly AMAZON_EC2_READ_ONLY_ACCESS =
        'AmazonEC2ReadOnlyAccess';

    public static readonly AMAZON_ELASTI_CACHE_FULL_ACCESS =
        'AmazonElastiCacheFullAccess';

    public static readonly AMAZON_ELASTI_CACHE_READ_ONLY_ACCESS =
        'AmazonElastiCacheReadOnlyAccess';

    public static readonly AMAZON_ELASTIC_MAP_REDUCE_FULL_ACCESS =
        'AmazonElasticMapReduceFullAccess';

    public static readonly AMAZON_ELASTIC_MAP_REDUCE_READ_ONLY_ACCESS =
        'AmazonElasticMapReduceReadOnlyAccess';

    public static readonly AMAZON_GLACIER_READ_ONLY_ACCESS =
        'AmazonGlacierReadOnlyAccess';

    public static readonly AMAZON_GLACIER_FULL_ACCESS =
        'AmazonGlacierFullAccess';

    public static readonly AMAZON_KINESIS_FULL_ACCESS =
        'AmazonKinesisFullAccess';

    public static readonly AMAZON_KINESIS_READ_ONLY_ACCESS =
        'AmazonKinesisReadOnlyAccess';

    public static readonly AWS_MARKETPLACE_READ_ONLY =
        'AWSMarketplaceRead-only';

    public static readonly AWS_MARKETPLACE_MANAGE_SUBSCRIPTIONS =
        'AWSMarketplaceManageSubscriptions';

    public static readonly AMAZON_MOBILE_ANALYTICS_FULL_ACCESS =
        'AmazonMobileAnalyticsFullAccess';

    public static readonly AMAZON_MOBILE_ANALYTICS_FINANCIAL_REPORT_ACCESS =
        'AmazonMobileAnalyticsFinancialReportAccess';

    public static readonly AMAZON_MOBILE_ANALYTICS_NON_FINANCIAL_REPORT_ACCESS =
        'AmazonMobileAnalyticsNon-financialReportAccess';

    public static readonly AMAZON_MOBILE_ANALYTICS_WRITE_ONLY_ACCESS =
        'AmazonMobileAnalyticsWriteOnlyAccess';

    public static readonly IAM_FULL_ACCESS = 'IAMFullAccess';

    public static readonly IAM_READ_ONLY_ACCESS = 'IAMReadOnlyAccess';

    public static readonly AWS_KEY_MANAGEMENT_SERVICE_POWER_USER =
        'AWSKeyManagementServicePowerUser';

    public static readonly AMAZON_WORK_MAIL_FULL_ACCESS =
        'AmazonWorkMailFullAccess';

    public static readonly AMAZON_WORK_MAIL_READ_ONLY_ACCESS =
        'AmazonWorkMailReadOnlyAccess';

    public static readonly AWS_IMPORT_EXPORT_READ_ONLY_ACCESS =
        'AWSImportExportReadOnlyAccess';

    public static readonly AWS_IMPORT_EXPORT_FULL_ACCESS =
        'AWSImportExportFullAccess';

    public static readonly AWS_LAMBDA_EXECUTE = 'AWSLambdaExecute';

    public static readonly AWS_LAMBDA_INVOCATION_DYNAMO_DB =
        'AWSLambdaInvocation-DynamoDB';

    public static readonly AMAZON_REDSHIFT_FULL_ACCESS =
        'AmazonRedshiftFullAccess';

    public static readonly AMAZON_REDSHIFT_READ_ONLY_ACCESS =
        'AmazonRedshiftReadOnlyAccess';

    public static readonly AMAZON_RDS_FULL_ACCESS = 'AmazonRDSFullAccess';

    public static readonly AMAZON_RDS_READ_ONLY_ACCESS =
        'AmazonRDSReadOnlyAccess';

    public static readonly AMAZON_ROUTE53_FULL_ACCESS =
        'AmazonRoute53FullAccess';

    public static readonly AMAZON_ROUTE53_READ_ONLY_ACCESS =
        'AmazonRoute53ReadOnlyAccess';

    public static readonly AMAZON_ROUTE53_DOMAINS_FULL_ACCESS =
        'AmazonRoute53DomainsFullAccess';

    public static readonly AMAZON_ROUTE53_DOMAINS_READ_ONLY_ACCESS =
        'AmazonRoute53DomainsReadOnlyAccess';

    public static readonly AMAZON_S3_FULL_ACCESS = 'AmazonS3FullAccess';

    public static readonly AMAZON_S3_READ_ONLY_ACCESS =
        'AmazonS3ReadOnlyAccess';

    public static readonly SECURITY_AUDIT = 'SecurityAudit';

    public static readonly AMAZON_SES_FULL_ACCESS = 'AmazonSESFullAccess';

    public static readonly AMAZON_SES_READ_ONLY_ACCESS =
        'AmazonSESReadOnlyAccess';

    public static readonly SIMPLE_WORKFLOW_FULL_ACCESS =
        'SimpleWorkflowFullAccess';

    public static readonly AMAZON_SNS_FULL_ACCESS = 'AmazonSNSFullAccess';

    public static readonly AMAZON_SNS_READ_ONLY_ACCESS =
        'AmazonSNSReadOnlyAccess';

    public static readonly AMAZON_SQS_FULL_ACCESS = 'AmazonSQSFullAccess';

    public static readonly AMAZON_SQS_READ_ONLY_ACCESS =
        'AmazonSQSReadOnlyAccess';

    public static readonly AWS_STORAGE_GATEWAY_FULL_ACCESS =
        'AWSStorageGatewayFullAccess';

    public static readonly AWS_STORAGE_GATEWAY_READ_ONLY_ACCESS =
        'AWSStorageGatewayReadOnlyAccess';

    public static readonly AWS_SUPPORT_ACCESS = 'AWSSupportAccess';

    public static readonly AWS_DIRECTORY_SERVICE_FULL_ACCESS =
        'AWSDirectoryServiceFullAccess';

    public static readonly AWS_DIRECTORY_SERVICE_READ_ONLY_ACCESS =
        'AWSDirectoryServiceReadOnlyAccess';

    public static readonly AMAZON_ZOCALO_FULL_ACCESS = 'AmazonZocaloFullAccess';

    public static readonly AMAZON_ZOCALO_READ_ONLY_ACCESS =
        'AmazonZocaloReadOnlyAccess';

    public static readonly AMAZON_VPC_FULL_ACCESS = 'AmazonVPCFullAccess';

    public static readonly AMAZON_VPC_READ_ONLY_ACCESS =
        'AmazonVPCReadOnlyAccess';

    public static readonly AWS_ACCOUNT_ACTIVITY_ACCESS =
        'AWSAccountActivityAccess';

    public static readonly AWS_ACCOUNT_USAGE_REPORT_ACCESS =
        'AWSAccountUsageReportAccess';

    public static readonly AWS_CONNECTOR = 'AWSConnector';

    public static readonly AWS_MARKETPLACE_FULL_ACCESS =
        'AWSMarketplaceFullAccess';

    public static readonly AWS_CONFIG_USER_ACCESS = 'AWSConfigUserAccess';

    public static readonly AMAZON_COGNITO_READ_ONLY = 'AmazonCognitoReadOnly';

    public static readonly AMAZON_COGNITO_POWER_USER = 'AmazonCognitoPowerUser';

    public static readonly AMAZON_COGNITO_DEVELOPER_AUTHENTICATED_IDENTITIES =
        'AmazonCognitoDeveloperAuthenticatedIdentities';

    public static readonly AMAZON_WORK_SPACES_APPLICATION_MANAGER_ADMIN_ACCESS =
        'AmazonWorkSpacesApplicationManagerAdminAccess';

    public static readonly AMAZON_MACHINE_LEARNING_BATCH_PREDICTIONS_ACCESS =
        'AmazonMachineLearningBatchPredictionsAccess';

    public static readonly AMAZON_MACHINE_LEARNING_CREATE_ONLY_ACCESS =
        'AmazonMachineLearningCreateOnlyAccess';

    public static readonly AMAZON_MACHINE_LEARNING_FULL_ACCESS =
        'AmazonMachineLearningFullAccess';

    public static readonly AMAZON_MACHINE_LEARNING_MANAGE_REAL_TIME_ENDPOINT_ONLY_ACCESS =
        'AmazonMachineLearningManageRealTimeEndpointOnlyAccess';

    public static readonly AMAZON_MACHINE_LEARNING_READ_ONLY_ACCESS =
        'AmazonMachineLearningReadOnlyAccess';

    public static readonly AMAZON_MACHINE_LEARNING_REAL_TIME_PREDICTION_ONLY_ACCESS =
        'AmazonMachineLearningRealTimePredictionOnlyAccess';

    public static readonly AWS_CODE_DEPLOY_FULL_ACCESS =
        'AWSCodeDeployFullAccess';

    public static readonly AWS_CODE_DEPLOY_DEPLOYER_ACCESS =
        'AWSCodeDeployDeployerAccess';

    public static readonly AWS_CODE_DEPLOY_READ_ONLY_ACCESS =
        'AWSCodeDeployReadOnlyAccess';

    public static readonly AMAZON_ELASTIC_FILE_SYSTEM_FULL_ACCESS =
        'AmazonElasticFileSystemFullAccess';

    public static readonly AMAZON_ELASTIC_FILE_SYSTEM_READ_ONLY_ACCESS =
        'AmazonElasticFileSystemReadOnlyAccess';

    public static readonly AMAZON_SSM_FULL_ACCESS = 'AmazonSSMFullAccess';

    public static readonly AMAZON_SSM_READ_ONLY_ACCESS =
        'AmazonSSMReadOnlyAccess';

    public static readonly CLOUD_WATCH_ACTIONS_EC2_ACCESS =
        'CloudWatchActionsEC2Access';

    public static readonly AWS_CODE_PIPELINE_CUSTOM_ACTION_ACCESS =
        'AWSCodePipelineCustomActionAccess';

    public static readonly AWS_CODE_COMMIT_FULL_ACCESS =
        'AWSCodeCommitFullAccess';

    public static readonly AWS_CODE_COMMIT_READ_ONLY = 'AWSCodeCommitReadOnly';

    public static readonly AWS_CODE_COMMIT_POWER_USER =
        'AWSCodeCommitPowerUser';

    public static readonly IAM_USER_SSH_KEYS = 'IAMUserSSHKeys';

    public static readonly AMAZON_API_GATEWAY_ADMINISTRATOR =
        'AmazonAPIGatewayAdministrator';

    public static readonly AMAZON_API_GATEWAY_INVOKE_FULL_ACCESS =
        'AmazonAPIGatewayInvokeFullAccess';

    public static readonly AWS_DEVICE_FARM_FULL_ACCESS =
        'AWSDeviceFarmFullAccess';

    public static readonly AMAZON_DRSVPC_MANAGEMENT = 'AmazonDRSVPCManagement';

    public static readonly AMAZON_WORK_SPACES_ADMIN = 'AmazonWorkSpacesAdmin';

    public static readonly AMAZON_ES_FULL_ACCESS = 'AmazonESFullAccess';

    public static readonly AMAZON_ES_READ_ONLY_ACCESS =
        'AmazonESReadOnlyAccess';

    public static readonly AWS_WAF_READ_ONLY_ACCESS = 'AWSWAFReadOnlyAccess';

    public static readonly AWS_WAF_FULL_ACCESS = 'AWSWAFFullAccess';

    public static readonly AMAZON_INSPECTOR_READ_ONLY_ACCESS =
        'AmazonInspectorReadOnlyAccess';

    public static readonly AMAZON_INSPECTOR_FULL_ACCESS =
        'AmazonInspectorFullAccess';

    public static readonly AMAZON_KINESIS_FIREHOSE_READ_ONLY_ACCESS =
        'AmazonKinesisFirehoseReadOnlyAccess';

    public static readonly AMAZON_KINESIS_FIREHOSE_FULL_ACCESS =
        'AmazonKinesisFirehoseFullAccess';

    public static readonly AWS_IO_T_FULL_ACCESS = 'AWSIoTFullAccess';

    public static readonly AWS_IO_T_DATA_ACCESS = 'AWSIoTDataAccess';

    public static readonly AWS_IO_T_CONFIG_ACCESS = 'AWSIoTConfigAccess';

    public static readonly AWS_IO_T_CONFIG_READ_ONLY_ACCESS =
        'AWSIoTConfigReadOnlyAccess';

    public static readonly AMAZON_MECHANICAL_TURK_FULL_ACCESS =
        'AmazonMechanicalTurkFullAccess';

    public static readonly AMAZON_MECHANICAL_TURK_READ_ONLY =
        'AmazonMechanicalTurkReadOnly';

    public static readonly AMAZON_EC2_CONTAINER_REGISTRY_READ_ONLY =
        'AmazonEC2ContainerRegistryReadOnly';

    public static readonly AMAZON_EC2_CONTAINER_REGISTRY_POWER_USER =
        'AmazonEC2ContainerRegistryPowerUser';

    public static readonly AMAZON_EC2_CONTAINER_REGISTRY_FULL_ACCESS =
        'AmazonEC2ContainerRegistryFullAccess';

    public static readonly CLOUD_WATCH_EVENTS_READ_ONLY_ACCESS =
        'CloudWatchEventsReadOnlyAccess';

    public static readonly CLOUD_WATCH_EVENTS_FULL_ACCESS =
        'CloudWatchEventsFullAccess';

    public static readonly AWS_CERTIFICATE_MANAGER_FULL_ACCESS =
        'AWSCertificateManagerFullAccess';

    public static readonly AWS_CERTIFICATE_MANAGER_READ_ONLY =
        'AWSCertificateManagerReadOnly';

    public static readonly AWS_ELASTIC_BEANSTALK_WEB_TIER =
        'AWSElasticBeanstalkWebTier';

    public static readonly AWS_ELASTIC_BEANSTALK_WORKER_TIER =
        'AWSElasticBeanstalkWorkerTier';

    public static readonly AWS_ELASTIC_BEANSTALK_MULTICONTAINER_DOCKER =
        'AWSElasticBeanstalkMulticontainerDocker';

    public static readonly AWS_MARKETPLACE_METERING_FULL_ACCESS =
        'AWSMarketplaceMeteringFullAccess';

    public static readonly AWS_APPLICATION_DISCOVERY_SERVICE_FULL_ACCESS =
        'AWSApplicationDiscoveryServiceFullAccess';

    public static readonly AWS_APPLICATION_DISCOVERY_AGENT_ACCESS =
        'AWSApplicationDiscoveryAgentAccess';

    public static readonly AWS_OPS_WORKS_INSTANCE_REGISTRATION =
        'AWSOpsWorksInstanceRegistration';

    public static readonly AWS_CODE_PIPELINE_APPROVER_ACCESS =
        'AWSCodePipelineApproverAccess';

    public static readonly AWS_AGENTLESS_DISCOVERY_SERVICE =
        'AWSAgentlessDiscoveryService';

    public static readonly AMAZON_KINESIS_ANALYTICS_READ_ONLY =
        'AmazonKinesisAnalyticsReadOnly';

    public static readonly AMAZON_KINESIS_ANALYTICS_FULL_ACCESS =
        'AmazonKinesisAnalyticsFullAccess';

    public static readonly SERVER_MIGRATION_CONNECTOR =
        'ServerMigrationConnector';

    public static readonly IAM_USER_CHANGE_PASSWORD = 'IAMUserChangePassword';

    public static readonly AWS_OPS_WORKS_CM_INSTANCE_PROFILE_ROLE =
        'AWSOpsWorksCMInstanceProfileRole';

    public static readonly AMAZON_REKOGNITION_FULL_ACCESS =
        'AmazonRekognitionFullAccess';

    public static readonly AMAZON_REKOGNITION_READ_ONLY_ACCESS =
        'AmazonRekognitionReadOnlyAccess';

    public static readonly AMAZON_ATHENA_FULL_ACCESS = 'AmazonAthenaFullAccess';

    public static readonly AMAZON_POLLY_FULL_ACCESS = 'AmazonPollyFullAccess';

    public static readonly AMAZON_POLLY_READ_ONLY_ACCESS =
        'AmazonPollyReadOnlyAccess';

    public static readonly AWS_XRAY_WRITE_ONLY_ACCESS =
        'AWSXrayWriteOnlyAccess';

    public static readonly AWS_XRAY_READ_ONLY_ACCESS = 'AWSXrayReadOnlyAccess';

    public static readonly AWS_XRAY_FULL_ACCESS = 'AWSXrayFullAccess';

    public static readonly AWS_CODE_BUILD_DEVELOPER_ACCESS =
        'AWSCodeBuildDeveloperAccess';

    public static readonly AWS_CODE_BUILD_READ_ONLY_ACCESS =
        'AWSCodeBuildReadOnlyAccess';

    public static readonly AWS_CODE_BUILD_ADMIN_ACCESS =
        'AWSCodeBuildAdminAccess';

    public static readonly AWS_HEALTH_FULL_ACCESS = 'AWSHealthFullAccess';

    public static readonly AWS_BATCH_FULL_ACCESS = 'AWSBatchFullAccess';

    public static readonly IAM_SELF_MANAGE_SERVICE_SPECIFIC_CREDENTIALS =
        'IAMSelfManageServiceSpecificCredentials';

    public static readonly AWS_STEP_FUNCTIONS_READ_ONLY_ACCESS =
        'AWSStepFunctionsReadOnlyAccess';

    public static readonly AWS_STEP_FUNCTIONS_FULL_ACCESS =
        'AWSStepFunctionsFullAccess';

    public static readonly AWS_STEP_FUNCTIONS_CONSOLE_FULL_ACCESS =
        'AWSStepFunctionsConsoleFullAccess';

    public static readonly AUTO_SCALING_FULL_ACCESS = 'AutoScalingFullAccess';

    public static readonly AUTO_SCALING_READ_ONLY_ACCESS =
        'AutoScalingReadOnlyAccess';

    public static readonly AUTO_SCALING_CONSOLE_FULL_ACCESS =
        'AutoScalingConsoleFullAccess';

    public static readonly AUTO_SCALING_CONSOLE_READ_ONLY_ACCESS =
        'AutoScalingConsoleReadOnlyAccess';

    public static readonly AWS_DATA_PIPELINE_FULL_ACCESS =
        'AWSDataPipeline_FullAccess';

    public static readonly AWS_DATA_PIPELINE_POWER_USER =
        'AWSDataPipeline_PowerUser';

    public static readonly AWS_ELASTIC_BEANSTALK_CUSTOM_PLATFORMFOR_EC2_ROLE =
        'AWSElasticBeanstalkCustomPlatformforEC2Role';

    public static readonly AMAZON_CLOUD_DIRECTORY_FULL_ACCESS =
        'AmazonCloudDirectoryFullAccess';

    public static readonly AMAZON_CLOUD_DIRECTORY_READ_ONLY_ACCESS =
        'AmazonCloudDirectoryReadOnlyAccess';

    public static readonly AWS_MARKETPLACE_GET_ENTITLEMENTS =
        'AWSMarketplaceGetEntitlements';

    public static readonly AWS_OPS_WORKS_CLOUD_WATCH_LOGS =
        'AWSOpsWorksCloudWatchLogs';

    public static readonly AMAZON_LEX_RUN_BOTS_ONLY = 'AmazonLexRunBotsOnly';

    public static readonly AMAZON_LEX_READ_ONLY = 'AmazonLexReadOnly';

    public static readonly AMAZON_LEX_FULL_ACCESS = 'AmazonLexFullAccess';

    public static readonly AWS_CODE_STAR_FULL_ACCESS = 'AWSCodeStarFullAccess';

    public static readonly AWS_GREENGRASS_FULL_ACCESS =
        'AWSGreengrassFullAccess';

    public static readonly AMAZON_VPC_CROSS_ACCOUNT_NETWORK_INTERFACE_OPERATIONS =
        'AmazonVPCCrossAccountNetworkInterfaceOperations';

    public static readonly AMAZON_SSM_AUTOMATION_APPROVER_ACCESS =
        'AmazonSSMAutomationApproverAccess';

    public static readonly AWS_GLUE_CONSOLE_FULL_ACCESS =
        'AWSGlueConsoleFullAccess';

    public static readonly AWS_MIGRATION_HUB_FULL_ACCESS =
        'AWSMigrationHubFullAccess';

    public static readonly AMAZON_MACIE_FULL_ACCESS = 'AmazonMacieFullAccess';

    public static readonly AMAZON_CHIME_READ_ONLY = 'AmazonChimeReadOnly';

    public static readonly AMAZON_CHIME_FULL_ACCESS = 'AmazonChimeFullAccess';

    public static readonly AMAZON_CHIME_USER_MANAGEMENT =
        'AmazonChimeUserManagement';

    public static readonly AMAZON_ECS_FULL_ACCESS = 'AmazonECS_FullAccess';

    public static readonly AWS_PRICE_LIST_SERVICE_FULL_ACCESS =
        'AWSPriceListServiceFullAccess';

    public static readonly AMAZON_MQ_FULL_ACCESS = 'AmazonMQFullAccess';

    public static readonly AMAZON_MQ_READ_ONLY_ACCESS =
        'AmazonMQReadOnlyAccess';

    public static readonly AMAZON_GUARD_DUTY_READ_ONLY_ACCESS =
        'AmazonGuardDutyReadOnlyAccess';

    public static readonly AMAZON_GUARD_DUTY_FULL_ACCESS =
        'AmazonGuardDutyFullAccess';

    public static readonly AMAZON_SAGE_MAKER_READ_ONLY =
        'AmazonSageMakerReadOnly';

    public static readonly AMAZON_SAGE_MAKER_FULL_ACCESS =
        'AmazonSageMakerFullAccess';

    public static readonly AMAZON_FREE_RTOS_FULL_ACCESS =
        'AmazonFreeRTOSFullAccess';

    public static readonly AWS_DEEP_LENS_LAMBDA_FUNCTION_ACCESS_POLICY =
        'AWSDeepLensLambdaFunctionAccessPolicy';

    public static readonly AWS_QUICK_SIGHT_IO_T_ANALYTICS_ACCESS =
        'AWSQuickSightIoTAnalyticsAccess';

    public static readonly COMPREHEND_FULL_ACCESS = 'ComprehendFullAccess';

    public static readonly COMPREHEND_READ_ONLY = 'ComprehendReadOnly';

    public static readonly TRANSLATE_READ_ONLY = 'TranslateReadOnly';

    public static readonly AWS_CLOUD9_USER = 'AWSCloud9User';

    public static readonly AWS_CLOUD9_ADMINISTRATOR = 'AWSCloud9Administrator';

    public static readonly AWS_CLOUD9_ENVIRONMENT_MEMBER =
        'AWSCloud9EnvironmentMember';

    public static readonly ALEXA_FOR_BUSINESS_FULL_ACCESS =
        'AlexaForBusinessFullAccess';

    public static readonly ALEXA_FOR_BUSINESS_READ_ONLY_ACCESS =
        'AlexaForBusinessReadOnlyAccess';

    public static readonly ALEXA_FOR_BUSINESS_DEVICE_SETUP =
        'AlexaForBusinessDeviceSetup';

    public static readonly ALEXA_FOR_BUSINESS_GATEWAY_EXECUTION =
        'AlexaForBusinessGatewayExecution';

    public static readonly AMAZON_KINESIS_VIDEO_STREAMS_READ_ONLY_ACCESS =
        'AmazonKinesisVideoStreamsReadOnlyAccess';

    public static readonly AMAZON_KINESIS_VIDEO_STREAMS_FULL_ACCESS =
        'AmazonKinesisVideoStreamsFullAccess';

    public static readonly AWS_ELEMENTAL_MEDIA_PACKAGE_FULL_ACCESS =
        'AWSElementalMediaPackageFullAccess';

    public static readonly AWS_ELEMENTAL_MEDIA_PACKAGE_READ_ONLY =
        'AWSElementalMediaPackageReadOnly';

    public static readonly AMAZON_ROUTE53_AUTO_NAMING_READ_ONLY_ACCESS =
        'AmazonRoute53AutoNamingReadOnlyAccess';

    public static readonly AMAZON_ROUTE53_AUTO_NAMING_FULL_ACCESS =
        'AmazonRoute53AutoNamingFullAccess';

    public static readonly AWS_SERVICE_CATALOG_ADMIN_FULL_ACCESS =
        'AWSServiceCatalogAdminFullAccess';

    public static readonly AWS_SERVICE_CATALOG_END_USER_FULL_ACCESS =
        'AWSServiceCatalogEndUserFullAccess';

    public static readonly AMAZON_ES_COGNITO_ACCESS = 'AmazonESCognitoAccess';

    public static readonly AWS_ELEMENTAL_MEDIA_STORE_FULL_ACCESS =
        'AWSElementalMediaStoreFullAccess';

    public static readonly CLOUD_WATCH_AGENT_ADMIN_POLICY =
        'CloudWatchAgentAdminPolicy';

    public static readonly CLOUD_WATCH_AGENT_SERVER_POLICY =
        'CloudWatchAgentServerPolicy';

    public static readonly AWS_RESOURCE_GROUPS_READ_ONLY_ACCESS =
        'AWSResourceGroupsReadOnlyAccess';

    public static readonly AWS_ELEMENTAL_MEDIA_STORE_READ_ONLY =
        'AWSElementalMediaStoreReadOnly';

    public static readonly AMAZON_ROUTE53_AUTO_NAMING_REGISTRANT_ACCESS =
        'AmazonRoute53AutoNamingRegistrantAccess';

    public static readonly AWS_APP_SYNC_ADMINISTRATOR =
        'AWSAppSyncAdministrator';

    public static readonly AWS_APP_SYNC_SCHEMA_AUTHOR =
        'AWSAppSyncSchemaAuthor';

    public static readonly AWS_APP_SYNC_INVOKE_FULL_ACCESS =
        'AWSAppSyncInvokeFullAccess';

    public static readonly AMAZON_TRANSCRIBE_READ_ONLY_ACCESS =
        'AmazonTranscribeReadOnlyAccess';

    public static readonly AMAZON_TRANSCRIBE_FULL_ACCESS =
        'AmazonTranscribeFullAccess';

    public static readonly SECRETS_MANAGER_READ_WRITE =
        'SecretsManagerReadWrite';

    public static readonly AMAZON_ELASTIC_TRANSCODER_FULL_ACCESS =
        'AmazonElasticTranscoder_FullAccess';

    public static readonly AWS_FM_ADMIN_FULL_ACCESS = 'AWSFMAdminFullAccess';

    public static readonly AWS_FM_ADMIN_READ_ONLY_ACCESS =
        'AWSFMAdminReadOnlyAccess';

    public static readonly AWS_FM_MEMBER_READ_ONLY_ACCESS =
        'AWSFMMemberReadOnlyAccess';

    public static readonly AWS_IO_T1_CLICK_READ_ONLY_ACCESS =
        'AWSIoT1ClickReadOnlyAccess';

    public static readonly AWS_IO_T1_CLICK_FULL_ACCESS =
        'AWSIoT1ClickFullAccess';

    public static readonly AMAZON_EKS_CLUSTER_POLICY = 'AmazonEKSClusterPolicy';

    public static readonly AMAZON_EKS_CNI_POLICY = 'AmazonEKS_CNI_Policy';

    public static readonly AMAZON_EKS_SERVICE_POLICY = 'AmazonEKSServicePolicy';

    public static readonly AMAZON_EKS_WORKER_NODE_POLICY =
        'AmazonEKSWorkerNodePolicy';

    public static readonly NEPTUNE_READ_ONLY_ACCESS = 'NeptuneReadOnlyAccess';

    public static readonly NEPTUNE_FULL_ACCESS = 'NeptuneFullAccess';

    public static readonly AMAZON_ELASTIC_TRANSCODER_READ_ONLY_ACCESS =
        'AmazonElasticTranscoder_ReadOnlyAccess';

    public static readonly AMAZON_ELASTIC_TRANSCODER_JOBS_SUBMITTER =
        'AmazonElasticTranscoder_JobsSubmitter';

    public static readonly AWS_IO_T_ANALYTICS_READ_ONLY_ACCESS =
        'AWSIoTAnalyticsReadOnlyAccess';

    public static readonly AWS_IO_T_ANALYTICS_FULL_ACCESS =
        'AWSIoTAnalyticsFullAccess';

    public static readonly NEPTUNE_CONSOLE_FULL_ACCESS =
        'NeptuneConsoleFullAccess';

    public static readonly AWS_ELEMENTAL_MEDIA_CONVERT_READ_ONLY =
        'AWSElementalMediaConvertReadOnly';

    public static readonly AWS_ELEMENTAL_MEDIA_CONVERT_FULL_ACCESS =
        'AWSElementalMediaConvertFullAccess';

    public static readonly AWS_SSO_READ_ONLY = 'AWSSSOReadOnly';

    public static readonly AWS_SSO_MASTER_ACCOUNT_ADMINISTRATOR =
        'AWSSSOMasterAccountAdministrator';

    public static readonly AWS_SSO_MEMBER_ACCOUNT_ADMINISTRATOR =
        'AWSSSOMemberAccountAdministrator';

    public static readonly AWS_MARKETPLACE_IMAGE_BUILD_FULL_ACCESS =
        'AWSMarketplaceImageBuildFullAccess';

    public static readonly AWS_DISCOVERY_CONTINUOUS_EXPORT_FIREHOSE_POLICY =
        'AWSDiscoveryContinuousExportFirehosePolicy';

    public static readonly AWS_X_RAY_DAEMON_WRITE_ACCESS =
        'AWSXRayDaemonWriteAccess';

    public static readonly ELASTIC_LOAD_BALANCING_READ_ONLY =
        'ElasticLoadBalancingReadOnly';

    public static readonly ELASTIC_LOAD_BALANCING_FULL_ACCESS =
        'ElasticLoadBalancingFullAccess';

    public static readonly AMAZON_REDSHIFT_QUERY_EDITOR =
        'AmazonRedshiftQueryEditor';

    public static readonly AWS_GLUE_CONSOLE_SAGE_MAKER_NOTEBOOK_FULL_ACCESS =
        'AWSGlueConsoleSageMakerNotebookFullAccess';

    public static readonly AMAZON_CONNECT_READ_ONLY_ACCESS =
        'AmazonConnectReadOnlyAccess';

    public static readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_AUDITOR =
        'AWSCertificateManagerPrivateCAAuditor';

    public static readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_USER =
        'AWSCertificateManagerPrivateCAUser';

    public static readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_FULL_ACCESS =
        'AWSCertificateManagerPrivateCAFullAccess';

    public static readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_READ_ONLY =
        'AWSCertificateManagerPrivateCAReadOnly';

    public static readonly AWS_GREENGRASS_READ_ONLY_ACCESS =
        'AWSGreengrassReadOnlyAccess';

    public static readonly AWS_SSO_DIRECTORY_READ_ONLY =
        'AWSSSODirectoryReadOnly';

    public static readonly AWS_SSO_DIRECTORY_ADMINISTRATOR =
        'AWSSSODirectoryAdministrator';

    public static readonly AWS_ORGANIZATIONS_FULL_ACCESS =
        'AWSOrganizationsFullAccess';

    public static readonly AWS_ORGANIZATIONS_READ_ONLY_ACCESS =
        'AWSOrganizationsReadOnlyAccess';

    public static readonly AMAZON_RDS_DATA_FULL_ACCESS =
        'AmazonRDSDataFullAccess';

    public static readonly AWS_ROBO_MAKER_READ_ONLY_ACCESS =
        'AWSRoboMakerReadOnlyAccess';

    public static readonly AWS_ROBO_MAKER_SERVICE_ROLE_POLICY =
        'AWSRoboMakerServiceRolePolicy';

    public static readonly GLOBAL_ACCELERATOR_READ_ONLY_ACCESS =
        'GlobalAcceleratorReadOnlyAccess';

    public static readonly GLOBAL_ACCELERATOR_FULL_ACCESS =
        'GlobalAcceleratorFullAccess';

    public static readonly AWS_PRIVATE_MARKETPLACE_ADMIN_FULL_ACCESS =
        'AWSPrivateMarketplaceAdminFullAccess';

    public static readonly COMPREHEND_MEDICAL_FULL_ACCESS =
        'ComprehendMedicalFullAccess';

    public static readonly AWS_CODE_DEPLOY_ROLE_FOR_ECS =
        'AWSCodeDeployRoleForECS';

    public static readonly AWS_CODE_DEPLOY_ROLE_FOR_ECS_LIMITED =
        'AWSCodeDeployRoleForECSLimited';

    public static readonly TRANSLATE_FULL_ACCESS = 'TranslateFullAccess';

    public static readonly AWS_SECURITY_HUB_FULL_ACCESS =
        'AWSSecurityHubFullAccess';

    public static readonly AWS_SECURITY_HUB_READ_ONLY_ACCESS =
        'AWSSecurityHubReadOnlyAccess';

    public static readonly AMAZON_F_SX_READ_ONLY_ACCESS =
        'AmazonFSxReadOnlyAccess';

    public static readonly AMAZON_F_SX_FULL_ACCESS = 'AmazonFSxFullAccess';

    public static readonly AMAZON_F_SX_CONSOLE_READ_ONLY_ACCESS =
        'AmazonFSxConsoleReadOnlyAccess';

    public static readonly AMAZON_F_SX_CONSOLE_FULL_ACCESS =
        'AmazonFSxConsoleFullAccess';

    public static readonly AMAZON_TEXTRACT_FULL_ACCESS =
        'AmazonTextractFullAccess';

    public static readonly AWS_CLOUD_MAP_READ_ONLY_ACCESS =
        'AWSCloudMapReadOnlyAccess';

    public static readonly AWS_CLOUD_MAP_FULL_ACCESS = 'AWSCloudMapFullAccess';

    public static readonly AWS_CLOUD_MAP_DISCOVER_INSTANCE_ACCESS =
        'AWSCloudMapDiscoverInstanceAccess';

    public static readonly AWS_CLOUD_MAP_REGISTER_INSTANCE_ACCESS =
        'AWSCloudMapRegisterInstanceAccess';

    public static readonly WELL_ARCHITECTED_CONSOLE_FULL_ACCESS =
        'WellArchitectedConsoleFullAccess';

    public static readonly WELL_ARCHITECTED_CONSOLE_READ_ONLY_ACCESS =
        'WellArchitectedConsoleReadOnlyAccess';

    public static readonly AWS_IO_T_SITE_WISE_FULL_ACCESS =
        'AWSIoTSiteWiseFullAccess';

    public static readonly AWS_IO_T_SITE_WISE_READ_ONLY_ACCESS =
        'AWSIoTSiteWiseReadOnlyAccess';

    public static readonly AMAZON_MQ_API_READ_ONLY_ACCESS =
        'AmazonMQApiReadOnlyAccess';

    public static readonly AMAZON_MQ_API_FULL_ACCESS = 'AmazonMQApiFullAccess';

    public static readonly AMAZON_DOC_DB_FULL_ACCESS = 'AmazonDocDBFullAccess';

    public static readonly AMAZON_DOC_DB_READ_ONLY_ACCESS =
        'AmazonDocDBReadOnlyAccess';

    public static readonly AMAZON_DOC_DB_CONSOLE_FULL_ACCESS =
        'AmazonDocDBConsoleFullAccess';

    public static readonly AWS_IO_T_EVENTS_READ_ONLY_ACCESS =
        'AWSIoTEventsReadOnlyAccess';

    public static readonly AWS_IO_T_EVENTS_FULL_ACCESS =
        'AWSIoTEventsFullAccess';

    public static readonly AMAZON_MSK_FULL_ACCESS = 'AmazonMSKFullAccess';

    public static readonly AMAZON_MSK_READ_ONLY_ACCESS =
        'AmazonMSKReadOnlyAccess';

    public static readonly AMAZON_FORECAST_FULL_ACCESS =
        'AmazonForecastFullAccess';

    public static readonly AWS_DATA_SYNC_READ_ONLY_ACCESS =
        'AWSDataSyncReadOnlyAccess';

    public static readonly AWS_DATA_SYNC_FULL_ACCESS = 'AWSDataSyncFullAccess';

    public static readonly WORK_LINK_SERVICE_ROLE_POLICY =
        'WorkLinkServiceRolePolicy';

    public static readonly AWS_DEEP_RACER_CLOUD_FORMATION_ACCESS_POLICY =
        'AWSDeepRacerCloudFormationAccessPolicy';

    public static readonly AWS_DEEP_RACER_ROBO_MAKER_ACCESS_POLICY =
        'AWSDeepRacerRoboMakerAccessPolicy';

    public static readonly AMAZON_SSM_MANAGED_INSTANCE_CORE =
        'AmazonSSMManagedInstanceCore';

    public static readonly AMAZON_SSM_DIRECTORY_SERVICE_ACCESS =
        'AmazonSSMDirectoryServiceAccess';

    public static readonly AWS_IQ_FULL_ACCESS = 'AWSIQFullAccess';

    public static readonly AWS_APP_MESH_FULL_ACCESS = 'AWSAppMeshFullAccess';

    public static readonly AWS_APP_MESH_READ_ONLY = 'AWSAppMeshReadOnly';

    public static readonly AMAZON_MANAGED_BLOCKCHAIN_CONSOLE_FULL_ACCESS =
        'AmazonManagedBlockchainConsoleFullAccess';

    public static readonly AMAZON_MANAGED_BLOCKCHAIN_FULL_ACCESS =
        'AmazonManagedBlockchainFullAccess';

    public static readonly AMAZON_MANAGED_BLOCKCHAIN_READ_ONLY_ACCESS =
        'AmazonManagedBlockchainReadOnlyAccess';

    public static readonly AWS_DENY_ALL = 'AWSDenyAll';

    public static readonly AMAZON_ROUTE53_RESOLVER_FULL_ACCESS =
        'AmazonRoute53ResolverFullAccess';

    public static readonly AMAZON_ROUTE53_RESOLVER_READ_ONLY_ACCESS =
        'AmazonRoute53ResolverReadOnlyAccess';

    public static readonly AWS_IO_T_SITE_WISE_CONSOLE_FULL_ACCESS =
        'AWSIoTSiteWiseConsoleFullAccess';

    public static readonly AWS_RESOURCE_ACCESS_MANAGER_FULL_ACCESS =
        'AWSResourceAccessManagerFullAccess';

    public static readonly AWS_OPS_WORKS_REGISTER_CLI_ON_PREMISES =
        'AWSOpsWorksRegisterCLI_OnPremises';

    public static readonly AWS_OPS_WORKS_REGISTER_CLI_EC2 =
        'AWSOpsWorksRegisterCLI_EC2';

    public static readonly AWS_CERTIFICATE_MANAGER_PRIVATE_CA_PRIVILEGED_USER =
        'AWSCertificateManagerPrivateCAPrivilegedUser';

    public static readonly IAM_ACCESS_ADVISOR_READ_ONLY =
        'IAMAccessAdvisorReadOnly';

    public static readonly SERVICE_QUOTAS_READ_ONLY_ACCESS =
        'ServiceQuotasReadOnlyAccess';

    public static readonly SERVICE_QUOTAS_FULL_ACCESS =
        'ServiceQuotasFullAccess';

    public static readonly AWS_MARKETPLACE_PROCUREMENT_SYSTEM_ADMIN_FULL_ACCESS =
        'AWSMarketplaceProcurementSystemAdminFullAccess';

    public static readonly EC2_INSTANCE_CONNECT = 'EC2InstanceConnect';

    public static readonly AMAZON_WORK_SPACES_SERVICE_ACCESS =
        'AmazonWorkSpacesServiceAccess';

    public static readonly AMAZON_WORK_SPACES_SELF_SERVICE_ACCESS =
        'AmazonWorkSpacesSelfServiceAccess';

    public static readonly AWS_MARKETPLACE_SELLER_FULL_ACCESS =
        'AWSMarketplaceSellerFullAccess';

    public static readonly AWS_MARKETPLACE_SELLER_PRODUCTS_FULL_ACCESS =
        'AWSMarketplaceSellerProductsFullAccess';

    public static readonly AWS_MARKETPLACE_SELLER_PRODUCTS_READ_ONLY =
        'AWSMarketplaceSellerProductsReadOnly';

    public static readonly AWS_APP_MESH_ENVOY_ACCESS = 'AWSAppMeshEnvoyAccess';

    public static readonly AMAZON_EVENT_BRIDGE_READ_ONLY_ACCESS =
        'AmazonEventBridgeReadOnlyAccess';

    public static readonly AMAZON_EVENT_BRIDGE_FULL_ACCESS =
        'AmazonEventBridgeFullAccess';

    public static readonly CLOUD_WATCH_AUTOMATIC_DASHBOARDS_ACCESS =
        'CloudWatchAutomaticDashboardsAccess';

    public static readonly AWS_CLOUD_FORMATION_FULL_ACCESS =
        'AWSCloudFormationFullAccess';

    public static readonly ELEMENTAL_APPLIANCES_SOFTWARE_FULL_ACCESS =
        'ElementalAppliancesSoftwareFullAccess';

    public static readonly AWS_APP_MESH_PREVIEW_ENVOY_ACCESS =
        'AWSAppMeshPreviewEnvoyAccess';

    public static readonly AWS_LAKE_FORMATION_DATA_ADMIN =
        'AWSLakeFormationDataAdmin';

    public static readonly AMAZON_QLDB_READ_ONLY = 'AmazonQLDBReadOnly';

    public static readonly AMAZON_QLDB_FULL_ACCESS = 'AmazonQLDBFullAccess';

    public static readonly AMAZON_QLDB_CONSOLE_FULL_ACCESS =
        'AmazonQLDBConsoleFullAccess';

    public static readonly ALEXA_FOR_BUSINESS_POLY_DELEGATED_ACCESS_POLICY =
        'AlexaForBusinessPolyDelegatedAccessPolicy';

    public static readonly AWS_SERVICE_CATALOG_END_USER_READ_ONLY_ACCESS =
        'AWSServiceCatalogEndUserReadOnlyAccess';

    public static readonly AWS_SERVICE_CATALOG_ADMIN_READ_ONLY_ACCESS =
        'AWSServiceCatalogAdminReadOnlyAccess';

    public static readonly AWS_PRIVATE_MARKETPLACE_REQUESTS =
        'AWSPrivateMarketplaceRequests';

    public static readonly AWS_FOR_WORD_PRESS_PLUGIN_POLICY =
        'AWSForWordPressPluginPolicy';

    public static readonly AWS_SAVINGS_PLANS_READ_ONLY_ACCESS =
        'AWSSavingsPlansReadOnlyAccess';

    public static readonly AWS_SAVINGS_PLANS_FULL_ACCESS =
        'AWSSavingsPlansFullAccess';

    public static readonly AMAZON_EC2_ROLE_POLICY_FOR_LAUNCH_WIZARD =
        'AmazonEC2RolePolicyForLaunchWizard';

    public static readonly AWS_DATA_EXCHANGE_READ_ONLY =
        'AWSDataExchangeReadOnly';

    public static readonly AWS_DATA_EXCHANGE_SUBSCRIBER_FULL_ACCESS =
        'AWSDataExchangeSubscriberFullAccess';

    public static readonly AWS_DATA_EXCHANGE_PROVIDER_FULL_ACCESS =
        'AWSDataExchangeProviderFullAccess';

    public static readonly AWS_DATA_EXCHANGE_FULL_ACCESS =
        'AWSDataExchangeFullAccess';

    public static readonly AWS_BACKUP_FULL_ACCESS = 'AWSBackupFullAccess';

    public static readonly AWS_BACKUP_OPERATOR_ACCESS =
        'AWSBackupOperatorAccess';

    public static readonly AWS_MARKETPLACE_METERING_REGISTER_USAGE =
        'AWSMarketplaceMeteringRegisterUsage';

    public static readonly AMAZON_EKS_FARGATE_POD_EXECUTION_ROLE_POLICY =
        'AmazonEKSFargatePodExecutionRolePolicy';

    public static readonly CLOUD_WATCH_SYNTHETICS_FULL_ACCESS =
        'CloudWatchSyntheticsFullAccess';

    public static readonly CLOUD_WATCH_SYNTHETICS_READ_ONLY_ACCESS =
        'CloudWatchSyntheticsReadOnlyAccess';

    public static readonly AMAZON_EVENT_BRIDGE_SCHEMAS_READ_ONLY_ACCESS =
        'AmazonEventBridgeSchemasReadOnlyAccess';

    public static readonly AMAZON_EVENT_BRIDGE_SCHEMAS_FULL_ACCESS =
        'AmazonEventBridgeSchemasFullAccess';

    public static readonly EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER =
        'EC2InstanceProfileForImageBuilder';

    public static readonly IAM_ACCESS_ANALYZER_FULL_ACCESS =
        'IAMAccessAnalyzerFullAccess';

    public static readonly IAM_ACCESS_ANALYZER_READ_ONLY_ACCESS =
        'IAMAccessAnalyzerReadOnlyAccess';

    public static readonly AMAZON_CODE_GURU_REVIEWER_FULL_ACCESS =
        'AmazonCodeGuruReviewerFullAccess';

    public static readonly AMAZON_CODE_GURU_REVIEWER_READ_ONLY_ACCESS =
        'AmazonCodeGuruReviewerReadOnlyAccess';

    public static readonly AMAZON_CODE_GURU_PROFILER_FULL_ACCESS =
        'AmazonCodeGuruProfilerFullAccess';

    public static readonly AMAZON_CODE_GURU_PROFILER_READ_ONLY_ACCESS =
        'AmazonCodeGuruProfilerReadOnlyAccess';

    public static readonly AMAZON_MCS_FULL_ACCESS = 'AmazonMCSFullAccess';

    public static readonly AMAZON_MCS_READ_ONLY_ACCESS =
        'AmazonMCSReadOnlyAccess';

    public static readonly AMAZON_KENDRA_READ_ONLY_ACCESS =
        'AmazonKendraReadOnlyAccess';

    public static readonly AMAZON_KENDRA_FULL_ACCESS = 'AmazonKendraFullAccess';

    public static readonly AMAZON_SAGE_MAKER_MECHANICAL_TURK_ACCESS =
        'AmazonSageMakerMechanicalTurkAccess';

    public static readonly AMAZON_AUGMENTED_AI_HUMAN_LOOP_FULL_ACCESS =
        'AmazonAugmentedAIHumanLoopFullAccess';

    public static readonly AMAZON_AUGMENTED_AI_FULL_ACCESS =
        'AmazonAugmentedAIFullAccess';

    public static readonly AWS_NETWORK_MANAGER_READ_ONLY_ACCESS =
        'AWSNetworkManagerReadOnlyAccess';

    public static readonly AWS_NETWORK_MANAGER_FULL_ACCESS =
        'AWSNetworkManagerFullAccess';

    public static readonly AMAZON_FRAUD_DETECTOR_FULL_ACCESS_POLICY =
        'AmazonFraudDetectorFullAccessPolicy';

    public static readonly AWS_RESOURCE_ACCESS_MANAGER_RESOURCE_SHARE_PARTICIPANT_ACCESS =
        'AWSResourceAccessManagerResourceShareParticipantAccess';

    public static readonly AWS_RESOURCE_ACCESS_MANAGER_READ_ONLY_ACCESS =
        'AWSResourceAccessManagerReadOnlyAccess';

    public static readonly AWS_IMAGE_BUILDER_READ_ONLY_ACCESS =
        'AWSImageBuilderReadOnlyAccess';

    public static readonly AWS_IMAGE_BUILDER_FULL_ACCESS =
        'AWSImageBuilderFullAccess';

    public static readonly AMAZON_REKOGNITION_CUSTOM_LABELS_FULL_ACCESS =
        'AmazonRekognitionCustomLabelsFullAccess';

    public static readonly AMAZON_WORK_DOCS_READ_ONLY_ACCESS =
        'AmazonWorkDocsReadOnlyAccess';

    public static readonly AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_WRITE_ACCESS =
        'AmazonElasticFileSystemClientReadWriteAccess';

    public static readonly AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_READ_ONLY_ACCESS =
        'AmazonElasticFileSystemClientReadOnlyAccess';

    public static readonly AMAZON_ELASTIC_FILE_SYSTEM_CLIENT_FULL_ACCESS =
        'AmazonElasticFileSystemClientFullAccess';

    public static readonly AMAZON_CHIME_SDK = 'AmazonChimeSDK';

    public static readonly AWS_IO_T_DEVICE_TESTER_FOR_FREE_RTOS_FULL_ACCESS =
        'AWSIoTDeviceTesterForFreeRTOSFullAccess';

    public static readonly AWS_IO_T_DEVICE_TESTER_FOR_GREENGRASS_FULL_ACCESS =
        'AWSIoTDeviceTesterForGreengrassFullAccess';

    public static readonly COMPUTE_OPTIMIZER_READ_ONLY_ACCESS =
        'ComputeOptimizerReadOnlyAccess';

    public static readonly ELEMENTAL_APPLIANCES_SOFTWARE_READ_ONLY_ACCESS =
        'ElementalAppliancesSoftwareReadOnlyAccess';

    public static readonly GAME_LIFT_GAME_SERVER_GROUP_POLICY =
        'GameLiftGameServerGroupPolicy';

    public static readonly AWS_WAF_CONSOLE_FULL_ACCESS =
        'AWSWAFConsoleFullAccess';

    public static readonly AWS_WAF_CONSOLE_READ_ONLY_ACCESS =
        'AWSWAFConsoleReadOnlyAccess';

    public static readonly AMAZON_WORK_DOCS_FULL_ACCESS =
        'AmazonWorkDocsFullAccess';

    public static readonly AMAZON_AUGMENTED_AI_INTEGRATED_API_ACCESS =
        'AmazonAugmentedAIIntegratedAPIAccess';

    public static readonly AMAZON_KEYSPACES_FULL_ACCESS =
        'AmazonKeyspacesFullAccess';

    public static readonly AMAZON_KEYSPACES_READ_ONLY_ACCESS =
        'AmazonKeyspacesReadOnlyAccess';

    public static readonly AMAZON_DETECTIVE_FULL_ACCESS =
        'AmazonDetectiveFullAccess';

    public static readonly AWS_PURCHASE_ORDERS_SERVICE_ROLE_POLICY =
        'AWSPurchaseOrdersServiceRolePolicy';

    public static readonly SERVER_MIGRATION_SERVICE_CONSOLE_FULL_ACCESS =
        'ServerMigrationServiceConsoleFullAccess';

    public static readonly AMAZON_SSM_PATCH_ASSOCIATION =
        'AmazonSSMPatchAssociation';

    public static readonly AWS_CLOUD9_SSM_INSTANCE_PROFILE =
        'AWSCloud9SSMInstanceProfile';

    public static readonly AWS_THINKBOX_AWS_PORTAL_GATEWAY_POLICY =
        'AWSThinkboxAWSPortalGatewayPolicy';

    public static readonly AWS_THINKBOX_AWS_PORTAL_WORKER_POLICY =
        'AWSThinkboxAWSPortalWorkerPolicy';

    public static readonly AWS_THINKBOX_ASSET_SERVER_POLICY =
        'AWSThinkboxAssetServerPolicy';

    public static readonly AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ACCESS_POLICY =
        'AWSThinkboxDeadlineResourceTrackerAccessPolicy';

    public static readonly AWS_THINKBOX_DEADLINE_RESOURCE_TRACKER_ADMIN_POLICY =
        'AWSThinkboxDeadlineResourceTrackerAdminPolicy';

    public static readonly AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_WORKER_POLICY =
        'AWSThinkboxDeadlineSpotEventPluginWorkerPolicy';

    public static readonly AWS_THINKBOX_DEADLINE_SPOT_EVENT_PLUGIN_ADMIN_POLICY =
        'AWSThinkboxDeadlineSpotEventPluginAdminPolicy';

    public static readonly AWS_THINKBOX_AWS_PORTAL_ADMIN_POLICY =
        'AWSThinkboxAWSPortalAdminPolicy';

    public static readonly AMAZON_APP_FLOW_READ_ONLY_ACCESS =
        'AmazonAppFlowReadOnlyAccess';

    public static readonly AMAZON_APP_FLOW_FULL_ACCESS =
        'AmazonAppFlowFullAccess';

    public static readonly ALEXA_FOR_BUSINESS_LIFESIZE_DELEGATED_ACCESS_POLICY =
        'AlexaForBusinessLifesizeDelegatedAccessPolicy';

    public static readonly ELEMENTAL_ACTIVATIONS_FULL_ACCESS =
        'ElementalActivationsFullAccess';

    public static readonly AWS_CODE_ARTIFACT_ADMIN_ACCESS =
        'AWSCodeArtifactAdminAccess';

    public static readonly AWS_BACKUP_ORGANIZATION_ADMIN_ACCESS =
        'AWSBackupOrganizationAdminAccess';

    public static readonly AMAZON_HONEYCODE_TEAM_ASSOCIATION_READ_ONLY_ACCESS =
        'AmazonHoneycodeTeamAssociationReadOnlyAccess';

    public static readonly AMAZON_HONEYCODE_WORKBOOK_READ_ONLY_ACCESS =
        'AmazonHoneycodeWorkbookReadOnlyAccess';

    public static readonly AMAZON_HONEYCODE_FULL_ACCESS =
        'AmazonHoneycodeFullAccess';

    public static readonly AMAZON_HONEYCODE_READ_ONLY_ACCESS =
        'AmazonHoneycodeReadOnlyAccess';

    public static readonly AMAZON_HONEYCODE_TEAM_ASSOCIATION_FULL_ACCESS =
        'AmazonHoneycodeTeamAssociationFullAccess';

    public static readonly AMAZON_HONEYCODE_WORKBOOK_FULL_ACCESS =
        'AmazonHoneycodeWorkbookFullAccess';

    public static readonly AWS_CODE_ARTIFACT_READ_ONLY_ACCESS =
        'AWSCodeArtifactReadOnlyAccess';

    public static readonly AWS_ELEMENTAL_MEDIA_LIVE_READ_ONLY =
        'AWSElementalMediaLiveReadOnly';

    public static readonly AWS_ELEMENTAL_MEDIA_LIVE_FULL_ACCESS =
        'AWSElementalMediaLiveFullAccess';

    public static readonly AMAZON_SAGE_MAKER_GROUND_TRUTH_EXECUTION =
        'AmazonSageMakerGroundTruthExecution';

    public static readonly AWS_CODE_PIPELINE_READ_ONLY_ACCESS =
        'AWSCodePipeline_ReadOnlyAccess';

    public static readonly AWS_CODE_PIPELINE_FULL_ACCESS =
        'AWSCodePipeline_FullAccess';

    public static readonly AWS_LAKE_FORMATION_CROSS_ACCOUNT_MANAGER =
        'AWSLakeFormationCrossAccountManager';

    public static readonly AMAZON_BRAKET_FULL_ACCESS = 'AmazonBraketFullAccess';

    public static readonly AWS_COMPROMISED_KEY_QUARANTINE =
        'AWSCompromisedKeyQuarantine';

    public static readonly AMAZON_EKSVPC_RESOURCE_CONTROLLER =
        'AmazonEKSVPCResourceController';

    public static readonly AWS_TRANSFER_READ_ONLY_ACCESS =
        'AWSTransferReadOnlyAccess';

    public static readonly AWS_BILLING_READ_ONLY_ACCESS =
        'AWSBillingReadOnlyAccess';

    public static readonly ELEMENTAL_ACTIVATIONS_READ_ONLY_ACCESS =
        'ElementalActivationsReadOnlyAccess';

    public static readonly ELEMENTAL_ACTIVATIONS_GENERATE_LICENSES =
        'ElementalActivationsGenerateLicenses';

    public static readonly ELEMENTAL_ACTIVATIONS_DOWNLOAD_SOFTWARE_ACCESS =
        'ElementalActivationsDownloadSoftwareAccess';

    public static readonly AMAZON_REDSHIFT_DATA_FULL_ACCESS =
        'AmazonRedshiftDataFullAccess';

    public static readonly AWS_ROBO_MAKER_FULL_ACCESS =
        'AWSRoboMaker_FullAccess';

    public static readonly AWS_MARKETPLACE_AMI_INGESTION =
        'AWSMarketplaceAmiIngestion';

    public static readonly AMAZON_ELASTIC_MAP_REDUCE_PLACEMENT_GROUP_POLICY =
        'AmazonElasticMapReducePlacementGroupPolicy';

    public static readonly AMAZON_ELASTIC_FILE_SYSTEMS_UTILS =
        'AmazonElasticFileSystemsUtils';

    public static readonly EC2_IMAGE_BUILDER_CROSS_ACCOUNT_DISTRIBUTION_ACCESS =
        'Ec2ImageBuilderCrossAccountDistributionAccess';

    public static readonly AMAZON_TIMESTREAM_READ_ONLY_ACCESS =
        'AmazonTimestreamReadOnlyAccess';

    public static readonly AMAZON_TIMESTREAM_FULL_ACCESS =
        'AmazonTimestreamFullAccess';

    public static readonly AMAZON_TIMESTREAM_CONSOLE_FULL_ACCESS =
        'AmazonTimestreamConsoleFullAccess';

    public static readonly AMAZON_S3_OUTPOSTS_FULL_ACCESS =
        'AmazonS3OutpostsFullAccess';

    public static readonly AMAZON_S3_OUTPOSTS_READ_ONLY_ACCESS =
        'AmazonS3OutpostsReadOnlyAccess';

    public static readonly AWS_DEEP_RACER_FULL_ACCESS =
        'AWSDeepRacerFullAccess';

    public static readonly CLOUD_WATCH_LAMBDA_INSIGHTS_EXECUTION_ROLE_POLICY =
        'CloudWatchLambdaInsightsExecutionRolePolicy';

    public static readonly AWS_CLOUD_TRAIL_FULL_ACCESS =
        'AWSCloudTrail_FullAccess';

    public static readonly AWS_BUDGETS_READ_ONLY_ACCESS =
        'AWSBudgetsReadOnlyAccess';

    public static readonly AWS_BUDGETS_ACTIONS_WITH_AWS_RESOURCE_CONTROL_ACCESS =
        'AWSBudgetsActionsWithAWSResourceControlAccess';

    public static readonly AWS_GLUE_DATA_BREW_FULL_ACCESS_POLICY =
        'AwsGlueDataBrewFullAccessPolicy';

    public static readonly AWS_SERVICE_CATALOG_APP_REGISTRY_FULL_ACCESS =
        'AWSServiceCatalogAppRegistryFullAccess';

    public static readonly AWS_SERVICE_CATALOG_APP_REGISTRY_READ_ONLY_ACCESS =
        'AWSServiceCatalogAppRegistryReadOnlyAccess';

    public static readonly AWS_LAMBDA_READ_ONLY_ACCESS =
        'AWSLambda_ReadOnlyAccess';

    public static readonly AWS_LAMBDA_FULL_ACCESS = 'AWSLambda_FullAccess';

    public static readonly AWS_GLUE_SCHEMA_REGISTRY_FULL_ACCESS =
        'AWSGlueSchemaRegistryFullAccess';

    public static readonly AWS_GLUE_SCHEMA_REGISTRY_READONLY_ACCESS =
        'AWSGlueSchemaRegistryReadonlyAccess';

    public static readonly AMAZON_CONNECT_FULL_ACCESS =
        'AmazonConnect_FullAccess';

    public static readonly CLOUD_WATCH_APPLICATION_INSIGHTS_FULL_ACCESS =
        'CloudWatchApplicationInsightsFullAccess';

    public static readonly CLOUD_WATCH_APPLICATION_INSIGHTS_READ_ONLY_ACCESS =
        'CloudWatchApplicationInsightsReadOnlyAccess';

    public static readonly ELEMENTAL_SUPPORT_CENTER_FULL_ACCESS =
        'ElementalSupportCenterFullAccess';

    public static readonly AMAZON_SAGE_MAKER_ADMIN_SERVICE_CATALOG_PRODUCTS_SERVICE_ROLE_POLICY =
        'AmazonSageMakerAdmin-ServiceCatalogProductsServiceRolePolicy';

    public static readonly AWS_PANORAMA_FULL_ACCESS = 'AWSPanoramaFullAccess';

    public static readonly AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_POWER_USER =
        'AmazonElasticContainerRegistryPublicPowerUser';

    public static readonly AMAZON_SAGE_MAKER_FEATURE_STORE_ACCESS =
        'AmazonSageMakerFeatureStoreAccess';

    public static readonly AMAZON_DEV_OPS_GURU_READ_ONLY_ACCESS =
        'AmazonDevOpsGuruReadOnlyAccess';

    public static readonly AMAZON_DEV_OPS_GURU_FULL_ACCESS =
        'AmazonDevOpsGuruFullAccess';

    public static readonly AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_FULL_ACCESS =
        'AmazonElasticContainerRegistryPublicFullAccess';

    public static readonly AMAZON_ELASTIC_CONTAINER_REGISTRY_PUBLIC_READ_ONLY =
        'AmazonElasticContainerRegistryPublicReadOnly';

    public static readonly ADMINISTRATOR_ACCESS_AMPLIFY =
        'AdministratorAccess-Amplify';

    public static readonly AMAZON_MONITRON_FULL_ACCESS =
        'AmazonMonitronFullAccess';

    public static readonly EC2_INSTANCE_PROFILE_FOR_IMAGE_BUILDER_ECR_CONTAINER_BUILDS =
        'EC2InstanceProfileForImageBuilderECRContainerBuilds';

    public static readonly AWS_AUDIT_MANAGER_ADMINISTRATOR_ACCESS =
        'AWSAuditManagerAdministratorAccess';

    public static readonly AWS_TRANSFER_CONSOLE_FULL_ACCESS =
        'AWSTransferConsoleFullAccess';

    public static readonly AWS_TRANSFER_FULL_ACCESS = 'AWSTransferFullAccess';

    public static readonly AWS_IO_T_WIRELESS_FULL_ACCESS =
        'AWSIoTWirelessFullAccess';

    public static readonly AWS_IO_T_WIRELESS_READ_ONLY_ACCESS =
        'AWSIoTWirelessReadOnlyAccess';

    public static readonly AWS_IO_T_WIRELESS_FULL_PUBLISH_ACCESS =
        'AWSIoTWirelessFullPublishAccess';

    public static readonly AWS_IO_T_WIRELESS_GATEWAY_CERT_MANAGER =
        'AWSIoTWirelessGatewayCertManager';

    public static readonly AWS_IO_T_WIRELESS_DATA_ACCESS =
        'AWSIoTWirelessDataAccess';

    public static readonly AWS_IO_T_WIRELESS_LOGGING = 'AWSIoTWirelessLogging';

    public static readonly AWS_CLOUD_SHELL_FULL_ACCESS =
        'AWSCloudShellFullAccess';

    public static readonly AMAZON_PROMETHEUS_FULL_ACCESS =
        'AmazonPrometheusFullAccess';

    public static readonly AMAZON_PROMETHEUS_CONSOLE_FULL_ACCESS =
        'AmazonPrometheusConsoleFullAccess';

    public static readonly AMAZON_PROMETHEUS_QUERY_ACCESS =
        'AmazonPrometheusQueryAccess';

    public static readonly AMAZON_PROMETHEUS_REMOTE_WRITE_ACCESS =
        'AmazonPrometheusRemoteWriteAccess';

    public static readonly AWS_OPS_WORKS_FULL_ACCESS = 'AWSOpsWorks_FullAccess';

    public static readonly AWS_ELASTIC_BEANSTALK_READ_ONLY =
        'AWSElasticBeanstalkReadOnly';

    public static readonly ADMINISTRATOR_ACCESS_AWS_ELASTIC_BEANSTALK =
        'AdministratorAccess-AWSElasticBeanstalk';

    public static readonly AMAZON_WORK_MAIL_MESSAGE_FLOW_READ_ONLY_ACCESS =
        'AmazonWorkMailMessageFlowReadOnlyAccess';

    public static readonly AMAZON_CODE_GURU_PROFILER_AGENT_ACCESS =
        'AmazonCodeGuruProfilerAgentAccess';

    public static readonly AMAZON_WORK_MAIL_MESSAGE_FLOW_FULL_ACCESS =
        'AmazonWorkMailMessageFlowFullAccess';

    public static readonly AMAZON_HEALTH_LAKE_FULL_ACCESS =
        'AmazonHealthLakeFullAccess';

    public static readonly AMAZON_HEALTH_LAKE_READ_ONLY_ACCESS =
        'AmazonHealthLakeReadOnlyAccess';

    public static readonly AWS_PROTON_DEVELOPER_ACCESS =
        'AWSProtonDeveloperAccess';

    public static readonly AWS_PROTON_FULL_ACCESS = 'AWSProtonFullAccess';

    public static readonly AWS_PROTON_READ_ONLY_ACCESS =
        'AWSProtonReadOnlyAccess';

    public static readonly AWS_GRAFANA_CONSOLE_READ_ONLY_ACCESS =
        'AWSGrafanaConsoleReadOnlyAccess';

    public static readonly AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT =
        'AWSGrafanaWorkspacePermissionManagement';

    public static readonly AWS_GRAFANA_ACCOUNT_ADMINISTRATOR =
        'AWSGrafanaAccountAdministrator';

    public static readonly AWS_ELASTIC_BEANSTALK_MANAGED_UPDATES_CUSTOMER_ROLE_POLICY =
        'AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy';

    public static readonly AMAZON_EMR_READ_ONLY_ACCESS_POLICY_V2 =
        'AmazonEMRReadOnlyAccessPolicy_v2';

    public static readonly AMAZON_EMR_FULL_ACCESS_POLICY_V2 =
        'AmazonEMRFullAccessPolicy_v2';

    public static readonly AWS_SECURITY_HUB_ORGANIZATIONS_ACCESS =
        'AWSSecurityHubOrganizationsAccess';

    public static readonly AWS_APPLICATION_MIGRATION_FULL_ACCESS =
        'AWSApplicationMigrationFullAccess';

    public static readonly AWS_APPLICATION_MIGRATION_AGENT_POLICY =
        'AWSApplicationMigrationAgentPolicy';

    public static readonly AWS_APPLICATION_MIGRATION_EC2_ACCESS =
        'AWSApplicationMigrationEC2Access';

    public static readonly AWS_APPLICATION_MIGRATION_READ_ONLY_ACCESS =
        'AWSApplicationMigrationReadOnlyAccess';

    public static readonly AMAZON_LOOKOUT_EQUIPMENT_FULL_ACCESS =
        'AmazonLookoutEquipmentFullAccess';

    public static readonly AWS_COMPROMISED_KEY_QUARANTINE_V2 =
        'AWSCompromisedKeyQuarantineV2';

    public static readonly AMAZON_NIMBLE_STUDIO_LAUNCH_PROFILE_WORKER =
        'AmazonNimbleStudio-LaunchProfileWorker';

    public static readonly AMAZON_NIMBLE_STUDIO_STUDIO_ADMIN =
        'AmazonNimbleStudio-StudioAdmin';

    public static readonly AMAZON_NIMBLE_STUDIO_STUDIO_USER =
        'AmazonNimbleStudio-StudioUser';

    public static readonly AMAZON_LOOKOUT_EQUIPMENT_READ_ONLY_ACCESS =
        'AmazonLookoutEquipmentReadOnlyAccess';

    public static readonly AMAZON_LOOKOUT_METRICS_READ_ONLY_ACCESS =
        'AmazonLookoutMetricsReadOnlyAccess';

    public static readonly AMAZON_LOOKOUT_METRICS_FULL_ACCESS =
        'AmazonLookoutMetricsFullAccess';

    public static readonly AWS_INCIDENT_MANAGER_RESOLVER_ACCESS =
        'AWSIncidentManagerResolverAccess';

    public static readonly AMAZON_LOOKOUT_VISION_READ_ONLY_ACCESS =
        'AmazonLookoutVisionReadOnlyAccess';

    public static readonly AMAZON_LOOKOUT_VISION_FULL_ACCESS =
        'AmazonLookoutVisionFullAccess';

    public static readonly AMAZON_LOOKOUT_VISION_CONSOLE_READ_ONLY_ACCESS =
        'AmazonLookoutVisionConsoleReadOnlyAccess';

    public static readonly AMAZON_LOOKOUT_VISION_CONSOLE_FULL_ACCESS =
        'AmazonLookoutVisionConsoleFullAccess';

    public static readonly AWS_BUG_BUST_FULL_ACCESS = 'AWSBugBustFullAccess';

    public static readonly AWS_BUG_BUST_PLAYER_ACCESS =
        'AWSBugBustPlayerAccess';

    public static readonly AMAZON_SAGE_MAKER_PIPELINES_INTEGRATIONS =
        'AmazonSageMakerPipelinesIntegrations';

    public static readonly AMAZON_ROUTE53_RECOVERY_READINESS_FULL_ACCESS =
        'AmazonRoute53RecoveryReadinessFullAccess';

    public static readonly AMAZON_ROUTE53_RECOVERY_CLUSTER_READ_ONLY_ACCESS =
        'AmazonRoute53RecoveryClusterReadOnlyAccess';

    public static readonly AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_FULL_ACCESS =
        'AmazonRoute53RecoveryControlConfigFullAccess';

    public static readonly AMAZON_ROUTE53_RECOVERY_CONTROL_CONFIG_READ_ONLY_ACCESS =
        'AmazonRoute53RecoveryControlConfigReadOnlyAccess';

    public static readonly AMAZON_ROUTE53_RECOVERY_READINESS_READ_ONLY_ACCESS =
        'AmazonRoute53RecoveryReadinessReadOnlyAccess';

    public static readonly AMAZON_ROUTE53_RECOVERY_CLUSTER_FULL_ACCESS =
        'AmazonRoute53RecoveryClusterFullAccess';

    public static readonly AWS_BACKUP_AUDIT_ACCESS = 'AWSBackupAuditAccess';

    public static readonly AMAZON_OPEN_SEARCH_SERVICE_COGNITO_ACCESS =
        'AmazonOpenSearchServiceCognitoAccess';

    public static readonly AMAZON_OPEN_SEARCH_SERVICE_FULL_ACCESS =
        'AmazonOpenSearchServiceFullAccess';

    public static readonly AMAZON_OPEN_SEARCH_SERVICE_READ_ONLY_ACCESS =
        'AmazonOpenSearchServiceReadOnlyAccess';

    public static readonly AMAZON_MSK_CONNECT_READ_ONLY_ACCESS =
        'AmazonMSKConnectReadOnlyAccess';

    public static readonly AMAZON_REDSHIFT_QUERY_EDITOR_V2_FULL_ACCESS =
        'AmazonRedshiftQueryEditorV2FullAccess';

    public static readonly AMAZON_REDSHIFT_QUERY_EDITOR_V2_NO_SHARING =
        'AmazonRedshiftQueryEditorV2NoSharing';

    public static readonly AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_SHARING =
        'AmazonRedshiftQueryEditorV2ReadSharing';

    public static readonly AMAZON_REDSHIFT_QUERY_EDITOR_V2_READ_WRITE_SHARING =
        'AmazonRedshiftQueryEditorV2ReadWriteSharing';

    public static readonly AMAZON_CONNECT_VOICE_ID_FULL_ACCESS =
        'AmazonConnectVoiceIDFullAccess';

    public static readonly AWS_ACCOUNT_MANAGEMENT_FULL_ACCESS =
        'AWSAccountManagementFullAccess';

    public static readonly AWS_ACCOUNT_MANAGEMENT_READ_ONLY_ACCESS =
        'AWSAccountManagementReadOnlyAccess';

    public static readonly AMAZON_MEMORY_DB_FULL_ACCESS =
        'AmazonMemoryDBFullAccess';

    public static readonly AMAZON_MEMORY_DB_READ_ONLY_ACCESS =
        'AmazonMemoryDBReadOnlyAccess';

    public static readonly AWS_MIGRATION_HUB_STRATEGY_CONSOLE_FULL_ACCESS =
        'AWSMigrationHubStrategyConsoleFullAccess';

    public static readonly AWS_MIGRATION_HUB_STRATEGY_COLLECTOR =
        'AWSMigrationHubStrategyCollector';

    public static readonly AWS_DEEP_RACER_ACCOUNT_ADMIN_ACCESS =
        'AWSDeepRacerAccountAdminAccess';

    public static readonly AWS_DEEP_RACER_DEFAULT_MULTI_USER_ACCESS =
        'AWSDeepRacerDefaultMultiUserAccess';

    public static readonly AMAZON_REDSHIFT_ALL_COMMANDS_FULL_ACCESS =
        'AmazonRedshiftAllCommandsFullAccess';

    public static readonly AWS_APPLICATION_MIGRATION_V_CENTER_CLIENT_POLICY =
        'AWSApplicationMigrationVCenterClientPolicy';

    public static readonly AMAZON_DEV_OPS_GURU_ORGANIZATIONS_ACCESS =
        'AmazonDevOpsGuruOrganizationsAccess';

    public static readonly AWS_ELASTIC_DISASTER_RECOVERY_AGENT_INSTALLATION_POLICY =
        'AWSElasticDisasterRecoveryAgentInstallationPolicy';

    public static readonly AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS =
        'AWSElasticDisasterRecoveryConsoleFullAccess';

    public static readonly AWS_ELASTIC_DISASTER_RECOVERY_READ_ONLY_ACCESS =
        'AWSElasticDisasterRecoveryReadOnlyAccess';

    public static readonly AWS_ELASTIC_DISASTER_RECOVERY_FAILBACK_INSTALLATION_POLICY =
        'AWSElasticDisasterRecoveryFailbackInstallationPolicy';

    public static readonly AWS_ELEMENTAL_MEDIA_TAILOR_FULL_ACCESS =
        'AWSElementalMediaTailorFullAccess';

    public static readonly AWS_ELEMENTAL_MEDIA_TAILOR_READ_ONLY =
        'AWSElementalMediaTailorReadOnly';

    public static readonly AMAZON_BRAKET_JOBS_EXECUTION_POLICY =
        'AmazonBraketJobsExecutionPolicy';

    public static readonly AWS_MIGRATION_HUB_REFACTOR_SPACES_FULL_ACCESS =
        'AWSMigrationHubRefactorSpacesFullAccess';

    public static readonly AMAZON_CLOUD_WATCH_EVIDENTLY_READ_ONLY_ACCESS =
        'AmazonCloudWatchEvidentlyReadOnlyAccess';

    public static readonly AMAZON_CLOUD_WATCH_EVIDENTLY_FULL_ACCESS =
        'AmazonCloudWatchEvidentlyFullAccess';

    public static readonly AMAZON_CLOUD_WATCH_RUM_READ_ONLY_ACCESS =
        'AmazonCloudWatchRUMReadOnlyAccess';

    public static readonly AMAZON_CLOUD_WATCH_RUM_FULL_ACCESS =
        'AmazonCloudWatchRUMFullAccess';

    public static readonly AMAZON_INSPECTOR2_FULL_ACCESS =
        'AmazonInspector2FullAccess';

    public static readonly AMAZON_WORK_SPACES_WEB_READ_ONLY =
        'AmazonWorkSpacesWebReadOnly';

    public static readonly AMAZON_DEV_OPS_GURU_CONSOLE_FULL_ACCESS =
        'AmazonDevOpsGuruConsoleFullAccess';

    public static readonly AWS_APP_RUNNER_FULL_ACCESS =
        'AWSAppRunnerFullAccess';

    public static readonly AMAZON_INSPECTOR2_READ_ONLY_ACCESS =
        'AmazonInspector2ReadOnlyAccess';

    public static readonly AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_RESTORE =
        'AWSBackupServiceRolePolicyForS3Restore';

    public static readonly AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_S3_BACKUP =
        'AWSBackupServiceRolePolicyForS3Backup';

    public static readonly AWS_APP_RUNNER_READ_ONLY_ACCESS =
        'AWSAppRunnerReadOnlyAccess';

    public static readonly AWS_IDENTITY_SYNC_FULL_ACCESS =
        'AWSIdentitySyncFullAccess';

    public static readonly AWS_IDENTITY_SYNC_READ_ONLY_ACCESS =
        'AWSIdentitySyncReadOnlyAccess';

    public static readonly AMAZON_SAGE_MAKER_SERVICE_CATALOG_PRODUCTS_CODE_BUILD_SERVICE_ROLE_POLICY =
        'AmazonSageMakerServiceCatalogProductsCodeBuildServiceRolePolicy';

    public static readonly AMAZON_RDS_PERFORMANCE_INSIGHTS_READ_ONLY =
        'AmazonRDSPerformanceInsightsReadOnly';

    public static readonly ROSA_MANAGE_SUBSCRIPTION = 'ROSAManageSubscription';

    public static readonly AWS_BILLING_CONDUCTOR_FULL_ACCESS =
        'AWSBillingConductorFullAccess';

    public static readonly AWS_BILLING_CONDUCTOR_READ_ONLY_ACCESS =
        'AWSBillingConductorReadOnlyAccess';

    public static readonly AWS_GLUE_SESSION_USER_RESTRICTED_POLICY =
        'AwsGlueSessionUserRestrictedPolicy';

    public static readonly AWS_GLUE_SESSION_USER_RESTRICTED_NOTEBOOK_POLICY =
        'AwsGlueSessionUserRestrictedNotebookPolicy';

    public static readonly AWS_MIGRATION_HUB_ORCHESTRATOR_PLUGIN =
        'AWSMigrationHubOrchestratorPlugin';

    public static readonly AWS_MIGRATION_HUB_ORCHESTRATOR_CONSOLE_FULL_ACCESS =
        'AWSMigrationHubOrchestratorConsoleFullAccess';

    public static readonly AWS_MIGRATION_HUB_ORCHESTRATOR_INSTANCE_ROLE_POLICY =
        'AWSMigrationHubOrchestratorInstanceRolePolicy';

    public static readonly AWS_BUDGETS_ACTIONS_ROLE_POLICY_FOR_RESOURCE_ADMINISTRATION_WITH_SSM =
        'AWSBudgetsActions_RolePolicyForResourceAdministrationWithSSM';

    public static readonly AWS_CLOUD_TRAIL_READ_ONLY_ACCESS =
        'AWSCloudTrail_ReadOnlyAccess';

    public static readonly AWS_APPLICATION_MIGRATION_AGENT_INSTALLATION_POLICY =
        'AWSApplicationMigrationAgentInstallationPolicy';

    public static readonly AWS_VENDOR_INSIGHTS_VENDOR_FULL_ACCESS =
        'AWSVendorInsightsVendorFullAccess';

    public static readonly AWS_VENDOR_INSIGHTS_VENDOR_READ_ONLY =
        'AWSVendorInsightsVendorReadOnly';

    public static readonly AWS_VENDOR_INSIGHTS_ASSESSOR_FULL_ACCESS =
        'AWSVendorInsightsAssessorFullAccess';

    public static readonly AWS_VENDOR_INSIGHTS_ASSESSOR_READ_ONLY =
        'AWSVendorInsightsAssessorReadOnly';

    public static readonly AWS_TRUSTED_ADVISOR_PRIORITY_FULL_ACCESS =
        'AWSTrustedAdvisorPriorityFullAccess';

    public static readonly AWS_TRUSTED_ADVISOR_PRIORITY_READ_ONLY_ACCESS =
        'AWSTrustedAdvisorPriorityReadOnlyAccess';

    public static readonly AWS_APPLICATION_DISCOVERY_AGENTLESS_COLLECTOR_ACCESS =
        'AWSApplicationDiscoveryAgentlessCollectorAccess';

    public static readonly AWS_SUPPORT_APP_FULL_ACCESS =
        'AWSSupportAppFullAccess';

    public static readonly AWS_SUPPORT_APP_READ_ONLY_ACCESS =
        'AWSSupportAppReadOnlyAccess';

    public static readonly AMAZON_EKS_LOCAL_OUTPOST_CLUSTER_POLICY =
        'AmazonEKSLocalOutpostClusterPolicy';

    public static readonly GROUND_TRUTH_SYNTHETIC_CONSOLE_READ_ONLY_ACCESS =
        'GroundTruthSyntheticConsoleReadOnlyAccess';

    public static readonly GROUND_TRUTH_SYNTHETIC_CONSOLE_FULL_ACCESS =
        'GroundTruthSyntheticConsoleFullAccess';

    public static readonly AMAZON_SSM_MANAGED_EC2_INSTANCE_DEFAULT_POLICY =
        'AmazonSSMManagedEC2InstanceDefaultPolicy';

    public static readonly AMAZON_SAGE_MAKER_CANVAS_FULL_ACCESS =
        'AmazonSageMakerCanvasFullAccess';

    public static readonly AWS_SUPPORT_PLANS_READ_ONLY_ACCESS =
        'AWSSupportPlansReadOnlyAccess';

    public static readonly AWS_SUPPORT_PLANS_FULL_ACCESS =
        'AWSSupportPlansFullAccess';

    public static readonly AWS_REFACTORING_TOOLKIT_SIDECAR_POLICY =
        'AWSRefactoringToolkitSidecarPolicy';

    public static readonly AWS_REFACTORING_TOOLKIT_FULL_ACCESS =
        'AWSRefactoringToolkitFullAccess';

    public static readonly AWS_RESOURCE_EXPLORER_READ_ONLY_ACCESS =
        'AWSResourceExplorerReadOnlyAccess';

    public static readonly AWS_RESOURCE_EXPLORER_FULL_ACCESS =
        'AWSResourceExplorerFullAccess';

    public static readonly AMAZON_WORKSPACES_PCA_ACCESS =
        'AmazonWorkspacesPCAAccess';

    public static readonly AWS_PROTON_CODE_BUILD_PROVISIONING_BASIC_ACCESS =
        'AWSProtonCodeBuildProvisioningBasicAccess';

    public static readonly AMAZON_EVENT_BRIDGE_SCHEDULER_FULL_ACCESS =
        'AmazonEventBridgeSchedulerFullAccess';

    public static readonly AMAZON_EVENT_BRIDGE_SCHEDULER_READ_ONLY_ACCESS =
        'AmazonEventBridgeSchedulerReadOnlyAccess';

    public static readonly AWS_BACKUP_RESTORE_ACCESS_FOR_SAPHANA =
        'AWSBackupRestoreAccessForSAPHANA';

    public static readonly AWS_BACKUP_DATA_TRANSFER_ACCESS =
        'AWSBackupDataTransferAccess';

    public static readonly AWS_SYSTEMS_MANAGER_FOR_SAP_FULL_ACCESS =
        'AWSSystemsManagerForSAPFullAccess';

    public static readonly AWS_SYSTEMS_MANAGER_FOR_SAP_READ_ONLY_ACCESS =
        'AWSSystemsManagerForSAPReadOnlyAccess';

    public static readonly AWS_APPLICATION_MIGRATION_SSM_ACCESS =
        'AWSApplicationMigrationSSMAccess';

    public static readonly OAM_READ_ONLY_ACCESS = 'OAMReadOnlyAccess';

    public static readonly OAM_FULL_ACCESS = 'OAMFullAccess';

    public static readonly AWS_XRAY_CROSS_ACCOUNT_SHARING_CONFIGURATION =
        'AWSXrayCrossAccountSharingConfiguration';

    public static readonly CLOUD_WATCH_LOGS_CROSS_ACCOUNT_SHARING_CONFIGURATION =
        'CloudWatchLogsCrossAccountSharingConfiguration';

    public static readonly CLOUD_WATCH_CROSS_ACCOUNT_SHARING_CONFIGURATION =
        'CloudWatchCrossAccountSharingConfiguration';

    public static readonly AWS_WICKR_FULL_ACCESS = 'AWSWickrFullAccess';

    public static readonly AMAZON_OMICS_READ_ONLY_ACCESS =
        'AmazonOmicsReadOnlyAccess';

    public static readonly AMAZON_SECURITY_LAKE_PERMISSIONS_BOUNDARY =
        'AmazonSecurityLakePermissionsBoundary';

    public static readonly AMAZON_SAGE_MAKER_MODEL_GOVERNANCE_USE_ACCESS =
        'AmazonSageMakerModelGovernanceUseAccess';

    public static readonly AMAZON_EVENT_BRIDGE_PIPES_FULL_ACCESS =
        'AmazonEventBridgePipesFullAccess';

    public static readonly AMAZON_EVENT_BRIDGE_PIPES_READ_ONLY_ACCESS =
        'AmazonEventBridgePipesReadOnlyAccess';

    public static readonly AMAZON_EVENT_BRIDGE_PIPES_OPERATOR_ACCESS =
        'AmazonEventBridgePipesOperatorAccess';

    public static readonly AWS_OUTPOSTS_AUTHORIZE_SERVER_POLICY =
        'AWSOutpostsAuthorizeServerPolicy';

    public static readonly AWS_CLEAN_ROOMS_READ_ONLY_ACCESS =
        'AWSCleanRoomsReadOnlyAccess';

    public static readonly AWS_CLEAN_ROOMS_FULL_ACCESS =
        'AWSCleanRoomsFullAccess';

    public static readonly AWS_CLEAN_ROOMS_FULL_ACCESS_NO_QUERYING =
        'AWSCleanRoomsFullAccessNoQuerying';

    public static readonly AMAZON_DETECTIVE_MEMBER_ACCESS =
        'AmazonDetectiveMemberAccess';

    public static readonly AMAZON_DETECTIVE_INVESTIGATOR_ACCESS =
        'AmazonDetectiveInvestigatorAccess';

    public static readonly AMAZON_COGNITO_UNAUTHENTICATED_IDENTITIES =
        'AmazonCognitoUnauthenticatedIdentities';

    public static readonly AWS_PRIVATE_CA_USER = 'AWSPrivateCAUser';

    public static readonly AWS_PRIVATE_CA_FULL_ACCESS =
        'AWSPrivateCAFullAccess';

    public static readonly AWS_PRIVATE_CA_PRIVILEGED_USER =
        'AWSPrivateCAPrivilegedUser';

    public static readonly AWS_PRIVATE_CA_READ_ONLY = 'AWSPrivateCAReadOnly';

    public static readonly AWS_PRIVATE_CA_AUDITOR = 'AWSPrivateCAAuditor';

    public static readonly AMAZON_OMICS_FULL_ACCESS = 'AmazonOmicsFullAccess';

    public static readonly AMAZON_DETECTIVE_ORGANIZATIONS_ACCESS =
        'AmazonDetectiveOrganizationsAccess';

    public static readonly MEDIA_CONNECT_GATEWAY_INSTANCE_ROLE_POLICY =
        'MediaConnectGatewayInstanceRolePolicy';

    public static readonly AMAZON_SAGE_MAKER_CANVAS_AI_SERVICES_ACCESS =
        'AmazonSageMakerCanvasAIServicesAccess';

    public static readonly AWS_GROUND_STATION_AGENT_INSTANCE_POLICY =
        'AWSGroundStationAgentInstancePolicy';

    public static readonly VPC_LATTICE_SERVICES_INVOKE_ACCESS =
        'VPCLatticeServicesInvokeAccess';

    public static readonly VPC_LATTICE_READ_ONLY_ACCESS =
        'VPCLatticeReadOnlyAccess';

    public static readonly VPC_LATTICE_FULL_ACCESS = 'VPCLatticeFullAccess';

    public static readonly AWS_MIGRATION_HUB_REFACTOR_SPACES_ENVIRONMENTS_WITHOUT_BRIDGES_FULL_ACCESS =
        'AWSMigrationHubRefactorSpaces-EnvironmentsWithoutBridgesFullAccess';

    public static readonly AMAZON_SAGE_MAKER_MODEL_REGISTRY_FULL_ACCESS =
        'AmazonSageMakerModelRegistryFullAccess';

    public static readonly AMAZON_CODE_CATALYST_READ_ONLY_ACCESS =
        'AmazonCodeCatalystReadOnlyAccess';

    public static readonly AMAZON_CODE_CATALYST_FULL_ACCESS =
        'AmazonCodeCatalystFullAccess';

    public static readonly AMAZON_OPEN_SEARCH_INGESTION_READ_ONLY_ACCESS =
        'AmazonOpenSearchIngestionReadOnlyAccess';

    public static readonly AMAZON_OPEN_SEARCH_INGESTION_FULL_ACCESS =
        'AmazonOpenSearchIngestionFullAccess';

    public static readonly AMAZON_VPC_REACHABILITY_ANALYZER_PATH_COMPONENT_READ_POLICY =
        'AmazonVPCReachabilityAnalyzerPathComponentReadPolicy';

    public static readonly AMAZON_CODE_GURU_SECURITY_SCAN_ACCESS =
        'AmazonCodeGuruSecurityScanAccess';

    public static readonly AMAZON_CODE_GURU_SECURITY_FULL_ACCESS =
        'AmazonCodeGuruSecurityFullAccess';

    public static readonly AMAZON_SECURITY_LAKE_ADMINISTRATOR =
        'AmazonSecurityLakeAdministrator';

    public static readonly AMAZON_DOC_DB_ELASTIC_FULL_ACCESS =
        'AmazonDocDBElasticFullAccess';

    public static readonly AMAZON_DOC_DB_ELASTIC_READ_ONLY_ACCESS =
        'AmazonDocDBElasticReadOnlyAccess';

    public static readonly AMAZON_VPC_REACHABILITY_ANALYZER_FULL_ACCESS_POLICY =
        'AmazonVPCReachabilityAnalyzerFullAccessPolicy';

    public static readonly AMAZON_MACIE_READ_ONLY_ACCESS =
        'AmazonMacieReadOnlyAccess';

    public static readonly AMAZON_VPC_NETWORK_ACCESS_ANALYZER_FULL_ACCESS_POLICY =
        'AmazonVPCNetworkAccessAnalyzerFullAccessPolicy';

    public static readonly AWS_RESILIENCE_HUB_ASSSESSMENT_EXECUTION_POLICY =
        'AWSResilienceHubAsssessmentExecutionPolicy';

    public static readonly AWS_APP_FABRIC_FULL_ACCESS =
        'AWSAppFabricFullAccess';

    public static readonly AWS_APP_FABRIC_READ_ONLY_ACCESS =
        'AWSAppFabricReadOnlyAccess';

    public static readonly AMAZON_COGNITO_UN_AUTHED_IDENTITIES_SESSION_POLICY =
        'AmazonCognitoUnAuthedIdentitiesSessionPolicy';

    public static readonly AWS_ELEMENTAL_MEDIA_PACKAGE_V2_FULL_ACCESS =
        'AWSElementalMediaPackageV2FullAccess';

    public static readonly AWS_ELEMENTAL_MEDIA_PACKAGE_V2_READ_ONLY =
        'AWSElementalMediaPackageV2ReadOnly';

    public static readonly AWS_HEALTH_IMAGING_FULL_ACCESS =
        'AWSHealthImagingFullAccess';

    public static readonly AWS_HEALTH_IMAGING_READ_ONLY_ACCESS =
        'AWSHealthImagingReadOnlyAccess';

    public static readonly CLOUD_WATCH_FULL_ACCESS_V2 =
        'CloudWatchFullAccessV2';

    public static readonly AMAZON_RDS_PERFORMANCE_INSIGHTS_FULL_ACCESS =
        'AmazonRDSPerformanceInsightsFullAccess';

    public static readonly AWS_ENTITY_RESOLUTION_CONSOLE_FULL_ACCESS =
        'AWSEntityResolutionConsoleFullAccess';

    public static readonly AWS_ENTITY_RESOLUTION_CONSOLE_READ_ONLY_ACCESS =
        'AWSEntityResolutionConsoleReadOnlyAccess';

    public static readonly AWS_APPLICATION_MIGRATION_SERVICE_EC2_INSTANCE_POLICY =
        'AWSApplicationMigrationServiceEc2InstancePolicy';

    public static readonly AMAZON_LAUNCH_WIZARD_FULL_ACCESS_V2 =
        'AmazonLaunchWizardFullAccessV2';

    public static readonly AMAZON_DATA_ZONE_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY =
        'AmazonDataZoneEnvironmentRolePermissionsBoundary';

    public static readonly AMAZON_KEYSPACES_READ_ONLY_ACCESS_V2 =
        'AmazonKeyspacesReadOnlyAccess_v2';

    public static readonly AWS_ELASTIC_DISASTER_RECOVERY_LAUNCH_ACTIONS_POLICY =
        'AWSElasticDisasterRecoveryLaunchActionsPolicy';

    public static readonly AMAZON_DATA_ZONE_FULL_ACCESS =
        'AmazonDataZoneFullAccess';

    public static readonly AMAZON_DATA_ZONE_REDSHIFT_GLUE_PROVISIONING_POLICY =
        'AmazonDataZoneRedshiftGlueProvisioningPolicy';

    public static readonly AMAZON_DATA_ZONE_FULL_USER_ACCESS =
        'AmazonDataZoneFullUserAccess';

    public static readonly AMAZON_SAGE_MAKER_CANVAS_DATA_PREP_FULL_ACCESS =
        'AmazonSageMakerCanvasDataPrepFullAccess';

    public static readonly AWS_IAM_IDENTITY_CENTER_ALLOW_LIST_FOR_IDENTITY_CONTEXT =
        'AWSIAMIdentityCenterAllowListForIdentityContext';

    public static readonly PARTNER_CENTRAL_ACCOUNT_MANAGEMENT_USER_ROLE_ASSOCIATION =
        'PartnerCentralAccountManagementUserRoleAssociation';

    public static readonly AWS_INCIDENT_MANAGER_INCIDENT_ACCESS_SERVICE_ROLE_POLICY =
        'AWSIncidentManagerIncidentAccessServiceRolePolicy';

    public static readonly AWS_RESOURCE_EXPLORER_ORGANIZATIONS_ACCESS =
        'AWSResourceExplorerOrganizationsAccess';

    public static readonly AWS_REPOST_SPACE_SUPPORT_OPERATIONS_POLICY =
        'AWSRepostSpaceSupportOperationsPolicy';

    public static readonly AWS_ELASTIC_DISASTER_RECOVERY_CONSOLE_FULL_ACCESS_V2 =
        'AWSElasticDisasterRecoveryConsoleFullAccess_v2';

    public static readonly AMAZON_ONE_ENTERPRISE_FULL_ACCESS =
        'AmazonOneEnterpriseFullAccess';

    public static readonly AMAZON_ONE_ENTERPRISE_READ_ONLY_ACCESS =
        'AmazonOneEnterpriseReadOnlyAccess';

    public static readonly AMAZON_ONE_ENTERPRISE_INSTALLER_ACCESS =
        'AmazonOneEnterpriseInstallerAccess';

    public static readonly AMAZON_Q_FULL_ACCESS = 'AmazonQFullAccess';

    public static readonly AMAZON_SAGE_MAKER_CLUSTER_INSTANCE_ROLE_POLICY =
        'AmazonSageMakerClusterInstanceRolePolicy';

    public static readonly AWS_CLEAN_ROOMS_ML_READ_ONLY_ACCESS =
        'AWSCleanRoomsMLReadOnlyAccess';

    public static readonly AWS_CLEAN_ROOMS_ML_FULL_ACCESS =
        'AWSCleanRoomsMLFullAccess';

    public static readonly NEPTUNE_GRAPH_READ_ONLY_ACCESS =
        'NeptuneGraphReadOnlyAccess';

    public static readonly IVS_READ_ONLY_ACCESS = 'IVSReadOnlyAccess';

    public static readonly AMAZON_BEDROCK_FULL_ACCESS =
        'AmazonBedrockFullAccess';

    public static readonly AMAZON_BEDROCK_READ_ONLY = 'AmazonBedrockReadOnly';

    public static readonly COST_OPTIMIZATION_HUB_READ_ONLY_ACCESS =
        'CostOptimizationHubReadOnlyAccess';

    public static readonly IVS_FULL_ACCESS = 'IVSFullAccess';

    public static readonly COST_OPTIMIZATION_HUB_ADMIN_ACCESS =
        'CostOptimizationHubAdminAccess';

    public static readonly AWS_ARTIFACT_REPORTS_READ_ONLY_ACCESS =
        'AWSArtifactReportsReadOnlyAccess';

    public static readonly AWS_GRAFANA_WORKSPACE_PERMISSION_MANAGEMENT_V2 =
        'AWSGrafanaWorkspacePermissionManagementV2';

    public static readonly AMAZON_INSPECTOR2_MANAGED_CIS_POLICY =
        'AmazonInspector2ManagedCisPolicy';

    public static readonly AMAZON_SAGE_MAKER_CANVAS_BEDROCK_ACCESS =
        'AmazonSageMakerCanvasBedrockAccess';

    public static readonly AMAZON_RDS_CUSTOM_INSTANCE_PROFILE_ROLE_POLICY =
        'AmazonRDSCustomInstanceProfileRolePolicy';

    public static readonly AMAZON_TIMESTREAM_INFLUX_DB_FULL_ACCESS =
        'AmazonTimestreamInfluxDBFullAccess';

    public static readonly AWS_EC2_VSS_SNAPSHOT_POLICY =
        'AWSEC2VssSnapshotPolicy';

    public static readonly AWS_QUICK_SIGHT_ASSET_BUNDLE_EXPORT_POLICY =
        'AWSQuickSightAssetBundleExportPolicy';

    public static readonly AWS_QUICK_SIGHT_ASSET_BUNDLE_IMPORT_POLICY =
        'AWSQuickSightAssetBundleImportPolicy';

    public static readonly AWS_DEADLINE_CLOUD_USER_ACCESS_FARMS =
        'AWSDeadlineCloud-UserAccessFarms';

    public static readonly AWS_DEADLINE_CLOUD_USER_ACCESS_FLEETS =
        'AWSDeadlineCloud-UserAccessFleets';

    public static readonly AWS_DEADLINE_CLOUD_USER_ACCESS_JOBS =
        'AWSDeadlineCloud-UserAccessJobs';

    public static readonly AWS_DEADLINE_CLOUD_USER_ACCESS_QUEUES =
        'AWSDeadlineCloud-UserAccessQueues';

    public static readonly AWS_DEADLINE_CLOUD_FLEET_WORKER =
        'AWSDeadlineCloud-FleetWorker';

    public static readonly AWS_DEADLINE_CLOUD_WORKER_HOST =
        'AWSDeadlineCloud-WorkerHost';

    public static readonly AMAZON_DATA_ZONE_SAGE_MAKER_ENVIRONMENT_ROLE_PERMISSIONS_BOUNDARY =
        'AmazonDataZoneSageMakerEnvironmentRolePermissionsBoundary';

    public static readonly AMAZON_DATA_ZONE_SAGE_MAKER_PROVISIONING_ROLE_POLICY =
        'AmazonDataZoneSageMakerProvisioningRolePolicy';

    public static readonly AMAZON_DATA_ZONE_SAGE_MAKER_MANAGE_ACCESS_ROLE_POLICY =
        'AmazonDataZoneSageMakerManageAccessRolePolicy';

    public static readonly AMAZON_ROUTE53_PROFILES_READ_ONLY_ACCESS =
        'AmazonRoute53ProfilesReadOnlyAccess';

    public static readonly AMAZON_ROUTE53_PROFILES_FULL_ACCESS =
        'AmazonRoute53ProfilesFullAccess';

    public static readonly AMAZON_OPEN_SEARCH_DIRECT_QUERY_GLUE_CREATE_ACCESS =
        'AmazonOpenSearchDirectQueryGlueCreateAccess';

    public static readonly EC2_FAST_LAUNCH_FULL_ACCESS =
        'EC2FastLaunchFullAccess';

    public static readonly CLOUD_WATCH_APPLICATION_SIGNALS_READ_ONLY_ACCESS =
        'CloudWatchApplicationSignalsReadOnlyAccess';

    public static readonly CLOUD_WATCH_APPLICATION_SIGNALS_FULL_ACCESS =
        'CloudWatchApplicationSignalsFullAccess';

    public static readonly AMAZON_WORK_SPACES_SECURE_BROWSER_READ_ONLY =
        'AmazonWorkSpacesSecureBrowserReadOnly';

    public static readonly AWS_QUICK_SETUP_PATCH_POLICY_BASELINE_ACCESS =
        'AWSQuickSetupPatchPolicyBaselineAccess';

    public static readonly AWS_SYSTEMS_MANAGER_ENABLE_CONFIG_RECORDING_EXECUTION_POLICY =
        'AWSSystemsManagerEnableConfigRecordingExecutionPolicy';

    public static readonly AWS_SYSTEMS_MANAGER_ENABLE_EXPLORER_EXECUTION_POLICY =
        'AWSSystemsManagerEnableExplorerExecutionPolicy';

    public static readonly AWS_QUICK_SETUP_DEV_OPS_GURU_PERMISSIONS_BOUNDARY =
        'AWSQuickSetupDevOpsGuruPermissionsBoundary';

    public static readonly AWS_QUICK_SETUP_PATCH_POLICY_PERMISSIONS_BOUNDARY =
        'AWSQuickSetupPatchPolicyPermissionsBoundary';

    public static readonly AWS_QUICK_SETUP_SSM_HOST_MGMT_PERMISSIONS_BOUNDARY =
        'AWSQuickSetupSSMHostMgmtPermissionsBoundary';

    public static readonly AWS_QUICK_SETUP_DISTRIBUTOR_PERMISSIONS_BOUNDARY =
        'AWSQuickSetupDistributorPermissionsBoundary';

    public static readonly AWS_QUICK_SETUP_CFGC_PACKS_PERMISSIONS_BOUNDARY =
        'AWSQuickSetupCFGCPacksPermissionsBoundary';

    public static readonly AWS_QUICK_SETUP_SCHEDULER_PERMISSIONS_BOUNDARY =
        'AWSQuickSetupSchedulerPermissionsBoundary';

    public static readonly AWS_QUICK_SETUP_DEPLOYMENT_ROLE_POLICY =
        'AWSQuickSetupDeploymentRolePolicy';

    public static readonly AWS_QUICK_SETUP_PATCH_POLICY_DEPLOYMENT_ROLE_POLICY =
        'AWSQuickSetupPatchPolicyDeploymentRolePolicy';

    public static readonly AMAZON_WORK_SPACES_POOL_SERVICE_ACCESS =
        'AmazonWorkSpacesPoolServiceAccess';

    public static readonly AMAZON_Q_DEVELOPER_ACCESS = 'AmazonQDeveloperAccess';

    public static readonly AMAZON_WORK_SPACES_THIN_CLIENT_READ_ONLY_ACCESS =
        'AmazonWorkSpacesThinClientReadOnlyAccess';

    public static readonly AMAZON_SAGE_MAKER_CANVAS_EMR_SERVERLESS_EXECUTION_ROLE_POLICY =
        'AmazonSageMakerCanvasEMRServerlessExecutionRolePolicy';

    public static readonly AMAZON_BEDROCK_STUDIO_PERMISSIONS_BOUNDARY =
        'AmazonBedrockStudioPermissionsBoundary';

    public static readonly AMAZON_WORK_SPACES_THIN_CLIENT_FULL_ACCESS =
        'AmazonWorkSpacesThinClientFullAccess';

    public static readonly AWS_COMPROMISED_KEY_QUARANTINE_V3 =
        'AWSCompromisedKeyQuarantineV3';

    public static readonly AWS_DIRECTORY_SERVICE_DATA_FULL_ACCESS =
        'AWSDirectoryServiceDataFullAccess';

    public static readonly AWS_DIRECTORY_SERVICE_DATA_READ_ONLY_ACCESS =
        'AWSDirectoryServiceDataReadOnlyAccess';

    public static readonly AMAZON_EKS_WORKER_NODE_MINIMAL_POLICY =
        'AmazonEKSWorkerNodeMinimalPolicy';

    public static readonly AMAZON_EC2_CONTAINER_REGISTRY_PULL_ONLY =
        'AmazonEC2ContainerRegistryPullOnly';

    public static readonly RESOURCE_GROUPS_TAGGING_API_TAG_UNTAG_SUPPORTED_RESOURCES =
        'ResourceGroupsTaggingAPITagUntagSupportedResources';

    public static readonly AMAZON_VERIFIED_PERMISSIONS_FULL_ACCESS =
        'AmazonVerifiedPermissionsFullAccess';

    public static readonly AMAZON_VERIFIED_PERMISSIONS_READ_ONLY_ACCESS =
        'AmazonVerifiedPermissionsReadOnlyAccess';

    public static readonly CLOUD_WATCH_LAMBDA_APPLICATION_SIGNALS_EXECUTION_ROLE_POLICY =
        'CloudWatchLambdaApplicationSignalsExecutionRolePolicy';

    public static readonly CLOUD_WATCH_INTERNET_MONITOR_FULL_ACCESS =
        'CloudWatchInternetMonitorFullAccess';

    public static readonly AWS_DATA_EXCHANGE_DATA_GRANT_OWNER_FULL_ACCESS =
        'AWSDataExchangeDataGrantOwnerFullAccess';

    public static readonly AWS_DATA_EXCHANGE_DATA_GRANT_RECEIVER_FULL_ACCESS =
        'AWSDataExchangeDataGrantReceiverFullAccess';

    public static readonly AMAZON_EKS_NETWORKING_POLICY =
        'AmazonEKSNetworkingPolicy';

    public static readonly AMAZON_EKS_LOAD_BALANCING_POLICY =
        'AmazonEKSLoadBalancingPolicy';

    public static readonly AMAZON_EKS_BLOCK_STORAGE_POLICY =
        'AmazonEKSBlockStoragePolicy';

    public static readonly AMAZON_EKS_COMPUTE_POLICY = 'AmazonEKSComputePolicy';

    public static readonly GAME_LIFT_CONTAINER_FLEET_POLICY =
        'GameLiftContainerFleetPolicy';

    public static readonly CLOUD_WATCH_INTERNET_MONITOR_READ_ONLY_ACCESS =
        'CloudWatchInternetMonitorReadOnlyAccess';

    public static readonly AWS_PARTNER_CENTRAL_OPPORTUNITY_MANAGEMENT =
        'AWSPartnerCentralOpportunityManagement';

    public static readonly AWS_PARTNER_CENTRAL_SANDBOX_FULL_ACCESS =
        'AWSPartnerCentralSandboxFullAccess';

    public static readonly AMAZON_ECS_INFRASTRUCTURE_ROLE_POLICY_FOR_VPC_LATTICE =
        'AmazonECSInfrastructureRolePolicyForVpcLattice';

    public static readonly AWS_QUICK_SETUP_ENABLE_DHMC_EXECUTION_POLICY =
        'AWSQuickSetupEnableDHMCExecutionPolicy';

    public static readonly AWS_QUICK_SETUP_MANAGED_INSTANCE_PROFILE_EXECUTION_POLICY =
        'AWSQuickSetupManagedInstanceProfileExecutionPolicy';

    public static readonly AWS_QUICK_SETUP_SSM_LIFECYCLE_MANAGEMENT_EXECUTION_POLICY =
        'AWSQuickSetupSSMLifecycleManagementExecutionPolicy';

    public static readonly AWS_QUICK_SETUP_SSM_DEPLOYMENT_S3_BUCKET_ROLE_POLICY =
        'AWSQuickSetupSSMDeploymentS3BucketRolePolicy';

    public static readonly AWS_QUICK_SETUP_ENABLE_AREX_EXECUTION_POLICY =
        'AWSQuickSetupEnableAREXExecutionPolicy';

    public static readonly AWS_QUICK_SETUP_SSM_MANAGE_RESOURCES_EXECUTION_POLICY =
        'AWSQuickSetupSSMManageResourcesExecutionPolicy';

    public static readonly AWS_QUICK_SETUP_SSM_DEPLOYMENT_ROLE_POLICY =
        'AWSQuickSetupSSMDeploymentRolePolicy';

    public static readonly AWS_SSM_AUTOMATION_DIAGNOSIS_BUCKET_POLICY =
        'AWS-SSM-Automation-DiagnosisBucketPolicy';

    public static readonly AWS_SSM_DIAGNOSIS_AUTOMATION_ADMINISTRATION_ROLE_POLICY =
        'AWS-SSM-DiagnosisAutomation-AdministrationRolePolicy';

    public static readonly AWS_SSM_DIAGNOSIS_AUTOMATION_EXECUTION_ROLE_POLICY =
        'AWS-SSM-DiagnosisAutomation-ExecutionRolePolicy';

    public static readonly AWS_SSM_DIAGNOSIS_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY =
        'AWS-SSM-DiagnosisAutomation-OperationalAccountAdministrationRolePolicy';

    public static readonly AWS_SSM_REMEDIATION_AUTOMATION_ADMINISTRATION_ROLE_POLICY =
        'AWS-SSM-RemediationAutomation-AdministrationRolePolicy';

    public static readonly AWS_SSM_REMEDIATION_AUTOMATION_EXECUTION_ROLE_POLICY =
        'AWS-SSM-RemediationAutomation-ExecutionRolePolicy';

    public static readonly AWS_SSM_REMEDIATION_AUTOMATION_OPERATIONAL_ACCOUNT_ADMINISTRATION_ROLE_POLICY =
        'AWS-SSM-RemediationAutomation-OperationalAccountAdministrationRolePolicy';

    public static readonly AWS_PARTNER_CENTRAL_FULL_ACCESS =
        'AWSPartnerCentralFullAccess';

    public static readonly AWS_MARKETPLACE_SELLER_OFFER_MANAGEMENT =
        'AWSMarketplaceSellerOfferManagement';

    public static readonly SAGE_MAKER_STUDIO_PROJECT_ROLE_MACHINE_LEARNING_POLICY =
        'SageMakerStudioProjectRoleMachineLearningPolicy';

    public static readonly SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_PERMISSIONS_BOUNDARY =
        'SageMakerStudioProjectUserRolePermissionsBoundary';

    public static readonly SAGE_MAKER_STUDIO_PROJECT_USER_ROLE_POLICY =
        'SageMakerStudioProjectUserRolePolicy';

    public static readonly AWS_ARTIFACT_AGREEMENTS_FULL_ACCESS =
        'AWSArtifactAgreementsFullAccess';

    public static readonly AWS_ARTIFACT_AGREEMENTS_READ_ONLY_ACCESS =
        'AWSArtifactAgreementsReadOnlyAccess';

    public static readonly AWS_PARTNER_LED_SUPPORT_READ_ONLY_ACCESS =
        'AWSPartnerLedSupportReadOnlyAccess';

    public static readonly SAGE_MAKER_STUDIO_FULL_ACCESS =
        'SageMakerStudioFullAccess';

    public static readonly CLOUD_WATCH_OPEN_SEARCH_DASHBOARDS_FULL_ACCESS =
        'CloudWatchOpenSearchDashboardsFullAccess';

    public static readonly CLOUD_WATCH_OPEN_SEARCH_DASHBOARD_ACCESS =
        'CloudWatchOpenSearchDashboardAccess';

    public static readonly CLOUD_WATCH_NETWORK_FLOW_MONITOR_AGENT_PUBLISH_POLICY =
        'CloudWatchNetworkFlowMonitorAgentPublishPolicy';

    public static readonly AWS_SECURITY_INCIDENT_RESPONSE_READ_ONLY_ACCESS =
        'AWSSecurityIncidentResponseReadOnlyAccess';

    public static readonly AWS_SECURITY_INCIDENT_RESPONSE_CASE_FULL_ACCESS =
        'AWSSecurityIncidentResponseCaseFullAccess';

    public static readonly AWS_SECURITY_INCIDENT_RESPONSE_FULL_ACCESS =
        'AWSSecurityIncidentResponseFullAccess';

    public static readonly AI_OPS_ASSISTANT_POLICY = 'AIOpsAssistantPolicy';

    public static readonly AI_OPS_CONSOLE_ADMIN_POLICY =
        'AIOpsConsoleAdminPolicy';

    public static readonly AI_OPS_READ_ONLY_ACCESS = 'AIOpsReadOnlyAccess';

    public static readonly AI_OPS_OPERATOR_ACCESS = 'AIOpsOperatorAccess';

    public static readonly AMAZON_S3_TABLES_READ_ONLY_ACCESS =
        'AmazonS3TablesReadOnlyAccess';

    public static readonly AMAZON_AURORA_DSQL_READ_ONLY_ACCESS =
        'AmazonAuroraDSQLReadOnlyAccess';

    public static readonly AMAZON_S3_TABLES_FULL_ACCESS =
        'AmazonS3TablesFullAccess';

    public static readonly Q_BUSINESS_QUICKSIGHT_PLUGIN_POLICY =
        'QBusinessQuicksightPluginPolicy';

    public static readonly AMAZON_AURORA_DSQL_CONSOLE_FULL_ACCESS =
        'AmazonAuroraDSQLConsoleFullAccess';

    public static readonly AMAZON_AURORA_DSQL_FULL_ACCESS =
        'AmazonAuroraDSQLFullAccess';

    public static readonly AMAZON_SAGE_MAKER_TRAINING_PLAN_CREATE_ACCESS =
        'AmazonSageMakerTrainingPlanCreateAccess';

    public static readonly AMAZON_SAGE_MAKER_CANVAS_SM_DATA_SCIENCE_ASSISTANT_ACCESS =
        'AmazonSageMakerCanvasSMDataScienceAssistantAccess';

    public static readonly AWS_PARTNER_CENTRAL_SELLING_RESOURCE_SNAPSHOT_JOB_EXECUTION_ROLE_POLICY =
        'AWSPartnerCentralSellingResourceSnapshotJobExecutionRolePolicy';

    public static readonly AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_INDEXING =
        'AWSBackupServiceRolePolicyForIndexing';

    public static readonly AWS_BACKUP_SERVICE_ROLE_POLICY_FOR_ITEM_RESTORES =
        'AWSBackupServiceRolePolicyForItemRestores';

    public static readonly AMAZON_SAGE_MAKER_PARTNER_APPS_FULL_ACCESS =
        'AmazonSageMakerPartnerAppsFullAccess';

    public static readonly AWS_ELEMENTAL_MEDIA_CONNECT_READ_ONLY_ACCESS =
        'AWSElementalMediaConnectReadOnlyAccess';

    public static readonly AWS_ELEMENTAL_MEDIA_CONNECT_FULL_ACCESS =
        'AWSElementalMediaConnectFullAccess';

    private constructor() {} // Prevents instantiation
}
/** End AWS Managed Policy */
