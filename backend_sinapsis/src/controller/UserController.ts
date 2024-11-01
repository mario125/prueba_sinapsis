import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserService } from "../services/UserService";
import { userSchema, customerIdValidator } from "../validators/userValidator";
import { z } from "zod";

export const createUser = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("::::::::::::::::::> event");
  try {
    const data = JSON.parse(event.body || "{}");

    // Validar los datos de usuario usando Zod
    const parsedData = userSchema.parse(data);

    // Crear el usuario
    const user = await UserService.createUser(parsedData);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Usuario creado con éxito.",
        status: true,
        data: user,
      }),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Errores de validación.",
          status: false,
          errors: formattedErrors,
        }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error al crear el usuario: ${error.message}`,
        status: false,
      }),
    };
  }
};

export const getAllUsers = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const users = await UserService.getAllUsers();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Usuarios obtenidos con éxito.",
        status: true,
        data: users,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error al obtener los usuarios: ${error.message}`,
        status: false,
      }),
    };
  }
};

export const getUsersByCustomer = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { customerId } = event.pathParameters || {};

    // Validar el customerId usando Zod
    customerIdValidator.parse({ customerId: Number(customerId) });

    const users = await UserService.getUsersByCustomer(Number(customerId));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Usuarios del cliente ${customerId} obtenidos con éxito.`,
        status: true,
        data: users,
      }),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Errores de validación.",
          status: false,
          errors: formattedErrors,
        }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error al obtener los usuarios del cliente: ${error.message}`,
        status: false,
      }),
    };
  }
};
