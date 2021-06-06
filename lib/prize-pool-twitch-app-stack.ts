import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

import { AssetCode, Function, Runtime, StartingPosition } from '@aws-cdk/aws-lambda';
import { DynamoEventSource } from '@aws-cdk/aws-lambda-event-sources';
import { StreamViewType } from '@aws-cdk/aws-dynamodb';

export class PrizePoolTwitchAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const prizePoolTable = new dynamodb.Table(this, 'PrizePool', {
      tableName: 'PrizePool',
      stream: StreamViewType.NEW_IMAGE,
      partitionKey: { name: 'MonthYear', type: dynamodb.AttributeType.STRING }
    });

    const socketConnectionsTable = new dynamodb.Table(this, 'SocketConnections', {
      tableName: 'SocketConnections',
      partitionKey: { name: 'Stage', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'ConnectionId', type: dynamodb.AttributeType.STRING }
    });

    const reportNewSubscriberBotFn = new Function(this, 'ReportNewSubcriberBotLambda', {
      functionName: 'reportNewSubcriberToTwitchBot',
      environment: {
        'DomainName': 'fgdxwibczi.execute-api.ap-southeast-2.amazonaws.com',
        'Stage': 'Production'
      },
      runtime: Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: new AssetCode(`src/lambda/reportNewSub`)
    });

    socketConnectionsTable.grant(reportNewSubscriberBotFn, 'dynamodb:Query');

    const es = new DynamoEventSource(prizePoolTable, { startingPosition: StartingPosition.LATEST });
    es.bind(reportNewSubscriberBotFn);

    const connectFn = new Function(this, 'ConnectTwitchBotLambda', {
      functionName: 'connectTwitchBotToPrizeApp',
      runtime: Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: new AssetCode('src/lambda/connectTwitchBot'),
    });

    const disconnectFn = new Function(this, 'DisconnectTwitchBotLambda', {
      functionName: 'disconnectTwitchBotFromPrizeApp',
      runtime: Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: new AssetCode('src/lambda/disconnectTwitchBot'),
    });

    socketConnectionsTable.grant(connectFn, 'dynamodb:PutItem');
    socketConnectionsTable.grant(disconnectFn, 'dynamodb:DeleteItem');
  }
}
