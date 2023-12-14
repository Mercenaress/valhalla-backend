import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { nanoid } from "nanoid";

const dbClient = new DynamoDBClient({
    region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(dbClient);

exports.handler = async (event) => {

    const { items, orderComment, customerInfo, orderNumber } = JSON.parse(event.body);
  
    try {
      const id = nanoid();
      const currentTime = new Date();
      const orderDate = currentTime.toISOString();
      
      let totalSum = 0;
      for(var i = 0; i < items.length; i++){
        totalSum = totalSum + items[i].price * items[i].quantity;
      }

      const putCommand = new PutCommand({
        TableName: "order-db",
        Item: {
            id: id,
            orderNumber: orderNumber,
            orderDate: orderDate,
            progress: 'Pending',
            items: items,
            priceTotal: totalSum,
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
              orderNumber: orderNumber,
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