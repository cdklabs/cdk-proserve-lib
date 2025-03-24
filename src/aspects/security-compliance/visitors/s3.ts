// s3-visitor.ts
import { CfnBucket, IBucket, Bucket } from 'aws-cdk-lib/aws-s3';
import { Stack } from 'aws-cdk-lib';
import { S3Settings } from '../types';
import { BaseVisitor } from './base';
import { IConstruct } from 'constructs';

export class S3Visitor extends BaseVisitor<CfnBucket, S3Settings> {
    private readonly accessLogBucket = new Map<string, IBucket>();

    public override canVisit(node: IConstruct): node is CfnBucket {
        return node instanceof CfnBucket;
    }

    public override visit(node: CfnBucket): void {
        // Apply server access logging
        if (
            this.settings?.serverAccessLogs?.destinationBucketName &&
            !node.loggingConfiguration
        ) {
            const stackId = Stack.of(node).stackId;
            let bucket: IBucket;

            if (!this.accessLogBucket.has(stackId)) {
                bucket = Bucket.fromBucketName(
                    node.stack,
                    'ImportedAccessLogBucket',
                    this.settings.serverAccessLogs.destinationBucketName
                );
                this.accessLogBucket.set(stackId, bucket);
            } else {
                bucket = this.accessLogBucket.get(stackId)!;
            }

            node.loggingConfiguration = {
                destinationBucketName: bucket.bucketName,
                logFilePrefix: node.logicalId
            };
        }

        // Apply versioning
        if (
            !this.settings?.versioning?.disabled &&
            !node.versioningConfiguration
        ) {
            node.versioningConfiguration = {
                status: 'Enabled'
            };
        }
    }
}
