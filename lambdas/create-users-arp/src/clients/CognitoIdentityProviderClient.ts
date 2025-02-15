import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminCreateUserCommandInput, UserType, AdminCreateUserCommandOutput } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import { RequestUser } from "../dtos";

export declare const MessageActionType: {
    readonly RESEND: "RESEND";
    readonly SUPPRESS: "SUPPRESS";
}

export declare const DeliveryMediumType: {
    readonly EMAIL: "EMAIL";
    readonly SMS: "SMS";
};

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({});

const requiredUserAttributes: (keyof RequestUser)[] = [
    "email",
    "name",
    "last_name",
    "birthday",
    "gender",
    "phone_number"
];

const buildUserAttributes = (
    user: RequestUser,
    requiredAttributes: (keyof RequestUser)[]
): AdminCreateUserCommandInput["UserAttributes"] => {
    return requiredAttributes
        .filter(attr => user[attr] !== undefined)
        .map(attr => ({
            Name: attr as string,
            Value: user[attr] as string,
        }));
};

export const createUserCognito = async (user: RequestUser,) => {
    try {

        const userAttributes = buildUserAttributes(user, requiredUserAttributes)

        const createUserRequestArgs: AdminCreateUserCommandInput = {
            UserPoolId: process.env["COGNITO_CLIENT_ID"],
            Username: `${user.name}_${user.last_name}`,
            UserAttributes: userAttributes,
            TemporaryPassword: "STRING_VALUE",
            ForceAliasCreation: false,
            MessageAction: MessageActionType.RESEND,
            DesiredDeliveryMediums: [
                DeliveryMediumType.EMAIL,
            ],
        };
        const adminCreateUserCommand = new AdminCreateUserCommand(createUserRequestArgs);
        return await cognitoIdentityProviderClient.send(adminCreateUserCommand)

    } catch (error) {
        throw error
    }


}
