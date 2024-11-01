import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection/dbconnection";
import Message from "./modelMessage";
import User from "./modelUser";

interface CampaignAttributes {
  id: number;
  user_id: number;
  name: string;
  process_date: Date;
  process_hour: string;
  process_status: number;
  phone_list: string;
  message_text: string;
}

interface CampaignCreationAttributes
  extends Optional<CampaignAttributes, "id"> {}

class Campaign
  extends Model<CampaignAttributes, CampaignCreationAttributes>
  implements CampaignAttributes
{
  public id!: number;
  public user_id!: number;
  public name!: string;
  public process_date!: Date;
  public process_hour!: string;
  public process_status!: number;
  public phone_list!: string;
  public message_text!: string;

  static associate() {
    Campaign.belongsTo(User, { foreignKey: "user_id", as: "user" });
    Campaign.hasMany(Message, { foreignKey: "campaign_id", as: "messages" }); // alias "messages" debe coincidir
  }
}

Campaign.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    process_date: DataTypes.DATE,
    process_hour: DataTypes.TIME,
    process_status: DataTypes.INTEGER,
    phone_list: DataTypes.STRING,
    message_text: DataTypes.TEXT,
  },
  { sequelize, tableName: "campaigns", timestamps: false }
);

export default Campaign;
