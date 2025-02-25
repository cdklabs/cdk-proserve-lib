// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join } from 'node:path';
import {
    S3,
    GetObjectCommand,
    NoSuchKey,
    S3ServiceException
} from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
import request from 'supertest';
import { describe, beforeEach, it, expect } from 'vitest';
import {
    S3Host,
    S3HostingConfiguration
} from '../../../../../../src/patterns/apigateway-static-hosting/handler/hosts/s3';
import { streamFile } from '../../utilities/stream-fixture';

const commonConfig: Partial<S3HostingConfiguration> = {
    disableHttpLogging: true
};

const fixturesDir = join(__dirname, '..', '..');

describe('API Gateway Static Hosting Handler (S3 Host)', () => {
    const s3Mock = mockClient(S3);

    beforeEach(() => {
        s3Mock.reset();
    });

    const testBucketName = 'test-bucket';
    const testConfig: S3HostingConfiguration = {
        ...commonConfig,
        bucketName: testBucketName
    };

    describe('Default Configuration', () => {
        it('Should return 404 if asset directory is set incorrectly', async () => {
            // Arrange
            const app = new S3Host(testConfig).create();
            const testFile = '/assets/sample.txt';

            s3Mock
                .on(GetObjectCommand)
                .rejects()
                .on(GetObjectCommand, {
                    Bucket: testBucketName,
                    Key: testFile.substring(1)
                })
                .rejects(new NoSuchKey({ $metadata: {}, message: '' }));

            // Act
            const response = await request(app).get(testFile);

            // Assert
            expect(response.statusCode).toEqual(404);
            expect(s3Mock.calls().length).toEqual(1);
        });
    });

    describe('SPA', () => {
        const staticFilePath = 'fixtures';
        const spaIndex = 'outer.html';

        const spaConfig: S3HostingConfiguration = {
            ...testConfig,
            spaIndexPage: spaIndex,
            staticFilePath: staticFilePath
        };

        it('Should serve index page for any dynamic route when no asset found', async () => {
            // Arrange
            const app = new S3Host(spaConfig).create();
            const url = '/my/wild/dynamic/url';

            s3Mock
                .on(GetObjectCommand)
                .rejects()
                .on(GetObjectCommand, {
                    Bucket: testBucketName,
                    Key: `${staticFilePath}/${url.substring(1)}`
                })
                .rejects(new NoSuchKey({ $metadata: {}, message: '' }))
                .on(GetObjectCommand, {
                    Bucket: testBucketName,
                    Key: `${staticFilePath}/${spaIndex}`
                })
                .resolves({
                    Body: streamFile(
                        join(fixturesDir, staticFilePath, spaIndex)
                    )
                });

            // Act
            const response = await request(app).get(url);

            // Assert
            expect(response.statusCode).toEqual(200);
            expect(response.text).toMatch('outer');
            expect(s3Mock.calls().length).toEqual(2);
        });

        it('Should serve static asset when found', async () => {
            // Arrange
            const app = new S3Host(spaConfig).create();
            const url = '/assets/sample.txt';

            s3Mock
                .on(GetObjectCommand)
                .rejects()
                .on(GetObjectCommand, {
                    Bucket: testBucketName,
                    Key: `${staticFilePath}/${url.substring(1)}`
                })
                .resolves({
                    Body: streamFile(
                        join(fixturesDir, staticFilePath, url.substring(1))
                    )
                });

            // Act
            const response = await request(app).get(url);

            // Assert
            expect(response.statusCode).toEqual(200);
            expect(response.text).toMatch('sample');
            expect(s3Mock.calls().length).toEqual(1);
        });

        it('Should return 500 for an S3 error on the intial request', async () => {
            // Arrange
            const app = new S3Host(spaConfig).create();
            const url = '/my/wild/dynamic/url';

            s3Mock
                .on(GetObjectCommand)
                .rejects()
                .on(GetObjectCommand, {
                    Bucket: testBucketName,
                    Key: `${staticFilePath}/${url.substring(1)}`
                })
                .rejects(
                    new S3ServiceException({
                        $fault: 'client',
                        $metadata: {
                            httpStatusCode: 403
                        },
                        name: 'AccessDenied'
                    })
                );

            // Act
            const response = await request(app).get(url);

            // Assert
            expect(response.statusCode).toEqual(500);
            expect(s3Mock.calls().length).toEqual(1);
        });

        it('Should return 404 if the SPA index page is missing', async () => {
            // Arrange
            const app = new S3Host(spaConfig).create();
            const url = '/my/wild/dynamic/url';

            s3Mock
                .on(GetObjectCommand)
                .rejects()
                .on(GetObjectCommand, {
                    Bucket: testBucketName,
                    Key: `${staticFilePath}/${url.substring(1)}`
                })
                .rejects(new NoSuchKey({ $metadata: {}, message: '' }))
                .on(GetObjectCommand, {
                    Bucket: testBucketName,
                    Key: `${staticFilePath}/${spaIndex}`
                })
                .rejects(new NoSuchKey({ $metadata: {}, message: '' }));

            // Act
            const response = await request(app).get(url);

            // Assert
            expect(response.statusCode).toEqual(404);
            expect(s3Mock.calls().length).toEqual(2);
        });

        it('Should return 500 if S3 returns no body', async () => {
            // Arrange
            const app = new S3Host(spaConfig).create();
            const url = '/my/wild/dynamic/url';

            s3Mock
                .on(GetObjectCommand)
                .rejects()
                .on(GetObjectCommand, {
                    Bucket: testBucketName,
                    Key: `${staticFilePath}/${url.substring(1)}`
                })
                .rejects(new NoSuchKey({ $metadata: {}, message: '' }))
                .on(GetObjectCommand, {
                    Bucket: testBucketName,
                    Key: `${staticFilePath}/${spaIndex}`
                })
                .resolves({
                    Body: undefined
                });

            // Act
            const response = await request(app).get(url);

            // Assert
            expect(response.statusCode).toEqual(500);
            expect(s3Mock.calls().length).toEqual(2);
        });

        it('Should return 500 for an S3 error on the SPA index page', async () => {
            // Arrange
            const app = new S3Host(spaConfig).create();
            const url = '/my/wild/dynamic/url';

            s3Mock
                .on(GetObjectCommand)
                .rejects()
                .on(GetObjectCommand, {
                    Bucket: testBucketName,
                    Key: `${staticFilePath}/${url.substring(1)}`
                })
                .rejects(new NoSuchKey({ $metadata: {}, message: '' }))
                .on(GetObjectCommand, {
                    Bucket: testBucketName,
                    Key: `${staticFilePath}/${spaIndex}`
                })
                .rejects(
                    new S3ServiceException({
                        $fault: 'client',
                        $metadata: {
                            httpStatusCode: 403
                        },
                        name: 'AccessDenied'
                    })
                );

            // Act
            const response = await request(app).get(url);

            // Assert
            expect(response.statusCode).toEqual(500);
            expect(s3Mock.calls().length).toEqual(2);
        });
    });

    describe('Not SPA', () => {
        const staticFilePath = 'fixtures';

        const nonSpaConfig: S3HostingConfiguration = {
            ...testConfig,
            spaIndexPage: undefined,
            staticFilePath: staticFilePath
        };

        it('Should serve static asset when found', async () => {
            // Arrange
            const app = new S3Host(nonSpaConfig).create();
            const testAssets = new Map([
                ['/outer.html', 'outer'],
                ['/assets/inner.html', 'inner'],
                ['/assets/sample.txt', 'sample']
            ]);

            s3Mock.on(GetObjectCommand).rejects();

            for (const asset of testAssets.entries()) {
                const url = asset[0];
                const expectedText = asset[1];

                // Arrange
                s3Mock
                    .on(GetObjectCommand, {
                        Bucket: testBucketName,
                        Key: `${staticFilePath}/${url.substring(1)}`
                    })
                    .resolves({
                        Body: streamFile(
                            join(fixturesDir, staticFilePath, url.substring(1))
                        )
                    });

                // Act
                const response = await request(app).get(url);

                // Assert
                expect(response.statusCode).toEqual(200);
                expect(response.text).toMatch(expectedText);
            }

            expect(s3Mock.calls().length).toEqual(3);
        });

        it('Should return 404 when no static asset found', async () => {
            // Arrange
            const app = new S3Host(nonSpaConfig).create();
            const url = '/no/such/file.txt';

            s3Mock
                .on(GetObjectCommand)
                .rejects()
                .on(GetObjectCommand, {
                    Bucket: testBucketName,
                    Key: `${staticFilePath}/${url.substring(1)}`
                })
                .rejects(new NoSuchKey({ $metadata: {}, message: '' }));

            // Act
            const response = await request(app).get(url);

            // Assert
            expect(response.statusCode).toEqual(404);
            expect(s3Mock.calls().length).toEqual(1);
        });

        it('Should return 500 if S3 returns no body', async () => {
            // Arrange
            const app = new S3Host(nonSpaConfig).create();
            const url = '/outer.html';

            s3Mock
                .on(GetObjectCommand)
                .rejects()
                .on(GetObjectCommand, {
                    Bucket: testBucketName,
                    Key: `${staticFilePath}/${url.substring(1)}`
                })
                .resolves({
                    Body: undefined
                });

            // Act
            const response = await request(app).get(url);

            // Assert
            expect(response.statusCode).toEqual(500);
            expect(s3Mock.calls().length).toEqual(1);
        });
    });
});
