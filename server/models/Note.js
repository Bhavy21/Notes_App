import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  category: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',
  required: true, }
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
