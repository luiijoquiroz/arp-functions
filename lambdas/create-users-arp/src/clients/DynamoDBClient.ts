import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoDBUser } from "../dtos";


const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const createUserDB = async (user: dynamoDBUser) => {
  try {

    const putCommand = new PutCommand({
      TableName: process.env.USERS_TABLE,
      Item: user
    });

    const response = await docClient.send(putCommand);
    return response;

  } catch (error) {
    throw error
  }

};

