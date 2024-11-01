import { APIGatewayProxyHandler } from "aws-lambda";
import { messagesListByDateRange } from "./controller/CampaignController";

export const messagesList: APIGatewayProxyHandler = async (event) => {
  try {
    return await messagesListByDateRange(event);
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
