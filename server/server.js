import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser())
// Routes
app.use('/api/v1/auth', authRoutes);

// Connect DB and Start Server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
  }
};

startServer();