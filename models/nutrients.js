import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
const Nutrients = sequelize.define(
  "Nutrients",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    proteins: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    carbohydrates: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    healthyFats: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    vitamins: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("vitamins");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("vitamins", JSON.stringify(value));
      },
    },
    minerals: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("minerals");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("minerals", JSON.stringify(value));
      },
    },
    antioxidants: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("antioxidants");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("antioxidants", JSON.stringify(value));
      },
    },
    fiber: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // New fields for gender-specific pros and cons
    prosForMen: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("prosForMen");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("prosForMen", JSON.stringify(value));
      },
    },
    consForMen: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("consForMen");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("consForMen", JSON.stringify(value));
      },
    },
    prosForWomen: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("prosForWomen");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("prosForWomen", JSON.stringify(value));
      },
    },
    consForWomen: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("consForWomen");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("consForWomen", JSON.stringify(value));
      },
    },

    // Nutrient type classification
    nutritientType: {
      type: DataTypes.ENUM(
        "Macronutrient",
        "Micronutrient",
        "Functional Food",
        "Supplement"
      ),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "nutrients",

    hooks: {
      beforeValidate: (nutrient) => {
        // Previous validation remains the same
        nutrient.proteins = Math.max(0, nutrient.proteins || 0);
        nutrient.carbohydrates = Math.max(0, nutrient.carbohydrates || 0);
        nutrient.healthyFats = Math.max(0, nutrient.healthyFats || 0);
        nutrient.fiber = Math.max(0, nutrient.fiber || 0);
      },
    },
  }
);
// Nutrients model

export default Nutrients;
