import { APIGatewayProxyHandler } from "aws-lambda";
import { simulateCampaignSend } from "./controller/CampaignController";

export const simulateCampaign: APIGatewayProxyHandler = async (event) => {
  return await simulateCampaignSend(event);
};
