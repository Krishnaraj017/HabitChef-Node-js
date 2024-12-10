import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Import your configured Sequelize instance

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false // Username is not unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false // Password is required
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Email must be unique
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  tableName: 'users', // Optional: Explicitly set the table name
});

export default User;
