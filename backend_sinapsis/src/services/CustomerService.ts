import Customer from "../models/modelCustomer";
import { Op } from "sequelize";

import syncDatabase from "../models/sync";
import { format, toZonedTime } from "date-fns-tz";

class CustomerService {
  static async createCustomer(data: any) {
    console.log("Creando customer...:" + data);
    try {
      const [user, created] = await Customer.upsert(data, {
        returning: true,
      });

      const message = created
        ? "Customer creado con éxito"
        : "Customer actualizado con éxito";
      return { message, user };
    } catch (error) {
      throw new Error(
        `Error al crear o actualizar el Customer: ${error.message}`
      );
    }
  }

  static async getAllCustomer() {
    try {
      await syncDatabase;
      const users = await Customer.findAll({
        include: [{ association: "users" }],
      });
      return users;
    } catch (error) {
      throw new Error(`Error al obtener todos los Customers: ${error.message}`);
    }
  }
}

export { CustomerService };
