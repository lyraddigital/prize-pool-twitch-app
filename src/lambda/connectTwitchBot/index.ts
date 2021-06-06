import { DocumentClient, PutItemInput } from 'aws-sdk/clients/dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { connectionId, stage } = event.requestContext;
    const dynamoClient = new DocumentClient();
    const socketConnectionParams: PutItemInput = {
      Item: {
          "Stage": { S: stage }, 
          "ConnectionId": { S: connectionId }
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
