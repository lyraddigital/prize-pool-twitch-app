"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrizePoolTwitchAppStack = void 0;
const cdk = require("@aws-cdk/core");
const dynamodb = require("@aws-cdk/aws-dynamodb");
class PrizePoolTwitchAppStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        new dynamodb.Table(this, 'PrizePool', {
            partitionKey: { name: 'MonthYear', type: dynamodb.AttributeType.STRING }
        });
        new dynamodb.Table(this, 'SocketConnections', {
            partitionKey: { name: 'Stage', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'ConnectionId', type: dynamodb.AttributeType.STRING }
        });
    }
}
exports.PrizePoolTwitchAppStack = PrizePoolTwitchAppStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpemUtcG9vbC10d2l0Y2gtYXBwLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJpemUtcG9vbC10d2l0Y2gtYXBwLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyxrREFBa0Q7QUFFbEQsTUFBYSx1QkFBd0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNwRCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ3BDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1NBQ3pFLENBQUMsQ0FBQztRQUVILElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDNUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDcEUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7U0FDdkUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBYkQsMERBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBkeW5hbW9kYiBmcm9tICdAYXdzLWNkay9hd3MtZHluYW1vZGInO1xuXG5leHBvcnQgY2xhc3MgUHJpemVQb29sVHdpdGNoQXBwU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgbmV3IGR5bmFtb2RiLlRhYmxlKHRoaXMsICdQcml6ZVBvb2wnLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ01vbnRoWWVhcicsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HIH1cbiAgICB9KTtcblxuICAgIG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnU29ja2V0Q29ubmVjdGlvbnMnLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ1N0YWdlJywgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICAgIHNvcnRLZXk6IHsgbmFtZTogJ0Nvbm5lY3Rpb25JZCcsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HIH1cbiAgICB9KTtcbiAgfVxufVxuIl19