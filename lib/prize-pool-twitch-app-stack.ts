import { Construct, Stack, StackProps } from '@aws-cdk/core';

import { PrizePoolBotApi, TwitchWebhookApi } from './constructs';

export class PrizePoolTwitchAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const prizePoolBotApi = new PrizePoolBotApi(this, 'PrizePoolBotApi');
    new TwitchWebhookApi(this, 'TwitchWebhookApi', { 
      prizePoolApiKey: prizePoolBotApi.apiKey,
      prizePoolApiEndpoint: prizePoolBotApi.endpoint
    });
  }
}
