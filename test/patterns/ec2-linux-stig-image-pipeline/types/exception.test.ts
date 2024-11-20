/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

import { Ec2LinuxImagePipeline } from '../../../../src/patterns/ec2-linux-image-pipeline';
import { FeatureError } from '../../../../src/patterns/ec2-linux-image-pipeline/types/exception';

describe('FeatureError', () => {
    it('should create an error with default message when only feature is provided', () => {
        const feature = Ec2LinuxImagePipeline.Feature.AWS_CLI;
        const error = new FeatureError(feature);

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('FeatureError');
        expect(error.message).toBe(
            `Feature '${Ec2LinuxImagePipeline.Feature.AWS_CLI}' is not currently supported.`
        );
    });

    it('should create an error with default message when feature and operating system are provided', () => {
        const feature = Ec2LinuxImagePipeline.Feature.AWS_CLI;
        const os =
            Ec2LinuxImagePipeline.OperatingSystem.RED_HAT_ENTERPRISE_LINUX_8_9;
        const error = new FeatureError(feature, os);

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('FeatureError');
        expect(error.message).toBe(
            `Feature '${Ec2LinuxImagePipeline.Feature.AWS_CLI}' is not compatible with the operating system '${Ec2LinuxImagePipeline.OperatingSystem.RED_HAT_ENTERPRISE_LINUX_8_9}'.`
        );
    });

    it('should create an error with custom message when provided', () => {
        const feature = Ec2LinuxImagePipeline.Feature.AWS_CLI;
        const os =
            Ec2LinuxImagePipeline.OperatingSystem.RED_HAT_ENTERPRISE_LINUX_8_9;
        const customMessage = 'Custom error message';
        const error = new FeatureError(feature, os, customMessage);

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('FeatureError');
        expect(error.message).toBe(customMessage);
    });

    it('should have the correct prototype chain', () => {
        const error = new FeatureError(Ec2LinuxImagePipeline.Feature.AWS_CLI);

        expect(error).toBeInstanceOf(FeatureError);
        expect(error).toBeInstanceOf(Error);
        expect(Object.getPrototypeOf(error)).toBe(FeatureError.prototype);
    });

    it('should be throwable', () => {
        expect(() => {
            throw new FeatureError(Ec2LinuxImagePipeline.Feature.AWS_CLI);
        }).toThrow(FeatureError);
    });
});
