import express from 'express';
import bcrypt from 'bcrypt'; 
import { Client } from '../models/user.js'; 

const router = express.Router();

router.post("/auth", async (req, res) => {
  console.log('Auth route hit'); // Track route entry
  
  try {
    console.log('Validating input...');
    const { error } = validate(req.body);
    if (error) {
      console.log('Validation failed:', error.details[0].message);
      return res.status(400).send({ message: error.details[0].message });
    }

    console.log('Looking for user:', req.body.email);
    const user = await Client.findOne({ email: req.body.email });
    if (!user) {
      console.log('User not found');
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    console.log('Comparing passwords...');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      console.log('Password mismatch');
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    console.log('Generating token...');
    const token = user.generateAuthToken();
    console.log('Sending success response');
    return res.status(200).send({ data: token, message: "Logged in Successfully" });

  } catch (error) {
    console.error("Login error:", error);
    if (!res.headersSent) {
      console.log('Sending error response');
      return res.status(500).send({ message: "Internal Server Error" });
    } else {
      console.log('Headers already sent, cannot send error response');
    }
  }
});

export default router;