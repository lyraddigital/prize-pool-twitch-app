import { Construct, Stack, StackProps } from '@aws-cdk/core';

import { 
  PrizePoolDatabase
} from './constructs';
import { PrizePoolBotApi } from './constructs/prize-pool-bot-api';

export class PrizePoolTwitchAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const database = new PrizePoolDatabase(this, 'PrizePoolDatabase');
    new PrizePoolBotApi(this, 'PrizePoolBotApi', { datasourceTable: database.table });
  }
}
