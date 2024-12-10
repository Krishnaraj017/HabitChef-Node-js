  import express from 'express';
  import pkg from 'body-parser';  // Import the entire body-parser package
  import cors from 'cors';
  import { config } from 'dotenv';
  import sequelize from './config/database.js';  // Import sequelize instance
  import userRoutes from './routes/userRoutes.js';

  const { json } = pkg;  // Destructure json from the package

  config();
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());  // Now you can use json as expected

  // Routes
  app.use('/api', userRoutes);


  const PORT = process.env.PORT || 3000;

  sequelize.sync({ force: false })
    .then(() => {
      console.log('Database synced successfully.');
      app.listen(PORT, () => console.log(`Server is running on http://192.168.10.25:${PORT}`));
    })
    .catch((err) => console.error('Unable to connect to the database:', err));

