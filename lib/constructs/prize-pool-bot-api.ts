import { Construct } from "@aws-cdk/core";
import { AuthorizationType, Directive, GraphqlApi, GraphqlType, InputType, ObjectType, MappingTemplate, PrimaryKey, ResolvableField, Schema, Type, Values } from '@aws-cdk/aws-appsync';
import { ITable } from "@aws-cdk/aws-dynamodb";

export interface PrizePoolBotApiProps {
    datasourceTable: ITable;
}

export class PrizePoolBotApi extends Construct {
    constructor(scope: Construct, id: string, props: PrizePoolBotApiProps) {
        super(scope, id);

        const twitchSubType = new ObjectType('TwitchSub', {
          definition: { 
            'MonthYear': GraphqlType.string({ isRequired: true }),
            'UserId': GraphqlType.string({ isRequired: true }),
            'Username': GraphqlType.string({ isRequired: true }),
            'DisplayName': GraphqlType.string({ isRequired: true })
          }
        });

        const createTwitchSubInput = new InputType('CreateTwitchSubInput', {         
            definition: {
              MonthYear: GraphqlType.string({ isRequired: true }),
              UserId: GraphqlType.string({ isRequired: true }),
              Username: GraphqlType.string({ isRequired: true }),
              DisplayName: GraphqlType.string({ isRequired: true }),
            }
        });

        const getTwitchArg = {
          MonthYear: GraphqlType.string({ isRequired: true }),
          UserId: GraphqlType.string({ isRequired: true })
        };

        const createTwitchArg = {
          input: GraphqlType.intermediate({ 
            intermediateType: createTwitchSubInput,
            isRequired: true
          })
        };

        const schema = new Schema();
        schema.addType(twitchSubType);
        schema.addType(createTwitchSubInput);

        const api = new GraphqlApi(this, 'Api', {
            name: 'TwitchBotPrizeAPI2',
            schema,
            authorizationConfig: {
              defaultAuthorization: {
                authorizationType: AuthorizationType.API_KEY
              },
            }
        });

        const prizePoolDatasource = api.addDynamoDbDataSource('PrizePoolDatasource', props.datasourceTable);

        api.addQuery('getTwitchSub', new ResolvableField({
          returnType: twitchSubType.attribute(),
          args: getTwitchArg,
          dataSource: prizePoolDatasource,
          requestMappingTemplate: MappingTemplate.dynamoDbGetItem(
            'MonthYear',
            'UserId'
          ),
          responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
        }));

        api.addMutation('createTwitchSub', new ResolvableField({
          returnType: twitchSubType.attribute(),
          args: createTwitchArg,
          dataSource: prizePoolDatasource,
          requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
            PrimaryKey.partition('MonthYear').auto(),
            Values.projecting('input')
          ),
          responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
        }));

        api.addSubscription('onTwitchSubCreated', new ResolvableField({
          returnType: twitchSubType.attribute(),
          directives: [Directive.subscribe('createTwitchSub')],
        }));
    }
}