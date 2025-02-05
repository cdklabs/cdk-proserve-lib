// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import express, {
    Express,
    Handler,
    NextFunction,
    Request,
    Response
} from 'express';
import morgan from 'morgan';
import { CommonHostingConfiguration } from '../../types/configuration';

/**
 * Defines available operations and properties for any host
 */
export interface IHost {
    create(): Express;
}

/**
 * Base class for all hosts
 * @template TConfiguration Configuration type for the specific host type
 */
export abstract class CommonHost<
    TConfiguration extends CommonHostingConfiguration
> implements IHost
{
    /**
     * Provides an error handler which only obfuscates errors for a production system
     *
     * This handler allows for 404s to pass through and shields all other errors as a generic 500
     *
     * @param error The original error
     * @param _req The web request being made
     * @param res The response to the web request being made
     * @param next Continuance function
     */
    protected static nonspecificErrorHandler(
        error: unknown,
        _req: Request,
        res: Response,
        next: NextFunction
    ) {
        // Allow 404 errors to parse
        if (
            error &&
            typeof error === 'object' &&
            'status' in error &&
            error.status === 404
        ) {
            next(error);
        } else {
            // Send 500 for everything else
            res.sendStatus(500);
        }
    }

    /**
     * Configuration for the host
     */
    protected readonly props: Readonly<TConfiguration>;

    /**
     * Path within the store to load static assets from
     */
    protected readonly staticFilePath: string;

    /**
     * Create the host
     * @param props Configuration for the host
     */
    constructor(props: TConfiguration) {
        this.props = Object.assign({}, props);

        this.staticFilePath = this.props.staticFilePath ?? '';
    }

    /**
     * Express handler for static assets
     */
    protected abstract get fileHandler(): Handler;

    /**
     * Express handler for the fallthrough SPA route
     */
    protected abstract get spaHandler(): Handler | undefined;

    /**
     * Create an Express app to host static assets
     * @returns Express app for static asset hosting
     */
    create(): Express {
        const app = express();

        // Configure default logging
        app.use(morgan('combined'));

        // First, try to load the URI as a static asset
        app.use(this.fileHandler);

        if (this.props.spaIndexPage && this.spaHandler) {
            // Second (only for SPA) load the base page which allows client to perform routing
            app.get('*spa', this.spaHandler);
        }

        // Last, override error handler to only show 404 and nondescript 500 for everything else
        // TODO: Allow verbose logging in dev
        app.use(CommonHost.nonspecificErrorHandler);

        return app;
    }
}
