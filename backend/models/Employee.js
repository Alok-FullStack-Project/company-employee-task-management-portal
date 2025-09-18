import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  phone: { type: String, required: true },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

EmployeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

EmployeeSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('Employee', EmployeeSchema);
