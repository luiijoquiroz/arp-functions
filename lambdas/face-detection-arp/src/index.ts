
import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { CognitoIdentityProviderClient, SignUpRequest, SignUpCommand, SignUpResponse } from "@aws-sdk/client-cognito-identity-provider";
import { isValidMail, response, ExecuteLambdaParams } from "@shared";

const client = new CognitoIdentityProviderClient({});


export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("event", JSON.stringify(event, null, 2));

  const executionResult = await executeLambda({ event, context }).catch((error) => {
    console.error(JSON.stringify(error, null, 2))
    const { code = 500, message } = error
    return response(code, message)
   });
   console.log("executionResult", JSON.stringify(executionResult, null, 2));
   return response(201, 'ok')
}

const executeLambda = async ({
  event,
  context,
}: ExecuteLambdaParams): Promise<SignUpResponse> => {
    console.log("context", JSON.stringify(context, null, 2));
    const { Password, email } = JSON.parse(event.body!)

    if (!isValidMail(email) || !Password) throw new Error("Invalid params")
    
    const signUpRequestArgs: SignUpRequest = { // 
      ClientId: process.env["COGNITO_CLIENT_ID"],
      Username: email,
      Password: Password,
      UserAttributes: [ 
        {
          Name: "email", 
          Value: email,
        },
      ],
    };

    const signUpCommand = new SignUpCommand(signUpRequestArgs);
    return await client.send(signUpCommand)
};