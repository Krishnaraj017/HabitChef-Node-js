import axios from "axios";
import { Op } from "sequelize";
import multer from "multer";
import { ConsumedFood, Nutrients } from "../models/index.js";

import { fileTypeFromBuffer } from "file-type";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      console.log(file.mimetype);
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Only JPEG and PNG are supported."),
        false
      );
    }
  },
});

// Search Food by Image
export const searchFood = async (req, res) => {
  console.log("reached api");
  // Check if a file was uploaded
  // console.log(req.body);
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  try {
    // Create FormData to send to prediction endpoint
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([req.file.buffer], { type: req.file.mimetype }),
      req.file.originalname
    );

    // Send image to prediction endpoint
    const predictionResponse = await axios.post(
      "http://127.0.0.1:8000/predict",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Extract predicted foods
    const predictedFoods = predictionResponse.data.predicted_foods;
    console.log(predictedFoods);
    // If no predictions, return error
    if (!predictedFoods || predictedFoods.length === 0) {
      return res.status(200).json({
        message:
          "The food cannot be identified. Please try searching manually.",
      });
    }

    // Retrieve nutrient information for the predicted foods
    const foodNutrients = await Promise.all(
      predictedFoods.map(async (foodName) => {
        // Case-insensitive search for the food name
        const nutrient = await Nutrients.findOne({
          where: {
            name: {
              [Op.iLike]: `%${foodName}%`,
            },
          },
        });

        return nutrient;
      })
    );

    // Filter out null results
    const validNutrients = foodNutrients.filter(
      (nutrient) => nutrient !== null
    );

    // If no nutrients found
    if (validNutrients.length === 0) {
      return res.status(404).json({
        message: "No nutritional information found for the predicted foods",
        predictedFoods,
      });
    }

    // Return the nutrients for the predicted foods
    res.status(200).json({
      message: "Food identified successfully",
      predictedFoods,
      nutrients: validNutrients,
    });
  } catch (error) {
    console.error("Error in food search:", error);

    // Differentiate between axios and other errors
    if (error.response) {
      // The request was made and the server responded with a status code
      return res.status(error.response.status).json({
        message: "Error from prediction service",
        details: error.response.data,
      });
    } else if (error.request) {
      // The request was made but no response was received
      return res.status(500).json({
        message: "No response from prediction service",
        details: error.message,
      });
    } else {
      // Something happened in setting up the request
      return res.status(500).json({
        message: "Server Error",
        details: error.message,
      });
    }
  }
};

// Middleware to handle file upload
export const uploadMiddleware = upload.single("image");
//api to search food names
export const searchFoodNames = async (req, res) => {
  const { foodName } = req.body;
  if (!foodName) {
    return res.status(400).json({ message: "Food name is required" });
  }
  try {
    const foods = await Nutrients.findAll({
      where: {
        name: {
          [Op.iLike]: `%${foodName}%`,
        },
      },
      attributes: ["id", "name"],
      limit: 10,
    });
    if (foods.length === 0) {
      return res.status(404).json({ message: "No food found" });
    }
    res.status(200).json({
      message: "food names retrieved successfully",
      foods,
    });
  } catch (e) {
    console.error("Error retrieving food:", e);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Food Nutrients by foodId
export const getFoodNutrients = async (req, res) => {
  console.log(req.body);

  const { foodId } = req.body;

  if (!foodId) {
    return res.status(400).json({ message: "Food name is required" });
  }

  try {
    const nutrient = await Nutrients.findOne({
      where: {
        id: foodId,
      },
    });

    if (!nutrient) {
      return res
        .status(404)
        .json({ message: "No nutritional information found for this food" });
    }

    res.status(200).json({
      message: "Food nutrients retrieved successfully",
      nutrients: nutrient,
    });
  } catch (error) {
    console.error("Error retrieving food nutrients:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addConsumedFood = async (req, res) => {
  const { foodId, foodName, quantity, consumedAt } = req.body;
  console.log(req.body);

  // Validation
  if (!foodId || !foodName || !quantity || !consumedAt) {
    return res.status(400).json({
      message: "foodId, foodName, quantity, and consumedAt are required",
    });
  }

  try {
    // Use the user ID from the decoded token
    const userId = 7; // Assuming `id` is part of the token payload
    console.log(userId);
    // Save the consumed food entry for the specific user
    const consumedFood = await ConsumedFood.create({
      userId, // Associate with the user
      foodId,
      foodName,
      quantity,
      consumedAt,
    });
    console.log(consumedFood);

    // Fetch all consumed foods for the user along with their nutritional details
    // const consumedFoodsWithDetails = await ConsumedFood.findAll({
    //   where: { userId }, // Filter by user ID
    //   include: [
    //     {
    //       model: Nutrients, // Assuming a Nutrients model is defined
    //       as: "nutrients", // Alias for Nutrients association
    //     },
    //   ],
    //   order: [["consumedAt", "DESC"]], // Order by consumption date
    // });

    // // Calculate the sum of nutritional details for the user
    // const totalNutrients = consumedFoodsWithDetails.reduce(
    //   (totals, food) => {
    //     if (food.nutrients) {
    //       const multiplier = food.quantity || 1; // Scale based on quantity
    //       totals.calories += (food.nutrients.calories || 0) * multiplier;
    //       totals.protein += (food.nutrients.protein || 0) * multiplier;
    //       totals.carbs += (food.nutrients.carbs || 0) * multiplier;
    //       totals.fats += (food.nutrients.fats || 0) * multiplier;
    //     }
    //     return totals;
    //   },
    //   { calories: 0, protein: 0, carbs: 0, fats: 0 } // Initial values
    // );

    // Send response with the added food, all consumed foods, and total nutrients
    res.status(200).json({
      message: "Consumed food details added successfully",
      addedFood: consumedFood,
      // allConsumedFoods: consumedFoodsWithDetails,
      // totalNutrients,
    });
  } catch (error) {
    console.error("Error adding consumed food details:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getConsumedFoods = async (req, res) => {
  try {
    const userId = 7; // Assuming `id` is available from the token
    console.log(`Fetching consumed foods for user ID: ${userId}`);

    // Fetch consumed foods along with their nutritional details
    const consumedFoodsWithDetails = await ConsumedFood.findAll({
      where: { userId }, // Filter by user ID
      include: [
        {
          model: Nutrients, // Include Nutrients model
          as: "nutrients",
        },
      ],
      order: [["consumedAt", "DESC"]], // Order by consumption date
    });

    // Calculate total nutritional values
    const totalNutrients = consumedFoodsWithDetails.reduce(
      (totals, food) => {
        if (food.nutrients) {
          const multiplier = food.quantity || 1; // Scale by quantity
          totals.proteins += (food.nutrients.proteins || 0) * multiplier;
          totals.carbohydrates +=
            (food.nutrients.carbohydrates || 0) * multiplier;
          totals.healthyFats += (food.nutrients.healthyFats || 0) * multiplier;
          totals.fiber += (food.nutrients.fiber || 0) * multiplier;
        }
        return totals;
      },
      { proteins: 0, carbohydrates: 0, healthyFats: 0, fiber: 0 } // Initial totals
    );

    res.status(200).json({
      message: "Fetched consumed foods successfully",
      consumedFoods: consumedFoodsWithDetails,
      totalNutrients,
    });
  } catch (error) {
    console.error("Error fetching consumed foods:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
