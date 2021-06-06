import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { connectionId, stage } = event.requestContext;
    const dynamoClient = new DocumentClient();
    
    await dynamoClient.delete({
        TableName: 'SocketConnections',
        Key: {
            'Stage': stage
        }, 
        ConditionExpression: 'ConnectionId = :connectionId',
        ExpressionAttributeValues: {
            ':connectionId': connectionId
        }
    }).promise();
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    
    return response;
};