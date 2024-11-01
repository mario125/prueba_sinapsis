import User from "../models/modelUser";
import { Op } from "sequelize";

import syncDatabase from "../models/sync";
import { format, toZonedTime } from "date-fns-tz";

class UserService {
  static async createUser(data: any) {
    console.log("Creando usuario...:" + data);
    try {
      const [user, created] = await User.upsert(data, {
        returning: true,
      });

      const message = created
        ? "Usuario creado con éxito"
        : "Usuario actualizado con éxito";
      return { message, user };
    } catch (error) {
      throw new Error(
        `Error al crear o actualizar el usuario: ${error.message}`
      );
    }
  }

  static async getAllUsers() {
    try {
      await syncDatabase;
      const users = await User.findAll({
        include: [{ association: "customer" }, { association: "campaigns" }],
      });
      return users;
    } catch (error) {
      throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
    }
  }

  // Listar usuarios de un cliente específico
  static async getUsersByCustomer(customerId: number) {
    try {
      const users = await User.findAll({
        where: {
          customer_id: customerId,
        },
        include: [{ association: "customer" }, { association: "campaigns" }],
      });
      return users;
    } catch (error) {
      throw new Error(
        `Error al obtener usuarios del cliente ${customerId}: ${error.message}`
      );
    }
  }
}

export { UserService };
