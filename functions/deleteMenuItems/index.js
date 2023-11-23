import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const { menuItemId } = event.pathParameters;
  const command = new DeleteCommand({
    TableName: "menu-db",
    Key: {
      id: menuItemId,
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