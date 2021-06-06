const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const { connectionId, stage } = event.requestContext;
    const dynamoClient = new AWS.DynamoDB.DocumentClient();
    
    await dynamoClient.delete({
        TableName: "SocketConnections",
        Key: {
            "Stage": stage
        }, 
        ConditionExpression: 'ConnectionId = :connectionId',
        ExpressionAttributeValues: {
            ":connectionId": connectionId
        }
    }).promise();
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    
    return response;
};