import { Construct, Stack, StackProps } from '@aws-cdk/core';

import { PrizePoolDatabase } from './constructs/prize-pool-database';
import { TwitchBotWebsocketApi } from './constructs/twitch-bot-websocket-api';

export class PrizePoolTwitchAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const prizePoolDatabase = new PrizePoolDatabase(this, 'PrizePoolDatabase');
    const twitchBotWebsocketApi = new TwitchBotWebsocketApi(this, 'TwitchBotWebsocketApi');
    
  }
}
