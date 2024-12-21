#!/bin/bash

# JSON file path
json_file="functions.json"

# Parse the JSON and create folders
jq -c '.Functions[]' "$json_file" | while read -r function; do
  # Extract FunctionName and Handler
  function_name=$(echo "$function" | jq -r '.FunctionName')
  handler=$(echo "$function" | jq -r '.Handler')

  # Create folder for the function
  mkdir -p "$function_name"

  # Create index.ts with the base content
  cat <<EOF > "$function_name/index.ts"
export const handler = async (event: any) => {
    console.log("Event received:", event);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello from $function_name!" }),
    };
};
EOF

  # Log the creation
  echo "Created folder: $function_name with handler: $handler"
done