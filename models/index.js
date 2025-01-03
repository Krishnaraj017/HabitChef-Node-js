import ConsumedFood from "./consumedFood.js";
import Nutrients from "./nutrients.js";

// Define associations
ConsumedFood.belongsTo(Nutrients, { foreignKey: "foodId", as: "nutrients" });
Nutrients.hasMany(ConsumedFood, { foreignKey: "foodId" });

export { ConsumedFood, Nutrients };
