import { Construct, Stack, StackProps } from '@aws-cdk/core';

import { PrizePoolBotApi, TwitchWebhookApi } from './constructs';

export class PrizePoolTwitchAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new TwitchWebhookApi(this, 'TwitchWebhookApi');
    new PrizePoolBotApi(this, 'PrizePoolBotApi');
  }
}
