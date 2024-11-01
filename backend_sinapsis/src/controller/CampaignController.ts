import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  CampaignService,
  SimulationService,
} from "../services/CampaignService";
import {
  campaignSchema,
  campaignIdSchema,
  dateRangeSchema,
} from "../validators/campaignValidator";
import { z } from "zod";

export const createCampaign = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const data = JSON.parse(event.body || "{}");

    // Validar los datos usando Zod
    const parsedData = campaignSchema.parse(data);

    // crear la campaña
    const campaign = await CampaignService.createCampaign(parsedData);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Campaña creada con éxito.",
        status: true,
        data: campaign,
      }),
    };
  } catch (error) {
    // Verifica si el error es de Zod para formatear
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Errores de validación.",
          status: false,
          errors: formattedErrors,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Error al crear la campaña: ${error.message}`,
        status: false,
      }),
    };
  }
};

export const simulateCampaignSend = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters || {};

    // Validar el ID de la campaña usando Zod
    campaignIdSchema.parse({ id });

    // Ejecutar la simulación de envío
    const result = await SimulationService.simulateCampaignSend(
      parseInt(id as string, 10)
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    // Gestionar errores de validación de Zod
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return {
        statusCode: 200,
        body: JSON.stringify({ errors: formattedErrors }),
      };
    }

    // Otros errores
    return {
      statusCode: 200,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export const listCampaignsByDateRange = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("========================= LISTAR CAMAPAÑAS");
    const { startDate, endDate } = event.queryStringParameters || {};

    dateRangeSchema.parse({ startDate, endDate });

    // Llamar al servicio para obtener las campañas en el rango de fechas
    const result = await CampaignService.listCampaignsByDateRange(
      startDate as string,
      endDate as string
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(
      `Error en el controlador de listar campañas: ${error.message}`
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Error al listar campañas.",
        status: false,
        error: error.message,
      }),
    };
  }
};

export const messagesListByDateRange = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { startDate, endDate, campaignId } =
      event.queryStringParameters || {};

    const campaignIdNumber = parseInt(campaignId, 10);
    if (isNaN(campaignIdNumber)) {
      throw new Error("El campaignId debe ser un número válido.");
    }

    // Validar usando el esquema de zod
    dateRangeSchema.parse({ startDate, endDate, campaignIdNumber });

    // Llamar al servicio para obtener las campañas en el rango de fechas
    const result = await CampaignService.messagesListByDateRange(
      startDate as string,
      endDate as string,
      campaignIdNumber as number
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(
      `Error en el controlador de listar campañas: ${error.message}`
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Error al listar campañas.",
        status: false,
        error: error.message,
      }),
    };
  }
};
