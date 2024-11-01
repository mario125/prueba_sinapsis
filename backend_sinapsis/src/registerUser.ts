import { APIGatewayProxyHandler } from "aws-lambda";
import { createUser, getAllUsers } from "./controller/UserController";

export const registerUser: APIGatewayProxyHandler = async (event) => {
  try {
    return await createUser(event);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Ocurrió un error interno en el servidor",
        error: error.message,
      }),
    };
  }
};

export const getUserAll: APIGatewayProxyHandler = async (event) => {
  try {
    return await getAllUsers(event);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Ocurrió un error interno en el servidor",
        error: error.message,
      }),
    };
  }
};
