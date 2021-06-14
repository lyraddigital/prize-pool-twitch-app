// const AWS = require('aws-sdk');
// const AppSync = require('aws-appsync');
const verifyTwitch = require('./verify-twitch');

exports.handler = async (event, context) => {
    console.log(JSON.stringify(event));
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

    // createTwitchSub(input: {DisplayName: "Daryl_Duck", MonthYear: "6-2021", UserId: "11928283", Username: "daryl_duck"}) {
    //     DisplayName
    //     MonthYear
    //     UserId
    //     Username
    //   }
    
    // const twitchMessageId = headers['twitch-eventsub-message-id'];
    // const [_, twitchSignature] = headers['twitch-eventsub-message-signature'].split('=');
    // const twitchTimestamp = headers['twitch-eventsub-message-timestamp'];
    // const secretKey = process.env.TWITCH_SECRET;
    
    // Now verify the signature of the request to ensure it came from Twitch
    // if (verifyTwitch.isValidTwitchRequest(secretKey, twitchSignature, twitchMessageId, twitchTimestamp, body)) {
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
