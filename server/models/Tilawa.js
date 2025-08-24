import mongoose from 'mongoose';

const tilawaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  audioUrl: { type: String, required: true }, // Cloudinary URL
  rank: { type: Number, enum: [1, 2, 3], required: true, unique: true },
  showOnMainPage: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Drop existing index if needed and create unique index on rank
tilawaSchema.index({ rank: 1 }, { unique: true });

export default mongoose.model('Tilawa', tilawaSchema);