import { Construct } from "@aws-cdk/core";
import { EndpointType, LambdaIntegration, Model, PassthroughBehavior, RestApi } from "@aws-cdk/aws-apigateway";
import { Runtime } from "@aws-cdk/aws-lambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";

import { ChannelSubscriptionSchema } from '../schema/api-gateway';

export interface TwitchWebhookApiProps {
  prizePoolApiKey: string;
  prizePoolApiEndpoint: string;
}

export class TwitchWebhookApi extends Construct {
  constructor(scope: Construct, id: string, props: TwitchWebhookApiProps) {
    super(scope, id);

    const registerSubscriberLambda = new NodejsFunction(this, 'RegisterSubscriberLambda', {
      entry: 'src/lambda/registerSubscriber/index.js',
      handler: 'handler',
      runtime: Runtime.NODEJS_14_X,
      environment: {
        PRIZE_POOL_API_KEY: props.prizePoolApiKey,
        PRIZE_POOL_ENDPOINT: props.prizePoolApiEndpoint
      }
    });

    const restApi = new RestApi(this, 'RestApi', {
      restApiName: 'TwitchPrizeDrawWebhookAPI',
      description: 'Handles all webhook posts from Twitch\'s EventSub system',
      endpointTypes: [EndpointType.REGIONAL],
      deployOptions: {
        stageName: 'Production'
      }  
    });

    const channelSubscriptionModel = restApi.addModel('ChannelSubscription', {
      contentType: 'application/json',
      modelName: 'ChannelSubscription',
      description: 'This model represents the webhook payload that Twitch sends to our subscription endpoint.',
      schema: ChannelSubscriptionSchema
    });

    const subscriptionsResource = restApi.root.addResource('subscriptions');    
    const postSubscriptionIntegration = new LambdaIntegration(registerSubscriberLambda, {
      proxy: false,
      passthroughBehavior: PassthroughBehavior.WHEN_NO_TEMPLATES,
      requestTemplates: {
        'application/json': `{
    "body": $input.json('$'),
    "headers": {
        #foreach($param in $input.params().header.keySet())
        "$param": "$util.escapeJavaScript($input.params().header.get($param))"
        #if($foreach.hasNext),#end
        #end
    }
}`
      },
      integrationResponses: [
        { statusCode: '200', responseTemplates: { 'application/json': `$input.path('$')` } },
        { statusCode: '400', selectionPattern: '.*errorMessage.*', responseTemplates: { 'application/json': `#set($inputRoot = $input.path('$'))` } }
      ]
    });

    subscriptionsResource.addMethod('POST', postSubscriptionIntegration, {
      requestValidatorOptions: {
        requestValidatorName: 'Validate body',
        validateRequestBody: true
      },
      requestModels: { 'application/json': channelSubscriptionModel },
      methodResponses: [
        { statusCode: '200', responseModels: { 'text/plain ': Model.EMPTY_MODEL } },
        { statusCode: '400', responseModels: { 'application/json': Model.EMPTY_MODEL } }
      ]
    });
  }
}