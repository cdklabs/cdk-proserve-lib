// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import {
    InlineHost,
    InlineHostingConfiguration
} from '../../../../../../src/patterns/apigateway-static-hosting/handler/hosts/inline';

const commonConfig: Partial<InlineHostingConfiguration> = {
    disableHttpLogging: true
};

// Must be relative to source file since __dirname is used
const relativeFixturesDir = join(
    '..',
    '..',
    '..',
    '..',
    '..',
    '..',
    'test',
    'patterns',
    'apigateway-static-hosting',
    'handler',
    'fixtures'
);

describe('API Gateway Static Hosting Handler (Inline Host)', () => {
    describe('Default Configuration', () => {
        it('Should return 404 if asset directory is set incorrectly', async () => {
            // Arrange
            const app = new InlineHost({
                ...commonConfig
            }).create();

            // Act
            const response = await request(app).get('/assets/sample.txt');

            // Assert
            expect(response.statusCode).toEqual(404);
        });
    });

    describe('SPA', () => {
        const inlineSpaEnvironment: InlineHostingConfiguration = {
            ...commonConfig,
            spaIndexPage: 'outer.html',
            staticFilePath: relativeFixturesDir
        };

        it('Should serve index page for any dynamic route when no asset found', async () => {
            // Arrange
            const app = new InlineHost(inlineSpaEnvironment).create();

            // Act
            const response = await request(app).get('/my/wild/dynamic/url');

            // Assert
            expect(response.statusCode).toEqual(200);
            expect(response.text).toMatch('outer');
        });

        it('Should serve static asset when found', async () => {
            // Arrange
            const app = new InlineHost(inlineSpaEnvironment).create();

            // Act
            const response = await request(app).get('/assets/sample.txt');

            //Assert
            expect(response.statusCode).toEqual(200);
            expect(response.text).toMatch('sample');
        });
    });

    describe('Not SPA', () => {
        const inlineNonSpaEnvironment: InlineHostingConfiguration = {
            ...commonConfig,
            staticFilePath: relativeFixturesDir
        };

        it('Should serve static asset when found', async () => {
            // Arrange
            const app = new InlineHost(inlineNonSpaEnvironment).create();

            const testAssets = new Map([
                ['/outer.html', 'outer'],
                ['/assets/inner.html', 'inner'],
                ['/assets/sample.txt', 'sample']
            ]);

            for (const asset of testAssets.entries()) {
                const url = asset[0];
                const expectedText = asset[1];

                // Act
                const response = await request(app).get(url);

                // Assert
                expect(response.statusCode).toEqual(200);
                expect(response.text).toMatch(expectedText);
            }
        });

        it('Should return 404 when no static asset found', async () => {
            // Arrange
            const app = new InlineHost(inlineNonSpaEnvironment).create();

            // Act
            const response = await request(app).get('/no/such/file.txt');

            // Assert
            expect(response.statusCode).toEqual(404);
        });
    });
});
