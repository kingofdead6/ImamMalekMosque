import mongoose from 'mongoose';

const libraryRegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  school: { type: String, required: true },
  schoolYear: { type: String, required: true },
  roomNumber: { type: String, required: true },
  wilaya: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  prayerPromise: { type: Boolean, required: true },
  pfp: { type: String, required: true }, // Cloudinary URL for profile picture
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('LibraryRegistration', libraryRegistrationSchema);