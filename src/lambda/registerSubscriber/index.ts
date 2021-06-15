import axios from 'axios';
import gql from 'graphql-tag';
import * as graphql from 'graphql';

import { isValidTwitchRequest } from './verify-twitch';

export const handler = async (event: any, context: any) => {
    const body = event.body;
    const headers = event.headers;
    const twitchMessageType = headers['twitch-eventsub-message-type'];
    const verificationStatus = 'webhook_callback_verification';
    
    if (!body.challenge && twitchMessageType === verificationStatus) {
        context.fail(JSON.stringify({
            errorMessage:'Could not locate challenge value in your payload'
        }));
    }
    
    if (twitchMessageType === verificationStatus) {
        return body.challenge;
    }

    const prizePoolApiKey = process.env.PRIZE_POOL_API_KEY || '';
    const prizePoolApiUrl = process.env.PRIZE_POOL_ENDPOINT || '';
    const { event: twitchEvent } = body;

    const createSubMutation = gql(`mutation CreateTwitchSub($twitchSubInput: CreateTwitchSubInput!) {
        createTwitchSub(input: $twitchSubInput) {
            DisplayName
            MonthYear
            UserId
            Username
        }
    }`);

    const { print } = graphql;

    await axios({
        url: prizePoolApiUrl,
        method: 'post',
        headers: {
            'x-api-key': prizePoolApiKey
        },
        data: {
            query: print(createSubMutation),
            variables: {
            twitchSubInput: {
                DisplayName: twitchEvent.user_name,
                MonthYear: '6-2021',
                UserId: twitchEvent.user_id,
                Username: twitchEvent.user_login
            }
            }
        }
    });
    
    return undefined;
};
