import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import authRoutes from './routes/authRoutes.js';
import jumuaRoutes from './routes/jumuaRoutes.js';
import tilawaRoutes from './routes/tilawaRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import dawraRoutes from './routes/dawraRoutes.js';
import libraryRoutes from './routes/libraryRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import libraryTimesRoutes from './routes/libraryTimesRoutes.js';
dotenv.config();

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jumua', jumuaRoutes);
app.use('/api/tilawa', tilawaRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/dawra', dawraRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/library-times', libraryTimesRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));