import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import pg from 'pg'; // Import the pg module explicitly

// Load environment variables from a .env file
config();

// Initialize Sequelize instance for PostgreSQL
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER || 'your_username'}:${process.env.DB_PASSWORD || 'your_password'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'habit_db'}`, 
  {
    dialect: 'postgres',   // Specify PostgreSQL dialect
    dialectModule: pg, // Load pg module explicitly
    logging: false,        // Disable logging (enable if debugging is needed)
  }
);

// Export the sequelize instance
export default sequelize;
