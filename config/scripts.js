import Nutrients from '../models/Nutrients.js';
import sequelize from '../config/database.js';

const topNutrientFoods = [
  {
    name: 'Salmon',
    proteins: 22.0,
    carbohydrates: 0,
    healthyFats: 13.0,
    vitamins: ['D', 'B12', 'B6'],
    minerals: ['Selenium', 'Potassium', 'Magnesium'],
    antioxidants: ['Astaxanthin', 'Omega-3'],
    fiber: 0,
    description: 'Fatty fish rich in omega-3 fatty acids and high-quality protein',
    prosForMen: [
      'Supports testosterone production',
      'Helps muscle recovery',
      'Supports heart health'
    ],
    consForMen: [
      'High mercury content if consumed in excess'
    ],
    prosForWomen: [
      'Supports bone health',
      'Helps reduce inflammation',
      'Supports skin health'
    ],
    consForWomen: [
      'Potential mercury exposure'
    ],
    nutritientType: 'Functional Food'
  },
  {
    name: 'Spinach',
    proteins: 2.9,
    carbohydrates: 3.6,
    healthyFats: 0.4,
    vitamins: ['A', 'C', 'K', 'E', 'B9'],
    minerals: ['Iron', 'Calcium', 'Magnesium', 'Potassium'],
    antioxidants: ['Lutein', 'Zeaxanthin', 'Quercetin'],
    fiber: 2.2,
    description: 'Nutrient-dense leafy green vegetable packed with vitamins and minerals',
    prosForMen: [
      'Supports muscle function',
      'Promotes prostate health',
      'Aids in testosterone regulation'
    ],
    consForMen: [
      'May interact with blood thinning medications'
    ],
    prosForWomen: [
      'Supports bone density',
      'Helps manage menstrual health',
      'Promotes skin health'
    ],
    consForWomen: [
      'High oxalate content may affect kidney stone risk'
    ],
    nutritientType: 'Micronutrient'
  },
  {
    name: 'Almonds',
    proteins: 21.2,
    carbohydrates: 21.7,
    healthyFats: 49.9,
    vitamins: ['E', 'B2'],
    minerals: ['Magnesium', 'Phosphorus', 'Zinc'],
    antioxidants: ['Flavonoids', 'Vitamin E'],
    fiber: 12.5,
    description: 'Nutrient-rich nut with heart-healthy fats and protein',
    prosForMen: [
      'Supports muscle building',
      'Helps maintain testosterone levels',
      'Supports prostate health'
    ],
    consForMen: [
      'High calorie content',
      'May cause allergic reactions'
    ],
    prosForWomen: [
      'Supports hormonal balance',
      'Aids in weight management',
      'Promotes skin health'
    ],
    consForWomen: [
      'High calorie content',
      'May trigger nut allergies'
    ],
    nutritientType: 'Functional Food'
  },
  {
    name: 'Eggs',
    proteins: 12.6,
    carbohydrates: 0.7,
    healthyFats: 9.5,
    vitamins: ['A', 'D', 'E', 'B12', 'B2'],
    minerals: ['Selenium', 'Zinc', 'Iron', 'Phosphorus'],
    antioxidants: ['Lutein', 'Zeaxanthin'],
    fiber: 0,
    description: 'Complete protein source with essential nutrients',
    prosForMen: [
      'Supports muscle growth',
      'Aids in testosterone production',
      'Promotes brain health'
    ],
    consForMen: [
      'High cholesterol content',
      'Potential allergy concerns'
    ],
    prosForWomen: [
      'Supports reproductive health',
      'Aids in weight management',
      'Promotes skin and hair health'
    ],
    consForWomen: [
      'May trigger hormonal acne in some individuals'
    ],
    nutritientType: 'Macronutrient'
  },
  {
    name: 'Blueberries',
    proteins: 0.7,
    carbohydrates: 14.5,
    healthyFats: 0.3,
    vitamins: ['C', 'K', 'E'],
    minerals: ['Manganese', 'Copper'],
    antioxidants: ['Anthocyanins', 'Flavonoids'],
    fiber: 2.4,
    description: 'Superfruit with powerful antioxidant properties',
    prosForMen: [
      'Supports cardiovascular health',
      'Aids in exercise recovery',
      'Promotes cognitive function'
    ],
    consForMen: [
      'May interact with blood thinning medications'
    ],
    prosForWomen: [
      'Supports skin health',
      'Aids in hormonal balance',
      'Promotes bone density'
    ],
    consForWomen: [
      'High sugar content for those monitoring blood sugar'
    ],
    nutritientType: 'Functional Food'
  },
  {
    name: 'Quinoa',
    proteins: 14.1,
    carbohydrates: 64.2,
    healthyFats: 6.1,
    vitamins: ['B1', 'B2', 'B6', 'E'],
    minerals: ['Magnesium', 'Phosphorus', 'Manganese', 'Folate'],
    antioxidants: ['Quercetin', 'Kaempferol'],
    fiber: 7.0,
    description: 'Complete protein grain with all essential amino acids',
    prosForMen: [
      'Supports muscle recovery',
      'Aids in testosterone production',
      'Promotes digestive health'
    ],
    consForMen: [
      'May cause digestive issues in some individuals'
    ],
    prosForWomen: [
      'Supports hormonal balance',
      'Aids in weight management',
      'Promotes bone health'
    ],
    consForWomen: [
      'Potential gluten sensitivity'
    ],
    nutritientType: 'Macronutrient'
  },
  {
    name: 'Greek Yogurt',
    proteins: 10.0,
    carbohydrates: 3.6,
    healthyFats: 5.0,
    vitamins: ['B12', 'B2', 'A'],
    minerals: ['Calcium', 'Phosphorus', 'Potassium', 'Zinc'],
    antioxidants: ['Probiotics'],
    fiber: 0,
    description: 'Protein-rich dairy product with probiotics',
    prosForMen: [
      'Supports muscle growth',
      'Aids in protein synthesis',
      'Promotes gut health'
    ],
    consForMen: [
      'Potential lactose intolerance',
      'High saturated fat content'
    ],
    prosForWomen: [
      'Supports bone health',
      'Aids in weight management',
      'Promotes digestive health'
    ],
    consForWomen: [
      'May trigger hormonal imbalances in some individuals'
    ],
    nutritientType: 'Functional Food'
  },
  {
    name: 'Kale',
    proteins: 2.9,
    carbohydrates: 8.8,
    healthyFats: 0.5,
    vitamins: ['A', 'C', 'K', 'B6', 'B9'],
    minerals: ['Calcium', 'Potassium', 'Copper', 'Manganese'],
    antioxidants: ['Beta-carotene', 'Flavonoids', 'Quercetin'],
    fiber: 3.6,
    description: 'Nutrient-dense leafy green with powerful antioxidant properties',
    prosForMen: [
      'Supports cardiovascular health',
      'Aids in testosterone regulation',
      'Promotes muscle recovery'
    ],
    consForMen: [
      'May interact with blood thinning medications'
    ],
    prosForWomen: [
      'Supports bone density',
      'Aids in hormonal balance',
      'Promotes skin health'
    ],
    consForWomen: [
      'Potential thyroid interference if consumed raw in large quantities'
    ],
    nutritientType: 'Micronutrient'
  },
  {
    name: 'Sweet Potato',
    proteins: 2.0,
    carbohydrates: 20.1,
    healthyFats: 0.1,
    vitamins: ['A', 'C', 'B6', 'E'],
    minerals: ['Potassium', 'Manganese', 'Magnesium'],
    antioxidants: ['Beta-carotene', 'Anthocyanins'],
    fiber: 3.0,
    description: 'Nutrient-rich root vegetable with complex carbohydrates',
    prosForMen: [
      'Supports muscle glycogen replenishment',
      'Aids in testosterone production',
      'Promotes exercise recovery'
    ],
    consForMen: [
      'High glycemic index for those monitoring blood sugar'
    ],
    prosForWomen: [
      'Supports hormonal balance',
      'Aids in skin health',
      'Promotes fertility'
    ],
    consForWomen: [
      'May cause blood sugar spikes'
    ],
    nutritientType: 'Macronutrient'
  },
  {
    name: 'Chicken Breast',
    proteins: 31.0,
    carbohydrates: 0,
    healthyFats: 3.6,
    vitamins: ['B3', 'B6', 'B12'],
    minerals: ['Selenium', 'Phosphorus', 'Zinc'],
    antioxidants: ['Selenium'],
    fiber: 0,
    description: 'Lean protein source with low fat content',
    prosForMen: [
      'Supports muscle growth',
      'Aids in testosterone production',
      'Promotes muscle recovery'
    ],
    consForMen: [
      'Potential antibiotic residues',
      'May contribute to high cholesterol if consumed in excess'
    ],
    prosForWomen: [
      'Supports weight management',
      'Aids in muscle tone',
      'Promotes healthy hair and skin'
    ],
    consForWomen: [
      'May trigger hormonal imbalances if consumed in excess'
    ],
    nutritientType: 'Macronutrient'
  }
];

export async function seedNutrientsDatabase() {
  try {
    // Sync the model with the database (create table if not exists)
    // await sequelize.sync({ force: true }); // Use { alter: true } for non-destructive updates

    // Bulk create the nutrients ,uncomment the code when you want to add more items to db

    //await Nutrients.bulkCreate(topNutrientFoods);

    console.log('Top 10 Nutrient-Rich Foods Successfully Added to Database');
    //const allItems = await Nutrients.findAll();
    console.log(allItems)
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}



