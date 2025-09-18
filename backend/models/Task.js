import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'progress', 'completed'], default: 'pending' },
  dueDate: { type: Date, required: true },
  completedDate: { type: Date },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Task', TaskSchema);
