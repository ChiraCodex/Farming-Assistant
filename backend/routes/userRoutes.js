import express from "express";
import { Client, validate } from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

// POST /api/users
router.post("/register", async (req, res) => {
  console.log("Received body:", req.body);
  console.log("Received body at backend:", req.body);
  try {
    // 1. Validate request
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: "Validation failed",
        errors: error.details.map(d => d.message) 
      });
    }

    // 2. Check for existing user
    const existingUser = await Client.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email." });
    }

    // 3. Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 4. Create new user
    const newUser = new Client({
      ...req.body,
      password: hashedPassword
    });

    await newUser.save();

    // 5. Respond (without sensitive data)
    const { password, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({ 
      message: "User registered successfully",
      user: userWithoutPassword
    });

  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ 
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

export default router;