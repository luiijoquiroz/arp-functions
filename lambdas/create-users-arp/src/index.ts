import { dynamoDBUser, RequestUser, validateSchema } from "./dtos";
import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { isValidMail, response } from "@shared";
import { createUserCognito, createUserDB } from './clients'
import { v4 as uuidv4 } from 'uuid';

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("Event", JSON.stringify(event, null, 2));
  const body = JSON.parse(event.body!)
  if (!validateSchema(body)) {
    throw body.errors
  }

  const executionResult = await executeLambda(body).catch((error) => {
    console.error(JSON.stringify(error, null, 2))
    const { code = 500, message } = error
    return response(code, message)
  });
  console.log("Execution result", JSON.stringify(executionResult, null, 2));
  return response(201, 'OK')
}

const executeLambda = async (user: RequestUser): Promise<void> => {
  const { User } = await createUserCognito(user)

  if (User) {

    const userToCreate: dynamoDBUser = {
      PK: uuidv4(),
      SK: user.preferred_time.reduce((acc, current) => acc + '#' + current, ""),
      ...user
    }
    await createUserDB(userToCreate)
  }

  

};