"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = require("axios");
const graphql_tag_1 = require("graphql-tag");
const graphql = require("graphql");
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
    const { event: twitchEvent } = body;
    const createSubMutation = graphql_tag_1.default(`mutation CreateTwitchSub($twitchSubInput: CreateTwitchSubInput!) {
        createTwitchSub(input: $twitchSubInput) {
            DisplayName
            MonthYear
            UserId
            Username
        }
    }`);
    const { print } = graphql;
    try {
        const graphqlData = await axios_1.default({
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
        console.log(graphqlData);
    }
    catch (e) {
        console.log(e);
    }
    // await client.mutate({
    //     mutation: query,
    //     fetchPolicy: 'network-only',
    //     variables: {
    //         $twitchSubInput: {
    //             DisplayName: 'Daryl_Duck',
    //             MonthYear: '6-2021',
    //             UserId: '123',
    //             Username: 'daryl_duck'
    //         }
    //     }
    // });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBMEI7QUFDMUIsNkNBQThCO0FBQzlCLG1DQUFtQztBQUk1QixNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBVSxFQUFFLE9BQVksRUFBRSxFQUFFO0lBQ3RELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDeEIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUM5QixNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ2xFLE1BQU0sa0JBQWtCLEdBQUcsK0JBQStCLENBQUM7SUFFM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksaUJBQWlCLEtBQUssa0JBQWtCLEVBQUU7UUFDN0QsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3hCLFlBQVksRUFBQyxrREFBa0Q7U0FDbEUsQ0FBQyxDQUFDLENBQUM7S0FDUDtJQUVELElBQUksaUJBQWlCLEtBQUssa0JBQWtCLEVBQUU7UUFDMUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3pCO0lBRUQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSxFQUFFLENBQUM7SUFDN0QsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUM7SUFDOUQsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFcEMsTUFBTSxpQkFBaUIsR0FBRyxxQkFBRyxDQUFDOzs7Ozs7O01BTzVCLENBQUMsQ0FBQztJQUVKLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFMUIsSUFBSTtRQUNBLE1BQU0sV0FBVyxHQUFHLE1BQU0sZUFBSyxDQUFDO1lBQzVCLEdBQUcsRUFBRSxlQUFlO1lBQ3BCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFO2dCQUNQLFdBQVcsRUFBRSxlQUFlO2FBQzdCO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxLQUFLLENBQUMsaUJBQWlCLENBQUM7Z0JBQy9CLFNBQVMsRUFBRTtvQkFDVCxjQUFjLEVBQUU7d0JBQ1osV0FBVyxFQUFFLFdBQVcsQ0FBQyxTQUFTO3dCQUNsQyxTQUFTLEVBQUUsUUFBUTt3QkFDbkIsTUFBTSxFQUFFLFdBQVcsQ0FBQyxPQUFPO3dCQUMzQixRQUFRLEVBQUUsV0FBVyxDQUFDLFVBQVU7cUJBQ25DO2lCQUNGO2FBQ0Y7U0FDSixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzVCO0lBQUMsT0FBTSxDQUFDLEVBQUU7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xCO0lBRUQsd0JBQXdCO0lBQ3hCLHVCQUF1QjtJQUN2QixtQ0FBbUM7SUFDbkMsbUJBQW1CO0lBQ25CLDZCQUE2QjtJQUM3Qix5Q0FBeUM7SUFDekMsbUNBQW1DO0lBQ25DLDZCQUE2QjtJQUM3QixxQ0FBcUM7SUFDckMsWUFBWTtJQUNaLFFBQVE7SUFDUixNQUFNO0lBRU4saUVBQWlFO0lBQ2pFLHdGQUF3RjtJQUN4Rix3RUFBd0U7SUFDeEUsK0NBQStDO0lBRS9DLHdFQUF3RTtJQUN4RSxrR0FBa0c7SUFDOUY7Ozs7Ozs7Ozs7O3dEQVdvRDtJQUN4RCxHQUFHO0lBRUgsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQyxDQUFDO0FBM0ZXLFFBQUEsT0FBTyxXQTJGbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgZ3FsIGZyb20gJ2dyYXBocWwtdGFnJztcclxuaW1wb3J0ICogYXMgZ3JhcGhxbCBmcm9tICdncmFwaHFsJztcclxuXHJcbmltcG9ydCB7IGlzVmFsaWRUd2l0Y2hSZXF1ZXN0IH0gZnJvbSAnLi92ZXJpZnktdHdpdGNoJztcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnksIGNvbnRleHQ6IGFueSkgPT4ge1xyXG4gICAgY29uc3QgYm9keSA9IGV2ZW50LmJvZHk7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gZXZlbnQuaGVhZGVycztcclxuICAgIGNvbnN0IHR3aXRjaE1lc3NhZ2VUeXBlID0gaGVhZGVyc1sndHdpdGNoLWV2ZW50c3ViLW1lc3NhZ2UtdHlwZSddO1xyXG4gICAgY29uc3QgdmVyaWZpY2F0aW9uU3RhdHVzID0gJ3dlYmhvb2tfY2FsbGJhY2tfdmVyaWZpY2F0aW9uJztcclxuICAgIFxyXG4gICAgaWYgKCFib2R5LmNoYWxsZW5nZSAmJiB0d2l0Y2hNZXNzYWdlVHlwZSA9PT0gdmVyaWZpY2F0aW9uU3RhdHVzKSB7XHJcbiAgICAgICAgY29udGV4dC5mYWlsKEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOidDb3VsZCBub3QgbG9jYXRlIGNoYWxsZW5nZSB2YWx1ZSBpbiB5b3VyIHBheWxvYWQnXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAodHdpdGNoTWVzc2FnZVR5cGUgPT09IHZlcmlmaWNhdGlvblN0YXR1cykge1xyXG4gICAgICAgIHJldHVybiBib2R5LmNoYWxsZW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcml6ZVBvb2xBcGlLZXkgPSBwcm9jZXNzLmVudi5QUklaRV9QT09MX0FQSV9LRVkgfHwgJyc7XHJcbiAgICBjb25zdCBwcml6ZVBvb2xBcGlVcmwgPSBwcm9jZXNzLmVudi5QUklaRV9QT09MX0VORFBPSU5UIHx8ICcnO1xyXG4gICAgY29uc3QgeyBldmVudDogdHdpdGNoRXZlbnQgfSA9IGJvZHk7XHJcblxyXG4gICAgY29uc3QgY3JlYXRlU3ViTXV0YXRpb24gPSBncWwoYG11dGF0aW9uIENyZWF0ZVR3aXRjaFN1YigkdHdpdGNoU3ViSW5wdXQ6IENyZWF0ZVR3aXRjaFN1YklucHV0ISkge1xyXG4gICAgICAgIGNyZWF0ZVR3aXRjaFN1YihpbnB1dDogJHR3aXRjaFN1YklucHV0KSB7XHJcbiAgICAgICAgICAgIERpc3BsYXlOYW1lXHJcbiAgICAgICAgICAgIE1vbnRoWWVhclxyXG4gICAgICAgICAgICBVc2VySWRcclxuICAgICAgICAgICAgVXNlcm5hbWVcclxuICAgICAgICB9XHJcbiAgICB9YCk7XHJcblxyXG4gICAgY29uc3QgeyBwcmludCB9ID0gZ3JhcGhxbDtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGdyYXBocWxEYXRhID0gYXdhaXQgYXhpb3Moe1xyXG4gICAgICAgICAgICB1cmw6IHByaXplUG9vbEFwaVVybCxcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAneC1hcGkta2V5JzogcHJpemVQb29sQXBpS2V5XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBxdWVyeTogcHJpbnQoY3JlYXRlU3ViTXV0YXRpb24pLFxyXG4gICAgICAgICAgICAgIHZhcmlhYmxlczoge1xyXG4gICAgICAgICAgICAgICAgdHdpdGNoU3ViSW5wdXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBEaXNwbGF5TmFtZTogdHdpdGNoRXZlbnQudXNlcl9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vbnRoWWVhcjogJzYtMjAyMScsXHJcbiAgICAgICAgICAgICAgICAgICAgVXNlcklkOiB0d2l0Y2hFdmVudC51c2VyX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIFVzZXJuYW1lOiB0d2l0Y2hFdmVudC51c2VyX2xvZ2luXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGdyYXBocWxEYXRhKTtcclxuICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICAvLyBhd2FpdCBjbGllbnQubXV0YXRlKHtcclxuICAgIC8vICAgICBtdXRhdGlvbjogcXVlcnksXHJcbiAgICAvLyAgICAgZmV0Y2hQb2xpY3k6ICduZXR3b3JrLW9ubHknLFxyXG4gICAgLy8gICAgIHZhcmlhYmxlczoge1xyXG4gICAgLy8gICAgICAgICAkdHdpdGNoU3ViSW5wdXQ6IHtcclxuICAgIC8vICAgICAgICAgICAgIERpc3BsYXlOYW1lOiAnRGFyeWxfRHVjaycsXHJcbiAgICAvLyAgICAgICAgICAgICBNb250aFllYXI6ICc2LTIwMjEnLFxyXG4gICAgLy8gICAgICAgICAgICAgVXNlcklkOiAnMTIzJyxcclxuICAgIC8vICAgICAgICAgICAgIFVzZXJuYW1lOiAnZGFyeWxfZHVjaydcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH0pO1xyXG4gICAgXHJcbiAgICAvLyBjb25zdCB0d2l0Y2hNZXNzYWdlSWQgPSBoZWFkZXJzWyd0d2l0Y2gtZXZlbnRzdWItbWVzc2FnZS1pZCddO1xyXG4gICAgLy8gY29uc3QgW18sIHR3aXRjaFNpZ25hdHVyZV0gPSBoZWFkZXJzWyd0d2l0Y2gtZXZlbnRzdWItbWVzc2FnZS1zaWduYXR1cmUnXS5zcGxpdCgnPScpO1xyXG4gICAgLy8gY29uc3QgdHdpdGNoVGltZXN0YW1wID0gaGVhZGVyc1sndHdpdGNoLWV2ZW50c3ViLW1lc3NhZ2UtdGltZXN0YW1wJ107XHJcbiAgICAvLyBjb25zdCBzZWNyZXRLZXkgPSBwcm9jZXNzLmVudi5UV0lUQ0hfU0VDUkVUO1xyXG4gICAgXHJcbiAgICAvLyBOb3cgdmVyaWZ5IHRoZSBzaWduYXR1cmUgb2YgdGhlIHJlcXVlc3QgdG8gZW5zdXJlIGl0IGNhbWUgZnJvbSBUd2l0Y2hcclxuICAgIC8vIGlmIChpc1ZhbGlkVHdpdGNoUmVxdWVzdChzZWNyZXRLZXksIHR3aXRjaFNpZ25hdHVyZSwgdHdpdGNoTWVzc2FnZUlkLCB0d2l0Y2hUaW1lc3RhbXAsIGJvZHkpKSB7XHJcbiAgICAgICAgLypjb25zdCBkeW5hbW9DbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XHJcbiAgICAgICAgY29uc3QgcHJpemVQb29sUGFyYW1zID0ge1xyXG4gICAgICAgICAgSXRlbToge1xyXG4gICAgICAgICAgIFwiTW9udGhZZWFyXCI6IFwiNjIwMjFcIixcclxuICAgICAgICAgICBcIlVzZXJJZFwiOiBib2R5LmV2ZW50LnVzZXJfaWQsXHJcbiAgICAgICAgICAgXCJVc2VybmFtZVwiOiBib2R5LmV2ZW50LnVzZXJfbG9naW4sIFxyXG4gICAgICAgICAgIFwiRGlzcGxheU5hbWVcIjogYm9keS5ldmVudC51c2VyX25hbWVcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBUYWJsZU5hbWU6IFwiUHJpemVQb29sXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGF3YWl0IGR5bmFtb0NsaWVudC5wdXQocHJpemVQb29sUGFyYW1zKS5wcm9taXNlKCk7Ki9cclxuICAgIC8vfVxyXG4gICAgXHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG59O1xyXG4iXX0=