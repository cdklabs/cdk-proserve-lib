// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import { Handler, NextFunction, Request, Response } from 'express';
import express = require('express');
import { CommonHostingConfiguration } from '../../types/configuration';
import { CommonHost } from '../common';

/**
 * Configuration for the inline file system backed hosting scheme
 */
export interface InlineHostingConfiguration
    extends CommonHostingConfiguration {}

/**
 * Static asset host backed by the local file system
 */
export class InlineHost extends CommonHost<InlineHostingConfiguration> {
    /**
     * Express handler for static assets
     */
    protected get fileHandler(): Handler {
        return express.static(join(__dirname, this.staticFilePath ?? ''));
    }

    /**
     * Express handler for the fallthrough SPA route
     */
    protected get spaHandler(): Handler {
        return (_req: Request, res: Response, next: NextFunction) => {
            if (this.props.spaIndexPage) {
                res.sendFile(
                    join(
                        __dirname,
                        this.staticFilePath,
                        this.props.spaIndexPage
                    )
                );
            } else {
                next();
            }
        };
    }
}
