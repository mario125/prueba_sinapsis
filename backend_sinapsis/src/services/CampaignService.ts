import Campaign from "../models/modelCampaign";
import Message from "../models/modelMessage";
import { Op } from "sequelize";

import syncDatabase from "../models/sync";
import { format, toZonedTime } from "date-fns-tz";

class CampaignService {
  static async createCampaign(data: any) {
    try {
      const campaign = await Campaign.create(data);
      return campaign;
    } catch (error) {
      throw new Error(`Error al crear la campaña: ${error.message}`);
    }
  }

  static async listCampaignsByDateRange(startDate: string, endDate: string) {
    try {
      await syncDatabase;

      const campaigns = await Campaign.findAll({
        where: {
          process_date: {
            [Op.between]: [startDate, endDate],
          },
        },
        include: [
          {
            model: Message,
            as: "messages",
          },
        ],
      });
      return {
        message: "Campañas listadas con éxito.",
        status: true,
        data: campaigns,
      };
    } catch (error) {
      console.error(`Error al listar campañas: ${error.message}`);
      return {
        message: `Error al listar campañas: ${error.message}`,
        status: false,
        data: [],
      };
    }
  }

  static async messagesListByDateRange(
    startDate: string,
    endDate: string,
    campaignId: number
  ) {
    try {
      await syncDatabase;

      const Messages = await Message.findAll({
        where: {
          campaign_id: campaignId,
          process_date: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
      return {
        message: "Messages listadas con éxito.",
        status: true,
        data: Messages,
      };
    } catch (error) {
      console.error(`Error al listar Messages: ${error.message}`);
      return {
        message: `Error al listar Messages: ${error.message}`,
        status: false,
        data: [],
      };
    }
  }
}

class SimulationService {
  static async simulateCampaignSend(campaignId: number) {
    try {
      console.log(`Iniciando simulación para la campaña con ID: ${campaignId}`);

      // Encontrar la campaña
      const campaign = await Campaign.findByPk(campaignId);
      if (!campaign) {
        return {
          message: `La campaña con ID ${campaignId} no existe.`,
          status: false,
        };
      }

      // Verificar estado de la campaña
      if (campaign.process_status != 1) {
        return {
          message:
            "La campaña no está en estado 'pendiente', no se puede simular el envío.",
          status: false,
        };
      }

      //Obtener los numero y luego registrar mensajes en paralelo para optimizar envio
      const phoneNumbers = campaign.phone_list
        .split("|")
        .map((phone) => phone.trim());
      await Promise.all(
        phoneNumbers.map((phone) =>
          Message.create({
            campaign_id: campaignId,
            phone,
            text: campaign.message_text,
            shipping_status: 1,
          })
        )
      );
      console.log(
        `Registrados ${phoneNumbers.length} mensajes en estado 'pendiente'.`
      );

      // Actualizar estado de la campaña a "en proceso"
      await campaign.update({ process_status: 2 });
      console.log(
        `La campaña (ID: ${campaignId}) se ha actualizado a estado 'en proceso'.`
      );

      // Simular envío de mensajes en paralelo
      const messages = await Message.findAll({
        where: { campaign_id: campaignId, shipping_status: 1 },
      });
      await Promise.all(
        messages.map((message) => {
          const newStatus = Math.random() > 0.5 ? 2 : 3; // 50% de éxito (enviado), 50% de error
          console.log(
            `Simulando envío para el mensaje ID: ${message.id} - Teléfono: ${
              message.phone
            }, Estado: ${newStatus === 2 ? "Enviado" : "Error"}`
          );

          const currentDate = new Date();

          const limaTime = toZonedTime(currentDate, "America/Lima");
          const formattedDate = format(limaTime, "yyyy-MM-dd HH:mm:ss");
          const formattedTime = format(limaTime, "HH:mm:ss");
          console.log(`${formattedDate}   ${formattedTime}`);
          return message.update({
            shipping_status: newStatus,
            process_date: formattedDate,
            process_hour: formattedTime,
          });
        })
      );

      // Actualizar estado de la campaña a "finalizada"
      await campaign.update({ process_status: 3 });
      console.log(
        `La campaña (ID: ${campaignId}) ha sido actualizada a estado 'finalizada'.`
      );

      return {
        message: "Envío de campaña simulado con éxito.",
        status: true,
      };
    } catch (error) {
      console.error(
        `Error durante la simulación de la campaña con ID ${campaignId}: ${error.message}`
      );
      return {
        message: `Error en la simulación: ${error.message}`,
        status: false,
      };
    }
  }
}

export { CampaignService, SimulationService };
