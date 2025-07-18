import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String },
  file: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ ADD THIS
  createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);
export default Note;
