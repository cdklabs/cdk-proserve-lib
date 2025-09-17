import {
    RDSClient,
    DescribeDBInstancesCommand,
    ModifyDBInstanceCommand,
    DBInstance,
    RDSServiceException
} from '@aws-sdk/client-rds';
import { CloudFormationCustomResourceResponse, Context } from 'aws-lambda';

/**
 * Properties passed to the Lambda handler from the Custom Resource
 */
export interface ResourceProperties {
    /**
     * The RDS database instance identifier
     */
    readonly DBInstanceIdentifier: string;
}

/**
 * CloudFormation Custom Resource event with typed resource properties
 */
export interface HandlerEvent {
    RequestType: 'Create' | 'Update' | 'Delete';
    ResponseURL: string;
    StackId: string;
    RequestId: string;
    ResourceType: string;
    LogicalResourceId: string;
    PhysicalResourceId?: string;
    ResourceProperties: ResourceProperties;
    OldResourceProperties?: ResourceProperties;
}

/**
 * Response data returned by the Lambda handler
 */
export interface ResponseData {
    /**
     * The modified DB instance identifier
     */
    DBInstanceIdentifier: string;

    /**
     * Current MultiTenant status
     */
    MultiTenantStatus: string;

    /**
     * Status of the modification operation
     */
    ModificationStatus: string;

    /**
     * Any pending modifications
     */
    PendingModifications?: string;
}

/**
 * Error response format for validation and runtime errors
 */
export interface ErrorResponse {
    errorType: 'ValidationError' | 'RuntimeError' | 'PermissionError';
    errorMessage: string;
    dbInstanceId: string;
    requestId?: string;
}

/**
 * Validates that the database engine is Oracle
 */
function validateOracleEngine(dbInstance: DBInstance): void {
    if (
        !dbInstance.Engine ||
        !dbInstance.Engine.toLowerCase().includes('oracle')
    ) {
        throw new Error(
            `Database engine '${dbInstance.Engine}' is not Oracle. Oracle MultiTenant is only supported on Oracle databases.`
        );
    }
}

/**
 * Validates Oracle version compatibility for MultiTenant (19c+)
 */
function validateOracleVersion(dbInstance: DBInstance): void {
    const engineVersion = dbInstance.EngineVersion;
    if (!engineVersion) {
        throw new Error('Database engine version is not available');
    }

    // Oracle version format is typically like "19.0.0.0.ru-2023-01.rur-2023-01.r1"
    // We need to extract the major version (19, 21, etc.)
    const versionMatch = engineVersion.match(/^(\d+)\./);
    if (!versionMatch) {
        throw new Error(
            `Unable to parse Oracle version from '${engineVersion}'`
        );
    }

    const majorVersion = parseInt(versionMatch[1], 10);
    if (majorVersion < 19) {
        throw new Error(
            `Oracle version ${majorVersion} does not support MultiTenant. Oracle 19c or higher is required.`
        );
    }
}

/**
 * Validates Oracle edition for MultiTenant support
 * Note: MultiTenant is fully supported in Enterprise Edition, limited in Standard Edition
 */
function validateOracleEdition(dbInstance: DBInstance): void {
    const licenseModel = dbInstance.LicenseModel;

    // Check if it's Standard Edition (which has limited MultiTenant support)
    if (
        licenseModel &&
        licenseModel.toLowerCase().includes('license-included')
    ) {
        console.warn(
            'Warning: Oracle Standard Edition has limited MultiTenant support. ' +
                'Enterprise Edition is recommended for full MultiTenant capabilities.'
        );
    }
}

/**
 * Validates that the database is in available state
 */
function validateDatabaseStatus(dbInstance: DBInstance): void {
    const status = dbInstance.DBInstanceStatus;
    if (status !== 'available') {
        throw new Error(
            `Database instance is in '${status}' state. MultiTenant conversion requires the database to be in 'available' state.`
        );
    }
}

/**
 * Validates Oracle database compatibility for MultiTenant conversion
 */
