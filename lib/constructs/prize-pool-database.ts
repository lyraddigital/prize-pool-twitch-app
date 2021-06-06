import { Construct } from "@aws-cdk/core";
import { AttributeType, Table } from "@aws-cdk/aws-dynamodb";
import { StreamViewType } from '@aws-cdk/aws-dynamodb';
import { DynamoEventSource } from '@aws-cdk/aws-lambda-event-sources';
import { IEventSource, StartingPosition } from "@aws-cdk/aws-lambda";

export class PrizePoolDatabase extends Construct {
    public tableStreamSource: IEventSource;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        const table = new Table(this, 'PrizePool', {
            tableName: 'PrizePool',
            stream: StreamViewType.NEW_IMAGE,
            partitionKey: { name: 'MonthYear', type: AttributeType.STRING }
        });

        this.tableStreamSource = new DynamoEventSource(table, { startingPosition: StartingPosition.LATEST });
    }
}