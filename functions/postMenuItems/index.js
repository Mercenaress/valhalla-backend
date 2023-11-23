import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { nanoid } from "nanoid";

const dbClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(dbClient);

exports.handler = async (event) => {

    const { itemName, toppings, price, image, category } = JSON.parse(event.body);
  
    try {
      const id = nanoid();
      const putCommand = new PutCommand({
        TableName: "menu-db",
        Item: {
          id: id,
          itemName: itemName,
          toppings: toppings,
          price: price,
          image: image,
          category: category,
        },
      });
      console.log(putCommand);
      await docClient.send(putCommand);
      return { 
          statusCode: 200,
          body: JSON.stringify(
              {
              message: "Success!",
              },
          )
      };
    } catch (err) {
      return { 
        statusCode: 500,
        body: JSON.stringify(
            {
            message: "Epic failure",
            },
        )
    };
    };
  };