import { Construct } from "@aws-cdk/core";
import { IEventSource, Runtime } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';

import { TwitchBotWebsocketApiSettings } from "./twitch-bot-websocket-api";

export interface SubscriptionPublisherProps {
    twitchBotWebsocketApiSettings: TwitchBotWebsocketApiSettings;
    prizePoolTableStreamSource: IEventSource;
}

export class SubscriptionPublisher extends Construct {
    constructor(scope: Construct, id: string, props: SubscriptionPublisherProps) {
        super(scope, id);

        const reportNewSubscriberBotFn = new NodejsFunction(this, 'ReportNewSubcriberBotLambda', {
            functionName: 'reportNewSubcriberToTwitchBot',
            environment: {
              'DomainName': props.twitchBotWebsocketApiSettings.domainName,
              'Stage': props.twitchBotWebsocketApiSettings.stage
            },
            runtime: Runtime.NODEJS_14_X,
            handler: 'index.handler',
            entry: `src/lambda/reportNewSub/index.js`
          });
      
          props.twitchBotWebsocketApiSettings.socketConnectionsTable.grant(reportNewSubscriberBotFn, 'dynamodb:Query');
          props.prizePoolTableStreamSource.bind(reportNewSubscriberBotFn);
    }
}