import { Construct, Stack, StackProps } from '@aws-cdk/core';

import { 
  PrizePoolDatabase,
  SubscriptionPublisher,
  TwitchBotWebsocketApi
} from './constructs';

export class PrizePoolTwitchAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const prizePoolDatabase = new PrizePoolDatabase(this, 'PrizePoolDatabase');
    const twitchBotWebsocketApi = new TwitchBotWebsocketApi(this, 'TwitchBotWebsocketApi');
    
    new SubscriptionPublisher(this, 'SubscriptionPublisher', {
      prizePoolTableStreamSource: prizePoolDatabase.tableStreamSource,
      twitchBotWebsocketApiSettings: twitchBotWebsocketApi.settings
    });
  }
}
