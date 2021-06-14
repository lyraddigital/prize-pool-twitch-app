import { AUTH_TYPE, AWSAppSyncClient }  from 'aws-appsync';
import gql from 'graphql-tag';

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
    const prizePoolRegion = process.env.PRIZE_POOL_REGION || '';

    const client = new AWSAppSyncClient({
        url: prizePoolApiUrl,
        region: prizePoolRegion,
        auth: {
            type: AUTH_TYPE.API_KEY,
            apiKey: prizePoolApiKey,
        },
        disableOffline: true
    });

    const query = gql`mutation CreateTwitchSub($twitchSubInput: TwitchSubInput) {
        createTwitchSub(input: $twitchSubInput) {
            DisplayName
            MonthYear
            UserId
            Username
        }
    }`;

    await client.mutate({
        mutation: query,
        fetchPolicy: 'network-only',
        variables: {
            DisplayName: 'Daryl_Duck',
            MonthYear: '6-2021',
            UserId: '123',
            Username: 'daryl_duck'
        }
    });
    
    // const twitchMessageId = headers['twitch-eventsub-message-id'];
    // const [_, twitchSignature] = headers['twitch-eventsub-message-signature'].split('=');
    // const twitchTimestamp = headers['twitch-eventsub-message-timestamp'];
    // const secretKey = process.env.TWITCH_SECRET;
    
    // Now verify the signature of the request to ensure it came from Twitch
    // if (isValidTwitchRequest(secretKey, twitchSignature, twitchMessageId, twitchTimestamp, body)) {
        /*const dynamoClient = new AWS.DynamoDB.DocumentClient();
        const prizePoolParams = {
          Item: {
           "MonthYear": "62021",
           "UserId": body.event.user_id,
           "Username": body.event.user_login, 
           "DisplayName": body.event.user_name
          },
          TableName: "PrizePool"
        };
        
        await dynamoClient.put(prizePoolParams).promise();*/
    //}
    
    return undefined;
};
