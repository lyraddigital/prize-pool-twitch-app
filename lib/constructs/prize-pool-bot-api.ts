import { Construct } from "@aws-cdk/core";
import { AuthorizationType, Directive, GraphqlApi, KeyCondition, MappingTemplate, PrimaryKey, ResolvableField, Values } from '@aws-cdk/aws-appsync';
import { AttributeType, Table } from "@aws-cdk/aws-dynamodb";

import {
  createTwitchArg,
  getTwitchArg,
  schema,
  twitchSubType
} from '../schema/app-sync';

export class PrizePoolBotApi extends Construct {
  public apiKey: string;
  public endpoint: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = new Table(this, 'PrizePool', {
      tableName: 'PrizePool',
      partitionKey: { name: 'MonthYear', type: AttributeType.STRING },
      sortKey: { name: 'UserId', type: AttributeType.STRING }
    });

    const api = new GraphqlApi(this, 'Api', {
      name: 'TwitchBotPrizeAPI',
      schema,
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY
        },
      }
    });

    this.apiKey = api.apiKey ?? '';
    this.endpoint = api.graphqlUrl;
    
    const prizePoolDatasource = api.addDynamoDbDataSource('PrizePoolDatasource', table);

    api.addQuery('getTwitchSub', new ResolvableField({
      returnType: twitchSubType.attribute(),
      args: getTwitchArg,
      dataSource: prizePoolDatasource,
      requestMappingTemplate: MappingTemplate.dynamoDbQuery(
        KeyCondition.eq('MonthYear', 'MonthYear').and(KeyCondition.eq('UserId', 'UserId'))
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
    }));

    api.addMutation('createTwitchSub', new ResolvableField({
      returnType: twitchSubType.attribute(),
      args: createTwitchArg,
      dataSource: prizePoolDatasource,
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition("MonthYear")
          .is("input.MonthYear")
          .sort('UserId')
          .is('input.UserId'),
        Values.projecting('input')
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
    }));

    // api.addSubscription('onTwitchSubCreated', new ResolvableField({
    //   returnType: twitchSubType.attribute(),
    //   directives: [Directive.subscribe('createTwitchSub')],
    // }));
  }
}