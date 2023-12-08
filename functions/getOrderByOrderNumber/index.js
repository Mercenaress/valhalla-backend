import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    const { orderNumber } = JSON.parse(event.body);

    const queryCommand = new QueryCommand({
        TableName: "order-db",
        IndexName: "orderNumber-gsi",
        KeyConditionExpression: "orderNumber = :orderNumber",
        ExpressionAttributeValues: {
            ":orderNumber": orderNumber
        }
    });
    const response = await docClient.send(queryCommand);
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Success!",
                response: response.Items
            }
        )
    }
};