
import User from '../models/User.js';  // Import the User model
import bcrypt from 'bcryptjs';  // Use bcrypt for password hashing
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    console.log('Received data:', req.body);  // This will log the incoming request body

 const { username, password,email } = req.body;

    if (!username || !password ||!email) {
    return res.status(400).json({ message: 'Username and password are required' });
  } 
  try {

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);  // 10 rounds of hashing
    
     // Create the user in the database
    const user = await User.create({
    
      username:username,
      password: hashedPassword,
              email,

      
    });
     // Create a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET, // Your secret key
      { expiresIn: '1h' } // Token expires in 1 hour
    );
      res.status(201).json({ message: 'User created successfully', user,token });


    // Logic to create a user
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const login = async (req, res) => {
  const { email, loginPassword } = req.body;

  // Check if email and password are provided
  if (!email || !loginPassword) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isValidPassword = await bcrypt.compare(loginPassword, user.password);

    if (isValidPassword) {
        const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET, // Your secret key
      { expiresIn: '1h' } // Token expires in 1 hour
    );
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token:token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        }, // Avoid sending sensitive data like the hashed password
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
};



// Update Username Function
export const updateUsername = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    // The `authenticateToken` middleware attaches the `user` object to the request
    const userId = req.user.id;

    // Find the user by ID and update the username
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username; // Update the username
    await user.save(); // Save the changes

    res.status(200).json({ message: 'Username updated successfully', user });
  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({ message: 'An error occurred while updating the username' });
  }
};
