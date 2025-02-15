import Ajv, { JSONSchemaType } from "ajv"

const ajv = new Ajv()

export interface RequestUser {
    email: string;
    name: string;
    last_name: string;
    birthday: string;
    gender: 'male' | 'female';
    phone_number: string;
    phone_legal_guardian?: string;
    disciplines: string[];
    belt: string;
    grade: number;
    preferred_time: string[];
    preferred_discipline: string;
    other_experience?: string;
    medical_conditions?: string[];
    legal_guardian?: string;
    image?: string;
    start_date?: string;
    end_date?: string;
    is_active: boolean
}

export interface dynamoDBUser {
    PK: string;
    SK: string;
    email: string;
    name: string;
    last_name: string;
    birthday: string;
    gender: 'male' | 'female';
    phone_number: string;
    phone_legal_guardian?: string;
    disciplines: string[];
    belt: string;
    grade: number;
    preferred_time: string[];
    preferred_discipline: string;
    other_experience?: string;
    medical_conditions?: string[];
    legal_guardian?: string;
    image?: string;
    start_date?: string;
    end_date?: string;
    is_active: boolean
}

const userSchema: JSONSchemaType<RequestUser> = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        name: { type: "string", minLength: 3 },
        last_name: { type: "string", minLength: 3 },
        birthday: { type: "string", format: "date" },
        gender: {
            type: "string",
            enum: ["male", "female"],
        },
        phone_number: { type: "string", pattern: "^[0-9]{7,15}$" },
        phone_legal_guardian: { type: "string", pattern: "^[0-9]{7,15}$", nullable: true },
        disciplines: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
        },
        preferred_time: { type: "string" },
        preferred_discipline: { type: "string" },
        belt: { type: "string", },
        grade: { type: "number" },
        image: { type: "string", format: "uri", nullable: true },
        medical_conditions: {
            type: "array",
            items: { type: "string" },
            nullable: true,
        },
        other_experience: { type: "string", nullable: true },
        legal_guardian: { type: "string", nullable: true },
        start_date: { type: "string", format: "date", nullable: true },
        end_date: { type: "string", format: "date", nullable: true },
        is_active: { type: "boolean", default: true },
    },
    required: [
        "email",
        "name",
        "last_name",
        "birthday",
        "gender",
        "phone_number",
        "disciplines",
        "preferred_time",
        "preferred_discipline"
    ],
    additionalProperties: false,
};

export const validateSchema = ajv.compile(userSchema)
