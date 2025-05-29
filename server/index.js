import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import noteRoutes from './routes/notes.js';
import authRoutes from './routes/authRoutes.js';
import { protect } from './middleware/authMiddleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/noteskeeper', {
  useNewUrlParser: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}).catch((err) => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// ✅ RESTful route
app.use('/api/auth', authRoutes);

// Protect all note routes
app.use('/notes', protect, noteRoutes);
