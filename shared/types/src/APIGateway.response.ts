import {
    Context,
    APIGatewayEvent,
    APIGatewayProxyResult
  } from "aws-lambda";
  
  export const response = (code: number, message: string): APIGatewayProxyResult => ({
    statusCode: code,
    body: JSON.stringify(message),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  
  export type ExecuteLambdaParams = {
    event: APIGatewayEvent;
    context: Context;
  };
  
  export type Obj = { [key: string]: any };