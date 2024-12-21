export const handler = async (event: any) => {
    console.log("Event received:", event);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello from pre-token-generation-arp!" }),
    };
};
