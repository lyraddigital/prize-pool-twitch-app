"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_appsync_1 = require("aws-appsync");
const graphql_tag_1 = require("graphql-tag");
const handler = async (event, context) => {
    const body = event.body;
    const headers = event.headers;
    const twitchMessageType = headers['twitch-eventsub-message-type'];
    const verificationStatus = 'webhook_callback_verification';
    if (!body.challenge && twitchMessageType === verificationStatus) {
        context.fail(JSON.stringify({
            errorMessage: 'Could not locate challenge value in your payload'
        }));
    }
    if (twitchMessageType === verificationStatus) {
        return body.challenge;
    }
    const prizePoolApiKey = process.env.PRIZE_POOL_API_KEY || '';
    const prizePoolApiUrl = process.env.PRIZE_POOL_ENDPOINT || '';
    const prizePoolRegion = process.env.PRIZE_POOL_REGION || '';
    const client = new aws_appsync_1.AWSAppSyncClient({
        url: prizePoolApiUrl,
        region: prizePoolRegion,
        auth: {
            type: aws_appsync_1.AUTH_TYPE.API_KEY,
            apiKey: prizePoolApiKey,
        },
        disableOffline: true
    });
    const query = graphql_tag_1.default(`mutation CreateTwitchSub($twitchSubInput: TwitchSubInput) {
        createTwitchSub(input: $twitchSubInput) {
            DisplayName
            MonthYear
            UserId
            Username
        }
    }`);
    await client.mutate({
        mutation: query,
        fetchPolicy: 'network-only',
        variables: {
            $twitchSubInput: {
                DisplayName: 'Daryl_Duck',
                MonthYear: '6-2021',
                UserId: '123',
                Username: 'daryl_duck'
            }
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
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBMkQ7QUFDM0QsNkNBQThCO0FBSXZCLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFVLEVBQUUsT0FBWSxFQUFFLEVBQUU7SUFDdEQsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztJQUN4QixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzlCLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDbEUsTUFBTSxrQkFBa0IsR0FBRywrQkFBK0IsQ0FBQztJQUUzRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxpQkFBaUIsS0FBSyxrQkFBa0IsRUFBRTtRQUM3RCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDeEIsWUFBWSxFQUFDLGtEQUFrRDtTQUNsRSxDQUFDLENBQUMsQ0FBQztLQUNQO0lBRUQsSUFBSSxpQkFBaUIsS0FBSyxrQkFBa0IsRUFBRTtRQUMxQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDekI7SUFFRCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixJQUFJLEVBQUUsQ0FBQztJQUM3RCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQztJQUM5RCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztJQUU1RCxNQUFNLE1BQU0sR0FBRyxJQUFJLDhCQUFnQixDQUFDO1FBQ2hDLEdBQUcsRUFBRSxlQUFlO1FBQ3BCLE1BQU0sRUFBRSxlQUFlO1FBQ3ZCLElBQUksRUFBRTtZQUNGLElBQUksRUFBRSx1QkFBUyxDQUFDLE9BQU87WUFDdkIsTUFBTSxFQUFFLGVBQWU7U0FDMUI7UUFDRCxjQUFjLEVBQUUsSUFBSTtLQUN2QixDQUFDLENBQUM7SUFFSCxNQUFNLEtBQUssR0FBRyxxQkFBRyxDQUFDOzs7Ozs7O01BT2hCLENBQUMsQ0FBQztJQUVKLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQixRQUFRLEVBQUUsS0FBSztRQUNmLFdBQVcsRUFBRSxjQUFjO1FBQzNCLFNBQVMsRUFBRTtZQUNQLGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQUUsWUFBWTtnQkFDekIsU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLE1BQU0sRUFBRSxLQUFLO2dCQUNiLFFBQVEsRUFBRSxZQUFZO2FBQ3pCO1NBQ0o7S0FDSixDQUFDLENBQUM7SUFFSCxpRUFBaUU7SUFDakUsd0ZBQXdGO0lBQ3hGLHdFQUF3RTtJQUN4RSwrQ0FBK0M7SUFFL0Msd0VBQXdFO0lBQ3hFLGtHQUFrRztJQUM5Rjs7Ozs7Ozs7Ozs7d0RBV29EO0lBQ3hELEdBQUc7SUFFSCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDLENBQUM7QUExRVcsUUFBQSxPQUFPLFdBMEVsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFVVEhfVFlQRSwgQVdTQXBwU3luY0NsaWVudCB9ICBmcm9tICdhd3MtYXBwc3luYyc7XG5pbXBvcnQgZ3FsIGZyb20gJ2dyYXBocWwtdGFnJztcblxuaW1wb3J0IHsgaXNWYWxpZFR3aXRjaFJlcXVlc3QgfSBmcm9tICcuL3ZlcmlmeS10d2l0Y2gnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudDogYW55LCBjb250ZXh0OiBhbnkpID0+IHtcbiAgICBjb25zdCBib2R5ID0gZXZlbnQuYm9keTtcbiAgICBjb25zdCBoZWFkZXJzID0gZXZlbnQuaGVhZGVycztcbiAgICBjb25zdCB0d2l0Y2hNZXNzYWdlVHlwZSA9IGhlYWRlcnNbJ3R3aXRjaC1ldmVudHN1Yi1tZXNzYWdlLXR5cGUnXTtcbiAgICBjb25zdCB2ZXJpZmljYXRpb25TdGF0dXMgPSAnd2ViaG9va19jYWxsYmFja192ZXJpZmljYXRpb24nO1xuICAgIFxuICAgIGlmICghYm9keS5jaGFsbGVuZ2UgJiYgdHdpdGNoTWVzc2FnZVR5cGUgPT09IHZlcmlmaWNhdGlvblN0YXR1cykge1xuICAgICAgICBjb250ZXh0LmZhaWwoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOidDb3VsZCBub3QgbG9jYXRlIGNoYWxsZW5nZSB2YWx1ZSBpbiB5b3VyIHBheWxvYWQnXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHR3aXRjaE1lc3NhZ2VUeXBlID09PSB2ZXJpZmljYXRpb25TdGF0dXMpIHtcbiAgICAgICAgcmV0dXJuIGJvZHkuY2hhbGxlbmdlO1xuICAgIH1cblxuICAgIGNvbnN0IHByaXplUG9vbEFwaUtleSA9IHByb2Nlc3MuZW52LlBSSVpFX1BPT0xfQVBJX0tFWSB8fCAnJztcbiAgICBjb25zdCBwcml6ZVBvb2xBcGlVcmwgPSBwcm9jZXNzLmVudi5QUklaRV9QT09MX0VORFBPSU5UIHx8ICcnO1xuICAgIGNvbnN0IHByaXplUG9vbFJlZ2lvbiA9IHByb2Nlc3MuZW52LlBSSVpFX1BPT0xfUkVHSU9OIHx8ICcnO1xuXG4gICAgY29uc3QgY2xpZW50ID0gbmV3IEFXU0FwcFN5bmNDbGllbnQoe1xuICAgICAgICB1cmw6IHByaXplUG9vbEFwaVVybCxcbiAgICAgICAgcmVnaW9uOiBwcml6ZVBvb2xSZWdpb24sXG4gICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgIHR5cGU6IEFVVEhfVFlQRS5BUElfS0VZLFxuICAgICAgICAgICAgYXBpS2V5OiBwcml6ZVBvb2xBcGlLZXksXG4gICAgICAgIH0sXG4gICAgICAgIGRpc2FibGVPZmZsaW5lOiB0cnVlXG4gICAgfSk7XG5cbiAgICBjb25zdCBxdWVyeSA9IGdxbChgbXV0YXRpb24gQ3JlYXRlVHdpdGNoU3ViKCR0d2l0Y2hTdWJJbnB1dDogVHdpdGNoU3ViSW5wdXQpIHtcbiAgICAgICAgY3JlYXRlVHdpdGNoU3ViKGlucHV0OiAkdHdpdGNoU3ViSW5wdXQpIHtcbiAgICAgICAgICAgIERpc3BsYXlOYW1lXG4gICAgICAgICAgICBNb250aFllYXJcbiAgICAgICAgICAgIFVzZXJJZFxuICAgICAgICAgICAgVXNlcm5hbWVcbiAgICAgICAgfVxuICAgIH1gKTtcblxuICAgIGF3YWl0IGNsaWVudC5tdXRhdGUoe1xuICAgICAgICBtdXRhdGlvbjogcXVlcnksXG4gICAgICAgIGZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JyxcbiAgICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgICAgICAkdHdpdGNoU3ViSW5wdXQ6IHtcbiAgICAgICAgICAgICAgICBEaXNwbGF5TmFtZTogJ0RhcnlsX0R1Y2snLFxuICAgICAgICAgICAgICAgIE1vbnRoWWVhcjogJzYtMjAyMScsXG4gICAgICAgICAgICAgICAgVXNlcklkOiAnMTIzJyxcbiAgICAgICAgICAgICAgICBVc2VybmFtZTogJ2RhcnlsX2R1Y2snXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvLyBjb25zdCB0d2l0Y2hNZXNzYWdlSWQgPSBoZWFkZXJzWyd0d2l0Y2gtZXZlbnRzdWItbWVzc2FnZS1pZCddO1xuICAgIC8vIGNvbnN0IFtfLCB0d2l0Y2hTaWduYXR1cmVdID0gaGVhZGVyc1sndHdpdGNoLWV2ZW50c3ViLW1lc3NhZ2Utc2lnbmF0dXJlJ10uc3BsaXQoJz0nKTtcbiAgICAvLyBjb25zdCB0d2l0Y2hUaW1lc3RhbXAgPSBoZWFkZXJzWyd0d2l0Y2gtZXZlbnRzdWItbWVzc2FnZS10aW1lc3RhbXAnXTtcbiAgICAvLyBjb25zdCBzZWNyZXRLZXkgPSBwcm9jZXNzLmVudi5UV0lUQ0hfU0VDUkVUO1xuICAgIFxuICAgIC8vIE5vdyB2ZXJpZnkgdGhlIHNpZ25hdHVyZSBvZiB0aGUgcmVxdWVzdCB0byBlbnN1cmUgaXQgY2FtZSBmcm9tIFR3aXRjaFxuICAgIC8vIGlmIChpc1ZhbGlkVHdpdGNoUmVxdWVzdChzZWNyZXRLZXksIHR3aXRjaFNpZ25hdHVyZSwgdHdpdGNoTWVzc2FnZUlkLCB0d2l0Y2hUaW1lc3RhbXAsIGJvZHkpKSB7XG4gICAgICAgIC8qY29uc3QgZHluYW1vQ2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xuICAgICAgICBjb25zdCBwcml6ZVBvb2xQYXJhbXMgPSB7XG4gICAgICAgICAgSXRlbToge1xuICAgICAgICAgICBcIk1vbnRoWWVhclwiOiBcIjYyMDIxXCIsXG4gICAgICAgICAgIFwiVXNlcklkXCI6IGJvZHkuZXZlbnQudXNlcl9pZCxcbiAgICAgICAgICAgXCJVc2VybmFtZVwiOiBib2R5LmV2ZW50LnVzZXJfbG9naW4sIFxuICAgICAgICAgICBcIkRpc3BsYXlOYW1lXCI6IGJvZHkuZXZlbnQudXNlcl9uYW1lXG4gICAgICAgICAgfSxcbiAgICAgICAgICBUYWJsZU5hbWU6IFwiUHJpemVQb29sXCJcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGR5bmFtb0NsaWVudC5wdXQocHJpemVQb29sUGFyYW1zKS5wcm9taXNlKCk7Ki9cbiAgICAvL31cbiAgICBcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufTtcbiJdfQ==