import mongoose from 'mongoose';

const jumuaSubjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  showOnMainPage: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('JumuaSubject', jumuaSubjectSchema);