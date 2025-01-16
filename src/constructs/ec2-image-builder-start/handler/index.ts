// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { SNSEvent, Context } from 'aws-lambda';
import axios from 'axios';

type SignalStatus = 'SUCCESS' | 'FAILURE';
type ImagePipelineStatus = 'AVAILABLE' | 'FAILED';

interface ImagePipelineSnsMessage {
    readonly state: {
        readonly status: ImagePipelineStatus;
        readonly reason?: string;
    };
    readonly arn: string;
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
                Reason:
                    status == 'FAILURE'
                        ? `Pipeline has given a ${status} signal. ${message.state.reason}`
                        : 'Complete.',
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
