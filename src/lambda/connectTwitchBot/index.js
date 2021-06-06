const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const { connectionId, stage } = event.requestContext;
    const dynamoClient = new AWS.DynamoDB.DocumentClient();
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
