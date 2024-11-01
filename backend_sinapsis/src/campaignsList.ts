import { APIGatewayProxyHandler } from "aws-lambda";
import { listCampaignsByDateRange } from "./controller/CampaignController";

export const campaignsList: APIGatewayProxyHandler = async (event) => {
  try {
    return await listCampaignsByDateRange(event);
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
