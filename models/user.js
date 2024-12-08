import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,  // Ensure username is unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensure password is not null
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  }
}, {
  timestamps: true,  // Enable createdAt and updatedAt fields
});


export default User;
