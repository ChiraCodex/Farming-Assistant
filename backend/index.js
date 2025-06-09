import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connection from "./db.js"; 
import usersRoutes from './routes/userRoutes.js'
import authRoutes from './routes/auth.js'

config();

const app = express();

// Database connection
connection();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

//routes
app.use("/api/", usersRoutes);
app.use("/api/", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
