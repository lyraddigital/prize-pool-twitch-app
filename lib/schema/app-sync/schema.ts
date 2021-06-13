import { Schema } from '@aws-cdk/aws-appsync';

import { createTwitchSubInput, twitchSubType } from './types';

export const schema = new Schema();
schema.addType(twitchSubType);
schema.addType(createTwitchSubInput);