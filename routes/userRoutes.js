import express from 'express';
import { createUser, updateUsername } from '../controllers/userController.js';  // Correct import with .js extension
import { login } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/users/createUser', createUser);  // POST request to create a new user
router.post('/users/login',authenticateToken,login);
router.put('/users/updateUsername',authenticateToken,updateUsername)
export default router;  // Export the router using default export


