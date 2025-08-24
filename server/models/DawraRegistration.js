import mongoose from 'mongoose';

const dawraRegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  state: { type: String, required: true },
  school: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  telegram: { type: String },
  memorization: { type: String, required: true },
  narration: { type: String },
  tajweed: { type: String },
  sessionTime: { type: String, required: true },
  notes: { type: String },
  commitment: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('DawraRegistration', dawraRegistrationSchema);