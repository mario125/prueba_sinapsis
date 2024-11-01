import { sequelize } from "../connection/dbconnection";
import Campaign from "./modelCampaign";
import Message from "./modelMessage";
import User from "./modelUser";
import Customer from "./modelCustomer";

// Definir las asociaciones
const defineAssociations = () => {
  Campaign.associate();
  Message.associate();
  User.associate && User.associate(); // si User tiene asociaciones
  Customer.associate && Customer.associate(); // si Customer tiene asociaciones
};

// Sincronizar la base de datos
const syncDatabase = async () => {
  defineAssociations(); // Llamar a las asociaciones antes de sincronizar
  await sequelize.sync({ alter: false });
  console.log("Database synchronized");
};

syncDatabase();

export default syncDatabase;
