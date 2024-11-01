import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection/dbconnection";
import Campaign from "./modelCampaign";

interface MessageAttributes {
  id: number;
  campaign_id: number;
  phone: string;
  text: string;
  shipping_status: number;
  process_date: string;
  process_hour: string;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, "id"> {}

class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{
  public id!: number;
  public campaign_id!: number;
  public phone!: string;
  public text!: string;
  public shipping_status!: number;
  public process_date!: string;
  public process_hour!: string;

  static associate() {
    Message.belongsTo(Campaign, { foreignKey: "campaign_id", as: "campaign" });
  }
}

Message.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    campaign_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    text: DataTypes.STRING,
    shipping_status: DataTypes.INTEGER,
    process_date: DataTypes.STRING,
    process_hour: DataTypes.TIME,
  },
  { sequelize: sequelize, tableName: "messages", timestamps: false }
);

export default Message;
