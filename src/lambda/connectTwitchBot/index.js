"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dynamodb_1 = require("aws-sdk/clients/dynamodb");
const handler = async (event) => {
    const { connectionId, stage } = event.requestContext;
    const dynamoClient = new dynamodb_1.DocumentClient();
    const socketConnectionParams = {
        Item: {
            "Stage": stage,
            "ConnectionId": connectionId
        },
        TableName: "SocketConnections"
    };
    await dynamoClient.put(socketConnectionParams).promise();
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1REFBd0U7QUFFakUsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLFlBQVksR0FBRyxJQUFJLHlCQUFjLEVBQUUsQ0FBQztJQUMxQyxNQUFNLHNCQUFzQixHQUFpQjtRQUMzQyxJQUFJLEVBQUU7WUFDRixPQUFPLEVBQUUsS0FBSztZQUNkLGNBQWMsRUFBRSxZQUFZO1NBQy9CO1FBQ0QsU0FBUyxFQUFFLG1CQUFtQjtLQUMvQixDQUFDO0lBRUYsTUFBTSxZQUFZLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFekQsTUFBTSxRQUFRLEdBQUc7UUFDYixVQUFVLEVBQUUsR0FBRztRQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO0tBQzdDLENBQUM7SUFFRixPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDLENBQUM7QUFuQlcsUUFBQSxPQUFPLFdBbUJsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvY3VtZW50Q2xpZW50LCBQdXRJdGVtSW5wdXQgfSBmcm9tICdhd3Mtc2RrL2NsaWVudHMvZHluYW1vZGInO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gICAgY29uc3QgeyBjb25uZWN0aW9uSWQsIHN0YWdlIH0gPSBldmVudC5yZXF1ZXN0Q29udGV4dDtcbiAgICBjb25zdCBkeW5hbW9DbGllbnQgPSBuZXcgRG9jdW1lbnRDbGllbnQoKTtcbiAgICBjb25zdCBzb2NrZXRDb25uZWN0aW9uUGFyYW1zOiBQdXRJdGVtSW5wdXQgPSB7XG4gICAgICBJdGVtOiB7XG4gICAgICAgICAgXCJTdGFnZVwiOiBzdGFnZSwgXG4gICAgICAgICAgXCJDb25uZWN0aW9uSWRcIjogY29ubmVjdGlvbklkXG4gICAgICB9LFxuICAgICAgVGFibGVOYW1lOiBcIlNvY2tldENvbm5lY3Rpb25zXCJcbiAgICB9O1xuICAgICAgICBcbiAgICBhd2FpdCBkeW5hbW9DbGllbnQucHV0KHNvY2tldENvbm5lY3Rpb25QYXJhbXMpLnByb21pc2UoKTtcbiAgICBcbiAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSgnSGVsbG8gZnJvbSBMYW1iZGEhJyksXG4gICAgfTtcbiAgICBcbiAgICByZXR1cm4gcmVzcG9uc2U7XG59O1xuIl19