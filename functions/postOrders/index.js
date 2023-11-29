import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { nanoid } from "nanoid";

const dbClient = new DynamoDBClient({
    region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(dbClient);

exports.handler = async (event) => {

    const { progress, items, priceTotal, orderComment, customerInfo } = JSON.parse(event.body);
  
    try {
      const id = nanoid();
      const currentTime = new Date();
      const orderDate = currentTime.toISOString();
      
      
      const putCommand = new PutCommand({
        TableName: "order-db",
        Item: {
            id: id,
            orderDate: orderDate,
            progress: progress,
            items: items,
            priceTotal: priceTotal,
            orderComment: orderComment,
            customerInfo: customerInfo
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