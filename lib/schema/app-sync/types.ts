import { GraphqlType, InputType, ObjectType } from '@aws-cdk/aws-appsync';

export const twitchSubType = new ObjectType('TwitchSub', {
    definition: {
        'MonthYear': GraphqlType.string({ isRequired: true }),
        'UserId': GraphqlType.string({ isRequired: true }),
        'Username': GraphqlType.string({ isRequired: true }),
        'DisplayName': GraphqlType.string({ isRequired: true })
    }
});

export const createTwitchSubInput = new InputType('CreateTwitchSubInput', {
    definition: {
        MonthYear: GraphqlType.string({ isRequired: true }),
        UserId: GraphqlType.string({ isRequired: true }),
        Username: GraphqlType.string({ isRequired: true }),
        DisplayName: GraphqlType.string({ isRequired: true }),
    }
});