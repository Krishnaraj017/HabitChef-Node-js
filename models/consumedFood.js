import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Assuming you've configured Sequelize
const ConsumedFood = sequelize.define(
  "ConsumedFood",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Correctly set as primary key
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Cannot be null, as each entry must belong to a user
      index: true, // Index for faster lookup
    },
    foodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    foodName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    consumedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    tableName: "consumed_foods", // Custom table name in the database
  }
);

export default ConsumedFood;
