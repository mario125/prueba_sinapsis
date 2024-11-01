import { APIGatewayProxyHandler } from "aws-lambda";
import {
  createCustomer,
  getAllCustomer,
} from "./controller/CustomerController";

export const registerCustomer: APIGatewayProxyHandler = async (event) => {
  try {
    return await createCustomer(event);
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

export const getCustomerAll: APIGatewayProxyHandler = async (event) => {
  try {
    return await getAllCustomer(event);
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
