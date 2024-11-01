import { APIGatewayProxyHandler } from "aws-lambda";
import { apiPeopleId } from "./swapi/swapiService";
import { idSchema } from "./validations/userSchema";
import { createCampaign } from "./controller/CampaignController";

export const campaigns: APIGatewayProxyHandler = async (event) => {
  try {
    return await createCampaign(event);
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
