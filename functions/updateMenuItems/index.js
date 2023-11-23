import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    const { menuItemId } = event.pathParameters;
    const { itemName, toppings, price, image, category } = JSON.parse(event.body); 
  
    const command = new UpdateCommand({
      TableName: "menu-db",
      Key: {
        id: menuItemId,
      },
      UpdateExpression: "set itemName = :itemName, toppings = :toppings, price = :price, image = :image, category = :category",
      ExpressionAttributeValues: {
        ":itemName": itemName,
        ":toppings": toppings,
        ":price": price,
        ":image": image,
        ":category": category,
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