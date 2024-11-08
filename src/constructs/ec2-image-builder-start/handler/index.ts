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

import { SNSEvent, Context } from 'aws-lambda';
import axios from 'axios';

type SignalStatus = 'SUCCESS' | 'FAILURE';
type ImagePipelineStatus = 'AVAILABLE' | 'FAILED';

interface ImagePipelineSnsMessage {
    state: {
        status: ImagePipelineStatus;
    };
    arn: string;
}

interface SignalMessage {
    Status: SignalStatus;
    Reason: string;
    UniqueId: string;
    Data: string;
}

export const handler = async (
    event: SNSEvent,
    context: Context
): Promise<void> => {
    try {
        const message: ImagePipelineSnsMessage = JSON.parse(
            event.Records[0].Sns.Message
        );
        console.info(`Received message: ${JSON.stringify(message)}`);

        // Process the message as needed
        const receivedStatus: ImagePipelineStatus = message.state.status;
        console.info(`Received status: ${receivedStatus}`);

        let status: SignalStatus;
        if (receivedStatus === 'AVAILABLE') {
            status = 'SUCCESS';
        } else {
            status = 'FAILURE';
        }

        // Environment
        const waitHandleUrl = process.env.WAIT_HANDLE_URL;
        if (!waitHandleUrl) {
            throw new Error('WAIT_HANDLE_URL environment variable is not set');
        }
        const imageBuildArn = process.env.IMAGE_BUILD_ARN;

        if (message.arn == imageBuildArn) {
            console.info('Image build ARN matches.');
            // Signal the WaitCondition
            const signalMessage: SignalMessage = {
                Status: status,
                Reason: 'Signal from SNS',
                UniqueId: context.awsRequestId,
                Data: `Pipeline has given a ${status} signal from SNS.`
            };
            await axios.put(waitHandleUrl, signalMessage);

            console.info(
                `Successfully signaled WaitCondition: ${JSON.stringify(signalMessage)}`
            );
        } else {
            console.info(
                `Image build ARN ${message.arn} does not match ${imageBuildArn}.`
            );
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                `${error.response?.status} ${JSON.stringify(error.response?.data)}`
            );
        }
        throw error;
    }
};
