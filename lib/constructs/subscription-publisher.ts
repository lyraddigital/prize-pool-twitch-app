import { Construct } from "@aws-cdk/core";
import { IEventSource, Runtime } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';

export interface SubscriptionPublisherProps {
    prizePoolTableStreamSource: IEventSource;
}

export class SubscriptionPublisher extends Construct {
    constructor(scope: Construct, id: string, props: SubscriptionPublisherProps) {
        super(scope, id);

        const reportNewSubscriberBotFn = new NodejsFunction(this, 'ReportNewSubcriberBotLambda', {
            functionName: 'reportNewSubcriberToTwitchBot',
            runtime: Runtime.NODEJS_14_X,
            handler: 'index.handler',
            entry: `src/lambda/reportNewSub/index.js`
          });
      
          props.prizePoolTableStreamSource.bind(reportNewSubscriberBotFn);
    }
}