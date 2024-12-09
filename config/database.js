import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

// Ensure the storage path is writable in the Vercel environment
const storagePath = process.env.DB_PATH || '/tmp/database.sqlite';

// Manually configure the SQLite3 module
const sqlite3 = require('sqlite3').verbose();

// Initialize Sequelize instance with the custom SQLite3 dialect module
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath, // Use writable storage path
  dialectModule: sqlite3, // Manually configure SQLite3 for compatibility
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Export the sequelize instance
export default sequelize;
