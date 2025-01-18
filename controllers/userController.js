import User from "../models/user.js"; // Import the User model
import bcrypt from "bcryptjs"; // Use bcrypt for password hashing
import jwt from "jsonwebtoken";

// Create User
export const createUser = async (req, res) => {
  console.log(req.body);
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username, password, and email are required" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Create the user in the database
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    // Create a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "48h" } // Token expiry time
    );

    res.status(200).json({ message: "User created successfully", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login User
export const login = async (req, res) => {
  console.log(req.body)
  const { email, loginPassword } = req.body;

  if (!email || !loginPassword) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(loginPassword, user.password);

    if (isValidPassword) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during login" });
  }
};

// Update Username
export const updateUsername = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    await user.save();

    res.status(200).json({ message: "Username updated successfully", user });
  } catch (error) {
    console.error("Error updating username:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the username" });
  }
};
