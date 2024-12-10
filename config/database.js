import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

// Load environment variables from a .env file
config();

// Initialize Sequelize instance for PostgreSQL
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',       // PostgreSQL host (default: 'localhost')
  port: process.env.DB_PORT || 5432,              // PostgreSQL port (default: 5432)
  database: process.env.DB_NAME || 'habit_db', // Database name
  username: process.env.DB_USER || 'your_username', // Username
  password: process.env.DB_PASSWORD || 'your_password', // Password
  logging: false, // Disable logging, can be enabled for debugging
}); 

// Export the sequelize instance
export default sequelize;
  