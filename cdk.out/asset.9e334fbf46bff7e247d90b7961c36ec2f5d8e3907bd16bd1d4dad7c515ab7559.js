const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const stage = process.env.Stage;
    const domainName = process.env.DomainName;
    const endpoint = `${domainName}/${stage}`;
    const dynamoClient = new AWS.DynamoDB.DocumentClient();
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: endpoint
    });
    const { Records: records } = event;
    
    for (let record of records) {
        const { eventName } = record;
        
        if (eventName === 'INSERT') {
            const { dynamodb: { NewImage: subscriber }} = record;
            const {
                UserId: { S: userId },
                Username: { S: username },
                DisplayName: { S: displayName }
            } = subscriber;
            
            const params = {
                TableName: 'SocketConnections',
                KeyConditionExpression: "Stage = :stage",
                ExpressionAttributeValues: {
                    ":stage": stage
                }
            };
            
            // Get all connections for current stage and 
            // send a message back through each connection
            const queryResult = await dynamoClient.query(params).promise(); 
    
            for (let item of queryResult.Items) {
                const params = {
                    ConnectionId: item.ConnectionId,
                    Data: JSON.stringify({ userId, username, displayName })
                };
                
                await apigwManagementApi.postToConnection(params).promise()
            } 
        }
    }
};