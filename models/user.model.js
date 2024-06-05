import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Users', userSchema);