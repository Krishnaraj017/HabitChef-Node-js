// import { Sequelize } from 'sequelize';
// import { config } from 'dotenv';
// import pg from 'pg'; // Import the pg module explicitly

// // Load environment variables from a .env file
// config();

// // Initialize Sequelize instance for PostgreSQL
// const sequelize = new Sequelize(
//   `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD || 'your_password'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'habit_db'}`,
//   {
//     dialect: 'postgres',   // Specify PostgreSQL dialect
//     dialectModule: pg, // Load pg module explicitly
//     logging: false,        // Disable logging (enable if debugging is needed)
//   }
// );

// // Export the sequelize instance
// export default sequelize;

import { Sequelize } from "sequelize";
import { config } from "dotenv";
import pg from "pg"; // Import the pg module explicitly

// Load environment variables from a .env file
config();

// Initialize Sequelize instance for Supabase PostgreSQL
const sequelize = new Sequelize(process.env.SUPABASE_DB_URL, {
  dialect: "postgres", // Specify PostgreSQL dialect
  dialectModule: pg, // Use the pg module explicitly
  logging: false, // Disable logging (enable if debugging is needed)
  dialectOptions: {
    ssl: {
      require: true, // Ensure SSL connection is required
      rejectUnauthorized: false, // Accept self-signed certificates
    },
  },
});

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("Connected to Supabase PostgreSQL successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

// Export the Sequelize instance
export default sequelize;
