import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    const { orderId } = event.pathParameters;
    const { progress } = JSON.parse(event.body); 
  
    const command = new UpdateCommand({
      TableName: "order-db",
      Key: {
        id: orderId,
      },
      UpdateExpression: "set progress = :progress",
      ExpressionAttributeValues: {
        ":progress": progress
      },
      ReturnValues: "ALL_NEW",
    });
  
    const response = await docClient.send(command);
  
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Success!',
            response: response,
          },
          null,
          2
        ),
      };
    };