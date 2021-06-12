import { Construct } from "@aws-cdk/core";
import { AttributeType, ITable, Table } from "@aws-cdk/aws-dynamodb";
import { StreamViewType } from '@aws-cdk/aws-dynamodb';

export class PrizePoolDatabase extends Construct {
    public table: ITable;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'PrizePool', {
            tableName: 'PrizePool',
            stream: StreamViewType.NEW_IMAGE,
            partitionKey: { name: 'MonthYear', type: AttributeType.STRING },
            sortKey: { name: 'UserId', type: AttributeType.STRING }
        });
    }
}