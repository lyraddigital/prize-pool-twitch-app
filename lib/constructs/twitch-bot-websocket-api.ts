import { Construct } from "@aws-cdk/core";
import { Runtime } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { AttributeType, ITable, Table } from "@aws-cdk/aws-dynamodb";
import { IWebSocketStage, WebSocketApi, WebSocketStage } from '@aws-cdk/aws-apigatewayv2';
import { LambdaWebSocketIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';

export interface TwitchBotWebsocketApiSettings {
    stage: string;
    domainName: string;
    socketConnectionsTable: ITable
}

export class TwitchBotWebsocketApi extends Construct {
    public settings: TwitchBotWebsocketApiSettings;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        const socketConnectionsTable = this.createSocketTable();
        const connectionFns = this.createConnectionFunctions(socketConnectionsTable);
        const stage = this.createApi(connectionFns);

        this.settings = {
            stage: stage.stageName,
            domainName: stage.url,
            socketConnectionsTable
        };
    }

    private createSocketTable(): ITable {
        return new Table(this, 'SocketConnections', {
            tableName: 'SocketConnections',
            partitionKey: { name: 'Stage', type: AttributeType.STRING },
            sortKey: { name: 'ConnectionId', type: AttributeType.STRING }
        });
    }

    private createConnectionFunctions(connectionsTable: ITable): [NodejsFunction, NodejsFunction] {
        const connectFn = new NodejsFunction(this, 'ConnectTwitchBotLambda', {
            functionName: 'connectTwitchBotToPrizeApp',
            runtime: Runtime.NODEJS_14_X,
            handler: 'index.handler',
            entry: 'src/lambda/connectTwitchBot/index.js'
        });

        const disconnectFn = new NodejsFunction(this, 'DisconnectTwitchBotLambda', {
            functionName: 'disconnectTwitchBotFromPrizeApp',
            runtime: Runtime.NODEJS_14_X,
            handler: 'index.handler',
            entry: 'src/lambda/disconnectTwitchBot/index.js'
        });

        connectionsTable.grant(connectFn, 'dynamodb:PutItem');
        connectionsTable.grant(disconnectFn, 'dynamodb:DeleteItem');

        return [connectFn, disconnectFn];
    }

    private createApi(connectionFns: [NodejsFunction, NodejsFunction]): IWebSocketStage {
        const [connectFn, disconnectFn] = connectionFns;
        const socketApi = new WebSocketApi(this, 'PrizePoolTwitchBotApi', {
            apiName: 'prizePoolTwitchBotApi2',
            routeSelectionExpression: '$request.body.action',
            connectRouteOptions: {
                integration: new LambdaWebSocketIntegration({ handler: connectFn })
            },
            disconnectRouteOptions: {
                integration: new LambdaWebSocketIntegration({ handler: disconnectFn })
            },
            // TODO: Work out how to set up a mock integration
            // defaultRouteOptions: {
            //   integration: // 
            // }
        });

        return new WebSocketStage(this, 'ProductionStage', {
            webSocketApi: socketApi,
            stageName: 'Production',
            autoDeploy: true
        });
    }
}