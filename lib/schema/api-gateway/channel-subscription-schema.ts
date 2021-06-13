import { JsonSchema, JsonSchemaType, JsonSchemaVersion } from "@aws-cdk/aws-apigateway";

export const ChannelSubscriptionSchema: JsonSchema = {
    schema: JsonSchemaVersion.DRAFT4,
    title: 'ChannelSubscription',
    type: JsonSchemaType.OBJECT,
    properties: {
        challenge: {
            type: JsonSchemaType.STRING
        },
        subscription: {
            title: 'Subscription',
            type: JsonSchemaType.OBJECT,
            properties: {
                id: {
                    title: "Id",
                    type: JsonSchemaType.STRING
                },
                type: {
                    title: "Type",
                    type: JsonSchemaType.STRING,
                    enum: ['channel.subscribe']
                },
                version: {
                    title: "Version",
                    type: JsonSchemaType.STRING
                },
                status: {
                    title: "Status",
                    type: JsonSchemaType.STRING
                },
                cost: {
                    title: "Cost",
                    type: JsonSchemaType.INTEGER
                },
                condition: {
                    type: JsonSchemaType.OBJECT,
                    title: 'Condition',
                    properties: {
                        broadcaster_user_id: {
                            type: JsonSchemaType.STRING
                        } 
                    },
                    required: ['broadcaster_user_id']
                },
                created_at: {
                    title: "Created At",
                    type: JsonSchemaType.STRING
                },
                transport: {
                    title: "Transport",
                    type: JsonSchemaType.OBJECT,
                    properties: {
                        method: {
                            title: "Method",
                            type: JsonSchemaType.STRING,
                            enum: ["webhook"]
                        },
                        callback: {
                            title: "Callback",
                            type: JsonSchemaType.STRING,
                            format: "uri"
                        }
                    },
                    required: ["method", "callback"]
                }
            },
            required: [
                "id",
                "type",
                "version",
                "status",
                "cost",
                "condition",
                "created_at",
                "transport"
            ]
        },
        event: {
            title: "Event",
            type: JsonSchemaType.OBJECT,
            properties: {
                user_id: {
                    title: "User Id",
                    type: JsonSchemaType.STRING
                },                
                user_login: {
                    title: "Username",
                    type: JsonSchemaType.STRING
                },
                user_name: {
                    title: "Display Name",
                    type: JsonSchemaType.STRING
                },
                broadcaster_user_id: {
                    title: "Broadcaster User id",
                    type: JsonSchemaType.STRING
                },
                broadcaster_user_login: {
                    title: "Broadcaster Username",
                    type: JsonSchemaType.STRING
                },
                broadcaster_user_name: {
                    title: "Broadcaster Display Name",
                    type: JsonSchemaType.STRING
                },
                tier: {
                    title: "Subscription Tier",
                    type: JsonSchemaType.STRING
                },
                is_gift: {
                    title: "Is Gift",
                    type: JsonSchemaType.BOOLEAN
                }
            },
            required: [
                "user_id",
                "user_login",
                "user_name",
                "broadcaster_user_login",
                "broadcaster_user_name",
                "tier",
                "is_gift"
             ]
        }
    },
    required: ["subscription"]
};