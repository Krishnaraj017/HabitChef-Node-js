import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH || 'database.sqlite',
});

// Export the sequelize instance
export default sequelize;
