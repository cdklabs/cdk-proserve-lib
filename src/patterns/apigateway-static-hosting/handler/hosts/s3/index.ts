// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { NoSuchKey, S3 } from '@aws-sdk/client-s3';
import { sdkStreamMixin } from '@smithy/util-stream-node';
import { Handler, Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import mime from 'mime';
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
 * Static asset host backed by Amazon S3
 */
export class S3Host extends CommonHost<S3HostingConfiguration> {
    /**
     * Client for interacting with Amazon S3
     */
    private readonly s3: S3;

    /**
     * Default filename to use to index Amazon S3 when a GetObject fails
     * This is used to support Single Page Applications (SPA)
     */
    private readonly defaultKey?: string;

    /**
     * Create an Amazon S3 backed static asset host
     * @param props Configuration for the host
     */
    constructor(props: S3HostingConfiguration) {
        super(props);

        this.s3 = new S3({
            region: this.props.bucketRegion
        });

        this.defaultKey = this.props.spaIndexPage
            ? join(this.staticFilePath, this.props.spaIndexPage)
            : undefined;
    }

    /**
     * Express handler for the fallthrough SPA route
     */
    protected get spaHandler(): Handler | undefined {
        return undefined;
    }

    /**
     * Express handler for static assets
     */
    protected get fileHandler(): Handler {
        return expressAsyncHandler(
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const contentType = mime.getType(req.path) ?? 'text/plain';

                    // Add additional prefix if necessary
                    const objectKey = join(this.staticFilePath, req.path);

                    // Attempt to retrieve the object
                    const objectRequest = await this.s3.getObject({
                        Bucket: this.props.bucketName,
                        Key: objectKey
                    });
                    const data = objectRequest.Body
                        ? sdkStreamMixin(objectRequest.Body)
                        : null;

                    if (data !== null) {
                        res.setHeader(
                            'Content-Type',
                            objectRequest.ContentType ?? contentType
                        );
                        data.pipe(res);
                    } else {
                        res.sendStatus(500);
                    }
                } catch (e) {
                    // Failed to load the object
                    if (e instanceof NoSuchKey) {
                        // Special handling if we have a default key, e.g. for SPA
                        if (this.defaultKey !== undefined) {
                            try {
                                const defaultContentType =
                                    mime.getType(this.defaultKey) ??
                                    'text/plain';

                                // Try to load and stream the default object
                                const defaultObjectRequest =
                                    await this.s3.getObject({
                                        Bucket: this.props.bucketName,
                                        Key: this.defaultKey
                                    });
                                const data = defaultObjectRequest.Body
                                    ? sdkStreamMixin(defaultObjectRequest.Body)
                                    : null;

                                if (data !== null) {
                                    res.setHeader(
                                        'Content-Type',
                                        defaultObjectRequest.ContentType ??
                                            defaultContentType
                                    );
                                    data.pipe(res);
                                } else {
                                    res.sendStatus(500);
                                }
                            } catch (f) {
                                // Failed to load the default object
                                if (f instanceof NoSuchKey) {
                                    res.sendStatus(404);
                                } else {
                                    next(f);
                                }
                            }
                        } else {
                            res.sendStatus(404);
                        }
                    } else {
                        next(e);
                    }
                }
            }
        );
    }
}
