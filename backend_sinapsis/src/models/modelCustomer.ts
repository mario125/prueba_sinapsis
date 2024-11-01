import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection/dbconnection";
import User from "./modelUser";

interface CustomerAttributes {
  id: number;
  name: string;
  status: string;
}

interface CustomerCreationAttributes
  extends Optional<CustomerAttributes, "id"> {}

class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  public id!: number;
  public name!: string;
  public status!: string;

  static associate() {
    Customer.hasMany(User, { foreignKey: "customer_id", as: "users" });
  }
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    status: DataTypes.STRING,
  },
  {
    sequelize: sequelize,
    tableName: "customers",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["name"], // Índice único en customer_id y username
      },
    ],
  }
);

export default Customer;
