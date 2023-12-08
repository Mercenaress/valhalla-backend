import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const { orderId } = event.pathParameters;
  const command = new DeleteCommand({
    TableName: "order-db",
    Key: {
      id: orderId,
    },
  });

  const response = await docClient.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Success!',
          response: response
        },
        null,
        2
      ),
    };
  };