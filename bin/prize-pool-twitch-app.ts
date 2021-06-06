import { App } from '@aws-cdk/core';

import { PrizePoolTwitchAppStack } from '../lib';

const app = new App();
new PrizePoolTwitchAppStack(app, 'PrizePoolTwitchAppStack');