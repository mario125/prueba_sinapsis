import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CustomerService } from "../services/CustomerService";
import { customerSchema } from "../validators/customerValidator";
import { z } from "zod";

export const createCustomer = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("::::::::::::::::::> event");
  try {
    const data = JSON.parse(event.body || "{}");

    // Validar los datos de usuario usando Zod
    const parsedData = customerSchema.parse(data);

    // Crear el usuario
    const user = await CustomerService.createCustomer(parsedData);

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

export const getAllCustomer = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const users = await CustomerService.getAllCustomer();

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
