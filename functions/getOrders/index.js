import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const command = new ScanCommand({
    TableName: 'order-db'
  });

  const response = await docClient.send(command);
  console.log('response:', response, 'event:', event);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Success',
        input: response.Items,
      },
      null,
      2
    ),
  };
};
