import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Joi from 'joi'; // <-- Add this import

const router = express.Router();

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  contacts:  { type: String, required: true },
  password:  { type: String, required: true },
  username:  { type: String, required: true, unique: true }
});

const Client = mongoose.model("Client", clientSchema);

// Joi validation function
function validate(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    contacts: Joi.string().pattern(/^\d{10,15}$/).required(),
    password: Joi.string().min(5).max(15).required(),
    username: Joi.string().min(2).max(30).required()
  });
  return schema.validate(user, { abortEarly: false });
}

router.post("/auth", async (req, res) => {
  // Immediate response if headers already sent
  if (res.headersSent) {
    console.warn('Headers already sent - aborting request');
    return;
  }

  try {
    // Validate input
    const { error } = validate(req.body);
    if (error) {
      console.log('Validation error:', error.details);
      return res.status(400).json({ 
        message: "Validation error",
        details: error.details.map(d => d.message) 
      });
    }

    // Find user
    const user = await Client.findOne({ email: req.body.email }).select('+password');
    if (!user) {
      console.log('User not found for email:', req.body.email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      console.log('Password mismatch for user:', user.email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    try {
      const token = user.generateAuthToken();
      console.log('Login successful for user:', user.email);
      return res.status(200).json({ 
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      });
    } catch (tokenError) {
      console.error('Token generation failed:', tokenError);
      return res.status(500).json({ message: "Authentication system error" });
    }

  } catch (error) {
    console.error('Auth endpoint error:', error);
    if (!res.headersSent) {
      return res.status(500).json({ 
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
});

export { Client, validate };