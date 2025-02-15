import { Context, PreSignUpTriggerEvent } from "aws-lambda";
import { CognitoIdentityProviderClient, AdminListGroupsForUserCommand } from "@aws-sdk/client-cognito-identity-provider";

const cognitoIdentityServiceProviderClient = new CognitoIdentityProviderClient({});

export const handler =  async (
  event: PreSignUpTriggerEvent ,
  context: Context
): Promise<PreSignUpTriggerEvent> => {
  console.log(context.functionName, JSON.stringify(event, null, 2))

  const executionResult = await executeLambda(event, context).catch((error) => {
    console.error(JSON.stringify(error, null, 2))
    throw error
  });
  console.log("execution result", JSON.stringify(executionResult, null, 2));
  return executionResult

}

const executeLambda = async (
  event: PreSignUpTriggerEvent,
  context: Context): Promise<PreSignUpTriggerEvent> => {
  try {
    
    // if (event.triggerSource === 'PreAuthentication_Authentication') {
    //   const username = event.userName;
    //   const { userPoolId } = event
    
    //   const userGroupsCommand = new AdminListGroupsForUserCommand({
    //     Username: username,
    //     UserPoolId: userPoolId
    //   });

    //   const userGroups = await cognitoIdentityServiceProviderClient.send(userGroupsCommand);
    //   const requiredGroup = 'NombreDelGrupo';
    //   const isInRequiredGroup = userGroups.Groups?.some(group => group.GroupName === requiredGroup);

    //   if (!isInRequiredGroup) {
    //     throw new Error('El usuario no está en el grupo requerido');
    //   }

      
    //   event.response = {
    //     ...event.response,
    //     claimsOverrideDetails: {
    //       claimsToAddOrOverride: {
    //         'custom:isInRequiredGroup': 'true'
    //       }
    //     }
    //   };
    // }
    return event;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};