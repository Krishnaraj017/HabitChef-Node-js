import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  searchFood,
  uploadMiddleware,
  getFoodNutrients,
  searchFoodNames,
  addConsumedFood,
  getConsumedFoods,
} from "../controllers/foodController.js";

const router = express.Router();
router.post(
  "/foods/getWithImage",
  authenticateToken,
  uploadMiddleware,
  searchFood
); //search food with image
router.post("/foods/searchByFoodName", getFoodNutrients); //get food nutrients by food name
router.post("/foods/searchFoodNames", searchFoodNames); //search food namess
router.post("/foods/addConsumedFood", addConsumedFood); //add consumed food
router.post("/foods/getConsumedFoods", getConsumedFoods); //get consumed foods
export default router;