async function validateOracleDatabase(
    rdsClient: RDSClient,
    dbInstanceId: string
): Promise<DBInstance> {
    try {
        const command = new DescribeDBInstancesCommand({
            DBInstanceIdentifier: dbInstanceId
        });

        const response = await rdsClient.send(command);

        if (!response.DBInstances || response.DBInstances.length === 0) {
            throw new Error(`Database instance '${dbInstanceId}' not found`);
        }

        const dbInstance = response.DBInstances[0];

        // Run all validation checks
        validateOracleEngine(dbInstance);
        validateOracleVersion(dbInstance);
        validateOracleEdition(dbInstance);
        validateDatabaseStatus(dbInstance);

        return dbInstance;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Database validation failed: ${error.message}`);
        }
        throw error;
    }
}

/**
 * Enables Oracle MultiTenant on the specified RDS instance
 */
export async function enableOracleMultiTenant(
    rdsClient: RDSClient,
    dbInstanceId: string
): Promise<void> {
    try {
        console.log(
            `Enabling Oracle MultiTenant on database instance: ${dbInstanceId}`
        );

        const command = new ModifyDBInstanceCommand({
            DBInstanceIdentifier: dbInstanceId,
            MultiTenant: true,
            ApplyImmediately: true
        });

        const response = await rdsClient.send(command);
        console.log(
            `ModifyDBInstance response:`,
            JSON.stringify(response, null, 2)
        );

        if (!response.DBInstance) {
            throw new Error(
                'ModifyDBInstance response did not include DBInstance details'
            );
        }

        console.log(
            `Successfully initiated MultiTenant conversion for ${dbInstanceId}`
        );
    } catch (error) {
        if (error instanceof RDSServiceException) {
            throw new Error(`RDS API error: ${error.name} - ${error.message}`);
        }
        if (error instanceof Error) {
            throw new Error(
                `Failed to enable Oracle MultiTenant: ${error.message}`
            );
        }
        throw error;
    }
}

/**
 * Monitors the status of the MultiTenant conversion operation
 */
export async function waitForMultiTenantConversion(
    rdsClient: RDSClient,
    dbInstanceId: string,
    maxWaitTimeMs: number = 1800000 // 30 minutes
): Promise<DBInstance> {
    const startTime = Date.now();
    const pollIntervalMs = 30000; // 30 seconds

    console.log(`Monitoring MultiTenant conversion status for ${dbInstanceId}`);

    while (Date.now() - startTime < maxWaitTimeMs) {
        try {
            const command = new DescribeDBInstancesCommand({
                DBInstanceIdentifier: dbInstanceId
            });

            const response = await rdsClient.send(command);

            if (!response.DBInstances || response.DBInstances.length === 0) {
                throw new Error(
                    `Database instance '${dbInstanceId}' not found during status monitoring`
                );
            }

            const dbInstance = response.DBInstances[0];
            const status = dbInstance.DBInstanceStatus;
            const pendingModifications = dbInstance.PendingModifiedValues;

            console.log(
                `Current status: ${status}, Pending modifications: ${JSON.stringify(pendingModifications)}`
            );

            // Check if conversion is complete
            if (
                status === 'available' &&
                (!pendingModifications ||
                    Object.keys(pendingModifications).length === 0)
            ) {
                console.log(
                    `MultiTenant conversion completed successfully for ${dbInstanceId}`
                );
                return dbInstance;
            }

            // Check for failed status
            if (status === 'failed' || status === 'incompatible-parameters') {
                throw new Error(
                    `MultiTenant conversion failed with status: ${status}`
                );
            }

            // Wait before next poll
            await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
        } catch (error) {
            if (error instanceof RDSServiceException) {
                throw new Error(
                    `RDS API error during status monitoring: ${error.name} - ${error.message}`
                );
            }
            throw error;
        }
    }

    throw new Error(
        `MultiTenant conversion timed out after ${maxWaitTimeMs / 1000} seconds`
    );
}

/**
 * Gets the current status of a database instance
 */
export async function getDatabaseStatus(
    rdsClient: RDSClient,
    dbInstanceId: string
): Promise<DBInstance> {
    try {
        const command = new DescribeDBInstancesCommand({
            DBInstanceIdentifier: dbInstanceId
        });

        const response = await rdsClient.send(command);

        if (!response.DBInstances || response.DBInstances.length === 0) {
            throw new Error(`Database instance '${dbInstanceId}' not found`);
        }

        return response.DBInstances[0];
    } catch (error) {
        if (error instanceof RDSServiceException) {
            throw new Error(`RDS API error: ${error.name} - ${error.message}`);
        }
        if (error instanceof Error) {
            throw new Error(`Failed to get database status: ${error.message}`);
        }
        throw error;
    }
}

/**
 * Handles CREATE operation - enables Oracle MultiTenant on the database
 */
async function handleCreate(
    rdsClient: RDSClient,
    dbInstanceId: string
): Promise<ResponseData> {
    console.log(`Handling CREATE operation for ${dbInstanceId}`);

    // Validate Oracle database compatibility before attempting conversion
    await validateOracleDatabase(rdsClient, dbInstanceId);
    console.log(`Database validation successful for ${dbInstanceId}`);

    // Enable Oracle MultiTenant
    await enableOracleMultiTenant(rdsClient, dbInstanceId);

    // Wait for the conversion to complete
    const finalDbInstance = await waitForMultiTenantConversion(
        rdsClient,
        dbInstanceId
    );

    return {
        DBInstanceIdentifier: dbInstanceId,
        MultiTenantStatus: 'Enabled',
        ModificationStatus: 'Complete',
        PendingModifications: finalDbInstance.PendingModifiedValues
            ? JSON.stringify(finalDbInstance.PendingModifiedValues)
            : undefined
    };
}

/**
 * Handles UPDATE operation - no-op since MultiTenant conversion is irreversible
 */
async function handleUpdate(
    rdsClient: RDSClient,
    dbInstanceId: string,
    oldProperties?: ResourceProperties,
    newProperties?: ResourceProperties
): Promise<ResponseData> {
    console.log(`Handling UPDATE operation for ${dbInstanceId}`);

    // Validate that no unsupported changes are being attempted
    if (oldProperties && newProperties) {
        if (
            oldProperties.DBInstanceIdentifier !==
            newProperties.DBInstanceIdentifier
        ) {
            throw new Error(
                'Cannot change DBInstanceIdentifier in UPDATE operation. ' +
                    'Oracle MultiTenant configuration is tied to the specific database instance.'
            );
        }
    }

    console.log(
        'UPDATE operation - no action taken (MultiTenant conversion is irreversible)'
    );
    console.log(
        'Oracle MultiTenant configuration cannot be modified or reverted once enabled'
    );

    // Get current database status to return accurate information
    const currentDbInstance = await getDatabaseStatus(rdsClient, dbInstanceId);

    return {
        DBInstanceIdentifier: dbInstanceId,
        MultiTenantStatus: 'Unchanged',
        ModificationStatus: 'No Action Required',
        PendingModifications: currentDbInstance.PendingModifiedValues
            ? JSON.stringify(currentDbInstance.PendingModifiedValues)
            : undefined
    };
}

/**
 * Handles DELETE operation - no-op since MultiTenant conversion is irreversible
 */
async function handleDelete(
    _rdsClient: RDSClient,
    dbInstanceId: string
): Promise<ResponseData> {
    console.log(`Handling DELETE operation for ${dbInstanceId}`);

    console.log(
        'DELETE operation - no action taken (MultiTenant conversion is irreversible)'
    );
    console.log(
        'Oracle MultiTenant configuration remains on the database instance'
    );
    console.log(
        'The database instance itself is not affected by this custom resource deletion'
    );

    // Log that the custom resource is being deleted but the database configuration remains
    console.log(
        `Custom resource for Oracle MultiTenant configuration on ${dbInstanceId} is being deleted`
    );
    console.log(
        'Note: The Oracle MultiTenant configuration on the database cannot be reverted'
    );

    return {
        DBInstanceIdentifier: dbInstanceId,
        MultiTenantStatus: 'Unchanged',
        ModificationStatus: 'Custom Resource Deleted'
    };
}

/**
 * Lambda handler for RDS Oracle MultiTenant configuration
 *
 * @param event - CloudFormation Custom Resource event
 * @param context - Lambda execution context
 * @returns CloudFormation Custom Resource response
 */
export async function handler(
    event: HandlerEvent,
    _context: Context
): Promise<CloudFormationCustomResourceResponse> {
    console.log('Event:', JSON.stringify(event, null, 2));

    const rdsClient = new RDSClient({});
    const dbInstanceId = event.ResourceProperties.DBInstanceIdentifier;
    const requestType = event.RequestType;

    try {
        let responseData: ResponseData;

        switch (requestType) {
            case 'Create':
                responseData = await handleCreate(rdsClient, dbInstanceId);
                break;

            case 'Update':
                responseData = await handleUpdate(
                    rdsClient,
                    dbInstanceId,
                    event.OldResourceProperties,
                    event.ResourceProperties
                );
                break;

            case 'Delete':
                responseData = await handleDelete(rdsClient, dbInstanceId);
                break;

            default:
                throw new Error(`Unsupported request type: ${requestType}`);
        }

        return {
            Status: 'SUCCESS',
            PhysicalResourceId: `rds-oracle-multitenant-${dbInstanceId}`,
            StackId: event.StackId,
            RequestId: event.RequestId,
            LogicalResourceId: event.LogicalResourceId,
            Data: responseData
        };
    } catch (error) {
        console.error('Handler error:', error);

        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred';

        return {
            Status: 'FAILED',
            Reason: errorMessage,
            PhysicalResourceId:
                event.PhysicalResourceId ||
                `rds-oracle-multitenant-${dbInstanceId}`,
            StackId: event.StackId,
            RequestId: event.RequestId,
            LogicalResourceId: event.LogicalResourceId,
            Data: {
                DBInstanceIdentifier: dbInstanceId,
                MultiTenantStatus: 'Failed',
                ModificationStatus: 'Failed'
            } as ResponseData
        };
    }
}
