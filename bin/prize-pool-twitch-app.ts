#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { PrizePoolTwitchAppStack } from '../lib/prize-pool-twitch-app-stack';

const app = new cdk.App();
new PrizePoolTwitchAppStack(app, 'PrizePoolTwitchAppStack');