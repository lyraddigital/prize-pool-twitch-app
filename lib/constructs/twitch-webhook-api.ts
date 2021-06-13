import { Construct } from "@aws-cdk/core";
import { LambdaIntegration, Model, RestApi } from "@aws-cdk/aws-apigateway";
import { Runtime } from "@aws-cdk/aws-lambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";

import { ChannelSubscriptionSchema } from '../schema/api-gateway';

export class TwitchWebhookApi extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const registerSubscriberLambda = new NodejsFunction(this, 'RegisterSubscriberLambda', {
      entry: 'src/lambda/registerSubscriber/index',
      handler: '.handler',
      runtime: Runtime.NODEJS_14_X
    });

    const restApi = new RestApi(this, 'RestApi', {
      description: 'Handles all webhook posts from Twitch\'s EventSub system',      
    });

    const channelSubscriptionModel = restApi.addModel('ChannelSubscription', {
      contentType: 'application/json',
      modelName: 'ChannelSubscription',
      description: 'This model represents the webhook payload that Twitch sends to our subscription endpoint.',
      schema: ChannelSubscriptionSchema
    });

    const subscriptionsResource = restApi.root.addResource('subscriptions');    
    const postSubscriptionIntegration = new LambdaIntegration(registerSubscriberLambda, {
      integrationResponses: [
        { statusCode: '400', selectionPattern: '.*errorMessage.*', responseTemplates: { 'application/json': `#set($inputRoot = $input.path('$'))` } }
      ]
    });

    subscriptionsResource.addMethod('POST', postSubscriptionIntegration, {
      requestValidatorOptions: {
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