// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { Readable } from 'node:stream';
import { NoSuchKey, S3 } from '@aws-sdk/client-s3';
import { type SdkStream } from '@smithy/types';
import { sdkStreamMixin } from '@smithy/util-stream-node';
import { Handler, Request, Response, NextFunction } from 'express';
import expressAsyncHandler = require('express-async-handler');
import { getType } from 'mime';
import { CommonHostingConfiguration } from '../../types/configuration';
import { CommonHost } from '../common';

/**
 * Configuration for the Amazon S3 backed hosting scheme
 */
export interface S3HostingConfiguration extends CommonHostingConfiguration {
    /**
     * Name of the Amazon S3 bucket where the static assets are located
     */
    readonly bucketName: string;

    /**
     * AWS region in which the Amazon S3 bucket was created and resides
     */
    readonly bucketRegion?: string;
}

/**
 * Metadata for an object loaded from Amazon S3
 */
interface LoadObjectResult {
    /**
     * Stream for the contents of the object
     */
    readonly data: SdkStream<Readable> | null;

    /**
     * Content type of the object
     */
    readonly contentType?: string;
}

/**
 * Static asset host backed by Amazon S3
 */
export class S3Host extends CommonHost<S3HostingConfiguration> {
    /**
     * Client for interacting with Amazon S3
     */
    private readonly s3: S3;

    /**
     * Create an Amazon S3 backed static asset host
     * @param props Configuration for the host
     */
    constructor(props: S3HostingConfiguration) {
        super(props);

        this.s3 = new S3({
            region: this.props.bucketRegion
        });
    }

    /**
     * Loads an object from an Amazon S3 bucket based on the given web path
     * @param path Web path of the object from the request which maps to the prefix of the object in Amazon S3
     * @returns Metadata about the object from Amazon S3
     */
    private async loadObject(path: string): Promise<LoadObjectResult> {
        // Add additional prefix if necessary
        const objectKey = join(this.staticFilePath, path);

        const objectRequest = await this.s3.getObject({
            Bucket: this.props.bucketName,
            Key: objectKey !== '/' ? objectKey.replace(/^\//, '') : objectKey
        });
        const data = objectRequest.Body
            ? sdkStreamMixin(objectRequest.Body)
            : null;

        return {
            data: data,
            contentType: objectRequest.ContentType
        };
    }

    /**
     * Express handler for the fallthrough SPA route
     */
    protected get spaHandler(): Handler {
        return expressAsyncHandler(
            async (_req: Request, res: Response, next: NextFunction) => {
                try {
                    if (this.props.spaIndexPage) {
                        const defaultContentType =
                            getType(this.props.spaIndexPage) ?? 'text/plain';

                        const file = await this.loadObject(
                            this.props.spaIndexPage
                        );

                        if (file.data !== null) {
                            res.setHeader(
                                'Content-Type',
                                file.contentType ?? defaultContentType
                            );

                            file.data.pipe(res);
                        } else {
                            res.sendStatus(500);
                        }
                    } else {
                        res.sendStatus(404);
                    }
                } catch (e) {
                    // Failed to load the default object
                    if (e instanceof NoSuchKey) {
                        res.sendStatus(404);
                    } else {
                        next(e);
                    }
                }
            }
        );
    }

    /**
     * Express handler for static assets
     */
    protected get fileHandler(): Handler {
        return expressAsyncHandler(
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const contentType = getType(req.path) ?? 'text/plain';

                    const file = await this.loadObject(req.path);

                    if (file.data !== null) {
                        res.setHeader(
                            'Content-Type',
                            file.contentType ?? contentType
                        );

                        file.data.pipe(res);
                    } else {
                        res.sendStatus(500);
                    }
                } catch (e) {
                    // Failed to load the object
                    if (e instanceof NoSuchKey) {
                        // Pass to the SPA handler (if available)
                        next();
                    } else {
                        next(e);
                    }
                }
            }
        );
    }
}
