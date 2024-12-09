import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

// Ensure the storage path is writable in the Vercel environment
const storagePath = process.env.DB_PATH || '/tmp/database.sqlite';

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath, // Use writable storage path
});

// Export the sequelize instance
export default sequelize;
