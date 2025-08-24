import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }], // Array of Cloudinary URLs
  showOnMainPage: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Book', bookSchema);