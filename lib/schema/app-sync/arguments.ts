import { GraphqlType } from '@aws-cdk/aws-appsync';

import { createTwitchSubInput } from './types';

export const getTwitchArg: { [key: string]: GraphqlType } = {
    MonthYear: GraphqlType.string({ isRequired: true }),
    UserId: GraphqlType.string({ isRequired: true })
};

export const createTwitchArg: { [key: string]: GraphqlType } = {
    input: GraphqlType.intermediate({
        intermediateType: createTwitchSubInput,
        isRequired: true
    })
};