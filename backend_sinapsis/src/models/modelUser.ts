import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection/dbconnection";
import Campaign from "./modelCampaign";
import Customer from "./modelCustomer";

interface UserAttributes {
  id: number;
  customer_id: number;
  username: string;
  status: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public customer_id!: number;
  public username!: string;
  public status!: string;

  static associate() {
    User.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });
    User.hasMany(Campaign, { foreignKey: "user_id", as: "campaigns" });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "users",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["customer_id", "username"], // Índice único en customer_id y username
      },
    ],
  }
);

export default User;
